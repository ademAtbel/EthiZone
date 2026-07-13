// Ultimate Master Marketplace - SuperAdmin Page (Optimized for High Scale)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuperAdmin = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatType, setNewCatType] = useState('store');
  const [editingCategory, setEditingCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('categories');

  // Pagination states for SuperAdmin Management
  const [usersPage, setUsersPage] = useState(1);
  const [usersTotalPages, setUsersTotalPages] = useState(1);
  const [listingsPage, setListingsPage] = useState(1);
  const [listingsTotalPages, setListingsTotalPages] = useState(1);

  // User list filters
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userVerifyFilter, setUserVerifyFilter] = useState('all');

  // Listings list filters
  const [listingSearch, setListingSearch] = useState('');
  const [listingTypeFilter, setListingTypeFilter] = useState('all');
  const [listingStatusFilter, setListingStatusFilter] = useState('all');

  const stores = (users || []).filter(u => u.role === 'business' || u.role === 'store');
  const handymen = (users || []).filter(u => u.role === 'handyman');
  const individuals = (users || []).filter(u => u.role === 'individual');

  const getTabFilteredData = (dataList) => {
    return dataList.filter(u => {
      const searchLower = userSearch.toLowerCase();
      const matchesSearch = u.username?.toLowerCase().includes(searchLower) || 
                            u.email?.toLowerCase().includes(searchLower) ||
                            u.phone?.includes(searchLower) ||
                            (u.storeName && u.storeName.toLowerCase().includes(searchLower));
      const matchesVerify = userVerifyFilter === 'all' || 
        (userVerifyFilter === 'verified' && u.verificationBadge) ||
        (userVerifyFilter === 'unverified' && !u.verificationBadge);
      return matchesSearch && matchesVerify;
    });
  };

  const filteredStores = getTabFilteredData(stores);
  const filteredHandymen = getTabFilteredData(handymen);
  const filteredIndividuals = getTabFilteredData(individuals);

  const filteredListings = listings.filter(l => {
    const searchLower = listingSearch.toLowerCase();
    const ownerEmail = l.ownerId?.email || '';
    const matchesSearch = l.title.toLowerCase().includes(searchLower) || 
                          l.description.toLowerCase().includes(searchLower) ||
                          l.ownerName.toLowerCase().includes(searchLower) ||
                          ownerEmail.toLowerCase().includes(searchLower);
    const matchesType = listingTypeFilter === 'all' || l.type === listingTypeFilter;
    const matchesStatus = listingStatusFilter === 'all' || l.status === listingStatusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async (page = 1) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const usersRes = await fetch(`/api/admin/users?page=${page}&limit=20`, { headers });
      const usersData = await usersRes.json();
      if (Array.isArray(usersData)) {
        setUsers(usersData);
      } else {
        setUsers([]);
        console.error('API returned non-array for users:', usersData);
      }
      setUsersPage(page);
      const totalPages = parseInt(usersRes.headers.get('X-Total-Pages')) || 1;
      setUsersTotalPages(totalPages);
    } catch (err) {
      console.error('Error fetching users', err);
    }
  };

  const fetchListings = async (page = 1) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const listRes = await fetch(`/api/admin/listings?page=${page}&limit=20`, { headers });
      const listData = await listRes.json();
      setListings(listData);
      setListingsPage(page);
      const totalPages = parseInt(listRes.headers.get('X-Total-Pages')) || 1;
      setListingsTotalPages(totalPages);
    } catch (err) {
      console.error('Error fetching listings', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || user.role !== 'super_admin') {
      navigate('/login');
      return;
    }

    const loadAdminData = async () => {
      try {
        setLoading(true);
        const headers = { 'Authorization': `Bearer ${token}` };

        // Fetch Stats
        const statsRes = await fetch('/api/admin/stats', { headers });
        const statsData = await statsRes.json();
        if (!statsRes.ok) throw new Error(statsData.message);
        setStats(statsData);

        // Fetch Categories
        const catRes = await fetch('/api/categories');
        const catData = await catRes.json();
        setCategories(catData);

        // Fetch Users (page 1)
        await fetchUsers(1);

        // Fetch Listings (page 1)
        await fetchListings(1);

      } catch (err) {
        setError(err.message || 'Error loading administrative panel data');
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, [navigate]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCatName) return;

    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: newCatName, description: newCatDesc, type: newCatType })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setCategories([...categories, data]);
      setNewCatName('');
      setNewCatDesc('');
      
      // Update stats count
      setStats(prev => ({ ...prev, totalCategories: prev.totalCategories + 1 }));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!editingCategory || !newCatName) return;

    try {
      const response = await fetch(`/api/admin/categories/${editingCategory._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: newCatName, description: newCatDesc, type: newCatType })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setCategories(categories.map(c => c._id === editingCategory._id ? data : c));
      setEditingCategory(null);
      setNewCatName('');
      setNewCatDesc('');
      setNewCatType('store');
      alert('Category updated successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  const startEditCategory = (cat) => {
    setEditingCategory(cat);
    setNewCatName(cat.name);
    setNewCatDesc(cat.description || '');
    setNewCatType(cat.type);
  };

  const cancelEditCategory = () => {
    setEditingCategory(null);
    setNewCatName('');
    setNewCatDesc('');
    setNewCatType('store');
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }

      setCategories(categories.filter(c => c._id !== id));
      setStats(prev => ({ ...prev, totalCategories: prev.totalCategories - 1 }));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleVerify = async (id) => {
    try {
      const response = await fetch(`/api/admin/users/${id}/verify`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setUsers(users.map(u => u._id === id ? { ...u, verificationBadge: data.user.verificationBadge } : u));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleUserStatus = async (user) => {
    const action = user.status === 'inactive' ? 'activate' : 'deactivate';
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

    try {
      const response = await fetch(`/api/admin/users/${user._id}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setUsers(users.map(u => u._id === user._id ? { ...u, status: data.user.status } : u));
      
      alert(data.message);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteListing = async (id) => {
    if (!window.confirm('Delete this listing for policy moderation?')) return;

    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }

      setListings(listings.filter(l => l._id !== id));
      setStats(prev => ({ ...prev, totalListings: prev.totalListings - 1 }));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="container admin-page flex-center">
        <div className="spinner"></div>
        <p style={{ marginTop: '20px', marginLeft: '10px' }}>Loading Administrative Systems...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container admin-page">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: 'calc(100vh - 70px)' }}>
      {/* SIDEBAR NAVIGATION */}
      <aside className="admin-sidebar glass-panel" style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '32px 20px', borderRight: '1px solid var(--border-glass)', borderRadius: 0, minHeight: '100%', position: 'sticky', top: '70px', alignSelf: 'flex-start', zIndex: 10 }}>
        <div style={{ marginBottom: '40px', paddingLeft: '8px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '4px', color: '#fff', letterSpacing: '0.5px' }}>Super Admin</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', margin: 0, fontWeight: 500 }}>Platform Governance</p>
        </div>
        
        <div className="sidebar-nav-links" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('categories')} 
            className="nav-btn"
            style={{ textAlign: 'left', padding: '14px 16px', borderRadius: '8px', background: activeTab === 'categories' ? 'var(--accent-primary)' : 'transparent', color: activeTab === 'categories' ? '#fff' : 'var(--text-secondary)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontWeight: activeTab === 'categories' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}
          >
            <span style={{ fontSize: '1.2rem' }}>🗂️</span> Categories Directory
          </button>
          <button 
            onClick={() => setActiveTab('stores')} 
            className="nav-btn"
            style={{ textAlign: 'left', padding: '14px 16px', borderRadius: '8px', background: activeTab === 'stores' ? 'var(--accent-primary)' : 'transparent', color: activeTab === 'stores' ? '#fff' : 'var(--text-secondary)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontWeight: activeTab === 'stores' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}
          >
            <span style={{ fontSize: '1.2rem' }}>🏬</span> Stores ({stores.length})
          </button>
          <button 
            onClick={() => setActiveTab('handymen')} 
            className="nav-btn"
            style={{ textAlign: 'left', padding: '14px 16px', borderRadius: '8px', background: activeTab === 'handymen' ? 'var(--accent-primary)' : 'transparent', color: activeTab === 'handymen' ? '#fff' : 'var(--text-secondary)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontWeight: activeTab === 'handymen' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}
          >
            <span style={{ fontSize: '1.2rem' }}>🛠️</span> Handymen ({handymen.length})
          </button>
          <button 
            onClick={() => setActiveTab('individuals')} 
            className="nav-btn"
            style={{ textAlign: 'left', padding: '14px 16px', borderRadius: '8px', background: activeTab === 'individuals' ? 'var(--accent-primary)' : 'transparent', color: activeTab === 'individuals' ? '#fff' : 'var(--text-secondary)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontWeight: activeTab === 'individuals' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}
          >
            <span style={{ fontSize: '1.2rem' }}>👤</span> Regular Users ({individuals.length})
          </button>
          <button 
            onClick={() => setActiveTab('listings')} 
            className="nav-btn"
            style={{ textAlign: 'left', padding: '14px 16px', borderRadius: '8px', background: activeTab === 'listings' ? 'var(--accent-primary)' : 'transparent', color: activeTab === 'listings' ? '#fff' : 'var(--text-secondary)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontWeight: activeTab === 'listings' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}
          >
            <span style={{ fontSize: '1.2rem' }}>🗑️</span> Moderation ({listings.length})
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT COLUMN */}
      <main className="admin-main-area" style={{ flex: 1, padding: '32px 40px', maxWidth: '1400px', overflowX: 'hidden' }}>
        
        {/* TOP FILTER BAR */}
        <div className="admin-top-bar glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', marginBottom: '30px', borderRadius: 'var(--radius-lg)', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem' }}>👋</span>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>Welcome back, Super Admin</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>You have full system control.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button className="btn btn-secondary" onClick={() => window.location.reload()} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🔄</span> Refresh Data
            </button>
          </div>
        </div>

        {/* Analytics Panel */}
        {stats && (
          <div className="admin-stats-grid" style={{ marginBottom: '40px' }}>
            <div className="glass-panel stat-card">
              <h4>Total Accounts</h4>
              <span className="stat-number">{stats.totalUsers}</span>
              <div className="stat-breakdown">
                <span>👤 {stats.roles.individual} Indiv.</span>
                <span>🛠️ {stats.roles.handyman} Handymen</span>
                <span>🏬 {stats.roles.store} Businesses</span>
              </div>
            </div>
            <div className="glass-panel stat-card">
              <h4>Marketplace Postings</h4>
              <span className="stat-number emerald">{stats.totalListings}</span>
            </div>
            <div className="glass-panel stat-card">
              <h4>Directories Categories</h4>
              <span className="stat-number cyan">{stats.totalCategories}</span>
            </div>
            <div className="glass-panel stat-card">
              <h4>Verified References</h4>
              <span className="stat-number amber">{stats.totalRatings}</span>
            </div>
          </div>
        )}

        {/* Tab Content Window */}
        <div className="admin-content-window">
        
        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="admin-tab-content grid-layout">
            <div className="glass-panel category-form-card">
              <h3>{editingCategory ? '✏️ Edit Directory Category' : 'Create New Directory Category'}</h3>
              <form onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory} className="cat-form">
                <div className="form-group">
                  <label>Category Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Pharmacy, Tax Office"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Business Classification Type</label>
                  <select 
                    className="form-control"
                    value={newCatType}
                    onChange={(e) => setNewCatType(e.target.value)}
                    required
                  >
                    <option value="store">Store (Products)</option>
                    <option value="service">Service (Consultation/Professional)</option>
                    <option value="organization">Organization (Hiring/Jobs)</option>
                    <option value="real_estate">Real Estate (Housing)</option>
                    <option value="automotive">Automotive (Cars)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Description (Optional)</label>
                  <textarea 
                    className="form-control" 
                    placeholder="Brief description of the business model..."
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    rows="3"
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn btn-primary flex-grow-1">
                    {editingCategory ? '💾 Save Changes' : '＋ Add Category'}
                  </button>
                  {editingCategory && (
                    <button type="button" onClick={cancelEditCategory} className="btn btn-secondary">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="glass-panel category-list-card">
              <h3>Active Platform Categories</h3>
              <div className="category-scroll-list">
                {categories.length === 0 ? (
                  <p className="no-data">No categories configured yet.</p>
                ) : (
                  categories.map((cat) => (
                    <div key={cat._id} className="category-item">
                      <div>
                        <h5>{cat.name} <span className="badge badge-indigo" style={{fontSize: '0.65rem', marginLeft: '6px', textTransform: 'capitalize'}}>{cat.type}</span></h5>
                        <p>{cat.description || 'No description provided.'}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => startEditCategory(cat)} 
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '6px 10px', fontSize: '0.9rem' }}
                          title="Edit Category"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDeleteCategory(cat._id)} 
                          className="btn btn-danger btn-icon-only btn-sm"
                          title="Delete Category"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* STORES TAB */}
        {activeTab === 'stores' && (
          <div className="glass-panel admin-tab-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ margin: 0 }}>Registered Stores & Businesses</h3>
              <span className="badge bg-primary text-white" style={{ fontSize: '0.85rem' }}>
                Showing {filteredStores.length} of {stores.length} Stores
              </span>
            </div>

            <div className="filter-bar" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="🔍 Search store name, owner email, phone..." 
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                style={{ flex: '1', minWidth: '220px', margin: 0 }}
              />
              <select 
                className="form-control" 
                value={userVerifyFilter} 
                onChange={(e) => setUserVerifyFilter(e.target.value)}
                style={{ width: '180px', margin: 0 }}
              >
                <option value="all">All Verification</option>
                <option value="verified">✓ Verified Only</option>
                <option value="unverified">❌ Unverified Only</option>
              </select>
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Store Name</th>
                    <th>Business Type</th>
                    <th>Owner Email</th>
                    <th>Verified</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStores.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center" style={{ color: 'var(--text-muted)' }}>No matching stores found.</td>
                    </tr>
                  ) : (
                    filteredStores.map((u) => (
                    <tr key={u._id}>
                      <td>
                        <strong>{u.storeName || 'N/A'}</strong>
                      </td>
                      <td>
                        <span className="badge badge-emerald">{u.category || u.businessType || 'business'}</span>
                      </td>
                      <td>{u.email}<br/><small>{u.phone}</small></td>
                      <td>
                        <button 
                          onClick={() => handleToggleVerify(u._id)}
                          className={`btn btn-sm ${u.verificationBadge ? 'btn-success' : 'btn-secondary'}`}
                        >
                          {u.verificationBadge ? '✓ Verified' : '❌ Unverified'}
                        </button>
                      </td>
                      <td>
                        <a href={`/store/${(u.storeName || '').toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-')}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ marginRight: '8px' }}>
                          👁️ View
                        </a>
                        <button 
                          onClick={() => handleToggleUserStatus(u)} 
                          className={`btn btn-sm ${u.status === 'inactive' ? 'btn-success' : 'btn-danger'}`}
                        >
                          {u.status === 'inactive' ? '✅ Activate' : '🚫 Deactivate'}
                        </button>
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* HANDYMEN TAB */}
        {activeTab === 'handymen' && (
          <div className="glass-panel admin-tab-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ margin: 0 }}>Registered Handymen & Pros</h3>
              <span className="badge bg-primary text-white" style={{ fontSize: '0.85rem' }}>
                Showing {filteredHandymen.length} of {handymen.length} Handymen
              </span>
            </div>

            <div className="filter-bar" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="🔍 Search name, email, phone..." 
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                style={{ flex: '1', minWidth: '220px', margin: 0 }}
              />
              <select 
                className="form-control" 
                value={userVerifyFilter} 
                onChange={(e) => setUserVerifyFilter(e.target.value)}
                style={{ width: '180px', margin: 0 }}
              >
                <option value="all">All Verification</option>
                <option value="verified">✓ Verified Only</option>
                <option value="unverified">❌ Unverified Only</option>
              </select>
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Verified</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHandymen.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center" style={{ color: 'var(--text-muted)' }}>No matching handymen found.</td>
                    </tr>
                  ) : (
                    filteredHandymen.map((u) => (
                    <tr key={u._id}>
                      <td>
                        <strong>{u.username}</strong>
                      </td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>
                        <span className={`status-dot ${u.isOnline ? 'active' : 'inactive'}`}></span>
                        {u.isOnline ? 'Online' : 'Offline'}
                      </td>
                      <td>
                        <button 
                          onClick={() => handleToggleVerify(u._id)}
                          className={`btn btn-sm ${u.verificationBadge ? 'btn-success' : 'btn-secondary'}`}
                        >
                          {u.verificationBadge ? '✓ Verified' : '❌ Unverified'}
                        </button>
                      </td>
                      <td>
                        <button 
                          onClick={() => handleToggleUserStatus(u)} 
                          className={`btn btn-sm ${u.status === 'inactive' ? 'btn-success' : 'btn-danger'}`}
                        >
                          {u.status === 'inactive' ? '✅ Activate' : '🚫 Deactivate'}
                        </button>
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INDIVIDUALS TAB */}
        {activeTab === 'individuals' && (
          <div className="glass-panel admin-tab-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ margin: 0 }}>Regular Users Base</h3>
              <span className="badge bg-primary text-white" style={{ fontSize: '0.85rem' }}>
                Showing {filteredIndividuals.length} of {individuals.length} Users
              </span>
            </div>

            <div className="filter-bar" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="🔍 Search username, email, phone..." 
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                style={{ flex: '1', minWidth: '220px', margin: 0 }}
              />
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIndividuals.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center" style={{ color: 'var(--text-muted)' }}>No matching users found.</td>
                    </tr>
                  ) : (
                    filteredIndividuals.map((u) => (
                    <tr key={u._id}>
                      <td>
                        <strong>{u.username}</strong>
                      </td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td>
                        {u.role !== 'super_admin' ? (
                          <button 
                            onClick={() => handleToggleUserStatus(u)} 
                            className={`btn btn-sm ${u.status === 'inactive' ? 'btn-success' : 'btn-danger'}`}
                          >
                            {u.status === 'inactive' ? '✅ Activate' : '🚫 Deactivate'}
                          </button>
                        ) : (
                          <span className="owner-tag">Owner</span>
                        )}
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Global Users Pagination for all segmented user tabs */}
        {['stores', 'handymen', 'individuals'].includes(activeTab) && usersTotalPages > 1 && (
              <div className="admin-pagination flex-center" style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                <button 
                  onClick={() => fetchUsers(usersPage - 1)} 
                  disabled={usersPage === 1}
                  className="btn btn-secondary btn-sm"
                >
                  ◀ Prev
                </button>
                <span className="pagination-info" style={{ color: 'var(--text-secondary)' }}>
                  Page <strong>{usersPage}</strong> of <strong>{usersTotalPages}</strong>
                </span>
                <button 
                  onClick={() => fetchUsers(usersPage + 1)} 
                  disabled={usersPage === usersTotalPages}
                  className="btn btn-secondary btn-sm"
                >
                  Next ▶
                </button>
              </div>
            )}
        {/* LISTINGS TAB */}
        {activeTab === 'listings' && (
          <div className="glass-panel admin-tab-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ margin: 0 }}>Listing Index & Content Control</h3>
              <span className="badge bg-emerald text-white" style={{ fontSize: '0.85rem' }}>
                Showing {filteredListings.length} of {listings.length} Listings
              </span>
            </div>

            {/* Listings Multi-Option Filters */}
            <div className="filter-bar" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="🔍 Search listing, description, owner..." 
                value={listingSearch}
                onChange={(e) => setListingSearch(e.target.value)}
                style={{ flex: '1', minWidth: '220px', margin: 0 }}
              />
              <select 
                className="form-control" 
                value={listingTypeFilter} 
                onChange={(e) => setListingTypeFilter(e.target.value)}
                style={{ width: '180px', margin: 0 }}
              >
                <option value="all">All Types</option>
                <option value="personal_item">Personal Item</option>
                <option value="handyman_skill">Handyman Skill</option>
                <option value="store_product">Store Product</option>
                <option value="service">Service Offering</option>
                <option value="job_opening">Job Opening</option>
                <option value="house">Real Estate (House)</option>
                <option value="car">Automotive (Car)</option>
              </select>
              <select 
                className="form-control" 
                value={listingStatusFilter} 
                onChange={(e) => setListingStatusFilter(e.target.value)}
                style={{ width: '150px', margin: 0 }}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="sold">Sold</option>
                <option value="busy">Busy</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Owner</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center" style={{ color: 'var(--text-muted)' }}>No matching listings posted.</td>
                    </tr>
                  ) : (
                    filteredListings.map((l) => (
                      <tr key={l._id}>
                        <td>
                          <strong>{l.title}</strong>
                          <div className="listing-table-desc">{l.description}</div>
                        </td>
                        <td>
                          <span className="badge badge-indigo">{l.type}</span>
                        </td>
                        <td>{l.ownerName} ({l.ownerId?.email || 'N/A'})</td>
                        <td>{l.price ? `$${l.price}` : 'Free/Inquire'}</td>
                        <td>
                          <span className={`status-dot ${l.status}`}></span>
                          {l.status}
                        </td>
                        <td>
                          <button 
                            onClick={() => handleDeleteListing(l._id)} 
                            className="btn btn-danger btn-sm"
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Listings Pagination */}
            {listingsTotalPages > 1 && (
              <div className="admin-pagination flex-center" style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                <button 
                  onClick={() => fetchListings(listingsPage - 1)} 
                  disabled={listingsPage === 1}
                  className="btn btn-secondary btn-sm"
                >
                  ◀ Prev
                </button>
                <span className="pagination-info" style={{ color: 'var(--text-secondary)' }}>
                  Page <strong>{listingsPage}</strong> of <strong>{listingsTotalPages}</strong>
                </span>
                <button 
                  onClick={() => fetchListings(listingsPage + 1)} 
                  disabled={listingsPage === listingsTotalPages}
                  className="btn btn-secondary btn-sm"
                >
                  Next ▶
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      <style>{`
        .admin-page {
          padding: 40px 0;
        }
        .admin-header {
          margin-bottom: 32px;
        }
        .admin-sub {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          padding: 24px;
          text-align: center;
        }
        .stat-card h4 {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }
        .stat-number {
          font-size: 2.8rem;
          font-family: var(--font-heading);
          font-weight: 800;
          line-height: 1;
        }
        .stat-number.emerald { color: var(--accent-success); }
        .stat-number.cyan { color: var(--accent-secondary); }
        .stat-number.amber { color: var(--accent-warning); }
        .stat-breakdown {
          display: flex;
          justify-content: center;
          gap: 10px;
          font-size: 0.7rem;
          color: var(--text-secondary);
          margin-top: 10px;
          border-top: 1px solid var(--border-glass);
          padding-top: 8px;
        }
        .admin-tabs {
          display: flex;
          gap: 12px;
          border-bottom: 1px solid var(--border-glass);
          padding-bottom: 1px;
          margin-bottom: 24px;
          overflow-x: auto;
        }
        .tab-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 12px 20px;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: var(--transition-fast);
          white-space: nowrap;
        }
        .tab-btn:hover {
          color: #ffffff;
        }
        .tab-btn.active {
          color: var(--accent-primary);
          border-bottom-color: var(--accent-primary);
        }
        .admin-content-window {
          animation: fadeIn 0.2s ease-out;
        }
        .grid-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 768px) {
          .grid-layout {
            grid-template-columns: 1fr;
          }
        }
        .category-form-card, .category-list-card {
          padding: 30px;
        }
        .cat-form {
          margin-top: 20px;
        }
        .category-scroll-list {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 400px;
          overflow-y: auto;
          padding-right: 4px;
        }
        .category-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-md);
        }
        .category-item h5 {
          font-size: 1rem;
        }
        .category-item p {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .admin-tab-content {
          padding: 32px;
        }
        .admin-tab-content h3 {
          margin-bottom: 24px;
          font-size: 1.4rem;
        }
        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .admin-table th {
          font-family: var(--font-heading);
          font-weight: 600;
          color: var(--text-secondary);
          padding: 12px 16px;
          font-size: 0.85rem;
          border-bottom: 2px solid var(--border-glass);
          text-transform: uppercase;
        }
        .admin-table td {
          padding: 16px;
          border-bottom: 1px solid var(--border-glass);
          font-size: 0.9rem;
          vertical-align: middle;
        }
        .listing-table-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 4px;
          max-width: 300px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .status-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 8px;
        }
        .status-dot.active { background-color: var(--accent-success); }
        .status-dot.sold { background-color: var(--accent-danger); }
        .status-dot.busy { background-color: var(--accent-warning); }
        .status-dot.inactive { background-color: var(--text-muted); }
        .owner-tag {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent-warning);
        }
        .no-data {
          color: var(--text-muted);
          text-align: center;
          padding: 20px;
          font-size: 0.9rem;
        }
      `}</style>
      
      </main>
    </div>
  );
};

export default SuperAdmin;
