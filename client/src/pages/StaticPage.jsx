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
      content = 'EthiZone is the ultimate platform connecting buyers and sellers across multiple categories including real estate, automotive, local services, and professional handymen. We strive to provide a seamless, robust, and intuitive marketplace for all your needs.';
      break;
    case '/contact':
      title = t('contact_tab') || 'Contact Us';
      content = 'Have questions or need support? Reach out to our team anytime. We are dedicated to providing you with the best customer service experience. Email us at support@ethizone.com or call our toll-free number.';
      break;
    case '/privacy':
      title = t('privacy_policy') || 'Privacy Policy';
      content = 'Your privacy is our top priority. EthiZone uses advanced encryption and security measures to protect your personal data. We do not sell your personal information to third parties without your explicit consent. Please review our full privacy practices to understand how we collect, use, and safeguard your data.';
      break;
    case '/terms':
      title = t('terms_of_service') || 'Terms & Conditions';
      content = 'By using EthiZone, you agree to comply with and be bound by our terms of service. Users must be at least 18 years of age to engage in binding contracts on our platform. We reserve the right to suspend or terminate accounts that violate our community guidelines or engage in fraudulent activities.';
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
            ⚠️ Important Legal Disclaimer
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
