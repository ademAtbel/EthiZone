import React from 'react';
import { useApp } from '../context/AppContext';
import AnimatedLogo from './AnimatedLogo';

export default function CustomerFooter() {
  const { t } = useApp();
  return (
    <footer style={{
      background: 'transparent',
      padding: '30px 0 20px 0',
      textAlign: 'center',
      fontSize: '0.85rem',
      color: 'var(--text-secondary)',
      borderTop: '1px solid var(--border-glass)',
      marginTop: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px'
    }}>
      <AnimatedLogo size="sm" showMotto mottoText="Direct-Connect Marketplace" />
      <p style={{ margin: 0 }}>{t ? t('footer_copy') : '© 2026 EthiZone. All Rights Reserved.'}</p>
    </footer>
  );
}
