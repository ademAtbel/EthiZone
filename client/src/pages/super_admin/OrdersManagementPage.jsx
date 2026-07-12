import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function OrdersManagementPage() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-background text-on-background min-h-screen flex">
{/*  SideNavBar (Authority: JSON & Contextual Logic)  */}
<AdminSidebar />
{/*  Main Content Canvas  */}
<main className="ml-64 flex-1 flex flex-col min-h-screen">
{/*  Header Section  */}
<header className="sticky top-0 bg-surface-container-lowest z-30 px-margin-desktop h-16 flex items-center justify-between border-b border-outline-variant shadow-sm">
<div className="flex items-center gap-md">
<h2 className="text-h3 font-h3 text-on-surface">Orders</h2>
<div className="hidden md:flex items-center bg-surface-container-low border border-outline-variant rounded-lg px-3 py-1.5 w-80 focus-within:ring-2 focus-within:ring-secondary/20 transition-all">
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
<input className="bg-transparent border-none focus:ring-0 text-body-sm font-body-sm w-full ml-2" placeholder="Search ID or Customer..." type="text"/>
</div>
</div>
<div className="flex items-center gap-md">
<button className="relative p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
</button>
<div className="h-8 w-[1px] bg-outline-variant"></div>
<button className="flex items-center gap-sm bg-primary text-on-primary px-lg py-2 rounded-lg text-label-md font-label-md hover:opacity-90 transition-all active:scale-95 shadow-sm">
<span className="material-symbols-outlined text-[18px]">export_notes</span>
                    Export CSV
                </button>
