// ========================================
// TYPE DEFINITIONS
// Demonstrates TypeScript proficiency
// ========================================

export interface SubEvent {
  icon: string;
  title: string;
  time: string;
  description?: string;
}

export interface TimelineEra {
  id: string;
  era: EraType;
  icon: string;
  title: string;
  time: string;
  timeValue: number; // Years ago (for sorting/calculations)
  description: string;
  highlight: string;
  details: string;
  subEvents: SubEvent[];
  color: string;
  funFact?: string;
  timePerspective?: string;
}

export type EraType = 
  | 'universe'
  | 'solar'
  | 'earth'
  | 'life'
  | 'complex'
  | 'cambrian'
  | 'fish'
  | 'land'
  | 'reptiles'
  | 'dinosaurs'
  | 'mammals-rise'
  | 'extinction'
  | 'mammals'
  | 'primates'
  | 'hominids'
  | 'humans'
  | 'modern';

export interface TimelineState {
  selectedEra: TimelineEra | null;
  expandedEras: Set<string>;
  zoomLevel: number;
  isModalOpen: boolean;
}

export interface ViewportState {
  width: number;
  height: number;
  isMobile: boolean;
}

// Scale configuration for zoom levels
export interface ScaleConfig {
  name: string;
  minTimeValue: number;
  maxTimeValue: number;
}

export const SCALE_CONFIGS: ScaleConfig[] = [
  { name: "Universe Scale (Billions of Years)", minTimeValue: 0, maxTimeValue: 14000000000 },
  { name: "Geological Scale (Hundreds of Millions)", minTimeValue: 0, maxTimeValue: 1000000000 },
  { name: "Evolutionary Scale (Millions of Years)", minTimeValue: 0, maxTimeValue: 100000000 },
  { name: "Mammalian Scale (Tens of Millions)", minTimeValue: 0, maxTimeValue: 10000000 },
  { name: "Human Scale (Hundreds of Thousands)", minTimeValue: 0, maxTimeValue: 500000 },
];
