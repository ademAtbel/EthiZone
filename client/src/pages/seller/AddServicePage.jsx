import React, { useState } from "react";
import SellerSidebar from "../../components/SellerSidebar";
import SellerNavbar from "../../components/SellerNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageUploader from "../../components/ImageUploader";
import { useAuth } from "../../context/AuthContext";

const defaultServices = [
  {
    id: 1,
    title: "Professional Tailoring & Dressmaking",
    category: "Design & Creative",
    experience: 10,
    location: "Bole, Addis Ababa",
    address: "Bole Road",
    zip: "1000",
    pricingModel: "Hourly Rate",
    price: 25,
    description:
      "Custom Ethiopian traditional dressmaking, kemis embroidery, and modern alterations. Specializing in high-quality organic cotton and silk traditional wear.",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    provider: "Addis Boutique",
    providerId: "addis-boutique",
    rating: 4.9,
    reviewsCount: 18,
    posted: "2 days ago",
    tags: ["Tailoring", "Embroidery"],
  },
  {
    id: 2,
    title: "Deep Home & Office Cleaning",
    category: "Cleaning Services",
    experience: 4,
    location: "Kirkos, Addis Ababa",
    address: "Mexico Sq",
    zip: "1000",
    pricingModel: "Hourly Rate",
    price: 15,
    description:
      "Eco-friendly deep cleaning for residences and commercial offices. We use organic, non-toxic products to keep your spaces spotless and healthy.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    provider: "EcoShine Services",
    providerId: "ecoshine",
    rating: 4.7,
    reviewsCount: 32,
    posted: "5 hours ago",
    tags: ["Cleaning", "Eco-Friendly"],
  },
  {
    id: 3,
    title: "Plumbing & Leak Repairs",
    category: "Home Repair / Handyman",
    experience: 8,
    location: "Yeka, Addis Ababa",
    address: "Megenagna",
    zip: "1000",
    pricingModel: "Hourly Rate",
    price: 30,
    description:
      "All plumbing installations and emergency repair work. Water heater troubleshooting, pipe replacements, and leak detection.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    provider: "Abebe Plumbing Solutions",
    providerId: "abebe-plumbing",
    rating: 4.8,
    reviewsCount: 14,
    posted: "1 week ago",
    tags: ["Plumbing", "Handyman"],
  },
  {
    id: 4,
    title: "Figma UI/UX Design & Prototyping",
    category: "Design & Creative",
    experience: 5,
    location: "Remote",
    address: "Virtual Office",
    zip: "N/A",
    pricingModel: "Hourly Rate",
    price: 40,
    description:
      "Stunning, high-fidelity UI/UX design for web and mobile apps. Interactive prototypes, wireframing, and custom design systems tailored to your brand.",
    image:
      "https://images.unsplash.com/photo-1581291518655-9523c932dede?auto=format&fit=crop&w=600&q=80",
    provider: "Sileshi Creative Studio",
    providerId: "sileshi-studio",
    rating: 5.0,
    reviewsCount: 22,
    posted: "3 days ago",
    tags: ["UI/UX", "Figma", "Design"],
  },
];

