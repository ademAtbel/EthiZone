import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function ManageUsersPage() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-background text-on-surface">
{/*  Sidebar Navigation Shell  */}
<AdminSidebar />
{/*  Main Content Area  */}
<main className="ml-64 min-h-screen">
{/*  Top Navigation Bar  */}
<header className="bg-surface-bright dark:bg-surface-container-low border-b border-outline-variant flex justify-between items-center h-16 px-xl sticky top-0 z-40">
<div className="flex items-center gap-xl flex-1">
<span className="font-h4 text-h4 font-bold text-on-surface dark:text-on-surface-variant">Marketplace Admin</span>
{/*  Breadcrumbs/Context  */}
<div className="hidden md:flex items-center gap-xs text-on-surface-variant font-label-sm">
<span>Main</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
<span className="text-primary font-bold">Manage Users</span>
</div>
</div>
<div className="flex items-center gap-lg">
{/*  Search Bar on Left (as per JSON request)  */}
<div className="relative hidden lg:block w-72">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full bg-surface-container-low border border-outline-variant rounded-full pl-10 pr-4 py-2 font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary" placeholder="Global system search..." type="text"/>
</div>
<div className="flex items-center gap-md">
<button className="hover:bg-surface-container dark:hover:bg-surface-container-highest rounded-full p-2 transition-transform duration-150 active:scale-95 text-on-surface-variant">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="hover:bg-surface-container dark:hover:bg-surface-container-highest rounded-full p-2 transition-transform duration-150 active:scale-95 text-on-surface-variant">
<span className="material-symbols-outlined">account_circle</span>
</button>
</div>
</div>
</header>
{/*  Page Content  */}
<div className="p-xl space-y-xl max-w-[1440px] mx-auto">
{/*  Page Header Section  */}
<div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
<div>
<h2 className="font-h2 text-h2 text-on-surface">Manage Users</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Control user access, roles, and verify new account applications.</p>
</div>
<button className="bg-primary text-on-primary px-lg py-md rounded-lg font-label-md flex items-center gap-sm shadow-sm hover:brightness-110 transition-all">
<span className="material-symbols-outlined">person_add</span>
                    Add New User
                </button>
