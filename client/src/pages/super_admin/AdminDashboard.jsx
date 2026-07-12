import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function AdminDashboard() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-surface text-on-surface min-h-screen pb-24">
{/*  TopAppBar (From JSON)  */}
<header className="fixed top-0 z-50 w-full flex justify-between items-center px-gutter-mobile h-touch-target-min bg-surface dark:bg-surface-dim">
<div className="flex items-center">
<span className="material-symbols-outlined text-primary mr-stack-sm" data-icon="menu">menu</span>
<h1 className="text-headline-md font-headline-md text-primary dark:text-primary-fixed-dim tracking-tight">Ethizone</h1>
</div>
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="notifications">notifications</span>
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center">
<span className="text-on-secondary-fixed text-label-sm font-label-sm">JD</span>
</div>
</div>
</header>
<main className="pt-20 px-gutter-mobile">
{/*  Welcome Header  */}
<div className="mb-stack-lg">
<h2 className="text-headline-lg font-headline-lg text-on-surface">Platform Overview</h2>
<p className="text-body-md font-body-md text-on-surface-variant">Real-time performance and system health.</p>
</div>
{/*  High-Level Metrics: Bento Grid Layout  */}
<section className="grid grid-cols-2 gap-4 mb-stack-lg">
{/*  GMV Metric (Glassmorphism Effect)  */}
<div className="col-span-2 p-stack-md rounded-xl bg-primary/5 border border-outline-variant flex flex-col justify-between">
<div className="flex justify-between items-start">
<span className="text-label-lg font-label-lg text-primary uppercase tracking-wider">Gross Merchandise Value</span>
<span className="material-symbols-outlined text-primary" data-icon="trending_up">trending_up</span>
</div>
<div className="mt-stack-sm">
<div className="text-headline-lg font-headline-lg text-on-surface">$2,481,200</div>
<div className="text-label-sm font-label-sm text-primary">+12.4% from last month</div>
</div>
</div>
{/*  New Users Card  */}
<div className="p-stack-md rounded-xl bg-surface-container border border-outline-variant">
<span className="material-symbols-outlined text-secondary mb-stack-sm" data-icon="person_add">person_add</span>
<div className="text-label-sm font-label-sm text-on-surface-variant">New Users</div>
<div className="text-headline-md font-headline-md text-on-surface">14.2k</div>
</div>
{/*  Active Sellers Card  */}
<div className="p-stack-md rounded-xl bg-surface-container border border-outline-variant">
<span className="material-symbols-outlined text-tertiary mb-stack-sm" data-icon="storefront">storefront</span>
<div className="text-label-sm font-label-sm text-on-surface-variant">Active Sellers</div>
<div className="text-headline-md font-headline-md text-on-surface">3,892</div>
</div>
</section>
{/*  System Health & Logistics Alerts  */}
<section className="space-y-4 mb-stack-lg">
{/*  System Health Status  */}
<div className="p-gutter-mobile rounded-xl bg-on-primary-fixed text-on-primary-container shadow-sm border border-outline/10">
<div className="flex items-center justify-between mb-stack-md">
<h3 className="text-headline-sm font-headline-sm flex items-center gap-2">
<span className="material-symbols-outlined text-secondary-fixed" data-icon="health_and_safety">health_and_safety</span>
            System Health
          </h3>
