import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'; 
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; 
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import AboutSection from './components/AboutSection';
import VideoSection from './components/VideoSection'; 
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AnnouncementBar from './components/AnnouncementBar';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal'; 
import WhatsAppButton from './components/WhatsAppButton';
import Preloader from './components/Preloader';
import NotFound from './components/NotFound';
import FAQ from './components/FAQ';         
import Gallery from './components/Gallery'; 
import Contact from './components/Contact'; 
import Maintenance from './components/Maintenance'; 
import Checkout from './components/Checkout';
import { Toaster } from 'react-hot-toast';
import OrderSuccess from './components/OrderSuccess';
import BulkOrder from './components/BulkOrder';
import Dashboard from './components/Dashboard'; 
import ResetPassword from './components/ResetPassword'; 
import ScrollToTop from './components/ScrollToTop';

import ShippingPolicy from './components/ShippingPolicy';
import ReturnsPolicy from './components/ReturnsPolicy';
import TermsOfService from './components/TermsOfService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const LandingPage = () => (
  <>
    <SEO 
      title="Pure Nigerian Palm Oil | Direct from Farm" 
      description="Taste the difference with PalmeFoods. Premium, unadulterated palm oil sourced from Osun State. Nationwide delivery for homes and businesses."
    />
    <AnnouncementBar />
    <Navbar />
    <Hero />
    <VideoSection /> 
    <AboutSection isPreview={true} /> 
    <ProductShowcase limit={4} /> 
    <Testimonials />
    <FAQ /> 
    <Footer />
  </>
);

const ShopPage = () => (
  <>
    <SEO 
      title="Shop All Products | 5L, 10L, 25L Kegs" 
      description="Buy premium Nigerian Palm Oil online. Available in various sizes. Fresh, unadulterated, and delivered straight to your doorstep."
    />
    <AnnouncementBar />
    <Navbar />
    <div className="pt-20">
      <div className="bg-green-50 py-16 text-center">
        <h1 className="text-4xl font-serif font-bold text-gray-900">Shop All Products</h1>
        <p className="text-gray-500 mt-2">Pure palm oil delivered to your doorstep.</p>
      </div>
      <ProductShowcase />
    </div>
    <Footer />
  </>
);

const AboutPage = () => (
  <>
    <SEO 
      title="Our Story & Heritage" 
      description="We bridge the gap between rural palm farmers in Osun State and your modern kitchen. Learn about our mission for purity and sustainability."
    />
    <AnnouncementBar />
    <Navbar />
    <div className="pt-20">
      <AboutSection />
    </div>
    <Footer />
  </>
);

const TestimonialsPage = () => (
    <>
      <SEO title="Customer Reviews" description="See what our happy customers are saying about PalmeFoods premium palm oil." />
      <AnnouncementBar />
      <Navbar />
      <div className="pt-20">
         <Testimonials />
      </div>
      <Footer />
    </>
);

const FAQPage = () => (
    <>
      <SEO title="Frequently Asked Questions" description="Have questions about delivery, purity, or bulk orders? Find all your answers here." />
      <AnnouncementBar />
      <Navbar />
      <div className="pt-20">
         <FAQ />
      </div>
      <Footer />
    </>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Optional: Check settings logic
      } catch (error) {
        console.error("Failed to check settings", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000); 
      }
    };
    initializeApp();
  }, []);

  if (loading) return <Preloader fullScreen={true} />;
  if (isMaintenanceMode) return <Maintenance />;

  return (
    <HelmetProvider> 
      <AuthProvider> 
        <CartProvider>
          <Router>
            
            <ScrollToTop />
            <Toaster position="top-center" reverseOrder={false} />
            
            <div className="font-sans antialiased text-gray-900 bg-white relative">
              
              <Routes>
                
                <Route path="/" element={<LandingPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/about" element={<AboutPage />} /> 
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                
                
                <Route 
                    path="/custom-orders" 
                    element={<><SEO title="Bulk & Wholesale Orders" description="Get wholesale pricing for restaurants, hotels, and industrial needs." /><BulkOrder /></>} 
                />
                <Route 
                    path="/gallery" 
                    element={<><SEO title="Gallery | Our Process" /><Gallery /></>} 
                />
                <Route 
                    path="/contact" 
                    element={<><SEO title="Contact Us" description="Get in touch with PalmeFoods. Call us or visit our HQ in Ibadan." /><Contact /></>} 
                />
                
                <Route 
                    path="/checkout" 
                    element={<><SEO title="Secure Checkout" /><Checkout /></>} 
                />
                <Route path="/order-success" element={<OrderSuccess />} />
                
                <Route 
                    path="/dashboard" 
                    element={<><SEO title="My Dashboard" /><Dashboard /></>} 
                />
                <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
                
                
                <Route 
                    path="/shipping-policy" 
                    element={<><SEO title="Shipping Policy" /><ShippingPolicy /></>} 
                />
                <Route 
                    path="/returns" 
                    element={<><SEO title="Returns & Refunds" /><ReturnsPolicy /></>} 
                />
                <Route 
                    path="/terms" 
                    element={<><SEO title="Terms of Service" /><TermsOfService /></>} 
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
              
              <CartDrawer />
              <AuthModal /> 
              <WhatsAppButton />

            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;