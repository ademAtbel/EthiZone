import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const RatingForm = ({ targetId, onRatingSubmitted }) => {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rating: 5,
    comment: ''
  });
  
  // Verification states
  const [verificationMethod, setVerificationMethod] = useState('sms');
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [verificationMsg, setVerificationMsg] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Triggers mock SMS or Email verification sending code in sandbox
  const handleSendVerificationCode = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in Name, Email and Phone details first to trigger verification.');
      return;
    }
    setError('');

    // Generate random 4 digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setVerificationCode(code);
    setCodeSent(true);

    if (verificationMethod === 'sms') {
      setVerificationMsg(`💬 Sandbox SMS sent to ${formData.phone}. Enter Code: ${code}`);
    } else {
      setVerificationMsg(`✉️ Sandbox Email sent to ${formData.email}. Enter Code: ${code}`);
    }
  };

  // Check code input
  const handleVerifyCode = () => {
    if (enteredCode === verificationCode && verificationCode !== '') {
      setVerified(true);
      setError('');
      setVerificationMsg('✅ Verified successfully! Form unlocked.');
    } else {
      setError('Invalid verification code. Please check and try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verified) {
      setError('Please complete the SMS/Email verification step first.');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          targetId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          rating: formData.rating,
          comment: formData.comment
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit reference');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        rating: 5,
        comment: ''
      });
      setCodeSent(false);
      setVerified(false);
      setVerificationCode('');
      setEnteredCode('');
      setVerificationMsg('');

      if (onRatingSubmitted) {
        onRatingSubmitted(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-panel rating-form-container">
      <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '8px' }}>
        {t('write_reference')}
      </h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '16px' }}>
        {t('prevent_fake')}
      </p>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Thank you! Your verified reference rating has been submitted.</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">{t('your_name')}</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Jane Doe" 
            className="form-control" 
            disabled={verified}
            required 
          />
        </div>

        <div className="form-row" style={{ display: 'flex', gap: '12px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="email">{t('email_address')}</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="jane@example.com" 
              className="form-control" 
              disabled={verified}
              required 
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="phone">{t('phone_number')}</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="555-0199" 
              className="form-control" 
              disabled={verified}
              required 
            />
          </div>
        </div>

        {/* Verification trigger segment */}
        {!verified && (
          <div className="verification-segment" style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', marginBottom: '20px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>{t('select_channel')}</label>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  checked={verificationMethod === 'sms'} 
                  onChange={() => setVerificationMethod('sms')} 
                />
                {t('sms_ver')}
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  checked={verificationMethod === 'email'} 
                  onChange={() => setVerificationMethod('email')} 
                />
                {t('email_ver')}
              </label>
            </div>

            <button 
              type="button" 
              onClick={handleSendVerificationCode}
              className="btn btn-secondary w-full"
              style={{ fontSize: '0.85rem', padding: '8px 16px' }}
            >
              {t('get_code')}
            </button>

            {codeSent && (
              <div style={{ marginTop: '14px' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', fontWeight: 600, marginBottom: '8px' }}>
                  {verificationMsg}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    placeholder={t('enter_code')}
                    className="form-control"
                    style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                  />
                  <button 
                    type="button" 
                    onClick={handleVerifyCode} 
                    className="btn btn-success"
                    style={{ fontSize: '0.85rem', padding: '0 16px' }}
                  >
                    {t('verify_btn')}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {verified && (
          <div style={{ marginBottom: '16px', color: 'var(--accent-success)', fontSize: '0.85rem', fontWeight: 600 }}>
            {verificationMsg}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="rating">{t('rating_score_label')}</label>
          <div className="stars-input" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`star-btn ${formData.rating >= star ? 'filled' : ''}`}
                onClick={() => setFormData({ ...formData, rating: star })}
                style={{ background: 'none', border: 'none', fontSize: '1.6rem', color: formData.rating >= star ? 'var(--accent-warning)' : 'rgba(255,255,255,0.2)', cursor: 'pointer', padding: 0 }}
              >
                ★
              </button>
            ))}
            <span className="rating-desc" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>
              ({formData.rating} of 5 Stars)
            </span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="comment">{t('your_reference_details')}</label>
          <textarea 
            id="comment" 
            name="comment" 
            value={formData.comment} 
            onChange={handleChange} 
            placeholder={t('describe_experience')}
            className="form-control" 
            rows="3" 
            required 
          />
        </div>

        <button 
          type="submit" 
          disabled={submitting || !verified} 
          className="btn btn-primary w-full"
          style={{ cursor: (!verified || submitting) ? 'not-allowed' : 'pointer' }}
        >
          {submitting ? 'Submitting...' : t('post_reference')}
        </button>
      </form>

      <style>{`
        .rating-form-container {
          padding: 20px;
          border-radius: var(--radius-md);
        }
        .w-full {
          width: 100%;
        }
        .alert {
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          margin-bottom: 12px;
          font-weight: 500;
        }
        .alert-danger {
          background: rgba(239, 68, 68, 0.12);
          color: #fca5a5;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .alert-success {
          background: rgba(16, 185, 129, 0.12);
          color: #a7f3d0;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
      `}</style>
    </div>
  );
};

export default RatingForm;
