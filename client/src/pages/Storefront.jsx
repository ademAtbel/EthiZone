// Ultimate Master Marketplace - Storefront Page (Optimized for High Scale)
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StoreNavbar from '../components/StoreNavbar';
import QrModal from '../components/QrModal';
import ListingCard from '../components/ListingCard';
import CategoryTemplate from '../components/CategoryTemplate';
import { useApp } from '../context/AppContext';

const Storefront = () => {
  const { storeName } = useParams();
  const [store, setStore] = useState(null);
  const [listings, setListings] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qrOpen, setQrOpen] = useState(false);
  const [catalogQuery, setCatalogQuery] = useState('');
  const [catalogSort, setCatalogSort] = useState('newest');
  const [catalogStatusFilter, setCatalogStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('home');
  const { t } = useApp();
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [submissionSuccessLogs, setSubmissionSuccessLogs] = useState(null);
  const [inquiryForm, setInquiryForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    pharmacyFileName: '',
    pharmacyNotes: '',
    lawDate: '',
    lawTime: '',
    lawTopic: '',
    taxYear: '2025',
    taxFileName: '',
    taxNotes: '',
    boutiqueItem: '',
    boutiqueSize: '',
    boutiqueColor: '',
    boutiqueNotes: '',
    liquorItems: '',
    liquorPickupTime: '',
    liquorNotes: '',
    generalMessage: ''
  });

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setInquiryForm(prev => ({
        ...prev,
        [fieldName]: file.name
      }));
    }
  };

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    setSubmittingInquiry(true);

    const category = store.category.toLowerCase().trim().replace(/_/g, ' ');
    let businessType = 'general';
    let details = {};

    if (category.includes('pharmacy')) {
      businessType = 'pharmacy';
      details = {
        fileName: inquiryForm.pharmacyFileName || 'Doctor_Prescription.pdf',
        notes: inquiryForm.pharmacyNotes
      };
    } else if (category.includes('law') || category.includes('legal')) {
      businessType = 'law';
      details = {
        date: inquiryForm.lawDate,
        time: inquiryForm.lawTime,
        topic: inquiryForm.lawTopic
      };
    } else if (category.includes('tax') || category.includes('accounting')) {
      businessType = 'tax';
      details = {
        taxYear: inquiryForm.taxYear,
        fileName: inquiryForm.taxFileName || 'W2_Documents.pdf',
        notes: inquiryForm.taxNotes
      };
    } else if (category.includes('boutique') || category.includes('clothing')) {
      businessType = 'boutique';
      details = {
        itemTitle: inquiryForm.boutiqueItem,
        size: inquiryForm.boutiqueSize,
        color: inquiryForm.boutiqueColor,
        notes: inquiryForm.boutiqueNotes
      };
    } else if (category.includes('liquor') || category.includes('alcohol')) {
      businessType = 'liquor';
      details = {
        orderNotes: inquiryForm.liquorItems,
        pickupTime: inquiryForm.liquorPickupTime,
        notes: inquiryForm.liquorNotes
      };
    } else {
      details = {
        message: inquiryForm.generalMessage
      };
    }

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          businessId: store._id,
          customerName: inquiryForm.customerName,
          customerEmail: inquiryForm.customerEmail,
          customerPhone: inquiryForm.customerPhone,
          businessType,
          details
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSubmissionSuccessLogs(data.simulatedLogs || []);
      setInquiryModalOpen(false);

      setInquiryForm({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        pharmacyFileName: '',
        pharmacyNotes: '',
        lawDate: '',
        lawTime: '',
        lawTopic: '',
        taxYear: '2025',
        taxFileName: '',
        taxNotes: '',
        boutiqueItem: '',
        boutiqueSize: '',
        boutiqueColor: '',
        boutiqueNotes: '',
        liquorItems: '',
        liquorPickupTime: '',
        liquorNotes: '',
        generalMessage: ''
      });

    } catch (err) {
      alert(err.message || 'Failed to submit inquiry.');
    } finally {
      setSubmittingInquiry(false);
    }
  };

  const filteredListings = listings
    .filter(item => {
      const query = catalogQuery.toLowerCase();
      const matchesSearch = !catalogQuery || 
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.category && item.category.toLowerCase().includes(query));

      const matchesStatus = catalogStatusFilter === 'all' || 
        (catalogStatusFilter === 'active' && item.status === 'active') ||
        (catalogStatusFilter === 'inactive' && item.status !== 'active');

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (catalogSort === 'low-to-high') return (a.price || 0) - (b.price || 0);
      if (catalogSort === 'high-to-low') return (b.price || 0) - (a.price || 0);
      if (catalogSort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      return new Date(b.createdAt) - new Date(a.createdAt); // newest first
    });

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isOwner = store && (currentUser.id === store._id || currentUser.role === 'super_admin');

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      // Fetch store profile by its name slug
      const res = await fetch(`/api/auth/store-profile/${storeName}`);
      const storeData = await res.json();
      if (!res.ok) throw new Error(storeData.message || 'Store not found');
      
      setStore(storeData);

      // Fetch listings for this store owner using their resolved ID (up to 100)
      const listRes = await fetch(`/api/listings?ownerId=${storeData._id}&limit=100`);
      const listData = await listRes.json();
      setListings(listData);

      // Fetch references/reviews for this store owner using their resolved ID (up to 100)
      const ratingsRes = await fetch(`/api/ratings/target/${storeData._id}?limit=100`);
      const ratingsData = await ratingsRes.json();
      setRatings(ratingsData);

    } catch (err) {
      console.error('Error fetching store info', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, [storeName]);

  const handleRatingAdded = (newRating) => {
    setRatings([newRating, ...ratings]);
  };

  if (loading) {
    return (
      <div className="container storefront-page flex-center" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="container storefront-page">
        <div className="alert alert-danger">{error || 'Storefront does not exist.'}</div>
      </div>
    );
  }

  return (
    <div className="storefront-wrapper">
      
      {/* Store designated Navbar with custom links and tab trigger handlers */}
      <StoreNavbar 
        storeName={store.storeName || store.username}
        category={store.category}
        customLinks={store.customNavbarLinks || []}
        isOwner={isOwner}
        onShowQr={() => setQrOpen(true)}
        storeId={store._id}
        role={store.role}
        businessType={store.businessType}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="container storefront-page">
        
        {/* TAB 1: HOME PAGE SECTION */}
        {activeTab === 'home' && (
          <>
            <header 
              className="storefront-hero glass-panel"
              style={store.storeImage ? { 
                backgroundImage: `linear-gradient(to right, rgba(9, 13, 22, 0.96) 35%, rgba(9, 13, 22, 0.45) 100%), url(${store.storeImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                position: 'relative'
              } : {}}
            >
              <div className="store-hero-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '14px', flexWrap: 'wrap' }}>
                  {store.storeLogo && (
                    <img 
                      src={store.storeLogo} 
                      alt={`${store.storeName || store.username} Logo`} 
                      style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-primary)', boxShadow: '0 0 20px rgba(99, 102, 241, 0.35)' }} 
                    />
                  )}
                  <h1 style={{ margin: 0, fontSize: '2.2rem' }}>{store.storeName || store.username}</h1>
                </div>
                <p className="store-address">📍 {store.address || 'Local Directory Services'}</p>
                <p className="store-desc">{store.description || t('middleman_free')}</p>
              </div>
              <div className="store-hero-contact" style={{ zIndex: 2 }}>
                <span className="contact-label">{t('direct_line')}</span>
                <span className="contact-number">{store.phone}</span>
                <div className="contact-cta-row">
                  <a href={`tel:${store.phone}`} className="btn btn-success">{t('call')}</a>
                  <a href={`sms:${store.phone}?body=Hi! I am interested in inquiring about your store services.`} className="btn btn-primary">{t('sms')}</a>
                </div>
              </div>
            </header>

            {/* Dynamic Category Interactive Template layout */}
            {store.category && (
              <div className="category-template-container">
                <CategoryTemplate 
                  category={store.category} 
                  ownerName={store.storeName || store.username} 
                  ownerPhone={store.phone} 
                  onOpenModal={() => setInquiryModalOpen(true)}
                />
              </div>
            )}

            {/* Products & Services Catalog Preview */}
            <div className="storefront-featured-catalog" style={{ marginTop: '40px' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', borderLeft: '3px solid var(--accent-primary)', paddingLeft: '10px' }}>
                {t('featured_products')}
              </h3>
              {listings.length === 0 ? (
                <div className="glass-panel empty-storefront-card flex-center">
                  <p>{t('no_posts_featured')}</p>
                </div>
              ) : (
                <div className="row g-4">
                  {listings.slice(0, 4).map(item => (
                    <div key={item._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                      <ListingCard key={item._id} listing={item} showStoreLink={false} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* TAB 2: CATALOG / SHOP ITEMS SECTION */}
        {activeTab === 'catalog' && (
          <div className="storefront-grid">
            <div className="storefront-main" style={{ width: '100%' }}>
              <div className="catalog-header-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0 }}>{t('catalog_active_listings')} ({filteredListings.length})</h3>
                
                {/* Catalog Multi-Option Filters */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', flex: '1', justifyContent: 'flex-end' }}>
                  <input 
                    type="text" 
                    placeholder={t('search_in_catalog')}
                    className="form-control" 
                    style={{ maxWidth: '240px', margin: 0 }}
                    value={catalogQuery}
                    onChange={(e) => setCatalogQuery(e.target.value)}
                  />
                  <select 
                    className="form-control" 
                    value={catalogStatusFilter} 
                    onChange={(e) => setCatalogStatusFilter(e.target.value)}
                    style={{ maxWidth: '150px', margin: 0 }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Available</option>
                    <option value="inactive">Sold Out / Busy</option>
                  </select>
                  <select 
                    className="form-control" 
                    value={catalogSort} 
                    onChange={(e) => setCatalogSort(e.target.value)}
                    style={{ maxWidth: '170px', margin: 0 }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                  </select>
                </div>
              </div>
              
              {listings.length === 0 ? (
                <div className="glass-panel empty-storefront-card flex-center">
                  <p>{t('no_posts_featured')}</p>
                </div>
              ) : filteredListings.length === 0 ? (
                <div className="glass-panel empty-storefront-card flex-center">
                  <p>{t('no_match_catalog')}</p>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredListings.map(item => (
                    <div key={item._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                      <ListingCard key={item._id} listing={item} showStoreLink={false} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ABOUT PANEL */}
        {activeTab === 'about' && (
          <div className="glass-panel about-panel-card" style={{ padding: '40px', marginBottom: '30px' }}>
            <h2 style={{ marginBottom: '18px', borderLeft: '3px solid var(--accent-primary)', paddingLeft: '12px' }}>{t('about_business')}</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '24px' }}>
              {store.description || 'Welcome to our business storefront. We are dedicated to providing excellent service and quality items directly to our local customers.'}
            </p>
            <hr style={{ borderColor: 'var(--border-glass)', margin: '24px 0' }} />
            <div className="about-details-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>📍 {t('location')}</span>
                <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{store.address || 'Local Directory Area'}</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>🏷️ {t('classification')}</span>
                <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{store.category || 'General Services'}</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>📆 {t('registered_since')}</span>
                <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{new Date(store.createdAt).toLocaleDateString()}</strong>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT PANEL */}
        {activeTab === 'contact' && (
          <div className="glass-panel contact-panel-card" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto 30px auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '12px' }}>{t('contact_directly')}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>
              {t('middleman_free')}
            </p>
            
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', padding: '24px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
              <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>{t('phone_line')}</span>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-secondary)', display: 'block', marginBottom: '20px' }}>{store.phone}</span>
              
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
                <a href={`tel:${store.phone}`} className="btn btn-success" style={{ padding: '12px 28px', fontSize: '1rem' }}>{t('call_now')}</a>
                <a href={`sms:${store.phone}?body=Hi! I saw your store on Ultimate Master and want to inquire.`} className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '1rem' }}>{t('send_sms')}</a>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* QR Code printing dialog */}
      {qrOpen && (
        <QrModal 
          isOpen={qrOpen}
          onClose={() => setQrOpen(false)}
          storeName={store.storeName || store.username}
          category={store.category}
          storeId={store._id}
        />
      )}

      {/* CUSTOMER INQUIRY MODAL */}
      {inquiryModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050 }}>
          <div className="glass-panel modal-content" style={{ maxWidth: '600px', width: '95%', padding: '30px', position: 'relative', border: '1px solid var(--border-glass)', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setInquiryModalOpen(false)} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            <h3 style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px', marginBottom: '20px' }}>📩 Contact & Request Form</h3>
            
            <form onSubmit={handleSubmitInquiry} className="template-form">
              {/* Contact Info Header */}
              <h5 style={{ color: 'var(--accent-primary)', marginBottom: '14px', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Contact Details</h5>
              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label>Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={inquiryForm.customerName}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, customerName: e.target.value })}
                  placeholder="e.g. John Doe"
                  required 
                />
              </div>
              <div className="metadata-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={inquiryForm.customerEmail}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, customerEmail: e.target.value })}
                    placeholder="john@example.com"
                    required 
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    value={inquiryForm.customerPhone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, customerPhone: e.target.value })}
                    placeholder="e.g. +1 234 567 890"
                    required 
                  />
                </div>
              </div>

              {/* Category-Specific Form Section */}
              <h5 style={{ color: 'var(--accent-secondary)', marginBottom: '14px', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>Request Details</h5>

              {/* 1. Pharmacy details */}
              {store.category && store.category.toLowerCase().includes('pharmacy') && (
                <>
                  <div className="form-group">
                    <label>Upload Doctor Prescription (Image or PDF)</label>
                    <input 
                      type="file" 
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileChange(e, 'pharmacyFileName')}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Additional Notes / Symptoms</label>
                    <textarea 
                      className="form-control" 
                      placeholder="List any medication names, dosage requests, or allergies..."
                      value={inquiryForm.pharmacyNotes}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, pharmacyNotes: e.target.value })}
                      rows="3"
                    />
                  </div>
                </>
              )}

              {/* 2. Law details */}
              {store.category && (store.category.toLowerCase().includes('law') || store.category.toLowerCase().includes('legal')) && (
                <>
                  <div className="metadata-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Preferred Date</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        value={inquiryForm.lawDate}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, lawDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Preferred Time</label>
                      <input 
                        type="time" 
                        className="form-control" 
                        value={inquiryForm.lawTime}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, lawTime: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Case Details / Consultation Topic</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Contract dispute, landlord issue, etc."
                      value={inquiryForm.lawTopic}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, lawTopic: e.target.value })}
                      required
                    />
                  </div>
                </>
              )}

              {/* 3. Tax details */}
              {store.category && (store.category.toLowerCase().includes('tax') || store.category.toLowerCase().includes('accounting')) && (
                <>
                  <div className="metadata-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Tax Filing Year</label>
                      <select 
                        className="form-control" 
                        value={inquiryForm.taxYear}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, taxYear: e.target.value })}
                      >
                        <option value="2025">Tax Year 2025</option>
                        <option value="2024">Tax Year 2024</option>
                        <option value="2023">Tax Year 2023</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Upload Documents (W2s, Receipts)</label>
                      <input 
                        type="file" 
                        accept="image/*,application/pdf"
                        onChange={(e) => handleFileChange(e, 'taxFileName')}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Additional Notes</label>
                    <textarea 
                      className="form-control" 
                      placeholder="List your filing status, dependents, or specific questions..."
                      value={inquiryForm.taxNotes}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, taxNotes: e.target.value })}
                      rows="3"
                    />
                  </div>
                </>
              )}

              {/* 4. Boutique details */}
              {store.category && (store.category.toLowerCase().includes('boutique') || store.category.toLowerCase().includes('clothing')) && (
                <>
                  <div className="form-group">
                    <label>Product Item Name / Description</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Casual Polo Wear, Summer Dress"
                      value={inquiryForm.boutiqueItem}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, boutiqueItem: e.target.value })}
                      required
                    />
                  </div>
                  <div className="metadata-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Preferred Size</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. M, L, XL, 32"
                        value={inquiryForm.boutiqueSize}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, boutiqueSize: e.target.value })}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Preferred Color</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Blue, Black"
                        value={inquiryForm.boutiqueColor}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, boutiqueColor: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Inquiry Details</label>
                    <textarea 
                      className="form-control" 
                      placeholder="Ask about availability, custom fit, or shipping..."
                      value={inquiryForm.boutiqueNotes}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, boutiqueNotes: e.target.value })}
                      rows="3"
                    />
                  </div>
                </>
              )}

              {/* 5. Liquor details */}
              {store.category && (store.category.toLowerCase().includes('liquor') || store.category.toLowerCase().includes('alcohol')) && (
                <>
                  <div className="form-group">
                    <label>Pre-Order Items List (Names and Quantities)</label>
                    <textarea 
                      className="form-control" 
                      placeholder="e.g. 2x Craft Beers, 1x Single Malt Whiskey"
                      value={inquiryForm.liquorItems}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, liquorItems: e.target.value })}
                      rows="3"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Estimated Pickup Time</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Today at 5:00 PM, Saturday afternoon"
                      value={inquiryForm.liquorPickupTime}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, liquorPickupTime: e.target.value })}
                      required
                    />
                  </div>
                </>
              )}

              {/* 6. General / Fallback details */}
              {store.category && 
               !store.category.toLowerCase().includes('pharmacy') && 
               !store.category.toLowerCase().includes('law') && 
               !store.category.toLowerCase().includes('legal') && 
               !store.category.toLowerCase().includes('tax') && 
               !store.category.toLowerCase().includes('accounting') && 
               !store.category.toLowerCase().includes('boutique') && 
               !store.category.toLowerCase().includes('clothing') && 
               !store.category.toLowerCase().includes('liquor') && 
               !store.category.toLowerCase().includes('alcohol') && (
                <div className="form-group">
                  <label>Message details</label>
                  <textarea 
                    className="form-control" 
                    placeholder="Enter details of your request or booking details..."
                    value={inquiryForm.generalMessage}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, generalMessage: e.target.value })}
                    rows="4"
                    required
                  />
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary flex-grow-1" disabled={submittingInquiry}>
                  {submittingInquiry ? 'Submitting request...' : '🚀 Submit Request & Alert'}
                </button>
                <button type="button" onClick={() => setInquiryModalOpen(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SIMULATED SMS & EMAIL NOTIFICATION REPORT MODAL */}
      {submissionSuccessLogs && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100 }}>
          <div className="glass-panel modal-content" style={{ maxWidth: '650px', width: '95%', padding: '30px', position: 'relative', border: '2px solid var(--accent-primary)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px', marginBottom: '20px' }}>
              ✔️ Inquiry Submitted & Alerts Sent!
            </h3>
            
            <div className="alert alert-success" style={{ marginBottom: '20px', fontSize: '0.95rem' }}>
              Your inquiry has been logged in the system. The platform has automatically simulated and sent the dual-channel (SMS & Email) notifications to both you and the business owner!
            </div>

            <h5 style={{ color: 'var(--text-main)', marginBottom: '12px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Simulated Notification Log:</h5>
            <div className="logs-container" style={{ background: '#0b0f19', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '16px', maxHeight: '350px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.82rem', color: '#38bdf8', whiteSpace: 'pre-wrap', marginBottom: '20px' }}>
              {submissionSuccessLogs.map((log, idx) => (
                <div key={idx} style={{ marginBottom: '16px', borderBottom: idx < submissionSuccessLogs.length - 1 ? '1px dashed rgba(255,255,255,0.1)' : 'none', paddingBottom: '12px' }}>
                  {log.text}
                </div>
              ))}
            </div>

            <button onClick={() => setSubmissionSuccessLogs(null)} className="btn btn-primary w-full" style={{ padding: '12px', fontSize: '1rem', fontWeight: 600 }}>
              Done / Close Report
            </button>
          </div>
        </div>
      )}
      {/* Storefront Custom Social Footer */}
      {store.socialLinks && store.socialLinks.length > 0 && (
        <footer className="store-footer glass-panel container" style={{ marginTop: '50px', padding: '24px', textAlign: 'center' }}>
          <h5 style={{ marginBottom: '16px', color: 'var(--text-main)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Connect with Us</h5>
          <div className="store-social-row" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {store.socialLinks.map((link, idx) => {
              let icon = '🔗';
              const platformLower = link.platform.toLowerCase();
              if (platformLower.includes('facebook')) icon = '📘';
              if (platformLower.includes('instagram')) icon = '📸';
              if (platformLower.includes('telegram')) icon = '✈️';
              if (platformLower.includes('linkedin')) icon = '💼';
              if (platformLower.includes('youtube')) icon = '🎥';
              if (platformLower.includes('tiktok')) icon = '🎵';
              if (platformLower.includes('twitter') || platformLower.includes('x')) icon = '🐦';
              if (platformLower.includes('website')) icon = '🌐';
              
              return (
                <a 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="store-social-badge"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '20px',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{icon}</span>
                  <span style={{ fontWeight: 600 }}>{link.platform}</span>
                </a>
              );
            })}
          </div>
        </footer>
      )}

      <style>{`
        .store-social-badge:hover {
          background: rgba(99, 102, 241, 0.1) !important;
          border-color: var(--accent-primary) !important;
          color: #fff !important;
          transform: translateY(-2px);
        }
        .storefront-wrapper {
          min-height: 100vh;
          padding-bottom: 60px;
        }
        .storefront-page {
          padding-top: 32px;
        }
        .storefront-hero {
          padding: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 24px;
        }
        .store-hero-info {
          flex: 2;
          min-width: 300px;
        }
        .store-address {
          font-size: 0.9rem;
          color: var(--accent-secondary);
          font-weight: 600;
          margin-top: 4px;
        }
        .store-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-top: 14px;
          line-height: 1.5;
        }
        .store-hero-contact {
          flex: 1;
          min-width: 240px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-glass);
          padding: 24px;
          border-radius: var(--radius-md);
          text-align: center;
          display: flex;
          flex-direction: column;
        }
        .contact-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        .contact-number {
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 16px;
        }
        .contact-cta-row {
          display: flex;
          gap: 12px;
        }
        .contact-cta-row a {
          flex: 1;
        }
        .category-template-container {
          margin-bottom: 30px;
        }
        .storefront-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          align-items: start;
        }
        .storefront-main h3 {
          font-size: 1.3rem;
          margin-bottom: 18px;
          border-left: 3px solid var(--accent-primary);
          padding-left: 10px;
        }
        .empty-storefront-card {
          padding: 60px;
          text-align: center;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};

export default Storefront;
