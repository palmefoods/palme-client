import React from 'react';
import { Hammer } from 'lucide-react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 text-center">
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full border border-green-100 relative overflow-hidden"
      >
        
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full blur-3xl opacity-50"></div>

        
        <motion.div 
          animate={{ 
            rotate: [0, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatDelay: 3 
          }}
          className="w-24 h-24 bg-green-50 text-palmeGreen rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
        >
          <Hammer size={40} />
        </motion.div>
        
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
          We'll be back shortly!
        </h1>
        
        <p className="text-gray-500 mb-10 leading-relaxed">
          PalmeFoods is currently undergoing scheduled maintenance. 
          We are updating our inventory and <span className="text-palmeGreen font-bold">preparing orders for shipping</span>. 
          Check back soon!
        </p>

        
        <div className="space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Need urgent support?</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                
                <a 
                    href="tel:+2349134033103" 
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-bold transition-all transform hover:-translate-y-1"
                >
                    <FontAwesomeIcon icon={faPhone} />
                    <span>Call Us</span>
                </a>

                
                <a 
                    href="https://wa.me/+2349134033103" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-bold transition-all shadow-lg shadow-green-200 transform hover:-translate-y-1"
                >
                    <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                    <span>WhatsApp</span>
                </a>
            </div>
        </div>

      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-gray-400 text-xs tracking-widest uppercase"
      >
        &copy; {new Date().getFullYear()} PalmeFoods
      </motion.p>
    </div>
  );
};

export default Maintenance;