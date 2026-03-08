// ========================================
// COSMIC CLOCK COMPONENT
// Carl Sagan's Cosmic Calendar visualization
// If the universe = 1 year, when did events occur?
// ========================================

import { motion } from 'framer-motion';
import { timelineData } from '../data/timelineData';

const UNIVERSE_AGE = 13_800_000_000; // years
const SECONDS_IN_YEAR = 365.25 * 24 * 60 * 60;

// Convert years ago to cosmic calendar date
function getCosmicDate(yearsAgo: number): { month: string; day: number; time: string } {
  const yearsSinceBigBang = UNIVERSE_AGE - yearsAgo;
  const fractionOfYear = yearsSinceBigBang / UNIVERSE_AGE;
  const totalSeconds = fractionOfYear * SECONDS_IN_YEAR;
  
  // Convert to date
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const secondsPerMonth = SECONDS_IN_YEAR / 12;
  const monthIndex = Math.floor(totalSeconds / secondsPerMonth);
  const dayInMonth = Math.floor((totalSeconds % secondsPerMonth) / (secondsPerMonth / 30)) + 1;
  
  // For December 31st events, calculate time
  if (monthIndex === 11 && dayInMonth >= 31) {
    const dec31Start = 11 * secondsPerMonth + 30 * (secondsPerMonth / 30);
    const secondsIntoDec31 = totalSeconds - dec31Start;
    const hours = Math.floor(secondsIntoDec31 / 3600) % 24;
    const minutes = Math.floor((secondsIntoDec31 % 3600) / 60);
    const seconds = Math.floor(secondsIntoDec31 % 60);
    return {
      month: 'December',
      day: 31,
      time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    };
  }
  
  return {
    month: months[Math.min(monthIndex, 11)],
    day: Math.min(dayInMonth, 31),
    time: ''
  };
}

interface CosmicClockProps {
  currentEraIndex: number;
}

export function CosmicClock({ currentEraIndex }: CosmicClockProps) {
  const currentEra = timelineData[currentEraIndex];
  const cosmicDate = getCosmicDate(currentEra?.timeValue || 0);
  
  return (
    <motion.div
      className="fixed bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 z-50"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div
        className="p-2 sm:p-3 md:p-4 min-w-[140px] sm:min-w-[180px] md:min-w-[220px]"
        style={{
          background: 'rgba(0, 0, 0, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Header */}
        <div className="text-[7px] sm:text-[8px] md:text-[10px] text-white/40 font-mono tracking-wider mb-1 sm:mb-2">
          <span className="hidden sm:inline">IF THE UNIVERSE WERE ONE YEAR</span>
          <span className="sm:hidden">COSMIC CALENDAR</span>
        </div>
        
        {/* Current cosmic date */}
        <div className="flex items-baseline gap-1 sm:gap-2 mb-1 sm:mb-3">
          <span className="text-lg sm:text-xl md:text-2xl">{currentEra?.icon}</span>
          <div>
            <div className="text-white font-bold text-sm sm:text-base md:text-lg">
              {cosmicDate.month} {cosmicDate.day}
            </div>
            {cosmicDate.time && (
              <div className="text-cyan-400 font-mono text-[10px] sm:text-xs md:text-sm">
                {cosmicDate.time}
              </div>
            )}
          </div>
        </div>
        
        {/* Current era name - hidden on mobile */}
        <div className="text-white/60 text-[10px] sm:text-xs mb-1 sm:mb-3 hidden sm:block">
          {currentEra?.title}
        </div>
        
        {/* Mini timeline - hidden on very small screens */}
        <div className="border-t border-white/10 pt-1 sm:pt-3 hidden sm:block">
          <div className="text-[8px] sm:text-[9px] text-white/30 font-mono mb-1 sm:mb-2">KEY DATES</div>
          <div className="space-y-0.5 sm:space-y-1 max-h-24 sm:max-h-32 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
            {[
              { name: 'Big Bang', date: 'Jan 1' },
              { name: 'Earth Forms', date: 'Sep 2' },
              { name: 'First Life', date: 'Sep 21' },
              { name: 'Dinosaurs Extinct', date: 'Dec 26' },
              { name: 'Humans', date: 'Dec 31, 23:59:46' },
              { name: 'Civilization', date: 'Dec 31, 23:59:59.5' },
            ].map((event, i) => (
              <div key={i} className="flex justify-between text-[8px] sm:text-[10px]">
                <span className="text-white/50">{event.name}</span>
                <span className="text-amber-400/70 font-mono">{event.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CosmicClock;
