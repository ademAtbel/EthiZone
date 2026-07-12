import React from 'react';
import CustomerFooter from '../../components/CustomerFooter';
import CustomerNavbar from '../../components/CustomerNavbar';

export default function OrderDetailsPage() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-background text-on-surface">
{/*  SideNavBar (Shared Component)  */}
<CustomerNavbar />
{/*  TopNavBar (Shared Component)  */}
<header className="w-full h-16 fixed top-0 left-0 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline z-40 pl-64">
<div className="flex justify-between items-center px-margin-desktop h-full w-full">
<div className="flex items-center gap-md">
<span className="font-h4 text-h4 text-primary dark:text-primary-fixed-dim">Ethizone Seller</span>
</div>
<div className="flex items-center gap-xl">
<div className="relative hidden lg:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary w-64" placeholder="Search orders..." type="text"/>
</div>
<div className="flex items-center gap-md">
<span className="material-symbols-outlined text-primary cursor-pointer">notifications</span>
<span className="material-symbols-outlined text-primary cursor-pointer">help</span>
<div className="w-8 h-8 rounded-full bg-primary-fixed overflow-hidden border border-outline-variant cursor-pointer">
<img alt="Seller Profile Avatar" className="w-full h-full object-cover" data-alt="A professional studio portrait of a confident small business owner with a warm, welcoming expression. The lighting is soft and even, highlighting a clean and modern professional aesthetic suitable for a high-end marketplace interface. The background is a soft, out-of-focus neutral grey, emphasizing clarity and trust." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZdenKbCWDMyysGCy_ZlgsPCF2aEZe7DYHXeBqVB0hZZqjaEsqZItE7OlcG-dcU_X2oG88ktKIXb4RoNPDQGx2LPZKSnpnv6QvK6SnZFmsQOFqfbm4HR4hldFFMQSQHeLPcehz_xP_RQRY1qmtqpCCDLkDmBXq3q-HnlS51WY85828oe7feFL9alrR17AbOS0ukXFsTuTSfAZ04RkWTA0aSlG8tfUohdHmPte45lqvqx7vh4-pLQoQBQnj4V2pyVRae54CUfQ2d59w"/>
</div>
</div>
</div>
</div>
</header>
{/*  Main Content Canvas  */}
<main className="ml-64 pt-24 pb-xl px-margin-desktop max-w-[1440px] mx-auto">
{/*  Order Header Section  */}
<section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-xl">
<div>
<div className="flex items-center gap-sm mb-base">
<a className="text-primary hover:underline flex items-center gap-xs" href="#">
<span className="material-symbols-outlined text-[18px]">arrow_back</span>
<span className="font-label-md text-label-md">Back to Orders</span>
</a>
</div>
<div className="flex items-center gap-md">
<h2 className="font-h2 text-h2 text-on-surface">Order #ORD-7742</h2>
<span className="bg-secondary-container text-on-secondary-container px-md py-xs rounded-full font-label-sm text-label-sm uppercase tracking-wider">Processing</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-base">Placed on October 24, 2023 at 2:45 PM</p>
</div>
<div className="flex flex-wrap gap-md">
<button className="flex items-center gap-sm px-lg py-md border border-outline text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined">print</span>
                    Print Invoice
                </button>
<button className="flex items-center gap-sm px-lg py-md border border-outline text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined">download</span>
                    Download PDF
                </button>
<button className="flex items-center gap-sm px-lg py-md bg-error text-on-error rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined">cancel</span>
                    Cancel Order
                </button>
