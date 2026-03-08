// ========================================
// PROPORTIONAL TIMELINE SCRUBBER
// Shows actual time scale - visualizes how recent humans are
// ========================================

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { timelineData } from '../data/timelineData';

interface TimelineScrubberProps {
  activeIndex: number;
  onIndexChange: (index: number) => void;
  isCardExpanded?: boolean;
}

// The oldest event (Big Bang) in years
const MAX_TIME = 13800000000;

// Use logarithmic scale to make recent events visible while showing proportions
// OLD events (Big Bang) = LEFT (0%), NEW events (Humans) = RIGHT (100%)
// Clamp to 3-97% so icons at edges aren't cut off
const getLogPosition = (timeValue: number): number => {
  const minLog = Math.log10(200000); // ~200K years (modern humans)
  const maxLog = Math.log10(MAX_TIME);
  const currentLog = Math.log10(Math.max(timeValue, 200000));
  // Invert: older (bigger number) = left, newer (smaller number) = right
  const rawPosition = 100 - ((currentLog - minLog) / (maxLog - minLog)) * 100;
  // Clamp between 3% and 97% so edge icons are fully visible
  return Math.max(3, Math.min(97, rawPosition));
};

// Format time for display
const formatTime = (timeValue: number): string => {
  if (timeValue >= 1000000000) {
    const val = timeValue / 1000000000;
    return val % 1 === 0 ? `${val.toFixed(0)}B` : `${val.toFixed(1)}B`;
  } else if (timeValue >= 1000000) {
    return `${(timeValue / 1000000).toFixed(0)}M`;
  } else if (timeValue >= 1000) {
    return `${(timeValue / 1000).toFixed(0)}K`;
  }
  return `${timeValue}`;
};

// Key indices to always show on mobile (first, middle-ish, last, and current)
const KEY_INDICES = [0, 2, 5, 7, 9]; // Big Bang, some middle ones, humans

