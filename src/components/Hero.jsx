import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlayCircle, faLeaf, faAward, faUsers } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import VideoModal from './VideoModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [badge, setBadge] = useState({ text: 'Best Seller', price: '₦2,500' }); 
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slideRes = await axios.get(`${API_URL}/api/content/hero_slide`);
        if (slideRes.data && slideRes.data.length > 0) {
          setSlides(slideRes.data.map(item => item.data.imageUrl));
        } else {
          setSlides(["https://images.unsplash.com/photo-1621956536417-1f4150b04044?q=80&w=1920", "https://images.unsplash.com/photo-1598514972236-4d249d944434?q=80&w=1920"]);
        }

        const settingsRes = await axios.get(`${API_URL}/api/settings`);
        if (settingsRes.data) {
           const settingsObj = Array.isArray(settingsRes.data) 
             ? settingsRes.data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {})
             : settingsRes.data;
           
           if (settingsObj.hero_badge_text) setBadge(prev => ({ ...prev, text: settingsObj.hero_badge_text }));
           if (settingsObj.hero_badge_price) setBadge(prev => ({ ...prev, price: settingsObj.hero_badge_price }));
        }

      } catch (err) {
        console.error("Hero data load failed", err);
        if(slides.length === 0) setSlides(["https://images.unsplash.com/photo-1621956536417-1f4150b04044?q=80&w=1920"]);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <div className="bg-gradient-to-br from-white to-gray-50 min-h-[90vh] pt-8 pb-10 md:pb-20 px-6 relative overflow-hidden flex items-center">
      
      
      <motion.div 
        animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
            borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 33% 67% / 55% 27% 73% 45%", "30% 70% 70% 30% / 30% 30% 70% 70%"]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute top-10 right-0 w-[50%] h-[80%] bg-palmeGreen/5 pointer-events-none z-0"
      ></motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full relative z-10">
        
        
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8 mt-6 md:mt-0 order-1 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          
          <div className="inline-flex items-center gap-2 border border-palmeGreen/20 rounded-full px-4 py-1 bg-white shadow-sm">
             <span className="w-2 h-2 rounded-full bg-palmeGreen animate-pulse"></span>
             <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-palmeGreen">Est. 2026 • PalmeFoods Store</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-serif leading-tight text-gray-900">
            Wild <span className="text-palmeGreen">Palm Oil</span> <br/>
            <span className="text-3xl md:text-6xl font-light text-gray-600">Liquid Gold.</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 max-w-lg leading-relaxed font-light">
            Experience the rich taste of unadulterated palm oil. 100% Organic, filtered, and sourced directly for the PalmeFoods Store.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto justify-center lg:justify-start">
            <Link to="/shop">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-palmeGreen text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-green-900/20 hover:bg-green-800 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                   Shop Now <FontAwesomeIcon icon={faArrowRight} />
                </motion.button>
            </Link>
            
            
            <motion.button 
                whileHover={{ scale: 1.05, borderColor: '#1a4d2e', color: '#1a4d2e' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideo(true)}
                className="border-2 border-gray-200 text-gray-600 font-bold py-4 px-10 rounded-full transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FontAwesomeIcon icon={faPlayCircle} /> See The Process
            </motion.button>
          </div>
          
          <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 md:pt-10 border-t border-gray-100 lg:border-none w-full">
             <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-palmeGreen transition-colors group">
                <div className="bg-gray-50 p-3 rounded-full group-hover:bg-green-50 transition-colors">
                    <FontAwesomeIcon icon={faLeaf} size="lg" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Organic</span>
             </div>
             <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-palmeGreen transition-colors group">
                <div className="bg-gray-50 p-3 rounded-full group-hover:bg-green-50 transition-colors">
                    <FontAwesomeIcon icon={faAward} size="lg" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Certified</span>
             </div>
             <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-palmeGreen transition-colors group">
                <div className="bg-gray-50 p-3 rounded-full group-hover:bg-green-50 transition-colors">
                    <FontAwesomeIcon icon={faUsers} size="lg" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Community</span>
             </div>
          </div>
        </motion.div>

        
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[350px] md:h-[600px] w-full order-2 lg:order-2"
        >
           <div className="h-full w-full rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl shadow-green-900/10 relative z-10 bg-white">
             <Swiper
               spaceBetween={0} centeredSlides={true}
               autoplay={{ delay: 4000, disableOnInteraction: false }}
               pagination={{ clickable: true }}
               modules={[Autoplay, Pagination, Navigation]}
               className="w-full h-full"
             >
               {slides.map((img, index) => (
                 <SwiperSlide key={index}>
                   <div className="w-full h-full relative">
                     <img src={img} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/10"></div>
                   </div>
                 </SwiperSlide>
               ))}
             </Swiper>
           </div>

           <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 -left-4 md:top-12 md:-left-8 bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-2xl shadow-xl z-20 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-1">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">{badge.text}</p>
              </div>
              <p className="text-xl md:text-3xl font-serif font-bold text-gray-900">{badge.price}</p>
           </motion.div>
        </motion.div>
      </div>
    </div>

    
    <VideoModal isOpen={showVideo} onClose={() => setShowVideo(false)} />
    </>
  );
};

export default Hero;