import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function UserActivityDetail() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-background text-on-background min-h-screen">
{/*  SideNavBar  */}
<AdminSidebar />
{/*  Main Content Area  */}
<main className="ml-64 min-h-screen flex flex-col">
{/*  TopAppBar  */}
<header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex justify-between items-center w-full h-16 px-margin-desktop">
<div className="flex items-center gap-xl">
<h1 className="font-h4 text-h4 font-bold text-primary">User Activity Detail</h1>
<nav className="hidden md:flex gap-lg">
<a className="text-on-surface-variant hover:text-primary transition-colors pb-1 border-b-2 border-transparent font-label-md" href="#">Overview</a>
<a className="text-primary font-bold border-b-2 border-primary pb-1 font-label-md" href="#">History</a>
<a className="text-on-surface-variant hover:text-primary transition-colors pb-1 border-b-2 border-transparent font-label-md" href="#">Security</a>
</nav>
</div>
<div className="flex items-center gap-lg">
<div className="relative hidden lg:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 w-64" placeholder="Search activity..." type="text"/>
</div>
<div className="flex items-center gap-sm">
<button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
</button>
<button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
<span className="material-symbols-outlined">help_outline</span>
</button>
</div>
<div className="h-8 w-px bg-outline-variant mx-2"></div>
<div className="flex items-center gap-md">
<button className="px-md py-sm bg-primary text-on-primary rounded-lg font-label-md hover:bg-surface-tint transition-colors">Export Data</button>
<button className="px-md py-sm border border-error text-error rounded-lg font-label-md hover:bg-error/5 transition-colors">Lock Account</button>
</div>
</div>
</header>
{/*  Content Canvas  */}
<div className="p-margin-desktop space-y-xl max-w-[1440px] mx-auto w-full">
{/*  User Profile Header Section  */}
<section className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col md:flex-row justify-between items-start gap-lg">
<div className="flex items-center gap-xl">
<div className="relative">
<img alt="User Identity Avatar" className="w-24 h-24 rounded-2xl object-cover border-4 border-surface-container shadow-sm" data-alt="Close up portrait of Julian Rivers, a professional male user in his late 20s. He has a friendly, approachable expression with short, neatly styled hair. The lighting is natural and bright, captured in a clean, modern lifestyle setting. The aesthetic is professional yet warm, using a soft color palette consistent with a high-end enterprise application." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcDm3nYTVBJ52s92wPhhOOiyXDU03Jt177KXVGGAJOcVuvYmTYpHpZFp21WYnk90qfmrxZ-J3ExRKkk3HUe-bDwTyF7hYWRnXyBURiDrh_3_sSWP3MMf5N0yCjlBmfHOtMejU8JSoiwoWAQDX8wlEFbRprmftE_nMJs-YG82AIAxV7Kn-GXPeTIDETc3JrTzKV11GsBb7cmX5pGVa2SVxZ3bxJ3RZnnPcRDKSf9aaf2ULxmApwd-UgwfA84aDF-SdCi2GsRtZ7-JQJ"/>
<div className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-1 rounded-full border-2 border-surface-container-lowest">
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
</div>
</div>
<div>
<div className="flex items-center gap-sm">
<h2 className="font-h3 text-h3 text-on-surface">Julian Rivers</h2>
<span className="bg-primary-container/10 text-primary px-sm py-xs rounded-full text-label-sm font-bold border border-primary/20">Verified</span>
</div>
<p className="font-body-md text-on-surface-variant mt-1">julian.rivers@example.com</p>
<div className="flex items-center gap-md mt-sm">
<div className="flex items-center gap-xs text-on-surface-variant">
<span className="material-symbols-outlined text-sm">calendar_today</span>
<span className="font-label-sm">Joined Oct 12, 2023</span>
</div>
<div className="flex items-center gap-xs text-on-surface-variant">
<span className="material-symbols-outlined text-sm">location_on</span>
<span className="font-label-sm">San Francisco, USA</span>
</div>
</div>
</div>
</div>
<div className="flex flex-wrap gap-md w-full md:w-auto">
<button className="flex-1 md:flex-none flex items-center justify-center gap-sm px-lg py-md border border-outline text-on-surface font-label-md rounded-lg hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined">download</span>
                        Export Data
                    </button>
