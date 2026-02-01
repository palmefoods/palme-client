import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { MapPin, Phone, Mail, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
        toast.success("Welcome to the Palme Family!");
        setEmail('');
    } catch (err) {
        toast.error("Subscription failed. Try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <footer className="bg-[#050b14] text-gray-300 pt-24 pb-10 border-t border-gray-800 relative overflow-hidden">
      
      
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-palmeGreen via-palmeGold to-palmeGreen"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-palmeGreen/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 relative z-10">
        
        
        <div className="space-y-8">
          <img 
            src={logo} 
            alt="PalmeFoods" 
            className="h-28 w-auto object-contain brightness-110" 
          />
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Bringing the authentic taste of Nigerian palm oil to the global kitchen. Pure, unadulterated, and sustainably sourced from the heart of Osun State.
          </p>
          <div className="flex gap-3">
            <SocialIcon icon={faWhatsapp} link="https://wa.me/2349134033103" color="hover:bg-[#25D366]" />
            <SocialIcon icon={faInstagram} link="https://instagram.com" color="hover:bg-[#E1306C]" />
            <SocialIcon icon={faFacebookF} link="https://facebook.com" color="hover:bg-[#1877F2]" />
            <SocialIcon icon={faTwitter} link="https://twitter.com" color="hover:bg-[#1DA1F2]" />
            <SocialIcon icon={faTiktok} link="https://tiktok.com" color="hover:bg-black" />
          </div>
        </div>

        
        <div>
          <h4 className="font-serif font-bold text-white text-lg mb-8 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-palmeGreen"></span> Discover
          </h4>
          <ul className="space-y-4 text-sm">
            <FooterLink href="/shop" text="Shop Premium Oil" />
            <FooterLink href="/custom-orders" text="Custom Orders" />
            <FooterLink href="/gallery" text="The Visual Chronicle" />
          </ul>
        </div>

        
        <div>
          <h4 className="font-serif font-bold text-white text-lg mb-8 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-palmeGreen"></span> Support
          </h4>
          <ul className="space-y-4 text-sm">
            <FooterLink href="/dashboard" text="My Account" />
            <FooterLink href="/dashboard" text="Track Order" />
            <FooterLink href="/shipping-policy" text="Shipping Policy" />
            <FooterLink href="/returns" text="Returns & Refunds" />
            <FooterLink href="/terms" text="Terms of Service" />
          </ul>
        </div>

        
        <div>
          <h4 className="font-serif font-bold text-white text-lg mb-8 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-palmeGreen"></span> Get in Touch
          </h4>
          
          <ul className="space-y-6 text-sm mb-10">
            <li className="flex items-start gap-3">
               <MapPin className="text-palmeGreen mt-0.5 shrink-0" size={18} />
               <span className="text-gray-400">12 Palme Avenue, Osogbo, Osun State, Nigeria.</span>
            </li>
            <li className="flex items-center gap-3">
               <Phone className="text-palmeGreen shrink-0" size={18} />
               <span className="text-gray-400">+234 913 403 3103</span>
            </li>
            <li className="flex items-center gap-3">
               <Mail className="text-palmeGreen shrink-0" size={18} />
               <span className="text-gray-400">nali@palmefoods.com</span>
            </li>
          </ul>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-3">Join the Newsletter</p>
            <form onSubmit={handleSubscribe} className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-black/30 border border-gray-700 text-white pl-4 pr-12 py-3 rounded-lg text-sm focus:outline-none focus:border-palmeGreen transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  disabled={loading} 
                  className="absolute right-1 top-1 bottom-1 bg-palmeGreen text-white w-10 rounded-md flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                    {loading ? <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span> : <ArrowRight size={16} />}
                </motion.button>
            </form>
          </div>

        </div>

      </div>

      <div className="border-t border-gray-800 pt-8 text-center">
        <p className="text-xs text-gray-600">
           &copy; {new Date().getFullYear()} PalmeFoods Nigeria Limited.
        </p>
      </div>
    </footer>
  );
};


const FooterLink = ({ href, text }) => (
  <li>
    <motion.a 
      href={href} 
      className="flex items-center gap-2 text-gray-400 transition-colors group"
      whileHover={{ x: 5, color: "#fff" }} 
    >
      <ChevronRight size={12} className="text-palmeGreen opacity-0 group-hover:opacity-100 transition-opacity" />
      {text}
    </motion.a>
  </li>
);


const SocialIcon = ({ icon, link, color }) => (
  <motion.a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer" 
    whileHover={{ y: -5 }} 
    className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center transition-colors text-white ${color}`}
  >
    <FontAwesomeIcon icon={icon} />
  </motion.a>
);

export default Footer;