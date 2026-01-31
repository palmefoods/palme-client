import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faTimes, faSignOutAlt, faHistory, faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo-green.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const { setIsCartOpen, cartItems } = useCart();
  const { user, logout, openAuthModal } = useAuth(); 
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
        window.removeEventListener('scroll', onScroll);
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
      logout();
      setDropdownOpen(false);
      navigate('/');
  };

  
  const navLinks = ['Home','About', 'Shop', 'Gallery', 'Testimonials', 'FAQ', 'Contact'];

  return (
    <>
      <nav className={`sticky top-0 z-[50] transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-white py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          
          <Link to="/" className="z-50 flex items-center">
            <img 
               src={logo} 
               alt="PalmeFoods" 
               className="h-24 md:h-28 w-auto min-w-[120px] object-contain object-left" 
            />
          </Link>

          
          <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
            {navLinks.map((item) => (
              <Link 
                key={item} 
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="font-bold text-sm text-gray-700 hover:text-palmeGreen transition-colors uppercase tracking-widest relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-palmeGreen transition-all group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
          </div>

          
          <div className="hidden md:flex items-center gap-6">
            
            
            {user ? (
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 text-sm font-bold text-palmeGreen transition-colors uppercase tracking-wider border border-green-100 px-3 py-1.5 rounded-full hover:bg-green-50"
                    >
                        <FontAwesomeIcon icon={faUser} className="text-xs" />
                        <span>Hi, {user.name.split(' ')[0]}</span>
                        <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in-up">
                            <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Signed in as</p>
                                <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                            </div>
                            
                            <Link 
                                to="/dashboard" 
                                onClick={() => setDropdownOpen(false)}
                                className="px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-palmeGreen flex items-center gap-3 transition-colors font-medium"
                            >
                                <FontAwesomeIcon icon={faHistory} /> My Dashboard
                            </Link>

                            <button 
                                onClick={handleLogout} 
                                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors font-medium"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => openAuthModal('login')}
                        className="text-sm font-bold text-gray-900 hover:text-palmeGreen transition-colors"
                    >
                        Log In
                    </button>
                    <button 
                        onClick={() => openAuthModal('signup')}
                        className="bg-palmeGreen text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-green-900/10 hover:bg-green-800 transition-all transform hover:-translate-y-0.5 text-xs tracking-widest uppercase"
                    >
                        Sign Up
                    </button>
                </div>
            )}
            
            
            <div 
              className="relative cursor-pointer group w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-gray-800 group-hover:text-palmeRed transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-palmeRed text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>

          
          <button 
            className="md:hidden z-[60] text-palmeGreen"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
      </nav>

      
      <div 
        className={`fixed inset-0 z-[9990] bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`} 
        onClick={() => setIsOpen(false)}
      ></div>
      
      
      <div 
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[9999] shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-32 overflow-y-auto">
          
          <div className="flex flex-col space-y-5 text-lg font-bold text-gray-800 font-serif">
            {navLinks.map((item) => (
              <Link 
                key={item} 
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="border-b border-gray-100 pb-3 hover:text-palmeGreen flex justify-between items-center"
              >
                {item}
                <span className="text-gray-300 text-sm">→</span>
              </Link>
            ))}
             <Link 
                to="/bulk-orders"
                onClick={() => setIsOpen(false)}
                className="border-b border-gray-100 pb-3 hover:text-palmeGreen flex justify-between items-center text-palmeGreen"
              >
                Bulk / Wholesale
                <span className="text-gray-300 text-sm">→</span>
              </Link>
          </div>
          
          <div className="mt-auto space-y-4 pt-8">
            <button 
              onClick={() => { setIsOpen(false); setIsCartOpen(true); }}
              className="w-full py-4 bg-gray-50 text-gray-900 font-bold rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Cart ({cartItems.length})
            </button>
            
            {user ? (
                 <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Signed in as</p>
                            <p className="font-bold text-palmeGreen text-lg">{user.name}</p>
                        </div>
                    </div>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block w-full text-center bg-white border border-gray-200 py-3 rounded-lg font-bold text-gray-700 mb-3 hover:bg-gray-50">
                        My Dashboard
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-center bg-red-100 text-red-600 py-3 rounded-lg font-bold hover:bg-red-200">
                        Logout
                    </button>
                 </div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => { setIsOpen(false); openAuthModal('login'); }}
                        className="py-4 border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
                    >
                        Log In
                    </button>
                    <button 
                        onClick={() => { setIsOpen(false); openAuthModal('signup'); }}
                        className="py-4 bg-palmeGreen text-white font-bold rounded-lg shadow-lg hover:bg-green-800"
                    >
                        Sign Up
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;