import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { AlertCircle, RefreshCcw, ShieldCheck } from 'lucide-react';

const ReturnsPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="bg-red-50 p-10 border-b border-red-100">
            <span className="text-red-600 font-bold tracking-widest uppercase text-xs mb-2 block">
                Satisfaction Guarantee
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                Returns & Refunds
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Last Updated: February 2026</p>
          </div>

          <div className="p-10 space-y-8 text-gray-600 leading-relaxed text-lg">
            
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg"><ShieldCheck size={20} /></div>
                    <h3 className="font-bold text-gray-900 text-xl">Eligibility for Returns</h3>
                </div>
                <p>
                    Due to the nature of food products, PalmeFoods maintains strict quality control and hygiene standards. Returns are only accepted for items that arrive <strong>damaged, leaking, contaminated, or incorrect</strong>.
                </p>
                <p className="mt-4 p-4 bg-gray-50 text-sm border-l-4 border-gray-300">
                    <strong>Note:</strong> PalmeFoods does not accept returns for products that have been opened, used, or improperly stored after delivery.
                </p>
            </section>

            <hr className="border-gray-100" />

            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg"><AlertCircle size={20} /></div>
                    <h3 className="font-bold text-gray-900 text-xl">Reporting an Issue</h3>
                </div>
                <p>
                    Customers must report any issues within <strong>24 hours of delivery</strong> by contacting our support team and providing clear photo or video evidence. Claims submitted after this period may not be eligible for review.
                </p>
            </section>

            <hr className="border-gray-100" />

            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg"><RefreshCcw size={20} /></div>
                    <h3 className="font-bold text-gray-900 text-xl">Refund Process</h3>
                </div>
                <p>
                    Once a claim is verified, we may offer a replacement, store credit, or refund depending on the situation. Approved refunds are processed within <strong>5–7 working days</strong> through the original payment method.
                </p>
            </section>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReturnsPolicy;