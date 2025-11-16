import { create } from 'zustand';
import { Load, mockLoads } from '../data/mockData';

interface LoadsState {
  loads: Load[];
  selectedLoad: Load | null;
  isScanning: boolean;
  scanProgress: number;
  filters: {
    location: string;
    minPay: number;
    maxDistance: number;
    sortBy: 'ai-score' | 'payment' | 'distance' | 'pickup-date';
  };
  setSelectedLoad: (load: Load | null) => void;
  takeLoad: (loadId: string) => void;
  updateFilters: (filters: Partial<LoadsState['filters']>) => void;
  startAiScan: () => Promise<void>;
  getFilteredLoads: () => Load[];
}

export const useLoadsStore = create<LoadsState>((set, get) => ({
  loads: [], // Start empty - populate after first scan
  selectedLoad: null,
  isScanning: false,
  scanProgress: 0,
  filters: {
    location: '',
    minPay: 0,
    maxDistance: 1000,
    sortBy: 'ai-score',
  },

  setSelectedLoad: (load) => set({ selectedLoad: load }),

  takeLoad: (loadId) => {
    set((state) => ({
      loads: state.loads.map((load) =>
        load.id === loadId ? { ...load, status: 'assigned' as const } : load
      ),
      selectedLoad: null,
    }));
  },

  updateFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  startAiScan: async () => {
    set({ isScanning: true, scanProgress: 0 });

    // Simulate AI scanning with progress
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      set({ scanProgress: (i / steps) * 100 });
    }

    // Load and rank loads with AI scores
    set({
      loads: mockLoads.map((load) => ({
        ...load,
        aiScore: Math.min(100, Math.max(70, load.aiScore + (Math.random() * 6 - 3))),
      })),
      isScanning: false,
      scanProgress: 100,
    });

    // Reset progress after a delay
    setTimeout(() => {
      set({ scanProgress: 0 });
    }, 1000);
  },

  getFilteredLoads: () => {
    const { loads, filters } = get();
    let filtered = loads.filter(
      (load) =>
        load.status === 'available' &&
        load.payment >= filters.minPay &&
        load.distance <= filters.maxDistance &&
        (filters.location === '' ||
          load.origin.toLowerCase().includes(filters.location.toLowerCase()) ||
          load.destination.toLowerCase().includes(filters.location.toLowerCase()))
    );

    // Sort by selected criteria
    switch (filters.sortBy) {
      case 'ai-score':
        filtered.sort((a, b) => b.aiScore - a.aiScore);
        break;
      case 'payment':
        filtered.sort((a, b) => b.payment - a.payment);
        break;
      case 'distance':
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case 'pickup-date':
        filtered.sort(
          (a, b) =>
            new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime()
        );
        break;
    }

    return filtered;
  },
}));
