import React from 'react';
import SellerSidebar from '../../components/SellerSidebar';
import SellerNavbar from '../../components/SellerNavbar';

export default function ShippingRulesPage() {
  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on_surface font-body-md min-h-screen">
          {/*  SideNavBar (Shared Component)  */}
          <SellerSidebar />
          <main className="md:ml-64 min-h-screen flex flex-col">
            {/*  TopNavBar (Shared Component)  */}
            <SellerNavbar title="Shipping Rules" />
            
            {/*  Main Content Area  */}
            <div className="p-margin-desktop flex flex-col lg:flex-row gap-gutter">
              {/*  Left Column: Rules Management  */}
              <div className="flex-grow space-y-gutter">
                {/*  Page Header  */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
                  <div>
                    <h2 className="font-h2 text-h2 text-on_surface">Shipping Rules</h2>
                    <p className="text-on_surface_variant mt-1">Configure logic for dynamic shipping rates across all vendor channels.</p>
                  </div>
                  <button className="flex items-center gap-2 bg-primary text-on_primary px-lg py-sm rounded-lg font-label-md shadow-sm hover:opacity-90 active:scale-95 transition-all">
                    <span className="material-symbols-outlined" data-icon="add_circle">add_circle</span>
                    + Create New Rule
                  </button>
                </div>
                
                {/*  Global Settings Bento  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="p-lg bg-surface_container_lowest border border-outline_variant rounded-xl flex items-center justify-between group hover:shadow-md transition-all">
                    <div className="flex items-center gap-md">
                      <div className="p-3 bg-secondary_fixed text-on_secondary_fixed rounded-lg">
                        <span className="material-symbols-outlined" data-icon="payments">payments</span>
                      </div>
                      <div>
                        <p className="font-h4 text-h4 text-on_surface">Enforce Tax on Shipping</p>
                        <p className="text-body-sm text-on_surface_variant">Automatically apply regional tax rates to shipping fees.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox"/>
                      <div className="w-11 h-6 bg-surface_variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="p-lg bg-surface_container_lowest border border-outline_variant rounded-xl flex items-center justify-between group hover:shadow-md transition-all">
                    <div className="flex items-center gap-md">
                      <div className="p-3 bg-tertiary_fixed text-on_tertiary_fixed rounded-lg">
                        <span className="material-symbols-outlined" data-icon="format_bold">format_bold</span>
                      </div>
                      <div>
                        <p className="font-h4 text-h4 text-on_surface">Round Shipping Rates</p>
                        <p className="text-body-sm text-on_surface_variant">Round final shipping cost to the nearest dollar.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input className="sr-only peer" type="checkbox"/>
                      <div className="w-11 h-6 bg-surface_variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
                
                {/*  Active Rules List  */}
                <section className="bg-surface_container_lowest border border-outline_variant rounded-xl overflow-hidden shadow-sm">
                  <div className="p-md bg-surface_container border-b border-outline_variant flex justify-between items-center">
                    <h3 className="font-h4 text-h4 text-on_surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary" data-icon="rule">rule</span>
                      Active Rules Execution List
                    </h3>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-label-sm text-label-sm">3 Active Rules</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface_container_low text-on_surface_variant border-b border-outline_variant">
                          <th className="px-lg py-md font-label-md">Priority</th>
                          <th className="px-lg py-md font-label-md">Rule Name</th>
                          <th className="px-lg py-md font-label-md">Conditions</th>
                          <th className="px-lg py-md font-label-md">Action</th>
                          <th className="px-lg py-md font-label-md text-center">Status</th>
                          <th className="px-lg py-md font-label-md text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline_variant">
                        {/*  Rule 1  */}
                        <tr className="hover:bg-surface_container_low transition-colors group">
                          <td className="px-lg py-md">
                            <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-on_surface_variant">
                              <span className="material-symbols-outlined" data-icon="drag_indicator">drag_indicator</span>
                              <span className="font-label-md">01</span>
                            </div>
                          </td>
                          <td className="px-lg py-md">
                            <div className="font-label-md text-on_surface">Holiday Promo</div>
                            <div className="text-body-sm text-on_surface_variant">Expires Dec 26, 2024</div>
                          </td>
                          <td className="px-lg py-md">
                            <div className="flex gap-2 flex-wrap">
                              <span className="bg-surface_variant px-2 py-1 rounded text-[12px] font-medium">Promo Code: SAVE20</span>
                            </div>
                          </td>
                          <td className="px-lg py-md">
                            <span className="text-primary font-bold">-20% Discount</span>
                          </td>
                          <td className="px-lg py-md text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              Active
                            </span>
                          </td>
                          <td className="px-lg py-md text-right">
                            <div className="flex justify-end gap-1">
                              <button className="p-2 hover:bg-surface_variant rounded-lg transition-colors text-on_surface_variant" title="Edit">
                                <span className="material-symbols-outlined text-[18px]" data-icon="edit">edit</span>
                              </button>
                              <button className="p-2 hover:bg-surface_variant rounded-lg transition-colors text-on_surface_variant" title="Duplicate">
                                <span className="material-symbols-outlined text-[18px]" data-icon="content_copy">content_copy</span>
                              </button>
                              <button className="p-2 hover:bg-error_container hover:text-error rounded-lg transition-colors text-on_surface_variant" title="Delete">
                                <span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        {/*  Rule 2  */}
                        <tr className="hover:bg-surface_container_low transition-colors group">
                          <td className="px-lg py-md">
                            <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-on_surface_variant">
                              <span className="material-symbols-outlined" data-icon="drag_indicator">drag_indicator</span>
                              <span className="font-label-md">02</span>
                            </div>
                          </td>
                          <td className="px-lg py-md">
                            <div className="font-label-md text-on_surface">Free Shipping over $150</div>
                            <div className="text-body-sm text-on_surface_variant">Mainland Orders Only</div>
                          </td>
                          <td className="px-lg py-md">
                            <div className="flex gap-2 flex-wrap">
                              <span className="bg-surface_variant px-2 py-1 rounded text-[12px] font-medium">Total &gt; $150.00</span>
                            </div>
                          </td>
                          <td className="px-lg py-md">
                            <span className="text-primary font-bold">Set Rate to $0</span>
                          </td>
                          <td className="px-lg py-md text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              Active
                            </span>
                          </td>
                          <td className="px-lg py-md text-right">
                            <div className="flex justify-end gap-1">
                              <button className="p-2 hover:bg-surface_variant rounded-lg transition-colors text-on_surface_variant" title="Edit">
                                <span className="material-symbols-outlined text-[18px]" data-icon="edit">edit</span>
                              </button>
                              <button className="p-2 hover:bg-surface_variant rounded-lg transition-colors text-on_surface_variant" title="Duplicate">
                                <span className="material-symbols-outlined text-[18px]" data-icon="content_copy">content_copy</span>
                              </button>
                              <button className="p-2 hover:bg-error_container hover:text-error rounded-lg transition-colors text-on_surface_variant" title="Delete">
                                <span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        {/*  Rule 3  */}
                        <tr className="hover:bg-surface_container_low transition-colors group">
                          <td className="px-lg py-md">
                            <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-on_surface_variant">
                              <span className="material-symbols-outlined" data-icon="drag_indicator">drag_indicator</span>
                              <span className="font-label-md">03</span>
                            </div>
                          </td>
                          <td className="px-lg py-md">
                            <div className="font-label-md text-on_surface">Heavy Item Surcharge</div>
                            <div className="text-body-sm text-on_surface_variant">Logistics Complexity Fee</div>
                          </td>
                          <td className="px-lg py-md">
                            <div className="flex gap-2 flex-wrap">
                              <span className="bg-surface_variant px-2 py-1 rounded text-[12px] font-medium">Weight &gt; 20kg</span>
                            </div>
                          </td>
                          <td className="px-lg py-md">
                            <span className="text-secondary font-bold">Add $15.00</span>
                          </td>
                          <td className="px-lg py-md text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              Active
                            </span>
                          </td>
                          <td className="px-lg py-md text-right">
                            <div className="flex justify-end gap-1">
                              <button className="p-2 hover:bg-surface_variant rounded-lg transition-colors text-on_surface_variant" title="Edit">
                                <span className="material-symbols-outlined text-[18px]" data-icon="edit">edit</span>
                              </button>
                              <button className="p-2 hover:bg-surface_variant rounded-lg transition-colors text-on_surface_variant" title="Duplicate">
                                <span className="material-symbols-outlined text-[18px]" data-icon="content_copy">content_copy</span>
                              </button>
                              <button className="p-2 hover:bg-error_container hover:text-error rounded-lg transition-colors text-on_surface_variant" title="Delete">
                                <span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
              
              {/*  Right Column: Conflicts & Logs Sidebar  */}
              <SellerSidebar />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
