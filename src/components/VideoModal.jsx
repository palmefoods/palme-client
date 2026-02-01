import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const VideoModal = ({ isOpen, onClose }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && !videoUrl) {
      const fetchVideo = async () => {
        try {
          const res = await axios.get(`${API_URL}/api/content/process_video`);
          if (res.data && res.data.length > 0) {
            setVideoUrl(res.data[0].data.videoUrl);
          }
        } catch (err) {
          console.error("Failed to load video");
        } finally {
          setLoading(false);
        }
      };
      fetchVideo();
    }
  }, [isOpen, videoUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
         
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

         
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
          >
           
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-palmeGreen text-white p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <div className="aspect-video w-full flex items-center justify-center bg-black">
              {loading ? (
                 <div className="flex flex-col items-center gap-2 text-palmeGreen">
                    <Loader className="animate-spin" size={32} />
                    <span className="text-xs uppercase tracking-widest">Loading Process...</span>
                 </div>
              ) : videoUrl ? (
                <video 
                  src={videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full"
                />
              ) : (
                <div className="text-gray-500">No video available.</div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;