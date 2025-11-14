
import React, { useState, useEffect, useMemo } from 'react';
import { getPreFlightChecklist } from '../services/geminiService';
import { SparklesIcon, CheckCircleIcon } from './icons/IconComponents';

interface ChecklistItem {
    text: string;
    id: number;
}

interface ParsedChecklist {
    weather: string;
    hazards: string;
    checklist: ChecklistItem[];
    groundingChunks?: any[];
}

const parseChecklistResponse = (markdown: string, groundingChunks?: any[]): ParsedChecklist => {
    const lines = markdown.split('\n');
    const result: ParsedChecklist = { weather: '', hazards: '', checklist: [], groundingChunks };
    let currentSection = '';
    let checklistId = 0;

    lines.forEach(line => {
        if (line.startsWith('### ')) {
            const title = line.replace('### ', '').trim();
            if (title.includes('Weather')) currentSection = 'weather';
            else if (title.includes('Airspace') || title.includes('Hazard')) currentSection = 'hazards';
            else if (title.includes('Checklist')) currentSection = 'checklist';
        } else if (line.trim()) {
            switch (currentSection) {
                case 'weather':
                    result.weather += line.replace(/^- /, '') + ' ';
                    break;
                case 'hazards':
                    result.hazards += line.replace(/^- /, '') + ' ';
                    break;
                case 'checklist':
                    if (line.startsWith('[ ] ')) {
                        result.checklist.push({ text: line.replace('[ ] ', ''), id: checklistId++ });
                    }
                    break;
            }
        }
    });

    result.weather = result.weather.trim();
    result.hazards = result.hazards.trim();
    return result;
};

const ChecklistItemFC: React.FC<{ item: ChecklistItem; isChecked: boolean; onToggle: () => void; }> = ({ item, isChecked, onToggle }) => (
    <div
        onClick={onToggle}
        className={`flex items-center p-4 rounded-xl transition-all duration-200 cursor-pointer ${
            isChecked 
            ? 'bg-green-100/70 border-green-300' 
            : 'bg-slate-100 border-transparent hover:bg-slate-200/60'
        } border`}
    >
        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-4 transition-colors ${isChecked ? 'bg-green-500' : 'bg-slate-300'}`}>
            {isChecked && <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
        </div>
        <span className={`flex-1 text-sm font-medium ${isChecked ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
            {item.text}
        </span>
    </div>
);


export const PreFlightChecklist: React.FC<{ onChecklistComplete: () => void }> = ({ onChecklistComplete }) => {
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [checklistData, setChecklistData] = useState<ParsedChecklist | null>(null);
    const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                 // For demo purposes, we'll use a known location name as lat/lng doesn't directly give one.
                 // In a real app, you'd use a reverse geocoding service.
                setLocation('Golden Gate Park, San Francisco');
            },
            () => {
                // If permission is denied, pre-fill with a default
                setLocation('Eiffel Tower, Paris');
            }
        );
    }, []);

    const handleGenerateChecklist = async () => {
        if (!location) {
            setError('Please enter a flight location.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setChecklistData(null);
        setCheckedItems(new Set());

        try {
            const { text, groundingChunks } = await getPreFlightChecklist(location);
            if (text.includes("error occurred")) {
                setError(text);
            } else {
                setChecklistData(parseChecklistResponse(text, groundingChunks));
            }
        } catch (err) {
            console.error(err);
            setError('Failed to generate the checklist. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleCheckItem = (id: number) => {
        setCheckedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const { progress, allChecked } = useMemo(() => {
        const totalItems = checklistData?.checklist.length || 0;
        if (totalItems === 0) return { progress: 0, allChecked: false };
        const checkedCount = checkedItems.size;
        const progress = (checkedCount / totalItems) * 100;
        const allChecked = checkedCount === totalItems;
        return { progress, allChecked };
    }, [checkedItems, checklistData]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">AI Pre-Flight Checklist</h2>
            
            <div className="bg-white p-5 rounded-3xl shadow-lg shadow-slate-200/50 space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Flight Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g., Central Park, NYC"
                        className="w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition"
                    />
                </div>
                <button
                    onClick={handleGenerateChecklist}
                    disabled={isLoading || !location}
                    className="w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-2xl hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-800/20 active:scale-95 transform hover:-translate-y-1"
                >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {isLoading ? 'Generating...' : 'Generate Checklist'}
                </button>
            </div>
            
            {error && <p className="text-red-500 text-sm text-center bg-red-100 p-3 rounded-xl">{error}</p>}

            {isLoading && (
                <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 text-center text-slate-600 animate-slide-in-up">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-3"></div>
                    <p className="font-semibold">AI is analyzing location data...</p>
                    <p className="text-sm">This may take a moment.</p>
                </div>
            )}

            {checklistData && (
                <div className="space-y-6 animate-slide-in-up">
                    <div className="bg-white p-5 rounded-3xl shadow-lg shadow-slate-200/50 space-y-3">
                        <h3 className="text-lg font-bold text-slate-900">Mission Briefing</h3>
                        <div className="text-sm"><strong>Weather:</strong> {checklistData.weather}</div>
                        <div className="text-sm"><strong>Hazards:</strong> {checklistData.hazards}</div>
                        {checklistData.groundingChunks && checklistData.groundingChunks.length > 0 && (
                            <div className="pt-3 mt-3 border-t border-slate-200/80">
                                <h4 className="text-sm font-bold text-slate-700">Data Sources</h4>
                                <ul className="list-disc list-inside text-sm text-slate-500 mt-1 space-y-1">
                                    {checklistData.groundingChunks.map((chunk, index) => {
                                        if (chunk.maps?.uri) {
                                            return (
                                                <li key={`map-source-${index}`}>
                                                    <a href={chunk.maps.uri} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 hover:underline">
                                                        {chunk.maps.title || 'View on Google Maps'}
                                                    </a>
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                    
                    <div className="bg-white p-5 rounded-3xl shadow-lg shadow-slate-200/50 space-y-4">
                        <div className="space-y-2">
                             <div className="flex justify-between items-center mb-1">
                                <h3 className="text-lg font-bold text-slate-900">Checklist</h3>
                                <span className="text-sm font-semibold text-slate-500">{checkedItems.size} / {checklistData.checklist.length}</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5">
                                <div className="bg-teal-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {checklistData.checklist.map(item => (
                                <ChecklistItemFC
                                    key={item.id}
                                    item={item}
                                    isChecked={checkedItems.has(item.id)}
                                    onToggle={() => handleToggleCheckItem(item.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={onChecklistComplete}
                        disabled={!allChecked}
                        className="w-full text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95 transform hover:-translate-y-1 bg-gradient-to-r from-green-500 to-emerald-500 disabled:from-slate-400 disabled:to-slate-400"
                    >
                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                        {allChecked ? 'Cleared for Takeoff' : 'Complete All Checks'}
                    </button>
                </div>
            )}
        </div>
    );
};
