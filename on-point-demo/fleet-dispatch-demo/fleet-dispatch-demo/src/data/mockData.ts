export interface Load {
  id: string;
  title: string;
  origin: string;
  destination: string;
  payment: number;
  distance: number;
  weight: number;
  pickupDate: string;
  deliveryDate: string;
  status: 'available' | 'assigned' | 'in-transit' | 'delivered';
  coordinates: {
    pickup: { lat: number; lng: number };
    delivery: { lat: number; lng: number };
  };
  aiScore: number; // 0-100
  requirements: string[];
  shipper: {
    name: string;
    contact: string;
    email: string;
  };
}

export interface Service {
  id: string;
  type: 'fuel' | 'mechanic' | 'towing' | 'parking' | 'permits';
  name: string;
  phone: string;
  address: string;
  coordinates: { lat: number; lng: number };
  distance: number;
  rating: number;
  available247: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: 'bol' | 'invoice' | 'receipt' | 'permit' | 'insurance';
  loadId: string;
  date: string;
  size: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'driver' | 'shipper' | 'dispatch' | 'system';
  senderName: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const mockLoads: Load[] = [
  {
    id: 'load_1001',
    title: 'Fresh Produce — Tbilisi → Batumi',
    origin: 'Tbilisi, Georgia',
    destination: 'Batumi, Georgia',
    payment: 850,
    distance: 380,
    weight: 19000,
    pickupDate: '2025-11-16T08:00:00Z',
    deliveryDate: '2025-11-16T16:00:00Z',
    status: 'available',
    coordinates: {
      pickup: { lat: 41.7151, lng: 44.8271 },
      delivery: { lat: 41.6168, lng: 41.6367 },
    },
    aiScore: 95,
    requirements: ['BOL', 'Temperature controlled', 'Expedited'],
    shipper: {
      name: 'FreshFarms Logistics',
      contact: '+995-555-0101',
      email: 'ops@freshfarms.ge',
    },
  },
  {
    id: 'load_1002',
    title: 'Electronics — Tbilisi → Kutaisi',
    origin: 'Tbilisi, Georgia',
    destination: 'Kutaisi, Georgia',
    payment: 520,
    distance: 230,
    weight: 12700,
    pickupDate: '2025-11-17T10:00:00Z',
    deliveryDate: '2025-11-17T18:00:00Z',
    status: 'available',
    coordinates: {
      pickup: { lat: 41.7151, lng: 44.8271 },
      delivery: { lat: 42.2679, lng: 42.6985 },
    },
    aiScore: 88,
    requirements: ['BOL', 'Secured transport', 'Insurance verification'],
    shipper: {
      name: 'TechShip Solutions',
      contact: '+995-555-0202',
      email: 'dispatch@techship.ge',
    },
  },
  {
    id: 'load_1003',
    title: 'Building Materials — Rustavi → Gori',
    origin: 'Rustavi, Georgia',
    destination: 'Gori, Georgia',
    payment: 380,
    distance: 95,
    weight: 17200,
    pickupDate: '2025-11-18T07:00:00Z',
    deliveryDate: '2025-11-18T14:00:00Z',
    status: 'available',
    coordinates: {
      pickup: { lat: 41.5497, lng: 44.9939 },
      delivery: { lat: 41.9842, lng: 44.1089 },
    },
    aiScore: 82,
    requirements: ['BOL', 'Flatbed', 'Tarps required'],
    shipper: {
      name: 'BuildCo Transport',
      contact: '+995-555-0303',
      email: 'logistics@buildco.ge',
    },
  },
  {
    id: 'load_1004',
    title: 'Automotive Parts — Tbilisi → Zugdidi',
    origin: 'Tbilisi, Georgia',
    destination: 'Zugdidi, Georgia',
    payment: 720,
    distance: 340,
    weight: 19900,
    pickupDate: '2025-11-19T06:00:00Z',
    deliveryDate: '2025-11-20T20:00:00Z',
    status: 'available',
    coordinates: {
      pickup: { lat: 41.7151, lng: 44.8271 },
      delivery: { lat: 42.5088, lng: 41.8709 },
    },
    aiScore: 91,
    requirements: ['BOL', 'Secure transport', 'Delivery appointment'],
    shipper: {
      name: 'AutoParts Georgia',
      contact: '+995-555-0404',
      email: 'shipping@autoparts.ge',
    },
  },
  {
    id: 'load_1005',
    title: 'Retail Goods — Batumi → Poti',
    origin: 'Batumi, Georgia',
    destination: 'Poti, Georgia',
    payment: 280,
    distance: 65,
    weight: 9900,
    pickupDate: '2025-11-16T14:00:00Z',
    deliveryDate: '2025-11-16T20:00:00Z',
    status: 'available',
    coordinates: {
      pickup: { lat: 41.6168, lng: 41.6367 },
      delivery: { lat: 42.1475, lng: 41.6716 },
    },
    aiScore: 76,
    requirements: ['BOL', 'Sign on delivery'],
    shipper: {
      name: 'Retail Express Georgia',
      contact: '+995-555-0505',
      email: 'dispatch@retailexpress.ge',
    },
  },
  {
    id: 'load_1006',
    title: 'Food & Beverage — Kutaisi → Telavi',
    origin: 'Kutaisi, Georgia',
    destination: 'Telavi, Georgia',
    payment: 620,
    distance: 220,
    weight: 18100,
    pickupDate: '2025-11-20T05:00:00Z',
    deliveryDate: '2025-11-21T18:00:00Z',
    status: 'available',
    coordinates: {
      pickup: { lat: 42.2679, lng: 42.6985 },
      delivery: { lat: 41.9192, lng: 45.4733 },
    },
    aiScore: 89,
    requirements: ['BOL', 'Temperature controlled', 'Food grade trailer'],
    shipper: {
      name: 'Gourmet Distributors',
      contact: '+995-555-0606',
      email: 'ops@gourmetdist.ge',
    },
  },
];

export const mockServices: Service[] = [
  // Fuel Services
  {
    id: 'svc_001',
    type: 'fuel',
    name: 'RapidFuel Truck Stop',
    phone: '+995-555-7001',
    address: '45 Kakheti Highway, Tbilisi',
    coordinates: { lat: 41.720, lng: 44.835 },
    distance: 2.5,
    rating: 4.7,
    available247: true,
  },
  {
    id: 'svc_002',
    type: 'fuel',
    name: 'PetroPlus Station',
    phone: '+995-555-7002',
    address: '12 Poti Highway, Tbilisi',
    coordinates: { lat: 41.710, lng: 44.815 },
    distance: 4.2,
    rating: 4.5,
    available247: true,
  },
  {
    id: 'svc_003',
    type: 'fuel',
    name: 'Energy Fuel Center',
    phone: '+995-555-7003',
    address: '78 Rustavi Street, Tbilisi',
    coordinates: { lat: 41.725, lng: 44.850 },
    distance: 5.8,
    rating: 4.6,
    available247: false,
  },
  
  // Mechanic Services
  {
    id: 'svc_004',
    type: 'mechanic',
    name: 'BigRig Repairs & Service',
    phone: '+995-555-7004',
    address: '23 Industrial Boulevard, Tbilisi',
    coordinates: { lat: 41.700, lng: 44.825 },
    distance: 3.8,
    rating: 4.8,
    available247: true,
  },
  {
    id: 'svc_005',
    type: 'mechanic',
    name: 'TruckMaster Auto Service',
    phone: '+995-555-7005',
    address: '56 Kakheti Highway, Tbilisi',
    coordinates: { lat: 41.718, lng: 44.840 },
    distance: 5.2,
    rating: 4.6,
    available247: false,
  },
  {
    id: 'svc_006',
    type: 'mechanic',
    name: 'ProTruck Mechanics',
    phone: '+995-555-7006',
    address: '89 Gldani District, Tbilisi',
    coordinates: { lat: 41.735, lng: 44.805 },
    distance: 7.1,
    rating: 4.4,
    available247: true,
  },
  
  // Towing Services
  {
    id: 'svc_007',
    type: 'towing',
    name: '24/7 Heavy Duty Towing',
    phone: '+995-555-7007',
    address: '34 Service Road, Tbilisi',
    coordinates: { lat: 41.728, lng: 44.810 },
    distance: 1.9,
    rating: 4.9,
    available247: true,
  },
  {
    id: 'svc_008',
    type: 'towing',
    name: 'Rapid Response Towing',
    phone: '+995-555-7008',
    address: '67 Lilo Street, Tbilisi',
    coordinates: { lat: 41.740, lng: 44.860 },
    distance: 6.5,
    rating: 4.5,
    available247: true,
  },
  {
    id: 'svc_009',
    type: 'towing',
    name: 'Georgia Truck Towing',
    phone: '+995-555-7009',
    address: '15 Rustavi Highway, Tbilisi',
    coordinates: { lat: 41.695, lng: 44.845 },
    distance: 8.3,
    rating: 4.3,
    available247: false,
  },
  
  // Parking Services
  {
    id: 'svc_010',
    type: 'parking',
    name: 'Secure Truck Parking',
    phone: '+995-555-7010',
    address: '90 Parking Way, Tbilisi',
    coordinates: { lat: 41.705, lng: 44.820 },
    distance: 4.2,
    rating: 4.7,
    available247: true,
  },
  {
    id: 'svc_011',
    type: 'parking',
    name: 'SafeStop Truck Parking',
    phone: '+995-555-7011',
    address: '123 Kakheti Highway, Tbilisi',
    coordinates: { lat: 41.722, lng: 44.847 },
    distance: 5.5,
    rating: 4.6,
    available247: true,
  },
  {
    id: 'svc_012',
    type: 'parking',
    name: 'TruckRest Parking Area',
    phone: '+995-555-7012',
    address: '45 Gori Highway, Tbilisi',
    coordinates: { lat: 41.713, lng: 44.800 },
    distance: 6.8,
    rating: 4.4,
    available247: false,
  },
  
  // Permit Services
  {
    id: 'svc_013',
    type: 'permits',
    name: 'Georgia DOT Permit Office',
    phone: '+995-555-7013',
    address: '12 Government Plaza, Tbilisi',
    coordinates: { lat: 41.716, lng: 44.827 },
    distance: 2.1,
    rating: 4.5,
    available247: false,
  },
  {
    id: 'svc_014',
    type: 'permits',
    name: 'Express Permit Services',
    phone: '+995-555-7014',
    address: '78 Administrative Street, Tbilisi',
    coordinates: { lat: 41.708, lng: 44.833 },
    distance: 3.7,
    rating: 4.6,
    available247: false,
  },
  {
    id: 'svc_015',
    type: 'permits',
    name: 'FastTrack Permits',
    phone: '+995-555-7015',
    address: '34 City Center, Tbilisi',
    coordinates: { lat: 41.712, lng: 44.830 },
    distance: 4.9,
    rating: 4.3,
    available247: false,
  },
];

export const mockDocuments: Document[] = [
  {
    id: 'doc_001',
    name: 'Bill of Lading #1001',
    type: 'bol',
    loadId: 'load_1001',
    date: '2025-11-15T10:30:00Z',
    size: '245 KB',
  },
  {
    id: 'doc_002',
    name: 'Delivery Receipt #1001',
    type: 'receipt',
    loadId: 'load_1001',
    date: '2025-11-15T16:45:00Z',
    size: '128 KB',
  },
  {
    id: 'doc_003',
    name: 'Invoice #INV-2024-1001',
    type: 'invoice',
    loadId: 'load_1001',
    date: '2025-11-15T17:00:00Z',
    size: '156 KB',
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg_001',
    sender: 'system',
    senderName: 'FleetDispatch AI',
    message: 'Welcome! I am here to help you find and manage loads efficiently.',
    timestamp: '2025-11-15T08:00:00Z',
    read: true,
  },
  {
    id: 'msg_002',
    sender: 'dispatch',
    senderName: 'Central Dispatch',
    message: 'Good morning! We have 6 new loads matching your preferences.',
    timestamp: '2025-11-15T08:15:00Z',
    read: true,
  },
  {
    id: 'msg_003',
    sender: 'driver',
    senderName: 'You',
    message: 'Thanks! Looking at the LA to Vegas load now.',
    timestamp: '2025-11-15T08:20:00Z',
    read: true,
  },
  {
    id: 'msg_004',
    sender: 'shipper',
    senderName: 'FreshFarms Logistics',
    message: 'Great! The produce is ready for pickup at 8 AM tomorrow. Temperature must be maintained at 34-38°F.',
    timestamp: '2025-11-15T08:25:00Z',
    read: false,
  },
  {
    id: 'msg_005',
    sender: 'system',
    senderName: 'FleetDispatch AI',
    message: 'Reminder: Your next load pickup is scheduled for tomorrow at 8:00 AM in Los Angeles.',
    timestamp: '2025-11-15T18:00:00Z',
    read: false,
  },
];
