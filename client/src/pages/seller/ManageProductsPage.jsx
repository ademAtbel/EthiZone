import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SellerSidebar from "../../components/SellerSidebar";
import SellerNavbar from "../../components/SellerNavbar";
import { useAuth } from "../../context/AuthContext";

const INITIAL_MOCK_PRODUCTS = [
  {
    id: "sp-1",
    name: "Heritage Minimalist Watch",
    sku: "HM-W-2024",
    category: "Accessories",
    price: 129.0,
    discountPrice: "",
    stock: 85,
    status: "Active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAexHoGwXHszR_L3HERjHj9q29YosUkNOAlTfJ6M88naSK8yAG68g_scWlkj55deEXHx5K1CbcmQ2zgqDZ-Xda6bthjI9CHXn-yDTmCDeycAl45Iy2tmnP0k1Mty6mcCZyM03RHu4wQiRKgtFBGq8WrhWEeQq_D17kg-ttfMDCDa9ofWDcsvgxwAnVIWVIFOig9X9tRdZ5xAtz_TN3iEsaGbaQme8R2EbirZL5ayApbt30zldjnLVLCNyWndlnP37OAvvgzFvsVGT8",
    description:
      "A luxury minimalist wrist watch crafted with premium heritage materials.",
    specifications: {
      material: "Stainless Steel",
      dimensions: "40mm Diameter",
      weight: "75g",
    },
  },
  {
    id: "sp-2",
    name: "Artisan Leather Satchel",
    sku: "AL-S-1099",
    category: "Fashion",
    price: 245.0,
    discountPrice: "",
    stock: 5,
    status: "Pending",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDI0eZ3cUtg4TaYBB1Tt3g2MgdKpLYnNLB-AKHJBNePnewXGz-SVXQ_ocu4xBLx2oINmKY9bEkWaoCFhi2OLeoXXDHQTCuDZT5HW5LHhIcC6Wync_1xx4oHc2ENGarP09D2nqKlXvnmQgKd3gkt9iCafuyOLQxPRMJqOHcTDMjlHJWkB3TuKGLp7V2mkXxFnlFo8j37zQO0ydwpuxPWiwpG4V_0wY92JPNYKaMBuAaHFT3wzc21aOv5MQZw7ZFBIEyocsrFOQjVFRpS",
    description:
      "Handcrafted tan leather messenger bag suitable for daily use.",
    specifications: {
      material: "Full-Grain Leather",
      dimensions: "15 x 11 x 4 inches",
      weight: "1.2kg",
    },
  },
  {
    id: "sp-3",
    name: "Apex Runner Pro Red",
    sku: "AR-P-RED",
    category: "Footwear",
    price: 89.9,
    discountPrice: "",
    stock: 0,
    status: "Out of Stock",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAURyhRQTC2ZK5vGOsgbPrkj6ArSlyZ-lxTmmM_6oqGtb1VZrY9NBcEsm3Z9EGjYuxqYz00v-1f2Sm3uHAL5Y6wM4xaOAAhDUXzyCsRirf59SttM9IrvU2SMCkWU4S_Iii-OuVnV7RTrtLJDb-H1GV1KzVHU4hpeDyIP9OE75gHrulYS70xI4WghucVZl2tY1K3QWmi8pJInaFVfOlBR7tRDHLwPAEHgWAVNdoVWGGL2suqRJwhBa67PL0x9fD_svnFHl78X35E13kZ",
    description:
      "Vibrant red professional running shoes designed for ultimate speed and stability.",
    specifications: {
      material: "Synthetic Mesh",
      dimensions: "US Size 10",
      weight: "280g",
    },
  },
];

