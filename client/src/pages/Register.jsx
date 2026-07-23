// Ultimate Master Marketplace - Register Page (Optimized for High Scale)
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail, validatePhone } from '../utils/validation';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    role: 'individual',
    businessType: 'store',
    category: '',
    storeName: '',
    description: '',
    address: ''
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
          // Fallback static categories by type if database is empty
          const fallbacks = {
            store: [
              { name: 'Boutique' }, { name: 'Pharmacy' }, { name: 'Liquor Store' },
              { name: 'Grocery Store' }, { name: 'Electronics Shop' }, { name: 'Bookstore' }
            ],
            service: [
              { name: 'Law Office' }, { name: 'Tax Office' }, { name: 'Dental Clinic' },
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
            { name: 'Grocery Store' }, { name: 'Electronics Shop' }, { name: 'Bookstore' }
          ],
          service: [
            { name: 'Law Office' }, { name: 'Tax Office' }, { name: 'Dental Clinic' },
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

    const { username, email, phone, password, role, category } = formData;

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

    if (role === 'business' && (!category || !formData.businessType)) {
      setError('Please select Business Type and Category.');
      setLoading(false);
      return;
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
        data = { message: 'Unable to connect to the backend server. Please make sure the backend server is running on port 5001.' };
      }

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page container flex-center">
      <div className="glass-panel auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join the direct-connect local marketplace</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Full Name</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="John Doe"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
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
            <label htmlFor="phone">Phone Number (For direct customer calls)</label>
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
            <label htmlFor="password">Password</label>
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

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '500', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '4px' }}>
              <button
                type="button"
                className={`role-select-btn ${formData.role === 'individual' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, role: 'individual' }))}
                style={{
                  background: formData.role === 'individual' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: formData.role === 'individual' ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '14px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              >
                <span style={{ fontSize: '1.6rem' }}>👤</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: formData.role === 'individual' ? '#3b82f6' : '#ffffff' }}>Individual</span>
                  <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '2px', textAlign: 'center', lineHeight: '1.2' }}>Sell personal items</span>
                </div>
              </button>

              <button
                type="button"
                className={`role-select-btn ${formData.role === 'handyman' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, role: 'handyman' }))}
                style={{
                  background: formData.role === 'handyman' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: formData.role === 'handyman' ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '14px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              >
                <span style={{ fontSize: '1.6rem' }}>🛠️</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: formData.role === 'handyman' ? '#3b82f6' : '#ffffff' }}>Handyman</span>
                  <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '2px', textAlign: 'center', lineHeight: '1.2' }}>List skills</span>
                </div>
              </button>

              <button
                type="button"
                className={`role-select-btn ${formData.role === 'business' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, role: 'business' }))}
                style={{
                  background: formData.role === 'business' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: formData.role === 'business' ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '14px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              >
                <span style={{ fontSize: '1.6rem' }}>🏢</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: formData.role === 'business' ? '#3b82f6' : '#ffffff' }}>Business</span>
                  <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '2px', textAlign: 'center', lineHeight: '1.2' }}>Stores & agencies</span>
                </div>
              </button>
            </div>
          </div>

          {/* Conditional store registration fields */}
          {formData.role === 'business' && (
            <div className="conditional-fields" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '500', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Business Type</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '4px' }}>
                  <button
                    type="button"
                    className={`biz-type-btn ${formData.businessType === 'store' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, businessType: 'store' }))}
                    style={{
                      background: formData.businessType === 'store' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                      border: formData.businessType === 'store' ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '12px 6px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                  >
                    <span style={{ fontSize: '1.4rem' }}>🛒</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: formData.businessType === 'store' ? '#3b82f6' : '#ffffff' }}>Store</span>
                    <span style={{ fontSize: '0.62rem', color: '#94a3b8', textAlign: 'center' }}>Sells Products</span>
                  </button>

                  <button
                    type="button"
                    className={`biz-type-btn ${formData.businessType === 'service' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, businessType: 'service' }))}
                    style={{
                      background: formData.businessType === 'service' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                      border: formData.businessType === 'service' ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '12px 6px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                  >
                    <span style={{ fontSize: '1.4rem' }}>💼</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: formData.businessType === 'service' ? '#3b82f6' : '#ffffff' }}>Service</span>
                    <span style={{ fontSize: '0.62rem', color: '#94a3b8', textAlign: 'center' }}>Offers Services</span>
                  </button>

                  <button
                    type="button"
                    className={`biz-type-btn ${formData.businessType === 'organization' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, businessType: 'organization' }))}
                    style={{
                      background: formData.businessType === 'organization' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                      border: formData.businessType === 'organization' ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '12px 6px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                  >
                    <span style={{ fontSize: '1.4rem' }}>🏢</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: formData.businessType === 'organization' ? '#3b82f6' : '#ffffff' }}>Organization</span>
                    <span style={{ fontSize: '0.62rem', color: '#94a3b8', textAlign: 'center' }}>Hiring & Jobs</span>
                  </button>

                  <button
                    type="button"
                    className={`biz-type-btn ${formData.businessType === 'real_estate' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, businessType: 'real_estate' }))}
                    style={{
                      background: formData.businessType === 'real_estate' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                      border: formData.businessType === 'real_estate' ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '12px 6px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                  >
                    <span style={{ fontSize: '1.4rem' }}>🏠</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: formData.businessType === 'real_estate' ? '#3b82f6' : '#ffffff' }}>Real Estate</span>
                    <span style={{ fontSize: '0.62rem', color: '#94a3b8', textAlign: 'center' }}>Housing Listings</span>
                  </button>

                  <button
                    type="button"
                    className={`biz-type-btn ${formData.businessType === 'automotive' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, businessType: 'automotive' }))}
                    style={{
                      background: formData.businessType === 'automotive' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                      border: formData.businessType === 'automotive' ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '12px 6px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                  >
                    <span style={{ fontSize: '1.4rem' }}>🚗</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: formData.businessType === 'automotive' ? '#3b82f6' : '#ffffff' }}>Automotive</span>
                    <span style={{ fontSize: '0.62rem', color: '#94a3b8', textAlign: 'center' }}>Car Listings</span>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '500', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Business Category Type</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '4px' }}>
                  {categories.map((cat, idx) => {
                    const isActive = formData.category === cat.name;
                    const categoryEmojiMap = {
                      'Boutique': '👗', 'Pharmacy': '💊', 'Liquor Store': '🍷', 'Grocery Store': '🍎', 'Electronics Shop': '💻', 'Bookstore': '📚',
                      'Law Office': '⚖️', 'Tax Office': '📊', 'Dental Clinic': '🦷', 'Consulting Firm': '🤝', 'Cleaning Agency': '🧹', 'Beauty Salon': '💅',
                      'Tech Corporation': '🚀', 'Construction Company': '🏗️', 'Healthcare Group': '🏥', 'Educational Institution': '🏫', 'Non-Profit Org': '🌱', 'Other': '❓',
                      'Residential Homes': '🏡', 'Rental Apartments': '🏢', 'Commercial Real Estate': '🏬', 'Land & Lots': '🌄',
                      'Used Car Dealership': '🚗', 'Car Rental Service': '🔑', 'Auto Repair Workshop': '🔧', 'Spare Parts Dealer': '⚙️'
                    };
                    const emoji = categoryEmojiMap[cat.name] || '💼';

                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`cat-type-btn ${isActive ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, category: cat.name }))}
                        style={{
                          background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                          border: isActive ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          padding: '12px 6px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          outline: 'none'
                        }}
                      >
                        <span style={{ fontSize: '1.4rem' }}>{emoji}</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: isActive ? '#3b82f6' : '#ffffff', textAlign: 'center' }}>{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register Now'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>

      <style>{`
        .register-page {
          min-height: calc(100vh - 80px);
          padding: 40px 20px;
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
          background: rgba(255, 255, 255, 0.02);
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
