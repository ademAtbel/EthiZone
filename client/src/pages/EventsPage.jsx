import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Search, Tag, Phone, MessageCircle, X, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';

const EventsPage = () => {
  const { t } = useApp();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Search & Filter State
  const [searchInput, setSearchInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categories = [
    { name: 'All', label: t('events_cat_all') || 'All', icon: '🌟' },
    { name: 'Entertainment', label: t('events_entertainment') || 'Entertainment', icon: '🎬' },
    { name: 'Arts & Culture', label: t('events_arts_culture') || 'Arts & Culture', icon: '🎨' },
    { name: 'Religious', label: t('events_religious') || 'Religious', icon: '⛪' },
    { name: 'Social', label: t('events_social') || 'Social', icon: '🤝' },
    { name: 'Educational', label: t('events_educational') || 'Educational', icon: '📚' },
    { name: 'Sports', label: t('events_sports') || 'Sports', icon: '🏆' },
    { name: 'Charity', label: t('events_charity') || 'Charity', icon: '❤️' }
  ];

  // Fetch events based on filters
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');
      
      let url = '/api/events?';
      const params = new URLSearchParams();
      if (searchInput) params.append('query', searchInput);
      if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
      if (locationInput) params.append('location', locationInput);
      
      const response = await fetch(url + params.toString());
      if (!response.ok) {
        setEvents([]);
        return;
      }
      const data = await response.json();
      const activeEvents = Array.isArray(data) ? data : [];
      setEvents(activeEvents);
    } catch (err) {
      console.warn('Events fetch error:', err.message);
      setEvents([]);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  const getSubcategoryLabel = (sub) => {
    if (!sub) return '';
    return sub;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getEventPriceLabel = (price) => {
    if (!price || price === 0) return t('events_free') || 'FREE';
    return `$${price}`;
  };

  return (
    <div className="container py-5" style={{ minHeight: '80vh', color: 'var(--text-main)' }}>
      {/* Header section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-2" style={{ fontSize: '2.5rem', background: 'linear-gradient(135deg, var(--text-main) 0%, var(--accent-primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {t('events_explore_title') || 'Explore Events Nearby'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          {t('events_explore_subtitle') || 'Find concerts, workshops, community gatherings, sports tournaments, and other events hosted near you.'}
        </p>
      </div>

      {/* Search & Location Filter Section */}
      <div className="glass-panel p-4 mb-4" style={{ borderRadius: '12px', border: '1px solid var(--border-glass)', background: 'rgba(255,255,255,0.02)' }}>
        <form onSubmit={handleSearchSubmit} className="row g-3 align-items-center">
          <div className="col-md-5">
            <div className="position-relative">
              <Search className="position-absolute translate-middle-y" style={{ left: '12px', top: '50%', color: 'var(--text-muted)' }} size={16} />
              <input
                type="text"
                placeholder={t('events_search_placeholder') || 'Search event title, description or keywords...'}
                className="form-control"
                style={{ paddingLeft: '38px', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', color: 'var(--text-main)', height: '45px' }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="position-relative">
              <MapPin className="position-absolute translate-middle-y" style={{ left: '12px', top: '50%', color: 'var(--accent-secondary)' }} size={16} />
              <input
                type="text"
                placeholder={t('events_location_placeholder') || 'Search City or Location (e.g. Bole)...'}
                className="form-control"
                style={{ paddingLeft: '38px', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', color: 'var(--text-main)', height: '45px' }}
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <button
              type="submit"
              className="btn btn-primary w-100 fw-semibold"
              style={{ height: '45px', background: 'var(--accent-primary)', border: 'none' }}
            >
              {t('events_search_btn') || 'Search Events'}
            </button>
          </div>
        </form>
      </div>

      {/* Category Pills Slider */}
      <div className="d-flex gap-2 overflow-auto pb-3 mb-5 scrollbar-thin" style={{ whiteSpace: 'nowrap' }}>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`btn rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold transition-all`}
            style={{
              fontSize: '0.9rem',
              backgroundColor: selectedCategory === cat.name ? 'var(--accent-primary)' : 'rgba(255,255,255,0.03)',
              color: selectedCategory === cat.name ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid',
              borderColor: selectedCategory === cat.name ? 'var(--accent-primary)' : 'var(--border-glass)'
            }}
          >
            <span>{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>

      {/* Loading & Error Indicators */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-secondary">{t('events_searching') || 'Searching events nearby...'}</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center" role="alert" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5' }}>
          {error}
        </div>
      )}

      {/* Main Grid List */}
      {!loading && !error && (
        <>
          {events.length === 0 ? (
            <div className="text-center py-5 glass-panel" style={{ borderRadius: '12px', border: '1px solid var(--border-glass)', padding: '50px' }}>
              <Calendar size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
              <h4 className="fw-bold mb-2">{t('events_no_found') || 'No Events Found'}</h4>
              <p style={{ color: 'var(--text-secondary)' }}>{t('events_no_found_desc') || "We couldn't find any events matching your selected category or location. Try clearing filters."}</p>
              <button
                onClick={() => {
                  setSearchInput('');
                  setLocationInput('');
                  setSelectedCategory('All');
                }}
                className="btn btn-secondary mt-3"
              >
                {t('events_clear_filters') || 'Clear Filters'}
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {events.map((event) => (
                <div key={event._id} className="col-md-6 col-lg-4">
                  <div 
                    className="card h-100 border-0 shadow-sm transition-all"
                    onClick={() => setSelectedEvent(event)}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: '1px solid var(--border-glass)'
                    }}
                  >
                    <div style={{ position: 'relative', height: '180px', background: '#1e293b' }}>
                      {event.images && event.images.length > 0 ? (
                        <img 
                          src={event.images[0]} 
                          alt={event.title}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      ) : (
                        <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-muted" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          <span style={{ fontSize: '3rem' }}>🎉</span>
                        </div>
                      )}
                      {/* Price badge */}
                      <span 
                        className="position-absolute"
                        style={{
                          top: '12px',
                          right: '12px',
                          background: 'rgba(0,0,0,0.7)',
                          backdropFilter: 'blur(5px)',
                          color: event.price === 0 ? 'var(--accent-success)' : '#ffffff',
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          letterSpacing: '0.04em'
                        }}
                      >
                        {getEventPriceLabel(event.price)}
                      </span>
                    </div>

                    <div className="card-body p-4 d-flex flex-column" style={{ color: 'var(--text-main)' }}>
                      <div className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)' }}>
                        <Tag size={12} />
                        <span className="fw-bold text-uppercase">{event.category}</span>
                        {event.subCategory && (
                          <>
                            <span>•</span>
                            <span>{getSubcategoryLabel(event.subCategory)}</span>
                          </>
                        )}
                      </div>

                      <h4 className="card-title fw-bold mb-3 text-truncate" style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>
                        {event.title}
                      </h4>

                      <div className="space-y-2 mb-4" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                        <div className="d-flex align-items-center gap-2">
                          <Calendar size={14} style={{ color: 'var(--accent-primary)' }} />
                          <span>{formatDate(event.eventDate)}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Clock size={14} style={{ color: 'var(--accent-primary)' }} />
                          <span>{event.eventTime}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <MapPin size={14} style={{ color: 'var(--accent-secondary)' }} />
                          <span className="text-truncate">{event.location} - {event.address || 'Venue TBA'}</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-3 border-top d-flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <a 
                          href={`tel:${event.ownerPhone}`} 
                          className="btn btn-success flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2"
                          style={{ fontSize: '0.85rem' }}
                        >
                          <Phone size={14} /> {t('events_call') || 'Call Organizer'}
                        </a>
                        <a 
                          href={`sms:${event.ownerPhone}?body=Hi, I am interested in your event: ${event.title}`} 
                          className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2"
                          style={{ fontSize: '0.85rem' }}
                        >
                          <MessageCircle size={14} /> {t('events_sms') || 'SMS Host'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* EVENT DETAILED MODAL */}
      {selectedEvent && (
        <div className="modal-overlay" style={{ zIndex: 1100 }} onClick={() => setSelectedEvent(null)}>
          <div 
            className="glass-panel modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '850px',
              width: '95%',
              padding: 0,
              overflow: 'hidden',
              borderRadius: '16px',
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-card)'
            }}
          >
            {/* Header image / Banner */}
            <div style={{ position: 'relative', height: '55vh', minHeight: '300px', background: '#1e293b' }}>
              {selectedEvent.images && selectedEvent.images.length > 0 ? (
                <img 
                  src={selectedEvent.images[0]} 
                  alt={selectedEvent.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-muted">
                  <span style={{ fontSize: '4rem' }}>🎉</span>
                </div>
              )}
              
              <button 
                onClick={() => setSelectedEvent(null)}
                className="position-absolute"
                style={{
                  top: '16px',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.6)',
                  border: 'none',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>

              <span 
                className="position-absolute"
                style={{
                  bottom: '16px',
                  right: '16px',
                  background: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(5px)',
                  color: selectedEvent.price === 0 ? 'var(--accent-success)' : '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold'
                }}
              >
                {t('price') || 'Price'}: {getEventPriceLabel(selectedEvent.price)}
              </span>
            </div>

            <div className="p-4" style={{ color: 'var(--text-main)' }}>
              <div className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)' }}>
                <Tag size={14} />
                <span className="fw-bold text-uppercase">{selectedEvent.category}</span>
                {selectedEvent.subCategory && (
                  <>
                    <span>•</span>
                    <span>{getSubcategoryLabel(selectedEvent.subCategory)}</span>
                  </>
                )}
              </div>

              <h2 className="fw-bold mb-4" style={{ fontSize: '1.6rem', color: 'var(--text-main)' }}>{selectedEvent.title}</h2>

              {/* Event details block */}
              <div className="row g-3 mb-4 p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', fontSize: '0.92rem' }}>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2 text-secondary">
                    <Calendar size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span>{t('events_date') || 'Date'}: <strong>{formatDate(selectedEvent.eventDate)}</strong></span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2 text-secondary">
                    <Clock size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span>{t('events_time') || 'Time'}: <strong>{selectedEvent.eventTime}</strong></span>
                  </div>
                </div>
                <div className="col-12 border-top pt-2 mt-2">
                  <div className="d-flex align-items-start gap-2 text-secondary">
                    <MapPin size={14} style={{ color: 'var(--accent-secondary)', marginTop: '2px' }} />
                    <span>
                      {t('events_venue') || 'Location'}:{' '}
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${selectedEvent.address || ''} ${selectedEvent.location || ''}`.trim()
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ 
                          color: 'var(--accent-primary)', 
                          textDecoration: 'underline', 
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                        title="Open in Google Maps"
                      >
                        {selectedEvent.location}{selectedEvent.address ? ` (${selectedEvent.address})` : ' - Venue TBA'}
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold mb-2">{t('events_details_title') || 'Description'}</h5>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
                  {selectedEvent.description}
                </p>
              </div>

              <div className="border-top pt-4">
                <h5 className="fw-bold mb-2">{t('events_hosted_by') || 'Organizer Contact Details'}</h5>
                {(selectedEvent.organizerName || (selectedEvent.ownerName && selectedEvent.ownerName !== 'Super Admin')) && (
                  <p className="text-secondary small mb-3">
                    Organized by: <strong>{selectedEvent.organizerName || selectedEvent.ownerName}</strong>
                  </p>
                )}
                <div className="d-flex gap-2">
                  <a 
                    href={`tel:${selectedEvent.organizerPhone || selectedEvent.ownerPhone}`} 
                    className="btn btn-success flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold"
                    title={`Call: ${selectedEvent.organizerPhone || selectedEvent.ownerPhone}`}
                    onMouseEnter={(e) => {
                      const p = selectedEvent.organizerPhone || selectedEvent.ownerPhone;
                      if (p) e.currentTarget.lastChild.textContent = ` Call: ${p}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.lastChild.textContent = ` ${t('events_call') || 'Call Organizer'}`;
                    }}
                  >
                    <Phone size={16} /> {t('events_call') || 'Call Organizer'}
                  </a>
                  <a 
                    href={`sms:${selectedEvent.organizerPhone || selectedEvent.ownerPhone}?body=Hi, I am interested in your event: ${selectedEvent.title}`} 
                    className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold"
                    title={`SMS: ${selectedEvent.organizerPhone || selectedEvent.ownerPhone}`}
                    onMouseEnter={(e) => {
                      const p = selectedEvent.organizerPhone || selectedEvent.ownerPhone;
                      if (p) e.currentTarget.lastChild.textContent = ` SMS: ${p}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.lastChild.textContent = ` ${t('events_sms') || 'SMS Host'}`;
                    }}
                  >
                    <MessageCircle size={16} /> {t('events_sms') || 'SMS Host'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;



