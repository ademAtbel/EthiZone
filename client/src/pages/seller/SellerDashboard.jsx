import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import SellerSidebar from "../../components/SellerSidebar";
import SellerNavbar from "../../components/SellerNavbar";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

const PRESEEDED_STORE_SLUGS = [
  'addis-boutique',
  'ayat-furniture',
  'mobile-plus',
  'bio-essence',
  'ethio-electronics',
  'urban-trend',
  'classic-wear',
  'timepiece-gh',
  'artisan-collective',
  'techport-global',
  'zenith-services',
  'ecothreads',
  'ecohome-decor'
];

export default function SellerDashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { storeSlug } = useParams();
  const slug = storeSlug || user?.storeSlug || 'my-store';
  const sellerPath = (page) => `/seller/${slug}/${page}`;
  
  const isPreseeded = PRESEEDED_STORE_SLUGS.includes(slug);

  return (
    <>
      <div lang="en">
        <div className="bg-background text-on_background selection:bg-secondary_container min-h-screen">
          {/*  Sidebar Navigation Shell  */}
          <SellerSidebar />

          {/*  Main Content Canvas  */}
          <main className="md:ml-64 min-h-screen flex flex-col">
            {/* Unified Seller Header */}
            <SellerNavbar title={t("dashboardOverview")} />

            <div className="pt-6 pb-28 px-gutter-mobile max-w-4xl mx-auto space-y-stack-lg p-margin-desktop w-full">
              {/*  Welcome Section  */}
              <section>
                <p className="text-label-lg font-label-lg text-secondary">
                  {t("goodMorning")}, {user?.storeName || user?.name || 'Your Store'}
                </p>
                <h2 className="text-headline-lg font-headline-lg mt-1 text-on_surface">
                  {t("dashboardOverview")}
                </h2>
              </section>

              {/*  Quick Actions  */}
              <section className="grid grid-cols-2 gap-stack-md">
                <button
                  onClick={() => navigate(sellerPath('addproduct'))}
                  className="flex items-center justify-center gap-2 bg-primary text-on_primary py-4 px-4 rounded-xl font-label-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined">add_box</span>
                  {t("addProduct")}
                </button>
                <button
                  onClick={() =>
                    window.open(`/storedetail?id=${slug}`, "_blank")
                  }
                  className="flex items-center justify-center gap-2 bg-surface_container_high text-on_surface py-4 px-4 rounded-xl font-label-lg hover:bg-surface_container_highest active:scale-95 transition-all border border-outline_variant cursor-pointer"
                >
                  <span className="material-symbols-outlined">storefront</span>
                  {t("viewShop")}
                </button>
              </section>

              {/*  Performance Stats Bento  */}
              <section className="grid grid-cols-2 gap-stack-md">
                <div className="col-span-2 bg-surface_container_lowest p-stack-md rounded-xl border border-outline_variant">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-label-sm font-label-sm text-on_surface_variant uppercase tracking-wider">
                        {t("totalSales")}
                      </p>
                      <h3 className="text-headline-lg font-headline-lg text-primary">
                        {isPreseeded ? "$4,280.50" : "$0.00"}
                      </h3>
                    </div>
                    {isPreseeded && (
                      <span className="bg-secondary_container text-on_secondary_container text-label-sm font-label-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          trending_up
                        </span>{" "}
                        12%
                      </span>
                    )}
                  </div>
                  {/*  Mini Chart Visualization  */}
                  <div className="h-24 w-full flex items-center justify-center mt-2">
                    {isPreseeded ? (
                      <div className="h-24 w-full flex items-end gap-1">
                        <div className="bg-primary/20 w-full h-[40%] rounded-t-sm"></div>
                        <div className="bg-primary/30 w-full h-[60%] rounded-t-sm"></div>
                        <div className="bg-primary/40 w-full h-[55%] rounded-t-sm"></div>
                        <div className="bg-primary/60 w-full h-[80%] rounded-t-sm"></div>
                        <div className="bg-primary/70 w-full h-[70%] rounded-t-sm"></div>
                        <div className="bg-primary/90 w-full h-[95%] rounded-t-sm"></div>
                        <div className="bg-primary w-full h-[100%] rounded-t-sm"></div>
                      </div>
                    ) : (
                      <p className="text-label-sm text-on_surface_variant italic">No sales data recorded yet</p>
                    )}
                  </div>
                </div>
                <div className="bg-surface_container_lowest p-stack-md rounded-xl border border-outline_variant">
                  <p className="text-label-sm font-label-sm text-on_surface_variant mb-1">
                    {t("orders")}
                  </p>
                  <div className="flex items-end justify-between">
                    <h4 className="text-headline-sm font-headline-sm text-on_surface">
                      {isPreseeded ? "124" : "0"}
                    </h4>
                    {isPreseeded && (
                      <span className="text-secondary text-label-sm font-label-sm">
                        +8
                      </span>
                    )}
                  </div>
                </div>
                <div className="bg-surface_container_lowest p-stack-md rounded-xl border border-outline_variant">
                  <p className="text-label-sm font-label-sm text-on_surface_variant mb-1">
                    {t("visits")}
                  </p>
                  <div className="flex items-end justify-between">
                    <h4 className="text-headline-sm font-headline-sm text-on_surface">
                      {isPreseeded ? "1.8k" : "0"}
                    </h4>
                    {isPreseeded && (
                      <span className="text-secondary text-label-sm font-label-sm">
                        +240
                      </span>
                    )}
                  </div>
                </div>
              </section>

              {/*  Pending Tasks List  */}
              <section>
                <div className="flex justify-between items-center mb-stack-md">
                  <h3 className="text-headline-sm font-headline-sm text-on_surface">
                    {t("pendingTasks")}
                  </h3>
                  {isPreseeded && (
                    <span className="bg-error_container text-on_error_container text-label-sm font-label-sm px-2 py-1 rounded-full">
                      4 {t("urgent")}
                    </span>
                  )}
                </div>
                {isPreseeded ? (
                  <div className="space-y-stack-sm">
                    {/*  Task 1  */}
                    <div className="flex items-center gap-4 bg-surface_container_low p-4 rounded-xl border border-outline_variant hover:bg-surface_container_high transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary_container flex items-center justify-center text-on_primary_container">
                        <span className="material-symbols-outlined">
                          local_shipping
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-label-lg font-label-lg text-on_surface">
                          3 {t("ordersToShip")}
                        </p>
                        <p className="text-body-md font-body-md text-on_surface_variant">
                          {t("deadlineToday")}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-on_surface_variant">
                        chevron_right
                      </span>
                    </div>
                    {/*  Task 2  */}
                    <div className="flex items-center gap-4 bg-surface_container_low p-4 rounded-xl border border-outline_variant hover:bg-surface_container_high transition-colors">
                      <div className="w-10 h-10 rounded-full bg-error_container flex items-center justify-center text-on_error_container">
                        <span className="material-symbols-outlined">warning</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-label-lg font-label-lg text-on_surface">
                          {t("lowStock")}: Bamboo Cutlery
                        </p>
                        <p className="text-body-md font-body-md text-on_surface_variant">
                          {t("only")} 2 {t("unitsRemaining")}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-on_surface_variant">
                        chevron_right
                      </span>
                    </div>
                    {/*  Task 3  */}
                    <div className="flex items-center gap-4 bg-surface_container_low p-4 rounded-xl border border-outline_variant hover:bg-surface_container_high transition-colors">
                      <div className="w-10 h-10 rounded-full bg-tertiary_fixed flex items-center justify-center text-on_tertiary_fixed">
                        <span className="material-symbols-outlined">
                          chat_bubble
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-label-lg font-label-lg text-on_surface">
                          {t("unreadMessage")}
                        </p>
                        <p className="text-body-md font-body-md text-on_surface_variant">
                          {t("inquiryShipping")}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-on_surface_variant">
                        chevron_right
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 bg-surface_container_lowest rounded-xl border border-outline_variant">
                    <span className="material-symbols-outlined text-primary text-[48px] mb-2">done_all</span>
                    <p className="text-body-md font-semibold text-on_surface">All caught up!</p>
                    <p className="text-body-sm text-on_surface_variant">No pending tasks or actions required.</p>
                  </div>
                )}
              </section>

              {/*  Featured Product Insight Card  */}
              <section className="relative overflow-hidden rounded-2xl h-48 group">
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  data-alt="A professional close-up of high-quality sustainable lifestyle products"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC6RXilHVD6rLzNRLd4bsnVz3nciqa6R0cywalvEHpCMIVrizCOMCjP9k8e1MbPoayLuUl_745EKXqZl6vpaOKKb46_iHz2EzuG9u5TgU0maEHM7FZJZcg0-jcQNRPTjxta2RFKyvlgCt8qsID93Evo0U3mGqPiCmzA0g-2F2bU4o0at5phIumt-OauQmi6jJ9CLV4uqKwiCofmeUS2TLPO9KnKtDZvKAsTnwrqQeiJFdHIzQP7U-vGPyvheljzp53CZ47Lk-TEXRa"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on_background/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-gutter-mobile w-full">
                  <span className="text-label-sm font-label-sm bg-secondary text-on_secondary px-2 py-1 rounded-full mb-2 inline-block">
                    {t("proInsight")}
                  </span>
                  <h4 className="text-headline-sm font-headline-sm text-white">
                    {t("insightText")}
                  </h4>
                  <p className="text-body-md font-body-md text-white/80">
                    {t("learnUpgrade")}
                  </p>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
