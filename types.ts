
export interface User {
  name: string;
  email: string;
  licenseNumber: string;
  memberSince: string;
  avatarUrl: string;
  plan_type: 'free_trial' | 'free' | 'pro';
  plan_expiry: string;
  drone_log_limit: number;
  unlimited_logs: boolean;
}

export interface Drone {
  id: number;
  name: string;
  model: string;
  imageUrl: string;
  lastMaintenance: string;
  batteryCycles: number;
  status: 'Good' | 'Due Soon' | 'Overdue';
}

export interface Flight {
  id: number;
  droneId: number;
  date: string;
  duration: number; // in minutes
  location: string;
  coords: { lat: number; lng: number }; // For map plotting
  status: 'Completed' | 'Planned';
  notes?: string;
}

export enum Page {
  Home = 'Home',
  PreFlight = 'PreFlight',
  Add = 'Add',
  Status = 'Status',
  Profile = 'Profile',
  Settings = 'Settings',
  Analyze = 'Analyze',
  AISummary = 'AISummary',
  Upgrade = 'Upgrade',
  Referral = 'Referral',
  TermsOfService = 'TermsOfService',
  PrivacyPolicy = 'PrivacyPolicy',
}