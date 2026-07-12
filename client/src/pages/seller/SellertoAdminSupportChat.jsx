import React from 'react';
import SellerSidebar from '../../components/SellerSidebar';
import SellerNavbar from '../../components/SellerNavbar';

export default function SellertoAdminSupportChat() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-background text-on_surface font-body-md overflow-hidden">
{/*  Desktop Sidebar  */}
<SellerSidebar />
{/*  Main Content Area  */}
<main className="md:ml-64 flex flex-col h-screen relative bg-surface">
<SellerNavbar title="Ethizone Support" />
{/*  Chat Container  */}
<section className="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop space-y-lg flex flex-col">
{/*  Date Separator  */}
<div className="flex justify-center">
<span className="px-md py-xs bg-surface_container_high text-on_surface_variant text-label-sm rounded-full">Today, October 24</span>
</div>
{/*  System Message  */}
<div className="flex justify-center">
<div className="flex items-center gap-sm px-lg py-sm bg-secondary_container/10 border border-secondary-container/20 text-on_secondary_container text-body-sm rounded-xl">
<span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                    Ticket #1234 has been assigned to <span className="font-bold">Agent Marcus</span>.
                </div>
</div>
{/*  Seller Message (Left)  */}
<div className="flex items-start gap-md max-w-[85%] md:max-w-[70%]">
<div className="w-8 h-8 rounded-full bg-surface_container_highest flex-shrink-0 flex items-center justify-center">
<span className="material-symbols-outlined text-on_surface_variant text-[18px]">person</span>
</div>
<div className="flex flex-col gap-xs">
<div className="p-md bg-surface_container_low border border-outline_variant rounded-tr-xl rounded-b-xl shadow-sm">
<p className="text-body-md">Hello Support, I'm reaching out regarding my withdrawal limit. I've exceeded the $10,000 threshold and need a manual account verification review to increase it. Can you help?</p>
</div>
<span className="text-[11px] text-on_surface_variant px-xs">09:41 AM</span>
</div>
</div>
{/*  Admin Message (Right)  */}
<div className="flex items-start gap-md max-w-[85%] md:max-w-[70%] self-end flex-row-reverse">
<div className="w-8 h-8 rounded-full bg-primary_container flex-shrink-0 flex items-center justify-center">
<span className="material-symbols-outlined text-on_primary_container text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>support_agent</span>
</div>
<div className="flex flex-col gap-xs items-end">
<div className="p-md bg-primary text-on-primary rounded-tl-xl rounded-b-xl shadow-sm">
<p className="text-body-md">Hi Artisan Woods Co., I'm happy to assist. To process a withdrawal limit increase, I'll need you to upload your updated business registration and a valid VAT certificate. I've opened a secure document portal for you below.</p>
</div>
<div className="flex items-center gap-xs">
<span className="material-symbols-outlined text-primary text-[14px]">done_all</span>
<span className="text-[11px] text-on_surface_variant">09:45 AM</span>
</div>
</div>
</div>
{/*  Platform Announcement Style Layout (Bento-ish Card)  */}
<div className="max-w-md mx-auto w-full">
<div className="p-lg bg-surface-bright border border-outline_variant rounded-xl shadow-sm space-y-md">
<div className="flex items-center justify-between">
<span className="bg-error_container text-on_error_container text-[10px] px-2 py-0.5 rounded font-bold uppercase">Priority Action</span>
<span className="text-on_surface_variant text-label-sm">Expires in 24h</span>
</div>
<div className="flex gap-md">
<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary">upload_file</span>
</div>
<div>
<p className="font-label-md">Verification Link Generated</p>
<p className="text-body-sm text-on_surface_variant">Securely upload documents for higher withdrawal tiers.</p>
</div>
</div>
<button className="w-full py-sm bg-surface_container_highest hover:bg-surface_variant transition-colors text-on_surface font-label-md rounded-lg">
                        Open Portal
                    </button>
</div>
</div>
{/*  System Info  */}
<div className="flex justify-center">
<span className="text-[12px] text-on_surface_variant italic">Agent is typing...</span>
</div>
</section>
{/*  Message Input  */}
<footer className="p-margin-mobile md:p-margin-desktop bg-surface border-t border-outline_variant">
<div className="max-w-4xl mx-auto">
<div className="flex items-center gap-sm mb-sm overflow-x-auto no-scrollbar pb-xs">
<button className="shrink-0 px-md py-1 bg-error_container/20 text-error border border-error/20 rounded-full flex items-center gap-xs text-label-sm hover:bg-error_container/30 transition-colors">
<span className="material-symbols-outlined text-[16px]">flag</span>
                        High Priority
                    </button>
<button className="shrink-0 px-md py-1 bg-surface_container_high text-on_surface_variant border border-outline_variant rounded-full flex items-center gap-xs text-label-sm hover:bg-surface_variant transition-colors">
<span className="material-symbols-outlined text-[16px]">attach_file</span>
                        Attach Logs
                    </button>
<button className="shrink-0 px-md py-1 bg-surface_container_high text-on_surface_variant border border-outline_variant rounded-full flex items-center gap-xs text-label-sm hover:bg-surface_variant transition-colors">
<span className="material-symbols-outlined text-[16px]">history</span>
                        Reference Ticket
                    </button>
</div>
<div className="flex items-end gap-md bg-surface_container_low border border-outline_variant rounded-xl p-xs focus-within:border-secondary transition-all">
<button className="p-sm text-on_surface_variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">add_circle</span>
</button>
<textarea className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-sm text-body-md max-h-32 min-h-[40px]" oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'" placeholder="Type your message to Admin..." rows="1"></textarea>
<div className="flex items-center gap-sm p-sm">
<button className="p-sm text-on_surface_variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">mood</span>
</button>
<button className="w-10 h-10 bg-primary text-on-primary rounded-lg flex items-center justify-center active:scale-95 transition-transform shadow-md">
<span className="material-symbols-outlined">send</span>
</button>
</div>
</div>
<p className="text-[11px] text-on_surface_variant text-center mt-sm">Messages are monitored for security and quality assurance.</p>
</div>
</footer>
{/*  Mobile Nav (Predicted BottomNavBar)  */}

</main>

</div></div>
    </>
  );
}
