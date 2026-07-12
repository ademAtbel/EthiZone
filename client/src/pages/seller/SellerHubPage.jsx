import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerNavbar from '../../components/SellerNavbar';
import { useAuth } from '../../context/AuthContext';

export default function SellerHubPage() {
  const { storeSlug: paramStoreSlug } = useParams();
  const { user } = useAuth();
  const storeSlug = paramStoreSlug || user?.storeSlug || 'my-store';
  const sellerPath = (page) => `/seller/${storeSlug}/${page}`;
  const [stores, setStores] = useState([]);
  const [showStoreForm, setShowStoreForm] = useState(false);

  // Form Field States
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [logo, setLogo] = useState('');
  const [banner, setBanner] = useState('');
  const [description, setDescription] = useState('');
  const [navLinksText, setNavLinksText] = useState('');
  const [subNavLinksText, setSubNavLinksText] = useState('');

  // Load stores list on mount
  useEffect(() => {
    const fetchStores = async () => {
      let list = [];
      try {
        const res = await fetch('http://localhost:5000/api/stores');
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          list = data;
          localStorage.setItem('mock_stores', JSON.stringify(data));
        } else {
          throw new Error("No data");
        }
      } catch (err) {
        console.warn("Backend API not reachable for SellerHub. Using cache fallback:", err.message);
        const raw = localStorage.getItem('mock_stores');
        if (raw) {
          try {
            list = JSON.parse(raw);
          } catch (e) {
            list = [];
          }
        } else {
          list = [];
        }
      }
      setStores(list);

      // Pre-fill fields for this seller's store
      const myStore = list.find(s => s.id === storeSlug) || list[0];
      if (myStore) {
        setName(myStore.name || '');
        setCategory(myStore.category || '');
        setLocation(myStore.location || '');
        setLogo(myStore.logo || '');
        setBanner(myStore.banner || '');
        setDescription(myStore.description || '');
        setNavLinksText(myStore.navLinks ? myStore.navLinks.join(', ') : '');
        setSubNavLinksText(myStore.subNavLinks ? myStore.subNavLinks.join(', ') : '');
      }
    };

    fetchStores();
  }, []);

  const handleSaveStore = async (e) => {
    e.preventDefault();
    if (!name || !category) {
      alert('Store Name and Category are required!');
      return;
    }

    const payload = {
      name,
      category,
      location,
      logo,
      banner,
      description,
      navLinks: navLinksText.split(',').map(l => l.trim()).filter(Boolean),
      subNavLinks: subNavLinksText.split(',').map(l => l.trim()).filter(Boolean)
    };

    // Attempt live API update
    try {
      const res = await fetch(`http://localhost:5000/api/stores/${storeSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("API update failed");
      const data = await res.json();
      console.log("Successfully updated store on backend:", data);
    } catch (err) {
      console.warn("Backend update failed, updating locally only:", err.message);
    }

    const updated = stores.map(s => {
      if (s.id === storeSlug) {
        return {
          ...s,
          ...payload
        };
      }
      return s;
    });

    setStores(updated);
    localStorage.setItem('mock_stores', JSON.stringify(updated));
    setShowStoreForm(false);
    alert('Store profile updated successfully!');
  };

  return (
    <div className="light" lang="en">
      <div className="bg-background text-on_background min-h-screen">
        <SellerSidebar />
        
        <main className="md:ml-64 min-h-screen">
          <SellerNavbar title="Partner Hub" />

          <section className="max-w-[1200px] mx-auto px-margin-desktop py-xxl animate-fade-in">
            <div className="text-center mb-xl">
              <h1 className="text-h1 font-h1 text-on_surface mb-sm">What would you like to post today?</h1>
              <p className="text-body-lg font-body-lg text-on_surface_variant max-w-2xl mx-auto">
                Select the category of the item or service you want to list, or update your public storefront details.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {/* Product */}
              <Link to={sellerPath('addproduct')} className="group bg-surface rounded-2xl p-xl border border-outline_variant shadow-sm hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary_container text-on_primary_container rounded-full flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[40px]">storefront</span>
                </div>
                <h3 className="text-h3 font-h3 text-on_surface mb-xs">Marketplace Product</h3>
                <p className="text-body-md text-on_surface_variant">List physical goods, clothing, electronics, or artisan crafts.</p>
              </Link>

              {/* Car */}
              <Link to={sellerPath('add-car')} className="group bg-surface rounded-2xl p-xl border border-outline_variant shadow-sm hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-secondary_container text-on_secondary_container rounded-full flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[40px]">directions_car</span>
                </div>
                <h3 className="text-h3 font-h3 text-on_surface mb-xs">Vehicle</h3>
                <p className="text-body-md text-on_surface_variant">Sell or rent cars, trucks, and other vehicles.</p>
              </Link>

              {/* House */}
              <Link to={sellerPath('add-house')} className="group bg-surface rounded-2xl p-xl border border-outline_variant shadow-sm hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-tertiary_container text-on_tertiary_container rounded-full flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[40px]">real_estate_agent</span>
                </div>
                <h3 className="text-h3 font-h3 text-on_surface mb-xs">Real Estate</h3>
                <p className="text-body-md text-on_surface_variant">List properties for sale, apartments for rent, or commercial spaces.</p>
              </Link>

              {/* Job */}
              <Link to={sellerPath('add-job')} className="group bg-surface rounded-2xl p-xl border border-outline_variant shadow-sm hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col items-center text-center lg:col-start-1">
                <div className="w-20 h-20 bg-error_container text-on_error_container rounded-full flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[40px]">work</span>
                </div>
                <h3 className="text-h3 font-h3 text-on_surface mb-xs">Job Opening</h3>
                <p className="text-body-md text-on_surface_variant">Post open positions and find talent for your company.</p>
              </Link>

              {/* Service */}
              <Link to={sellerPath('add-service')} className="group bg-surface rounded-2xl p-xl border border-outline_variant shadow-sm hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary_fixed_dim text-on_primary_fixed_variant rounded-full flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[40px]">handyman</span>
                </div>
                <h3 className="text-h3 font-h3 text-on_surface mb-xs">Professional Service</h3>
                <p className="text-body-md text-on_surface_variant">Offer freelance work, home repairs, or consulting services.</p>
              </Link>

              {/* Store Profile settings */}
              <button 
                onClick={() => setShowStoreForm(true)} 
                className="group bg-surface rounded-2xl p-xl border border-outline_variant shadow-sm hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-20 h-20 bg-secondary_fixed text-on_secondary_fixed rounded-full flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[40px]">settings_accessibility</span>
                </div>
                <h3 className="text-h3 font-h3 text-on_surface mb-xs">Store Profile</h3>
                <p className="text-body-md text-on_surface_variant">Update your public storefront name, logo, banner, and navigation tabs.</p>
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Store Settings Form Modal */}
      {showStoreForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface p-lg rounded-2xl border border-outline_variant shadow-2xl max-w-2xl w-full mx-gutter-mobile space-y-lg relative animate-scale-in max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button 
              onClick={() => setShowStoreForm(false)} 
              className="absolute top-4 right-4 p-1 hover:bg-surface_container rounded-full transition-colors cursor-pointer text-on_surface_variant hover:text-on_surface"
            >
              <span className="material-symbols-outlined text-md">close</span>
            </button>

            <div className="border-b border-outline_variant pb-sm">
              <h3 className="text-h3 font-h3 text-on_surface">Update Store Profile</h3>
              <p className="text-body-sm text-on_surface_variant">This information defines how your shop page appears to customers.</p>
            </div>

            <form onSubmit={handleSaveStore} className="space-y-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-2">
                  <label className="text-label-md font-label-md text-on_surface">Store Name *</label>
                  <input 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full border border-outline_variant text-body-md rounded-lg p-2.5 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container outline-none" 
                    type="text" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-label-md font-label-md text-on_surface">Category / Tagline *</label>
                  <input 
                    required 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className="w-full border border-outline_variant text-body-md rounded-lg p-2.5 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container outline-none" 
                    placeholder="e.g. Fashion & Apparel"
                    type="text" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-label-md font-label-md text-on_surface">Location</label>
                  <input 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    className="w-full border border-outline_variant text-body-md rounded-lg p-2.5 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container outline-none" 
                    placeholder="e.g. Bole, Addis Ababa"
                    type="text" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-label-md font-label-md text-on_surface">Logo Image URL</label>
                  <input 
                    value={logo} 
                    onChange={(e) => setLogo(e.target.value)} 
                    className="w-full border border-outline_variant text-body-md rounded-lg p-2.5 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container outline-none" 
                    placeholder="https://..."
                    type="url" 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-label-md font-label-md text-on_surface">Banner Image URL</label>
                  <input 
                    value={banner} 
                    onChange={(e) => setBanner(e.target.value)} 
                    className="w-full border border-outline_variant text-body-md rounded-lg p-2.5 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container outline-none" 
                    placeholder="https://..."
                    type="url" 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-label-md font-label-md text-on_surface">Store Description</label>
                  <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="w-full border border-outline_variant text-body-md rounded-lg p-2.5 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container outline-none" 
                    rows="3"
                    placeholder="Describe your shop..."
                  ></textarea>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-label-md font-label-md text-on_surface">Navigation Tabs (comma-separated)</label>
                  <input 
                    value={navLinksText} 
                    onChange={(e) => setNavLinksText(e.target.value)} 
                    className="w-full border border-outline_variant text-body-sm rounded-lg p-2.5 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container outline-none" 
                    placeholder="All Products, Tops, Bottoms, dresses"
                    type="text" 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-label-md font-label-md text-on_surface">Sub-Navigation Deals (comma-separated)</label>
                  <input 
                    value={subNavLinksText} 
                    onChange={(e) => setSubNavLinksText(e.target.value)} 
                    className="w-full border border-outline_variant text-body-sm rounded-lg p-2.5 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container outline-none" 
                    placeholder="Gift Card, $5 Deals, Premium Collection"
                    type="text" 
                  />
                </div>
              </div>

              <div className="flex justify-end gap-md pt-md border-t border-outline_variant">
                <button 
                  onClick={() => setShowStoreForm(false)} 
                  className="px-lg py-2 border border-outline_variant text-on_surface rounded-lg font-label-md hover:bg-surface_container_high active:scale-95 transition-all cursor-pointer"
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-xl py-2 bg-primary text-on_primary rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
