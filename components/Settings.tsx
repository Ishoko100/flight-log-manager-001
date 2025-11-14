
import React, { useState } from 'react';
import { ArrowRightIcon, QuestionMarkCircleIcon } from './icons/IconComponents';
import { Page } from '../types';

interface SettingsProps {
    onLogout: () => void;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
    onNavigate: (page: Page) => void;
}

const SettingsSection: React.FC<{ title: string; children: React.ReactNode, delay: number }> = ({ title, children, delay }) => (
    <div className="space-y-2 opacity-0 animate-slide-in-up" style={{ animationDelay: `${delay}ms` }}>
        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 px-4 tracking-wide">{title}</h3>
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-black/20">
            {React.Children.map(children, (child, index) => (
                <div className={React.Children.count(children) - 1 === index ? '' : 'border-b border-slate-100 dark:border-slate-700'}>
                    {child}
                </div>
            ))}
        </div>
    </div>
);

const ToggleItem: React.FC<{ label: string; description: string; isChecked: boolean; onToggle: () => void; }> = ({ label, description, isChecked, onToggle }) => (
    <div className="flex justify-between items-center p-5">
        <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{label}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={isChecked} onChange={onToggle} className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 dark:after:bg-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
        </label>
    </div>
);

const LinkItem: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
    <div onClick={onClick} className="flex justify-between items-center p-5 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
        <p className="font-semibold text-slate-800 dark:text-slate-200">{label}</p>
        <ArrowRightIcon className="w-5 h-5 text-slate-400" />
    </div>
);

export const Settings: React.FC<SettingsProps> = ({ onLogout, isDarkMode, onToggleDarkMode, onNavigate }) => {
    const [toggles, setToggles] = useState({
        reminders: true,
        alerts: false,
        warnings: true,
        twoFactor: false,
        biometric: true,
        compactView: false,
        autoSync: true,
        offlineMode: false,
    });

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({...prev, [key]: !prev[key]}));
    };
    
    const handleLinkClick = (feature: string) => {
        alert(`${feature} is coming soon!`);
    };

    return (
        <div className="space-y-8">
            <SettingsSection title="Notifications" delay={100}>
                <ToggleItem label="Flight Reminders" description="For upcoming planned flights" isChecked={toggles.reminders} onToggle={() => handleToggle('reminders')} />
                <ToggleItem label="Maintenance Alerts" description="For upcoming drone maintenance" isChecked={toggles.alerts} onToggle={() => handleToggle('alerts')} />
                <ToggleItem label="Battery Warnings" description="For low battery notifications" isChecked={toggles.warnings} onToggle={() => handleToggle('warnings')} />
            </SettingsSection>
            
            <SettingsSection title="Privacy & Security" delay={200}>
                <ToggleItem label="Two-Factor Authentication" description="Secure your account" isChecked={toggles.twoFactor} onToggle={() => handleToggle('twoFactor')} />
                <ToggleItem label="Biometric Login" description="Use Face ID or Touch ID" isChecked={toggles.biometric} onToggle={() => handleToggle('biometric')} />
            </SettingsSection>
            
            <SettingsSection title="Appearance" delay={300}>
                <ToggleItem label="Dark Mode" description="Switch to dark theme" isChecked={isDarkMode} onToggle={onToggleDarkMode} />
                <ToggleItem label="Compact View" description="Show more data on screen" isChecked={toggles.compactView} onToggle={() => handleToggle('compactView')} />
            </SettingsSection>

            <SettingsSection title="Data & Storage" delay={400}>
                <ToggleItem label="Auto-sync" description="Automatically sync flight data" isChecked={toggles.autoSync} onToggle={() => handleToggle('autoSync')} />
                <ToggleItem label="Offline Mode" description="Access data without internet" isChecked={toggles.offlineMode} onToggle={() => handleToggle('offlineMode')} />
            </SettingsSection>

            <div 
                onClick={() => handleLinkClick('Support Team')} 
                className="p-5 bg-gradient-to-r from-teal-400 to-cyan-500 dark:from-teal-500 dark:to-cyan-600 rounded-3xl text-white shadow-lg shadow-cyan-500/30 dark:shadow-cyan-500/20 flex items-center gap-4 cursor-pointer transition-transform duration-200 active:scale-95 hover:scale-[1.03] hover:shadow-2xl opacity-0 animate-slide-in-up"
                style={{ animationDelay: '500ms' }}
            >
                <div className="bg-white/20 p-3 rounded-full">
                    <QuestionMarkCircleIcon className="w-6 h-6 text-white"/>
                </div>
                <div className="flex-grow">
                    <p className="font-bold text-base">Contact Support</p>
                    <p className="text-sm opacity-90">Our team is here to help</p>
                </div>
                <ArrowRightIcon className="w-5 h-5 opacity-70" />
            </div>

            <SettingsSection title="Account" delay={600}>
                <LinkItem label="Change Password" onClick={() => handleLinkClick('Password management')} />
                <LinkItem label="Manage Subscription" onClick={() => handleLinkClick('Subscription management')} />
                <LinkItem label="Privacy Policy" onClick={() => onNavigate(Page.PrivacyPolicy)} />
                <LinkItem label="Terms of Service" onClick={() => onNavigate(Page.TermsOfService)} />
            </SettingsSection>

            <div className="px-1 opacity-0 animate-slide-in-up" style={{ animationDelay: '700ms' }}>
                <button
                    onClick={onLogout}
                    className="w-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 font-bold py-3 rounded-2xl transition-all duration-200 hover:bg-red-200 dark:hover:bg-red-500/30 active:scale-95 transform hover:-translate-y-1"
                >
                    Log Out
                </button>
            </div>
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 opacity-0 animate-slide-in-up" style={{ animationDelay: '800ms' }}>Version 1.0.0</p>
        </div>
    );
};