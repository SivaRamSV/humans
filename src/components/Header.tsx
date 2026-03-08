// ========================================
// HEADER COMPONENT
// Powerful messaging for viral impact
// ========================================

import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header 
      className="text-center pt-6 pb-2 px-6 relative z-10"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="flex flex-col items-center gap-3"
      >
        {/* Main headline - the viral hook */}
        <h1 
          className="text-xl md:text-2xl lg:text-3xl font-black tracking-[0.1em] leading-tight"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #00f5ff 40%, #bf00ff 70%, #ff006e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(0, 245, 255, 0.3))'
          }}
        >
          HUMANS APPEAR IN THE FINAL SECONDS
        </h1>
        
        {/* Subtitle with instruction */}
        <p className="text-[10px] md:text-xs text-white/40 tracking-[0.25em] uppercase">
          Scroll to experience 13.8 billion years of cosmic history
        </p>
        
        {/* Animated scroll indicator */}
        <motion.div 
          className="flex items-center gap-2 text-white/30 text-[10px] mt-1"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>←</span>
          <span className="tracking-widest">SCROLL OR USE ARROW KEYS</span>
          <span>→</span>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}

export default Header;
