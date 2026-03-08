// ========================================
// TIMELINE TRACK COMPONENT
// Horizontal scrolling timeline with zoom
// ========================================

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { timelineData } from '../data/timelineData';
import { EraCard } from './EraCard';
import { useTimelineStore } from '../store/timelineStore';

export function TimelineTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { zoomLevel } = useTimelineStore();

  // Calculate spacing based on zoom
  const cardGap = 40 + zoomLevel * 20;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      
      if (e.key === 'ArrowRight') {
        containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse wheel horizontal scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="overflow-x-auto overflow-y-visible px-12 py-20 relative min-h-[80vh]"
      style={{ 
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(191, 0, 255, 0.5) transparent'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Timeline track line */}
      <div className="absolute left-0 right-0 bottom-24 h-[3px] pointer-events-none">
        <motion.div 
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #00f5ff 10%, #bf00ff 30%, #ff006e 50%, #ffd700 70%, #00ff88 90%, transparent)',
            boxShadow: '0 0 30px rgba(0, 245, 255, 0.4), 0 0 60px rgba(191, 0, 255, 0.2)'
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        />
      </div>

      {/* Gradient fade edges */}
      <div className="fixed left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none z-20" />
      <div className="fixed right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none z-20" />

      {/* Cards container */}
      <motion.div 
        className="flex items-end min-w-max relative z-10 pb-16"
        style={{ gap: cardGap }}
        layout
        transition={{ duration: 0.5 }}
      >
        {timelineData.map((era, index) => (
          <EraCard key={era.id} era={era} index={index} zoomLevel={zoomLevel} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default TimelineTrack;