<span className="px-2 py-1 bg-secondary text-on-secondary text-label-sm font-label-sm rounded-full">Operational</span>
</div>
<div className="grid grid-cols-3 gap-2">
<div className="text-center p-2 rounded bg-white/5">
<div className="text-label-sm text-on-primary-container/70">Latency</div>
<div className="text-label-lg font-label-lg">42ms</div>
</div>
<div className="text-center p-2 rounded bg-white/5">
<div className="text-label-sm text-on-primary-container/70">Uptime</div>
<div className="text-label-lg font-label-lg">99.9%</div>
</div>
<div className="text-center p-2 rounded bg-white/5">
<div className="text-label-sm text-on-primary-container/70">Errors</div>
<div className="text-label-lg font-label-lg">0.02%</div>
</div>
</div>
</div>
{/*  Logistics Alerts Card  */}
<div className="p-gutter-mobile rounded-xl bg-error-container text-on-error-container border border-error/20">
<div className="flex items-center gap-2 mb-stack-sm">
<span className="material-symbols-outlined" data-icon="warning">warning</span>
<h3 className="text-headline-sm font-headline-sm">Logistics Alerts</h3>
</div>
<div className="space-y-3">
<div className="flex justify-between items-center bg-white/20 p-2 rounded-lg">
<span className="text-body-md font-body-md">Port Congestion: Singapore</span>
<span className="material-symbols-outlined text-error" data-icon="priority_high">priority_high</span>
</div>
<div className="flex justify-between items-center bg-white/20 p-2 rounded-lg">
<span className="text-body-md font-body-md">Suez Canal Delay (+48h)</span>
<span className="material-symbols-outlined text-error" data-icon="schedule">schedule</span>
</div>
</div>
</div>
</section>
{/*  Approvals Queue Summary  */}
<section className="mb-stack-lg">
<div className="flex justify-between items-end mb-stack-md">
<h3 className="text-headline-md font-headline-md text-on-surface">Approvals Queue</h3>
<button className="text-primary text-label-lg font-label-lg">View All</button>
</div>
<div className="flex overflow-x-auto gap-4 hide-scrollbar">
{/*  Pending Stores  */}
<div className="flex-shrink-0 w-64 p-stack-md rounded-xl bg-surface-container-high border border-outline-variant flex flex-col">
<div className="flex items-center gap-2 mb-stack-sm">
<span className="p-2 bg-primary-container text-on-primary-container rounded-lg material-symbols-outlined" data-icon="domain_verification">domain_verification</span>
<span className="text-label-lg font-label-lg">Pending Stores</span>
</div>
<div className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">84</div>
<div className="mt-auto flex -space-x-2">
<img className="w-8 h-8 rounded-full border-2 border-surface-container-high" data-alt="Close up portrait of a young professional merchant applicant with a neutral background, captured in soft, natural morning light with a high-end corporate feel. The photography style is clean and crisp, featuring a minimalist aesthetic with muted earth tones and deep greens that align with the brand's sustainable identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk5q33BS7UEHGIlTkv8qLfrMd9v717cKLLDSwXDo13FM1A2udS9pv4R0IbzJckb2EyUgR7iVZKCi6WndqNJFTUGe3F5UhoCpmCh3ZbeWQrRF1K5gG6S2uJX60mhITbxhSk-lZXWwz8GiuSYEQ_bBCpJYQc7f27T34Z_lFnxUiVf8BCUqFaZIqSmVZ6psdnRPT8eK4SabCtjXmK0DDOSiFsq2X_KhkPjuB5LW65InWJ0qgXDK5ZQve0UAW9Bl72yM2Zh6E6C4Lw4spW"/>
<img className="w-8 h-8 rounded-full border-2 border-surface-container-high" data-alt="Portrait of a diverse business owner looking at the camera with confidence, set in a bright modern office with warm lighting. The image emphasizes professional reliability and trust, using a clean composition and a palette of soft whites and deep forest greens to match the modern corporate design language." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOvgLMtIHBf3kif4hiKmcZJO2RQ70TYMAgkJwgf1QXQTZNA65RAsg0eH7-6WQo5V5G2YiieKldyGOjQ_4G7XruCvFR7-fD1POVaWqz7U_vnm8HNps82QFVNGqgt-vWAwKCZ7zIOnB95jSWJ64cIITPa0QQMKiogtZD8lc9PY0l7pHVzaG6WrcOEZhcEn5R05FceS2rxYk94i1vNeCC8V4lgOV-xf_gTxAaK3sz_OFHzFU4BXATLrWwoZvlDtda-6IVhCuq5S4mSV18"/>
<div className="w-8 h-8 rounded-full border-2 border-surface-container-high bg-outline-variant text-on-surface-variant flex items-center justify-center text-[10px] font-bold">+81</div>
</div>
</div>
{/*  Verified Users  */}
<div className="flex-shrink-0 w-64 p-stack-md rounded-xl bg-surface-container-high border border-outline-variant flex flex-col">
<div className="flex items-center gap-2 mb-stack-sm">
<span className="p-2 bg-secondary-container text-on-secondary-container rounded-lg material-symbols-outlined" data-icon="verified_user">verified_user</span>
<span className="text-label-lg font-label-lg">Identity Verification</span>
</div>
<div className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">216</div>
<p className="text-label-sm font-label-sm text-on-surface-variant italic">Next verification batch: 2:00 PM</p>
</div>
</div>
</section>
{/*  Global Operations Map Placeholder  */}
<section className="mb-stack-lg">
<div className="relative h-48 w-full rounded-xl overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover grayscale opacity-80" data-alt="A stylized, top-down satellite view of a modern global logistics network map with glowing connection lines between major cities like Singapore, London, and New York. The color scheme is a sophisticated dark-mode aesthetic with deep blacks and vibrant emerald green data paths. The mood is highly technological and efficient, representing real-time global trade operations." data-location="Global" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZzSZzvPPyn28D2AdHppVNyH7soXAAtegI00ny3V9DPQ8HEw6_0pMJP6Sxb0b8xVD5Gg6yW4qgh2MxfosAkhs3ACAw4x1j20qhficf8ME1GL5R_RitZhRCYuoYtHX8updjdYa-pV8TGuYydy6DZAkupReEzY5Afjiahgu8w7tChFYAdpuEfJ9thmevwq4dS7YW3Kgf9wI-nlQ2-kl4UFGrbNCbWYmcWbtqOnrFGag2hxUFugM3yYmhnOuweLEj_mou_PrBgJ_DrgvL"/>
<div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent flex items-end p-4">
<div>
<div className="text-label-sm font-label-sm text-primary uppercase">Network Status</div>
<div className="text-body-md font-body-md text-on-surface">32 Global Hubs Online</div>
</div>
</div>
</div>
</section>
</main>
{/*  BottomNavBar (From JSON)  */}
<AdminSidebar />

</div></div>
    </>
  );
}
