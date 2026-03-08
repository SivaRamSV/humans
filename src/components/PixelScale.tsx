// ========================================
// PIXEL SCALE VISUALIZATION
// Shows how tiny human history is on cosmic scale
// "1 pixel = X million years"
// ========================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UNIVERSE_AGE = 13_800_000_000;
const HUMAN_AGE = 300_000;
const CIVILIZATION_AGE = 10_000;

export function PixelScale() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate scale
  const yearsPerPixel = UNIVERSE_AGE / windowWidth;
  const humanPixels = HUMAN_AGE / yearsPerPixel;
  const civilizationPixels = CIVILIZATION_AGE / yearsPerPixel;

  return (
    <motion.div
      className="fixed top-2 left-2 sm:top-6 sm:left-6 z-50 hidden sm:block"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: 'rgba(0, 0, 0, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          cursor: 'pointer',
        }}
        className="p-2 sm:px-3.5 sm:py-2.5"
        whileHover={{ borderColor: 'rgba(0, 245, 255, 0.3)' }}
      >
        <div className="text-[8px] sm:text-[9px] text-white/40 font-mono tracking-wider mb-1">
          SCALE
        </div>
        <div className="text-cyan-400 font-mono text-xs sm:text-sm font-bold">
          1px = {(yearsPerPixel / 1_000_000).toFixed(1)}M years
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            style={{
              background: 'rgba(0, 0, 0, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderTop: 'none',
              padding: '16px',
              minWidth: '260px',
            }}
          >
            {/* Visual comparison */}
            <div className="mb-4">
              <div className="text-[9px] text-white/40 font-mono tracking-wider mb-3">
                AT THIS SCALE:
              </div>
              
              {/* Universe bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-white/50">Universe</span>
                  <span className="text-cyan-400 font-mono">{windowWidth}px</span>
                </div>
                <div className="h-3 bg-gradient-to-r from-cyan-500 to-purple-500 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-bold">
                    13.8 BILLION YEARS
                  </div>
                </div>
              </div>

              {/* Earth bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-white/50">Earth</span>
                  <span className="text-green-400 font-mono">{Math.round(4_500_000_000 / yearsPerPixel)}px</span>
                </div>
                <div 
                  className="h-3 bg-green-500"
                  style={{ width: `${(4_500_000_000 / UNIVERSE_AGE) * 100}%` }}
                />
              </div>

              {/* Humans bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-white/50">Humans</span>
                  <span className="text-purple-400 font-mono">{humanPixels.toFixed(2)}px</span>
                </div>
                <div className="h-3 bg-white/10 relative">
                  <motion.div 
                    className="absolute right-0 top-0 h-full bg-purple-500"
                    style={{ width: Math.max(2, humanPixels) }}
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-white/50">
                    ← barely visible
                  </div>
                </div>
              </div>

              {/* Civilization bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-white/50">Civilization</span>
                  <span className="text-pink-400 font-mono">{civilizationPixels.toFixed(4)}px</span>
                </div>
                <div className="h-3 bg-white/10 relative">
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-pink-400">
                    ⚠️ Less than 1 pixel!
                  </div>
                </div>
              </div>
            </div>

            {/* Shocking realization */}
            <div 
              className="border-t border-white/10 pt-3 text-center"
            >
              <div className="text-amber-400 text-[11px] font-bold mb-1">
                💡 REALIZATION
              </div>
              <div className="text-white/60 text-[10px] leading-relaxed">
                If your screen represented the age of the universe,<br/>
                <span className="text-pink-400 font-bold">
                  all of human civilization would be invisible.
                </span>
              </div>
            </div>

            {/* Close hint */}
            <div className="text-center mt-3">
              <span className="text-white/20 text-[9px]">click to close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default PixelScale;
