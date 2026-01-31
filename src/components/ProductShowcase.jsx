import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductShowcase = ({ limit }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
       <div className="flex justify-between items-end mb-12">
            <div>
                <span className="text-palmeGreen font-bold tracking-widest uppercase text-xs">Our Collection</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-2">Premium Palm Products</h2>
            </div>
            {limit && (
                <Link to="/shop" className="hidden md:flex items-center gap-2 text-palmeGreen font-bold hover:underline">
                    View All Products <ArrowRight size={16} />
                </Link>
            )}
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
             <div key={product._id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all group relative">
                <div className="h-64 bg-gray-50 rounded-xl mb-4 overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                         <button onClick={() => { addToCart(product); toast.success("Added to cart"); }} className="bg-white p-3 rounded-full text-gray-900 hover:bg-palmeGreen hover:text-white transition-colors">
                            <ShoppingCart size={18} />
                         </button>
                    </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{product.size}</p>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-palmeGreen text-xl">₦{product.price.toLocaleString()}</span>
                    
                    
                </div>
             </div>
          ))}
       </div>

       {limit && (
           <div className="mt-12 text-center md:hidden">
               <Link to="/shop" className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-bold">
                   View All Products <ArrowRight size={16} />
               </Link>
           </div>
       )}
    </section>
  );
};

export default ProductShowcase;