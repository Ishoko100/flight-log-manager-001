
import React, { useState } from 'react';
import { Drone, Flight } from '../types';
import { SunIcon, CloudIcon, CloudRainIcon, WindIcon, SnowIcon, DroneIcon } from './icons/IconComponents';

interface AddFlightProps {
    drones: Drone[];
    addFlightLog: (flight: Omit<Flight, 'id' | 'coords' | 'status'>) => void;
    onNavigateBack: () => void;
}

interface InputFieldProps {
    label: string;
    type: string;
    placeholder: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, name, value, onChange }) => (
    <div>
        <label className="block text-sm font-semibold text-slate-600 mb-2">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition"
        />
    </div>
);

export const AddFlight: React.FC<AddFlightProps> = ({ drones, addFlightLog, onNavigateBack }) => {
    const [selectedWeather, setSelectedWeather] = useState('Sunny');
    const [selectedDroneId, setSelectedDroneId] = useState<number>(drones[0]?.id || 1);
    const [flightData, setFlightData] = useState({
        date: new Date().toISOString().split('T')[0],
        location: '',
        duration: '',
        batteryLevel: '',
        notes: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFlightData(prev => ({ ...prev, [name]: value }));
    };

    const WeatherOption: React.FC<{
        label: string;
        icon: React.ElementType;
        isSelected: boolean;
        onClick: () => void;
    }> = ({ label, icon: Icon, isSelected, onClick }) => (
        <button
            type="button"
            onClick={onClick}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                isSelected 
                ? 'bg-teal-500/10 border-teal-500 text-teal-600' 
                : 'bg-slate-100 border-transparent text-slate-500 hover:border-slate-300'
            }`}
        >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-semibold">{label}</span>
        </button>
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newFlight = {
            droneId: selectedDroneId,
            date: flightData.date || new Date().toISOString().split('T')[0],
            duration: Number(flightData.duration) || 0,
            location: flightData.location || 'Unknown Location',
            notes: flightData.notes,
        };
        addFlightLog(newFlight);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Record New Flight</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Select Drone</label>
                    <div className="grid grid-cols-3 gap-3">
                        {drones.map(drone => (
                            <button
                                key={drone.id}
                                type="button"
                                onClick={() => setSelectedDroneId(drone.id)}
                                className={`p-3 rounded-xl border-2 text-center transition-all duration-200 focus:outline-none ${
                                    selectedDroneId === drone.id
                                    ? 'bg-teal-500/10 border-teal-500 ring-2 ring-teal-500/50'
                                    : 'bg-slate-100 border-transparent hover:border-slate-300'
                                }`}
                            >
                                <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-2 overflow-hidden bg-slate-200">
                                {drone.imageUrl ? (
                                    <img src={drone.imageUrl} alt={drone.name} className="w-full h-full object-cover" />
                                ) : (
                                    <DroneIcon className="w-8 h-8 text-slate-500" />
                                )}
                                </div>
                                <p className={`text-xs font-semibold truncate ${selectedDroneId === drone.id ? 'text-teal-600' : 'text-slate-700'}`}>{drone.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
                
                <InputField label="Flight Date" type="date" placeholder="" name="date" value={flightData.date} onChange={handleInputChange} />
                <InputField label="Location" type="text" placeholder="Golden Gate Park" name="location" value={flightData.location} onChange={handleInputChange} />
                
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Weather</label>
                    <div className="flex gap-2 sm:gap-3">
                        <WeatherOption label="Sunny" icon={SunIcon} isSelected={selectedWeather === 'Sunny'} onClick={() => setSelectedWeather('Sunny')} />
                        <WeatherOption label="Cloudy" icon={CloudIcon} isSelected={selectedWeather === 'Cloudy'} onClick={() => setSelectedWeather('Cloudy')} />
                        <WeatherOption label="Rainy" icon={CloudRainIcon} isSelected={selectedWeather === 'Rainy'} onClick={() => setSelectedWeather('Rainy')} />
                        <WeatherOption label="Windy" icon={WindIcon} isSelected={selectedWeather === 'Windy'} onClick={() => setSelectedWeather('Windy')} />
                        <WeatherOption label="Snowy" icon={SnowIcon} isSelected={selectedWeather === 'Snowy'} onClick={() => setSelectedWeather('Snowy')} />
                    </div>
                </div>

                <InputField label="Duration (minutes)" type="number" placeholder="45" name="duration" value={flightData.duration} onChange={handleInputChange} />
                <InputField label="Battery Level (%)" type="number" placeholder="80" name="batteryLevel" value={flightData.batteryLevel} onChange={handleInputChange} />
                <div className="md:col-span-2">
                     <label className="block text-sm font-semibold text-slate-600 mb-2">Flight Notes</label>
                    <textarea
                        rows={4}
                        placeholder="Add any additional notes about this flight..."
                        name="notes"
                        value={flightData.notes}
                        onChange={handleInputChange}
                        className="w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition"
                    ></textarea>
                </div>
            </div>
            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={onNavigateBack}
                    className="w-full bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-2xl transition-all duration-200 hover:bg-slate-200 active:scale-95 transform hover:-translate-y-1"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-200 hover:opacity-90 shadow-lg shadow-cyan-500/30 active:scale-95 transform hover:-translate-y-1"
                >
                    Add Flight
                </button>
            </div>
        </form>
    );
};
