// Ultimate Master Marketplace - Dashboard Page (Optimized for High Scale)
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ListingCard from '../components/ListingCard';
import QrModal from '../components/QrModal';
import { Globe } from 'lucide-react';

// Inline SVG social media icons renderer to avoid dependency/version naming conflicts
const renderSocialIcon = (platform, size = 20, style = {}) => {
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

const Dashboard = () => {
  const { t } = useApp();
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('items');
  const [inquiries, setInquiries] = useState([]);
  const [activeInquiryAlert, setActiveInquiryAlert] = useState(null);

  // Filter States
  const [listingSearch, setListingSearch] = useState('');
  const [listingStatusFilter, setListingStatusFilter] = useState('all');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');

  const filteredListings = listings.filter(item => {
    const searchLower = listingSearch.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchLower) ||
                          item.description.toLowerCase().includes(searchLower);
    const matchesStatus = listingStatusFilter === 'all' || 
      (listingStatusFilter === 'active' && item.status === 'active') ||
      (listingStatusFilter === 'inactive' && item.status !== 'active');
    return matchesSearch && matchesStatus;
  });

  const filteredInquiries = inquiries.filter(inq => {
    const searchLower = inquirySearch.toLowerCase();
    const matchesSearch = inq.customerName.toLowerCase().includes(searchLower) ||
                          inq.customerEmail.toLowerCase().includes(searchLower) ||
                          inq.customerPhone.includes(searchLower) ||
                          (inq.details && JSON.stringify(inq.details).toLowerCase().includes(searchLower));
    const matchesStatus = inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Custom Navbar Form State (Stores only)
  const [navLinks, setNavLinks] = useState([]);
  const [newLinkLabel, setNewLinkLabel] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  
  // Listing Creation Form State
  const [listingForm, setListingForm] = useState({
    title: '',
    description: '',
    price: '',
    type: 'personal_item',
    category: '',
    handymanRates: '',
    jobRequirements: '',
    salaryRate: 'hour',
    bedrooms: '',
    bathrooms: '',
    propertyType: 'House',
    year: '',
    mileage: '',
    make: '',
    model: ''
  });
  const [selectedImages, setSelectedImages] = useState([]);

  // Listing Creation Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // QR Code Modal State
  const [qrOpen, setQrOpen] = useState(false);

  // Listing Editing Modal State
  const [editingListing, setEditingListing] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    price: '',
    type: '',
    category: '',
    handymanRates: '',
    jobRequirements: '',
    salaryRate: 'hour',
    bedrooms: '',
    bathrooms: '',
    propertyType: 'House',
    year: '',
    mileage: '',
    make: '',
    model: '',
    images: []
  });

  const navigate = useNavigate();
  const { storeName: urlStoreName } = useParams();

  // Store profile custom settings form state
  const [profileForm, setProfileForm] = useState({
    storeName: '',
    description: '',
    address: '',
    storeLogo: '',
    storeImage: '',
    socialLinks: [],
    businessType: '',
    category: ''
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [profileCategories, setProfileCategories] = useState([]);

  // Fetch categories dynamically based on Business Type in settings
  useEffect(() => {
    if (!profileForm.businessType) return;
    fetch(`/api/categories?type=${profileForm.businessType}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProfileCategories(data);
          // If category is not in list or empty, set to first one
          if (!profileForm.category || !data.some(c => c.name === profileForm.category)) {
            setProfileForm(prev => ({ ...prev, category: data[0].name }));
          }
        } else {
          const fallbacks = {
            store: ['Boutique', 'Pharmacy', 'Liquor Store', 'Grocery Store', 'Electronics Shop', 'Bookstore'],
            service: ['Law Office', 'Tax Office', 'Dental Clinic', 'Consulting Firm', 'Cleaning Agency', 'Beauty Salon'],
            organization: ['Tech Corporation', 'Construction Company', 'Healthcare Group', 'Educational Institution', 'Non-Profit Org', 'Other'],
            real_estate: ['Residential Homes', 'Rental Apartments', 'Commercial Real Estate', 'Land & Lots'],
            automotive: ['Used Car Dealership', 'Car Rental Service', 'Auto Repair Workshop', 'Spare Parts Dealer']
          };
          const list = fallbacks[profileForm.businessType] || [];
          setProfileCategories(list.map(name => ({ name })));
          if (!profileForm.category || !list.includes(profileForm.category)) {
            setProfileForm(prev => ({ ...prev, category: list[0] || '' }));
          }
        }
      })
      .catch(() => {
        const fallbacks = {
          store: ['Boutique', 'Pharmacy', 'Liquor Store', 'Grocery Store', 'Electronics Shop', 'Bookstore'],
          service: ['Law Office', 'Tax Office', 'Dental Clinic', 'Consulting Firm', 'Cleaning Agency', 'Beauty Salon'],
          organization: ['Tech Corporation', 'Construction Company', 'Healthcare Group', 'Educational Institution', 'Non-Profit Org', 'Other'],
          real_estate: ['Residential Homes', 'Rental Apartments', 'Commercial Real Estate', 'Land & Lots'],
          automotive: ['Used Car Dealership', 'Car Rental Service', 'Auto Repair Workshop', 'Spare Parts Dealer']
        };
        const list = fallbacks[profileForm.businessType] || [];
        setProfileCategories(list.map(name => ({ name })));
        if (!profileForm.category || !list.includes(profileForm.category)) {
          setProfileForm(prev => ({ ...prev, category: list[0] || '' }));
        }
      });
  }, [profileForm.businessType]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm(prev => ({ ...prev, storeLogo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm(prev => ({ ...prev, storeImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchInquiries = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch('/api/inquiries?limit=100', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setInquiries(prev => {
          if (prev.length > 0 && data.length > prev.length) {
            const newItems = data.filter(item => !prev.some(old => old._id === item._id));
            const newPending = newItems.find(item => item.status === 'pending');
            if (newPending) {
              setActiveInquiryAlert(newPending);
            }
          }
          return data;
        });
      }
    } catch (err) {
      console.error('Error loading inquiries', err);
    }
  };

  const handleResolveInquiry = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/inquiries/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'resolved' })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setInquiries(inquiries.map(i => i._id === id ? data : i));
      alert('Inquiry marked as Resolved.');
    } catch (err) {
      alert(err.message || 'Failed to update inquiry.');
    }
  };

  useEffect(() => {
    if (user) {
      fetchInquiries();
      const interval = setInterval(fetchInquiries, 8000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const loadDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch current user details
        const userRes = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const userData = await userRes.json();
        if (!userRes.ok) throw new Error(userData.message);
        setUser(userData);
        setNavLinks(userData.customNavbarLinks || []);
        setProfileForm({
          storeName: userData.storeName || '',
          description: userData.description || '',
          address: userData.address || '',
          storeLogo: userData.storeLogo || '',
          storeImage: userData.storeImage || '',
          socialLinks: userData.socialLinks || [],
          businessType: userData.businessType || '',
          category: userData.category || ''
        });

        // Redirect super_admin to their dedicated panel
        if (userData.role === 'super_admin') {
          navigate('/super-admin', { replace: true });
          return;
        }

        // Redirect business users to their store name dashboard URL slug
        if (userData.role === 'business' && userData.storeName) {
          const storeSlug = userData.storeName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
          if (urlStoreName !== storeSlug) {
            navigate(`/store/${storeSlug}/dashboard`, { replace: true });
            return;
          }
        }

        // Default the form type based on role
        let defaultType = 'personal_item';
        if (userData.role === 'handyman') defaultType = 'handyman_skill';
        if (userData.role === 'business') {
          if (userData.businessType === 'store') defaultType = 'store_product';
          if (userData.businessType === 'service') defaultType = 'service';
          if (userData.businessType === 'organization') defaultType = 'job_opening';
          if (userData.businessType === 'real_estate') defaultType = 'house';
          if (userData.businessType === 'automotive') defaultType = 'car';
        }
        setListingForm(prev => ({ ...prev, type: defaultType }));

        // Fetch User Listings (up to 100)
        const listRes = await fetch(`/api/listings?ownerId=${userData._id}&status=all&limit=100`);
        const listData = await listRes.json();
        setListings(listData);

        // Fetch User References (up to 100)
        const ratingsRes = await fetch(`/api/ratings/target/${userData._id}?limit=100`);
        const ratingsData = await ratingsRes.json();
        setRatings(ratingsData);

      } catch (err) {
        console.error('Error fetching dashboard info', err);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [navigate]);

  const handleToggleOnline = async () => {
    try {
      const response = await fetch('/api/auth/toggle-online', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      setUser(prev => ({ ...prev, isOnline: data.isOnline }));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsEditingProfile(false); // Switch back to read-only details view!
      alert('Store settings updated successfully!');

      if (data.user.role === 'business' && data.user.storeName) {
        const storeSlug = data.user.storeName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
        navigate(`/store/${storeSlug}/dashboard`, { replace: true });
      }
    } catch (err) {
      alert(err.message || 'Failed to update store settings.');
    }
  };

  const handleAddNavLink = async (e) => {
    e.preventDefault();
    if (!newLinkLabel || !newLinkUrl) return;

    if (navLinks.length >= 5) {
      alert('Limit reached: Maximum 5 custom links allowed.');
      return;
    }

    const updatedLinks = [...navLinks, { label: newLinkLabel, url: newLinkUrl }];

    try {
      const response = await fetch('/api/auth/update-navbar', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ customNavbarLinks: updatedLinks })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setNavLinks(updatedLinks);
      setNewLinkLabel('');
      setNewLinkUrl('');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRemoveNavLink = async (index) => {
    const updatedLinks = navLinks.filter((_, idx) => idx !== index);

    try {
      const response = await fetch('/api/auth/update-navbar', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ customNavbarLinks: updatedLinks })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setNavLinks(updatedLinks);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleListingStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      const response = await fetch(`/api/listings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setListings(listings.map(l => l._id === id ? { ...l, status: nextStatus } : l));
    } catch (err) {
      alert(err.message || 'Failed to toggle listing status.');
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (selectedImages.length + files.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    const { 
      title, description, price, type, category,
      handymanRates, jobRequirements, salaryRate,
      bedrooms, bathrooms, propertyType,
      year, mileage, make, model 
    } = listingForm;

    if (!title || !description) {
      alert('Please fill out Title and Description');
      return;
    }

    const metadata = {};
    if (type === 'handyman_skill' && handymanRates) {
      metadata.handymanRates = handymanRates;
    }
    if (type === 'job_opening') {
      metadata.salaryRate = salaryRate || 'hour';
      if (jobRequirements) {
        metadata.jobRequirements = jobRequirements.split('\n').filter(r => r.trim() !== '');
      }
    }
    if (type === 'house') {
      metadata.bedrooms = bedrooms ? Number(bedrooms) : undefined;
      metadata.bathrooms = bathrooms ? Number(bathrooms) : undefined;
      metadata.propertyType = propertyType || 'House';
    }
    if (type === 'car') {
      metadata.year = year ? Number(year) : undefined;
      metadata.mileage = mileage ? Number(mileage) : undefined;
      metadata.make = make;
      metadata.model = model;
    }

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title,
          description,
          price: (price !== '' && price !== undefined && price !== null) ? Number(price) : null,
          type,
          category,
          metadata,
          images: selectedImages
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setListings([data, ...listings]);
      
      let defaultType = 'personal_item';
      if (user?.role === 'handyman') defaultType = 'handyman_skill';
      if (user?.role === 'business') {
        if (user.businessType === 'store') defaultType = 'store_product';
        if (user.businessType === 'service') defaultType = 'service';
        if (user.businessType === 'organization') defaultType = 'job_opening';
        if (user.businessType === 'real_estate') defaultType = 'house';
        if (user.businessType === 'automotive') defaultType = 'car';
      }

      setListingForm({
        title: '',
        description: '',
        price: '',
        type: defaultType,
        category: '',
        handymanRates: '',
        jobRequirements: '',
        salaryRate: 'hour',
        bedrooms: '',
        bathrooms: '',
        propertyType: 'House',
        year: '',
        mileage: '',
        make: '',
        model: ''
      });
      setSelectedImages([]);
      alert('Marketplace listing added successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  const onListingDeleted = (id) => {
    setListings(listings.filter(l => l._id !== id));
  };

  const handleDeleteListing = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      onListingDeleted(id);
      alert('Listing deleted successfully!');
    } catch (err) {
      alert(err.message || 'Failed to delete listing.');
    }
  };

  const openEditModal = (listing) => {
    setEditingListing(listing);
    setEditForm({
      title: listing.title || '',
      description: listing.description || '',
      price: listing.price || '',
      type: listing.type || '',
      category: listing.category || '',
      handymanRates: listing.metadata?.handymanRates || '',
      jobRequirements: (listing.metadata?.jobRequirements || []).join('\n'),
      salaryRate: listing.metadata?.salaryRate || 'hour',
      bedrooms: listing.metadata?.bedrooms || '',
      bathrooms: listing.metadata?.bathrooms || '',
      propertyType: listing.metadata?.propertyType || 'House',
      year: listing.metadata?.year || '',
      mileage: listing.metadata?.mileage || '',
      make: listing.metadata?.make || '',
      model: listing.metadata?.model || '',
      images: listing.images || []
    });
  };

  const handleUpdateListing = async (e) => {
    e.preventDefault();
    if (!editingListing) return;

    const { 
      title, description, price, type, category,
      handymanRates, jobRequirements, salaryRate,
      bedrooms, bathrooms, propertyType,
      year, mileage, make, model, images 
    } = editForm;

    const metadata = {};
    if (type === 'handyman_skill' && handymanRates) {
      metadata.handymanRates = handymanRates;
    }
    if (type === 'job_opening') {
      metadata.salaryRate = salaryRate || 'hour';
      if (jobRequirements) {
        metadata.jobRequirements = jobRequirements.split('\n').filter(r => r.trim() !== '');
      }
    }
    if (type === 'house') {
      metadata.bedrooms = bedrooms ? Number(bedrooms) : undefined;
      metadata.bathrooms = bathrooms ? Number(bathrooms) : undefined;
      metadata.propertyType = propertyType || 'House';
    }
    if (type === 'car') {
      metadata.year = year ? Number(year) : undefined;
      metadata.mileage = mileage ? Number(mileage) : undefined;
      metadata.make = make;
      metadata.model = model;
    }

    try {
      const response = await fetch(`/api/listings/${editingListing._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title,
          description,
          price: (price !== '' && price !== undefined && price !== null) ? Number(price) : null,
          status: editingListing.status,
          category,
          metadata,
          images
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setListings(listings.map(l => l._id === editingListing._id ? data : l));
      setEditingListing(null);
      alert('Listing updated successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (editForm.images.length + files.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, images: [...prev.images, reader.result] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveEditImage = (index) => {
    setEditForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const isOtherOrgOrIndividual = user?.role === 'individual' || 
    (user?.role === 'business' && user?.businessType === 'organization' && user?.category === 'Other');

  // Helper translations for dynamic tabs depending on role/type complexity
  const getTabLabel = (tabKey) => {
    if (tabKey === 'inquiries') return 'Customer Requests';
    if (tabKey === 'overview') return t('dashboard');
    if (tabKey === 'items') {
      if (user?.role === 'handyman') return t('handymen');
      if (user?.role === 'individual') return 'Job / Items';
      if (user?.role === 'business') {
        if (user.businessType === 'store') return t('stores');
        if (user.businessType === 'service') return t('services');
        if (user.businessType === 'organization') {
          return user.category === 'Other' ? 'Job Listings' : t('organizations');
        }
        if (user.businessType === 'real_estate') return t('real_estate');
        if (user.businessType === 'automotive') return t('automotive');
      }
      return t('my_listings');
    }
    if (tabKey === 'settings') {
      return user?.role === 'business' ? t('manage_nav') : t('online_status');
    }
    if (tabKey === 'reviews') return t('references_feedback');
    return tabKey;
  };

  const getTabIcon = (tabKey) => {
    if (tabKey === 'inquiries') return '📩';
    if (tabKey === 'overview') return '📊';
    if (tabKey === 'items') {
      if (user?.role === 'handyman') return '🛠️';
      if (user?.role === 'individual') return '👤';
      if (user?.role === 'business') {
        if (user.businessType === 'store') return '🏬';
        if (user.businessType === 'service') return '⚖️';
        if (user.businessType === 'organization') return '💼';
        if (user.businessType === 'real_estate') return '🏠';
        if (user.businessType === 'automotive') return '🚗';
      }
      return '📂';
    }
    if (tabKey === 'settings') return '⚙️';
    if (tabKey === 'reviews') return '💬';
    return '📝';
  };

  const avgRating = ratings.length > 0 
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : '0.0';

  if (loading) {
    return (
      <div className="container dashboard-page flex-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container dashboard-page">
      


      {/* Main Workspace Layout */}
      <div className="dashboard-workspace">
        
        {/* Left Sidebar Menu */}
        <aside className="dashboard-sidebar">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`sidebar-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <span>{getTabIcon('overview')}</span> {getTabLabel('overview')}
          </button>
          
          <button 
            onClick={() => setActiveTab('items')} 
            className={`sidebar-tab-btn ${activeTab === 'items' ? 'active' : ''}`}
          >
            <span>{getTabIcon('items')}</span> {getTabLabel('items')}
          </button>

          {user?.role === 'business' && (
            <button 
              onClick={() => setActiveTab('store_settings')} 
              className={`sidebar-tab-btn ${activeTab === 'store_settings' ? 'active' : ''}`}
            >
              <span>🔧</span> Store Settings
            </button>
          )}

          {!isOtherOrgOrIndividual && (
            <button 
              onClick={() => setActiveTab('settings')} 
              className={`sidebar-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            >
              <span>{getTabIcon('settings')}</span> {getTabLabel('settings')}
            </button>
          )}

          {!isOtherOrgOrIndividual && (
            <button 
              onClick={() => setActiveTab('reviews')} 
              className={`sidebar-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            >
              <span>{getTabIcon('reviews')}</span> {getTabLabel('reviews')}
            </button>
          )}

          {!isOtherOrgOrIndividual && (
            <button 
              onClick={() => setActiveTab('inquiries')} 
              className={`sidebar-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            >
              <span>{getTabIcon('inquiries')}</span> {getTabLabel('inquiries')}
              {inquiries.filter(i => i.status === 'pending').length > 0 && (
                <span className="badge bg-danger text-white" style={{ marginLeft: '8px', borderRadius: '10px', padding: '2px 8px', fontSize: '0.75rem' }}>
                  {inquiries.filter(i => i.status === 'pending').length}
                </span>
              )}
            </button>
          )}
        </aside>

        {/* Right Active View Content Pane */}
        <main className="dashboard-content-pane">
          
          {/* TAB: STORE SETTINGS EDITOR */}
          {activeTab === 'store_settings' && (
            <div className="tab-pane-view">
              <div className="glass-panel" style={{ padding: '30px', maxWidth: '700px', width: '100%' }}>
                <h3 style={{ marginBottom: '20px' }}>Store Settings & Page Details</h3>
                <form onSubmit={handleSaveProfile}>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Store / Business Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={profileForm.storeName}
                      onChange={(e) => setProfileForm({ ...profileForm, storeName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Business Type</label>
                    <select
                      className="form-control"
                      value={profileForm.businessType}
                      onChange={(e) => setProfileForm({ ...profileForm, businessType: e.target.value, category: '' })}
                      required
                    >
                      <option value="store">Store (Sells Products)</option>
                      <option value="service">Service (Offers Professional Services)</option>
                      <option value="organization">Organization (Hiring Only / Job Openings)</option>
                      <option value="real_estate">Real Estate (Housing Listings)</option>
                      <option value="automotive">Automotive (Car Listings)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Business Category Type</label>
                    <select
                      className="form-control"
                      value={profileForm.category}
                      onChange={(e) => setProfileForm({ ...profileForm, category: e.target.value })}
                      required
                    >
                      <option value="">Select Category</option>
                      {profileCategories.map((cat, idx) => (
                        <option key={idx} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Store Description</label>
                    <textarea 
                      className="form-control" 
                      value={profileForm.description}
                      onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                      rows="3"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Physical Address</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Store Logo</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      {profileForm.storeLogo ? (
                        <div style={{ position: 'relative' }}>
                          <img 
                            src={profileForm.storeLogo} 
                            alt="Store Logo Preview" 
                            style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }} 
                          />
                          <button
                            type="button"
                            className="btn-close"
                            style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            onClick={() => setProfileForm(prev => ({ ...prev, storeLogo: '' }))}
                            title="Remove logo"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px dashed var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                          🏬
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        className="form-control"
                        onChange={handleLogoUpload}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Store Hero / Banner Image</label>
                    {profileForm.storeImage && (
                      <div style={{ marginBottom: '10px', position: 'relative' }}>
                        <img 
                          src={profileForm.storeImage} 
                          alt="Store Banner Preview" 
                          style={{ width: '100%', height: '150px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-glass)' }} 
                        />
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', padding: '4px 8px' }}
                          onClick={() => setProfileForm(prev => ({ ...prev, storeImage: '' }))}
                        >
                          Remove Image
                        </button>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      className="form-control"
                      onChange={handleImageUpload}
                    />
                  </div>

                  <div className="social-links-section" style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px', marginBottom: '24px' }}>
                    <h5 style={{ marginBottom: '16px' }}>Social Media Links</h5>
                    
                    {['Facebook', 'Instagram', 'Telegram', 'TikTok', 'Twitter/X'].map((plat) => {
                      const existingLink = profileForm.socialLinks.find(l => l.platform.toLowerCase() === plat.toLowerCase()) || { url: '' };
                      return (
                        <div key={plat} className="social-link-row" style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'center' }}>
                          {renderSocialIcon(plat, 20, { color: 'var(--accent-primary)', marginRight: '4px' })}
                          <span style={{ minWidth: '100px', fontWeight: 600, color: 'var(--text-main)' }}>{plat}</span>
                          <input 
                            type="url" 
                            className="form-control" 
                            style={{ flex: 1 }}
                            placeholder={
                              plat === 'Telegram' ? 'https://t.me/your-username' :
                              plat === 'Twitter/X' ? 'https://x.com/your-username' :
                              `https://www.${plat.toLowerCase()}.com/your-username`
                            }
                            value={existingLink.url}
                            onChange={(e) => {
                              const newUrl = e.target.value;
                              let newSocialLinks = [...profileForm.socialLinks];
                              
                              const idx = newSocialLinks.findIndex(l => l.platform.toLowerCase() === plat.toLowerCase());
                              if (idx > -1) {
                                if (newUrl.trim() === '') {
                                  newSocialLinks.splice(idx, 1);
                                } else {
                                  newSocialLinks[idx].url = newUrl;
                                }
                              } else if (newUrl.trim() !== '') {
                                newSocialLinks.push({ platform: plat, url: newUrl });
                              }
                              
                              setProfileForm({ ...profileForm, socialLinks: newSocialLinks });
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <div className="tab-pane-view">
              <div className="stats-grid">
                <div className="glass-panel stat-card">
                  <span className="stat-val">{listings.length}</span>
                  <span className="stat-label">Total Listings</span>
                </div>
                <div className="glass-panel stat-card">
                  <span className="stat-val">{ratings.length}</span>
                  <span className="stat-label">Client Reviews</span>
                </div>
                <div className="glass-panel stat-card">
                  <span className="stat-val">⭐ {avgRating}</span>
                  <span className="stat-label">Average Rating</span>
                </div>
                <div className="glass-panel stat-card">
                  <span className="stat-val" style={{ fontSize: '1.2rem', fontWeight: 700, padding: '14px 0' }}>
                    {(user.role === 'business' ? user.businessType : user.role).toUpperCase()}
                  </span>
                  <span className="stat-label">Classification</span>
                </div>
              </div>

              <div className="glass-panel overview-welcome-card" style={{ padding: '30px' }}>
                <h3>Welcome back, {user.username}!</h3>
                <p style={{ margin: '12px 0 20px 0', color: 'var(--text-secondary)' }}>
                  This is your workspace command center. Use the sidebar on the left to edit your catalog postings, modify your storefront configuration, and read through reviews submitted by local customers.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button onClick={() => setActiveTab('items')} className="btn btn-primary">
                    Create New Listing
                  </button>
                  {(user?.role === 'business' || user?.role === 'handyman') && (
                    <>
                      <button onClick={() => setQrOpen(true)} className="btn btn-secondary d-flex align-items-center gap-1">
                        📷 View QR Code
                      </button>
                      <a 
                        href={`/store/${(user.storeName || user.username || '').toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-')}`} 
                        className="btn btn-success d-flex align-items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: '#fff' }}
                      >
                        🌐 Visit Website
                      </a>
                    </>
                  )}
                  {!isOtherOrgOrIndividual && (
                    <button onClick={() => setActiveTab('settings')} className="btn btn-secondary">
                      Configure Profile Settings
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CATALOG ITEMS MANAGER */}
          {activeTab === 'items' && (
            <div className="tab-pane-view">
              
              {/* Table of Listings (Alternative view to Card lists) */}
              <div className="listings-manager-card" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <h3 style={{ margin: 0 }}>{t('my_listings')} ({listings.length})</h3>
                    {listings.length > 0 && (
                      <span className="badge bg-primary text-white" style={{ fontSize: '0.8rem' }}>
                        Showing {filteredListings.length} of {listings.length} Items
                      </span>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => setIsCreateModalOpen(true)} 
                    className="btn btn-primary"
                    style={{ borderRadius: '8px', padding: '8px 16px', fontWeight: 'bold' }}
                  >
                    + Add / {user?.role === 'business' ? (user?.category || 'Listing') : (user?.role === 'handyman' ? 'Handyman Skill' : 'Item')}
                  </button>
                </div>

                {listings.length === 0 ? (
                  <div className="glass-panel no-listings-card flex-center">
                    <p>{t('no_listings_yet')}</p>
                  </div>
                ) : (
                  <>
                    {/* Listings Filter Controls */}
                    <div className="filter-bar" style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="🔍 Search my items/postings..." 
                        value={listingSearch}
                        onChange={(e) => setListingSearch(e.target.value)}
                        style={{ flex: '1', minWidth: '200px', margin: 0 }}
                      />
                      <select 
                        className="form-control" 
                        value={listingStatusFilter} 
                        onChange={(e) => setListingStatusFilter(e.target.value)}
                        style={{ width: '160px', margin: 0 }}
                      >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive/Sold/Busy</option>
                      </select>
                    </div>

                    {filteredListings.length === 0 ? (
                      <div className="glass-panel flex-center" style={{ padding: '40px', color: 'var(--text-muted)', textAlign: 'center' }}>
                        <p>No listings match your search criteria.</p>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="listings-table">
                          <thead>
                            <tr>
                              <th>Thumbnail</th>
                              <th>Title & Type</th>
                              <th>Price</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredListings.map(item => (
                              <tr key={item._id} className={item.status === 'active' ? '' : 'row-dimmed'}>
                            <td>
                              <div className="table-thumbnail-wrapper">
                                {item.images && item.images.length > 0 ? (
                                  <img src={item.images[0]} alt={item.title} className="table-thumbnail" />
                                ) : (
                                  <span className="table-thumbnail-placeholder">📦</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="table-title-cell">
                                <span className="table-item-title">{item.title}</span>
                                <span className="table-item-type">{item.type.replace('_', ' ').toUpperCase()}</span>
                              </div>
                            </td>
                            <td>
                              <span className="table-item-price">
                                {item.price ? `$${item.price.toLocaleString()}` : t('contact_for_price')}
                              </span>
                            </td>
                            <td>
                              <button 
                                onClick={() => handleToggleListingStatus(item._id, item.status)}
                                className={`btn-status-toggle ${item.status === 'active' ? 'status-active' : 'status-inactive'}`}
                                title="Click to Toggle Status"
                              >
                                {item.status === 'active' 
                                  ? (user.role === 'handyman' ? '🟢 Available' : '🟢 Active')
                                  : (user.role === 'handyman' ? '🔴 Busy' : '🔴 Sold Out')
                                }
                              </button>
                            </td>
                            <td>
                              <div className="table-actions-cell">
                                {/* View Action */}
                                {user.role === 'business' && user.storeName ? (
                                  <Link 
                                    to={`/store/${user.storeName.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-')}`}
                                    className="btn btn-secondary btn-icon-only btn-sm"
                                    title="View Storefront"
                                    target="_blank"
                                  >
                                    👁️
                                  </Link>
                                ) : (
                                  <Link 
                                    to={`/?type=${item.type}`}
                                    className="btn btn-secondary btn-icon-only btn-sm"
                                    title="View Directory"
                                  >
                                    👁️
                                  </Link>
                                )}
                                                                {/* Edit Action */}
                                <button 
                                  onClick={() => openEditModal(item)}
                                  className="btn btn-secondary btn-sm btn-icon-only"
                                  title="Edit Listing"
                                >
                                  ✏️
                                </button>
                                
                                {/* Delete Action */}
                                <button 
                                  onClick={() => handleDeleteListing(item._id)}
                                  className="btn btn-danger btn-sm btn-icon-only"
                                  title="Delete Listing"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: STOREFRONT / AVAILABILITY SETTINGS */}
          {activeTab === 'settings' && (
            <div className="tab-pane-view" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              
              {/* General Availability Card */}
              <div className="glass-panel settings-card" style={{ padding: '30px' }}>
                <h3>{t('online_status')}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Control your visibility on the marketplace directories. Turning off availability sets your listings to vacation mode and hides contact details temporarily.
                </p>
                <div className="status-toggle-card" style={{ width: 'fit-content' }}>
                  <span style={{ marginRight: '16px' }}>Availability: <strong>{user?.isOnline ? '🟢 Online' : '🔴 Offline'}</strong></span>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={user?.isOnline || false} 
                      onChange={handleToggleOnline} 
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              {/* Custom Navbar Manager (Business only) */}
              {user?.role === 'business' && (
                <div className="glass-panel nav-links-manager" style={{ margin: 0 }}>
                  <h3>{t('manage_nav')}</h3>
                  <p className="nav-manager-intro">{t('nav_help')}</p>
                  
                  <form onSubmit={handleAddNavLink} className="nav-link-form">
                    <div className="form-group">
                      <label>{t('link_label')}</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Yelp Reviews" 
                        className="form-control"
                        value={newLinkLabel}
                        onChange={(e) => setNewLinkLabel(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>{t('dest_url')}</label>
                      <input 
                        type="text" 
                        placeholder="e.g. yelp.com/biz/my-store" 
                        className="form-control"
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-secondary w-full" disabled={navLinks.length >= 5}>
                      {t('add_link')} ({navLinks.length}/5)
                    </button>
                  </form>

                  <div className="current-nav-links">
                    <h4>Active Custom Links</h4>
                    {navLinks.length === 0 ? (
                      <p className="no-navs">No custom links added yet. Renders standard directory headers.</p>
                    ) : (
                      <ul className="navs-list">
                        {navLinks.map((link, idx) => (
                          <li key={idx} className="nav-item-row">
                            <div className="nav-details">
                              <span className="nav-label">{link.label}</span>
                              <span className="nav-url">{link.url}</span>
                            </div>
                            <button 
                              type="button" 
                              onClick={() => handleRemoveNavLink(idx)}
                              className="btn btn-danger btn-icon-only btn-sm"
                            >
                              &times;
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {/* Handyman/Individual QR Modal Shortcut */}
              {user?.role !== 'business' && (
                <div className="glass-panel settings-card" style={{ padding: '30px' }}>
                  <h3>QR Profile Code</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    Generate and print a physical QR code for your profile page. Clients can scan it on their mobile devices to see your directory profile instantly.
                  </p>
                  <button onClick={() => setQrOpen(true)} className="btn btn-secondary">
                    🖨️ Generate QR Code
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CLIENT FEEDBACK & REFERENCES */}
          {activeTab === 'reviews' && (
            <div className="tab-pane-view glass-panel references-section" style={{ margin: 0 }}>
              <h3>{t('references_feedback')} ({ratings.length})</h3>
              <p className="ref-intro-text">{t('verified_reviews_desc')}</p>
              
              <div className="references-list-scroll">
                {ratings.length === 0 ? (
                  <p className="no-refs">{t('no_refs_yet')}</p>
                ) : (
                  ratings.map((rev) => (
                    <div key={rev._id} className="reference-log-card">
                      <div className="ref-header">
                        <div className="ref-reviewer">
                          <strong>{rev.name}</strong>
                          <span className="ref-phone">📞 {rev.phone}</span>
                        </div>
                        <span className="ref-stars">{'★'.repeat(rev.rating)}</span>
                      </div>
                      <p className="ref-comment">"{rev.comment}"</p>
                      <span className="ref-date">{new Date(rev.createdAt).toLocaleDateString()}</span>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: CUSTOMER INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="tab-pane-view">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
                <h2 style={{ margin: 0, borderLeft: '3px solid var(--accent-primary)', paddingLeft: '10px' }}>📩 Customer Requests Log</h2>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span className="badge badge-cyan" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                    Showing {filteredInquiries.length} of {inquiries.length} Requests
                  </span>
                </div>
              </div>

              {inquiries.length === 0 ? (
                <div className="glass-panel flex-center" style={{ padding: '60px', textAlign: 'center' }}>
                  <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>📬</span>
                  <h3>No Customer Requests Yet</h3>
                  <p>When customers submit requests via the storefront contact modal, they will list here in real-time.</p>
                </div>
              ) : (
                <>
                  {/* Inquiry Filter Controls */}
                  <div className="filter-bar" style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="🔍 Search name, email, phone or details..." 
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      style={{ flex: '1', minWidth: '220px', margin: 0 }}
                    />
                    <select 
                      className="form-control" 
                      value={inquiryStatusFilter} 
                      onChange={(e) => setInquiryStatusFilter(e.target.value)}
                      style={{ width: '160px', margin: 0 }}
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>

                  {filteredInquiries.length === 0 ? (
                    <div className="glass-panel flex-center" style={{ padding: '40px', color: 'var(--text-muted)', textAlign: 'center' }}>
                      <p>No customer requests match your search criteria.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {filteredInquiries.map((inq) => (
                    <div key={inq._id} className="glass-panel" style={{ padding: '24px', borderLeft: inq.status === 'pending' ? '4px solid var(--accent-warning)' : '4px solid var(--accent-secondary)', position: 'relative' }}>
                      <span className="badge" style={{ position: 'absolute', top: '24px', right: '24px', background: inq.status === 'pending' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)', color: inq.status === 'pending' ? 'var(--accent-warning)' : '#10b981', border: inq.status === 'pending' ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {inq.status}
                      </span>
                      
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1.25rem' }}>{inq.customerName}</h4>
                      <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        📅 Received: {new Date(inq.createdAt).toLocaleString()} | 💼 Type: {inq.businessType.toUpperCase()}
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-glass)', marginBottom: '16px' }}>
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>CUSTOMER EMAIL</strong>
                          <span>{inq.customerEmail}</span>
                        </div>
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>CUSTOMER PHONE</strong>
                           <span>{inq.customerPhone}</span>
                        </div>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>REQUEST DETAILS</strong>
                        <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', fontSize: '0.95rem', lineHeight: '1.5' }}>
                          {inq.businessType === 'pharmacy' && (
                            <div>
                              📄 <strong>Prescription Attachment:</strong> <span style={{ color: 'var(--accent-secondary)' }}>{inq.details.fileName}</span>
                              {inq.details.notes && <p style={{ marginTop: '8px', marginBottom: 0 }}>💬 <strong>Note:</strong> {inq.details.notes}</p>}
                            </div>
                          )}
                          {inq.businessType === 'law' && (
                            <div>
                              🗓️ <strong>Appointment Proposal:</strong> {inq.details.date} at {inq.details.time}<br/>
                              🔍 <strong>Case Topic:</strong> {inq.details.topic}
                            </div>
                          )}
                          {inq.businessType === 'tax' && (
                            <div>
                              📅 <strong>Tax Filing Year:</strong> {inq.details.taxYear}<br/>
                              📄 <strong>Documents Attachment:</strong> <span style={{ color: 'var(--accent-secondary)' }}>{inq.details.fileName}</span>
                              {inq.details.notes && <p style={{ marginTop: '8px', marginBottom: 0 }}>💬 <strong>Notes:</strong> {inq.details.notes}</p>}
                            </div>
                          )}
                          {inq.businessType === 'boutique' && (
                            <div>
                              👗 <strong>Product Inquiry:</strong> {inq.details.itemTitle}<br/>
                              📏 <strong>Size/Color:</strong> {inq.details.size || 'N/A'} / {inq.details.color || 'N/A'}
                              {inq.details.notes && <p style={{ marginTop: '8px', marginBottom: 0 }}>💬 <strong>Notes:</strong> {inq.details.notes}</p>}
                            </div>
                          )}
                          {inq.businessType === 'liquor' && (
                            <div>
                              🍷 <strong>Pre-Order Shopping list:</strong>
                              <p style={{ margin: '4px 0 8px 0', fontStyle: 'italic' }}>{inq.details.orderNotes}</p>
                              ⏰ <strong>Pickup Scheduled Time:</strong> {inq.details.pickupTime}
                            </div>
                          )}
                          {inq.businessType === 'general' && (
                            <div>
                              💬 {inq.details.message}
                            </div>
                          )}
                        </div>
                      </div>

                      {inq.status === 'pending' && (
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                          <button onClick={() => handleResolveInquiry(inq._id)} className="btn btn-success btn-sm">✔️ Mark as Resolved</button>
                          <a href={`tel:${inq.customerPhone}`} className="btn btn-secondary btn-sm">📞 Call Customer</a>
                          <a href={`mailto:${inq.customerEmail}`} className="btn btn-secondary btn-sm">✉️ Email Customer</a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

          {/* REAL-TIME NEW INQUIRY ALERT POPUP */}
          {activeInquiryAlert && (
            <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1200 }}>
              <div className="glass-panel modal-content" style={{ maxWidth: '500px', width: '90%', padding: '30px', position: 'relative', border: '3px solid var(--accent-warning)', animation: 'slideDown 0.3s ease-out', textAlign: 'center' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🔔</span>
                <h3 style={{ color: 'var(--accent-warning)', marginBottom: '10px' }}>New Customer Request Received!</h3>
                <p style={{ fontSize: '1.05rem', marginBottom: '20px' }}>
                  <strong>{activeInquiryAlert.customerName}</strong> has just submitted a new <strong>{activeInquiryAlert.businessType.toUpperCase()}</strong> request.
                </p>
                
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '16px', marginBottom: '24px', textAlign: 'left', fontSize: '0.9rem' }}>
                  <strong>📧 Email:</strong> {activeInquiryAlert.customerEmail}<br/>
                  <strong>📞 Phone:</strong> {activeInquiryAlert.customerPhone}<br/>
                  <strong>details:</strong><br/>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {activeInquiryAlert.businessType === 'pharmacy' && `Prescription: ${activeInquiryAlert.details.fileName}`}
                    {activeInquiryAlert.businessType === 'law' && `Date: ${activeInquiryAlert.details.date} Time: ${activeInquiryAlert.details.time} - Topic: ${activeInquiryAlert.details.topic}`}
                    {activeInquiryAlert.businessType === 'tax' && `Tax Year: ${activeInquiryAlert.details.taxYear}`}
                    {activeInquiryAlert.businessType === 'boutique' && `Item: ${activeInquiryAlert.details.itemTitle} (Size: ${activeInquiryAlert.details.size})`}
                    {activeInquiryAlert.businessType === 'liquor' && `Pre-Order: ${activeInquiryAlert.details.orderNotes}`}
                    {activeInquiryAlert.businessType === 'general' && activeInquiryAlert.details.message}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={() => {
                      setActiveTab('inquiries');
                      setActiveInquiryAlert(null);
                    }} 
                    className="btn btn-primary flex-grow-1"
                  >
                    👁️ View In Inquiries Tab
                  </button>
                  <button 
                    onClick={() => setActiveInquiryAlert(null)} 
                    className="btn btn-secondary"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* EDIT LISTING LIGHTBOX MODAL */}
      {editingListing && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{ maxWidth: '650px', width: '95%' }}>
            <button onClick={() => setEditingListing(null)} className="btn-close-modal" style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            <h3>✏️ Edit Listing</h3>
            
            <form onSubmit={handleUpdateListing} className="modal-body-scroll">
              <div className="form-group">
                <label>Listing Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  required
                />
              </div>

              {editForm.type === 'job_opening' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Salary Rate</label>
                    <select
                      className="form-control"
                      value={editForm.salaryRate}
                      onChange={(e) => setEditForm({ ...editForm, salaryRate: e.target.value })}
                    >
                      <option value="hour">Per Hour</option>
                      <option value="month">Per Month</option>
                      <option value="year">Per Year</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Salary Amount ($)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label>Price / Value Offered ($)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  />
                </div>
              )}

              {/* Handyman Rate field */}
              {editForm.type === 'handyman_skill' && (
                <>
                  <div className="form-group">
                    <label>Skill Specialty Category</label>
                    <select 
                      className="form-control"
                      value={editForm.category || ''}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      required
                    >
                      <option value="">Select Specialty</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Electrical Work">Electrical Work</option>
                      <option value="Carpentry">Carpentry</option>
                      <option value="Painting & Plastering">Painting & Plastering</option>
                      <option value="Roofing">Roofing</option>
                      <option value="HVAC & Heating">HVAC & Heating</option>
                      <option value="Appliance Repair">Appliance Repair</option>
                      <option value="Gardening & Landscaping">Gardening & Landscaping</option>
                      <option value="Cleaning & Housekeeping">Cleaning & Housekeeping</option>
                      <option value="Locksmith & Security">Locksmith & Security</option>
                      <option value="Masonry & Tiling">Masonry & Tiling</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Service Rate Estimate</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editForm.handymanRates}
                      onChange={(e) => setEditForm({ ...editForm, handymanRates: e.target.value })}
                    />
                  </div>
                </>
              )}

              {/* Job Opening Requirements */}
              {editForm.type === 'job_opening' && (
                <div className="form-group">
                  <label>Job Requirements (One per line)</label>
                  <textarea 
                    className="form-control" 
                    value={editForm.jobRequirements}
                    onChange={(e) => setEditForm({ ...editForm, jobRequirements: e.target.value })}
                    rows="3"
                  />
                </div>
              )}

              {/* Real Estate Fields */}
              {editForm.type === 'house' && (
                <div className="metadata-form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Property Type</label>
                    <select
                      className="form-control"
                      value={editForm.propertyType}
                      onChange={(e) => setEditForm({ ...editForm, propertyType: e.target.value })}
                    >
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Land">Land</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Bedrooms</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editForm.bedrooms}
                      onChange={(e) => setEditForm({ ...editForm, bedrooms: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Bathrooms</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editForm.bathrooms}
                      onChange={(e) => setEditForm({ ...editForm, bathrooms: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Automotive Fields */}
              {editForm.type === 'car' && (
                <div className="metadata-form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Make</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editForm.make}
                      onChange={(e) => setEditForm({ ...editForm, make: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Model</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editForm.model}
                      onChange={(e) => setEditForm({ ...editForm, model: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Year</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editForm.year}
                      onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Mileage (mi)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editForm.mileage}
                      onChange={(e) => setEditForm({ ...editForm, mileage: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Listing Description</label>
                <textarea 
                  className="form-control" 
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>Listing Images (Max 5)</label>
                <input 
                  type="file" 
                  className="form-control" 
                  accept="image/*" 
                  multiple 
                  onChange={handleEditImageChange}
                  disabled={editForm.images.length >= 5}
                />
                
                {editForm.images.length > 0 && (
                  <div className="image-previews-grid">
                    {editForm.images.map((img, idx) => (
                      <div key={idx} className="preview-thumbnail-wrapper">
                        <img src={img} alt={`Preview ${idx + 1}`} className="preview-thumbnail" />
                        <button 
                          type="button" 
                          onClick={() => handleRemoveEditImage(idx)} 
                          className="btn-remove-preview"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button type="submit" className="btn btn-primary flex-grow-1">Save Changes</button>
                <button type="button" onClick={() => setEditingListing(null)} className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE LISTING LIGHTBOX MODAL */}
      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{ maxWidth: '650px', width: '95%' }}>
            <button onClick={() => setIsCreateModalOpen(false)} className="btn-close-modal" style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            <h3>{t('post_marketplace')}</h3>
            
            <form onSubmit={async (e) => {
              await handleCreateListing(e);
              setIsCreateModalOpen(false); // Close modal on success!
            }} className="modal-body-scroll" style={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: '6px' }}>
              
              <div className="form-group">
                <label>
                  {user?.role === 'handyman' ? 'Service / Skill Title' :
                   user?.role === 'business' && user.businessType === 'store' ? 'Product Name' :
                   user?.role === 'business' && user.businessType === 'service' ? 'Service Name' :
                   user?.role === 'business' && user.businessType === 'organization' ? 'Job Position Title' :
                   user?.role === 'business' && user.businessType === 'real_estate' ? 'Property Title' :
                   user?.role === 'business' && user.businessType === 'automotive' ? 'Vehicle Title' :
                   'Listing Title'}
                </label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder={
                    user?.role === 'handyman' ? 'e.g. Master Pipe Leak Repair' :
                    user?.role === 'business' && user.businessType === 'store' ? 'e.g. Organic Multivitamins Bottle' :
                    user?.role === 'business' && user.businessType === 'service' ? 'e.g. Professional Tax Advisory' :
                    user?.role === 'business' && user.businessType === 'organization' ? 'e.g. Senior Software Engineer' :
                    user?.role === 'business' && user.businessType === 'real_estate' ? 'e.g. Cozy 3-Bedroom Suburban House' :
                    user?.role === 'business' && user.businessType === 'automotive' ? 'e.g. 2022 Honda Civic LX' :
                    'e.g. Vintage Leather Jacket'
                  }
                  value={listingForm.title}
                  onChange={(e) => setListingForm({ ...listingForm, title: e.target.value })}
                  required
                />
              </div>

              {user?.role === 'business' && (
                <div className="form-group">
                  <label>Listing Post Type (Fixed by Business Type)</label>
                  <select 
                    className="form-control"
                    value={listingForm.type}
                    disabled
                  >
                    <option value="store_product">Store Product Item</option>
                    <option value="service">Professional Service Listing</option>
                    <option value="job_opening">Job Opening (Hiring Only)</option>
                    <option value="house">Real Estate House Listing</option>
                    <option value="car">Automotive Vehicle Listing</option>
                  </select>
                </div>
              )}

              {user?.role === 'individual' && (
                <div className="form-group">
                  <label>Listing Post Type</label>
                  <select 
                    className="form-control"
                    value={listingForm.type}
                    onChange={(e) => {
                      const newType = e.target.value;
                      setListingForm(prev => ({ 
                        ...prev, 
                        type: newType,
                        category: newType === 'job_opening' ? 'Other' : '' 
                      }));
                    }}
                    required
                  >
                    <option value="personal_item">Personal Item (Sell)</option>
                    <option value="job_opening">Job Opening (Hire someone)</option>
                  </select>
                </div>
              )}

              {listingForm.type === 'job_opening' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Salary Rate</label>
                    <select
                      className="form-control"
                      value={listingForm.salaryRate}
                      onChange={(e) => setListingForm({ ...listingForm, salaryRate: e.target.value })}
                    >
                      <option value="hour">Per Hour</option>
                      <option value="month">Per Month</option>
                      <option value="year">Per Year</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Salary Amount ($)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="e.g. 25 or 45000"
                      value={listingForm.price}
                      onChange={(e) => setListingForm({ ...listingForm, price: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label>Price / Value Offered ($)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="e.g. 50 (Leave blank for call/inquire)"
                    value={listingForm.price}
                    onChange={(e) => setListingForm({ ...listingForm, price: e.target.value })}
                  />
                </div>
              )}

              {/* Handyman specific fields */}
              {listingForm.type === 'handyman_skill' && (
                <>
                  <div className="form-group">
                    <label>Skill Specialty Category</label>
                    <select 
                      className="form-control"
                      value={listingForm.category || ''}
                      onChange={(e) => setListingForm({ ...listingForm, category: e.target.value })}
                      required
                    >
                      <option value="">Select Specialty</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Electrical Work">Electrical Work</option>
                      <option value="Carpentry">Carpentry</option>
                      <option value="Painting & Plastering">Painting & Plastering</option>
                      <option value="Roofing">Roofing</option>
                      <option value="HVAC & Heating">HVAC & Heating</option>
                      <option value="Appliance Repair">Appliance Repair</option>
                      <option value="Gardening & Landscaping">Gardening & Landscaping</option>
                      <option value="Cleaning & Housekeeping">Cleaning & Housekeeping</option>
                      <option value="Locksmith & Security">Locksmith & Security</option>
                      <option value="Masonry & Tiling">Masonry & Tiling</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Service Rate Estimate</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. $45/hour, Flat rate based on scale"
                      value={listingForm.handymanRates}
                      onChange={(e) => setListingForm({ ...listingForm, handymanRates: e.target.value })}
                    />
                  </div>
                </>
              )}

              {/* Job Opening specific fields */}
              {listingForm.type === 'job_opening' && (
                <div className="form-group">
                  <label>Job Requirements (One requirement per line)</label>
                  <textarea 
                    className="form-control" 
                    placeholder="e.g. Must have active driver's license&#10;3+ years in retail operations"
                    value={listingForm.jobRequirements}
                    onChange={(e) => setListingForm({ ...listingForm, jobRequirements: e.target.value })}
                    rows="3"
                  />
                </div>
              )}

              {/* Real Estate specific fields */}
              {listingForm.type === 'house' && (
                <div className="metadata-form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Property Type</label>
                    <select
                      className="form-control"
                      value={listingForm.propertyType}
                      onChange={(e) => setListingForm({ ...listingForm, propertyType: e.target.value })}
                    >
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Land">Land</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Bedrooms</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 3"
                      value={listingForm.bedrooms}
                      onChange={(e) => setListingForm({ ...listingForm, bedrooms: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Bathrooms</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 2"
                      value={listingForm.bathrooms}
                      onChange={(e) => setListingForm({ ...listingForm, bathrooms: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Automotive specific fields */}
              {listingForm.type === 'car' && (
                <div className="metadata-form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Make</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Toyota"
                      value={listingForm.make}
                      onChange={(e) => setListingForm({ ...listingForm, make: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Model</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Camry"
                      value={listingForm.model}
                      onChange={(e) => setListingForm({ ...listingForm, model: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Year</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 2023"
                      value={listingForm.year}
                      onChange={(e) => setListingForm({ ...listingForm, year: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Mileage (mi)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 15000"
                      value={listingForm.mileage}
                      onChange={(e) => setListingForm({ ...listingForm, mileage: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Listing Description</label>
                <textarea 
                  className="form-control" 
                  placeholder="Describe your offer, specifications, terms and options clearly..."
                  value={listingForm.description}
                  onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>Listing Images (Max 5)</label>
                <input 
                  type="file" 
                  className="form-control" 
                  accept="image/*" 
                  multiple 
                  onChange={handleImageChange}
                  disabled={selectedImages.length >= 5}
                />
                <p className="help-text">Select up to 5 images. Stored locally via base64 encoding.</p>
                
                {selectedImages.length > 0 && (
                  <div className="image-previews-grid">
                    {selectedImages.map((img, idx) => (
                      <div key={idx} className="preview-thumbnail-wrapper">
                        <img src={img} alt={`Preview ${idx + 1}`} className="preview-thumbnail" />
                        <button 
                          type="button" 
                          onClick={() => handleRemoveImage(idx)} 
                          className="btn-remove-preview"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button type="submit" className="btn btn-primary flex-grow-1">{t('publish_btn')}</button>
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {qrOpen && user && (
        <QrModal 
          isOpen={qrOpen} 
          onClose={() => setQrOpen(false)} 
          storeName={user.storeName || user.username}
          storeId={user._id}
        />
      )}


      <style>{`
        .dashboard-page {
          padding: 40px 0;
        }
        .dashboard-header-panel {
          padding: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }
        .profile-intro h2 {
          font-size: 1.6rem;
        }
        .profile-sub {
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .role-tag {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          margin-left: 8px;
          display: inline-block;
        }
        .role-tag.individual { background: rgba(99,102,241,0.15); color: #a5b4fc; }
        .role-tag.handyman { background: rgba(6,182,212,0.15); color: #67e8f9; }
        .role-tag.store { background: rgba(16, 185, 129, 0.15); color: #6ee7b7; }
        
        /* Dashboard Sidebar Layout */
        .dashboard-workspace {
          display: flex;
          gap: 28px;
          align-items: start;
        }
        .dashboard-sidebar {
          width: 250px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .dashboard-content-pane {
          flex-grow: 1;
          min-width: 0;
        }
        
        .sidebar-tab-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: var(--transition-fast);
          text-align: left;
          width: 100%;
        }
        .sidebar-tab-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-main);
          border-color: rgba(255, 255, 255, 0.15);
        }
        .sidebar-tab-btn.active {
          background: var(--accent-primary);
          color: #ffffff;
          border-color: var(--accent-primary);
          box-shadow: 0 4px 15px var(--accent-primary-glow);
        }
        body.light-theme .sidebar-tab-btn {
          background: rgba(0, 0, 0, 0.02);
          border-color: rgba(0, 0, 0, 0.06);
          color: var(--text-secondary);
        }
        body.light-theme .sidebar-tab-btn:hover {
          background: rgba(0, 0, 0, 0.05);
          color: var(--text-main);
        }
        body.light-theme .sidebar-tab-btn.active {
          background: var(--accent-primary);
          color: #ffffff;
          border-color: var(--accent-primary);
          box-shadow: none;
        }
        
        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }
        .stat-card {
          padding: 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .stat-val {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--accent-secondary);
        }
        .stat-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }
        
        .dashboard-actions-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .status-toggle-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-glass);
          padding: 8px 16px;
          border-radius: var(--radius-md);
        }
        .store-dashboard-shortcuts {
          display: flex;
          gap: 12px;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 30px;
          align-items: start;
        }
        
        .add-listing-card, .nav-links-manager, .references-section {
          padding: 30px;
          margin-bottom: 30px;
        }
        .add-listing-card h3, .nav-links-manager h3, .listings-manager-card h3, .references-section h3 {
          font-size: 1.3rem;
          margin-bottom: 18px;
          border-left: 3px solid var(--accent-primary);
          padding-left: 10px;
        }
        .listing-creation-form, .nav-link-form {
          margin-top: 15px;
        }
        .nav-manager-intro, .ref-intro-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .current-nav-links {
          margin-top: 24px;
          border-top: 1px solid var(--border-glass);
          padding-top: 20px;
        }
        .current-nav-links h4 {
          font-size: 0.95rem;
          margin-bottom: 12px;
          color: var(--text-secondary);
        }
        .no-navs {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .navs-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .nav-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-glass);
          padding: 10px 14px;
          border-radius: var(--radius-md);
        }
        .nav-details {
          display: flex;
          flex-direction: column;
        }
        .nav-label {
          font-size: 0.85rem;
          font-weight: 600;
        }
        .nav-url {
          font-size: 0.75rem;
          color: var(--accent-secondary);
          font-family: monospace;
        }
        .no-listings-card {
          padding: 40px;
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .listings-grid-vertical {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 30px;
        }
        .relative-card {
          position: relative;
        }
        .listing-status-modifier {
          position: absolute;
          top: 24px;
          right: 24px;
          z-index: 11;
        }
        
        /* Premium Listings Table Styles */
        .table-responsive {
          width: 100%;
          overflow-x: auto;
          margin-top: 15px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-glass);
          background: rgba(255, 255, 255, 0.01);
        }
        .listings-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
        }
        .listings-table th {
          background: rgba(255, 255, 255, 0.03);
          padding: 14px 18px;
          font-weight: 700;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-glass);
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }
        .listings-table td {
          padding: 14px 18px;
          border-bottom: 1px solid var(--border-glass);
          vertical-align: middle;
        }
        .listings-table tr:last-child td {
          border-bottom: none;
        }
        .listings-table tr:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        body.light-theme .listings-table th {
          background: rgba(0, 0, 0, 0.03);
        }
        body.light-theme .listings-table tr:hover {
          background: rgba(0, 0, 0, 0.01);
        }
        .row-dimmed {
          opacity: 0.6;
        }
        .table-thumbnail-wrapper {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--border-glass);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.02);
        }
        .table-thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .table-thumbnail-placeholder {
          font-size: 1.4rem;
        }
        .table-title-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .table-item-title {
          font-weight: 600;
          color: var(--text-main);
        }
        .table-item-type {
          font-size: 0.75rem;
          color: var(--accent-secondary);
          font-weight: 500;
        }
        .table-item-price {
          font-weight: 700;
          color: var(--text-main);
        }
        .btn-status-toggle {
          border: none;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 0.75rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .status-active {
          background: rgba(16, 185, 129, 0.15);
          color: #6ee7b7;
        }
        .status-active:hover {
          background: rgba(16, 185, 129, 0.25);
        }
        .status-inactive {
          background: rgba(239, 68, 68, 0.15);
          color: #fca5a5;
        }
        .status-inactive:hover {
          background: rgba(239, 68, 68, 0.25);
        }
        .table-actions-cell {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        
        .modal-body-scroll {
          max-height: 70vh;
          overflow-y: auto;
          margin-top: 15px;
          padding-right: 6px;
        }
        
        .references-list-scroll {
          max-height: 500px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-right: 4px;
          margin-top: 20px;
        }
        .no-refs {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .reference-log-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-glass);
          padding: 16px;
          border-radius: var(--radius-md);
        }
        .ref-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        .ref-reviewer {
          display: flex;
          flex-direction: column;
        }
        .ref-reviewer strong {
          font-size: 0.95rem;
        }
        .ref-phone {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .ref-stars {
          color: var(--accent-warning);
          font-size: 1rem;
        }
        .ref-comment {
          font-size: 0.88rem;
          line-height: 1.4;
          font-style: italic;
          color: var(--text-secondary);
        }
        .ref-date {
          display: block;
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 8px;
          text-align: right;
        }
        .help-text {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .image-previews-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 12px;
        }
        .preview-thumbnail-wrapper {
          position: relative;
          width: 70px;
          height: 70px;
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
        .preview-thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .btn-remove-preview {
          position: absolute;
          top: 2px;
          right: 2px;
          background: rgba(239, 68, 68, 0.85);
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 10px;
          font-weight: bold;
          line-height: 1;
        }
        .btn-remove-preview:hover {
          background: var(--accent-danger);
        }
        
        @media (max-width: 900px) {
          .dashboard-workspace {
            flex-direction: column;
          }
          .dashboard-sidebar {
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .sidebar-tab-btn {
            flex: 1;
            min-width: 120px;
            padding: 10px 14px;
            font-size: 0.85rem;
          }
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
