// ========================================
// COSMIC TIMELINE - Main Application
// A technical showcase of modern web development
// Built with: React, TypeScript, Three.js, Framer Motion, Zustand
// ========================================

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { 
  CosmicBackground, 
  Header, 
  ShelfTimeline, 
  DetailModal,
  CosmicClock,
  CosmicStats,
  PixelScale,
  ZoomLevels
} from './components';
import { useTimelineStore } from './store/timelineStore';

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0f]">
      <div className="text-center">
        <div 
          className="w-20 h-20 rounded-full mx-auto mb-6"
          style={{
            background: 'radial-gradient(circle, #00f5ff 0%, #bf00ff 50%, transparent 70%)',
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
        <p className="text-white/50 text-sm tracking-[0.3em] uppercase">Initializing Universe...</p>
      </div>
    </div>
  );
}

function App() {
  const { activeIndex, expandedEras } = useTimelineStore();
  const isCardExpanded = expandedEras.size > 0;
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0f]">
      {/* 3D Cosmic Background */}
      <Suspense fallback={<div className="fixed inset-0 bg-[#0a0a0f]" />}>
        <CosmicBackground />
      </Suspense>

      {/* Main Content */}
      <Suspense fallback={<LoadingFallback />}>
        <motion.div 
          className="relative z-10 min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Header />
          <ShelfTimeline />
        </motion.div>

        {/* UI Overlays */}
        <DetailModal />
        <CosmicClock currentEraIndex={activeIndex} isCardExpanded={isCardExpanded} />
        <CosmicStats currentEraIndex={activeIndex} isCardExpanded={isCardExpanded} />
        <PixelScale isCardExpanded={isCardExpanded} />
        <ZoomLevels isCardExpanded={isCardExpanded} />
      </Suspense>
    </div>
  );
}

export default App;
