import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Printer, ArrowRight, Home, Package } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const { order } = location.state || {};


  if (!order) return <Navigate to="/" />;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 print:bg-white print:p-0">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden print:shadow-none">
        
        
        <div className="bg-palmeGreen p-8 text-center text-white print:bg-white print:text-black print:border-b-2 print:border-black">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 print:hidden">
            <CheckCircle size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-2">Order Confirmed!</h1>
          <p className="opacity-90">Thank you for shopping with Palme Foods.</p>
          <p className="mt-4 font-mono text-sm bg-white/10 inline-block px-4 py-1 rounded-full">
            Order ID: #{order._id.slice(-6).toUpperCase()}
          </p>
        </div>

        
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-start border-b border-gray-100 pb-6">
                <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Customer</h3>
                    <p className="font-bold text-gray-800">{order.customer.name}</p>
                    <p className="text-sm text-gray-500">{order.customer.email}</p>
                </div>
                <div className="text-right">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Delivery Method</h3>
                    <p className="font-bold text-gray-800 capitalize">{order.deliveryMethod}</p>
                    {order.parkLocation && <p className="text-sm text-gray-500">Pickup: {order.parkLocation}</p>}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Items Ordered</h3>
                <div className="space-y-3">
                    {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-2 rounded text-gray-400"><Package size={16}/></div>
                                <div>
                                    <span className="font-bold text-gray-800">{item.name}</span>
                                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                </div>
                            </div>
                            <span className="font-medium text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t-2 border-dashed border-gray-200 pt-4 flex justify-between items-center">
                <span className="font-bold text-lg text-gray-800">Total Paid</span>
                <span className="font-bold text-2xl text-palmeGreen">₦{order.totalAmount.toLocaleString()}</span>
            </div>
        </div>

        
        <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-3 print:hidden">
            <Link to="/" className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-white transition-colors">
                <Home size={18} /> Return Home
            </Link>
            <button onClick={handlePrint} className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-black transition-colors">
                <Printer size={18} /> Print Receipt
            </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;