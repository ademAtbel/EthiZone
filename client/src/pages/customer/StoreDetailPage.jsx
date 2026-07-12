import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";
import { useLanguage } from "../../context/LanguageContext";
import useAuthFetch from "../../hooks/useAuthFetch";

export default function StoreDetailPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get("id") || "addis-boutique";
  const categoryParam = searchParams.get("category");
  const authFetch = useAuthFetch();

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  const isStoreUnavailable =
    !store || store.status !== "active" || store.isHidden;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Products");
  const [sortBy, setSortBy] = useState("default");
  const [onlySpecialOffers, setOnlySpecialOffers] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([]);

  // Fetch filtered products from backend whenever filter criteria change
  useEffect(() => {
    if (!storeId) return;
    // Build query parameters
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (onlySpecialOffers) params.append("specialOnly", true);
    if (sortBy && sortBy !== "default") params.append("sort", sortBy);
    // Fetch products
    authFetch(`/api/stores/${storeId}/products?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        // Backend returns { success, count, data }
        setSortedProducts(data.data || []);
      })
      .catch((err) => {
        console.warn("Error loading products:", err.message);
        setSortedProducts([]);
      });
  }, [storeId, searchQuery, onlySpecialOffers, sortBy]);
  const filterContainerRef = useRef(null);

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");

  useEffect(() => {
    // Sync selected category from URL if present
    if (categoryParam) setSelectedCategory(categoryParam);
    setLoading(true);
    authFetch(`/api/stores/${storeId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Store not found");
        return res.json();
      })
      .then((data) => {
        setStore(data);
        setSelectedCategory(data.navLinks ? data.navLinks[0] : "All");
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to load store:", err.message);
        setLoading(false);
      });

    setSearchQuery("");
    setActiveTab("Products");
    setSortBy("default");
    setOnlySpecialOffers(false);
    setShowFilterMenu(false);
    setSelectedProduct(null);
  }, [storeId]);

  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
      setSize("M");
    }
  }, [selectedProduct]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(event.target)
      ) {
        setShowFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCategoryClick = (category) => {
    if (category === "About Us" || category === "About") {
      setActiveTab("About");
    } else if (category === "Contact" || category === "Contact Us") {
      setActiveTab("About");
    } else {
      setActiveTab("Products");
      setSelectedCategory(category);
    }
  };

  if (loading) {
    return (
      <div className="light" lang="en">
        <div className="bg-background text-on_background font-body-md antialiased min-h-screen flex flex-col">
          <CustomerNavbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-md text-on_surface_variant">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-body-md">Loading store...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isStoreUnavailable) {
    return (
      <div className="light" lang="en">
        <div className="bg-background text-on_background font-body-md antialiased min-h-screen flex flex-col justify-between">
          <CustomerNavbar />
          <main className="max-w-[1440px] mx-auto w-full px-margin-desktop py-32 flex flex-col items-center justify-center text-center flex-grow">
            <div className="w-20 h-20 rounded-full bg-error-container/20 text-error flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[48px]">
                storefront
              </span>
            </div>
            <h1 className="text-h2 font-h2 text-on-surface mb-3">
              Storefront Unavailable
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-md mb-8">
              The store you are looking for is currently not active, hidden, or
              has been temporarily suspended by the administrator.
            </p>
            <Link
              to="/storelist"
              className="bg-primary text-on-primary px-xl py-md rounded-lg font-label-md shadow-md hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95"
            >
              Discover Other Stores
            </Link>
          </main>
          <CustomerFooter />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on_background font-body-md antialiased">
          {/*  Global TopNavBar  */}
          <CustomerNavbar />

          {/* Custom Storefront Header - branding & shop nav only */}
          <header className="bg-surface_container_lowest py-lg border-b border-outline_variant select-none">
            <div className="max-w-[1440px] mx-auto px-margin-desktop flex flex-col items-center">
              {/* Row 1: Centered Brand Logo / Stylized Name ONLY */}
              <div className="w-full flex items-center justify-center mb-lg">
                <div className="text-center">
                  {store.logo ? (
                    <div className="flex flex-col items-center justify-center">
                      <img
                        className="h-10 md:h-12 object-contain"
                        src={store.logo}
                        alt={store.name}
                      />
                      <span className="text-[10px] tracking-[0.25em] font-label-sm text-on_surface_variant uppercase mt-1">
                        {t("boutiqueSub")}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-[28px] md:text-[34px] font-serif tracking-wide italic font-bold text-on_surface leading-none">
                        {store.name}
                      </span>
                      <span className="text-[10px] tracking-[0.25em] font-label-sm text-on_surface_variant uppercase mt-1">
                        {t("est2022")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: Navigation Links */}
              <div className="w-full flex justify-center border-t border-outline_variant/30 pt-md">
                <nav className="flex flex-wrap items-center justify-center gap-x-lg gap-y-sm text-label-md font-label-md uppercase tracking-[0.15em] text-on_surface_variant">
                  {store.navLinks &&
                    store.navLinks.map((link) => {
                      const isActive =
                        selectedCategory === link && activeTab === "Products";
                      return (
                        <button
                          key={link}
                          onClick={() => handleCategoryClick(link)}
                          className={`hover:text-primary transition-colors pb-1 ${isActive ? "text-primary border-b-2 border-primary font-bold" : ""}`}
                        >
                          {t(link)}
                        </button>
                      );
                    })}
                </nav>
              </div>

              {/* Row 3: Sub Navigation Links */}
              {store.subNavLinks && store.subNavLinks.length > 0 && (
                <div className="w-full flex justify-center mt-sm pt-xs border-t border-outline_variant/10">
                  <nav className="flex flex-wrap items-center justify-center gap-x-md gap-y-xs text-[11px] font-label-sm uppercase tracking-[0.2em] text-on_surface_variant/80">
                    {store.subNavLinks.map((subLink) => {
                      const isActive =
                        selectedCategory === subLink &&
                        activeTab === "Products";
                      return (
                        <button
                          key={subLink}
                          onClick={() => {
                            setActiveTab("Products");
                            setSelectedCategory(subLink);
                          }}
                          className={`hover:text-primary transition-colors ${isActive ? "text-primary font-bold" : ""}`}
                        >
                          {t(subLink)}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              )}
            </div>
          </header>

          <main className="max-w-[1440px] mx-auto w-full px-margin-desktop py-md">
            {/*  Store Banner and Logo  */}
            <header className="relative mb-lg">
              <div className="w-full h-64 rounded-xl overflow-hidden shadow-sm relative">
                <img
                  className="w-full h-full object-cover"
                  alt={`${store.name} banner`}
                  src={store.banner}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/*  Store Profile Details Container (positioned below the banner, logo overlapping) */}
              <div className="relative px-margin-desktop flex flex-col md:flex-row items-start md:items-end justify-between gap-md -mt-16 z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end gap-md">
                  {/* Logo Container (overlapping banner due to -mt-16 on parent, with high contrast border) */}
                  <div className="w-32 h-32 rounded-xl bg-surface_container_lowest border-4 border-surface shadow-lg overflow-hidden flex items-center justify-center relative">
                    {store.logo ? (
                      <img
                        className="w-full h-full object-cover"
                        alt={store.name}
                        src={store.logo}
                      />
                    ) : (
                      <div
                        className={`w-full h-full ${store.logoBg || "bg-primary"} flex items-center justify-center`}
                      >
                        <span className="material-symbols-outlined text-white text-[48px]">
                          {store.logoIcon || "store"}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Store Name, Rating, and Location (clearly on light background below banner) */}
                  <div className="mb-2">
                    <div className="flex items-center gap-xs">
                      <h1 className="text-h2 font-h2 text-on_background">
                        {store.name}
                      </h1>
                      <span
                        className="material-symbols-outlined text-secondary text-xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    </div>
                    <p className="text-on_surface_variant flex items-center gap-xs font-body-sm">
                      <span className="material-symbols-outlined text-sm">
                        location_on
                      </span>{" "}
                      {store.location}
                      <span className="mx-2">•</span>
                      <span className="text-primary font-bold">
                        {store.rating}
                      </span>
                      <span
                        className="material-symbols-outlined text-primary text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-label-sm">
                        ({store.reviewsCount} reviews)
                      </span>
                    </p>
                  </div>
                </div>

                {/* Store Action Buttons (clearly on light background below banner, styled for readability) */}
                <div className="flex items-center gap-sm mb-2">
                  <Link
                    to={`/customertosellerchatwindow?storeId=${store.id}`}
                    className="flex items-center gap-sm px-6 py-2.5 rounded-lg border border-outline bg-surface_container_lowest text-on_surface font-label-md hover:bg-surface_container transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">
                      chat
                    </span>{" "}
                    {t("contactSeller")}
                  </Link>
                  <button className="flex items-center gap-sm px-6 py-2.5 rounded-lg bg-primary text-on_primary font-label-md shadow-sm hover:opacity-90 transition-all active:scale-95">
                    <span className="material-symbols-outlined text-sm">
                      add
                    </span>{" "}
                    {t("followStore")}
                  </button>
                </div>
              </div>
            </header>

            {/*  Main Content Area  */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-xl mt-xl">
              {/*  Sidebar: Stats & Info  */}
              <aside className="lg:col-span-1 space-y-lg">
                {/*  Stats Card  */}
                <section className="bg-surface_container_low rounded-xl p-lg border border-outline_variant">
                  <h3 className="text-label-md font-label-md text-on_surface_variant mb-md uppercase tracking-wider">
                    {t("storePerformance")}
                  </h3>
                  <div className="space-y-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-sm text-on_surface_variant">
                        <span className="material-symbols-outlined">
                          inventory_2
                        </span>
                        <span className="text-body-sm">{t("products")}</span>
                      </div>
                      <span className="font-bold text-on_surface">
                        {store.productsCount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-sm text-on_surface_variant">
                        <span className="material-symbols-outlined">
                          shopping_bag
                        </span>
                        <span className="text-body-sm">{t("orders")}</span>
                      </div>
                      <span className="font-bold text-on_surface">
                        {(store.reviewsCount * 5).toLocaleString()}+
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-sm text-on_surface_variant">
                        <span className="material-symbols-outlined">
                          calendar_today
                        </span>
                        <span className="text-body-sm">{t("joined")}</span>
                      </div>
                      <span className="font-bold text-on_surface">
                        Mar 2022
                      </span>
                    </div>
                  </div>
                  <div className="mt-lg pt-lg border-t border-outline_variant">
                    <div className="bg-primary/10 rounded-lg p-md">
                      <p className="text-label-sm text-primary_fixed_dim font-label-sm leading-tight">
                        {t("responseRate")}
                      </p>
                    </div>
                  </div>
                </section>

                {/*  About Card  */}
                <section className="bg-surface_container_lowest rounded-xl p-lg border border-outline_variant">
                  <h3 className="text-label-md font-label-md text-on_surface mb-sm">
                    {t("about")} {store.name}
                  </h3>
                  <p className="text-body-sm text-on_surface_variant leading-relaxed">
                    {store.description}
                  </p>
                </section>
              </aside>

              {/*  Product Grid & Search  */}
              <div className="lg:col-span-3 space-y-lg">
                {/*  Internal Search & Tabs  */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-md border-b border-outline_variant pb-md">
                  <div className="flex items-center gap-lg">
                    <button
                      onClick={() => setActiveTab("Products")}
                      className={`${activeTab === "Products" ? "text-primary font-bold border-b-2 border-primary" : "text-on_surface_variant hover:text-on_surface"} pb-md -mb-[18px] transition-colors`}
                    >
                      {t("products")}
                    </button>
                    <button
                      onClick={() => setActiveTab("Reviews")}
                      className={`${activeTab === "Reviews" ? "text-primary font-bold border-b-2 border-primary" : "text-on_surface_variant hover:text-on_surface"} pb-md -mb-[18px] transition-colors`}
                    >
                      {t("reviews")}
                    </button>
                    <button
                      onClick={() => setActiveTab("About")}
                      className={`${activeTab === "About" ? "text-primary font-bold border-b-2 border-primary" : "text-on_surface_variant hover:text-on_surface"} pb-md -mb-[18px] transition-colors`}
                    >
                      {t("about")}
                    </button>
                  </div>

                  {activeTab === "Products" && (
                    <div className="flex items-center gap-md w-full sm:w-auto">
                      <div className="relative w-full sm:w-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on_surface_variant text-xl">
                          search
                        </span>
                        <input
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-surface_container_low border border-outline_variant rounded-lg pl-10 pr-4 py-2 text-body-sm focus:ring-primary focus:border-primary"
                          placeholder={t("searchInStore")}
                          type="text"
                        />
                      </div>

                      {/* Interactive Sorting & Filtering Dropdown */}
                      <div
                        className="relative filter-container"
                        ref={filterContainerRef}
                      >
                        <button
                          onClick={() => setShowFilterMenu(!showFilterMenu)}
                          className={`p-2 border border-outline_variant rounded-lg hover:bg-surface_container_low transition-colors flex items-center justify-center ${showFilterMenu ? "bg-primary/10 text-primary border-primary" : "text-on_surface_variant"}`}
                        >
                          <span className="material-symbols-outlined">
                            filter_list
                          </span>
                        </button>

                        {showFilterMenu && (
                          <div className="absolute right-0 mt-2 w-64 bg-surface_container_lowest border border-outline_variant rounded-xl shadow-xl p-lg z-50 animate-fade-in">
                            <div className="space-y-md">
                              <div>
                                <h4 className="text-label-sm font-label-sm text-on_surface_variant uppercase tracking-wider mb-sm">
                                  {t("sortBy")}
                                </h4>
                                <div className="space-y-xs">
                                  {[
                                    { value: "default", label: t("featured") },
                                    {
                                      value: "price-asc",
                                      label: t("priceLowToHigh"),
                                    },
                                    {
                                      value: "price-desc",
                                      label: t("priceHighToLow"),
                                    },
                                    {
                                      value: "rating",
                                      label: t("customerRating"),
                                    },
                                  ].map((opt) => (
                                    <label
                                      key={opt.value}
                                      className="flex flex-row items-center gap-sm cursor-pointer py-1"
                                    >
                                      <input
                                        type="radio"
                                        name="sortBy"
                                        value={opt.value}
                                        checked={sortBy === opt.value}
                                        onChange={() => setSortBy(opt.value)}
                                        className="text-primary focus:ring-primary h-4 w-4 border-outline_variant"
                                      />
                                      <span
                                        className={`text-body-sm ${sortBy === opt.value ? "text-primary font-bold" : "text-on_surface"}`}
                                      >
                                        {opt.label}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              </div>

                              <div className="pt-md border-t border-outline_variant/30">
                                <h4 className="text-label-sm font-label-sm text-on_surface_variant uppercase tracking-wider mb-sm">
                                  {t("filterBy")}
                                </h4>
                                <label className="flex flex-row items-center gap-sm cursor-pointer py-1">
                                  <input
                                    type="checkbox"
                                    checked={onlySpecialOffers}
                                    onChange={(e) =>
                                      setOnlySpecialOffers(e.target.checked)
                                    }
                                    className="rounded text-primary focus:ring-primary h-4 w-4 border-outline_variant"
                                  />
                                  <span
                                    className={`text-body-sm ${onlySpecialOffers ? "text-primary font-bold" : "text-on_surface"}`}
                                  >
                                    {t("onlyTaggedItems")}
                                  </span>
                                </label>
                              </div>

                              <div className="pt-sm flex justify-end">
                                <button
                                  onClick={() => setShowFilterMenu(false)}
                                  className="text-label-sm text-primary font-bold hover:underline"
                                >
                                  {t("close")}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {activeTab === "Products" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-lg">
                    {sortedProducts.map((product, idx) => (
                      <div
                        key={product.id || idx}
                        onClick={() => setSelectedProduct(product)}
                        className="group bg-surface_container_lowest rounded-xl border border-outline_variant overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between animate-slide-in-up"
                      >
                        <div className="aspect-square overflow-hidden relative">
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            alt={product.name}
                            src={product.image}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Favorite toggle logic here (placeholder)
                            }}
                            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-error">
                              favorite
                            </span>
                          </button>
                          {product.tag && (
                            <div className="absolute bottom-3 left-3">
                              <span className="bg-secondary_container text-on_secondary_container text-label-sm px-2 py-1 rounded">
                                {product.tag}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-md flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-body-md font-label-md text-on_surface line-clamp-2 mb-xs">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-xs mb-sm">
                              <div className="flex text-primary">
                                <span
                                  className="material-symbols-outlined text-xs"
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  star
                                </span>
                                <span className="text-label-sm text-on_surface ml-0.5">
                                  {product.rating}
                                </span>
                              </div>
                              <span className="text-label-sm text-on_surface_variant">
                                ({product.reviewsCount || 0})
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-md">
                            <span className="text-h4 font-h4 text-primary">
                              ${product.price.toFixed(2)}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProduct(product);
                              }}
                              className="p-2 bg-primary_container text-on_primary_container rounded-lg hover:opacity-90 transition-opacity"
                            >
                              <span className="material-symbols-outlined">
                                arrow_forward
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {sortedProducts.length === 0 && (
                      <div className="col-span-full py-xl text-center text-on_surface_variant">
                        {t("noProductsFound")} "
                        {searchQuery || selectedCategory}".
                      </div>
                    )}

                    {/*  View More / See All Card  */}
                    <div className="group bg-surface_container_low rounded-xl border border-dashed border-outline_variant flex items-center justify-center p-xl hover:bg-surface_container transition-colors cursor-pointer">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-md shadow-sm">
                          <span className="material-symbols-outlined text-primary">
                            arrow_forward
                          </span>
                        </div>
                        <p className="text-on_surface font-label-md">
                          {t("viewAllProducts")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Reviews" && (
                  <div className="space-y-md bg-surface_container_lowest p-lg rounded-xl border border-outline_variant">
                    <h3 className="text-h3 font-h3 text-on_surface mb-lg">
                      {t("customerReviews")}
                    </h3>
                    <div className="space-y-lg divide-y divide-outline_variant">
                      <div className="pt-0 pb-lg">
                        <div className="flex items-center justify-between mb-sm">
                          <div>
                            <p className="font-label-lg text-on_surface">
                              Abebe K.
                            </p>
                            <div className="flex text-primary text-sm mt-0.5">
                              <span
                                className="material-symbols-outlined text-xs"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                              <span
                                className="material-symbols-outlined text-xs"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                              <span
                                className="material-symbols-outlined text-xs"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                              <span
                                className="material-symbols-outlined text-xs"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                              <span
                                className="material-symbols-outlined text-xs"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                            </div>
                          </div>
                          <span className="text-label-sm text-on_surface_variant">
                            2 days ago
                          </span>
                        </div>
                        <p className="text-body-md text-on_surface_variant">
                          Exceptional service and extremely high quality
                          materials! Highly recommend {store.name}.
                        </p>
                      </div>
                      <div className="pt-lg pb-lg">
                        <div className="flex items-center justify-between mb-sm">
                          <div>
                            <p className="font-label-lg text-on_surface">
                              Sarah T.
                            </p>
                            <div className="flex text-primary text-sm mt-0.5">
                              <span
                                className="material-symbols-outlined text-xs"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                              <span
                                className="material-symbols-outlined text-xs"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                              <span
                                className="material-symbols-outlined text-xs"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                              <span
                                className="material-symbols-outlined text-xs"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                              <span className="material-symbols-outlined text-xs">
                                star
                              </span>
                            </div>
                          </div>
                          <span className="text-label-sm text-on_surface_variant">
                            1 week ago
                          </span>
                        </div>
                        <p className="text-body-md text-on_surface_variant">
                          Very pleased with my purchase. Ethically sourced and
                          fast shipping. Will buy again.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "About" && (
                  <div className="space-y-lg bg-surface_container_lowest p-lg rounded-xl border border-outline_variant">
                    <h3 className="text-h3 font-h3 text-on_surface font-bold">
                      {t("about")} {store.name}
                    </h3>
                    <p className="text-body-lg text-on_surface_variant leading-relaxed">
                      {store.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-md border-t border-outline_variant">
                      <div>
                        <h4 className="font-label-lg text-on_surface mb-xs">
                          {t("location")}
                        </h4>
                        <p className="text-body-md text-on_surface_variant flex items-center gap-xs">
                          <span className="material-symbols-outlined text-sm">
                            location_on
                          </span>{" "}
                          {store.location}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-label-lg text-on_surface mb-xs">
                          {t("ratingReputation")}
                        </h4>
                        <p className="text-body-md text-on_surface_variant flex items-center gap-xs">
                          <span
                            className="material-symbols-outlined text-sm text-primary"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>{" "}
                          {store.rating} ({store.reviewsCount}{" "}
                          {t("verifiedReviews")})
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>

          {/*  Footer  */}
          <CustomerFooter />

          {/*  Floating Action Button (Contextual for store)  */}
          <Link
            to={`/customertosellerchatwindow?storeId=${store.id}`}
            className="fixed bottom-lg right-lg bg-primary text-on_primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40"
          >
            <span className="material-symbols-outlined">chat</span>
          </Link>

          {/* Product Detail Modal */}
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 animate-fade-in">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in cursor-pointer"
                onClick={() => setSelectedProduct(null)}
              ></div>

              {/* Modal Container */}
              <div className="relative bg-surface_bright w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 z-10 max-h-[90vh] overflow-y-auto md:overflow-visible animate-scale-in">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 text-on_surface_variant hover:text-on_surface hover:bg-surface_container rounded-full p-1.5 z-20 bg-white/80 backdrop-blur-sm md:bg-transparent shadow-sm md:shadow-none transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>

                {/* Left: Product Image */}
                <div className="aspect-square md:h-full w-full bg-surface_container relative">
                  <img
                    className="w-full h-full object-cover animate-fade-in"
                    alt={selectedProduct.name}
                    src={selectedProduct.image}
                  />
                  {selectedProduct.tag && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-secondary_container text-on_secondary_container text-label-sm px-3 py-1 rounded-full font-bold shadow-sm">
                        {selectedProduct.tag}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right: Info & Actions */}
                <div className="p-lg md:p-xl flex flex-col justify-between space-y-lg overflow-y-auto max-h-[50vh] md:max-h-none">
                  <div>
                    <div className="flex justify-between items-start mb-sm">
                      <span className="text-label-sm font-label-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {t("soldBy")} {store.name}
                      </span>
                    </div>

                    <h2 className="text-h3 font-h3 text-on_background mb-xs leading-tight">
                      {selectedProduct.name}
                    </h2>

                    <div className="flex items-center gap-xs mb-md">
                      <span
                        className="material-symbols-outlined text-yellow-500"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-label-md font-label-md">
                        {selectedProduct.rating}
                      </span>
                      <span className="text-on_surface_variant text-label-sm">
                        ({selectedProduct.reviewsCount || 0} reviews)
                      </span>
                    </div>

                    <div className="text-h2 font-h2 text-primary mb-md">
                      ${selectedProduct.price.toFixed(2)}
                    </div>

                    <p className="text-body-sm text-on_surface_variant leading-relaxed mb-lg">
                      {t("experiencePremium")
                        .replace("{product}", selectedProduct.name)
                        .replace("{store}", store.name)}
                    </p>

                    {/* Quantity and Options Selector */}
                    <div className="space-y-md border-t border-outline_variant/30 pt-md">
                      {/* Quantity */}
                      <div className="flex items-center justify-between">
                        <span className="text-label-md font-label-md text-on_surface">
                          {t("quantity")}
                        </span>
                        <div className="flex items-center border border-outline rounded-lg overflow-hidden bg-surface_container_lowest">
                          <button
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                            className="px-3 py-1 hover:bg-surface_container_high transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">
                              remove
                            </span>
                          </button>
                          <span className="px-4 py-1 font-label-md border-x border-outline w-12 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3 py-1 hover:bg-surface_container_high transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">
                              add
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Size Selector for Fashion */}
                      {store?.category?.toLowerCase().includes("fashion") && (
                        <div className="flex items-center justify-between">
                          <span className="text-label-md font-label-md text-on_surface">
                            {t("size")}
                          </span>
                          <div className="flex gap-xs">
                            {["S", "M", "L", "XL"].map((sz) => (
                              <button
                                key={sz}
                                onClick={() => setSize(sz)}
                                className={`w-9 h-9 text-label-sm font-bold rounded-lg border transition-all ${size === sz ? "border-primary bg-primary/10 text-primary" : "border-outline hover:border-primary/50 text-on_surface"}`}
                              >
                                {sz}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Color Selector for non-fashion */}
                      {!store?.category?.toLowerCase().includes("fashion") && (
                        <div className="flex items-center justify-between">
                          <span className="text-label-md font-label-md text-on_surface">
                            {t("options")}
                          </span>
                          <span className="text-body-sm text-on_surface_variant">
                            {t("standardEdition")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-sm pt-lg border-t border-outline_variant/30">
                    <div className="grid grid-cols-2 gap-sm">
                      <a
                        href="tel:+251911234567"
                        className="flex items-center justify-center gap-sm bg-primary text-on_primary py-3 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all shadow-sm"
                      >
                        <span className="material-symbols-outlined text-sm">
                          call
                        </span>{" "}
                        {t("callSeller")}
                      </a>
                      <a
                        href="sms:+251911234567"
                        className="flex items-center justify-center gap-sm bg-secondary text-on_secondary py-3 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all shadow-sm"
                      >
                        <span className="material-symbols-outlined text-sm">
                          sms
                        </span>{" "}
                        {t("textSeller")}
                      </a>
                    </div>

                    <Link
                      to={`/customertosellerchatwindow?storeId=${store.id}`}
                      className="w-full flex items-center justify-center gap-sm border border-outline py-3 rounded-lg font-label-md text-on_surface bg-surface_container_lowest hover:bg-surface_container transition-all text-center shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">
                        chat
                      </span>{" "}
                      {t("chatSeller")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
