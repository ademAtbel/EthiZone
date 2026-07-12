import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function AdminTicketManagementDashboard() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-background text-on-background min-h-screen">
{/*  SideNavBar  */}
<AdminSidebar />
{/*  Main Content Area  */}
<main className="lg:ml-64 min-h-screen flex flex-col">
{/*  TopNavBar  */}
<header className="w-full h-16 bg-surface-container-lowest flex justify-between items-center px-lg border-b border-outline-variant">
<div className="flex items-center gap-md flex-1">
<div className="relative w-full max-w-md">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" data-icon="search">search</span>
<input className="w-full pl-10 pr-4 py-2 bg-surface-container text-body-sm font-body-sm rounded-lg border-none focus:ring-2 focus:ring-secondary/20 transition-all" placeholder="Search tickets, sellers or agents..." type="text"/>
</div>
</div>
<div className="flex items-center gap-lg">
<div className="flex items-center gap-md">
<button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors cursor-pointer active:scale-95">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors cursor-pointer active:scale-95">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
</button>
</div>
<div className="flex items-center gap-sm pl-md border-l border-outline-variant">
<img alt="Administrator profile photo" className="w-8 h-8 rounded-full object-cover" data-alt="A professional headshot of a senior administrator in a high-tech office. The subject is a man in his late 40s wearing a tailored charcoal suit and a crisp white shirt, exuding confidence and reliability. The background features a blurred modern workspace with soft cool-toned ambient lighting. The overall mood is professional, corporate, and authoritative, aligning with a high-end marketplace management aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDevwQd0Y21M8UGd5iykTAh-R4c3Y0juOxjmZ3lNAzbDJJ7qJMVyCfz-0MdI9HHSpkz71VE0a_5625TLGbCZn3CrRFvR6q3kGP4zHQLhzNjtgEd_n7SRdWf_i-rtR2KYwNPDt3SaTbuq22e_wO-hZ4w6VPq2d3RjqPIS8zdVFSFgB0hQu9OaCodbkTUHUkjoODzL9kSo7cZQfJs2xT0MHI2apSRWI3AG7cHu-BsbnaPVuwuDGYg33MG2dyMX5FzmZrkqb5hYqe6tOz6"/>
<div className="hidden sm:block">
<p className="font-label-md text-label-md text-on-surface leading-tight">Admin Unit-04</p>
<p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Super Admin</p>
</div>
</div>
</div>
</header>
<div className="p-lg flex flex-col gap-lg lg:flex-row max-w-[1440px] mx-auto w-full">
{/*  Left: Main Dashboard Content  */}
<div className="flex-1 flex flex-col gap-lg overflow-hidden">
{/*  Page Title  */}
<section>
<h1 className="font-h2 text-h2 text-on-surface">Ticket Management</h1>
<p className="font-body-md text-body-md text-on-surface-variant">Monitor and resolve vendor inquiries across the global marketplace.</p>
</section>
{/*  Statistics Row  */}
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:translate-y-[-2px] transition-transform">
<div className="flex justify-between items-start mb-sm">
<span className="material-symbols-outlined p-2 bg-primary/10 text-primary rounded-lg" data-icon="confirmation_number">confirmation_number</span>
<span className="text-primary font-label-sm text-label-sm bg-primary/5 px-2 py-0.5 rounded-full">+12%</span>
</div>
<h3 className="text-on-surface-variant font-label-md text-label-md">Total Open Tickets</h3>
<p className="text-h3 font-h3 text-on-surface">1,284</p>
</div>
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:translate-y-[-2px] transition-transform">
<div className="flex justify-between items-start mb-sm">
<span className="material-symbols-outlined p-2 bg-secondary/10 text-secondary rounded-lg" data-icon="timer">timer</span>
<span className="text-secondary font-label-sm text-label-sm bg-secondary/5 px-2 py-0.5 rounded-full">-5m</span>
</div>
<h3 className="text-on-surface-variant font-label-md text-label-md">Avg. Response Time</h3>
<p className="text-h3 font-h3 text-on-surface">14m 20s</p>
</div>
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:translate-y-[-2px] transition-transform">
<div className="flex justify-between items-start mb-sm">
<span className="material-symbols-outlined p-2 bg-error/10 text-error rounded-lg" data-icon="warning">warning</span>
<span className="text-error font-label-sm text-label-sm bg-error/5 px-2 py-0.5 rounded-full">High</span>
</div>
<h3 className="text-on-surface-variant font-label-md text-label-md">SLA Breaches</h3>
<p className="text-h3 font-h3 text-on-surface">23</p>
</div>
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:translate-y-[-2px] transition-transform">
<div className="flex justify-between items-start mb-sm">
<span className="material-symbols-outlined p-2 bg-on-tertiary-fixed-variant/10 text-tertiary rounded-lg" data-icon="check_circle">check_circle</span>
<span className="text-on-tertiary-fixed-variant font-label-sm text-label-sm bg-tertiary/10 px-2 py-0.5 rounded-full">24h</span>
</div>
<h3 className="text-on-surface-variant font-label-md text-label-md">Recently Resolved</h3>
<p className="text-h3 font-h3 text-on-surface">412</p>
</div>
</section>
{/*  Ticket Table Section  */}
<section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col">
{/*  Table Header & Filters  */}
<div className="p-md border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-md">
<div className="flex items-center gap-xs overflow-x-auto pb-2 md:pb-0">
<button className="px-md py-sm bg-primary text-on-primary rounded-full font-label-sm text-label-sm whitespace-nowrap">All</button>
<button className="px-md py-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high rounded-full font-label-sm text-label-sm transition-colors whitespace-nowrap">My Tickets</button>
<button className="px-md py-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high rounded-full font-label-sm text-label-sm transition-colors whitespace-nowrap">Unassigned</button>
<button className="px-md py-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high rounded-full font-label-sm text-label-sm transition-colors whitespace-nowrap flex items-center gap-xs">
                                High Priority <span className="w-4 h-4 bg-error text-white text-[10px] flex items-center justify-center rounded-full">8</span>
