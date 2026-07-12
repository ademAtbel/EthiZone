import React, { useState } from "react";
import SellerSidebar from '../../components/SellerSidebar';
import SellerNavbar from '../../components/SellerNavbar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ImageUploader from "../../components/ImageUploader";
import { useAuth } from "../../context/AuthContext";

export default function AddHousePage() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { storeSlug } = useParams();
  const { user } = useAuth();
  const slug = storeSlug || user?.storeSlug || 'my-store';

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on_background min-h-screen">
          <SellerSidebar />
          <main className="md:ml-64 min-h-screen">
            <SellerNavbar title="List a Property" />

            <section className="max-w-[1000px] mx-auto px-margin-desktop py-xl">
              <nav className="flex items-center gap-2 mb-lg text-label-sm font-label-sm text-on_surface_variant">
                <Link to={`/seller/${slug}/hub`} className="hover:text-primary transition-colors">Seller Hub</Link>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                <span className="text-on_surface">New Property Listing</span>
              </nav>

              <form className="space-y-lg">
                {/* Section 1: Property Details */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">home</span>
                    <h3 className="text-h4 font-h4 text-on_surface">Property Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">Property Title</label>
                      <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all" placeholder="e.g. Modern Downtown Apartment" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">Property Type</label>
                      <select className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all">
                        <option>Apartment</option>
                        <option>Single Family Home</option>
                        <option>Condo</option>
                        <option>Townhouse</option>
                        <option>Commercial Space</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-md md:col-span-2">
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">Bedrooms</label>
                        <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all" type="number" min="0" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">Bathrooms</label>
                        <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all" type="number" min="0" step="0.5" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">Square Feet</label>
                        <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all" type="number" min="0" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Location */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <h3 className="text-h4 font-h4 text-on_surface">Location</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-label-md font-label-md text-on_surface">Street Address</label>
                      <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container transition-all" placeholder="123 Main St" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">City</label>
                      <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container transition-all" type="text" />
                    </div>
                    <div className="grid grid-cols-2 gap-md">
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">State/Region</label>
                        <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container transition-all" type="text" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">Zip/Postal Code</label>
                        <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container transition-all" type="text" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Pricing */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">payments</span>
                    <h3 className="text-h4 font-h4 text-on_surface">Pricing</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">Listing Type</label>
                      <select className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all">
                        <option>For Sale</option>
                        <option>For Rent</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">Price ($)</label>
                      <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container transition-all" placeholder="0.00" type="number" />
                    </div>
                  </div>
                </div>

                {/* Section 4: Media */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">photo_library</span>
                    <h3 className="text-h4 font-h4 text-on_surface">Property Gallery</h3>
                  </div>
                  <ImageUploader images={images} onChange={setImages} maxImages={5} />
                </div>

                {/* Section 5: Description */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">description</span>
                    <h3 className="text-h4 font-h4 text-on_surface">Description</h3>
                  </div>
                  <div className="space-y-2">
                    <label className="text-label-md font-label-md text-on_surface">Property Description</label>
                    <textarea className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container transition-all" placeholder="Describe the property's key features, neighborhood, and amenities..." rows="6"></textarea>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-md pt-lg border-t border-outline_variant">
                  <button onClick={() => navigate(`/seller/${slug}/hub`)} className="w-full sm:w-auto px-xl py-3 border border-outline text-on_surface rounded-lg font-label-md hover:bg-surface_container_high transition-all" type="button">Cancel</button>
                  <button className="w-full sm:w-auto px-xxl py-3 bg-primary text-white rounded-lg font-label-md shadow-md hover:bg-primary_container hover:shadow-lg transform active:scale-95 transition-all" type="submit">Publish Listing</button>
                </div>
              </form>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
