import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";
import FilterButton from "../../components/FilterButton";

export default function CarsPage() {
  const [selectedCar, setSelectedCar] = useState(null);

  // Side Filter States
  const [status, setStatus] = useState("All"); // All, Rent, Sale
  const [condition, setCondition] = useState("All"); // All, New, Used
  const [bodyType, setBodyType] = useState("All"); // All, Sedan, SUV, Luxury, Electric
  const [transmission, setTransmission] = useState("All"); // All, Automatic, Manual
  const [nearMe, setNearMe] = useState(false);
  const [radius, setRadius] = useState(50);
  const [locationFilter, setLocationFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => {
        if (!res.ok) throw new Error("API response not OK");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCars(data);
        }
      })
      .catch((err) =>
        console.warn("Backend API unreachable for cars:", err.message)
      );
  }, []);

  const filteredCars = cars.filter((car) => {
    if (status !== "All" && car.status !== status) return false;
    if (condition !== "All" && car.condition !== condition) return false;
    if (bodyType !== "All" && !car.tags.includes(bodyType)) return false;
    if (transmission !== "All" && car.transmission !== transmission)
      return false;
    if (nearMe && car.distance > radius) return false;
    if (
      locationFilter &&
      !car.location.toLowerCase().includes(locationFilter.toLowerCase())
    )
      return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !car.title.toLowerCase().includes(q) &&
        !car.description.toLowerCase().includes(q) &&
        !car.tags.some((tag) => tag.toLowerCase().includes(q))
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
              <span className="text-on-surface">Vehicles</span>
            </nav>
          </div>
        </div>

        <main className="flex-grow w-full flex flex-col">
          {/* Hero Section */}
          <section className="bg-surface-container py-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5"></div>
            <div className="max-w-[1440px] mx-auto px-margin-desktop relative z-10 text-center">
              <h1 className="text-h1-mobile md:text-h1 font-h1 text-on-primary-container mb-md">
                Cars & Automotive
              </h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant mb-xl max-w-2xl mx-auto">
                Find your next vehicle from verified local dealers.
              </p>

              {/* Search Bar */}
              <div className="bg-surface rounded-3xl md:rounded-full p-xs shadow-md max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-xs mb-lg">
                <div className="flex-1 flex items-center gap-xs px-md py-xs w-full border-b md:border-b-0 md:border-r border-outline-variant pb-xs md:pb-0">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search make, model, keywords..."
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
                {filteredCars.length} Vehicles
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
                    {["All", "Rent", "Sale"].map((s) => (
                      <label
                        key={s}
                        className="flex items-center gap-sm cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="status"
                          className="w-4 h-4 text-primary focus:ring-primary-container"
                          checked={status === s}
                          onChange={() => setStatus(s)}
                        />
                        <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">
                          {s}
                        </span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* Condition */}
                <section>
                  <h3 className="text-label-md font-label-md text-on-surface uppercase tracking-wider mb-md">
                    Condition
                  </h3>
                  <div className="space-y-sm">
                    {["All", "New", "Used"].map((c) => (
                      <label
                        key={c}
                        className="flex items-center gap-sm cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="condition"
                          className="w-4 h-4 text-primary focus:ring-primary-container"
                          checked={condition === c}
                          onChange={() => setCondition(c)}
                        />
                        <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">
                          {c}
                        </span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* Body Type */}
                <section>
                  <h3 className="text-label-md font-label-md text-on-surface uppercase tracking-wider mb-md">
                    Body Type
                  </h3>
                  <div className="space-y-sm">
                    {["All", "Sedan", "SUV", "Electric", "Luxury"].map((t) => (
                      <label
                        key={t}
                        className="flex items-center gap-sm cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="bodyType"
                          className="w-4 h-4 text-primary focus:ring-primary-container"
                          checked={bodyType === t}
                          onChange={() => setBodyType(t)}
                        />
                        <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">
                          {t}
                        </span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* Transmission */}
                <section>
                  <h3 className="text-label-md font-label-md text-on-surface uppercase tracking-wider mb-md">
                    Transmission
                  </h3>
                  <div className="space-y-sm">
                    {["All", "Automatic", "Manual"].map((trans) => (
                      <label
                        key={trans}
                        className="flex items-center gap-sm cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="transmission"
                          className="w-4 h-4 text-primary focus:ring-primary-container"
                          checked={transmission === trans}
                          onChange={() => setTransmission(trans)}
                        />
                        <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">
                          {trans}
                        </span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* Location */}
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
                      setStatus("All");
                      setCondition("All");
                      setBodyType("All");
                      setTransmission("All");
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                  {filteredCars.map((car) => (
                    <div
                      key={car._id || car.id}
                      onClick={() => setSelectedCar(car)}
                      className="bg-surface rounded-xl border border-outline-variant overflow-hidden hover:shadow-lg transition-all group cursor-pointer flex flex-col"
                    >
                      <div className="relative h-48 overflow-hidden shrink-0">
                        <img
                          src={car.image}
                          alt={car.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-sm left-sm bg-surface/90 backdrop-blur-sm px-sm py-xs rounded-md">
                          <span className="text-label-sm font-label-sm text-on-surface font-bold">
                            {car.type}
                          </span>
                        </div>
                      </div>
                      <div className="p-md flex flex-col flex-grow">
                        <h3 className="text-h4 font-h4 text-on-surface mb-xs truncate">
                          {car.title}
                        </h3>
                        <p className="text-h3 font-h3 text-primary mb-md">
                          {car.price}
                        </p>

                        <div className="flex items-center gap-xs text-on-surface-variant mb-sm mt-auto">
                          <span className="material-symbols-outlined text-[16px]">
                            location_on
                          </span>
                          <span className="text-label-sm font-label-sm">
                            {car.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-xs text-on-surface-variant mb-lg">
                          <span className="material-symbols-outlined text-[16px]">
                            storefront
                          </span>
                          <span className="text-label-sm font-label-sm">
                            {car.dealer}
                          </span>
                        </div>

                        <button className="w-full border border-primary text-primary py-sm rounded-lg font-label-md group-hover:bg-primary-container transition-colors mt-auto">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredCars.length === 0 && (
                    <div className="col-span-full text-center py-xl text-on-surface-variant">
                      No cars found for this filter.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <CustomerFooter />

        {/* Dynamic Modal Overlay */}
        {selectedCar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-md">
            <div
              className="absolute inset-0 bg-scrim/40 backdrop-blur-sm"
              onClick={() => setSelectedCar(null)}
            ></div>
            <div className="relative bg-surface rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl z-10 flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedCar(null)}
                className="absolute top-sm right-sm w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface hover:bg-error hover:text-on-error transition-colors z-20"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto shrink-0 relative">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                <div className="absolute bottom-md left-md md:hidden">
                  <h2 className="text-h2 font-h2 text-white mb-xs">
                    {selectedCar.title}
                  </h2>
                  <p className="text-h3 font-h3 text-primary-container">
                    {selectedCar.price}
                  </p>
                </div>
              </div>

              <div className="p-xl flex flex-col flex-grow">
                <div className="hidden md:block mb-lg border-b border-outline-variant pb-md">
                  <h2 className="text-h2 font-h2 text-on-surface mb-xs">
                    {selectedCar.title}
                  </h2>
                  <p className="text-h2 font-h2 text-primary">
                    {selectedCar.price}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-md mb-lg">
                  <div className="bg-surface-container-lowest p-sm rounded-lg border border-outline-variant flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary">
                      speed
                    </span>
                    <div>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">
                        Mileage
                      </p>
                      <p className="text-body-md font-body-md font-semibold">
                        {selectedCar.mileage}
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-sm rounded-lg border border-outline-variant flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary">
                      settings
                    </span>
                    <div>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">
                        Transmission
                      </p>
                      <p className="text-body-md font-body-md font-semibold">
                        {selectedCar.transmission}
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-sm rounded-lg border border-outline-variant flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary">
                      category
                    </span>
                    <div>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">
                        Body Type
                      </p>
                      <p className="text-body-md font-body-md font-semibold">
                        {selectedCar.type}
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-sm rounded-lg border border-outline-variant flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary">
                      location_on
                    </span>
                    <div>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">
                        Location
                      </p>
                      <p
                        className="text-body-md font-body-md font-semibold truncate max-w-[100px]"
                        title={selectedCar.location}
                      >
                        {selectedCar.location}
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-h4 font-h4 text-on-surface mb-sm">
                  Vehicle Description
                </h3>
                <p className="text-body-lg font-body-lg text-on-surface-variant mb-xl flex-grow">
                  {selectedCar.description}
                </p>

                <div className="flex items-center gap-md mb-xl p-md bg-surface-container-high rounded-xl">
                  <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-h4 shrink-0">
                    {selectedCar.dealer.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-label-lg text-on-surface">
                      {selectedCar.dealer}
                    </h4>
                    <p className="text-body-sm text-on-surface-variant flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[14px] text-primary">
                        verified
                      </span>{" "}
                      Verified Dealer
                    </p>
                  </div>
                </div>

                <div className="flex gap-sm mt-auto">
                  <button className="flex-1 bg-primary text-on-primary px-lg py-md rounded-lg font-label-lg text-label-lg hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95 text-center shadow-md flex items-center justify-center gap-sm">
                    <span className="material-symbols-outlined">chat</span>{" "}
                    Contact Dealer
                  </button>
                  <button className="bg-surface-container-high text-primary px-lg py-md rounded-lg font-label-lg text-label-lg hover:bg-surface-container-highest transition-colors active:scale-95 text-center flex items-center justify-center">
                    <span className="material-symbols-outlined">
                      favorite_border
                    </span>
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