</div>
{/*  Analytics Overview Cards  */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
{/*  Card 1  */}
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-200">
<div className="flex justify-between items-start">
<div className="p-sm bg-primary-fixed/30 rounded-lg text-primary">
<span className="material-symbols-outlined">group</span>
</div>
<div className="text-primary font-label-sm flex items-center gap-xs">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
                            +12.5%
                        </div>
</div>
<div className="mt-md">
<p className="text-on-surface-variant font-label-sm">Total Users</p>
<h3 className="text-h3 font-h3 text-on-surface">5,240</h3>
</div>
</div>
{/*  Card 2  */}
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-200">
<div className="flex justify-between items-start">
<div className="p-sm bg-secondary-container/30 rounded-lg text-secondary">
<span className="material-symbols-outlined">storefront</span>
</div>
<div className="text-secondary font-label-sm flex items-center gap-xs">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
                            +4.2%
                        </div>
</div>
<div className="mt-md">
<p className="text-on-surface-variant font-label-sm">Active Sellers</p>
<h3 className="text-h3 font-h3 text-on-surface">842</h3>
</div>
</div>
{/*  Card 3  */}
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-200">
<div className="flex justify-between items-start">
<div className="p-sm bg-tertiary-fixed/30 rounded-lg text-tertiary">
<span className="material-symbols-outlined">verified_user</span>
</div>
<div className="text-tertiary font-label-sm flex items-center gap-xs">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
                            +18.1%
                        </div>
</div>
<div className="mt-md">
<p className="text-on-surface-variant font-label-sm">Verified Customers</p>
<h3 className="text-h3 font-h3 text-on-surface">3,912</h3>
</div>
</div>
{/*  Card 4 (Highlighted)  */}
<div className="bg-error-container p-lg rounded-xl border border-error/20 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-200">
<div className="flex justify-between items-start">
<div className="p-sm bg-on-error/20 rounded-lg text-error">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>error</span>
</div>
<span className="bg-error text-on-error font-label-sm px-2 py-1 rounded-full">Urgent</span>
</div>
<div className="mt-md">
<p className="text-on-error-container font-label-sm">Pending Verifications</p>
<h3 className="text-h3 font-h3 text-on-error-container">24</h3>
</div>
</div>
</div>
{/*  Filter & Search Bar  */}
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm flex flex-col lg:flex-row gap-md items-center">
<div className="relative flex-1 w-full">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full bg-surface-bright border border-outline-variant rounded-lg pl-10 pr-4 py-2.5 font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary" placeholder="Search by name, email, or ID..." type="text"/>
</div>
<div className="flex flex-wrap items-center gap-md w-full lg:w-auto">
<div className="flex items-center gap-sm">
<label className="font-label-sm text-on-surface-variant">Role:</label>
<select className="bg-surface-bright border border-outline-variant rounded-lg px-md py-2.5 font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20">
<option>All Roles</option>
<option>Admin</option>
<option>Seller</option>
<option>Customer</option>
</select>
</div>
<div className="flex items-center gap-sm">
<label className="font-label-sm text-on-surface-variant">Status:</label>
<select className="bg-surface-bright border border-outline-variant rounded-lg px-md py-2.5 font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20">
<option>All Status</option>
<option>Active</option>
<option>Inactive</option>
<option>Suspended</option>
</select>
</div>
<button className="bg-surface-container-high text-on-surface px-md py-2.5 rounded-lg font-label-md hover:bg-surface-variant transition-colors border border-outline-variant flex items-center gap-xs">
<span className="material-symbols-outlined text-[18px]">filter_list</span>
                        More Filters
                    </button>
</div>
</div>
{/*  User Data Table  */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant">
<th className="px-xl py-md font-label-md text-on-surface-variant uppercase tracking-wider">User</th>
<th className="px-xl py-md font-label-md text-on-surface-variant uppercase tracking-wider">Role</th>
<th className="px-xl py-md font-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
<th className="px-xl py-md font-label-md text-on-surface-variant uppercase tracking-wider">Joined Date</th>
<th className="px-xl py-md font-label-md text-on-surface-variant uppercase tracking-wider">Last Login</th>
<th className="px-xl py-md font-label-md text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
{/*  Table Row 1  */}
<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-xl py-md">
<div className="flex items-center gap-md">
<img alt="User Avatar" className="w-10 h-10 rounded-full object-cover border border-outline-variant" data-alt="A close-up headshot of a friendly professional male in his early 30s with a neat beard and glasses. He is wearing a grey polo shirt and smiling warmly. The background is a clean, bright minimalist studio set with soft, even lighting, conveying a sense of trustworthiness and professionalism in a modern tech-driven marketplace setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcnxdxao_J28EZwTgn393r8SE0NiUSZZKtnKBvNCpdyA52kt2w9d_hetsXAVF2aazs6Il_FulT71aB1pWjsjAS6OuEynWkM22-qocYtbwSi3gwSmyHPOLVNNV-x42CHKq4R-cZBjD5dgLs5R9k21UfI8GE1ZclO1TX215I3ZdHj7fCBw9xtGYDSUiIN89I62Flp5OL5885z1iKd1A4VVadMyBQmtXJlBt-jMmQqAFWP8tCzQbaBqGV-yqjVGB74PjaA0gH4Rk4l9tu"/>
<div>
<p className="font-label-md text-on-surface">Julian Rivers</p>
<p className="font-body-sm text-on-surface-variant text-[12px]">julian.rivers@example.com</p>
</div>
</div>
</td>
<td className="px-xl py-md">
<span className="bg-primary-fixed/30 text-on-primary-fixed-variant px-md py-1 rounded-full font-label-sm">Admin</span>
</td>
<td className="px-xl py-md">
<span className="flex items-center gap-xs text-primary font-label-sm">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                        Active
                                    </span>
</td>
<td className="px-xl py-md font-body-sm text-on-surface-variant">Oct 12, 2023</td>
<td className="px-xl py-md font-body-sm text-on-surface-variant">2 mins ago</td>
<td className="px-xl py-md text-right">
<div className="flex items-center justify-end gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 hover:bg-surface-container rounded-lg text-primary transition-colors" title="Edit"><span className="material-symbols-outlined">edit</span></button>
<button className="p-2 hover:bg-surface-container rounded-lg text-secondary transition-colors" title="View Profile"><span className="material-symbols-outlined">visibility</span></button>
<button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors" title="More Actions"><span className="material-symbols-outlined">more_vert</span></button>
</div>
</td>
</tr>
{/*  Table Row 2  */}
<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-xl py-md">
<div className="flex items-center gap-md">
<img alt="User Avatar" className="w-10 h-10 rounded-full object-cover border border-outline-variant" data-alt="A portrait of a cheerful young woman with curly hair, wearing a professional emerald green blouse. She is standing in a creative workspace with vibrant accents. The lighting is bright and cheerful, with a high-end corporate lifestyle aesthetic that feels modern and approachable for an international marketplace ecosystem." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAbAgjvM2t1kpXIugWYoqcLjgnMsZ-Z6Jx_krYq_l5iR5wSJkWUo37tBBFw4BlyGwOJZcgSCzIn5wuK5HJuQ6OjjhLsHH2ORnwjNKYyC2BTpAzL-VFb0LeWTH-A6TYIHVcoZS1lJboNuGaKaKP36CQOcAho1YxD5c4Q65uFQe-QNBmSIceelFlpVwzpCsLCrdysq0E7yyWLZ4P9j-pQDctfz2JeWfHdQjXnjsM2CaSK91V2h1DVz7A_x5LIRhaG_1GShk_jqgTokqy"/>
<div>
<p className="font-label-md text-on-surface">Elena Rodriguez</p>
<p className="font-body-sm text-on-surface-variant text-[12px]">elena.rdz@globalshop.com</p>
</div>
</div>
</td>
<td className="px-xl py-md">
<span className="bg-secondary-fixed/30 text-on-secondary-fixed-variant px-md py-1 rounded-full font-label-sm">Seller</span>
</td>
<td className="px-xl py-md">
<span className="flex items-center gap-xs text-primary font-label-sm">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                        Active
                                    </span>
</td>
<td className="px-xl py-md font-body-sm text-on-surface-variant">Nov 05, 2023</td>
<td className="px-xl py-md font-body-sm text-on-surface-variant">1 hour ago</td>
<td className="px-xl py-md text-right">
<div className="flex items-center justify-end gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 hover:bg-surface-container rounded-lg text-primary transition-colors" title="Edit"><span className="material-symbols-outlined">edit</span></button>
<button className="p-2 hover:bg-surface-container rounded-lg text-secondary transition-colors" title="View Profile"><span className="material-symbols-outlined">visibility</span></button>
<button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors" title="More Actions"><span className="material-symbols-outlined">more_vert</span></button>
</div>
</td>
</tr>
{/*  Table Row 3  */}
<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-xl py-md">
<div className="flex items-center gap-md">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant border border-outline-variant font-bold">MK</div>
<div>
<p className="font-label-md text-on-surface">Marcus Kane</p>
<p className="font-body-sm text-on-surface-variant text-[12px]">m.kane@provider.net</p>
</div>
</div>
</td>
<td className="px-xl py-md">
<span className="bg-tertiary-fixed/30 text-on-tertiary-fixed-variant px-md py-1 rounded-full font-label-sm">Customer</span>
</td>
<td className="px-xl py-md">
<span className="flex items-center gap-xs text-on-surface-variant font-label-sm">
<span className="w-2 h-2 rounded-full bg-outline"></span>
                                        Inactive
                                    </span>
</td>
<td className="px-xl py-md font-body-sm text-on-surface-variant">Jan 12, 2024</td>
<td className="px-xl py-md font-body-sm text-on-surface-variant">3 days ago</td>
<td className="px-xl py-md text-right">
<div className="flex items-center justify-end gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 hover:bg-surface-container rounded-lg text-primary transition-colors" title="Edit"><span className="material-symbols-outlined">edit</span></button>
<button className="p-2 hover:bg-surface-container rounded-lg text-secondary transition-colors" title="View Profile"><span className="material-symbols-outlined">visibility</span></button>
<button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors" title="More Actions"><span className="material-symbols-outlined">more_vert</span></button>
</div>
</td>
</tr>
{/*  Table Row 4  */}
<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-xl py-md">
<div className="flex items-center gap-md">
<img alt="User Avatar" className="w-10 h-10 rounded-full object-cover border border-outline-variant" data-alt="A clean portrait of a designer with a focused expression, wearing a minimalist black t-shirt. The background is a crisp white wall with soft, architectural shadows. The lighting is high-key and professional, suitable for a sophisticated user management interface with a modern, high-fidelity look and feel." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc4fAMW2qZ8W-NjSDUQfbHG9AovqDlG4YVAgeaMQr1JamjUFZJppNbXZj2VYsfHQsIT9OeHveeICrqt-AcfDIUfSYU2IY3eoeVYOFVR2UjMMDpOvM2VVwV2IXGkJbc86pVNlSldOgSjfOzWxRdsSO0K2kWfOg3nlaDnaVU1jZjhmKr0Vr_4ctHIBKvGyBIHdhizvgH3HTQvZuBPNyRla0gIs4w_N6tpsHfwcktwz0fy6dz3AUhv9JGURe63bwzwNRYY7cedeA53wi1"/>
<div>
<p className="font-label-md text-on-surface">Liam Foster</p>
<p className="font-body-sm text-on-surface-variant text-[12px]">liam.f@studio.io</p>
</div>
</div>
</td>
<td className="px-xl py-md">
<span className="bg-tertiary-fixed/30 text-on-tertiary-fixed-variant px-md py-1 rounded-full font-label-sm">Customer</span>
</td>
<td className="px-xl py-md">
<span className="flex items-center gap-xs text-error font-label-sm">
<span className="w-2 h-2 rounded-full bg-error"></span>
                                        Suspended
                                    </span>
</td>
<td className="px-xl py-md font-body-sm text-on-surface-variant">Feb 20, 2024</td>
<td className="px-xl py-md font-body-sm text-on-surface-variant">Yesterday</td>
<td className="px-xl py-md text-right">
<div className="flex items-center justify-end gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 hover:bg-surface-container rounded-lg text-primary transition-colors" title="Edit"><span className="material-symbols-outlined">edit</span></button>
<button className="p-2 hover:bg-surface-container rounded-lg text-secondary transition-colors" title="View Profile"><span className="material-symbols-outlined">visibility</span></button>
<button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors" title="More Actions"><span className="material-symbols-outlined">more_vert</span></button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/*  Pagination Footer  */}
<div className="bg-surface-container-low px-xl py-md flex flex-col md:flex-row justify-between items-center gap-md">
<p className="font-body-sm text-body-sm text-on-surface-variant">Showing <span className="font-bold text-on-surface">1 to 10</span> of <span className="font-bold text-on-surface">5,240</span> entries</p>
<div className="flex items-center gap-base">
<button className="p-2 rounded-lg border border-outline-variant bg-surface-bright text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50" disabled="">
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-label-md">1</button>
<button className="w-10 h-10 rounded-lg border border-outline-variant bg-surface-bright text-on-surface hover:bg-surface-container transition-colors font-label-md">2</button>
<button className="w-10 h-10 rounded-lg border border-outline-variant bg-surface-bright text-on-surface hover:bg-surface-container transition-colors font-label-md">3</button>
<span className="px-2 text-on-surface-variant">...</span>
<button className="w-10 h-10 rounded-lg border border-outline-variant bg-surface-bright text-on-surface hover:bg-surface-container transition-colors font-label-md">524</button>
<button className="p-2 rounded-lg border border-outline-variant bg-surface-bright text-on-surface-variant hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>
{/*  Help/Tips Section (Contextual Extra)  */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div className="p-lg bg-tertiary-fixed/10 border border-tertiary-fixed rounded-xl flex gap-md">
<span className="material-symbols-outlined text-tertiary">info</span>
<div>
<h4 className="font-label-md text-tertiary">Bulk Verification Tip</h4>
<p className="font-body-sm text-on-surface-variant">You can select multiple users from the 'Pending Verifications' filter to approve them all at once via the action menu.</p>
</div>
</div>
<div className="p-lg bg-primary-fixed/10 border border-primary-fixed rounded-xl flex gap-md">
<span className="material-symbols-outlined text-primary">security</span>
<div>
<h4 className="font-label-md text-primary">Security Audit</h4>
<p className="font-body-sm text-on-surface-variant">Last user permission audit was completed on March 1st. Next audit is scheduled for June 1st.</p>
</div>
</div>
</div>
</div>
</main>
{/*  Micro-interaction JS  */}

</div></div>
    </>
  );
}
