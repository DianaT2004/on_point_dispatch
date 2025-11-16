import { create } from 'zustand';

interface BOLData {
  loadId: string;
  shipper: string;
  receiver: string;
  items: string;
  weight: string;
  pickupDate: string;
  deliveryDate: string;
}

interface DispatchState {
  isDispatching: boolean;
  currentStep: number;
  steps: string[];
  bolData: BOLData | null;
  error: string | null;
  startDispatch: (loadId: string) => void;
  nextStep: () => void;
  reset: () => void;
}

const dispatchSteps = [
  'Verifying driver credentials',
  'Contacting shipper',
  'Requesting Bill of Lading',
  'Waiting for company approval',
  'Confirming pickup details',
  'Generating documentation',
];

export const useDispatchStore = create<DispatchState>((set, get) => ({
  isDispatching: false,
  currentStep: -1,
  steps: dispatchSteps,
  bolData: null,
  error: null,

  startDispatch: (loadId: string) => {
    set({
      isDispatching: true,
      currentStep: 0,
      error: null,
      bolData: null,
    });
  },

  nextStep: () => {
    const { currentStep, steps } = get();
    
    if (currentStep < steps.length - 1) {
      set({ currentStep: currentStep + 1 });
    } else if (currentStep === steps.length - 1) {
      // Generate mock BOL data on final step
      set({
        currentStep: currentStep + 1,
        bolData: {
          loadId: 'LOAD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          shipper: 'FreshFarms Logistics',
          receiver: 'Vegas Fresh Market',
          items: 'Fresh Produce (Apples, Oranges)',
          weight: '42,000 lbs',
          pickupDate: new Date(Date.now() + 86400000).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          deliveryDate: new Date(Date.now() + 172800000).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
        },
      });
    }
  },

  reset: () => {
    set({
      isDispatching: false,
      currentStep: -1,
      bolData: null,
      error: null,
    });
  },
}));
