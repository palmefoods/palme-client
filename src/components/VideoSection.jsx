import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Play } from 'lucide-react';

const VideoSection = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/settings`);
        if (res.data) {
           const settingsObj = Array.isArray(res.data) 
             ? res.data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {})
             : res.data;
           
           let rawLink = settingsObj.youtube_link || '';

           
           if (rawLink.includes('<iframe')) {
              const match = rawLink.match(/src="([^"]+)"/);
              if (match && match[1]) {
                  rawLink = match[1];
              }
           }
           

           setVideoUrl(rawLink);
        }
      } catch (err) { console.error("No video link found"); }
    };
    fetchVideo();
  }, []);

  if (!videoUrl) return null; 

  return (
    <div className="w-full py-24 bg-black relative overflow-hidden group">
        <div className="absolute inset-0 bg-palmeGreen/20 z-10 pointer-events-none"></div>
        
       
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center bg-fixed"></div>

        {!isPlaying ? (
            <div className="relative z-20 container mx-auto px-6 h-[400px] flex flex-col items-center justify-center text-center animate-fade-in-up">
                <span className="text-palmeGreen font-bold tracking-[0.3em] uppercase text-xs mb-4">Our Process</span>
                <h2 className="text-white font-serif text-3xl md:text-5xl mb-10">From Wild Grove to Your Home</h2>
                <button 
                    onClick={() => setIsPlaying(true)}
                    className="w-24 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-palmeGreen hover:border-palmeGreen transition-all duration-300 shadow-2xl animate-pulse group-hover:scale-110"
                >
                    <Play fill="currentColor" size={32} className="ml-2"/>
                </button>
            </div>
        ) : (
            <div className="relative z-20 container mx-auto px-4 h-[500px] md:h-[600px] w-full max-w-5xl animate-fade-in">
                <iframe 
                    className="w-full h-full rounded-3xl shadow-2xl border-4 border-white/10 bg-black"
                    src={videoUrl.includes('?') ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`} 
                    title="Palme Process" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
        )}
    </div>
  );
};

export default VideoSection;