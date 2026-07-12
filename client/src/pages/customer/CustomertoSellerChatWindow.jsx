import React from 'react';
import CustomerFooter from '../../components/CustomerFooter';
import CustomerNavbar from '../../components/CustomerNavbar';

export default function CustomertoSellerChatWindow() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-background text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container">
<div className="flex h-screen overflow-hidden">
{/*  SIDEBAR NAVIGATION (Immutable JSON Shell)  */}
<aside className="fixed left-0 top-0 h-full flex flex-col z-40 h-full w-64 hidden md:flex flex-col bg-surface-container border-r border-outline-variant">
<div className="p-lg">
<h3 className="font-h3 text-h3 font-bold text-primary">Marketplace Chat</h3>
<p className="font-body-md text-body-md text-on-surface-variant opacity-70">Direct Messaging</p>
</div>
<nav className="flex-1 px-sm space-y-base overflow-y-auto hide-scrollbar">
<div className="px-md py-sm rounded-lg text-primary font-bold border-r-4 border-primary bg-primary-container/10 flex items-center gap-md cursor-pointer active:scale-95 duration-200">
<span className="material-symbols-outlined">chat</span>
<span className="font-body-md text-body-md">Chats</span>
</div>
<div className="px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant flex items-center gap-md transition-colors cursor-pointer active:scale-95 duration-200">
<span className="material-symbols-outlined">storefront</span>
<span className="font-body-md text-body-md">Vendors</span>
</div>
<div className="px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant flex items-center gap-md transition-colors cursor-pointer active:scale-95 duration-200">
<span className="material-symbols-outlined">support_agent</span>
<span className="font-body-md text-body-md">Support</span>
</div>
<div className="px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant flex items-center gap-md transition-colors cursor-pointer active:scale-95 duration-200">
<span className="material-symbols-outlined">archive</span>
<span className="font-body-md text-body-md">Archive</span>
</div>
</nav>
<div className="p-lg">
<button className="w-full bg-primary text-on-primary font-label-md text-label-md py-md rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-sm">
<span className="material-symbols-outlined text-[20px]">add</span>
                    New Message
                </button>
