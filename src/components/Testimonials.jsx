import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/content/testimonial`);
        setTestimonials(res.data);
      } catch (err) { console.error(err); }
    };
    fetchContent();
  }, []);

  
  const displayData = testimonials.length > 0 ? testimonials : [
      { data: { name: "Adebayo T.", role: "Chef", text: "Best palm oil I've used in years." } },
      { data: { name: "Sarah J.", role: "Home Cook", text: "Authentic taste and fast delivery." } }
  ];

  return (
    <section className="py-20 bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif font-bold mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayData.map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 relative">
                    <Quote className="text-palmeGold opacity-20 absolute top-6 left-6" size={40} />
                    <p className="text-lg leading-relaxed mb-6 italic">"{item.data.text || item.data.message}"</p>
                    <div className="flex items-center justify-center gap-1 text-palmeGold mb-2">
                        {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                    </div>
                    <h4 className="font-bold">{item.data.name}</h4>
                    <p className="text-xs text-green-200 uppercase tracking-widest">{item.data.role}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;