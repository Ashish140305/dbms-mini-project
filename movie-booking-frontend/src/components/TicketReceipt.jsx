import { motion } from 'framer-motion';
import { Download, Share2, MapPin, Calendar, Clock } from 'lucide-react';

export default function TicketReceipt({ booking, onClose }) {
  return (
    <div className="w-full max-w-sm mx-auto relative group">
      {/* Glow Effect Behind Ticket */}
      <div className="absolute -inset-1 bg-gradient-to-b from-red-600 to-transparent rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
      
      <div className="relative bg-gray-100 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-gray-900">
        
        {/* Ticket Header (Movie Poster & Gradient) */}
        <div className="h-48 relative bg-gray-900">
          <img 
            src={booking.poster || "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"} 
            alt="Movie" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-transparent to-black/50"></div>
          {onClose && (
             <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors">
               ✕
             </button>
          )}
        </div>

        {/* Ticket Body (Details) */}
        <div className="px-8 pt-4 pb-6 bg-gray-100 relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-black text-gray-950 leading-tight">{booking.movie}</h2>
              <p className="text-red-600 font-bold text-sm">{booking.format}</p>
            </div>
            <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-bold shrink-0">
              U/A
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-sm text-gray-900">{booking.cinema}</p>
                <p className="text-xs text-gray-500">Screen 2</p>
              </div>
            </div>
            
            <div className="flex gap-6 border-t border-gray-300 pt-4">
              <div className="flex items-start gap-2">
                <Calendar size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Date</p>
                  <p className="font-bold text-sm text-gray-900">{booking.date.split(',')[0]}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Time</p>
                  <p className="font-bold text-sm text-gray-900">{booking.time || "09:30 PM"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-200 flex justify-between items-center shadow-sm mt-2">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Seats</p>
                <p className="font-black text-lg text-red-600">{booking.seats}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase font-semibold">Total Paid</p>
                <p className="font-black text-lg text-gray-900">{booking.amount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Tear-off Cutout Divider */}
        <div className="relative h-8 bg-gray-100 flex items-center overflow-hidden">
          <div className="absolute left-[-12px] w-6 h-6 bg-gray-950 rounded-full shadow-inner"></div>
          <div className="w-full border-t-2 border-dashed border-gray-400 opacity-50"></div>
          <div className="absolute right-[-12px] w-6 h-6 bg-gray-950 rounded-full shadow-inner"></div>
        </div>

        {/* Barcode & Footer */}
        <div className="bg-gray-100 px-8 pb-8 pt-4 text-center">
          {/* Pure CSS Barcode */}
          <div className="w-full h-16 opacity-80 mb-2" style={{
            backgroundImage: 'repeating-linear-gradient(to right, #111827, #111827 2px, transparent 2px, transparent 4px, #111827 4px, #111827 5px, transparent 5px, transparent 8px, #111827 8px, #111827 12px, transparent 12px, transparent 14px)'
          }}></div>
          <p className="font-mono text-xs tracking-widest text-gray-500 font-bold mb-6">{booking.id || "BK9824XA-2026"}</p>
          
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-bold transition-colors text-sm">
              <Download size={16} /> Save
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 rounded-xl transition-colors">
              <Share2 size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}