import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function CarrierManagementPage() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
{/*  SideNavBar (Shared Component)  */}
<AdminSidebar />
{/*  Main Content Area  */}
<div className="ml-64 min-h-screen flex flex-col">
{/*  TopNavBar (Shared Component)  */}
<header className="flex justify-between items-center w-full h-16 pl-md pr-md bg-surface dark:bg-background border-b border-outline-variant dark:border-outline sticky top-0 z-40">
<div className="flex items-center gap-md">
<h2 className="font-h2-mobile text-h2-mobile font-bold text-primary">Carrier Management</h2>
</div>
<div className="flex items-center gap-lg">
<div className="hidden md:flex items-center gap-xl">
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all" href="#">API Docs</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all" href="#">System Health</a>
</div>
<div className="flex items-center gap-md border-l border-outline-variant pl-lg">
<button className="p-base rounded-full hover:bg-surface-container-highest transition-colors relative">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
<span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
</button>
<div className="flex items-center gap-sm">
<img alt="Admin Profile" className="w-8 h-8 rounded-full bg-surface-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFHAvYFatFIvylg6FFb4oveEkmZU9vgyBxyqw7HH_FM1kT9p2DYUUWmafDNGk4mZhOJ7Z4mQ1S-D-5aLDe2uWpkfQ6dQimj9CVMiDPI1Zc8vzzBDlicNOwLanabY0T7kpXZV9dMKG1WiWOCb-HmWDsj-rZnUCR8LR3NJ4qi-3TuVSXMY838YPRVneut6SPuGJq9J799yIgvI5i7lw08zx8ol44cma-XdwSzCULm46xyGn8RMhnYjBSvJoF550zM6Z3GMPQQwb9sUc2"/>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="account_circle">account_circle</span>
</div>
</div>
</div>
</header>
{/*  Main Scrollable Canvas  */}
<main className="p-xl max-w-[1440px] mx-auto w-full">
{/*  Page Header Section  */}
<div className="flex flex-col md:flex-row md:items-end justify-between mb-xxl gap-md">
<div>
<h1 className="font-h1 text-h1 text-on-background mb-xs">Logistics &amp; Partners</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                        Configure logistics partnerships, API credentials, and global shipping parameters to maintain a seamless fulfillment ecosystem.
                    </p>
</div>
<button className="px-lg py-md bg-primary text-on-primary rounded-lg font-label-md flex items-center gap-sm shadow-sm hover:opacity-90 transition-opacity active:scale-95">
<span className="material-symbols-outlined text-[20px]" data-icon="add">add</span>
                    Add New Carrier
                </button>
