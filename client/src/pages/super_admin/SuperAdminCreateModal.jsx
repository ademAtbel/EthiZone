import React, { useState, useEffect, useRef } from 'react';

// Dynamic Subcategory Maps
const EVENT_SUBCATEGORIES = {
  'Entertainment': ['Concerts', 'Live Music', 'Standup Comedy', 'Festivals', 'Movie Screenings', 'Nightlife Party'],
  'Arts & Culture': ['Museum Exhibits', 'Theater & Plays', 'Painting & Fine Art', 'Art Galleries', 'Cultural Performance'],
  'Religious': ['Spiritual Gatherings', 'Church Service', 'Mosque Service', 'Prayer Conference'],
  'Social': ['Meetups & Networking', 'Parties & Mixers', 'Speed Dating', 'Reunions'],
  'Educational': ['Conferences', 'Workshops & Seminars', 'Webinars', 'Panel Discussions'],
  'Sports': ['Football Matches', 'Basketball Games', 'Tournaments', 'Marathons', 'Fitness Events'],
  'Charity': ['Fundraisers', 'Volunteer Opportunities', 'Auctions', 'Benefit Gala']
};

const STORE_CATEGORIES = {
  'Grocery & Supermarket': ['Fresh Produce', 'Dairy & Eggs', 'Beverages', 'Spices & Grains', 'Packaged Goods'],
  'Electronics & Tech': ['Smartphones & Tablets', 'Laptops & Computers', 'Home Appliances', 'Accessories', 'Audio & Sound'],
  'Boutique & Fashion': ['Men\'s Wear', 'Women\'s Apparel', 'Shoes & Footwear', 'Bags & Accessories', 'Jewelry'],
  'Liquor & Spirits': ['Wine & Champagne', 'Whiskey & Spirits', 'Craft Beer', 'Traditional Ethiopian Drinks'],
  'Pharmacy & Health': ['Prescription Medicines', 'Vitamins & Supplements', 'Personal Care', 'First Aid'],
  'Furniture & Living': ['Living Room Sets', 'Bedroom Suites', 'Office Furniture', 'Home Decor'],
  'Automotive & Parts': ['Spare Parts', 'Tires & Wheels', 'Car Care & Oils', 'Accessories']
};

const SERVICE_CATEGORIES = {
  'Legal & Law': ['Corporate & Business Law', 'Family & Civil Law', 'Property & Real Estate Law', 'Tax Advisory'],
  'Tax & Accounting': ['Tax Preparation & Filing', 'Bookkeeping & Payroll', 'Financial Audits', 'Business Registration'],
  'Clinic & Health': ['General Practice', 'Dental Care', 'Dermatology', 'Pediatrics', 'Eye Care & Optometry'],
  'Beauty & Salon': ['Hair Styling & Cut', 'Nail Care & Spa', 'Skincare & Facials', 'Massage Therapy'],
  'Cleaning Services': ['Residential House Cleaning', 'Commercial Office Cleaning', 'Carpet & Upholstery', 'Post-Construction'],
  'Handyman & Repair': ['Plumbing Repair', 'Electrical Wiring', 'Carpentry & Woodwork', 'Appliance Repair', 'Painting & Drywall']
};

const LISTING_SUBCATEGORIES = {
  'store_product': ['Electronics & Tech', 'Boutique & Fashion', 'Home & Living', 'Groceries & Foods', 'Health & Beauty'],
  'personal_item': ['Used Electronics', 'Pre-owned Fashion', 'Books & Media', 'Sports Equipment', 'Furniture'],
  'service': ['Consulting', 'Design & Web', 'Home Repair', 'Cleaning', 'Tutoring & Classes'],
  'handyman_skill': ['Plumbing', 'Electrical', 'Painting', 'General Maintenance', 'Carpentry'],
  'house': ['Apartment for Rent', 'House for Sale', 'Commercial Space', 'Land Lot', 'Villa'],
  'car': ['Sedan', 'SUV', 'Truck / Pickup', 'Vehicle Rental', 'Motorcycle'],
  'job_opening': ['Full-Time', 'Part-Time', 'Contract / Freelance', 'Remote Job']
};

