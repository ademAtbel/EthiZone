import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function LogisticsShippingDashboard() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-background text-on-surface">
{/*  Sidebar Navigation Shell  */}
<AdminSidebar />
{/*  Main Content Area  */}
<main className="ml-64 min-h-screen">
{/*  Top App Bar  */}
<header className="flex justify-between items-center w-full px-lg py-md sticky top-0 z-40 bg-surface-container-lowest dark:bg-surface-container-low shadow-sm dark:shadow-none">
<div className="flex items-center gap-lg w-1/2">
<h1 className="font-h4 text-h4 font-bold text-primary dark:text-inverse-primary whitespace-nowrap">Logistics Hub</h1>
<div className="relative w-full max-w-md">
<span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant" data-icon="search">search</span>
<input className="w-full pl-xl pr-md py-sm bg-surface-container rounded-full border-none focus:ring-2 focus:ring-primary/20 text-body-sm font-body-sm outline-none" placeholder="Search shipments, tracking numbers..." type="text"/>
</div>
</div>
<div className="flex items-center gap-lg">
<button className="flex items-center gap-xs px-md py-sm text-primary font-label-md hover:bg-surface-container transition-all rounded-lg">
<span className="material-symbols-outlined" data-icon="help_outline">help_outline</span>
<span>Support</span>
</button>
<div className="flex items-center gap-md">
<div className="relative p-sm hover:bg-surface-container rounded-full cursor-pointer transition-colors">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="notifications">notifications</span>
<span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface"></span>
</div>
<img alt="Administrator Profile" className="w-8 h-8 rounded-full cursor-pointer hover:opacity-80 transition-opacity" data-alt="Close-up professional portrait of a business leader with a clean-cut appearance. The individual has a determined yet approachable expression. The lighting is bright and airy, typical of a modern corporate workspace, with subtle hints of blue and white in the background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJQ8k-CC-ytaLLYiWO21Lh8G7PknvL9EvAlAVHGIQ6uvii4oHCP-_8D36ohJhAfM19SMfLVuJvfJiumDnI9FkCyN77MItJYbIoHuMN0HUUy-9W916wRzjo19wyOo95OxAzvbbSOcxmPynEkPem0Yky2Wi0sBRuj9q79WhnsYLHGQAlngb8zKWEuCklYqz3YTFuEKJDE7D0Bxlv7O7Ed3_rfIyyoJSU26haPpKaPtdFbF7lq51SknmqfFMY_VzoP7prMxgQXPTQYTEc"/>
</div>
</div>
</header>
{/*  Dashboard Content  */}
<div className="p-lg max-w-[1440px] mx-auto space-y-lg">
{/*  Shipment Overview Metrics (KPI Cards)  */}
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex items-start justify-between">
<div>
<div className="text-on-surface-variant font-label-sm uppercase mb-xs">Total Shipments</div>
<div className="font-h2 text-h2 text-on-surface">14,282</div>
<div className="flex items-center gap-xs mt-sm text-primary font-label-sm">
<span className="material-symbols-outlined text-sm" data-icon="trending_up">trending_up</span>
<span>+12.5% this week</span>
</div>
</div>
<div className="p-md bg-primary/10 rounded-lg">
<span className="material-symbols-outlined text-primary" data-icon="package_2">package_2</span>
</div>
</div>
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex items-start justify-between">
<div>
<div className="text-on-surface-variant font-label-sm uppercase mb-xs">In Transit</div>
<div className="font-h2 text-h2 text-on-surface">3,891</div>
<div className="flex items-center gap-xs mt-sm text-secondary font-label-sm">
<span className="material-symbols-outlined text-sm" data-icon="schedule">schedule</span>
<span>On track</span>
</div>
</div>
<div className="p-md bg-secondary/10 rounded-lg">
<span className="material-symbols-outlined text-secondary" data-icon="local_shipping">local_shipping</span>
</div>
</div>
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex items-start justify-between">
<div>
<div className="text-on-surface-variant font-label-sm uppercase mb-xs">Delivered Today</div>
<div className="font-h2 text-h2 text-on-surface">842</div>
<div className="flex items-center gap-xs mt-sm text-primary font-label-sm">
<span className="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span>
<span>98% success rate</span>
</div>
</div>
<div className="p-md bg-primary-fixed/20 rounded-lg">
<span className="material-symbols-outlined text-on-primary-fixed-variant" data-icon="task_alt">task_alt</span>
</div>
</div>
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex items-start justify-between">
<div>
<div className="text-on-surface-variant font-label-sm uppercase mb-xs">Fulfillment Delay</div>
<div className="font-h2 text-h2 text-on-surface">1.4%</div>
<div className="flex items-center gap-xs mt-sm text-error font-label-sm">
<span className="material-symbols-outlined text-sm" data-icon="warning">warning</span>
<span>+0.2% variance</span>
</div>
</div>
<div className="p-md bg-error-container rounded-lg">
<span className="material-symbols-outlined text-on-error-container" data-icon="error_outline">error_outline</span>
</div>
</div>
</section>
{/*  Mid Section: Charts & Alerts  */}
<section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
{/*  Carrier Performance Chart (Bento Card)  */}
<div className="lg:col-span-2 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
<div className="flex justify-between items-center mb-xl">
<div>
<h3 className="font-h4 text-h4 text-on-surface">Carrier Success Rates</h3>
<p className="text-on-surface-variant font-body-sm">Last 30 days performance metrics</p>
</div>
<select className="bg-surface-container border-none rounded-lg font-label-sm text-on-surface-variant pr-xl">
<option>Daily</option>
<option selected="">Weekly</option>
<option>Monthly</option>
</select>
</div>
<div className="h-64 flex items-end justify-around gap-md relative">
{/*  Simulated Bar Chart  */}
<div className="flex flex-col items-center gap-sm w-full">
<div className="w-12 bg-primary rounded-t-lg transition-all duration-700 hover:opacity-80 relative group" style={{height: '94%'}}>
<span className="absolute -top-xl left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-inverse-surface text-inverse-on-surface px-xs py-[2px] rounded text-[10px] transition-opacity">94%</span>
</div>
<span className="font-label-sm text-on-surface-variant">FedEx</span>
</div>
<div className="flex flex-col items-center gap-sm w-full">
<div className="w-12 bg-secondary rounded-t-lg transition-all duration-700 hover:opacity-80 relative group" style={{height: '88%'}}>
<span className="absolute -top-xl left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-inverse-surface text-inverse-on-surface px-xs py-[2px] rounded text-[10px] transition-opacity">88%</span>
</div>
<span className="font-label-sm text-on-surface-variant">UPS</span>
</div>
<div className="flex flex-col items-center gap-sm w-full">
<div className="w-12 bg-primary rounded-t-lg transition-all duration-700 hover:opacity-80 relative group" style={{height: '92%'}}>
<span className="absolute -top-xl left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-inverse-surface text-inverse-on-surface px-xs py-[2px] rounded text-[10px] transition-opacity">92%</span>
</div>
<span className="font-label-sm text-on-surface-variant">DHL</span>
</div>
<div className="flex flex-col items-center gap-sm w-full">
<div className="w-12 bg-secondary-container rounded-t-lg transition-all duration-700 hover:opacity-80 relative group" style={{height: '76%'}}>
<span className="absolute -top-xl left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-inverse-surface text-inverse-on-surface px-xs py-[2px] rounded text-[10px] transition-opacity">76%</span>
</div>
<span className="font-label-sm text-on-surface-variant">Local</span>
</div>
<div className="flex flex-col items-center gap-sm w-full">
<div className="w-12 bg-primary-fixed-dim rounded-t-lg transition-all duration-700 hover:opacity-80 relative group" style={{height: '85%'}}>
<span className="absolute -top-xl left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-inverse-surface text-inverse-on-surface px-xs py-[2px] rounded text-[10px] transition-opacity">85%</span>
</div>
<span className="font-label-sm text-on-surface-variant">USPS</span>
</div>
{/*  Grid Lines  */}
<div className="absolute inset-x-0 bottom-0 border-b border-outline-variant h-0"></div>
<div className="absolute inset-x-0 bottom-1/2 border-b border-dashed border-outline-variant/30 h-0"></div>
<div className="absolute inset-x-0 top-0 border-b border-dashed border-outline-variant/30 h-0"></div>
</div>
</div>
{/*  Recent Shipping Alerts  */}
<div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col">
<div className="flex justify-between items-center mb-lg">
<h3 className="font-h4 text-h4 text-on-surface">Critical Alerts</h3>
<span className="bg-error text-on-error px-sm py-xs rounded-full font-label-sm">4 Active</span>
</div>
<div className="space-y-md flex-1 overflow-y-auto">
<div className="p-md bg-error-container/20 rounded-lg border-l-4 border-error flex gap-md items-start">
<span className="material-symbols-outlined text-error" data-icon="history">history</span>
<div>
<div className="font-label-md text-on-surface">Delayed: EZ-9281-NY</div>
<p className="text-body-sm text-on-surface-variant">Weather delay in Chicago Hub. Impacting 42 orders.</p>
<span className="text-[10px] font-bold text-error uppercase">2 mins ago</span>
</div>
</div>
<div className="p-md bg-surface-container rounded-lg border-l-4 border-secondary flex gap-md items-start">
<span className="material-symbols-outlined text-secondary" data-icon="no_transfer">no_transfer</span>
<div>
<div className="font-label-md text-on-surface">Pickup Failed</div>
<p className="text-body-sm text-on-surface-variant">Vendor 'Artisan Crafts' pickup missed by Local Express.</p>
<span className="text-[10px] font-bold text-on-surface-variant uppercase">1 hour ago</span>
</div>
</div>
<div className="p-md bg-error-container/20 rounded-lg border-l-4 border-error flex gap-md items-start">
<span className="material-symbols-outlined text-error" data-icon="report">report</span>
<div>
<div className="font-label-md text-on-surface">Carrier Incident</div>
<p className="text-body-sm text-on-surface-variant">DHL reported damaged parcel EZ-1022. Client notified.</p>
<span className="text-[10px] font-bold text-error uppercase">3 hours ago</span>
</div>
</div>
</div>
<button className="mt-lg w-full py-sm border-2 border-primary text-primary font-label-md rounded-lg hover:bg-primary hover:text-on-primary transition-all">View All Alerts</button>
</div>
</section>
{/*  Regional Fulfillment & Tracking  */}
<section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
{/*  Regional Fulfillment Map/List  */}
<div className="lg:col-span-1 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
<h3 className="font-h4 text-h4 text-on-surface mb-lg">Regional Volume</h3>
<div className="space-y-lg">
<div className="relative w-full aspect-video bg-surface-container rounded-lg overflow-hidden group">
<img alt="World Map Visualization" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 transition-all duration-500" data-alt="A stylized world map in a minimalist digital aesthetic, highlighting global trade routes with glowing green lines. The background is a sophisticated deep neutral tone, and specific continents are subtly highlighted to show logistics intensity. The overall style is modern and data-driven, perfect for a high-end corporate logistics dashboard." data-location="World Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-Rm4So7XnmZHC52lRf302h67ncZG_EWRJJW9mvLb5lB9sOrhgNQ6E5sUU2tnnoB_kwfmK7QLaqmOhZqEbe3dbY6PIsAwsCdjHIH5plpzlOL9P0QeP2MqbeBtGGCoqzuMWYl7awNqiRstWyHPf8Fxq2OBqTyvrfQGasYVEFvXtt7J6PSQ39Wj7PpOVtnEjmExnZRpSBOqWVYJjgJBvOXTqowRAifL3ZBqFAI34cELkgTBlIE8UJZbVyKQlGgXHSYhhi4s5wSC_d8D5"/>
<div className="absolute inset-0 flex items-center justify-center">
<span className="bg-primary/90 text-on-primary px-md py-xs rounded-full font-label-sm shadow-xl">Live Distribution View</span>
</div>
</div>
<div className="space-y-sm">
<div className="flex justify-between items-center text-body-sm">
<span className="flex items-center gap-sm"><span className="w-3 h-3 rounded-full bg-primary"></span> North America</span>
<span className="font-bold">42%</span>
</div>
<div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full" style={{width: '42%'}}></div>
</div>
<div className="flex justify-between items-center text-body-sm mt-md">
<span className="flex items-center gap-sm"><span className="w-3 h-3 rounded-full bg-secondary"></span> Europe</span>
<span className="font-bold">28%</span>
</div>
<div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-secondary rounded-full" style={{width: '28%'}}></div>
</div>
<div className="flex justify-between items-center text-body-sm mt-md">
<span className="flex items-center gap-sm"><span className="w-3 h-3 rounded-full bg-tertiary-container"></span> Asia-Pacific</span>
<span className="font-bold">18%</span>
</div>
<div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary-container rounded-full" style={{width: '18%'}}></div>
</div>
</div>
</div>
</div>
{/*  Live Shipment Tracking Table  */}
<div className="lg:col-span-2 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
<div className="flex justify-between items-center mb-lg">
<h3 className="font-h4 text-h4 text-on-surface">Recent Tracking Updates</h3>
<div className="flex gap-sm">
<button className="p-sm hover:bg-surface-container rounded-lg border border-outline-variant/30 transition-colors">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="filter_list">filter_list</span>
</button>
<button className="p-sm hover:bg-surface-container rounded-lg border border-outline-variant/30 transition-colors">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="download">download</span>
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="border-b border-outline-variant/30 text-on-surface-variant font-label-sm">
<th className="pb-md font-medium px-md">Tracking ID</th>
<th className="pb-md font-medium px-md">Status</th>
<th className="pb-md font-medium px-md">Vendor</th>
<th className="pb-md font-medium px-md">Destination</th>
<th className="pb-md font-medium px-md text-right">Updated</th>
</tr>
</thead>
<tbody className="text-body-sm divide-y divide-outline-variant/10">
<tr className="hover:bg-surface-container/30 transition-colors group">
<td className="py-md px-md font-bold text-secondary">#EZ-84930-FED</td>
<td className="py-md px-md">
<span className="flex items-center gap-xs text-primary font-medium">
<span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                                            Out for delivery
                                        </span>
