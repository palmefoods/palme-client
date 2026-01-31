import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
        navigate('/'); 
        return;
    }

    const fetchOrders = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await axios.get(`${API_URL}/api/orders`);
            // Show only this user's orders
            const myOrders = res.data.filter(o => o.customer.email === user.email);
            setOrders(myOrders);
        } catch (err) {
            console.error("Failed to load orders", err);
        } finally {
            setLoading(false);
        }
    };
    fetchOrders();
  }, [user, navigate]);

  const handleLogout = () => {
      logout();
      navigate('/');
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            
           
            <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-palmeGreen font-bold text-2xl">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <h2 className="font-bold text-gray-900">{user?.name}</h2>
                    <p className="text-sm text-gray-500 mb-6">{user?.email}</p>
                    
                    <button onClick={handleLogout} className="w-full bg-red-50 text-red-500 py-3 rounded-xl hover:bg-red-100 transition-colors font-bold text-sm">
                        Sign Out
                    </button>
                </div>
            </div>

           
            <div className="lg:col-span-3">
                <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6">My Orders</h1>
                
                {loading ? (
                    <div className="text-center py-10 text-gray-400">Loading history...</div>
                ) : orders.length === 0 ? (
                    <div className="bg-white p-10 rounded-2xl text-center border border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                        <Link to="/shop" className="text-palmeGreen font-bold hover:underline">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between mb-4 border-b border-gray-50 pb-4">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Order ID</p>
                                        <p className="font-mono text-gray-800 font-bold">#{order._id.slice(-6).toUpperCase()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-gray-400 uppercase">Date</p>
                                        <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                        order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {order.orderStatus}
                                    </span>
                                    <span className="font-bold text-lg text-palmeGreen">₦{order.totalAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
    <Footer />
    </>
  );
};

export default Dashboard;