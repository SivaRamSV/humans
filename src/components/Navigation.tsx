// ========================================
// NAVIGATION CONTROLS
// Zoom controls with visual feedback
// ========================================

import { motion } from 'framer-motion';
import { useTimelineStore } from '../store/timelineStore';

export function Navigation() {
  const { zoomLevel, setZoomLevel, reset } = useTimelineStore();

  const zoomLabels = ['Overview', 'Detailed', 'Focused', 'Close-up', 'Maximum'];

  return (
    <>
      {/* Scale indicator - top right */}
      <motion.div 
        className="fixed top-6 right-6 z-40"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div 
          className="rounded-2xl px-5 py-3"
          style={{
            background: 'rgba(15, 15, 25, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div className="text-[10px] text-white/40 tracking-[0.2em] uppercase mb-1">
            Zoom Level
          </div>
          <div className="text-sm font-semibold text-[var(--accent-cyan)]">
            {zoomLabels[zoomLevel]}
          </div>
          {/* Zoom indicator dots */}
          <div className="flex gap-1.5 mt-2">
            {[0, 1, 2, 3, 4].map((level) => (
              <motion.button
                key={level}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: level <= zoomLevel ? '#00f5ff' : 'rgba(255,255,255,0.2)',
                  boxShadow: level <= zoomLevel ? '0 0 8px #00f5ff' : 'none'
                }}
                onClick={() => setZoomLevel(level)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Navigation buttons - bottom right */}
      <motion.div 
        className="fixed bottom-8 right-8 flex gap-3 z-40"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <NavButton 
          onClick={() => setZoomLevel(zoomLevel - 1)} 
          disabled={zoomLevel === 0}
          label="Zoom Out"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
          </svg>
        </NavButton>
        <NavButton 
          onClick={() => setZoomLevel(zoomLevel + 1)} 
          disabled={zoomLevel === 4}
          label="Zoom In"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </NavButton>
        <NavButton onClick={reset} label="Reset">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </NavButton>
      </motion.div>

      {/* Info hint - bottom center */}
      <motion.div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div 
          className="rounded-full px-6 py-3 text-sm text-white/50"
          style={{
            background: 'rgba(15, 15, 25, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          <span className="text-white/30">🖱️</span> Click to expand 
          <span className="mx-2 text-white/20">•</span> 
          <span className="text-white/30">⌨️</span> Arrow keys to scroll
          <span className="mx-2 text-white/20">•</span> 
          <span className="text-white/30">🔍</span> Use zoom controls
        </div>
      </motion.div>
    </>
  );
}

interface NavButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

function NavButton({ children, onClick, disabled = false, label }: NavButtonProps) {
  return (
    <motion.button
      className="w-12 h-12 rounded-xl flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed group relative"
      style={{
        background: 'rgba(15, 15, 25, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { 
        scale: 1.1, 
        borderColor: 'rgba(0, 245, 255, 0.5)',
        boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)'
      } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      title={label}
    >
      {children}
      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs bg-black/80 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </motion.button>
  );
}

export default Navigation;
