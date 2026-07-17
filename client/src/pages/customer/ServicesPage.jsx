import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";
import FilterButton from "../../components/FilterButton";

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => {
        if (!res.ok) throw new Error("API response not OK");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data);
        }
      })
      .catch((err) =>
        console.warn("Backend API unreachable for services:", err.message)
      );
  }, []);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [pricingModel, setPricingModel] = useState("All");
  const [minExp, setMinExp] = useState(0);
  const [locationFilter, setLocationFilter] = useState("");
  const [sortBy, setSortBy] = useState("Newest First");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Selected Service Detail Modal
  const [selectedService, setSelectedService] = useState(null);

  // Filter logic
  const filteredServices = services.filter((service) => {
    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = service.title.toLowerCase().includes(q);
      const matchesDesc = service.description.toLowerCase().includes(q);
      const matchesProvider = service.provider.toLowerCase().includes(q);
      const matchesTags =
        service.tags && service.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchesTitle && !matchesDesc && !matchesProvider && !matchesTags) {
        return false;
      }
    }

    // 2. Category
    if (selectedCategory !== "All" && service.category !== selectedCategory) {
      return false;
    }

    // 3. Pricing Model
    if (pricingModel !== "All" && service.pricingModel !== pricingModel) {
      return false;
    }

    // 4. Experience
    if (service.experience < minExp) {
      return false;
    }

    // 5. Location
    if (locationFilter) {
      const addressVal = (service.metadata?.address || service.ownerId?.address || '').toLowerCase();
      const textVal = ((service.description || '') + ' ' + (service.title || '') + ' ' + (service.category || '')).toLowerCase();
      if (!addressVal.includes(locationFilter.toLowerCase()) && !textVal.includes(locationFilter.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  // Sort logic
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === "Newest First") {
      return b.id - a.id;
    }
    if (sortBy === "Highest Rating") {
      return b.rating - a.rating;
    }
    if (sortBy === "Price: Low to High") {
      return a.price - b.price;
    }
    if (sortBy === "Price: High to Low") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on_background font-body-md min-h-screen flex flex-col relative">
          <CustomerNavbar />

          {/* Sub Navbar (Breadcrumbs) */}
          <div className="w-full bg-surface_container_lowest border-b border-outline_variant py-sm select-none">
            <div className="max-w-[1440px] mx-auto px-margin-desktop">
              <nav className="flex flex-wrap items-center gap-sm text-label-sm font-label-sm text-on_surface_variant">
                <Link
                  className="hover:text-primary transition-colors"
                  to="/home"
                >
                  Home
                </Link>
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
                <span className="text-on_surface">Professional Services</span>
              </nav>
            </div>
          </div>

          <main className="flex-grow">
            {/* Hero Section */}
            <section className="bg-surface_container py-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5"></div>
              <div className="max-w-[1440px] mx-auto px-margin-desktop relative z-10 text-center select-none">
                <h1 className="text-h1-mobile md:text-h1 font-h1 text-on_primary_container mb-md">
                  Professional Services Directory
                </h1>
                <p className="text-body-lg font-body-lg text-on_surface_variant mb-xl max-w-2xl mx-auto">
                  Find and book verified local experts, tailors, tech
                  specialists, and cleaning service providers.
                </p>

                {/* Search Bar */}
                <div className="bg-surface rounded-3xl md:rounded-full p-xs shadow-md max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-xs mb-lg">
                  <div className="flex-1 flex items-center gap-xs px-md py-xs w-full border-b md:border-b-0 md:border-r border-outline_variant pb-xs md:pb-0">
                    <span className="material-symbols-outlined text-on_surface_variant text-[20px]">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder="Service title, keywords, or provider"
                      className="w-full bg-transparent border-none focus:ring-0 text-body-sm font-body-sm placeholder:text-on_surface_variant/70 outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 flex items-center gap-xs px-md py-xs w-full border-b md:border-b-0 border-outline_variant pb-xs md:pb-0 mb-xs md:mb-0">
                    <span className="material-symbols-outlined text-on_surface_variant text-[20px]">
                      location_on
                    </span>
                    <input
                      type="text"
                      placeholder="City, region, or 'Remote'"
                      className="w-full bg-transparent border-none focus:ring-0 text-body-sm font-body-sm placeholder:text-on_surface_variant/70 outline-none"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </div>
                  <button
                    className="w-full md:w-auto bg-primary text-on_primary px-xl py-2.5 rounded-full font-label-sm text-body-sm shadow-sm hover:opacity-90 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
                    onClick={() => {
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                  >
                    Search Services
                  </button>
                </div>

                <Link
                  to="/registration"
                  className="inline-block bg-surface_container_high text-on_surface_variant border border-outline_variant px-lg py-sm rounded-full font-label-md shadow-sm hover:bg-surface_container hover:text-on_surface transition-all text-center"
                >
                  List Your Professional Services / Become a Partner
                </Link>
              </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-margin-desktop py-xl w-full">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden flex justify-between items-center mb-md border-b border-outline_variant pb-md select-none">
                <span className="font-label-lg text-on_surface">
                  {sortedServices.length} Services
                </span>
                <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-xl">
                {/* Filters Sidebar */}
                <aside
                  className={`lg:col-span-1 space-y-xl lg:border-r border-outline_variant pr-md ${isFilterOpen ? "block" : "hidden lg:block"} select-none`}
                >
                  <h2 className="text-h3 font-h3 text-on_surface border-b border-outline_variant pb-sm">
                    Filters
                  </h2>

                  <div>
                    <h3 className="font-label-md text-label-md text-on_surface uppercase tracking-wider mb-md">
                      Category
                    </h3>
                    <div className="space-y-sm">
                      {[
                        "All",
                        "Home Repair / Handyman",
                        "Cleaning Services",
                        "IT & Tech Support",
                        "Design & Creative",
                        "Consulting",
                        "Fashion & Tailoring",
                        "Events & Catering",
                      ].map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center gap-sm cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="category"
                            className="w-4 h-4 text-primary focus:ring-primary_container cursor-pointer"
                            checked={selectedCategory === cat}
                            onChange={() => setSelectedCategory(cat)}
                          />
                          <span className="font-body-sm text-body-sm text-on_surface_variant group-hover:text-on_surface transition-colors">
                            {cat}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-label-md text-label-md text-on_surface uppercase tracking-wider mb-md">
                      Pricing Model
                    </h3>
                    <div className="space-y-sm">
                      {[
                        "All",
                        "Hourly Rate",
                        "Fixed Price per Project",
                        "Contact for Quote",
                      ].map((model) => (
                        <label
                          key={model}
                          className="flex items-center gap-sm cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="pricingModel"
                            className="w-4 h-4 text-primary focus:ring-primary_container cursor-pointer"
                            checked={pricingModel === model}
                            onChange={() => setPricingModel(model)}
                          />
                          <span className="font-body-sm text-body-sm text-on_surface_variant group-hover:text-on_surface transition-colors">
                            {model}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-label-md text-label-md text-on_surface uppercase tracking-wider mb-md">
                      Minimum Experience
                    </h3>
                    <input
                      type="range"
                      className="w-full accent-primary cursor-pointer"
                      min="0"
                      max="15"
                      step="1"
                      value={minExp}
                      onChange={(e) => setMinExp(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between mt-sm font-label-sm text-label-sm text-on_surface_variant">
                      <span>{minExp} Yrs</span>
                      <span>15+ Yrs</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-label-md font-label-md text-on_surface uppercase tracking-wider mb-md">
                      Location
                    </h3>
                    <div className="flex bg-surface_container_high rounded-lg p-xs mb-lg border border-outline_variant">
                      <span className="material-symbols-outlined text-on_surface_variant p-xs text-[20px]">
                        location_on
                      </span>
                      <input
                        type="text"
                        placeholder="Search location..."
                        className="bg-transparent border-none focus:ring-0 px-xs py-xs text-body-sm w-full outline-none"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="pt-md border-t border-outline_variant flex gap-sm">
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setPricingModel("All");
                        setMinExp(0);
                        setLocationFilter("");
                        setSearchQuery("");
                      }}
                      className="w-full bg-surface_container_high text-on_surface py-sm rounded-lg font-label-md hover:bg-surface_container_highest transition-colors active:scale-95 cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                </aside>

                {/* Service Listings */}
                <div className="lg:col-span-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-lg gap-md select-none">
                    <div>
                      <h2 className="font-h2 text-h2 text-on_surface">
                        Professional Service Listings
                      </h2>
                      <p className="font-body-sm text-body-sm text-on_surface_variant">
                        Showing {sortedServices.length} verified listings
                      </p>
                    </div>

                    <div className="flex items-center gap-sm">
                      <span className="font-label-md text-label-md text-on_surface_variant">
                        Sort by:
                      </span>
                      <select
                        className="bg-surface border border-outline_variant rounded-lg px-md py-sm font-body-sm text-on_surface focus:ring-2 focus:ring-primary focus:border-primary outline-none cursor-pointer"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option>Newest First</option>
                        <option>Highest Rating</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Listings Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
                    {sortedServices.map((service) => (
                      <div
                        key={service._id || service.id}
                        onClick={() => setSelectedService(service)}
                        className="group bg-surface_container_lowest rounded-xl border border-outline_variant overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                      >
                        <div className="aspect-video overflow-hidden relative bg-surface_container">
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            alt={service.title}
                            src={service.image}
                          />
                          <div className="absolute top-3 right-3">
                            <span className="bg-primary/95 text-on_primary font-bold text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                              {service.experience}+ Yrs Exp
                            </span>
                          </div>
                        </div>

                        <div className="p-md flex-1 flex flex-col justify-between space-y-md">
                          <div className="space-y-xs">
                            <span className="text-[11px] font-label-sm font-bold text-primary uppercase tracking-wider">
                              {service.category}
                            </span>
                            <h4 className="text-body-lg font-label-md text-on_surface line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                              {service.title}
                            </h4>
                            <p className="text-body-sm text-on_surface_variant line-clamp-2 leading-relaxed">
                              {service.description}
                            </p>
                          </div>

                          <div className="border-t border-outline_variant/30 pt-md space-y-sm">
                            <div className="flex items-center justify-between text-body-sm text-on_surface_variant">
                              <Link
                                to={`/serviceprovider?id=${service.providerId}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-xs font-medium text-primary hover:underline"
                              >
                                <span className="material-symbols-outlined text-[16px] text-primary">
                                  storefront
                                </span>
                                {service.provider}
                              </Link>
                              <span className="flex items-center gap-xs">
                                <span
                                  className="material-symbols-outlined text-[16px] text-yellow-500"
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  star
                                </span>
                                <span className="font-bold text-on_surface">
                                  {service.rating}
                                </span>
                                ({service.reviewsCount})
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-body-sm text-on_surface_variant flex items-center gap-xs">
                                <span className="material-symbols-outlined text-[16px]">
                                  location_on
                                </span>
                                {service.location}
                              </span>
                              <span className="text-h4 font-h4 text-primary font-bold">
                                ${service.price}{" "}
                                <span className="text-body-sm font-normal text-on_surface_variant">
                                  /hr
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {sortedServices.length === 0 && (
                      <div className="col-span-full py-xl text-center text-on_surface_variant select-none">
                        <span className="material-symbols-outlined text-[48px] mb-sm text-outline">
                          handyman
                        </span>
                        <p className="text-body-lg font-body-lg">
                          No services found matching your criteria.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>

          <CustomerFooter />

          {/* Service Detail Modal */}
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 animate-fade-in select-none">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in cursor-pointer"
                onClick={() => setSelectedService(null)}
              ></div>

              {/* Modal Container */}
              <div className="relative bg-surface_bright w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 z-10 max-h-[90vh] overflow-y-auto md:overflow-visible animate-scale-up">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 text-on_surface_variant hover:text-on_surface hover:bg-surface_container rounded-full p-1.5 z-20 bg-white/80 backdrop-blur-sm md:bg-transparent shadow-sm md:shadow-none transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>

                {/* Left Side: Photo */}
                <div className="aspect-square md:h-full w-full bg-surface_container relative">
                  <img
                    className="w-full h-full object-cover"
                    alt={selectedService.title}
                    src={selectedService.image}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-on_primary text-label-sm px-3 py-1 rounded-full font-bold shadow-sm">
                      {selectedService.experience} Years Experience
                    </span>
                  </div>
                </div>

                {/* Right Side: details and call actions */}
                <div className="p-lg md:p-xl flex flex-col justify-between space-y-lg overflow-y-auto max-h-[50vh] md:max-h-none">
                  <div>
                    <div className="mb-sm">
                      <span className="text-label-sm font-label-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {selectedService.category}
                      </span>
                    </div>

                    <h2 className="text-h3 font-h3 text-on_background mb-xs leading-tight">
                      {selectedService.title}
                    </h2>

                    <div className="flex items-center gap-xs mb-md text-body-sm">
                      <span
                        className="material-symbols-outlined text-yellow-500 text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="font-bold text-on_surface">
                        {selectedService.rating}
                      </span>
                      <span className="text-on_surface_variant">
                        ({selectedService.reviewsCount} verified reviews)
                      </span>
                    </div>

                    <div className="flex items-baseline gap-xs mb-md">
                      <span className="text-h2 font-h2 text-primary font-bold">
                        ${selectedService.price}
                      </span>
                      <span className="text-body-sm text-on_surface_variant">
                        /{" "}
                        {selectedService.pricingModel === "Hourly Rate"
                          ? "hour"
                          : "project"}
                      </span>
                    </div>

                    <p className="text-body-sm text-on_surface_variant leading-relaxed mb-md">
                      {selectedService.description}
                    </p>

                    <div className="space-y-sm border-t border-outline_variant/30 pt-md">
                      <div className="flex justify-between items-center text-body-sm">
                        <span className="text-on_surface_variant">
                          Provider:
                        </span>
                        <Link
                          to={`/serviceprovider?id=${selectedService.providerId}`}
                          className="font-semibold text-primary hover:underline flex items-center gap-xs"
                        >
                          <span className="material-symbols-outlined text-sm text-primary">
                            storefront
                          </span>
                          {selectedService.provider}
                        </Link>
                      </div>
                      <div className="flex justify-between items-center text-body-sm">
                        <span className="text-on_surface_variant">
                          Location:
                        </span>
                        <span className="font-semibold text-on_surface flex items-center gap-xs">
                          <span className="material-symbols-outlined text-sm">
                            location_on
                          </span>
                          {selectedService.location}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-body-sm">
                        <span className="text-on_surface_variant">
                          Address:
                        </span>
                        <span className="text-on_surface">
                          {selectedService.address || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-sm pt-lg border-t border-outline_variant/30">
                    <div className="grid grid-cols-2 gap-sm">
                      <a
                        href="tel:+251911234567"
                        className="flex items-center justify-center gap-sm bg-primary text-on_primary py-3 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all shadow-sm text-center"
                      >
                        <span className="material-symbols-outlined text-sm">
                          call
                        </span>{" "}
                        Call Expert
                      </a>
                      <a
                        href="sms:+251911234567"
                        className="flex items-center justify-center gap-sm bg-secondary text-on_secondary py-3 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all shadow-sm text-center"
                      >
                        <span className="material-symbols-outlined text-sm">
                          sms
                        </span>{" "}
                        Send Text
                      </a>
                    </div>

                    {selectedService.providerId && (
                      <Link
                        to={`/customertosellerchatwindow?storeId=${selectedService.providerId}`}
                        className="w-full flex items-center justify-center gap-sm border border-outline py-3 rounded-lg font-label-md text-on_surface bg-surface_container_lowest hover:bg-surface_container transition-all text-center shadow-sm"
                      >
                        <span className="material-symbols-outlined text-sm">
                          chat
                        </span>{" "}
                        Chat with Provider
                      </Link>
                    )}
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
