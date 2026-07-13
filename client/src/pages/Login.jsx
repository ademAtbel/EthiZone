// Ultimate Master Marketplace - Login Page (Optimized for High Scale)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Direct user based on role
      if (data.user.role === 'super_admin') {
        navigate('/super-admin');
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
    <div className="login-page container flex-center">
      <div className="glass-panel auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Login to access your dashboard and listings</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register Here</Link>
        </p>
      </div>

      <style>{`
        .login-page {
          min-height: calc(100vh - 80px);
          padding: 40px 20px;
        }
        .auth-card {
          width: 100%;
          max-width: 440px;
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

export default Login;
