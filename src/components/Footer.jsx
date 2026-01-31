import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/logo-green.png';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if(!email) return;
    
    setLoading(true);
    try {
        
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        
        
        await axios.post(`${API_URL}/api/newsletter`, { email });
        
        toast.success("Subscribed successfully!");
        setEmail('');
    } catch (err) {
        toast.error("Subscription failed. Try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        
        <div className="space-y-6">
          <img 
            src={logo} 
            alt="PalmeFoods" 
            className="h-28 md:h-32 w-auto object-contain brightness-110" 
          />
          <p className="text-gray-400 text-sm leading-relaxed">
            Bringing the authentic taste of Nigerian palm oil to the world. Pure, unadulterated, and sustainably sourced.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={faFacebookF} link="https://facebook.com" />
            <SocialIcon icon={faInstagram} link="https://instagram.com" />
            <SocialIcon icon={faTwitter} link="https://twitter.com" />
            <SocialIcon icon={faTiktok} link="https://tiktok.com" />
          </div>
        </div>

        
        <div>
          <h4 className="font-bold mb-6 text-palmeGreen">Explore</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="/shop" className="hover:text-white transition-colors">Shop Oil</a></li>
            <li><a href="/bulk-orders" className="hover:text-white transition-colors">Wholesale & Bulk</a></li>
            <li><a href="/gallery" className="hover:text-white transition-colors">Gallery</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="font-bold mb-6 text-palmeGreen">Help</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="/faq" className="hover:text-white transition-colors">FAQs</a></li>
            <li><a href="/dashboard" className="hover:text-white transition-colors">My Account</a></li>
            <li><a href="/checkout" className="hover:text-white transition-colors">Checkout</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="font-bold mb-6 text-palmeGreen">Stay Fresh</h4>
          <p className="text-gray-400 text-sm mb-4">Subscribe for updates and exclusive offers.</p>
          <form onSubmit={handleSubscribe} className="flex">
            <input 
              type="email" 
              placeholder="Enter email" 
              className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-l-lg w-full text-sm focus:outline-none focus:border-palmeGreen"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button disabled={loading} className="bg-palmeGreen px-4 py-3 rounded-r-lg font-bold hover:bg-green-600 transition-colors text-xs uppercase tracking-wider">
                {loading ? '...' : 'GO'}
            </button>
          </form>
        </div>

      </div>

      <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} PalmeFoods Nigeria. All rights reserved.
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-palmeRed transition-colors text-gray-300">
    <FontAwesomeIcon icon={icon} />
  </a>
);

export default Footer;