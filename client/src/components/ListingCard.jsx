import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RatingForm from './RatingForm';
import { Phone, MessageCircle } from 'lucide-react';

const ListingCard = ({ listing, showStoreLink = true, onDeleted }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalRatings, setModalRatings] = useState([]);
  const [loadingRatings, setLoadingRatings] = useState(false);
  const { t } = useApp();

  const {
    _id,
    title,
    description,
    price,
    type,
    category,
    status,
    ownerPhone,
    ownerName,
    ownerId,
    metadata
  } = listing;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const images = listing.images || [];

  // Fetch listing owner reviews when the detail modal opens
  useEffect(() => {
    if (isDetailModalOpen) {
      const fetchRatings = async () => {
        try {
          setLoadingRatings(true);
          const res = await fetch(`/api/ratings/target/${ownerId?._id || ownerId}`);
          if (res.ok) {
            const data = await res.json();
            setModalRatings(data);
          }
        } catch (err) {
          console.error('Error fetching modal ratings', err);
        } finally {
          setLoadingRatings(false);
        }
      };
      fetchRatings();
    }
  }, [isDetailModalOpen, ownerId]);

  const handleNextImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Compile pre-filled contextual SMS content
  const smsMessage = `Hello ${ownerName || 'Provider'}, I saw your post "${title}" on Ethiozone and I am interested. Let's connect!`;
  
  // Format listing type labels
  const getBadgeTypeClass = (lType) => {
    switch (lType) {
      case 'personal_item': return 'badge-indigo';
      case 'handyman_skill': return 'badge-cyan';
      case 'store_product': return 'badge-emerald';
      case 'service': return 'badge-amber';
      case 'job_opening': return 'badge-danger';
      case 'house': return 'badge-indigo';
      case 'car': return 'badge-cyan';
      default: return 'badge-secondary';
    }
  };

  const getLabel = (lType) => {
    switch (lType) {
      case 'personal_item': return 'Item for Sale';
      case 'handyman_skill': return 'Handyman Skill';
      case 'store_product': return 'Store Product';
      case 'service': return 'Professional Service';
      case 'job_opening': return 'Job Opening';
      case 'house': return 'Real Estate (House)';
      case 'car': return 'Automotive (Car)';
      default: return lType;
    }
  };

  const isVerified = ownerId?.verificationBadge || listing.verificationBadge;
  const isOnline = ownerId?.isOnline !== false;

  const getStatusOverlay = () => {
    if (status === 'sold') return <div className="status-overlay sold">SOLD OUT</div>;
    if (status === 'busy') return <div className="status-overlay busy">PROVIDER BUSY</div>;
    if (status === 'inactive') return <div className="status-overlay inactive">INACTIVE</div>;
    if (!isOnline && type === 'handyman_skill') return <div className="status-overlay offline">OFFLINE</div>;
    return null;
  };

  const isInteractive = status === 'active' && (type !== 'handyman_skill' || isOnline);

  const handleRatingAdded = (newRating) => {
    setModalRatings((prev) => [newRating, ...prev]);
  };

  return (
    <>
      {/* Interactive Listing Card */}
      <div 
        className={`glass-panel listing-card ${!isInteractive ? 'listing-dimmed' : ''}`}
        onClick={() => setIsDetailModalOpen(true)}
        style={{ cursor: 'pointer' }}
      >
        {getStatusOverlay()}
        
        <div className="card-header">
          <span className={`badge ${getBadgeTypeClass(type)}`}>
            {getLabel(type)}
          </span>
          {category && (
            <span className="listing-category-text">{category}</span>
          )}
        </div>

        <div className="card-body">
          {images.length > 0 && (
            <div className="card-carousel-container">
              <div className="card-carousel-main">
                <img src={images[activeImageIdx]} alt={`${title} image ${activeImageIdx + 1}`} className="card-carousel-img" />
              </div>
              {images.length > 1 && (
                <div className="carousel-thumbnails">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => { e.stopPropagation(); e.preventDefault(); setActiveImageIdx(idx); }}
                      className={`carousel-thumb-btn ${idx === activeImageIdx ? 'active' : ''}`}
                    >
                      <img src={img} alt="thumb" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <h3 className="listing-title">{title}</h3>
          <p className="listing-desc">{description}</p>
          
          {/* Render specific metadata details */}
          {type === 'job_opening' && metadata?.jobRequirements && metadata.jobRequirements.length > 0 && (
            <div className="card-metadata job-req-preview" style={{ marginBottom: '12px' }}>
              <span className="meta-label">Requirements:</span>
              <ul className="req-preview-list" style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {metadata.jobRequirements.slice(0, 2).map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
                {metadata.jobRequirements.length > 2 && <li>+ {metadata.jobRequirements.length - 2} more...</li>}
              </ul>
            </div>
          )}

          {type === 'handyman_skill' && metadata?.handymanRates && (
            <div className="card-metadata handyman-rate" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <span>⏱️ Rate: <strong>{metadata.handymanRates}</strong></span>
            </div>
          )}

          {type === 'house' && metadata && (
            <div className="card-metadata" style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              {metadata.propertyType && <span>🏠 {metadata.propertyType}</span>}
              {metadata.bedrooms && <span>🛏️ {metadata.bedrooms} Beds</span>}
              {metadata.bathrooms && <span>🛁 {metadata.bathrooms} Baths</span>}
            </div>
          )}

          {type === 'car' && metadata && (
            <div className="card-metadata" style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', flexWrap: 'wrap' }}>
              {metadata.year && <span>📅 {metadata.year}</span>}
              {metadata.make && <span>🏷️ {metadata.make} {metadata.model}</span>}
              {metadata.mileage !== undefined && <span>🛣️ {metadata.mileage.toLocaleString()} miles</span>}
            </div>
          )}
          
          <div className="listing-price-container">
            <span className="price-label">{type === 'job_opening' ? t('salary_offered') : t('price')}</span>
            <span className="price-value">
              {price ? `$${price.toLocaleString()}` : t('contact_for_price')}
            </span>
          </div>

          <div className="listing-owner-details">
            <div className="owner-row">
              <span className="owner-name">
                {ownerId?.role === 'business' ? `${ownerId.storeName || ownerName}` : 
                 ownerId?.role === 'handyman' ? `Handyman Provider` : `Individual Seller`}
              </span>
              {isVerified && (
                <span className="verified-badge-inline" title="Verified by Platform Admin">
                  ✓ {t('verified')}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="card-actions">
          {/* Show public storefront link if applicable */}
          {showStoreLink && ownerId?._id && (ownerId.role === 'business' || ownerId.role === 'store') && (
            <Link 
              to={`/store/${(ownerId.storeName || ownerName || '').toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-')}`} 
              className="btn btn-secondary store-nav-btn flex-grow-1"
              onClick={(e) => e.stopPropagation()}
            >
              {t('visit_store')}
            </Link>
          )}

          {isInteractive ? (
            <>
              <a 
                href={`tel:${ownerPhone}`} 
                className="btn btn-success flex-grow-1 action-btn d-flex align-items-center justify-content-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone size={16} /> {t('call')}
              </a>
              <a 
                href={`sms:${ownerPhone}?body=${encodeURIComponent(smsMessage)}`} 
                className="btn btn-primary flex-grow-1 action-btn d-flex align-items-center justify-content-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle size={16} /> {t('sms')}
              </a>
            </>
          ) : (
            <button className="btn btn-secondary flex-grow-1 action-btn disabled" disabled onClick={(e) => e.stopPropagation()}>
              Unavailable
            </button>
          )}
        </div>
      </div>

      {/* DETAILED MODAL PORTAL */}
      {isDetailModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 1200 }} onClick={() => setIsDetailModalOpen(false)}>
          <div className="glass-panel modal-content detail-lightbox" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px', width: '95%', padding: '32px' }}>
            <button 
              onClick={() => setIsDetailModalOpen(false)} 
              className="btn-close-modal" 
              style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '1.6rem', cursor: 'pointer' }}
            >
              &times;
            </button>
            
            <div className="modal-scroll-pane" style={{ maxHeight: '78vh', overflowY: 'auto', paddingRight: '8px' }}>
              
              <div className="modal-listing-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
                {/* Images view */}
                <div>
                  {images.length > 0 ? (
                    <img 
                      src={images[activeImageIdx]} 
                      alt={title} 
                      style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }} 
                    />
                  ) : (
                    <div className="flex-center" style={{ width: '100%', height: '280px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', fontSize: '3rem' }}>📦</div>
                  )}
                  {images.length > 1 && (
                    <div className="modal-carousel-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', gap: '16px' }}>
                      <button 
                        type="button" 
                        onClick={handlePrevImage} 
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px 12px', fontSize: '1.1rem', fontWeight: 'bold' }}
                      >
                        ‹
                      </button>
                      
                      <div className="carousel-thumbnails" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', margin: 0 }}>
                        {images.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveImageIdx(idx)}
                            style={{ width: '42px', height: '42px', border: idx === activeImageIdx ? '2px solid var(--accent-primary)' : '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', padding: 0, opacity: idx === activeImageIdx ? 1 : 0.6, transition: 'var(--transition-fast)' }}
                          >
                            <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </button>
                        ))}
                      </div>
                      
                      <button 
                        type="button" 
                        onClick={handleNextImage} 
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px 12px', fontSize: '1.1rem', fontWeight: 'bold' }}
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>

                {/* Details view */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className={`badge ${getBadgeTypeClass(type)}`}>{getLabel(type)}</span>
                      {category && <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{category}</span>}
                    </div>

                    <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)', margin: '12px 0 6px 0' }}>{title}</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                      {t('provider')}: <strong>{ownerId?.role === 'business' ? `${ownerId.storeName || ownerName}` : ownerId?.role === 'handyman' ? t('handyman_provider') : t('individual_seller')}</strong>
                    </p>

                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                      {description}
                    </p>

                    {/* Metadata details */}
                    <div className="metadata-detailed-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px' }}>
                      {type === 'house' && metadata && (
                        <>
                          {metadata.propertyType && <span>🏠 {t('property')}: <strong>{metadata.propertyType}</strong></span>}
                          {metadata.bedrooms && <span>🛏️ {t('bedrooms')}: <strong>{metadata.bedrooms}</strong></span>}
                          {metadata.bathrooms && <span>🛁 {t('bathrooms')}: <strong>{metadata.bathrooms}</strong></span>}
                        </>
                      )}
                      {type === 'car' && metadata && (
                        <>
                          {metadata.year && <span>📅 {t('model_year')}: <strong>{metadata.year}</strong></span>}
                          {metadata.make && <span>🏷️ {t('brand')}: <strong>{metadata.make} {metadata.model}</strong></span>}
                          {metadata.mileage !== undefined && <span>🛣️ {t('mileage')}: <strong>{metadata.mileage.toLocaleString()} miles</strong></span>}
                        </>
                      )}
                      {type === 'handyman_skill' && metadata?.handymanRates && (
                        <span>⏱️ {t('rates')}: <strong>{metadata.handymanRates}</strong></span>
                      )}
                      {type === 'job_opening' && metadata?.jobRequirements && (
                        <div>
                          <span style={{ fontWeight: 600, display: 'block', marginBottom: '4px' }}>{t('requirements')}:</span>
                          <ul style={{ paddingLeft: '16px' }}>
                            {metadata.jobRequirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{type === 'job_opening' ? t('salary_offered') : t('price')}</span>
                      <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
                        {price ? `$${price.toLocaleString()}` : t('contact_for_price')}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      {isInteractive ? (
                        <>
                          <a href={`tel:${ownerPhone}`} className="btn btn-success flex-grow-1" style={{ padding: '12px' }}>{t('call')}</a>
                          <a href={`sms:${ownerPhone}?body=${encodeURIComponent(smsMessage)}`} className="btn btn-primary flex-grow-1" style={{ padding: '12px' }}>{t('sms')}</a>
                        </>
                      ) : (
                        <button className="btn btn-secondary flex-grow-1 disabled" disabled>{t('unavailable')}</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedbacks Grid */}
              <div className="modal-feedbacks-section" style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '24px' }}>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '20px', borderLeft: '3px solid var(--accent-primary)', paddingLeft: '10px' }}>
                  {t('verified_reviews_title')} ({modalRatings.length})
                </h4>

                <div className="modal-reviews-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
                  
                  {/* Reviews List */}
                  <div className="reviews-scroll-area" style={{ maxHeight: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '6px' }}>
                    {loadingRatings ? (
                      <div className="flex-center" style={{ padding: '20px' }}><div className="spinner"></div></div>
                    ) : modalRatings.length === 0 ? (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>{t('no_reviews_modal')}</p>
                    ) : (
                      modalRatings.map((rev) => (
                        <div key={rev._id} className="reference-log-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)' }}>
                          <div className="ref-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <strong style={{ fontSize: '0.92rem' }}>{rev.name}</strong>
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>📞 {rev.phone}</span>
                            </div>
                            <span style={{ color: 'var(--accent-warning)', fontSize: '0.95rem' }}>{'★'.repeat(rev.rating)}</span>
                          </div>
                          <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.4 }}>"{rev.comment}"</p>
                          <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '6px' }}>
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Rating Form Panel */}
                  <div>
                    <RatingForm targetId={ownerId?._id || ownerId} onRatingSubmitted={handleRatingAdded} />
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <style>{`
        .listing-card {
          position: relative;
          padding: 24px;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
        }
        .listing-dimmed {
          opacity: 0.55;
        }
        .status-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(9, 13, 22, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.3rem;
          letter-spacing: 0.05em;
          z-index: 10;
          pointer-events: none;
        }
        .status-overlay.sold { color: #f87171; border: 2px solid #ef4444; }
        .status-overlay.busy { color: #fbbf24; border: 2px solid #f59e0b; }
        .status-overlay.inactive { color: #9ca3af; border: 2px solid #6b7280; }
        .status-overlay.offline { color: #fca5a5; border: 2px solid #ef4444; }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .listing-category-text {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .listing-title {
          font-size: 1.15rem;
          margin: 12px 0 6px 0;
          line-height: 1.3;
          color: var(--text-main);
        }
        .listing-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .listing-price-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-top: 12px;
          border-top: 1px solid var(--border-glass);
        }
        .price-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .price-value {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--accent-secondary);
        }
        .listing-owner-details {
          margin-bottom: 16px;
        }
        .owner-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .owner-name {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .verified-badge-inline {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--accent-success);
          background: rgba(16, 185, 129, 0.1);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }
        .card-actions {
          display: flex;
          gap: 8px;
          margin-top: auto;
        }
        .action-btn {
          font-size: 0.85rem;
          padding: 10px 14px;
        }
        
        /* Carousel */
        .card-carousel-container {
          position: relative;
          width: 100%;
        }
        .card-carousel-main {
          position: relative;
          height: 160px;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #0d1220;
          border: 1px solid var(--border-glass);
        }
        .card-carousel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .carousel-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.6);
          color: #fff;
          border: none;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
          z-index: 2;
        }
        .carousel-nav-btn:hover { background: rgba(0,0,0,0.85); }
        .carousel-nav-btn.prev { left: 8px; }
        .carousel-nav-btn.next { right: 8px; }
        .carousel-thumbnails {
          display: flex;
          gap: 6px;
          margin-top: 8px;
          overflow-x: auto;
          padding-bottom: 2px;
        }
        .carousel-thumb-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--border-glass);
          padding: 0;
          cursor: pointer;
          opacity: 0.5;
          flex-shrink: 0;
          transition: var(--transition-fast);
        }
        .carousel-thumb-btn.active, .carousel-thumb-btn:hover {
          opacity: 1;
          border-color: var(--accent-primary);
        }
        .carousel-thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Modal lightbox layouts */
        .detail-lightbox {
          position: relative;
          animation: scaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .modal-scroll-pane {
          padding-right: 6px;
        }
        
        /* Custom scrollbar to hide arrows and make it sleek */
        .modal-scroll-pane::-webkit-scrollbar,
        .reviews-scroll-area::-webkit-scrollbar {
          width: 8px;
        }
        .modal-scroll-pane::-webkit-scrollbar-track,
        .reviews-scroll-area::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
          border-radius: 4px;
        }
        .modal-scroll-pane::-webkit-scrollbar-thumb,
        .reviews-scroll-area::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }
        .modal-scroll-pane::-webkit-scrollbar-thumb:hover,
        .reviews-scroll-area::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }
        .modal-scroll-pane::-webkit-scrollbar-button,
        .reviews-scroll-area::-webkit-scrollbar-button {
          display: none;
        }
        .modal-scroll-pane,
        .reviews-scroll-area {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
        }
        body.light-theme .modal-scroll-pane::-webkit-scrollbar-track,
        body.light-theme .reviews-scroll-area::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.02);
        }
        body.light-theme .modal-scroll-pane::-webkit-scrollbar-thumb,
        body.light-theme .reviews-scroll-area::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
        }
        body.light-theme .modal-scroll-pane,
        body.light-theme .reviews-scroll-area {
          scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
        }

        @media (max-width: 768px) {
          .modal-listing-info-grid {
            grid-template-columns: 1fr !important;
          }
          .modal-reviews-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

export default ListingCard;
