import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";
import { useLanguage } from "../../context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  const [popularProducts, setPopularProducts] = useState([]);
  const [featuredStores, setFeaturedStores] = useState([]);

  useEffect(() => {
    // 1. Fetch popular products
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("API response not OK");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const activeProducts = data.filter(
            (p) => p.store && p.store.status === "active" && !p.store.isHidden,
          );
          const sorted = activeProducts.sort(
            (a, b) => (b.rating || 0) - (a.rating || 0),
          );
          setPopularProducts(sorted.slice(0, 4));
        }
      })
      .catch((err) =>
        console.error(
          "Backend API unreachable for popular products:",
          err.message,
        ),
      );

    // 2. Fetch featured stores
    fetch("http://localhost:5000/api/stores")
      .then((res) => {
        if (!res.ok) throw new Error("API response not OK");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const activeStores = data.filter(
            (s) => s.status === "active" && !s.isHidden,
          );
          const sorted = activeStores.sort(
            (a, b) => (b.rating || 0) - (a.rating || 0),
          );
          setFeaturedStores(sorted.slice(0, 3));
        }
      })
      .catch((err) =>
        console.error(
          "Backend API unreachable for featured stores:",
          err.message,
        ),
      );
  }, []);

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on-surface">
          {/*  TopNavBar  */}
          <CustomerNavbar />
          {/*  Hero Section  */}
          <section className="relative overflow-hidden bg-surface py-xxl">
            <div className="max-w-[1440px] mx-auto px-margin-desktop grid md:grid-cols-2 gap-xl items-center">
              <div className="z-10 animate-slide-in-up">
                <h1 className="text-h1-mobile md:text-h1 font-h1 text-on-background mb-md">
                  {t("heroTitle")}
                </h1>
                <p className="text-body-lg font-body-lg text-on-surface-variant mb-xl max-w-lg">
                  {t("heroSubtitle")}
                </p>
                <div className="flex flex-wrap gap-md">
                  <Link
                    to="/marketplace"
                    className="bg-primary text-on-primary px-xl py-md rounded-lg font-label-md text-label-md shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95 inline-block text-center"
                  >
                    {t("startShopping")}
                  </Link>
                  <Link
                    to="/registration"
                    className="bg-surface-container-high text-primary border border-primary px-xl py-md rounded-lg font-label-md text-label-md hover:bg-surface-container-highest transition-all active:scale-95 inline-block text-center"
                  >
                    {t("becomeSeller")}
                  </Link>
                </div>
              </div>
              <div className="relative group animate-fade-in">
                <div className="absolute -inset-4 bg-primary-container opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
                <img
                  className="relative w-full h-[500px] object-cover rounded-xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                  data-alt="A clean, minimalist high-end retail interior featuring a sustainable clothing boutique. The lighting is soft and natural, emphasizing textures of organic fabrics. In the background, modern technology interfaces represent the digital marketplace aspect. The overall mood is sophisticated, professional, and reliable, using a palette of greens, soft greys, and crisp whites."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8pZrfb9GvgGkuQe28u3Be1z-_rz2J6OWSCCyBk_x0_JWdMfktjGrKH-CCC7zkh-2GRQMTMrVdxxdV5J49HNoRC7Zfa_Z25LRewiY8g43Sx7-hhtB6YxSo4nMr1mAcb5eSDNSs4SaQKIJoY5DufGMnfBwZpcZh6kCuMbzyUmZldZGfeObKoEp43UgnpZUbCCP33TIAtIaqJ1t5CD5lqvSWh6alUuJ7XlA36Fd3t4c9IESguAIdB7rmN4lGTZbTTol29JEBk5s1VOwx"
                />
              </div>
            </div>
          </section>
          {/*  Quote / Slogan Section  */}
          <section className="py-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-b border-outline-variant select-none">
            <div className="max-w-[1440px] mx-auto px-margin-desktop text-center">
              <div className="max-w-3xl mx-auto flex flex-col items-center gap-sm">
                <span className="material-symbols-outlined text-[48px] text-primary animate-pulse">
                  format_quote
                </span>
                <h2 className="text-h3 md:text-h2 font-h2 text-on-background italic leading-tight max-w-2xl font-serif">
                  "{t("slogan")}"
                </h2>
                <p className="text-label-md font-label-md text-primary tracking-widest uppercase mt-xs">
                  {t("manifestoSub")}
                </p>
              </div>
            </div>
          </section>
          {/*  Quick Links Navigation  */}
          <section className="py-xl bg-surface border-b border-outline-variant">
            <div className="max-w-[1440px] mx-auto px-margin-desktop">
              <h2 className="text-h3 font-h3 text-on-surface mb-lg text-center">
                {t("exploreTitle")}
              </h2>
              <div className="flex flex-wrap gap-md justify-center">
                <Link
                  to="/marketplace"
                  className="bg-surface-container-lowest border-2 border-outline-variant hover:border-primary text-on-surface hover:text-primary px-xl py-md rounded-xl font-label-lg transition-all shadow-sm hover:shadow-md flex items-center gap-sm group"
                >
                  <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                    storefront
                  </span>{" "}
                  {t("marketplace")}
                </Link>
                <Link
                  to="/categories"
                  className="bg-surface-container-lowest border-2 border-outline-variant hover:border-primary text-on-surface hover:text-primary px-xl py-md rounded-xl font-label-lg transition-all shadow-sm hover:shadow-md flex items-center gap-sm group"
                >
                  <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                    category
                  </span>{" "}
                  {t("categories")}
                </Link>
                <Link
                  to="/cars"
                  className="bg-surface-container-lowest border-2 border-outline-variant hover:border-primary text-on-surface hover:text-primary px-xl py-md rounded-xl font-label-lg transition-all shadow-sm hover:shadow-md flex items-center gap-sm group"
                >
                  <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                    directions_car
                  </span>{" "}
                  {t("cars")}
                </Link>
                <Link
                  to="/houses"
                  className="bg-surface-container-lowest border-2 border-outline-variant hover:border-primary text-on-surface hover:text-primary px-xl py-md rounded-xl font-label-lg transition-all shadow-sm hover:shadow-md flex items-center gap-sm group"
                >
                  <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                    real_estate_agent
                  </span>{" "}
                  {t("houses")}
                </Link>
                <Link
                  to="/storelist"
                  className="bg-surface-container-lowest border-2 border-outline-variant hover:border-primary text-on-surface hover:text-primary px-xl py-md rounded-xl font-label-lg transition-all shadow-sm hover:shadow-md flex items-center gap-sm group"
                >
                  <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                    store
                  </span>{" "}
                  {t("stores")}
                </Link>
                <Link
                  to="/jobs"
                  className="bg-surface-container-lowest border-2 border-outline-variant hover:border-primary text-on-surface hover:text-primary px-xl py-md rounded-xl font-label-lg transition-all shadow-sm hover:shadow-md flex items-center gap-sm group"
                >
                  <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                    work
                  </span>{" "}
                  {t("jobs")}
                </Link>
                <Link
                  to="/hireme"
                  className="bg-surface-container-lowest border-2 border-outline-variant hover:border-primary text-on-surface hover:text-primary px-xl py-md rounded-xl font-label-lg transition-all shadow-sm hover:shadow-md flex items-center gap-sm group"
                >
                  <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                    handyman
                  </span>{" "}
                  {t("hireMe")}
                </Link>
                <Link
                  to="/services"
                  className="bg-surface-container-lowest border-2 border-outline-variant hover:border-primary text-on-surface hover:text-primary px-xl py-md rounded-xl font-label-lg transition-all shadow-sm hover:shadow-md flex items-center gap-sm group"
                >
                  <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                    design_services
                  </span>{" "}
                  {t("services")}
                </Link>
              </div>
            </div>
          </section>

          {/*  Featured Categories Grid (Bento Style)  */}
          <section className="py-xxl bg-surface-container-low">
            <div className="max-w-[1440px] mx-auto px-margin-desktop">
              <div className="flex justify-between items-end mb-xl">
                <div>
                  <h2 className="text-h2-mobile md:text-h2 font-h2 text-on-surface">
                    {t("browseCategory")}
                  </h2>
                  <p className="text-body-md font-body-md text-on-surface-variant">
                    {t("findLookingFor")}
                  </p>
                </div>
                <a
                  className="text-primary font-label-md text-label-md hover:underline flex items-center gap-xs"
                  href="#"
                >
                  {t("viewAll")}{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-md h-[1000px] md:h-[600px]">
                <Link
                  to="/marketplace"
                  className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 block animate-slide-in-up"
                >
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    data-alt="A premium boutique display showcasing high-quality sustainable fashion."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWMhQyngzRqektIbgYx0zkk5Z8hHa4gOOAFPnlVSZnfIVOfZ57vkzbCiLdkO6ZpqmFTmlBL7LrA85DscUCs4ZTZOQEh-qGoTdYd3pdqZ--1llwE_qjLf4Ai-i7ebsCEFoCRW1GvuV9pBDkTgWi4mhK97SgiTPOVpZfai5iKsm5RIvUQAY4m4kr6Zh1dEhDVLbHp-_kt-hth_hjE7bVYbmFwWUCVw_Wk0bl8Zxutv9N0Jpz8K4nSRzPE02C3eEA8q5YyCqgj3F3w6nG"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-lg">
                    <span className="bg-primary text-on-primary text-[10px] uppercase tracking-widest px-sm py-xs rounded w-fit mb-xs">
                      {t("viewAll")}
                    </span>
                    <h3 className="text-h3 font-h3 text-white">
                      {t("marketplace")}
                    </h3>
                  </div>
                </Link>
                <Link
                  to="/cars"
                  className="relative group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 block animate-slide-in-up"
                >
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    data-alt="A luxury electric car parked in a modern architectural setting."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm6O7X62YSzBzldRAn_llUVJRIb-ACYhOhEFHVc7kjYdDVbC71dm4UCGk_DcNL19fBecMQaEu_tPWtnDrUlcnKM7zfxo3EggX2W33Tt01Jusb48HR4HWkCVpK8E3IrR9z7WT7wXHgxUHwkWoiiYWI0DR_blWewj_OdpnDlNp0dpUxwol30-WJKuvtPuVK67vyXrnb1JPYp8UmKuxIF5R4YrXU877p-hb-XQbrRkOzcmc0XI4EFfJvdYz7esRWXEg1C7FH_g4uYClYT"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-md">
                    <h3 className="text-h4 font-h4 text-white">{t("cars")}</h3>
                  </div>
                </Link>
                <Link
                  to="/houses"
                  className="relative group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 block animate-slide-in-up"
                >
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    data-alt="Minimalist modern furniture set in a bright, airy living room."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuADlP4QlqLMhefnS-hI53D2jZQy5gpRg7rWXQp28pRS2SV-WNSCvEZKQRCAM_gEnCcZmn0nyce7jlo5S84ioJjxyfX_y7SQq5IDSuOvlROHprWZptLVvIbi-WQT7eiLeUSRhpxNEEm2TbyeVPpI_N4fV39wwcBYcl0xPkQk1mqZDrDO1yjNRmkVIo3cLFfpqbuFJ9aX_3xMf2_nbTSuDOks0FfjowAEFBP5v6ptxnfaQA0_MScelAXq_KIs9x3C_ofnqdA5HxsBY81y"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-md">
                    <h3 className="text-h4 font-h4 text-white">
                      {t("houses")}
                    </h3>
                  </div>
                </Link>
                <Link
                  to="/jobs"
                  className="relative group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 block animate-slide-in-up"
                >
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    data-alt="Modern collaborative workspace."
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-md">
                    <h3 className="text-h4 font-h4 text-white">{t("jobs")}</h3>
                  </div>
                </Link>
                <Link
                  to="/services"
                  className="relative group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 block animate-slide-in-up"
                >
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    data-alt="Professional working in an office."
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-md">
                    <h3 className="text-h4 font-h4 text-white">
                      {t("services")}
                    </h3>
                  </div>
                </Link>
              </div>
            </div>
          </section>
          {/*  Popular Products  */}
          <section className="py-xxl">
            <div className="max-w-[1440px] mx-auto px-margin-desktop">
              <h2 className="text-h2-mobile md:text-h2 font-h2 text-on-surface mb-xl text-center">
                {t("popularMarketplace")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
                {popularProducts.map((product) => {
                  const categoryLabel = product.categoryName
                    ? t(product.categoryName)
                    : product.tag || product.store?.category || "Artisan";

                  return (
                    <Link
                      key={product._id || product.id}
                      to="/productdetail"
                      className="block group bg-surface-container-lowest rounded-xl border border-outline-variant hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:-translate-y-1.5 animate-slide-in-up"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-t-xl">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt={product.name}
                          src={product.image}
                        />
                        <button
                          className="absolute top-sm right-sm bg-white/80 backdrop-blur-sm p-xs rounded-full shadow-sm hover:bg-primary hover:text-on-primary transition-colors"
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className="material-symbols-outlined text-md">
                            favorite
                          </span>
                        </button>
                      </div>
                      <div className="p-md">
                        <p className="text-label-sm font-label-sm text-primary mb-xs">
                          {categoryLabel}
                        </p>
                        <h3 className="text-body-md font-body-md font-semibold text-on-surface mb-xs truncate">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-xs mb-sm">
                          <span
                            className="material-symbols-outlined text-[14px] text-on-tertiary-container"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            location_on
                          </span>
                          <span className="text-label-sm font-label-sm text-on-surface-variant">
                            {product.store?.location || "Addis Ababa"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-h4 font-h4 text-on-surface">
                            ${product.price?.toFixed(2)}
                          </span>
                          <span className="text-label-sm font-label-sm text-on-surface-variant">
                            {product.store?.name || "Unknown Store"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/*  Popular Vehicles  */}
          <section className="py-xxl bg-surface-container-lowest">
            <div className="max-w-[1440px] mx-auto px-margin-desktop">
              <h2 className="text-h2-mobile md:text-h2 font-h2 text-on-surface mb-xl text-center">
                {t("popularVehicles")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
                {/* Car 1 */}
                <Link
                  to="/productdetail"
                  className="block group bg-surface rounded-xl border border-outline-variant hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden rounded-t-xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    />
                  </div>
                  <div className="p-md">
                    <p className="text-label-sm font-label-sm text-primary mb-xs">
                      SUV
                    </p>
                    <h3 className="text-body-md font-body-md font-semibold text-on-surface mb-xs truncate">
                      2023 Tesla Model Y
                    </h3>
                    <div className="flex items-center gap-xs mb-sm">
                      <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">
                        location_on
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Los Angeles, CA
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-h4 font-h4 text-on-surface">
                        $45,000
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        AutoElite
                      </span>
                    </div>
                  </div>
                </Link>
                {/* Car 2 */}
                <Link
                  to="/productdetail"
                  className="block group bg-surface rounded-xl border border-outline-variant hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden rounded-t-xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    />
                  </div>
                  <div className="p-md">
                    <p className="text-label-sm font-label-sm text-primary mb-xs">
                      Sedan
                    </p>
                    <h3 className="text-body-md font-body-md font-semibold text-on-surface mb-xs truncate">
                      2021 BMW 3 Series
                    </h3>
                    <div className="flex items-center gap-xs mb-sm">
                      <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">
                        location_on
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Berlin, DE
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-h4 font-h4 text-on-surface">
                        $32,500
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Motors Hub
                      </span>
                    </div>
                  </div>
                </Link>
                {/* Car 3 */}
                <Link
                  to="/productdetail"
                  className="block group bg-surface rounded-xl border border-outline-variant hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden rounded-t-xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    />
                  </div>
                  <div className="p-md">
                    <p className="text-label-sm font-label-sm text-primary mb-xs">
                      Coupe
                    </p>
                    <h3 className="text-body-md font-body-md font-semibold text-on-surface mb-xs truncate">
                      2022 Ford Mustang
                    </h3>
                    <div className="flex items-center gap-xs mb-sm">
                      <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">
                        location_on
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Miami, FL
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-h4 font-h4 text-on-surface">
                        $28,900
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Sunshine Auto
                      </span>
                    </div>
                  </div>
                </Link>
                {/* Car 4 */}
                <Link
                  to="/productdetail"
                  className="block group bg-surface rounded-xl border border-outline-variant hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden rounded-t-xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1503375865971-ce4206e98031?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    />
                  </div>
                  <div className="p-md">
                    <p className="text-label-sm font-label-sm text-primary mb-xs">
                      Sports
                    </p>
                    <h3 className="text-body-md font-body-md font-semibold text-on-surface mb-xs truncate">
                      Porsche 911 Carrera
                    </h3>
                    <div className="flex items-center gap-xs mb-sm">
                      <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">
                        location_on
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        London, UK
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-h4 font-h4 text-on-surface">
                        $115,000
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Luxury Drives
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/*  Popular Real Estate  */}
          <section className="py-xxl">
            <div className="max-w-[1440px] mx-auto px-margin-desktop">
              <h2 className="text-h2-mobile md:text-h2 font-h2 text-on-surface mb-xl text-center">
                {t("popularRealEstate")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
                {/* House 1 */}
                <Link
                  to="/productdetail"
                  className="block group bg-surface-container-lowest rounded-xl border border-outline-variant hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-square overflow-hidden rounded-t-xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    />
                  </div>
                  <div className="p-md">
                    <p className="text-label-sm font-label-sm text-primary mb-xs">
                      Single Family
                    </p>
                    <h3 className="text-body-md font-body-md font-semibold text-on-surface mb-xs truncate">
                      Modern Villa with Pool
                    </h3>
                    <div className="flex items-center gap-xs mb-sm">
                      <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">
                        location_on
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Beverly Hills, CA
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-h4 font-h4 text-on-surface">
                        $2.5M
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        3 Bed, 3 Bath
                      </span>
                    </div>
                  </div>
                </Link>
                {/* House 2 */}
                <Link
                  to="/productdetail"
                  className="block group bg-surface-container-lowest rounded-xl border border-outline-variant hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-square overflow-hidden rounded-t-xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    />
                  </div>
                  <div className="p-md">
                    <p className="text-label-sm font-label-sm text-primary mb-xs">
                      Apartment
                    </p>
                    <h3 className="text-body-md font-body-md font-semibold text-on-surface mb-xs truncate">
                      Downtown Luxury Penthouse
                    </h3>
                    <div className="flex items-center gap-xs mb-sm">
                      <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">
                        location_on
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        New York, NY
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-h4 font-h4 text-on-surface">
                        $5k/mo
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        2 Bed, 2 Bath
                      </span>
                    </div>
                  </div>
                </Link>
                {/* House 3 */}
                <Link
                  to="/productdetail"
                  className="block group bg-surface-container-lowest rounded-xl border border-outline-variant hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-square overflow-hidden rounded-t-xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    />
                  </div>
                  <div className="p-md">
                    <p className="text-label-sm font-label-sm text-primary mb-xs">
                      Townhouse
                    </p>
                    <h3 className="text-body-md font-body-md font-semibold text-on-surface mb-xs truncate">
                      Cozy Suburban Home
                    </h3>
                    <div className="flex items-center gap-xs mb-sm">
                      <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">
                        location_on
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Austin, TX
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-h4 font-h4 text-on-surface">
                        $450k
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        4 Bed, 2.5 Bath
                      </span>
                    </div>
                  </div>
                </Link>
                {/* House 4 */}
                <Link
                  to="/productdetail"
                  className="block group bg-surface-container-lowest rounded-xl border border-outline-variant hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-square overflow-hidden rounded-t-xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1502672260266-1c1e5240980c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    />
                  </div>
                  <div className="p-md">
                    <p className="text-label-sm font-label-sm text-primary mb-xs">
                      Condo
                    </p>
                    <h3 className="text-body-md font-body-md font-semibold text-on-surface mb-xs truncate">
                      Oceanfront Condo
                    </h3>
                    <div className="flex items-center gap-xs mb-sm">
                      <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">
                        location_on
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Miami, FL
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-h4 font-h4 text-on-surface">
                        $850k
                      </span>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        1 Bed, 1 Bath
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/*  Popular Jobs  */}
          <section className="py-xxl bg-surface-container-lowest">
            <div className="max-w-[1440px] mx-auto px-margin-desktop">
              <h2 className="text-h2-mobile md:text-h2 font-h2 text-on-surface mb-xl text-center">
                {t("popularJobs")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
                {/* Job 1 */}
                <Link
                  to="/jobs"
                  className="block group bg-surface rounded-xl border border-outline-variant p-lg hover:border-primary transition-all hover:shadow-md"
                >
                  <div className="flex items-start gap-md mb-md">
                    <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">
                        computer
                      </span>
                    </div>
                    <div>
                      <h3 className="text-h4 font-h4 text-on-surface leading-tight">
                        Senior React Developer
                      </h3>
                      <p className="text-label-sm font-label-sm text-primary">
                        TechNova Solutions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-xs mb-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">
                      location_on
                    </span>
                    <span className="text-label-sm font-label-sm">
                      Remote, Global
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-xs mb-lg">
                    <span className="px-xs py-1 bg-surface-container-high rounded text-[10px] uppercase tracking-wider font-bold">
                      Full-Time
                    </span>
                    <span className="px-xs py-1 bg-surface-container-high rounded text-[10px] uppercase tracking-wider font-bold">
                      $120k - $150k
                    </span>
                  </div>
                  <button className="w-full py-2 border border-outline-variant rounded-lg font-label-sm hover:bg-surface-container-high transition-colors text-on-surface">
                    {t("viewDetails")}
                  </button>
                </Link>
                {/* Job 2 */}
                <Link
                  to="/jobs"
                  className="block group bg-surface rounded-xl border border-outline-variant p-lg hover:border-primary transition-all hover:shadow-md"
                >
                  <div className="flex items-start gap-md mb-md">
                    <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">
                        design_services
                      </span>
                    </div>
                    <div>
                      <h3 className="text-h4 font-h4 text-on-surface leading-tight">
                        UI/UX Product Designer
                      </h3>
                      <p className="text-label-sm font-label-sm text-primary">
                        CreativePulse
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-xs mb-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">
                      location_on
                    </span>
                    <span className="text-label-sm font-label-sm">
                      London, UK / Hybrid
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-xs mb-lg">
                    <span className="px-xs py-1 bg-surface-container-high rounded text-[10px] uppercase tracking-wider font-bold">
                      Contract
                    </span>
                    <span className="px-xs py-1 bg-surface-container-high rounded text-[10px] uppercase tracking-wider font-bold">
                      £400/day
                    </span>
                  </div>
                  <button className="w-full py-2 border border-outline-variant rounded-lg font-label-sm hover:bg-surface-container-high transition-colors text-on-surface">
                    {t("viewDetails")}
                  </button>
                </Link>
                {/* Job 3 */}
                <Link
                  to="/jobs"
                  className="block group bg-surface rounded-xl border border-outline-variant p-lg hover:border-primary transition-all hover:shadow-md"
                >
                  <div className="flex items-start gap-md mb-md">
                    <div className="w-12 h-12 bg-tertiary-container text-on-tertiary-container rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">
                        campaign
                      </span>
                    </div>
                    <div>
                      <h3 className="text-h4 font-h4 text-on-surface leading-tight">
                        Marketing Manager
                      </h3>
                      <p className="text-label-sm font-label-sm text-primary">
                        GrowthHackers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-xs mb-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">
                      location_on
                    </span>
                    <span className="text-label-sm font-label-sm">
                      New York, NY
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-xs mb-lg">
                    <span className="px-xs py-1 bg-surface-container-high rounded text-[10px] uppercase tracking-wider font-bold">
                      Full-Time
                    </span>
                    <span className="px-xs py-1 bg-surface-container-high rounded text-[10px] uppercase tracking-wider font-bold">
                      $90k - $110k
                    </span>
                  </div>
                  <button className="w-full py-2 border border-outline-variant rounded-lg font-label-sm hover:bg-surface-container-high transition-colors text-on-surface">
                    {t("viewDetails")}
                  </button>
                </Link>
                {/* Job 4 */}
                <Link
                  to="/jobs"
                  className="block group bg-surface rounded-xl border border-outline-variant p-lg hover:border-primary transition-all hover:shadow-md"
                >
                  <div className="flex items-start gap-md mb-md">
                    <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">
                        support_agent
                      </span>
                    </div>
                    <div>
                      <h3 className="text-h4 font-h4 text-on-surface leading-tight">
                        Customer Success Rep
                      </h3>
                      <p className="text-label-sm font-label-sm text-primary">
                        ServiceFirst
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-xs mb-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">
                      location_on
                    </span>
                    <span className="text-label-sm font-label-sm">
                      Remote, US
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-xs mb-lg">
                    <span className="px-xs py-1 bg-surface-container-high rounded text-[10px] uppercase tracking-wider font-bold">
                      Part-Time
                    </span>
                    <span className="px-xs py-1 bg-surface-container-high rounded text-[10px] uppercase tracking-wider font-bold">
                      $25/hr
                    </span>
                  </div>
                  <button className="w-full py-2 border border-outline-variant rounded-lg font-label-sm hover:bg-surface-container-high transition-colors text-on-surface">
                    {t("viewDetails")}
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/*  Popular Professionals  */}
          <section className="py-xxl">
            <div className="max-w-[1440px] mx-auto px-margin-desktop">
              <h2 className="text-h2-mobile md:text-h2 font-h2 text-on-surface mb-xl text-center">
                {t("featuredProfessionals")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
                {/* Pro 1 */}
                <Link
                  to="/hireme"
                  className="block bg-surface-container-lowest rounded-xl border border-outline-variant p-lg text-center hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-md border-4 border-surface-container-high">
                    <img
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    />
                  </div>
                  <h3 className="text-h4 font-h4 text-on-surface">
                    Sarah Jenkins
                  </h3>
                  <p className="text-label-sm font-label-sm text-primary mb-sm">
                    Certified Accountant
                  </p>
                  <div className="flex items-center justify-center gap-xs mb-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      star
                    </span>
                    <span className="font-bold">4.9</span>
                    <span className="text-label-sm">(124 reviews)</span>
                  </div>
                  <button className="w-full py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:opacity-90 transition-colors">
                    {t("bookService")}
                  </button>
                </Link>
                {/* Pro 2 */}
                <Link
                  to="/hireme"
                  className="block bg-surface-container-lowest rounded-xl border border-outline-variant p-lg text-center hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-md border-4 border-surface-container-high">
                    <img
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    />
                  </div>
                  <h3 className="text-h4 font-h4 text-on-surface">
                    David Chen
                  </h3>
                  <p className="text-label-sm font-label-sm text-primary mb-sm">
                    Legal Consultant
                  </p>
                  <div className="flex items-center justify-center gap-xs mb-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      star
                    </span>
                    <span className="font-bold">4.8</span>
                    <span className="text-label-sm">(89 reviews)</span>
                  </div>
                  <button className="w-full py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:opacity-90 transition-colors">
                    {t("bookService")}
                  </button>
                </Link>
                {/* Pro 3 */}
                <Link
                  to="/hireme"
                  className="block bg-surface-container-lowest rounded-xl border border-outline-variant p-lg text-center hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-md border-4 border-surface-container-high">
                    <img
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    />
                  </div>
                  <h3 className="text-h4 font-h4 text-on-surface">
                    Maria Rossi
                  </h3>
                  <p className="text-label-sm font-label-sm text-primary mb-sm">
                    Interior Designer
                  </p>
                  <div className="flex items-center justify-center gap-xs mb-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      star
                    </span>
                    <span className="font-bold">5.0</span>
                    <span className="text-label-sm">(210 reviews)</span>
                  </div>
                  <button className="w-full py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:opacity-90 transition-colors">
                    {t("bookService")}
                  </button>
                </Link>
                {/* Pro 4 */}
                <Link
                  to="/hireme"
                  className="block bg-surface-container-lowest rounded-xl border border-outline-variant p-lg text-center hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-md border-4 border-surface-container-high">
                    <img
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    />
                  </div>
                  <h3 className="text-h4 font-h4 text-on-surface">
                    James Wilson
                  </h3>
                  <p className="text-label-sm font-label-sm text-primary mb-sm">
                    Master Plumber
                  </p>
                  <div className="flex items-center justify-center gap-xs mb-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      star
                    </span>
                    <span className="font-bold">4.9</span>
                    <span className="text-label-sm">(430 reviews)</span>
                  </div>
                  <button className="w-full py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:opacity-90 transition-colors">
                    {t("bookService")}
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/*  Featured Stores  */}
          <section className="py-xxl bg-surface-container-low">
            <div className="max-w-[1440px] mx-auto px-margin-desktop">
              <h2 className="text-h2-mobile md:text-h2 font-h2 text-on-surface mb-xl">
                {t("verifiedFeaturedStores")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                {featuredStores.map((store) => {
                  const hasLogo = !!store.logo;
                  const reviewsStr =
                    store.reviewsCount >= 1000
                      ? (store.reviewsCount / 1000)
                          .toFixed(1)
                          .replace(".0", "") + "k"
                      : store.reviewsCount || 0;

                  return (
                    <Link
                      key={store._id || store.id}
                      to={`/storedetail?id=${store.id}`}
                      className="block bg-surface rounded-xl p-lg flex items-center gap-md border border-outline-variant hover:border-primary transition-colors cursor-pointer group"
                    >
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-surface-container-high group-hover:border-primary transition-colors flex items-center justify-center shrink-0">
                        {hasLogo ? (
                          <img
                            className="w-full h-full object-cover"
                            alt={store.name}
                            src={store.logo}
                          />
                        ) : (
                          <div
                            className={`w-full h-full flex items-center justify-center text-white rounded-full ${store.logoBg || "bg-primary"}`}
                          >
                            <span className="material-symbols-outlined text-[32px]">
                              {store.logoIcon || "store"}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-h4 font-h4 text-on-surface">
                          {store.name}
                        </h4>
                        <p className="text-body-sm font-body-sm text-on-surface-variant mb-xs line-clamp-1">
                          {store.description || store.category}
                        </p>
                        <div className="flex items-center gap-base">
                          <span
                            className="material-symbols-outlined text-primary text-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span className="text-label-sm font-label-sm font-bold">
                            {(store.rating || 5.0).toFixed(1)}
                          </span>
                          <span className="text-label-sm font-label-sm text-on-surface-variant">
                            ({reviewsStr} reviews)
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
          {/*  How It Works  */}
          <section className="py-xxl">
            <div className="max-w-[1440px] mx-auto px-margin-desktop">
              <div className="text-center mb-xl">
                <h2 className="text-h2-mobile md:text-h2 font-h2 text-on-surface">
                  {t("howItWorks")}
                </h2>
                <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl mx-auto">
                  {t("howItWorksDesc")}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-xl">
                <div className="text-center px-lg">
                  <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-md">
                    <span className="material-symbols-outlined text-h3">
                      search
                    </span>
                  </div>
                  <h3 className="text-h4 font-h4 mb-sm">{t("stepDiscover")}</h3>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">
                    {t("stepDiscoverDesc")}
                  </p>
                </div>
                <div className="text-center px-lg">
                  <div className="w-16 h-16 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mx-auto mb-md">
                    <span className="material-symbols-outlined text-h3">
                      payments
                    </span>
                  </div>
                  <h3 className="text-h4 font-h4 mb-sm">{t("stepSecure")}</h3>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">
                    {t("stepSecureDesc")}
                  </p>
                </div>
                <div className="text-center px-lg">
                  <div className="w-16 h-16 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center mx-auto mb-md">
                    <span className="material-symbols-outlined text-h3">
                      local_shipping
                    </span>
                  </div>
                  <h3 className="text-h4 font-h4 mb-sm">{t("stepDelivery")}</h3>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">
                    {t("stepDeliveryDesc")}
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/*  Trust Section  */}
          <section className="py-xl border-y border-outline-variant bg-surface-container-lowest">
            <div className="max-w-[1440px] mx-auto px-margin-desktop">
              <div className="flex flex-wrap justify-center md:justify-between items-center gap-xl">
                <div className="flex items-center gap-md">
                  <span className="material-symbols-outlined text-primary text-[40px]">
                    verified_user
                  </span>
                  <div>
                    <h4 className="font-label-md text-label-md">
                      {t("verifiedSellers")}
                    </h4>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">
                      {t("verifiedSellersDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-md">
                  <span className="material-symbols-outlined text-primary text-[40px]">
                    lock
                  </span>
                  <div>
                    <h4 className="font-label-md text-label-md">
                      {t("securePayments")}
                    </h4>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">
                      {t("securePaymentsDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-md">
                  <span className="material-symbols-outlined text-primary text-[40px]">
                    support_agent
                  </span>
                  <div>
                    <h4 className="font-label-md text-label-md">
                      {t("support247")}
                    </h4>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">
                      {t("support247Desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*  Footer  */}
          <CustomerFooter />
          {/*  FAB for Quick Search (Mobile Only)  */}
          <button className="md:hidden fixed bottom-md right-md bg-primary text-on-primary w-14 h-14 rounded-full shadow-xl flex items-center justify-center active:scale-95 z-50">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
    </>
  );
}
