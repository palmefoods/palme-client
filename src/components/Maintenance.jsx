import React from 'react';
import { Clock, Hammer } from 'lucide-react';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full border border-green-100">
        <div className="w-20 h-20 bg-green-100 text-palmeGreen rounded-full flex items-center justify-center mx-auto mb-6">
          <Hammer size={40} />
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">We'll be back soon!</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          PalmeFoods is currently undergoing scheduled maintenance to serve you better. 
          We are polishing the kegs and refining the oil.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm font-bold text-palmeGreen bg-green-50 py-3 px-6 rounded-full inline-flex">
          <Clock size={16} />
          <span>Estimated return: A few hours</span>
        </div>
      </div>
      <p className="mt-8 text-gray-400 text-sm">Need urgent help? Call us at 080...</p>
    </div>
  );
};

export default Maintenance;