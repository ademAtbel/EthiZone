import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";

export default function ServiceProviderPage() {
  const [searchParams] = useSearchParams();
  const providerId = searchParams.get("id") || "ecoshine";

  const [provider, setProvider] = useState({
    id: "",
    name: "Loading...",
    category: "",
    rating: 5.0,
    reviewsCount: 0,
    location: "",
    logo: "",
    logoBg: "bg-primary",
    logoIcon: "handyman",
    banner: "",
    description: ""
  });

  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Services");

  // Service Detail Modal State
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // 1. Fetch provider details from backend providers
    fetch(`/api/providers/${providerId}`)
      .then((res) => {
        if (!res.ok) {
          // If not found in providers, try fetching from stores
          return fetch(`/api/stores`)
            .then(storeRes => storeRes.json())
            .then(stores => {
              const storeMatch = stores.find(s => s.id === providerId || s._id === providerId);
              if (storeMatch) return storeMatch;
              throw new Error("Provider not found");
            });
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setProvider(data);
        }
      })
      .catch((err) => {
        console.warn("Could not find provider details:", err.message);
      });

    // 2. Fetch services for this provider
    fetch(`/api/services?providerId=${providerId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data);
        }
      })
      .catch((err) => {
        console.warn("Could not load provider services:", err.message);
      });

    setSearchQuery("");
    setActiveTab("Services");
  }, [providerId]);

  const filteredServices = services.filter((service) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        service.title.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on_background font-body-md antialiased min-h-screen flex flex-col">
          <CustomerNavbar />

          {/* Sub Navigation / Breadcrumbs */}
          <div className="w-full bg-surface_container_lowest py-sm border-b border-outline_variant select-none">
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
                <Link
                  className="hover:text-primary transition-colors"
                  to="/services"
                >
                  Services
                </Link>
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
                <span className="text-on_surface">{provider.name}</span>
              </nav>
            </div>
          </div>

          <main className="flex-grow max-w-[1440px] mx-auto w-full px-margin-desktop py-md">
            {/* Header Section (Banner & Overlay Logo) */}
            <header className="relative mb-lg">
              <div className="w-full h-64 rounded-xl overflow-hidden shadow-sm relative bg-surface_container">
                <img
                  className="w-full h-full object-cover"
                  alt={`${provider.name} banner`}
                  src={
                    provider.banner ||
                    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Profile details overlapping banner */}
              <div className="relative px-margin-desktop flex flex-col md:flex-row items-start md:items-end justify-between gap-md -mt-16 z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end gap-md">
                  {/* Logo */}
                  <div className="w-32 h-32 rounded-xl bg-surface_container_lowest border-4 border-surface shadow-lg overflow-hidden flex items-center justify-center relative">
                    {provider.logo ? (
                      <img
                        className="w-full h-full object-cover"
                        alt={provider.name}
                        src={provider.logo}
                      />
                    ) : (
                      <div
                        className={`w-full h-full ${provider.logoBg || "bg-primary"} flex items-center justify-center text-white`}
                      >
                        <span className="material-symbols-outlined text-[48px]">
                          {provider.logoIcon || "handyman"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info details */}
                  <div className="mb-2">
                    <div className="flex items-center gap-xs">
                      <h1 className="text-h2 font-h2 text-on_background leading-none mb-1">
                        {provider.name}
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
                      {provider.location}
                      <span className="mx-2">•</span>
                      <span className="text-primary font-bold">
                        {provider.rating}
                      </span>
                      <span
                        className="material-symbols-outlined text-primary text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-label-sm">
                        ({provider.reviewsCount} reviews)
                      </span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-sm mb-2">
                  <a
                    href="tel:+251911234567"
                    className="flex items-center gap-sm px-6 py-2.5 rounded-lg border border-outline bg-surface_container_lowest text-on_surface font-label-md hover:bg-surface_container transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">
                      call
                    </span>{" "}
                    Call Expert
                  </a>
                  <Link
                    to={`/customertosellerchatwindow?storeId=${provider.id}`}
                    className="flex items-center gap-sm px-6 py-2.5 rounded-lg bg-primary text-on_primary font-label-md shadow-sm hover:opacity-90 transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">
                      chat
                    </span>{" "}
                    Send Message
                  </Link>
                </div>
              </div>
            </header>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-xl mt-xl">
              {/* Sidebar stats */}
              <aside className="lg:col-span-1 space-y-lg select-none">
                <section className="bg-surface_container_low rounded-xl p-lg border border-outline_variant">
                  <h3 className="text-label-md font-label-md text-on_surface_variant mb-md uppercase tracking-wider">
                    Expert Stats
                  </h3>
                  <div className="space-y-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-sm text-on_surface_variant">
                        <span className="material-symbols-outlined">
                          plumbing
                        </span>
                        <span className="text-body-sm">Services Offered</span>
                      </div>
                      <span className="font-bold text-on_surface">
                        {services.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-sm text-on_surface_variant">
                        <span className="material-symbols-outlined">
                          schedule
                        </span>
                        <span className="text-body-sm">Response Time</span>
                      </div>
                      <span className="font-bold text-on_surface">
                        Under 1 hour
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-sm text-on_surface_variant">
                        <span className="material-symbols-outlined">
                          verified_user
                        </span>
                        <span className="text-body-sm">Joined Platform</span>
                      </div>
                      <span className="font-bold text-on_surface">
                        June 2023
                      </span>
                    </div>
                  </div>
                </section>

                <section className="bg-surface_container_lowest rounded-xl p-lg border border-outline_variant">
                  <h3 className="text-label-md font-label-md text-on_surface mb-sm">
                    Provider Bio
                  </h3>
                  <p className="text-body-sm text-on_surface_variant leading-relaxed">
                    {provider.description}
                  </p>
                </section>
              </aside>

              {/* Main Content Area */}
              <div className="lg:col-span-3 space-y-lg">
                {/* Search & Tabs */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-md border-b border-outline_variant pb-md select-none">
                  <div className="flex items-center gap-lg">
                    <button
                      onClick={() => setActiveTab("Services")}
                      className={`${activeTab === "Services" ? "text-primary font-bold border-b-2 border-primary" : "text-on_surface_variant hover:text-on_surface"} pb-md -mb-[18px] transition-colors cursor-pointer`}
                    >
                      Services
                    </button>
                    <button
                      onClick={() => setActiveTab("Reviews")}
                      className={`${activeTab === "Reviews" ? "text-primary font-bold border-b-2 border-primary" : "text-on_surface_variant hover:text-on_surface"} pb-md -mb-[18px] transition-colors cursor-pointer`}
                    >
                      Reviews
                    </button>
                    <button
                      onClick={() => setActiveTab("About")}
                      className={`${activeTab === "About" ? "text-primary font-bold border-b-2 border-primary" : "text-on_surface_variant hover:text-on_surface"} pb-md -mb-[18px] transition-colors cursor-pointer`}
                    >
                      About
                    </button>
                  </div>

                  {activeTab === "Services" && (
                    <div className="relative w-full sm:w-64">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on_surface_variant text-xl">
                        search
                      </span>
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface_container_low border border-outline_variant rounded-lg pl-10 pr-4 py-2 text-body-sm focus:ring-primary focus:border-primary outline-none"
                        placeholder="Search services..."
                        type="text"
                      />
                    </div>
                  )}
                </div>

                {/* Services Grid */}
                {activeTab === "Services" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-lg">
                    {filteredServices.map((service) => (
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
                        </div>
                        <div className="p-md flex-grow flex flex-col justify-between space-y-md">
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

                          <div className="border-t border-outline_variant/30 pt-md flex items-center justify-between">
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
                    ))}

                    {filteredServices.length === 0 && (
                      <div className="col-span-full py-xl text-center text-on_surface_variant select-none">
                        No services found matching "{searchQuery}".
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "Reviews" && (
                  <div className="space-y-md bg-surface_container_lowest p-lg rounded-xl border border-outline_variant select-none">
                    <h3 className="text-h3 font-h3 text-on_surface mb-lg">
                      Customer Reviews
                    </h3>
                    <div className="space-y-lg divide-y divide-outline_variant">
                      <div className="pt-0 pb-lg">
                        <div className="flex items-center justify-between mb-sm">
                          <div>
                            <p className="font-label-lg text-on_surface">
                              Almaz G.
                            </p>
                            <div className="flex text-primary text-sm mt-0.5">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <span
                                  key={i}
                                  className="material-symbols-outlined text-xs"
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  star
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className="text-label-sm text-on_surface_variant">
                            1 day ago
                          </span>
                        </div>
                        <p className="text-body-md text-on_surface_variant">
                          On time, super friendly, and completed the job beyond
                          expectations. Will definitely use them again!
                        </p>
                      </div>
                      <div className="pt-lg pb-lg">
                        <div className="flex items-center justify-between mb-sm">
                          <div>
                            <p className="font-label-lg text-on_surface">
                              Dawit T.
                            </p>
                            <div className="flex text-primary text-sm mt-0.5">
                              {[1, 2, 3, 4].map((i) => (
                                <span
                                  key={i}
                                  className="material-symbols-outlined text-xs"
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  star
                                </span>
                              ))}
                              <span className="material-symbols-outlined text-xs">
                                star
                              </span>
                            </div>
                          </div>
                          <span className="text-label-sm text-on_surface_variant">
                            2 weeks ago
                          </span>
                        </div>
                        <p className="text-body-md text-on_surface_variant">
                          Very detailed and professional. Highly recommended for
                          any home services.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* About Tab */}
                {activeTab === "About" && (
                  <div className="space-y-lg bg-surface_container_lowest p-lg rounded-xl border border-outline_variant select-none">
                    <h3 className="text-h3 font-h3 text-on_surface font-bold">
                      About {provider.name}
                    </h3>
                    <p className="text-body-lg text-on_surface_variant leading-relaxed">
                      {provider.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-md border-t border-outline_variant">
                      <div>
                        <h4 className="font-label-lg text-on_surface mb-xs">
                          Location
                        </h4>
                        <p className="text-body-md text-on_surface_variant flex items-center gap-xs">
                          <span className="material-symbols-outlined text-sm">
                            location_on
                          </span>{" "}
                          {provider.location}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-label-lg text-on_surface mb-xs">
                          Review Score
                        </h4>
                        <p className="text-body-md text-on_surface_variant flex items-center gap-xs">
                          <span
                            className="material-symbols-outlined text-sm text-primary"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>{" "}
                          {provider.rating} ({provider.reviewsCount} verified
                          reviews)
                        </p>
                      </div>
                    </div>
                  </div>
                )}
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
