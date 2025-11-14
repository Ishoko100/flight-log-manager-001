
import { User, Drone, Flight } from './types';

export const MOCK_USER: User = {
  name: 'John Doe',
  email: 'pilot@example.com',
  licenseNumber: 'FAA-123456789',
  memberSince: '2022',
  avatarUrl: 'https://picsum.photos/seed/user/100/100',
  plan_type: 'free_trial',
  plan_expiry: '2024-01-01', // Expired date to trigger the alert
  drone_log_limit: 5,
  unlimited_logs: false,
};

export const MOCK_DRONES: Drone[] = [
  { id: 1, name: 'DJI Mavic 3', model: 'Pro', imageUrl: 'https://picsum.photos/seed/mavic3/200/200', lastMaintenance: '2023-10-28', batteryCycles: 142, status: 'Good' },
  { id: 2, name: 'DJI Air 3', model: 'Air', imageUrl: 'https://picsum.photos/seed/air3/200/200', lastMaintenance: '2023-11-15', batteryCycles: 85, status: 'Good' },
  { id: 3, name: 'Autel Evo II', model: 'Pro', imageUrl: 'https://picsum.photos/seed/evo2/200/200', lastMaintenance: '2023-08-30', batteryCycles: 201, status: 'Due Soon' },
  { id: 4, name: 'DJI Mini 4 Pro', model: 'Mini', imageUrl: 'https://picsum.photos/seed/mini4/200/200', lastMaintenance: '2023-09-18', batteryCycles: 247, status: 'Overdue' },
  { id: 5, name: 'Skydio 2+', model: 'Pro', imageUrl: 'https://picsum.photos/seed/skydio2/200/200', lastMaintenance: '2024-01-05', batteryCycles: 34, status: 'Good' },
  { id: 6, name: 'Parrot Anafi', model: 'Thermal', imageUrl: '', lastMaintenance: '2024-01-10', batteryCycles: 68, status: 'Good' },
];

export const MOCK_FLIGHTS: Flight[] = [
  { id: 1, droneId: 1, date: 'Nov 1, 2023', duration: 28, location: 'Golden Gate Park', coords: { lat: 37.769, lng: -122.486 }, status: 'Completed', notes: 'Perfect weather, captured great cinematic shots.' },
  { id: 2, droneId: 2, date: 'Nov 2, 2023', duration: 20, location: 'Statue of Liberty', coords: { lat: 40.689, lng: -74.044 }, status: 'Completed', notes: 'Windy conditions, but the drone was stable.' },
  { id: 3, droneId: 3, date: 'Nov 5, 2023', duration: 35, location: 'Grand Canyon', coords: { lat: 36.106, lng: -112.112 }, status: 'Completed' },
  { id: 4, droneId: 4, date: 'Nov 7, 2023', duration: 22, location: 'Mount Rushmore', coords: { lat: 43.879, lng: -103.459 }, status: 'Completed', notes: 'Followed all flight restrictions in the area.' },
  { id: 5, droneId: 1, date: 'Nov 10, 2023', duration: 31, location: 'Eiffel Tower', coords: { lat: 48.858, lng: 2.294 }, status: 'Completed' },
];