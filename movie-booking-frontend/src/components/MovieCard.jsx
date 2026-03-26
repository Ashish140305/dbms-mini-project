import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movie, index = 0 }) {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    // Wait 600ms before playing the video to avoid flashing when moving the mouse quickly
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(true);
    }, 600);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setIsHovering(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative cursor-pointer flex flex-col h-full"
      onClick={() => navigate(`/movie/${movie.id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-4 border border-gray-900 shadow-lg bg-gray-900">
        
        {/* The Video Player (Only renders when hovering) */}
        <AnimatePresence>
          {isHovering && movie.videoUrl && (
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={movie.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-10"
            />
          )}
        </AnimatePresence>

        {/* The Static Poster */}
        <img 
          src={movie.image} 
          alt={movie.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Hover Gradient & Button Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-6">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            Book Tickets
          </button>
        </div>
      </div>
      
      {/* Movie Meta Data */}
      <h3 className="text-xl font-bold mb-1 group-hover:text-red-500 transition-colors truncate">
        {movie.title}
      </h3>
      <div className="flex justify-between items-center text-sm text-gray-400 mt-auto">
        <span className="bg-gray-900 px-2 py-1 rounded-md text-xs border border-gray-800">{movie.genre}</span>
        <span className="flex items-center gap-1 text-white font-medium">
          <Star size={14} className="text-yellow-500 fill-yellow-500" /> {movie.rating}
        </span>
      </div>
    </motion.div>
  );
}