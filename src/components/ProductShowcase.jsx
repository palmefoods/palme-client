import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Star, Search, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ProductShowcase = ({ limit }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); 

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  
  useEffect(() => {
    let result = [...products];

    
    if (searchTerm) {
        result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    
    if (sortBy === 'low-high') {
        result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
        result.sort((a, b) => b.price - a.price);
    } else {
        
        
        result.reverse(); 
    }

    setFilteredProducts(result);
  }, [products, searchTerm, sortBy]);

  
  const displayedProducts = limit ? products.slice(0, limit) : filteredProducts;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
       
       
       <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
           >
               <span className="text-palmeGreen font-bold tracking-widest uppercase text-xs bg-green-50 px-3 py-1 rounded-full border border-green-100">
                  Shop The Collection
               </span>
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-4 tracking-tight">
                  Pure. Premium. <span className="text-palmeGreen">Palme.</span>
               </h2>
           </motion.div>

           {limit && (
               <Link to="/shop" className="group hidden md:flex items-center gap-2 text-gray-500 font-bold hover:text-palmeGreen transition-colors">
                   View Full Catalog 
                   <span className="bg-gray-100 p-1 rounded-full group-hover:bg-palmeGreen group-hover:text-white transition-all">
                      <ArrowRight size={16} />
                   </span>
               </Link>
           )}
       </div>

       
       {!limit && (
         <div className="mb-10 flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            
            
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-palmeGreen rounded-lg outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            
            <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-400" />
                <span className="text-sm font-bold text-gray-600">Sort by:</span>
                <select 
                    className="bg-gray-50 border-none font-bold text-sm text-gray-800 py-2 pl-2 pr-8 rounded-lg cursor-pointer outline-none hover:bg-gray-100"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="newest">Newest Arrivals</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                </select>
            </div>
         </div>
       )}

       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.length === 0 ? (
              <div className="col-span-full text-center py-20 text-gray-400">
                  <p>No products found matching your search.</p>
              </div>
          ) : (
            displayedProducts.map((product, index) => (
                <motion.div 
                    key={product._id} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group relative bg-white rounded-3xl border border-gray-100 hover:border-palmeGreen/30 hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-300 flex flex-col overflow-hidden"
                >
                    
                    <div className="h-72 bg-[#F3F5F7] relative overflow-hidden">
                        <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            
                            {product.stock && product.stock < 20 && (
                                <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                                    Low Stock
                                </span>
                            )}
                        </div>

                        
                        <div className="absolute inset-x-4 bottom-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-300">
                        <button 
                            onClick={() => { addToCart(product); toast.success(`Added ${product.name} to cart`); }} 
                            className="w-full bg-palmeGreen text-white font-bold py-3 rounded-xl shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 hover:bg-green-800 transition-colors"
                        >
                            <ShoppingCart size={18} /> Add to Cart
                        </button>
                        </div>
                    </div>

                    
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                            
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{product.category || ""}</p>
                            <div className="flex gap-0.5 text-palmeGold">
                                {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="currentColor" />)}
                            </div>
                        </div>
                        
                        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-palmeGreen transition-colors">{product.name}</h3>
                        <p className="text-gray-500 text-sm mb-4">{product.size}</p>
                        
                        <div className="mt-auto flex justify-between items-center border-t border-gray-50 pt-4">
                            <span className="font-serif font-bold text-2xl text-gray-900">₦{product.price.toLocaleString()}</span>
                        </div>
                    </div>
                </motion.div>
            ))
          )}
       </div>

       {limit && (
           <div className="mt-16 text-center md:hidden">
               <Link to="/shop" className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold shadow-xl">
                   View All Products <ArrowRight size={16} />
               </Link>
           </div>
       )}
    </section>
  );
};

export default ProductShowcase;