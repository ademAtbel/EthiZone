import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function UserFiltersModal() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-surface text-on-surface font-body-md overflow-hidden">
{/*  Background Content: Manage Users Dashboard  */}
<div className="flex h-screen w-full blur-[2px] pointer-events-none select-none">
{/*  SideNavBar (Shared Component)  */}
<AdminSidebar />
{/*  Main Content Canvas  */}
<main className="ml-64 flex-1 flex flex-col">
{/*  TopNavBar  */}
<header className="h-16 w-full flex justify-between items-center px-margin-desktop bg-surface border-b border-surface-variant">
<div className="flex items-center gap-lg">
<h2 className="font-h3 text-h3 text-primary">Manage Users</h2>
<div className="relative w-96">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary transition-all" placeholder="Search by name, email, or ID" type="text"/>
</div>
</div>
<div className="flex items-center gap-md">
<span className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container-low rounded-full cursor-pointer">notifications</span>
<span className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container-low rounded-full cursor-pointer">help</span>
<span className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container-low rounded-full cursor-pointer">settings</span>
<div className="w-8 h-8 rounded-full bg-surface-container-highest ml-sm overflow-hidden">
<img alt="Admin Avatar" data-alt="A professional headshot of a female administrative manager with a friendly expression, set against a blurred modern office background with soft lighting and cool tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoKPdQErwV2eBmApWqKzIunIuuxhBur7DhU2sLUPCAstiH8rw6Q3MRUXF-dVYN5X1L2gx0GLOz_SmOTOTSiJzgz9XwCeq3p-ZTmXC76QJaHUma6P8yQVnxZhZQJSv0V-pZwHCcDDWXIRZ4ZWoYa_h_aRE_Yjmmmm-vBEm5elqK4uVNdG0iNuWIgFdJWcZw5FuMNg3V_5a4S6uXtjbuhZpgojEna7payxzoKYrd9mDKl4gKCBNyD1c-y0_wX5avz8hxA4C_RMM9V3Pu"/>
</div>
</div>
</header>
{/*  Dashboard Stats Grid  */}
<div className="p-margin-desktop space-y-lg overflow-y-auto">
<div className="grid grid-cols-4 gap-lg">
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
<p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Total Users</p>
<h3 className="font-h2 text-h2 mt-base">12,482</h3>
<div className="flex items-center gap-xs text-primary font-label-md mt-sm">
<span className="material-symbols-outlined text-sm">trending_up</span> 12% from last month
            </div>
</div>
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
<p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Active Sellers</p>
<h3 className="font-h2 text-h2 mt-base">843</h3>
<div className="flex items-center gap-xs text-primary font-label-md mt-sm">
<span className="material-symbols-outlined text-sm">trending_up</span> 4% from last month
            </div>
</div>
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
<p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Pending Verifications</p>
<h3 className="font-h2 text-h2 mt-base">52</h3>
<div className="flex items-center gap-xs text-error font-label-md mt-sm">
<span className="material-symbols-outlined text-sm">warning</span> Action required
            </div>
</div>
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
<p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Reports (24h)</p>
<h3 className="font-h2 text-h2 mt-base">14</h3>
<div className="flex items-center gap-xs text-secondary font-label-md mt-sm">
<span className="material-symbols-outlined text-sm">info</span> Normal activity
            </div>