</div>
</section>
{/*  Order Dashboard Grid  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
{/*  Column 1: Order Info & Items (8 Columns)  */}
<div className="lg:col-span-8 flex flex-col gap-gutter">
{/*  Items Table Card  */}
<div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
<div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
<h3 className="font-h3 text-h3">Order Items</h3>
<span className="font-label-md text-label-md text-on-surface-variant">2 Items</span>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<tr>
<th className="px-lg py-md">Product</th>
<th className="px-lg py-md text-center">SKU</th>
<th className="px-lg py-md text-right">Price</th>
<th className="px-lg py-md text-center">Qty</th>
<th className="px-lg py-md text-right">Total</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr>
<td className="px-lg py-lg">
<div className="flex items-center gap-md">
<div className="w-16 h-16 bg-surface-container rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant">
<img alt="Minimalist White Watch" className="w-full h-full object-cover" data-alt="A studio photograph of a sleek, minimalist white wristwatch with a light grey leather strap against a clean, clinical white background. The lighting is bright and high-key, highlighting the premium textures and clean lines of the product. The visual style is contemporary, emphasizing a high-end lifestyle e-commerce aesthetic with soft, diffuse shadows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTOJ5FTE-Nf1TlGouQFyoMrkoMAt12qSe9uxVOdzdZUQVxOt0ZZXNk3dXfUugRm41ToMeejvRLA1pvCWgAzXE1Zdn4BydyUITpxvwJU59OBpF-HDGnE9vYoLoIeanNbOpQANjyN5FF99xvl_8HFlH8V3CdrMejGWBeR3QQMapGQYGL6tBM5NsKwLaxB7Nf8vAqvE9ZXQfMB3XslQYZ1Vu6ZsLfEcgqxA6YpeO-jPZFANojSC64aQl0cU6AuWeok4mSnogBippjwdlB"/>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface mb-xs">Minimalist Ceramic Watch</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Color: Arctic White | Size: 40mm</p>
</div>
</div>
</td>
<td className="px-lg py-lg text-center font-body-sm text-body-sm">WAT-CER-40-WHT</td>
<td className="px-lg py-lg text-right font-body-sm text-body-sm">$249.00</td>
<td className="px-lg py-lg text-center font-body-sm text-body-sm">1</td>
<td className="px-lg py-lg text-right font-label-md text-label-md font-bold">$249.00</td>
</tr>
<tr>
<td className="px-lg py-lg">
<div className="flex items-center gap-md">
<div className="w-16 h-16 bg-surface-container rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant">
<img alt="Classic Aviator Sunglasses" className="w-full h-full object-cover" data-alt="High-quality commercial product shot of classic aviator sunglasses with gold frames and dark green lenses. The item is placed on a reflective white surface with soft, overhead lighting that creates a professional, premium look. The atmosphere is clear and sharp, typical of a luxury e-commerce catalog featuring modern, clean aesthetics." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIqBGm-Hw4SfrvEon-978-qia45-Gx9ZHubRIWwK0Y1sSa0sbS2VK7RyKjvdAKom_MtwwpF2Y3jCf-fntcfMy4n8PVTvb4vpIlx-yPfN0uFW68_YznryhV-ND91jwXe2PGJFgOsb1pRvYv5EbT9BnBVJ9MbyCMl8ZTS7R5dlnX2yJ-5oqqSNjuTbRIjDl6mBfYqnuIZtBHWKc4epNuMQQECnPE1Ivdt1ftdC9a-3g0wE4aruKfiUr28uhxIpz0rxBlo4arKbNWCYyc"/>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface mb-xs">Gold Rim Aviators</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Case: Hard Shell | UV Protection</p>
</div>
</div>
</td>
<td className="px-lg py-lg text-center font-body-sm text-body-sm">SUN-GOL-AVI-01</td>
<td className="px-lg py-lg text-right font-body-sm text-body-sm">$120.00</td>
<td className="px-lg py-lg text-center font-body-sm text-body-sm">1</td>
<td className="px-lg py-lg text-right font-label-md text-label-md font-bold">$120.00</td>
</tr>
</tbody>
</table>
</div>
{/*  Order Summary  */}
<div className="p-lg bg-surface-container-low flex justify-end">
<div className="w-full max-w-xs space-y-sm">
<div className="flex justify-between items-center">
<span className="font-body-sm text-body-sm text-on-surface-variant">Subtotal</span>
<span className="font-body-sm text-body-sm">$369.00</span>
</div>
<div className="flex justify-between items-center">
<span className="font-body-sm text-body-sm text-on-surface-variant">Tax (VAT 10%)</span>
<span className="font-body-sm text-body-sm">$36.90</span>
</div>
<div className="flex justify-between items-center">
<span className="font-body-sm text-body-sm text-on-surface-variant">Shipping</span>
<span className="font-body-sm text-body-sm text-primary font-medium">Free</span>
</div>
<div className="pt-sm border-t border-outline-variant flex justify-between items-center">
<span className="font-label-md text-label-md text-on-surface">Total</span>
<span className="font-h3 text-h3 text-primary">$405.90</span>
</div>
</div>
</div>
</div>
{/*  Logistics Card (Fulfillment & Timeline)  */}
<div className="bg-surface border border-outline-variant rounded-xl p-lg shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
<div className="flex justify-between items-center mb-xl">
<h3 className="font-h3 text-h3">Fulfillment &amp; Timeline</h3>
<div className="flex items-center gap-md">
<select className="bg-surface border border-outline rounded-lg font-label-md text-label-md px-lg py-md focus:ring-2 focus:ring-primary focus:border-primary transition-all">
<option>Processing</option>
<option>Shipped</option>
<option>Delivered</option>
<option>Hold</option>
</select>
<button className="bg-primary text-on-primary px-lg py-md rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors">Update Status</button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
{/*  Tracking Input  */}
<div>
<label className="block font-label-md text-label-md text-on-surface mb-sm">Add Tracking Number</label>
<div className="flex gap-sm">
<input className="flex-grow border border-outline rounded-lg px-md py-md focus:ring-2 focus:ring-secondary-container outline-none" placeholder="e.g., FEDEX-123456" type="text"/>
<button className="bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md px-lg py-md rounded-lg hover:bg-secondary-fixed-dim transition-colors">Save</button>
</div>
<p className="text-label-sm font-label-sm text-on-surface-variant mt-sm">Notify customer via email upon saving.</p>
</div>
{/*  Timeline  */}
<div className="relative pl-gutter">
<div className="absolute left-0 top-0 bottom-0 w-[2px] bg-outline-variant ml-[7px]"></div>
{/*  Timeline Items  */}
<div className="space-y-lg">
<div className="relative flex gap-md">
<div className="w-4 h-4 rounded-full bg-primary mt-1 border-4 border-primary-fixed z-10"></div>
<div>
<p className="font-label-md text-label-md text-on-surface">Processing Started</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Oct 25, 2023 - 09:12 AM</p>
</div>
</div>
<div className="relative flex gap-md">
<div className="w-4 h-4 rounded-full bg-primary mt-1 border-4 border-primary-fixed z-10"></div>
<div>
<p className="font-label-md text-label-md text-on-surface">Payment Confirmed</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Oct 24, 2023 - 02:47 PM</p>
</div>
</div>
<div className="relative flex gap-md">
<div className="w-4 h-4 rounded-full bg-primary mt-1 border-4 border-primary-fixed z-10"></div>
<div>
<p className="font-label-md text-label-md text-on-surface">Order Placed</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Oct 24, 2023 - 02:45 PM</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
{/*  Column 2: Customer & Shipping Details (4 Columns)  */}
<div className="lg:col-span-4 flex flex-col gap-gutter">
{/*  Customer Profile Card  */}
<div className="bg-surface border border-outline-variant rounded-xl p-lg shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
<h3 className="font-h3 text-h3 mb-lg">Customer Profile</h3>
<div className="flex items-center gap-md mb-xl">
<div className="w-16 h-16 rounded-full bg-secondary-fixed overflow-hidden border-2 border-surface-container-high">
<img alt="Sarah Jenkins Avatar" className="w-full h-full object-cover" data-alt="A friendly and professional portrait of a customer, Sarah Jenkins, with a warm smile. She is depicted in a natural, bright daylight setting that feels authentic and trustworthy. The photo is framed in a circle, maintaining a modern, high-quality user experience design aesthetic consistent with a global marketplace platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsgfZFxgwS59iLuBcNXTvyum4YDOj3c-EmVLglrkVfKVKWTihzWWx5jLn6onuyFqkQc5pfMTYLNF3b46GvE0iMv6MhwJDyuIBCEV5rb0ckDW7AORvJ24ijif30sgl3427HEi2mUNO5-ZuubXswhRPJL9bcuHka9PQHvswSygF0jybBuAiq20sXdW6T9knUQ9l4Rf2sEzPZZ8SURE1pknSBr1itO0dWqbucKzrIdE9Rw0DiaXfxm9in5QgI_bOT2QCQ4ulEDR3oKTBu"/>
</div>
<div>
<p className="font-h4 text-h4">Sarah Jenkins</p>
<p className="font-label-md text-label-md text-primary">Top Tier Buyer</p>
</div>
</div>
<div className="space-y-lg mb-xl">
<div className="flex items-center gap-md">
<span className="material-symbols-outlined text-on-surface-variant">mail</span>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Email Address</p>
<p className="font-body-md text-body-md">sarah.jenkins@example.com</p>
</div>
</div>
<div className="flex items-center gap-md">
<span className="material-symbols-outlined text-on-surface-variant">call</span>
<div>
<div className="flex items-center gap-xs">
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Phone Number</p>
<span className="material-symbols-outlined text-primary text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
</div>
<p className="font-body-md text-body-md">+1 (555) 012-3456</p>
</div>
</div>
</div>
<button className="w-full bg-surface border border-primary text-primary font-label-md text-label-md py-md rounded-lg flex items-center justify-center gap-sm hover:bg-surface-container-low transition-colors active:scale-[0.98]">
<span className="material-symbols-outlined">chat_bubble</span>
                        Contact Customer
                    </button>