<button className="flex-1 md:flex-none flex items-center justify-center gap-sm px-lg py-md bg-error text-on-error font-label-md rounded-lg hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined">block</span>
                        Suspend Account
                    </button>
</div>
</section>
{/*  Key Metrics Grid  */}
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300">
<div className="flex justify-between items-start">
<span className="p-2 bg-secondary/10 text-secondary rounded-lg material-symbols-outlined">monitoring</span>
<span className="text-primary text-label-sm flex items-center">+12% <span className="material-symbols-outlined text-xs">arrow_upward</span></span>
</div>
<p className="mt-md font-label-sm text-on-surface-variant uppercase tracking-wider">Total Sessions (30d)</p>
<h3 className="font-h2 text-h2 mt-xs">142</h3>
</div>
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300">
<div className="flex justify-between items-start">
<span className="p-2 bg-tertiary/10 text-tertiary rounded-lg material-symbols-outlined">timer</span>
<span className="text-on-surface-variant text-label-sm">Consistent</span>
</div>
<p className="mt-md font-label-sm text-on-surface-variant uppercase tracking-wider">Avg. Session Length</p>
<h3 className="font-h2 text-h2 mt-xs">12m 45s</h3>
</div>
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300">
<div className="flex justify-between items-start">
<span className="p-2 bg-primary/10 text-primary rounded-lg material-symbols-outlined">login</span>
<span className="text-primary text-label-sm">Active Now</span>
</div>
<p className="mt-md font-label-sm text-on-surface-variant uppercase tracking-wider">Successful Logins</p>
<h3 className="font-h2 text-h2 mt-xs">38</h3>
</div>
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
<div className="flex justify-between items-start">
<span className="p-2 bg-error/10 text-error rounded-lg material-symbols-outlined">gpp_maybe</span>
<span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[10px] font-bold">OPTIMAL</span>
</div>
<p className="mt-md font-label-sm text-on-surface-variant uppercase tracking-wider">Failed Attempts</p>
<h3 className="font-h2 text-h2 mt-xs">0</h3>
<div className="absolute bottom-0 left-0 h-1 bg-primary w-full opacity-30"></div>
</div>
</section>
{/*  Main Layout Split  */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
{/*  Activity Timeline (Primary Column)  */}
<div className="lg:col-span-2 space-y-lg">
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
<div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-low/30">
<h3 className="font-h4 text-h4">Activity Timeline</h3>
<button className="text-primary font-label-md hover:underline">View All</button>
</div>
<div className="p-xl space-y-xl relative">
{/*  Line  */}
<div className="absolute left-[51px] top-xl bottom-xl w-px bg-outline-variant"></div>
{/*  Timeline Item  */}
<div className="flex gap-lg relative">
<div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center z-10 shadow-sm border-2 border-surface-container-lowest">
<span className="material-symbols-outlined text-sm">login</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<div>
<p className="font-label-md text-on-surface">Successful Login (San Francisco, CA)</p>
<p className="text-body-sm text-on-surface-variant mt-1">Session initiated from MacOS · Chrome 121.0.1</p>
</div>
<span className="text-label-sm text-on-surface-variant">Today, 10:45 AM</span>
</div>
</div>
</div>
{/*  Timeline Item  */}
<div className="flex gap-lg relative">
<div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center z-10 shadow-sm border-2 border-surface-container-lowest">
<span className="material-symbols-outlined text-sm">shopping_cart</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<div>
<p className="font-label-md text-on-surface">Completed Order #ORD-8829 ($124.50)</p>
<p className="text-body-sm text-on-surface-variant mt-1">Payment processed via Visa ending in 4421</p>
</div>
<span className="text-label-sm text-on-surface-variant">Yesterday, 02:15 PM</span>
</div>
</div>
</div>
{/*  Timeline Item  */}
<div className="flex gap-lg relative">
<div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center z-10 shadow-sm border-2 border-surface-container-lowest">
<span className="material-symbols-outlined text-sm">face</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<div>
<p className="font-label-md text-on-surface">Updated Profile Picture</p>
<p className="text-body-sm text-on-surface-variant mt-1">Cloud storage sync completed successfully</p>
</div>
<span className="text-label-sm text-on-surface-variant">Feb 18, 2024</span>
</div>
</div>
</div>
{/*  Timeline Item  */}
<div className="flex gap-lg relative">
<div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center z-10 shadow-sm border-2 border-surface-container-lowest">
<span className="material-symbols-outlined text-sm">key</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<div>
<p className="font-label-md text-on-surface">Password Changed Successfully</p>
<p className="text-body-sm text-on-surface-variant mt-1">Mandatory periodic security update</p>
</div>
<span className="text-label-sm text-on-surface-variant">Feb 15, 2024</span>
</div>
</div>
</div>
</div>
</div>
{/*  Session History Table  */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
<div className="p-lg border-b border-outline-variant flex justify-between items-center">
<h3 className="font-h4 text-h4">Session History</h3>
<div className="flex gap-sm">
<button className="p-2 hover:bg-surface-container rounded-lg border border-outline-variant"><span className="material-symbols-outlined text-sm">filter_list</span></button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low/50">
<tr>
<th className="px-lg py-md font-label-sm text-on-surface-variant uppercase">Timestamp</th>
<th className="px-lg py-md font-label-sm text-on-surface-variant uppercase">IP Address</th>
<th className="px-lg py-md font-label-sm text-on-surface-variant uppercase">Device/Browser</th>
<th className="px-lg py-md font-label-sm text-on-surface-variant uppercase">Location</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-lg py-md font-body-sm">Feb 20, 2024 10:45:02</td>
<td className="px-lg py-md font-body-sm font-mono">192.168.1.44</td>
<td className="px-lg py-md font-body-sm">macOS · Chrome</td>
<td className="px-lg py-md font-body-sm">San Francisco, CA</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-lg py-md font-body-sm">Feb 19, 2024 14:12:30</td>
<td className="px-lg py-md font-body-sm font-mono">192.168.1.44</td>
<td className="px-lg py-md font-body-sm">macOS · Chrome</td>
<td className="px-lg py-md font-body-sm">San Francisco, CA</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-lg py-md font-body-sm">Feb 18, 2024 09:33:15</td>
<td className="px-lg py-md font-body-sm font-mono">172.56.21.109</td>
<td className="px-lg py-md font-body-sm">iOS · Safari</td>
<td className="px-lg py-md font-body-sm">Oakland, CA</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
{/*  Side Column: Security & Insights  */}
<div className="space-y-xl">
{/*  Security Overview Card  */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
<div className="p-lg bg-surface-container-low/30 border-b border-outline-variant">
<h3 className="font-h4 text-h4 flex items-center gap-sm">
<span className="material-symbols-outlined text-primary">security</span>
                                Security Overview
                            </h3>
</div>
<div className="p-lg space-y-lg">
<div className="flex justify-between items-center py-sm">
<span className="text-on-surface-variant font-label-md">Current Status</span>
<span className="flex items-center gap-xs text-primary font-bold">
<span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                    Active
                                </span>
</div>
<div className="flex justify-between items-center py-sm border-t border-outline-variant">
<span className="text-on-surface-variant font-label-md">MFA Status</span>
<span className="flex items-center gap-xs text-secondary font-bold">
<span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    Enabled
                                </span>
</div>
<div className="flex justify-between items-center py-sm border-t border-outline-variant">
<span className="text-on-surface-variant font-label-md">Security Audit</span>
<span className="text-on-surface font-bold">Passed</span>
</div>
<div className="pt-md">
<div className="bg-surface-container p-md rounded-lg">
<p className="text-label-sm text-on-surface-variant uppercase mb-2">Last Audit Date</p>
<p className="font-body-md text-on-surface">Jan 15, 2024 · 09:00 AM</p>
</div>
</div>
</div>
<div className="p-lg bg-surface-container-low border-t border-outline-variant">
<button className="w-full py-md bg-secondary text-on-secondary rounded-lg font-label-md hover:opacity-90 transition-opacity">Reset Security Keys</button>
</div>
</div>
{/*  Risk Profile Asymmetric Card  */}
<div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-xl relative overflow-hidden">
<div className="relative z-10">
<p className="text-label-sm uppercase tracking-widest opacity-70">User Trust Score</p>
<h2 className="font-h1 text-h1 mt-2">98<span className="text-h3 opacity-50">/100</span></h2>
<p className="mt-md text-body-sm opacity-80 leading-relaxed">This user exhibits highly consistent behavior patterns with zero flagged incidents in the last 12 months.</p>
<div className="mt-xl h-2 bg-white/10 rounded-full overflow-hidden">
<div className="h-full bg-primary-fixed w-[98%] rounded-full shadow-[0_0_10px_rgba(163,246,156,0.5)]"></div>
</div>
</div>
<div className="absolute -bottom-10 -right-10 opacity-10">
<span className="material-symbols-outlined text-[180px]">shield_with_heart</span>
</div>
</div>
{/*  Geographic Activity Map Placeholder  */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
<p className="font-label-md mb-md">Primary Access Location</p>
<div className="aspect-video rounded-lg bg-surface-container overflow-hidden relative group cursor-pointer">
<img alt="Login Location Map" className="w-full h-full object-cover grayscale brightness-110 group-hover:scale-110 transition-transform duration-700" data-alt="A clean, minimalist vector-style map of San Francisco showing major transit lines and city grid. The map is presented in a sophisticated light-mode UI color scheme, utilizing shades of soft gray, primary green accents for markers, and subtle secondary blue for water bodies. The aesthetic is modern and integrated perfectly into a high-end dashboard interface." data-location="San Francisco" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0d0IU3xLrFzZu2rx7ei7odgQs8469XlQESZXJLzXCa3DSgKWbpxlpN9Oyi853_hRQw6EkQXUJ-608iRvUW_OZyYHW-1Be0w2uIX-EMi0IGU1qRTDJkolMZ9xABUiWbEoCjqSLKGIIdaUBjtOOmu-iwrGnEBPXu5oCpJbYJnfiFE6DFM4lOUi_BQJJU9Fd2cwzG4PXmpL0UnnldQedm8PY6nKd5as6kpYfZ1GTds65xjeR5VbwsCjqwdTwbZFmSqBuA0dzCfG5hoFH"/>
<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-md">
<div className="flex items-center gap-sm text-white">
<span className="material-symbols-outlined">location_on</span>
<span className="font-label-md">San Francisco, CA</span>
</div>
</div>
</div>
<div className="mt-md flex justify-between items-center text-label-sm text-on-surface-variant">
<span>Last login: 10:45 AM</span>
<span className="flex items-center gap-xs"><span className="w-2 h-2 bg-primary rounded-full"></span> 100% Secure</span>
</div>
</div>
</div>
</div>
</div>
{/*  Footer Info  */}
<footer className="mt-auto p-margin-desktop border-t border-outline-variant flex justify-between items-center bg-surface-container-low/20">
<p className="text-label-sm text-on-surface-variant">© 2024 Ethizone Global Marketplace · Admin Console v2.4.1</p>
<div className="flex gap-lg">
<a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Support Center</a>
</div>
</footer>
</main>
{/*  Floating Action Button (FAB) - Suppressed as per rule for detail pages  */}

</div></div>
    </>
  );
}
