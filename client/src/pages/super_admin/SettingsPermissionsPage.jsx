import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function SettingsPermissionsPage() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-background text-on-surface font-body-md overflow-hidden">
{/*  Sidebar Navigation  */}
<AdminSidebar />
{/*  Main Content Area  */}
<main className="ml-64 h-screen flex flex-col">
{/*  Top App Bar  */}
<header className="h-16 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-desktop sticky top-0 z-40">
<div className="flex items-center gap-md">
<span className="material-symbols-outlined text-outline" data-icon="settings">settings</span>
<nav className="flex text-label-sm items-center gap-xs">
<span className="text-on-surface-variant">Main</span>
<span className="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
<span className="text-primary font-bold">Settings</span>
</nav>
</div>
<div className="flex items-center gap-xl">
<div className="flex items-center gap-md text-on-surface-variant">
<span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors" data-icon="notifications">notifications</span>
<span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors" data-icon="help">help</span>
</div>
<div className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden">
<img alt="Super Administrator Avatar" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMSvU0WocT5Rb_ty9t6VL_CpJ8A-8DjvOvuyWxL0t4HXMQq65fGqn9wT_5I2BF_qD58XHH03l_7t2i5K-GtuhHrW72pLHJbrxvj_UizW9Vf6HxJbzkaJc5ni_tBDMTh071PBgeNT6ArJ7dfv2wo4JGXS6WcnjNqkX6yEg8T5jlAOHELV13tSCgKB0nFQIR5yYaCsBmlMVXTjOE8fKdV0zbXzqdHYElgWBO5bv3fE-G-VBBlaNjIUl2YZVVV7wcFsGfsan0OARzWQ6x"/>
</div>
</div>
</header>
{/*  Page Content Scrollable  */}
<section className="flex-grow overflow-y-auto custom-scrollbar bg-background p-margin-desktop">
<div className="max-w-[1200px] mx-auto">
<div className="flex justify-between items-end mb-xl">
<div>
<h2 className="font-h2 text-h2 text-on-surface">Settings &amp; Permissions</h2>
<p className="text-on-surface-variant">Manage global platform configurations and user access levels.</p>
</div>
<button className="bg-primary text-on-primary px-lg py-md rounded-lg font-label-md flex items-center gap-sm shadow-sm hover:translate-y-[-2px] transition-all">
<span className="material-symbols-outlined" data-icon="save">save</span>
                        Save Changes
                    </button>