export function TimelineScrubber({ activeIndex, onIndexChange, isCardExpanded }: TimelineScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentEra = timelineData[activeIndex];
  
  // On mobile, show fewer icons to avoid overlap
  const shouldShowIcon = (index: number) => {
    if (!isMobile) return true;
    // Always show: first, last, active, and some key milestones
    return index === 0 || index === timelineData.length - 1 || index === activeIndex || KEY_INDICES.includes(index);
  };

  return (
    <motion.div 
      className="px-12 py-1"
      style={{ 
        position: 'relative',
        zIndex: 50,
        marginTop: '70px',
        background: 'linear-gradient(to bottom, rgba(5, 5, 15, 0.95) 0%, rgba(5, 5, 15, 0.7) 80%, transparent 100%)',
        overflow: 'visible',
        pointerEvents: isCardExpanded ? 'none' : 'auto',
      }}
      animate={{ opacity: isCardExpanded ? 0.15 : 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main Timeline Track - with extra padding for icons */}
      <div 
        ref={containerRef}
        className="relative h-16"
        style={{ overflow: 'visible' }}
        >
          {/* Background track - starts from Big Bang position (3%) */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 h-0.5 sm:h-1 bg-white/5"
            style={{ left: '3%', right: '3%' }}
          />
          
          {/* Colored progress track - from Big Bang (3%) to current position */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 h-0.5 sm:h-1"
            style={{
              left: '3%',
              width: `${Math.max(0, getLogPosition(currentEra?.timeValue || MAX_TIME) - 3)}%`,
              background: `linear-gradient(90deg, ${timelineData[0]?.color}, ${currentEra?.color})`,
              boxShadow: `0 0 20px ${currentEra?.color}50`
            }}
          />

          {/* Era markers - positioned by LOG SCALE */}
          {timelineData.map((era, index) => {
            const position = getLogPosition(era.timeValue);
            const isActive = index === activeIndex;
            const isHovered = index === hoveredIndex;
            const showIcon = shouldShowIcon(index);
            
            // On mobile, render smaller dots for hidden icons, full icons for shown ones
            if (!showIcon) {
              return (
                <motion.div
                  key={era.id}
                  className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${position}%`, transform: 'translate(-50%, -50%)' }}
                  onClick={() => onIndexChange(index)}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: era.color,
                      opacity: 0.5,
                    }}
                  />
                </motion.div>
              );
            }
            
            return (
              <motion.div
                key={era.id}
                className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${position}%`, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onIndexChange(index)}
              >
                {/* Icon marker - responsive size */}
                <motion.div
                  className="relative flex items-center justify-center"
                  animate={{ 
                    scale: isActive ? 1.15 : isHovered ? 1.05 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-base sm:text-lg md:text-xl"
                    style={{
                      background: isActive 
                        ? `linear-gradient(135deg, ${era.color}, ${era.color}80)`
                        : 'rgba(15, 15, 25, 0.9)',
                      border: `2px solid ${era.color}${isActive ? '' : '60'}`,
                      boxShadow: isActive 
                        ? `0 0 20px ${era.color}, 0 0 40px ${era.color}40`
                        : 'none',
                    }}
                  >
                    {era.icon}
                  </div>
                </motion.div>

                {/* Vertical line BELOW the icon - hidden on mobile */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-px hidden sm:block"
                  style={{
                    height: isActive ? 32 : isHovered ? 24 : 16,
                    top: '100%',
                    marginTop: 4,
                    background: `linear-gradient(to bottom, ${era.color}, transparent)`,
                    opacity: isActive ? 1 : 0.5,
                    transition: 'all 0.3s ease'
                  }}
                />

                {/* Time label below - hidden on small screens, show only for active */}
                <motion.div
                  className="absolute top-full mt-1 sm:mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center hidden sm:block"
                  animate={{ opacity: isActive || isHovered ? 1 : 0.4 }}
                >
                  <div 
                    className="text-[7px] sm:text-[8px] md:text-[9px] font-bold tracking-wide"
                    style={{ color: era.color }}
                  >
                    {formatTime(era.timeValue)}
                  </div>
                </motion.div>

                {/* Tooltip on hover/active - hidden on mobile */}
                {(isActive || isHovered) && (
                  <motion.div
                    className="absolute bottom-full mb-2 sm:mb-3 left-1/2 -translate-x-1/2 whitespace-nowrap hidden sm:block"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    <div 
                      className="px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium"
                      style={{
                        background: `${era.color}20`,
                        border: `1px solid ${era.color}40`,
                        color: era.color
                      }}
                    >
                      {era.title}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          {/* YOU ARE HERE marker - pulsing near the right edge (present) */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ right: '3%', transform: 'translate(50%, -50%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {/* Pulsing outer ring */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div 
                className="w-4 h-4 sm:w-6 sm:h-6"
                style={{
                  border: '2px solid #ff006e',
                  background: 'transparent',
                }}
              />
            </motion.div>
            
            {/* Inner dot - responsive */}
            <div 
              className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center relative"
              style={{
                background: '#ff006e',
                boxShadow: '0 0 20px #ff006e, 0 0 40px #ff006e50',
              }}
            >
              <motion.div
                className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
            
            {/* Label - always visible */}
            <div className="absolute top-full mt-1 sm:mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <motion.div
                className="text-[6px] sm:text-[8px] font-bold tracking-wider px-1 sm:px-2 py-0.5"
                style={{ 
                  color: '#ff006e',
                  background: 'rgba(255, 0, 110, 0.15)',
                  border: '1px solid rgba(255, 0, 110, 0.3)'
                }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="hidden sm:inline">YOU ARE HERE</span>
                <span className="sm:hidden">NOW</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

      {/* Scale labels - BELOW the timeline - responsive */}
      <div className="flex justify-between items-center mt-8 sm:mt-12 md:mt-14 px-1 sm:px-2">
        <div className="text-[9px] sm:text-[10px] md:text-[11px] text-cyan-400/70 font-mono font-medium tracking-wide">
          ← BIG BANG
        </div>
        <div className="text-[10px] sm:text-[11px] md:text-[12px] text-white/50 font-mono font-semibold tracking-wider">
          COSMIC TIMELINE
        </div>
        <div className="text-[9px] sm:text-[10px] md:text-[11px] text-amber-400/70 font-mono font-medium tracking-wide">
          PRESENT →
        </div>
      </div>
    </motion.div>
  );
}
