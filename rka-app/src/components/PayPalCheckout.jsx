import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { API_BASE_URL } from '../config';

const PayPalCheckout = ({ cartItems, onSuccess, onError }) => {
  const createOrder = async () => {
    try {
      // Call the backend to create an order. The backend prices the order
      // itself from product id + quantity, it never trusts a client-sent amount.
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map(({ id, quantity }) => ({ id, quantity })),
        }),
      });
      
      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      // Call the backend to capture the order
      const response = await fetch(`${API_BASE_URL}/api/orders/${data.orderID}/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const orderData = await response.json();
      
      const errorDetail = orderData?.details?.[0];
      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        if (onSuccess) onSuccess(orderData);
      }
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <PayPalButtons
        style={{ layout: "vertical", color: "black", shape: "rect", label: "pay" }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(err) => {
          if (onError) {
            onError(err);
          } else {
            console.error("PayPal Error:", err);
          }
        }}
      />
    </div>
  );
};

export default PayPalCheckout;
