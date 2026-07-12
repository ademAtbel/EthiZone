import React from "react";
import { Link } from "react-router-dom";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";

export default function GlobalSearchResultsPage() {
  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on-surface">
          <CustomerNavbar />
          {/*  Main Content Area  */}
          <main className="p-xl max-w-[1440px] mx-auto min-h-screen">
            {/*  Search Header  */}
            <div className="mb-xl">
              <h2 className="font-h2 text-h2 text-on-surface mb-xs">
                Search Results for "eco"
              </h2>
              <p className="font-body-md text-on-surface-variant">
                124 results found across all categories
              </p>
            </div>
            {/*  Filter Bar  */}
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant mb-xl flex flex-wrap gap-md items-center">
              <div className="flex items-center gap-sm">
                <span className="font-label-md text-on-surface-variant">
                  Filter by:
                </span>
                <select className="bg-surface border border-outline-variant px-md py-xs rounded-lg font-body-sm focus:ring-primary focus:border-primary">
                  <option>Category: All</option>
                  <option>Stores</option>
                  <option>Products</option>
                  <option>Users</option>
                  <option>Actions</option>
                </select>
                <select className="bg-surface border border-outline-variant px-md py-xs rounded-lg font-body-sm focus:ring-primary focus:border-primary">
                  <option>Status: All</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Archived</option>
                </select>
                <select className="bg-surface border border-outline-variant px-md py-xs rounded-lg font-body-sm focus:ring-primary focus:border-primary">
                  <option>Date Range: Last 30 Days</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>Custom</option>
                </select>
              </div>
              <div className="flex-1"></div>
              <button className="flex items-center gap-xs font-label-md text-primary hover:underline">
                <span
                  className="material-symbols-outlined text-[18px]"
                  data-icon="filter_list"
                >
                  filter_list
                </span>
                Advanced Filters
              </button>
            </div>
            {/*  Result Sections  */}
            <div className="space-y-xxl">
              {/*  Stores Section  */}
              <section>
                <div className="flex justify-between items-end mb-md">
                  <h3 className="font-h3 text-h3 text-on-surface">
                    Stores{" "}
                    <span className="text-on-surface-variant font-normal text-body-lg ml-sm">
                      (3 matches)
                    </span>
                  </h3>
                  <a
                    className="text-primary font-label-md hover:underline"
                    href="#"
                  >
                    View All Stores
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                  {/*  Store Card 1  */}
                  <Link
                    to="/storedetail?id=ecothreads"
                    className="block bg-surface-container-lowest p-lg rounded-xl border border-outline-variant hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all group"
                  >
                    <div className="flex items-start justify-between mb-md">
                      <div className="h-14 w-14 rounded-lg bg-primary-container flex items-center justify-center">
                        <span
                          className="material-symbols-outlined text-on-primary-container text-[32px]"
                          data-icon="storefront"
                        >
                          storefront
                        </span>
                      </div>
                      <span className="bg-primary-container text-on-primary-container px-sm py-xs rounded-full text-label-sm">
                        Active
                      </span>
                    </div>
                    <h4 className="font-h4 text-h4 mb-xs group-hover:text-primary transition-colors">
                      EcoThreads Sustainable Fashion
                    </h4>
                    <p className="font-body-sm text-on-surface-variant mb-md">
                      Owner: Sarah Green • Established 2022
                    </p>
                    <div className="flex items-center gap-sm">
                      <div className="flex-1 h-1 bg-surface-variant rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-primary"></div>
                      </div>
                      <span className="text-label-sm text-on-surface-variant">
                        85% Rating
                      </span>
                    </div>
                  </Link>
                  {/*  Store Card 2  */}
                  <Link
                    to="/storedetail?id=ecohome-decor"
                    className="block bg-surface-container-lowest p-lg rounded-xl border border-outline-variant hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all group"
                  >
                    <div className="flex items-start justify-between mb-md">
                      <div className="h-14 w-14 rounded-lg bg-secondary-container flex items-center justify-center">
                        <span
                          className="material-symbols-outlined text-on-secondary-container text-[32px]"
                          data-icon="home_work"
                        >
                          home_work
                        </span>
                      </div>
                      <span className="bg-surface-container-high text-on-surface-variant px-sm py-xs rounded-full text-label-sm">
                        Pending Verification
                      </span>
                    </div>
                    <h4 className="font-h4 text-h4 mb-xs group-hover:text-primary transition-colors">
                      EcoHome Decor
                    </h4>
                    <p className="font-body-sm text-on-surface-variant mb-md">
                      Owner: David Stone • Established 2024
                    </p>
                    <div className="flex items-center gap-sm">
                      <div className="flex-1 h-1 bg-surface-variant rounded-full overflow-hidden">
                        <div className="w-[40%] h-full bg-secondary"></div>
                      </div>
                      <span className="text-label-sm text-on-surface-variant">
                        New Entry
                      </span>
                    </div>
                  </Link>
                </div>
              </section>
              {/*  Products Section  */}
              <section>
                <div className="flex justify-between items-end mb-md">
                  <h3 className="font-h3 text-h3 text-on-surface">
                    Products{" "}
                    <span className="text-on-surface-variant font-normal text-body-lg ml-sm">
                      (82 matches)
                    </span>
                  </h3>
                  <a
                    className="text-primary font-label-md hover:underline"
                    href="#"
                  >
                    View All Products
                  </a>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-surface-container-low border-b border-outline-variant">
                      <tr>
                        <th className="px-lg py-md font-label-md text-on-surface-variant">
                          Product
                        </th>
                        <th className="px-lg py-md font-label-md text-on-surface-variant">
                          Store
                        </th>
                        <th className="px-lg py-md font-label-md text-on-surface-variant">
                          Price
                        </th>
                        <th className="px-lg py-md font-label-md text-on-surface-variant">
                          Stock
                        </th>
                        <th className="px-lg py-md font-label-md text-on-surface-variant text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                      <tr className="hover:bg-surface-container transition-colors">
                        <td className="px-lg py-md">
                          <div className="flex items-center gap-md">
                            <img
                              className="h-12 w-12 rounded-lg object-cover bg-surface-dim"
                              data-alt="A high-quality product photograph of a natural rubber eco-friendly yoga mat rolled up on a clean wooden floor. The mat has a soft textured finish in a calming sage green color. The lighting is bright and airy, emphasizing the organic materials and professional merchant presentation typical of a premium multi-vendor marketplace."
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2zTXahEiTFLQY8ESSKnWS0FoB_iWiOr_muG4N5cCQzdE46QhsqiCbNeQA_XZgYNftZXhqZy3tyZoxPO1fq09LOQOZtX57W0OgkkbxH40ksnJD3PWAUnIhEcqLFOynA1B35fl1HqDP7b9cPtgSTcV4w-7kl0Vhq1DEVo97J1Z2DXFhx1DWki-x9iZPvI8z2zFKRyX_2Oj1NCSmgBsxToeYyRQaBRO9xwy39YDjpd0HrDQOur0rXi7UPeiuuKNWMSPShlZQ_dfQumpH"
                            />
                            <div>
                              <p className="font-label-md text-on-surface">
                                Eco-friendly Yoga Mat
                              </p>
                              <p className="text-label-sm text-on-surface-variant">
                                SKU: ECO-MAT-001
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-lg py-md font-body-sm text-on-surface">
                          EcoThreads
                        </td>
                        <td className="px-lg py-md font-body-sm text-on-surface">
                          $45.00
                        </td>
                        <td className="px-lg py-md">
                          <span className="flex items-center gap-xs font-body-sm text-primary">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                            124 in stock
                          </span>
                        </td>
                        <td className="px-lg py-md text-right">
                          <Link
                            to="/productdetail"
                            className="text-primary hover:text-primary-container p-xs rounded hover:bg-surface-variant transition-colors inline-block"
                          >
                            <span
                              className="material-symbols-outlined"
                              data-icon="visibility"
                            >
                              visibility
                            </span>
                          </Link>
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container transition-colors">
                        <td className="px-lg py-md">
                          <div className="flex items-center gap-md">
                            <img
                              className="h-12 w-12 rounded-lg object-cover bg-surface-dim"
                              data-alt="A clean, studio-lit photo of an organic cotton t-shirt in a soft cream color, neatly folded on a white surface. The fabric texture is visible, suggesting high quality and sustainability. The overall aesthetic is minimalist and high-end, fitting for an eco-conscious brand identity within a professional admin portal."
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw62zdVtKs0IuvJ2VOvKEMcUbRU8nEYKedxWK9BjovFFU9bf2dOCSD_ezJW62St-4x--W4sCJRV7jOxsXeFOh8iqZrekKbELscmwkfre5oL5mvjrtQZmVesstcxtLoAuPwO0TfIdeAdDRzxUeM68IrQJlNuzyXYFn9Jizm72v7NNGMmtd81cMmoly2r6ObSCp3rgx33BvEOyylOvLe4DUN_GRXKvMcWxbdXT_3aA69uui2FNJXEK2BIhEIAkJHB0U4Kvk2NAzXfQlU"
                            />
                            <div>
                              <p className="font-label-md text-on-surface">
                                Organic Cotton Tee
                              </p>
                              <p className="text-label-sm text-on-surface-variant">
                                SKU: ECO-TEE-042
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-lg py-md font-body-sm text-on-surface">
                          EcoThreads
                        </td>
                        <td className="px-lg py-md font-body-sm text-on-surface">
                          $28.00
                        </td>
                        <td className="px-lg py-md">
                          <span className="flex items-center gap-xs font-body-sm text-error">
                            <span className="w-2 h-2 rounded-full bg-error"></span>
                            Low stock (8)
                          </span>
                        </td>
                        <td className="px-lg py-md text-right">
                          <Link
                            to="/productdetail"
                            className="text-primary hover:text-primary-container p-xs rounded hover:bg-surface-variant transition-colors inline-block"
                          >
                            <span
                              className="material-symbols-outlined"
                              data-icon="visibility"
                            >
                              visibility
                            </span>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
            {/*  Pagination  */}
            <CustomerFooter />
          </main>
        </div>
      </div>
    </>
  );
}
