import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Breadcrumbs from './Breadcrumbs';
import QrModal from './QrModal';
import ThemeToggle from './ThemeToggle';
import { Printer, User, Key, LayoutDashboard, Store, LogOut, Menu, X, Globe, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [qrOpen, setQrOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (user && user.role === 'business' && user.storeName) {
      const storeSlug = user.storeName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
      return `/store/${storeSlug}/dashboard`;
    }
    return '/dashboard';
  };
  // Fetch translation and theme context states
  const { theme, language, toggleTheme, toggleLanguage, t, activeStoreType, setActiveStoreType } = useApp();

  const [searchParams, setSearchParams] = useSearchParams();
  
  // Map internal businessType from Storefront to the URL type param used by the filter badges
  let mappedActiveType = activeStoreType;
  if (mappedActiveType === 'store') mappedActiveType = 'store_product';
  if (mappedActiveType === 'organization') mappedActiveType = 'job_opening';
  if (mappedActiveType === 'real_estate') mappedActiveType = 'house';
  if (mappedActiveType === 'automotive') mappedActiveType = 'car';

  const selectedType = mappedActiveType || searchParams.get('type') || '';

  // Differentiate public storefront views from private store dashboards
  const isPublicStorefront = location.pathname.startsWith('/store/') && !location.pathname.endsWith('/dashboard');

  // Show filters only on Directory Homepage or public Storefront pages
  const showFilters = location.pathname === '/' || isPublicStorefront;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserMenuOpen(false);
    navigate('/login');
  };

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setPasswordLoading(true);
      const res = await fetch('/api/auth/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setPasswordSuccess('Password updated successfully!');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => {
        setChangePasswordOpen(false);
        setPasswordSuccess('');
      }, 1500);
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleTypeSelect = (type) => {
    setActiveStoreType('');
    if (location.pathname !== '/') {
      navigate(`/?type=${type}`);
    } else {
      const newParams = new URLSearchParams(searchParams);
      if (selectedType === type) {
        newParams.delete('type');
      } else {
        newParams.set('type', type);
      }
      setSearchParams(newParams);
    }
  };

  return (
    <>
      <div className="header-wrapper">
      <div className="navbar-top-banner" style={{ background: 'var(--accent-primary)', color: '#ffffff', textAlign: 'center', padding: '8px 10px', fontSize: '0.82rem', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        📢 {t('top_banner_slogan')} 📢
      </div>
      <nav className="glass-navbar">
        <div className="container nav-container" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/logo.png" alt="Ethiozone Logo" style={{ height: '112px', objectFit: 'contain' }} />
          </Link>
          <span className="logo-motto" style={{ fontSize: '0.66rem', color: 'var(--accent-secondary)', fontStyle: 'italic', fontWeight: 600, marginTop: '2px', paddingLeft: '4px', letterSpacing: '0.02em' }}>
            {t('logo_motto_slogan')}
          </span>
        </div>

        {/* Center: Business Category Filter Badges */}
        {showFilters && (
          <div className="navbar-center-filters">
            <button
              onClick={() => handleTypeSelect('store_product')}
              className={`filter-badge ${selectedType === 'store_product' ? 'active' : ''}`}
            >
              {t('stores')}
            </button>
            <button
              onClick={() => handleTypeSelect('handyman_skill')}
              className={`filter-badge ${selectedType === 'handyman_skill' ? 'active' : ''}`}
            >
              {t('handymen')}
            </button>
            <button
              onClick={() => handleTypeSelect('service')}
              className={`filter-badge ${selectedType === 'service' ? 'active' : ''}`}
            >
              {t('services')}
            </button>
            <button
              onClick={() => handleTypeSelect('job_opening')}
              className={`filter-badge ${selectedType === 'job_opening' ? 'active' : ''}`}
            >
              {t('organizations')}
            </button>
            <button
              onClick={() => handleTypeSelect('house')}
              className={`filter-badge ${selectedType === 'house' ? 'active' : ''}`}
            >
              {t('real_estate')}
            </button>
            <button
              onClick={() => handleTypeSelect('car')}
              className={`filter-badge ${selectedType === 'car' ? 'active' : ''}`}
            >
              {t('automotive')}
            </button>
            <button
              onClick={() => handleTypeSelect('personal_item')}
              className={`filter-badge ${selectedType === 'personal_item' ? 'active' : ''}`}
            >
              {t('used_items')}
            </button>
          </div>
        )}

        {/* Always Visible Actions (Language Toggle) */}
        <div className="nav-global-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto', marginRight: '10px' }}>
          {/* Language Toggle Button */}
          <button 
            onClick={toggleLanguage} 
            className="btn-navbar-tool btn-lang"
            title="Switch Language / ቋንቋ ቀይር"
            style={{ fontSize: '0.8rem', padding: '6px 10px', height: '34px', minWidth: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {language === 'en' ? 'አማ' : 'EN'}
          </button>
        </div>

        {/* Right Nav Links */}
        <div className="nav-links">
          {token && !isPublicStorefront ? (
            <>
              {user.role === 'super_admin' && (
                <Link to="/super-admin" className="nav-link admin-badge">Super Admin</Link>
              )}
              {(user.role === 'business' || user.role === 'handyman') && (
                <div className="store-dashboard-shortcuts" style={{ display: 'inline-flex', gap: '8px', marginRight: '10px' }}>
                  <button onClick={() => setQrOpen(true)} className="btn btn-secondary btn-sm d-flex align-items-center gap-1" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
                    <Printer size={14} /> QR Code
                  </button>
                  <a 
                    href={`/store/${(user.storeName || user.username || '').toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-')}`} 
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: '6px 12px', fontSize: '0.82rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                  >
                    Visit Storefront
                  </a>
                </div>
              )}
              <div className="navbar-avatar-container" style={{ position: 'relative', marginLeft: '10px' }}>
                {user.storeLogo ? (
                  <img 
                    src={user.storeLogo} 
                    alt="User Profile" 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-glass)', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', cursor: 'pointer', display: 'block' }}
                  />
                ) : (
                  <div 
                    className="navbar-avatar-circle"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)', color: '#ffffff', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--border-glass)', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', cursor: 'pointer' }}
                  >
                    {user.username ? user.username.charAt(0).toUpperCase() : <User size={20} />}
                  </div>
                )}

                {userMenuOpen && (
                  <>
                    <div 
                      onClick={() => setUserMenuOpen(false)}
                      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1005, background: 'transparent', cursor: 'default' }}
                    />
                    <div className="navbar-user-dropdown glass-panel" style={{ position: 'absolute', top: '50px', right: 0, width: '240px', padding: '16px 0', zIndex: 1010, background: 'var(--bg-navbar)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)' }}>
                      <div className="dropdown-user-header" style={{ padding: '0 16px 12px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <h6 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)' }}>{user.username}</h6>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.email || 'User Account'}</span>
                        <span className={`role-badge-mini ${user.role}`} style={{ display: 'inline-block', width: 'fit-content', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', padding: '1px 6px', borderRadius: '4px', marginTop: '4px', background: user.role === 'business' ? 'rgba(197, 168, 90, 0.15)' : 'rgba(0, 0, 0, 0.05)', color: user.role === 'business' ? 'var(--accent-secondary)' : 'var(--text-main)' }}>
                          {user.role === 'business' ? user.businessType : user.role}
                        </span>
                      </div>
                      <div className="dropdown-divider" style={{ height: '1px', background: 'var(--border-glass)', margin: '8px 0' }}></div>
                       {(user.role === 'business' || user.role === 'handyman') && (
                        <button 
                          type="button" 
                          onClick={() => { setQrOpen(true); setUserMenuOpen(false); }} 
                          className="dropdown-item d-flex align-items-center gap-2"
                          style={{ display: 'block', width: '100%', padding: '10px 16px', background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.88rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                          <Printer size={16} /> QR Code
                        </button>
                      )}
                      <button 
                        type="button" 
                        onClick={() => { setChangePasswordOpen(true); setUserMenuOpen(false); }} 
                        className="dropdown-item d-flex align-items-center gap-2"
                        style={{ display: 'block', width: '100%', padding: '10px 16px', background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.88rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' }}
                      >
                        <Key size={16} /> Change Password
                      </button>
                      <Link to={getDashboardLink()} onClick={() => setUserMenuOpen(false)} className="dropdown-item d-flex align-items-center gap-2" style={{ display: 'block', width: '100%', padding: '10px 16px', background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.88rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'none' }}>
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                      {(user.role === 'business' || user.role === 'handyman') && (
                        <a 
                          href={`/store/${(user.storeName || user.username || '').toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="dropdown-item d-flex align-items-center gap-2"
                          style={{ display: 'block', width: '100%', padding: '10px 16px', background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.88rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'none' }}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Store size={16} /> Visit Storefront
                        </a>
                      )}
                      <div className="dropdown-divider" style={{ height: '1px', background: 'var(--border-glass)', margin: '8px 0' }}></div>
                      <button 
                        type="button" 
                        onClick={handleLogout} 
                        className="dropdown-item logout-btn d-flex align-items-center gap-2"
                        style={{ display: 'block', width: '100%', padding: '10px 16px', background: 'none', border: 'none', color: 'var(--accent-danger)', fontSize: '0.88rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' }}
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">{t('login')}</Link>
              <Link to="/register" className="btn btn-primary btn-sm">{t('be_partner')}</Link>
            </>
          )}
        </div>

        {qrOpen && (
          <QrModal 
            isOpen={qrOpen}
            onClose={() => setQrOpen(false)}
            storeName={user.storeName || user.username}
            category={user.category || 'Provider'}
            storeId={user.id || user._id || ''}
          />
        )}

        {changePasswordOpen && (
          <div className="modal-overlay" style={{ zIndex: 1100 }}>
            <div className="glass-panel modal-content" style={{ maxWidth: '400px', width: '90%', padding: '30px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', borderLeft: '3px solid var(--accent-primary)', paddingLeft: '10px' }}>
                Change Password
              </h3>
              
              {passwordError && <div className="alert alert-danger" style={{ fontSize: '0.85rem', padding: '8px 12px', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '15px', borderRadius: '4px' }}>{passwordError}</div>}
              {passwordSuccess && <div className="alert alert-success" style={{ fontSize: '0.85rem', padding: '8px 12px', background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '15px', borderRadius: '4px' }}>{passwordSuccess}</div>}

              <form onSubmit={handleChangePassword}>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600 }}>Current Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600 }}>New Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600 }}>Confirm New Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn btn-primary flex-grow-1" disabled={passwordLoading} style={{ padding: '10px 16px', fontSize: '0.9rem' }}>
                    {passwordLoading ? 'Updating...' : 'Update Password'}
                  </button>
                  <button type="button" onClick={() => { setChangePasswordOpen(false); setPasswordError(''); setPasswordSuccess(''); }} className="btn btn-secondary" style={{ padding: '10px 16px', fontSize: '0.9rem' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .header-wrapper {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
        }
        .glass-navbar {
          background: var(--bg-navbar);
          backdrop-filter: var(--blur-glass);
          -webkit-backdrop-filter: var(--blur-glass);
          border-bottom: 1px solid var(--border-glass);
          position: sticky;
          top: 0;
          z-index: 999;
          padding: 16px 0;
          transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--text-main);
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .logo img {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          filter: invert(1) drop-shadow(0 2px 5px rgba(0, 0, 0, 0.1));
        }
        .logo:hover img {
          transform: scale(1.05);
          filter: invert(1) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
        }
        .logo-icon {
          font-size: 1.8rem;
        }
        .navbar-center-filters {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .nav-link {
          font-weight: 500;
          color: var(--text-secondary);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-block;
        }
        .nav-link:hover {
          color: var(--text-main);
          transform: translateY(-1px);
        }
        .admin-badge {
          color: var(--accent-warning);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          background: rgba(245, 158, 11, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .admin-badge:hover {
          background: rgba(245, 158, 11, 0.15);
          color: var(--text-main);
          transform: translateY(-1px);
        }
        .user-profile-info {
          display: flex;
          align-items: center;
          gap: 16px;
          border-left: 1px solid var(--border-glass);
          padding-left: 16px;
        }
        .btn-sm {
          padding: 8px 16px;
          font-size: 0.85rem;
        }
        
        /* Navbar Tool Button Styles */
        .btn-navbar-tool {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          color: var(--text-main);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-navbar-tool:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        body.light-theme .btn-navbar-tool {
          background: rgba(0, 0, 0, 0.03);
          border-color: rgba(0, 0, 0, 0.08);
        }
        body.light-theme .btn-navbar-tool:hover {
          background: rgba(0, 0, 0, 0.08);
        }

        .filter-badge {
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .filter-badge:hover {
          color: var(--text-main);
          background: rgba(0, 0, 0, 0.06);
          border-color: var(--accent-secondary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        .filter-badge.active {
          background: var(--accent-primary);
          color: #ffffff;
          border-color: var(--accent-primary);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        /* Responsive Mobile Styling */
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-main);
          font-size: 1.8rem;
          cursor: pointer;
          z-index: 1001;
        }

        .mobile-menu-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--bg-navbar);
          backdrop-filter: var(--blur-glass);
          -webkit-backdrop-filter: var(--blur-glass);
          border-top: 1px solid var(--border-glass);
          border-bottom: 1px solid var(--border-glass);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          animation: slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-drawer-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
        }
        
        .w-full {
          width: 100%;
        }
        .text-center {
          text-align: center;
        }

        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 992px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block;
          }
          .navbar-center-filters {
            display: none; /* Hide main categories search filters bar in mobile top nav */
          }
          .navbar-top-banner {
            display: none !important;
          }
          .logo-motto {
            display: none !important;
          }
          .logo img {
            height: 48px !important;
          }
          .store-dashboard-shortcuts {
            display: none !important;
          }
          .mobile-bottom-tabbar {
            display: flex !important;
          }
        }
        
        .mobile-bottom-tabbar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--bg-navbar);
          backdrop-filter: var(--blur-glass);
          -webkit-backdrop-filter: var(--blur-glass);
          border-top: 1px solid var(--border-glass);
          z-index: 1000;
          padding: 8px 4px;
          padding-bottom: env(safe-area-inset-bottom, 8px);
          overflow-x: auto;
          gap: 6px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.1);
          /* Centering logic that supports scrolling */
          justify-content: flex-start;
          align-items: center;
        }

        .mobile-bottom-tabbar::before,
        .mobile-bottom-tabbar::after {
          content: '';
          margin: auto;
        }
        
        .mobile-bottom-tabbar::-webkit-scrollbar {
          display: none;
        }
        
        .mobile-tab-btn {
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
          cursor: pointer;
        }
        
        .mobile-tab-btn.active {
          background-color: var(--accent-primary);
          color: #ffffff;
        }
        
        .mobile-tab-btn span.material-symbols-outlined {
          font-size: 1.4rem;
        }
        
        .mobile-tab-btn span.tab-label {
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
        }
      `}</style>
      </nav>
      <Breadcrumbs />
      </div>

      {/* Mobile Bottom Tabbar */}
      {showFilters && !isPublicStorefront && (
        <div className="mobile-bottom-tabbar d-lg-none">
          <button
            onClick={() => { handleTypeSelect('store_product'); setMobileMenuOpen(false); }}
            className={`mobile-tab-btn ${selectedType === 'store_product' ? 'active' : ''}`}
          >
            <span className="tab-label">{t('stores')}</span>
          </button>
          <button
            onClick={() => { handleTypeSelect('handyman_skill'); setMobileMenuOpen(false); }}
            className={`mobile-tab-btn ${selectedType === 'handyman_skill' ? 'active' : ''}`}
          >
            <span className="tab-label">{t('handymen')}</span>
          </button>
          <button
            onClick={() => { handleTypeSelect('service'); setMobileMenuOpen(false); }}
            className={`mobile-tab-btn ${selectedType === 'service' ? 'active' : ''}`}
          >
            <span className="tab-label">{t('services')}</span>
          </button>
          <button
            onClick={() => { handleTypeSelect('job_opening'); setMobileMenuOpen(false); }}
            className={`mobile-tab-btn ${selectedType === 'job_opening' ? 'active' : ''}`}
          >
            <span className="tab-label">{t('organizations')}</span>
          </button>
          <button
            onClick={() => { handleTypeSelect('house'); setMobileMenuOpen(false); }}
            className={`mobile-tab-btn ${selectedType === 'house' ? 'active' : ''}`}
          >
            <span className="tab-label">{t('real_estate')}</span>
          </button>
          <button
            onClick={() => { handleTypeSelect('car'); setMobileMenuOpen(false); }}
            className={`mobile-tab-btn ${selectedType === 'car' ? 'active' : ''}`}
          >
            <span className="tab-label">{t('automotive')}</span>
          </button>
          <button
            onClick={() => { handleTypeSelect('personal_item'); setMobileMenuOpen(false); }}
            className={`mobile-tab-btn ${selectedType === 'personal_item' ? 'active' : ''}`}
          >
            <span className="tab-label">{t('used_items')}</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
