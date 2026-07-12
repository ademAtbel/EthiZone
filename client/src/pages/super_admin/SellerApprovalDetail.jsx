import React from "react";
import AdminSidebar from "../../components/AdminSidebar";

export default function SellerApprovalDetail() {
  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
          {/*  SideNavBar Anchor  */}
          <AdminSidebar />
          {/*  Main Content Canvas  */}
          <main className="ml-64 min-h-screen">
            {/*  TopNavBar Anchor  */}
            <header className="sticky top-0 z-40 bg-surface dark:bg-surface-dim border-b border-surface-variant dark:border-outline-variant h-16 flex justify-between items-center px-margin-desktop w-full">
              <div className="flex items-center gap-md">
                <button className="p-sm hover:bg-surface-container-low transition-colors rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div className="flex flex-col">
                  <h2 className="font-label-md text-label-md text-on-surface">
                    Application ID: #APP-8842-VZ
                  </h2>
                  <p className="text-label-sm text-secondary font-semibold">
                    Status: Pending Review
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <button
                  className="px-lg py-sm border border-error text-error font-label-md text-label-md rounded-lg hover:bg-error-container transition-colors"
                  onclick="toggleRejectModal()"
                >
                  Reject Application
                </button>
                <button className="px-lg py-sm bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:opacity-90 shadow-sm transition-all">
                  Approve Seller
                </button>
              </div>
            </header>
            <div className="p-margin-desktop max-w-[1440px] mx-auto">
              <div className="bento-grid">
                {/*  Section 1: Business Information  */}
                <section className="col-span-8 glass-card rounded-xl p-lg shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-sm mb-lg">
                    <span className="material-symbols-outlined text-primary">
                      business
                    </span>
                    <h3 className="font-h3 text-h3">Business Information</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-xl">
                    <div>
                      <label className="text-label-sm text-on-surface-variant block mb-xs">
                        Legal Business Name
                      </label>
                      <p className="font-body-md text-body-md font-semibold">
                        Artisan Crafts &amp; Co. Ltd.
                      </p>
                    </div>
                    <div>
                      <label className="text-label-sm text-on-surface-variant block mb-xs">
                        Tax ID / EIN
                      </label>
                      <p className="font-body-md text-body-md font-semibold">
                        TX-990-234-551
                      </p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-label-sm text-on-surface-variant block mb-xs">
                        Business Address
                      </label>
                      <p className="font-body-md text-body-md">
                        122 Industrial Way, Suite 400, Portland, OR 97201, USA
                      </p>
                    </div>
                    <div>
                      <label className="text-label-sm text-on-surface-variant block mb-xs">
                        Company Website
                      </label>
                      <a
                        className="font-body-md text-body-md text-secondary underline"
                        href="#"
                      >
                        www.artisancrafts.co
                      </a>
                    </div>
                  </div>
                </section>
                {/*  Sidebar: Admin Notes & History  */}
                <AdminSidebar />
                {/*  Section 2: Identity Verification  */}
                <section className="col-span-8 glass-card rounded-xl p-lg shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-sm mb-lg">
                    <span className="material-symbols-outlined text-primary">
                      badge
                    </span>
                    <h3 className="font-h3 text-h3">Identity Verification</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-lg">
                    <div className="col-span-2 mb-md">
                      <label className="text-label-sm text-on-surface-variant block mb-xs">
                        Owner Full Name
                      </label>
                      <p className="font-body-md text-body-md font-semibold">
                        Jonathan H. Sterling
                      </p>
                    </div>
                    <div className="space-y-sm">
                      <label className="text-label-sm text-on-surface-variant block">
                        ID Document Scan (Passport/DL)
                      </label>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-high relative group cursor-pointer">
                        <img
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                          data-alt="A macro photograph of an official identification document laying on a neutral gray desk. The lighting is bright and overhead, highlighting the security features and holograms of the plastic card. The scene is professional and clinical, emphasizing the detail and clarity of the legal document verification process in a modern admin environment."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5VjtJSSCzWxkMbra8qRDPazeshSlyo7oyRCvh3wUgO63-xANohmZhyTsILYkgUY5PTHIF6WJ_AzwIiHLTi98dLPaDwvBqTYOEedhQr0pjMoeCe-5X7upWav-6P5fDyIXTDc3k10y7VsA5cGsB-MODMDLptG0nIzEuH5yFQlal_vDwA1qG1TeADyhw3cE1kIHxKOdEbw7jlp7y5Wj_ANdLhLpGpcs6pH0OcfklTK77TTifr2iuAUD9w7mDB3Ls_ioQLeEbfSPQsl_a"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="material-symbols-outlined text-white text-3xl">
                            zoom_in
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-sm">
                      <label className="text-label-sm text-on-surface-variant block">
                        Verification Selfie
                      </label>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-high relative group cursor-pointer">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          data-alt="A high-quality portrait of a professional man looking directly at the camera with a neutral expression. The background is a plain, brightly lit office wall, typical of a remote verification photo. The lighting is soft and even, ensuring all facial features are clearly visible for biometric matching, maintaining a clean and trustworthy aesthetic."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfR7ampDJMPwWcpoCxnh29aWe7_cWf272nC6DQvN7xX9CXZ1g9EAlmWu4aIXHdNh4VG0QfytBpJwp7_unZQtXZjJ2D4NLiCUudxdYuWR2NDxiA3GIPAULe4ccEv-6xn1KqK1wU3y8fSa4RVECICM4IVNELT8LdEZQbSMDco_vPntnmwTpM453Y4r-KZpGldNJt1scOfkTE1sYsRg1YJOg8S9v_OQQtNNEGEU813H6UmRUJNThmUJbwQmBkmctE9JZiF5YAVsbVr1nP"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="material-symbols-outlined text-white text-3xl">
                            zoom_in
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/*  Section 3: Store Settings Review  */}
                <section className="col-span-8 glass-card rounded-xl p-lg shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-sm mb-lg">
                    <span className="material-symbols-outlined text-primary">
                      storefront
                    </span>
                    <h3 className="font-h3 text-h3">Store Settings Review</h3>
                  </div>
                  <div className="flex gap-xl">
                    <div className="w-24 h-24 shrink-0 rounded-xl bg-surface-container overflow-hidden border border-outline-variant">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="A minimalist logo for a shop called Artisan Crafts, featuring a clean, geometric icon in deep green against a soft off-white background. The design is modern and professional, reflecting the reliable and high-quality nature of a premium marketplace vendor. The image is crisp and centered, suitable for an admin store preview."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4zZ_pc-1ERI988Vb1Fz5m3tmtWfIut-DOYjs9VW8qhxcz8RkV7CZlz3YVLPa45xU_dkeW9JUUC7uhEZRoPTuJ0CCVs1an1Esvk93zNueCtP8oR_H1SqmPc4pUBbuIXyMHBFv3x3EkinVd73hxZLKCBFUZr2T_ylz6wSzO610kWwylqX9ZWIQCsHkYQfqXdtix3ndVcTeAaBW6f7idQVw6xHKGyGp9sGQlSXvUT-wXinidZBqWcdqm9ZxIrQWsZBh_ZO7upcLkwOxo"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-md">
                        <div>
                          <h4 className="font-h4 text-h4">
                            Artisan Essentials
                          </h4>
                          <div className="flex gap-xs mt-xs">
                            <span className="px-sm py-base bg-surface-container-high rounded-full text-label-sm">
                              Home Decor
                            </span>
                            <span className="px-sm py-base bg-surface-container-high rounded-full text-label-sm">
                              Handmade Jewelry
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            window.open(
                              "/storedetail?id=addis-boutique",
                              "_blank",
                            )
                          }
                          className="text-secondary text-label-md font-semibold flex items-center gap-xs cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            open_in_new
                          </span>
                          Preview Storefront
                        </button>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        We specialize in high-quality, ethically sourced home
                        accessories and bespoke jewelry crafted by local
                        artisans. Our goal is to bring timeless craftsmanship to
                        modern homes while supporting sustainable production
                        practices across the region.
                      </p>
                    </div>
                  </div>
                </section>
                {/*  Section 4: Document Verification  */}
                <section className="col-span-12 glass-card rounded-xl p-lg shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-sm mb-lg">
                    <span className="material-symbols-outlined text-primary">
                      description
                    </span>
                    <h3 className="font-h3 text-h3">
                      Legal Document Verification
                    </h3>
                  </div>
                  <div className="space-y-md">
                    {/*  Doc 1  */}
                    <div className="flex items-center justify-between p-md bg-surface-container-low rounded-lg border border-outline-variant hover:bg-surface-container transition-colors">
                      <div className="flex items-center gap-md">
                        <span className="material-symbols-outlined text-on-surface-variant">
                          picture_as_pdf
                        </span>
                        <div>
                          <p className="font-label-md text-label-md">
                            Business_License_2023.pdf
                          </p>
                          <p className="text-label-sm text-on-surface-variant">
                            2.4 MB • Uploaded Oct 24
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-xl">
                        <button className="px-md py-sm border border-secondary text-secondary rounded-lg font-label-md text-label-md hover:bg-secondary-fixed transition-colors">
                          View Document
                        </button>
                        <label className="flex items-center gap-sm cursor-pointer group">
                          <div className="w-6 h-6 border-2 border-outline rounded flex items-center justify-center group-hover:border-primary transition-all">
                            <input className="hidden peer" type="checkbox" />
                            <span className="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100 text-[18px] transition-opacity">
                              check_box
                            </span>
                          </div>
                          <span className="font-label-md text-label-md">
                            Verified
                          </span>
                        </label>
                      </div>
                    </div>
                    {/*  Doc 2  */}
                    <div className="flex items-center justify-between p-md bg-surface-container-low rounded-lg border border-outline-variant hover:bg-surface-container transition-colors">
                      <div className="flex items-center gap-md">
                        <span className="material-symbols-outlined text-on-surface-variant">
                          picture_as_pdf
                        </span>
                        <div>
                          <p className="font-label-md text-label-md">
                            VAT_Registration_Certificate.pdf
                          </p>
                          <p className="text-label-sm text-on-surface-variant">
                            1.1 MB • Uploaded Oct 24
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-xl">
                        <button className="px-md py-sm border border-secondary text-secondary rounded-lg font-label-md text-label-md hover:bg-secondary-fixed transition-colors">
                          View Document
                        </button>
                        <label className="flex items-center gap-sm cursor-pointer group">
                          <div className="w-6 h-6 border-2 border-outline rounded flex items-center justify-center group-hover:border-primary transition-all">
                            <input className="hidden peer" type="checkbox" />
                            <span className="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100 text-[18px] transition-opacity">
                              check_box
                            </span>
                          </div>
                          <span className="font-label-md text-label-md">
                            Verified
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
          {/*  Modal: Reject Application  */}
          <div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-lg"
            id="rejectModal"
          >
            <div
              className="bg-surface rounded-xl max-w-md w-full shadow-2xl p-xl scale-95 transition-transform duration-300"
              id="modalContainer"
            >
              <h3 className="font-h3 text-h3 text-error mb-md">
                Reject Application
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
                Please provide a reason for rejection. This will be sent to the
                seller to help them correct their application.
              </p>
              <div className="space-y-md mb-xl">
                <label className="block">
                  <span className="text-label-sm font-semibold text-on-surface mb-sm block">
                    Rejection Reason
                  </span>
                  <select className="w-full border border-outline-variant rounded-lg p-md bg-surface-container-lowest focus:ring-2 focus:ring-error focus:ring-opacity-20 outline-none font-body-sm text-body-sm">
                    <option>Incorrect Identity Documents</option>
                    <option>Business Address Not Verified</option>
                    <option>Incomplete Tax Information</option>
                    <option>Prohibited Category Selection</option>
                    <option>Low Quality Logo/Description</option>
                    <option>Other (Specify below)</option>
                  </select>
                </label>
                <textarea
                  className="w-full h-24 p-md border border-outline-variant rounded-lg bg-surface-container-lowest focus:ring-2 focus:ring-error focus:ring-opacity-20 outline-none font-body-sm text-body-sm"
                  placeholder="Additional details for the seller..."
                ></textarea>
              </div>
              <div className="flex gap-md justify-end">
                <button
                  className="px-lg py-sm font-label-md text-label-md hover:bg-surface-container-high rounded-lg transition-colors"
                  onclick="toggleRejectModal()"
                >
                  Cancel
                </button>
                <button className="px-xl py-sm bg-error text-on-error font-label-md text-label-md rounded-lg shadow-sm hover:opacity-90 transition-all">
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
