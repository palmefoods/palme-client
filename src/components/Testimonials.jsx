import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

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

  
  const defaultData = [
    { 
        _id: '1',
        data: { 
            author: "Chef Adebayo", 
            role: "Head Chef, Lagos", 
            text: "The consistency of this oil is unmatched. It doesn't sleep (congeal) easily and brings out the true color of my Efo Riro. Highly recommended for professional kitchens." 
        } 
    },
    { 
        _id: '2',
        data: { 
            author: "Mrs. Sarah J.", 
            role: "Home Cook", 
            text: "I was skeptical about buying palm oil online, but PalmeFoods changed my mind. It smells fresh, tastes authentic, and the delivery was surprisingly fast." 
        } 
    },
    { 
        _id: '3',
        data: { 
            author: "Mama Nkechi", 
            role: "Food Vendor", 
            text: "My customers noticed the difference immediately. This is the kind of oil we used to get from the village years ago. Pure quality." 
        } 
    }
  ];

  const displayData = testimonials.length > 0 ? testimonials : defaultData;

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      
      
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-palmeGreen/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-palmeGold/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-100 shadow-sm text-palmeGreen text-xs font-bold uppercase tracking-widest mb-4">
            <Star size={12} fill="currentColor" />
            <span>Community Love</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Loved by Chefs & Homes
          </h2>
          <p className="text-gray-500">
            Real feedback from people who cook with passion.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayData.map((item, i) => (
                <motion.div 
                    key={item._id || i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full relative group"
                >
                    
                    <Quote className="text-palmeGreen/10 absolute top-6 right-6 transform group-hover:scale-110 transition-transform duration-500" size={60} />
                    
                    
                    <div className="flex items-center gap-1 text-palmeGold mb-6">
                        {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                    </div>

                    
                    <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-grow font-light italic">
                        "{item.data.text || item.data.message}"
                    </p>

                    
                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-palmeGreen to-green-800 flex items-center justify-center text-white font-serif font-bold text-lg">
                            {(item.data.author || item.data.name || "A").charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm">
                                {item.data.author || item.data.name || "Customer"}
                            </h4>
                            {item.data.role && (
                                <p className="text-xs text-palmeGreen font-bold uppercase tracking-wide mt-0.5">
                                    {item.data.role}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;