</div>
{/*  Tabs Container  */}
<div className="bg-surface rounded-xl border border-outline-variant overflow-hidden flex flex-col">
{/*  Tab Header  */}
<div className="flex border-b border-outline-variant px-md bg-surface-container-lowest">
<button className="px-lg py-md font-label-md active-tab transition-all" id="tab-general" onclick="switchTab('general')">General Settings</button>
<button className="px-lg py-md font-label-md text-on-surface-variant hover:text-primary transition-all" id="tab-roles" onclick="switchTab('roles')">Roles &amp; Permissions</button>
<button className="px-lg py-md font-label-md text-on-surface-variant hover:text-primary transition-all" id="tab-security" onclick="switchTab('security')">Security</button>
<button className="px-lg py-md font-label-md text-on-surface-variant hover:text-primary transition-all" id="tab-notifications" onclick="switchTab('notifications')">Notifications</button>
</div>
{/*  Content Panes  */}
<div className="p-xl">
{/*  1. General Settings  */}
<div className="tab-pane flex flex-col gap-xl" id="content-general">
<div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
<div className="flex flex-col gap-base">
<label className="font-label-md text-on-surface">Platform Name</label>
<input className="border border-outline p-md rounded-lg bg-surface focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" type="text" value="Ethizone Marketplace"/>
</div>
<div className="flex flex-col gap-base">
<label className="font-label-md text-on-surface">Contact Email</label>
<input className="border border-outline p-md rounded-lg bg-surface focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" type="email" value="admin@ethizone.com"/>
</div>
<div className="flex flex-col gap-base">
<label className="font-label-md text-on-surface">Currency</label>
<select className="border border-outline p-md rounded-lg bg-surface focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all">
<option>USD ($) - United States Dollar</option>
<option>EUR (€) - Euro</option>
<option>GBP (£) - British Pound</option>
</select>
</div>
<div className="flex flex-col gap-base">
<label className="font-label-md text-on-surface">Timezone</label>
<select className="border border-outline p-md rounded-lg bg-surface focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all">
<option>(UTC-05:00) Eastern Time</option>
<option>(UTC+00:00) UTC</option>
<option>(UTC-08:00) Pacific Time</option>
</select>
</div>
</div>
<hr className="border-outline-variant my-md"/>
<div className="flex flex-col gap-lg">
<div className="flex items-center justify-between p-lg bg-surface-container-low rounded-xl border border-outline-variant">
<div>
<h4 className="font-h4 text-on-surface">Maintenance Mode</h4>
<p className="text-body-sm text-on-surface-variant">Disable front-end access for users while performing updates.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" value=""/>
<div className="w-12 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="flex items-center justify-between p-lg bg-surface-container-low rounded-xl border border-outline-variant">
<div>
<h4 className="font-h4 text-on-surface">New Vendor Registrations</h4>
<p className="text-body-sm text-on-surface-variant">Allow new merchants to sign up on the platform.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" value=""/>
<div className="w-12 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
</div>
{/*  2. Roles & Permissions  */}
<div className="tab-pane hidden flex flex-col gap-lg" id="content-roles">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-high border-b border-outline-variant">
<th className="p-md font-label-md text-on-surface-variant">Role Name</th>
<th className="p-md font-label-md text-on-surface-variant">Users Assigned</th>
<th className="p-md font-label-md text-on-surface-variant">Access Level</th>
<th className="p-md font-label-md text-on-surface-variant">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-surface-container-low transition-colors">
<td className="p-md font-label-md text-on-surface">Super Admin</td>
<td className="p-md text-body-sm">3 Users</td>
<td className="p-md">
<span className="bg-primary-container text-on-primary-container px-sm py-1 rounded-full text-label-sm">Full Access</span>
</td>
<td className="p-md">
<button className="text-secondary hover:underline font-label-sm">Edit</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="p-md font-label-md text-on-surface">Manager</td>
<td className="p-md text-body-sm">12 Users</td>
<td className="p-md">
<span className="bg-secondary-container text-on-secondary-container px-sm py-1 rounded-full text-label-sm">Administrative</span>
</td>
<td className="p-md">
<button className="text-secondary hover:underline font-label-sm">Edit</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="p-md font-label-md text-on-surface">Support</td>
<td className="p-md text-body-sm">45 Users</td>
<td className="p-md">
<span className="bg-tertiary-container text-on-tertiary-container px-sm py-1 rounded-full text-label-sm">Customer Data</span>
</td>
<td className="p-md">
<button className="text-secondary hover:underline font-label-sm">Edit</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="p-md font-label-md text-on-surface">Auditor</td>
<td className="p-md text-body-sm">5 Users</td>
<td className="p-md">
<span className="bg-surface-variant text-on-surface-variant px-sm py-1 rounded-full text-label-sm">Read Only</span>
</td>
<td className="p-md">
<button className="text-secondary hover:underline font-label-sm">Edit</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
{/*  3. Security  */}
<div className="tab-pane hidden flex flex-col gap-xl" id="content-security">
<div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
<div className="flex flex-col gap-base">
<label className="font-label-md text-on-surface">Session Timeout (minutes)</label>
<input className="border border-outline p-md rounded-lg bg-surface focus:ring-2 focus:ring-secondary/20 outline-none" type="number" value="30"/>
</div>
<div className="flex flex-col gap-base">
<label className="font-label-md text-on-surface">Minimum Password Length</label>
<select className="border border-outline p-md rounded-lg bg-surface focus:ring-2 focus:ring-secondary/20 outline-none">
<option>8 Characters</option>
<option selected="">12 Characters</option>
<option>16 Characters</option>
</select>
</div>
</div>
<div className="space-y-md">
<h4 className="font-label-md text-on-surface-variant uppercase tracking-wider">Complexity Requirements</h4>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
<div className="flex items-center gap-md p-md border border-outline-variant rounded-lg">
<input checked="" className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
<span className="text-body-sm">Require Special Characters</span>
</div>
<div className="flex items-center gap-md p-md border border-outline-variant rounded-lg">
<input checked="" className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
<span className="text-body-sm">Require Numbers</span>
</div>
<div className="flex items-center gap-md p-md border border-outline-variant rounded-lg">
<input checked="" className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
<span className="text-body-sm">Require Uppercase Letters</span>
</div>
<div className="flex items-center gap-md p-md border border-outline-variant rounded-lg">
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox"/>
<span className="text-body-sm">Force Password Reset (90 days)</span>
</div>
</div>
</div>
<div className="p-lg bg-error-container/10 border border-error/20 rounded-xl flex items-start gap-md">
<span className="material-symbols-outlined text-error" data-icon="gpp_maybe">gpp_maybe</span>
<div className="flex-grow">
<h4 className="font-label-md text-error">Enforce Two-Factor Authentication (2FA)</h4>
<p className="text-body-sm text-on-surface-variant mb-md">Require all administrative users to use 2FA apps or SMS verification.</p>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-12 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-error after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
</label>
</div>
</div>
</div>
{/*  4. Notifications  */}
<div className="tab-pane hidden flex flex-col gap-xl" id="content-notifications">
<div className="space-y-lg">
<div className="flex flex-col gap-md">
<h3 className="font-h4">System-wide Triggers</h3>
<p className="text-on-surface-variant text-body-sm">Configure global notification routes for major system events.</p>
</div>
<div className="grid grid-cols-1 gap-md">
{/*  Order Notifications  */}
<div className="flex items-center justify-between p-lg border border-outline-variant rounded-xl bg-surface-container-lowest">
<div className="flex items-center gap-lg">
<div className="w-12 h-12 bg-primary-container/20 rounded-full flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
</div>
<div>
<h4 className="font-label-md">New Orders</h4>
<p className="text-body-sm text-on-surface-variant">Alert admins when a new high-value order is placed.</p>
</div>
</div>
<div className="flex gap-xl">
<label className="flex items-center gap-sm cursor-pointer">
<input checked="" className="rounded border-outline text-primary" type="checkbox"/>
<span className="text-label-sm">Email</span>
</label>
<label className="flex items-center gap-sm cursor-pointer">
<input checked="" className="rounded border-outline text-primary" type="checkbox"/>
<span className="text-label-sm">Push</span>
</label>
</div>
</div>
{/*  Vendor Signups  */}
<div className="flex items-center justify-between p-lg border border-outline-variant rounded-xl bg-surface-container-lowest">
<div className="flex items-center gap-lg">
<div className="w-12 h-12 bg-secondary-container/20 rounded-full flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" data-icon="person_add">person_add</span>
</div>
<div>
<h4 className="font-label-md">Vendor Signups</h4>
<p className="text-body-sm text-on-surface-variant">Notify approval team about new merchant registration requests.</p>
</div>
</div>
<div className="flex gap-xl">
<label className="flex items-center gap-sm cursor-pointer">
<input checked="" className="rounded border-outline text-primary" type="checkbox"/>
<span className="text-label-sm">Email</span>
</label>
<label className="flex items-center gap-sm cursor-pointer">
<input className="rounded border-outline text-primary" type="checkbox"/>
<span className="text-label-sm">Push</span>
</label>
</div>
</div>
{/*  Disputes  */}
<div className="flex items-center justify-between p-lg border border-outline-variant rounded-xl bg-surface-container-lowest border-l-4 border-l-error">
<div className="flex items-center gap-lg">
<div className="w-12 h-12 bg-error-container/20 rounded-full flex items-center justify-center text-error">
<span className="material-symbols-outlined" data-icon="gavel">gavel</span>
</div>
<div>
<h4 className="font-label-md">Open Disputes</h4>
<p className="text-body-sm text-on-surface-variant">Immediate alerts for buyer/seller dispute escalations.</p>
</div>
</div>
<div className="flex gap-xl">
<label className="flex items-center gap-sm cursor-pointer">
<input checked="" className="rounded border-outline text-primary" type="checkbox"/>
<span className="text-label-sm">Email</span>
</label>
<label className="flex items-center gap-sm cursor-pointer">
<input checked="" className="rounded border-outline text-primary" type="checkbox"/>
<span className="text-label-sm">Push</span>
</label>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
{/*  Bento Style Support Cards  */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-lg mt-xl">
<div className="p-lg rounded-xl border border-outline-variant bg-surface shadow-sm hover:shadow-md transition-shadow">
<span className="material-symbols-outlined text-primary mb-md" data-icon="description">description</span>
<h4 className="font-label-md mb-xs">Documentation</h4>
<p className="text-body-sm text-on-surface-variant">Read detailed guides on advanced configuration settings.</p>
</div>
<div className="p-lg rounded-xl border border-outline-variant bg-surface shadow-sm hover:shadow-md transition-shadow">
<span className="material-symbols-outlined text-secondary mb-md" data-icon="terminal">terminal</span>
<h4 className="font-label-md mb-xs">API Credentials</h4>
<p className="text-body-sm text-on-surface-variant">Manage webhooks and integration keys for external apps.</p>
</div>
<div className="p-lg rounded-xl border border-outline-variant bg-surface shadow-sm hover:shadow-md transition-shadow">
<span className="material-symbols-outlined text-tertiary mb-md" data-icon="security">security</span>
<h4 className="font-label-md mb-xs">Audit Logs</h4>
<p className="text-body-sm text-on-surface-variant">View a detailed history of all changes made to settings.</p>
</div>
</div>
</div>
</section>
{/*  Fixed Bottom Status Bar  */}
<footer className="h-12 bg-surface-container-highest border-t border-outline-variant flex items-center justify-between px-margin-desktop text-label-sm text-on-surface-variant shrink-0">
<div className="flex items-center gap-lg">
<span className="flex items-center gap-xs"><span className="w-2 h-2 rounded-full bg-primary"></span> System Online</span>
<span className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]" data-icon="update">update</span> Last sync: 2 mins ago</span>
</div>
<div>
                © 2024 Ethizone Admin v2.4.1
            </div>
</footer>
</main>

</div></div>
    </>
  );
}
