import React from 'react';

interface LogoProps {
  className?: string;
  theme?: 'light' | 'dark'; // Kept for consistency, but new logo has fixed colors.
}

export const Logo: React.FC<LogoProps> = ({ className, theme = 'dark' }) => {
  // Colors sampled from the provided logo image for accuracy
  const textColor = theme === 'light' ? '#40464f' : '#D1D5DB';
  const subTextColor = theme === 'light' ? '#8c929a' : '#9CA3AF';

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg 
        width="100" 
        height="100" 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Flight Log Manager Logo"
        role="img"
      >
        <defs>
          <linearGradient id="droneBodyGradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#F9FAFB" />
            <stop offset="50%" stopColor="#D1D5DB" />
            <stop offset="100%" stopColor="#9CA3AF" />
          </linearGradient>
           <linearGradient id="droneHighlight" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E5E7EB" />
          </linearGradient>
        </defs>

        <g transform="translate(0, -10)">
          {/* Shield */}
          <path 
            d="M20 30 L100 10 L180 30 L180 100 C180 150 100 195 100 195 C100 195 20 150 20 100 Z" 
            fill="none" 
            stroke="#B0B6BF" 
            strokeWidth="6"
            strokeLinejoin="round"
          />

          {/* Drone Arms & Props */}
          <g stroke="#6B7280" strokeWidth="6" strokeLinecap="round">
            <line x1="60" y1="85" x2="10" y2="70" />
            <line x1="140" y1="85" x2="190" y2="70" />
            <line x1="75" y1="75" x2="35" y2="50" />
            <line x1="125" y1="75" x2="165" y2="50" />
          </g>
          <g fill="#4B5563">
            <ellipse cx="10" cy="70" rx="15" ry="4" />
            <ellipse cx="190" cy="70" rx="15" ry="4" />
            <ellipse cx="35" cy="50" rx="15" ry="4" />
            <ellipse cx="165" cy="50" rx="15" ry="4" />
          </g>
          
          {/* Drone Body */}
          <path d="M70 75 Q100 60 130 75 L145 95 L100 110 L55 95 Z" fill="url(#droneBodyGradient)" stroke="#6B7280" strokeWidth="1.5"/>
          <path d="M75 77 Q100 65 125 77 L120 95 L100 105 L80 95 Z" fill="url(#droneHighlight)" />
          
          {/* Camera */}
          <path d="M95 110 C95 105, 105 105, 105 110 L105 118 Q100 123 95 118 Z" fill="#374151"/>
          
          {/* Drone Legs */}
          <path d="M75 100 C50 125, 75 125, 75 125" stroke="#6B7280" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M125 100 C150 125, 125 125, 125 125" stroke="#6B7280" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      </svg>

      <div className="text-center -mt-6">
        <p style={{ color: textColor }} className="font-extrabold text-2xl tracking-wide">FLIGHT LOG</p>
        <p style={{ color: subTextColor }} className="block font-semibold text-base tracking-[0.2em] mt-0.5">MANAGER</p>
      </div>
    </div>
  );
};
