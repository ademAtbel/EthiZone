import React, { useState } from "react";
import SellerSidebar from '../../components/SellerSidebar';
import SellerNavbar from '../../components/SellerNavbar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ImageUploader from "../../components/ImageUploader";
import { useAuth } from "../../context/AuthContext";

export default function AddCarPage() {
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
            <SellerNavbar title="List a Vehicle" />

            <section className="max-w-[1000px] mx-auto px-margin-desktop py-xl">
              <nav className="flex items-center gap-2 mb-lg text-label-sm font-label-sm text-on_surface_variant">
                <Link to={`/seller/${slug}/hub`} className="hover:text-primary transition-colors">Seller Hub</Link>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                <span className="text-on_surface">New Vehicle Listing</span>
              </nav>

              <form className="space-y-lg">
                {/* Section 1: Basic Info */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">directions_car</span>
                    <h3 className="text-h4 font-h4 text-on_surface">Vehicle Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">Make</label>
                      <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all" placeholder="e.g. Toyota" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">Model</label>
                      <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all" placeholder="e.g. Camry SE" type="text" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-md">
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">Year</label>
                        <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all" placeholder="2022" type="number" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">Mileage</label>
                        <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all" placeholder="15,000" type="number" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-md">
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">Transmission</label>
                        <select className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all">
                          <option>Automatic</option>
                          <option>Manual</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">Body Type</label>
                        <select className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all">
                          <option>Sedan</option>
                          <option>SUV</option>
                          <option>Truck</option>
                          <option>Coupe</option>
                          <option>Hatchback</option>
                        </select>
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
                    <h3 className="text-h4 font-h4 text-on_surface">Pricing & Status</h3>
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
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">Vehicle Identification Number (VIN)</label>
                        <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container transition-all" placeholder="17-character VIN" type="text" />
                    </div>
                  </div>
                </div>

                {/* Section 3: Media */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">photo_camera</span>
                    <h3 className="text-h4 font-h4 text-on_surface">Vehicle Photos</h3>
                  </div>
                  <ImageUploader images={images} onChange={setImages} maxImages={5} />
                </div>

                {/* Section 4: Description */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">description</span>
                    <h3 className="text-h4 font-h4 text-on_surface">Description</h3>
                  </div>
                  <div className="space-y-2">
                    <label className="text-label-md font-label-md text-on_surface">Detailed Description</label>
                    <textarea className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container transition-all" placeholder="Describe the condition, features, history, and any modifications..." rows="6"></textarea>
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
