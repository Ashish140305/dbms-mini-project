import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

export default function MainLayout() {
  const location = useLocation();
  const [isPreloading, setIsPreloading] = useState(true);

  // Run the preloader for 2.5 seconds on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-950 text-white font-sans flex flex-col relative overflow-x-hidden">
      
      {/* ================= CINEMATIC PRE-LOADER ================= */}
      <AnimatePresence>
        {isPreloading && (
          <motion.div 
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black"
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Cinematic ease-in-out
          >
            {/* Glowing Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="flex items-center gap-3 text-5xl font-black text-white"
            >
              <Ticket className="text-red-600 w-12 h-12" />
              <span>Cine<span className="text-red-600">Sync</span></span>
            </motion.div>
            
            {/* Loading Bar */}
            <motion.div 
              className="w-48 h-1 bg-gray-900 rounded-full mt-8 overflow-hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,1)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor />
      
      {!isPreloading && (
        <>
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-grow w-full"
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>
          <Footer />
        </>
      )}
    </div>
  );
}