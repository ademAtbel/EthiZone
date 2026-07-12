import React from "react";
import AdminSidebar from "../../components/AdminSidebar";

export default function PlatformReportsDashboard() {
  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background">
          {/*  Sidebar Navigation  */}
          <AdminSidebar />
          {/*  Top App Bar  */}
          <header className="flex justify-between items-center w-full px-margin-desktop py-sm ml-64 max-w-[calc(100%-16rem)] bg-surface sticky top-0 z-40 border-b border-outline-variant">
            <div className="flex items-center flex-1">
              <div className="relative w-96">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  search
                </span>
                <input
                  className="w-full bg-surface-container-low border border-outline-variant rounded-full pl-10 pr-4 py-2 text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  placeholder="Search reports, sellers, or orders..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-md">
              <button className="hover:bg-surface-container-low rounded-full p-2 transition-all relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <button className="hover:bg-surface-container-low rounded-full p-2 transition-all">
                <span className="material-symbols-outlined">help_outline</span>
              </button>
              <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
              <button className="flex items-center gap-sm bg-primary text-on-primary px-lg py-2 rounded-lg text-label-md font-label-md transition-all active:scale-95 shadow-md">
                <span className="material-symbols-outlined">download</span>
                Export Report
              </button>
            </div>
          </header>
          {/*  Main Content Canvas  */}
          <main className="ml-64 p-margin-desktop bg-background min-h-screen">
            {/*  Header & Filters Section  */}
            <section className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-lg">
              <div>
                <h2 className="text-h2 font-h2 text-on-background">
                  Platform Reports
                </h2>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Comprehensive overview of Ethizone's marketplace performance
                  and operational health.
                </p>
              </div>
              <div className="flex items-center gap-md bg-surface-container-lowest p-2 rounded-xl elevation-1">
                <div className="flex flex-col px-md">
                  <label className="text-label-sm font-label-sm text-on-surface-variant mb-1">
                    Date Range
                  </label>
                  <select className="text-body-sm font-body-sm border-none bg-transparent p-0 focus:ring-0 cursor-pointer">
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Year to Date</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div className="w-[1px] h-10 bg-outline-variant"></div>
                <div className="flex flex-col px-md">
                  <label className="text-label-sm font-label-sm text-on-surface-variant mb-1">
                    Category
                  </label>
                  <select className="text-body-sm font-body-sm border-none bg-transparent p-0 focus:ring-0 cursor-pointer">
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Home &amp; Living</option>
                    <option>Artisan Crafts</option>
                  </select>
                </div>
                <div className="w-[1px] h-10 bg-outline-variant"></div>
                <div className="flex flex-col px-md">
                  <label className="text-label-sm font-label-sm text-on-surface-variant mb-1">
                    Region
                  </label>
                  <select className="text-body-sm font-body-sm border-none bg-transparent p-0 focus:ring-0 cursor-pointer">
                    <option>Global Overview</option>
                    <option>North America</option>
                    <option>Europe</option>
                    <option>Asia Pacific</option>
                  </select>
                </div>
              </div>
            </section>
            {/*  KPI Grid (Bento Style)  */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-xl">
              {/*  GMV  */}
              <div className="bg-surface-container-lowest p-lg rounded-xl elevation-2 flex flex-col justify-between border-t-4 border-primary">
                <div>
                  <div className="flex items-center justify-between mb-sm">
                    <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                      GMV
                    </span>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">
                        payments
                      </span>
                    </div>
                  </div>
                  <div className="text-h3 font-h3">$4,285,900</div>
                </div>
                <div className="flex items-center gap-xs mt-md">
                  <span className="text-primary flex items-center text-label-sm font-label-sm">
                    <span className="material-symbols-outlined text-[16px]">
                      trending_up
                    </span>{" "}
                    12.5%
                  </span>
                  <span className="text-body-sm text-on-surface-variant">
                    vs last month
                  </span>
                </div>
              </div>
              {/*  Total Orders  */}
              <div className="bg-surface-container-lowest p-lg rounded-xl elevation-2 flex flex-col justify-between border-t-4 border-secondary">
                <div>
                  <div className="flex items-center justify-between mb-sm">
                    <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                      Total Orders
                    </span>
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined">
                        shopping_bag
                      </span>
                    </div>
                  </div>
                  <div className="text-h3 font-h3">38,122</div>
                </div>
                <div className="flex items-center gap-xs mt-md">
                  <span className="text-primary flex items-center text-label-sm font-label-sm">
                    <span className="material-symbols-outlined text-[16px]">
                      trending_up
                    </span>{" "}
                    8.2%
                  </span>
                  <span className="text-body-sm text-on-surface-variant">
                    vs last month
                  </span>
                </div>
              </div>
              {/*  New Signups  */}
              <div className="bg-surface-container-lowest p-lg rounded-xl elevation-2 flex flex-col justify-between border-t-4 border-tertiary">
                <div>
                  <div className="flex items-center justify-between mb-sm">
                    <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                      New Signups
                    </span>
                    <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined">
                        person_add
                      </span>
                    </div>
                  </div>
                  <div className="text-h3 font-h3">2,490</div>
                </div>
                <div className="flex items-center gap-xs mt-md">
                  <span className="text-error flex items-center text-label-sm font-label-sm">
                    <span className="material-symbols-outlined text-[16px]">
                      trending_down
                    </span>{" "}
                    3.1%
                  </span>
                  <span className="text-body-sm text-on-surface-variant">
                    vs last month
                  </span>
                </div>
              </div>
              {/*  AOV  */}
              <div className="bg-surface-container-lowest p-lg rounded-xl elevation-2 flex flex-col justify-between border-t-4 border-outline">
                <div>
                  <div className="flex items-center justify-between mb-sm">
                    <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                      Avg Order Value
                    </span>
                    <div className="w-10 h-10 rounded-full bg-outline/10 flex items-center justify-center text-outline">
                      <span className="material-symbols-outlined">
                        analytics
                      </span>
                    </div>
                  </div>
                  <div className="text-h3 font-h3">$112.42</div>
                </div>
                <div className="flex items-center gap-xs mt-md">
                  <span className="text-primary flex items-center text-label-sm font-label-sm">
                    <span className="material-symbols-outlined text-[16px]">
                      trending_up
                    </span>{" "}
                    4.7%
                  </span>
                  <span className="text-body-sm text-on-surface-variant">
                    vs last month
                  </span>
                </div>
              </div>
            </section>
            {/*  Middle Section: Revenue Chart & Operational Metrics  */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-xl">
              {/*  Revenue Overview Chart (Placeholder UI)  */}
              <div className="lg:col-span-2 bg-surface-container-lowest p-lg rounded-xl elevation-2">
                <div className="flex items-center justify-between mb-xl">
                  <h3 className="text-h4 font-h4 text-on-surface">
                    Revenue Overview
                  </h3>
                  <div className="flex gap-sm">
                    <button className="px-3 py-1 text-label-sm rounded-full bg-primary text-on-primary">
                      Sales
                    </button>
                    <button className="px-3 py-1 text-label-sm rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high">
                      Commission
                    </button>
                  </div>
                </div>
                <div className="h-64 flex items-end justify-between gap-4 px-4 relative">
                  {/*  Simple CSS Chart Bar Representation  */}
                  <div
                    className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm group relative chart-bar"
                    style={{ height: "40%" }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-inverse-surface text-inverse-on-surface text-xs p-1 rounded transition-opacity">
                      $120k
                    </div>
                  </div>
                  <div
                    className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm group relative chart-bar"
                    style={{ height: "55%" }}
                  ></div>
                  <div
                    className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm group relative chart-bar"
                    style={{ height: "45%" }}
                  ></div>
                  <div
                    className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm group relative chart-bar"
                    style={{ height: "70%" }}
                  ></div>
                  <div
                    className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm group relative chart-bar"
                    style={{ height: "85%" }}
                  ></div>
                  <div
                    className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm group relative chart-bar"
                    style={{ height: "60%" }}
                  ></div>
                  <div
                    className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm group relative chart-bar"
                    style={{ height: "95%" }}
                  ></div>
                  <div
                    className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm group relative chart-bar"
                    style={{ height: "75%" }}
                  ></div>
                  <div
                    className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm group relative chart-bar"
                    style={{ height: "80%" }}
                  ></div>
                  <div
                    className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm group relative chart-bar"
                    style={{ height: "65%" }}
                  ></div>
                  <div
                    className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm group relative chart-bar"
                    style={{ height: "90%" }}
                  ></div>
                  <div
                    className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm group relative chart-bar"
                    style={{ height: "100%" }}
                  ></div>
                </div>
                <div className="flex justify-between mt-sm text-label-sm text-on-surface-variant px-4">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </div>
              {/*  Operational Metrics  */}
              <div className="flex flex-col gap-gutter">
                <div className="bg-surface-container-lowest p-lg rounded-xl elevation-2 flex-1">
                  <h3 className="text-label-md font-label-md text-on-surface-variant uppercase mb-md">
                    Order Fulfillment Rate
                  </h3>
                  <div className="flex items-center justify-between mb-sm">
                    <div className="text-h3 font-h3">98.4%</div>
                    <div className="text-primary text-label-sm">+0.2%</div>
                  </div>
                  <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "98.4%" }}
                    ></div>
                  </div>
                  <p className="text-body-sm text-on-surface-variant mt-sm">
                    Average across 1,200 active stores
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-lg rounded-xl elevation-2 flex-1">
                  <h3 className="text-label-md font-label-md text-on-surface-variant uppercase mb-md">
                    Avg. Customer Rating
                  </h3>
                  <div className="flex items-center gap-2 mb-md">
                    <div className="text-h3 font-h3">4.8</div>
                    <div className="flex text-primary">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 0.5" }}
                      >
                        star_half
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-on-surface-variant">
                      Based on 145,200 reviews
                    </span>
                    <a
                      className="text-secondary font-bold hover:underline"
                      href="#"
                    >
                      View details
                    </a>
                  </div>
                </div>
              </div>
            </section>
            {/*  Bottom Grid: Top Categories & Top Sellers  */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
              {/*  Top Performing Categories  */}
              <div className="bg-surface-container-lowest p-lg rounded-xl elevation-2">
                <div className="flex items-center justify-between mb-xl">
                  <h3 className="text-h4 font-h4 text-on-surface">
                    Top Categories
                  </h3>
                  <button className="text-label-md font-label-md text-primary hover:bg-primary/5 px-2 py-1 rounded">
                    View All
                  </button>
                </div>
                <div className="space-y-md">
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">
                        computer
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-label-md font-label-md">
                          Electronics &amp; Tech
                        </span>
                        <span className="text-label-md font-label-md">
                          $1.2M
                        </span>
                      </div>
                      <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">
                        chair
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-label-md font-label-md">
                          Home &amp; Decor
                        </span>
                        <span className="text-label-md font-label-md">
                          $840K
                        </span>
                      </div>
                      <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full"
                          style={{ width: "55%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">
                        apparel
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-label-md font-label-md">
                          Fashion &amp; Apparel
                        </span>
                        <span className="text-label-md font-label-md">
                          $610K
                        </span>
                      </div>
                      <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full"
                          style={{ width: "40%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">
                        auto_stories
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-label-md font-label-md">
                          Books &amp; Media
                        </span>
                        <span className="text-label-md font-label-md">
                          $420K
                        </span>
                      </div>
                      <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full"
                          style={{ width: "25%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*  Top Sellers  */}
              <div className="bg-surface-container-lowest p-lg rounded-xl elevation-2">
                <div className="flex items-center justify-between mb-xl">
                  <h3 className="text-h4 font-h4 text-on-surface">
                    Top Sellers
                  </h3>
                  <button className="text-label-md font-label-md text-primary hover:bg-primary/5 px-2 py-1 rounded">
                    Seller Analytics
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-label-sm text-on-surface-variant border-b border-outline-variant">
                        <th className="pb-3 font-semibold">Seller Name</th>
                        <th className="pb-3 font-semibold">Sales</th>
                        <th className="pb-3 font-semibold">Growth</th>
                        <th className="pb-3 font-semibold text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                      <tr>
                        <td className="py-4">
                          <div className="flex items-center gap-sm">
                            <img
                              className="w-8 h-8 rounded-lg object-cover"
                              data-alt="A clean, minimalist logo of a high-end furniture brand, featuring elegant typography and a neutral color scheme, displayed against a soft-focus workshop background. The scene is bright and professional, emphasizing craftsmanship and modern retail aesthetics."
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlnuahjS69aa2TMtl_uNQv6EQZ636RyWN04lDHwpjPXlrTIBC7RtLHQqHznpQH5rlTnQ-i4hsc7SQLYLOogcHEpf61LMv9h-6lbqKLq7q0JsY7ZK_jM0F4wLTwXtjnwHiCs1udeh9UkIZ7e5ad3BOdObt0ulDO8ZwvHK9Uv62DTHFkqa1NZACUuD8qXMdcvFvJfl40uXIkurHrdYVpb5UOcRuV3jvKcG55DW3eJ-Gw859mM9dc5CiaEVhdNzFPBdReFgpyJ0ZcSXQJ"
                            />
                            <div className="text-label-md font-label-md">
                              Nordic Living Co.
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-body-sm font-semibold">
                          $240,500
                        </td>
                        <td className="py-4 text-primary text-label-sm font-bold">
                          +15.2%
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() =>
                              window.open(
                                "/storedetail?id=addis-boutique",
                                "_blank",
                              )
                            }
                            className="text-secondary hover:underline text-label-md cursor-pointer"
                          >
                            View Store
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">
                          <div className="flex items-center gap-sm">
                            <img
                              className="w-8 h-8 rounded-lg object-cover"
                              data-alt="A macro shot of a sleek smartphone interface showing vibrant app icons, with light reflecting off the glass screen. The image is captured in a high-tech showroom with cool blue ambient lighting and a clean, futuristic corporate aesthetic."
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB10XKAaq3C0RYAQrifenmQe5v8sQkeC7KU4PP7HybkGtUUtNOc8nfnDXvXCSQAoqV8Nta9ZdpiPILYclrDD-b9ajL1Fie2gHChPgOib3MspNUJBYkgHqZtmGvntrpyTf3r1ps591FhThVnkXw-krVB0qn8wEM6RmtmETBdLmha1gZYSqc3h4DVBrYSAMuh7BfzUs1AROfxtut2wGwIT01aIQRniKkeVel37FuTs8pR4KSBeXMh0BomNpTsLzNKotjQcOKqOPOCB563"
                            />
                            <div className="text-label-md font-label-md">
                              TechNova Solutions
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-body-sm font-semibold">
                          $198,200
                        </td>
                        <td className="py-4 text-primary text-label-sm font-bold">
                          +12.4%
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() =>
                              window.open(
                                "/storedetail?id=addis-boutique",
                                "_blank",
                              )
                            }
                            className="text-secondary hover:underline text-label-md cursor-pointer"
                          >
                            View Store
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">
                          <div className="flex items-center gap-sm">
                            <img
                              className="w-8 h-8 rounded-lg object-cover"
                              data-alt="A bright and airy pottery studio where a collection of minimalist handmade ceramics is displayed on rustic wooden shelves. Soft, natural sunlight streams through large windows, creating a warm, artisanal atmosphere that feels both professional and approachable."
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdFEm8nX6u9lXUaZwZQaW_WGyzy-fGhmWzZgzqLg10WR0twk6KrnXsB5vg_SIRf2SVWOiQ0AmlpBPQRN-JiqdWbIpEv_SgxAhjbb3zSbk8spUrDMWLl39X8neyVYcfqGVsA7ZsBRXedeFN1HpCgCVbQdBOHKFVLzYMD9FP1DizFRVEY42BAMn5BSIcQztoqxr9o8wH44e_OGdO-h3CYarx3XuMLts64Q9BiSXqyhY_BSNEV6FKzXXIMn0ceYBBYWv8AjFGB-0k1IDJ"
                            />
                            <div className="text-label-md font-label-md">
                              Clay &amp; Kin Studio
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-body-sm font-semibold">
                          $156,700
                        </td>
                        <td className="py-4 text-error text-label-sm font-bold">
                          -2.1%
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() =>
                              window.open(
                                "/storedetail?id=addis-boutique",
                                "_blank",
                              )
                            }
                            className="text-secondary hover:underline text-label-md cursor-pointer"
                          >
                            View Store
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">
                          <div className="flex items-center gap-sm">
                            <img
                              className="w-8 h-8 rounded-lg object-cover"
                              data-alt="A professional team collaborating around a large table in a modern, sun-drenched office. The space features green plants, minimalist furniture, and a bright white wall, conveying a sense of teamwork, innovation, and a positive corporate culture."
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAumk2pw4AjL1gZU74XTOvzwf5HweQwm5XgnTxKDJ5jourVbc0uR1LZg7SnQQnR1VoTIuPr-PNl1jMNh29ozZGpIBw__O_PTGPiDwiUmouc3LztAJCmA00ME7vt2pjLOxfxsaBQruwckF11RU13C7xggjlC2hBLzlKBdrQiX2sOOBEUQaK0fs4rc4Fm6obq1TUAzDrEqILf3ANLOvIPG8oIA5UC4jBz3LwlyNCskoa9ryni4TgX34UDW8dVlY_wNKYuN4SZ6ByRoqSJ"
                            />
                            <div className="text-label-md font-label-md">
                              Global Artisan Collective
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-body-sm font-semibold">
                          $132,400
                        </td>
                        <td className="py-4 text-primary text-label-sm font-bold">
                          +8.9%
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() =>
                              window.open(
                                "/storedetail?id=addis-boutique",
                                "_blank",
                              )
                            }
                            className="text-secondary hover:underline text-label-md cursor-pointer"
                          >
                            View Store
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
