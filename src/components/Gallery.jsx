import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Loader, Camera } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import PageTransition from '../components/PageTransition'; 

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null); 

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

  const selectedImage = images.find(img => img._id === selectedId);

  return (
    <PageTransition>
      <AnnouncementBar />
      <Navbar />
      
      <div className="bg-white min-h-screen relative overflow-hidden">
        
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-palmeGreen/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        
        <div className="relative pt-24 pb-16 px-6 text-center z-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 shadow-sm text-palmeGreen text-xs font-bold uppercase tracking-widest mb-6">
                 <Camera size={14} />
                 <span>The Collection</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
                The Visual <span className="text-palmeGreen">Chronicle</span>
              </h1>
              
              <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                A curated look at our dedication to purity. From the meticulous extraction process to the final golden pour. Authenticity captured in every frame.
              </p>
           </motion.div>
        </div>

        
        <div className="max-w-7xl mx-auto px-6 pb-32">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                <Loader className="animate-spin mb-4" size={32} />
                <span className="text-xs uppercase tracking-widest">Curating Images...</span>
             </div>
          ) : images.length === 0 ? (
             <div className="text-center bg-gray-50 rounded-3xl p-20 border border-dashed border-gray-200">
                <p className="text-gray-400 font-serif text-xl">The gallery is currently empty.</p>
             </div>
          ) : (
             <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
               {images.map((item, index) => (
                 <motion.div 
                   key={item._id}
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: index * 0.1 }} 
                   layoutId={`image-${item._id}`} 
                   onClick={() => setSelectedId(item._id)}
                   className="break-inside-avoid relative group cursor-zoom-in rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                 >
                    <img 
                      src={item.data?.imageUrl || item.data?.image} 
                      alt="Gallery Item" 
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                    
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                       <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-white font-bold text-lg font-serif">
                             {"Palme Moment"}
                          </p>
                          <div className="flex items-center gap-2 text-white/80 text-xs mt-2 uppercase tracking-wider">
                             <Maximize2 size={12} /> View Fullscreen
                          </div>
                       </div>
                    </div>
                 </motion.div>
               ))}
             </div>
          )}
        </div>

      </div>

      
      <AnimatePresence>
        {selectedId && selectedImage && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
             onClick={() => setSelectedId(null)} 
           >
              
              <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 p-3 rounded-full hover:bg-white/20 z-50">
                 <X size={24} />
              </button>

              
              <motion.div 
                 layoutId={`image-${selectedId}`} 
                 className="relative max-w-5xl w-full max-h-[90vh] rounded-xl overflow-hidden shadow-2xl"
                 onClick={(e) => e.stopPropagation()} 
              >
                 <img 
                   src={selectedImage.data?.imageUrl || selectedImage.data?.image} 
                   className="w-full h-full object-contain bg-black" 
                   alt="Fullscreen" 
                 />
                 
                 
                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-8 pt-20">
                    <h3 className="text-white text-2xl font-serif font-bold">
                       {selectedImage.data?.caption || "Palme Moment"}
                    </h3>
                    <p className="text-white/60 text-sm mt-1">PalmeFoods Collection</p>
                 </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </PageTransition>
  );
};

export default Gallery;