// ========================================
// HEADER COMPONENT
// Futuristic branding with animations
// ========================================

import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header 
      className="text-center pt-8 pb-4 px-6 relative z-10"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="flex items-center justify-center gap-5 mb-4"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated logo icon */}
        <motion.div 
          className="relative"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-12 h-12 rounded-full"
            style={{
              background: 'radial-gradient(circle, #00f5ff 0%, #bf00ff 50%, transparent 70%)',
              boxShadow: '0 0 40px rgba(0, 245, 255, 0.6), 0 0 80px rgba(191, 0, 255, 0.4)'
            }}
          />
          <div 
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: 'radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, transparent 70%)',
            }}
          />
        </motion.div>

        <div className="text-left">
          <h1 
            className="text-xl md:text-2xl lg:text-3xl font-black tracking-[0.15em]"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #00f5ff 30%, #bf00ff 60%, #ff006e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(0, 245, 255, 0.3))'
            }}
          >
            COSMIC TIMELINE
          </h1>
          <p className="text-[10px] md:text-xs text-white/50 tracking-[0.3em] uppercase mt-1">
            From the Big Bang to Human Consciousness
          </p>
        </div>
      </motion.div>
    </motion.header>
  );
}

export default Header;
