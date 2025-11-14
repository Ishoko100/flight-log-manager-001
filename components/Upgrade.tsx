
import React, { useState } from 'react';
import { StarIcon, CheckIcon } from './icons/IconComponents';

interface UpgradeProps {
  onNavigateBack: () => void;
}

// User-provided checkout function
function redirectToCheckout(plan: 'weekly' | 'monthly' | 'yearly') {
  // Temporary links - replace later with your real Stripe checkout URLs
  const links = {
    weekly: "https://your-stripe-checkout-link/weekly",
    monthly: "https://your-stripe-checkout-link/monthly",
    yearly: "https://your-stripe-checkout-link/yearly"
  };

  alert(`Redirecting to ${plan} plan checkout page`);
  // In a real app, this would redirect. We'll comment it out for the demo.
  // window.location.href = links[plan];
}

const PlanCard: React.FC<{
  title: string;
  price: string;
  period: string;
  badge?: string;
  badgeColor?: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ title, price, period, badge, badgeColor, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
        isSelected ? 'border-teal-500 bg-teal-500/10 ring-2 ring-teal-500/30' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      {badge && (
        <div className={`absolute -top-3 right-4 text-xs font-bold px-3 py-1 rounded-full text-white ${badgeColor || 'bg-teal-500'}`}>
          {badge}
        </div>
      )}
      <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{title}</p>
      <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
        ${price} <span className="text-base font-medium text-slate-500 dark:text-slate-400">/ {period}</span>
      </p>
    </button>
  );
};

const Feature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-center space-x-3">
        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-teal-500`}>
            <CheckIcon className="w-3 h-3 text-white" />
        </div>
        <span className={`text-slate-700 dark:text-slate-300`}>{children}</span>
    </li>
);

export const Upgrade: React.FC<UpgradeProps> = ({ onNavigateBack }) => {
    const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

    return (
        <div className="space-y-6 animate-slide-in-up">
            <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-teal-400 to-cyan-500 p-3 rounded-full mb-4 shadow-lg shadow-cyan-500/20">
                    <StarIcon className="w-8 h-8 text-white"/>
                </div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">Go Pro</h2>
                <p className="mt-2 text-slate-500 dark:text-slate-400">Choose the plan that's right for you.</p>
            </div>

            <div className="space-y-4">
                <PlanCard 
                  title="Weekly"
                  price="4.99"
                  period="week"
                  isSelected={selectedPlan === 'weekly'}
                  onClick={() => setSelectedPlan('weekly')}
                />
                 <PlanCard 
                  title="Monthly"
                  price="14.99"
                  period="month"
                  badge="Most Popular"
                  isSelected={selectedPlan === 'monthly'}
                  onClick={() => setSelectedPlan('monthly')}
                />
                 <PlanCard 
                  title="Yearly"
                  price="149"
                  period="year"
                  badge="Save 17%"
                  badgeColor="bg-orange-500"
                  isSelected={selectedPlan === 'yearly'}
                  onClick={() => setSelectedPlan('yearly')}
                />
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-black/20">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">All Pro plans include:</h3>
              <ul className="mt-4 space-y-3 text-sm">
                  <Feature>Unlimited Flight Logs</Feature>
                  <Feature>AI Image Analysis & Flight Summaries</Feature>
                  <Feature>PDF Report Exports</Feature>
                  <Feature>Priority Support</Feature>
              </ul>
            </div>
            
            <div className="space-y-3 pt-2">
                 <button
                    onClick={() => redirectToCheckout(selectedPlan)}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-200 hover:opacity-90 shadow-lg shadow-cyan-500/30 active:scale-95 transform hover:-translate-y-1"
                >
                    Continue to Checkout
                </button>
                 <button
                    type="button"
                    onClick={onNavigateBack}
                    className="w-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 px-4 rounded-2xl transition-all duration-200 hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95"
                >
                    Maybe Later
                </button>
            </div>
        </div>
    );
};
