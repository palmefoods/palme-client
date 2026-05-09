import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [deliveryType, setDeliveryType] = useState('doorstep'); 
  const [selectedLocation, setSelectedLocation] = useState(null); 

  useEffect(() => {
    const savedCart = localStorage.getItem('palme_cart');
    if (savedCart) {
        setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('palme_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => 
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      
      
      const initialQty = (product.isBulkSupply && product.bulkMinQty > 0) ? product.bulkMinQty : 1;
        
      return [...prev, { ...product, qty: initialQty }];
    });
  };
  
  const decreaseQty = (id) => {
    setCartItems(prev => {
        const existing = prev.find(item => item._id === id);
        
        
        const minRequired = existing.isBulkSupply ? (existing.bulkMinQty || 1) : 1;

        if (existing.isBulkSupply && existing.qty <= minRequired) {
            return prev; 
        }

        if (existing.qty === 1) {
            return prev.filter(item => item._id !== id); 
        }
        return prev.map(item => 
            item._id === id ? { ...item, qty: item.qty - 1 } : item
        );
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const clearCart = () => {
      setCartItems([]);
      localStorage.removeItem('palme_cart');
  };

  const cartTotal = cartItems.reduce((acc, item) => {
    const activePrice = (item.isWholesale && item.qty >= item.moq) ? item.wholesalePrice : item.price;
    return acc + (activePrice * item.qty);
  }, 0);
  
  const totalWeight = cartItems.reduce((acc, item) => acc + ((item.weightKg || 1) * item.qty), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      decreaseQty,
      removeFromCart,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      cartTotal,
      totalWeight,
      deliveryType,
      setDeliveryType,
      selectedLocation,
      setSelectedLocation
    }}>
      {children}
    </CartContext.Provider>
  );
};