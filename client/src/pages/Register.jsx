// Ultimate Master Marketplace - Register Page (Optimized for High Scale)
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

      const data = await response.json();
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
            <label htmlFor="role">Account Type</label>
            <select
              id="role"
              name="role"
              className="form-control"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="individual">Individual (Sell personal items)</option>
              <option value="handyman">Handyman (List professional skills)</option>
              <option value="business">Business (Store, Service, Organization, etc.)</option>
            </select>
          </div>

          {/* Conditional store registration fields */}
          {formData.role === 'business' && (
            <div className="conditional-fields">
              <div className="form-group">
                <label htmlFor="businessType">Business Type</label>
                <select
                  id="businessType"
                  name="businessType"
                  className="form-control"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                >
                  <option value="store">Store (Sells Products)</option>
                  <option value="service">Service (Offers Professional Services)</option>
                  <option value="organization">Organization (Hiring Only / Job Openings)</option>
                  <option value="real_estate">Real Estate (Housing Listings)</option>
                  <option value="automotive">Automotive (Car Listings)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="category">Business Category Type</label>
                <select
                  id="category"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
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
