// Ultimate Master Marketplace - Home Page (Optimized for High Scale)
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ListingCard from '../components/ListingCard';
import FilterButton from '../components/FilterButton';
import { Search, Star } from 'lucide-react';

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
  const [sortBy, setSortBy] = useState('newest');

  // Mobile sidebar open state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Real Estate / Houses filters
  const [propertyStatus, setPropertyStatus] = useState('All');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('All');
  const [minBeds, setMinBeds] = useState(0);
  const [minBaths, setMinBaths] = useState(0);
  const [locationFilter, setLocationFilter] = useState('');
  const [nearMe, setNearMe] = useState(false);
  const [radius, setRadius] = useState(50);

  // Automotive / Cars filters
  const [carStatus, setCarStatus] = useState('All');
  const [brandFilter, setBrandFilter] = useState('All');
  const [minYear, setMinYear] = useState('All');
  const [transmissionFilter, setTransmissionFilter] = useState('All');
  const [fuelType, setFuelType] = useState('All');

  // Jobs filters
  const [jobType, setJobType] = useState('All');
  const [workModel, setWorkModel] = useState('All');
  const [minSalary, setMinSalary] = useState(0);

  // Professional Services filters
  const [pricingModel, setPricingModel] = useState('All');
  const [minExp, setMinExp] = useState(0);

  // Hire Me / Handymen filters
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [minRating, setMinRating] = useState(0);

  // Marketplace / Used Items filters
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [storeType, setStoreType] = useState('All');

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

    if (!matchesSearch || !matchesType || !matchesCategory) return false;

    // Apply specific filters based on item type
    if (item.type === 'house') {
      const meta = item.metadata || {};
      if (propertyStatus !== 'All' && item.category !== propertyStatus) return false;
      if (propertyTypeFilter !== 'All') {
        const typeStr = meta.propertyType || '';
        if (typeStr.toLowerCase() !== propertyTypeFilter.toLowerCase()) return false;
      }
      const bedsCount = parseInt(meta.bedrooms) || 0;
      if (bedsCount < minBeds) return false;
      const bathsCount = parseInt(meta.bathrooms) || 0;
      if (bathsCount < minBaths) return false;
      const pMin = minPrice !== '' ? minPrice : 0;
      const pMax = maxPrice !== '' ? maxPrice : Infinity;
      const itemPrice = item.price || 0;
      if (itemPrice < pMin || itemPrice > pMax) return false;
      if (locationFilter) {
        const addressVal = (item.metadata?.address || item.ownerId?.address || '').toLowerCase();
        const textVal = ((item.description || '') + ' ' + (item.title || '') + ' ' + (item.category || '')).toLowerCase();
        if (!addressVal.includes(locationFilter.toLowerCase()) && !textVal.includes(locationFilter.toLowerCase())) {
          return false;
        }
      }
    }

    if (item.type === 'car') {
      const meta = item.metadata || {};
      if (carStatus !== 'All' && item.category !== carStatus) return false;
      if (brandFilter !== 'All') {
        const make = meta.make || '';
        if (make.toLowerCase() !== brandFilter.toLowerCase()) return false;
      }
      if (minYear !== 'All') {
        const yearNum = parseInt(meta.year) || 0;
        const targetYear = parseInt(minYear.replace('+', '')) || 0;
        if (yearNum < targetYear) return false;
      }
      if (transmissionFilter !== 'All') {
        const trans = meta.transmission || '';
        if (trans.toLowerCase() !== transmissionFilter.toLowerCase()) return false;
      }
      if (fuelType !== 'All') {
        const fuel = meta.fuelType || '';
        if (fuel.toLowerCase() !== fuelType.toLowerCase()) return false;
      }
      const pMin = minPrice !== '' ? minPrice : 0;
      const pMax = maxPrice !== '' ? maxPrice : Infinity;
      const itemPrice = item.price || 0;
      if (itemPrice < pMin || itemPrice > pMax) return false;
    }

    if (item.type === 'job_opening') {
      if (jobType !== 'All') {
        const typeStr = item.category || '';
        if (typeStr.toLowerCase() !== jobType.toLowerCase()) return false;
      }
      if (workModel !== 'All') {
        const modelStr = item.description || '';
        if (!modelStr.toLowerCase().includes(workModel.toLowerCase())) return false;
      }
      const pMin = minPrice !== '' ? minPrice : 0;
      const pMax = maxPrice !== '' ? maxPrice : Infinity;
      const itemPrice = item.price || 0;
      if (minSalary > 0 && itemPrice < minSalary) return false;
      if (itemPrice < pMin || itemPrice > pMax) return false;
      if (locationFilter) {
        const addressVal = (item.metadata?.address || item.ownerId?.address || '').toLowerCase();
        const textVal = ((item.description || '') + ' ' + (item.title || '') + ' ' + (item.category || '')).toLowerCase();
        if (!addressVal.includes(locationFilter.toLowerCase()) && !textVal.includes(locationFilter.toLowerCase())) {
          return false;
        }
      }
    }

    if (item.type === 'service') {
      if (pricingModel !== 'All') {
        const priceModelStr = item.description || '';
        if (!priceModelStr.toLowerCase().includes(pricingModel.toLowerCase())) return false;
      }
      if (minExp > 0) {
        const desc = (item.description || '').toLowerCase();
        const expMatch = desc.match(/(\d+)\s*yrs|years/i);
        if (expMatch) {
          const exp = parseInt(expMatch[1]);
          if (exp < minExp) return false;
        }
      }
      if (locationFilter) {
        const addressVal = (item.metadata?.address || item.ownerId?.address || '').toLowerCase();
        const textVal = ((item.description || '') + ' ' + (item.title || '') + ' ' + (item.category || '')).toLowerCase();
        if (!addressVal.includes(locationFilter.toLowerCase()) && !textVal.includes(locationFilter.toLowerCase())) {
          return false;
        }
      }
    }

    if (item.type === 'handyman_skill') {
      if (availabilityFilter !== 'All') {
        const availStr = item.description || '';
        if (!availStr.toLowerCase().includes(availabilityFilter.toLowerCase())) return false;
      }
      if (minRating > 0) {
        const itemRating = item.avgRating !== undefined && item.avgRating !== null ? parseFloat(item.avgRating) : 5.0;
        if (itemRating < minRating) return false;
      }
    }

    if (item.type === 'store_product' || item.type === 'personal_item') {
      const pMin = minPrice !== '' ? minPrice : 0;
      const pMax = maxPrice !== '' ? maxPrice : Infinity;
      const itemPrice = item.price || 0;
      if (itemPrice < pMin || itemPrice > pMax) return false;
      if (storeType !== 'All' && item.category !== storeType) return false;
    }

    return true;
  });

  // Client-side sorting for real-time reactivity
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'price_asc') {
      return (a.price || 0) - (b.price || 0);
    }
    if (sortBy === 'price_desc') {
      return (b.price || 0) - (a.price || 0);
    }
    // Default newest (sort by _id or creation order)
    if (a._id && b._id) {
      return b._id.localeCompare(a._id);
    }
    return 0;
  });

  const activePrices = listings.filter(l => l.price !== undefined && l.price !== null).map(l => Number(l.price));
  const rawMin = activePrices.length > 0 ? Math.min(...activePrices) : 0;
  const rawMax = activePrices.length > 0 ? Math.max(...activePrices) : 1000;
  const dataMinPrice = rawMin === rawMax ? 0 : rawMin;
  const dataMaxPrice = rawMax === 0 ? 1000 : rawMax;
  const currentMinPrice = minPrice !== '' ? minPrice : dataMinPrice;
  const currentMaxPrice = maxPrice !== '' ? maxPrice : dataMaxPrice;

  return (
    <div className="home-page-container">
      {/* Search Header Banner */}
      <section className="search-header-bar">
        <div className="container">
          <form onSubmit={handleSearchSubmit} className="search-bar-form">
            <Search className="search-icon" size={18} />
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




          {/* Browse by Category Grid */}
          <section className="category-browse-grid container">
            <div className="section-header-row">
              <h3>Browse by Category</h3>
              <button onClick={() => handleTypeSelect('store_product')} className="btn-view-all">View All →</button>
            </div>
            <div className="grid-categories">
              {/* Left Large Card */}
              <div className="cat-card-large" onClick={() => handleTypeSelect('personal_item')}>
                <div className="cat-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80" alt="Used Items" />
                  <div className="cat-overlay">
                    <span className="cat-badge-tag">ACTIVE</span>
                    <h4>{t('used_items')}</h4>
                  </div>
                </div>
              </div>
              {/* Right 4-card Grid */}
              <div className="cat-grid-small">
                <div className="cat-card-small" onClick={() => handleTypeSelect('car')}>
                  <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80" alt="Automotive" />
                  <div className="cat-overlay-small">
                    <h4>{t('automotive')}</h4>
                  </div>
                </div>
                <div className="cat-card-small" onClick={() => handleTypeSelect('house')}>
                  <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80" alt="Real Estate" />
                  <div className="cat-overlay-small">
                    <h4>{t('real_estate')}</h4>
                  </div>
                </div>
                <div className="cat-card-small" onClick={() => handleTypeSelect('job_opening')}>
                  <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80" alt="Jobs" />
                  <div className="cat-overlay-small">
                    <h4>{t('organizations')}</h4>
                  </div>
                </div>
                <div className="cat-card-small" onClick={() => handleTypeSelect('service')}>
                  <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80" alt="Services" />
                  <div className="cat-overlay-small">
                    <h4>{t('services')}</h4>
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
                    <Link 
                      to={item.type === 'personal_item' ? `/?type=personal_item&query=${encodeURIComponent(item.title)}` : `/store/${ownerSlug}`} 
                      className="btn-featured-card-action"
                    >
                      View Details
                    </Link>
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
          
          {/* Mobile Filter Toggle Bar */}
          <div className="d-lg-none mb-3">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-100 d-flex justify-content-between align-items-center py-3 px-3 rounded-3 border-0 transition-all filter-toggle-bar shadow-sm"
              style={{
                background: isFilterOpen ? 'var(--accent-primary)' : 'var(--bg-card)',
                color: isFilterOpen ? '#ffffff' : 'var(--text-main)',
                border: '1px solid var(--border-glass)'
              }}
            >
              <div className="d-flex align-items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
                <span className="fw-semibold">{t('filters')}</span>
              </div>
            </button>
          </div>



          <div className="row">
            {/* Filter Overlay for Mobile */}
            {isFilterOpen && (
              <div 
                className="d-lg-none" 
                onClick={() => setIsFilterOpen(false)} 
                style={{ 
                  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                  backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1040, backdropFilter: 'blur(4px)'
                }} 
              />
            )}

            {/* Sidebar Column */}
            <aside className={`col-12 col-lg-3 ${isFilterOpen ? 'mobile-filter-drawer' : 'd-none d-lg-block'} mb-4`}>
              <div className="filter-sidebar-card" style={{ minWidth: '240px', height: '100%', overflowY: 'auto' }}>
                <div className="d-flex justify-content-between align-items-center d-lg-none mb-3 pb-2 border-bottom">
                   <span className="fw-bold fs-5" style={{ color: 'var(--text-main)' }}>Filters</span>
                   <button className="btn btn-sm" onClick={() => setIsFilterOpen(false)} style={{ borderRadius: '50%', width: '32px', height: '32px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border-glass)' }}>✕</button>
                </div>
                
                {/* Dynamically render the filter fields matching the selected type */}
                {selectedType === 'house' && (
                  <div className="space-y-4">
                    <h2 className="fs-4 fw-bold pb-2 border-bottom">{t('filters')}</h2>
                    
                    {/* Status */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('status')}</h4>
                      {[
                        { value: 'All', key: 'all' },
                        { value: 'Residential Homes', key: 'res_homes' },
                        { value: 'Rental Apartments', key: 'rent_apts' },
                        { value: 'Commercial Real Estate', key: 'comm_re' },
                        { value: 'Land & Lots', key: 'land_lots' }
                      ].map((item) => (
                        <label key={item.value} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="propertyStatus"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={propertyStatus === item.value}
                            onChange={() => setPropertyStatus(item.value)}
                          />
                          <span>{t(item.key)}</span>
                        </label>
                      ))}
                    </div>

                    {/* Property Type */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('property_type')}</h4>
                      {[
                        { value: 'All', key: 'all' },
                        { value: 'House', key: 'house' },
                        { value: 'Apartment', key: 'apartment' },
                        { value: 'Penthouse', key: 'penthouse' },
                        { value: 'Office', key: 'office' },
                        { value: 'Land', key: 'land' }
                      ].map((item) => (
                        <label key={item.value} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="propertyTypeFilter"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={propertyTypeFilter === item.value}
                            onChange={() => setPropertyTypeFilter(item.value)}
                          />
                          <span>{t(item.key)}</span>
                        </label>
                      ))}
                    </div>

                    {/* Bedrooms */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('bedrooms_filter')}</h4>
                      <div className="d-flex flex-wrap gap-2">
                        {[0, 1, 2, 3, 4].map((num) => (
                          <button
                            key={num}
                            onClick={() => setMinBeds(num)}
                            className={`btn btn-sm px-3 rounded-pill fw-semibold ${minBeds === num ? 'btn-primary' : 'btn-light border'}`}

                          >
                            {num === 0 ? t('all') : `${num}+`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bathrooms */}
                    <div className="mt-3 pb-3 border-bottom">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('bathrooms_filter')}</h4>
                      <div className="d-flex flex-wrap gap-2">
                        {[0, 1, 2, 3].map((num) => (
                          <button
                            key={num}
                            onClick={() => setMinBaths(num)}
                            className={`btn btn-sm px-3 rounded-pill fw-semibold ${minBaths === num ? 'btn-primary' : 'btn-light border'}`}

                          >
                            {num === 0 ? t('all') : `${num}+`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Price Range */}
                    <div className="mt-3 pb-3 border-bottom">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>Price Range</h4>
                      
                      <div className="mb-4 mt-2">
                        <div className="d-flex justify-content-between text-xs font-semibold text-secondary mb-3" style={{ fontSize: '0.8rem' }}>
                          <span>${currentMinPrice >= 1000000 ? `${(currentMinPrice / 1000000).toFixed(1)}M` : currentMinPrice >= 1000 ? `${(currentMinPrice / 1000).toFixed(0)}k` : currentMinPrice}</span>
                          <span>${currentMaxPrice >= 1000000 ? `${(currentMaxPrice / 1000000).toFixed(1)}M` : currentMaxPrice >= 1000 ? `${(currentMaxPrice / 1000).toFixed(0)}k` : currentMaxPrice}</span>
                        </div>
                        <div className="dual-slider-container">
                          <div className="dual-slider-track"></div>
                          <div 
                            className="dual-slider-range" 
                            style={{
                              left: `${dataMaxPrice > dataMinPrice ? ((currentMinPrice - dataMinPrice) / (dataMaxPrice - dataMinPrice)) * 100 : 0}%`,
                              right: `${dataMaxPrice > dataMinPrice ? 100 - ((currentMaxPrice - dataMinPrice) / (dataMaxPrice - dataMinPrice)) * 100 : 0}%`
                            }}
                          ></div>
                          <input
                            type="range"
                            className="dual-slider-input"
                            min={dataMinPrice}
                            max={dataMaxPrice}
                            step={Math.max(1, Math.floor((dataMaxPrice - dataMinPrice) / 100))}
                            value={currentMinPrice}
                            onChange={(e) => {
                              const val = Math.min(Number(e.target.value), currentMaxPrice);
                              setMinPrice(val);
                            }}
                          />
                          <input
                            type="range"
                            className="dual-slider-input"
                            min={dataMinPrice}
                            max={dataMaxPrice}
                            step={Math.max(1, Math.floor((dataMaxPrice - dataMinPrice) / 100))}
                            value={currentMaxPrice}
                            onChange={(e) => {
                              const val = Math.max(Number(e.target.value), currentMinPrice);
                              setMaxPrice(val);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location Input (Full width, no duplicate label, city/town placeholder) */}
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder={t('location_placeholder')}
                        className="filter-location-input"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        onClick={() => {
                          setPropertyStatus('All');
                          setPropertyTypeFilter('All');
                          setMinBeds(0);
                          setMinBaths(0);
                          setMinPrice('');
                          setMaxPrice('');
                          setLocationFilter('');
                          setSearchQuery('');
                        }}
                        className="btn btn-light border w-100 py-2 rounded-3 fw-semibold transition-all"
                      >
                        {t('reset_filters')}
                      </button>
                    </div>
                  </div>
                )}

                {selectedType === 'car' && (
                  <div className="space-y-4">
                    <h2 className="fs-4 fw-bold pb-2 border-bottom">{t('filters')}</h2>

                    {/* Brand */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('brand')}</h4>
                      {[
                        { value: 'All', key: 'all' },
                        { value: 'Tesla' },
                        { value: 'BMW' },
                        { value: 'Ford' },
                        { value: 'Porsche' },
                        { value: 'Honda' },
                        { value: 'Toyota' }
                      ].map((item) => (
                        <label key={item.value} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="brandFilter"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={brandFilter === item.value}
                            onChange={() => setBrandFilter(item.value)}
                          />
                          <span>{item.key ? t(item.key) : item.value}</span>
                        </label>
                      ))}
                    </div>

                    {/* Min Year */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('min_year_filter')}</h4>
                      <div className="d-flex flex-wrap gap-2">
                        {[
                          { value: 'All', key: 'all' },
                          { value: '2023+' },
                          { value: '2022+' },
                          { value: '2021+' },
                          { value: '2020+' }
                        ].map((item) => (
                          <button
                            key={item.value}
                            onClick={() => setMinYear(item.value)}
                            className={`btn btn-sm px-3 rounded-pill fw-semibold ${minYear === item.value ? 'btn-primary' : 'btn-light border'}`}

                          >
                            {item.key ? t(item.key) : item.value}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Transmission */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('transmission')}</h4>
                      {[
                        { value: 'All', key: 'all' },
                        { value: 'Automatic', key: 'automatic' },
                        { value: 'Manual', key: 'manual' }
                      ].map((item) => (
                        <label key={item.value} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="transmissionFilter"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={transmissionFilter === item.value}
                            onChange={() => setTransmissionFilter(item.value)}
                          />
                          <span>{t(item.key)}</span>
                        </label>
                      ))}
                    </div>

                    {/* Fuel Type */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('fuel_type')}</h4>
                      {[
                        { value: 'All', key: 'all' },
                        { value: 'Gasoline', key: 'gasoline' },
                        { value: 'Diesel', key: 'diesel' },
                        { value: 'Electric', key: 'electric' },
                        { value: 'Hybrid', key: 'hybrid' }
                      ].map((item) => (
                        <label key={item.value} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="fuelType"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={fuelType === item.value}
                            onChange={() => setFuelType(item.value)}
                          />
                          <span>{t(item.key)}</span>
                        </label>
                      ))}
                    </div>

                    {/* Dynamic Price Range */}
                    <div className="mt-3 pb-3 border-bottom">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>Price Range</h4>
                      
                      <div className="mb-4 mt-2">
                        <div className="d-flex justify-content-between text-xs font-semibold text-secondary mb-3" style={{ fontSize: '0.8rem' }}>
                          <span>${currentMinPrice >= 1000000 ? `${(currentMinPrice / 1000000).toFixed(1)}M` : currentMinPrice >= 1000 ? `${(currentMinPrice / 1000).toFixed(0)}k` : currentMinPrice}</span>
                          <span>${currentMaxPrice >= 1000000 ? `${(currentMaxPrice / 1000000).toFixed(1)}M` : currentMaxPrice >= 1000 ? `${(currentMaxPrice / 1000).toFixed(0)}k` : currentMaxPrice}</span>
                        </div>
                        <div className="dual-slider-container">
                          <div className="dual-slider-track"></div>
                          <div 
                            className="dual-slider-range" 
                            style={{
                              left: `${dataMaxPrice > dataMinPrice ? ((currentMinPrice - dataMinPrice) / (dataMaxPrice - dataMinPrice)) * 100 : 0}%`,
                              right: `${dataMaxPrice > dataMinPrice ? 100 - ((currentMaxPrice - dataMinPrice) / (dataMaxPrice - dataMinPrice)) * 100 : 0}%`
                            }}
                          ></div>
                          <input
                            type="range"
                            className="dual-slider-input"
                            min={dataMinPrice}
                            max={dataMaxPrice}
                            step={Math.max(1, Math.floor((dataMaxPrice - dataMinPrice) / 100))}
                            value={currentMinPrice}
                            onChange={(e) => {
                              const val = Math.min(Number(e.target.value), currentMaxPrice);
                              setMinPrice(val);
                            }}
                          />
                          <input
                            type="range"
                            className="dual-slider-input"
                            min={dataMinPrice}
                            max={dataMaxPrice}
                            step={Math.max(1, Math.floor((dataMaxPrice - dataMinPrice) / 100))}
                            value={currentMaxPrice}
                            onChange={(e) => {
                              const val = Math.max(Number(e.target.value), currentMinPrice);
                              setMaxPrice(val);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location Input (Full width, no duplicate label, city/town placeholder) */}
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder={t('location_placeholder')}
                        className="filter-location-input"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>

                    <div className="pt-4 border-top">
                      <button
                        onClick={() => {
                          setCarStatus('All');
                          setBrandFilter('All');
                          setMinYear('All');
                          setTransmissionFilter('All');
                          setFuelType('All');
                          setMinPrice('');
                          setMaxPrice('');
                          setLocationFilter('');
                          setSearchQuery('');
                        }}
                        className="btn btn-light border w-100 py-2 rounded-3 fw-semibold transition-all"
                      >
                        {t('reset_filters')}
                      </button>
                    </div>
                  </div>
                )}

                {selectedType === 'job_opening' && (
                  <div className="space-y-4">
                    <h2 className="fs-4 fw-bold pb-2 border-bottom">{t('filters')}</h2>

                    {/* Job Type */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('job_type')}</h4>
                      {[
                        { value: 'All', key: 'all' },
                        { value: 'Full-Time', key: 'full_time' },
                        { value: 'Part-Time', key: 'part_time' },
                        { value: 'Contract', key: 'contract' },
                        { value: 'Freelance', key: 'freelance' },
                        { value: 'Internship', key: 'internship' }
                      ].map((item) => (
                        <label key={item.value} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="jobType"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={jobType === item.value}
                            onChange={() => setJobType(item.value)}
                          />
                          <span>{t(item.key)}</span>
                        </label>
                      ))}
                    </div>

                    {/* Work Model */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('work_model')}</h4>
                      {[
                        { value: 'All', key: 'all' },
                        { value: 'On-site', key: 'onsite' },
                        { value: 'Hybrid', key: 'hybrid' },
                        { value: 'Remote', key: 'remote' }
                      ].map((item) => (
                        <label key={item.value} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="workModel"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={workModel === item.value}
                            onChange={() => setWorkModel(item.value)}
                          />
                          <span>{t(item.key)}</span>
                        </label>
                      ))}
                    </div>

                    {/* Minimum Salary */}
                    <div className="mt-3 pb-3 border-bottom">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('min_salary')}</h4>
                      <input
                        type="range"
                        className="w-100 cursor-pointer"
                        min="0"
                        max="200000"
                        step="10000"
                        value={minSalary}
                        onChange={(e) => setMinSalary(parseInt(e.target.value))}
                        style={{ accentColor: '#0f5132' }}
                      />
                      <div className="d-flex justify-content-between mt-1 text-xs font-semibold text-secondary" style={{ fontSize: '0.8rem' }}>
                        <span>$0</span>
                        {minSalary > 0 && <span style={{ color: '#0f5132' }}>${(minSalary / 1000).toFixed(0)}k</span>}
                        <span>$200k+</span>
                      </div>
                    </div>

                    {/* Location Input (Full width, no duplicate label, city/town placeholder) */}
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder={t('location_placeholder')}
                        className="filter-location-input"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        onClick={() => {
                          setJobType('All');
                          setWorkModel('All');
                          setMinSalary(0);
                          setLocationFilter('');
                          setSearchQuery('');
                        }}
                        className="btn btn-light border w-100 py-2 rounded-3 fw-semibold transition-all"
                      >
                        {t('reset_filters')}
                      </button>
                    </div>
                  </div>
                )}

                {selectedType === 'service' && (
                  <div className="space-y-4">
                    <h2 className="fs-4 fw-bold pb-2 border-bottom">{t('filters')}</h2>

                    {/* Pricing Model */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('pricing_model')}</h4>
                      {[
                        { value: 'All', key: 'all' },
                        { value: 'Hourly Rate', key: 'hourly_rate' },
                        { value: 'Fixed Price per Project', key: 'fixed_price' },
                        { value: 'Contact for Quote', key: 'contact_quote' }
                      ].map((item) => (
                        <label key={item.value} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="pricingModel"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={pricingModel === item.value}
                            onChange={() => setPricingModel(item.value)}
                          />
                          <span>{t(item.key)}</span>
                        </label>
                      ))}
                    </div>

                    {/* Experience */}
                    <div className="mt-3 pb-3 border-bottom">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('min_experience')}</h4>
                      <input
                        type="range"
                        className="w-100 cursor-pointer"
                        min="0"
                        max="15"
                        value={minExp}
                        onChange={(e) => setMinExp(parseInt(e.target.value))}
                        style={{ accentColor: '#0f5132' }}
                      />
                      <div className="d-flex justify-content-between mt-1 text-xs font-semibold text-secondary" style={{ fontSize: '0.8rem' }}>
                        <span>0 Yrs</span>
                        {minExp > 0 && <span style={{ color: '#0f5132' }}>{minExp} Yrs</span>}
                        <span>15+ Yrs</span>
                      </div>
                    </div>

                    {/* Location Input (Full width, no duplicate label, city/town placeholder) */}
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder={t('location_placeholder')}
                        className="filter-location-input"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>

                    <div className="pt-4 border-top">
                      <button
                        onClick={() => {
                          setPricingModel('All');
                          setMinExp(0);
                          setLocationFilter('');
                          setSearchQuery('');
                        }}
                        className="btn btn-light border w-100 py-2 rounded-3 fw-semibold transition-all"
                      >
                        {t('reset_filters')}
                      </button>
                    </div>
                  </div>
                )}

                {selectedType === 'handyman_skill' && (
                  <div className="space-y-4">
                    <h2 className="fs-4 fw-bold pb-2 border-bottom">{t('filters')}</h2>

                    {/* Availability */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('availability')}</h4>
                      {[
                        { value: 'All', key: 'all' },
                        { value: 'Available Today', key: 'avail_today' },
                        { value: 'Available Tomorrow', key: 'avail_tomorrow' },
                        { value: 'Available This Week', key: 'avail_this_week' }
                      ].map((item) => (
                        <label key={item.value} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="availability"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={availabilityFilter === item.value}
                            onChange={() => setAvailabilityFilter(item.value)}
                          />
                          <span>{t(item.key)}</span>
                        </label>
                      ))}
                    </div>

                    {/* Minimum Rating */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('min_rating')}</h4>
                      {[
                        { label: t('any_rating'), val: 0 },
                        { label: '4.5 & up', val: 4.5 },
                        { label: '4.0 & up', val: 4.0 },
                        { label: '3.0 & up', val: 3.0 }
                      ].map((r) => (
                        <label key={r.val} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="minRating"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={minRating === r.val}
                            onChange={() => setMinRating(r.val)}
                          />
                          <span className="d-flex align-items-center gap-1">
                            {r.label}
                            {r.val > 0 && <Star size={16} className="text-warning" fill="currentColor" />}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Location Input (Full width, no duplicate label, city/town placeholder) */}
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder={t('location_placeholder')}
                        className="filter-location-input"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>

                    <div className="pt-4 border-top">
                      <button
                        onClick={() => {
                          setAvailabilityFilter('All');
                          setMinRating(0);
                          setLocationFilter('');
                          setSearchQuery('');
                        }}
                        className="btn btn-light border w-100 py-2 rounded-3 fw-semibold transition-all"
                      >
                        {t('reset_filters')}
                      </button>
                    </div>
                  </div>
                )}

                {/* Marketplace / Used Items filters (Default fallback when store_product/personal_item or no specific filter selected) */}
                {(selectedType === 'store_product' || selectedType === 'personal_item' || !selectedType) && (
                  <div className="space-y-4">
                    <h2 className="fs-4 fw-bold pb-2 border-bottom">{t('filters')}</h2>

                    {/* Category */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('category')}</h4>
                      {[
                        { value: 'All', key: 'all' },
                        { value: 'Boutique', key: 'boutique' },
                        { value: 'Pharmacy', key: 'pharmacy' },
                        { value: 'Liquor Store', key: 'liquor_store' },
                        { value: 'Grocery Store', key: 'grocery_store' },
                        { value: 'Electronics Shop', key: 'electronics_shop' },
                        { value: 'Bookstore', key: 'bookstore' }
                      ].map((item) => (
                        <label key={item.value} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="storeCategory"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={(item.value === 'All' && !selectedCategory) || selectedCategory === item.value}
                            onChange={() => setSelectedCategory(item.value === 'All' ? '' : item.value)}
                          />
                          <span>{t(item.key)}</span>
                        </label>
                      ))}
                    </div>

                    {/* Store Type */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('store_type_filter')}</h4>
                      {[
                        { label: t('all_stores'), value: 'All' },
                        { label: t('verified_partner'), value: 'Verified Partner' },
                        { label: t('independent_maker'), value: 'Independent Maker' }
                      ].map((st) => (
                        <label key={st.value} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="storeType"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={storeType === st.value}
                            onChange={() => setStoreType(st.value)}
                          />
                          <span>{st.label}</span>
                        </label>
                      ))}
                    </div>

                    {/* Rating */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('min_rating')}</h4>
                      {[
                        { label: t('any_rating'), val: 0 },
                        { label: '4.5 & up', val: 4.5 },
                        { label: '4.0 & up', val: 4.0 },
                        { label: '3.0 & up', val: 3.0 }
                      ].map((r) => (
                        <label key={r.val} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="storeRating"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={minRating === r.val}
                            onChange={() => setMinRating(r.val)}
                          />
                          <span className="d-flex align-items-center gap-1">
                            {r.label}
                            {r.val > 0 && <span className="text-warning">⭐</span>}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Dynamic Price Range */}
                    <div className="mt-3 pb-3 border-bottom">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>Price Range</h4>
                      
                      <div className="mb-4 mt-2">
                        <div className="d-flex justify-content-between text-xs font-semibold text-secondary mb-3" style={{ fontSize: '0.8rem' }}>
                          <span>${currentMinPrice >= 1000000 ? `${(currentMinPrice / 1000000).toFixed(1)}M` : currentMinPrice >= 1000 ? `${(currentMinPrice / 1000).toFixed(0)}k` : currentMinPrice}</span>
                          <span>${currentMaxPrice >= 1000000 ? `${(currentMaxPrice / 1000000).toFixed(1)}M` : currentMaxPrice >= 1000 ? `${(currentMaxPrice / 1000).toFixed(0)}k` : currentMaxPrice}</span>
                        </div>
                        <div className="dual-slider-container">
                          <div className="dual-slider-track"></div>
                          <div 
                            className="dual-slider-range" 
                            style={{
                              left: `${dataMaxPrice > dataMinPrice ? ((currentMinPrice - dataMinPrice) / (dataMaxPrice - dataMinPrice)) * 100 : 0}%`,
                              right: `${dataMaxPrice > dataMinPrice ? 100 - ((currentMaxPrice - dataMinPrice) / (dataMaxPrice - dataMinPrice)) * 100 : 0}%`
                            }}
                          ></div>
                          <input
                            type="range"
                            className="dual-slider-input"
                            min={dataMinPrice}
                            max={dataMaxPrice}
                            step={Math.max(1, Math.floor((dataMaxPrice - dataMinPrice) / 100))}
                            value={currentMinPrice}
                            onChange={(e) => {
                              const val = Math.min(Number(e.target.value), currentMaxPrice);
                              setMinPrice(val);
                            }}
                          />
                          <input
                            type="range"
                            className="dual-slider-input"
                            min={dataMinPrice}
                            max={dataMaxPrice}
                            step={Math.max(1, Math.floor((dataMaxPrice - dataMinPrice) / 100))}
                            value={currentMaxPrice}
                            onChange={(e) => {
                              const val = Math.max(Number(e.target.value), currentMinPrice);
                              setMaxPrice(val);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location Input (Full width, no duplicate label, city/town placeholder) */}
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder={t('location_placeholder')}
                        className="filter-location-input"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        onClick={() => {
                          setMinPrice('');
                          setMaxPrice('');
                          setStoreType('All');
                          setMinRating(0);
                          setLocationFilter('');
                          setSelectedCategory('');
                          setSearchQuery('');
                        }}
                        className="btn btn-light border w-100 py-2 rounded-3 fw-semibold transition-all"
                      >
                        {t('reset_filters')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Listings Grid Column */}
            <main className="col-12 col-lg-9 directory-main">


              {error && <div className="alert alert-danger">{error}</div>}

              {loading ? (
                <div className="loading-container flex-center">
                  <div className="spinner"></div>
                  <p style={{ marginTop: '16px' }}>Searching active directories...</p>
                </div>
              ) : sortedListings.length === 0 ? (
                <div className="loading-container flex-center">
                  <div className="spinner"></div>
                  <p style={{ marginTop: '16px' }}>Searching...</p>
                </div>
              ) : (
                <>
                  <div className="row g-4 listings-directory-grid">
                    {sortedListings.map((item) => (
                      <div key={item._id} className="col-12 col-sm-6 col-lg-4 col-xl-4">
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
          background: var(--bg-app);
          border-bottom: 1px solid var(--border-glass);
          padding: 16px 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
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
          color: var(--text-muted);
        }
        .search-bar-input {
          width: 100%;
          padding: 12px 16px 12px 48px;
          border-radius: 30px;
          border: 1px solid var(--border-glass);
          background: var(--bg-card);
          font-size: 0.95rem;
          color: var(--text-main);
          outline: none;
          transition: all 0.2s;
        }
        .search-bar-input:focus {
          border-color: var(--accent-secondary);
          box-shadow: 0 0 0 3px rgba(197, 168, 90, 0.15);
          background: #ffffff;
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
          color: var(--text-main);
          margin-bottom: 20px;
        }
        .hero-text-col p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 30px;
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
          background: var(--accent-primary);
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
          background: var(--accent-secondary);
          transform: translateY(-2px);
        }
        .btn-hero-seller {
          background: transparent;
          color: var(--accent-secondary);
          border: 2px solid var(--accent-secondary);
          padding: 12px 26px;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 6px;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s;
        }
        .btn-hero-seller:hover {
          background: rgba(197, 168, 90, 0.05);
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
        body:not(.light-theme) .hero-monitor-frame {
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
        body:not(.light-theme) .motto-banner {
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
        body:not(.light-theme) .motto-link {
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
        body:not(.light-theme) .section-title-centered {
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
        body:not(.light-theme) .explore-pill {
          background: rgba(255,255,255,0.02);
          border-color: var(--border-glass);
          color: var(--text-secondary);
        }
        .explore-pill:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
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
        body:not(.light-theme) .section-header-row h3 {
          color: #fff;
        }
        .btn-view-all {
          background: none;
          border: none;
          color: var(--accent-primary);
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
          background: var(--accent-primary);
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
          border-left: 3px solid var(--accent-primary);
          padding-left: 12px;
        }
        body:not(.light-theme) .section-title {
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
        body:not(.light-theme) .mock-card {
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
          color: var(--accent-primary);
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
        body:not(.light-theme) .mock-meta-small {
          color: var(--text-secondary);
        }
        .mock-body h5 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #1e293b;
        }
        body:not(.light-theme) .mock-body h5 {
          color: #fff;
        }
        .mock-price {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--accent-primary);
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
        body:not(.light-theme) .job-card-mock {
          background: rgba(255,255,255,0.02);
          border-color: var(--border-glass);
        }
        .job-card-mock:hover {
          transform: translateY(-4px);
          border-color: var(--accent-primary);
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
        body:not(.light-theme) .job-card-mock h5 {
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
        body:not(.light-theme) .job-company {
          color: var(--text-secondary);
        }
        .job-salary {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--accent-primary);
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
        body:not(.light-theme) .btn-job-details {
          border-color: var(--border-glass);
          color: var(--text-secondary);
        }
        .btn-job-details:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
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
        body:not(.light-theme) .home-featured-card {
          background: rgba(255,255,255,0.02);
          border-color: var(--border-glass);
        }
        .home-featured-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-primary);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .featured-card-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 14px;
          border: 2px solid var(--accent-primary);
        }
        .featured-card-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(13, 92, 58, 0.1);
          color: var(--accent-primary);
          font-size: 2.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          border: 2px solid var(--accent-primary);
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
        body:not(.light-theme) .home-featured-card h5 {
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
        body:not(.light-theme) .featured-card-subtitle {
          color: var(--text-secondary);
        }
        .featured-card-price {
          font-size: 1rem;
          color: var(--accent-primary);
          font-weight: 800;
          display: block;
          margin-bottom: 14px;
        }
        body:not(.light-theme) .featured-card-price {
          color: #6ee7b7;
        }
        .btn-featured-card-action {
          background: var(--accent-primary);
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
        body:not(.light-theme) .prof-card-mock {
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
          border: 2px solid var(--accent-primary);
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
        body:not(.light-theme) .prof-title {
          color: var(--text-secondary);
        }
        .prof-stars {
          font-size: 0.8rem;
          color: #f59e0b;
          display: block;
          margin-bottom: 16px;
        }
        .btn-prof-book {
          background: var(--accent-primary);
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
        body:not(.light-theme) .how-it-works-section {
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
        body:not(.light-theme) .section-subtitle-centered {
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
        body:not(.light-theme) .step-col p {
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
        body:not(.light-theme) .features-footer-row {
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
        body:not(.light-theme) .feat-item p {
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
          background: var(--accent-primary);
          border: none;
          color: #ffffff;
          padding: 0 16px;
          cursor: pointer;
        }
        .btn-newsletter-send:hover {
          background: var(--accent-secondary);
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
        
        /* Premium Filter Sidebar Styling - Dynamic Theme Sync */
        .filter-sidebar-card {
          background: var(--bg-card);
          backdrop-filter: var(--blur-glass);
          -webkit-backdrop-filter: var(--blur-glass);
          border: 1px solid var(--border-glass);
          box-shadow: var(--shadow-premium), var(--shadow-inset);
          border-radius: var(--radius-lg);
          padding: 24px;
          color: var(--text-main);
          transition: var(--transition-smooth);
        }
        .filter-sidebar-card h2 {
          color: var(--text-main) !important;
        }
        .filter-sidebar-card h4 {
          color: var(--text-secondary) !important;
        }
        .filter-sidebar-card label, .filter-sidebar-card span {
          color: var(--text-secondary) !important;
        }
        
        .filter-location-input {
          width: 100%;
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          border: 1px solid var(--border-glass);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-main);
          font-size: 0.9rem;
          outline: none;
          transition: var(--transition-fast);
        }
        body.light-theme .filter-location-input {
          background: rgba(0, 0, 0, 0.02);
          border-color: rgba(0, 0, 0, 0.12);
        }
        .filter-location-input:focus {
          border-color: #0f5132;
        }
        body.light-theme .filter-location-input:focus {
          border-color: #0f5132;
        }
        
        /* Pill Filter Toggle Button matching user mockup */
        .filter-toggle-btn {
          background-color: #e9ecef !important;
          color: #1e293b !important;
          border: 1px solid #dee2e6 !important;
          transition: background-color 0.2s, border-color 0.2s;
        }
        .filter-toggle-btn:hover {
          background-color: #dee2e6 !important;
        }
        body:not(.light-theme) .filter-toggle-btn {
          background-color: rgba(255, 255, 255, 0.08) !important;
          color: #ffffff !important;
          border: 1px solid var(--border-glass) !important;
        }
        body:not(.light-theme) .filter-toggle-btn:hover {
          background-color: rgba(255, 255, 255, 0.15) !important;
        }

        /* Mobile Filter Drawer CSS */
        @media (max-width: 991px) {
          .mobile-filter-drawer {
            display: block !important;
            position: fixed;
            top: 0;
            left: 0;
            width: 75%;
            height: 100vh;
            height: 100dvh;
            background: var(--bg-app);
            z-index: 1050;
            margin: 0;
            padding: 0;
            box-shadow: 4px 0 15px rgba(0,0,0,0.5);
            animation: slideInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .mobile-filter-drawer .filter-sidebar-card {
            border-radius: 0;
            border: none;
            padding: 20px;
            background: transparent;
            box-shadow: none;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .mobile-filter-drawer .filter-sidebar-card::-webkit-scrollbar {
            display: none;
          }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;
