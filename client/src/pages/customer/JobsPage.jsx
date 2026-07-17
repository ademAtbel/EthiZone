import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";
import FilterButton from "../../components/FilterButton";

export default function JobsPage() {
  const [jobType, setJobType] = useState("All");
  const [workModel, setWorkModel] = useState("All");
  const [minSalary, setMinSalary] = useState(0);
  const [locationFilter, setLocationFilter] = useState("");
  const [nearMe, setNearMe] = useState(false);
  const [radius, setRadius] = useState(50);
  const [sortBy, setSortBy] = useState("Newest First");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => {
        if (!res.ok) throw new Error("API response not OK");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setJobs(data);
        }
      })
      .catch((err) =>
        console.warn("Backend API unreachable for jobs:", err.message)
      );
  }, []);

  const filteredJobs = jobs.filter((job) => {
    if (jobType !== "All" && job.type !== jobType) return false;
    if (workModel !== "All" && job.workModel !== workModel) return false;
    if (job.salaryMin < minSalary) return false;
    if (nearMe && job.distance > radius) return false;
    if (locationFilter) {
      const addressVal = (job.metadata?.address || job.ownerId?.address || '').toLowerCase();
      const textVal = ((job.description || '') + ' ' + (job.title || '') + ' ' + (job.category || '')).toLowerCase();
      if (!addressVal.includes(locationFilter.toLowerCase()) && !textVal.includes(locationFilter.toLowerCase())) {
        return false;
      }
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !job.title.toLowerCase().includes(q) &&
        !job.company.toLowerCase().includes(q) &&
        !job.tags.some((tag) => tag.toLowerCase().includes(q))
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col relative">
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
                <span className="text-on-surface">Job Board</span>
              </nav>
            </div>
          </div>

          <main className="flex-grow">
            {/* Hero Section */}
            <section className="bg-surface-container py-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5"></div>
              <div className="max-w-[1440px] mx-auto px-margin-desktop relative z-10 text-center">
                <h1 className="text-h1-mobile md:text-h1 font-h1 text-on-primary-container mb-md">
                  Find Your Next Big Opportunity
                </h1>
                <p className="text-body-lg font-body-lg text-on-surface-variant mb-xl max-w-2xl mx-auto">
                  Explore thousands of job openings from top companies around
                  the globe on the Ethizone marketplace.
                </p>

                {/* Search Bar */}
                <div className="bg-surface rounded-3xl md:rounded-full p-xs shadow-md max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-xs mb-lg">
                  <div className="flex-1 flex items-center gap-xs px-md py-xs w-full border-b md:border-b-0 md:border-r border-outline-variant pb-xs md:pb-0">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder="Job title, keywords, or company"
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
                      placeholder="City, state, or 'Remote'"
                      className="w-full bg-transparent border-none focus:ring-0 text-body-sm font-body-sm placeholder:text-on-surface-variant/70"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </div>
                  <button
                    className="w-auto self-center md:self-auto bg-primary text-on-primary px-lg py-xs rounded-full font-label-sm text-body-sm shadow-sm hover:shadow-md transition-all active:scale-95 whitespace-nowrap"
                    onClick={() => {
                      // Optionally scroll to results
                      window.scrollTo({ top: 500, behavior: "smooth" });
                    }}
                  >
                    Search Jobs
                  </button>
                </div>

                <Link
                  to="/registration"
                  className="inline-block bg-surface-container-high text-on-surface-variant border border-outline-variant px-lg py-sm rounded-full font-label-md shadow-sm hover:bg-surface-container hover:text-on-surface transition-all text-center"
                >
                  Post a Job / Become an Employer
                </Link>
              </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-margin-desktop py-xl w-full">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden flex justify-between items-center mb-md border-b border-outline-variant pb-md">
                <span className="font-label-lg text-on-surface">
                  {filteredJobs.length} Jobs
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
                      Job Type
                    </h3>
                    <div className="space-y-sm">
                      {[
                        "All",
                        "Full-Time",
                        "Part-Time",
                        "Contract",
                        "Freelance",
                        "Internship",
                      ].map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-sm cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="jobType"
                            className="w-4 h-4 text-primary focus:ring-primary-container"
                            checked={jobType === type}
                            onChange={() => setJobType(type)}
                          />
                          <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-md">
                      Work Model
                    </h3>
                    <div className="space-y-sm">
                      {["All", "On-site", "Hybrid", "Remote"].map((model) => (
                        <label
                          key={model}
                          className="flex items-center gap-sm cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="workModel"
                            className="w-4 h-4 text-primary focus:ring-primary-container"
                            checked={workModel === model}
                            onChange={() => setWorkModel(model)}
                          />
                          <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                            {model}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-md">
                      Minimum Salary
                    </h3>
                    <input
                      type="range"
                      className="w-full accent-primary"
                      min="0"
                      max="200000"
                      step="10000"
                      value={minSalary}
                      onChange={(e) => setMinSalary(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between mt-sm font-label-sm text-label-sm text-on-surface-variant">
                      <span>${(minSalary / 1000).toFixed(0)}k</span>
                      <span>$200k+</span>
                    </div>
                  </div>

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
                        setJobType("All");
                        setWorkModel("All");
                        setMinSalary(0);
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

                {/* Job Listings */}
                <div className="lg:col-span-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-lg gap-md">
                    <div>
                      <h2 className="font-h2 text-h2 text-on-surface">
                        All Openings
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Showing {filteredJobs.length} available jobs
                      </p>
                    </div>

                    <div className="flex items-center gap-sm">
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        Sort by:
                      </span>
                      <select
                        className="bg-surface border border-outline-variant rounded-lg px-md py-sm font-body-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none cursor-pointer"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option>Most Relevant</option>
                        <option>Newest First</option>
                        <option>Highest Salary</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-md">
                    {filteredJobs.map((job) => (
                      <div
                        key={job._id || job.id}
                        className={`group bg-surface rounded-xl p-lg border ${job.featured ? "border-primary/50 shadow-md bg-primary/5" : "border-outline-variant shadow-sm"} hover:shadow-lg hover:border-primary transition-all duration-300 relative overflow-hidden`}
                      >
                        {job.featured && (
                          <div className="absolute top-0 right-0 bg-primary text-on-primary px-md py-xs rounded-bl-lg font-label-sm text-label-sm shadow-sm flex items-center gap-xs">
                            <span className="material-symbols-outlined text-[14px]">
                              star
                            </span>{" "}
                            Featured
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-lg">
                          <div className="w-16 h-16 rounded-xl bg-surface-container-highest flex-shrink-0 overflow-hidden border border-outline-variant">
                            <img
                              src={job.logo}
                              alt={job.company}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-md mb-md">
                              <div>
                                <h3 className="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                                  {job.title}
                                </h3>
                                <p className="font-body-md text-body-md text-on-surface-variant mb-xs">
                                  {job.company}
                                </p>

                                <div className="flex flex-wrap items-center gap-x-md gap-y-xs font-label-sm text-label-sm text-on-surface-variant">
                                  <div className="flex items-center gap-xs">
                                    <span className="material-symbols-outlined text-[16px]">
                                      location_on
                                    </span>{" "}
                                    {job.location}
                                  </div>
                                  <div className="flex items-center gap-xs">
                                    <span className="material-symbols-outlined text-[16px]">
                                      work
                                    </span>{" "}
                                    {job.type}
                                  </div>
                                  <div className="flex items-center gap-xs">
                                    <span className="material-symbols-outlined text-[16px]">
                                      payments
                                    </span>{" "}
                                    {job.salary}
                                  </div>
                                  <div className="flex items-center gap-xs">
                                    <span className="material-symbols-outlined text-[16px]">
                                      schedule
                                    </span>{" "}
                                    {job.posted}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-row sm:flex-col gap-sm self-start">
                                <button className="bg-primary text-on-primary px-xl py-md rounded-lg font-label-md text-label-md shadow-sm hover:bg-primary-container transition-colors whitespace-nowrap active:scale-95">
                                  Apply Now
                                </button>
                                <button className="bg-surface-container-high text-on-surface px-xl py-md rounded-lg font-label-md text-label-md border border-outline-variant hover:bg-surface-container-highest transition-colors whitespace-nowrap flex items-center justify-center gap-xs active:scale-95">
                                  <span className="material-symbols-outlined text-[18px]">
                                    bookmark_border
                                  </span>{" "}
                                  Save
                                </button>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-xs">
                              {job.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-surface-container border border-outline-variant text-on-surface-variant px-sm py-xs rounded-md font-label-sm text-label-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {filteredJobs.length === 0 && (
                      <div className="text-center py-xl text-on-surface-variant">
                        No jobs found matching your filters.
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  {filteredJobs.length > 0 && (
                    <div className="flex justify-center mt-xl">
                      <div className="flex items-center gap-sm">
                        <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors opacity-50 cursor-not-allowed">
                          <span className="material-symbols-outlined">
                            chevron_left
                          </span>
                        </button>
                        <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm">
                          1
                        </button>
                        <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md">
                          2
                        </button>
                        <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md">
                          3
                        </button>
                        <span className="text-on-surface-variant">...</span>
                        <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md">
                          12
                        </button>
                        <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors">
                          <span className="material-symbols-outlined">
                            chevron_right
                          </span>
                        </button>
                      </div>
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
