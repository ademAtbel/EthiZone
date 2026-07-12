import React from 'react';
import SellerSidebar from '../../components/SellerSidebar';
import SellerNavbar from '../../components/SellerNavbar';

export default function ManageOrdersPage() {
  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on_background min-h-screen pb-24">
          {/*  Sidebar Navigation Shell  */}
          <SellerSidebar />
          
          {/*  Main Content Canvas  */}
          <main className="md:ml-64 min-h-screen flex flex-col">
            {/* Unified Seller Header */}
            <SellerNavbar title="Manage Orders" />

            <div className="px-margin-mobile pt-stack-md space-y-stack-lg p-margin-desktop">
              {/*  Search & Filter Section  */}
              <section className="space-y-stack-md">
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" data-icon="search">search</span>
                  <input className="w-full h-touch-target-min pl-10 pr-4 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-body-md" placeholder="Search Order ID or Name" type="text"/>
                </div>
                <div className="flex gap-stack-sm overflow-x-auto no-scrollbar pb-2">
                  <button className="px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container font-label-lg text-label-lg whitespace-nowrap">All Orders</button>
                  <button className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-lg text-label-lg whitespace-nowrap">Pending</button>
                  <button className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-lg text-label-lg whitespace-nowrap">Shipped</button>
                  <button className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-lg text-label-lg whitespace-nowrap">Cancelled</button>
                </div>
              </section>

              {/*  Orders Listing  */}
              <section className="space-y-stack-md">
                <div className="flex justify-between items-center">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Recent Orders</h2>
                  <span className="text-label-sm font-label-sm text-outline">Showing 24 results</span>
                </div>
                <div className="grid gap-stack-md">
                  {/*  Order Card 1  */}
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-stack-sm hover:bg-surface-container-low transition-all">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-label-sm font-label-sm text-outline uppercase">#ETH-92834</span>
                        <h3 className="text-body-lg font-bold text-on-surface">Marcus Holloway</h3>
                      </div>
                      <span className="bg-secondary-container text-on-secondary-container text-label-sm font-label-sm px-2 py-1 rounded">SHIPPED</span>
                    </div>
                    <div className="flex items-center gap-stack-md py-stack-sm">
                      <div className="w-12 h-12 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
                        <img className="w-full h-full object-cover" data-alt="A premium red athletic sneaker" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHDXzN1FA6LJJz-zWMm87kW4uKlIRE-vPzjodFuaXqTQfWVAi6zZcZPI1yd0CNY7KKQ279LAj-RzRYBp5cuoMZjLPmwJKWWoVNrCWVl5jNAF6M1Fk7TBYLP3L0wa0nEfnZppCe0o5GNQ8xpP7swqfG-4u5zupuv1iS_cIxvZU2E72k4rxmpE2UI3cjvuyfJ0aFQlKf3RZdvIMGLxS51SNHU7u74K91k2_zZfyeGDSn9GDxlHaLCkFAdxE2aZvLy2y4H9WUN7Qrq2jt"/>
                      </div>
                      <div className="flex-1">
                        <p className="text-body-md text-on-surface-variant line-clamp-1">Eco-Green Performance Runners x 1</p>
                        <p className="text-label-lg font-label-lg text-primary">$124.00</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-outline-variant">
                      <span className="text-label-sm font-label-sm text-outline">Ordered 2h ago</span>
                      <button className="text-primary font-label-lg text-label-lg flex items-center gap-1">
                        View Details <span className="material-symbols-outlined text-[18px]" data-icon="chevron_right">chevron_right</span>
                      </button>
                    </div>
                  </div>

                  {/*  Order Card 2  */}
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-stack-sm hover:bg-surface-container-low transition-all">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-label-sm font-label-sm text-outline uppercase">#ETH-92831</span>
                        <h3 className="text-body-lg font-bold text-on-surface">Sarah Jenkins</h3>
                      </div>
                      <span className="bg-surface-container-high text-on-surface-variant text-label-sm font-label-sm px-2 py-1 rounded">PENDING</span>
                    </div>
                    <div className="flex items-center gap-stack-md py-stack-sm">
                      <div className="w-12 h-12 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
                        <img className="w-full h-full object-cover" data-alt="A minimalist white designer watch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGZTp9Z2yxJiH4W07o7zwg4Ee8AVqy2XQNRRGdhsKldS1g4QWmWD1p783h62j3Loqp6JsGsIpd1tWlxEE2M3p3Ko5vw9qLRoXTt3OdwUlRVKBErX23mbBkUKp1JOzunqmx4rcbYc-_f2acjeiu7lCqtI_r9KpUHGmHOD_To4tED0F9AF_U2VffHiUddb33Num7QMsH1oxJvOJfDiWTP7QzmiWRSWuP6Wc_WcNwJZqJghy8PeGyrXnPvIkkph8ov9N8AVDTlHbmWMEw"/>
                      </div>
                      <div className="flex-1">
                        <p className="text-body-md text-on-surface-variant line-clamp-1">Minimalist Solar Watch x 2</p>
                        <p className="text-label-lg font-label-lg text-primary">$450.00</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-outline-variant">
                      <span className="text-label-sm font-label-sm text-outline">Ordered 5h ago</span>
                      <button className="text-primary font-label-lg text-label-lg flex items-center gap-1">
                        View Details <span className="material-symbols-outlined text-[18px]" data-icon="chevron_right">chevron_right</span>
                      </button>
                    </div>
                  </div>

                  {/*  Order Card 3 (Cancelled)  */}
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-stack-sm hover:bg-surface-container-low transition-all">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-label-sm font-label-sm text-outline uppercase">#ETH-92828</span>
                        <h3 className="text-body-lg font-bold text-on-surface">Liam O'Connor</h3>
                      </div>
                      <span className="bg-error-container text-on-error-container text-label-sm font-label-sm px-2 py-1 rounded">CANCELLED</span>
                    </div>
                    <div className="flex items-center gap-stack-md py-stack-sm">
                      <div className="w-12 h-12 bg-surface-container rounded-lg overflow-hidden flex-shrink-0 grayscale opacity-50">
                        <img className="w-full h-full object-cover" data-alt="Modern professional studio headphones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1CWZE4MNqrlndS7_Pw-ml11XfcDMEUuJYcnc5okp8PYuHvx_UCygGe4yMOkYCt5eyV0wfx-6ogxGBiotI_WCCIN1bKBZvkTclAKxlZYB-ZbCCgIZtaofdZv2N5uAchONJxYJ_Pcom5w_YwQjSJnSSwWRDaWn6O4bCtiDooxwIaCFN7U_Z17uUph7ggsUke3XNU88-E9bQlqSGkmSYz6CfS0piFAOlUAYFwmEu8fP-CmsQfPwdcM4w-VI2Cd07ujVz4AK0m8f5UNUl"/>
                      </div>
                      <div className="flex-1">
                        <p className="text-body-md text-on-surface-variant line-clamp-1">Noise-Cancelling Studio Set x 1</p>
                        <p className="text-label-lg font-label-lg text-outline">$299.00</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-outline-variant">
                      <span className="text-label-sm font-label-sm text-outline">Cancelled 1d ago</span>
                      <button className="text-primary font-label-lg text-label-lg flex items-center gap-1">
                        View Log <span className="material-symbols-outlined text-[18px]" data-icon="history">history</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
          
          {/*  Floating Action Button (Seller specific for adding listing or quick order entry)  */}
          <button className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:opacity-90 active:scale-90 transition-all z-40">
            <span className="material-symbols-outlined" data-icon="add">add</span>
          </button>
        </div>
      </div>
    </>
  );
}
