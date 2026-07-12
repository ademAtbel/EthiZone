import React from 'react';
import CustomerFooter from '../../components/CustomerFooter';
import CustomerNavbar from '../../components/CustomerNavbar';

export default function CustomerChatWindow() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-background text-on-surface min-h-screen flex flex-col font-body-md">
{/*  Top Navigation Bar (Shared Component Strategy)  */}
<CustomerNavbar />
{/*  Main Content Area: Messaging Interface  */}
<main className="flex-grow flex items-center justify-center p-md md:p-lg bg-surface-container-low">
<div className="w-full max-w-5xl h-[calc(100vh-140px)] bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-outline-variant">
{/*  Side Navigation (Messaging Sidebar)  */}
<aside className="hidden md:flex flex-col w-80 border-r border-outline-variant bg-surface">
<div className="p-md border-b border-outline-variant">
<h2 className="text-h4 font-h4 text-on-surface">Messages</h2>
</div>
<div className="flex-grow overflow-y-auto chat-scrollbar">
{/*  Active Conversation  */}
<div className="p-md bg-secondary-container text-on-secondary-container flex items-center gap-md cursor-pointer transition-all">
<div className="relative">
<img className="w-12 h-12 rounded-full object-cover border-2 border-primary-fixed" data-alt="A professional portrait of a male business owner with a friendly and trustworthy expression. He is set against a clean, blurred office background with warm wooden accents and soft natural lighting. The visual style is modern, professional, and corporate, emphasizing reliability and a high-end customer service experience through clear details and balanced color tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXWTdcx5_S_VjwfdcUREc5NdYkDyu4AWpSiCShxcIDQ1u7S6AWuiYikrkNoznHY_6jJYlnfPpKDda6aRHoxhMArANN9SVOZf68TM9ExPXW1_4tjeJf_1zVM16Nj77-l6ljh7zRrVrr2tfoLw13Z7qVyEKagWvGfe_AS8kmubzLprF-DIClCKFEWyWcNOqiduX1wKnOn4fSWQ0j5fycAexZ7S_B8b1GFWyvXBqhtvMNdw6SVfxzF6YCBprdNUWbSQcY6FNZOI3oaMRX"/>
<div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-surface"></div>
</div>
<div className="flex-grow">
<div className="flex justify-between items-center">
<span className="text-label-md font-label-md">Elena's Pottery</span>
<span className="text-[10px] opacity-70">2m</span>
</div>
<p className="text-body-sm line-clamp-1 opacity-80">Your phone number is verified...</p>
</div>
</div>
{/*  Inactive Conversations  */}
<div className="p-md hover:bg-surface-container-high flex items-center gap-md cursor-pointer transition-colors duration-200">
<img className="w-12 h-12 rounded-full object-cover" data-alt="A candid, high-resolution portrait of a smiling female designer in a brightly lit creative studio. The background features colorful art supplies and minimalist white shelving, creating an atmosphere of artisan craftsmanship and professional creativity. The lighting is soft and even, highlighting a warm skin tone and a modern corporate-lifestyle aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCFo4qnyuTmHMHb21_oBDRUXvyTTQCNhq4vbjQ99req0vaURU09hZ56nTAa5LyOpQPEusC38ePRVvqPD-fFRl6ug01-AHx4M8DH7NkTuaSsXmI3Gv2TXu4vv4rnre_LCoislo2Q45BfNZlMqprrANrofWeHfI2H2IcVgHDIGwwv1U5NzE9V6V1TtoF4wd9gjDyAHQCwckFVt_R-Gjw17LfkL_nH-o8rXpW6pnWyDUXiKEljHz5TRR__ASL1hosGlfoOMit2cTB9EpB"/>
<div className="flex-grow">
<div className="flex justify-between items-center">
<span className="text-label-md font-label-md">Urban Weaves</span>
<span className="text-[10px] text-on-surface-variant">1h</span>
</div>
<p className="text-body-sm text-on-surface-variant line-clamp-1">Did you receive the tracking info?</p>
</div>
</div>
</div>
</aside>
{/*  Chat Window Content  */}
<section className="flex-grow flex flex-col bg-surface-container-lowest">
{/*  Chat Header  */}
<header className="h-20 flex items-center justify-between px-md md:px-lg border-b border-outline-variant bg-surface-bright">
<div className="flex items-center gap-md">
<div className="relative">
<img className="w-10 h-10 rounded-full object-cover" data-alt="Close up of a professional male seller headshot with a clean and sharp focus. The lighting is bright and cheerful, echoing a modern corporate marketplace atmosphere. His expression is welcoming and helpful, suitable for a trusted vendor profile. The background is a soft-focus interior with neutral grey and white tones to maintain visual simplicity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB6HCkFeqMMvdz42083m8DzRJuNxsbGb0LTigoA-0pxqqHuTKmJBuBz_Lw6RK9IGv4RQikfiwTmFAug12zdbwacEAKxsaoXMJq_IEz3JAoMnLBtzL00vvMRGCpWg4uxWsPSmTGj7Az_VgDy9InhT6ghFrndyjcjEyovftKfO0ASvOgQ0nu4NH-wKWTMIx_rFfqiTwnIklyPkGaHX41wbKnWew-NLDfhK8ghpflMoRW30_GpjWMdiNqqSCu6n5DRFo_9SIm7bjnqCBI"/>
<div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-surface-bright"></div>
</div>
<div>
<div className="flex items-center gap-sm">
<h3 className="text-label-md font-label-md text-on-surface">Marco Santini</h3>
<span className="text-[10px] px-sm py-[2px] bg-primary-fixed text-on-primary-fixed rounded-full font-bold">SELLER</span>
</div>
<p className="text-body-sm text-on-surface-variant">Elena's Pottery Workshop</p>
</div>
</div>
{/*  Product Thumbnail  */}
<div className="hidden sm:flex items-center gap-sm p-xs pr-md border border-outline-variant rounded-lg bg-surface">
<img className="w-10 h-10 rounded object-cover" data-alt="A high-quality studio photograph of a handcrafted terracotta vase with a minimalist design. The vase sits on a clean white pedestal against a neutral beige background. The lighting is soft and directional, creating gentle shadows that emphasize the texture and professional craftsmanship of the artisan product. The overall mood is sophisticated and elegant." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMN9yGtXJ95LrmeAmeX4hLroNblmnSFaAPIGL01ImgqJLYTRL4POnhFKz1ei_0k6kbguWKpPYCDuiWk00uGAVrZBWU_FKZblPxi8zlWGsEIIP7ZkfaHQKIvQUADFFUfveQMyeRuXdMNvbBj5h-MmABrSlDJXV1zqUcJgpzweNjSZu4vrkEq4tAYsUgt8yCX34GjVdlBooZemRsaVr1AvBfoOfNJjm5_qmYl7omFe9RhxXhRTrCgOWXZ7lBa1Ct4m8GPbY54pBf_plr"/>
<div className="flex flex-col">
<span className="text-[11px] font-bold text-on-surface leading-tight">Terracotta Vase</span>
<span className="text-[11px] text-primary font-bold leading-tight">$45.00</span>
</div>
</div>
</header>
{/*  Message History  */}
<div className="flex-grow overflow-y-auto p-md md:p-lg flex flex-col gap-lg chat-scrollbar">
{/*  Customer Verification Badge & System Message  */}
<div className="flex flex-col items-center gap-md my-sm">
<div className="flex items-center gap-xs px-md py-sm bg-primary-container text-on-primary-container rounded-full shadow-sm animate-pulse">
<span className="material-symbols-outlined text-[18px]" data-icon="verified_user">verified_user</span>
<span className="text-label-sm font-label-sm">Phone Verified</span>
</div>
<div className="bg-surface-container-high px-lg py-sm rounded-lg border border-outline-variant max-w-md text-center">
<p className="text-body-sm text-on-surface-variant">
                                Your phone number is verified. You can now chat with the seller.
                            </p>
