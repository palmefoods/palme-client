import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Truck, Globe, Clock, MapPin } from 'lucide-react';

const ShippingPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          
          <div className="bg-palmeGreen/5 p-10 border-b border-gray-100">
            <span className="text-palmeGreen font-bold tracking-widest uppercase text-xs mb-2 block">
                Policy & Logistics
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                Shipping Policy
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Last Updated: February 2026</p>
          </div>

          
          <div className="p-10 space-y-8 text-gray-600 leading-relaxed text-lg">
            
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Clock size={20} /></div>
                    <h3 className="font-bold text-gray-900 text-xl">Processing Time</h3>
                </div>
                <p>
                    At PalmeFoods, we take pride in timely and secure delivery. Orders are typically processed within <strong>24–48 hours</strong> after confirmation, excluding weekends and public holidays.
                </p>
            </section>

            <hr className="border-gray-100" />

            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-50 text-palmeGreen rounded-lg"><MapPin size={20} /></div>
                    <h3 className="font-bold text-gray-900 text-xl">Delivery Timelines</h3>
                </div>
                <p className="mb-4">
                    Delivery timelines depend on the destination:
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-palmeGreen">
                    <li><strong>Within Nigeria:</strong> Orders generally arrive within 2–5 working days.</li>
                    <li><strong>International:</strong> Deliveries may take longer depending on customs processing, courier service, and destination country.</li>
                </ul>
            </section>

            <hr className="border-gray-100" />

            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Truck size={20} /></div>
                    <h3 className="font-bold text-gray-900 text-xl">Shipping Fees & Tracking</h3>
                </div>
                <p>
                    Shipping fees are calculated at checkout for standard orders or communicated directly for bulk and custom requests. We partner with trusted logistics providers to ensure safe handling and proper delivery.
                </p>
                <p className="mt-4">
                    Once an order has been dispatched, tracking information will be shared where available. PalmeFoods is not responsible for delays caused by third-party couriers, customs clearance, or incorrect delivery details provided by the customer.
                </p>
            </section>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShippingPolicy;