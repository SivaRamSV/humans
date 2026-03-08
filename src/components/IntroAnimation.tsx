// ========================================
// INTRO ANIMATION COMPONENT
// Cinematic Big Bang opening sequence
// ========================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [stage, setStage] = useState<'dot' | 'expand' | 'text' | 'done'>('dot');

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('expand'), 1500),
      setTimeout(() => setStage('text'), 3000),
      setTimeout(() => {
        setStage('done');
        onComplete();
      }, 5500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Initial singularity dot */}
          <motion.div
            className="absolute"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              stage === 'dot'
                ? { scale: 1, opacity: 1 }
                : stage === 'expand'
                ? { scale: 100, opacity: 0 }
                : { scale: 100, opacity: 0 }
            }
            transition={{
              duration: stage === 'expand' ? 2 : 0.8,
              ease: stage === 'expand' ? 'easeOut' : 'easeInOut',
            }}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{
                background: 'radial-gradient(circle, #fff 0%, #00f5ff 30%, #bf00ff 60%, transparent 100%)',
                boxShadow: '0 0 60px 30px rgba(0, 245, 255, 0.8), 0 0 100px 60px rgba(191, 0, 255, 0.5)',
              }}
            />
          </motion.div>

          {/* Expanding rings */}
          {stage === 'expand' && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border"
                  style={{
                    borderColor: i % 2 === 0 ? 'rgba(0, 245, 255, 0.3)' : 'rgba(191, 0, 255, 0.3)',
                  }}
                  initial={{ width: 0, height: 0, opacity: 1 }}
                  animate={{ width: '200vmax', height: '200vmax', opacity: 0 }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.2,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </>
          )}

          {/* Text reveal */}
          {(stage === 'text' || stage === 'expand') && (
            <motion.div
              className="text-center z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: stage === 'expand' ? 1 : 0 }}
            >
              <motion.p
                className="text-white/60 text-sm tracking-[0.5em] uppercase mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                13.8 Billion Years Ago
              </motion.p>
              <motion.h1
                className="text-5xl md:text-7xl font-black tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #00f5ff, #bf00ff, #ff006e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                THE BIG BANG
              </motion.h1>
              <motion.p
                className="text-white/40 text-lg mt-4 tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Everything begins...
              </motion.p>
            </motion.div>
          )}

          {/* Skip button */}
          <motion.button
            className="absolute bottom-8 right-8 text-white/30 text-sm hover:text-white/60 transition-colors"
            onClick={onComplete}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Skip intro →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IntroAnimation;
