import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";
import CategoryCard from "../../components/CategoryCard";
import CategoryModal from "../../components/CategoryModal";

export default function CategoriesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const filteredCategories =
    activeFilter === "All"
      ? categories
      : categories.filter((c) => c.tags && c.tags.includes(activeFilter));

  const filters = ["All", "Popular", "Services", "Physical Goods"];

  return (
    <>
      <div className="light" lang="en">
        <div className="text-on-surface flex flex-col min-h-screen relative">
          <CustomerNavbar />
          <main className="max-w-[1440px] mx-auto px-margin-desktop py-xl flex-grow w-full">
            <div className="mb-xl flex flex-col md:flex-row md:items-center justify-between gap-md">
              <div>
                <h1 className="text-h2 font-h2 text-on-surface mb-xs">
                  Explore Categories
                </h1>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Find exactly what you're looking for across our diverse
                  marketplace.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-md items-center">
                <div className="flex bg-surface-container-high rounded-full p-xs">
                  <input
                    type="text"
                    placeholder="Search categories..."
                    className="bg-transparent border-none focus:ring-0 px-md py-sm text-body-sm w-full md:w-64"
                  />
                  <button className="bg-primary text-on-primary rounded-full px-lg py-sm font-label-md active:scale-95 transition-all">
                    Search
                  </button>
                </div>
                <Link
                  to="/registration"
                  className="bg-secondary text-on-secondary px-lg py-sm rounded-full font-label-md shadow-md hover:bg-secondary-container hover:text-on-secondary-container transition-all text-center whitespace-nowrap"
                >
                  Become a Seller
                </Link>
              </div>
            </div>
            <section className="mb-xxl text-center max-w-3xl mx-auto">
              <div className="flex flex-wrap justify-center gap-sm">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-md py-xs rounded-full text-label-sm font-label-sm transition-colors ${
                      activeFilter === filter
                        ? "bg-primary-container text-on-primary-container"
                        : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-xl">
              {filteredCategories.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  onClick={(category) => setSelectedCategory(category)}
                />
              ))}

              {filteredCategories.length === 0 && (
                <div className="col-span-full text-center py-xl text-on-surface-variant">
                  No categories found for this filter.
                </div>
              )}
            </div>
          </main>
          <CustomerFooter />

          {/* Dynamic Modal Overlay */}
          <CategoryModal
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
          />
        </div>
      </div>
    </>
  );
}