</div>
</div>
{/*  Date Divider  */}
<div className="flex items-center justify-center">
<div className="h-[1px] bg-outline-variant flex-grow"></div>
<span className="px-md text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Today</span>
<div className="h-[1px] bg-outline-variant flex-grow"></div>
</div>
{/*  Message Bubbles  */}
{/*  Seller Message  */}
<div className="flex items-start gap-sm max-w-[85%]">
<img className="w-8 h-8 rounded-full object-cover flex-shrink-0" data-alt="Small thumbnail of the male seller's profile picture for the chat interface. He is smiling and professional, maintaining the brand's trustworthy and approachable image in a high-quality, modern studio setting with soft lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVo6RbrZgL9asxdIaN9nGtrABtmhY2EDTT9IO1fi-8ohonOvVuTHnT0w-kwnGD1DLna3lhb5H9BJf2TgRS2lT36V9BoqD8yaIi-Z8ifXtXCuMlNKzx-tcgIafHlaYs2dSccxP54cZq4aJl4l8xKveZ_P7STgt4PjUAmb2L-Msao4RlwV5wNKPFrZVMHD-3544s1PxJs0czW-PLzWzlAAK-1PMVfocQ57izw9smW_AEfdmLrc6lk0hTZdNM8HDHf6BIfTkUNBMJ-BaV"/>
<div className="flex flex-col gap-xs">
<div className="bg-surface-container-highest text-on-surface p-md rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm">
<p className="text-body-md">Hello! I saw you were interested in the Terracotta Vase. I just wanted to let you know that it's handmade and we only have two left in stock.</p>
</div>
<span className="text-[10px] text-on-surface-variant ml-xs">09:41 AM</span>
</div>
</div>
{/*  User Message  */}
<div className="flex items-start gap-sm self-end max-w-[85%] flex-row-reverse">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm flex-shrink-0">JS</div>
<div className="flex flex-col gap-xs items-end">
<div className="bg-primary text-on-primary p-md rounded-tl-xl rounded-bl-xl rounded-br-xl shadow-sm">
<p className="text-body-md">Thanks for letting me know! I just verified my phone. Is it possible to get a discount if I buy both?</p>
</div>
<div className="flex items-center gap-xs">
<span className="text-[10px] text-on-surface-variant">09:45 AM</span>
<span className="material-symbols-outlined text-[14px] text-primary" data-icon="done_all">done_all</span>
</div>
</div>
</div>
{/*  Seller Typing  */}
<div className="flex items-start gap-sm max-w-[85%]">
<img className="w-8 h-8 rounded-full object-cover flex-shrink-0" data-alt="Small thumbnail of the male seller's profile picture for the chat interface. He is smiling and professional, maintaining the brand's trustworthy and approachable image in a high-quality, modern studio setting with soft lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwYA1hM33rZw-ei5yLZVFG184lRjsGTd6UlIxMK18Lj-fYNLoysKHx7KJ3-Uh1at-9peBFwQNlKpMCVPbgPVlVyAoPR2C8EQ3fhr-qnBA0rOhHipb4bA-qv6yPf5e_GbabWc5UxzQ8gfksrtDDkXT_HghFMJx8-bZEVTRJTsipAXPr8dCeveaee2JYdnaGcBk36HGb5TshEbTK02yLSlW-cwEQcyqtzAuiHQEYNcyNj95bgNYLYVZGFZ5oSxMyuG62gdiFJKm4OYO_"/>
<div className="bg-surface-container-highest text-on-surface px-md py-sm rounded-tr-xl rounded-br-xl rounded-bl-xl flex items-center gap-xs">
<span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce"></span>
<span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce [animation-delay:0.2s]"></span>
<span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce [animation-delay:0.4s]"></span>
</div>
</div>
</div>
{/*  Chat Input Area  */}
<CustomerFooter />
</section>
</div>
</main>
{/*  Footer (Shared Component Strategy)  */}
<CustomerFooter />

</div></div>
    </>
  );
}
