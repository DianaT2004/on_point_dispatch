import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'online' | 'offline' | 'busy';
  verified: boolean;
  cdl: string;
  truckNumber: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateStatus: (status: User['status']) => void;
}

// Mock user data
const mockUser: User = {
  id: 'driver_001',
  name: 'John Driver',
  email: 'john.driver@fleet.com',
  phone: '+1-555-0100',
  status: 'online',
  verified: true,
  cdl: 'CDL-A-123456',
  truckNumber: 'TRK-789',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    set({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  updateStatus: (status) => {
    set((state) => ({
      user: state.user ? { ...state.user, status } : null,
    }));
  },
}));
