import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '', 
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        
        
        await axios.post(`${API_URL}/api/contact`, {
            name: formData.name,
            email: formData.email,
            subject: formData.subject || "General Inquiry",
            message: formData.message
        });

        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (err) {
        console.error(err);
        toast.error("Failed to send message. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <div className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          
          <div className="space-y-8">
            <span className="text-palmeRed font-bold tracking-widest uppercase text-xs">Customer Support</span>
            <h1 className="text-5xl font-serif font-bold text-gray-900 leading-tight">Get in Touch</h1>
            <p className="text-gray-500 text-lg">Have questions about bulk orders or delivery? Send us a message and our team will get back to you within 24 hours.</p>
            
            <div className="space-y-6 pt-6 mb-10">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-green-50 group-hover:bg-palmeGreen transition-colors rounded-full flex items-center justify-center text-palmeGreen group-hover:text-white">
                    <FontAwesomeIcon icon={faPhone} size="lg" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Phone</p>
                  <p className="font-bold text-xl text-gray-900">+234 913 403 3103</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-green-50 group-hover:bg-palmeGreen transition-colors rounded-full flex items-center justify-center text-palmeGreen group-hover:text-white">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Email</p>
                  <p className="font-bold text-xl text-gray-900">oreo@palmefoods.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-green-50 group-hover:bg-palmeGreen transition-colors rounded-full flex items-center justify-center text-palmeGreen group-hover:text-white">
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">HQ</p>
                  <p className="font-bold text-xl text-gray-900">Ibadan, Nigeria, Oyo State</p>
                </div>
              </div>
            </div>

            <div className="w-full h-64 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <iframe 
                    title="Palme Foods Location"
                    src="https://maps.google.com/maps?q=Ibadan,%20Nigeria&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy"
                ></iframe>
            </div>
          </div>

          
          <form onSubmit={handleSubmit} className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
            
            <div>
                <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Full Name</label>
                <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-palmeGreen focus:ring-1 focus:ring-palmeGreen focus:outline-none bg-white transition-colors" 
                    placeholder="John Doe" 
                    required
                />
            </div>
            
            <div>
              <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Email Address</label>
              <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-palmeGreen focus:ring-1 focus:ring-palmeGreen focus:outline-none bg-white transition-colors" 
                    placeholder="john@example.com" 
                    required
              />
            </div>

            
            <div>
              <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Subject</label>
              <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-palmeGreen focus:ring-1 focus:ring-palmeGreen focus:outline-none bg-white transition-colors" 
                    placeholder="Inquiry about..." 
                    required
              />
            </div>
            
            <div>
              <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Message</label>
              <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-palmeGreen focus:ring-1 focus:ring-palmeGreen focus:outline-none bg-white transition-colors h-32 resize-none" 
                    placeholder="How can we help you?"
                    required
              ></textarea>
            </div>
            
            <button 
                disabled={loading}
                className="w-full bg-palmeGreen text-white font-bold py-4 rounded-xl hover:bg-green-800 transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faPaperPlane} /> {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;