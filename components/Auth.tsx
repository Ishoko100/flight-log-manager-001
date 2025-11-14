import React, { useState } from 'react';
import { Logo } from './icons/Logo';
import { CheckCircleIcon, XIcon } from './icons/IconComponents';

interface AuthProps {
  onLogin: () => void;
}

const ForgotPasswordModal: React.FC<{onClose: () => void; onReset: () => void}> = ({ onClose, onReset }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-xl p-6 w-full max-w-sm border border-slate-700 shadow-2xl shadow-sky-500/10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Reset Password</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-white">
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
            <p className="text-slate-400 mb-4 text-sm">Enter your email and we'll send you a link to reset your password.</p>
            <input
                type="email"
                placeholder="pilot@example.com"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4"
            />
            <button
                onClick={onReset}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
            >
                Send Reset Link
            </button>
        </div>
    </div>
);


const ResetConfirmation: React.FC<{onClose: () => void}> = ({ onClose }) => {
    React.useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-8 w-full max-w-sm border border-slate-700 text-center shadow-2xl shadow-green-500/10">
                <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Email Sent!</h2>
                <p className="text-slate-400 text-sm">Please check your inbox for password reset instructions.</p>
            </div>
        </div>
    );
};

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  const handleReset = () => {
      setShowForgotPassword(false);
      setShowResetConfirmation(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      {showForgotPassword && <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} onReset={handleReset} />}
      {showResetConfirmation && <ResetConfirmation onClose={() => setShowResetConfirmation(false)} />}
      
      <div className="w-full max-w-sm mx-auto bg-white rounded-2xl p-8">
        <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#0B3D2E] rounded-full flex items-center justify-center border border-teal-700/50 p-1">
                <div className="transform scale-[0.4]">
                    <Logo theme="dark" />
                </div>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {isLogin ? 'Sign in to your flight management dashboard' : 'Start tracking your flights today'}
        </p>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                    type="text"
                    placeholder="John Doe"
                    className="mt-1 w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
                />
              </div>
            )}
            <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                type="email"
                placeholder="pilot@example.com"
                defaultValue="pilot@example.com"
                className="mt-1 w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
                />
            </div>
            <div className="relative">
                <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    {isLogin && (
                        <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-xs font-semibold text-teal-500 hover:text-teal-600"
                        >
                        Forgot?
                        </button>
                    )}
                </div>
              <input
                type="password"
                placeholder="••••••••"
                defaultValue="password"
                className="mt-1 w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-[#0B3D2E] to-[#14B8A6] text-white font-bold py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-cyan-500 hover:text-cyan-600 ml-2"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};