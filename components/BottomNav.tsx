import React from 'react';
import { Page } from '../types';
import { HomeIcon, WrenchIcon, PlusIcon, PlayIcon, MagnifyingGlassIcon } from './icons/IconComponents';

interface BottomNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const NavItem: React.FC<{
  page: Page;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}> = ({ page, label, icon: Icon, isActive, onClick }) => {
  const activeColor = 'text-teal-500';
  const inactiveColor = 'text-slate-500 hover:text-teal-500';
  const color = isActive ? activeColor : inactiveColor;
  
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-all duration-200 transform hover:-translate-y-1 active:scale-95 ${color}`}
    >
      <Icon className="h-6 w-6" />
      <span className="text-xs mt-1 font-bold tracking-wide">{label}</span>
    </button>
  );
};

export const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate }) => {
  const navItems = [
    { page: Page.Home, label: 'Home', icon: HomeIcon },
    { page: Page.Add, label: 'Add', icon: PlusIcon },
    { page: Page.Analyze, label: 'Analyze', icon: MagnifyingGlassIcon },
    { page: Page.Status, label: 'Status', icon: WrenchIcon },
    { page: Page.PreFlight, label: 'Plan', icon: PlayIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-xl border-t border-slate-900/10 z-50 max-w-md mx-auto">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => (
          <NavItem
            key={item.page}
            page={item.page}
            label={item.label}
            icon={item.icon}
            isActive={activePage === item.page}
            onClick={() => onNavigate(item.page)}
          />
        ))}
      </div>
    </nav>
  );
};