</td>
<td className="py-md px-md text-on-surface">EcoGear Solutions</td>
<td className="py-md px-md flex items-center gap-sm">
<img alt="USA Flag" className="w-5 h-4 rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ2DjUmJHlW4SqSPunobLx3YaNH8xOafYMtiT4ub0uY37lXUYxWuUcOm67ziD0SmlGrtrN8dffyJ8qDva2zq_MY_FTVE26OpCS6c1e1w7fBcfdbLmhKS_3nKS76riPm6L2DGUViwv_SpnM35A9x2jEH91qHjuO5IZweq5nKwZbCyZyDZ7CGzEm_KGwEhqLgSbzbPj31QTCchT9FbfJBObdzA7vqs4Hjt4dOZhL9oLt_M3SD8lDIIQHLTk_6BY4O7xzC4xqLS7m1k4c"/>
                                        New York, USA
                                    </td>
<td className="py-md px-md text-right text-on-surface-variant">12:45 PM</td>
</tr>
<tr className="hover:bg-surface-container/30 transition-colors">
<td className="py-md px-md font-bold text-secondary">#EZ-11204-DHL</td>
<td className="py-md px-md">
<span className="flex items-center gap-xs text-secondary-container font-medium">
                                            In Customs
                                        </span>
</td>
<td className="py-md px-md text-on-surface">Nordic Living</td>
<td className="py-md px-md flex items-center gap-sm">
<img alt="Germany Flag" className="w-5 h-4 rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeaJ93NDVVW2wcVqq8L0j7p3FZoEjbGNoSQtw0L62YB2EIlhZ2ziwQh3D8ifkf7heeqRzUHQTHk7Fr8ZPqUY3yblFgiID-irXdJZR8B5P17v3V8UvWbBT2-21gMTVPqfwReWDIsilTBXcL4M-NL86yaFSIkwRd6F5NaQnM4gIGBahojmmR8EALIkM8fOM3E4OlPqZJljWFufYx_HGAqUno984K3VCdvosHKGGtj1Xrr9ObN92VON6exsDmEFkfxtcEpOg_ats_wR3I"/>
                                        Berlin, DE
                                    </td>
