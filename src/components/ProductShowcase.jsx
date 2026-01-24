import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Image } from 'lucide-react';
import { useCart } from '../context/CartContext'; 
import Preloader from './Preloader';

gsap.registerPlugin(ScrollTrigger);

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading && products.length > 0) {
      gsap.fromTo('.product-card', 
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );
    }
  }, [loading, products]);

  return (
    <div ref={sectionRef} className="py-24 bg-white relative min-h-[600px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          
          <span className="text-palmeGreen/60 font-bold tracking-widest uppercase text-xs">Fresh from the Farm</span>
          
          <h2 className="text-gray-900 font-serif text-4xl md:text-5xl font-bold mb-4 mt-2">
            Pure Selections
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-light">
            Choose the perfect size for your needs. 100% filtered, unadulterated palm oil.
          </p>
        </div>

        {loading ? (
          <Preloader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((item) => (
              <div key={item._id} className="product-card group bg-white rounded-3xl p-6 relative transition-all hover:shadow-2xl hover:-translate-y-2 border border-gray-100 flex flex-col">
                
                
                <span className="absolute top-4 right-4 bg-gray-50 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.size}
                </span>

                
                <div className="h-48 w-full bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform overflow-hidden relative">
                   {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-4" />
                   ) : (
                      <div className="text-gray-300">
                         <Image size={64} strokeWidth={1} />
                      </div>
                   )}
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  
                  <p className="text-palmeGreen font-serif font-bold text-2xl mt-2">₦{item.price.toLocaleString()}</p>
                </div>
                
                
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full mt-auto bg-palmeGreen hover:bg-green-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/10 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
        
        {!loading && products.length === 0 && (
          <div className="text-center text-gray-400 py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-xl font-bold">No products available yet.</p>
            <p className="text-sm">Palme Admin hasn't uploaded any products yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductShowcase;