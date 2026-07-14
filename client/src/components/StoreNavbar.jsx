import React, { useState, useEffect } from 'react';
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
  const [headerHeight, setHeaderHeight] = useState(180);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerWrapper = document.querySelector('.header-wrapper');
      if (headerWrapper) {
        setHeaderHeight(headerWrapper.offsetHeight);
      }
    };
    
    // Initial check
    updateHeaderHeight();
    
    // Check on resize
    window.addEventListener('resize', updateHeaderHeight);
    
    // Observe DOM changes in case the top banner or breadcrumbs change
    const observer = new MutationObserver(updateHeaderHeight);
    const headerWrapper = document.querySelector('.header-wrapper');
    if (headerWrapper) {
      observer.observe(headerWrapper, { childList: true, subtree: true, attributes: true });
    }
    
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      observer.disconnect();
    };
  }, []);

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

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="store-navbar" style={{ '--header-height': `${headerHeight}px` }}>
      <div className="container store-nav-container">
        <div className="store-brand">
          <span className="store-brand-icon">🏬</span>
          <div>
            <div className="store-title">{storeName || 'Custom Store'}</div>
            <span className="badge badge-cyan store-category-badge">{category}</span>
          </div>
        </div>
        
        <ul className="store-nav-links">
          <li>
            <button 
              type="button"
              onClick={() => handleTabClick('home')} 
              className={`store-nav-link-btn ${activeTab === 'home' ? 'active' : ''}`}
            >
              {t('home_tab')}
            </button>
          </li>
          
          {businessType === 'store' && (
            <>
              <li>
                <button 
                  type="button"
              onClick={() => handleTabClick('on_sale')} 
                  className={`store-nav-link-btn ${activeTab === 'on_sale' ? 'active' : ''}`}
                >
                  On Sale
                </button>
              </li>
              <li>
                <button 
                  type="button"
              onClick={() => handleTabClick('new_arrival')} 
                  className={`store-nav-link-btn ${activeTab === 'new_arrival' ? 'active' : ''}`}
                >
                  New Arrival
                </button>
              </li>
            </>
          )}

          <li>
            <button 
              type="button"
              onClick={() => handleTabClick('catalog')} 
              className={`store-nav-link-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            >
              {getCatalogTabName()}
            </button>
          </li>

          {businessType !== 'store' && (
            <li>
              <button 
                type="button"
              onClick={() => handleTabClick('about')} 
                className={`store-nav-link-btn ${activeTab === 'about' ? 'active' : ''}`}
              >
                {t('about_tab')}
              </button>
            </li>
          )}

          <li>
            <button 
              type="button"
              onClick={() => handleTabClick('gallery')} 
              className={`store-nav-link-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            >
              Gallery
            </button>
          </li>
          
          <li>
            <button 
              type="button"
              onClick={() => handleTabClick('contact')} 
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

      </div>
      
      {/* Mobile Bottom Tabbar specific to Storefront */}
      <div className="store-mobile-bottom-tabbar d-lg-none">
        <button 
          onClick={() => handleTabClick('home')} 
          className={`store-mobile-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
        >
          <span className="tab-label">{t('home_tab')}</span>
        </button>
        
        {businessType === 'store' && (
          <>
            <button 
              onClick={() => handleTabClick('on_sale')} 
              className={`store-mobile-tab-btn ${activeTab === 'on_sale' ? 'active' : ''}`}
            >
              <span className="tab-label">On Sale</span>
            </button>
            <button 
              onClick={() => handleTabClick('new_arrival')} 
              className={`store-mobile-tab-btn ${activeTab === 'new_arrival' ? 'active' : ''}`}
            >
              <span className="tab-label">New</span>
            </button>
          </>
        )}

        <button 
          onClick={() => handleTabClick('catalog')} 
          className={`store-mobile-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
        >
          <span className="tab-label">{getCatalogTabName()}</span>
        </button>

        {businessType !== 'store' && (
          <button 
            onClick={() => handleTabClick('about')} 
            className={`store-mobile-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          >
            <span className="tab-label">{t('about_tab')}</span>
          </button>
        )}

        <button 
          onClick={() => handleTabClick('gallery')} 
          className={`store-mobile-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
        >
          <span className="tab-label">Gallery</span>
        </button>

        <button 
          onClick={() => handleTabClick('contact')} 
          className={`store-mobile-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
        >
          <span className="tab-label">{t('contact_tab')}</span>
        </button>
        {customLinks.map((link, index) => {
          const targetUrl = link.url.startsWith('http') ? link.url : `http://${link.url}`;
          return (
            <a 
              key={`mobile-${index}`}
              href={targetUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="store-mobile-tab-btn custom-link"
            >
              <span className="tab-label">{link.label}</span>
            </a>
          );
        })}
      </div>

      <style>{`
        .store-navbar {
          background: rgba(15, 23, 42, 0.95);
          border-bottom: 2px solid var(--accent-secondary);
          padding: 14px 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          z-index: 990;
        }
        @media (min-width: 992px) {
          .store-navbar {
            position: sticky;
            /* The top value is set dynamically by JS, but provide a fallback */
            top: var(--header-height, 180px); 
          }
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
            display: none !important;
          }
          .store-nav-actions {
            width: 100%;
            justify-content: flex-end;
          }
          
          /* Show mobile tab bar on small screens */
          .store-mobile-bottom-tabbar {
            display: flex !important;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: var(--blur-glass);
            -webkit-backdrop-filter: var(--blur-glass);
            border-top: 1px solid var(--accent-secondary);
            z-index: 2000;
            padding: 8px 4px;
            padding-bottom: env(safe-area-inset-bottom, 8px);
            overflow-x: auto;
            gap: 6px;
            box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
            justify-content: flex-start;
            align-items: center;
          }
          .store-mobile-bottom-tabbar::-webkit-scrollbar {
            display: none;
          }
          .store-mobile-bottom-tabbar::before,
          .store-mobile-bottom-tabbar::after {
            content: '';
            margin: auto;
          }
        }
        
        .store-mobile-bottom-tabbar {
          display: none; /* Hidden on desktop */
        }
        
        .store-mobile-tab-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--text-secondary);
          min-width: max-content;
          padding: 6px 12px;
          border-radius: 8px;
          gap: 2px;
          transition: all 0.2s;
          text-decoration: none;
        }
        
        .store-mobile-tab-btn.active {
          color: var(--accent-secondary);
          background-color: rgba(var(--accent-secondary-rgb), 0.15);
        }
        
        .store-mobile-tab-btn span.tab-label {
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
        }
      `}</style>
    </nav>
  );
};

export default StoreNavbar;
