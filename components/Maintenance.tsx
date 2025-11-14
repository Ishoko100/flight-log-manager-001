
import React, { useState, useMemo } from 'react';
import { Drone } from '../types';
import { MagnifyingGlassIcon } from './icons/IconComponents';

declare const jspdf: any;

interface MaintenanceProps {
    drones: Drone[];
}

const statusColors = {
    'Good': { text: 'text-green-800', bg: 'bg-green-100', border: 'border-green-200/80' },
    'Due Soon': { text: 'text-yellow-800', bg: 'bg-yellow-100', border: 'border-yellow-200/80' },
    'Overdue': { text: 'text-red-800', bg: 'bg-red-100', border: 'border-red-200/80' },
};

const MaintenanceCard: React.FC<{ drone: Drone, delay: number }> = ({ drone, delay }) => {
    const color = statusColors[drone.status];
    return (
        <div className={`flex items-center space-x-4 p-3 bg-white rounded-3xl border ${color.border} shadow-lg shadow-slate-200/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl hover:shadow-slate-300/50 opacity-0 animate-slide-in-up`} style={{animationDelay: `${delay}ms`}}>
            <img src={drone.imageUrl} alt={drone.name} className="w-14 h-14 rounded-2xl object-cover" />
            <div className="flex-grow">
                <p className="font-bold text-slate-800">{drone.name}</p>
                <p className="text-sm text-slate-500">Last Maint: {drone.lastMaintenance}</p>
            </div>
            <div className="text-right">
                <p className="font-semibold text-slate-800">{drone.batteryCycles} cycles</p>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${color.bg} ${color.text}`}>{drone.status}</span>
            </div>
        </div>
    );
};

export const Maintenance: React.FC<MaintenanceProps> = ({ drones }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDrones = useMemo(() => {
        if (!searchQuery.trim()) return drones;
        return drones.filter(drone =>
            drone.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [drones, searchQuery]);


    const handleExportPDF = () => {
        const doc = new jspdf.jsPDF();
    
        doc.setFontSize(18);
        doc.text("Drone Maintenance Report", 14, 22);
    
        const tableColumn = ["Drone Name", "Last Maintenance", "Battery Cycles", "Status"];
        const tableRows: (string | number)[][] = [];
    
        filteredDrones.forEach(drone => {
            const droneData = [
                drone.name,
                drone.lastMaintenance,
                drone.batteryCycles,
                drone.status,
            ];
            tableRows.push(droneData);
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
            },
            didParseCell: function (data: any) {
                if (data.column.dataKey === 3 && data.cell.section === 'body') { // Column index 3 is 'Status'
                    const status = data.cell.raw;
                    if (status === 'Overdue') {
                        data.cell.styles.fillColor = '#fee2e2'; // red-100
                        data.cell.styles.textColor = '#991b1b'; // red-800
                    } else if (status === 'Due Soon') {
                        data.cell.styles.fillColor = '#fef3c7'; // yellow-100
                        data.cell.styles.textColor = '#92400e'; // yellow-800
                    } else if (status === 'Good') {
                        data.cell.styles.fillColor = '#d1fae5'; // green-100
                        data.cell.styles.textColor = '#065f46'; // green-800
                    }
                }
            },
        });
    
        doc.save("maintenance-log-report.pdf");
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight opacity-0 animate-slide-in-up">Maintenance Schedule</h2>
             <div className="relative opacity-0 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
                <input
                    type="text"
                    placeholder="Search for a drone by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                />
                <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center opacity-0 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
                <div className="bg-green-100/70 p-4 rounded-3xl border border-green-200/80">
                    <p className="text-3xl font-bold text-slate-800">{filteredDrones.filter(d => d.status === 'Good').length}</p>
                    <p className="text-xs text-green-800 font-semibold">Good</p>
                </div>
                <div className="bg-yellow-100/70 p-4 rounded-3xl border border-yellow-200/80">
                    <p className="text-3xl font-bold text-slate-800">{filteredDrones.filter(d => d.status === 'Due Soon').length}</p>
                    <p className="text-xs text-yellow-800 font-semibold">Due Soon</p>
                </div>
                 <div className="bg-red-100/70 p-4 rounded-3xl border border-red-200/80">
                    <p className="text-3xl font-bold text-slate-800">{filteredDrones.filter(d => d.status === 'Overdue').length}</p>
                    <p className="text-xs text-red-800 font-semibold">Overdue</p>
                </div>
            </div>

            <div className="space-y-3">
                {filteredDrones.length > 0 ? (
                    filteredDrones.map((drone, index) => (
                        <MaintenanceCard key={drone.id} drone={drone} delay={300 + index * 100} />
                    ))
                ) : (
                    <div className="text-center py-10 text-slate-500 bg-white rounded-3xl shadow-lg shadow-slate-200/50">
                        <p className="font-semibold">No drones found</p>
                        <p className="text-sm">Try adjusting your search query.</p>
                    </div>
                )}
            </div>

            <button onClick={handleExportPDF} className="w-full bg-white text-slate-800 font-bold py-3 px-4 rounded-2xl transition-all duration-200 hover:bg-slate-100 shadow-lg shadow-slate-200/50 active:scale-95 transform hover:-translate-y-1">
                Export Maintenance Log as PDF
            </button>
        </div>
    );
};