export default function AddServicePage() {
  const navigate = useNavigate();
  const { storeSlug } = useParams();
  const { user } = useAuth();
  const slug = storeSlug || user?.storeSlug || 'my-store';

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Home Repair / Handyman");
  const [experience, setExperience] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Addis Ababa");
  const [region, setRegion] = useState("Ethiopia");
  const [zip, setZip] = useState("");
  const [pricingModel, setPricingModel] = useState("Hourly Rate");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !description) {
      alert("Please fill in all required fields (Title, Price, Description)");
      return;
    }

    const raw = localStorage.getItem("mock_services");
    let currentServices = [];
    if (raw) {
      currentServices = JSON.parse(raw);
    } else {
      currentServices = defaultServices;
    }

    const newService = {
      id: Date.now(),
      title,
      category,
      experience: experience ? parseInt(experience) : 0,
      location: `${city}, ${region}`,
      address,
      zip,
      pricingModel,
      price: parseFloat(price),
      description,
      image:
        images[0] ||
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
      images,
      provider: "Addis Boutique", // Seeded seller provider
      providerId: "addis-boutique",
      rating: 5.0,
      reviewsCount: 0,
      posted: "Just now",
      tags: [category.split("/")[0].trim()],
    };

    const updated = [newService, ...currentServices];
    localStorage.setItem("mock_services", JSON.stringify(updated));

    alert("Service Listing published successfully!");
    navigate("/services");
  };

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on_background min-h-screen">
          <SellerSidebar />
          <main className="md:ml-64 min-h-screen">
            <SellerNavbar title="Offer a Professional Service" />

            <section className="max-w-[1000px] mx-auto px-margin-desktop py-xl">
              <nav className="flex items-center gap-2 mb-lg text-label-sm font-label-sm text-on_surface_variant">
                <Link
                  to={`/seller/${slug}/hub`}
                  className="hover:text-primary transition-colors"
                >
                  Seller Hub
                </Link>
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
                <span className="text-on_surface">New Service Listing</span>
              </nav>

              <form onSubmit={handleSubmit} className="space-y-lg">
                {/* Section 1: Service Info */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">
                      handyman
                    </span>
                    <h3 className="text-h4 font-h4 text-on_surface">
                      Service Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-label-md font-label-md text-on_surface">
                        Service Title *
                      </label>
                      <input
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary-container focus:border-secondary outline-none transition-all"
                        placeholder="e.g. Expert Tailoring & Alternation Work"
                        type="text"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">
                        Category *
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary-container focus:border-secondary outline-none transition-all"
                      >
                        <option>Home Repair / Handyman</option>
                        <option>Cleaning Services</option>
                        <option>IT & Tech Support</option>
                        <option>Design & Creative</option>
                        <option>Consulting</option>
                        <option>Fashion & Tailoring</option>
                        <option>Events & Catering</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">
                        Years of Experience
                      </label>
                      <input
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary-container focus:border-secondary outline-none transition-all"
                        placeholder="e.g. 5"
                        type="number"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Location */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">
                      location_on
                    </span>
                    <h3 className="text-h4 font-h4 text-on_surface">
                      Location
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-label-md font-label-md text-on_surface">
                        Street Address
                      </label>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary-container outline-none transition-all"
                        placeholder="e.g. Bole Road, House 456"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">
                        City
                      </label>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary-container outline-none transition-all"
                        type="text"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-md">
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">
                          State/Region
                        </label>
                        <input
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary-container outline-none transition-all"
                          type="text"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">
                          Zip/Postal Code
                        </label>
                        <input
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary-container outline-none transition-all"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Pricing */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">
                      payments
                    </span>
                    <h3 className="text-h4 font-h4 text-on_surface">
                      Pricing Structure
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">
                        Pricing Model *
                      </label>
                      <select
                        value={pricingModel}
                        onChange={(e) => setPricingModel(e.target.value)}
                        className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary-container focus:border-secondary outline-none transition-all"
                      >
                        <option>Hourly Rate</option>
                        <option>Fixed Price per Project</option>
                        <option>Contact for Quote</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">
                        Rate / Price ($) *
                      </label>
                      <input
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary-container outline-none transition-all"
                        placeholder="e.g. 25.00"
                        type="number"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Media Upload */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">
                      collections
                    </span>
                    <h3 className="text-h4 font-h4 text-on_surface">
                      Service Gallery
                    </h3>
                  </div>
                  <ImageUploader
                    images={images}
                    onChange={setImages}
                    maxImages={5}
                  />
                </div>

                {/* Section 5: Description */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">
                      description
                    </span>
                    <h3 className="text-h4 font-h4 text-on_surface">
                      Description
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <label className="text-label-md font-label-md text-on_surface">
                      Service Description *
                    </label>
                    <textarea
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border border-outline_variant text-body-md font-body-md rounded-lg p-3 bg-surface_container_lowest focus:ring-2 focus:ring-secondary-container outline-none transition-all"
                      placeholder="Describe the specific services you offer, your process, and what clients can expect..."
                      rows="6"
                    ></textarea>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-md pt-lg border-t border-outline_variant">
                  <Link
                    to={`/seller/${slug}/hub`}
                    className="w-full sm:w-auto px-xl py-3 border border-outline_variant text-on_surface text-center rounded-lg font-label-md hover:bg-surface_container_high transition-all"
                  >
                    Cancel
                  </Link>
                  <button
                    className="w-full sm:w-auto px-xxl py-3 bg-primary text-white rounded-lg font-label-md shadow-md hover:bg-primary_container hover:shadow-lg transform active:scale-95 transition-all cursor-pointer"
                    type="submit"
                  >
                    Publish Service
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
