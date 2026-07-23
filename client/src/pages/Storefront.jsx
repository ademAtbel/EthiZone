// Ultimate Master Marketplace - Storefront Page (Optimized for High Scale)
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import StoreNavbar from '../components/StoreNavbar';
import QrModal from '../components/QrModal';
import ListingCard from '../components/ListingCard';
import CategoryTemplate from '../components/CategoryTemplate';
import { useApp } from '../context/AppContext';
import { Building2, MapPin, Phone, MessageCircle, FileText, Shirt, ShoppingBag, Globe } from 'lucide-react';

// Inline SVG social media icons renderer to avoid dependency/version naming conflicts
const renderSocialIcon = (platform, size = 16, style = {}) => {
  const p = platform.toLowerCase();
  const flexStyle = { flexShrink: 0, ...style };
  if (p.includes('facebook')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={flexStyle}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    );
  }
  if (p.includes('instagram')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={flexStyle}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    );
  }
  if (p.includes('telegram')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={flexStyle}>
        <path d="M21.13 2.82a1.6 1.6 0 0 0-1.64-.15L3.56 10.08a1.6 1.6 0 0 0-.1 2.92l4.88 2.2 2.2 4.88a1.6 1.6 0 0 0 2.92-.1l7.41-15.93a1.6 1.6 0 0 0-.15-1.64z"/>
        <line x1="8.5" y1="14.5" x2="21" y2="3"/>
      </svg>
    );
  }
  if (p.includes('linkedin')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={flexStyle}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    );
  }
  if (p.includes('youtube')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={flexStyle}>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
      </svg>
    );
  }
  if (p.includes('tiktok')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={flexStyle}>
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
      </svg>
    );
  }
  if (p.includes('twitter') || p.includes('x')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={flexStyle}>
        <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={flexStyle}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
};

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
  const [catalogOfferType, setCatalogOfferType] = useState('all'); // all, sale, rent
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'home';
  const setActiveTab = (newTab) => {
    setSearchParams({ tab: newTab });
  };
  const { t, setActiveStoreType } = useApp();
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

      const offerTypeVal = item.metadata?.offerType || item.offerType || '';
      const matchesOfferType = catalogOfferType === 'all' || 
        (catalogOfferType === 'sale' && offerTypeVal.toLowerCase() === 'sale') ||
        (catalogOfferType === 'rent' && offerTypeVal.toLowerCase() === 'rent');

      if (activeTab === 'on_sale' && !item.isOnSale) {
        return false;
      }

      if (activeTab === 'new_arrival' && !item.isNewArrival) {
        return false;
      }

      return matchesSearch && matchesStatus && matchesOfferType;
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
      
      let storeData = {};
      try {
        const text = await res.text();
        storeData = text ? JSON.parse(text) : {};
      } catch (e) {
        throw new Error('Store profile service is temporarily unavailable. Please try again.');
      }

      if (!res.ok) throw new Error(storeData.message || 'Store not found');
      
      setStore(storeData);
      
      // Update the global active store type for Navbar highlighting
      if (setActiveStoreType && storeData.businessType) {
        setActiveStoreType(storeData.businessType);
      }

      // Fetch listings for this store owner using their resolved ID (up to 100)
      const listRes = await fetch(`/api/listings?ownerId=${storeData._id}&limit=100`);
      let listData = [];
      if (listRes.ok) {
        try {
          const text = await listRes.text();
          listData = text ? JSON.parse(text) : [];
        } catch (e) {
          console.error('Failed to parse listings response', e);
        }
      }
      setListings(listData);

      // Fetch references/reviews for this store owner using their resolved ID (up to 100)
      const ratingsRes = await fetch(`/api/ratings/target/${storeData._id}?limit=100`);
      let ratingsData = [];
      if (ratingsRes.ok) {
        try {
          const text = await ratingsRes.text();
          ratingsData = text ? JSON.parse(text) : [];
        } catch (e) {
          console.error('Failed to parse ratings response', e);
        }
      }
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
    const isStoreNotFound = error === 'Store not found' || error === 'Storefront does not exist.';
    const displayMessage = isStoreNotFound 
      ? 'This store is currently updating their website. We will be right back!' 
      : (error || 'Storefront does not exist.');
    return (
      <div className="container storefront-page flex-center" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="glass-panel" style={{ padding: '40px 30px', maxWidth: '500px', textAlign: 'center', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.15)', background: 'rgba(15, 23, 42, 0.4)' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '20px' }}>🛠️</span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '10px', color: '#fff' }}>Store Under Maintenance</h3>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>{displayMessage}</p>
        </div>
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
            {store.category?.toLowerCase() !== 'other' && (
              <header 
                className={`storefront-hero glass-panel ${store.storeImage ? 'has-image' : ''}`}
                style={store.storeImage ? { 
                  backgroundImage: `linear-gradient(to right, rgba(9, 13, 22, 0.96) 35%, rgba(9, 13, 22, 0.45) 100%), url(${store.storeImage})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  position: 'relative'
                } : {}}
              >
                <div className="store-hero-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    <img 
                      src={store.storeLogo || '/logo.png'} 
                      alt={`${store.storeName || store.username} Logo`} 
                      style={{ 
                        width: '90px', 
                        height: '90px', 
                        borderRadius: '50%', 
                        objectFit: 'cover', 
                        border: '4px solid var(--accent-primary)', 
                        boxShadow: '0 10px 25px rgba(0,0,0,0.6), inset 0 4px 8px rgba(255,255,255,0.3), inset 0 -4px 8px rgba(0,0,0,0.4)',
                        background: 'var(--bg-card)',
                        transform: 'translateZ(0)',
                        transition: 'transform 0.3s ease'
                      }} 
                    />
                    <h1 style={{ margin: 0, fontSize: '2.2rem' }}>{store.storeName || store.username}</h1>
                  </div>
                  <p className="store-address d-flex align-items-center gap-2" style={{ justifyContent: 'center' }}><MapPin size={16} style={{ color: 'var(--accent-secondary)' }} /> {store.address || 'Local Directory Services'}</p>
                  <p className="store-desc">{store.description || t('middleman_free')}</p>
                </div>
                <div className="store-hero-contact" style={{ zIndex: 2 }}>
                  <span className="contact-label">{t('direct_line')}</span>
                  <span className="contact-number">{store.phone}</span>
                  <div className="contact-cta-row">
                    <a href={`tel:${store.phone}`} className="btn btn-success d-flex align-items-center justify-content-center gap-2"><Phone size={18} /> {t('call')}</a>
                    <a href={`sms:${store.phone}?body=Hi! I am interested in inquiring about your store services.`} className="btn btn-primary d-flex align-items-center justify-content-center gap-2"><MessageCircle size={18} /> {t('sms')}</a>
                  </div>
                  {store.socialLinks && store.socialLinks.length > 0 && (
                    <div className="social-links-header-row" style={{ display: 'flex', gap: '10px', marginTop: '12px', justifyContent: 'center' }}>
                      {store.socialLinks.map((link, idx) => {
                        const targetUrl = link.url.startsWith('http') ? link.url : `https://${link.url}`;
                        return (
                          <a 
                            key={idx} 
                            href={targetUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="social-header-btn"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid var(--border-glass)',
                              color: 'var(--text-secondary)',
                              transition: 'all 0.2s',
                              cursor: 'pointer'
                            }}
                            title={link.platform}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--accent-primary)';
                              e.currentTarget.style.color = '#fff';
                              e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                              e.currentTarget.style.color = 'var(--text-secondary)';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            {renderSocialIcon(link.platform, 18)}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </header>
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

            {/* Gallery Showcase Preview */}
            {store.galleryPhotos && store.galleryPhotos.length > 0 && (
              <div className="storefront-gallery-showcase" style={{ marginTop: '50px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', borderLeft: '3px solid var(--accent-primary)', paddingLeft: '10px' }}>
                  Store Gallery
                </h3>
                <div className="row g-3">
                  {store.galleryPhotos.slice(0, 4).map((img, idx) => (
                    <div key={idx} className="col-6 col-sm-4 col-md-3">
                      <div className="glass-panel" style={{ padding: '8px', borderRadius: '12px' }}>
                        <img 
                          src={img} 
                          alt={`Gallery Preview ${idx + 1}`} 
                          style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {store.galleryPhotos.length > 4 && (
                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <button 
                      onClick={() => setActiveTab('gallery')} 
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                    >
                      View All {store.galleryPhotos.length} Gallery Photos
                    </button>
                  </div>
                )}
              </div>
            )}

          </>
        )}

        {/* TAB 2: CATALOG / SHOP ITEMS / ON SALE / NEW ARRIVAL SECTION */}
        {['catalog', 'on_sale', 'new_arrival'].includes(activeTab) && (
          <div className="storefront-grid">
            <div className="storefront-main" style={{ width: '100%' }}>
              <div className="catalog-header-bar sticky-catalog-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0 }}>
                  {activeTab === 'on_sale' ? 'Items on Sale' : activeTab === 'new_arrival' ? 'New Arrivals' : `${t('catalog_active_listings')} (${filteredListings.length})`}
                </h3>
                
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', flex: '1', justifyContent: 'flex-end' }}>
                  <button
                    className="btn btn-outline-secondary d-md-none d-flex align-items-center"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    style={{
                      borderRadius: '8px', padding: '8px 16px', background: 'var(--bg-card)', 
                      border: '1px solid var(--border-glass)', boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                      gap: '8px'
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="21" x2="14" y1="4" y2="4" />
                      <line x1="10" x2="3" y1="4" y2="4" />
                      <line x1="21" x2="12" y1="12" y2="12" />
                      <line x1="8" x2="3" y1="12" y2="12" />
                      <line x1="21" x2="16" y1="20" y2="20" />
                      <line x1="12" x2="3" y1="20" y2="20" />
                      <line x1="14" x2="14" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="10" y2="14" />
                      <line x1="12" x2="12" y1="18" y2="22" />
                    </svg>
                    <span className="fw-semibold">Filters</span>
                  </button>

                  {/* Desktop Inline Filters */}
                  <div className="d-none d-md-flex" style={{ gap: '10px', flexWrap: 'wrap', width: '100%', justifyContent: 'flex-end' }}>
                    <input 
                      type="text" 
                      placeholder={t('search_in_catalog')}
                      className="form-control" 
                      style={{ maxWidth: '240px', margin: 0 }}
                      value={catalogQuery}
                      onChange={(e) => setCatalogQuery(e.target.value)}
                    />
                    {(store.businessType === 'automotive' || store.businessType === 'real_estate') && (
                      <select 
                        className="form-control" 
                        value={catalogOfferType} 
                        onChange={(e) => setCatalogOfferType(e.target.value)}
                        style={{ maxWidth: '140px', margin: 0 }}
                      >
                        <option value="all">All Offers</option>
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                      </select>
                    )}
                    <select 
                      className="form-control" 
                      value={catalogStatusFilter} 
                      onChange={(e) => setCatalogStatusFilter(e.target.value)}
                      style={{ maxWidth: '140px', margin: 0 }}
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Available</option>
                      <option value="inactive">Sold Out / Busy</option>
                    </select>
                    <select 
                      className="form-control" 
                      value={catalogSort} 
                      onChange={(e) => setCatalogSort(e.target.value)}
                      style={{ maxWidth: '160px', margin: 0 }}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="low-to-high">Price: Low to High</option>
                      <option value="high-to-low">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Mobile Filter Drawer Overlay */}
              {showMobileFilters && (
                <div 
                  className="d-md-none" 
                  onClick={() => setShowMobileFilters(false)} 
                  style={{ 
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                    backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1040, backdropFilter: 'blur(4px)'
                  }} 
                />
              )}

              {/* Mobile Filter Drawer */}
              <div className={`d-md-none ${showMobileFilters ? 'mobile-filter-drawer' : 'd-none'}`} style={{ zIndex: 1045 }}>
                <div className="filter-sidebar-card" style={{ height: '100%', overflowY: 'auto' }}>
                  <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                     <span className="fw-bold fs-5" style={{ color: 'var(--text-main)' }}>Filters</span>
                     <button className="btn btn-sm" onClick={() => setShowMobileFilters(false)} style={{ borderRadius: '50%', width: '32px', height: '32px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border-glass)' }}>✕</button>
                  </div>
                  
                  <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>Search</h4>
                      <input 
                        type="text" 
                        placeholder={t('search_in_catalog')}
                        className="form-control w-100" 
                        value={catalogQuery}
                        onChange={(e) => setCatalogQuery(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>Status</h4>
                      <select 
                        className="form-control w-100" 
                        value={catalogStatusFilter} 
                        onChange={(e) => setCatalogStatusFilter(e.target.value)}
                      >
                        <option value="all">All Statuses</option>
                        <option value="active">Available</option>
                        <option value="inactive">Sold Out / Busy</option>
                      </select>
                    </div>

                    {(store.businessType === 'automotive' || store.businessType === 'real_estate') && (
                      <div>
                        <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>Offer Type</h4>
                        <select 
                          className="form-control w-100" 
                          value={catalogOfferType} 
                          onChange={(e) => setCatalogOfferType(e.target.value)}
                        >
                          <option value="all">All Offers</option>
                          <option value="sale">For Sale</option>
                          <option value="rent">For Rent</option>
                        </select>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>Sort By</h4>
                      <select 
                        className="form-control w-100" 
                        value={catalogSort} 
                        onChange={(e) => setCatalogSort(e.target.value)}
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                      </select>
                    </div>

                    <div className="pt-4 mt-2 border-top">
                      <button
                        onClick={() => {
                          setCatalogQuery('');
                          setCatalogStatusFilter('all');
                          setCatalogOfferType('all');
                          setCatalogSort('newest');
                          setShowMobileFilters(false);
                        }}
                        className="btn btn-light border w-100 py-2 rounded-3 fw-semibold transition-all"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </div>
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

        {/* TAB: GALLERY PANEL */}
        {activeTab === 'gallery' && (
          <div className="glass-panel gallery-panel-card" style={{ padding: '40px', marginBottom: '30px' }}>
            <h2 style={{ marginBottom: '18px', borderLeft: '3px solid var(--accent-primary)', paddingLeft: '12px' }}>Gallery</h2>
            <div className="row g-3">
               {store && store.galleryPhotos && store.galleryPhotos.length > 0 ? (
                 store.galleryPhotos.map((img, idx) => (
                    <div key={idx} className="col-6 col-md-4 col-lg-3">
                       <img src={img} alt={`Gallery item ${idx + 1}`} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-glass)' }} />
                    </div>
                 ))
               ) : listings.flatMap(l => l.images || []).length > 0 ? (
                 listings.flatMap(l => l.images || []).slice(0, 16).map((img, idx) => (
                    <div key={idx} className="col-6 col-md-4 col-lg-3">
                       <img src={img} alt="Gallery item" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-glass)' }} />
                    </div>
                 ))
               ) : (
                 <p className="text-muted" style={{ paddingLeft: '12px' }}>No images available in the gallery yet.</p>
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

            {store.shopStory && (
              <div style={{ marginBottom: '24px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-secondary)', marginBottom: '10px' }}>Our Story</h4>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {store.shopStory}
                </p>
              </div>
            )}

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
              
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={`tel:${store.phone}`} className="btn btn-success" style={{ padding: '12px 28px', fontSize: '1rem' }}>{t('call_now')}</a>
                <a href={`sms:${store.phone}?body=Hi! I saw your store on Ethiozone and want to inquire.`} className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '1rem' }}>{t('send_sms')}</a>
                <button 
                  onClick={() => setInquiryModalOpen(true)} 
                  className="btn btn-secondary" 
                  style={{ padding: '12px 28px', fontSize: '1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-glass)', color: 'var(--text-main)' }}
                >
                  ✉️ Send Message / Request
                </button>
              </div>
            </div>

            {store.socialLinks && store.socialLinks.length > 0 && (
              <div style={{ marginTop: '30px', borderTop: '1px solid var(--border-glass)', paddingTop: '24px' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Follow Us On Social Media</h4>
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {store.socialLinks.map((link, idx) => {
                    const targetUrl = link.url.startsWith('http') ? link.url : `https://${link.url}`;
                    return (
                      <a 
                        key={idx} 
                        href={targetUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-secondary d-flex align-items-center gap-2"
                        style={{
                          padding: '10px 18px',
                          fontSize: '0.9rem',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border-glass)',
                          borderRadius: '8px',
                          color: 'var(--text-main)',
                          transition: 'all 0.2s'
                        }}
                      >
                        {renderSocialIcon(link.platform, 18, { color: 'var(--accent-primary)' })}
                        <span>{link.platform}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
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
      {(() => {
        const activeLinks = (store.socialLinks || []).filter(l => l.url && l.url.trim() !== '');
        if (activeLinks.length === 0) return null;
        return (
          <footer className="store-footer" style={{ marginTop: '40px', padding: '10px 0', textAlign: 'center' }}>
            <div className="store-social-row" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {activeLinks.map((link, idx) => {
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
                      justifyContent: 'center',
                      width: '42px',
                      height: '42px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '50%',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    title={link.platform}
                  >
                    {renderSocialIcon(link.platform, 20, { color: 'var(--accent-secondary)' })}
                  </a>
                );
              })}
            </div>
          </footer>
        );
      })()}

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
        .storefront-hero.has-image {
          color: #ffffff !important;
        }
        .storefront-hero.has-image h1 {
          color: #ffffff !important;
        }
        .storefront-hero.has-image .store-desc {
          color: rgba(255, 255, 255, 0.85) !important;
        }
        .storefront-hero.has-image .contact-label {
          color: rgba(255, 255, 255, 0.6) !important;
        }
        .storefront-hero.has-image .contact-number {
          color: #ffffff !important;
        }
        .storefront-hero.has-image .store-hero-contact {
          border-color: rgba(255, 255, 255, 0.15) !important;
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
        @media (min-width: 992px) {
          .sticky-catalog-header {
            position: sticky;
            /* Top value assumes StoreNavbar is sticky at --header-height */
            top: calc(var(--header-height, 180px) + 70px);
            z-index: 980;
            background: var(--bg-main);
            padding: 10px 0;
            /* Slightly expand background to cover spacing */
            box-shadow: 0 10px 10px var(--bg-main);
          }
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