// Preset Stock Images for Instant Selection
const SAMPLE_EVENT_PRESETS = [
  { label: '🎉 Festival Concert', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80' },
  { label: '🎭 Cultural Show', url: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80' },
  { label: '🎤 Conference Expo', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80' }
];

const SAMPLE_STORE_PRESETS = [
  { label: '🏬 Grocery Store', url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80' },
  { label: '📱 Electronics Shop', url: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80' },
  { label: '👗 Boutique Salon', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80' }
];

const SAMPLE_LISTING_PRESETS = [
  { label: '💻 Laptop', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80' },
  { label: '🧥 Fashion Jacket', url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80' },
  { label: '🏡 Villa Property', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' }
];

export default function SuperAdminCreateModal({ isOpen, onClose, onSuccess }) {
  const [entityType, setEntityType] = useState('store'); // 'store', 'service', 'event', 'listing', 'category'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Store / Service state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Ethizone@Ethiopia.2019');
  const [phone, setPhone] = useState('+251900000000');
  const [role, setRole] = useState('business');
  const [storeName, setStoreName] = useState('');
  const [businessType, setBusinessType] = useState('store');
  const [category, setCategory] = useState('Grocery & Supermarket');
  const [subCategory, setSubCategory] = useState('Fresh Produce');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [storeImage, setStoreImage] = useState('');
  const [verificationBadge, setVerificationBadge] = useState(true);

  // Event state
  const dateInputRef = useRef(null);
  const getTodayFormatted = () => new Date().toISOString().split('T')[0];

  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventCategory, setEventCategory] = useState('Arts & Culture');
  const [eventSubCategory, setEventSubCategory] = useState('Theater & Plays');
  const [eventDate, setEventDate] = useState(getTodayFormatted());
  const [eventTime, setEventTime] = useState('18:00');
  const [eventLocation, setEventLocation] = useState('Addis Ababa');
  const [eventAddress, setEventAddress] = useState('');
  const [eventPrice, setEventPrice] = useState('0');
  const [eventImage, setEventImage] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [organizerPhone, setOrganizerPhone] = useState('');
  const [organizerEmail, setOrganizerEmail] = useState('');

  // Listing state
  const [listingTitle, setListingTitle] = useState('');
  const [listingDesc, setListingDesc] = useState('');
  const [listingType, setListingType] = useState('store_product');
  const [listingCategory, setListingCategory] = useState('Boutique & Fashion');
  const [listingSubCategory, setListingSubCategory] = useState('Women\'s Apparel');
  const [listingPrice, setListingPrice] = useState('0');
  const [listingImage, setListingImage] = useState('');

  // Category state
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatType, setNewCatType] = useState('store');

  // AUTO-UPDATE SUBCATEGORY WHEN CATEGORY CHANGES (Event)
  useEffect(() => {
    const available = EVENT_SUBCATEGORIES[eventCategory] || [];
    if (available.length > 0) {
      setEventSubCategory(available[0]);
    }
  }, [eventCategory]);

  // AUTO-UPDATE SUBCATEGORY WHEN CATEGORY CHANGES (Store / Service)
  useEffect(() => {
    const categoryMap = entityType === 'service' ? SERVICE_CATEGORIES : STORE_CATEGORIES;
    const available = categoryMap[category] || [];
    if (available.length > 0) {
      setSubCategory(available[0]);
    }
  }, [category, entityType]);

  // AUTO-POPULATE DATE IF EMPTY WHEN EVENT TAB IS SELECTED
  useEffect(() => {
    if (entityType === 'event' && !eventDate) {
      setEventDate(getTodayFormatted());
    }
  }, [entityType, eventDate]);

  // AUTO-UPDATE SUBCATEGORY WHEN LISTING TYPE CHANGES
  useEffect(() => {
    const available = LISTING_SUBCATEGORIES[listingType] || [];
    if (available.length > 0) {
      setListingSubCategory(available[0]);
    }
  }, [listingType]);

  if (!isOpen) return null;

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      let endpoint = '';
      let payload = {};

      if (entityType === 'store' || entityType === 'service') {
        endpoint = '/api/admin/create-user';
        payload = {
          username: username || storeName,
          email,
          password,
          phone,
          role: entityType === 'service' ? 'handyman' : role,
          storeName: storeName || username,
          businessType: entityType === 'service' ? 'service' : businessType,
          category,
          subCategory,
          description,
          address,
          storeImage,
          verificationBadge
        };
      } else if (entityType === 'event') {
        endpoint = '/api/admin/create-event';
        payload = {
          title: eventTitle,
          description: eventDesc,
          category: eventCategory,
          subCategory: eventSubCategory,
          eventDate,
          eventTime,
          location: eventLocation,
          address: eventAddress,
          price: parseFloat(eventPrice) || 0,
          images: eventImage ? [eventImage] : [],
          organizerName,
          organizerPhone,
          organizerEmail
        };
      } else if (entityType === 'listing') {
        endpoint = '/api/admin/create-listing';
        payload = {
          title: listingTitle,
          description: listingDesc,
          type: listingType,
          category: `${listingCategory} > ${listingSubCategory}`,
          price: parseFloat(listingPrice) || 0,
          images: listingImage ? [listingImage] : []
        };
      } else if (entityType === 'category') {
        endpoint = '/api/admin/categories';
        payload = {
          name: newCatName,
          description: newCatDesc,
          type: newCatType
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to create entity.');
      }

      setMessage({ type: 'success', text: '✅ Entity created successfully! Redirecting to Super Admin...' });
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
        window.location.href = '/super-admin';
      }, 800);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: `❌ ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      padding: '20px'
    }}>
      {/* LUXURY WHITE, GOLD & BLACK CONTAINER */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '2px solid #D4AF37',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '30px',
        boxShadow: '0 0 35px rgba(212, 175, 55, 0.3), 0 20px 50px rgba(0, 0, 0, 0.3)',
        color: '#000000'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #D4AF37', paddingBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.5px' }}>
              ✨ Super Admin Quick Creation
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#000000' }}>
              Create and publish Stores, Services, Events, Listings, and Categories.
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: '#ffffff',
              border: '1px solid #D4AF37',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#000000',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            ✕
          </button>
        </div>

        {/* Status Notification */}
        {message.text && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            backgroundColor: '#ffffff',
            border: '2px solid #D4AF37',
            color: '#000000',
            fontWeight: 600
          }}>
            {message.text}
          </div>
        )}

        {/* Entity Selector Tabs (Gold, Black, White) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: '8px',
          marginBottom: '24px',
          backgroundColor: '#000000',
          padding: '6px',
          borderRadius: '10px',
          border: '1px solid #D4AF37'
        }}>
          {[
            { key: 'store', label: '🏬 Store' },
            { key: 'service', label: '🛠️ Service Provider' },
            { key: 'event', label: '🎉 Event' },
            { key: 'listing', label: '🛍️ Item / Listing' },
            { key: 'category', label: '🗂️ Category' }
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setEntityType(tab.key);
                if (tab.key === 'store') setCategory('Grocery & Supermarket');
                if (tab.key === 'service') setCategory('Legal & Law');
              }}
              style={{
                padding: '10px 8px',
                borderRadius: '6px',
                border: entityType === tab.key ? '1px solid #FFD700' : 'none',
                background: entityType === tab.key ? '#D4AF37' : 'transparent',
                color: entityType === tab.key ? '#000000' : '#ffffff',
                fontWeight: entityType === tab.key ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: entityType === tab.key ? '0 2px 10px rgba(212, 175, 55, 0.4)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {/* STORE & SERVICE CREATION FORM */}
          {(entityType === 'store' || entityType === 'service') && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Contact / Owner Name *</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. Abebe Bikila"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    {entityType === 'service' ? 'Service / Business Name *' : 'Store Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder={entityType === 'service' ? 'e.g. Apex Law Firm' : 'e.g. Fresh Grocery Mart'}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vendor@ethizone.com"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251900000000"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Password *</label>
                  <input
                    type="text"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Account Role *</label>
                  <select
                    value={entityType === 'service' ? 'handyman' : role}
                    onChange={(e) => setRole(e.target.value)}
                    style={inputStyle}
                    disabled={entityType === 'service'}
                  >
                    <option value="business" style={optionStyle}>Store / Business</option>
                    <option value="handyman" style={optionStyle}>Service Provider / Handyman</option>
                    <option value="individual" style={optionStyle}>Individual Seller</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Business Type *</label>
                  <select
                    value={entityType === 'service' ? 'service' : businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    style={inputStyle}
                    disabled={entityType === 'service'}
                  >
                    <option value="store" style={optionStyle}>Store / Retail</option>
                    <option value="service" style={optionStyle}>Service Provider</option>
                    <option value="real_estate" style={optionStyle}>Real Estate</option>
                    <option value="automotive" style={optionStyle}>Automotive</option>
                    <option value="organization" style={optionStyle}>Organization</option>
                  </select>
                </div>
              </div>

              {/* DYNAMIC CATEGORY & AUTOMATIC SUBCATEGORY SELECTION */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={inputStyle}
                  >
                    {Object.keys(entityType === 'service' ? SERVICE_CATEGORIES : STORE_CATEGORIES).map(cat => (
                      <option key={cat} value={cat} style={optionStyle}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Subcategory (Auto-Updated) *</label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    style={inputStyle}
                  >
                    {((entityType === 'service' ? SERVICE_CATEGORIES[category] : STORE_CATEGORIES[category]) || []).map(sub => (
                      <option key={sub} value={sub} style={optionStyle}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Location / Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Bole Road, Addis Ababa"
                  style={inputStyle}
                />
              </div>

              {/* DUAL IMAGE PICKER FOR STORE/SERVICE */}
              <ImagePickerField
                label="Store Banner / Logo Image"
                value={storeImage}
                onChange={setStoreImage}
                presets={SAMPLE_STORE_PRESETS}
              />

              <div>
                <label style={labelStyle}>Description</label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter business bio, overview or services..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="verificationBadge"
                  checked={verificationBadge}
                  onChange={(e) => setVerificationBadge(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#b45309', cursor: 'pointer' }}
                />
                <label htmlFor="verificationBadge" style={{ fontSize: '0.9rem', color: '#0f172a', cursor: 'pointer' }}>
                  Grant Super Admin Verified Badge (✓ Verified)
                </label>
              </div>
            </>
          )}

          {/* EVENT CREATION FORM */}
          {entityType === 'event' && (
            <>
              <div>
                <label style={labelStyle}>Event Title *</label>
                <input
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. New Year Eve Concert 2026"
                  style={inputStyle}
                />
              </div>

              {/* ORGANIZER CONTACT DETAILS (Phone is MUST, Email if available) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Organizer Name</label>
                  <input
                    type="text"
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    placeholder="e.g. Addis Events"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Organizer Phone * (Must)</label>
                  <input
                    type="text"
                    required
                    value={organizerPhone}
                    onChange={(e) => setOrganizerPhone(e.target.value)}
                    placeholder="e.g. +251911223344"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Organizer Email (If available)</label>
                  <input
                    type="email"
                    value={organizerEmail}
                    onChange={(e) => setOrganizerEmail(e.target.value)}
                    placeholder="e.g. info@organizer.com"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* DYNAMIC EVENT CATEGORY & AUTO-UPDATED SUBCATEGORY */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Category *</label>
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value)}
                    style={inputStyle}
                  >
                    {Object.keys(EVENT_SUBCATEGORIES).map(cat => (
                      <option key={cat} value={cat} style={optionStyle}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Subcategory (Auto-Updated) *</label>
                  <select
                    value={eventSubCategory}
                    onChange={(e) => setEventSubCategory(e.target.value)}
                    style={inputStyle}
                  >
                    {(EVENT_SUBCATEGORIES[eventCategory] || []).map(sub => (
                      <option key={sub} value={sub} style={optionStyle}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Event Date (Click to Edit) *</label>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <input
                      ref={dateInputRef}
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      onClick={() => {
                        try { if (dateInputRef.current && dateInputRef.current.showPicker) dateInputRef.current.showPicker(); } catch (err) {}
                      }}
                      style={{ ...inputStyle, cursor: 'pointer', flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        try { if (dateInputRef.current && dateInputRef.current.showPicker) dateInputRef.current.showPicker(); } catch (err) {}
                      }}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #FFD700',
                        backgroundColor: '#D4AF37',
                        color: '#000000',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                      title="Open Calendar Datepicker"
                    >
                      📅 Pick Date
                    </button>
                  </div>
                  {/* Quick Date Presets */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                    <button
                      type="button"
                      onClick={() => setEventDate(getTodayFormatted())}
                      style={{ padding: '3px 8px', borderRadius: '4px', border: '1px solid #D4AF37', background: '#ffffff', color: '#000000', fontSize: '0.7rem', cursor: 'pointer' }}
                    >
                      📅 Today
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const tom = new Date();
                        tom.setDate(tom.getDate() + 1);
                        setEventDate(tom.toISOString().split('T')[0]);
                      }}
                      style={{ padding: '3px 8px', borderRadius: '4px', border: '1px solid #D4AF37', background: '#ffffff', color: '#000000', fontSize: '0.7rem', cursor: 'pointer' }}
                    >
                      📅 Tomorrow
                    </button>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Time *</label>
                  <input
                    type="text"
                    required
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    placeholder="e.g. 18:00"
                    style={inputStyle}
                  />
                  {/* Quick Time Presets */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {['10:00', '14:00', '18:00', '20:00'].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setEventTime(t)}
                        style={{ padding: '3px 8px', borderRadius: '4px', border: '1px solid #D4AF37', background: eventTime === t ? '#D4AF37' : '#ffffff', color: '#000000', fontSize: '0.7rem', cursor: 'pointer', fontWeight: eventTime === t ? 700 : 500 }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Price ($ / ETB)</label>
                  <input
                    type="number"
                    value={eventPrice}
                    onChange={(e) => setEventPrice(e.target.value)}
                    placeholder="0 for Free"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Location City *</label>
                  <input
                    type="text"
                    required
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="e.g. Addis Ababa"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Venue Address</label>
                  <input
                    type="text"
                    value={eventAddress}
                    onChange={(e) => setEventAddress(e.target.value)}
                    placeholder="e.g. Millennium Hall"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* DUAL IMAGE PICKER FOR EVENT COVER IMAGE */}
              <ImagePickerField
                label="Cover Image (Upload from PC or enter URL)"
                value={eventImage}
                onChange={setEventImage}
                presets={SAMPLE_EVENT_PRESETS}
              />

              <div>
                <label style={labelStyle}>Event Description *</label>
                <textarea
                  rows="3"
                  required
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  placeholder="Describe the event, schedule, and highlights..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
            </>
          )}

          {/* LISTING CREATION FORM */}
          {entityType === 'listing' && (
            <>
              <div>
                <label style={labelStyle}>Item / Listing Title *</label>
                <input
                  type="text"
                  required
                  value={listingTitle}
                  onChange={(e) => setListingTitle(e.target.value)}
                  placeholder="e.g. Vintage Leather Jacket"
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Listing Type *</label>
                  <select
                    value={listingType}
                    onChange={(e) => setListingType(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="store_product" style={optionStyle}>Store Product</option>
                    <option value="personal_item" style={optionStyle}>Personal Item</option>
                    <option value="service" style={optionStyle}>Service Catalog</option>
                    <option value="handyman_skill" style={optionStyle}>Handyman Skill</option>
                    <option value="house" style={optionStyle}>Real Estate / House</option>
                    <option value="car" style={optionStyle}>Vehicle / Car</option>
                    <option value="job_opening" style={optionStyle}>Job Opening</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Subcategory (Auto-Updated) *</label>
                  <select
                    value={listingSubCategory}
                    onChange={(e) => setListingSubCategory(e.target.value)}
                    style={inputStyle}
                  >
                    {(LISTING_SUBCATEGORIES[listingType] || []).map(sub => (
                      <option key={sub} value={sub} style={optionStyle}>{sub}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Price ($)</label>
                  <input
                    type="number"
                    value={listingPrice}
                    onChange={(e) => setListingPrice(e.target.value)}
                    placeholder="0.00"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* DUAL IMAGE PICKER FOR LISTING IMAGE */}
              <ImagePickerField
                label="Item Image (Upload from PC or enter URL)"
                value={listingImage}
                onChange={setListingImage}
                presets={SAMPLE_LISTING_PRESETS}
              />

              <div>
                <label style={labelStyle}>Description *</label>
                <textarea
                  rows="3"
                  required
                  value={listingDesc}
                  onChange={(e) => setListingDesc(e.target.value)}
                  placeholder="Enter detailed description of the item or service..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
            </>
          )}

          {/* CATEGORY CREATION FORM */}
          {entityType === 'category' && (
            <>
              <div>
                <label style={labelStyle}>Category Name *</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Organic Groceries"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Target Section Type *</label>
                <select
                  value={newCatType}
                  onChange={(e) => setNewCatType(e.target.value)}
                  style={inputStyle}
                >
                  <option value="store" style={optionStyle}>🏬 Store Directory</option>
                  <option value="handyman" style={optionStyle}>🛠️ Service / Handyman</option>
                  <option value="event" style={optionStyle}>🎉 Events</option>
                  <option value="item" style={optionStyle}>🛍️ Personal Items & Products</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Description</label>
                <textarea
                  rows="3"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Enter category description..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
            </>
          )}

          {/* Modal Actions (Gold, White & Black Buttons) */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px', borderTop: '1px solid #D4AF37', paddingTop: '20px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 22px',
                borderRadius: '8px',
                border: '1px solid #000000',
                background: '#ffffff',
                color: '#000000',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px 28px',
                borderRadius: '8px',
                border: '1px solid #FFD700',
                background: '#D4AF37',
                color: '#000000',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 4px 16px rgba(212, 175, 55, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <span>➕</span> {loading ? 'Creating...' : 'Create Entity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// REUSABLE IMAGE PICKER COMPONENT (PC FILE UPLOAD + URL + PRESET GALLERY + PREVIEW)
function ImagePickerField({ label = "Image", value, onChange, presets = [] }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      
      {/* File Upload Button + URL Input */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid #FFD700',
            backgroundColor: '#D4AF37',
            color: '#000000',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
            boxShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'
          }}
        >
          📁 Choose Image from PC
        </button>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL (https://...)"
          style={{ ...inputStyle, flex: 1, minWidth: '220px' }}
        />
      </div>

      {/* Quick Select Presets */}
      {presets.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.75rem', color: '#000000', alignSelf: 'center', fontWeight: 600 }}>Stock Presets:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(p.url)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid #D4AF37',
                background: value === p.url ? '#D4AF37' : '#ffffff',
                color: '#000000',
                fontSize: '0.75rem',
                fontWeight: value === p.url ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Live Thumbnail Preview */}
      {value && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', padding: '8px 12px', border: '1px solid #D4AF37', borderRadius: '8px', background: '#ffffff' }}>
          <img
            src={value}
            alt="Preview"
            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #D4AF37' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#D4AF37', fontWeight: 700 }}>✓ Image Selected</p>
            <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#000000', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {value.startsWith('data:') ? 'Selected from PC local storage' : value}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#000000',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

// LUXURY GOLD, WHITE & BLACK STYLING TOKENS
const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  color: '#000000',
  fontWeight: 600,
  marginBottom: '6px'
};

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '8px',
  border: '1px solid #D4AF37',
  backgroundColor: '#ffffff',
  color: '#000000',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box'
};

const optionStyle = {
  backgroundColor: '#ffffff',
  color: '#000000'
};
