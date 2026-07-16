import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
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
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      
      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/store/:storeName/dashboard" element={<Dashboard />} />
          <Route path="/store/:storeName" element={<Storefront />} />
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

      <footer className="landing-footer">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <img src="/logo.png" alt="Ethizone Logo" style={{ height: '40px', mixBlendMode: 'screen', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))' }} />
            </div>
            <p>{t('footer_brand_desc')}</p>
            <div className="social-links">
              <span onClick={handleUnderConstruction} style={{ cursor: 'pointer' }}><Globe size={20} /></span>
              <span onClick={handleUnderConstruction} style={{ cursor: 'pointer' }}><Mail size={20} /></span>
              <span onClick={handleUnderConstruction} style={{ cursor: 'pointer' }}><Phone size={20} /></span>
            </div>
          </div>
          <div className="footer-col">
            <h5>{t('marketplace')}</h5>
            <ul>
              <li><Link to="/?type=store_product" className="footer-link-btn">{t('stores')}</Link></li>
              <li><Link to="/?type=car" className="footer-link-btn">{t('automotive')}</Link></li>
              <li><Link to="/?type=house" className="footer-link-btn">{t('real_estate')}</Link></li>
              <li><Link to="/?type=job_opening" className="footer-link-btn">{t('organizations')}</Link></li>
              <li><Link to="/?type=handyman_skill" className="footer-link-btn">{t('handymen')}</Link></li>
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

      <Chatbot />

      <style>{`
        .app-main-content {
          min-height: calc(100vh - 400px);
        }
        
        /* Premium Global Footer styles */
        .landing-footer {
          background: #0f172a;
          color: #94a3b8;
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
          }
        }
        .footer-col h5 {
          color: #ffffff;
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
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-col ul li a:hover {
          color: #ffffff;
        }
        .footer-link-btn {
          background: none;
          border: none;
          color: #94a3b8;
          padding: 0;
          cursor: pointer;
          font-size: 0.9rem;
          text-align: left;
          text-decoration: none;
          display: inline-block;
          transition: color 0.2s;
        }
        .footer-link-btn:hover {
          color: #ffffff;
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
          color: #ffffff;
        }
        .newsletter-col p {
          margin-bottom: 16px;
        }
        .newsletter-input-row {
          display: flex;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid #334155;
        }
        .newsletter-input-row input {
          background: #1e293b;
          border: none;
          padding: 12px 16px;
          color: #ffffff;
          outline: none;
          flex: 1;
        }
        .btn-newsletter-send {
          background: #0d5c3a;
          border: none;
          color: #ffffff;
          padding: 0 16px;
          cursor: pointer;
        }
        .btn-newsletter-send:hover {
          background: #09442a;
        }
        .footer-bottom {
          border-top: 1px solid #1e293b;
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
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
