import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useLanguage } from "../../context/LanguageContext";

const STATUS_CONFIG = {
  active: { color: "text-primary", bg: "bg-primary", label: "Active" },
  pending: {
    color: "text-on-tertiary-fixed-variant",
    bg: "bg-on-tertiary-fixed-variant animate-pulse",
    label: "Pending",
  },
  suspended: { color: "text-error", bg: "bg-error", label: "Suspended" },
  closed: {
    color: "text-on-surface-variant",
    bg: "bg-on-surface-variant",
    label: "Closed",
  },
};

export default function ManageStoresPage() {
  const { language } = useLanguage();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [statusDropdownId, setStatusDropdownId] = useState(null);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/stores");
      if (res.ok) {
        const data = await res.json();
        setStores(data);
      }
    } catch (e) {
      console.error("Error fetching stores:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (storeSlug, newStatus) => {
    try {
      // Optimistic UI update
      setStores((prev) =>
        prev.map((s) => (s.id === storeSlug ? { ...s, status: newStatus } : s)),
      );
      setStatusDropdownId(null);

      const res = await fetch(`/api/stores/${storeSlug}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        // Revert on failure
        fetchStores();
        alert("Failed to update store status");
      }
    } catch (e) {
      console.error(e);
      fetchStores();
    }
  };

  const handleToggleVisibility = async (storeSlug, currentIsHidden) => {
    try {
      const newHidden = !currentIsHidden;
      // Optimistic UI update
      setStores((prev) =>
        prev.map((s) =>
          s.id === storeSlug ? { ...s, isHidden: newHidden } : s,
        ),
      );

      const res = await fetch(`/api/stores/${storeSlug}/visibility`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: newHidden }),
      });
      if (!res.ok) {
        // Revert on failure
        fetchStores();
        alert("Failed to update store visibility");
      }
    } catch (e) {
      console.error(e);
      fetchStores();
    }
  };

  const handleDeleteStore = async (storeSlug, storeName) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete "${storeName}" and all its products?`,
      )
    )
      return;
    try {
      setStores((prev) => prev.filter((s) => s.id !== storeSlug));
      const res = await fetch(`/api/stores/${storeSlug}`, { method: "DELETE" });
      if (res.ok) {
        alert(`"${storeName}" has been deleted.`);
      } else {
        fetchStores();
        alert("Failed to delete store");
      }
    } catch (e) {
      console.error(e);
      fetchStores();
    }
  };

  // Derived data
  const uniqueCategories = [...new Set(stores.map((s) => s.category))];

  const filteredStores = stores.filter((s) => {
    const matchSearch =
      search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "" || s.status === filterStatus;
    const matchCategory =
      filterCategory === "" || s.category === filterCategory;
    return matchSearch && matchStatus && matchCategory;
  });

  const totalStores = stores.length;
  const activeStores = stores.filter((s) => s.status === "active").length;
  const pendingStores = stores.filter((s) => s.status === "pending").length;
  const avgRating =
    stores.length > 0
      ? (
          stores.reduce((sum, s) => sum + (s.rating || 0), 0) / stores.length
        ).toFixed(2)
      : "0.00";

  return (
    <>
      <div className="light" lang={language}>
        <div className="bg-background text-on-background min-h-screen">
          <AdminSidebar />

          <header className="docked full-width top-0 sticky z-40 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center w-full px-margin-desktop py-sm ml-64 max-w-[calc(100%-16rem)] h-16">
            <div className="flex items-center gap-lg w-1/2">
              <div className="relative w-full max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  search
                </span>
                <input
                  className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-body-md focus:ring-2 focus:ring-primary/20"
                  placeholder={
                    language === "am"
                      ? "ሱቅ ፈልግ..."
                      : "Search stores, sellers, or locations..."
                  }
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-md">
              <button className="hover:bg-surface-container-low dark:hover:bg-surface-container-high rounded-full p-2 transition-all active:scale-90 relative">
                <span className="material-symbols-outlined text-primary">
                  notifications
                </span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
              <img
                alt="Admin Avatar"
                className="w-8 h-8 rounded-full object-cover border border-outline-variant"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQzDbU4ctXORbrbmHa03GoeGpv4OZ22JTrGKeWujucM6FygRX5dCwzsQKVyh4EgA3vga9yAZwKFR8OOUNP0F2aYijuyl466nauwe3r6zf-KAv_pPqiZVXtuHUN5c3__Ko94EF9Fo0uYBkzUWMXBzixdi8lTqpYUm1DHjurpRxTPTcSsCkWF7VIPEpBfuC7EimvHIDQee5Bi8qvETw3qpzEN_vVVY_TcVDksAxy-gua4AYQoxM_9sKmDlb3sz_Wni6laIFXtSjmJ9U2"
              />
            </div>
          </header>

          <main className="ml-64 p-margin-desktop min-h-[calc(100vh-64px)]">
            <div className="max-w-[1440px] mx-auto">
              {/* Page Header */}
              <div className="flex justify-between items-end mb-xl">
                <div>
                  <h1 className="font-h1 text-h1 text-on-background mb-xs">
                    {language === "am" ? "ሱቆችን ያስተዳድሩ" : "Manage Stores"}
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {language === "am"
                      ? "ሁሉንም ሱቆች ይቆጣጠሩ፣ ያረጋግጡ እና ያስተዳድሩ።"
                      : "Monitor, verify, and manage all vendor storefronts across the platform."}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-xl">
                <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center gap-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[28px]">
                      store
                    </span>
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                      Total Stores
                    </p>
                    <h3 className="text-h3 font-h3 text-on-surface">
                      {totalStores}
                    </h3>
                  </div>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center gap-lg">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[28px]">
                      check_circle
                    </span>
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                      Active Stores
                    </p>
                    <h3 className="text-h3 font-h3 text-on-surface">
                      {activeStores}
                    </h3>
                  </div>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center gap-lg">
                  <div className="w-12 h-12 rounded-full bg-error-container/30 flex items-center justify-center text-error">
                    <span className="material-symbols-outlined text-[28px]">
                      pending_actions
                    </span>
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                      Pending Verification
                    </p>
                    <h3 className="text-h3 font-h3 text-on-surface">
                      {pendingStores}
                    </h3>
                  </div>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center gap-lg">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed/30 flex items-center justify-center text-primary-fixed-variant">
                    <span className="material-symbols-outlined text-[28px]">
                      star
                    </span>
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                      Avg Store Rating
                    </p>
                    <h3 className="text-h3 font-h3 text-on-surface">
                      {avgRating}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl mb-gutter flex flex-col md:flex-row gap-md items-center shadow-sm flex-wrap">
                <div className="flex gap-md w-full md:w-auto flex-wrap">
                  <select
                    className="bg-surface border border-outline-variant rounded-lg px-4 py-2 text-body-md min-w-[140px] focus:ring-2 focus:ring-primary/20"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">Status: All</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                    <option value="closed">Closed</option>
                  </select>
                  <select
                    className="bg-surface border border-outline-variant rounded-lg px-4 py-2 text-body-md min-w-[160px] focus:ring-2 focus:ring-primary/20"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="">Category: All</option>
                    {uniqueCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                {(filterStatus || filterCategory || search) && (
                  <button
                    onClick={() => {
                      setFilterStatus("");
                      setFilterCategory("");
                      setSearch("");
                    }}
                    className="text-label-md font-label-md text-primary hover:text-primary/80 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      close
                    </span>
                    Clear All
                  </button>
                )}
              </div>

              {/* Table */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                {loading ? (
                  <div className="p-xl text-center text-body-md text-on-surface-variant">
                    Loading stores...
                  </div>
                ) : filteredStores.length === 0 ? (
                  <div className="p-xl text-center text-body-md text-on-surface-variant">
                    No stores found matching criteria.
                  </div>
                ) : (
                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-low border-b border-outline-variant">
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant">
                            Store Name
                          </th>
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant">
                            Category
                          </th>
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant">
                            Location
                          </th>
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant">
                            Rating
                          </th>
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant">
                            Status
                          </th>
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant">
                            Sales (USD)
                          </th>
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant">
                            Joined
                          </th>
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant">
                        {filteredStores.map((store) => {
                          const statusCfg =
                            STATUS_CONFIG[store.status] || STATUS_CONFIG.active;
                          return (
                            <tr
                              key={store._id}
                              className="hover:bg-surface-container-lowest transition-colors group"
                            >
                              {/* Store Name */}
                              <td className="px-lg py-lg">
                                <div className="flex items-center gap-md">
                                  <div className="w-10 h-10 rounded-lg bg-surface-container overflow-hidden border border-outline-variant flex items-center justify-center">
                                    {store.logo ? (
                                      <img
                                        className="w-full h-full object-cover"
                                        src={store.logo}
                                        alt={store.name}
                                      />
                                    ) : store.logoIcon ? (
                                      <span
                                        className={`material-symbols-outlined text-[20px] ${store.logoBg ? "" : "text-primary"}`}
                                      >
                                        {store.logoIcon}
                                      </span>
                                    ) : (
                                      <span className="material-symbols-outlined text-[20px] text-primary">
                                        store
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <p className="text-label-md font-label-md text-on-surface">
                                        {store.name}
                                      </p>
                                      {store.isHidden && (
                                        <span className="px-1.5 py-0.5 bg-outline-variant text-on-surface-variant rounded text-[10px] uppercase font-bold tracking-wider">
                                          Hidden
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                                      ID: {store.id}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              {/* Category */}
                              <td className="px-lg py-lg">
                                <span className="px-xs py-xs bg-surface-container-high rounded text-label-sm font-label-sm text-on-tertiary-fixed-variant">
                                  {store.category}
                                </span>
                              </td>
                              {/* Location */}
                              <td className="px-lg py-lg">
                                <p className="text-body-md text-on-surface">
                                  {store.location}
                                </p>
                              </td>
                              {/* Rating */}
                              <td className="px-lg py-lg">
                                <div className="flex items-center gap-1">
                                  <span
                                    className="material-symbols-outlined text-yellow-500 text-[16px]"
                                    style={{
                                      fontVariationSettings: "'FILL' 1",
                                    }}
                                  >
                                    star
                                  </span>
                                  <span className="text-body-md font-label-md text-on-surface">
                                    {store.rating?.toFixed(1) || "—"}
                                  </span>
                                  <span className="text-label-sm text-on-surface-variant">
                                    ({store.reviewsCount || 0})
                                  </span>
                                </div>
                              </td>
                              {/* Status - clickable dropdown */}
                              <td className="px-lg py-lg relative">
                                <button
                                  onClick={() =>
                                    setStatusDropdownId(
                                      statusDropdownId === store.id
                                        ? null
                                        : store.id,
                                    )
                                  }
                                  className={`flex items-center gap-2 ${statusCfg.color} cursor-pointer hover:opacity-80 transition-opacity`}
                                >
                                  <span
                                    className={`w-2 h-2 rounded-full ${statusCfg.bg}`}
                                  ></span>
                                  <span className="text-label-sm font-label-sm font-bold uppercase">
                                    {statusCfg.label}
                                  </span>
                                  <span className="material-symbols-outlined text-[14px]">
                                    expand_more
                                  </span>
                                </button>
                                {statusDropdownId === store.id && (
                                  <div className="absolute top-full left-0 mt-1 bg-surface border border-outline-variant rounded-lg shadow-lg z-50 min-w-[150px] py-1">
                                    {Object.entries(STATUS_CONFIG).map(
                                      ([key, cfg]) => (
                                        <button
                                          key={key}
                                          onClick={() =>
                                            handleStatusChange(store.id, key)
                                          }
                                          className={`w-full px-4 py-2 text-left text-label-sm flex items-center gap-2 hover:bg-surface-container-low transition-colors ${store.status === key ? "bg-surface-container-low font-bold" : ""}`}
                                        >
                                          <span
                                            className={`w-2 h-2 rounded-full ${cfg.bg.replace(" animate-pulse", "")}`}
                                          ></span>
                                          {cfg.label}
                                          {store.status === key && (
                                            <span className="material-symbols-outlined text-[14px] ml-auto">
                                              check
                                            </span>
                                          )}
                                        </button>
                                      ),
                                    )}
                                  </div>
                                )}
                              </td>
                              {/* Sales */}
                              <td className="px-lg py-lg">
                                <p className="text-body-md font-bold text-on-surface">
                                  $
                                  {(store.totalSales || 0).toLocaleString(
                                    "en-US",
                                    { minimumFractionDigits: 2 },
                                  )}
                                </p>
                              </td>
                              {/* Joined */}
                              <td className="px-lg py-lg">
                                <p className="text-body-md text-on-surface">
                                  {new Date(store.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    },
                                  )}
                                </p>
                              </td>
                              {/* Actions */}
                              <td className="px-lg py-lg text-right">
                                <div className="flex justify-end gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                  <a
                                    href={`/storedetail?id=${store.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors flex items-center justify-center"
                                    title="View Storefront"
                                  >
                                    <span className="material-symbols-outlined">
                                      storefront
                                    </span>
                                  </a>
                                  <button
                                    onClick={() =>
                                      handleToggleVisibility(
                                        store.id,
                                        store.isHidden,
                                      )
                                    }
                                    className={`p-2 rounded-lg transition-colors flex items-center justify-center ${store.isHidden ? "hover:bg-primary/10 text-primary" : "hover:bg-outline-variant/30 text-on-surface-variant"}`}
                                    title={
                                      store.isHidden
                                        ? "Show Store"
                                        : "Hide Store"
                                    }
                                  >
                                    <span className="material-symbols-outlined">
                                      {store.isHidden
                                        ? "visibility_off"
                                        : "visibility"}
                                    </span>
                                  </button>
                                  {store.status === "pending" && (
                                    <button
                                      onClick={() =>
                                        handleStatusChange(store.id, "active")
                                      }
                                      className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                                      title="Approve Store"
                                    >
                                      <span className="material-symbols-outlined">
                                        check_circle
                                      </span>
                                    </button>
                                  )}
                                  {store.status === "active" && (
                                    <button
                                      onClick={() =>
                                        handleStatusChange(
                                          store.id,
                                          "suspended",
                                        )
                                      }
                                      className="p-2 hover:bg-error/10 text-error rounded-lg transition-colors"
                                      title="Suspend Store"
                                    >
                                      <span className="material-symbols-outlined">
                                        block
                                      </span>
                                    </button>
                                  )}
                                  {store.status === "suspended" && (
                                    <button
                                      onClick={() =>
                                        handleStatusChange(store.id, "active")
                                      }
                                      className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                                      title="Reactivate Store"
                                    >
                                      <span className="material-symbols-outlined">
                                        sync
                                      </span>
                                    </button>
                                  )}
                                  <button
                                    onClick={() =>
                                      handleDeleteStore(store.id, store.name)
                                    }
                                    className="p-2 hover:bg-error/10 text-error rounded-lg transition-colors"
                                    title="Delete Store"
                                  >
                                    <span className="material-symbols-outlined">
                                      delete
                                    </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
                {/* Footer */}
                <div className="px-lg py-md bg-surface-container-low border-t border-outline-variant flex justify-between items-center">
                  <p className="text-label-sm font-label-sm text-on-surface-variant">
                    Showing {filteredStores.length} of {totalStores} stores
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
