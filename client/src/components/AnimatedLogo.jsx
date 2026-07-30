import React from 'react';
import './AnimatedLogo.css';

/**
 * AnimatedLogo Component for EthiZone
 * Features stationary 'EthiZone' text with a rotating orbital ring / arrow accent.
 *
 * Props:
 * - size: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
 * - showMotto: boolean (default: false)
 * - mottoText: string (optional override)
 * - subtitle: string (optional text under logo)
 * - className: additional wrapper classes
 */
export default function AnimatedLogo({ 
  size = 'md', 
  showMotto = false, 
  mottoText = '', 
  subtitle = '',
  className = '' 
}) {
  const sizeMap = {
    sm: { font: '1.25rem', orbit: '32px', stroke: 2 },
    md: { font: '1.75rem', orbit: '42px', stroke: 2.5 },
    lg: { font: '2.25rem', orbit: '54px', stroke: 3 },
    xl: { font: '3rem', orbit: '72px', stroke: 3.5 }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`ethizone-logo-wrapper ${size} ${className}`}>
      <div className="ethizone-logo-main">
        {/* Rotating Oval / Orbit Ring with Arrow */}
        <div 
          className="ethizone-orbit-container"
          style={{ width: currentSize.orbit, height: currentSize.orbit }}
        >
          <svg 
            viewBox="0 0 100 100" 
            className="ethizone-orbit-svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ethizoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C5A85A" />
                <stop offset="50%" stopColor="#E2C974" />
                <stop offset="100%" stopColor="#8A6D2A" />
              </linearGradient>
            </defs>
            {/* Elliptical Orbit Path */}
            <ellipse 
              cx="50" 
              cy="50" 
              rx="42" 
              ry="24" 
              fill="none" 
              stroke="url(#ethizoneGradient)" 
              strokeWidth={currentSize.stroke * 2}
              strokeDasharray="180 40"
              transform="rotate(-20 50 50)"
            />
            {/* Orbiting Arrow Head */}
            <polygon 
              points="84,36 94,44 82,48" 
              fill="#E2C974" 
              transform="rotate(-20 50 50)"
            />
          </svg>
        </div>

        {/* Stationary EthiZone Text */}
        <div className="ethizone-logo-text-container">
          <span 
            className="ethizone-logo-text-fixed"
            style={{ fontSize: currentSize.font }}
          >
            Ethi<span className="ethizone-text-accent">Zone</span>
          </span>
          {subtitle && (
            <span className="ethizone-logo-subtitle">{subtitle}</span>
          )}
        </div>
      </div>

      {showMotto && (
        <span className="ethizone-logo-motto">
          {mottoText || 'Direct-Connect Marketplace'}
        </span>
      )}
    </div>
  );
}
