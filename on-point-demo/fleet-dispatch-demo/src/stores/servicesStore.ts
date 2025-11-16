import { create } from 'zustand';
import { Service, mockServices } from '../data/mockData';

interface ServiceRequest {
  service: Service;
  message: string;
  status: 'drafting' | 'sending' | 'sent';
}

interface ServicesState {
  services: Service[];
  selectedService: Service | null;
  serviceRequest: ServiceRequest | null;
  isRequesting: boolean;
  setSelectedService: (service: Service | null) => void;
  requestService: (service: Service, message: string) => Promise<void>;
  getServicesByType: (type: Service['type']) => Service[];
}

export const useServicesStore = create<ServicesState>((set, get) => ({
  services: mockServices,
  selectedService: null,
  serviceRequest: null,
  isRequesting: false,

  setSelectedService: (service) => set({ selectedService: service }),

  requestService: async (service: Service, message: string) => {
    set({
      isRequesting: true,
      serviceRequest: {
        service,
        message,
        status: 'drafting',
      },
    });

    // Simulate drafting message
    await new Promise((resolve) => setTimeout(resolve, 800));
    set((state) => ({
      serviceRequest: state.serviceRequest
        ? { ...state.serviceRequest, status: 'sending' }
        : null,
    }));

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1200));
    set((state) => ({
      serviceRequest: state.serviceRequest
        ? { ...state.serviceRequest, status: 'sent' }
        : null,
      isRequesting: false,
    }));

    // Reset after delay
    setTimeout(() => {
      set({ serviceRequest: null, selectedService: null });
    }, 2000);
  },

  getServicesByType: (type) => {
    return get().services.filter((service) => service.type === type);
  },
}));
