// ========================================
// PROPORTIONAL TIMELINE SCRUBBER
// Shows actual time scale - visualizes how recent humans are
// ========================================

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { timelineData } from '../data/timelineData';

interface TimelineScrubberProps {
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

// The oldest event (Big Bang) in years
const MAX_TIME = 13800000000;

// Use logarithmic scale to make recent events visible while showing proportions
// OLD events (Big Bang) = LEFT (0%), NEW events (Humans) = RIGHT (100%)
const getLogPosition = (timeValue: number): number => {
  const minLog = Math.log10(200000); // ~200K years (modern humans)
  const maxLog = Math.log10(MAX_TIME);
  const currentLog = Math.log10(Math.max(timeValue, 200000));
  // Invert: older (bigger number) = left, newer (smaller number) = right
  return 100 - ((currentLog - minLog) / (maxLog - minLog)) * 100;
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

export function TimelineScrubber({ activeIndex, onIndexChange }: TimelineScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentEra = timelineData[activeIndex];

  return (
    <div style={{ 
      position: 'relative',
      zIndex: 50,
      paddingLeft: '48px',
      paddingRight: '48px',
      paddingTop: '24px',
      paddingBottom: '4px',
      marginTop: '32px',
      background: 'linear-gradient(to bottom, rgba(5, 5, 15, 0.95) 0%, rgba(5, 5, 15, 0.7) 80%, transparent 100%)',
    }}>
      {/* Main Timeline Track - FIRST */}
      <div 
        ref={containerRef}
        className="relative h-16"
        >
          {/* Background track */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-white/5" />
          
          {/* Colored progress track - from left to current position */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 h-1"
            style={{
              left: 0,
              width: `${getLogPosition(currentEra?.timeValue || MAX_TIME)}%`,
              background: `linear-gradient(90deg, ${timelineData[0]?.color}, ${currentEra?.color})`,
              boxShadow: `0 0 20px ${currentEra?.color}50`
            }}
          />

          {/* Era markers - positioned by LOG SCALE */}
          {timelineData.map((era, index) => {
            const position = getLogPosition(era.timeValue);
            const isActive = index === activeIndex;
            const isHovered = index === hoveredIndex;
            
            return (
              <motion.div
                key={era.id}
                className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${position}%`, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onIndexChange(index)}
              >
                {/* Icon marker */}
                <motion.div
                  className="relative flex items-center justify-center"
                  animate={{ 
                    scale: isActive ? 1.2 : isHovered ? 1.1 : 0.9,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center text-lg"
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

                {/* Vertical line BELOW the icon */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-px"
                  style={{
                    height: isActive ? 32 : isHovered ? 24 : 16,
                    top: '100%',
                    marginTop: 4,
                    background: `linear-gradient(to bottom, ${era.color}, transparent)`,
                    opacity: isActive ? 1 : 0.5,
                    transition: 'all 0.3s ease'
                  }}
                />

                {/* Time label below */}
                <motion.div
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
                  animate={{ opacity: isActive || isHovered ? 1 : 0.4 }}
                >
                  <div 
                    className="text-[9px] font-bold tracking-wide"
                    style={{ color: era.color }}
                  >
                    {formatTime(era.timeValue)}
                  </div>
                </motion.div>

                {/* Tooltip on hover/active */}
                {(isActive || isHovered) && (
                  <motion.div
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    <div 
                      className="px-3 py-1.5 text-xs font-medium"
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
        </div>

      {/* Scale labels - BELOW the timeline */}
      <div className="flex justify-between items-center mt-12 px-2">
        <div className="text-[11px] text-cyan-400/70 font-mono font-medium tracking-wide">
          ← BIG BANG
        </div>
        <div className="text-[12px] text-white/50 font-mono font-semibold tracking-wider">
          COSMIC TIMELINE
        </div>
        <div className="text-[11px] text-amber-400/70 font-mono font-medium tracking-wide">
          PRESENT →
        </div>
      </div>
    </div>
  );
}