</div>
</header>
{/*  Page Content  */}
<div className="p-margin-desktop max-w-[1440px] mx-auto w-full">
{/*  Filters Bar  */}
<section className="mb-lg flex flex-col md:flex-row items-center justify-between gap-md">
<div className="flex flex-wrap items-center gap-sm overflow-x-auto pb-1 custom-scrollbar">
<button className="px-md py-2 bg-primary text-on-primary rounded-full text-label-sm font-label-sm transition-colors whitespace-nowrap">All Orders</button>
<button className="px-md py-2 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest rounded-full text-label-sm font-label-sm transition-colors whitespace-nowrap">Pending</button>
<button className="px-md py-2 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest rounded-full text-label-sm font-label-sm transition-colors whitespace-nowrap">Processing</button>
<button className="px-md py-2 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest rounded-full text-label-sm font-label-sm transition-colors whitespace-nowrap">Shipped</button>
<button className="px-md py-2 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest rounded-full text-label-sm font-label-sm transition-colors whitespace-nowrap">Delivered</button>
<button className="px-md py-2 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest rounded-full text-label-sm font-label-sm transition-colors whitespace-nowrap">Cancelled</button>
</div>
<div className="flex items-center gap-sm">
<div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 gap-2 cursor-pointer hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">calendar_today</span>
<span className="text-label-sm font-label-sm">Oct 1, 2024 - Oct 31, 2024</span>
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">keyboard_arrow_down</span>
</div>
</div>
</section>
{/*  Orders Table Container  */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant">
<th className="px-md py-lg text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Order ID</th>
<th className="px-md py-lg text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Date</th>
<th className="px-md py-lg text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Customer</th>
<th className="px-md py-lg text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Items</th>
<th className="px-md py-lg text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Total</th>
<th className="px-md py-lg text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Payment</th>
<th className="px-md py-lg text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
<th className="px-md py-lg text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
{/*  Row 1  */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-md py-lg text-body-sm font-body-sm text-primary font-semibold">#ORD-7742</td>
<td className="px-md py-lg text-body-sm font-body-sm text-on-surface-variant">Oct 12, 2024</td>
<td className="px-md py-lg">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-[10px] font-bold">SJ</div>
<span className="text-body-sm font-body-sm font-medium">Sarah Jenkins</span>
</div>
</td>
<td className="px-md py-lg text-body-sm font-body-sm">2 items</td>
<td className="px-md py-lg text-body-sm font-body-sm font-semibold">$45.00</td>
<td className="px-md py-lg">
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-primary-container/10 text-primary-container border border-primary-container/20 uppercase tracking-tighter">Paid</span>
</td>
<td className="px-md py-lg">
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-secondary-container text-on-secondary-container">Processing</span>
</td>
<td className="px-md py-lg text-right">
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant group-hover:text-primary">
<span className="material-symbols-outlined">visibility</span>
</button>
</td>
</tr>
{/*  Row 2  */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-md py-lg text-body-sm font-body-sm text-primary font-semibold">#ORD-7738</td>
<td className="px-md py-lg text-body-sm font-body-sm text-on-surface-variant">Oct 11, 2024</td>
<td className="px-md py-lg">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center text-[10px] font-bold">MC</div>
<span className="text-body-sm font-body-sm font-medium">Michael Chen</span>
</div>
</td>
<td className="px-md py-lg text-body-sm font-body-sm">1 item</td>
<td className="px-md py-lg text-body-sm font-body-sm font-semibold">$128.50</td>
<td className="px-md py-lg">
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-primary-container/10 text-primary-container border border-primary-container/20 uppercase tracking-tighter">Paid</span>
</td>
<td className="px-md py-lg">
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-primary-container/10 text-primary uppercase tracking-tighter font-bold">Delivered</span>
</td>
<td className="px-md py-lg text-right">
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant group-hover:text-primary">
<span className="material-symbols-outlined">visibility</span>
</button>
</td>
</tr>
{/*  Row 3  */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-md py-lg text-body-sm font-body-sm text-primary font-semibold">#ORD-7735</td>
<td className="px-md py-lg text-body-sm font-body-sm text-on-surface-variant">Oct 11, 2024</td>
<td className="px-md py-lg">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center text-[10px] font-bold">EW</div>
<span className="text-body-sm font-body-sm font-medium">Emma Wilson</span>
</div>
</td>
<td className="px-md py-lg text-body-sm font-body-sm">3 items</td>
<td className="px-md py-lg text-body-sm font-body-sm font-semibold">$22.40</td>
<td className="px-md py-lg">
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-error-container/20 text-error border border-error-container/40 uppercase tracking-tighter">Pending</span>
</td>
<td className="px-md py-lg">
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-surface-container-high text-on-surface-variant">Pending</span>
</td>
<td className="px-md py-lg text-right">
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant group-hover:text-primary">
<span className="material-symbols-outlined">visibility</span>
</button>
</td>
</tr>
{/*  Row 4  */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-md py-lg text-body-sm font-body-sm text-primary font-semibold">#ORD-7731</td>
<td className="px-md py-lg text-body-sm font-body-sm text-on-surface-variant">Oct 10, 2024</td>
<td className="px-md py-lg">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-primary-fixed-dim text-on-primary-fixed-variant flex items-center justify-center text-[10px] font-bold">DR</div>
<span className="text-body-sm font-body-sm font-medium">David Rodriguez</span>
</div>
</td>
<td className="px-md py-lg text-body-sm font-body-sm">5 items</td>
<td className="px-md py-lg text-body-sm font-body-sm font-semibold">$310.00</td>
<td className="px-md py-lg">
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-primary-container/10 text-primary-container border border-primary-container/20 uppercase tracking-tighter">Paid</span>
</td>
<td className="px-md py-lg">
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-secondary-container/20 text-secondary font-bold tracking-tighter">Shipped</span>
</td>
<td className="px-md py-lg text-right">
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant group-hover:text-primary">
<span className="material-symbols-outlined">visibility</span>
</button>
</td>
</tr>
{/*  Row 5  */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-md py-lg text-body-sm font-body-sm text-primary font-semibold">#ORD-7729</td>
<td className="px-md py-lg text-body-sm font-body-sm text-on-surface-variant">Oct 10, 2024</td>
<td className="px-md py-lg">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center text-[10px] font-bold">LS</div>
<span className="text-body-sm font-body-sm font-medium">Liam Smith</span>
</div>
</td>
<td className="px-md py-lg text-body-sm font-body-sm">1 item</td>
<td className="px-md py-lg text-body-sm font-body-sm font-semibold">$15.99</td>
<td className="px-md py-lg">
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-error-container/20 text-error border border-error-container/40 uppercase tracking-tighter">Refunded</span>
</td>
<td className="px-md py-lg">
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-error-container text-on-error-container">Cancelled</span>
</td>
<td className="px-md py-lg text-right">
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant group-hover:text-primary">
<span className="material-symbols-outlined">visibility</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
{/*  Pagination Footer  */}
<div className="px-md py-lg bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
<p className="text-label-sm font-label-sm text-on-surface-variant">Showing <span className="font-bold text-on-surface">1-5</span> of <span className="font-bold text-on-surface">128</span> orders</p>
<div className="flex items-center gap-base">
<button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50" disabled="">
<span className="material-symbols-outlined text-[20px]">chevron_left</span>
</button>
<button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary text-label-sm font-label-sm">1</button>
<button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high text-label-sm font-label-sm">2</button>
<button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high text-label-sm font-label-sm">3</button>
<span className="px-1 text-on-surface-variant">...</span>
<button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high text-label-sm font-label-sm">26</button>
<button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</div>
</div>
</div>
{/*  Dashboard Analytics Preview (Bento Grid Element)  */}
<section className="mt-xl grid grid-cols-1 md:grid-cols-3 gap-md">
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant flex flex-col gap-sm">
<div className="flex items-center justify-between">
<span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Total Revenue</span>
<span className="material-symbols-outlined text-primary">trending_up</span>
</div>
<p className="text-h4 font-h4 text-on-surface">$12,480.00</p>
<div className="flex items-center gap-xs text-[12px] text-primary">
<span className="material-symbols-outlined text-[14px]">north</span>
<span className="font-bold">12%</span>
<span className="text-on-surface-variant font-normal">vs last month</span>
</div>
</div>
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant flex flex-col gap-sm">
<div className="flex items-center justify-between">
<span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Active Shipments</span>
<span className="material-symbols-outlined text-secondary">local_shipping</span>
</div>
<p className="text-h4 font-h4 text-on-surface">42</p>
<div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
<div className="bg-secondary h-full" style={{width: '65%'}}></div>
</div>
<p className="text-label-sm font-label-sm text-on-surface-variant">65% on track for delivery</p>
</div>
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant flex flex-col gap-sm">
<div className="flex items-center justify-between">
<span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Customer Satisfaction</span>
<span className="material-symbols-outlined text-tertiary">star</span>
</div>
<p className="text-h4 font-h4 text-on-surface">4.8/5.0</p>
<div className="flex gap-0.5">
<span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star_half</span>
</div>
<p className="text-label-sm font-label-sm text-on-surface-variant">Based on 214 reviews</p>
</div>
</section>
</div>
{/*  Footer (Authority: JSON & Contextual Suppression)  */}
<footer className="mt-auto bg-surface-container-high border-t border-outline-variant py-md px-margin-desktop">
<div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-md">
<p className="text-label-sm font-label-sm text-on-surface-variant">© 2024 Ethizone Marketplace. All rights reserved.</p>
<div className="flex items-center gap-xl">
<a className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-all" href="#">Support Center</a>
<a className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-all" href="#">Privacy Policy</a>
<a className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-all" href="#">Terms of Service</a>
</div>
</div>
</footer>
</main>

</div></div>
    </>
  );
}
