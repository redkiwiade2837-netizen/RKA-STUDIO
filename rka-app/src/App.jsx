import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCartButton from './components/FloatingCartButton';

// Placeholder imports for pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ItemsIndex from './pages/ItemsIndex';
import ItemsDetail from './pages/ItemsDetail';
import FurnitureIndex from './pages/FurnitureIndex';
import FurnitureDetail from './pages/FurnitureDetail';
import ProjectsIndex from './pages/ProjectsIndex';
import GalleryDetail from './pages/GalleryDetail';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import TossSuccessPage from './pages/TossSuccessPage';
import TossFailPage from './pages/TossFailPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-primary selection:bg-surface-variant selection:text-primary">
      <Header />
      <main className="flex-grow flex flex-col w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/items" element={<ItemsIndex />} />
          <Route path="/item/:id" element={<ItemsDetail />} />
          <Route path="/furniture" element={<FurnitureIndex />} />
          <Route path="/furniture/:id" element={<FurnitureDetail />} />
          <Route path="/projects" element={<ProjectsIndex />} />
          <Route path="/projects/:id" element={<GalleryDetail />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/toss/success" element={<TossSuccessPage />} />
          <Route path="/toss/fail" element={<TossFailPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCartButton />
    </div>
  );
}

export default App;
