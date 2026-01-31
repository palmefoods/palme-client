import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react'; 
import logo from '../assets/logo-green.png';
import Navbar from './Navbar';
import Footer from './Footer';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { resetToken } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
    }
    setLoading(true);

    try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        await axios.put(`${API_URL}/api/auth/resetpassword/${resetToken}`, { password });
        toast.success("Password Updated! Please Login.");
        navigate('/');
    } catch (err) {
        const msg = err.response?.data?.message || "Error resetting password";
        toast.error(msg);
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-20">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md text-center border border-gray-100">
            <img src={logo} alt="Palme" className="h-20 mx-auto mb-6 object-contain" />
            <h2 className="text-2xl font-serif font-bold mb-2 text-gray-800">Set New Password</h2>
            <p className="text-gray-500 mb-8 text-sm">Please create a strong password for your account.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
                
                
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="New Password" 
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-palmeGreen focus:ring-1 focus:ring-palmeGreen transition-all pr-12"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-4 text-gray-400 hover:text-palmeGreen"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                
                <div className="relative">
                    <input 
                        type={showConfirm ? "text" : "password"} 
                        placeholder="Confirm Password" 
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-palmeGreen focus:ring-1 focus:ring-palmeGreen transition-all pr-12"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                    <button 
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-4 text-gray-400 hover:text-palmeGreen"
                    >
                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <button 
                    disabled={loading}
                    className="w-full bg-palmeGreen text-white py-4 rounded-xl font-bold hover:bg-green-800 transition-colors shadow-lg shadow-green-900/10"
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    </div>
    <Footer />
    </>
  );
};

export default ResetPassword;