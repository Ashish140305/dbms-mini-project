import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if the mouse is over a clickable element
      if (e.target.closest('button, a, input, select')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 bg-red-600 rounded-full pointer-events-none z-[100] mix-blend-screen flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]"
      animate={{
        x: mousePosition.x - 10,
        y: mousePosition.y - 10,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(220, 38, 38, 0.2)' : 'rgba(220, 38, 38, 1)',
        border: isHovering ? '1px solid rgba(220, 38, 38, 0.8)' : 'none'
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    >
      {isHovering && <span className="text-[4px] text-white font-bold opacity-80 uppercase tracking-widest">Tap</span>}
    </motion.div>
  );
}