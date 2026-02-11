import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, Package, Send, CheckCircle, Truck, Store, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';

const BulkOrder = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    serviceType: 'Bulk Supply', 
    quantity: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        await axios.post(`${API_URL}/api/custom-request`, formData);
        
        setSuccess(true);
        toast.success("Request sent! We will contact you shortly.");
    } catch (err) {
        toast.error("Failed to send request. Please try WhatsApp.");
    } finally {
        setLoading(false);
    }
  };

  if (success) {
    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg w-full border border-gray-100 animate-fade-in-up">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-palmeGreen">
                    <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Request Received!</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Thank you, {formData.name}. We have received your inquiry for <strong>{formData.serviceType}</strong>. 
                    Our team will review your requirements and contact you at <strong>{formData.phone}</strong> shortly.
                </p>
                <button onClick={() => setSuccess(false)} className="text-palmeGreen font-bold hover:underline">
                    Send another request
                </button>
            </div>
        </div>
        <Footer />
        </>
    );
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 py-28 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        
        
        <div className="lg:w-1/2 pt-4">
            <span className="inline-block py-1 px-3 rounded-full bg-palmeGreen/10 text-palmeGreen font-bold tracking-widest uppercase text-xs mb-4">
                Custom Solutions
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Premium Quality at <br/> <span className="text-palmeGreen">Any Scale.</span>
            </h1>
            
            
            <div className="text-gray-600 text-lg leading-relaxed space-y-4 mb-10">
                <p>
                    At PalmeFoods, we understand that some needs go beyond everyday purchases. Whether you operate a restaurant, hotel, food processing business, or you are planning a special event, our custom order service offers reliability, consistency, and premium quality at scale.
                </p>
                <p>
                    From bulk supply to private labeling, we manage the details with care, ensuring your palm oil meets the highest standards while you focus on serving your customers.
                </p>
            </div>

            
            <h3 className="font-bold text-gray-900 text-xl mb-6 font-serif">Our Specialized Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ServiceItem icon={Package} text="Bulk Palm Oil Supply" />
                <ServiceItem icon={Store} text="Wholesale for Restaurants" />
                <ServiceItem icon={Tag} text="Private Label Bottling" />
                <ServiceItem icon={CheckCircle} text="Event & Souvenir Packaging" />
                <ServiceItem icon={Truck} text="Worldwide Custom Delivery" />
            </div>

            
            <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-palmeGreen">
                        <Phone size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Call Us Directly</p>
                        <p className="font-bold text-gray-900">+234 913 403 3103</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-palmeGreen">
                        <Mail size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Email Support</p>
                        <p className="font-bold text-gray-900">oreo@palmefoods.com</p>
                    </div>
                </div>
            </div>
        </div>

        
        <div className="lg:w-1/2 w-full bg-white rounded-[2.5rem] shadow-2xl shadow-green-900/5 p-8 md:p-12 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-palmeGreen/5 rounded-bl-[100px] pointer-events-none"></div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2 font-serif">Request a Quote</h2>
            <p className="text-gray-500 text-sm mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Your Name</label>
                        <input name="name" required placeholder="John Doe" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:border-palmeGreen focus:ring-1 focus:ring-palmeGreen outline-none transition-all" onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Phone Number</label>
                        <input name="phone" required placeholder="+234..." className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:border-palmeGreen focus:ring-1 focus:ring-palmeGreen outline-none transition-all" onChange={handleChange} />
                    </div>
                </div>
                
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                    <input name="email" type="email" required placeholder="john@example.com" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:border-palmeGreen focus:ring-1 focus:ring-palmeGreen outline-none transition-all" onChange={handleChange} />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Business Name (Optional)</label>
                    <input name="businessName" placeholder="e.g. Tasty Restaurant Ltd" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:border-palmeGreen focus:ring-1 focus:ring-palmeGreen outline-none transition-all" onChange={handleChange} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Service Needed</label>
                        <select name="serviceType" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:border-palmeGreen focus:ring-1 focus:ring-palmeGreen outline-none bg-white appearance-none cursor-pointer" onChange={handleChange}>
                            <option>Bulk Palm Oil Supply</option>
                            <option>Wholesale (Hotels/Restaurants)</option>
                            <option>Private Label Bottling</option>
                            <option>Event/Souvenir Packaging</option>
                            <option>Custom Delivery</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Est. Quantity</label>
                        <input name="quantity" required placeholder="e.g. 500 Litres / 100 Kegs" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:border-palmeGreen focus:ring-1 focus:ring-palmeGreen outline-none transition-all" onChange={handleChange} />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Additional Details</label>
                    <textarea name="message" rows="4" placeholder="Tell us more about your needs (e.g. delivery location, branding requirements...)" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:border-palmeGreen focus:ring-1 focus:ring-palmeGreen outline-none transition-all" onChange={handleChange}></textarea>
                </div>

                <button disabled={loading} className="w-full bg-palmeGreen text-white font-bold py-4 rounded-xl hover:bg-green-800 transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 transform active:scale-95">
                    {loading ? "Sending Request..." : <><Send size={20} /> Submit Request</>}
                </button>
            </form>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
};

const ServiceItem = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
        <div className="bg-green-50 p-2 rounded-full text-palmeGreen">
            <Icon size={16} />
        </div>
        <span className="font-medium text-gray-700 text-sm">{text}</span>
    </div>
);

export default BulkOrder;