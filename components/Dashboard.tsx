
import React from 'react';
import { Flight, Drone } from '../types';
import { ChartBarIcon, ClockIcon, PaperAirplaneIcon } from './icons/IconComponents';
import { Map } from './Map';

declare const jspdf: any;

interface DashboardProps {
    flights: Flight[];
    drones: Drone[];
}

const StatCard: React.FC<{ title: string; value: string; change: string; icon: React.ReactNode, delay: number }> = ({ title, value, change, icon, delay }) => (
    <div className="bg-white p-4 rounded-3xl flex-1 shadow-lg shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-105 hover:shadow-xl hover:shadow-slate-300/50 opacity-0 animate-slide-in-up" style={{animationDelay: `${delay}ms`}}>
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <div className="text-teal-500">{icon}</div>
        </div>
        <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
        <p className="text-xs text-green-600 font-semibold">{change}</p>
    </div>
);

const FlightCard: React.FC<{ flight: Flight; drone?: Drone; delay: number }> = ({ flight, drone, delay }) => (
    <div className={`flex items-center space-x-4 p-3 bg-white rounded-3xl shadow-lg shadow-slate-200/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl hover:shadow-slate-300/50 opacity-0 animate-slide-in-up`} style={{animationDelay: `${delay}ms`}}>
        <img src={drone?.imageUrl} alt={drone?.name} className="w-14 h-14 rounded-2xl object-cover" />
        <div className="flex-grow">
            <p className="font-bold text-slate-800">{drone?.name}</p>
            <p className="text-sm text-slate-500">{flight.date}</p>
        </div>
        <div className="text-right">
            <p className="font-semibold text-slate-800">{flight.duration} min</p>
            <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-800 font-semibold">{flight.status}</span>
        </div>
    </div>
);


export const Dashboard: React.FC<DashboardProps> = ({ flights, drones }) => {
    const recentFlights = flights.slice(0, 5);
    
    const handleExportPDF = () => {
        const doc = new jspdf.jsPDF();
    
        doc.setFontSize(18);
        doc.text("Flight Log Report", 14, 22);
    
        const tableColumn = ["Date", "Drone", "Location", "Duration (min)", "Status", "Notes"];
        const tableRows: (string | number)[][] = [];
    
        flights.forEach(flight => {
            const drone = drones.find(d => d.id === flight.droneId);
            const flightData = [
                flight.date,
                drone ? drone.name : "N/A",
                flight.location,
                flight.duration,
                flight.status,
                flight.notes || "" // Ensure notes is a string
            ];
            tableRows.push(flightData);
        });
    
        (doc as any).autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            theme: 'grid',
            styles: {
                font: 'Inter',
                fontSize: 10,
            },
            headStyles: {
                fillColor: [20, 184, 166], // teal-500
                textColor: 255,
                fontStyle: 'bold',
            }
        });
    
        doc.save("flight-log-report.pdf");
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <StatCard title="Total Flights" value={flights.length.toString()} change="+2 this week" icon={<ChartBarIcon className="w-5 h-5"/>} delay={100} />
                <StatCard title="Total Hours" value={(flights.reduce((acc, f) => acc + f.duration, 0) / 60).toFixed(1)} change="+12.5%" icon={<ClockIcon className="w-5 h-5"/>} delay={200} />
                <StatCard title="Drones" value={drones.length.toString()} change="All operational" icon={<PaperAirplaneIcon className="w-5 h-5"/>} delay={300} />
            </div>

            <div className="space-y-4 opacity-0 animate-slide-in-up" style={{ animationDelay: '400ms' }}>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Flight Locations</h3>
                <div className="relative bg-slate-200 rounded-3xl h-48 overflow-hidden shadow-inner">
                   <Map flights={flights} drones={drones} />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center opacity-0 animate-slide-in-up" style={{ animationDelay: '500ms' }}>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">Recent Flights</h3>
                    <button className="text-sm font-semibold text-teal-500 hover:text-teal-600 transition-colors hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                    {recentFlights.map((flight, index) => (
                        <FlightCard key={flight.id} flight={flight} drone={drones.find(d => d.id === flight.droneId)} delay={600 + index * 100} />
                    ))}
                </div>
            </div>
             <button onClick={handleExportPDF} className="w-full bg-white text-slate-800 font-bold py-3 px-4 rounded-2xl hover:bg-slate-100 transition-all duration-200 shadow-lg shadow-slate-200/50 active:scale-95 transform hover:-translate-y-1">
                Export Flights as PDF
            </button>
        </div>
    );
};
