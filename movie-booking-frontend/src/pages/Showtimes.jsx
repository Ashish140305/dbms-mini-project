import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, ChevronDown, Info, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Showtimes() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // --- States ---
  const [selectedDate, setSelectedDate] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTheaters, setExpandedTheaters] = useState([1]); // Default open theater ID 1

  // Generate the next 14 days dynamically
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      index: i,
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      fullDate: d.toISOString()
    };
  });

  // Enhanced Mock Data
  const allCinemas = [
    {
      id: 1,
      name: "INOX: R-City Mall, Ghatkopar",
      distance: "2.4 km away",
      amenities: ["M-Ticket", "Food & Beverage", "Recliner"],
      shows: [
        { id: 101, time: "09:30 AM", type: "IMAX 3D", status: "Available" },
        { id: 102, time: "01:15 PM", type: "IMAX 3D", status: "Fast Filling" },
        { id: 103, time: "06:45 PM", type: "IMAX 3D", status: "Sold Out" },
        { id: 104, time: "10:30 PM", type: "IMAX 3D", status: "Available" }
      ]
    },
    {
      id: 2,
      name: "PVR: Phoenix Marketcity, Kurla",
      distance: "5.1 km away",
      amenities: ["M-Ticket", "4DX", "Dolby Atmos"],
      shows: [
        { id: 201, time: "11:00 AM", type: "4DX 3D", status: "Available" },
        { id: 202, time: "04:30 PM", type: "4DX 3D", status: "Available" },
        { id: 203, time: "09:00 PM", type: "4DX 3D", status: "Fast Filling" }
      ]
    },
    {
      id: 3,
      name: "Cinepolis: Magnet Mall, Bhandup",
      distance: "7.8 km away",
      amenities: ["M-Ticket", "Food & Beverage"],
      shows: [
        { id: 301, time: "10:00 AM", type: "3D", status: "Available" },
        { id: 302, time: "02:00 PM", type: "3D", status: "Sold Out" },
        { id: 303, time: "08:15 PM", type: "3D", status: "Available" }
      ]
    }
  ];

  // --- Handlers ---
  const toggleTheater = (id) => {
    setExpandedTheaters(prev => 
      prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
    );
  };

  const handleShowSelect = (cinema, show) => {
    // Navigate to checkout. In a real app, pass the show.id in state or URL
    navigate('/checkout');
  };

  // Filter cinemas based on search
  const filteredCinemas = allCinemas.filter(cinema => 
    cinema.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 pb-20">
      
      {/* ================= MOVIE HEADER ================= */}
      <div className="container mx-auto max-w-5xl px-6 mb-8">
        <h1 className="text-4xl font-black tracking-tight mb-2">Interstellar</h1>
        <div className="flex flex-wrap items-center gap-3 text-gray-400 text-sm font-medium">
          <span className="bg-gray-800 border border-gray-700 px-2 py-0.5 rounded text-xs font-bold text-white">U/A</span> 
          <span>Sci-Fi, Adventure</span>
          <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
          <span>English</span>
          <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
          <span>2h 49m</span>
        </div>
      </div>

      {/* ================= STICKY DATE & SEARCH STRIP ================= */}
      <div className="sticky top-[72px] z-40 bg-gray-950/80 backdrop-blur-xl border-y border-white/5 py-4 shadow-2xl">
        <div className="container mx-auto max-w-5xl px-6 flex flex-col md:flex-row gap-6 items-center justify-between">
          
          {/* Scrollable Date Picker */}
          <div className="w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
            <div className="flex gap-2 min-w-max">
              {dates.map((d) => {
                const isActive = selectedDate === d.index;
                return (
                  <button
                    key={d.index}
                    onClick={() => setSelectedDate(d.index)}
                    className={`relative flex flex-col items-center justify-center w-14 h-16 rounded-xl transition-colors z-10 ${isActive ? 'text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                  >
                    {/* Framer Motion Layout Animation for the Red Highlight */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeDateBubble"
                        className="absolute inset-0 bg-red-600 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <span className="text-[10px] uppercase font-bold tracking-wider mb-0.5">{d.day}</span>
                    <span className="text-lg font-black">{d.date}</span>
                    <span className="text-[10px] font-medium">{d.month}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72 relative shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Filter cinemas..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-red-500 transition-colors placeholder:text-gray-600"
            />
          </div>

        </div>
      </div>

      {/* ================= THEATER LIST ================= */}
      <div className="container mx-auto max-w-5xl px-6 mt-10 space-y-4">
        
        {/* Legend */}
        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-gray-500 mb-6 px-2">
          <div className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-green-500 rounded-full"></span> Available</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-orange-500 rounded-full"></span> Fast Filling</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-gray-700 bg-gray-800 rounded-full"></span> Sold Out</div>
        </div>

        {filteredCinemas.length === 0 ? (
          <div className="text-center py-20 text-gray-500 flex flex-col items-center">
            <AlertCircle size={48} className="mb-4 opacity-50" />
            <p className="text-lg">No cinemas found matching your search.</p>
          </div>
        ) : (
          filteredCinemas.map((cinema) => {
            const isExpanded = expandedTheaters.includes(cinema.id);

            return (
              <motion.div 
                layout // Enables smooth push-down animation when surrounding elements expand
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={cinema.id} 
                className="bg-gray-900 border border-white/5 rounded-2xl overflow-hidden shadow-lg"
              >
                {/* Accordion Header (Clickable) */}
                <button 
                  onClick={() => toggleTheater(cinema.id)}
                  className="w-full flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 transition-colors text-left"
                >
                  <div>
                    <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                      {cinema.name}
                      <Info size={16} className="text-gray-500 hover:text-white transition-colors cursor-help" />
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {cinema.distance}</span>
                      <span className="hidden sm:flex items-center gap-2">
                        {cinema.amenities.map((amenity, i) => (
                           <span key={i} className="flex items-center gap-1">
                             <span className="w-1 h-1 bg-gray-600 rounded-full"></span> {amenity}
                           </span>
                        ))}
                      </span>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="text-gray-500" />
                  </motion.div>
                </button>

                {/* Accordion Body (Showtimes) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="border-t border-white/5"
                    >
                      <div className="p-6 flex flex-wrap gap-4 bg-black/20">
                        {cinema.shows.map((show) => {
                          const isSoldOut = show.status === "Sold Out";
                          const isFastFilling = show.status === "Fast Filling";

                          return (
                            <button
                              key={show.id}
                              disabled={isSoldOut}
                              onClick={() => handleShowSelect(cinema.name, show)}
                              className={`relative group px-6 py-3 rounded-xl flex flex-col items-center transition-all duration-300 border ${
                                isSoldOut 
                                  ? 'bg-gray-950 border-gray-800 opacity-40 cursor-not-allowed' 
                                  : isFastFilling
                                  ? 'bg-orange-500/10 border-orange-500/30 hover:border-orange-500 hover:bg-orange-500/20 text-orange-400'
                                  : 'bg-green-500/10 border-green-500/30 hover:border-green-500 hover:bg-green-500/20 text-green-400'
                              }`}
                            >
                              <span className="text-sm font-bold tracking-wide">
                                {show.time}
                              </span>
                              <span className={`text-[10px] uppercase tracking-wider mt-1 ${isSoldOut ? 'text-gray-500' : 'text-gray-300'}`}>
                                {show.type}
                              </span>
                              
                              {/* Fast Filling Badge */}
                              {isFastFilling && (
                                <div className="absolute -top-2.5 -right-2 bg-orange-500 text-[9px] font-black tracking-widest px-2 py-0.5 rounded shadow-[0_0_10px_rgba(249,115,22,0.5)] text-white uppercase transform scale-90 group-hover:scale-100 transition-transform">
                                  Filling
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>

    </div>
  );
}