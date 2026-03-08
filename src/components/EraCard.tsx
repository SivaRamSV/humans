// ========================================
// ERA CARD COMPONENT
// Interactive timeline cards with animations
// Redesigned for better visual hierarchy
// ========================================

import { motion, AnimatePresence } from 'framer-motion';
import type { TimelineEra } from '../types/timeline';
import { useTimelineStore } from '../store/timelineStore';

interface EraCardProps {
  era: TimelineEra;
  index: number;
  zoomLevel: number;
}

export function EraCard({ era, index, zoomLevel }: EraCardProps) {
  const { expandedEras, toggleExpanded, openModal } = useTimelineStore();
  const isExpanded = expandedEras.has(era.id);

  // Scale card size based on zoom level
  const cardWidth = 320 + zoomLevel * 40;
  const cardPadding = 24 + zoomLevel * 8;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.8,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    },
    hover: {
      y: -15,
      scale: 1.03,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  return (
    <motion.div
      className="relative flex-shrink-0"
      style={{ width: cardWidth }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      {/* Timeline connector */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div 
          className="w-0.5 h-8"
          style={{ 
            background: `linear-gradient(to bottom, ${era.color}, transparent)`
          }}
        />
        <motion.div 
          className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
          style={{ 
            borderColor: era.color,
            boxShadow: `0 0 20px ${era.color}80, 0 0 40px ${era.color}40`
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            boxShadow: [
              `0 0 20px ${era.color}80, 0 0 40px ${era.color}40`,
              `0 0 30px ${era.color}, 0 0 60px ${era.color}60`,
              `0 0 20px ${era.color}80, 0 0 40px ${era.color}40`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: era.color }}
          />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        className="relative rounded-3xl cursor-pointer overflow-hidden"
        style={{ 
          padding: cardPadding,
          background: 'rgba(15, 15, 25, 0.7)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${isExpanded ? era.color : 'rgba(255,255,255,0.08)'}`,
          boxShadow: isExpanded 
            ? `0 0 40px ${era.color}30, 0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`
            : '0 25px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
        onClick={() => toggleExpanded(era.id)}
        onDoubleClick={() => openModal(era)}
        whileTap={{ scale: 0.98 }}
      >
        {/* Gradient accent line at top */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ 
            background: `linear-gradient(90deg, transparent, ${era.color}, transparent)`
          }}
        />

        {/* Header section */}
        <div className="flex items-start gap-5 mb-6">
          {/* Icon container */}
          <motion.div 
            className="relative flex-shrink-0"
            animate={isExpanded ? { rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
              style={{ 
                background: `linear-gradient(135deg, ${era.color}20, ${era.color}05)`,
                border: `1px solid ${era.color}30`
              }}
            >
              {era.icon}
            </div>
            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-50 blur-xl"
              style={{ backgroundColor: era.color }}
            />
          </motion.div>

          {/* Title section */}
          <div className="flex-1 min-w-0 pt-1">
            {/* Time badge */}
            <div className="flex items-center gap-2 mb-2">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: era.color }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span 
                className="text-xs font-mono tracking-widest uppercase"
                style={{ color: era.color }}
              >
                {era.time}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold leading-tight text-white mb-1">
              {era.title}
            </h3>

            {/* Highlight tag */}
            <span 
              className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
              style={{ 
                background: `${era.color}15`,
                color: era.color,
                border: `1px solid ${era.color}30`
              }}
            >
              {era.highlight}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-white/70 leading-relaxed mb-5 line-clamp-3">
          {era.description}
        </p>

        {/* Expand indicator */}
        <motion.div 
          className="flex items-center justify-between pt-4 border-t border-white/5"
        >
          <span className="text-xs text-white/40 tracking-wide">
            {isExpanded ? 'Double-click for full details' : `${era.subEvents.length} key events`}
          </span>
          <motion.div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ 
              background: `${era.color}15`,
              border: `1px solid ${era.color}30`
            }}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span style={{ color: era.color }} className="text-sm">▼</span>
          </motion.div>
        </motion.div>

        {/* Expanded sub-events */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-white/10 space-y-3">
                {era.subEvents.map((event, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, ease: "easeOut" }}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ 
                        background: `${era.color}10`,
                        border: `1px solid ${era.color}20`
                      }}
                    >
                      {event.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-white/90">{event.title}</div>
                      <div 
                        className="text-xs font-mono mt-0.5"
                        style={{ color: era.color }}
                      >
                        {event.time}
                      </div>
                      {event.description && (
                        <p className="text-xs text-white/50 mt-1 leading-relaxed">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default EraCard;