</button>
</div>
<div className="flex items-center gap-sm">
<button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[20px]" data-icon="filter_list">filter_list</span>
</button>
<button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[20px]" data-icon="download">download</span>
</button>
</div>
</div>
{/*  Table  */}
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant">
<th className="px-md py-4 font-label-sm text-label-sm text-on-surface-variant">Ticket ID</th>
<th className="px-md py-4 font-label-sm text-label-sm text-on-surface-variant">Seller Name</th>
<th className="px-md py-4 font-label-sm text-label-sm text-on-surface-variant">Category</th>
<th className="px-md py-4 font-label-sm text-label-sm text-on-surface-variant">Priority</th>
<th className="px-md py-4 font-label-sm text-label-sm text-on-surface-variant">Agent</th>
<th className="px-md py-4 font-label-sm text-label-sm text-on-surface-variant">Status</th>
<th className="px-md py-4 font-label-sm text-label-sm text-on-surface-variant text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
{/*  Row 1  */}
<tr className="hover:bg-surface-container-lowest/50 transition-colors">
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface">#TK-8821</td>
<td className="px-md py-4">
<div className="flex items-center gap-sm">
<div className="w-6 h-6 bg-secondary/10 text-secondary rounded flex items-center justify-center text-[10px] font-bold">AS</div>
<span className="font-body-sm text-body-sm text-on-surface">Artisan Studio</span>
</div>
</td>
<td className="px-md py-4">
<span className="bg-surface-container text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm">Payment</span>
</td>
<td className="px-md py-4">
<span className="flex items-center gap-xs text-error font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-error"></span> High
                                        </span>
