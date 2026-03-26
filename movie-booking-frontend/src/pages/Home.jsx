import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Ticket, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import MagneticButton from '../components/MagneticButton';

export default function Home() {
  const navigate = useNavigate();
  
  // Track scroll position for the Parallax Effect
  const { scrollY } = useScroll();
  // Move the background image down at half the speed of the user's scroll
  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '50%']);

  // Updated Data to include sample video URLs for the hover effect
  const trendingMovies = [
    { id: 1, title: "Interstellar", genre: "Sci-Fi", rating: "9.2", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop", videoUrl: "https://cdn.pixabay.com/video/2020/04/18/36551-413123381_tiny.mp4" },
    { id: 2, title: "Dune: Part Two", genre: "Action", rating: "8.8", image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop", videoUrl: "https://cdn.pixabay.com/video/2021/08/13/84904-587140837_tiny.mp4" },
    { id: 3, title: "Oppenheimer", genre: "Drama", rating: "8.9", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop", videoUrl: "https://cdn.pixabay.com/video/2019/11/14/29037-372990474_tiny.mp4" },
    { id: 4, title: "The Dark Knight", genre: "Action", rating: "9.0", image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=2028&auto=format&fit=crop", videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40141-424610191_tiny.mp4" }
  ];

  return (
    <div className="bg-gray-950 text-white pb-20 overflow-hidden">
      
      {/* ================= PARALLAX HERO SECTION ================= */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/80 to-gray-950 z-10" />
        
        {/* Animated Background */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <img 
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop" 
            alt="Cinematic Background" 
            className="w-full h-full object-cover opacity-50"
          />
        </motion.div>

        <div className="relative z-20 container mx-auto px-6 max-w-7xl flex flex-col items-center text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl flex flex-col items-center"
          >
            <span className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 inline-block">
              Premium Booking Experience
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-tight">
              Experience Cinema <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Like Never Before.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
              Reserve your seats for the latest blockbusters, indie darlings, and immersive IMAX experiences directly from your device.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <MagneticButton>
                <button onClick={() => navigate('/movie/1')} className="flex items-center gap-2 bg-red-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:bg-red-500 transition-colors">
                  <Ticket size={24} /> Book Tickets
                </button>
              </MagneticButton>

              <MagneticButton>
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-colors">
                  <Play size={24} className="text-red-500" /> Watch Trailers
                </button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= INFINITE MARQUEE ================= */}
      <div className="w-full border-y border-gray-900 bg-gray-950/50 backdrop-blur-md overflow-hidden py-4 flex whitespace-nowrap z-20 relative">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          className="flex gap-16 text-sm md:text-base font-bold text-gray-500 tracking-widest uppercase items-center"
        >
          {/* We repeat the phrase multiple times so it loops seamlessly */}
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-16">
              <span>IMAX Experiences</span> <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              <span>Dolby Atmos 3D</span> <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              <span>Premium Recliners</span> <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ================= TRENDING MOVIES ================= */}
      <section className="container mx-auto px-6 py-24 max-w-7xl relative z-20">
         <div className="flex justify-between items-end mb-12">
           <div>
             <h2 className="text-4xl font-bold mb-2">Trending This Week</h2>
             <p className="text-gray-400">Hover over a poster to watch the trailer.</p>
           </div>
           <MagneticButton>
            <button className="text-red-500 hover:text-red-400 font-bold tracking-wider uppercase text-sm transition-colors px-4 py-2">View All</button>
           </MagneticButton>
         </div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingMovies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
         </div>
      </section>
    </div>
  );
}