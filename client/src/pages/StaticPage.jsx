import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const StaticPage = () => {
  const { t } = useApp();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  let title = '';
  let content = '';

  // Determine content based on URL path
  switch (location.pathname) {
    case '/about':
      title = t('about_us') || 'About Us';
      content = t('about_us_content');
      break;
    case '/contact':
      title = t('contact_tab') || 'Contact Us';
      content = t('contact_tab_content');
      break;
    case '/privacy':
      title = t('privacy_policy') || 'Privacy Policy';
      content = t('privacy_policy_content');
      break;
    case '/terms':
      title = t('terms_of_service') || 'Terms & Conditions';
      content = t('terms_of_service_content');
      break;
    default:
      title = 'Page';
      content = '';
  }

  return (
    <div className="container py-5" style={{ minHeight: '60vh' }}>
      {/* 
        The breadcrumbs are already globally rendered in App.jsx, 
        so they will automatically appear above this content! 
      */}
      <div className="card shadow-sm border-0 p-4 p-md-5" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-main)', borderRadius: '12px' }}>
        <h1 className="fw-bold mb-4" style={{ color: 'var(--text-main)' }}>{title}</h1>
        
        <p className="fs-5" style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          {content}
        </p>

        {/* Global Legal Disclaimer as requested by user */}
        <div className="alert mt-5" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', border: '1px solid var(--accent-danger)', color: 'var(--text-main)', borderRadius: '8px' }}>
          <h4 className="alert-heading fw-bold d-flex align-items-center gap-2" style={{ color: 'var(--accent-danger)' }}>
            {t('legal_disclaimer_title') || '⚠️ Important Legal Disclaimer'}
          </h4>
          <p className="mb-0 mt-2 fw-medium" style={{ fontSize: '1.05rem' }}>
            {t('legal_disclaimer') || "For any money transaction, EthiZone is NOT responsible. The seller is solely responsible for their products and services."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