</div>
</aside>
{/*  CHATS LIST SIDEBAR  */}
<div className="hidden lg:flex flex-col w-80 bg-surface border-r border-outline-variant ml-64 overflow-hidden">
<div className="p-md space-y-md">
<div className="relative">
<input className="w-full pl-xl pr-md py-sm bg-surface-container-low border border-outline-variant rounded-full text-body-sm focus:outline-none focus:border-secondary transition-all" placeholder="Search chats..." type="text"/>
<span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
</div>
</div>
<div className="flex-1 overflow-y-auto">
{/*  Conversation Item Active  */}
<div className="p-md flex items-center gap-md bg-primary-container/5 border-l-4 border-primary cursor-pointer hover:bg-surface-container transition-all">
<div className="relative shrink-0">
<img alt="Vendor Logo" className="w-12 h-12 rounded-full object-cover" data-alt="A professional circular logo for a boutique pottery brand featuring an abstract clay vessel icon in warm terracotta tones. The background is a crisp minimalist white, shot in high-end studio lighting to emphasize luxury and artisanal quality. The style is modern, professional, and trustworthy." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSG0AxjRPFv9MOvhDlmWfk8t4PFzzLxuHkXHF0euHMQ8AkDqvHBYCNJ9iG-bBuJNDLLdnMiJKByBxeZXJKCrA_qFn7Ih7klp3dcjPDrRz3M7Ct04Wjg2VgaV_KhGY55mv1pJhuheShPURyCOUwNbL2CwhI--qXjuk4VaV9W2HD0tHBmQ8NaUtdX-e1XGcNAB0cQpfg75VwgWI_-lUnyV45OxMfAg6FvTSLXmDlXMzfTxu2C2-jEQBvq5EPDHTJftnl90X_dzn5oMuE"/>
<div className="absolute bottom-0 right-0 w-3 h-3 bg-primary border-2 border-surface rounded-full"></div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-center mb-xs">
<span className="font-label-md text-label-md truncate">Artisan Crafts</span>
<span className="text-[10px] text-on-surface-variant">10:42 AM</span>
</div>
<p className="text-body-sm text-on-surface-variant truncate font-semibold">Yes, I can customize the glazing for you!</p>
</div>
<div className="w-2 h-2 bg-primary rounded-full"></div>
</div>
{/*  Conversation Item  */}
<div className="p-md flex items-center gap-md cursor-pointer hover:bg-surface-container transition-all">
<div className="shrink-0">
<img alt="Vendor Logo" className="w-12 h-12 rounded-full object-cover grayscale opacity-80" data-alt="A minimalist logo for a high-end leather goods brand, showcasing a stylized sewing needle and thread. The aesthetic is extremely clean and professional, with a corporate blue and silver color palette. The lighting is soft and even, suggesting reliability and premium craftsmanship." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhH8bvoxUw4GZgr8-jPVrInzT2FFY9VW4izeS6NLMrddvZB8d2qgLVynvXiun4YPDufqFV1gCfq9tEketRabEFwd_3CxFK0XhrOlmU3sJm-Y2-OENF6nCCnzyTIMUPbDudvUROTsv6YyaexyFUb9LsX9_iCh3xuIxhpTgBgfUs6SE6W5CU7wFldBWka7NyMqe2oeHkRx0Iy9e-RN46Wq8o-mGzt_GfWChYJxseoejK8WxRD7vT8swrJlYuD0K9_QF2OBPYHgYue5z7"/>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-center mb-xs">
<span className="font-label-md text-label-md truncate">Urban Leather Co.</span>
<span className="text-[10px] text-on-surface-variant">Yesterday</span>
</div>
<p className="text-body-sm text-on-surface-variant truncate">Your order has been shipped.</p>
</div>
</div>
{/*  Conversation Item  */}
<div className="p-md flex items-center gap-md cursor-pointer hover:bg-surface-container transition-all">
<div className="shrink-0">
<img alt="Vendor Logo" className="w-12 h-12 rounded-full object-cover" data-alt="A vibrant and modern logo for an organic farm collective, featuring a minimalist sprout growing from rich soil. The colors are deep greens and earthy browns, reflecting an eco-friendly and ethical brand identity. The style is flat, clean, and highly legible, optimized for a high-fidelity digital interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTtcXe2SQB5hWWPr0GkzJ52izliCNUXlVv2G7BIu6LnHcBFB2hQ_pXtsxq2nNgCDxJi4ZEMCwwOaMXy_BCOFxRnos0B6zKXH7ognmTSY4SfcNGdnDQ0h-NrSMAOvKsLvWRRhiXPsD8dyBQEwd4DWCfwM78HbMJVSdHQiyZK8LQZuiRkZN4kkl3euE06DZ67dnnIdaYaqB2nScUglPe5VUrQU5R39wI5xAqq7OVkiqZ_ga-UI0mKdKcofV6ERU8KXWyMCoc1dm55FTC"/>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-center mb-xs">
<span className="font-label-md text-label-md truncate">Green Roots Farm</span>
<span className="text-[10px] text-on-surface-variant">Tue</span>
</div>
<p className="text-body-sm text-on-surface-variant truncate">The strawberries are back in stock!</p>
</div>
</div>
</div>
</div>
{/*  MAIN CHAT AREA  */}
<main className="flex-1 flex flex-col bg-surface relative min-w-0">
{/*  TOP NAV BAR (Immutable JSON Shell)  */}
<header className="flex justify-between items-center px-margin-desktop w-full h-16 sticky top-0 z-50 bg-surface shadow-sm border-b border-outline-variant">
<div className="flex items-center gap-md">
<button className="lg:hidden text-on-surface-variant">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container flex items-center justify-center">
<img alt="Artisan Crafts" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfPBb6fgc5Sl92P4X1v3cX54KWC51Zu9f05GjCesqkKpiEvFWaBnF6OnjLwTiXSImFmC3doLwR_0P82IRlVQtxg0Dc72LEwNd3kUqZvc75Z0eN60zqEMlwl5FcvJaG81jCCOI_haIUSqwQhi_sgzijUBB8T5HWEhPh0BfhDaqXb-2JnVf9MfR_SLU9IqW8M6sbBrKpQo_9zMwoFsEfV56h_1iKZnC-3PFTlWNORlrVzyHnCG39HRCl62WtB8Uj1-nvPn2U5hWacqxO"/>
</div>
<div>
<h4 className="font-h4 text-h4 font-bold text-primary">Artisan Crafts</h4>
<div className="flex items-center gap-xs">
<span className="w-2 h-2 bg-primary rounded-full"></span>
<span className="text-label-sm font-label-sm text-on-surface-variant">Online • 4.9 Rating</span>
</div>
</div>
</div>
</div>
<div className="hidden md:flex items-center gap-xl">
<a className="font-label-md text-label-md text-primary border-b-2 border-primary pb-1" href="#">Dashboard</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all" href="#">Orders</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all" href="#">Reviews</a>
</div>
<div className="flex items-center gap-md">
<button className="p-sm rounded-full hover:bg-surface-variant transition-all active:scale-95">
<span className="material-symbols-outlined text-on-surface-variant">notifications</span>
</button>
<button className="p-sm rounded-full hover:bg-surface-variant transition-all active:scale-95">
<span className="material-symbols-outlined text-on-surface-variant">settings</span>
</button>
<img alt="Current user avatar" className="w-8 h-8 rounded-full object-cover border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcSsYfYSq2uosJj4GmR_VZwGbtsu2jR8Qj6Dkz8u9ohiZF9eQiyTZNz2rMAm7yrpBqShOlAsFwLFra8DH8PLZ7ltT5vOuWeA2duZgUJv06yY94tfdc935B72HIk6zhQkdpTHm1ppbxdXPcSrafcVFME59FCVfk1k91tbO9pIcSgvP_OmR5Uwrc9dTKs5PcAlL29w-iR9jPIz3JRcLKl16l7iIYNcdjqDV5ugaVF_v7Ij_PYQwOWlTt9PEahiTc--yuvSdAkkDhlQ_P"/>
</div>
</header>
{/*  Product Context Overlay  */}
<div className="mx-margin-desktop mt-md mb-xs flex items-center p-sm bg-surface-container-low rounded-xl border border-outline-variant gap-md shadow-sm z-10 animate-fade-in">
<img alt="Ceramic Vase" className="w-16 h-16 rounded-lg object-cover shadow-sm" data-alt="A close-up of a handmade ceramic vase with intricate blue and white drip glazing. The vase is placed on a minimalist wooden surface under soft, natural morning sunlight filtering through a window. The aesthetic is serene and high-end, focusing on the texture of the clay and the gloss of the glaze." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhjsjLjewN9yFDHkakeVKTwKY9nsMX4taXObSIULe1TLFnU0JJ0HHRSOshhRrH-77sHS17xE3-6lcdedyENJNhekgjpY6SsCobMVDmdNQU2FMCZ1VaLGsnb7-gONpWgqxKMdtCV4zafMhGbcQz4fKbiX__L_5OoMx8CCbKZNvBDuz9loyFS9zhs8O2ip1XlnaSzHc0Ktnt5TZUxXVfTd2j28cCvEEX8zUzC_y0tijzUJDt9oHtf5Tjux8R3C_eZEVlP_ZxdTfGLj6Y"/>
<div className="flex-1">
<p className="text-label-sm font-label-sm text-on-surface-variant">Inquiring about:</p>
<h5 className="font-label-md text-label-md">Handmade Minimalist Ceramic Vase - Midnight Blue</h5>
<p className="text-label-sm font-label-sm font-bold text-primary">$120.00</p>
</div>
<button className="bg-primary-container text-on-primary-container font-label-sm text-label-sm px-md py-sm rounded-lg hover:brightness-110 transition-all">
                    View Product
                </button>
