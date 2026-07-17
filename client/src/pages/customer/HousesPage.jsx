import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";
import FilterButton from "../../components/FilterButton";

export default function HousesPage() {
  const [selectedHouse, setSelectedHouse] = useState(null);

  // Side Filter States
  const [propertyStatus, setPropertyStatus] = useState("All"); // All, Rent, Buy
  const [propertyType, setPropertyType] = useState("All"); // All, Apartment, Single Family, Studio
  const [minBeds, setMinBeds] = useState(0);
  const [minBaths, setMinBaths] = useState(0);
  const [nearMe, setNearMe] = useState(false);
  const [radius, setRadius] = useState(50);
  const [locationFilter, setLocationFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch("/api/houses")
      .then((res) => {
        if (!res.ok) throw new Error("API response not OK");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setHouses(data);
        }
      })
      .catch((err) =>
        console.warn("Backend API unreachable for houses:", err.message)
      );
  }, []);

  const filteredHouses = houses.filter((house) => {
    if (propertyStatus !== "All" && house.type !== propertyStatus) return false;
    if (propertyType !== "All" && house.propertyType !== propertyType)
      return false;
    if (house.beds < minBeds) return false;
    if (house.baths < minBaths) return false;
    if (nearMe && house.distance > radius) return false;
    if (locationFilter) {
      const addressVal = (house.metadata?.address || house.ownerId?.address || '').toLowerCase();
      const textVal = ((house.description || '') + ' ' + (house.title || '') + ' ' + (house.category || '')).toLowerCase();
      if (!addressVal.includes(locationFilter.toLowerCase()) && !textVal.includes(locationFilter.toLowerCase())) {
        return false;
      }
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !house.title.toLowerCase().includes(q) &&
        !house.description.toLowerCase().includes(q) &&
        !house.tags.some((tag) => tag.toLowerCase().includes(q))
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="light" lang="en">
      <div className="text-on-surface flex flex-col min-h-screen bg-surface-container-lowest relative">
        <CustomerNavbar />

        {/* Sub Navbar (Breadcrumbs) */}
        <div className="w-full bg-surface-container-lowest border-b border-outline-variant py-sm">
          <div className="max-w-[1440px] mx-auto px-margin-desktop">
            <nav className="flex flex-wrap items-center gap-sm text-label-sm font-label-sm text-on-surface-variant">
              <Link className="hover:text-primary" to="/home">
                Home
              </Link>
              <span className="material-symbols-outlined text-[16px]">
                chevron_right
              </span>
              <span className="text-on-surface">Real Estate</span>
            </nav>
          </div>
        </div>

        <main className="flex-grow w-full flex flex-col">
          {/* Hero Section */}
          <section className="bg-surface-container py-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5"></div>
            <div className="max-w-[1440px] mx-auto px-margin-desktop relative z-10 text-center">
              <h1 className="text-h1-mobile md:text-h1 font-h1 text-on-primary-container mb-md">
                Real Estate & Rentals
              </h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant mb-xl max-w-2xl mx-auto">
                Find your perfect home, apartment, or commercial space.
              </p>

              {/* Search Bar */}
              <div className="bg-surface rounded-3xl md:rounded-full p-xs shadow-md max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-xs mb-lg">
                <div className="flex-1 flex items-center gap-xs px-md py-xs w-full border-b md:border-b-0 md:border-r border-outline-variant pb-xs md:pb-0">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search properties, keywords..."
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
            </div>
          </section>

          <div className="max-w-[1440px] mx-auto px-margin-desktop py-xl w-full">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden flex justify-between items-center mb-md border-b border-outline-variant pb-md">
              <span className="font-label-lg text-on-surface">
                {filteredHouses.length} Properties
              </span>
              <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)} />
            </div>

            <div className="flex flex-col md:flex-row gap-xl">
              {/* Sidebar Filters */}
              <aside
                className={`w-full md:w-64 flex-shrink-0 space-y-xl md:border-r border-outline-variant pr-md ${isFilterOpen ? "block" : "hidden md:block"}`}
              >
                <h2 className="text-h3 font-h3 text-on-surface border-b border-outline-variant pb-sm">
                  Filters
                </h2>

                {/* Status */}
                <section>
                  <h3 className="text-label-md font-label-md text-on-surface uppercase tracking-wider mb-md">
                    Status
                  </h3>
                  <div className="space-y-sm">
                    {["All", "Rent", "Buy"].map((status) => (
                      <label
                        key={status}
                        className="flex items-center gap-sm cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="status"
                          className="w-4 h-4 text-primary focus:ring-primary-container"
                          checked={propertyStatus === status}
                          onChange={() => setPropertyStatus(status)}
                        />
                        <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">
                          {status}
                        </span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* Property Type */}
                <section>
                  <h3 className="text-label-md font-label-md text-on-surface uppercase tracking-wider mb-md">
                    Property Type
                  </h3>
                  <div className="space-y-sm">
                    {["All", "Apartment", "Single Family", "Studio"].map(
                      (type) => (
                        <label
                          key={type}
                          className="flex items-center gap-sm cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="type"
                            className="w-4 h-4 text-primary focus:ring-primary-container"
                            checked={propertyType === type}
                            onChange={() => setPropertyType(type)}
                          />
                          <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">
                            {type}
                          </span>
                        </label>
                      ),
                    )}
                  </div>
                </section>

                {/* Bedrooms */}
                <section>
                  <h3 className="text-label-md font-label-md text-on-surface uppercase tracking-wider mb-md">
                    Bedrooms
                  </h3>
                  <div className="flex flex-wrap gap-sm">
                    {[0, 1, 2, 3, 4].map((beds) => (
                      <button
                        key={beds}
                        onClick={() => setMinBeds(beds)}
                        className={`w-10 h-10 rounded-full font-label-md flex items-center justify-center transition-colors ${
                          minBeds === beds
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                        }`}
                      >
                        {beds === 0 ? "Any" : `${beds}+`}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Bathrooms */}
                <section>
                  <h3 className="text-label-md font-label-md text-on-surface uppercase tracking-wider mb-md">
                    Bathrooms
                  </h3>
                  <div className="flex flex-wrap gap-sm">
                    {[0, 1, 2, 3].map((baths) => (
                      <button
                        key={baths}
                        onClick={() => setMinBaths(baths)}
                        className={`w-10 h-10 rounded-full font-label-md flex items-center justify-center transition-colors ${
                          minBaths === baths
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                        }`}
                      >
                        {baths === 0 ? "Any" : `${baths}+`}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Location Filter */}
                <section className="pt-sm border-t border-outline-variant mt-xl">
                  <h3 className="text-label-md font-label-md text-on-surface uppercase tracking-wider mb-md mt-sm">
                    Location
                  </h3>
                  <div className="flex bg-surface-container-high rounded-lg p-xs mb-lg">
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

                  <label className="flex items-center gap-sm cursor-pointer mb-md">
                    <div
                      className={`w-10 h-6 rounded-full p-1 transition-colors ${nearMe ? "bg-primary" : "bg-surface-container-highest"}`}
                    >
                      <div
                        className={`w-4 h-4 bg-surface rounded-full shadow-sm transition-transform ${nearMe ? "translate-x-4" : "translate-x-0"}`}
                      ></div>
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={nearMe}
                      onChange={(e) => setNearMe(e.target.checked)}
                    />
                    <span className="text-label-md font-label-md text-on-surface">
                      Near Me
                    </span>
                  </label>

                  {nearMe && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant mb-xs">
                        <span>Within {radius} miles</span>
                        <span>500m</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="500"
                        step="5"
                        value={radius}
                        onChange={(e) => setRadius(parseInt(e.target.value))}
                        className="w-full accent-primary"
                      />
                    </div>
                  )}
                </section>

                <div className="pt-md border-t border-outline-variant flex gap-sm mt-xl">
                  <button
                    onClick={() => {
                      setPropertyStatus("All");
                      setPropertyType("All");
                      setMinBeds(0);
                      setMinBaths(0);
                      setNearMe(false);
                      setRadius(50);
                      setLocationFilter("");
                      setSearchQuery("");
                    }}
                    className="w-full bg-surface-container-high text-on-surface py-sm rounded-lg font-label-md hover:bg-surface-container-highest transition-colors active:scale-95"
                  >
                    Reset Filters
                  </button>
                </div>
              </aside>

              {/* Grid */}
              <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  {filteredHouses.map((house) => (
                    <div
                      key={house._id || house.id}
                      onClick={() => setSelectedHouse(house)}
                      className="bg-surface rounded-xl border border-outline-variant overflow-hidden hover:shadow-lg transition-all group flex flex-col cursor-pointer"
                    >
                      <div className="relative h-56 overflow-hidden shrink-0">
                        <img
                          src={house.image}
                          alt={house.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-sm left-sm bg-surface/90 backdrop-blur-sm px-sm py-xs rounded-md">
                          <span className="text-label-sm font-label-sm text-on-surface font-bold">
                            {house.type}
                          </span>
                        </div>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-sm right-sm bg-surface/80 backdrop-blur-sm p-xs rounded-full hover:bg-primary hover:text-on-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            favorite
                          </span>
                        </button>
                      </div>
                      <div className="p-md flex flex-col flex-grow">
                        <h3 className="text-h3 font-h3 text-primary mb-xs">
                          {house.price}
                        </h3>
                        <h4 className="text-body-lg font-body-lg font-semibold text-on-surface mb-md">
                          {house.title}
                        </h4>

                        <div className="flex items-center gap-md text-on-surface-variant mb-md border-b border-outline-variant pb-md">
                          <div className="flex items-center gap-xs">
                            <span className="material-symbols-outlined text-[18px]">
                              bed
                            </span>
                            <span className="text-label-sm font-label-sm">
                              {house.beds} Beds
                            </span>
                          </div>
                          <div className="flex items-center gap-xs">
                            <span className="material-symbols-outlined text-[18px]">
                              shower
                            </span>
                            <span className="text-label-sm font-label-sm">
                              {house.baths} Baths
                            </span>
                          </div>
                          <div className="flex items-center gap-xs">
                            <span className="material-symbols-outlined text-[18px]">
                              square_foot
                            </span>
                            <span className="text-label-sm font-label-sm">
                              {house.sqft} sqft
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-xs text-on-surface-variant mb-sm mt-auto">
                          <span className="material-symbols-outlined text-[16px]">
                            location_on
                          </span>
                          <span className="text-label-sm font-label-sm">
                            {house.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-xs text-on-surface-variant mb-lg">
                          <span className="material-symbols-outlined text-[16px]">
                            real_estate_agent
                          </span>
                          <span className="text-label-sm font-label-sm">
                            {house.agent}
                          </span>
                        </div>

                        <button className="w-full bg-surface-container-low text-primary py-sm rounded-lg font-label-md group-hover:bg-primary group-hover:text-on-primary transition-colors">
                          View Property
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredHouses.length === 0 && (
                    <div className="col-span-full text-center py-xl text-on-surface-variant">
                      No properties found for this filter.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <CustomerFooter />

        {/* Dynamic Modal Overlay */}
        {selectedHouse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-md">
            <div
              className="absolute inset-0 bg-scrim/40 backdrop-blur-sm"
              onClick={() => setSelectedHouse(null)}
            ></div>
            <div className="relative bg-surface rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl z-10 flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedHouse(null)}
                className="absolute top-sm right-sm w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface hover:bg-error hover:text-on-error transition-colors z-20 shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto shrink-0 relative">
                <img
                  src={selectedHouse.image}
                  alt={selectedHouse.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-md left-md bg-primary text-on-primary px-sm py-xs rounded-md shadow-md">
                  <span className="text-label-md font-label-md font-bold uppercase">
                    {selectedHouse.type}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                <div className="absolute bottom-md left-md md:hidden">
                  <h2 className="text-h2 font-h2 text-white mb-xs">
                    {selectedHouse.title}
                  </h2>
                  <p className="text-h3 font-h3 text-primary-container">
                    {selectedHouse.price}
                  </p>
                </div>
              </div>

              <div className="p-xl flex flex-col flex-grow">
                <div className="hidden md:block mb-lg border-b border-outline-variant pb-md">
                  <h2 className="text-h2 font-h2 text-on-surface mb-xs">
                    {selectedHouse.title}
                  </h2>
                  <p className="text-h2 font-h2 text-primary">
                    {selectedHouse.price}
                  </p>
                </div>

                <div className="flex items-center gap-lg mb-lg">
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-primary text-[28px] mb-xs">
                      bed
                    </span>
                    <span className="font-label-lg text-on-surface">
                      {selectedHouse.beds}
                    </span>
                    <span className="text-label-sm text-on-surface-variant">
                      Beds
                    </span>
                  </div>
                  <div className="w-[1px] h-10 bg-outline-variant"></div>
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-primary text-[28px] mb-xs">
                      shower
                    </span>
                    <span className="font-label-lg text-on-surface">
                      {selectedHouse.baths}
                    </span>
                    <span className="text-label-sm text-on-surface-variant">
                      Baths
                    </span>
                  </div>
                  <div className="w-[1px] h-10 bg-outline-variant"></div>
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-primary text-[28px] mb-xs">
                      square_foot
                    </span>
                    <span className="font-label-lg text-on-surface">
                      {selectedHouse.sqft}
                    </span>
                    <span className="text-label-sm text-on-surface-variant">
                      SqFt
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-sm mb-lg bg-surface-container-lowest p-md rounded-xl border border-outline-variant">
                  <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                      location_on
                    </span>
                    <p
                      className="text-body-sm font-semibold truncate"
                      title={selectedHouse.location}
                    >
                      {selectedHouse.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                      calendar_month
                    </span>
                    <p className="text-body-sm font-semibold">
                      Built {selectedHouse.yearBuilt}
                    </p>
                  </div>
                  <div className="flex items-center gap-xs col-span-2 mt-xs">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                      home_work
                    </span>
                    <p className="text-body-sm font-semibold">
                      {selectedHouse.propertyType}
                    </p>
                  </div>
                </div>

                <h3 className="text-h4 font-h4 text-on-surface mb-sm">
                  Property Overview
                </h3>
                <p className="text-body-lg font-body-lg text-on-surface-variant mb-xl flex-grow">
                  {selectedHouse.description}
                </p>

                <div className="flex items-center gap-md mb-xl p-md bg-surface-container-high rounded-xl">
                  <div className="w-12 h-12 bg-secondary text-on-secondary rounded-full flex items-center justify-center font-bold text-h4 shrink-0">
                    <span className="material-symbols-outlined">
                      real_estate_agent
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-on-surface">
                      {selectedHouse.agent}
                    </h4>
                    <p className="text-body-sm text-on-surface-variant flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[14px] text-primary">
                        verified
                      </span>{" "}
                      Licensed Agent
                    </p>
                  </div>
                </div>

                <div className="flex gap-sm mt-auto">
                  <button className="flex-1 bg-primary text-on-primary px-lg py-md rounded-lg font-label-lg text-label-lg hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95 text-center shadow-md flex items-center justify-center gap-sm">
                    <span className="material-symbols-outlined">mail</span>{" "}
                    Contact Agent
                  </button>
                  <button className="bg-surface-container-high text-primary px-lg py-md rounded-lg font-label-lg text-label-lg hover:bg-surface-container-highest transition-colors active:scale-95 text-center flex items-center justify-center">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
