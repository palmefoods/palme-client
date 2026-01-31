import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/content/faq`);
        setFaqs(res.data);
      } catch (err) {
        console.error("Failed to fetch FAQs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  
  const displayData = faqs.length > 0 ? faqs : [
      { data: { question: "Is your Palm Oil 100% Organic?", answer: "Yes. We source directly from local farms. It is unadulterated." } },
      { data: { question: "Do you sell in bulk?", answer: "Yes, we sell 25L and Drums. Contact us for wholesale." } }
  ];

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-500">Everything you need to know about our oil and delivery.</p>
          </div>

          {loading ? <p className="text-center">Loading...</p> : (
            <div className="space-y-4">
                {displayData.map((item, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
                    <button 
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex justify-between items-center p-6 text-left font-bold text-gray-800 hover:text-palmeGreen transition-colors"
                    >
                    
                    {item.data?.question || item.q}
                    <span className="text-palmeGreen text-sm">
                        <FontAwesomeIcon icon={openIndex === i ? faMinus : faPlus} />
                    </span>
                    </button>
                    <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'
                    }`}
                    >
                    <p className="text-gray-600 leading-relaxed text-sm">
                        {item.data?.answer || item.a}
                    </p>
                    </div>
                </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;