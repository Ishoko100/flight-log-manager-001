
import React from 'react';
import { User, Page } from '../types';
import { HomeIcon, WrenchIcon, UserIcon, SettingsIcon, XIcon, StarIcon, LogOutIcon, ClipboardCheckIcon, MagnifyingGlassIcon, SparklesIcon, GiftIcon } from './icons/IconComponents';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  user: User;
  activePage: Page;
}

const MenuLink: React.FC<{
  label: string;
  icon: React.ElementType;
  onClick: () => void;
  isActive?: boolean;
  isLogout?: boolean;
  delay?: number;
}> = ({ label, icon: Icon, onClick, isActive = false, isLogout = false, delay = 0 }) => {
  const activeClasses = isActive ? 'bg-teal-500/10 dark:bg-teal-400/10' : 'hover:bg-slate-200/60 dark:hover:bg-slate-700/60';
  const textClasses = isActive 
    ? 'text-teal-600 dark:text-teal-400' 
    : isLogout 
      ? 'text-red-600 dark:text-red-400' 
      : 'text-slate-700 dark:text-slate-300';
  const iconTextClasses = isActive 
    ? 'text-teal-500 dark:text-teal-400' 
    : isLogout 
      ? 'text-red-500 dark:text-red-400' 
      : 'text-slate-500 dark:text-slate-400';

  return (
    <button onClick={onClick} className={`flex items-center w-full p-2 text-left rounded-xl transition-colors duration-200 relative ${activeClasses} animate-menu-item`} style={{ animationDelay: `${delay}ms`}}>
      {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-teal-500 rounded-r-full"></div>}
      <div className="p-2 bg-slate-200/50 dark:bg-slate-700/50 rounded-lg ml-2">
        <Icon className={`w-6 h-6 transition-colors ${iconTextClasses}`} />
      </div>
      <span className={`font-semibold ml-4 transition-colors ${textClasses}`}>{label}</span>
    </button>
  );
};

export const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onNavigate, onLogout, user, activePage }) => {
    
    const navLinks = [
        { label: "Home", icon: HomeIcon, page: Page.Home },
        { label: "Plan Flight", icon: ClipboardCheckIcon, page: Page.PreFlight },
        { label: "Analyze Image", icon: MagnifyingGlassIcon, page: Page.Analyze },
        { label: "Status", icon: WrenchIcon, page: Page.Status },
        { label: "AI Summary", icon: SparklesIcon, page: Page.AISummary },
        { label: "Refer & Earn", icon: GiftIcon, page: Page.Referral },
    ];

    const accountLinks = [
        { label: "Profile", icon: UserIcon, page: Page.Profile },
        { label: "Settings", icon: SettingsIcon, page: Page.Settings },
    ];

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm side-menu-backdrop"
        onClick={onClose}
      />
      <div
        className={`relative w-80 max-w-[85vw] h-full bg-slate-100 dark:bg-slate-800 shadow-2xl ml-auto flex flex-col p-4 side-menu-panel ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0">
            <div className={`flex items-center justify-between mb-4 animate-menu-item`} style={{ animationDelay: '0ms' }}>
            <button
                onClick={() => onNavigate(Page.Profile)}
                className="flex items-center gap-3 text-left flex-grow p-2 rounded-xl transition-colors duration-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
            >
                <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">View Profile</p>
                </div>
            </button>
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700 transition-colors ml-2 flex-shrink-0">
                <XIcon className="w-5 h-5" />
            </button>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto -mr-4 pr-4">
            {user.plan_type !== 'pro' ? (
                <div className="p-4 my-4 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl text-white shadow-lg shadow-cyan-500/30 animate-menu-item" style={{ animationDelay: '100ms' }}>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/25 p-2 rounded-full">
                            <StarIcon className="w-6 h-6 text-white"/>
                        </div>
                        <div className="flex-grow">
                            <p className="font-bold text-base">Upgrade to Pro</p>
                            <p className="text-xs opacity-90">Unlock all features</p>
                        </div>
                        <button 
                            onClick={() => onNavigate(Page.Upgrade)}
                            className="ml-auto bg-white hover:bg-slate-100 text-teal-600 font-bold py-2 px-5 rounded-lg text-sm transition-colors shadow-md"
                        >
                            Upgrade
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-4 my-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl text-white shadow-lg shadow-orange-500/30 animate-menu-item" style={{ animationDelay: '100ms' }}>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/25 p-2 rounded-full">
                            <StarIcon className="w-6 h-6 text-white"/>
                        </div>
                        <div>
                            <p className="font-bold text-base">Pro Member</p>
                            <p className="text-xs opacity-90">All features unlocked</p>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="px-2 py-2">
                <h3 className="px-2 mb-2 text-sm font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase animate-menu-item" style={{ animationDelay: '150ms' }}>Navigation</h3>
                <nav className="space-y-1">
                    {navLinks.map((link, index) => (
                        <MenuLink key={link.page} label={link.label} icon={link.icon} onClick={() => onNavigate(link.page)} isActive={activePage === link.page} delay={200 + index * 50} />
                    ))}
                </nav>
            </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 pt-4 border-t border-slate-200 dark:border-slate-700">
             <div className="px-2">
                <h3 className="px-2 mb-2 text-sm font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase animate-menu-item" style={{ animationDelay: '500ms' }}>Account</h3>
                <nav className="space-y-1">
                    {accountLinks.map((link, index) => (
                        <MenuLink key={link.page} label={link.label} icon={link.icon} onClick={() => onNavigate(link.page)} isActive={activePage === link.page} delay={550 + index * 50} />
                    ))}
                    <div className="!my-2 h-px bg-slate-200 dark:bg-slate-700 mx-2 animate-menu-item" style={{ animationDelay: `${550 + accountLinks.length * 50}ms` }}></div>
                    <MenuLink label="Sign Out" icon={LogOutIcon} onClick={onLogout} isLogout delay={600 + accountLinks.length * 50}/>
                </nav>
            </div>
        </div>
      </div>
    </div>
  );
};