import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, Package, Send, CheckCircle } from 'lucide-react';
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
    productType: 'Palm Oil',
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
        // This hits the route we added to your server.js earlier
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
            <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg w-full border border-gray-100">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-palmeGreen">
                    <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Request Received!</h2>
                <p className="text-gray-600 mb-8">
                    Thank you, {formData.name}. We have received your bulk order inquiry. 
                    Our sales team will call you at <strong>{formData.phone}</strong> within 24 hours.
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
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        
        
        <div className="lg:w-1/2 pt-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-palmeGreen mb-6">
                Bulk Orders & <br/>Custom Branding
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Do you run a restaurant, hotel, or food processing business? 
                Get Palme Foods Premium Palm Oil in large quantities at wholesale prices. 
                We also offer <strong>Private Labeling</strong> (your brand on our bottles).
            </p>

            <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="bg-orange-50 p-3 rounded-full text-orange-600"><Package /></div>
                    <div>
                        <h3 className="font-bold text-gray-900">Wholesale Pricing</h3>
                        <p className="text-sm text-gray-500">Competitive rates for orders over 50 Litres.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="bg-blue-50 p-3 rounded-full text-blue-600"><Package /></div>
                    <div>
                        <h3 className="font-bold text-gray-900">Custom Branding</h3>
                        <p className="text-sm text-gray-500">We package, you sell. Your label, our quality.</p>
                    </div>
                </div>
            </div>
        </div>

        
        <div className="lg:w-1/2 bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get a Quote</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                    <input name="name" required placeholder="Your Name" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-palmeGreen outline-none" onChange={handleChange} />
                    <input name="phone" required placeholder="Phone Number" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-palmeGreen outline-none" onChange={handleChange} />
                </div>
                
                <input name="email" type="email" required placeholder="Email Address" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-palmeGreen outline-none" onChange={handleChange} />
                <input name="businessName" placeholder="Business Name (Optional)" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-palmeGreen outline-none" onChange={handleChange} />
                
                <div className="grid grid-cols-2 gap-5">
                    <select name="productType" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-palmeGreen outline-none bg-white" onChange={handleChange}>
                        <option>Palm Oil</option>
                        <option>Vegetable Oil</option>
                        <option>Custom Request</option>
                    </select>
                    <input name="quantity" required placeholder="Est. Quantity (Litres)" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-palmeGreen outline-none" onChange={handleChange} />
                </div>

                <textarea name="message" rows="4" placeholder="Tell us about your needs (e.g. 'I need 200 kegs delivered to Lagos island with my brand logo')" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-palmeGreen outline-none" onChange={handleChange}></textarea>

                <button disabled={loading} className="w-full bg-palmeGreen text-white font-bold py-4 rounded-xl hover:bg-green-800 transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2">
                    {loading ? "Sending..." : <><Send size={20} /> Request Quote</>}
                </button>
            </form>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default BulkOrder;