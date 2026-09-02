// Ultimate Master Marketplace - Home Page (Optimized for High Scale)
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ListingCard from '../components/ListingCard';
import logoImg from '../assets/logo.png';
import FilterButton from '../components/FilterButton';
import { Search, Star, Calendar, Clock, MapPin, Phone, MessageCircle, X, Tag } from 'lucide-react';

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

  // Events widget state
  const [widgetEvents, setWidgetEvents] = useState([]);
  const [widgetLocation, setWidgetLocation] = useState('');
  const [loadingWidgetEvents, setLoadingWidgetEvents] = useState(false);
  const [selectedWidgetEvent, setSelectedWidgetEvent] = useState(null);
  const [currentWidgetIndex, setCurrentWidgetIndex] = useState(0);

  useEffect(() => {
    setCurrentWidgetIndex(0);
  }, [widgetEvents]);

  useEffect(() => {
    if (widgetEvents.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentWidgetIndex(prev => (prev + 1) % widgetEvents.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [widgetEvents]);

  const fetchWidgetEvents = async () => {
    try {
      setLoadingWidgetEvents(true);
      let url = '/api/events?';
      if (widgetLocation) {
        url += `location=${encodeURIComponent(widgetLocation)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const active = data.filter(evt => !evt.eventDate || new Date(evt.eventDate) >= cutoff);
        // Show max 3 upcoming events in the widget
        setWidgetEvents(active.slice(0, 3));
      }
    } catch (err) {
      console.error('Error fetching widget events:', err);
    } finally {
      setLoadingWidgetEvents(false);
    }
  };

  const formatWidgetEventDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatShortDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  useEffect(() => {
    fetchWidgetEvents();
  }, [widgetLocation]);

  const getCategoryTranslationKey = (name) => {
    if (!name) return '';
    const map = {
      'Boutique': 'boutique',
      'Pharmacy': 'pharmacy',
      'Liquor Store': 'liquor_store',
      'Grocery Store': 'grocery_store',
      'Electronics Shop': 'electronics_shop',
      'Bookstore': 'bookstore',
      'Furniture': 'furniture',
      'Hardware Store': 'hardware_store',
      'Cafe & Restaurant': 'cafe_restaurant',
      'Jewelry & Accessories': 'jewelry_accessories',
      'Gift & Toy Shop': 'gift_toy',
      'Other Store': 'other_store',
      'Other': 'other',
      'Law Office': 'law_office',
      'Tax Office': 'tax_office',
      'Clinic': 'clinic',
      'Consulting Firm': 'consulting_firm',
      'Cleaning Agency': 'cleaning_agency',
      'Beauty Salon': 'beauty_salon',
      'Residential Homes': 'residential_homes',
      'Rental Apartments': 'rental_apartments',
      'Commercial Real Estate': 'commercial_real_estate',
      'Land & Lots': 'land_lots',
      'Used Car Dealership': 'used_car_dealership',
      'Car Rental Service': 'car_rental_service',
      'Auto Repair Workshop': 'auto_repair_workshop',
      'Spare Parts Dealer': 'spare_parts_dealer'
    };
    return map[name] || '';
  };

  const storeCategoryNames = [
    'Boutique', 'Pharmacy', 'Liquor Store', 'Grocery Store', 'Electronics Shop',
    'Bookstore', 'Furniture', 'Hardware Store', 'Cafe & Restaurant',
    'Jewelry & Accessories', 'Gift & Toy Shop', 'Spare Parts Dealer', 'Other Store', 'Other'
  ];

  const serviceCategoryNames = [
    'Law Office', 'Tax Office', 'Clinic', 'Consulting Firm', 'Cleaning Agency', 'Beauty Salon'
  ];

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
  const [carOfferType, setCarOfferType] = useState('All');
  const [carCategoryFilter, setCarCategoryFilter] = useState('All');
  const [carConditionFilter, setCarConditionFilter] = useState('All');
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

  // Sync local input and category states with URL parameter changes (e.g. when user clicks home/logo)
  useEffect(() => {
    setSearchInput(searchParams.get('query') || '');
    setSelectedCategory(searchParams.get('category') || '');
  }, [searchParams]);

  // Fetch listing data based on queries
  const fetchListings = async (page = 1) => {
    try {
      setLoading(true);
      setError('');
      
      let url = `/api/listings?status=active&page=${page}&limit=20`;
      if (searchQuery) url += `&query=${encodeURIComponent(searchQuery)}`;
      if (selectedType) url += `&type=${encodeURIComponent(selectedType)}`;
      if (selectedCategory) url += `&category=${encodeURIComponent(selectedCategory)}`;

      const response = await fetch(url);
      if (!response.ok) {
        setListings([]);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setListings(Array.isArray(data) ? data : []);
      const pagesCount = parseInt(response.headers.get('X-Total-Pages')) || 1;
      setTotalPages(pagesCount);
      setCurrentPage(page);
    } catch (err) {
      console.warn('Listings fetch error:', err.message);
      setListings([]);
      setError('');
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
        { name: 'Housekeeper', key: 'specialty_housekeeper' },
        { name: 'Childcare Provider', key: 'specialty_childcare' },
        { name: 'Property Manager', key: 'specialty_property_manager' },
        { name: 'Cook', key: 'specialty_cook' },
        { name: 'Caretaker', key: 'specialty_caretaker' },
        { name: 'Electrician', key: 'specialty_electrician' },
        { name: 'Plumber', key: 'specialty_plumber' },
        { name: 'Carpenter', key: 'specialty_carpenter' },
        { name: 'Handyman', key: 'specialty_handyman' },
        { name: 'Painter', key: 'specialty_painter' },
        { name: 'HVAC Specialist', key: 'specialty_hvac' },
        { name: 'Pest Control', key: 'specialty_pest_control' },
        { name: 'Contractor', key: 'specialty_contractor' },
        { name: 'Mason', key: 'specialty_mason' },
        { name: 'Roofer', key: 'specialty_roofer' },
        { name: 'Drywall Specialist', key: 'specialty_drywall' },
        { name: 'Flooring Specialist', key: 'specialty_flooring' },
        { name: 'Landscaper', key: 'specialty_landscaper' },
        { name: 'Window Installer', key: 'specialty_window_installer' },
        { name: 'Tiler', key: 'specialty_tiler' },
        { name: 'Architect', key: 'specialty_architect' },
        { name: 'Designer', key: 'specialty_designer' }
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
          { name: 'Boutique', type: 'store' },
          { name: 'Pharmacy', type: 'store' },
          { name: 'Liquor Store', type: 'store' },
          { name: 'Grocery Store', type: 'store' },
          { name: 'Electronics Shop', type: 'store' },
          { name: 'Bookstore', type: 'store' },
          { name: 'Furniture', type: 'store' },
          { name: 'Hardware Store', type: 'store' },
          { name: 'Cafe & Restaurant', type: 'store' },
          { name: 'Jewelry & Accessories', type: 'store' },
          { name: 'Gift & Toy Shop', type: 'store' },
          { name: 'Spare Parts Dealer', type: 'store' },
          { name: 'Other Store', type: 'store' },
          { name: 'Law Office', type: 'service' },
          { name: 'Tax Office', type: 'service' },
          { name: 'Clinic', type: 'service' },
          { name: 'Consulting Firm', type: 'service' },
          { name: 'Cleaning Agency', type: 'service' },
          { name: 'Beauty Salon', type: 'service' },
          { name: 'Residential Homes', type: 'real_estate' },
          { name: 'Rental Apartments', type: 'real_estate' },
          { name: 'Commercial Real Estate', type: 'real_estate' },
          { name: 'Land & Lots', type: 'real_estate' },
          { name: 'Used Car Dealership', type: 'automotive' },
          { name: 'Car Rental Service', type: 'automotive' },
          { name: 'Auto Repair Workshop', type: 'automotive' },
          { name: 'Spare Parts Dealer', type: 'automotive' }
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

    if (item.type === 'car' || item.category === 'Used Car Dealership' || item.category === 'Spare Parts Dealer' || item.category === 'Auto Repair Workshop' || item.category === 'Car Rental Service') {
      const meta = item.metadata || {};
      
      if (carOfferType !== 'All') {
        const itemOffer = (item.offerType || meta.offerType || (item.category === 'Car Rental Service' ? 'rent' : 'sale')).toLowerCase();
        if (carOfferType === 'sale' && !itemOffer.includes('sale')) return false;
        if (carOfferType === 'rent' && !itemOffer.includes('rent')) return false;
      }

      if (carCategoryFilter !== 'All') {
        const itemCat = (item.category || '').toLowerCase();
        const targetCat = carCategoryFilter.toLowerCase();
        if (!itemCat.includes(targetCat) && !targetCat.includes(itemCat)) {
          if (targetCat.includes('used') && !itemCat.includes('used')) return false;
          if (targetCat.includes('repair') && !itemCat.includes('repair')) return false;
          if (targetCat.includes('spare') && !itemCat.includes('spare')) return false;
          if (targetCat.includes('rental') && !itemCat.includes('rental')) return false;
          if (targetCat.includes('new') && !itemCat.includes('new') && meta.condition !== 'new') return false;
        }
      }

      if (carConditionFilter !== 'All') {
        const cond = (meta.condition || item.condition || '').toLowerCase();
        if (carConditionFilter === 'new' && !cond.includes('new')) return false;
        if (carConditionFilter === 'used' && cond.includes('new') && !cond.includes('used')) return false;
      }

      if (brandFilter !== 'All') {
        const make = (meta.make || meta.brand || item.make || item.brand || '').toLowerCase();
        if (!make.includes(brandFilter.toLowerCase())) return false;
      }

      if (minYear !== 'All') {
        const yearNum = parseInt(meta.year) || 0;
        const targetYear = parseInt(minYear.replace('+', '')) || 0;
        if (yearNum < targetYear) return false;
      }

      if (transmissionFilter !== 'All') {
        const trans = (meta.transmission || '').toLowerCase();
        if (!trans.includes(transmissionFilter.toLowerCase())) return false;
      }

      if (fuelType !== 'All') {
        const fuel = (meta.fuelType || '').toLowerCase();
        if (!fuel.includes(fuelType.toLowerCase())) return false;
      }

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
      if (selectedCategory) {
        const itemCat = item.category || '';
        if (itemCat.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      }
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
                <h1>{t('landing_hero_title')}</h1>
                <p>{t('landing_hero_desc')}</p>
                <div className="hero-btn-row">
                  <button onClick={() => handleTypeSelect('store_product')} className="btn-hero-shopping">{t('landing_start_shopping')}</button>
                  <Link to="/register" className="btn-hero-seller">{t('landing_become_seller')}</Link>
                </div>
              </div>
              <div className="hero-img-col">
                <div className="glass-panel p-4" style={{ borderRadius: '16px', border: '1px solid var(--border-glass)', background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-main)', textAlign: 'left' }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)' }}>🎉 Events Nearby</h3>
                    <Link to="/events" style={{ fontSize: '0.82rem', color: 'var(--accent-secondary)', textDecoration: 'none', fontWeight: 'semibold' }}>View All →</Link>
                  </div>
                  
                  {/* Widget events list (Carousel Mode) */}
                  <div className="position-relative" style={{ minHeight: '260px', display: 'flex', flexDirection: 'column' }}>
                    {loadingWidgetEvents ? (
                       <div className="text-center py-5 my-auto">
                         <div className="spinner-border spinner-border-sm text-success" role="status" />
                       </div>
                    ) : widgetEvents.length === 0 ? (
                       <div className="text-center py-5 my-auto text-muted" style={{ fontSize: '0.85rem' }}>
                         No events found {widgetLocation && `in "${widgetLocation}"`}.
                       </div>
                    ) : (
                       (() => {
                         const evt = widgetEvents[currentWidgetIndex];
                         if (!evt) return null;
                         return (
                           <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                             {/* Card Body */}
                             <div 
                               className="rounded-3" 
                               onClick={() => setSelectedWidgetEvent(evt)}
                               style={{ 
                                 background: 'rgba(255,255,255,0.02)', 
                                 border: '1px solid var(--border-glass)', 
                                 cursor: 'pointer', 
                                 transition: 'all 0.3s ease',
                                 overflow: 'hidden',
                                 display: 'flex',
                                 flexDirection: 'column'
                               }}
                               onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                               onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-glass)'}
                             >
                               {/* Image Banner */}
                               <div style={{ position: 'relative', height: '120px', background: '#1e293b', overflow: 'hidden' }}>
                                 {evt.images && evt.images.length > 0 ? (
                                   <img src={evt.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                 ) : (
                                   <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted" style={{ background: 'rgba(255,255,255,0.01)' }}>
                                     <span style={{ fontSize: '2.5rem' }}>🎉</span>
                                   </div>
                                 )}
                                 <span style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)', color: evt.price === 0 ? 'var(--accent-success)' : '#ffffff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: 'bold' }}>
                                   {evt.price === 0 ? 'FREE' : `$${evt.price}`}
                                 </span>
                               </div>

                               {/* Text info */}
                               <div className="p-3">
                                 <div className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)' }}>
                                   <Tag size={10} />
                                   <span className="fw-bold text-uppercase">{evt.category}</span>
                                   {evt.subCategory && (
                                     <>
                                       <span>•</span>
                                       <span>{evt.subCategory}</span>
                                     </>
                                   )}
                                 </div>
                                 <h5 style={{ margin: '0 0 8px 0', fontSize: '0.98rem', fontWeight: 'bold', color: 'var(--text-main)' }} className="text-truncate">{evt.title}</h5>
                                 
                                 <div className="space-y-1" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                                   <div className="d-flex align-items-center gap-2">
                                     <Calendar size={12} style={{ color: 'var(--accent-primary)' }} />
                                     <span>{formatShortDate(evt.eventDate)}</span>
                                   </div>
                                   <div className="d-flex align-items-center gap-2">
                                     <Clock size={12} style={{ color: 'var(--accent-primary)' }} />
                                     <span>{evt.eventTime}</span>
                                   </div>
                                   <div className="d-flex align-items-center gap-2">
                                     <MapPin size={12} style={{ color: 'var(--accent-secondary)' }} />
                                     <span className="text-truncate">{evt.location} - {evt.address || 'Venue TBA'}</span>
                                   </div>
                                 </div>
                               </div>
                             </div>

                             {/* Carousel Controls */}
                             {widgetEvents.length > 1 && (
                               <div className="d-flex justify-content-between align-items-center mt-3 px-1">
                                 <button 
                                   onClick={(e) => {
                                     e.stopPropagation();
                                     setCurrentWidgetIndex(prev => (prev - 1 + widgetEvents.length) % widgetEvents.length);
                                   }}
                                   className="btn btn-sm btn-outline-secondary"
                                   style={{ border: '1px solid var(--border-glass)', borderRadius: '50%', width: '28px', height: '28px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}
                                 >
                                   ◀
                                 </button>
                                 
                                 <div className="d-flex gap-1">
                                   {widgetEvents.map((_, idx) => (
                                     <span 
                                       key={idx}
                                       onClick={(e) => {
                                         e.stopPropagation();
                                         setCurrentWidgetIndex(idx);
                                       }}
                                       style={{
                                         width: '6px',
                                         height: '6px',
                                         borderRadius: '50%',
                                         background: idx === currentWidgetIndex ? 'var(--accent-primary)' : 'var(--border-glass)',
                                         cursor: 'pointer',
                                         transition: 'all 0.2s'
                                       }}
                                     />
                                   ))}
                                 </div>

                                 <button 
                                   onClick={(e) => {
                                     e.stopPropagation();
                                     setCurrentWidgetIndex(prev => (prev + 1) % widgetEvents.length);
                                   }}
                                   className="btn btn-sm btn-outline-secondary"
                                   style={{ border: '1px solid var(--border-glass)', borderRadius: '50%', width: '28px', height: '28px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}
                                 >
                                   ▶
                                 </button>
                               </div>
                             )}
                           </div>
                         );
                       })()
                    )}
                  </div>

                  {/* Quick search by location inside the widget (Moved to Bottom) */}
                  <div className="position-relative mt-2">
                    <MapPin className="position-absolute translate-middle-y" style={{ left: '10px', top: '50%', color: 'var(--accent-secondary)' }} size={14} />
                    <input
                      type="text"
                      placeholder="Enter City or Area (e.g. Bole)..."
                      className="form-control form-control-sm"
                      style={{ paddingLeft: '32px', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', color: 'var(--text-main)', fontSize: '0.85rem', height: '36px' }}
                      value={widgetLocation}
                      onChange={(e) => setWidgetLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Webapp Explanation & About Section */}
          <section className="container mb-5 mt-4">
            <div className="glass-panel p-4 p-md-5 shadow-sm" style={{ borderRadius: '20px', border: '1px solid var(--border-glass)', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)' }}>
              <div className="text-center mx-auto mb-4" style={{ maxWidth: '800px' }}>
                <span className="badge px-3 py-2 rounded-pill mb-3" style={{ fontSize: '0.82rem', letterSpacing: '0.5px', whiteSpace: 'normal', wordBreak: 'break-word', display: 'inline-block', maxWidth: '100%', backgroundColor: 'rgba(197, 168, 90, 0.12)', color: 'var(--accent-secondary)', border: '1px solid rgba(197, 168, 90, 0.3)' }}>
                  🌐 {t('about_app_subtitle')}
                </span>
                <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--text-main)', margin: '10px 0' }}>
                  {t('about_app_title')}
                </h2>
                <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
                  {t('about_app_desc')}
                </p>
              </div>

              <div className="row g-4 mt-2">
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="p-4 rounded-3 h-100" style={{ background: 'var(--bg-card-hover, rgba(0,0,0,0.02))', border: '1px solid var(--border-glass)', transition: 'all 0.3s' }}>
                    <div className="mb-2" style={{ fontSize: '2rem' }}>🛍️</div>
                    <h5 style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '1.05rem', marginBottom: '8px' }}>
                      {t('expl_feature1_title')}
                    </h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', margin: 0, lineHeight: '1.5' }}>
                      {t('expl_feature1_desc')}
                    </p>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                  <div className="p-4 rounded-3 h-100" style={{ background: 'var(--bg-card-hover, rgba(0,0,0,0.02))', border: '1px solid var(--border-glass)', transition: 'all 0.3s' }}>
                    <div className="mb-2" style={{ fontSize: '2rem' }}>🚗</div>
                    <h5 style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '1.05rem', marginBottom: '8px' }}>
                      {t('expl_feature2_title')}
                    </h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', margin: 0, lineHeight: '1.5' }}>
                      {t('expl_feature2_desc')}
                    </p>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                  <div className="p-4 rounded-3 h-100" style={{ background: 'var(--bg-card-hover, rgba(0,0,0,0.02))', border: '1px solid var(--border-glass)', transition: 'all 0.3s' }}>
                    <div className="mb-2" style={{ fontSize: '2rem' }}>🛠️</div>
                    <h5 style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '1.05rem', marginBottom: '8px' }}>
                      {t('expl_feature3_title')}
                    </h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', margin: 0, lineHeight: '1.5' }}>
                      {t('expl_feature3_desc')}
                    </p>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                  <div className="p-4 rounded-3 h-100" style={{ background: 'var(--bg-card-hover, rgba(0,0,0,0.02))', border: '1px solid var(--border-glass)', transition: 'all 0.3s' }}>
                    <div className="mb-2" style={{ fontSize: '2rem' }}>⚡</div>
                    <h5 style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '1.05rem', marginBottom: '8px' }}>
                      {t('expl_feature4_title')}
                    </h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', margin: 0, lineHeight: '1.5' }}>
                      {t('expl_feature4_desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>




          {/* Browse by Category Grid */}
          <section className="category-browse-grid container">
            <div className="section-header-row">
              <h3>{t('landing_browse_category')}</h3>
              <button onClick={() => handleTypeSelect('store_product')} className="btn-view-all">{t('landing_view_all')}</button>
            </div>
            <div className="row g-3 g-md-4 align-items-stretch">
              {/* Left Large Card */}
              <div className="col-12 col-lg-6 mb-3 mb-lg-0">
                <div className="cat-card-large h-100" onClick={() => handleTypeSelect('personal_item')} style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', minHeight: '260px' }}>
                  <div className="cat-img-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80" alt="Used Items" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="cat-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px', zIndex: 2 }}>
                      <span className="cat-badge-tag" style={{ background: '#c5a85a', color: '#000000', fontWeight: '800', fontSize: '0.72rem', padding: '4px 10px', borderRadius: '6px', width: 'fit-content', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ACTIVE</span>
                      <h4 style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.75rem', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.95)', letterSpacing: '-0.02em' }}>{t('used_items')}</h4>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right 4-card Grid */}
              <div className="col-12 col-lg-6">
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <div className="cat-card-small" onClick={() => handleTypeSelect('car')} style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', height: '140px' }}>
                      <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80" alt="Automotive" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div className="cat-overlay-small" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)', display: 'flex', alignItems: 'flex-end', padding: '14px', zIndex: 2 }}>
                        <h4 style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.1rem', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.95)', letterSpacing: '-0.01em' }}>{t('automotive')}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="cat-card-small" onClick={() => handleTypeSelect('house')} style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', height: '140px' }}>
                      <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80" alt="Real Estate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div className="cat-overlay-small" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)', display: 'flex', alignItems: 'flex-end', padding: '14px', zIndex: 2 }}>
                        <h4 style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.1rem', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.95)', letterSpacing: '-0.01em' }}>{t('real_estate')}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="cat-card-small" onClick={() => handleTypeSelect('job_opening')} style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', height: '140px' }}>
                      <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80" alt="Jobs" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div className="cat-overlay-small" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)', display: 'flex', alignItems: 'flex-end', padding: '14px', zIndex: 2 }}>
                        <h4 style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.1rem', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.95)', letterSpacing: '-0.01em' }}>{t('organizations')}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="cat-card-small" onClick={() => handleTypeSelect('service')} style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', height: '140px' }}>
                      <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80" alt="Services" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div className="cat-overlay-small" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)', display: 'flex', alignItems: 'flex-end', padding: '14px', zIndex: 2 }}>
                        <h4 style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.1rem', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.95)', letterSpacing: '-0.01em' }}>{t('services')}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Marketplace */}
          <section className="featured-section container">
            <h3 className="section-title">{t('landing_popular_marketplace')}</h3>
            <div className="horizontal-scroll-row">
              {activeProducts.map(item => {
                const ownerSlug = item.ownerName ? item.ownerName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-') : '';
                const cardUrl = item.type === 'personal_item' ? `/?type=personal_item&query=${encodeURIComponent(item.title)}` : `/store/${ownerSlug}`;
                return (
                  <Link key={item._id} to={cardUrl} className="home-featured-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {item.images && item.images[0] ? (
                      <img src={item.images[0]} alt={item.title} className="featured-card-avatar" />
                    ) : (
                      <div className="featured-card-icon">🛍️</div>
                    )}
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      <h5>{item.title}</h5>
                      <span className="featured-card-subtitle">{item.category || 'Product'}</span>
                      <span className="featured-card-price">${item.price}</span>
                    </div>
                    <span className="btn-featured-card-action">
                      {t('landing_view_details')}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
 
          {/* Popular Vehicles */}
          <section className="featured-section container">
            <h3 className="section-title">{t('landing_popular_vehicles')}</h3>
            <div className="horizontal-scroll-row">
              {activeCars.map(item => {
                const ownerSlug = item.ownerName ? item.ownerName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-') : '';
                const subtitle = item.metadata ? `${item.metadata.year || ''} • ${item.metadata.mileage ? item.metadata.mileage.toLocaleString() + ' mi' : ''}` : 'Vehicle';
                const cardUrl = `/store/${ownerSlug}`;
                return (
                  <Link key={item._id} to={cardUrl} className="home-featured-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {item.images && item.images[0] ? (
                      <img src={item.images[0]} alt={item.title} className="featured-card-avatar" />
                    ) : (
                      <div className="featured-card-icon">🚗</div>
                    )}
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      <h5>{item.title}</h5>
                      <span className="featured-card-subtitle">{subtitle}</span>
                      <span className="featured-card-price">${item.price ? item.price.toLocaleString() : 'Open'}</span>
                    </div>
                    <span className="btn-featured-card-action">{t('landing_view_vehicle')}</span>
                  </Link>
                );
              })}
            </div>
          </section>
 
          {/* Popular Real Estate */}
          <section className="featured-section container">
            <h3 className="section-title">{t('landing_popular_real_estate')}</h3>
            <div className="horizontal-scroll-row">
              {activeHouses.map(item => {
                const ownerSlug = item.ownerName ? item.ownerName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-') : '';
                const subtitle = item.metadata ? `${item.metadata.bedrooms || 0} Beds • ${item.metadata.bathrooms || 0} Baths` : 'Property';
                const cardUrl = `/store/${ownerSlug}`;
                return (
                  <Link key={item._id} to={cardUrl} className="home-featured-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {item.images && item.images[0] ? (
                      <img src={item.images[0]} alt={item.title} className="featured-card-avatar" />
                    ) : (
                      <div className="featured-card-icon">🏠</div>
                    )}
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      <h5>{item.title}</h5>
                      <span className="featured-card-subtitle">{subtitle}</span>
                      <span className="featured-card-price">${item.price ? item.price.toLocaleString() : 'Open'}</span>
                    </div>
                    <span className="btn-featured-card-action">{t('landing_view_property')}</span>
                  </Link>
                );
              })}
            </div>
          </section>
 
          {/* Popular Job Openings */}
          <section className="featured-section container">
            <h3 className="section-title">{t('landing_popular_jobs')}</h3>
            <div className="horizontal-scroll-row">
              {activeJobs.map(item => {
                const ownerSlug = item.ownerName ? item.ownerName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-') : '';
                const cardUrl = `/store/${ownerSlug}`;
                return (
                  <Link key={item._id} to={cardUrl} className="home-featured-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="featured-card-icon">💼</div>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      <h5>{item.title}</h5>
                      <span className="featured-card-subtitle">{item.ownerName || t('employer')}</span>
                      <span className="featured-card-price">{t('open_salary')}</span>
                    </div>
                    <span className="btn-featured-card-action">{t('landing_view_job')}</span>
                  </Link>
                );
              })}
            </div>
          </section>
 
          {/* Featured Professionals */}
          <section className="featured-section container">
            <h3 className="section-title">{t('landing_featured_professionals')}</h3>
            <div className="professionals-row">
              {activeProfessionals.map((prof) => {
                const handleClick = () => {
                  if (prof.isReal) {
                    window.location.href = `tel:${prof.phone}`;
                  } else {
                    handleTypeSelect('handyman_skill');
                  }
                };
                return (
                  <div key={prof._id} className="home-featured-card" style={{ cursor: 'pointer' }} onClick={handleClick}>
                    <img src={prof.images[0]} alt={prof.name} className="featured-card-avatar" />
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      <h5>{prof.name}</h5>
                      <span className="featured-card-subtitle">{prof.title}</span>
                      <span className="featured-card-price" style={{ fontSize: '0.8rem', color: '#eab308' }}>{prof.rating}</span>
                    </div>
                    <span className="btn-featured-card-action">{t('landing_book_service')}</span>
                  </div>
                );
              })}
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



          <div className="directory-layout-flex">
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
            <aside className={`directory-sidebar-col ${isFilterOpen ? 'mobile-filter-drawer' : 'd-none d-lg-block'} mb-4`}>
              <div className="filter-sidebar-card" style={{ height: '100%', overflowY: 'auto' }}>
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

                {selectedType === 'car' && (() => {
                  const postedCarBrands = Array.from(new Set(
                    listings
                      .filter(item => item.type === 'car' || item.category === 'Used Car Dealership' || item.category === 'Spare Parts Dealer' || item.category === 'Auto Repair Workshop' || item.category === 'Car Rental Service')
                      .map(item => item.metadata?.make || item.metadata?.brand || item.make || item.brand)
                      .filter(Boolean)
                  ));
                  const dynamicCarBrands = ['All', ...(postedCarBrands.length > 0 ? postedCarBrands : ['Tesla', 'BMW', 'Ford', 'Toyota', 'Honda', 'Hyundai', 'Nissan'])];

                  return (
                  <div className="space-y-4">
                    <h2 className="fs-4 fw-bold pb-2 border-bottom">{t('filters')}</h2>

                    {/* Listing Offer Type (For Sale / For Rent) */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>Listing Offer Type</h4>
                      {[
                        { value: 'All', label: 'All Offers (Sale & Rent)' },
                        { value: 'sale', label: '🏷️ For Sale' },
                        { value: 'rent', label: '🔑 For Rent' }
                      ].map((item) => (
                        <label key={item.value} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="carOfferType"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={carOfferType === item.value}
                            onChange={() => setCarOfferType(item.value)}
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>

                    {/* Automotive Category / Service */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>Category & Services</h4>
                      {[
                        { value: 'All', label: 'All Categories' },
                        { value: 'Used Car Dealership', label: '🚘 Used Car Dealership' },
                        { value: 'New Car', label: '🏎️ New Car' },
                        { value: 'Car Rental Service', label: '🔑 Car Rental Service' },
                        { value: 'Auto Repair Workshop', label: '🛠️ Auto Repair Workshop' },
                        { value: 'Spare Parts Dealer', label: '⚙️ Spare Parts Dealer' }
                      ].map((item) => (
                        <label key={item.value} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="carCategoryFilter"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={carCategoryFilter === item.value}
                            onChange={() => setCarCategoryFilter(item.value)}
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>

                    {/* Condition (New / Used) */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>Condition</h4>
                      {[
                        { value: 'All', label: 'All Conditions' },
                        { value: 'new', label: '✨ New' },
                        { value: 'used', label: '🚘 Used / Pre-Owned' }
                      ].map((item) => (
                        <label key={item.value} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="carConditionFilter"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={carConditionFilter === item.value}
                            onChange={() => setCarConditionFilter(item.value)}
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>

                    {/* Dynamic Brand / Car Maker */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('brand')}</h4>
                      {dynamicCarBrands.map((b) => (
                        <label key={b} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="brandFilter"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={brandFilter === b}
                            onChange={() => setBrandFilter(b)}
                          />
                          <span>{b === 'All' ? t('all') : b}</span>
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
                          setCarOfferType('All');
                          setCarCategoryFilter('All');
                          setCarConditionFilter('All');
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
                  );
                })()}

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

                    {/* Category */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('category')}</h4>
                      {[
                        { name: 'All' },
                        ...categories.filter(cat => cat.type === 'service' || serviceCategoryNames.includes(cat.name))
                      ].map((item) => (
                        <label key={item.name + '-' + (item._id || 'all')} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="serviceCategory"
                            className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                            checked={(item.name === 'All' && !selectedCategory) || selectedCategory === item.name}
                            onChange={() => setSelectedCategory(item.name === 'All' ? '' : item.name)}
                          />
                          <span>{item.name === 'All' ? t('all') : (t(getCategoryTranslationKey(item.name)) || item.name)}</span>
                        </label>
                      ))}
                    </div>

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

                {selectedType === 'handyman_skill' && (
                  <div className="space-y-4">
                    <h2 className="fs-4 fw-bold pb-2 border-bottom">{t('filters')}</h2>

                    {/* Skill Specialty Category */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('experties') || 'Hire Me'}</h4>
                      <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '8px', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '10px', background: 'rgba(255,255,255,0.01)' }}>
                        {[
                          { value: '', key: 'all_specialties', name: 'All' },
                          { value: 'Housekeeper', key: 'specialty_housekeeper' },
                          { value: 'Childcare Provider', key: 'specialty_childcare' },
                          { value: 'Property Manager', key: 'specialty_property_manager' },
                          { value: 'Cook', key: 'specialty_cook' },
                          { value: 'Caretaker', key: 'specialty_caretaker' },
                          { value: 'Electrician', key: 'specialty_electrician' },
                          { value: 'Plumber', key: 'specialty_plumber' },
                          { value: 'Carpenter', key: 'specialty_carpenter' },
                          { value: 'Handyman', key: 'specialty_handyman' },
                          { value: 'Painter', key: 'specialty_painter' },
                          { value: 'HVAC Specialist', key: 'specialty_hvac' },
                          { value: 'Pest Control', key: 'specialty_pest_control' },
                          { value: 'Contractor', key: 'specialty_contractor' },
                          { value: 'Mason', key: 'specialty_mason' },
                          { value: 'Roofer', key: 'specialty_roofer' },
                          { value: 'Drywall Specialist', key: 'specialty_drywall' },
                          { value: 'Flooring Specialist', key: 'specialty_flooring' },
                          { value: 'Landscaper', key: 'specialty_landscaper' },
                          { value: 'Window Installer', key: 'specialty_window_installer' },
                          { value: 'Tiler', key: 'specialty_tiler' },
                          { value: 'Architect', key: 'specialty_architect' },
                          { value: 'Designer', key: 'specialty_designer' }
                        ].map((item) => {
                          const val = item.value;
                          const labelText = item.name === 'All' ? (t('all') || 'All') : (t(item.key) || val);
                          const isChecked = selectedCategory === val;
                          return (
                            <label key={val || 'all'} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                              <input
                                type="radio"
                                name="handymanSpecialty"
                                className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                                checked={isChecked}
                                onChange={() => setSelectedCategory(val)}
                              />
                              <span>{labelText}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

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

                {/* Marketplace / Used Items filters (Default fallback when store_product/personal_item or no specific filter selected) */}
                {(selectedType === 'store_product' || selectedType === 'personal_item' || !selectedType) && (
                  <div className="space-y-4">
                    <h2 className="fs-4 fw-bold pb-2 border-bottom">{t('filters')}</h2>

                    {/* Category */}
                    <div className="mt-3">
                      <h4 className="text-xs fw-bold text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>{t('category')}</h4>
                      {[
                        { name: 'All' },
                        ...categories
                          .filter(cat => cat.type === 'store' || storeCategoryNames.includes(cat.name))
                          .reduce((acc, cat) => {
                            const catName = typeof cat === 'object' ? cat.name : cat;
                            if (catName && !acc.some(c => (typeof c === 'object' ? c.name : c) === catName)) {
                              acc.push(cat);
                            }
                            return acc;
                          }, [])
                      ].map((item) => {
                        const itemName = typeof item === 'object' ? item.name : item;
                        const translationKey = getCategoryTranslationKey(itemName);
                        const labelText = itemName === 'All' ? t('all') : (translationKey && t(translationKey) ? t(translationKey) : itemName);
                        return (
                          <label key={itemName + '-' + (item._id || 'all')} className="d-flex align-items-center gap-2 mb-2 cursor-pointer font-medium" style={{ fontSize: '0.9rem' }}>
                            <input
                              type="radio"
                              name="storeCategory"
                              className="form-check-input text-blue-600 focus:ring-blue-500 accent-blue-600"
                              checked={(itemName === 'All' && !selectedCategory) || selectedCategory === itemName}
                              onChange={() => setSelectedCategory(itemName === 'All' ? '' : itemName)}
                            />
                            <span>{labelText}</span>
                          </label>
                        );
                      })}
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
            <main className="directory-main-col">


              {error && <div className="alert alert-danger">{error}</div>}

              {loading ? (
                <div className="loading-container flex-center" style={{ flexDirection: 'column', padding: '60px 0' }}>
                  <div className="animated-logo-spinner">
                    <img src={logoImg} alt="Loading" className="logo-pulse" />
                  </div>
                  <p style={{ marginTop: '16px', fontWeight: '500', color: 'var(--text-secondary)' }}>{t('searching_active_directories') || 'Searching active directories...'}</p>
                </div>
              ) : error ? (
                null
              ) : sortedListings.length === 0 ? (
                <div className="loading-container flex-center" style={{ flexDirection: 'column', padding: '60px 0' }}>
                  <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>{t('no_listings_found') || 'No listings match your selection.'}</p>
                </div>
              ) : (
                <>
                  <div className="row g-4 listings-directory-grid">
                    {sortedListings.map((item) => (
                      <div key={item._id} className="col-12 col-sm-6 col-md-6 col-xl-4">
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

      {/* EVENT DETAILED MODAL FOR HOME WIDGET */}
      {selectedWidgetEvent && (
        <div className="modal-overlay" style={{ zIndex: 1100 }} onClick={() => setSelectedWidgetEvent(null)}>
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
              {selectedWidgetEvent.images && selectedWidgetEvent.images.length > 0 ? (
                <img 
                  src={selectedWidgetEvent.images[0]} 
                  alt={selectedWidgetEvent.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-muted" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <span style={{ fontSize: '4rem' }}>🎉</span>
                </div>
              )}
              
              <button 
                onClick={() => setSelectedWidgetEvent(null)}
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
                  color: selectedWidgetEvent.price === 0 ? 'var(--accent-success)' : '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold'
                }}
              >
                Price: {selectedWidgetEvent.price === 0 ? 'FREE' : `$${selectedWidgetEvent.price}`}
              </span>
            </div>

            <div className="p-4" style={{ color: 'var(--text-main)', textAlign: 'left' }}>
              <div className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)' }}>
                <Tag size={14} />
                <span className="fw-bold text-uppercase">{selectedWidgetEvent.category}</span>
                {selectedWidgetEvent.subCategory && (
                  <>
                    <span>•</span>
                    <span>{selectedWidgetEvent.subCategory}</span>
                  </>
                )}
              </div>

              <h2 className="fw-bold mb-4" style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>{selectedWidgetEvent.title}</h2>

              {/* Event details block */}
              <div className="row g-3 mb-4 p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', fontSize: '0.9rem' }}>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2 text-secondary">
                    <Calendar size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span>Date: <strong>{formatWidgetEventDate(selectedWidgetEvent.eventDate)}</strong></span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2 text-secondary">
                    <Clock size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span>Time: <strong>{selectedWidgetEvent.eventTime}</strong></span>
                  </div>
                </div>
                <div className="col-12 border-top pt-2 mt-2">
                  <div className="d-flex align-items-start gap-2 text-secondary">
                    <MapPin size={14} style={{ color: 'var(--accent-secondary)', marginTop: '2px' }} />
                    <span>
                      Location:{' '}
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${selectedWidgetEvent.address || ''} ${selectedWidgetEvent.location || ''}`.trim()
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
                        {selectedWidgetEvent.location}{selectedWidgetEvent.address ? ` (${selectedWidgetEvent.address})` : ' - Venue TBA'}
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold mb-2">Description</h5>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                  {selectedWidgetEvent.description}
                </p>
              </div>

              <div className="border-top pt-4">
                <h5 className="fw-bold mb-2">Organizer Contact Details</h5>
                {(selectedWidgetEvent.organizerName || (selectedWidgetEvent.ownerName && selectedWidgetEvent.ownerName !== 'Super Admin')) && (
                  <p className="text-secondary small mb-3">
                    Organized by: <strong>{selectedWidgetEvent.organizerName || selectedWidgetEvent.ownerName}</strong>
                  </p>
                )}
                <div className="d-flex gap-2">
                  <a 
                    href={`tel:${selectedWidgetEvent.organizerPhone || selectedWidgetEvent.ownerPhone}`} 
                    className="btn btn-success flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold"
                    title={`Call: ${selectedWidgetEvent.organizerPhone || selectedWidgetEvent.ownerPhone}`}
                    onMouseEnter={(e) => {
                      const p = selectedWidgetEvent.organizerPhone || selectedWidgetEvent.ownerPhone;
                      if (p) e.currentTarget.lastChild.textContent = ` Call: ${p}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.lastChild.textContent = ' Call Organizer';
                    }}
                  >
                    <Phone size={16} /> Call Organizer
                  </a>
                  <a 
                    href={`sms:${selectedWidgetEvent.organizerPhone || selectedWidgetEvent.ownerPhone}?body=Hi, I am interested in your event: ${selectedWidgetEvent.title}`} 
                    className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold"
                    title={`SMS: ${selectedWidgetEvent.organizerPhone || selectedWidgetEvent.ownerPhone}`}
                    onMouseEnter={(e) => {
                      const p = selectedWidgetEvent.organizerPhone || selectedWidgetEvent.ownerPhone;
                      if (p) e.currentTarget.lastChild.textContent = ` SMS: ${p}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.lastChild.textContent = ' Send SMS';
                    }}
                  >
                    <MessageCircle size={16} /> Send SMS
                  </a>
                </div>
              </div>
            </div>
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
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
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
          gap: 24px;
          padding: 10px 0 20px 0;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          justify-content: flex-start;
          width: 100%;
        }
        .horizontal-scroll-row::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
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
          justify-content: center;
        }
        @media (max-width: 1080px) {
          .professionals-row {
            justify-content: flex-start;
          }
        }
        .professionals-row::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
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
        
        /* Directory Layout Flexbox Structure - Clean Non-Overlapping Spacing */
        .directory-layout-flex {
          display: flex;
          gap: 36px;
          align-items: flex-start;
          width: 100%;
        }
        .directory-sidebar-col {
          width: 275px;
          flex-shrink: 0;
        }
        .directory-main-col {
          flex: 1;
          min-width: 0;
        }
        @media (max-width: 991px) {
          .directory-layout-flex {
            flex-direction: column;
            gap: 20px;
          }
          .directory-sidebar-col {
            width: 100%;
          }
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
          margin: 0;
          width: 100%;
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
        @keyframes pulseLogo {
          0% {
            transform: scale(0.9);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
            filter: drop-shadow(0 0 15px rgba(197, 168, 90, 0.6));
          }
          100% {
            transform: scale(0.9);
            opacity: 0.6;
          }
        }
        .logo-pulse {
          width: 80px;
          height: 80px;
          object-fit: contain;
          animation: pulseLogo 1.5s infinite ease-in-out;
          filter: invert(1);
        }
        .animated-logo-spinner {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
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