</div>
</div>
{/*  Table Placeholder  */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
<div className="p-lg border-b border-outline-variant flex justify-between items-center">
<h4 className="font-h4 text-h4">User Directory</h4>
<div className="flex gap-sm">
<button className="px-md py-sm border border-outline-variant rounded-lg flex items-center gap-sm font-label-md hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-[20px]">file_download</span> Export
              </button>
<button className="px-md py-sm bg-secondary text-on-secondary rounded-lg flex items-center gap-sm font-label-md">
<span className="material-symbols-outlined text-[20px]">filter_list</span> Filter
              </button>
</div>
</div>
<div className="h-96 flex items-center justify-center text-on-surface-variant opacity-20 italic">
            Background content...
          </div>
</div>
</div>
</main>
</div>
{/*  MODAL OVERLAY  */}
<div className="fixed inset-0 z-50 flex items-center justify-center p-margin-mobile modal-overlay">
{/*  ADVANCED FILTERS MODAL  */}
<div className="bg-surface-container-lowest w-full max-w-xl rounded-xl shadow-xl flex flex-col max-h-[921px] overflow-hidden animate-in fade-in zoom-in duration-300">
{/*  Modal Header  */}
<div className="px-xl py-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
<div className="flex items-center gap-md">
<span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>filter_alt</span>
<h2 className="font-h3 text-h3">Filter Users</h2>
</div>
<button className="p-base hover:bg-surface-container-high rounded-full transition-colors" onclick="window.history.back()">
<span className="material-symbols-outlined">close</span>
</button>
</div>
{/*  Modal Body (Scrollable)  */}
<div className="flex-1 overflow-y-auto p-xl custom-scrollbar">
<div className="space-y-xl">
{/*  User Role  */}
<section>
<h5 className="font-label-md text-on-surface mb-md">User Role</h5>
<div className="grid grid-cols-3 gap-sm">
<label className="flex items-center gap-sm p-md border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-all">
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
<span className="font-body-sm">Admin</span>
</label>
<label className="flex items-center gap-sm p-md border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-all">
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
<span className="font-body-sm">Seller</span>
</label>
<label className="flex items-center gap-sm p-md border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-all">
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
<span className="font-body-sm">Customer</span>
</label>
</div>
</section>
{/*  Account Status  */}
<section>
<h5 className="font-label-md text-on-surface mb-md">Account Status</h5>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-sm">
<label className="flex items-center gap-sm p-md border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-all">
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
<span className="font-body-sm">Active</span>
</label>
<label className="flex items-center gap-sm p-md border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-all">
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
<span className="font-body-sm">Inactive</span>
</label>
<label className="flex items-center gap-sm p-md border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-all">
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
<span className="font-body-sm">Suspended</span>
</label>
<label className="flex items-center gap-sm p-md border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-all">
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
<span className="font-body-sm">Pending</span>
</label>
</div>
</section>
{/*  Verification Status  */}
<section>
<h5 className="font-label-md text-on-surface mb-md">Verification Status</h5>
<div className="space-y-sm">
<label className="flex items-center gap-md p-md border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-all">
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
<span className="flex-1 font-body-sm">Verified</span>
<span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
</label>
<label className="flex items-center gap-md p-md border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-all">
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
<span className="flex-1 font-body-sm">Unverified</span>
<span className="material-symbols-outlined text-outline text-[18px]">verified</span>
</label>
<label className="flex items-center gap-md p-md border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-all">
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
<span className="flex-1 font-body-sm">Verification In Progress</span>
<span className="material-symbols-outlined text-secondary text-[18px]">pending</span>
</label>
</div>
</section>
<div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
{/*  Date Joined Range Picker  */}
<section>
<h5 className="font-label-md text-on-surface mb-md">Date Joined</h5>
<div className="flex flex-col gap-sm">
<div className="relative">
<label className="text-[10px] uppercase tracking-wider text-on-surface-variant absolute left-3 top-1 px-1 bg-surface-container-lowest z-10">From</label>
<input className="w-full pt-5 pb-2 px-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none text-body-sm" type="date"/>
</div>
<div className="relative">
<label className="text-[10px] uppercase tracking-wider text-on-surface-variant absolute left-3 top-1 px-1 bg-surface-container-lowest z-10">To</label>
<input className="w-full pt-5 pb-2 px-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none text-body-sm" type="date"/>
</div>
</div>
</section>
{/*  Last Login Dropdown  */}
<section>
<h5 className="font-label-md text-on-surface mb-md">Last Login</h5>
<div className="relative">
<select className="w-full h-12 px-md bg-surface-container-lowest border border-outline-variant rounded-lg appearance-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none text-body-sm">
<option value="24h">Last 24 hours</option>
<option value="7d">Last 7 days</option>
<option value="30d">Last 30 days</option>
<option value="custom">Custom Range</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
</div>
</section>
</div>
</div>
</div>
{/*  Modal Footer  */}
<div className="px-xl py-lg border-t border-outline-variant flex items-center justify-between bg-surface-container-low/30">
<button className="px-xl py-md text-primary font-label-md rounded-lg hover:bg-primary/5 transition-colors border border-transparent active:scale-95 duration-100">
          Clear All
        </button>
<div className="flex gap-sm">
<button className="px-xl py-md bg-primary text-on-primary font-label-md rounded-lg shadow-sm hover:shadow-md hover:bg-primary-container transition-all active:scale-95 duration-100">
            Apply Filters
          </button>
</div>
</div>
</div>
</div>

</div></div>
    </>
  );
}
