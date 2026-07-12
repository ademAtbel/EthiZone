import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function SecurityAuditLogsPage() {
  return (
    <>
      

<div lang="en">
<div className="bg-background text-on-background min-h-screen flex">
{/*  SideNavBar  */}
<AdminSidebar />
<div className="flex-1 ml-64 flex flex-col min-h-screen">
{/*  TopAppBar  */}
<header className="sticky top-0 z-40 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center w-full px-margin-desktop py-sm h-16">
<div className="flex items-center gap-4">
<h2 className="text-h3 font-h3 font-bold text-primary dark:text-primary-fixed">Security Audit Logs</h2>
</div>
<div className="flex items-center gap-4">
<div className="relative hidden lg:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" data-icon="search">search</span>
<input className="pl-10 pr-4 py-2 bg-surface-container border border-outline-variant rounded-full text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64" placeholder="Search events..." type="text"/>
</div>
<button className="hover:bg-surface-container-low dark:hover:bg-surface-container-high rounded-full p-2 transition-all active:scale-90">
<span className="material-symbols-outlined text-primary" data-icon="notifications">notifications</span>
</button>
<button className="hover:bg-surface-container-low dark:hover:bg-surface-container-high rounded-full p-2 transition-all active:scale-90">
<span className="material-symbols-outlined text-primary" data-icon="help_outline">help_outline</span>
</button>
<div className="w-px h-6 bg-outline-variant mx-2"></div>
<img alt="Administrator Avatar" className="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzYTb7ppTOCMOr-fJWg-9FouhTGk7Ce8rambjUOB9N_i5TNohV7nuVf_YjNh9b8sCbc7ijaxjjCS_iE9HCaE-bOqO9VoL75YCiGiE1yv2pQMraspS9QDoYe59i4G8V_VjYUMH8rfdhsmgJ-TNDZamQEGdf5gFhTJzuTkS7lRjRuFfK7VWa9QpaabxUxXsdDOEJUZRRORwr9cYtOy00ZfVvBHXmQRt3EfDGW_Zs2bqegfl0C7ZU-q1W4jn79aAjplN3yEDMsv_Cs4Vv"/>
</div>
</header>
{/*  Main Content  */}
<main className="flex-1 p-margin-desktop space-y-lg max-w-[1440px] mx-auto w-full">
{/*  Page Intro  */}
<section>
<p className="text-body-lg text-on-surface-variant max-w-2xl">
                    Monitor and track all administrative activities and security events across the platform. Ensure compliance and platform integrity with a real-time ledger of actions.
                </p>
</section>
{/*  Summary Cards  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
{/*  Card 1  */}
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between h-32 hover:-translate-y-0.5 transition-transform">
<div className="flex justify-between items-start">
<span className="text-label-md text-on-surface-variant uppercase tracking-wider">Total Events (30d)</span>
<span className="material-symbols-outlined text-secondary" data-icon="history">history</span>
</div>
<div>
<span className="text-h2 font-h2 text-on-surface">14,892</span>
<div className="text-label-sm text-primary flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="trending_up">trending_up</span> 12% from last month
                        </div>
</div>
</div>
{/*  Card 2  */}
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between h-32 hover:-translate-y-0.5 transition-transform">
<div className="flex justify-between items-start">
<span className="text-label-md text-on-surface-variant uppercase tracking-wider">Critical Alerts</span>
<span className="material-symbols-outlined text-error" data-icon="error">error</span>
</div>
<div>
<span className="text-h2 font-h2 text-error">3</span>
<div className="text-label-sm text-on-surface-variant">Requires immediate attention</div>
</div>
</div>
{/*  Card 3  */}
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between h-32 hover:-translate-y-0.5 transition-transform">
<div className="flex justify-between items-start">
<span className="text-label-md text-on-surface-variant uppercase tracking-wider">Active Admin Sessions</span>
<span className="material-symbols-outlined text-primary" data-icon="verified_user">verified_user</span>
</div>
<div>
<span className="text-h2 font-h2 text-on-surface">12</span>
<div className="text-label-sm text-on-surface-variant">Verified IP addresses only</div>
</div>
</div>
{/*  Card 4  */}
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between h-32 hover:-translate-y-0.5 transition-transform">
<div className="flex justify-between items-start">
<span className="text-label-md text-on-surface-variant uppercase tracking-wider">Last Audit Date</span>
<span className="material-symbols-outlined text-tertiary" data-icon="calendar_today">calendar_today</span>
</div>
<div>
<span className="text-h4 font-h4 text-on-surface">Oct 24, 2023</span>
<div className="text-label-sm text-on-surface-variant">System status: Secured</div>
</div>
</div>
</div>
{/*  Filters Bar  */}
<section className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant">
<div className="flex flex-col lg:flex-row gap-md items-end lg:items-center">
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-md flex-1 w-full">
<div className="space-y-1">
<label className="text-label-sm text-on-surface-variant px-1">Event ID</label>
<input className="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all text-body-sm outline-none" placeholder="e.g. LOG-8821" type="text"/>
</div>
<div className="space-y-1">
<label className="text-label-sm text-on-surface-variant px-1">Actor</label>
<input className="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all text-body-sm outline-none" placeholder="Admin Name" type="text"/>
</div>
<div className="space-y-1">
<label className="text-label-sm text-on-surface-variant px-1">Action Type</label>
<select className="w-full px-md py-[10px] rounded-lg border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all text-body-sm outline-none bg-transparent">
<option>All Actions</option>
<option>Login / Logout</option>
<option>User Update</option>
<option>Settings Change</option>
<option>Deletion</option>
</select>
</div>
<div className="space-y-1">
<label className="text-label-sm text-on-surface-variant px-1">Date Range</label>
<input className="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all text-body-sm outline-none bg-transparent" type="date"/>
</div>
</div>
<div className="flex gap-sm">
<button className="px-md py-sm bg-primary text-on-primary rounded-lg font-label-md flex items-center gap-2 hover:bg-primary-container transition-colors shadow-sm">
<span className="material-symbols-outlined text-[20px]" data-icon="filter_list">filter_list</span>
                            Apply Filters
                        </button>
<button className="px-md py-sm bg-surface-container text-on-surface-variant border border-outline-variant rounded-lg font-label-md hover:bg-surface-container-high transition-colors">
                            Reset
                        </button>
</div>
</div>
</section>
{/*  Data Table Section  */}
<section className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
<div className="px-md py-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low/30">
<h3 className="text-h4 font-h4 text-on-surface">Audit Logs Ledger</h3>
<div className="flex items-center gap-sm">
<button className="px-md py-sm bg-white border border-outline-variant text-on-surface-variant rounded-lg font-label-md flex items-center gap-2 hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined text-[18px]" data-icon="download">download</span>
                            Export Logs
                        </button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low/50">
<tr>
<th className="px-md py-md text-label-md text-on-surface-variant border-b border-outline-variant">Timestamp</th>
<th className="px-md py-md text-label-md text-on-surface-variant border-b border-outline-variant">Actor</th>
<th className="px-md py-md text-label-md text-on-surface-variant border-b border-outline-variant">Action Description</th>
<th className="px-md py-md text-label-md text-on-surface-variant border-b border-outline-variant">IP Address</th>
<th className="px-md py-md text-label-md text-on-surface-variant border-b border-outline-variant">Severity</th>
<th className="px-md py-md text-label-md text-on-surface-variant border-b border-outline-variant text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
{/*  Row 1  */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-md py-md whitespace-nowrap">
<p className="text-body-sm text-on-surface">Oct 26, 2023</p>
<p className="text-label-sm text-on-surface-variant">14:22:15 UTC</p>
</td>
<td className="px-md py-md whitespace-nowrap">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold text-xs">SM</div>
<div>
<p className="text-label-md text-on-surface">Sarah Miller</p>
<p className="text-label-sm text-on-surface-variant">Product Lead</p>
</div>
</div>
</td>
<td className="px-md py-md">
<p className="text-body-sm text-on-surface max-w-xs truncate">Modified global tax settings for 'North America' region.</p>
</td>
<td className="px-md py-md whitespace-nowrap text-body-sm font-mono text-on-surface-variant">192.168.1.45</td>
<td className="px-md py-md whitespace-nowrap">
<span className="px-2 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-sm border border-outline-variant">Medium</span>
</td>
<td className="px-md py-md whitespace-nowrap text-right">
<button className="p-2 text-primary hover:bg-primary-container/10 rounded-full transition-all" title="View Details">
<span className="material-symbols-outlined" data-icon="visibility">visibility</span>
</button>
</td>
</tr>
{/*  Row 2  */}
<tr className="hover:bg-surface-container-low transition-colors bg-error-container/5">
<td className="px-md py-md whitespace-nowrap">
<p className="text-body-sm text-on-surface">Oct 26, 2023</p>
<p className="text-label-sm text-on-surface-variant">13:10:02 UTC</p>
</td>
<td className="px-md py-md whitespace-nowrap">
<div className="flex items-center gap-3">
<img alt="Admin Actor Avatar" className="w-8 h-8 rounded-full" data-alt="A professional headshot of a senior system administrator in a high-tech corporate office environment. Soft cinematic lighting with blue and green hues reflecting the tech-focused brand identity. High-end photography style with shallow depth of field." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi32zWokwhaJXSTT25RQxN8qmZXE-0sewblvLs5t3aoiXElMdHRQ9Shmwu79Wv_NkD17u5htrDv7aTzPArf93xgZterhRC6wFqgtLoihhzAq0uG75tVPk4ha9D1g7oZdj1LVJpDsSLmCP86hZCGuJ6FlzfvT6naLRM33FOzEqPdIcjQx-ECsqvImz3dg_fFTzUw4GrVBXCFQdWXCMun_ugykZoY3vlV8-H2D03ZR1dS8ZoJzIVzuGfY1sS-jZey3MtFG_xFMy5VCbE"/>
<div>
<p className="text-label-md text-on-surface">James K.</p>
<p className="text-label-sm text-on-surface-variant">Super Admin</p>
</div>
</div>
</td>
<td className="px-md py-md">
<p className="text-body-sm text-on-surface font-semibold">Multiple failed login attempts detected.</p>
</td>
<td className="px-md py-md whitespace-nowrap text-body-sm font-mono text-on-surface-variant">45.22.112.9</td>
<td className="px-md py-md whitespace-nowrap">
<span className="px-2 py-1 rounded-full bg-error text-on-error text-label-sm shadow-sm">Critical</span>
</td>
<td className="px-md py-md whitespace-nowrap text-right">
<button className="p-2 text-primary hover:bg-primary-container/10 rounded-full transition-all">
<span className="material-symbols-outlined" data-icon="visibility">visibility</span>
</button>
</td>
</tr>
{/*  Row 3  */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-md py-md whitespace-nowrap">
<p className="text-body-sm text-on-surface">Oct 26, 2023</p>
<p className="text-label-sm text-on-surface-variant">11:05:44 UTC</p>
</td>
<td className="px-md py-md whitespace-nowrap">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary-fixed-dim flex items-center justify-center text-on-primary-fixed font-bold text-xs">EL</div>
<div>
<p className="text-label-md text-on-surface">Emma Liu</p>
<p className="text-label-sm text-on-surface-variant">Support Mgr</p>
</div>
</div>
</td>
<td className="px-md py-md">
<p className="text-body-sm text-on-surface">Deleted 4 dormant vendor accounts after 90 days inactivity.</p>
</td>
<td className="px-md py-md whitespace-nowrap text-body-sm font-mono text-on-surface-variant">10.0.4.12</td>
<td className="px-md py-md whitespace-nowrap">
<span className="px-2 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-sm">High</span>
</td>
<td className="px-md py-md whitespace-nowrap text-right">
<button className="p-2 text-primary hover:bg-primary-container/10 rounded-full transition-all">
<span className="material-symbols-outlined" data-icon="visibility">visibility</span>
</button>
</td>
</tr>
{/*  Row 4  */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-md py-md whitespace-nowrap">
<p className="text-body-sm text-on-surface">Oct 26, 2023</p>
<p className="text-label-sm text-on-surface-variant">09:45:12 UTC</p>
</td>
<td className="px-md py-md whitespace-nowrap">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-bold text-xs">TR</div>
<div>
<p className="text-label-md text-on-surface">Tom Reed</p>
<p className="text-label-sm text-on-surface-variant">Compliance</p>
</div>
</div>
</td>
<td className="px-md py-md">
<p className="text-body-sm text-on-surface">Updated privacy policy document in System Settings.</p>
</td>
<td className="px-md py-md whitespace-nowrap text-body-sm font-mono text-on-surface-variant">192.168.1.12</td>
<td className="px-md py-md whitespace-nowrap">
<span className="px-2 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-sm border border-outline-variant">Low</span>
</td>
<td className="px-md py-md whitespace-nowrap text-right">
<button className="p-2 text-primary hover:bg-primary-container/10 rounded-full transition-all">
<span className="material-symbols-outlined" data-icon="visibility">visibility</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
{/*  Pagination  */}
<div className="px-md py-md bg-surface-container-low/30 border-t border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-md">
<p className="text-body-sm text-on-surface-variant">Showing 1 to 10 of 14,892 entries</p>
<div className="flex items-center gap-2">
<button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
</button>
<button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label-md">1</button>
<button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-all font-label-md">2</button>
<button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-all font-label-md">3</button>
<span className="px-2 text-on-surface-variant">...</span>
<button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-all font-label-md">1489</button>
<button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</section>
</main>
{/*  Footer / System Info  */}
<footer className="mt-auto p-margin-desktop border-t border-outline-variant flex justify-between items-center opacity-60">
<p className="text-body-sm text-on-surface-variant">© 2023 Ethizone Admin Ecosystem. All activities are logged.</p>
<div className="flex items-center gap-4 text-label-sm">
<span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> System Health: Optimal</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]" data-icon="shield">shield</span> AES-256 Encrypted</span>
</div>
</footer>
</div>
{/*  Details Modal (Simulation with JS)  */}
<div className="fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[60] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300" id="details-modal">
<div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden scale-95 transition-transform duration-300" id="modal-container">
<div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container">
<h3 className="text-h4 font-h4 text-on-surface">Log Entry Details</h3>
<button className="p-2 hover:bg-on-surface-variant/10 rounded-full transition-all" onclick="closeModal()">
<span className="material-symbols-outlined" data-icon="close">close</span>
</button>
</div>
<div className="p-lg space-y-md">
<div className="grid grid-cols-2 gap-md">
<div>
<p className="text-label-sm text-on-surface-variant uppercase">Event ID</p>
<p className="text-body-md font-mono font-semibold">LOG-8821-2023-X</p>
</div>
<div>
<p className="text-label-sm text-on-surface-variant uppercase">Severity</p>
<span className="px-2 py-1 rounded-full bg-error/10 text-error text-label-sm">Critical</span>
</div>
</div>
<div>
<p className="text-label-sm text-on-surface-variant mb-2">JSON Metadata Diff</p>
<pre className="bg-on-surface text-surface p-md rounded-lg font-mono text-sm overflow-x-auto">{`{
  "action": "MULTIPLE_FAILED_LOGIN",
  "meta": {
    "attempts": 5,
    "user_agent": "Mozilla/5.0 (X11; Linux x86_64)...",
    "location": {
       "city": "Unknown",
       "origin_ip": "45.22.112.9"
    },
    "status": "BLOCKED"
  }
}`}</pre>
</div>
</div>
<div className="p-md border-t border-outline-variant flex justify-end gap-sm">
<button className="px-lg py-sm bg-primary text-on-primary rounded-lg font-label-md" onclick="closeModal()">Close Detail</button>
</div>
</div>
</div>

</div></div>
    </>
  );
}
