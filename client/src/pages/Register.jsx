import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { validateEmail, validatePhone } from '../utils/validation';
import { User, Wrench, Store, ShoppingBag, Briefcase, Building2, Home as HomeIcon, Car, Tag, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AnimatedLogo from '../components/AnimatedLogo';

const getSubcategories = (cat) => {
  const subcategoriesMap = {
    'Entertainment': ['Concerts', 'Festivals', 'Standup Comedy', 'Movies', 'Parties'],
    'Arts & Culture': ['Art Exhibitions', 'Theatre', 'Museum Tours', 'Book Readings'],
    'Religious': ['Services', 'Spiritual Gatherings', 'Lectures'],
    'Social': ['Meetups', 'Community Gatherings', 'Networking', 'Dinners'],
    'Educational': ['Workshops', 'Lectures', 'Conferences', 'Seminars'],
    'Sports': ['Tournaments', 'Matches', 'Fitness Classes', 'Races'],
    'Charity': ['Fundraisers', 'Volunteer Drives', 'Auctions']
  };
  return subcategoriesMap[cat] || [];
};

const Register = () => {
  const { t } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Component State Hooks (Must all be declared unconditionally at top level)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    role: 'individual',
    businessType: 'store',
    category: '',
    subCategory: '',
    storeName: '',
    description: '',
    address: ''
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Post-Registration Verification States
  const [pendingVerification, setPendingVerification] = useState(location.state?.pendingVerification || false);
  const [verificationEmail, setVerificationEmail] = useState(location.state?.email || '');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState('');
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Resend Countdown Timer
  useEffect(() => {
    let timerInterval;
    if (resendTimer > 0) {
      timerInterval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [resendTimer]);

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setVerificationError('');
    setVerificationSuccess('');
    setVerificationLoading(true);

    try {
      const response = await fetch('/api/auth/verify-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verificationEmail, code: verificationCode })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed.');
      }

      setVerificationSuccess('Account verified successfully! Redirecting to your dashboard...');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('authChange'));

      setTimeout(() => {
        const u = data.user;
        if (u?.role === 'super_admin') {
          navigate('/super-admin');
        } else if (u?.role === 'business') {
          const storeSlug = u.storeSlug || (u.storeName ? u.storeName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') : 'seller');
          navigate(`/store/${storeSlug}/dashboard`);
        } else {
          navigate('/dashboard');
        }
      }, 800);
    } catch (err) {
      setVerificationError(err.message);
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleResendCode = async () => {
    setVerificationError('');
    setVerificationSuccess('');
    setVerificationLoading(true);

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verificationEmail })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend confirmation code.');
      }

      setVerificationSuccess(data.message || 'New confirmation code sent to your email.');
      setResendTimer(90);
    } catch (err) {
      setVerificationError(err.message);
    } finally {
      setVerificationLoading(false);
    }
  };

  // Load platform categories dynamically based on Business Type
  useEffect(() => {
    if (formData.role !== 'business') return;

    fetch(`/api/categories?type=${formData.businessType}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
          setFormData(prev => ({ ...prev, category: data[0].name }));
        } else {
          const fallbacks = {
            store: [
              { name: 'Boutique' }, { name: 'Pharmacy' }, { name: 'Liquor Store' },
              { name: 'Grocery Store' }, { name: 'Electronics Shop' }, { name: 'Bookstore' },
              { name: 'Furniture' }, { name: 'Hardware Store' }, { name: 'Cafe & Restaurant' },
              { name: 'Jewelry & Accessories' }, { name: 'Gift & Toy Shop' }, { name: 'Spare Parts Dealer' }, { name: 'Other' }
            ],
            service: [
              { name: 'Law Office' }, { name: 'Tax Office' }, { name: 'Clinic' },
              { name: 'Consulting Firm' }, { name: 'Cleaning Agency' }, { name: 'Beauty Salon' }
            ],
            organization: [
              { name: 'Tech Corporation' }, { name: 'Construction Company' },
              { name: 'Healthcare Group' }, { name: 'Educational Institution' }, { name: 'Non-Profit Org' }, { name: 'Other' }
            ],
            real_estate: [
              { name: 'Residential Homes' }, { name: 'Rental Apartments' },
              { name: 'Commercial Real Estate' }, { name: 'Land & Lots' }
            ],
            automotive: [
              { name: 'Used Car Dealership' }, { name: 'Car Rental Service' },
              { name: 'Auto Repair Workshop' }, { name: 'Spare Parts Dealer' }
            ],
            event: [
              { name: 'Entertainment' }, { name: 'Arts & Culture' }, { name: 'Religious' },
              { name: 'Social' }, { name: 'Educational' }, { name: 'Sports' }, { name: 'Charity' }
            ]
          };
          const typeFallbacks = fallbacks[formData.businessType] || [];
          setCategories(typeFallbacks);
          if (typeFallbacks.length > 0) {
            setFormData(prev => ({ ...prev, category: typeFallbacks[0].name }));
          }
        }
      })
      .catch(() => {
        const fallbacks = {
          store: [
            { name: 'Boutique' }, { name: 'Pharmacy' }, { name: 'Liquor Store' },
            { name: 'Grocery Store' }, { name: 'Electronics Shop' }, { name: 'Bookstore' },
            { name: 'Furniture' }, { name: 'Hardware Store' }, { name: 'Cafe & Restaurant' },
            { name: 'Jewelry & Accessories' }, { name: 'Gift & Toy Shop' }, { name: 'Spare Parts Dealer' }, { name: 'Other' }
          ],
          service: [
            { name: 'Law Office' }, { name: 'Tax Office' }, { name: 'Clinic' },
            { name: 'Consulting Firm' }, { name: 'Cleaning Agency' }, { name: 'Beauty Salon' }
          ],
          organization: [
            { name: 'Tech Corporation' }, { name: 'Construction Company' },
            { name: 'Healthcare Group' }, { name: 'Educational Institution' }, { name: 'Non-Profit Org' }, { name: 'Other' }
          ],
          real_estate: [
            { name: 'Residential Homes' }, { name: 'Rental Apartments' },
            { name: 'Commercial Real Estate' }, { name: 'Land & Lots' }
          ],
          automotive: [
            { name: 'Used Car Dealership' }, { name: 'Car Rental Service' },
            { name: 'Auto Repair Workshop' }, { name: 'Spare Parts Dealer' }
          ],
          event: [
            { name: 'Entertainment' }, { name: 'Arts & Culture' }, { name: 'Religious' },
            { name: 'Social' }, { name: 'Educational' }, { name: 'Sports' }, { name: 'Charity' }
          ]
        };
        const typeFallbacks = fallbacks[formData.businessType] || [];
        setCategories(typeFallbacks);
        if (typeFallbacks.length > 0) {
          setFormData(prev => ({ ...prev, category: typeFallbacks[0].name }));
        }
      });
  }, [formData.role, formData.businessType]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { username, email, phone, password, role, category, subCategory } = formData;

    if (!username || !email || !phone || !password || !role) {
      setError('Required field missing.');
      setLoading(false);
      return;
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      setError(emailCheck.reason);
      setLoading(false);
      return;
    }

    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.valid) {
      setError(phoneCheck.reason);
      setLoading(false);
      return;
    }

    if (role === 'business') {
      if (!category || !formData.businessType) {
        setError('Please select Business Type and Category.');
        setLoading(false);
        return;
      }
      if (formData.businessType === 'event' && !subCategory) {
        setError('Please select an Event Sub-Category.');
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      let data;
      const text = await response.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch (err) {
        data = { message: 'Unable to connect to backend server.' };
      }

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      if (data.requiresVerification) {
        setVerificationEmail(data.email || email);
        setPendingVerification(true);
        setResendTimer(90);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      const u = data.user;
      if (u?.role === 'super_admin') {
        navigate('/super-admin');
      } else if (u?.role === 'business') {
        const storeSlug = u.storeSlug || (u.storeName ? u.storeName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') : 'seller');
        navigate(`/store/${storeSlug}/dashboard`);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page container flex-center" style={{ position: 'relative' }}>
      {/* 6-Digit Email & Phone Confirmation Modal Overlay */}
      {pendingVerification && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <div className="glass-panel auth-card" style={{ maxWidth: '480px', width: '100%', padding: '2.5rem 2rem', background: '#ffffff', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <AnimatedLogo size="lg" />
            </div>
            
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0f172a', textAlign: 'center' }}>
              ✉️ Confirm Your Account
            </h2>
            <p className="auth-subtitle" style={{ fontSize: '0.95rem', color: '#475569', marginBottom: '1.5rem', textAlign: 'center' }}>
              We sent a 6-digit confirmation code to <strong style={{ color: '#0d5c3a' }}>{verificationEmail}</strong>. Enter your code below to activate your account.
            </p>

            {verificationError && (
              <div className="alert alert-danger mb-3 p-3 rounded-3" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#dc2626', border: '1px solid rgba(239, 68, 68, 0.3)', fontSize: '0.9rem' }}>
                ⚠️ {verificationError}
              </div>
            )}

            {verificationSuccess && (
              <div className="alert alert-success mb-3 p-3 rounded-3" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#15803d', border: '1px solid rgba(34, 197, 94, 0.3)', fontSize: '0.9rem' }}>
                ✅ {verificationSuccess}
              </div>
            )}

            <form onSubmit={handleVerifySubmit}>
              <div className="form-group mb-4">
                <input
                  type="text"
                  maxLength="6"
                  className="form-control text-center fw-bold"
                  style={{
                    fontSize: '2.2rem',
                    letterSpacing: '12px',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '2px solid #0d5c3a',
                    background: '#f8fafc',
                    color: '#0f172a'
                  }}
                  placeholder="123456"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  required
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-3 rounded-3 fw-bold mb-3"
                style={{ background: 'linear-gradient(135deg, #0d5c3a 0%, #15803d 100%)', border: 'none', fontSize: '1rem', color: '#ffffff' }}
                disabled={verificationLoading || verificationCode.length !== 6}
              >
                {verificationLoading ? 'Verifying...' : 'Verify & Go to Dashboard'}
              </button>
            </form>

            <div className="d-flex justify-content-between align-items-center mt-3 pt-3" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
              <button
                type="button"
                className="btn btn-link text-decoration-none p-0"
                style={{ color: resendTimer > 0 ? '#94a3b8' : '#0d5c3a', fontSize: '0.88rem', fontWeight: 600 }}
                onClick={handleResendCode}
                disabled={resendTimer > 0 || verificationLoading}
              >
                {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Code'}
              </button>

              <button
                type="button"
                className="btn btn-link text-decoration-none p-0"
                style={{ color: '#64748b', fontSize: '0.88rem' }}
                onClick={() => setPendingVerification(false)}
              >
                Cancel / Edit Registration
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-panel auth-card">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <AnimatedLogo size="lg" />
        </div>
        <h2>{t('reg_title')}</h2>
        <p className="auth-subtitle">{t('reg_subtitle')}</p>

        {error && (
          <div className="alert alert-danger mb-3 p-3 rounded-3" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="fw-semibold mb-1" style={{ fontSize: '0.9rem' }}>{t('reg_fullname')}</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control py-2 px-3"
              placeholder="John Doe"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('reg_email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">{t('reg_phone')}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              placeholder="+1 555-555-5555"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('reg_password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '500', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('reg_account_type')}</label>
            <div className="row g-2 mt-1">
              <div className="col-12 col-sm-6 col-md-3">
                <button
                  type="button"
                  className={`role-select-btn w-100 h-100 ${formData.role === 'individual' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, role: 'individual' }))}
                  style={{
                    background: formData.role === 'individual' ? 'rgba(197, 168, 90, 0.08)' : '#ffffff',
                    border: formData.role === 'individual' ? '2px solid #c5a85a' : '1px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '12px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                >
                  <User size={24} style={{ color: formData.role === 'individual' ? '#c5a85a' : '#000000' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: formData.role === 'individual' ? '#c5a85a' : '#000000', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>{t('reg_individual')}</span>
                    <span style={{ fontSize: '0.62rem', color: formData.role === 'individual' ? '#c5a85a' : '#6b7280', marginTop: '2px', textAlign: 'center', lineHeight: '1.2' }}>{t('reg_sell_personal')}</span>
                  </div>
                </button>
              </div>

              <div className="col-12 col-sm-6 col-md-3">
                <button
                  type="button"
                  className={`role-select-btn w-100 h-100 ${formData.role === 'handyman' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, role: 'handyman' }))}
                  style={{
                    background: formData.role === 'handyman' ? 'rgba(197, 168, 90, 0.08)' : '#ffffff',
                    border: formData.role === 'handyman' ? '2px solid #c5a85a' : '1px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '12px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                >
                  <Wrench size={24} style={{ color: formData.role === 'handyman' ? '#c5a85a' : '#000000' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: formData.role === 'handyman' ? '#c5a85a' : '#000000', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>{t('reg_handyman')}</span>
                    <span style={{ fontSize: '0.62rem', color: formData.role === 'handyman' ? '#c5a85a' : '#6b7280', marginTop: '2px', textAlign: 'center', lineHeight: '1.2' }}>{t('reg_list_skills')}</span>
                  </div>
                </button>
              </div>

              <div className="col-12 col-sm-6 col-md-3">
                <button
                  type="button"
                  className={`role-select-btn w-100 h-100 ${formData.role === 'business' && formData.businessType !== 'event' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, role: 'business', businessType: 'store' }))}
                  style={{
                    background: formData.role === 'business' && formData.businessType !== 'event' ? 'rgba(197, 168, 90, 0.08)' : '#ffffff',
                    border: formData.role === 'business' && formData.businessType !== 'event' ? '2px solid #c5a85a' : '1px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '12px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                >
                  <Store size={24} style={{ color: formData.role === 'business' && formData.businessType !== 'event' ? '#c5a85a' : '#000000' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: formData.role === 'business' && formData.businessType !== 'event' ? '#c5a85a' : '#000000', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>{t('reg_business')}</span>
                    <span style={{ fontSize: '0.62rem', color: formData.role === 'business' && formData.businessType !== 'event' ? '#c5a85a' : '#6b7280', marginTop: '2px', textAlign: 'center', lineHeight: '1.2' }}>{t('reg_stores_agencies')}</span>
                  </div>
                </button>
              </div>

              <div className="col-12 col-sm-6 col-md-3">
                <button
                  type="button"
                  className={`role-select-btn w-100 h-100 ${formData.role === 'business' && formData.businessType === 'event' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, role: 'business', businessType: 'event' }))}
                  style={{
                    background: formData.role === 'business' && formData.businessType === 'event' ? 'rgba(197, 168, 90, 0.08)' : '#ffffff',
                    border: formData.role === 'business' && formData.businessType === 'event' ? '2px solid #c5a85a' : '1px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '12px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                >
                  <Calendar size={24} style={{ color: formData.role === 'business' && formData.businessType === 'event' ? '#c5a85a' : '#000000' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: formData.role === 'business' && formData.businessType === 'event' ? '#c5a85a' : '#000000', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>{t('reg_event') || 'Events'}</span>
                    <span style={{ fontSize: '0.62rem', color: formData.role === 'business' && formData.businessType === 'event' ? '#c5a85a' : '#6b7280', marginTop: '2px', textAlign: 'center', lineHeight: '1.2' }}>{t('reg_posts_events') || 'Host Events'}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Conditional store registration fields */}
          {formData.role === 'business' && (
            <div className="conditional-fields" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formData.businessType !== 'event' && (
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '500', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('reg_business_type')}</label>
                  <div className="row g-2 mt-1">
                    <div className="col-12 col-sm-6 col-md-4">
                      <button
                        type="button"
                        className={`biz-type-btn w-100 h-100 ${formData.businessType === 'store' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, businessType: 'store' }))}
                        style={{
                          background: formData.businessType === 'store' ? 'rgba(197, 168, 90, 0.08)' : '#ffffff',
                          border: formData.businessType === 'store' ? '2px solid #c5a85a' : '1px solid #e5e7eb',
                          borderRadius: '10px',
                          padding: '10px 4px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          outline: 'none'
                        }}
                      >
                        <ShoppingBag size={20} style={{ color: formData.businessType === 'store' ? '#c5a85a' : '#000000' }} />
                        <span style={{ fontSize: '0.78rem', fontWeight: '700', color: formData.businessType === 'store' ? '#c5a85a' : '#000000', fontFamily: 'var(--font-heading)' }}>{t('reg_store')}</span>
                        <span style={{ fontSize: '0.6rem', color: formData.businessType === 'store' ? '#c5a85a' : '#6b7280', textAlign: 'center' }}>{t('reg_sells_products')}</span>
                      </button>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4">
                      <button
                        type="button"
                        className={`biz-type-btn w-100 h-100 ${formData.businessType === 'service' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, businessType: 'service' }))}
                        style={{
                          background: formData.businessType === 'service' ? 'rgba(197, 168, 90, 0.08)' : '#ffffff',
                          border: formData.businessType === 'service' ? '2px solid #c5a85a' : '1px solid #e5e7eb',
                          borderRadius: '10px',
                          padding: '10px 4px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          outline: 'none'
                        }}
                      >
                        <Briefcase size={20} style={{ color: formData.businessType === 'service' ? '#c5a85a' : '#000000' }} />
                        <span style={{ fontSize: '0.78rem', fontWeight: '700', color: formData.businessType === 'service' ? '#c5a85a' : '#000000', fontFamily: 'var(--font-heading)' }}>{t('reg_service')}</span>
                        <span style={{ fontSize: '0.6rem', color: formData.businessType === 'service' ? '#c5a85a' : '#6b7280', textAlign: 'center' }}>{t('reg_offers_services')}</span>
                      </button>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4">
                      <button
                        type="button"
                        className={`biz-type-btn w-100 h-100 ${formData.businessType === 'organization' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, businessType: 'organization' }))}
                        style={{
                          background: formData.businessType === 'organization' ? 'rgba(197, 168, 90, 0.08)' : '#ffffff',
                          border: formData.businessType === 'organization' ? '2px solid #c5a85a' : '1px solid #e5e7eb',
                          borderRadius: '10px',
                          padding: '10px 4px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          outline: 'none'
                        }}
                      >
                        <Building2 size={20} style={{ color: formData.businessType === 'organization' ? '#c5a85a' : '#000000' }} />
                        <span style={{ fontSize: '0.78rem', fontWeight: '700', color: formData.businessType === 'organization' ? '#c5a85a' : '#000000', fontFamily: 'var(--font-heading)' }}>{t('reg_organization')}</span>
                        <span style={{ fontSize: '0.6rem', color: formData.businessType === 'organization' ? '#c5a85a' : '#6b7280', textAlign: 'center' }}>{t('reg_hiring_jobs')}</span>
                      </button>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4">
                      <button
                        type="button"
                        className={`biz-type-btn w-100 h-100 ${formData.businessType === 'real_estate' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, businessType: 'real_estate' }))}
                        style={{
                          background: formData.businessType === 'real_estate' ? 'rgba(197, 168, 90, 0.08)' : '#ffffff',
                          border: formData.businessType === 'real_estate' ? '2px solid #c5a85a' : '1px solid #e5e7eb',
                          borderRadius: '10px',
                          padding: '10px 4px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          outline: 'none'
                        }}
                      >
                        <HomeIcon size={20} style={{ color: formData.businessType === 'real_estate' ? '#c5a85a' : '#000000' }} />
                        <span style={{ fontSize: '0.78rem', fontWeight: '700', color: formData.businessType === 'real_estate' ? '#c5a85a' : '#000000', fontFamily: 'var(--font-heading)' }}>{t('reg_real_estate')}</span>
                        <span style={{ fontSize: '0.6rem', color: formData.businessType === 'real_estate' ? '#c5a85a' : '#6b7280', textAlign: 'center' }}>{t('reg_housing_listings')}</span>
                      </button>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4">
                      <button
                        type="button"
                        className={`biz-type-btn w-100 h-100 ${formData.businessType === 'automotive' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, businessType: 'automotive' }))}
                        style={{
                          background: formData.businessType === 'automotive' ? 'rgba(197, 168, 90, 0.08)' : '#ffffff',
                          border: formData.businessType === 'automotive' ? '2px solid #c5a85a' : '1px solid #e5e7eb',
                          borderRadius: '10px',
                          padding: '10px 4px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          outline: 'none'
                        }}
                      >
                        <Car size={20} style={{ color: formData.businessType === 'automotive' ? '#c5a85a' : '#000000' }} />
                        <span style={{ fontSize: '0.78rem', fontWeight: '700', color: formData.businessType === 'automotive' ? '#c5a85a' : '#000000', fontFamily: 'var(--font-heading)' }}>{t('reg_automotive')}</span>
                        <span style={{ fontSize: '0.6rem', color: formData.businessType === 'automotive' ? '#c5a85a' : '#6b7280', textAlign: 'center' }}>{t('reg_car_listings')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '500', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('reg_category_type')}</label>
                <div className="row g-2 mt-1">
                  {categories.map((cat, idx) => {
                    const isActive = formData.category === cat.name;
                    const cleanKey = cat.name.toLowerCase()
                      .replace(/\s+/g, '_')
                      .replace(/&/g, 'slots')
                      .replace(/-/g, '_');

                    return (
                      <div className="col-12 col-sm-6 col-md-4" key={idx}>
                        <button
                          type="button"
                          className={`cat-type-btn w-100 h-100 ${isActive ? 'active' : ''}`}
                          onClick={() => {
                            if (formData.businessType === 'event') {
                              const subs = getSubcategories(cat.name);
                              setFormData(prev => ({ ...prev, category: cat.name, subCategory: subs[0] || '' }));
                            } else {
                              setFormData(prev => ({ ...prev, category: cat.name }));
                            }
                          }}
                          style={{
                            background: isActive ? 'rgba(197, 168, 90, 0.08)' : '#ffffff',
                            border: isActive ? '2px solid #c5a85a' : '1px solid #e5e7eb',
                            borderRadius: '10px',
                            padding: '10px 4px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            outline: 'none'
                          }}
                        >
                          <Tag size={18} style={{ color: isActive ? '#c5a85a' : '#000000' }} />
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: isActive ? '#c5a85a' : '#000000', textAlign: 'center', fontFamily: 'var(--font-heading)' }}>{t(cleanKey) || cat.name}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {formData.businessType === 'event' && formData.category && (
                <div className="form-group mt-3">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '500', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Event Sub-Category</label>
                  <div className="row g-2 mt-1">
                    {getSubcategories(formData.category).map((sub, idx) => {
                      const isActive = formData.subCategory === sub;
                      return (
                        <div className="col-12 col-sm-6 col-md-4" key={idx}>
                          <button
                            type="button"
                            className={`cat-type-btn w-100 h-100 ${isActive ? 'active' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, subCategory: sub }))}
                            style={{
                              background: isActive ? 'rgba(197, 168, 90, 0.08)' : '#ffffff',
                              border: isActive ? '2px solid #c5a85a' : '1px solid #e5e7eb',
                              borderRadius: '10px',
                              padding: '10px 4px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              outline: 'none'
                            }}
                          >
                            <Tag size={16} style={{ color: isActive ? '#c5a85a' : '#000000' }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: isActive ? '#c5a85a' : '#000000', textAlign: 'center', fontFamily: 'var(--font-heading)' }}>{sub}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? t('reg_creating') : t('reg_btn')}
          </button>
        </form>

        <p className="auth-footer">
          {t('reg_already_have')} <Link to="/login">{t('reg_login_here')}</Link>
        </p>
      </div>

      <style>{`
        .register-page {
          min-height: calc(100vh - 80px);
          padding: 120px 20px 60px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .auth-card {
          width: 100%;
          max-width: 500px;
          padding: 40px;
        }
        .auth-card h2 {
          font-size: 1.8rem;
          margin-bottom: 8px;
          text-align: center;
        }
        .auth-subtitle {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 30px;
          text-align: center;
        }
        .conditional-fields {
          background: #f9fafb;
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-md);
          padding: 20px 16px 1px 16px;
          margin-bottom: 20px;
        }
        .auth-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .auth-footer a {
          color: var(--accent-primary);
          font-weight: 600;
        }
        .auth-footer a:hover {
          text-decoration: underline;
        }
        .w-full {
          width: 100%;
        }
        .alert-danger {
          background: rgba(239, 68, 68, 0.15);
          color: #fca5a5;
          border: 1px solid rgba(239, 68, 68, 0.25);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  );
};

export default Register;

// Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas maxime maiores amet, eius blanditiis molestias sunt vitae excepturi saepe deleniti, optio repudiandae, temporibus totam voluptate cum voluptatibus numquam doloremque possimus!