</td>
<td className="px-md py-4">
<div className="flex -space-x-2">
<img className="w-6 h-6 rounded-full border-2 border-white" data-alt="Close-up portrait of a male support agent with a friendly expression. Soft, warm studio lighting highlights his facial features against a clean, neutral background. He wears a simple blue polo shirt, suggesting a casual yet professional tech-startup environment. The focus is sharp on his eyes to convey trustworthiness and accessibility." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXRV-sbw1KHtfqyBJOK5CUD6vk6BZtbDnuMWtqQtvFcWVCvU_yDwPGkcGchOH-tqLRgovpI-swhw7P3PSwFSAbBviZ5zfSll-1B2O16wIHF5GwpW9jvaX278s3-MF70eE6tk4m1ef1s4SaELTWLKcH5hsbjTcugNXIIGyJBRnguuJdr2ulyqqdMzhy6-N4ceKV2Nteyg8CRve43QF_C26XRTyuN6jkhSGiHLVNDLy6581adFK3zFEp_GpKeCWfnCOQZpJnNsg5bR0P"/>
</div>
</td>
<td className="px-md py-4">
<span className="bg-error-container text-on-error-container px-2 py-1 rounded font-label-sm text-label-sm">Open</span>
</td>
<td className="px-md py-4 text-right">
<div className="flex items-center justify-end gap-xs">
<button className="p-1.5 hover:bg-surface-container-high rounded text-primary transition-colors" title="Open Chat">
<span className="material-symbols-outlined text-[18px]" data-icon="chat">chat</span>
</button>
<button className="p-1.5 hover:bg-surface-container-high rounded text-on-surface-variant transition-colors" title="Change Status">
<span className="material-symbols-outlined text-[18px]" data-icon="sync_alt">sync_alt</span>
</button>
</div>
</td>
</tr>
{/*  Row 2  */}
<tr className="hover:bg-surface-container-lowest/50 transition-colors">
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface">#TK-8819</td>
<td className="px-md py-4">
<div className="flex items-center gap-sm">
<div className="w-6 h-6 bg-primary/10 text-primary rounded flex items-center justify-center text-[10px] font-bold">GT</div>
<span className="font-body-sm text-body-sm text-on-surface">GreenTech Ltd.</span>
</div>
</td>
<td className="px-md py-4">
<span className="bg-surface-container text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm">Technical</span>
</td>
<td className="px-md py-4">
<span className="flex items-center gap-xs text-on-surface-variant font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-outline"></span> Low
                                        </span>
</td>
<td className="px-md py-4">
<span className="font-body-sm text-body-sm text-on-surface-variant italic">Unassigned</span>
</td>
<td className="px-md py-4">
<span className="bg-surface-container text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm">In Progress</span>
</td>
<td className="px-md py-4 text-right">
<div className="flex items-center justify-end gap-xs">
<button className="p-1.5 hover:bg-surface-container-high rounded text-primary transition-colors">
<span className="material-symbols-outlined text-[18px]" data-icon="chat">chat</span>
</button>
<button className="p-1.5 hover:bg-surface-container-high rounded text-on-surface-variant transition-colors">
<span className="material-symbols-outlined text-[18px]" data-icon="sync_alt">sync_alt</span>
</button>
</div>
</td>
</tr>
{/*  Row 3  */}
<tr className="hover:bg-surface-container-lowest/50 transition-colors">
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface">#TK-8790</td>
<td className="px-md py-4">
<div className="flex items-center gap-sm">
<div className="w-6 h-6 bg-tertiary/10 text-tertiary rounded flex items-center justify-center text-[10px] font-bold">NS</div>
<span className="font-body-sm text-body-sm text-on-surface">Nordic Style</span>
</div>
</td>
<td className="px-md py-4">
<span className="bg-surface-container text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm">Account</span>
</td>
<td className="px-md py-4">
<span className="flex items-center gap-xs text-secondary font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span> Medium
                                        </span>
</td>
<td className="px-md py-4">
<img className="w-6 h-6 rounded-full border-2 border-white" data-alt="A portrait of a female agent smiling confidently in a modern, brightly lit office space. The image uses a shallow depth of field to keep the focus on her friendly expression. Her attire is professional yet modern, wearing a light-colored blouse. The lighting is soft and airy, emphasizing a positive and helpful customer service culture." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYlk98IsG1XGNAFQf4YweV_sWPQQak63fvZM64EXVi7phZB8qRxvjZ5-gLN_7eRdw20_TMF3s47uonN9EwxnUx06sgJ0ctvFQI3Tur2oiZ9QaV5jhIIFrOPl4nQhFW77bJWQL4UBJYGTAbv7KSesyM_rLlLE14GF2yQdZpVzzqKKPM6KlKhDn0jBIH0S5gt1Y0hC990T7yfp71z6y7uxwyqm5HE5LT_9H17vxQ3xwbRvGDU1qIRZ5VU5R-7Vpx1sAKdQQX0rbufhuR"/>
</td>
<td className="px-md py-4">
<span className="bg-primary-container text-on-primary-container px-2 py-1 rounded font-label-sm text-label-sm">Resolved</span>
</td>
<td className="px-md py-4 text-right">
<div className="flex items-center justify-end gap-xs">
<button className="p-1.5 hover:bg-surface-container-high rounded text-primary transition-colors">
<span className="material-symbols-outlined text-[18px]" data-icon="chat">chat</span>
</button>
<button className="p-1.5 hover:bg-surface-container-high rounded text-on-surface-variant transition-colors">
<span className="material-symbols-outlined text-[18px]" data-icon="sync_alt">sync_alt</span>
</button>
</div>
</td>
</tr>
{/*  Row 4  */}
<tr className="hover:bg-surface-container-lowest/50 transition-colors">
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface">#TK-8782</td>
<td className="px-md py-4">
<div className="flex items-center gap-sm">
<div className="w-6 h-6 bg-error/10 text-error rounded flex items-center justify-center text-[10px] font-bold">VB</div>
<span className="font-body-sm text-body-sm text-on-surface">Vintage Boutique</span>
</div>
</td>
<td className="px-md py-4">
<span className="bg-surface-container text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm">Logistics</span>
</td>
<td className="px-md py-4">
<span className="flex items-center gap-xs text-error font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-error"></span> High
                                        </span>
