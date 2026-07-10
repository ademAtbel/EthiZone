import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const StoreNavbar = ({ 
  storeName, 
  category, 
  customLinks = [], 
  isOwner, 
  onShowQr, 
  storeId,
  role,
  businessType,
  activeTab,
  setActiveTab
}) => {
  const { t } = useApp();

  const getCatalogTabName = () => {
    if (role === 'handyman') return t('skills_tab');
    if (role === 'individual') return t('used_items_tab');
    if (role === 'business') {
      if (businessType === 'store') return t('shop_tab');
      if (businessType === 'service') return t('services_tab');
      if (businessType === 'organization') return t('job_openings_tab');
      if (businessType === 'real_estate') return t('properties_tab');
      if (businessType === 'automotive') return t('showroom_tab');
    }
    return t('catalog_tab');
  };

  return (
    <nav className="store-navbar">
      <div className="container store-nav-container">
        <div className="store-brand">
          <span className="store-brand-icon">🏬</span>
          <div>
            <div className="store-title">{storeName || 'Custom Store'}</div>
            <span className="badge badge-cyan store-category-badge">{category}</span>
          </div>
        </div>
        
        <ul className="store-nav-links">
          {/* Standard Store Section Tabs */}
          <li>
            <button 
              type="button"
              onClick={() => setActiveTab('home')} 
              className={`store-nav-link-btn ${activeTab === 'home' ? 'active' : ''}`}
            >
              {t('home_tab')}
            </button>
          </li>
          <li>
            <button 
              type="button"
              onClick={() => setActiveTab('catalog')} 
              className={`store-nav-link-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            >
              {getCatalogTabName()}
            </button>
          </li>
          <li>
            <button 
              type="button"
              onClick={() => setActiveTab('about')} 
              className={`store-nav-link-btn ${activeTab === 'about' ? 'active' : ''}`}
            >
              {t('about_tab')}
            </button>
          </li>
          <li>
            <button 
              type="button"
              onClick={() => setActiveTab('contact')} 
              className={`store-nav-link-btn ${activeTab === 'contact' ? 'active' : ''}`}
            >
              {t('contact_tab')}
            </button>
          </li>
          
          {/* Custom navbar links specified by owner */}
          {customLinks.map((link, index) => {
            const targetUrl = link.url.startsWith('http') ? link.url : `http://${link.url}`;
            return (
              <li key={index}>
                <a 
                  href={targetUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="store-nav-link-btn custom-link"
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Owner actions removed to keep public storefront clean */}
      </div>

      <style>{`
        .store-navbar {
          background: rgba(15, 23, 42, 0.95);
          border-bottom: 2px solid var(--accent-secondary);
          padding: 14px 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
        .store-nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .store-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .store-brand-icon {
          font-size: 1.8rem;
        }
        .store-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.25rem;
          color: #ffffff;
          line-height: 1.2;
        }
        .store-category-badge {
          font-size: 0.65rem;
          padding: 1px 6px;
          margin-top: 2px;
        }
        .store-nav-links {
          display: flex;
          list-style: none;
          gap: 20px;
          align-items: center;
          margin: 0;
          padding: 0;
        }
        .store-nav-link-btn {
          background: none;
          border: none;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 4px 8px;
          display: inline-flex;
          align-items: center;
        }
        .store-nav-link-btn:hover {
          color: #ffffff;
        }
        .store-nav-link-btn.active {
          color: var(--accent-secondary);
          border-bottom: 2px solid var(--accent-secondary);
        }
        .custom-link {
          color: var(--accent-secondary);
        }
        .custom-link:hover {
          color: #67e8f9;
        }
        .store-nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .qr-btn {
          background: linear-gradient(135deg, var(--accent-secondary) 0%, #0891b2 100%);
          box-shadow: 0 4px 15px var(--accent-secondary-glow);
        }
        .qr-btn:hover {
          box-shadow: 0 6px 20px var(--accent-secondary-glow);
        }
        @media (max-width: 900px) {
          .store-nav-container {
            flex-direction: column;
            align-items: flex-start;
          }
          .store-nav-links {
            display: flex;
            flex-wrap: nowrap;
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 8px;
            gap: 16px;
            scrollbar-width: none;
          }
          .store-nav-links::-webkit-scrollbar {
            display: none;
          }
          .store-nav-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </nav>
  );
};

export default StoreNavbar;
