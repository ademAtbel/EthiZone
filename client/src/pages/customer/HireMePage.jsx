import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";
import FilterButton from "../../components/FilterButton";

export default function HireMePage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [minRating, setMinRating] = useState(0);

  const professionals = [
    {
      id: 1,
      name: "Dawit T.",
      profession: "Master Electrician",
      category: "Electrical",
      rating: 4.9,
      reviews: 124,
      location: "Addis Ababa, Ethiopia",
      rate: "$25/hr",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDlgCY-7IdOso7N10h2EjcM81GHhl2AK8S6XR1N_lfYOQ2sdfBU5o2qLOOjUE0lvRvMFEC4fLQkeOccdh0OJPbj7-fHXfVIiT7FTs0PtQ2svKHL3OSpFCWiweA7hBclmcLDGC7IRV48rWJPzgfqruNG_pjBMuJt4uXLu2nkJtPipJuYNh1DaKZ2HsG16BTDZ1QN9Cef3PjLfP6LeZ0oUgXEmIwvuDdE9MSqnx2ebqofABeS021DZ5_6g7rNN67xIYKsLVYTNLiNJLbZ",
      skills: ["Wiring", "Lighting", "Panel Upgrades", "Smart Home"],
      availability: "Available Today",
      featured: true,
    },
    {
      id: 2,
      name: "Marcus J.",
      profession: "Plumbing Specialist",
      category: "Plumbing",
      rating: 4.8,
      reviews: 89,
      location: "Nairobi, Kenya",
      rate: "$30/hr",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCsgfZFxgwS59iLuBcNXTvyum4YDOj3c-EmVLglrkVfKVKWTihzWWx5jLn6onuyFqkQc5pfMTYLNF3b46GvE0iMv6MhwJDyuIBCEV5rb0ckDW7AORvJ24ijif30sgl3427HEi2mUNO5-ZuubXswhRPJL9bcuHka9PQHvswSygF0jybBuAiq20sXdW6T9knUQ9l4Rf2sEzPZZ8SURE1pknSBr1itO0dWqbucKzrIdE9Rw0DiaXfxm9in5QgI_bOT2QCQ4ulEDR3oKTBu",
      skills: [
        "Pipe Repair",
        "Installations",
        "Water Heaters",
        "Drain Cleaning",
      ],
      availability: "Available Tomorrow",
      featured: false,
    },
    {
      id: 3,
      name: "Samuel K.",
      profession: "General Carpentry & Repair",
      category: "Carpentry",
      rating: 4.9,
      reviews: 210,
      location: "Addis Ababa, Ethiopia",
      rate: "$20/hr",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDZdenKbCWDMyysGCy_ZlgsPCF2aEZe7DYHXeBqVB0hZZqjaEsqZItE7OlcG-dcU_X2oG88ktKIXb4RoNPDQGx2LPZKSnpnv6QvK6SnZFmsQOFqfbm4HR4hldFFMQSQHeLPcehz_xP_RQRY1qmtqpCCDLkDmBXq3q-HnlS51WY85828oe7feFL9alrR17AbOS0ukXFsTuTSfAZ04RkWTA0aSlG8tfUohdHmPte45lqvqx7vh4-pLQoQBQnj4V2pyVRae54CUfQ2d59w",
      skills: ["Furniture Assembly", "Cabinetry", "Drywall", "Painting"],
      availability: "Available This Week",
      featured: true,
    },
    {
      id: 4,
      name: "Liya M.",
      profession: "Certified HVAC Technician",
      category: "HVAC",
      rating: 4.7,
      reviews: 56,
      location: "Addis Ababa, Ethiopia",
      rate: "$35/hr",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDZdenKbCWDMyysGCy_ZlgsPCF2aEZe7DYHXeBqVB0hZZqjaEsqZItE7OlcG-dcU_X2oG88ktKIXb4RoNPDQGx2LPZKSnpnv6QvK6SnZFmsQOFqfbm4HR4hldFFMQSQHeLPcehz_xP_RQRY1qmtqpCCDLkDmBXq3q-HnlS51WY85828oe7feFL9alrR17AbOS0ukXFsTuTSfAZ04RkWTA0aSlG8tfUohdHmPte45lqvqx7vh4-pLQoQBQnj4V2pyVRae54CUfQ2d59w",
      skills: ["AC Repair", "Heating", "Ventilation", "Maintenance"],
      availability: "Available Today",
      featured: false,
    },
    {
      id: 5,
      name: "Abebe B.",
      profession: "Senior Web Developer",
      category: "Development",
      rating: 5.0,
      reviews: 42,
      location: "Remote",
      rate: "$45/hr",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDlgCY-7IdOso7N10h2EjcM81GHhl2AK8S6XR1N_lfYOQ2sdfBU5o2qLOOjUE0lvRvMFEC4fLQkeOccdh0OJPbj7-fHXfVIiT7FTs0PtQ2svKHL3OSpFCWiweA7hBclmcLDGC7IRV48rWJPzgfqruNG_pjBMuJt4uXLu2nkJtPipJuYNh1DaKZ2HsG16BTDZ1QN9Cef3PjLfP6LeZ0oUgXEmIwvuDdE9MSqnx2ebqofABeS021DZ5_6g7rNN67xIYKsLVYTNLiNJLbZ",
      skills: ["React", "Node.js", "Tailwind CSS", "MongoDB"],
      availability: "Available This Week",
      featured: true,
    },
    {
      id: 6,
      name: "Helen G.",
      profession: "Math & Science Tutor",
      category: "Tutoring",
      rating: 4.9,
      reviews: 112,
      location: "Addis Ababa, Ethiopia",
      rate: "$15/hr",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCsgfZFxgwS59iLuBcNXTvyum4YDOj3c-EmVLglrkVfKVKWTihzWWx5jLn6onuyFqkQc5pfMTYLNF3b46GvE0iMv6MhwJDyuIBCEV5rb0ckDW7AORvJ24ijif30sgl3427HEi2mUNO5-ZuubXswhRPJL9bcuHka9PQHvswSygF0jybBuAiq20sXdW6T9knUQ9l4Rf2sEzPZZ8SURE1pknSBr1itO0dWqbucKzrIdE9Rw0DiaXfxm9in5QgI_bOT2QCQ4ulEDR3oKTBu",
      skills: ["Calculus", "Physics", "Exam Prep", "Middle School"],
      availability: "Available Tomorrow",
      featured: false,
    },
    {
      id: 7,
      name: "Yonas A.",
      profession: "UX/UI Designer",
      category: "Design",
      rating: 4.8,
      reviews: 67,
      location: "Remote",
      rate: "$40/hr",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDZdenKbCWDMyysGCy_ZlgsPCF2aEZe7DYHXeBqVB0hZZqjaEsqZItE7OlcG-dcU_X2oG88ktKIXb4RoNPDQGx2LPZKSnpnv6QvK6SnZFmsQOFqfbm4HR4hldFFMQSQHeLPcehz_xP_RQRY1qmtqpCCDLkDmBXq3q-HnlS51WY85828oe7feFL9alrR17AbOS0ukXFsTuTSfAZ04RkWTA0aSlG8tfUohdHmPte45lqvqx7vh4-pLQoQBQnj4V2pyVRae54CUfQ2d59w",
      skills: ["Figma", "Prototyping", "Wireframing", "User Research"],
      availability: "Available Today",
      featured: true,
    },
  ];

  const filteredPros = professionals.filter((pro) => {
    if (categoryFilter !== "All" && pro.category !== categoryFilter)
      return false;
    if (availabilityFilter !== "All" && pro.availability !== availabilityFilter)
      return false;
    if (pro.rating < minRating) return false;
    if (locationFilter) {
      const addressVal = (pro.address || pro.metadata?.address || pro.ownerId?.address || '').toLowerCase();
      const textVal = ((pro.description || '') + ' ' + (pro.username || '') + ' ' + (pro.category || '')).toLowerCase();
      if (!addressVal.includes(locationFilter.toLowerCase()) && !textVal.includes(locationFilter.toLowerCase())) {
        return false;
      }
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !pro.name.toLowerCase().includes(q) &&
        !pro.profession.toLowerCase().includes(q) &&
        !pro.skills.some((skill) => skill.toLowerCase().includes(q))
      ) {
        return false;
      }
    }
    return true;
  });

  const categories = [
    "All",
    "Electrical",
    "Plumbing",
    "Carpentry",
    "HVAC",
    "Development",
    "Tutoring",
    "Design",
  ];

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
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
                <span className="text-on-surface">Professionals</span>
              </nav>
            </div>
          </div>

          <main className="flex-grow bg-surface-container-lowest pb-xxl">
            {/* Hero Section */}
            <section className="bg-surface-container-low py-xl border-b border-outline-variant">
              <div className="max-w-[1440px] mx-auto px-margin-desktop text-center">
                <h1 className="text-h1-mobile md:text-h1 font-h1 text-on-surface mb-md">
                  Hire Trusted Professionals
                </h1>
                <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-xl">
                  Find reliable handymen, electricians, plumbers, developers,
                  tutors, and designers near you. Background checked and
                  reviewed by the community.
                </p>

                {/* Search Bar */}
                <div className="bg-surface rounded-3xl md:rounded-full p-xs shadow-md max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-xs mb-lg">
                  <div className="flex-1 flex items-center gap-xs px-md py-xs w-full border-b md:border-b-0 md:border-r border-outline-variant pb-xs md:pb-0">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                      search
                    </span>
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 text-body-sm font-body-sm placeholder:text-on-surface-variant/70"
                      placeholder="Skill, profession, or name"
                      type="text"
                    />
                  </div>
                  <div className="flex-1 flex items-center gap-xs px-md py-xs w-full border-b md:border-b-0 border-outline-variant pb-xs md:pb-0 mb-xs md:mb-0">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                      location_on
                    </span>
                    <input
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 text-body-sm font-body-sm placeholder:text-on-surface-variant/70"
                      placeholder="Location or 'Remote'"
                      type="text"
                    />
                  </div>
                  <button className="w-auto self-center md:self-auto bg-primary text-on-primary px-lg py-xs rounded-full font-label-sm text-body-sm shadow-sm hover:shadow-md transition-all active:scale-95 whitespace-nowrap">
                    Search Pros
                  </button>
                </div>
                <Link
                  to="/registration?type=professional"
                  className="inline-block bg-surface-container-high text-on-surface-variant border border-outline-variant px-lg py-sm rounded-full font-label-md shadow-sm hover:bg-surface-container hover:text-on-surface transition-all text-center"
                >
                  Offer your Services / Become a Pro
                </Link>
              </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-margin-desktop py-xl w-full">
              {/* Top Filter for Category */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-xl gap-md border-b border-outline-variant pb-md">
                <div>
                  <h2 className="text-h2 font-h2 text-on-surface">
                    Top Rated Professionals
                  </h2>
                  <p className="text-body-md text-on-surface-variant">
                    Verified experts ready to help
                  </p>
                </div>

                <div className="flex flex-wrap gap-sm">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-lg py-sm rounded-full font-label-md text-label-md transition-colors ${
                        categoryFilter === cat
                          ? "bg-primary text-on-primary shadow-sm"
                          : "bg-surface border border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Filter Toggle */}
              <div className="lg:hidden flex justify-between items-center mb-md border-b border-outline-variant pb-md">
                <span className="font-label-lg text-on-surface">
                  {filteredPros.length} Professionals
                </span>
                <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-xl">
                {/* Filters Sidebar */}
                <aside
                  className={`lg:col-span-1 space-y-xl lg:border-r border-outline-variant pr-md ${isFilterOpen ? "block" : "hidden lg:block"}`}
                >
                  <h2 className="text-h3 font-h3 text-on-surface border-b border-outline-variant pb-sm">
                    Filters
                  </h2>

                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-md">
                      Availability
                    </h3>
                    <div className="space-y-sm">
                      {[
                        "All",
                        "Available Today",
                        "Available Tomorrow",
                        "Available This Week",
                      ].map((avail) => (
                        <label
                          key={avail}
                          className="flex items-center gap-sm cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="availability"
                            className="w-4 h-4 text-primary focus:ring-primary-container"
                            checked={availabilityFilter === avail}
                            onChange={() => setAvailabilityFilter(avail)}
                          />
                          <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                            {avail}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-md">
                      Minimum Rating
                    </h3>
                    <div className="space-y-sm">
                      {[
                        { label: "Any", val: 0 },
                        { label: "4.5 & up", val: 4.5 },
                        { label: "4.0 & up", val: 4.0 },
                        { label: "3.0 & up", val: 3.0 },
                      ].map((rating) => (
                        <label
                          key={rating.label}
                          className="flex items-center gap-sm cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="rating"
                            className="w-4 h-4 text-primary focus:ring-primary-container"
                            checked={minRating === rating.val}
                            onChange={() => setMinRating(rating.val)}
                          />
                          <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors flex items-center gap-xs">
                            {rating.label}{" "}
                            {rating.val > 0 && (
                              <span
                                className="material-symbols-outlined text-[#FFB800] text-[14px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCategoryFilter("All");
                      setAvailabilityFilter("All");
                      setMinRating(0);
                      setSearchQuery("");
                      setLocationFilter("");
                    }}
                    className="w-full bg-surface-container-high text-on-surface py-sm rounded-lg font-label-md hover:bg-surface-container-highest transition-colors active:scale-95"
                  >
                    Reset Filters
                  </button>
                </aside>

                {/* Main Content Grid */}
                <div className="lg:col-span-3 flex flex-col">
                  <div className="hidden lg:flex justify-between items-center mb-md border-b border-outline-variant pb-sm">
                    <span className="font-label-md text-on-surface-variant">
                      {filteredPros.length} Professionals Found
                    </span>
                  </div>

                  {filteredPros.length === 0 ? (
                    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-xxl text-center flex-grow flex flex-col items-center justify-center">
                      <span className="material-symbols-outlined text-[64px] text-on-surface-variant/50 mb-md">
                        search_off
                      </span>
                      <h3 className="text-h3 font-h3 text-on-surface mb-sm">
                        No professionals found
                      </h3>
                      <p className="text-body-md text-on-surface-variant max-w-md mx-auto">
                        Try adjusting your filters, location, or search keywords
                        to find what you're looking for.
                      </p>
                      <button
                        onClick={() => {
                          setCategoryFilter("All");
                          setAvailabilityFilter("All");
                          setMinRating(0);
                          setSearchQuery("");
                          setLocationFilter("");
                        }}
                        className="mt-lg bg-primary text-on-primary px-xl py-md rounded-full font-label-lg transition-colors active:scale-95 hover:shadow-md"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
                      {filteredPros.map((person) => (
                        <div
                          key={person.id}
                          className={`bg-surface rounded-xl border ${person.featured ? "border-primary/30 shadow-md" : "border-outline-variant shadow-sm"} overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col`}
                        >
                          <div className="relative">
                            {person.featured && (
                              <div className="absolute top-sm right-sm bg-primary text-on-primary px-sm py-xs rounded-md font-label-sm text-label-sm shadow-sm flex items-center gap-xs z-10">
                                <span className="material-symbols-outlined text-[14px]">
                                  verified
                                </span>{" "}
                                Top Pro
                              </div>
                            )}
                            <div className="h-32 bg-surface-container-high w-full"></div>
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                              <div className="w-20 h-20 rounded-full border-4 border-surface overflow-hidden bg-surface-container">
                                <img
                                  src={person.image}
                                  alt={person.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="pt-12 px-lg pb-lg text-center flex flex-col flex-grow">
                            <h3 className="text-h4 font-h4 text-on-surface">
                              {person.name}
                            </h3>
                            <p className="text-body-sm font-body-sm text-on-surface-variant mb-xs">
                              {person.profession}
                            </p>

                            <div className="flex justify-center items-center gap-xs mb-md">
                              <span
                                className="material-symbols-outlined text-[#FFB800] text-[18px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                              <span className="font-label-md text-label-md font-bold">
                                {person.rating}
                              </span>
                              <span className="text-label-sm text-on-surface-variant">
                                ({person.reviews} reviews)
                              </span>
                            </div>

                            <div className="flex flex-wrap justify-center gap-xs mb-lg">
                              {person.skills.slice(0, 3).map((skill) => (
                                <span
                                  key={skill}
                                  className="bg-surface-container-low border border-outline-variant text-on-surface-variant px-xs py-xs rounded font-label-sm text-[11px]"
                                >
                                  {skill}
                                </span>
                              ))}
                              {person.skills.length > 3 && (
                                <span className="bg-surface-container-low border border-outline-variant text-on-surface-variant px-xs py-xs rounded font-label-sm text-[11px]">
                                  +{person.skills.length - 3}
                                </span>
                              )}
                            </div>

                            <div className="mt-auto pt-md border-t border-outline-variant w-full">
                              <div className="flex justify-between items-center mb-md">
                                <div className="flex flex-col items-start">
                                  <span className="text-label-sm text-on-surface-variant">
                                    Starting at
                                  </span>
                                  <span className="text-h4 font-h4 text-primary">
                                    {person.rate}
                                  </span>
                                </div>
                                <div className="flex items-center gap-xs text-secondary font-label-sm text-label-sm">
                                  <span className="material-symbols-outlined text-[16px]">
                                    schedule
                                  </span>{" "}
                                  {person.availability}
                                </div>
                              </div>
                              <button className="w-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-label-md text-label-md py-sm rounded-lg transition-colors flex justify-center items-center gap-sm">
                                View Profile
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredPros.length > 0 && (
                    <div className="mt-xl text-center">
                      <button className="border border-outline text-on-surface hover:bg-surface-container-low font-label-md text-label-md px-xl py-md rounded-full transition-colors inline-flex items-center gap-sm">
                        Load More Professionals{" "}
                        <span className="material-symbols-outlined">
                          expand_more
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>

          <CustomerFooter />
        </div>
      </div>
    </>
  );
}