<button className="text-on-surface-variant p-xs">
<span className="material-symbols-outlined">close</span>
</button>
</div>
{/*  CHAT CONTENT  */}
<div className="flex-1 overflow-y-auto px-margin-desktop py-lg space-y-lg flex flex-col hide-scrollbar" id="chat-window">
<div className="flex justify-center">
<span className="px-md py-xs bg-surface-container rounded-full text-label-sm font-label-sm text-on-surface-variant">October 12, 2023</span>
</div>
{/*  Seller Message  */}
<div className="flex gap-md max-w-[80%]">
<div className="w-8 h-8 rounded-full shrink-0 mt-xs overflow-hidden">
<img alt="Seller" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_HiMt8ZvFjOw56mJSkXluYG5csnQfMP1HhkMh7_V2Y_ICSGQyj9RsGSloExp857Exvx-JOhFYmm-L3b1bhSCaIltBALakIhKRopL1afZAhfC4JbPeNUKPjVUdQSsQ0fzONkd_MMm9rZ1FEjLbdCk4bvB5MoQos5SXOChlcVXVkCbD30r9t3zeqla6h4sL2c2-OPzHdbim-cyuwLbOE-PkelqE_dK5fhltMRQz5FqNsNq6dWLp438xrCGICmPjbLBY_RKkdcO3vUHh"/>
</div>
<div>
<div className="bg-surface-container-high p-md chat-bubble-left text-on-surface shadow-sm">
<p className="text-body-md">Hello! Thank you for reaching out. The Midnight Blue vase is one of our most popular pieces. Would you like to know more about the dimensions or the glazing process?</p>
</div>
<span className="text-[10px] text-on-surface-variant mt-xs block">10:40 AM</span>
</div>
</div>
{/*  Customer Message  */}
<div className="flex gap-md max-w-[80%] ml-auto flex-row-reverse">
<div className="w-8 h-8 rounded-full shrink-0 mt-xs overflow-hidden bg-secondary-container">
<img alt="Customer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlaQZMpRgjNSi68BKKmhH1pGGauCjnEKWMK13eEw6lh3OsBJSJrodzIdwAgpSmQ9Zsql6r-XnhG48GbFDGu9ZZmUVOJaVohve6UEqIgJ4UFwa8i_SES5_KEU0TXOS_h9gw7-94ylx26BbjAPLHtevOHwkxD3EYaWMs7LMAl7q0Gw9w4VlS7xtXCanTWeKJxoz2K-uaK7Yp9ITekI4Ng0FS4I8BbkvqpNgIGuYzYaJUG9CKog7bmEJVQBjVHHVIocOM_A2jcZJQ4ZV8"/>
</div>
<div className="flex flex-col items-end">
<div className="bg-primary text-on-primary p-md chat-bubble-right shadow-md">
<p className="text-body-md">Hi! I love the design. Is it possible to get this in a slightly larger size, maybe 12 inches tall?</p>
</div>
<div className="flex items-center gap-xs mt-xs">
<span className="text-[10px] text-on-surface-variant">10:41 AM</span>
<span className="material-symbols-outlined text-[12px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>done_all</span>
</div>
</div>
</div>
{/*  Seller Message  */}
<div className="flex gap-md max-w-[80%]">
<div className="w-8 h-8 rounded-full shrink-0 mt-xs overflow-hidden">
<img alt="Seller" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxr0LkesbKno20jKuXwqNSD2EIsYQlk-JIKNhA_qPX5QDOoAgxU8fXSS34jk0Lb4m99ZGMCC7Unq0aT6NDp9gcNFzi0Fptf-v7DFeYo41LpT4QiF8wmmQq7PxKyHWkzXOXE0KTJpHneR-P4cUclzH6NrCqF1q4W3VqvBIMHEQj_25yzu7ItZsYSZV25YFMyXpxYbL82AF_3F2eeyqZRTa_4FzrKNRPMJHq2ant54yLEnZZmf6gBsR8uqtlJie7pVFz6jI5IKKL1HAD"/>
</div>
<div>
<div className="bg-surface-container-high p-md chat-bubble-left text-on-surface shadow-sm">
<p className="text-body-md">Yes, I can definitely make a custom 12-inch version for you! It would take about 2 extra weeks for the additional firing cycle. Does that timeline work for you?</p>
</div>
<span className="text-[10px] text-on-surface-variant mt-xs block">10:42 AM</span>
</div>
</div>
{/*  Seller Typing...  */}
<div className="flex items-center gap-xs text-on-surface-variant opacity-60 ml-12">
<span className="text-[10px] font-label-sm italic">Artisan Crafts is typing</span>
<div className="flex gap-[2px]">
<span className="w-1 h-1 bg-on-surface-variant rounded-full animate-bounce"></span>
<span className="w-1 h-1 bg-on-surface-variant rounded-full animate-bounce [animation-delay:0.2s]"></span>
<span className="w-1 h-1 bg-on-surface-variant rounded-full animate-bounce [animation-delay:0.4s]"></span>
</div>
</div>
</div>
{/*  STICKY INPUT BAR  */}
<div className="p-md bg-surface border-t border-outline-variant flex items-center gap-md relative">
<div className="flex items-center gap-xs">
<button className="p-sm text-on-surface-variant hover:bg-surface-variant rounded-full transition-all">
<span className="material-symbols-outlined">add_circle</span>
</button>
<button className="p-sm text-on-surface-variant hover:bg-surface-variant rounded-full transition-all">
<span className="material-symbols-outlined">attach_file</span>
</button>
<button className="p-sm text-on-surface-variant hover:bg-surface-variant rounded-full transition-all">
<span className="material-symbols-outlined">mood</span>
</button>
</div>
<div className="flex-1 relative">
<input className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-md py-md text-body-md focus:outline-none focus:border-primary transition-all" id="chat-input" placeholder="Type a message..." type="text"/>
</div>
<button className="bg-primary text-on-primary p-md rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>send</span>
</button>
</div>
</main>
{/*  RIGHT INFO PANEL (Product Details/Vendor Info)  */}
<aside className="hidden xl:flex flex-col w-72 bg-surface border-l border-outline-variant p-md space-y-xl">
<div className="text-center">
<img alt="Artisan" className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-surface shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfZXjKNFI3_8E7iKHYnKkMO6mEl6x0MbK9eoPK0F0ezGs41YHhWOk8pvk6eKqUyj1LNeeCGwg7RUTMFBPmcT3xESVm1envxI-GyDsxPDPkaXIUxF-4MCjG1lpjM5NBxDLb1LCr0vb6_xX2bH1HltD2ooeRDlZkHJUiw0JW7lwfvBRzYmnzo8I5jyR1Nrp4VI1R8QssHjjSWe5oYvj9yAhlnFQqwuR1-qYgWiLJux3jVZqU9L8AnKlNTDXKQsu93nzlyKQypTPk2XcV"/>
<h4 className="mt-md font-h4 text-h4">Artisan Crafts</h4>
<p className="text-body-sm text-on-surface-variant">Based in Portland, Oregon</p>
<div className="mt-sm flex justify-center items-center gap-xs">
<span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="font-label-md">4.9 (1.2k reviews)</span>
</div>
</div>
<div className="space-y-md">
<h5 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant opacity-70">Shop Statistics</h5>
<div className="grid grid-cols-2 gap-sm">
<div className="bg-surface-container p-sm rounded-lg">
<span className="text-[10px] block text-on-surface-variant">Avg Response</span>
<span className="font-label-md">1 hour</span>
</div>
<div className="bg-surface-container p-sm rounded-lg">
<span className="text-[10px] block text-on-surface-variant">Total Sales</span>
<span className="font-label-md">5,432</span>
</div>
</div>
</div>
<div className="space-y-md">
<h5 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant opacity-70">Shared Files</h5>
<div className="space-y-sm">
<div className="flex items-center gap-sm p-xs hover:bg-surface-container rounded transition-all cursor-pointer">
<span className="material-symbols-outlined text-primary">image</span>
<div className="min-w-0">
<p className="text-label-sm truncate">custom_sketch_01.png</p>
<p className="text-[10px] text-on-surface-variant">2.4 MB • Oct 12</p>
</div>
</div>
<div className="flex items-center gap-sm p-xs hover:bg-surface-container rounded transition-all cursor-pointer">
<span className="material-symbols-outlined text-primary">description</span>
<div className="min-w-0">
<p className="text-label-sm truncate">invoice_#9921.pdf</p>
<p className="text-[10px] text-on-surface-variant">156 KB • Oct 10</p>
</div>
</div>
</div>
</div>
<div className="mt-auto">
<button className="w-full border border-outline text-on-surface font-label-md py-sm rounded-lg hover:bg-surface-container transition-all">
                    Block User
                </button>
</div>
</aside>
{/*  BOTTOM NAV BAR (Immutable JSON Shell Mobile Only)  */}
<CustomerNavbar />
</div>

</div></div>
    </>
  );
}
