import React from 'react';
import { useApp } from '../context/AppContext';

export default function CustomerFooter() {
  const { t } = useApp();
  return (
    <footer style={{
      background: 'transparent',
      padding: '20px 0',
      textAlign: 'center',
      fontSize: '0.85rem',
      color: 'var(--text-secondary)',
      borderTop: '1px solid var(--border-glass)',
      marginTop: '40px'
    }}>
      <p>{t ? t('footer_copy') : '© 2026 EthiZone. All Rights Reserved.'}</p>
    </footer>
  );
}
