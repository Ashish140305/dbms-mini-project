import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Clock, CreditCard } from 'lucide-react';
import TicketReceipt from '../components/TicketReceipt'; // Import the new ticket!

export default function Dashboard() {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const bookings = [
    {
      id: "BK9824XA",
      movie: "Interstellar (Re-release)",
      format: "IMAX 3D • English",
      cinema: "INOX: R-City Mall",
      date: "Tomorrow, 7:30 PM",
      time: "7:30 PM",
      seats: "J12, J13",
      amount: "₹550",
      status: "Upcoming",
      poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "BK1092MZ",
      movie: "Dune: Part Two",
      format: "IMAX • English",
      cinema: "PVR: Phoenix Marketcity",
      date: "Oct 12, 4:15 PM",
      time: "4:15 PM",
      seats: "F4, F5, F6",
      amount: "₹800",
      status: "Past",
      poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 px-6 relative">
      
      {/* Premium Ticket Modal Overlay */}
      <AnimatePresence>
        {selectedTicket && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/90 backdrop-blur-md p-6 overflow-y-auto">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="my-auto py-10 w-full">
               <TicketReceipt booking={selectedTicket} onClose={() => setSelectedTicket(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here are your recent bookings.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Ticket className="text-red-500" /> Your Bookings
            </h2>
            
            {bookings.map((booking, idx) => (
              <div key={idx} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-gray-700 transition-colors">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold">{booking.movie}</h3>
                    {booking.status === "Upcoming" && <span className="bg-green-500/20 text-green-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Upcoming</span>}
                  </div>
                  <p className="text-gray-400 text-sm">{booking.format}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-300">
                    <span className="flex items-center gap-1"><Clock size={16} /> {booking.date.split(',')[0]}</span>
                    <span>Seats: {booking.seats}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTicket(booking)}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-xl font-medium transition-colors whitespace-nowrap"
                >
                  View Ticket
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <CreditCard className="text-red-500" /> Account Stats
            </h2>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <span className="text-gray-400">Total Bookings</span>
                <span className="font-bold text-xl">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Reward Points</span>
                <span className="font-bold text-xl text-yellow-500">450</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}