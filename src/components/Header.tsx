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
      {/* Source Code Link - Top Right */}
      <motion.a
        href="https://github.com/SivaRamSV/humans"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-xs"
        whileHover={{ scale: 1.05 }}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span className="hidden sm:inline">Source Code</span>
      </motion.a>

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

        {/* Curiosity project tagline */}
        <p className="text-[9px] text-white/25 tracking-[0.15em] mt-2 italic">
          Built as a curiosity project to explore cosmic time scales
        </p>
      </motion.div>
    </motion.header>
  );
}

export default Header;
