import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Truck, MapPin, X, Calendar, CreditCard, ChevronRight, User } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!user) {
        navigate('/'); 
        return;
    }

    const fetchOrders = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await axios.get(`${API_URL}/api/orders`);
            
           
           
            const myOrders = res.data.filter(o => 
                o.customer.email.toLowerCase() === user.email.toLowerCase()
            );
            
           
            myOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
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

  const getStatusColor = (status) => {
      switch(status) {
          case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
          case 'Shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
          case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
          default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100 sticky top-24">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-palmeGreen border border-green-100">
                        <User size={32} />
                    </div>
                    <h2 className="font-bold text-gray-900 text-lg">{user?.name}</h2>
                    <p className="text-sm text-gray-500 mb-6">{user?.email}</p>
                    
                    <button onClick={handleLogout} className="w-full bg-white border border-gray-200 text-gray-600 py-3 rounded-xl hover:bg-gray-50 hover:text-red-500 transition-colors font-bold text-sm">
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Order History</h1>
                
                {loading ? (
                    <div className="space-y-4">
                        {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>)}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl text-center border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="text-gray-300" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No orders yet</h3>
                        <p className="text-gray-500 mb-6">Looks like you haven't bought anything yet.</p>
                        <Link to="/shop" className="inline-block bg-palmeGreen text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-50 pb-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-mono font-bold text-gray-900">#{order._id.slice(-6).toUpperCase()}</span>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(order.orderStatus)}`}>
                                                {order.orderStatus}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Calendar size={12} />
                                            {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <p className="text-xs font-bold text-gray-400 uppercase">Total</p>
                                        <p className="font-bold text-xl text-palmeGreen">₦{order.totalAmount.toLocaleString()}</p>
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <div className="flex -space-x-3 overflow-hidden">
                                        {/* Show generic item icons if no images, or implement image saving in order later */}
                                        {order.items.slice(0, 3).map((item, idx) => (
                                            <div key={idx} className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">
                                                {item.name.charAt(0)}
                                            </div>
                                        ))}
                                        {order.items.length > 3 && (
                                            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                                                +{order.items.length - 3}
                                            </div>
                                        )}
                                    </div>
                                    <button 
                                        onClick={() => setSelectedOrder(order)}
                                        className="text-sm font-bold text-gray-900 hover:text-palmeGreen flex items-center gap-1 transition-colors"
                                    >
                                        View Details <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>

    {/* ORDER DETAILS MODAL */}
    {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
            <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
                
                {/* Modal Header */}
                <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-gray-900">Order Details</h2>
                        <p className="text-gray-500 text-sm">#{selectedOrder._id.slice(-6).toUpperCase()}</p>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    
                    {/* Status Bar */}
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className={`w-3 h-3 rounded-full ${selectedOrder.orderStatus === 'Delivered' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Status: {selectedOrder.orderStatus}</p>
                            <p className="text-xs text-gray-500">
                                {selectedOrder.orderStatus === 'Pending' && 'We are processing your order.'}
                                {selectedOrder.orderStatus === 'Shipped' && 'Your order is on the way.'}
                                {selectedOrder.orderStatus === 'Delivered' && 'Package delivered successfully.'}
                            </p>
                        </div>
                    </div>

                    {/* Items List */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Package size={16} /> Items ({selectedOrder.items.length})
                        </h3>
                        <div className="space-y-4">
                            {selectedOrder.items.map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 font-bold">
                                            {item.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{item.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity || item.qty} | {item.size}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-gray-900">₦{(item.price * (item.quantity || item.qty)).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Truck size={16} /> Delivery Info
                            </h3>
                            <div className="text-sm text-gray-700 space-y-1">
                                <p className="font-bold capitalize">{selectedOrder.deliveryMethod}</p>
                                {selectedOrder.deliveryMethod === 'park' ? (
                                    <p className="bg-green-50 text-palmeGreen px-2 py-1 rounded-md inline-block font-bold text-xs mt-1">
                                        Pickup at: {selectedOrder.parkLocation}
                                    </p>
                                ) : (
                                    <p>{selectedOrder.customer.address}</p>
                                )}
                                <p className="text-gray-500">{selectedOrder.customer.phone}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <CreditCard size={16} /> Payment Info
                            </h3>
                            <div className="text-sm text-gray-700 space-y-1">
                                <p>Ref: <span className="font-mono text-xs">{selectedOrder.paymentReference}</span></p>
                                <p className="text-gray-500">Paid via Paystack</p>
                                <p className="font-bold text-lg text-palmeGreen mt-2">Total: ₦{selectedOrder.totalAmount.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button 
                        onClick={() => window.location.href="https://wa.me/+2349134033103"}
                        className="text-gray-500 font-bold hover:text-palmeGreen text-sm"
                    >
                        Need Help?
                    </button>
                </div>
            </div>
        </div>
    )}

    <Footer />
    </>
  );
};

export default Dashboard;