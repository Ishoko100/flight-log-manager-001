import React, { useState } from 'react';
import { User } from '../types';

interface ReferralProps {
    user: User;
}

export const Referral: React.FC<ReferralProps> = ({ user }) => {
    const [copied, setCopied] = useState(false);

    // Generate a simple, unique-looking referral code from the user's name
    const referralCode = user.name.toUpperCase().replace(/\s/g, '').substring(0, 6);
    const referralLink = `https://dronetrack.app/refer?code=${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };
    
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Join me on DroneTrack!',
                text: `I'm using DroneTrack to manage my drone flights. Sign up with my link and get a discount on your Pro plan!`,
                url: referralLink,
            })
            .catch((error) => console.log('Error sharing', error));
        } else {
            // Fallback for browsers that don't support Web Share API
            handleCopy();
            alert('Share feature is not available on this browser. The link has been copied to your clipboard.');
        }
    };

    return (
        <div className="space-y-6 animate-slide-in-up">
            <div className="text-center">
                <div className="inline-block bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-full mb-4 shadow-lg shadow-indigo-500/30">
                    <div className="w-8 h-8 rounded-full bg-white/20"></div>
                </div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">Refer & Earn</h2>
                <p className="mt-2 text-slate-500 dark:text-slate-400">Share the love, get rewarded.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-black/20 text-center space-y-4">
                <div className="border border-sky-300 dark:border-sky-500/50 bg-sky-50 dark:bg-sky-500/10 rounded-xl p-3">
                    <h3 className="text-lg font-bold text-sky-800 dark:text-sky-300">Get $5 Credit For Every Friend</h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    For every friend who signs up for a Pro plan using your link, you'll receive a <span className="font-bold text-slate-700 dark:text-slate-200">$5 credit</span> towards your next month.
                </p>
                
                <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Your unique referral link</p>
                    <p className="font-mono text-sm text-teal-600 dark:text-teal-400 truncate mt-1.5">{referralLink}</p>
                </div>
            </div>
            
            <div className="flex flex-col gap-3 pt-2">
                <button
                    onClick={handleCopy}
                    className="w-full bg-slate-800 dark:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 hover:bg-slate-700 dark:hover:bg-slate-600 active:scale-95 transform hover:-translate-y-1"
                >
                    {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <button
                    onClick={handleShare}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 hover:opacity-90 shadow-lg shadow-indigo-500/30 active:scale-95 transform hover:-translate-y-1"
                >
                    Share Link
                </button>
            </div>
        </div>
    );
};
