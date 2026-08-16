import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Storefront from './pages/Storefront';
import SuperAdmin from './pages/SuperAdmin';
import Inbox from './pages/Inbox';
import Chatbot from './components/Chatbot';
import StaticPage from './pages/StaticPage';
import EventsPage from './pages/EventsPage';

import AnimatedLogo from './components/AnimatedLogo';

// Seller / Partner Imports
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerHubPage from './pages/seller/SellerHubPage';
import ManageProductsPage from './pages/seller/ManageProductsPage';
import AddProductPage from './pages/seller/AddProductPage';
import AddServicePage from './pages/seller/AddServicePage';
import AddJobPage from './pages/seller/AddJobPage';
import AddHousePage from './pages/seller/AddHousePage';
import AddCarPage from './pages/seller/AddCarPage';
import ManageOrdersPage from './pages/seller/ManageOrdersPage';
import ShippingRulesPage from './pages/seller/ShippingRulesPage';
import SellerChatInbox from './pages/seller/SellerChatInbox';
import SellertoAdminSupportChat from './pages/seller/SellertoAdminSupportChat';

import RegistrationPage from './pages/customer/RegistrationPage';
import PhoneEntryModal from './pages/customer/PhoneEntryModal';
import SMSCodeModal from './pages/customer/SMSCodeModal';
import CarsPage from './pages/customer/CarsPage';
import StoreListPage from './pages/customer/StoreListPage';
import { Globe, Mail, Phone, ArrowRight } from 'lucide-react';

