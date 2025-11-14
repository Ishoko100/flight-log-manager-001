import React from 'react';
import { MenuIcon } from './icons/IconComponents';

interface HeaderProps {
    onOpenMenu: () => void;
}

const DroneTrackLogo: React.FC = () => (
  <div className="flex items-center gap-2">
    <div className="w-9 h-9 bg-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/30 dark:shadow-teal-500/40">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
        <path d="M12 2L6 5.5V10.3C6 13.9 8.5 17.2 12 18C15.5 17.2 18 13.9 18 10.3V5.5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <span className="font-extrabold text-xl text-slate-800 dark:text-slate-200 tracking-tighter">DroneTrack</span>
  </div>
);

export const Header: React.FC<HeaderProps> = ({ onOpenMenu }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-900/10 dark:bg-slate-900/70 dark:border-slate-50/10 max-w-md mx-auto">
      <div className="flex items-center justify-between h-16 px-4">
        <DroneTrackLogo />
        <div className="flex items-center gap-2">
            <button 
              onClick={onOpenMenu}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-all duration-200 transform hover:scale-110 active:scale-100"
              aria-label="Open menu"
            >
                <MenuIcon className="w-6 h-6" />
            </button>
        </div>
      </div>
    </header>
  );
};