export default function ManageProductsPage() {
  const navigate = useNavigate();
  const { storeSlug: paramStoreSlug } = useParams();
  const { user } = useAuth();
  const storeSlug = paramStoreSlug || user?.storeSlug || 'my-store';
  const sellerPath = (page) => `/seller/${storeSlug}/${page}`;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  // Load products from backend
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/products?storeSlug=${storeSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [storeSlug]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
    } catch (err) {
      alert("Failed to delete product: " + err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(sellerPath(`addproduct?edit=${id}`));
  };

  // Perform search and filter
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" || p.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "All Statuses" || p.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on_surface">
          {/*  Sidebar Navigation Shell  */}
          <SellerSidebar />

          {/*  Main Content Canvas  */}
          <main className="md:ml-64 min-h-screen">
            {/* Unified Seller Header with custom Add Product button */}
            <SellerNavbar title="Manage Products">
              <button
                onClick={() => navigate(sellerPath('addproduct'))}
                className="bg-primary text-on_primary px-lg py-2 rounded-lg font-label-md flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  add
                </span>
                Add Product
              </button>
            </SellerNavbar>

            <div className="p-margin-desktop max-w-[1440px] mx-auto space-y-lg">
              {/*  Filters & Search Bento Card  */}
              <section className="bg-surface_container_lowest rounded-xl p-md border border-outline_variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] grid grid-cols-1 md:grid-cols-12 gap-md items-end">
                <div className="md:col-span-6 space-y-xs">
                  <label className="text-label-sm font-label-sm text-on_surface_variant px-1">
                    Search Products
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on_surface_variant">
                      search
                    </span>
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface_container border border-outline_variant rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-body-md"
                      placeholder="Product name, SKU, or tag..."
                      type="text"
                    />
                  </div>
                </div>
                <div className="md:col-span-3 space-y-xs">
                  <label className="text-label-sm font-label-sm text-on_surface_variant px-1">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-surface_container border border-outline_variant rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-body-md"
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Boutique">Boutique</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Artisanal Goods">Artisanal Goods</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Footwear">Footwear</option>
                  </select>
                </div>
                <div className="md:col-span-3 space-y-xs">
                  <label className="text-label-sm font-label-sm text-on_surface_variant px-1">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-4 py-2.5 bg-surface_container border border-outline_variant rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-body-md"
                  >
                    <option value="All Statuses">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Draft">Draft</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </section>

              {/*  Data Table Section  */}
              <section className="bg-surface_container_lowest rounded-xl border border-outline_variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface_container_low border-b border-outline_variant">
                        <th className="p-md text-label-md font-label-md text-on_surface_variant uppercase tracking-wider pl-6">
                          Product
                        </th>
                        <th className="p-md text-label-md font-label-md text-on_surface_variant uppercase tracking-wider">
                          Category
                        </th>
                        <th className="p-md text-label-md font-label-md text-on_surface_variant uppercase tracking-wider">
                          Price
                        </th>
                        <th className="p-md text-label-md font-label-md text-on_surface_variant uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="p-md text-label-md font-label-md text-on_surface_variant uppercase tracking-wider">
                          Status
                        </th>
                        <th className="p-md text-label-md font-label-md text-on_surface_variant uppercase tracking-wider text-right pr-6">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline_variant">
                      {loading ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="p-xl text-center text-on_surface_variant"
                          >
                            <div className="flex items-center justify-center gap-sm">
                              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                              Loading products from database...
                            </div>
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="p-xl text-center text-error"
                          >
                            Error: {error}
                          </td>
                        </tr>
                      ) : filteredProducts.length === 0 ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="p-xl text-center text-on_surface_variant"
                          >
                            No products found matching the criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((p) => {
                          const isLowStock = p.stock > 0 && p.stock <= 5;
                          const isOutOfStock = p.stock === 0;

                          let statusBgClass =
                            "bg-primary_fixed text-on_primary_fixed";
                          let dotBgClass = "bg-primary";
                          if (p.status === "Pending") {
                            statusBgClass =
                              "bg-tertiary_fixed text-on_tertiary_fixed_variant";
                            dotBgClass = "bg-tertiary";
                          } else if (p.status === "Draft") {
                            statusBgClass =
                              "bg-surface_variant text-on_surface_variant";
                            dotBgClass = "bg-outline";
                          } else if (
                            p.status === "Out of Stock" ||
                            isOutOfStock
                          ) {
                            statusBgClass =
                              "bg-error_container text-on_error_container";
                            dotBgClass = "bg-error";
                          }

                          return (
                            <tr
                              key={p._id || p.id}
                              className="hover:bg-surface_container_low transition-colors group"
                            >
                              <td className="p-md pl-6">
                                <div className="flex items-center gap-md">
                                  <div className="w-12 h-12 rounded-lg bg-surface_container flex-shrink-0 overflow-hidden border border-outline_variant">
                                    <img
                                      className="w-full h-full object-cover"
                                      src={p.image || p.images?.[0] || ""}
                                      alt={p.name}
                                    />
                                  </div>
                                  <div>
                                    <p
                                      className="text-body-md font-semibold text-on_surface group-hover:text-primary transition-colors cursor-pointer"
                                      onClick={() => handleEdit(p._id || p.id)}
                                    >
                                      {p.name}
                                    </p>
                                    <p className="text-label-sm font-label-sm text-on_surface_variant">
                                      SKU: {p.sku || "—"}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-md text-body-md text-on_surface">
                                {p.category}
                              </td>
                              <td className="p-md text-body-md font-semibold text-on_surface">
                                ${(p.price || 0).toFixed(2)}
                              </td>
                              <td className="p-md">
                                <div className="space-y-1 w-32">
                                  <div className="flex justify-between text-label-sm">
                                    <span
                                      className={`${isOutOfStock || isLowStock ? "text-error font-bold" : ""}`}
                                    >
                                      {p.stock} units
                                    </span>
                                    <span
                                      className={
                                        isOutOfStock || isLowStock
                                          ? "text-error font-bold"
                                          : "text-primary"
                                      }
                                    >
                                      {p.stock === 0
                                        ? "0%"
                                        : p.stock >= 100
                                          ? "100%"
                                          : `${p.stock}%`}
                                    </span>
                                  </div>
                                  <div className="h-1.5 w-full bg-surface_container_high rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${isOutOfStock || isLowStock ? "bg-error" : "bg-primary"}`}
                                      style={{
                                        width: `${Math.min(p.stock, 100)}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-md">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusBgClass} text-label-sm font-label-sm`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${dotBgClass}`}
                                  ></span>
                                  {p.status}
                                </span>
                              </td>
                              <td className="p-md text-right pr-6">
                                <div className="flex items-center justify-end gap-sm">
                                  <button
                                    onClick={() => handleEdit(p._id || p.id)}
                                    className="p-2 text-on_surface_variant hover:text-primary hover:bg-primary/10 rounded-full transition-all cursor-pointer"
                                    title="Edit Product"
                                  >
                                    <span className="material-symbols-outlined text-[20px]">
                                      edit
                                    </span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      window.open(
                                        `/storedetail?id=${storeSlug}`,
                                        "_blank",
                                      )
                                    }
                                    className="p-2 text-on_surface_variant hover:text-secondary hover:bg-secondary/10 rounded-full transition-all cursor-pointer"
                                    title="View Shop"
                                  >
                                    <span className="material-symbols-outlined text-[20px]">
                                      visibility
                                    </span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDelete(p._id || p.id, p.name)
                                    }
                                    className="p-2 text-on_surface_variant hover:text-error hover:bg-error/10 rounded-full transition-all cursor-pointer"
                                    title="Delete Product"
                                  >
                                    <span className="material-symbols-outlined text-[20px]">
                                      delete
                                    </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/*  Pagination Footer Representation */}
                <div className="bg-surface_container_low px-md py-md border-t border-outline_variant flex flex-col md:flex-row items-center justify-between gap-md">
                  <p className="text-body-sm font-body-sm text-on_surface_variant">
                    Showing{" "}
                    <span className="font-bold text-on_surface">
                      {filteredProducts.length}
                    </span>{" "}
                    products
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline_variant bg-surface_container_lowest text-on_surface_variant hover:bg-surface_container_high transition-colors"
                      disabled
                    >
                      <span className="material-symbols-outlined">
                        chevron_left
                      </span>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on_primary font-label-md">
                      1
                    </button>
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline_variant bg-surface_container_lowest text-on_surface_variant hover:bg-surface_container_high transition-colors"
                      disabled
                    >
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/*  Footer Shell  */}
            <footer className="bg-surface_container_high border-t border-outline_variant mt-xxl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-xl px-margin-desktop py-xxl max-w-[1440px] mx-auto w-full">
                <div className="space-y-md">
                  <h1 className="text-h4 font-h4 font-bold text-on_surface">
                    Ethizone
                  </h1>
                  <p className="text-body-sm font-body-sm text-on_surface_variant">
                    Empowering independent sellers with premium logistics and
                    global reach. Build your brand with confidence.
                  </p>
                </div>
                <div>
                  <h3 className="text-label-md font-label-md text-on_surface mb-md">
                    Marketplace
                  </h3>
                  <ul className="space-y-sm">
                    <li>
                      <a
                        className="text-on_surface_variant text-label-sm font-label-sm hover:text-primary hover:underline transition-all"
                        href="#"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-on_surface_variant text-label-sm font-label-sm hover:text-primary hover:underline transition-all"
                        href="#"
                      >
                        Shipping Info
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-on_surface_variant text-label-sm font-label-sm hover:text-primary hover:underline transition-all"
                        href="#"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-label-md font-label-md text-on_surface mb-md">
                    Support
                  </h3>
                  <ul className="space-y-sm">
                    <li>
                      <a
                        className="text-on_surface_variant text-label-sm font-label-sm hover:text-primary hover:underline transition-all"
                        href="#"
                      >
                        Contact
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-on_surface_variant text-label-sm font-label-sm hover:text-primary hover:underline transition-all"
                        href="#"
                      >
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-md">
                  <h3 className="text-label-md font-label-md text-on_surface">
                    Newsletter
                  </h3>
                  <div className="flex gap-2">
                    <input
                      className="bg-surface px-4 py-2 rounded-lg border border-outline_variant w-full text-body-sm outline-none"
                      placeholder="Email address"
                      type="email"
                    />
                    <button className="bg-primary text-on_primary px-4 py-2 rounded-lg font-label-sm">
                      Join
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-margin-desktop py-md border-t border-outline_variant max-w-[1440px] mx-auto w-full text-center md:text-left">
                <p className="text-label-sm font-label-sm text-on_surface_variant">
                  © 2024 Ethizone Marketplace. All rights reserved.
                </p>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
