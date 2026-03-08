// ========================================
// DETAIL MODAL COMPONENT
// Full details view with animations
// ========================================

import { motion, AnimatePresence } from 'framer-motion';
import { useTimelineStore } from '../store/timelineStore';

export function DetailModal() {
  const { selectedEra, isModalOpen, closeModal } = useTimelineStore();

  if (!selectedEra) return null;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content - using inline styles to guarantee padding */}
          <motion.div
            className="relative max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '440px',
              background: 'rgba(15, 15, 25, 0.95)',
              border: `1px solid ${selectedEra.color}40`,
              boxShadow: `0 0 60px ${selectedEra.color}20`,
              padding: '48px', // Explicit 48px padding on all sides
            }}
          >
            {/* Close button */}
            <motion.button
              onClick={closeModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </motion.button>

            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
              <span 
                style={{ 
                  fontSize: '10px', 
                  fontWeight: 600, 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase',
                  color: selectedEra.color 
                }}
              >
                {selectedEra.highlight}
              </span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                <span style={{ fontSize: '40px' }}>{selectedEra.icon}</span>
                <h2 className="gradient-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {selectedEra.title}
                </h2>
              </div>
              
              <p style={{ 
                fontSize: '14px', 
                fontFamily: 'monospace', 
                marginTop: '8px',
                color: selectedEra.color 
              }}>
                {selectedEra.time}
              </p>
            </div>

            {/* Details */}
            <p style={{ 
              color: 'rgba(255,255,255,0.8)', 
              fontSize: '13px', 
              lineHeight: '1.7',
              marginBottom: '24px'
            }}>
              {selectedEra.details}
            </p>

            {/* Fun fact */}
            {selectedEra.funFact && (
              <div style={{ 
                padding: '16px', 
                marginBottom: '16px',
                backgroundColor: `${selectedEra.color}15` 
              }}>
                <p style={{ fontSize: '12px', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>🌟 Fun Fact: </span>
                  {selectedEra.funFact}
                </p>
              </div>
            )}

            {/* Time perspective */}
            {selectedEra.timePerspective && (
              <div style={{ 
                padding: '16px', 
                marginBottom: '24px',
                backgroundColor: `${selectedEra.color}10` 
              }}>
                <p style={{ fontSize: '12px', lineHeight: '1.6' }}>
                  <span style={{ color: selectedEra.color, fontWeight: 600 }}>⏱️ Time Perspective: </span>
                  {selectedEra.timePerspective}
                </p>
              </div>
            )}

            {/* Sub-events */}
            <div style={{ 
              borderTop: '1px solid rgba(255,255,255,0.1)', 
              paddingTop: '24px' 
            }}>
              <h3 style={{ 
                fontSize: '11px', 
                fontWeight: 600, 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase',
                marginBottom: '16px',
                color: selectedEra.color 
              }}>
                Key Events
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedEra.subEvents.map((event, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                    style={{ 
                      display: 'flex', 
                      gap: '12px', 
                      padding: '12px',
                      background: 'rgba(255,255,255,0.02)'
                    }}
                  >
                    <span style={{ fontSize: '20px', flexShrink: 0 }}>{event.icon}</span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{event.title}</div>
                      <div style={{ 
                        fontSize: '10px', 
                        fontFamily: 'monospace',
                        color: selectedEra.color 
                      }}>
                        {event.time}
                      </div>
                      {event.description && (
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                          {event.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DetailModal;
