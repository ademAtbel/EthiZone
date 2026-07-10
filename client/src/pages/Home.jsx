// Ultimate Master Marketplace - Home Page (Optimized for High Scale)
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ListingCard from '../components/ListingCard';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedType = searchParams.get('type') || '';
  const searchQuery = searchParams.get('query') || '';
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Sync local input state with URL parameter changes (e.g. when user clicks home/logo)
  useEffect(() => {
    setSearchInput(searchParams.get('query') || '');
  }, [searchParams]);

  // Fetch listing data based on queries
  const fetchListings = async (page = 1) => {
    try {
      setLoading(true);
      
      let url = `/api/listings?status=active&page=${page}&limit=20`;
      if (searchQuery) url += `&query=${encodeURIComponent(searchQuery)}`;
      if (selectedType) url += `&type=${encodeURIComponent(selectedType)}`;
      if (selectedCategory) url += `&category=${encodeURIComponent(selectedCategory)}`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      setListings(data);
      const pagesCount = parseInt(response.headers.get('X-Total-Pages')) || 1;
      setTotalPages(pagesCount);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load listings directory.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch listings dynamically whenever selected filters or search parameters change
  useEffect(() => {
    fetchListings(1);
  }, [searchParams, selectedCategory]);

  // Load categories dynamically when selected type changes
  useEffect(() => {
    if (selectedType === 'handyman_skill') {
      const handymanCategories = [
        { name: 'Plumbing' },
        { name: 'Electrical Work' },
        { name: 'Carpentry' },
        { name: 'Painting & Plastering' },
        { name: 'Roofing' },
        { name: 'HVAC & Heating' },
        { name: 'Appliance Repair' },
        { name: 'Gardening & Landscaping' },
        { name: 'Cleaning & Housekeeping' },
        { name: 'Locksmith & Security' },
        { name: 'Masonry & Tiling' }
      ];
      setCategories(handymanCategories);
      setSelectedCategory(''); 
      return;
    }

    let typeQuery = '';
    if (selectedType === 'store_product') typeQuery = '?type=store';
    if (selectedType === 'service') typeQuery = '?type=service';
    if (selectedType === 'job_opening') typeQuery = '?type=organization';
    if (selectedType === 'house') typeQuery = '?type=real_estate';
    if (selectedType === 'car') typeQuery = '?type=automotive';

    fetch(`/api/categories${typeQuery}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
          setSelectedCategory(''); 
        }
      })
      .catch(() => {
        const fallbacks = [
          { name: 'Boutique' },
          { name: 'Pharmacy' },
          { name: 'Law Office' },
          { name: 'Tax Office' },
          { name: 'Liquor Store' },
          { name: 'Residential Homes' },
          { name: 'Rental Apartments' },
          { name: 'Used Car Dealership' },
          { name: 'Car Rental Service' }
        ];
        setCategories(fallbacks);
      });
  }, [selectedType]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput) {
      newParams.set('query', searchInput);
    } else {
      newParams.delete('query');
    }
    setSearchParams(newParams);
  };

  const handleTypeSelect = (type) => {
    const newParams = new URLSearchParams(searchParams);
    if (newParams.get('type') === type) {
      newParams.delete('type');
    } else {
      newParams.set('type', type);
    }
    setSearchParams(newParams);
  };

  const isLandingPage = !selectedType && !selectedCategory && !searchQuery;

  // Mock data fallbacks matching Listing schema for popular/featured sections
  const mockProducts = [
    {
      _id: 'mock-prod-1',
      title: 'Premium Cotton Tee',
      price: 29,
      type: 'store_product',
      category: 'Boutique',
      ownerName: 'Urban Wear',
      ownerPhone: '5713429228',
      images: ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80']
    },
    {
      _id: 'mock-prod-2',
      title: 'Athletic Sports Runner',
      price: 79,
      type: 'store_product',
      category: 'Boutique',
      ownerName: 'FitFoot',
      ownerPhone: '5713429228',
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80']
    },
    {
      _id: 'mock-prod-3',
      title: 'Vintage Gold Sunglasses',
      price: 49,
      type: 'store_product',
      category: 'Boutique',
      ownerName: 'Retro Spec',
      ownerPhone: '5713429228',
      images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80']
    },
    {
      _id: 'mock-prod-4',
      title: 'Daily Multi-Vitamins',
      price: 19,
      type: 'store_product',
      category: 'Pharmacy',
      ownerName: 'NatureCare',
      ownerPhone: '5713429228',
      images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80']
    }
  ];

  const mockCars = [
    {
      _id: 'mock-car-1',
      title: '2023 Tesla Model Y',
      price: 45000,
      type: 'car',
      category: 'Used Car Dealership',
      ownerName: 'Tesla Direct',
      ownerPhone: '5713429228',
      images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80'],
      metadata: { mileage: 5000, make: 'Tesla', model: 'Model Y', year: '2023' }
    },
    {
      _id: 'mock-car-2',
      title: '2021 BMW 3 Series',
      price: 32500,
      type: 'car',
      category: 'Used Car Dealership',
      ownerName: 'BMW Center',
      ownerPhone: '5713429228',
      images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&q=80'],
      metadata: { mileage: 22000, make: 'BMW', model: '3 Series', year: '2021' }
    },
    {
      _id: 'mock-car-3',
      title: '2022 Ford Mustang',
      price: 28900,
      type: 'car',
      category: 'Car Rental Service',
      ownerName: 'Ford Agency',
      ownerPhone: '5713429228',
      images: ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=400&q=80'],
      metadata: { mileage: 12500, make: 'Ford', model: 'Mustang', year: '2022' }
    },
    {
      _id: 'mock-car-4',
      title: 'Porsche 911 Carrera',
      price: 115000,
      type: 'car',
      category: 'Used Car Dealership',
      ownerName: 'Elite Motors',
      ownerPhone: '5713429228',
      images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80'],
      metadata: { mileage: 1200, make: 'Porsche', model: '911 Carrera', year: '2023' }
    }
  ];

  const mockHouses = [
    {
      _id: 'mock-house-1',
      title: 'Modern Villa with Pool',
      price: 2500000,
      type: 'house',
      category: 'Residential Homes',
      ownerName: 'Beverly Agency',
      ownerPhone: '5713429228',
      images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80'],
      metadata: { bedrooms: '5', bathrooms: '6', propertyType: 'House' }
    },
    {
      _id: 'mock-house-2',
      title: 'Downtown Luxury Penthouse',
      price: 5000,
      type: 'house',
      category: 'Rental Apartments',
      ownerName: 'NYC Rentals',
      ownerPhone: '5713429228',
      images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80'],
      metadata: { bedrooms: '2', bathrooms: '2', propertyType: 'Penthouse' }
    },
    {
      _id: 'mock-house-3',
      title: 'Cozy Suburban Home',
      price: 450000,
      type: 'house',
      category: 'Residential Homes',
      ownerName: 'Austin Realtors',
      ownerPhone: '5713429228',
      images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80'],
      metadata: { bedrooms: '3', bathrooms: '2', propertyType: 'House' }
    },
    {
      _id: 'mock-house-4',
      title: 'Oceanfront Condo',
      price: 850000,
      type: 'house',
      category: 'Rental Apartments',
      ownerName: 'Miami Condos',
      ownerPhone: '5713429228',
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80'],
      metadata: { bedrooms: '2', bathrooms: '2', propertyType: 'Condo' }
    }
  ];

  const mockJobs = [
    {
      _id: 'mock-job-1',
      title: 'Senior React Developer',
      price: null,
      type: 'job_opening',
      category: 'Tech Corporation',
      ownerName: 'Technical Solutions',
      ownerPhone: '5713429228',
      description: 'Build state of the art React applications. Requirements: 5+ years experience, proficiency in MERN Stack, Redux.',
      images: [],
      metadata: { jobRequirements: ['5+ years experience', 'React', 'Node.js'] }
    },
    {
      _id: 'mock-job-2',
      title: 'UI/UX Product Designer',
      price: null,
      type: 'job_opening',
      category: 'Tech Corporation',
      ownerName: 'Creative Flow Studio',
      ownerPhone: '5713429228',
      description: 'Design beautiful, premium web interfaces. Requirements: Figma proficiency, user research portfolio.',
      images: [],
      metadata: { jobRequirements: ['Figma', 'Prototyping', 'Wireframing'] }
    },
    {
      _id: 'mock-job-3',
      title: 'Marketing Manager',
      price: null,
      type: 'job_opening',
      category: 'Non-Profit Org',
      ownerName: 'Growth Corp',
      ownerPhone: '5713429228',
      description: 'Scale digital marketing campaigns. Requirements: SEO expertise, Google Ads management.',
      images: [],
      metadata: { jobRequirements: ['SEO', 'Google Ads', 'Content Strategy'] }
    },
    {
      _id: 'mock-job-4',
      title: 'Customer Success Rep',
      price: null,
      type: 'job_opening',
      category: 'Tech Corporation',
      ownerName: 'Cloud SaaS Inc',
      ownerPhone: '5713429228',
      description: 'Provide outstanding customer care. Requirements: Excellent communication, Zendesk experience.',
      images: [],
      metadata: { jobRequirements: ['Zendesk', 'Support ticketing', 'Communication'] }
    }
  ];

  // Helper to dynamically fill grid lists combining real database records first, then mock fallbacks
  const getDynamicItems = (dbItems, mockItems, count = 4) => {
    const combined = [...dbItems, ...mockItems];
    return combined.slice(0, count);
  };

  const activeProducts = getDynamicItems(
    listings.filter(l => l.type === 'store_product' || l.type === 'personal_item'),
    mockProducts
  );

  const activeCars = getDynamicItems(
    listings.filter(l => l.type === 'car'),
    mockCars
  );

  const activeHouses = getDynamicItems(
    listings.filter(l => l.type === 'house'),
    mockHouses
  );

  const activeJobs = getDynamicItems(
    listings.filter(l => l.type === 'job_opening'),
    mockJobs
  );

  const mockProfessionals = [
    {
      _id: 'mock-prof-1',
      title: 'Architect',
      name: 'Sarah Jenkins',
      rating: '★ 4.9 (120 reviews)',
      images: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80']
    },
    {
      _id: 'mock-prof-2',
      title: 'Legal Consultant',
      name: 'David Chen',
      rating: '★ 4.8 (85 reviews)',
      images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80']
    },
    {
      _id: 'mock-prof-3',
      title: 'Interior Designer',
      name: 'Maria Rossi',
      rating: '★ 5.0 (210 reviews)',
      images: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80']
    },
    {
      _id: 'mock-prof-4',
      title: 'Web Developer',
      name: 'James Wilson',
      rating: '★ 4.9 (145 reviews)',
      images: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80']
    }
  ];

  const activeProfessionals = getDynamicItems(
    listings.filter(l => l.type === 'handyman_skill').map(l => ({
      _id: l._id,
      name: l.ownerName || 'Handyman Provider',
      title: l.category || 'Handyman Service',
      rating: '★ 5.0 (New)',
      images: l.images && l.images.length > 0 ? l.images : ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'],
      isReal: true,
      phone: l.ownerPhone
    })),
    mockProfessionals
  );

  // Client-side search and category filtering for real-time reactivity
  const filteredListings = listings.filter(item => {
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = !selectedType || item.type === selectedType;
    const matchesCategory = !selectedCategory || item.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="home-page-container">
      {/* Search Header Banner */}
      <section className="search-header-bar">
        <div className="container">
          <form onSubmit={handleSearchSubmit} className="search-bar-form">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products, discover stores, find services..."
              className="search-bar-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
        </div>
      </section>

      {isLandingPage ? (
        <div className="landing-page-content">
          {/* Hero Banner Section */}
          <section className="landing-hero container">
            <div className="hero-grid">
              <div className="hero-text-col">
                <h1>Everything You Need in One Marketplace</h1>
                <p>Shop products, discover stores, find services, browse houses, cars, jobs, and more on the world's most versatile ethical marketplace.</p>
                <div className="hero-btn-row">
                  <button onClick={() => handleTypeSelect('store_product')} className="btn-hero-shopping">Start Shopping</button>
                  <Link to="/register" className="btn-hero-seller">Become a Seller</Link>
                </div>
              </div>
              <div className="hero-img-col">
                <div className="hero-monitor-frame">
                  <img src="/hero_monitor.png" alt="Ethizone Mockup" />
                </div>
              </div>
            </div>
          </section>

          {/* Slogan Banner */}
          <section className="motto-banner">
            <div className="container">
              <span className="motto-num">99</span>
              <h2 className="motto-text">"ALL Buyers are Sellers"</h2>
              <a href="#manifesto" className="motto-link">MANIFESTO LINK</a>
            </div>
          </section>

          {/* Quick Navigation Pills */}
          <section className="quick-explore container">
            <h3 className="section-title-centered">Explore Ethizone</h3>
            <div className="explore-pills-row">
              <button onClick={() => handleTypeSelect('store_product')} className="explore-pill">🛍️ Marketplace</button>
              <button onClick={() => handleTypeSelect('service')} className="explore-pill">🗂️ Categories</button>
              <button onClick={() => handleTypeSelect('car')} className="explore-pill">🚗 Cars</button>
              <button onClick={() => handleTypeSelect('house')} className="explore-pill">🏠 Houses</button>
              <button onClick={() => handleTypeSelect('store_product')} className="explore-pill">🏬 Stores</button>
              <button onClick={() => handleTypeSelect('job_opening')} className="explore-pill">💼 Jobs</button>
              <button onClick={() => handleTypeSelect('handyman_skill')} className="explore-pill">🛠️ Hire Me</button>
              <button onClick={() => handleTypeSelect('service')} className="explore-pill">🗃️ Services</button>
            </div>
          </section>

          {/* Browse by Category Grid */}
          <section className="category-browse-grid container">
            <div className="section-header-row">
              <h3>Browse by Category</h3>
              <button onClick={() => handleTypeSelect('store_product')} className="btn-view-all">View All →</button>
            </div>
            <div className="grid-categories">
              {/* Left Large Card */}
              <div className="cat-card-large" onClick={() => handleTypeSelect('store_product')}>
                <div className="cat-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80" alt="Marketplace" />
                  <div className="cat-overlay">
                    <span className="cat-badge-tag">ACTIVE</span>
                    <h4>Marketplace</h4>
                  </div>
                </div>
              </div>
              {/* Right 4-card Grid */}
              <div className="cat-grid-small">
                <div className="cat-card-small" onClick={() => handleTypeSelect('car')}>
                  <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80" alt="Cars" />
                  <div className="cat-overlay-small">
                    <h4>Cars</h4>
                  </div>
                </div>
                <div className="cat-card-small" onClick={() => handleTypeSelect('house')}>
                  <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80" alt="Houses" />
                  <div className="cat-overlay-small">
                    <h4>Houses</h4>
                  </div>
                </div>
                <div className="cat-card-small" onClick={() => handleTypeSelect('job_opening')}>
                  <img src="https://images.unsplash.com/photo-1521737711867-e3b90473bd58?auto=format&fit=crop&w=400&q=80" alt="Jobs" />
                  <div className="cat-overlay-small">
                    <h4>Jobs</h4>
                  </div>
                </div>
                <div className="cat-card-small" onClick={() => handleTypeSelect('service')}>
                  <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80" alt="Services" />
                  <div className="cat-overlay-small">
                    <h4>Services</h4>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Marketplace */}
          <section className="featured-section container">
            <h3 className="section-title">Popular in Marketplace</h3>
            <div className="horizontal-scroll-row">
              {activeProducts.map(item => {
                const ownerSlug = item.ownerName ? item.ownerName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-') : '';
                return (
                  <div key={item._id} className="home-featured-card">
                    {item.images && item.images[0] ? (
                      <img src={item.images[0]} alt={item.title} className="featured-card-avatar" />
                    ) : (
                      <div className="featured-card-icon">🛍️</div>
                    )}
                    <div style={{ width: '100%' }}>
                      <h5>{item.title}</h5>
                      <span className="featured-card-subtitle">{item.category || 'Product'}</span>
                      <span className="featured-card-price">${item.price}</span>
                    </div>
                    <Link to={`/store/${ownerSlug}`} className="btn-featured-card-action">View Details</Link>
                  </div>
                );
              })}
            </div>
          </section>
 
          {/* Popular Vehicles */}
          <section className="featured-section container">
            <h3 className="section-title">Popular Vehicles</h3>
            <div className="horizontal-scroll-row">
              {activeCars.map(item => {
                const ownerSlug = item.ownerName ? item.ownerName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-') : '';
                const subtitle = item.metadata ? `${item.metadata.year || ''} • ${item.metadata.mileage ? item.metadata.mileage.toLocaleString() + ' mi' : ''}` : 'Vehicle';
                return (
                  <div key={item._id} className="home-featured-card">
                    {item.images && item.images[0] ? (
                      <img src={item.images[0]} alt={item.title} className="featured-card-avatar" />
                    ) : (
                      <div className="featured-card-icon">🚗</div>
                    )}
                    <div style={{ width: '100%' }}>
                      <h5>{item.title}</h5>
                      <span className="featured-card-subtitle">{subtitle}</span>
                      <span className="featured-card-price">${item.price ? item.price.toLocaleString() : 'Open'}</span>
                    </div>
                    <Link to={`/store/${ownerSlug}`} className="btn-featured-card-action">View Vehicle</Link>
                  </div>
                );
              })}
            </div>
          </section>
 
          {/* Popular Real Estate */}
          <section className="featured-section container">
            <h3 className="section-title">Popular Real Estate</h3>
            <div className="horizontal-scroll-row">
              {activeHouses.map(item => {
                const ownerSlug = item.ownerName ? item.ownerName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-') : '';
                const subtitle = item.metadata ? `${item.metadata.bedrooms || 0} Beds • ${item.metadata.bathrooms || 0} Baths` : 'Property';
                return (
                  <div key={item._id} className="home-featured-card">
                    {item.images && item.images[0] ? (
                      <img src={item.images[0]} alt={item.title} className="featured-card-avatar" />
                    ) : (
                      <div className="featured-card-icon">🏠</div>
                    )}
                    <div style={{ width: '100%' }}>
                      <h5>{item.title}</h5>
                      <span className="featured-card-subtitle">{subtitle}</span>
                      <span className="featured-card-price">${item.price ? item.price.toLocaleString() : 'Open'}</span>
                    </div>
                    <Link to={`/store/${ownerSlug}`} className="btn-featured-card-action">View Property</Link>
                  </div>
                );
              })}
            </div>
          </section>
 
          {/* Popular Job Openings */}
          <section className="featured-section container">
            <h3 className="section-title">Popular Job Openings</h3>
            <div className="horizontal-scroll-row">
              {activeJobs.map(item => {
                const ownerSlug = item.ownerName ? item.ownerName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-') : '';
                return (
                  <div key={item._id} className="home-featured-card">
                    <div className="featured-card-icon">💼</div>
                    <div style={{ width: '100%' }}>
                      <h5>{item.title}</h5>
                      <span className="featured-card-subtitle">{item.ownerName || 'Employer'}</span>
                      <span className="featured-card-price">Open Salary</span>
                    </div>
                    <Link to={`/store/${ownerSlug}`} className="btn-featured-card-action">View Job</Link>
                  </div>
                );
              })}
            </div>
          </section>
 
          {/* Featured Professionals */}
          <section className="featured-section container">
            <h3 className="section-title">Featured Professionals</h3>
            <div className="professionals-row">
              {activeProfessionals.map((prof) => (
                <div key={prof._id} className="home-featured-card">
                  <img src={prof.images[0]} alt={prof.name} className="featured-card-avatar" />
                  <div style={{ width: '100%' }}>
                    <h5>{prof.name}</h5>
                    <span className="featured-card-subtitle">{prof.title}</span>
                    <span className="featured-card-price" style={{ fontSize: '0.8rem', color: '#eab308' }}>{prof.rating}</span>
                  </div>
                  {prof.isReal ? (
                    <a href={`tel:${prof.phone}`} className="btn-featured-card-action" style={{ textDecoration: 'none' }}>Book Service</a>
                  ) : (
                    <button onClick={() => handleTypeSelect('handyman_skill')} className="btn-featured-card-action" style={{ border: 'none' }}>Book Service</button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* How Ethizone Works */}
          <section className="how-it-works-section">
            <div className="container">
              <h3 className="section-title-centered">{t('how_it_works_title')}</h3>
              <p className="section-subtitle-centered">{t('how_it_works_subtitle')}</p>
              
              <div className="steps-row">
                <div className="step-col">
                  <span className="step-icon">🔍</span>
                  <h4>{t('step1_title')}</h4>
                  <p>{t('step1_desc')}</p>
                </div>
                <div className="step-col">
                  <span className="step-icon">💳</span>
                  <h4>{t('step2_title')}</h4>
                  <p>{t('step2_desc')}</p>
                </div>
                <div className="step-col">
                  <span className="step-icon">📦</span>
                  <h4>{t('step3_title')}</h4>
                  <p>{t('step3_desc')}</p>
                </div>
              </div>

              <div className="features-footer-row">
                <div className="feat-item">🛡️ <strong>{t('verified_sellers_title')}</strong><p>{t('verified_sellers_desc')}</p></div>
                <div className="feat-item">🔒 <strong>{t('secure_payments_title')}</strong><p>{t('secure_payments_desc')}</p></div>
                <div className="feat-item">📞 <strong>{t('support_title')}</strong><p>{t('support_desc')}</p></div>
              </div>
            </div>
          </section>

        </div>
      ) : (
        /* Regular Directory Listing View when filters are active */
        <div className="container directory-page-content" style={{ padding: '40px 0' }}>
          <main className="directory-main">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
              <h2 className="directory-title" style={{ border: 0, margin: 0, padding: 0 }}>
                {selectedType 
                  ? t('active_postings_for').replace('{type}', t(selectedType.replace('store_product', 'stores').replace('handyman_skill', 'handymen').replace('service', 'services').replace('job_opening', 'organizations').replace('house', 'real_estate').replace('car', 'automotive').replace('personal_item', 'used_items')))
                  : t('all_listings')}
                {selectedCategory && ` in ${selectedCategory}`}
              </h2>
              <button 
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('type');
                  setSearchParams(newParams);
                  setSelectedCategory('');
                  setSearchQuery('');
                }} 
                className="btn btn-secondary btn-sm"
              >
                ← Back to Home
              </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
              <div className="loading-container flex-center">
                <div className="spinner"></div>
                <p style={{ marginTop: '16px' }}>Searching active directories...</p>
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="glass-panel empty-directory flex-center">
                <span className="empty-icon">📂</span>
                <h3>No Active Listings Found</h3>
                <p>Try refining your search keyword or selecting a different category/type filter.</p>
              </div>
            ) : (
              <>
                <div className="row g-4 listings-directory-grid">
                  {filteredListings.map((item) => (
                    <div key={item._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                      <ListingCard listing={item} />
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="pagination-wrapper flex-center" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                    <button 
                      onClick={() => fetchListings(currentPage - 1)} 
                      disabled={currentPage === 1}
                      className="btn btn-secondary btn-pagination"
                    >
                      ◀ Prev
                    </button>
                    <span className="pagination-info">
                      Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                    </span>
                    <button 
                      onClick={() => fetchListings(currentPage + 1)} 
                      disabled={currentPage === totalPages}
                      className="btn btn-secondary btn-pagination"
                    >
                      Next ▶
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      )}

      <style>{`
        .home-page-container {
          background: var(--bg-app);
          min-height: 100vh;
        }
        .btn-pagination {
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          transition: all 0.2s;
        }
        .btn-pagination:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .pagination-info {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        
        /* Search Header Bar */
        .search-header-bar {
          background: #ffffff;
          border-bottom: 1px solid #eaeaea;
          padding: 16px 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        body.dark-theme .search-header-bar {
          background: #0f172a;
          border-bottom: 1px solid var(--border-glass);
        }
        .search-bar-form {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
        }
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.1rem;
          color: #94a3b8;
        }
        .search-bar-input {
          width: 100%;
          padding: 12px 16px 12px 48px;
          border-radius: 30px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          font-size: 0.95rem;
          color: #1e293b;
          outline: none;
          transition: all 0.2s;
        }
        body.dark-theme .search-bar-input {
          border-color: var(--border-glass);
          background: rgba(255,255,255,0.03);
          color: #fff;
        }
        .search-bar-input:focus {
          border-color: #0d5c3a;
          box-shadow: 0 0 0 3px rgba(13, 92, 58, 0.15);
          background: #ffffff;
        }
        body.dark-theme .search-bar-input:focus {
          background: rgba(255,255,255,0.05);
        }

        /* Hero Banner */
        .landing-hero {
          padding: 60px 0;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
        }
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }
        .hero-text-col h1 {
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.15;
          color: #1e293b;
          margin-bottom: 20px;
        }
        body.dark-theme .hero-text-col h1 {
          color: #ffffff;
        }
        .hero-text-col p {
          font-size: 1.1rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        body.dark-theme .hero-text-col p {
          color: var(--text-secondary);
        }
        .hero-btn-row {
          display: flex;
          gap: 16px;
        }
        @media (max-width: 992px) {
          .hero-btn-row {
            justify-content: center;
          }
        }
        .btn-hero-shopping {
          background: #0d5c3a;
          color: #ffffff;
          border: none;
          padding: 14px 28px;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-hero-shopping:hover {
          background: #09442a;
          transform: translateY(-2px);
        }
        .btn-hero-seller {
          background: transparent;
          color: #0d5c3a;
          border: 2px solid #0d5c3a;
          padding: 12px 26px;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 6px;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s;
        }
        .btn-hero-seller:hover {
          background: rgba(13, 92, 58, 0.05);
          transform: translateY(-2px);
        }
        .hero-monitor-frame {
          background: #f1f5f9;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.06);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        body.dark-theme .hero-monitor-frame {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-glass);
        }
        .hero-monitor-frame img {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
        }

        /* Motto Slogan Banner */
        .motto-banner {
          background: #f0fdf4;
          border-top: 1px solid #bbf7d0;
          border-bottom: 1px solid #bbf7d0;
          padding: 40px 0;
          text-align: center;
        }
        body.dark-theme .motto-banner {
          background: rgba(13, 92, 58, 0.08);
          border-color: rgba(13, 92, 58, 0.3);
        }
        .motto-num {
          font-size: 2.5rem;
          font-weight: 900;
          color: #0d5c3a;
          display: block;
          margin-bottom: 8px;
          line-height: 1;
        }
        .motto-text {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: #0d5c3a;
          margin-bottom: 12px;
          font-style: italic;
        }
        .motto-link {
          color: #1e3a8a;
          font-weight: 700;
          text-decoration: underline;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }
        body.dark-theme .motto-link {
          color: #60a5fa;
        }

        /* Quick Explore */
        .quick-explore {
          padding: 60px 0;
        }
        .section-title-centered {
          text-align: center;
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 30px;
          color: #1e293b;
        }
        body.dark-theme .section-title-centered {
          color: #fff;
        }
        .explore-pills-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .explore-pill {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          color: #475569;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        body.dark-theme .explore-pill {
          background: rgba(255,255,255,0.02);
          border-color: var(--border-glass);
          color: var(--text-secondary);
        }
        .explore-pill:hover {
          border-color: #0d5c3a;
          color: #0d5c3a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(13, 92, 58, 0.08);
        }

        /* Category Browse Grid */
        .category-browse-grid {
          padding: 20px 0 60px 0;
        }
        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .section-header-row h3 {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: #1e293b;
          margin: 0;
        }
        body.dark-theme .section-header-row h3 {
          color: #fff;
        }
        .btn-view-all {
          background: none;
          border: none;
          color: #0d5c3a;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
        }
        .grid-categories {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 768px) {
          .grid-categories {
            grid-template-columns: 1fr;
          }
        }
        .cat-card-large {
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          height: 400px;
        }
        .cat-img-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .cat-img-wrapper img, .cat-grid-small img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .cat-card-large:hover img, .cat-card-small:hover img {
          transform: scale(1.05);
        }
        .cat-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
          padding: 30px;
          color: #ffffff;
        }
        .cat-badge-tag {
          background: #0d5c3a;
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: bold;
          letter-spacing: 0.05em;
          display: inline-block;
          margin-bottom: 8px;
        }
        .cat-overlay h4 {
          margin: 0;
          font-size: 1.8rem;
          font-family: var(--font-heading);
          font-weight: 800;
        }
        .cat-grid-small {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 480px) {
          .cat-grid-small {
            grid-template-columns: 1fr;
          }
        }
        .cat-card-small {
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          height: 190px;
        }
        .cat-overlay-small {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
          padding: 16px;
          color: #ffffff;
        }
        .cat-overlay-small h4 {
          margin: 0;
          font-size: 1.25rem;
          font-family: var(--font-heading);
          font-weight: 700;
        }

        /* Featured section */
        .featured-section {
          padding: 40px 0;
        }
        .section-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 24px;
          color: #1e293b;
          border-left: 3px solid #0d5c3a;
          padding-left: 12px;
        }
        body.dark-theme .section-title {
          color: #fff;
        }
        .empty-popular-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 24px;
        }
        .mock-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.2s;
        }
        body.dark-theme .mock-card {
          background: rgba(255,255,255,0.02);
          border-color: var(--border-glass);
        }
        .mock-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.04);
        }
        .mock-img {
          height: 180px;
          overflow: hidden;
          background: #f1f5f9;
        }
        .mock-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .mock-body {
          padding: 16px;
        }
        .mock-meta {
          font-size: 0.7rem;
          color: #0d5c3a;
          font-weight: bold;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 4px;
        }
        .mock-meta-small {
          font-size: 0.75rem;
          color: #64748b;
          display: block;
          margin-bottom: 6px;
        }
        body.dark-theme .mock-meta-small {
          color: var(--text-secondary);
        }
        .mock-body h5 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #1e293b;
        }
        body.dark-theme .mock-body h5 {
          color: #fff;
        }
        .mock-price {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0d5c3a;
        }

        /* Mock Job list */
        .job-postings-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }
        .job-card-mock {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 24px;
          text-align: center;
          transition: all 0.2s;
        }
        body.dark-theme .job-card-mock {
          background: rgba(255,255,255,0.02);
          border-color: var(--border-glass);
        }
        .job-card-mock:hover {
          transform: translateY(-4px);
          border-color: #0d5c3a;
        }
        .job-icon {
          font-size: 2.2rem;
          display: block;
          margin-bottom: 12px;
        }
        .job-card-mock h5 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 6px 0;
          color: #1e293b;
        }
        body.dark-theme .job-card-mock h5 {
          color: #fff;
        }
        .job-company {
          font-size: 0.72rem;
          color: #64748b;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
        }
        body.dark-theme .job-company {
          color: var(--text-secondary);
        }
        .job-salary {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0d5c3a;
          display: block;
          margin-bottom: 16px;
        }
        .btn-job-details {
          background: none;
          border: 1px solid #e2e8f0;
          color: #475569;
          padding: 8px 16px;
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s;
        }
        body.dark-theme .btn-job-details {
          border-color: var(--border-glass);
          color: var(--text-secondary);
        }
        .btn-job-details:hover {
          border-color: #0d5c3a;
          color: #0d5c3a;
          background: rgba(13, 92, 58, 0.03);
        }

        /* Horizontal scroll helper classes */
        .horizontal-scroll-row {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 20px;
          padding: 10px 4px 20px 4px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .horizontal-scroll-row::-webkit-scrollbar {
          height: 6px;
        }
        .horizontal-scroll-row::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .horizontal-scroll-row::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
          transition: background 0.2s;
        }
        body.light-theme .horizontal-scroll-row::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
        }
        .horizontal-scroll-row::-webkit-scrollbar-thumb:hover {
          background: var(--accent-primary);
        }
        .scroll-card-col {
          flex: 0 0 280px; /* fixed card width so it scrolls */
          scroll-snap-align: start;
        }

        /* Standardized Home Featured Cards (looks like professionals card) */
        .home-featured-card {
          flex: 0 0 240px; /* fixed card width so it scrolls */
          scroll-snap-align: start;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 310px; /* fixed height for alignment */
        }
        body.dark-theme .home-featured-card {
          background: rgba(255,255,255,0.02);
          border-color: var(--border-glass);
        }
        .home-featured-card:hover {
          transform: translateY(-4px);
          border-color: #0d5c3a;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .featured-card-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 14px;
          border: 2px solid #0d5c3a;
        }
        .featured-card-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(13, 92, 58, 0.1);
          color: #0d5c3a;
          font-size: 2.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          border: 2px solid #0d5c3a;
        }
        .home-featured-card h5 {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0 0 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          color: #1e293b;
        }
        body.dark-theme .home-featured-card h5 {
          color: #fff;
        }
        .featured-card-subtitle {
          font-size: 0.85rem;
          color: #64748b;
          display: block;
          margin-bottom: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }
        body.dark-theme .featured-card-subtitle {
          color: var(--text-secondary);
        }
        .featured-card-price {
          font-size: 1rem;
          color: #0d5c3a;
          font-weight: 800;
          display: block;
          margin-bottom: 14px;
        }
        body.dark-theme .featured-card-price {
          color: #6ee7b7;
        }
        .btn-featured-card-action {
          background: #0d5c3a;
          color: #ffffff;
          border: none;
          padding: 8px 16px;
          font-size: 0.82rem;
          font-weight: 600;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          text-decoration: none;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }
        .btn-featured-card-action:hover {
          background: #0a472d;
          transform: translateY(-1px);
          color: #ffffff;
        }

        /* Mock Professionals horizontal scroll row */
        .professionals-row {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 24px;
          padding: 10px 4px 20px 4px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .professionals-row::-webkit-scrollbar {
          height: 6px;
        }
        .professionals-row::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .professionals-row::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
          transition: background 0.2s;
        }
        body.light-theme .professionals-row::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
        }
        .professionals-row::-webkit-scrollbar-thumb:hover {
          background: var(--accent-primary);
        }
        .prof-card-mock {
          flex: 0 0 240px; /* fixed card width so it scrolls */
          scroll-snap-align: start;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 24px;
          text-align: center;
          transition: all 0.2s;
        }
        body.dark-theme .prof-card-mock {
          background: rgba(255,255,255,0.02);
          border-color: var(--border-glass);
        }
        .prof-card-mock:hover {
          transform: translateY(-4px);
        }
        .prof-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 14px;
          border: 2px solid #0d5c3a;
        }
        .prof-card-mock h5 {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0 0 4px 0;
        }
        .prof-title {
          font-size: 0.85rem;
          color: #64748b;
          display: block;
          margin-bottom: 8px;
        }
        body.dark-theme .prof-title {
          color: var(--text-secondary);
        }
        .prof-stars {
          font-size: 0.8rem;
          color: #f59e0b;
          display: block;
          margin-bottom: 16px;
        }
        .btn-prof-book {
          background: #0d5c3a;
          color: #ffffff;
          border: none;
          padding: 8px 16px;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 4px;
          width: 100%;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-prof-book:hover {
          background: #09442a;
        }

        /* How it works */
        .how-it-works-section {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          padding: 80px 0;
          margin-top: 60px;
        }
        body.dark-theme .how-it-works-section {
          background: rgba(0,0,0,0.1);
          border-color: var(--border-glass);
        }
        .section-subtitle-centered {
          text-align: center;
          color: #64748b;
          margin-top: -20px;
          margin-bottom: 50px;
          font-size: 1.05rem;
        }
        body.dark-theme .section-subtitle-centered {
          color: var(--text-secondary);
        }
        .steps-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }
        @media (max-width: 768px) {
          .steps-row {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }
        .step-col {
          text-align: center;
        }
        .step-col h4 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 12px 0 8px 0;
        }
        .step-col p {
          color: #64748b;
          font-size: 0.92rem;
          line-height: 1.5;
        }
        body.dark-theme .step-col p {
          color: var(--text-secondary);
        }
        .features-footer-row {
          display: flex;
          justify-content: space-around;
          border-top: 1px solid #e2e8f0;
          padding-top: 40px;
          flex-wrap: wrap;
          gap: 20px;
        }
        body.dark-theme .features-footer-row {
          border-color: var(--border-glass);
        }
        .feat-item {
          text-align: center;
          max-width: 250px;
          font-size: 0.95rem;
        }
        .feat-item p {
          color: #64748b;
          font-size: 0.8rem;
          margin-top: 4px;
        }
        body.dark-theme .feat-item p {
          color: var(--text-secondary);
        }

        /* Footer */
        .landing-footer {
          background: #0f172a;
          color: #94a3b8;
          padding: 80px 0 30px 0;
          font-size: 0.9rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
          gap: 40px;
          margin-bottom: 50px;
        }
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
        .footer-col h5 {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 20px;
          letter-spacing: 0.05em;
        }
        .footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-col ul li {
          margin-bottom: 12px;
        }
        .footer-col ul li a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-col ul li a:hover {
          color: #ffffff;
        }
        .footer-link-btn {
          background: none;
          border: none;
          color: #94a3b8;
          padding: 0;
          cursor: pointer;
          font-size: 0.9rem;
          text-align: left;
          transition: color 0.2s;
        }
        .footer-link-btn:hover {
          color: #ffffff;
        }
        .brand-col p {
          margin-top: 16px;
          line-height: 1.6;
        }
        .social-links {
          display: flex;
          gap: 16px;
          margin-top: 20px;
          font-size: 1.2rem;
        }
        .social-links span {
          cursor: pointer;
          transition: color 0.2s;
        }
        .social-links span:hover {
          color: #ffffff;
        }
        .newsletter-col p {
          margin-bottom: 16px;
        }
        .newsletter-input-row {
          display: flex;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid #334155;
        }
        .newsletter-input-row input {
          background: #1e293b;
          border: none;
          padding: 12px 16px;
          color: #ffffff;
          outline: none;
          flex: 1;
        }
        .btn-newsletter-send {
          background: #0d5c3a;
          border: none;
          color: #ffffff;
          padding: 0 16px;
          cursor: pointer;
        }
        .btn-newsletter-send:hover {
          background: #09442a;
        }
        .footer-bottom {
          border-top: 1px solid #1e293b;
          padding-top: 30px;
          font-size: 0.8rem;
        }
        
        .loading-container {
          flex-direction: column;
          padding: 80px 0;
          color: var(--text-secondary);
        }
        .empty-directory {
          padding: 80px 40px;
          flex-direction: column;
          text-align: center;
          color: var(--text-secondary);
        }
        .empty-icon {
          font-size: 3.5rem;
          margin-bottom: 16px;
        }
        .empty-directory h3 {
          margin-bottom: 8px;
        }
        .listings-directory-grid {
          margin-top: 20px;
        }
        .row-dimmed {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

export default Home;
