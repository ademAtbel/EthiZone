import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";
import FilterButton from "../../components/FilterButton";

const PRODUCTS = [
  {
    id: 1,
    category: "Home Decor",
    title: "Artisan Ceramic Vase",
    price: "$89.00",
    store: "Clay & Co. Studio",
    rating: "4.9",
    location: "Berlin, Germany",
    region: "Europe",
    storeType: "Independent Maker",
    distance: 12,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLy40rX2Q7Xb9v3aK6Yy1G8M_2oXhV9r_pI-j9ViqXfsZKjt3VjXLFNUoHHiunpXiFQcleHJ8wkyP7vwroynZ5KGfY304trV855Z_v2IdMAJBWBDv9yJ7c6Upims8oxPR7HHY",
  },
  {
    id: 2,
    category: "Home Decor",
    title: "Organic Cotton Throw",
    price: "$89.00",
    store: "EcoWeave Hub",
    rating: "4.9",
    location: "Vancouver, Canada",
    region: "North America",
    storeType: "Verified Partner",
    distance: 35,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbNg-J2fn_0ScHRJ8tLcGD2xPHZ_MESaE7tW3ULoiu29wemkDnoZBZKY_y0_PBuRO5XBpXhPxkMr3ZPzlOFAGrBF9fFMKnu13kHv4g-GEcwh7mih6LCE9QJeWwKdP_5SP-X4M2ZEKkojiaq1PL30VV9el0jGOXdMvVh9lSLOcz9JvEqjoe6303usEHkxL-AJF__dCxhhaCASX67ZOGwKihXtX_kRzJUF-HjtjBa7tpHkebEREPuH500pUkL4VSZaNhEr69jYqqEaKT",
  },
  {
    id: 3,
    category: "Stationery",
    title: "Hand-Stitched Journal",
    price: "$32.00",
    store: "Heritage Press",
    rating: "4.7",
    location: "Florence, Italy",
    region: "Europe",
    storeType: "Independent Maker",
    distance: 120,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSkMB6JDnFWTtVk3MlsNdZdc8UL54QbPsyBpbZhEr-iYr2rAFyhBHW6UXzuQlxTggqoY53nw8cOST1f71J8Dj0tgOK58Ga5zM4Uu0WVrr4DWfvdQPkemXmlscgCRzfOWmP82BLl3dJwxSgTYc9zwh_7gmaYqg_HQqPkkT46bRvLZVX8TAr3Oo2Uc7hpdNjE0t_-SeyG6fVDEvOabTkDFEkl2008G6uPoGYFPY6LZIiU0eoyFpgDqKDzdx7hoBX4-P9t07LctJBI0YE",
  },
  {
    id: 4,
    category: "Office",
    title: "Eco-Desk Organizer",
    price: "$45.00",
    store: "Workspace Zen",
    rating: "4.8",
    location: "Tokyo, Japan",
    region: "Asia",
    storeType: "Verified Partner",
    distance: 5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyaV7tiSw_UT0IWzcJ997QpXrqSEKBBKvFby3eESlbAFl8Wly50f93-JUiD8z5ydbUuUB6D3LU5VtKxTUHM1FLddSHz3aM1u1w2dXE76w6_nu8vrOo_SnbiEzkCDZQeL-DYKrBi9QRlI0dWHmBDtUwcXndpyH17vfViAERQzaQVVu4rYUELfEHKHk6HCiVJa7bev74DFjvXa90cFaHkowDtvQ9v0pOIVlAlF6xQEftTLzG_hetsXhE91wTiRPUMBlxgu3vO8H25Xbm",
  },
  {
    id: 5,
    category: "Home Decor",
    title: "Cedar & Sage Soy Candle",
    price: "$18.00",
    store: "Lumiere Artisans",
    rating: "5.0",
    location: "Portland, USA",
    region: "North America",
    storeType: "Independent Maker",
    distance: 85,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgkQ6as57jDUE05u2ZQU1E7dMHS1LKEqHhiFDxIqNbYJ12jvQdxyVcEhWV2jurjTKKtEdkJfIbCyhsR_Fj0Z0DuxrMa1eXVsyauso1PO7VeA2IzWOIJctny_RhKm05_yT593kklmCDnyPpOIFiCSycMFeY0h4u2edcP1wZmJ4WtfrNjB_U6AUei5xDnabnq54lmVr-M3Yk5V-Wey0K77eZWTaMsLsSDftxK6cAx9rKyBz-dJw6qQwMbaFCW6ABVA4LhbJJiVTUZ8qG",
  },
  {
    id: 6,
    category: "Fashion",
    title: "Signature Leather Tote",
    price: "$145.00",
    store: "Vera Leatherworks",
    rating: "4.8",
    location: "Leon, Mexico",
    region: "North America",
    storeType: "Verified Partner",
    distance: 400,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmZvkd1c8w_WatKyUTxaUT_D9-ciYhQedPKY5lWFyCF0lNWSqD5dKH9EdxnkMGEQqMRUj-Fcw4snbocKHe6igWfVviX2aR26_jC50ws5QKLxHBkbpE-uWGNHAQCquGNQHjR8wXiKNXfbhX4_5GMlkv7IIFvL5U_TnN3NEv7baWIVbsJe_HD2p7fOAWYiHY-jJT1Pvfa1Bj3Zvt4Du2mzJp8Kxzt_xNJy_DuAyyy4cMrJpZJJT0gXN4wAz5sVH0HaISK6nXcQ52rUGO",
  },
  {
    id: 7,
    category: "Second-Hand / Used",
    title: "Vintage Film Camera (Gently Used)",
    price: "$120.00",
    store: "Alex Photography",
    rating: "4.5",
    location: "New York, USA",
    region: "North America",
    storeType: "Independent Maker",
    distance: 10,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3p1d1j7k5X1L8mY8q6e2nZ0b6k2lGq5K7q2vK8a8T1c7qX3jT9Y3X3Y2c2X1Y4q1L9v7n6X2j6L8k3n4m8b2v9c1X5q7m4X6z2Y4q1L9v7n6X2j6L8k3n4m8b2v9c1X5q7m4X6z",
  },
];

