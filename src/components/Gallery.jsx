import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/content/gallery`);
        setImages(res.data);
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <div className="bg-white py-20 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-palmeGreen font-bold tracking-widest uppercase text-xs">Our Farm</span>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mt-2">The Gallery</h1>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">See where the freshness comes from. From the palm tree to the keg.</p>
          </div>

          {loading ? (
             <div className="text-center text-gray-400 py-20">Loading images...</div>
          ) : images.length === 0 ? (
             <div className="text-center bg-gray-50 rounded-xl p-10">
                <p className="text-gray-500">No images in the gallery yet.</p>
             </div>
          ) : (
             <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
               {images.map((item, i) => (
                 <div key={item._id || i} className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 group relative">
                   <img 
                      src={item.data?.imageUrl || item.data?.image} 
                      alt="Farm Life" 
                      className="w-full object-cover" 
                   />
                   <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <p className="text-white font-bold text-sm translate-y-4 group-hover:translate-y-0 transition-transform">
                          {item.data?.caption || "Palme Foods"}
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

export default Gallery;