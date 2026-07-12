import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";

export default function StoreListPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedRating, setSelectedRating] = useState("Any Rating");

  // Initialize selectedCategory from URL query parameter
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [location.search]);

  // Fetch categories for filter options
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch((err) => console.warn("Category fetch error:", err.message));
  }, []);

  // Existing effect to fetch stores
  useEffect(() => {
    fetch("http://localhost:5000/api/stores")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setStores(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to load stores from API:", err.message);
        setLoading(false);
      });
  }, []);

  // Filter stores based on interactive states
  const filteredStores = stores.filter((store) => {
    // Only show active and visible stores in customer view
    if (store.status !== "active" || store.isHidden) return false;

    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      store.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesLocation =
      selectedLocation === "All Locations" ||
      store.location.toLowerCase().includes(selectedLocation.toLowerCase());

    let matchesRating = true;
    if (selectedRating === "4.5+ Stars") {
      matchesRating = store.rating >= 4.5;
    } else if (selectedRating === "4.0+ Stars") {
      matchesRating = store.rating >= 4.0;
    } else if (selectedRating === "3.5+ Stars") {
      matchesRating = store.rating >= 3.5;
    }

    return matchesSearch && matchesCategory && matchesLocation && matchesRating;
  });

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on-surface font-body-md">
          {/*  TopNavBar Shell  */}
          <CustomerNavbar />

          <main className="max-w-[1440px] mx-auto px-margin-desktop py-xl">
            {/*  Hero/Title Section  */}
            <header className="mb-xl text-center flex flex-col items-center">
              <h1 className="text-h1 font-h1 text-on-surface mb-sm">
                Discover Verified Stores
              </h1>
              <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-lg">
                Explore our curated list of trusted international sellers
                offering premium, ethically sourced products.
              </p>
              <Link
                to="/registration"
                className="bg-secondary text-on-secondary px-xl py-md rounded-lg font-label-md shadow-md hover:bg-secondary-container hover:text-on-secondary-container transition-all text-center whitespace-nowrap"
              >
                Open Your Store
              </Link>
            </header>

            {/*  Filters Section  */}
            <section className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant mb-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="text-label-sm font-label-sm text-on-surface-variant">
                    Search store
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                      store
                    </span>
                    <input
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-outline-variant rounded-lg text-body-sm focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                      placeholder="Store name..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-xs">
                  <label className="text-label-sm font-label-sm text-on-surface-variant">
                    Store category
                  </label>
                  <select
                    className="w-full px-4 py-2.5 bg-background border border-outline-variant rounded-lg text-body-sm focus:border-secondary"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option>All Categories</option>
                    <option>Fashion &amp; Apparel</option>
                    <option>Electronics</option>
                    <option>Furniture</option>
                    <option>Health &amp; Beauty</option>
                  </select>
                </div>

                <div className="flex flex-col gap-xs">
                  <label className="text-label-sm font-label-sm text-on-surface-variant">
                    Location
                  </label>
                  <select
                    className="w-full px-4 py-2.5 bg-background border border-outline-variant rounded-lg text-body-sm focus:border-secondary"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option>All Locations</option>
                    <option>Addis Ababa</option>
                    <option>Bishoftu</option>
                    <option>Adama</option>
                    <option>Hawassa</option>
                  </select>
                </div>

                <div className="flex flex-col gap-xs">
                  <label className="text-label-sm font-label-sm text-on-surface-variant">
                    Rating
                  </label>
                  <select
                    className="w-full px-4 py-2.5 bg-background border border-outline-variant rounded-lg text-body-sm focus:border-secondary"
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                  >
                    <option>Any Rating</option>
                    <option>4.5+ Stars</option>
                    <option>4.0+ Stars</option>
                    <option>3.5+ Stars</option>
                  </select>
                </div>
              </div>
            </section>

            {/*  Store Grid  */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
              {filteredStores.map((store) => (
                <Link
                  key={store.id}
                  to={`/storedetail?id=${store.id}&category=${encodeURIComponent(store.category)}`}
                  className="store-card block group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-32 w-full bg-surface-variant">
                    <img
                      className="w-full h-full object-cover"
                      alt={store.name}
                      src={store.banner}
                    />
                    <div className="absolute -bottom-6 left-4 h-16 w-16 rounded-lg bg-white p-1 shadow-md">
                      {store.logo ? (
                        <img
                          className="w-full h-full object-cover rounded-md"
                          src={store.logo}
                          alt={`${store.name} logo`}
                        />
                      ) : (
                        <div
                          className={`w-full h-full ${store.logoBg || "bg-primary"} flex items-center justify-center rounded-md`}
                        >
                          <span className="material-symbols-outlined text-white text-[32px]">
                            {store.logoIcon || "store"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pt-8 px-md pb-md">
                    <div className="flex justify-between items-start mb-xs">
                      <div>
                        <h3 className="font-h4 text-h4 text-on-surface">
                          {store.name}
                        </h3>
                        <p className="text-label-sm font-label-sm text-primary">
                          {store.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-secondary-container/20 px-2 py-0.5 rounded text-on-secondary-container">
                        <span
                          className="material-symbols-outlined text-[14px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="text-label-sm font-label-sm">
                          {store.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant mb-md">
                      <span className="material-symbols-outlined text-[16px]">
                        location_on
                      </span>
                      <span className="text-body-sm font-body-sm">
                        {store.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-outline-variant pt-md">
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        {store.productsCount} Products
                      </span>
                      <span className="visit-btn px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-label-md shadow-sm">
                        Visit Store
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

              {filteredStores.length === 0 && (
                <div className="col-span-full text-center py-xxl">
                  <span className="material-symbols-outlined text-[48px] text-outline mb-sm">
                    storefront
                  </span>
                  <p className="text-body-lg text-on-surface-variant">
                    No stores matched your filters.
                  </p>
                </div>
              )}
            </section>

            {/*  Pagination  */}
            {filteredStores.length > 0 && (
              <section className="mt-xxl flex justify-center items-center gap-sm">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label-md">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md">
                  3
                </button>
                <span className="px-2 text-on-surface-variant">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md">
                  12
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              </section>
            )}
          </main>

          {/*  Footer  */}
          <CustomerFooter />
        </div>
      </div>
    </>
  );
}
