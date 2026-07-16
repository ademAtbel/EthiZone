import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { contactService } from '../services/contactService';

const StaticPage = () => {
  const { t } = useApp();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    topic: 'Account support',
    message: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      await contactService.sendContactInquiry({
        ...formData,
        attachmentUrl: file ? file.name : null
      });
      setSuccess('Your inquiry has been submitted successfully! We will get back to you soon.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        topic: 'Account support',
        message: ''
      });
      setFile(null);
    } catch (err) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const path = location.pathname;
  const isAbout = path === '/about' || path === '/about-us';
  const isContact = path === '/contact';
  const isPrivacy = path === '/privacy' || path === '/privacy-policy';
  const isTerms = path === '/terms' || path === '/terms-of-service';

  // Return formatted about us content
  const renderAboutUs = () => (
    <div>
      <div className="mb-4">
        <p className="fs-5" style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          {t('about_us_content')}
        </p>
      </div>

      <div className="row g-4 my-4">
        <div className="col-md-6">
          <div className="p-4 h-100 border rounded-3" style={{ backgroundColor: 'rgba(var(--text-main-rgb, 0), 0.02)', borderColor: 'rgba(var(--text-main-rgb, 0), 0.08)' }}>
            <h3 className="fw-bold h5 mb-3" style={{ color: 'var(--text-main)' }}>Our Mission</h3>
            <p className="mb-0 text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              To create a trusted, accessible, and modern marketplace where individuals and businesses can sell, buy, rent, offer services, hire, and find opportunities with greater convenience.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-4 h-100 border rounded-3" style={{ backgroundColor: 'rgba(var(--text-main-rgb, 0), 0.02)', borderColor: 'rgba(var(--text-main-rgb, 0), 0.08)' }}>
            <h3 className="fw-bold h5 mb-3" style={{ color: 'var(--text-main)' }}>Our Vision</h3>
            <p className="mb-0 text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              To become a leading digital marketplace that supports local commerce, entrepreneurship, service delivery, employment, and trusted connections.
            </p>
          </div>
        </div>
      </div>

      <div className="my-5">
        <h3 className="fw-bold h5 mb-3" style={{ color: 'var(--text-main)' }}>What EthiZone Provides</h3>
        <div className="row g-3" style={{ color: 'var(--text-secondary)' }}>
          <div className="col-sm-6">✓ Marketplace visibility & seller profiles</div>
          <div className="col-sm-6">✓ Customer-facing store pages & QR links</div>
          <div className="col-sm-6">✓ Dynamic listing forms and filter rows</div>
          <div className="col-sm-6">✓ Category-based listings & dashboards</div>
          <div className="col-sm-6">✓ Services, cars, houses, and jobs portals</div>
          <div className="col-sm-6">✓ Platform moderation & account controls</div>
        </div>
      </div>

      <div className="p-4 border rounded-3 mt-4" style={{ backgroundColor: 'rgba(255, 193, 7, 0.05)', borderColor: 'rgba(255, 193, 7, 0.3)' }}>
        <h3 className="fw-bold h5 mb-2 text-warning">What EthiZone Does Not Do</h3>
        <p className="mb-0 text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
          EthiZone does not automatically guarantee the truth, quality, safety, legality, ownership, price, delivery, payment, or performance of every listing or transaction. EthiZone provides the platform, while users remain responsible for their own decisions and agreements.
        </p>
      </div>
    </div>
  );

  // Return contact page with interactive form
  const renderContact = () => (
    <div className="row g-5">
      <div className="col-lg-5">
        <p className="fs-5 mb-4" style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          {t('contact_tab_content')}
        </p>

        <div className="p-4 border rounded-3 mb-4" style={{ backgroundColor: 'rgba(var(--text-main-rgb, 0), 0.02)', borderColor: 'rgba(var(--text-main-rgb, 0), 0.08)' }}>
          <h3 className="fw-bold h6 mb-3 text-uppercase" style={{ color: 'var(--text-main)', letterSpacing: '0.05em' }}>EthiZone Support Lines</h3>
          <p className="mb-2 text-secondary">📧 Support Email: <a href="mailto:support@ethizone.com" className="fw-semibold text-decoration-none" style={{ color: 'var(--accent-primary)' }}>support@ethizone.com</a></p>
          <p className="mb-2 text-secondary">📧 Business: <a href="mailto:partners@ethizone.com" className="fw-semibold text-decoration-none" style={{ color: 'var(--accent-primary)' }}>partners@ethizone.com</a></p>
          <p className="mb-0 text-secondary">📧 Trust & Safety: <a href="mailto:safety@ethizone.com" className="fw-semibold text-decoration-none" style={{ color: 'var(--accent-primary)' }}>safety@ethizone.com</a></p>
        </div>

        <div className="p-4 border rounded-3 mb-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', borderColor: 'rgba(var(--text-main-rgb, 0), 0.08)', color: 'var(--text-secondary)' }}>
          <h4 className="fw-bold h6 text-warning mb-2">⚠️ Transaction Security Notice</h4>
          <p className="mb-0 text-secondary" style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>
            EthiZone is a marketplace search directory, not a transaction handler or middleman. Users are responsible for checking quality, verifying documents, meeting in safe locations, and ensuring payment security. Do not share codes or sensitive data.
          </p>
        </div>
      </div>

      <div className="col-lg-7">
        <div className="p-4 p-md-5 border rounded-3 shadow-sm" style={{ backgroundColor: 'rgba(var(--text-main-rgb, 0), 0.01)', borderColor: 'rgba(var(--text-main-rgb, 0), 0.08)' }}>
          <h3 className="fw-bold h5 mb-3" style={{ color: 'var(--text-main)' }}>Send Support Ticket</h3>

          {success && (
            <div className="alert alert-success d-flex align-items-center gap-2 mb-4" role="alert">
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 mb-4" role="alert">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="needs-validation">
            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary" style={{ fontSize: '0.85rem' }}>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="form-control"
                placeholder="Enter your name"
                style={{ backgroundColor: 'transparent', color: 'var(--text-main)', borderColor: 'rgba(var(--text-main-rgb, 0), 0.15)' }}
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '0.85rem' }}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                  placeholder="name@example.com"
                  style={{ backgroundColor: 'transparent', color: 'var(--text-main)', borderColor: 'rgba(var(--text-main-rgb, 0), 0.15)' }}
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '0.85rem' }}>Phone (Optional)</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="e.g. +251..."
                  style={{ backgroundColor: 'transparent', color: 'var(--text-main)', borderColor: 'rgba(var(--text-main-rgb, 0), 0.15)' }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary" style={{ fontSize: '0.85rem' }}>Topic *</label>
              <select
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                className="form-select"
                style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-main)', borderColor: 'rgba(var(--text-main-rgb, 0), 0.15)' }}
              >
                <option value="Account support">Account support</option>
                <option value="Listing issue">Listing issue</option>
                <option value="Payment or transaction concern">Payment or transaction concern</option>
                <option value="Report suspicious activity">Report suspicious activity</option>
                <option value="Business registration help">Business registration help</option>
                <option value="Privacy request">Privacy request</option>
                <option value="Terms question">Terms question</option>
                <option value="Technical problem">Technical problem</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary" style={{ fontSize: '0.85rem' }}>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="form-control"
                placeholder="Describe your issue or query..."
                style={{ backgroundColor: 'transparent', color: 'var(--text-main)', borderColor: 'rgba(var(--text-main-rgb, 0), 0.15)' }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-secondary" style={{ fontSize: '0.85rem' }}>Attachment (Optional)</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="form-control"
                style={{ backgroundColor: 'transparent', color: 'var(--text-main)', borderColor: 'rgba(var(--text-main-rgb, 0), 0.15)' }}
              />
              {file && <p className="text-success mt-1 small">Selected: {file.name}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-100 py-2 fw-semibold text-white"
              style={{ backgroundColor: 'var(--accent-primary)', border: 'none' }}
            >
              {loading ? 'Submitting...' : 'Submit Support Ticket'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // Return privacy policy layout
  const renderPrivacy = () => (
    <div>
      <div className="mb-4">
        <p className="fs-5" style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          {t('privacy_policy_content')}
        </p>
      </div>

      <div className="p-4 border rounded-3 mb-4" style={{ backgroundColor: 'rgba(var(--text-main-rgb, 0), 0.01)', borderColor: 'rgba(var(--text-main-rgb, 0), 0.08)' }}>
        <h3 className="fw-bold h5 mb-3" style={{ color: 'var(--text-main)' }}>Platform Disclaimer</h3>
        <p className="text-secondary" style={{ fontSize: '0.92rem', lineHeight: '1.6' }}>
          EthiZone connects buyers, sellers, service providers, property owners, vehicle sellers, employers, job seekers, and customers. EthiZone is not the seller, buyer, landlord, tenant, employer, employee, agent, broker, delivery company, bank, payment guarantor, or legal representative in user transactions.
        </p>
      </div>

      <div className="my-4 space-y-4" style={{ color: 'var(--text-secondary)' }}>
        <h4 className="fw-bold text-main mt-4 h6">1. Information We Collect</h4>
        <p className="small text-secondary">
          We may collect information such as name, email address, phone number, business or seller profile details, public profile content, listing descriptions, images, location data, language preference, and device information.
        </p>

        <h4 className="fw-bold text-main mt-4 h6">2. Public Listings & Information</h4>
        <p className="small text-secondary">
          When you publish a store or listing, your display name, business name, description, public phone line, and location information are visible to the public. Users are responsible for deciding what details to make public.
        </p>

        <h4 className="fw-bold text-main mt-4 h6">3. Data Security & Sharing</h4>
        <p className="small text-secondary">
          We use reasonable technical and organizational measures to safeguard user data. We do not sell personal details to third parties. Limited data may be shared with providers helping to host the platform or as required under applicable law.
        </p>
      </div>

      <div className="border-t border-gray-150 pt-4 mt-5">
        <p className="text-secondary small">
          For questions, reach out to: <a href="mailto:privacy@ethizone.com" className="text-decoration-none" style={{ color: 'var(--accent-primary)' }}>privacy@ethizone.com</a>
        </p>
      </div>
    </div>
  );

  // Return terms of service layout
  const renderTerms = () => (
    <div>
      <div className="mb-4">
        <p className="fs-5" style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          {t('terms_of_service_content')}
        </p>
      </div>

      <div className="my-4 space-y-4" style={{ color: 'var(--text-secondary)' }}>
        <h4 className="fw-bold text-main mt-4 h6">1. User Responsibility for Transactions</h4>
        <p className="small text-secondary">
          Sellers are responsible for accurate listings, pricing, warranties, ownership rights, quality, and delivery. Buyers and customers are responsible for verifying products, documents, quality, safety, and price before payment.
        </p>

        <h4 className="fw-bold text-main mt-4 h6">2. No Automatic Guarantee</h4>
        <p className="small text-secondary">
          To the maximum extent permitted by applicable law, EthiZone does not guarantee that every listing is accurate, that every user is trustworthy, that every product is genuine, that delivery will occur, or that payments are guaranteed.
        </p>

        <h4 className="fw-bold text-main mt-4 h6">3. Age and Capacity</h4>
        <p className="small text-secondary">
          Users must be old enough to legally enter binding contracts and transactions in their location. Users not legally permitted to enter into contracts must not use the platform for such purposes.
        </p>

        <h4 className="fw-bold text-main mt-4 h6">4. Limitation of Liability</h4>
        <p className="small text-secondary">
          To the maximum extent permitted by applicable law, EthiZone is not liable for indirect, incidental, special, consequential, or punitive damages, or transaction losses arising from user interactions. This does not limit liability that cannot legally be limited.
        </p>
      </div>

      <div className="border-t border-gray-150 pt-4 mt-5">
        <p className="text-secondary small">
          For legal inquiries, contact: <a href="mailto:legal@ethizone.com" className="text-decoration-none" style={{ color: 'var(--accent-primary)' }}>legal@ethizone.com</a>
        </p>
      </div>
    </div>
  );

  let pageTitle = 'Page';
  if (isAbout) pageTitle = t('about_us') || 'About Us';
  if (isContact) pageTitle = t('contact_tab') || 'Contact Us';
  if (isPrivacy) pageTitle = t('privacy_policy') || 'Privacy Policy';
  if (isTerms) pageTitle = t('terms_of_service') || 'Terms of Service';

  return (
    <div className="container py-5" style={{ minHeight: '60vh' }}>
      <div className="card shadow-sm border-0 p-4 p-md-5" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-main)', borderRadius: '12px' }}>
        <h1 className="fw-bold mb-4" style={{ color: 'var(--text-main)' }}>{pageTitle}</h1>
        
        {isAbout && renderAboutUs()}
        {isContact && renderContact()}
        {isPrivacy && renderPrivacy()}
        {isTerms && renderTerms()}

        {/* Global Legal Disclaimer as requested by user */}
        <div className="alert mt-5" style={{ backgroundColor: 'rgba(255, 0, 0, 0.05)', border: '1px solid var(--accent-danger)', color: 'var(--text-main)', borderRadius: '8px' }}>
          <h4 className="alert-heading fw-bold d-flex align-items-center gap-2" style={{ color: 'var(--accent-danger)' }}>
            {t('legal_disclaimer_title') || '⚠️ Important Legal Disclaimer'}
          </h4>
          <p className="mb-0 mt-2 fw-medium" style={{ fontSize: '1.02rem', opacity: 0.9 }}>
            {t('legal_disclaimer') || "For any money transaction, EthiZone is NOT responsible. The seller is solely responsible for their products and services."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
