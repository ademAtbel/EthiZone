import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Breadcrumbs = () => {
  const location = useLocation();
  const { t, activeStoreType } = useApp();
  
  // Don't show breadcrumbs on the home page itself
  if (location.pathname === '/') return null;

  // Split pathname into segments
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div 
      className="breadcrumbs-wrapper"
      style={{ 
        background: 'var(--bg-app)', 
        borderBottom: '1px solid var(--border-glass)',
        paddingTop: '10px', 
        paddingBottom: '10px' 
      }}
    >
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0" style={{ fontSize: '0.85rem', fontWeight: '500' }}>
            <li className="breadcrumb-item">
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                {t('home_tab') || 'Home'}
              </Link>
            </li>
            
            {pathnames.map((value, index) => {
              const isLast = index === pathnames.length - 1;
              let to = `/${pathnames.slice(0, index + 1).join('/')}`;
              if (to === '/store') {
                to = '/?type=store_product';
              }
              
              // Format the text nicely (e.g., 'store' -> 'Store', 'apex-pharmacy' -> 'Apex Pharmacy')
              let text = value
                .replace(/-/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());

              // Custom translations for standard route segments
              if (value === 'store') {
                if (activeStoreType) {
                  text = t(activeStoreType) || activeStoreType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                } else {
                  text = 'Store Directory';
                }
              }
              if (value === 'dashboard') {
                const searchParams = new URLSearchParams(location.search);
                const tab = searchParams.get('tab');
                if (tab) {
                  if (tab === 'store_settings') text = 'Store Settings';
                  else if (tab === 'overview') text = 'Dashboard';
                  else if (tab === 'items') text = 'My Listings';
                  else if (tab === 'settings') text = 'Storefront Navigation';
                  else if (tab === 'reviews') text = 'Reference Log & Feedback';
                  else if (tab === 'inquiries') text = 'Customer Requests';
                  else text = tab.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                } else {
                  text = 'Dashboard';
                }
              }
              if (value === 'admin') text = 'Admin Panel';
              if (value === 'inbox') text = 'Inbox';

              if (isLast && location.pathname.startsWith('/store/') && !location.pathname.endsWith('/dashboard')) {
                const searchParams = new URLSearchParams(location.search);
                const storeTab = searchParams.get('tab');
                if (storeTab && storeTab !== 'home') {
                  const tabText = storeTab.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                  return (
                    <React.Fragment key={to}>
                      <li className="breadcrumb-item">
                        <Link to={to} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                          {text}
                        </Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page" style={{ color: 'var(--accent-secondary)' }}>
                        {tabText}
                      </li>
                    </React.Fragment>
                  );
                }
              }

              return isLast ? (
                <li className="breadcrumb-item active" aria-current="page" key={to} style={{ color: 'var(--accent-secondary)' }}>
                  {text}
                </li>
              ) : (
                <li className="breadcrumb-item" key={to}>
                  <Link to={to} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                    {text}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
      
      <style>{`
        .breadcrumbs-wrapper {
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .breadcrumb-item + .breadcrumb-item::before {
          content: '›';
          color: rgba(255, 255, 255, 0.3);
          font-size: 1.1em;
          vertical-align: middle;
        }
        .breadcrumb-item a:hover {
          color: #fff !important;
      `}</style>
    </div>
  );
};

export default Breadcrumbs;
