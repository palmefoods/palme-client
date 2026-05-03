import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus, Truck, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    removeFromCart, 
    cartTotal, 
    addToCart, 
    decreaseQty,
    deliveryType,
    setDeliveryType 
  } = useCart();
  
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col transform transition-transform duration-300">
        
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-palmeGreen" />
            <span className="font-bold text-lg font-serif">Your Cart ({cartItems.length})</span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingBag size={32} className="text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">Your cart is currently empty.</p>
              <button 
                onClick={() => { setIsCartOpen(false); navigate('/shop'); }}
                className="text-palmeGreen font-bold hover:underline"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
             
              const isWholesaleActive = item.isWholesale && item.qty >= item.moq;
              const activePrice = isWholesaleActive ? item.wholesalePrice : item.price;

              return (
              <div key={item._id} className="flex gap-4 animate-fade-in">
                <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 border border-gray-100 p-2">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-800 font-serif leading-tight">{item.name}</h3>
                      <button onClick={() => removeFromCart(item._id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{item.size}</p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    {/* 🚀 DISPLAY ACTIVE PRICE AND BADGE */}
                    <div className="flex flex-col">
                        <span className="font-bold text-palmeGreen">₦{Number(activePrice).toLocaleString()}</span>
                        {isWholesaleActive && <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded mt-0.5 uppercase tracking-wider">Wholesale</span>}
                    </div>
                    
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
                      <button 
                        onClick={() => decreaseQty(item._id)}
                        className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-palmeGreen transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-palmeGreen transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )})
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="mb-6 bg-white p-1 rounded-xl border border-gray-200 flex">
               <button 
                  onClick={() => setDeliveryType('doorstep')}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${deliveryType === 'doorstep' ? 'bg-palmeGreen text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
               >
                  <Truck size={16} /> Delivery
               </button>
               <button 
                  onClick={() => setDeliveryType('park')}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${deliveryType === 'park' ? 'bg-palmeGreen text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
               >
                  <MapPin size={16} /> Pickup
               </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">₦{cartTotal.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-400 text-center">Shipping calculated at checkout</p>
            </div>

            <Link 
              to="/checkout" 
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-palmeGreen text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/10 flex items-center justify-center gap-2 hover:bg-green-800 transition-colors"
            >
              Checkout Now <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;