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
}

export function CosmicStats({ currentEraIndex }: CosmicStatsProps) {
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
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.8 }}
    >
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px 20px',
          minWidth: '240px',
        }}
      >
        {/* Header */}
        <div className="text-[10px] text-white/40 font-mono tracking-wider mb-3">
          COSMIC PERSPECTIVE
        </div>
        
        {/* Main shocking stat */}
        <div className="mb-4">
          <div className="text-white/50 text-[10px] mb-1">POSITION IN COSMIC HISTORY</div>
          <div className="flex items-baseline gap-2">
            <span 
              className="text-3xl font-bold font-mono"
              style={{ color: currentEra?.color || '#fff' }}
            >
              {percentComplete.toFixed(percentComplete > 99.99 ? 6 : 2)}%
            </span>
          </div>
          <div className="text-white/30 text-[10px] mt-1">
            through the universe's timeline
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-2 bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{ background: currentEra?.color || '#fff' }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(percentComplete, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
        
        {/* Context stats */}
        <div className="space-y-2 border-t border-white/10 pt-3">
          {stats.map((stat, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-white/50 text-[10px]">{stat.label}</span>
              <span 
                className="font-mono text-xs font-bold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
        
        {/* Shocking comparison for human era */}
        {yearsAgo < 1_000_000 && (
          <motion.div
            className="mt-4 pt-3 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="text-[10px] text-amber-400/80 font-mono">
              ⚡ PERSPECTIVE CHECK
            </div>
            <div className="text-white/60 text-[11px] mt-1 leading-relaxed">
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
