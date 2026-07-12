import React from "react";
import SellerSidebar from '../../components/SellerSidebar';
import SellerNavbar from '../../components/SellerNavbar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

export default function AddJobPage() {
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
            <SellerNavbar title="Post a Job Opening" />

            <section className="max-w-[1000px] mx-auto px-margin-desktop py-xl">
              <nav className="flex items-center gap-2 mb-lg text-label-sm font-label-sm text-on_surface_variant">
                <Link to={`/seller/${slug}/hub`} className="hover:text-primary transition-colors">Seller Hub</Link>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                <span className="text-on_surface">New Job Listing</span>
              </nav>

              <form className="space-y-lg">
                {/* Section 1: Job Details */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">work</span>
                    <h3 className="text-h4 font-h4 text-on_surface">Job Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">Job Title</label>
                      <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all" placeholder="e.g. Senior Frontend Developer" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">Company Name</label>
                      <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all" placeholder="Your Company" type="text" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-md md:col-span-2">
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">Job Type</label>
                        <select className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all">
                          <option>Full-Time</option>
                          <option>Part-Time</option>
                          <option>Contract</option>
                          <option>Freelance</option>
                          <option>Internship</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-label-md font-label-md text-on_surface">Work Model</label>
                        <select className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container focus:border-secondary transition-all">
                          <option>Remote</option>
                          <option>Hybrid</option>
                          <option>On-Site</option>
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

                {/* Section 3: Compensation */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">payments</span>
                    <h3 className="text-h4 font-h4 text-on_surface">Compensation</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">Minimum Salary</label>
                      <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container transition-all" placeholder="e.g. 50000" type="number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">Maximum Salary</label>
                      <input className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container transition-all" placeholder="e.g. 80000" type="number" />
                    </div>
                  </div>
                </div>

                {/* Section 3: Description */}
                <div className="bg-surface p-lg rounded-xl border border-outline_variant shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-sm mb-lg border-b border-surface-container-high pb-4">
                    <span className="material-symbols-outlined text-primary">description</span>
                    <h3 className="text-h4 font-h4 text-on_surface">Description & Requirements</h3>
                  </div>
                  <div className="space-y-md">
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">Job Description</label>
                      <textarea className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container transition-all" placeholder="Describe the role, responsibilities, and company culture..." rows="5"></textarea>
                    </div>
                    <div className="space-y-2">
                      <label className="text-label-md font-label-md text-on_surface">Required Skills & Qualifications</label>
                      <textarea className="w-full border-outline text-body-md font-body-md rounded-lg p-3 focus:ring-2 focus:ring-secondary-container transition-all" placeholder="List the necessary skills, education, and experience required..." rows="4"></textarea>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-md pt-lg border-t border-outline_variant">
                  <button onClick={() => navigate(`/seller/${slug}/hub`)} className="w-full sm:w-auto px-xl py-3 border border-outline text-on_surface rounded-lg font-label-md hover:bg-surface_container_high transition-all" type="button">Cancel</button>
                  <button className="w-full sm:w-auto px-xxl py-3 bg-primary text-white rounded-lg font-label-md shadow-md hover:bg-primary_container hover:shadow-lg transform active:scale-95 transition-all" type="submit">Publish Job</button>
                </div>
              </form>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