</div>
{/*  Shipping Address Card  */}
<div className="bg-surface border border-outline-variant rounded-xl p-lg shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
<div className="flex justify-between items-start mb-lg">
<h3 className="font-h3 text-h3">Shipping Address</h3>
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer">edit</span>
</div>
<div className="bg-surface-container-lowest border border-outline-variant p-md rounded-lg mb-lg">
<p className="font-label-md text-label-md text-on-surface mb-base">Sarah Jenkins</p>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                            742 Evergreen Terrace<br/>
                            Springfield, OR 97477<br/>
                            United States
                        </p>
</div>
{/*  Map Placeholder  */}
<div className="w-full h-32 rounded-lg bg-surface-container-high overflow-hidden relative group">
<img alt="Map view of Springfield, Oregon" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A clean, stylized satellite map view showing a suburban neighborhood in Springfield, Oregon. The map uses a soft, light-mode color palette with pastel greens and subtle greys, avoiding harsh contrasts. It represents a professional, integrated logistics view within a dashboard, emphasizing precision and location clarity." data-location="Springfield, Oregon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPH0pINMciQ-iOsnjH8Ognb0k9-RM3AkciVchy6U_AeeywCjk2AIBEMDWjIqaqgvmEg4enUMO4c3grey4X8IrxWP38FlEXxNyOd-6eeErsE_Le62yjCpStIeeNmotXBBlTijBz5xTr8myzRb6D2092s6MWLVYA3FBXy20rZQIikp1hi2P0cm2peykFaS7vByGZcptz8iyPEwL0WngPxPSdCk98F5Wi0AD5AMnEmL82Cj_LG1Zu_8aFT5pzR4vawKOIV5rHJuCOBDZz"/>
<div className="absolute inset-0 bg-black/10 flex items-center justify-center">
<div className="bg-primary text-on-primary p-xs rounded-full shadow-lg animate-bounce">
<span className="material-symbols-outlined">location_on</span>
</div>
</div>
</div>
</div>
{/*  Internal Notes Card  */}
<div className="bg-surface border border-outline-variant rounded-xl p-lg shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
<h3 className="font-h3 text-h3 mb-md">Seller Notes</h3>
<textarea className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md font-body-sm text-body-sm focus:ring-2 focus:ring-primary outline-none min-h-[100px]" placeholder="Add a private note for your team..."></textarea>
<div className="mt-md flex justify-end">
<button className="font-label-md text-label-md text-primary px-md py-sm hover:bg-surface-container-high rounded-lg">Save Note</button>
</div>
</div>
</div>
</div>
</main>
{/*  Success Message Micro-interaction (Hidden by default)  */}
<div className="fixed bottom-margin-desktop right-margin-desktop bg-inverse-surface text-inverse-on-surface px-xl py-md rounded-xl shadow-2xl flex items-center gap-md transform translate-y-24 opacity-0 transition-all duration-300 z-[100]" id="toast">
<span className="material-symbols-outlined text-primary-fixed">check_circle</span>
<span className="font-label-md text-label-md">Status updated successfully</span>
</div>

</div></div>
    </>
  );
}