<td className="py-md px-md text-right text-on-surface-variant">11:30 AM</td>
</tr>
<tr className="hover:bg-surface-container/30 transition-colors">
<td className="py-md px-md font-bold text-secondary">#EZ-99481-UPS</td>
<td className="py-md px-md">
<span className="flex items-center gap-xs text-error font-medium">
                                            Delivery Failed
                                        </span>
</td>
<td className="py-md px-md text-on-surface">Global Textiles</td>
<td className="py-md px-md flex items-center gap-sm">
<img alt="UK Flag" className="w-5 h-4 rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqT8ZQl8MoGcmRTyha8VW3Ut_6vxUMR8xemw5wZ4tCkplBIWQtC412sLpOMYuWoduB3ehFBmv8gHnrHTfp1jo_u0aRrOnHJ3X6kvQgMdTflp41MLOPEwJuSf7ZQZN6SmkWd2MSq4VCBsmekL1JhtUu1hLCc00RN43gftcKcGdxobyZVe0r79y8zD0BoCyT6sqmLnqunV7mcyH_NL600KfaBnBl8OsQNnAYvzg38MBDtWfPi2EIXn7QthMIY1na18mwzbMaactA4Eq1"/>
                                        London, UK
                                    </td>
<td className="py-md px-md text-right text-on-surface-variant">10:15 AM</td>
</tr>
<tr className="hover:bg-surface-container/30 transition-colors">
<td className="py-md px-md font-bold text-secondary">#EZ-23004-LEX</td>
<td className="py-md px-md">
<span className="flex items-center gap-xs text-primary font-medium">
                                            Delivered
                                        </span>
