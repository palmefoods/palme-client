import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faHandHoldingHeart, faTruckFast, faCheckCircle, faUsers, faHandshake } from '@fortawesome/free-solid-svg-icons';


const AboutSection = ({ isPreview = false }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
        <div className="relative group">
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-palmeRed/10 rounded-full blur-2xl"></div>
          <img 
            src="./images/carousel2.jpg" 
            alt="Palm Processing" 
            className="rounded-[2.5rem] shadow-2xl relative z-10 w-full object-cover h-[450px]"
          />
        </div>

        <div className="space-y-8">
          <span className="inline-block py-1 px-3 rounded-full bg-palmeRed/10 text-palmeRed font-bold tracking-widest uppercase text-xs">
            Our Heritage
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-[1.1]">
            Rooted in Tradition, <br/>
            <span className="text-palmeGreen">Refined for You.</span>
          </h2>
          <p className="text-gray-600 leading-relaxed font-light text-lg">
            PalmeFoods began with a simple mission: to bridge the gap between rural Nigerian palm farms and the modern kitchen. We don't just sell oil; we preserve a heritage of purity.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
             <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-palmeGreen text-xl"><FontAwesomeIcon icon={faLeaf} /></div>
                <div><h4 className="font-bold text-gray-900">Eco-Conscious</h4><p className="text-sm text-gray-500">Sustainable farming.</p></div>
             </div>
             <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-palmeRed text-xl"><FontAwesomeIcon icon={faHandHoldingHeart} /></div>
                <div><h4 className="font-bold text-gray-900">Fair Trade</h4><p className="text-sm text-gray-500">Empowering farmers.</p></div>
             </div>
          </div>
        </div>
      </div>

      
      {!isPreview && (
        <>
          <div className="max-w-7xl mx-auto px-6 mb-32 animate-fade-in-up">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-palmeGreen font-bold tracking-widest uppercase text-xs mb-2 block">Why Choose Palme</span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">More Than Just Oil</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ServiceCard icon={faTruckFast} title="Swift Delivery" desc="Logistics that ensure your oil arrives fresh." />
                <ServiceCard icon={faUsers} title="Bulk & Wholesale" desc="Reliable supply chains for industrial needs." />
                <ServiceCard icon={faHandshake} title="Quality Guarantee" desc="NAFDAC-standard, no additives." />
            </div>
          </div>

          <div className="border-t border-gray-100 bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-10">Trusted Partners</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex flex-col items-center gap-2"><div className="h-16 w-16 bg-black text-white rounded-full flex items-center justify-center font-bold text-2xl">DB</div><span className="font-bold">DBlackrose</span></div>
                    <div className="flex flex-col items-center gap-2"><span className="text-2xl font-black text-gray-300">PALME<span className="text-gray-400">FARMS</span></span></div>
                </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

const ServiceCard = ({ icon, title, desc }) => (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-palmeGreen text-2xl mb-6"><FontAwesomeIcon icon={icon} /></div>
        <h4 className="text-xl font-serif font-bold text-gray-900 mb-3">{title}</h4>
        <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
);

export default AboutSection;