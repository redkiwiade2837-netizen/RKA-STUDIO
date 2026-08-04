import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import PayPalCheckout from '../components/PayPalCheckout';

const EMPTY_SHIPPING = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
};

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState(EMPTY_SHIPPING);

  const shipping = 25.00;
  const tax = cartTotal * 0.085;
  const grandTotal = cartTotal + shipping + tax;

  const shippingComplete = Object.values(shippingInfo).every((value) => value.trim() !== '');

  const handleShippingChange = (field) => (e) => {
    setShippingInfo((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="flex-grow w-full px-page-margin py-section-gap">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="font-page-title text-page-title mb-section-gap">Checkout</h1>

        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-gutter">
          {/* Left Column: Forms */}
          <div className="md:col-span-8 flex flex-col gap-section-gap">

            <section>
              <h2 className="font-section-header text-section-header mb-6 border-b border-primary pb-2">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-6">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-4">
                    <label className="label-brutal w-32 mb-0 flex-shrink-0">Email Address</label>
                    <input type="email" required className="input-brutal" placeholder="email@example.com" value={shippingInfo.email} onChange={handleShippingChange('email')} />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center gap-4">
                    <label className="label-brutal w-32 mb-0 flex-shrink-0">First Name</label>
                    <input type="text" required className="input-brutal" value={shippingInfo.firstName} onChange={handleShippingChange('firstName')} />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center gap-4">
                    <label className="label-brutal w-32 mb-0 flex-shrink-0">Last Name</label>
                    <input type="text" required className="input-brutal" value={shippingInfo.lastName} onChange={handleShippingChange('lastName')} />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-4">
                    <label className="label-brutal w-32 mb-0 flex-shrink-0">Street Address</label>
                    <input type="text" required className="input-brutal" value={shippingInfo.address} onChange={handleShippingChange('address')} />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-col gap-y-6">
                  <div className="flex items-center gap-4">
                    <label className="label-brutal w-32 flex-shrink-0 mb-0">City</label>
                    <input type="text" required className="input-brutal" value={shippingInfo.city} onChange={handleShippingChange('city')} />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="label-brutal w-32 flex-shrink-0 mb-0">State/Province</label>
                    <input type="text" required className="input-brutal" value={shippingInfo.state} onChange={handleShippingChange('state')} />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="label-brutal w-32 flex-shrink-0 mb-0">ZIP</label>
                    <input type="text" required className="input-brutal" value={shippingInfo.zip} onChange={handleShippingChange('zip')} />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between border-b border-primary pb-2 mb-6">
                <h2 className="font-section-header text-section-header">Payment Method</h2>
                <div className="flex gap-2 text-text-muted">
                  <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 0"}}>lock</span>
                  <span className="font-caption text-caption">Secure Encrypted Transaction</span>
                </div>
              </div>

              <div className="space-y-6 w-full text-center py-4">
                <p className="font-body text-body text-text-muted mb-4">Pay securely with PayPal.</p>
                {shippingComplete ? (
                  <PayPalCheckout
                    cartItems={cartItems}
                    onSuccess={(order) => {
                      console.log("PayPal Order completed:", order);
                      navigate('/order-confirmation');
                    }}
                    onError={(err) => {
                      console.error("PayPal Error:", err);
                      alert("Payment failed or was cancelled.");
                    }}
                  />
                ) : (
                  <p className="font-caption text-caption text-error">
                    Please fill in all shipping information above before proceeding to payment.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Summary */}
          <div className="md:col-span-4">
            <div className="bg-surface p-6 sticky top-8">
              <h2 className="font-section-header text-section-header mb-6 border-b border-primary pb-2">Order Summary</h2>

              <div className="space-y-4 mb-8">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-surface-variant flex-shrink-0">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex justify-between font-body text-body">
                        <span className="font-body-bold">{item.title}</span>
                        <span>${item.price * item.quantity}</span>
                      </div>
                      <span className="font-caption text-caption text-text-muted">Qty: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-primary pt-4 space-y-2 mb-8 font-body text-body">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body-bold text-body-bold pt-4 border-t border-border-subtle mt-2">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
