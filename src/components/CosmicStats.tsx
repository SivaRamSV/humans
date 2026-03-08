// ========================================
// COSMIC STATISTICS PANEL
// Mind-blowing statistics about cosmic time
// ========================================

import { motion } from 'framer-motion';
import { timelineData } from '../data/timelineData';

const UNIVERSE_AGE = 13_800_000_000;
const EARTH_AGE = 4_500_000_000;

interface CosmicStatsProps {
  currentEraIndex: number;
  isCardExpanded?: boolean;
}

export function CosmicStats({ currentEraIndex, isCardExpanded }: CosmicStatsProps) {
  const currentEra = timelineData[currentEraIndex];
  const yearsAgo = currentEra?.timeValue || 0;
  
  // Calculate percentage through cosmic history
  const percentComplete = ((UNIVERSE_AGE - yearsAgo) / UNIVERSE_AGE * 100);
  
  // Dynamic stats based on current era
  const getContextStats = () => {
    if (yearsAgo > 4_000_000_000) {
      // Early universe
      return [
        { label: 'Universe Age', value: '13.8B years', color: '#00f5ff' },
        { label: 'Time to First Stars', value: '~200M years', color: '#ffd700' },
        { label: 'Time to Earth', value: `${((UNIVERSE_AGE - EARTH_AGE) / 1_000_000_000).toFixed(1)}B years`, color: '#00ff88' },
      ];
    } else if (yearsAgo > 500_000_000) {
      // Earth/Life era
      return [
        { label: 'Earth Age', value: '4.5B years', color: '#00ff88' },
        { label: 'Life Age', value: '3.7B years', color: '#ff6b6b' },
        { label: 'Time to Humans', value: `${(yearsAgo / 1_000_000).toFixed(0)}M years`, color: '#bf00ff' },
      ];
    } else if (yearsAgo > 100_000) {
      // Pre-human era
      return [
        { label: 'Complex Life', value: '540M years', color: '#ff6b6b' },
        { label: 'Dinosaur Reign', value: '165M years', color: '#ffd700' },
        { label: 'Mammals Waiting', value: `${(yearsAgo / 1_000_000).toFixed(0)}M years`, color: '#bf00ff' },
      ];
    } else {
      // Human era
      return [
        { label: 'Human Existence', value: '300K years', color: '#bf00ff' },
        { label: 'Civilization', value: '10K years', color: '#ff006e' },
        { label: 'Digital Age', value: '40 years', color: '#00f5ff' },
      ];
    }
  };

  const stats = getContextStats();
  
  return (
    <motion.div
      className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 z-50"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isCardExpanded ? 0.15 : 1, x: 0 }}
      transition={{ delay: isCardExpanded ? 0 : 0.7, duration: isCardExpanded ? 0.3 : 0.8 }}
    >
      <div
        className="p-2 sm:p-3 md:p-4 min-w-[130px] sm:min-w-[180px] md:min-w-[240px]"
        style={{
          background: 'rgba(0, 0, 0, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Header */}
        <div className="text-[7px] sm:text-[8px] md:text-[10px] text-white/40 font-mono tracking-wider mb-1 sm:mb-3">
          <span className="hidden sm:inline">COSMIC PERSPECTIVE</span>
          <span className="sm:hidden">POSITION</span>
        </div>
        
        {/* Main shocking stat */}
        <div className="mb-2 sm:mb-4">
          <div className="text-white/50 text-[8px] sm:text-[10px] mb-0.5 sm:mb-1 hidden sm:block">POSITION IN COSMIC HISTORY</div>
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span 
              className="text-xl sm:text-2xl md:text-3xl font-bold font-mono"
              style={{ color: currentEra?.color || '#fff' }}
            >
              {percentComplete.toFixed(percentComplete > 99.99 ? 4 : 2)}%
            </span>
          </div>
          <div className="text-white/30 text-[8px] sm:text-[10px] mt-0.5 sm:mt-1">
            <span className="hidden sm:inline">through the universe's timeline</span>
            <span className="sm:hidden">cosmic history</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-2 sm:mb-4">
          <div className="h-1 sm:h-2 bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{ background: currentEra?.color || '#fff' }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(percentComplete, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
        
        {/* Context stats - hidden on mobile */}
        <div className="space-y-1 sm:space-y-2 border-t border-white/10 pt-1 sm:pt-3 hidden sm:block">
          {stats.map((stat, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-white/50 text-[8px] sm:text-[10px]">{stat.label}</span>
              <span 
                className="font-mono text-[10px] sm:text-xs font-bold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
        
        {/* Shocking comparison for human era - hidden on mobile */}
        {yearsAgo < 1_000_000 && (
          <motion.div
            className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-white/10 hidden sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="text-[8px] sm:text-[10px] text-amber-400/80 font-mono">
              ⚡ PERSPECTIVE CHECK
            </div>
            <div className="text-white/60 text-[9px] sm:text-[11px] mt-1 leading-relaxed">
              If Earth's history were 24 hours,<br/>
              humans appear at <span className="text-cyan-400 font-bold">23:59:56</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default CosmicStats;