</td>
<td className="py-md px-md text-on-surface">Tokyo Tech</td>
<td className="py-md px-md flex items-center gap-sm">
<img alt="Japan Flag" className="w-5 h-4 rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuGPfJB4q2zwMdx6MN8uMztnc2wU2tp7UqRjijPFTsN_w5Q8NEuRvoss5QrsJFnOypPp2gUho0lSHx-_EjB7czu32oKKm15BnAzhc4QXSWEhipGh_a8zKmE2YyIFE3WkVYXWhAqxrvrTXi0XgdpkZgn2AB2QxzKCHJkl0QK6xb-JsQXpf28Ofn2IGe91OwlgWkTXa2OuMGj6geooIkEATppgLnZWC42YHDQnqphfFjsh2ysLw3iajs7_yGYksewuTPjy0lkcRdAEjP"/>
                                        Osaka, JP
                                    </td>
<td className="py-md px-md text-right text-on-surface-variant">09:50 AM</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>
</div>
</main>
{/*  Floating Action Button - Contextual for Logistics  */}
<button className="fixed bottom-lg right-lg bg-primary text-on-primary w-14 h-14 rounded-full shadow-[0px_8px_24px_rgba(27,109,36,0.3)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all group z-50">
<span className="material-symbols-outlined text-3xl" data-icon="add" style={{fontVariationSettings: "'wght' 600"}}>add</span>
<span className="absolute right-full mr-md bg-inverse-surface text-inverse-on-surface px-md py-xs rounded-lg font-label-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Create New Dispatch</span>
</button>

</div></div>
    </>
  );
}
