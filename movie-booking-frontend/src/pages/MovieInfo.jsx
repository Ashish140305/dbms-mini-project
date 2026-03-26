import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Star, Play, Ticket, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function MovieInfo() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  // Refs for the draggable carousel
  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  // FAB visibility state
  const { scrollY } = useScroll();
  const [showFAB, setShowFAB] = useState(false);

  // Show FAB only after scrolling past the main hero button
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 500) {
      setShowFAB(true);
    } else {
      setShowFAB(false);
    }
  });

  // Calculate draggable constraints on mount
  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  // Mock Data (Notice the 'themeColor' property!)
  const movie = {
    title: "Interstellar",
    format: "IMAX",
    rating: "9.2",
    duration: "2h 49m",
    genre: "Sci-Fi, Adventure",
    certification: "U/A",
    themeColor: "rgba(30, 58, 138, 0.4)", // A deep space blue glow
    banner: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
    synopsis: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    cast: [
      { name: "Matthew McConaughey", role: "Cooper", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop" },
      { name: "Anne Hathaway", role: "Brand", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop" },
      { name: "Jessica Chastain", role: "Murph", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1364&auto=format&fit=crop" },
      { name: "Michael Caine", role: "Prof. Brand", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop" },
      { name: "Matt Damon", role: "Mann", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24 relative overflow-hidden">
      
      {/* ================= DYNAMIC AMBIENT GLOW ================= */}
      <div 
        className="absolute top-0 left-0 w-full h-[80vh] pointer-events-none z-0 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${movie.themeColor} 0%, transparent 70%)`
        }}
      />

      {/* ================= HERO BANNER ================= */}
      <div className="w-full h-[60vh] relative z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent z-10" />
        <img src={movie.banner} alt="Banner" className="w-full h-full object-cover opacity-60 mix-blend-overlay"/>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-20 -mt-40 flex flex-col md:flex-row gap-12">
        
        {/* POSTER (Parallax slight float) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="w-64 md:w-80 shrink-0 mx-auto md:mx-0"
        >
          <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gray-900 relative group">
            <img src={movie.poster} alt="Poster" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm cursor-pointer">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <Play className="text-white ml-1" size={24} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* MOVIE DETAILS */}
        <div className="pt-4 md:pt-32 space-y-8 flex-grow">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-2 flex items-center gap-4">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 font-medium">
              <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-white">{movie.format}</span>
              <span className="flex items-center gap-1"><Star className="text-yellow-500 fill-yellow-500" size={16}/> {movie.rating}/10</span>
              <span className="flex items-center gap-1"><Clock size={16}/> {movie.duration}</span>
              <span className="flex items-center gap-1"><Calendar size={16}/> {movie.genre}</span>
              <span className="bg-gray-800 px-3 py-1 rounded-md text-xs font-bold border border-gray-700">{movie.certification}</span>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg leading-relaxed max-w-3xl"
          >
            {movie.synopsis}
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            onClick={() => navigate(`/buytickets/${id}`)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-colors shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
          >
            <Ticket size={20} /> Book Tickets Now
          </motion.button>
        </div>
      </div>

      {/* ================= DRAGGABLE CAST CAROUSEL ================= */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="container mx-auto px-6 max-w-6xl mt-20 relative z-20"
      >
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold">Cast & Crew</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 uppercase tracking-widest font-bold">
            Swipe <ChevronRight size={16} />
          </div>
        </div>

        {/* Carousel Container */}
        <div ref={carouselRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -carouselWidth }} 
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-6"
          >
            {movie.cast.map((actor, idx) => (
              <motion.div key={idx} className="min-w-[140px] md:min-w-[160px] flex flex-col items-center shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-900 shadow-xl mb-4 pointer-events-none">
                  <img src={actor.img} alt={actor.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-center text-sm md:text-base">{actor.name}</h3>
                <p className="text-xs md:text-sm text-gray-500 text-center mt-1">{actor.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ================= STICKY FAB (Floating Action Button) ================= */}
      <AnimatePresence>
        {showFAB && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <button 
              onClick={() => navigate(`/buytickets/${id}`)}
              className="flex items-center gap-3 bg-white text-gray-950 px-8 py-4 rounded-full font-bold shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform"
            >
              <Ticket size={20} className="text-red-600" /> 
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}