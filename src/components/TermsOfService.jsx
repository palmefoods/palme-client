import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Scale, Lock, FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="bg-gray-100 p-10 border-b border-gray-200">
            <span className="text-gray-500 font-bold tracking-widest uppercase text-xs mb-2 block">
                Legal
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                Terms of Service
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Last Updated: February 2026</p>
          </div>

          <div className="p-10 space-y-8 text-gray-600 leading-relaxed text-lg">
            
            <p className="text-xl font-medium text-gray-800">
                By accessing or using the PalmeFoods website, you agree to comply with the following terms and conditions.
            </p>

            <div className="space-y-6">
                <div className="flex gap-4">
                    <span className="font-serif font-bold text-2xl text-gray-300">01</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Product Use & Availability</h4>
                        <p>All products sold are intended for personal or commercial use as described. Product availability, pricing, and promotions may change without prior notice.</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <span className="font-serif font-bold text-2xl text-gray-300">02</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Order Rights</h4>
                        <p>PalmeFoods reserves the right to refuse, cancel, or limit any order at our discretion, including cases of suspected fraud, pricing errors, or supply limitations.</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <span className="font-serif font-bold text-2xl text-gray-300">03</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Intellectual Property</h4>
                        <p>All website content, including text, images, branding, and logos, is the property of PalmeFoods and may not be copied, reproduced, or distributed without written permission.</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <span className="font-serif font-bold text-2xl text-gray-300">04</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Customer Responsibility</h4>
                        <p>Customers are responsible for providing accurate and complete delivery information. PalmeFoods will not be held liable for delays or losses resulting from incorrect details.</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <span className="font-serif font-bold text-2xl text-gray-300">05</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Agreement</h4>
                        <p>Use of this website constitutes acceptance of these terms. Continued use after updates implies agreement with revised terms.</p>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;