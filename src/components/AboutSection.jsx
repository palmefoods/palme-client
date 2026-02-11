import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faLeaf, faHandHoldingHeart, faDroplet, faCheckCircle, faUsers, faGlobeAfrica } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const AboutSection = ({ isPreview = false }) => {
  
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-b from-green-50 to-white overflow-hidden" id="about">
      
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-20">
        
        
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
        >
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-palmeRed/10 rounded-full blur-2xl"></div>
          <img 
            src="./images/carousel2.jpg" 
            alt="Palm Processing" 
            className="rounded-[2.5rem] shadow-2xl relative z-10 w-full object-cover h-[500px]"
          />
          
          <div className="absolute bottom-8 -right-6 bg-white p-4 rounded-xl shadow-xl z-20 border-l-4 border-palmeGreen max-w-[200px] hidden md:block">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Established</p>
            <p className="text-sm font-bold text-gray-800">Bridging Tradition & Modern Living.</p>
          </div>
        </motion.div>

        
        <div className="space-y-6">
          <span className="inline-block py-1 px-3 rounded-full bg-palmeRed/10 text-palmeRed font-bold tracking-widest uppercase text-xs">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Rooted in Tradition, <br/>
            <span className="text-palmeGreen">Refined for You.</span>
          </h2>
          
          
          <p className="text-gray-600 leading-relaxed text-lg">
            PalmeFoods was born from a simple but powerful vision: to make genuinely pure palm oil accessible without compromise. We discovered that many households desired natural, high-quality palm oil but often faced uncertainty about purity and sourcing.
          </p>

          
          <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-4"
                >
                    <p className="text-gray-600 leading-relaxed">
                        Our journey began with close partnerships with rural palm farmers across Nigeria, custodians of time-honored palm processing traditions passed down through generations. By refining these methods with modern filtration, hygienic packaging, and quality control, we preserved authenticity while elevating standards.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Today, PalmeFoods bridges tradition and modern living. Each bottle represents care, heritage, and a deep respect for the land and the people who cultivate it.
                    </p>
                </motion.div>
            )}
          </AnimatePresence>

          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-palmeGreen font-bold underline hover:text-green-800 transition-colors"
          >
            {isExpanded ? "Read Less" : "Read Full Story"}
          </button>
          
          
          <div className="bg-palmeGreen/5 p-6 rounded-2xl border border-palmeGreen/20 mt-6">
            <h4 className="font-bold text-palmeGreen mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faGlobeAfrica} /> Our Mission
            </h4>
            <p className="text-gray-700 text-sm italic">
                "To deliver premium, natural palm oil that supports healthy cooking, empowers farming communities, and preserves African heritage with integrity."
            </p>
          </div>

        </div>
      </div>

      
      {!isPreview && (
        <div className="max-w-7xl mx-auto px-6 mb-16 animate-fade-in-up">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-palmeGreen font-bold tracking-widest uppercase text-xs mb-2 block">Our Core Values</span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">The Palme Standard</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <ServiceCard 
                    icon={faDroplet} 
                    color="text-palmeGreen"
                    bg="bg-green-50"
                    title="Purity" 
                    desc="Uncompromising quality. We deliver oil free from additives and shortcuts, just as nature intended." 
                />
                
                
                <ServiceCard 
                    icon={faLeaf} 
                    color="text-emerald-600"
                    bg="bg-emerald-50"
                    title="Sustainability" 
                    desc="Responsible sourcing that protects the environment and secures livelihoods for the future." 
                />
                
                
                <ServiceCard 
                    icon={faUsers} 
                    color="text-palmeRed"
                    bg="bg-orange-50"
                    title="Community" 
                    desc="Fair partnerships that uplift farmers and strengthen local economies." 
                />
            </div>
        </div>
      )}
    </section>
  );
};


const ServiceCard = ({ icon, title, desc, color, bg }) => (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center ${color} text-2xl mb-6`}>
            <FontAwesomeIcon icon={icon} />
        </div>
        <h4 className="text-xl font-serif font-bold text-gray-900 mb-3">{title}</h4>
        <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
    </div>
);

export default AboutSection;