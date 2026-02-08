import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Star, Search, Filter, Plus, Minus, Trash2, Eye, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ProductShowcase = ({ limit }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); 

 
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart, decreaseQty, cartItems } = useCart();

  const getPrice = (p) => {
      if (!p.price) return 0;
      return parseFloat(p.price.toString().replace(/,/g, ''));
  };

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
        result.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sortBy === 'high-low') {
        result.sort((a, b) => getPrice(b) - getPrice(a));
    } else {
        result.reverse(); 
    }

    setFilteredProducts(result);
  }, [products, searchTerm, sortBy]);

  const displayedProducts = limit ? products.slice(0, limit) : filteredProducts;
  const getCartItem = (id) => cartItems.find(item => item._id === id);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative">
       
       
       <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
           <div className="animate-fade-in-up">
               <span className="text-palmeGreen font-bold tracking-widest uppercase text-xs bg-green-50 px-3 py-1 rounded-full border border-green-100">
                  Shop The Collection
               </span>
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-4 tracking-tight">
                  Pure. Premium. <span className="text-palmeGreen">Palme.</span>
               </h2>
           </div>

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
                  <p>No products found.</p>
              </div>
          ) : (
            displayedProducts.map((product, index) => {
                const cartItem = getCartItem(product._id);
                return (
                <motion.div 
                    key={product._id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative bg-white rounded-3xl border border-gray-100 hover:border-palmeGreen/30 hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-300 flex flex-col overflow-hidden"
                >
                    <div className="h-72 bg-[#F3F5F7] relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {product.stock < 20 && <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-md">Low Stock</span>}
                            {product.category && <span className="bg-white/80 backdrop-blur text-gray-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-sm">{product.category}</span>}
                        </div>

                        
                        <button 
                            onClick={() => setSelectedProduct(product)}
                            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-gray-400 hover:text-palmeGreen hover:scale-110 transition-all z-20"
                            title="View Details"
                        >
                            <Eye size={18} />
                        </button>

                        
                        <div className="absolute inset-x-4 bottom-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-300 z-10">
                           {cartItem ? (
                               <div className="w-full bg-palmeGreen text-white font-bold py-2 rounded-xl shadow-lg flex items-center justify-between px-4">
                                   <button onClick={() => decreaseQty(product._id)} className="p-1 hover:bg-green-800 rounded-full transition-colors">
                                      {cartItem.qty === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
                                   </button>
                                   <span className="text-lg">{cartItem.qty}</span>
                                   <button onClick={() => addToCart(product)} className="p-1 hover:bg-green-800 rounded-full transition-colors">
                                      <Plus size={16} />
                                   </button>
                               </div>
                           ) : (
                               <button 
                                   onClick={() => { addToCart(product); toast.success(`Added ${product.name}`); }} 
                                   className="w-full bg-white text-gray-900 font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-palmeGreen hover:text-white transition-colors"
                               >
                                   <ShoppingCart size={18} /> Add to Cart
                               </button>
                           )}
                        </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{product.size}</p>
                            <div className="flex gap-0.5 text-palmeGold">
                                {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="currentColor" />)}
                            </div>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-palmeGreen transition-colors line-clamp-1">{product.name}</h3>
                        
                        
                        <p className="text-gray-500 text-xs mb-4 line-clamp-2 h-8">
                            {product.description || "Premium quality palm oil sourced directly from the farm."}
                        </p>

                        <div className="mt-auto flex justify-between items-center border-t border-gray-50 pt-4">
                            <span className="font-serif font-bold text-2xl text-gray-900">₦{Number(product.price).toLocaleString()}</span>
                            {cartItem && <span className="text-xs font-bold text-palmeGreen bg-green-50 px-2 py-1 rounded-lg">{cartItem.qty} in cart</span>}
                        </div>
                    </div>
                </motion.div>
                );
            })
          )}
       </div>

       {limit && (
           <div className="mt-16 text-center md:hidden">
               <Link to="/shop" className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold shadow-xl">
                   View All Products <ArrowRight size={16} />
               </Link>
           </div>
       )}

       
       <AnimatePresence>
            {selectedProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedProduct(null)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    ></motion.div>
                    
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden z-10 flex flex-col md:flex-row"
                    >
                        <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200 z-20">
                            <X size={20} />
                        </button>

                        
                        <div className="w-full md:w-1/2 bg-[#F3F5F7] p-8 flex items-center justify-center">
                            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-auto object-contain max-h-[300px]" />
                        </div>

                        
                        <div className="w-full md:w-1/2 p-8 flex flex-col">
                            <span className="text-palmeGreen text-xs font-bold uppercase tracking-widest mb-2">{selectedProduct.category}</span>
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                            <p className="text-xl font-bold text-gray-900 mb-4">₦{Number(selectedProduct.price).toLocaleString()}</p>
                            
                            <div className="space-y-4 mb-8 flex-1">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Description</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {selectedProduct.description || "Experience the richness of authentic Nigerian palm oil. Unrefined, nutrient-rich, and perfect for traditional dishes."}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Weight</p>
                                        <p className="font-bold text-gray-800">{selectedProduct.weightKg ? `${selectedProduct.weightKg} kg` : 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Size</p>
                                        <p className="font-bold text-gray-800">{selectedProduct.size || 'Standard'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Stock</p>
                                        <p className={`font-bold ${selectedProduct.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                            {selectedProduct.stock > 0 ? `${selectedProduct.stock} units` : 'Out of Stock'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => { addToCart(selectedProduct); toast.success(`Added ${selectedProduct.name}`); setSelectedProduct(null); }}
                                className="w-full bg-palmeGreen text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={20} /> Add to Cart
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
       </AnimatePresence>

    </section>
  );
};

export default ProductShowcase;