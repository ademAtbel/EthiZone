import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function SellerSuspensionFlow() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-background text-on-background min-h-screen">
{/*  Side Navigation Bar (Anchored from JSON)  */}
<AdminSidebar />
{/*  Main Content Area  */}
<main className="ml-64 min-h-screen">
{/*  Top App Bar (Anchored from JSON)  */}
<header className="bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline sticky top-0 z-40 flex justify-between items-center w-full px-margin-desktop py-sm">
<div className="flex items-center gap-4 flex-1">
<div className="relative w-full max-w-md">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-body-sm font-body-sm" placeholder="Search stores, owners, or IDs..." type="text"/>
</div>
</div>
<div className="flex items-center gap-4">
<button className="hover:bg-surface-container-low rounded-full p-2 transition-all relative">
<span className="material-symbols-outlined text-primary">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
</button>
<button className="hover:bg-surface-container-low rounded-full p-2 transition-all">
<span className="material-symbols-outlined text-primary">help_outline</span>
</button>
</div>
</header>
<div className="p-margin-desktop space-y-lg max-w-[1440px] mx-auto">
{/*  Header Section  */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
<div className="space-y-sm">
<a className="flex items-center gap-2 text-secondary font-label-md text-label-md hover:underline decoration-2 underline-offset-4" href="#">
<span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Back to Manage Stores
                    </a>
<div className="flex items-center gap-4">
<h2 className="text-h2 font-h2 text-on-surface">EcoThreads</h2>
<span className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-label-sm font-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
                            Warning
                        </span>
</div>
</div>
<div className="flex gap-sm">
<button className="bg-surface border border-outline-variant text-on-surface-variant px-lg py-sm rounded-lg font-label-md hover:bg-surface-container-low transition-colors shadow-sm">
                        View Public Storefront
                    </button>
<button className="bg-error text-on-error px-lg py-sm rounded-lg font-label-md hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg active:scale-95 transition-transform">
<span className="material-symbols-outlined text-[20px]">block</span>
                        Suspend Store
                    </button>
</div>
</div>
{/*  Bento Grid Layout for Detail Sections  */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
{/*  Store Overview (2 Cols)  */}
<section className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm space-y-md">
<div className="flex justify-between items-center border-b border-outline-variant pb-md">
<h3 className="text-h4 font-h4">Store Overview</h3>
<span className="text-body-sm font-body-sm text-outline">ID: ST-88294-ETHI</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
<div className="space-y-sm">
<label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Store Name</label>
<p className="text-body-lg font-body-lg font-semibold">EcoThreads Sustainable Fashion</p>
</div>
<div className="space-y-sm">
<label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Owner Name</label>
<div className="flex items-center gap-2">
<img alt="Seller Avatar" className="w-8 h-8 rounded-full" data-alt="A professional portrait of a medium-aged male entrepreneur in a smart-casual outfit. He is smiling warmly against a blurred outdoor lifestyle background with natural sunlight. The image should convey trust and a successful business owner persona, fitting for a modern digital marketplace." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCbuBc57ArK5NdLyP-I8kzawIWsrRNnV1X3I9CdgARSBtyEK8DCcwCwMBgHFrq64gan8sfTOI67e3KitvG4VCuG2q5QoghrxXKkBj4W2A9Ehycs-A5lQ6KqT4BkbQ_ExmTmZa1jGPRkk8YWev_kH4G2zehNhq5nhOB3u9JEg9zRwyC8O3_W0ee3BLayiFvpr0sE05i_CwHk-J-a2-6YwK3wYHTbRUSHUb3P_Xt_MbLGTNig29F_UE_wdNUPDwbJ3_Vmgc0VRfiRbdL"/>
<p className="text-body-md font-body-md">Marcus Thorne</p>
</div>
</div>
<div className="space-y-sm">
<label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Category</label>
<div className="flex">
<span className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full text-label-sm font-label-sm">Fashion &amp; Lifestyle</span>
</div>
</div>
<div className="space-y-sm">
<label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Joined Date</label>
<p className="text-body-md font-body-md">Oct 12, 2023</p>
</div>
</div>
</section>
{/*  History of Actions (1 Col Sidebar)  */}
<section className="bg-surface-container-low border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col">
<h3 className="text-label-md font-label-md mb-md flex items-center gap-2">
<span className="material-symbols-outlined text-primary">history</span>
                        History of Actions
                    </h3>
<div className="space-y-md flex-1 overflow-y-auto max-h-[400px] pr-2">
{/*  Action Item 1  */}
<div className="relative pl-6 border-l-2 border-primary/20 pb-4">
<div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-surface-container-low"></div>
<p className="text-label-sm font-label-sm text-on-surface-variant">Today, 10:45 AM</p>
<p className="text-body-sm font-body-sm font-semibold">System Flag: High Dispute Rate</p>
<p className="text-body-sm font-body-sm opacity-70">Dispute rate exceeded 3% threshold.</p>
</div>
{/*  Action Item 2  */}
<div className="relative pl-6 border-l-2 border-primary/20 pb-4">
<div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-outline-variant border-4 border-surface-container-low"></div>
<p className="text-label-sm font-label-sm text-on-surface-variant">Feb 14, 2024</p>
<p className="text-body-sm font-body-sm font-semibold">First Warning Issued</p>
<p className="text-body-sm font-body-sm opacity-70">Reason: Late shipping violations (3 instances).</p>
</div>
{/*  Action Item 3  */}
<div className="relative pl-6 border-l-2 border-primary/20 pb-4">
<div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-outline-variant border-4 border-surface-container-low"></div>
<p className="text-label-sm font-label-sm text-on-surface-variant">Jan 10, 2024</p>
<p className="text-body-sm font-body-sm font-semibold">Store Verified</p>
<p className="text-body-sm font-body-sm opacity-70">Identity and business documents approved.</p>
</div>
</div>
</section>
{/*  Violation History (Full Width Mobile, 2 Cols Desktop)  */}
<section className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div className="bg-error-container/10 px-lg py-md border-b border-outline-variant">
<h3 className="text-h4 font-h4 text-on-error-container flex items-center gap-2">
<span className="material-symbols-outlined">gavel</span>
                            Active Violations &amp; Reports
                        </h3>
</div>
<div className="divide-y divide-outline-variant">
{/*  Violation Item  */}
<div className="p-lg flex items-start justify-between group hover:bg-surface-container-low transition-colors">
<div className="space-y-xs">
<div className="flex items-center gap-2">
<span className="text-body-md font-body-md font-bold text-error">Counterfeit product reports</span>
<span className="bg-error/10 text-error px-2 py-0.5 rounded text-[10px] font-bold uppercase">Critical</span>
</div>
<p className="text-body-sm font-body-sm text-on-surface-variant">3 independent customers reported 'Designer Collection' items as replicas. Verification pending.</p>
<p className="text-label-sm font-label-sm opacity-50 italic">Reported: 2 days ago</p>
</div>
<button className="text-secondary font-label-md text-label-sm hover:underline">View Evidence</button>
</div>
{/*  Violation Item  */}
<div className="p-lg flex items-start justify-between group hover:bg-surface-container-low transition-colors">
<div className="space-y-xs">
<div className="flex items-center gap-2">
<span className="text-body-md font-body-md font-bold">Late shipping (System Detected)</span>
<span className="bg-tertiary-container/20 text-tertiary-container px-2 py-0.5 rounded text-[10px] font-bold uppercase">Medium</span>
</div>
<p className="text-body-sm font-body-sm text-on-surface-variant">45% of orders in the last 30 days were shipped after the 48-hour SLA.</p>
<p className="text-label-sm font-label-sm opacity-50 italic">Last Instance: 6 hours ago</p>
</div>
<button className="text-secondary font-label-md text-label-sm hover:underline">View Logs</button>
</div>
{/*  Violation Item  */}
<div className="p-lg flex items-start justify-between group hover:bg-surface-container-low transition-colors">
<div className="space-y-xs">
<div className="flex items-center gap-2">
<span className="text-body-md font-body-md font-bold">Customer disputes</span>
<span className="bg-tertiary-container/20 text-tertiary-container px-2 py-0.5 rounded text-[10px] font-bold uppercase">High</span>
</div>
<p className="text-body-sm font-body-sm text-on-surface-variant">Elevated volume of 'Item not as described' cases (8 total in current cycle).</p>
<p className="text-label-sm font-label-sm opacity-50 italic">Active cases: 3</p>
</div>
<button className="text-secondary font-label-md text-label-sm hover:underline">View Disputes</button>
</div>
</div>
</section>
{/*  Internal Notes (Sidebar)  */}
<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm space-y-md">
<h3 className="text-label-md font-label-md uppercase tracking-wider text-on-surface-variant">Internal Admin Notes</h3>
<div className="bg-surface-container-low rounded-lg p-sm border border-outline-variant/30 text-body-sm font-body-sm italic text-on-surface-variant">
                        "Seller reached out via support on March 1st claiming logistics issues. Advised to update processing times, but no action taken." 
                        <span className="block mt-2 font-bold not-italic">— Sarah J. (Risk Analyst)</span>
</div>
<textarea className="w-full bg-surface border border-outline-variant rounded-lg p-md text-body-sm font-body-sm focus:ring-2 focus:ring-primary/20 min-h-[120px]" placeholder="Add a note for the audit trail..."></textarea>
<button className="w-full bg-surface-container-high text-on-surface font-label-md py-2 rounded-lg hover:bg-surface-dim transition-all">Save Note</button>
</section>
</div>
{/*  Suspension Configuration Form  */}
<section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg overflow-hidden">
<div className="p-lg border-b border-outline-variant">
<h3 className="text-h4 font-h4">Suspension Configuration</h3>
<p className="text-body-sm font-body-sm text-on-surface-variant">Configure the terms and notify the seller about this action.</p>
</div>
<div className="p-lg grid grid-cols-1 md:grid-cols-2 gap-xl">
<div className="space-y-lg">
<div className="space-y-md">
<label className="block text-label-md font-label-md">Suspension Duration</label>
<div className="grid grid-cols-3 gap-sm">
<button className="py-sm border border-outline-variant rounded-lg font-label-sm hover:border-primary focus:bg-primary/5 focus:border-primary transition-all">7 Days</button>
<button className="py-sm border border-primary bg-primary/5 text-primary rounded-lg font-label-sm font-bold transition-all">30 Days</button>
<button className="py-sm border border-outline-variant rounded-lg font-label-sm hover:border-error focus:bg-error/5 focus:border-error transition-all">Permanent</button>
</div>
</div>
<div className="space-y-md">
<label className="block text-label-md font-label-md">Primary Reason for Suspension</label>
<select className="w-full bg-surface border border-outline-variant rounded-lg p-sm font-body-md focus:ring-2 focus:ring-primary/20">
<option>Policy Violation - Multiple Infractions</option>
<option>Fraud or Counterfeit Goods</option>
<option>Low Performance - Shipping SLAs</option>
<option>Financial Discrepancies</option>
</select>
</div>
<div className="space-y-md">
<div className="flex items-center gap-3 p-md bg-secondary-container/10 border border-secondary-container rounded-lg">
<span className="material-symbols-outlined text-secondary">info</span>
<p className="text-body-sm font-body-sm text-on-secondary-container">
                                    Suspended stores cannot accept new orders and their listings are hidden from search results.
                                </p>
</div>
</div>
</div>
<div className="space-y-md">
<div className="flex justify-between items-center">
<label className="text-label-md font-label-md">Communication Preview (Email Notification)</label>
<span className="text-[10px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded font-bold uppercase">Editable Template</span>
</div>
<div className="relative bg-surface border border-outline-variant rounded-lg p-md shadow-inner">
<div className="text-body-sm font-body-sm space-y-md text-on-surface-variant leading-relaxed min-h-[220px]">
<p><strong>Subject:</strong> Urgent: Your EcoThreads Store Access has been Suspended</p>
<p>Dear Marcus Thorne,</p>
<p>We are writing to inform you that your seller account on Ethizone, <strong>EcoThreads</strong>, has been suspended for <strong>30 days</strong> effective immediately.</p>
<p>This decision was made after multiple reports of <strong>Counterfeit Product Listings</strong> and <strong>Late Shipping Violations</strong> which violate our Seller Service Agreement sections 4.2 and 9.1.</p>
<p>During this period, your storefront will be inactive. To appeal this decision, please reply to this email with the requested evidence.</p>
<p>Regards,<br/>Ethizone Trust &amp; Safety Team</p>
</div>
</div>
<div className="flex items-center gap-2">
<input className="rounded border-outline-variant text-primary focus:ring-primary" id="send-copy" type="checkbox"/>
<label className="text-body-sm font-body-sm" htmlFor="send-copy">Send a copy to the regional account manager</label>
</div>
</div>
</div>
<div className="bg-surface-container-low p-lg flex justify-end gap-md">
<button className="px-lg py-sm text-on-surface-variant font-label-md hover:bg-surface-container-high rounded-lg transition-colors">Discard Draft</button>
<button className="px-xl py-sm bg-error text-on-error rounded-lg font-label-md shadow-lg hover:shadow-xl active:scale-95 transition-all" id="final-suspend-btn">Confirm &amp; Execute Suspension</button>
</div>
</section>
</div>
</main>

</div></div>
    </>
  );
}
