// ========================================
// ZUSTAND STATE MANAGEMENT
// Demonstrates modern state management patterns
// ========================================

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { TimelineEra } from '../types/timeline';

interface TimelineStore {
  // State
  selectedEra: TimelineEra | null;
  expandedEras: Set<string>;
  zoomLevel: number;
  isModalOpen: boolean;
  activeIndex: number;
  
  // Actions
  selectEra: (era: TimelineEra | null) => void;
  toggleExpanded: (eraId: string) => void;
  setZoomLevel: (level: number) => void;
  openModal: (era: TimelineEra) => void;
  closeModal: () => void;
  setActiveIndex: (index: number) => void;
  reset: () => void;
}

const initialState = {
  selectedEra: null,
  expandedEras: new Set<string>(),
  zoomLevel: 0,
  isModalOpen: false,
  activeIndex: 0,
};

export const useTimelineStore = create<TimelineStore>()(
  devtools(
    (set) => ({
      ...initialState,

      selectEra: (era) => set({ selectedEra: era }),

      toggleExpanded: (eraId) =>
        set((state) => {
          const newExpanded = new Set(state.expandedEras);
          if (newExpanded.has(eraId)) {
            newExpanded.delete(eraId);
          } else {
            newExpanded.add(eraId);
          }
          return { expandedEras: newExpanded };
        }),

      setZoomLevel: (level) =>
        set({ zoomLevel: Math.max(0, Math.min(4, level)) }),

      openModal: (era) =>
        set({ selectedEra: era, isModalOpen: true }),

      closeModal: () =>
        set({ isModalOpen: false }),

      setActiveIndex: (index) =>
        set({ activeIndex: index, expandedEras: new Set<string>() }),

      reset: () => set(initialState),
    }),
    { name: 'timeline-store' }
  )
);

// Selectors for optimized re-renders
export const useSelectedEra = () => useTimelineStore((state) => state.selectedEra);
export const useExpandedEras = () => useTimelineStore((state) => state.expandedEras);
export const useZoomLevel = () => useTimelineStore((state) => state.zoomLevel);
export const useIsModalOpen = () => useTimelineStore((state) => state.isModalOpen);
export const useActiveIndex = () => useTimelineStore((state) => state.activeIndex);