export default function MarketplacePage() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [storeType, setStoreType] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [nearMe, setNearMe] = useState(false);
  const [radius, setRadius] = useState(50);
  const [sortBy, setSortBy] = useState("Newest Arrivals");
  const [locationFilter, setLocationFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("API response not OK");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped = data.map((p) => {
            let region = "Africa";
            const loc = (p.store?.location || "").toLowerCase();
            if (
              loc.includes("berlin") ||
              loc.includes("germany") ||
              loc.includes("london") ||
              loc.includes("uk") ||
              loc.includes("italy")
            ) {
              region = "Europe";
            } else if (
              loc.includes("vancouver") ||
              loc.includes("canada") ||
              loc.includes("usa") ||
              loc.includes("york") ||
              loc.includes("angeles") ||
              loc.includes("austin") ||
              loc.includes("miami")
            ) {
              region = "North America";
            } else if (loc.includes("tokyo") || loc.includes("japan")) {
              region = "Asia";
            } else if (loc.includes("mexico")) {
              region = "South America";
            }

            return {
              id: p._id || p.id,
              category: p.store?.category || "General",
              title: p.name,
              price: `$${(p.price || 0).toFixed(2)}`,
              store: p.store?.name || "Unknown Store",
              rating: (p.rating || 5.0).toFixed(1),
              location: p.store?.location || "Addis Ababa",
              region: region,
              storeType:
                p.store?.status === "active"
                  ? "Verified Partner"
                  : "Independent Maker",
              distance: Math.floor(Math.random() * 50) + 5,
              image:
                p.image ||
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
              storeStatus: p.store?.status || "active",
              storeIsHidden: p.store?.isHidden || false,
            };
          });
          setProducts(mapped);
        }
      })
      .catch((err) => {
        console.error(
          "Backend API unreachable for products:",
          err.message,
        );
      });
  }, []);

  const handleLocationChange = (region) => {
    setSelectedLocations((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region],
    );
  };

  const filteredProducts = products
    .filter((p) => {
      if (p.storeStatus !== "active" || p.storeIsHidden) return false;
      if (categoryFilter && p.category !== categoryFilter) return false;
      const pPrice = parseFloat(p.price.replace("$", ""));
      const pMin = minPrice !== '' ? minPrice : 0;
      const pMax = maxPrice !== '' ? maxPrice : Infinity;
      if (pPrice < pMin || pPrice > pMax) return false;
      if (selectedLocations.length > 0 && !selectedLocations.includes(p.region))
        return false;
      if (storeType !== "All" && p.storeType !== storeType) return false;
      if (parseFloat(p.rating) < minRating) return false;
      if (nearMe && p.distance > radius) return false;
      if (locationFilter) {
        const addressVal = (p.metadata?.address || p.ownerId?.address || '').toLowerCase();
        const textVal = ((p.description || '') + ' ' + (p.title || '') + ' ' + (p.category || '')).toLowerCase();
        if (!addressVal.includes(locationFilter.toLowerCase()) && !textVal.includes(locationFilter.toLowerCase())) {
          return false;
        }
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.store.toLowerCase().includes(q) &&
          !p.category.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") {
        return (
          parseFloat(a.price.replace("$", "")) -
          parseFloat(b.price.replace("$", ""))
        );
      } else if (sortBy === "Price: High to Low") {
        return (
          parseFloat(b.price.replace("$", "")) -
          parseFloat(a.price.replace("$", ""))
        );
      } else if (sortBy === "Most Popular") {
        return parseFloat(b.rating) - parseFloat(a.rating);
      } else {
        // Newest Arrivals (default to ID descending for mock data)
        return b.id - a.id;
      }
      return 0;
    });

  const activePrices = products.map(p => parseFloat(p.price.replace("$", "")) || 0);
  const dataMinPrice = activePrices.length > 0 ? Math.min(...activePrices) : 0;
  const dataMaxPrice = activePrices.length > 0 ? Math.max(...activePrices) : 1000;
  const currentMinPrice = minPrice !== '' ? minPrice : dataMinPrice;
  const currentMaxPrice = maxPrice !== '' ? maxPrice : dataMaxPrice;

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on-surface font-body-md">
          {/*  TopNavBar Shell  */}
          <CustomerNavbar />
          <main className="flex-grow w-full flex flex-col">
            {/* Hero Section */}
            <section className="bg-surface-container py-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5"></div>
              <div className="max-w-[1440px] mx-auto px-margin-desktop relative z-10 text-center">
                <h1 className="text-h1-mobile md:text-h1 font-h1 text-on-primary-container mb-md">
                  Ethizone Marketplace
                </h1>
                <p className="text-body-lg font-body-lg text-on-surface-variant mb-xl max-w-2xl mx-auto">
                  Discover ethical products from verified artisan stores around
                  the globe.
                </p>

                {/* Search Bar */}
                <div className="bg-surface rounded-3xl md:rounded-full p-xs shadow-md max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-xs mb-lg">
                  <div className="flex-1 flex items-center gap-xs px-md py-xs w-full border-b md:border-b-0 md:border-r border-outline-variant pb-xs md:pb-0">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder="Search products, stores, keywords..."
                      className="w-full bg-transparent border-none focus:ring-0 text-body-sm font-body-sm placeholder:text-on-surface-variant/70"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 flex items-center gap-xs px-md py-xs w-full border-b md:border-b-0 border-outline-variant pb-xs md:pb-0 mb-xs md:mb-0">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                      location_on
                    </span>
                    <input
                      type="text"
                      placeholder="City, State, or Zip"
                      className="w-full bg-transparent border-none focus:ring-0 text-body-sm font-body-sm placeholder:text-on-surface-variant/70"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </div>
                  <button
                    className="w-auto self-center md:self-auto bg-primary text-on-primary px-lg py-xs rounded-full font-label-sm text-body-sm shadow-sm hover:shadow-md transition-all active:scale-95 whitespace-nowrap"
                    onClick={() => {
                      window.scrollTo({ top: 500, behavior: "smooth" });
                    }}
                  >
                    Search
                  </button>
                </div>

                <Link
                  to="/registration"
                  className="inline-block bg-surface-container-high text-on-surface-variant border border-outline-variant px-lg py-sm rounded-full font-label-md shadow-sm hover:bg-surface-container hover:text-on-surface transition-all text-center mt-lg"
                >
                  Become a Seller
                </Link>
              </div>
            </section>
            <div className="max-w-[1440px] mx-auto px-margin-desktop py-xl w-full">
              {/* Mobile Filter Toggle */}
              <div className="md:hidden flex justify-between items-center mb-md border-b border-outline-variant pb-md">
                <span className="font-label-lg text-on-surface">
                  {filteredProducts.length} Products
                </span>
                <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)} />
              </div>

              <div className="flex flex-col md:flex-row gap-xl">
                {/*  Sidebar Filters  */}
                <aside
                  className={`w-full md:w-64 flex-shrink-0 space-y-xl md:border-r border-outline-variant pr-md ${isFilterOpen ? "block" : "hidden md:block"}`}
                >
                  {/*  Filter Section: Categories  */}
                  <section>
                    <h3 className="text-label-md font-label-md text-on-surface uppercase tracking-wider mb-md">
                      Category
                    </h3>
                    <div className="flex flex-wrap gap-sm">
                      <Link
                        to="/marketplace"
                        className={`px-md py-xs rounded-full text-label-sm font-label-sm transition-colors ${!categoryFilter ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"}`}
                      >
                        All
                      </Link>
                      <Link
                        to="/marketplace?category=Home Decor"
                        className={`px-md py-xs rounded-full text-label-sm font-label-sm transition-colors ${categoryFilter === "Home Decor" ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"}`}
                      >
                        Home Decor
                      </Link>
                      <Link
                        to="/marketplace?category=Stationery"
                        className={`px-md py-xs rounded-full text-label-sm font-label-sm transition-colors ${categoryFilter === "Stationery" ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"}`}
                      >
                        Stationery
                      </Link>
                      <Link
                        to="/marketplace?category=Office"
                        className={`px-md py-xs rounded-full text-label-sm font-label-sm transition-colors ${categoryFilter === "Office" ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"}`}
                      >
                        Office
                      </Link>
                      <Link
                        to="/marketplace?category=Fashion"
                        className={`px-md py-xs rounded-full text-label-sm font-label-sm transition-colors ${categoryFilter === "Fashion" ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"}`}
                      >
                        Fashion
                      </Link>
                    </div>
                  </section>
                  {/*  Filter Section: Price Range  */}
                  <section>
                    <h3 className="text-label-md font-label-md text-on-surface uppercase tracking-wider mb-md">
                      Price Range
                    </h3>
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
                  </section>
                  {/*  Filter Section: Location  */}
                  <section>
                    <h3 className="text-label-md font-label-md text-on-surface uppercase tracking-wider mb-sm">
                      Location
                    </h3>

                    <div className="flex bg-surface-container-high rounded-lg p-xs mb-md">
                      <span className="material-symbols-outlined text-on-surface-variant p-xs text-[20px]">
                        location_on
                      </span>
                      <input
                        type="text"
                        placeholder="City, State, or Zip"
                        className="bg-transparent border-none focus:ring-0 px-xs py-xs text-body-sm w-full"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>

                    <div className="space-y-sm mb-md pb-sm border-b border-outline-variant">
                      <label className="flex items-center gap-sm cursor-pointer group">
                        <input
                          className="w-4 h-4 rounded border-outline text-primary focus:ring-primary-container"
                          type="checkbox"
                          checked={nearMe}
                          onChange={(e) => setNearMe(e.target.checked)}
                        />
                        <span className="text-body-sm text-on-surface font-bold">
                          Near Me
                        </span>
                      </label>
                      {nearMe && (
                        <div className="px-xs pt-xs">
                          <input
                            className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                            max="500"
                            min="5"
                            step="5"
                            type="range"
                            value={radius}
                            onChange={(e) => setRadius(e.target.value)}
                          />
                          <div className="flex justify-between mt-sm text-label-sm font-label-sm text-primary">
                            <span>Within {radius} miles</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-sm">
                      {[
                        "North America",
                        "South America",
                        "Europe",
                        "Asia",
                        "Africa",
                        "Oceania",
                      ].map((region) => (
                        <label
                          key={region}
                          className="flex items-center gap-sm cursor-pointer group"
                        >
                          <input
                            className="w-4 h-4 rounded border-outline text-primary focus:ring-primary-container"
                            type="checkbox"
                            checked={selectedLocations.includes(region)}
                            onChange={() => handleLocationChange(region)}
                            disabled={nearMe}
                          />
                          <span
                            className={`text-body-sm ${nearMe ? "text-outline" : "text-on-surface-variant group-hover:text-on-surface"}`}
                          >
                            {region}
                          </span>
                        </label>
                      ))}
                    </div>
                  </section>
                  {/*  Filter Section: Store Type  */}
                  <section>
                    <h3 className="text-label-md font-label-md text-on-surface uppercase tracking-wider mb-md">
                      Store Type
                    </h3>
                    <div className="space-y-sm">
                      <label className="flex items-center gap-sm cursor-pointer group">
                        <input
                          className="w-4 h-4 border-outline text-primary focus:ring-primary-container"
                          name="store_type"
                          type="radio"
                          checked={storeType === "All"}
                          onChange={() => setStoreType("All")}
                        />
                        <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">
                          All Stores
                        </span>
                      </label>
                      <label className="flex items-center gap-sm cursor-pointer group">
                        <input
                          className="w-4 h-4 border-outline text-primary focus:ring-primary-container"
                          name="store_type"
                          type="radio"
                          checked={storeType === "Verified Partner"}
                          onChange={() => setStoreType("Verified Partner")}
                        />
                        <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">
                          Verified Partner
                        </span>
                      </label>
                      <label className="flex items-center gap-sm cursor-pointer group">
                        <input
                          className="w-4 h-4 border-outline text-primary focus:ring-primary-container"
                          name="store_type"
                          type="radio"
                          checked={storeType === "Independent Maker"}
                          onChange={() => setStoreType("Independent Maker")}
                        />
                        <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">
                          Independent Maker
                        </span>
                      </label>
                    </div>
                  </section>
                  {/*  Filter Section: Rating  */}
                  <section>
                    <h3 className="text-label-md font-label-md text-on-surface uppercase tracking-wider mb-md">
                      Rating
                    </h3>
                    <div className="space-y-sm">
                      <button
                        className={`flex items-center gap-xs text-body-sm transition-colors ${minRating === 0 ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
                        onClick={() => setMinRating(0)}
                      >
                        <span>Any Rating</span>
                      </button>
                      <button
                        className={`flex items-center gap-xs text-body-sm transition-colors ${minRating === 4.5 ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
                        onClick={() => setMinRating(4.5)}
                      >
                        <span
                          className={`material-symbols-outlined text-sm ${minRating === 4.5 ? "text-[#FFD700]" : "text-outline"}`}
                          style={{
                            fontVariationSettings: `'FILL' ${minRating === 4.5 ? 1 : 0}`,
                          }}
                        >
                          star
                        </span>
                        <span>4.5 &amp; Up</span>
                      </button>
                      <button
                        className={`flex items-center gap-xs text-body-sm transition-colors ${minRating === 4.0 ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
                        onClick={() => setMinRating(4.0)}
                      >
                        <span
                          className={`material-symbols-outlined text-sm ${minRating === 4.0 ? "text-[#FFD700]" : "text-outline"}`}
                          style={{
                            fontVariationSettings: `'FILL' ${minRating === 4.0 ? 1 : 0}`,
                          }}
                        >
                          star
                        </span>
                        <span>4.0 &amp; Up</span>
                      </button>
                      <button
                        className={`flex items-center gap-xs text-body-sm transition-colors ${minRating === 3.0 ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
                        onClick={() => setMinRating(3.0)}
                      >
                        <span
                          className={`material-symbols-outlined text-sm ${minRating === 3.0 ? "text-[#FFD700]" : "text-outline"}`}
                          style={{
                            fontVariationSettings: `'FILL' ${minRating === 3.0 ? 1 : 0}`,
                          }}
                        >
                          star
                        </span>
                        <span>3.0 &amp; Up</span>
                      </button>
                    </div>
                  </section>

                  <div className="pt-md border-t border-outline-variant flex gap-sm mt-xl">
                    <button className="flex-1 bg-primary text-on-primary py-sm rounded-lg font-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95">
                      Filter
                    </button>
                    <button
                      onClick={() => {
                        setMinPrice('');
                        setMaxPrice('');
                        setSelectedLocations([]);
                        setStoreType("All");
                        setMinRating(0);
                        setNearMe(false);
                        setRadius(50);
                        setLocationFilter("");
                        setSearchQuery("");
                      }}
                      className="w-full bg-surface-container-high text-on-surface py-sm rounded-lg font-label-md hover:bg-surface-container-highest transition-colors active:scale-95"
                    >
                      Reset
                    </button>
                  </div>
                </aside>
                {/*  Main Content Area  */}
                <div className="flex-grow">
                  {/*  Search & Sort Header  */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-xl">
                    <div className="relative w-full md:w-96 group">
                      <span
                        className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors"
                        data-icon="search"
                      >
                        search
                      </span>
                      <input
                        className="w-full pl-xl pr-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                        placeholder="Search products, stores, or materials..."
                        type="text"
                      />
                    </div>
                    <div className="flex items-center gap-md w-full md:w-auto">
                      <span className="text-label-sm font-label-sm text-on-surface-variant whitespace-nowrap">
                        Sort by:
                      </span>
                      <select
                        className="bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm text-label-md font-label-md focus:ring-primary transition-all cursor-pointer"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option>Newest Arrivals</option>
                        <option>Most Popular</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                      </select>
                    </div>
                  </div>
                  {/*  Product Grid  */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md mb-xl">
                    {filteredProducts.map((product) => (
                      <Link
                        to="/productdetail"
                        key={product.id}
                        className="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block"
                      >
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            src={product.image}
                          />
                          <button
                            className="absolute top-md right-md p-sm bg-surface-container-lowest/80 backdrop-blur-md rounded-full shadow-sm hover:bg-primary hover:text-on-primary transition-colors"
                            onClick={(e) => e.preventDefault()}
                          >
                            <span
                              className="material-symbols-outlined text-sm"
                              data-icon="favorite"
                            >
                              favorite
                            </span>
                          </button>
                        </div>
                        <div className="p-md space-y-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-tighter">
                                {product.category}
                              </h4>
                              <h3 className="text-h4 font-h4 text-on-surface">
                                {product.title}
                              </h3>
                            </div>
                            <span className="text-h4 font-h4 text-primary">
                              {product.price}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-body-sm text-on-surface-variant">
                            <div className="flex items-center gap-xs">
                              <span
                                className="material-symbols-outlined text-sm"
                                data-icon="store"
                              >
                                store
                              </span>
                              <span>{product.store}</span>
                            </div>
                            <div className="flex items-center gap-xs text-on-surface">
                              <span
                                className="material-symbols-outlined text-sm text-[#FFD700]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                              <span className="font-bold">
                                {product.rating}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-xs text-label-sm font-label-sm text-outline">
                            <span
                              className="material-symbols-outlined text-xs"
                              data-icon="location_on"
                            >
                              location_on
                            </span>
                            <span>{product.location}</span>
                          </div>
                          <div className="flex gap-sm pt-md">
                            <button
                              className="flex-1 px-md py-sm bg-surface-container-high text-on-surface font-label-md rounded-lg hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-xs"
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(product.location)}`,
                                  "_blank",
                                );
                              }}
                            >
                              <span className="material-symbols-outlined text-sm">
                                directions
                              </span>
                              Navigate
                            </button>
                            <button
                              className="px-md py-sm bg-primary text-on-primary font-label-md rounded-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-xs"
                              onClick={(e) => {
                                e.preventDefault();
                                alert("Call Seller at: +251 911 234 567");
                              }}
                            >
                              <span
                                className="material-symbols-outlined text-sm"
                                data-icon="call"
                              >
                                call
                              </span>
                              Contact
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {/*  Pagination  */}
                  <div className="mt-xxl flex justify-center items-center gap-sm">
                    <button
                      className="p-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-30"
                      disabled=""
                    >
                      <span className="material-symbols-outlined">
                        chevron_left
                      </span>
                    </button>
                    <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-label-md">
                      1
                    </button>
                    <button className="w-10 h-10 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-high font-label-md transition-colors">
                      2
                    </button>
                    <button className="w-10 h-10 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-high font-label-md transition-colors">
                      3
                    </button>
                    <span className="text-outline">...</span>
                    <button className="w-10 h-10 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-high font-label-md transition-colors">
                      12
                    </button>
                    <button className="p-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors">
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/*  Footer Shell  */}
          <CustomerFooter />
        </div>
      </div>
    </>
  );
}