// Sub-wrapper component to handle global layout styling
const AppContent = () => {
  const { t } = useApp();

  const handleUnderConstruction = (e) => {
    if (e) e.preventDefault();
    alert("We are working on this feature! It will be available soon.");
  };

  const handleNewsletterSubmit = (e) => {
    if (e) e.preventDefault();
    alert(t('newsletter_success') || "You will be notified when a new store is registered!");
    e.target.reset();
  };

  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.search]);

  // Scroll Reveal Animations Observer (Bidirectional Up & Down for All Pages)
  React.useEffect(() => {
    let observer;
    let mutationObserver;
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 5) {
        scrollDirection = 'down';
      } else if (currentScrollY < lastScrollY - 5) {
        scrollDirection = 'up';
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const targetSelectors = [
      'main section',
      'main article',
      'main .card',
      'main .glass-panel',
      'main .home-featured-card',
      'main .cat-card-large',
      'main .cat-card-small',
      'main .featured-section',
      'main .how-it-works-section',
      'main .step-col',
      'main .event-card',
      'main .listing-card',
      'main .store-card',
      'main .product-card',
      'main .service-card',
      'main .job-card',
      'main .house-card',
      'main .car-card',
      'main .stat-card',
      'main .dashboard-card',
      'main .section-header-row',
      'main .hero-section',
      'main .hero-banner',
      'main .auth-card',
      'main .form-container',
      'main .p-4.border',
      'main .border.rounded-3',
      'main .row > [class*="col-"]',
      '.scroll-animate',
      '.landing-footer .footer-col'
    ];

    const initObserver = () => {
      const elements = document.querySelectorAll(targetSelectors.join(','));
      if (!elements.length) return;

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const el = entry.target;
              if (entry.isIntersecting) {
                if (scrollDirection === 'up') {
                  el.classList.remove('scroll-from-bottom');
                  el.classList.add('scroll-from-top');
                } else {
                  el.classList.remove('scroll-from-top');
                  el.classList.add('scroll-from-bottom');
                }
                el.classList.add('scroll-animated');
              } else {
                el.classList.remove('scroll-animated');
                const rect = entry.boundingClientRect;
                if (rect.top < 0) {
                  el.classList.remove('scroll-from-bottom');
                  el.classList.add('scroll-from-top');
                } else {
                  el.classList.remove('scroll-from-top');
                  el.classList.add('scroll-from-bottom');
                }
              }
            });
          },
          {
            threshold: 0.08,
            rootMargin: '0px 0px -20px 0px'
          }
        );
      }

      elements.forEach((el) => {
        if (el.closest('.navbar') || el.closest('.mobile-bottom-tabbar') || el.closest('.modal')) {
          return;
        }
        if (!el.classList.contains('scroll-reveal-init')) {
          el.classList.add('scroll-reveal-init');
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight / 2) {
            el.classList.add('scroll-from-top');
          } else {
            el.classList.add('scroll-from-bottom');
          }
        }
        observer.observe(el);
      });
    };

    const timer1 = setTimeout(initObserver, 100);
    const timer2 = setTimeout(initObserver, 400);

    mutationObserver = new MutationObserver(() => {
      initObserver();
    });

    const mainContainer = document.querySelector('main.app-main-content') || document.body;
    mutationObserver.observe(mainContainer, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, [location.pathname, location.search]);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = Boolean(token && user && user._id);
  const isDashboardRoute = location.pathname.includes('/dashboard') || location.pathname.startsWith('/seller/') || location.pathname.startsWith('/admin') || location.pathname.startsWith('/super-admin');
  const isSellerPortal = location.pathname.startsWith('/seller/');
  const hideFooter = isLoggedIn || isDashboardRoute || isSellerPortal;

  return (
    <>
      {!isSellerPortal && <Navbar />}
      
      <main className="app-main-content" style={isSellerPortal ? { paddingTop: 0, minHeight: '100vh' } : {}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/store/:storeName/dashboard" element={<Dashboard />} />
          <Route path="/store/:storeName" element={<Storefront />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/storelist" element={<StoreListPage />} />
          <Route path="/stores" element={<StoreListPage />} />

          {/* Customer / Partner Auth Portals */}
          <Route path="/partner-register" element={<RegistrationPage />} />
          <Route path="/phoneentrymodal" element={<PhoneEntryModal />} />
          <Route path="/smscodemodal" element={<SMSCodeModal />} />

          {/* Legacy seller template routes redirected to clean unified dashboard */}
          <Route path="/seller/:storeSlug/*" element={<Navigate to="/dashboard" replace />} />
          <Route path="/admin" element={<SuperAdmin />} />
          <Route path="/super-admin" element={<SuperAdmin />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/about" element={<StaticPage />} />
          <Route path="/about-us" element={<StaticPage />} />
          <Route path="/contact" element={<StaticPage />} />
          <Route path="/privacy" element={<StaticPage />} />
          <Route path="/privacy-policy" element={<StaticPage />} />
          <Route path="/terms" element={<StaticPage />} />
          <Route path="/terms-of-service" element={<StaticPage />} />
        </Routes>
      </main>

      {!hideFooter && (
        <footer className="landing-footer">
          <div className="container footer-grid">
            <div className="footer-col brand-col">
              <div className="footer-logo">
                <AnimatedLogo size="md" />
              </div>
              <p>{t('footer_brand_desc')}</p>
              <div className="social-links">
                <Link to="/contact" title="Contact Us" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'inherit' }}>
                  <Mail size={20} />
                </Link>
              </div>
            </div>
            <div className="footer-col">
              <h5>{t('marketplace')}</h5>
              <ul>
                <li><Link to="/stores" className="footer-link-btn">{t('stores')}</Link></li>
                <li><Link to="/?type=handyman_skill" className="footer-link-btn">{t('handymen') || 'Hire Me'}</Link></li>
                <li><Link to="/?type=service" className="footer-link-btn">{t('services')}</Link></li>
                <li><Link to="/?type=job_opening" className="footer-link-btn">{t('organizations') || 'Jobs'}</Link></li>
                <li><Link to="/?type=house" className="footer-link-btn">{t('real_estate') || 'Houses'}</Link></li>
                <li><Link to="/cars" className="footer-link-btn">{t('automotive')}</Link></li>
                <li><Link to="/?type=personal_item" className="footer-link-btn">{t('used_items') || 'Used Items'}</Link></li>
                <li><Link to="/events" className="footer-link-btn">{t('events') || 'Events'}</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>{t('company')}</h5>
              <ul>
                <li><Link to="/about-us" className="footer-link-btn" style={{textDecoration:'none', color:'inherit'}}>{t('about_us')}</Link></li>
                <li><Link to="/contact" className="footer-link-btn" style={{textDecoration:'none', color:'inherit'}}>{t('contact_tab')}</Link></li>
                <li><Link to="/privacy-policy" className="footer-link-btn" style={{textDecoration:'none', color:'inherit'}}>{t('privacy_policy')}</Link></li>
                <li><Link to="/terms-of-service" className="footer-link-btn" style={{textDecoration:'none', color:'inherit'}}>{t('terms_of_service')}</Link></li>
              </ul>
            </div>
            <div className="footer-col newsletter-col">
              <h5>{t('newsletter')}</h5>
              <p>{t('newsletter_desc')}</p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-input-row">
                <input type="email" placeholder={t('your_email_placeholder')} required />
                <button type="submit" className="btn-newsletter-send"><ArrowRight size={18} /></button>
              </form>
            </div>
          </div>
          <div className="footer-bottom text-center">
            <p>{t('footer_copy')}</p>
          </div>
        </footer>
      )}

      <Chatbot />

      <style>{`
        .app-main-content {
          min-height: calc(100vh - 400px);
        }
        
        /* Premium Global Footer styles */
        .landing-footer {
          background: var(--bg-app);
          color: var(--text-secondary);
          padding: 80px 0 30px 0;
          font-size: 0.9rem;
          margin-top: 60px;
          border-top: 1px solid var(--border-glass);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
          gap: 40px;
          margin-bottom: 50px;
        }
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .social-links {
            justify-content: center;
          }
          .footer-link-btn {
            text-align: center;
          }
          .newsletter-input-row {
            max-width: 400px;
            margin: 0 auto;
          }
        }
        .footer-col h5 {
          color: var(--text-main);
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 20px;
          letter-spacing: 0.05em;
        }
        .footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-col ul li {
          margin-bottom: 12px;
        }
        .footer-col ul li a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-col ul li a:hover {
          color: var(--accent-secondary);
        }
        .footer-link-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          padding: 0;
          cursor: pointer;
          font-size: 0.9rem;
          text-align: left;
          text-decoration: none;
          display: inline-block;
          transition: color 0.2s;
        }
        .footer-link-btn:hover {
          color: var(--accent-secondary);
        }
        .brand-col p {
          margin-top: 16px;
          line-height: 1.6;
        }
        .social-links {
          display: flex;
          gap: 16px;
          margin-top: 20px;
          font-size: 1.2rem;
        }
        .social-links span {
          cursor: pointer;
          transition: color 0.2s;
        }
        .social-links span:hover {
          color: var(--accent-secondary);
        }
        .newsletter-col p {
          margin-bottom: 16px;
        }
        .newsletter-input-row {
          display: flex;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid var(--border-glass);
        }
        .newsletter-input-row input {
          background: var(--bg-app);
          border: none;
          padding: 12px 16px;
          color: var(--text-main);
          outline: none;
          flex: 1;
        }
        .btn-newsletter-send {
          background: var(--accent-primary);
          border: none;
          color: #ffffff;
          padding: 0 16px;
          cursor: pointer;
        }
        .btn-newsletter-send:hover {
          background: var(--accent-secondary);
        }
        .footer-bottom {
          border-top: 1px solid var(--border-glass);
          padding-top: 30px;
          font-size: 0.8rem;
        }
        .text-center {
          text-align: center;
        }
      `}</style>
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppContent />
        </Router>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
