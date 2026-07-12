import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link, useParams } from "react-router-dom";
import SellerSidebar from '../../components/SellerSidebar';
import SellerNavbar from '../../components/SellerNavbar';
import ImageUploader from "../../components/ImageUploader";
import { useAuth } from "../../context/AuthContext";

export default function AddProductPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const { storeSlug } = useParams();
  const { user } = useAuth();
  const slug = storeSlug || user?.storeSlug || 'my-store';

  // Form States
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Fashion");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("submit");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Load existing product for editing via API
  useEffect(() => {
    if (!editId) return;
    fetch(`/api/products/${editId}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(match => {
        setName(match.name || "");
        setCategory(match.category || "Fashion");
        setPrice(match.price !== undefined ? match.price.toString() : "");
        setDiscountPrice(match.discountPrice ? match.discountPrice.toString() : "");
        setStock(match.stock !== undefined ? match.stock.toString() : "");
        setStatus(match.status === "Draft" ? "draft" : "submit");
        setImages(match.images || (match.image ? [match.image] : []));
        setDescription(match.description || "");
        if (match.specifications) {
          setMaterial(match.specifications.material || "");
          setDimensions(match.specifications.dimensions || "");
          setWeight(match.specifications.weight || "");
        }
      })
      .catch(err => console.warn('Failed to load product for editing:', err.message));
  }, [editId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert("Product Name and Base Price are required!");
      return;
    }

    const priceVal = parseFloat(price) || 0;
    const discountPriceVal = discountPrice ? parseFloat(discountPrice) : null;
    const stockVal = parseInt(stock) || 0;

    let computedStatus = "Active";
    if (stockVal === 0) computedStatus = "Out of Stock";
    else if (status === "draft") computedStatus = "Draft";

    const productData = {
      name,
      category,
      price: priceVal,
      discountPrice: discountPriceVal,
      stock: stockVal,
      status: computedStatus,
      image: images[0] || '',
      images,
      description,
      specifications: { material, dimensions, weight },
      storeSlug: slug
    };

    setSubmitting(true);
    setSubmitError(null);

    try {
      const method = editId ? 'PUT' : 'POST';
      const url    = editId ? `/api/products/${editId}` : '/api/products';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || err.message || 'Failed to save product');
      }

      navigate(`/seller/${slug}/manageproducts`);
    } catch (err) {
      setSubmitError(err.message);
      setSubmitting(false);
    }
  };

  const handleDiscard = () => {
    navigate(`/seller/${slug}/manageproducts`);
  };

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on_background min-h-screen">
          {/*  SideNavBar  */}
          <SellerSidebar />
          
          {/*  Main Content Canvas  */}
          <main className="md:ml-64 min-h-screen">
            <SellerNavbar title={editId ? "Edit Product" : "Add New Product"} />
            
            <section className="max-w-[1000px] mx-auto px-margin-desktop py-xl">
              {/*  Breadcrumbs  */}
              <nav className="flex items-center gap-2 mb-lg text-label-sm font-label-sm text-on_surface_variant">
                <Link className="hover:text-primary transition-colors" to={`/seller/${slug}/sellerdashboard`}>
                  Dashboard
                </Link>
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
                <Link className="hover:text-primary transition-colors" to={`/seller/${slug}/manageproducts`}>
                  Products
                </Link>
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
                <span className="text-on_surface">{editId ? "Edit Product" : "New Product"}</span>
              </nav>

              <form onSubmit={handleSubmit} className="space-y-lg">
                {/*  Section 1: Basic Info  */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface_container_high pb-4">
                    <span className="material-symbols-outlined text-primary">
                      info
                    </span>
                    <h3 className="text-h4 font-h4 text-on_surface">
                      Basic Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">
                        Product Name *
                      </label>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container focus:border-secondary transition-all outline-none"
                        placeholder="e.g. Handmade Oak Dining Table"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface flex items-center gap-1">
                        Category
                        <span
                          className="material-symbols-outlined text-[14px] text-on_surface_variant cursor-help"
                          title="Select the primary department for this item"
                        >
                          help
                        </span>
                      </label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container focus:border-secondary transition-all outline-none"
                      >
                        <option value="Boutique">Boutique</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Home Decor">Home Decor</option>
                        <option value="Artisanal Goods">Artisanal Goods</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Footwear">Footwear</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/*  Section 2 & 3: Pricing & Inventory  */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
                  <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-sm mb-lg border-b border-surface_container_high pb-4">
                      <span className="material-symbols-outlined text-primary">
                        payments
                      </span>
                      <h3 className="text-h4 font-h4 text-on_surface">
                        Pricing
                      </h3>
                    </div>
                    <div className="space-y-md">
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">
                          Base Price ($) *
                        </label>
                        <input
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container transition-all outline-none"
                          placeholder="0.00"
                          step="0.01"
                          type="number"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">
                          Discount Price ($)
                        </label>
                        <input
                          value={discountPrice}
                          onChange={(e) => setDiscountPrice(e.target.value)}
                          className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container transition-all outline-none"
                          placeholder="Optional"
                          step="0.01"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-sm mb-lg border-b border-surface_container_high pb-4">
                      <span className="material-symbols-outlined text-primary">
                        inventory
                      </span>
                      <h3 className="text-h4 font-h4 text-on_surface">
                        Inventory
                      </h3>
                    </div>
                    <div className="space-y-md">
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">
                          Stock Quantity
                        </label>
                        <input
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container transition-all outline-none"
                          placeholder="0"
                          type="number"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">
                          Initial Status
                        </label>
                        <select 
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container transition-all outline-none"
                        >
                          <option value="draft">Save as Draft</option>
                          <option value="submit">Ready for Review / Active</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/*  Section 4: Media Upload  */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">
                      photo_library
                    </span>
                    <h3 className="text-h4 font-h4 text-on_surface">
                      Product Photos
                    </h3>
                  </div>
                  <ImageUploader images={images} onChange={setImages} maxImages={5} />
                </div>

                {/*  Section 5: Description & Specs  */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">
                      description
                    </span>
                    <h3 className="text-h4 font-h4 text-on_surface">
                      Description &amp; Specs
                    </h3>
                  </div>
                  <div className="space-y-lg">
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">
                        Detailed Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary_container transition-all outline-none"
                        placeholder="Tell customers about the craftsmanship, materials, and unique features..."
                        rows="6"
                      ></textarea>
                    </div>
                    <div className="space-y-md">
                      <p className="text-label-md font-label-md text-on_surface">
                        Product Specifications
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                        <input
                          value={material}
                          onChange={(e) => setMaterial(e.target.value)}
                          className="border border-outline_variant text-body-sm font-body-sm rounded-lg p-3 bg-surface_container_lowest outline-none"
                          placeholder="Material"
                          type="text"
                        />
                        <input
                          value={dimensions}
                          onChange={(e) => setDimensions(e.target.value)}
                          className="border border-outline_variant text-body-sm font-body-sm rounded-lg p-3 bg-surface_container_lowest outline-none"
                          placeholder="Dimensions"
                          type="text"
                        />
                        <input
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className="border border-outline_variant text-body-sm font-body-sm rounded-lg p-3 bg-surface_container_lowest outline-none"
                          placeholder="Weight"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/*  Section 7: Actions  */}
                {submitError && (
                  <div className="px-lg py-md bg-error_container text-on_error_container rounded-xl text-body-sm font-semibold flex items-center gap-sm border border-error/30">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    {submitError}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-md pt-lg border-t border-outline_variant">
                  <button
                    onClick={handleDiscard}
                    disabled={submitting}
                    className="w-full sm:w-auto px-xl py-3 border border-outline_variant text-on_surface rounded-lg font-label-md hover:bg-surface_container_high transition-all cursor-pointer disabled:opacity-50"
                    type="button"
                  >
                    Discard Changes
                  </button>
                  <button
                    onClick={(e) => {
                      setStatus("draft");
                      handleSubmit(e);
                    }}
                    disabled={submitting}
                    className="w-full sm:w-auto px-xl py-3 bg-white border border-primary text-primary rounded-lg font-label-md hover:bg-primary_container hover:text-white transition-all cursor-pointer disabled:opacity-50"
                    type="button"
                  >
                    Save as Draft
                  </button>
                  <button
                    disabled={submitting}
                    className="w-full sm:w-auto px-xxl py-3 bg-primary text-white rounded-lg font-label-md shadow-md hover:bg-primary_container hover:shadow-lg transform active:scale-95 transition-all cursor-pointer disabled:opacity-70 flex items-center justify-center gap-sm"
                    type="submit"
                  >
                    {submitting ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Saving...</>
                    ) : (
                      editId ? "Update Product" : "Submit Product"
                    )}
                  </button>
                </div>
              </form>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