</div>
{/*  1. Integrated Carriers Grid (Bento Style)  */}
<section className="mb-xxl">
<div className="flex items-center justify-between mb-lg">
<h3 className="font-h3 text-h3 text-on-background">Integrated Carriers</h3>
<button className="text-primary font-label-md flex items-center gap-xs hover:underline">
                        View All Partners <span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
{/*  FedEx Card  */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all group">
<div className="flex justify-between items-start mb-lg">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden">
<img alt="FedEx Logo" className="w-full h-full object-contain p-2" data-alt="The corporate logo for FedEx shipping services, rendered in a crisp vector format with its characteristic purple and orange colors. The logo is displayed prominently against a clean, professional white background, suggesting a high-end corporate logistics interface. The lighting is bright and even, reinforcing a sense of reliability and global presence." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvukozdIxLon4fectOkw2J3SFYiF2r05ESuADA8uqrCG2F3ALCHQ7IfVLXX88xo30yHTe6xKL4gjTDTOkil6BdD4nPtlTnoJLdRHdGS60q9nk5CCoAJWxsz-QQUcrd9x3gSMvu0KMThVQKAlw7xSsQp_J6oOqpTMmhBnJa9dO7V9TNtSGy82URQ4MuRSZZLhu8Kq8GeWV6uRB7HExOrpaqmnyXRUQYsXd0z9dZ7pVMXQvUzFpKIcADT3Kz1OHaJXNQ-xKTcF1uvKl_"/>
</div>
<span className="px-sm py-xs bg-primary-container text-on-primary-container rounded-full text-[10px] font-bold uppercase tracking-wider">Active</span>
</div>
<h4 className="font-h4 text-h4 mb-xs">FedEx Express</h4>
<div className="space-y-sm mb-xl">
<div className="flex items-center justify-between text-body-sm text-on-surface-variant">
<span>Health:</span>
<span className="flex items-center gap-xs text-primary font-medium">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Connected
                                </span>
</div>
<div className="flex items-center justify-between text-body-sm text-on-surface-variant">
<span>Region:</span>
<span className="font-medium text-on-surface">North America</span>
</div>
</div>
<div className="grid grid-cols-1 gap-sm">
<button className="w-full py-sm bg-surface-container-high hover:bg-primary hover:text-on-primary rounded-lg font-label-md text-on-surface-variant transition-colors text-sm">Configure API</button>
<button className="w-full py-sm text-primary font-label-md text-sm hover:bg-primary-container/10 rounded-lg">View Rates</button>
</div>
</div>
{/*  UPS Card  */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all">
<div className="flex justify-between items-start mb-lg">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden">
<img alt="UPS Logo" className="w-full h-full object-contain p-2" data-alt="A detailed digital representation of the UPS logo, showing the iconic shield in brown and gold. The visual is sharp and clear, set against a minimalist light grey background that fits perfectly into a modern enterprise dashboard. The lighting suggests a sleek glass surface, echoing a high-trust, professional shipping management tool." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR8Gp9MwVeUoX7woM1-rEWS2wwriAmMBNkC0wj92WmO8A6b7k94fSWewlafn9VaegDhzWv7VT7shtXR5eTpCH1uuV-gSQqqwTa-WqUx9Ls9csM63KGTzela2FeD4OLWalgnwtCvJSxFAsUrtsdbG-MD-W6ZC09Qv4Ic_i6Gp9p0WUUAO1tnnLIxRC7fbFwm75FXXQwP3DrV08OgZg5gw_vH5a0GlMTvoDCPwreBzykmm0LJ2z1jyNQ1F5ODert55xoYUd79olm-eQ0"/>
</div>
<span className="px-sm py-xs bg-primary-container text-on-primary-container rounded-full text-[10px] font-bold uppercase tracking-wider">Active</span>
</div>
<h4 className="font-h4 text-h4 mb-xs">UPS Global</h4>
<div className="space-y-sm mb-xl">
<div className="flex items-center justify-between text-body-sm text-on-surface-variant">
<span>Health:</span>
<span className="flex items-center gap-xs text-primary font-medium">
<span className="w-2 h-2 rounded-full bg-primary"></span> Connected
                                </span>
</div>
<div className="flex items-center justify-between text-body-sm text-on-surface-variant">
<span>Region:</span>
<span className="font-medium text-on-surface">Global</span>
</div>
</div>
<div className="grid grid-cols-1 gap-sm">
<button className="w-full py-sm bg-surface-container-high hover:bg-primary hover:text-on-primary rounded-lg font-label-md text-on-surface-variant transition-colors text-sm">Configure API</button>
<button className="w-full py-sm text-primary font-label-md text-sm hover:bg-primary-container/10 rounded-lg">View Rates</button>
</div>
</div>
{/*  DHL Card  */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all">
<div className="flex justify-between items-start mb-lg">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden">
<img alt="DHL Logo" className="w-full h-full object-contain p-2" data-alt="The DHL logistics logo, featuring bold red letters against a bright yellow rectangle. The style is clean and flat, optimized for a modern web interface. It's presented within a softly shadowed card, giving it a tactile feel in a high-fidelity admin console. The scene is bright, airy, and professional." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmhdRKpQx4Knqi3_YESU0ktQlTsYerY_gapYznQ9NRGgAHpr5x6f1e5LlLBXJ-WER1QG_gDBRRFF-A_F7B4focqumGH3-YHQvLWHv-DHjiZbtm961-rECHRP5cMa0crYzrv33XIVZKoCByvoStrK-wCv9zr8XTn2jC4g1ypHHHJvjTlI-DbHnfJMRV98vANaDdL9JViFWyy6Oarj6vy0B3e2_OHTB41ZfthLwwxrwJEMNFmnokcIqXNzkPI5fxw4o5jn9-q_NOhXmF"/>
</div>
<span className="px-sm py-xs bg-error-container text-on-error-container rounded-full text-[10px] font-bold uppercase tracking-wider">Error</span>
</div>
<h4 className="font-h4 text-h4 mb-xs">DHL Logistics</h4>
<div className="space-y-sm mb-xl">
<div className="flex items-center justify-between text-body-sm text-on-surface-variant">
<span>Health:</span>
<span className="flex items-center gap-xs text-error font-medium">
<span className="w-2 h-2 rounded-full bg-error"></span> Auth Failed
                                </span>
</div>
<div className="flex items-center justify-between text-body-sm text-on-surface-variant">
<span>Region:</span>
<span className="font-medium text-on-surface">Europe/Asia</span>
</div>
</div>
<div className="grid grid-cols-1 gap-sm">
<button className="w-full py-sm bg-error text-on-error rounded-lg font-label-md transition-colors text-sm">Re-authenticate</button>
<button className="w-full py-sm text-primary font-label-md text-sm hover:bg-primary-container/10 rounded-lg">View Logs</button>
</div>
</div>
{/*  USPS Card  */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all">
<div className="flex justify-between items-start mb-lg">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden">
<img alt="USPS Logo" className="w-full h-full object-contain p-2" data-alt="A sleek digital depiction of the United States Postal Service eagle logo in deep navy blue. The image is crisp and centered on a soft white background, fitting the minimalist and trustworthy aesthetic of a global commerce platform. High-key lighting creates a professional, secure atmosphere typical of financial or logistical admin tools." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzhHYatBnkgy-bqjHND0_oZ5ok7EVvmKQXcWYpETOx-_SpwNW2-mtZ28siuL2YdI2HqVtJcHdrOHPZu8z-NuMFRFNG8cRP3vdYeHoFa4qdTr67NIQw0KYYuQGMVpGal1u5gVV8vKixCWYgsQI6twxKvF5Oo3h0egXwMA4ByVwUik-hllUVywJY4FG8hPIT7sGrT110eaEZ3QSS4TNNaAKuNsQpL-cxv8Ag5s70WnQqDix3-72DTqd_T0cXhDrph-FXJQyuM2yavph_"/>
</div>
<span className="px-sm py-xs bg-surface-variant text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wider">Pending</span>
</div>
<h4 className="font-h4 text-h4 mb-xs">USPS Priority</h4>
<div className="space-y-sm mb-xl">
<div className="flex items-center justify-between text-body-sm text-on-surface-variant">
<span>Health:</span>
<span className="flex items-center gap-xs text-on-surface-variant font-medium">
<span className="w-2 h-2 rounded-full bg-outline"></span> Disconnected
                                </span>
</div>
<div className="flex items-center justify-between text-body-sm text-on-surface-variant">
<span>Region:</span>
<span className="font-medium text-on-surface">United States</span>
</div>
</div>
<div className="grid grid-cols-1 gap-sm">
<button className="w-full py-sm bg-primary text-on-primary rounded-lg font-label-md transition-colors text-sm">Complete Setup</button>
<button className="w-full py-sm text-on-surface-variant font-label-md text-sm hover:bg-surface-container-highest rounded-lg">Toggle Status</button>
</div>
</div>
</div>
</section>
{/*  2. Global Shipping Rules & 3. Rate Table (Asymmetric Layout)  */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-xxl items-start">
{/*  Shipping Rules (1/3 column)  */}
<section className="lg:col-span-1 space-y-lg">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
<div className="flex items-center gap-sm mb-lg">
<span className="material-symbols-outlined text-primary" data-icon="settings_suggest">settings_suggest</span>
<h3 className="font-h4 text-h4">Global Rules</h3>
</div>
<div className="space-y-xl">
{/*  Rule: Free Shipping  */}
<div className="space-y-md">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface">Free Shipping Threshold</label>
<button className="w-10 h-5 bg-primary rounded-full relative transition-colors cursor-pointer" onclick="toggleSwitch(this)">
<span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all translate-x-5"></span>
</button>
</div>
<div className="relative">
<span className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant font-label-md">$</span>
<input className="w-full pl-lg pr-md py-sm bg-surface rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none font-body-md" type="number" value="150.00"/>
</div>
<p className="text-[11px] text-on-surface-variant italic">Applied to orders across all active carriers.</p>
</div>
{/*  Rule: Markup  */}
<div className="space-y-md">
<label className="font-label-md text-label-md text-on-surface block">Default Rate Markup (%)</label>
<div className="relative">
<input className="w-full px-md py-sm bg-surface rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none font-body-md" type="number" value="5.0"/>
<span className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant font-label-md">%</span>
</div>
<div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[15%]"></div>
</div>
</div>
{/*  Rule: International Toggle  */}
<div className="flex items-center justify-between p-md bg-surface rounded-lg border border-dashed border-outline-variant">
<div className="flex items-center gap-md">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="public">public</span>
<div>
<p className="font-label-md text-label-md">International Shipping</p>
<p className="text-[11px] text-on-surface-variant">Allow global checkout</p>
</div>
</div>
<button className="w-10 h-5 bg-surface-variant rounded-full relative transition-colors cursor-pointer" onclick="toggleSwitch(this)">
<span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all translate-x-0"></span>
</button>
</div>
{/*  Policy Link  */}
<a className="block p-md bg-secondary-fixed text-on-secondary-fixed rounded-lg group" href="#">
<div className="flex justify-between items-center mb-xs">
<span className="font-label-md">Restricted Goods Policies</span>
<span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform" data-icon="launch">launch</span>
</div>
<p className="text-[12px] opacity-80">Manage 14 active exclusion rules for lithium batteries and hazardous liquids.</p>
</a>
</div>
</div>
</section>
{/*  Rate Table & Zones (2/3 column)  */}
<section className="lg:col-span-2">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div className="p-lg border-b border-outline-variant flex items-center justify-between bg-surface-bright">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-primary" data-icon="map">map</span>
<h3 className="font-h4 text-h4">Shipping Zones &amp; Rates</h3>
</div>
<div className="flex gap-sm">
<button className="p-xs hover:bg-surface-container-highest rounded-lg transition-colors">
<span className="material-symbols-outlined" data-icon="filter_list">filter_list</span>
</button>
<button className="p-xs hover:bg-surface-container-highest rounded-lg transition-colors">
<span className="material-symbols-outlined" data-icon="download">download</span>
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">
<th className="px-lg py-md font-semibold">Zone Name</th>
<th className="px-lg py-md font-semibold">Base Rate</th>
<th className="px-lg py-md font-semibold">Carriers</th>
<th className="px-lg py-md font-semibold">Lead Time</th>
<th className="px-lg py-md font-semibold text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
{/*  Row 1  */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-lg py-lg">
<div className="flex flex-col">
<span className="font-label-md text-on-surface">US Domestic</span>
<span className="text-body-sm text-on-surface-variant">Lower 48 States</span>
</div>
</td>
<td className="px-lg py-lg font-body-md">$4.50</td>
<td className="px-lg py-lg">
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full bg-surface-container border border-white flex items-center justify-center overflow-hidden" title="FedEx">
<img alt="F" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaF6F96R4VedCUO_Nxx1xcltUpc7DrozwS5l-W985t1KSGHzXYsRoAn-hgfaRX0QeTxBRCPc_Gof5Wtc37vjAa3dNrq9-DXxxeU1lLTeAL59wPAIelVYwBIX8oSCakWAkPKJA9uOIOPmjlrWmky_ew7X8NS3jF6ege2KBwhOHlWe5kWKZA_w3Q4yB-Ln6cFFV3WR-eTXnDZHiP5hiItNisIQtt3aKA369X9y9maxhsHWUUlNhMNAuOIlo9SOWu7sqBHqOp4fu0bUOH"/>
</div>
<div className="w-6 h-6 rounded-full bg-surface-container border border-white flex items-center justify-center overflow-hidden" title="UPS">
<img alt="U" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVniIdbmPKRBcbGY-AJuy9LTSqURqjWu00jDVi2xRCQNFJCKI8khF01Vp4qAmnJ98ycm33xbl78KEJkugRJXrzYx5UUr7eGdwo2ncCyzjl37S4-wRy0lnyLFkmDE9URjXZ1u37L9Bzs91MuJrJeLFP7Lpbb7FChfdib4_fFYkAxT5wIIHFHa8fmwfey3BSnnDVW2FdLg2I75I5wStWN18SqjqYDnwY3T0XZzfPbBv6h0DcpGASDPa_BOxLjNl_NJczAkOEjsIl6B0c"/>
</div>
<div className="w-6 h-6 rounded-full bg-surface-container border border-white flex items-center justify-center overflow-hidden" title="USPS">
<img alt="S" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCllunIcUPdIL7g80CxxQ5WhlMDaUnEB5HYxwJGD586U_oUusPUjBEHFb0jmO0kemKjiviZF-fbMNxxyPzy4qZodmF9LLzon7msRxkIc_84V_VpIgTjHvEAdmRVS8phyA00SHw3ZYlo1CxL8QHH7dYfRxGBFgIh5atKVEXBctz61V_2Y6cg5xPzhDf8e4FszZQALYko2Knduv-fpNUFPtnVZG25Uoe8EmXBtnk2LR67gKLPBKIFd2LtQiTu791DE7_4ct-GpFuJDUpr"/>
</div>
</div>
</td>
<td className="px-lg py-lg">
<span className="px-sm py-xs bg-surface-variant text-on-surface-variant rounded-lg text-[12px] font-medium">2 - 5 Days</span>
</td>
<td className="px-lg py-lg text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined" data-icon="edit">edit</span>
</button>
</td>
</tr>
{/*  Row 2  */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-lg py-lg">
<div className="flex flex-col">
<span className="font-label-md text-on-surface">European Union</span>
<span className="text-body-sm text-on-surface-variant">Tier 1 Member States</span>
</div>
</td>
<td className="px-lg py-lg font-body-md">$12.00</td>
<td className="px-lg py-lg">
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full bg-surface-container border border-white flex items-center justify-center overflow-hidden">
<img alt="D" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2d0HVoi7ln4kaIC7d8DaAH7euoEljDoaLuQa4HacYxVsBq5UKsTlJeZYHLHh6L3i_QZbl38nChSRXM7nVGNraldqK6-MJriDfJ1kTRmi62KcLr79Pg4N58D6qXWjwR-AkUVCh-mhkmJM88V59l3GuPAepJeK8eI6tpnX0ZFakEqunCMTk9FrMPzm_b3m2V6my9eLLLf3v-fZoxjiNIBIVLABZuYffdIWPZE4_eK6WGwynO6vARcYAIXb2y4LGxQAmGAr_FFKa0EpN"/>
</div>
<div className="w-6 h-6 rounded-full bg-surface-container border border-white flex items-center justify-center overflow-hidden">
<img alt="U" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWNv4_pzopnDTfDrRJVtLijgnSpphIPbQ8B7f-rOm-zAnZkb0C2O6tyhSYDIexSjFmPOqaCe73n2z46ckIxyMXC3F4Zzivi6vq5Mx-g_V6gAoRJ8S-F_hDy6b4G8G5uSAYlQMCZu0T6caH0c8Hq1TfPwJwxBdvQO1-yJLsThUA2ecAobhVQXexvfR1myCZhbx6pDB5pAyY01NesMUUgLhGtd9n43zJgjJX1RcRSYUZVEdoBJsCi9EOS2bhGyu4UtduOlmOQgd6rb1t"/>
</div>
</div>
</td>
<td className="px-lg py-lg">
<span className="px-sm py-xs bg-surface-variant text-on-surface-variant rounded-lg text-[12px] font-medium">5 - 10 Days</span>
</td>
<td className="px-lg py-lg text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined" data-icon="edit">edit</span>
</button>
</td>
</tr>
{/*  Row 3  */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-lg py-lg">
<div className="flex flex-col">
<span className="font-label-md text-on-surface">APAC Regional</span>
<span className="text-body-sm text-on-surface-variant">Australia, Japan, Singapore</span>
</div>
</td>
<td className="px-lg py-lg font-body-md">$18.50</td>
<td className="px-lg py-lg">
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full bg-surface-container border border-white flex items-center justify-center overflow-hidden">
<img alt="D" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7ONaoQpmhUAgLIsLapIqVBIQgEpyhMPJZd7IheQEozN4RjLHYG7ny1qL2JMWRPO0sK_9K7pFGpAyJXcdF3qhzU_0BHVelQJJ_PWqjsxsbQdMn8lXW9rOMJp5iobI_H2jQ8skHf7NY-qQbQWEufDst7xkC5XOG3CkEx9y81NeKYIggL41OF8CVUXpCP_5Bvs1nttFARgFw9ra6FN_f9WBH8j21Gx5G4LA3ovObcY1xuyCv-Pr_VwwI62jUgLUlliEJTUEISkGpMvOJ"/>
</div>
<div className="w-6 h-6 rounded-full bg-surface-container border border-white flex items-center justify-center overflow-hidden">
<img alt="F" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu1xvwltEnPhwmRr_ZyMSLn6ot1Q_bMGKHDz5PfXlxGmhngF4nhKCv59dzcKoKtUkRL4TC481bsO6dKg7tiB2lhK_PtHDujIH2W9pAcgKy8BZ58hcSJkVJPZWebEO50dfonXinhC8lUgtdty-6m5ZxZujPYYK-Hbqyz6DRXHjj9aP-q3PSVNRA2q55PvAxjXohU6Cx3yI31_FlJpHy_sf1TwS1j9rHkE1Kw8v9iIjsIeglqEOjlVCXHt14MZ5cHvz3Q-7hBmOovzbC"/>
</div>
</div>
</td>
<td className="px-lg py-lg">
<span className="px-sm py-xs bg-secondary-fixed text-on-secondary-fixed rounded-lg text-[12px] font-medium">7 - 14 Days</span>
</td>
<td className="px-lg py-lg text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined" data-icon="edit">edit</span>
</button>
</td>
</tr>
{/*  Row 4  */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-lg py-lg">
<div className="flex flex-col">
<span className="font-label-md text-on-surface">Oceania Remote</span>
<span className="text-body-sm text-on-surface-variant">Pacific Islands</span>
</div>
</td>
<td className="px-lg py-lg font-body-md">$24.00</td>
<td className="px-lg py-lg">
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full bg-surface-container border border-white flex items-center justify-center overflow-hidden">
<img alt="D" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrLfvbzAzhxjHHE7IaGUTglemR1hnXBl75k52zGNE0-56QnQLnaBuu7BACwOQIZqIFGHcEwBcsECpC7ywrKT22pgGU9hASy2VukZqrMfyNVdmVt6YVimy1oveMzRjMUnPpTTgqsHSe1mgrypQ2951aDjLp34B0pPTwCk7guD_YDqIlY9Yehv6c4G-QpD76SF9tHPOID3fIuc5SJWpnCk-dX9AAv7JJXmQFqmFknU89_5s-xLxteOmu4iSXzxn_3-2YzyfAAL-fSWXQ"/>
</div>
</div>
</td>
<td className="px-lg py-lg">
<span className="px-sm py-xs bg-error-container text-on-error-container rounded-lg text-[12px] font-medium">15 - 25 Days</span>
</td>
<td className="px-lg py-lg text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined" data-icon="edit">edit</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-md bg-surface-container-low flex justify-center">
<button className="text-primary font-label-md flex items-center gap-xs hover:bg-primary-container/20 px-lg py-sm rounded-lg transition-colors">
<span className="material-symbols-outlined text-[20px]" data-icon="add_circle">add_circle</span>
                                Define New Zone
                            </button>
</div>
</div>
{/*  Extra Insight: Performance Stat  */}
<div className="mt-lg p-lg bg-surface-container-high rounded-xl flex items-center gap-lg">
<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="speed">speed</span>
</div>
<div>
<h4 className="font-label-md text-label-md text-on-surface">Average Delivery Efficiency</h4>
<p className="text-body-sm text-on-surface-variant">Your current network has an 98.4% on-time delivery rate this month. That's 2.1% higher than last quarter.</p>
</div>
<div className="ml-auto flex items-baseline gap-xs">
<span className="font-h3 text-h3 text-primary">98.4%</span>
<span className="material-symbols-outlined text-primary text-[18px]" data-icon="trending_up">trending_up</span>
</div>
</div>
</section>
</div>
</main>
{/*  Footer Info  */}
<footer className="mt-auto py-lg px-xl bg-surface border-t border-outline-variant text-on-surface-variant font-label-md flex justify-between items-center ml-auto w-full">
<p>© 2024 Ethizone Marketplace Systems • v2.4.0-stable</p>
<div className="flex gap-lg">
<a className="hover:text-primary" href="#">System Logs</a>
<a className="hover:text-primary" href="#">Audit Trail</a>
<a className="hover:text-primary" href="#">Developer Portal</a>
</div>
</footer>
</div>
{/*  Micro-interactions Script  */}

</div></div>
    </>
  );
}
