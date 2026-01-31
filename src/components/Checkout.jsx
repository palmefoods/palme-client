import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PaystackButton } from 'react-paystack'; 
import { useAuth } from '../context/AuthContext';
import { ChevronRight, HelpCircle, Lock, AlertCircle, Wifi, Tag } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Checkout = () => {
    const { cartItems = [], cartTotal = 0, deliveryType = 'doorstep', setDeliveryType, selectedLocation, setSelectedLocation, clearCart } = useCart();
    const { user, setShowAuthModal } = useAuth();
    const navigate = useNavigate();

    // Form State
    const [email, setEmail] = useState(user?.email || '');
    const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '');
    const [lastName, setLastName] = useState(user?.name?.split(' ')[1] || '');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState(user?.phone || '');
    const [selectedState, setSelectedState] = useState(selectedLocation?.state || '');

    // Discount State
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);

    // Data State
    const [parks, setParks] = useState([]);
    const [settings, setSettings] = useState({
        doorstep_price: 10000,
        park_price: 5000,
        doorstep_note: "Shipping fees are calculated based on weight.",
        park_note: "Please bring a valid ID for pickup."
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const parksRes = await axios.get(`${API_URL}/api/locations`);
                if (Array.isArray(parksRes.data)) setParks(parksRes.data);

                const settingsRes = await axios.get(`${API_URL}/api/settings`);
                if (settingsRes.data) {
                const settingsObj = Array.isArray(settingsRes.data) 
                    ? settingsRes.data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {})
                    : settingsRes.data;
                setSettings(prev => ({ ...prev, ...settingsObj }));
                }
            } catch (err) { console.error("Data Load Error:", err); }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if(user) {
            if(!email) setEmail(user.email);
            if(!firstName) setFirstName(user.name?.split(' ')[0] || '');
            if(!phone) setPhone(user.phone);
        }
    }, [user]);

    useEffect(() => {
        if (selectedLocation && selectedLocation.state) {
            setSelectedState(selectedLocation.state);
        }
    }, [selectedLocation]);

    // Calculations
    const filteredParks = Array.isArray(parks) ? parks.filter(p => p?.state?.toLowerCase() === selectedState.toLowerCase()) : [];
    const shippingFee = deliveryType === 'doorstep' ? Number(settings.doorstep_price) : Number(settings.park_price);
    
    // ✅ TOTAL CALCULATION
    const finalTotal = (cartTotal || 0) + shippingFee - discount;

    const [reference] = useState((new Date()).getTime().toString());

    // ✅ FIXED COUPON LOGIC
    const handleApplyCoupon = () => {
        // 1. Check if empty
        if (!couponCode.trim()) {
            toast.error("Please enter a coupon code first.");
            return;
        }

        let totalDiscount = 0;
        let applied = false;

        cartItems.forEach(item => {
            // Check if item has a discount code AND a discount price set in Admin
            if (item.discountCode && 
                item.discountCode.trim().toLowerCase() === couponCode.trim().toLowerCase() &&
                item.discountPrice) {
                
                // Calculate Savings: (Regular Price - Discount Price) * Qty
                // Example: (1200 - 1000) * 1 = 200 savings
                const savingsPerUnit = item.price - item.discountPrice;
                
                if (savingsPerUnit > 0) {
                    totalDiscount += (savingsPerUnit * item.qty);
                    applied = true;
                }
            }
        });

        if (applied) {
            setDiscount(totalDiscount);
            toast.success(`Coupon Applied! You saved ₦${totalDiscount.toLocaleString()}`);
        } else {
            toast.error("Invalid coupon code, or it doesn't apply to items in your cart.");
            setDiscount(0);
        }
    };

    const handlePaystackSuccessAction = async (reference) => {
        toast.success("Payment Verified! Creating Order...", { duration: 4000 });

        const orderData = {
            paymentReference: reference.reference, 
            customer: { name: `${firstName} ${lastName}`, email, phone, address },
            items: cartItems,
            deliveryMethod: deliveryType,
            parkLocation: selectedLocation ? (selectedLocation.name || selectedLocation.parkName) : '',
            totalAmount: finalTotal // ✅ Save the discounted amount
        };

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            
            const response = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Order Placed Successfully!");
                if(clearCart) clearCart(); 
                toast.dismiss();
                setTimeout(() => navigate('/order-success', { state: { order: data.order } }), 2000);
            } else {
                throw new Error(data.message || "Server Error");
            }
        } catch (err) {
            console.error("ORDER SAVE ERROR:", err);
            toast.error(`Order Failed: ${err.message}`);
        }
    };

    const componentProps = {
        email,
        amount: finalTotal * 100, 
        metadata: { custom_fields: [{ display_name: "Delivery", variable_name: "delivery", value: deliveryType }] },
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY, 
        text: "Pay Now",
        onSuccess: handlePaystackSuccessAction,
        onClose: () => toast("Payment cancelled"),
        reference: reference, 
    };

    const isFormValid = () => {
        if (!email) return false;
        if (deliveryType === 'doorstep' && !address) return false;
        if (deliveryType === 'park' && !selectedLocation) return false;
        return true;
    };

    const handleValidationFail = () => {
        if (!email) toast.error("Enter email");
        else if (deliveryType === 'doorstep' && !address) toast.error("Enter address");
        else if (deliveryType === 'park' && !selectedLocation) toast.error("Select park");
    };

    const testConnection = async () => {
        const toastId = toast.loading("Testing connection...");
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await fetch(API_URL);
            toast.success("Server Connected!", { id: toastId });
        } catch (e) {
            toast.error("Server Disconnected", { id: toastId });
        }
    };

    const nigerianStates = [
        "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans text-gray-800 flex justify-center items-start">
        <Toaster position="top-center" />

        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-200">
            
            {/* LEFT COLUMN: FORM */}
            <div className="w-full lg:w-[58%] lg:pr-14 lg:pl-10 pt-10 pb-12 px-6 order-2 lg:order-1 bg-white">
                
                <div className="mb-6 flex justify-between items-center">
                    <Link to="/" className="text-3xl font-serif font-bold text-gray-900 tracking-tight hover:text-palmeGreen transition-colors">
                        Palme Foods
                    </Link>
                    <button onClick={testConnection} className="text-xs flex items-center gap-1 text-gray-400 hover:text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        <Wifi size={12}/> Test
                    </button>
                </div>

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-medium mb-8 text-gray-500">
                    <Link to="/shop" className="text-palmeGreen hover:underline">Cart</Link> 
                    <ChevronRight size={12} />
                    <span className="text-gray-900">Information</span> 
                    <ChevronRight size={12} />
                    <span>Shipping</span> 
                    <ChevronRight size={12} />
                    <span>Payment</span>
                </div>

                <section className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-800">Contact</h2>
                        {!user && <div className="text-sm">Already have an account? <button onClick={() => setShowAuthModal(true)} className="text-palmeGreen font-bold underline">Log in</button></div>}
                    </div>
                    <input type="email" placeholder="Email or mobile phone number" className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-palmeGreen outline-none text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
                </section>

                {/* Delivery Method */}
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Delivery Method</h2>
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <div 
                            className={`flex items-center justify-between p-4 cursor-pointer border-b border-gray-200 ${deliveryType === 'park' ? 'bg-palmeGreen/10' : 'bg-white'}`}
                            onClick={() => setDeliveryType('park')}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${deliveryType === 'park' ? 'border-palmeGreen bg-palmeGreen' : 'border-gray-300 bg-white'}`}>
                                    {deliveryType === 'park' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                </div>
                                <span className="text-sm font-bold text-gray-800">Park Pickup</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">₦{Number(settings.park_price).toLocaleString()}</span>
                        </div>

                        <div 
                            className={`flex items-center justify-between p-4 cursor-pointer ${deliveryType === 'doorstep' ? 'bg-palmeGreen/10' : 'bg-white'}`}
                            onClick={() => setDeliveryType('doorstep')}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${deliveryType === 'doorstep' ? 'border-palmeGreen bg-palmeGreen' : 'border-gray-300 bg-white'}`}>
                                    {deliveryType === 'doorstep' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                </div>
                                <span className="text-sm font-bold text-gray-800">Doorstep Delivery</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">₦{Number(settings.doorstep_price).toLocaleString()}</span>
                        </div>
                    </div>
                </section>

                <div className="mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3 animate-fade-in">
                    <div className="mt-0.5 text-blue-500"><AlertCircle size={18} /></div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                        <span className="font-bold text-blue-800 block mb-1">
                            {deliveryType === 'doorstep' ? 'Delivery Note:' : 'Pickup Instruction:'}
                        </span>
                        {deliveryType === 'doorstep' ? settings.doorstep_note : settings.park_note}
                    </div>
                </div>

                {/* Shipping Address */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Shipping Address</h2>
                    <div className="space-y-3">
                        <div className="relative">
                            <select 
                                className="w-full p-3.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-palmeGreen text-sm bg-white appearance-none"
                                value={selectedState}
                                onChange={(e) => { setSelectedState(e.target.value); setSelectedLocation(null); }}
                            >
                                <option value="">Select State</option>
                                {nigerianStates.map(state => (<option key={state} value={state}>{state}</option>))}
                            </select>
                            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={16} />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="First name" className="w-full p-3.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-palmeGreen text-sm" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                            <input type="text" placeholder="Last name" className="w-full p-3.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-palmeGreen text-sm" value={lastName} onChange={e => setLastName(e.target.value)}/>
                        </div>
                        
                        <div className="relative">
                            <input type="text" placeholder="Phone Number" className="w-full p-3.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-palmeGreen text-sm" value={phone} onChange={e => setPhone(e.target.value)}/>
                        </div>

                        {deliveryType === 'park' ? (
                            <div className={`p-4 rounded-lg border ${!selectedState ? 'bg-gray-100 border-gray-200' : 'bg-palmeGreen/5 border-palmeGreen/30'}`}>
                                {!selectedState ? (
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <AlertCircle size={16} />
                                        <span>Please select a state above to see available parks.</span>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="text-xs font-bold text-palmeGreen uppercase mb-2 block">Available Parks in {selectedState}</label>
                                        <select 
                                            className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white outline-none focus:border-palmeGreen"
                                            value={selectedLocation ? selectedLocation._id : ''}
                                            onChange={(e) => setSelectedLocation(parks.find(p => p._id === e.target.value))}
                                        >
                                            <option value="">-- Select a Park --</option>
                                            {filteredParks.map(park => (
                                                <option key={park._id} value={park._id}>{park.name || park.parkName} ({park.address})</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <input type="text" placeholder="Street Address" className="w-full p-3.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-palmeGreen text-sm" value={address} onChange={e => setAddress(e.target.value)}/>
                        )}
                    </div>
                </section>

                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-200">
                    <Link to="/shop" className="text-sm text-palmeGreen font-medium cursor-pointer hover:text-green-800 flex items-center gap-1">
                        &lt; Return to cart
                    </Link>
                    {isFormValid() ? (
                        <PaystackButton 
                            className="w-full sm:w-auto bg-palmeGreen hover:bg-green-800 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all text-sm uppercase tracking-widest"
                            {...componentProps} 
                        />
                    ) : (
                        <button 
                            onClick={handleValidationFail}
                            className="w-full sm:w-auto bg-gray-400 text-white font-bold py-4 px-10 rounded-xl cursor-not-allowed text-sm uppercase tracking-widest"
                        >
                            Pay Now
                        </button>
                    )}
                </div>
            </div>

            {/* RIGHT COLUMN: SUMMARY */}
            <div className="w-full lg:w-[42%] bg-[#FAFAFA] border-l border-gray-200 pt-10 px-6 lg:pl-10 lg:pr-14 order-1 lg:order-2">
                <div className="lg:sticky lg:top-10 max-w-md mx-auto lg:mx-0">
                    <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-xl border border-gray-200 bg-white flex items-center justify-center overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                                        </div>
                                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                            {item.qty}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-800 font-serif">{item.name}</h3>
                                        <p className="text-xs text-gray-500">{item.size}</p>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-800">₦{(item.price * item.qty).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 pb-6 border-b border-gray-200">
                        {/* COUPON INPUT */}
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Tag className="absolute left-3 top-2.5 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Gift card or discount code" 
                                    className="w-full pl-9 p-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-palmeGreen uppercase"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                            </div>
                            <button 
                                onClick={handleApplyCoupon}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${couponCode ? 'bg-gray-800 text-white hover:bg-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                disabled={!couponCode}
                            >
                                Apply
                            </button>
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-600 pt-2">
                            <span>Subtotal</span>
                            <span className="font-medium text-gray-900">₦{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <span>Shipping</span>
                                <HelpCircle size={12} className="text-gray-400" />
                            </div>
                            <span className="font-medium text-gray-900">₦{shippingFee.toLocaleString()}</span>
                        </div>
                        
                        {/* DISCOUNT ROW */}
                        {discount > 0 && (
                            <div className="flex justify-between text-sm text-palmeGreen font-bold animate-fade-in">
                                <span>Discount</span>
                                <span>-₦{discount.toLocaleString()}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center pt-6">
                        <span className="text-lg font-bold text-gray-800">Total</span>
                        <div className="text-right">
                            <span className="text-xs text-gray-500 mr-2 font-medium">NGN</span>
                            <span className="text-3xl font-serif font-bold text-palmeGreen">₦{finalTotal.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-xs">
                        <Lock size={12} />
                        <span>Secured by Paystack</span>
                    </div>
                </div>
            </div>

        </div>
        </div>
    );
};

export default Checkout;