</td>
<td className="px-md py-4">
<img className="w-6 h-6 rounded-full border-2 border-white" data-alt="Professional studio portrait of a customer success manager with a serious but helpful expression. The lighting is high-key and bright, reflecting a professional light-mode aesthetic. She is wearing a minimalist blazer over a white top. The background is a clean, slightly textured light gray, keeping all attention on her expert and reliable persona." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD17JTCiW7KalYiSM9EhubL_WcU9fF_sPHOhNiXl8Y6YtaaYusccBIexKHdBsShrgcIGo5Si9JzqRDwTniHn22gnv_H2pcQCmqWzjpuSEFCG844SZ1p1Y9uD7FQB_WTYXiKlpE9dxrUxoGxGT1-iBotxk90dOf-cA9EAS2ks8n55Zb5p52g7QPxsUIRUwQ0IrxNK7lbeX05H7VGDDryeffF2mMi6wkvfKA-cDcXGfgYxqbudiCNNFo0mpQ3pm3llsZpZDXV7Hzsi8_G"/>
</td>
<td className="px-md py-4">
<span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded font-label-sm text-label-sm">Pending Seller</span>
</td>
<td className="px-md py-4 text-right">
<div className="flex items-center justify-end gap-xs">
<button className="p-1.5 hover:bg-surface-container-high rounded text-primary transition-colors">
<span className="material-symbols-outlined text-[18px]" data-icon="chat">chat</span>
</button>
<button className="p-1.5 hover:bg-surface-container-high rounded text-on-surface-variant transition-colors">
<span className="material-symbols-outlined text-[18px]" data-icon="sync_alt">sync_alt</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/*  Pagination  */}
<div className="p-md flex items-center justify-between border-t border-outline-variant">
<p className="font-label-sm text-label-sm text-on-surface-variant">Showing 1 to 4 of 1,284 entries</p>
<div className="flex items-center gap-sm">
<button className="p-1 hover:bg-surface-container rounded border border-outline-variant disabled:opacity-30" disabled="">
<span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
</button>
<span className="font-label-sm text-label-sm font-bold bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded">1</span>
<span className="font-label-sm text-label-sm w-8 h-8 flex items-center justify-center hover:bg-surface-container rounded cursor-pointer">2</span>
<span className="font-label-sm text-label-sm w-8 h-8 flex items-center justify-center hover:bg-surface-container rounded cursor-pointer">3</span>
<button className="p-1 hover:bg-surface-container rounded border border-outline-variant">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</section>
</div>
{/*  Right: Logic Conflicts / Alerts Panel  */}
<AdminSidebar />
</div>
</main>
{/*  Success Toast Notification (Invisible by default)  */}
<div className="fixed bottom-lg right-lg bg-inverse-surface text-inverse-on-surface px-lg py-md rounded-xl shadow-xl translate-y-20 opacity-0 transition-all duration-300 flex items-center gap-md z-50" id="toast">
<span className="material-symbols-outlined text-primary-fixed" data-icon="check_circle">check_circle</span>
<span className="font-body-sm text-body-sm">Ticket #TK-8821 status updated successfully.</span>
</div>

</div></div>
    </>
  );
}
