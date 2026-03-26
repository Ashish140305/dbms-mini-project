import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CreditCard, Smartphone, Building2, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SeatMatrix from '../components/SeatMatrix';
import TicketReceipt from '../components/TicketReceipt'; // Import the new ticket!

export default function Checkout() {
  const navigate = useNavigate();
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const bookedSeats = ['C4', 'C5', 'A1', 'E10', 'F6']; 
  
  // Payment States
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  
  // 3D Card States
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const getSeatDetails = (seatId) => {
    const row = seatId.charAt(0);
    if (['A', 'B'].includes(row)) return { tier: 'VIP Recliner', price: 500, bg: 'bg-yellow-500', shadow: 'rgba(234,179,8,0.6)' };
    if (['C', 'D', 'E'].includes(row)) return { tier: 'Premium', price: 250, bg: 'bg-red-600', shadow: 'rgba(220,38,38,0.6)' };
    return { tier: 'Standard', price: 150, bg: 'bg-blue-600', shadow: 'rgba(37,99,235,0.6)' };
  };

  const subtotal = selectedSeats.reduce((total, seatId) => total + getSeatDetails(seatId).price, 0);
  const convenienceFee = selectedSeats.length > 0 ? (selectedSeats.length * 30) : 0;
  const totalAmount = subtotal + convenienceFee;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowReceipt(true);
    }, 2500);
  };

  // Prepare dummy booking data for the receipt
  const receiptData = {
    id: `BK${Math.floor(Math.random() * 90000) + 10000}X`,
    movie: "Interstellar",
    format: "IMAX 3D",
    cinema: "INOX: R-City Mall",
    date: "Today",
    time: "09:30 PM",
    seats: selectedSeats.join(', '),
    amount: `₹${totalAmount}`
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 pb-12 px-6 relative">
      
      {/* Premium Ticket Modal Overlay */}
      <AnimatePresence>
        {showReceipt && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/95 backdrop-blur-xl p-6 overflow-y-auto">
             <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} className="my-auto py-10 w-full">
               <TicketReceipt booking={receiptData} onClose={() => navigate('/dashboard')} />
               <div className="text-center mt-6">
                 <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white underline text-sm transition-colors">
                   Return to Dashboard
                 </button>
               </div>
             </motion.div>
           </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-7xl flex flex-col xl:flex-row gap-12">
        {/* LEFT: Seat Matrix */}
        <SeatMatrix selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} bookedSeats={bookedSeats} getSeatDetails={getSeatDetails} />

        {/* RIGHT: Modern Multi-Payment Gateway */}
        <div className="w-full xl:w-1/3 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 sticky top-24 shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex justify-between items-center">
              Payment 
              <span className="text-2xl font-black text-white">₹{totalAmount}</span>
            </h3>

            {/* Payment Method Tabs */}
            <div className="flex gap-2 p-1 bg-gray-950 rounded-xl mb-6 border border-gray-800">
              <button onClick={() => setPaymentMethod('upi')} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${paymentMethod === 'upi' ? 'bg-gray-800 text-white shadow-md' : 'text-gray-500 hover:text-white'}`}>
                <Smartphone size={16} /> UPI
              </button>
              <button onClick={() => setPaymentMethod('card')} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${paymentMethod === 'card' ? 'bg-gray-800 text-white shadow-md' : 'text-gray-500 hover:text-white'}`}>
                <CreditCard size={16} /> Card
              </button>
              <button onClick={() => setPaymentMethod('netbanking')} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${paymentMethod === 'netbanking' ? 'bg-gray-800 text-white shadow-md' : 'text-gray-500 hover:text-white'}`}>
                <Building2 size={16} /> NetBanking
              </button>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              
              {/* TAB CONTENT: UPI */}
              {paymentMethod === 'upi' && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="w-full aspect-square max-w-[160px] mx-auto bg-white rounded-2xl p-4 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <QrCode size={120} className="text-gray-900" />
                  </div>
                  <p className="text-center text-sm text-gray-400 mb-2">Scan to pay with any UPI App</p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold">UPI ID</span>
                    <input required placeholder="example@okhdfcbank" type="text" className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-16 pr-4 py-3 text-sm focus:border-red-500 outline-none" />
                  </div>
                </motion.div>
              )}

              {/* TAB CONTENT: CARD */}
              {paymentMethod === 'card' && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="relative w-full h-44 mb-6 perspective-1000">
                    <motion.div className="w-full h-full relative preserve-3d" animate={{ rotateY: isCardFlipped ? 180 : 0 }} transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }} style={{ transformStyle: "preserve-3d" }}>
                      <div className="absolute w-full h-full bg-gradient-to-br from-gray-800 to-gray-950 border border-gray-700 rounded-2xl p-5 backface-hidden flex flex-col justify-between shadow-xl">
                        <div className="flex justify-between items-start"><ShieldCheck className="text-gray-500" /><span className="text-lg italic font-black text-gray-400">VISA</span></div>
                        <div>
                          <p className="font-mono tracking-widest text-white mb-2">{cardData.number || "•••• •••• •••• ••••"}</p>
                          <div className="flex justify-between text-[10px] text-gray-400 uppercase"><span>{cardData.name || "Cardholder"}</span><span>{cardData.expiry || "MM/YY"}</span></div>
                        </div>
                      </div>
                      <div className="absolute w-full h-full bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl backface-hidden shadow-xl" style={{ transform: "rotateY(180deg)" }}>
                        <div className="w-full h-8 bg-black mt-5"></div>
                        <div className="px-5 mt-4">
                          <div className="w-full h-8 bg-gray-300 rounded flex items-center justify-end px-4 text-black font-mono text-sm font-bold">{cardData.cvv || "•••"}</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <div className="space-y-3">
                    <input required placeholder="Card Number" type="text" maxLength="16" onChange={(e) => setCardData({...cardData, number: e.target.value})} onFocus={() => setIsCardFlipped(false)} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-red-500 outline-none" />
                    <div className="flex gap-3">
                      <input required placeholder="MM/YY" type="text" maxLength="5" onChange={(e) => setCardData({...cardData, expiry: e.target.value})} onFocus={() => setIsCardFlipped(false)} className="w-1/2 bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-red-500 outline-none" />
                      <input required placeholder="CVV" type="text" maxLength="3" onChange={(e) => setCardData({...cardData, cvv: e.target.value})} onFocus={() => setIsCardFlipped(true)} onBlur={() => setIsCardFlipped(false)} className="w-1/2 bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-red-500 outline-none" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB CONTENT: NET BANKING */}
              {paymentMethod === 'netbanking' && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                  <p className="text-sm text-gray-400 mb-4">Select your preferred bank</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank'].map(bank => (
                      <div key={bank} className="bg-gray-950 border border-gray-800 p-3 rounded-xl text-center text-sm hover:border-red-500 hover:bg-red-500/10 cursor-pointer transition-colors">
                        {bank}
                      </div>
                    ))}
                  </div>
                  <div className="relative mt-2">
                    <select className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 focus:border-red-500 outline-none appearance-none">
                      <option>Select other bank...</option>
                      <option>Kotak Mahindra</option>
                      <option>Yes Bank</option>
                      <option>Punjab National Bank</option>
                    </select>
                  </div>
                </motion.div>
              )}

              <button type="submit" disabled={selectedSeats.length === 0 || isProcessing} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-xl font-bold text-lg mt-8 shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all">
                {isProcessing ? "Processing Securely..." : `Pay ₹${totalAmount}`}
              </button>
            </form>

            <p className="flex justify-center items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-6">
              <ShieldCheck size={14}/> 100% Secure Checkout
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}