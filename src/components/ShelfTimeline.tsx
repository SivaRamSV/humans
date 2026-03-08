// ========================================
// SHELF TIMELINE - CLEAN PROFESSIONAL DESIGN
// ========================================

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { timelineData } from '../data/timelineData';
import { useTimelineStore } from '../store/timelineStore';
import { TimelineScrubber } from './TimelineScrubber';

export function ShelfTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { expandedEras, toggleExpanded, openModal } = useTimelineStore();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => Math.min(timelineData.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const currentEra = timelineData[activeIndex];
        if (currentEra) toggleExpanded(currentEra.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, toggleExpanded]);

  // Mouse wheel navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: ReturnType<typeof setTimeout>;
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;
      
      isScrolling = true;
      clearTimeout(scrollTimeout);
      
      if (e.deltaY > 0 || e.deltaX > 0) {
        setActiveIndex(prev => Math.min(timelineData.length - 1, prev + 1));
      } else {
        setActiveIndex(prev => Math.max(0, prev - 1));
      }

      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 300);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(x * 15);
    mouseY.set(y * 10);
  }, [mouseX, mouseY]);

  const currentEra = timelineData[activeIndex];

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse 50% 35% at 50% 50%, ${currentEra?.color}10 0%, transparent 70%)`
        }}
        transition={{ duration: 1 }}
      />

      {/* Timeline at TOP */}
      <TimelineScrubber activeIndex={activeIndex} onIndexChange={setActiveIndex} />

      {/* Main content - Cards below timeline */}
      <div className="flex-1 flex items-center justify-center relative" style={{ perspective: '1200px' }}>
        
        {/* Nav arrows */}
        <NavArrow 
          direction="left" 
          onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
          disabled={activeIndex === 0}
          color={currentEra?.color}
        />
        <NavArrow 
          direction="right" 
          onClick={() => setActiveIndex(prev => Math.min(timelineData.length - 1, prev + 1))}
          disabled={activeIndex === timelineData.length - 1}
          color={currentEra?.color}
        />

        {/* Carousel */}
        <motion.div 
          className="relative w-full max-w-6xl mx-auto h-[480px] flex items-center justify-center"
          style={{
            rotateX: useTransform(springY, [-10, 10], [2, -2]),
            rotateY: useTransform(springX, [-15, 15], [-2, 2]),
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Side masks */}
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-gradient-to-r from-[#0a0a0f] from-50% to-transparent z-30 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-gradient-to-l from-[#0a0a0f] from-50% to-transparent z-30 pointer-events-none" />

          {/* Cards */}
          <AnimatePresence mode="popLayout">
            {timelineData.map((era, index) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);
              if (absOffset > 2) return null;

              return (
                <EraCard
                  key={era.id}
                  era={era}
                  offset={offset}
                  isActive={offset === 0}
                  isExpanded={expandedEras.has(era.id)}
                  onSelect={() => offset === 0 ? toggleExpanded(era.id) : setActiveIndex(index)}
                  onOpenModal={() => openModal(era)}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// Nav Arrow
function NavArrow({ direction, onClick, disabled, color = '#00f5ff' }: {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
  color?: string;
}) {
  return (
    <motion.button
      className={`absolute ${direction === 'left' ? 'left-6' : 'right-6'} z-40 
        w-12 h-12 flex items-center justify-center`}
      style={{
        background: 'rgba(15, 15, 25, 0.6)',
        border: `1px solid ${disabled ? 'rgba(255,255,255,0.1)' : color + '30'}`,
      }}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05, background: 'rgba(25, 25, 40, 0.8)' }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      animate={{ opacity: disabled ? 0.3 : 1 }}
    >
      <span style={{ color: disabled ? 'rgba(255,255,255,0.3)' : color, fontSize: '20px' }}>
        {direction === 'left' ? '‹' : '›'}
      </span>
    </motion.button>
  );
}

// Era Card - Clean Professional Design with inline styles
function EraCard({ era, offset, isActive, isExpanded, onSelect, onOpenModal }: {
  era: typeof timelineData[0];
  offset: number;
  isActive: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onOpenModal: () => void;
}) {
  const absOffset = Math.abs(offset);
  
  const xOffset = offset * 500;
  const zOffset = -absOffset * 200;
  const rotateY = offset * -15;
  const scale = isActive ? 1 : 0.55;
  const cardOpacity = isActive ? 1 : 0.2;

  const formatTime = (val: number) => {
    if (val >= 1e9) return `${(val/1e9).toFixed(1)} billion years ago`;
    if (val >= 1e6) return `${(val/1e6).toFixed(0)} million years ago`;
    if (val >= 1e3) return `${(val/1e3).toFixed(0)}K years ago`;
    return `${val} years ago`;
  };

  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ x: xOffset, z: zOffset, rotateY, scale, opacity: cardOpacity }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
      style={{ transformStyle: 'preserve-3d', zIndex: isActive ? 20 : 10 - absOffset }}
    >
      <motion.div
        style={{ width: '420px', cursor: 'pointer', userSelect: 'none' }}
        onClick={onSelect}
        onDoubleClick={onOpenModal}
        whileTap={{ scale: 0.98 }}
      >
        {/* Glow */}
        {isActive && (
          <motion.div
            style={{
              position: 'absolute',
              inset: '-16px',
              filter: 'blur(48px)',
              backgroundColor: era.color,
              opacity: 0.08,
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Card Container */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, rgba(18, 18, 28, 0.98), rgba(12, 12, 20, 0.99))',
            border: `1px solid ${isActive ? era.color + '30' : 'rgba(255,255,255,0.05)'}`,
            boxShadow: isActive ? '0 25px 50px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          {/* Accent line */}
          <div style={{ height: '3px', background: era.color }} />

          {/* Content with generous padding */}
          <div style={{ padding: '28px' }}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
              {/* Icon */}
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0,
                  background: `${era.color}15`,
                  border: `1px solid ${era.color}30`,
                }}
              >
                {era.icon}
              </div>
              
              {/* Title & Time */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ 
                  fontSize: '11px', 
                  fontWeight: 500, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  marginBottom: '4px',
                  color: era.color 
                }}>
                  {formatTime(era.timeValue)}
                </p>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', lineHeight: 1.3 }}>
                  {era.title}
                </h2>
              </div>
            </div>

            {/* Description */}
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.7, marginBottom: '20px' }}>
              {era.description}
            </p>

            {/* Highlight tag */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                background: `${era.color}10`,
                border: `1px solid ${era.color}20`
              }}
            >
              <span>✨</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: era.color }}>
                {era.highlight}
              </span>
            </div>

            {/* Click hint */}
            {isActive && !isExpanded && (
              <p style={{ marginTop: '24px', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                Click to see key events
              </p>
            )}

            {/* Expanded content */}
            <AnimatePresence>
              {isExpanded && isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
                      Key Events
                    </p>
                    
                    {/* Events list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {era.subEvents?.slice(0, 4).map((event, i) => (
                        <motion.div
                          key={i}
                          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <div 
                            style={{
                              width: '36px',
                              height: '36px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '16px',
                              flexShrink: 0,
                              background: `${era.color}12`
                            }}
                          >
                            {event.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 500 }}>{event.title}</p>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>{event.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      style={{
                        marginTop: '24px',
                        width: '100%',
                        padding: '12px',
                        fontSize: '13px',
                        fontWeight: 500,
                        background: `${era.color}15`,
                        border: `1px solid ${era.color}30`,
                        color: era.color,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onClick={(e) => { e.stopPropagation(); onOpenModal(); }}
                    >
                      View Full Details →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
