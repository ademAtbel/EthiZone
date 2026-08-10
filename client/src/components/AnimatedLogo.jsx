import React from 'react';
import logoImg from '../assets/logo.png';
import './AnimatedLogo.css';

/**
 * AnimatedLogo Component for EthiZone
 * Displays the official EthiZone Logo featuring the hexagonal black 'E' icon,
 * elegant text typography, and gold orbital infinity arrows.
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
  const heightMap = {
    sm: '36px',
    md: '48px',
    lg: '68px',
    xl: '96px'
  };

  const logoHeight = heightMap[size] || heightMap.md;

  return (
    <div className={`ethizone-logo-wrapper ${size} ${className}`}>
      <div className="ethizone-logo-image-box" style={{ height: logoHeight }}>
        <img 
          src={logoImg} 
          alt="EthiZone Logo" 
          className="ethizone-official-logo"
        />
      </div>

      {subtitle && (
        <span className="ethizone-logo-subtitle">{subtitle}</span>
      )}

      {showMotto && (
        <span className="ethizone-logo-motto">
          {mottoText || 'Direct-Connect Marketplace'}
        </span>
      )}
    </div>
  );
}

