import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp, faTiktok, faXTwitter } from '@fortawesome/free-brands-svg-icons'; // ✅ Added faXTwitter
import { faPhone, faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [announcement, setAnnouncement] = useState(null);

  const fetchAnnouncement = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/content/announcement?t=${new Date().getTime()}`);
      if (res.data && res.data.length > 0) {
        const newestItem = res.data[res.data.length - 1];
        setAnnouncement(newestItem.data);
      }
    } catch (err) {
      console.error("Failed to load announcement");
    }
  };

  useEffect(() => {
    fetchAnnouncement();
    const interval = setInterval(fetchAnnouncement, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!announcement || announcement.show === false || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`${announcement.color || 'bg-palmeGreen'} text-white relative z-50`}
        >
          <div className="py-2.5 px-4 text-[10px] md:text-xs font-bold uppercase tracking-widest">
            <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
              
              <div className="hidden lg:flex gap-6 items-center opacity-80 hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPhone} /> +2349134033103
                </span>
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} /> oreo@palmefoods.com
                </span>
              </div>

              <div className="flex-1 text-left lg:text-center truncate">
                <span className="animate-pulse mr-2">{announcement.text}</span> 
                
                {announcement.code && (
                  <span className="inline-block bg-white/20 border border-white/30 px-2 py-0.5 rounded text-white font-mono">
                      CODE: <span className="font-bold text-palmeGold">{announcement.code}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 md:gap-4 shrink-0">
                <div className="flex gap-3 items-center border-r border-white/20 pr-3 md:pr-4">
                  <a href="#" className="hover:text-green-200 transition-colors"><FontAwesomeIcon icon={faFacebookF} /></a>
                  <a href="#" className="hover:text-green-200 transition-colors"><FontAwesomeIcon icon={faInstagram} /></a>
                  
                  <a href="#" className="hover:text-green-200 transition-colors"><FontAwesomeIcon icon={faXTwitter} /></a>
                  <a href="https://www.tiktok.com/@palmefoods" target="_blank" rel="noreferrer" className="hover:text-green-200 transition-colors"><FontAwesomeIcon icon={faTiktok} /></a>
                  <a href="https://wa.me/2349134033103" target="_blank" rel="noreferrer" className="hover:text-green-200 transition-colors"><FontAwesomeIcon icon={faWhatsapp} size="lg" /></a>
                </div>

                <button 
                  onClick={() => setIsVisible(false)} 
                  className="text-white/60 hover:text-white transition-colors transform hover:rotate-90 duration-300"
                  aria-label="Close Announcement"
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
              </div>
              
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;