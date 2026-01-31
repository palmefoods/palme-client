import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faTruck, faMapMarkerAlt, faInfoCircle, faImage, faArrowRight } from '@fortawesome/free-solid-svg-icons'; 
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { 
    isCartOpen, setIsCartOpen, cartItems, removeFromCart, cartTotal, 
    deliveryType, setDeliveryType, selectedLocation, setSelectedLocation 
  } = useCart();

  const [parks, setParks] = useState([]);
  const [loadingParks, setLoadingParks] = useState(false);

  useEffect(() => {
    const fetchParks = async () => {
      setLoadingParks(true);
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/locations`);
        setParks(res.data);
      } catch (err) {
        console.error("Failed to load parks", err);
      } finally {
        setLoadingParks(false);
      }
    };
    if (isCartOpen) fetchParks();
  }, [isCartOpen]);

  return (
    <>
      
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col transform transition-transform duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        
        
        <div className="p-6 bg-palmeGreen text-white flex justify-between items-center shadow-md">
          <h2 className="text-xl font-bold font-serif tracking-wide">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="hover:text-red-200 transition-colors bg-white/10 w-8 h-8 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400 mt-20 flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                 <FontAwesomeIcon icon={faTruck} size="2x" className="text-gray-200" />
              </div>
              <p className="font-bold text-gray-500">Your cart is empty.</p>
              <button onClick={() => setIsCartOpen(false)} className="mt-4 text-palmeGreen font-bold underline hover:text-green-800">Start Shopping</button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex gap-4 border-b border-gray-100 pb-4">
                
                
                <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 relative overflow-hidden">
                   {item.image ? (
                     <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                   ) : (
                     <FontAwesomeIcon icon={faImage} size="2x" />
                   )}
                </div>
                
                
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 font-serif">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.size}</p>
                  <p className="text-palmeGreen font-bold mt-1">₦{item.price.toLocaleString()}</p>
                </div>
                
                
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(item._id)} className="text-gray-300 hover:text-red-500 transition-colors">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <span className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded text-xs">x{item.qty}</span>
                </div>
              </div>
            ))
          )}

          
          {cartItems.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-8">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <FontAwesomeIcon icon={faTruck} className="text-palmeGreen"/> Delivery Method
              </h3>
              
              <div className="flex bg-white p-1 rounded-lg border border-gray-200 mb-4 shadow-sm">
                <button 
                  onClick={() => setDeliveryType('doorstep')}
                  className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${deliveryType === 'doorstep' ? 'bg-palmeGreen text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  Doorstep
                </button>
                <button 
                  onClick={() => setDeliveryType('park')}
                  className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${deliveryType === 'park' ? 'bg-palmeGreen text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  Park Pickup
                </button>
              </div>

              {deliveryType === 'doorstep' && (
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100 flex gap-3">
                    <FontAwesomeIcon icon={faInfoCircle} className="mt-1 text-blue-500 shrink-0"/>
                    <span className="text-xs leading-relaxed">Shipping fees are calculated based on total weight. You will be contacted by our logistics team after checkout.</span>
                </div>
              )}

              {deliveryType === 'park' && (
                <div className="space-y-3">
                  {loadingParks ? (
                    <p className="text-xs text-gray-400">Loading parks...</p>
                  ) : (
                    <>
                      <label className="block text-xs font-bold text-gray-700 uppercase flex items-center gap-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> Select Pickup Location
                      </label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-palmeGreen focus:border-transparent outline-none"
                        onChange={(e) => {
                          const park = parks.find(p => p._id === e.target.value);
                          setSelectedLocation(park);
                        }}
                      >
                        <option value="">-- Choose a Park --</option>
                        {parks.map(park => (
                          <option key={park._id} value={park._id}>
                            {park.state} - {park.parkName}
                          </option>
                        ))}
                      </select>

                      {selectedLocation && (
                         <div className="mt-2 bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-sm animate-pulse">
                            <p className="font-bold text-yellow-800 text-xs uppercase mb-1">Pickup Instruction:</p>
                            <p className="text-gray-700 text-xs">{selectedLocation.adminNote}</p>
                            <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold">{selectedLocation.address}</p>
                         </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-palmeGreen">₦{cartTotal.toLocaleString()}</span>
            </div>
            <Link 
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-palmeGreen hover:bg-green-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Proceed to Checkout <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;