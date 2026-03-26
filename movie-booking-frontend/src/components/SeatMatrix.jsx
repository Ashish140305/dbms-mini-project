import { motion } from 'framer-motion';
import { Armchair } from 'lucide-react';

export default function SeatMatrix({ selectedSeats, setSelectedSeats, bookedSeats, getSeatDetails }) {
  // Matrix Configuration structured by Tiers
  const tiers = [
    { name: "VIP Recliners (₹500)", rows: ['A', 'B'], color: "hover:border-yellow-500" },
    { name: "Premium (₹250)", rows: ['C', 'D', 'E'], color: "hover:border-red-500" },
    { name: "Standard (₹150)", rows: ['F', 'G'], color: "hover:border-blue-500" }
  ];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        alert("You can only book up to 6 seats at a time.");
      }
    }
  };

  return (
    <div className="w-full bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 overflow-hidden xl:w-2/3 shadow-2xl">
      <h2 className="text-2xl font-bold mb-8">Select Your Seats</h2>
      
      {/* Screen Curve Graphic */}
      <div className="relative w-full h-12 mb-16 flex justify-center mt-4">
        <div className="absolute top-0 w-4/5 h-full border-t-4 border-white/80 rounded-t-[100%] opacity-40 shadow-[0_-20px_60px_rgba(255,255,255,0.3)]"></div>
        <span className="absolute top-8 text-gray-400 text-xs font-bold uppercase tracking-[0.4em]">Screen This Way</span>
      </div>

      {/* Seat Grid Scrollable Area */}
      <div className="w-full overflow-x-auto pb-8 custom-scrollbar">
        <div className="min-w-max flex flex-col items-center mx-auto space-y-8">
          
          {tiers.map((tier, tIdx) => (
            <div key={tIdx} className="w-full flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 font-bold bg-gray-950 px-4 py-1 rounded-full border border-gray-800">
                {tier.name}
              </span>
              
              <div className="flex flex-col gap-4">
                {tier.rows.map((row) => (
                  <div key={row} className="flex gap-4 items-center">
                    <span className="text-gray-600 font-bold w-6 text-right">{row}</span>
                    <div className="flex gap-2 sm:gap-3">
                      {cols.map((col) => {
                        const seatId = `${row}${col}`;
                        const isBooked = bookedSeats.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);
                        const seatDetails = getSeatDetails(seatId);

                        return (
                          <motion.button
                            // HAPTIC BOUNCE EFFECT HERE
                            whileTap={!isBooked ? { scale: 0.7 } : {}}
                            transition={{ type: "spring", stiffness: 900, damping: 10 }}
                            key={seatId}
                            onClick={() => toggleSeat(seatId)}
                            disabled={isBooked}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-t-xl rounded-b-md flex items-center justify-center transition-all duration-300 border
                              ${isBooked ? 'bg-gray-950/50 text-gray-800 border-gray-800/50 cursor-not-allowed' : 
                                isSelected ? `${seatDetails.bg} text-white shadow-[0_0_20px_${seatDetails.shadow}] border-transparent scale-110` : 
                                `bg-gray-800/80 text-transparent hover:text-white/40 border-gray-700 ${tier.color}`}`}
                          >
                            <Armchair size={18} className={isBooked ? 'opacity-10' : ''} />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs font-bold uppercase tracking-wider text-gray-400 border-t border-gray-800 pt-8">
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-500 rounded-sm shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div> VIP (₹500)</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-600 rounded-sm shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div> Premium (₹250)</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-600 rounded-sm shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div> Standard (₹150)</div>
      </div>
    </div>
  );
}