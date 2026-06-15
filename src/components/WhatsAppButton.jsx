import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useCart } from '../context/CartContext'; 

const WhatsAppButton = () => {
  
  const { isCartOpen } = useCart(); 
  
  const phoneNumber = "+2349134033103"; 
  const message = encodeURIComponent("Hello PalmeFoods! I am interested in your palm oil products");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank" 
      rel="noopener noreferrer"
      
      className={`fixed bottom-8 right-8 z-[100] group transition-all duration-500 ease-in-out ${
        isCartOpen 
          ? 'translate-x-40 opacity-0 pointer-events-none' 
          : 'translate-x-0 opacity-100'
      }`}
      aria-label="Chat on WhatsApp"
    >
      
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
      
      <div className="relative bg-[#25D366] hover:bg-[#20bd5a] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110 cursor-pointer">
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
        
        <span className="absolute right-full mr-4 bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us
        </span>
      </div>
    </a>
  );
};

export default WhatsAppButton;