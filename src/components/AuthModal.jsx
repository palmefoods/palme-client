import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react'; 
import toast from 'react-hot-toast';

const AuthModal = () => {
  const { showAuthModal, setShowAuthModal, activeTab, login } = useAuth();
  
  const [view, setView] = useState(activeTab || 'login'); 
  const [loading, setLoading] = useState(false);
  
  
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [forgotEmail, setForgotEmail] = useState('');

  useEffect(() => {
    if(activeTab) setView(activeTab);
  }, [activeTab]);

  if (!showAuthModal) return null;

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return; 

    setLoading(true);
    try {
      const endpoint = view === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await axios.post(`${API_URL}${endpoint}`, formData);
      
      if (res.data && res.data.token) {
          login(res.data.user, res.data.token);
          setShowAuthModal(false);
          toast.success(`Welcome ${res.data.user.name}!`);
      }
    } catch (err) {
      console.error("Login Error:", err);
      const msg = err.response?.data?.message || "Authentication failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
        await axios.post(`${API_URL}/api/auth/forgotpassword`, { email: forgotEmail });
        toast.success("Check your email for the reset link!");
        setView('login'); 
    } catch (err) {
        const serverMessage = err.response?.data?.message;
        if (err.response?.status === 500) {
            toast.error("System error. Please try again later.");
        } else {
            toast.error(serverMessage || "Failed to send email");
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-fade-in-up">
        
        <button 
          onClick={() => setShowAuthModal(false)} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 bg-gray-50 rounded-full z-10"
        >
          <X size={20} />
        </button>

        {view === 'forgot' ? (
             <div className="p-8">
                <button onClick={() => setView('login')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-palmeGreen mb-6">
                    <ArrowLeft size={16} /> Back to Login
                </button>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Reset Password</h2>
                <p className="text-gray-500 mb-6 text-sm">Enter your email and we'll send you a link to reset your password.</p>
                
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full pl-12 p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-palmeGreen transition-colors"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full bg-palmeGreen text-white py-3 rounded-xl font-bold hover:bg-green-800 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
             </div>
        ) : (
            <div className="p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                    {view === 'login' ? 'Welcome Back' : 'Join Palme Foods'}
                    </h2>
                    <p className="text-gray-500 text-sm">
                    {view === 'login' ? 'Enter your details to access your account' : 'Create an account to start shopping'}
                    </p>
                </div>

                <div className="flex bg-gray-50 p-1 rounded-xl mb-8">
                    <button 
                    onClick={() => setView('login')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${view === 'login' ? 'bg-white text-palmeGreen shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                    Log In
                    </button>
                    <button 
                    onClick={() => setView('signup')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${view === 'signup' ? 'bg-white text-palmeGreen shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                    Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {view === 'signup' && (
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input 
                        name="name"
                        placeholder="Full Name" 
                        className="w-full pl-12 p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-palmeGreen transition-colors"
                        onChange={handleChange}
                        required
                        />
                    </div>
                    )}

                    <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input 
                        name="email"
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full pl-12 p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-palmeGreen transition-colors"
                        onChange={handleChange}
                        required
                    />
                    </div>

                    
                    <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input 
                        name="password"
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password" 
                        className="w-full pl-12 pr-12 p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-palmeGreen transition-colors"
                        onChange={handleChange}
                        required
                    />
                    
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3.5 text-gray-400 hover:text-palmeGreen"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    </div>

                    {view === 'signup' && (
                    <div className="relative">
                        <input 
                        name="phone"
                        type="tel" 
                        placeholder="Phone Number (Optional)" 
                        className="w-full pl-4 p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-palmeGreen transition-colors"
                        onChange={handleChange}
                        />
                    </div>
                    )}

                    {view === 'login' && (
                    <div className="text-right">
                        <button type="button" onClick={() => setView('forgot')} className="text-xs font-bold text-gray-400 hover:text-palmeGreen transition-colors">
                        Forgot Password?
                        </button>
                    </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full bg-palmeGreen text-white py-3 rounded-xl font-bold hover:bg-green-800 transition-colors shadow-lg shadow-green-900/10 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Please wait...' : (view === 'login' ? 'Sign In' : 'Create Account')}
                    </button>
                </form>
            </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;