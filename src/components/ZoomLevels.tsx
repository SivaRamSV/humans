// ========================================
// ZOOM LEVELS COMPONENT
// Switch between different time scales
// Universe → Earth → Life → Humans → Civilization
// ========================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimelineStore } from '../store/timelineStore';
import { timelineData } from '../data/timelineData';

interface ZoomLevel {
  id: string;
  name: string;
  range: string;
  years: number;
  color: string;
  startIndex: number; // Which era to jump to
}

const zoomLevels: ZoomLevel[] = [
  { id: 'universe', name: 'Universe', range: '13.8B years', years: 13_800_000_000, color: '#00f5ff', startIndex: 0 },
  { id: 'earth', name: 'Earth', range: '4.5B years', years: 4_500_000_000, color: '#00ff88', startIndex: 1 },
  { id: 'life', name: 'Life', range: '3.7B years', years: 3_700_000_000, color: '#ff6b6b', startIndex: 2 },
  { id: 'complex', name: 'Complex Life', range: '540M years', years: 540_000_000, color: '#ffd700', startIndex: 7 },
  { id: 'humans', name: 'Humans', range: '300K years', years: 300_000, color: '#bf00ff', startIndex: 13 },
  { id: 'civilization', name: 'Civilization', range: '10K years', years: 10_000, color: '#ff006e', startIndex: 15 },
];

interface ZoomLevelsProps {
  isCardExpanded?: boolean;
}

export function ZoomLevels({ isCardExpanded }: ZoomLevelsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeZoom, setActiveZoom] = useState('universe');
  const { setActiveIndex } = useTimelineStore();

  const handleZoom = (level: ZoomLevel) => {
    setActiveZoom(level.id);
    // Jump to the relevant era
    const targetIndex = Math.min(level.startIndex, timelineData.length - 1);
    setActiveIndex(targetIndex);
    setIsExpanded(false);
  };

  const currentZoom = zoomLevels.find(z => z.id === activeZoom) || zoomLevels[0];

  return (
    <motion.div
      className="fixed left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 z-50 hidden sm:block"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isCardExpanded ? 0.15 : 1, y: 0 }}
      transition={{ delay: isCardExpanded ? 0 : 0.8, duration: isCardExpanded ? 0.3 : 0.8 }}
      style={{ pointerEvents: isCardExpanded ? 'none' : 'auto' }}
    >
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-3 px-4 py-2"
        style={{
          background: 'rgba(0, 0, 0, 0.85)',
          border: `1px solid ${currentZoom.color}40`,
        }}
        whileHover={{ borderColor: currentZoom.color }}
      >
        <div className="text-[9px] text-white/40 font-mono tracking-wider">
          ZOOM LEVEL
        </div>
        <div 
          className="font-bold text-sm font-mono"
          style={{ color: currentZoom.color }}
        >
          {currentZoom.name}
        </div>
        <motion.span
          className="text-white/40"
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          ▲
        </motion.span>
      </motion.button>

      {/* Expanded zoom options */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scaleY: 0 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: 10, scaleY: 0 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: '8px',
              background: 'rgba(0, 0, 0, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '8px',
              transformOrigin: 'bottom',
            }}
          >
            <div className="text-[8px] text-white/30 font-mono tracking-wider mb-2 text-center">
              SELECT TIME SCALE
            </div>
            <div className="flex gap-1">
              {zoomLevels.map((level) => (
                <motion.button
                  key={level.id}
                  onClick={() => handleZoom(level)}
                  className="px-3 py-2 text-center"
                  style={{
                    background: activeZoom === level.id ? `${level.color}20` : 'transparent',
                    border: `1px solid ${activeZoom === level.id ? level.color : 'transparent'}`,
                  }}
                  whileHover={{
                    background: `${level.color}15`,
                    borderColor: `${level.color}50`,
                  }}
                >
                  <div 
                    className="text-xs font-bold whitespace-nowrap"
                    style={{ color: level.color }}
                  >
                    {level.name}
                  </div>
                  <div className="text-[9px] text-white/40 font-mono mt-0.5">
                    {level.range}
                  </div>
                </motion.button>
              ))}
            </div>
            
            {/* Scale comparison */}
            <div className="mt-3 pt-2 border-t border-white/10">
              <div className="text-[8px] text-white/30 text-center mb-2">RELATIVE SCALE</div>
              <div className="flex items-end justify-center gap-0.5 h-8">
                {zoomLevels.map((level) => {
                  // Logarithmic scale for visualization
                  const logScale = Math.log10(level.years) / Math.log10(13_800_000_000);
                  const height = Math.max(4, logScale * 32);
                  return (
                    <motion.div
                      key={level.id}
                      className="w-6"
                      style={{
                        height,
                        background: activeZoom === level.id 
                          ? level.color 
                          : `${level.color}40`,
                      }}
                      animate={{
                        opacity: activeZoom === level.id ? 1 : 0.5,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ZoomLevels;
