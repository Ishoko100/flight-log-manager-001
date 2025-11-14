
import React from 'react';
import { User, Drone, Flight, Page } from '../types';
import { CheckCircleIcon } from './icons/IconComponents';

interface ProfileProps {
    user: User;
    drones: Drone[];
    flights: Flight[];
    onNavigate: (page: Page) => void;
}

const ProfileStat: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="text-center">
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
    </div>
);

const DroneCard: React.FC<{ drone: Drone, delay: number }> = ({ drone, delay }) => (
    <div className={`flex items-center space-x-4 p-3 bg-white rounded-3xl shadow-lg shadow-slate-200/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl hover:shadow-slate-300/50 opacity-0 animate-slide-in-up`} style={{animationDelay: `${delay}ms`}}>
        <img src={drone.imageUrl} alt={drone.name} className="w-14 h-14 rounded-2xl object-cover" />
        <div className="flex-grow">
            <p className="font-bold text-slate-800">{drone.name}</p>
            <p className="text-sm text-slate-500">{drone.model}</p>
        </div>
        <button className="text-sm font-semibold text-teal-500 hover:text-teal-600 transition-colors">View Details</button>
    </div>
);

export const Profile: React.FC<ProfileProps> = ({ user, drones, flights, onNavigate }) => {
    const totalFlights = flights.length;
    const totalHours = (flights.reduce((acc, f) => acc + f.duration, 0) / 60).toFixed(1);

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4 bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 opacity-0 animate-slide-in-up">
                <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full ring-4 ring-offset-4 ring-offset-white ring-teal-400" />
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 text-center tracking-tight">{user.name}</h2>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                        <CheckCircleIcon className="w-4 h-4 text-teal-500" />
                        <p className="text-sm font-semibold text-teal-600">Certified Pilot</p>
                    </div>
                    <p className="text-sm text-slate-500 text-center mt-1">{user.email}</p>
                </div>
                <div className="bg-teal-100 text-teal-800 text-xs font-mono px-3 py-1.5 rounded-full font-semibold">
                    {user.licenseNumber}
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 opacity-0 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm font-semibold text-slate-500">Subscription Plan</p>
                        <p className="text-xl font-bold text-slate-800 capitalize">{user.plan_type.replace('_', ' ')}</p>
                        {user.plan_type !== 'free' && <p className="text-xs text-slate-400">Expires: {new Date(user.plan_expiry).toLocaleDateString()}</p>}
                    </div>
                    {user.plan_type !== 'pro' && (
                        <button
                            onClick={() => onNavigate(Page.Upgrade)}
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-2 px-5 rounded-xl transition-all duration-200 hover:opacity-90 shadow-md shadow-cyan-500/20 active:scale-95 transform hover:-translate-y-0.5"
                        >
                            Upgrade
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 divide-x divide-slate-200 opacity-0 animate-slide-in-up" style={{ animationDelay: '150ms' }}>
                <ProfileStat label="Flights" value={totalFlights} />
                <ProfileStat label="Hours" value={totalHours} />
                <ProfileStat label="Drones" value={drones.length} />
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center opacity-0 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">Registered Drones</h3>
                    <button className="text-sm font-semibold text-teal-500 hover:text-teal-600 transition-colors">+ Add Drone</button>
                </div>
                <div className="space-y-3">
                    {drones.map((drone, index) => (
                        <DroneCard key={drone.id} drone={drone} delay={400 + index * 100} />
                    ))}
                </div>
            </div>
        </div>
    );
};