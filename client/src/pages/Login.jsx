// Ultimate Master Marketplace - Login Page (Optimized for High Scale)
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Login = () => {
  const { t } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // OTP Login Flow States
  const [loginMode, setLoginMode] = useState('password'); // 'password' or 'otp'
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [timer, setTimer] = useState(0);

  // Countdown timer effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

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

  const handleRequestOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    if (!email) {
      setError('Please enter your email address first.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send verification code.');
      }

      setOtpSent(true);
      setTimer(60); // Code expires in 60 seconds
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!otpCode || otpCode.length !== 6 || isNaN(otpCode)) {
      setError('Please enter a valid 6-digit code.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login-with-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code: otpCode })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Invalid or expired code.');
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
        <h2>{loginMode === 'password' ? t('login_title_pw') : t('login_title_otp')}</h2>
        <p className="auth-subtitle">
          {loginMode === 'password' 
            ? t('login_subtitle_pw') 
            : t('login_subtitle_otp')}
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        {loginMode === 'password' ? (
          // STANDARD PASSWORD LOGIN FORM
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{t('login_email')}</label>
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
              <label htmlFor="password">{t('login_password')}</label>
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

            <div className="form-helper-row text-right">
              <button
                type="button"
                className="link-btn text-accent"
                onClick={() => {
                  setLoginMode('otp');
                  setOtpSent(false);
                  setOtpCode('');
                  setError('');
                }}
              >
                {t('login_forgot')}
              </button>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? t('login_btn_loading') : t('login_btn_pw')}
            </button>
          </form>
        ) : (
          // OTP LOGIN FORM
          <form onSubmit={otpSent ? handleOtpLogin : handleRequestOtp}>
            <div className="form-group">
              <label htmlFor="otp-email">{t('login_email')}</label>
              <input
                type="email"
                id="otp-email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={otpSent}
                required
              />
            </div>

            {otpSent && (
              <div className="form-group otp-group">
                <label htmlFor="otp-code">{t('login_otp_label')}</label>
                <input
                  type="text"
                  id="otp-code"
                  className="form-control text-center code-input"
                  placeholder="0 0 0 0 0 0"
                  maxLength="6"
                  pattern="[0-9]{6}"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                  required
                  autoFocus
                />
                
                <div className="otp-timer-row">
                  {timer > 0 ? (
                    <span className="timer-text warning">
                      {t('login_expires_in')} <strong>{timer}</strong> {t('login_seconds')}
                    </span>
                  ) : (
                    <div className="timer-expired">
                      <span className="error-text">{t('login_expired')} </span>
                      <button
                        type="button"
                        className="link-btn text-accent font-semibold"
                        onClick={handleRequestOtp}
                        disabled={loading}
                      >
                        {t('login_resend')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading 
                ? t('login_processing') 
                : otpSent 
                  ? t('login_verify_signin') 
                  : t('login_send_otp')}
            </button>

            <div className="form-helper-row text-center mt-4">
              <button
                type="button"
                className="link-btn text-secondary"
                onClick={() => {
                  setLoginMode('password');
                  setError('');
                  setOtpSent(false);
                }}
              >
                {t('login_back_standard')}
              </button>
            </div>
          </form>
        )}

        <p className="auth-footer">
          {t('login_no_account')} <Link to="/register">{t('login_register_here')}</Link>
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
          border: 1px solid var(--border-glass);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(8px);
          border-radius: var(--radius-md, 12px);
          transition: all 0.3s ease;
        }
        .auth-card h2 {
          font-size: 1.8rem;
          margin-bottom: 8px;
          text-align: center;
          background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .auth-subtitle {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 30px;
          text-align: center;
          line-height: 1.4;
        }
        .form-helper-row {
          margin-bottom: 20px;
          font-size: 0.85rem;
        }
        .text-right {
          text-align: right;
        }
        .text-center {
          text-align: center;
        }
        .mt-4 {
          margin-top: 1.25rem;
        }
        .link-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          outline: none;
        }
        .link-btn.text-accent {
          color: var(--accent-primary, #6366f1);
        }
        .link-btn.text-accent:hover {
          text-decoration: underline;
          opacity: 0.9;
        }
        .link-btn.text-secondary {
          color: var(--text-secondary, #94a3b8);
        }
        .link-btn.text-secondary:hover {
          color: #ffffff;
        }
        .auth-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .auth-footer a {
          color: var(--accent-primary, #6366f1);
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
          border-radius: var(--radius-sm, 6px);
          font-size: 0.9rem;
          margin-bottom: 20px;
          text-align: center;
        }
        .code-input {
          font-size: 1.5rem !important;
          letter-spacing: 0.5rem;
          font-weight: 700;
          text-align: center;
        }
        .otp-timer-row {
          margin-top: 8px;
          font-size: 0.85rem;
          text-align: center;
        }
        .timer-text.warning {
          color: #fbd38d;
        }
        .error-text {
          color: #fc8181;
        }
        .font-semibold {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Login;
