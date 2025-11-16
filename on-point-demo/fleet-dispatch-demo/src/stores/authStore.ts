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
  age?: number;
  yearsExperience?: number;
  truckType?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateStatus: (status: User['status']) => void;
}

// Mock user data - Dachi Ghambashidze
const mockUser: User = {
  id: 'driver_001',
  name: 'Dachi Ghambashidze',
  email: 'dachi@onpoint.ge',
  phone: '+995-555-0100',
  status: 'online',
  verified: true,
  cdl: 'GE-DL-123456',
  truckNumber: 'TBL-789',
  age: 32,
  yearsExperience: 8,
  truckType: 'dry-van',
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

  register: async (data: any) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Create user from registration data
    const newUser: User = {
      id: 'driver_' + Math.random().toString(36).substr(2, 9),
      name: data.fullName || 'Dachi Ghambashidze',
      email: data.email || 'dachi@onpoint.ge',
      phone: data.phone || '+995-555-0100',
      status: 'online',
      verified: false,
      cdl: data.driverLicense || 'PENDING',
      truckNumber: 'TBL-' + Math.floor(Math.random() * 1000),
      age: data.age ? parseInt(data.age) : undefined,
      yearsExperience: data.yearsExperience ? parseInt(data.yearsExperience) : undefined,
      truckType: data.truckType || undefined,
    };
    
    set({
      user: newUser,
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
