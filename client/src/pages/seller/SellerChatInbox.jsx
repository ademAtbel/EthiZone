import React from 'react';
import SellerSidebar from '../../components/SellerSidebar';
import SellerNavbar from '../../components/SellerNavbar';

export default function SellerChatInbox() {
  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on_surface h-screen overflow-hidden flex">
          {/*  SideNavBar Component  */}
          <SellerSidebar />
          
          {/*  Main Content Canvas  */}
          <main className="md:ml-64 flex-1 flex flex-col h-full bg-background">
            {/* Unified Seller Header with custom search input */}
            <SellerNavbar title="Customer Messages">
              <div className="relative">
                <input className="pl-10 pr-4 py-2 rounded-xl bg-surface_container border border-outline_variant text-body-sm font-body-sm w-64 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" placeholder="Search conversations..." type="text"/>
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="search">search</span>
              </div>
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant" data-icon="more_vert">more_vert</span>
              </button>
            </SellerNavbar>

            {/*  Messaging Layout  */}
            <div className="flex-1 flex overflow-hidden">
              {/*  Message List  */}
              <section className="w-80 md:w-96 border-r border-outline-variant bg-surface flex flex-col">
                <div className="overflow-y-auto custom-scrollbar flex-1">
                  {/*  Active Message  */}
                  <div className="p-md bg-secondary-container/20 border-l-4 border-secondary flex gap-md cursor-pointer hover:bg-secondary-container/30 transition-colors">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden border border-outline-variant">
                        <img alt="Product" data-alt="A high-quality studio product photograph of a minimalist ceramic teapot set." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL6sefJEs73lqXV2VtxC4ykxOiyydzTsh3v6ocWi1V9jNHxCfFLs68GPowQCckE6f7AbrK2t_YkEhwaRMrlhHTfCPSIg1lU68WoM17JoBBh43AKdw24OS09IIcPpwY5SoOodeT2IzY90rzDSd_7itvZ1Ne7v0tHkeinha10vi4OFvk5prcqexSbI4JpM11XVS4KdJsPX_1E5kUSMGUOuVgZOPlL_GOwvpceGeY8GyRSzj8JWqd_mQtSKTgQ4vYKUSaWgi5hvBg6VaG"/>
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-surface flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] text-on-primary" data-icon="check" style={{fontVariationSettings: "'wght' 700"}}>check</span>
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <p className="text-label-md font-label-md text-on-surface truncate">+234 **** 8821</p>
                        <span className="text-label-sm font-label-sm text-on-surface-variant">2m ago</span>
                      </div>
                      <p className="text-body-sm font-body-sm text-primary font-semibold truncate mb-1">Modern Ceramic Set</p>
                      <p className="text-body-sm font-body-sm text-on-surface-variant truncate">Is this still available for bulk shipping next week?</p>
                    </div>
                  </div>
                  {/*  Inactive Messages  */}
                  <div className="p-md flex gap-md cursor-pointer hover:bg-surface-container-low transition-colors border-b border-outline-variant">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden border border-outline-variant">
                        <img alt="Product" data-alt="Vibrant red professional running shoes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqMMgSDXday-Fzka2Do3AAOr_pssY8TketAti5TWJnaianDUih3daRN0mXdEsuOl3l1BtQ5IfVnwaHHFrDXBD212D6al9Ypmm11s7oqXEBlATG65VDmHz5odPGsPago_TymeTeXXqATThQscIjQgwFY84IJOOk78x_eCfNlChfFVAEUlK-HO-lBz7EXS5IXGQ6POpQK86l1rwbKPyekwZeNtcCcfnOlbm5F34e0Yb-msSUfztUZPiBPwi-Ey1kn6AOw-vo2bantK7O"/>
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-surface flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] text-on-primary" data-icon="check" style={{fontVariationSettings: "'wght' 700"}}>check</span>
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <p className="text-label-md font-label-md text-on-surface truncate">+1 **** 9042</p>
                        <span className="text-label-sm font-label-sm text-on-surface-variant">1h ago</span>
                      </div>
                      <p className="text-body-sm font-body-sm text-on-surface-variant truncate mb-1">Urban Velocity Sneakers</p>
                      <p className="text-body-sm font-body-sm text-on-surface-variant truncate">Thanks! Received the tracking number.</p>
                    </div>
                  </div>
                  <div className="p-md flex gap-md cursor-pointer hover:bg-surface-container-low transition-colors border-b border-outline-variant">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden border border-outline-variant">
                        <img alt="Product" data-alt="Sleek black noise-canceling headphones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7KwFTjVZKwJHucZfTSwMFL5sCCpr1dfWXd_OX_CuEwAascGR5vwIzeEWHpo7-EVL70h5eRwtm9q8SQKCPEplvRJ9IieIvIjn-FfQEGtwc_hBdMMUP2zkDJdrKbO78L-L7HdEBBuveGtHWtYHsIF1blCFNSJS5OxxUn3FbtptIQ8fJVZkHomLlvVauuADu6HUNYf4OLORXbYYAMYiN1PBONhsY1jk2g6gVHFcZfT1wdCKNjlhex31S3d-8lPzkvHvgGTb1CcuVRtht"/>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <p className="text-label-md font-label-md text-on-surface truncate">+44 **** 1129</p>
                        <span className="text-label-sm font-label-sm text-on-surface-variant">4h ago</span>
                      </div>
                      <p className="text-body-sm font-body-sm text-on-surface-variant truncate mb-1">Studio Bass Headphones</p>
                      <p className="text-body-sm font-body-sm text-on-surface-variant truncate font-bold text-on-surface">Can I change my delivery address?</p>
                    </div>
                  </div>
                  <div className="p-md flex gap-md cursor-pointer hover:bg-surface-container-low transition-colors border-b border-outline-variant">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden border border-outline-variant">
                        <img alt="Product" data-alt="Close-up of a premium ceramic texture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTxX4XyZoQwAewmrbOgXpQzRIFE5dE5VyVZp-O2U_8-p2UmcuhcEek-cnzguaLImPr-WyP48plvGNOokzYAgNVpPYC9_gt7QJYPkDBxMPfW--iJcEk8EaxImW48IGBc-fG_BuYUPfDZLRrEpVJd96k8GWXtK008J4Ja8xUunTHlZENDY4kVuUAUZm2-La7f9klSahGNEaJ5Y8N_U1BDvlmopfBUtcLQqZuHUAIbd6WG-QC4auAgqhFOAp4urb2dXoK-IeEXdS8VJAi"/>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <p className="text-label-md font-label-md text-on-surface truncate">+234 **** 5510</p>
                        <span className="text-label-sm font-label-sm text-on-surface-variant">Yesterday</span>
                      </div>
                      <p className="text-body-sm font-body-sm text-on-surface-variant truncate mb-1">Modern Ceramic Set</p>
                      <p className="text-body-sm font-body-sm text-on-surface-variant truncate">The packaging was excellent. Thank you!</p>
                    </div>
                  </div>
                </div>
              </section>
              {/*  Chat Area  */}
              <section className="flex-1 flex flex-col relative">
                {/*  Active Chat Info Card  */}
                <div className="p-md glass-effect border-b border-outline-variant flex items-center justify-between z-10 shadow-sm">
                  <div className="flex items-center gap-md">
                    <div className="flex -space-x-4">
                      <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container-high overflow-hidden shadow-sm">
                        <img alt="User" data-alt="Close-up portrait of a customer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsuxVSEjEoy77xiJg8z28u2_1mbn65IHuLcwwEoOBK3U1QG5d3_Jh1jETUDfRRhU2zM94zBMjb6sBXAKf5QIMsQfyi8mJF0W7cMUKjoU4jbhPWdynZgBjy5LlWSBdFVe6gkfObqw6eYwKsf4lGJPNQ3na5x1EqYY-vXrZy-lmJx1dGCaVd_IRx-E22rZswOzaE5CZiVtmaeZbxZTld-6EGJdM_4zhLdUFzCGdLHZhbU1zkpwwgp_7tOZxgDEolQJ7MZqOHdYuT93Ip"/>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-sm">
                        <span className="text-label-md font-label-md text-on-surface">+234 **** 8821</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold flex items-center gap-1 uppercase">
                          <span className="material-symbols-outlined text-[12px]" data-icon="verified" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                          Verified
                        </span>
                      </div>
                      <p className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Online
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-sm">
                    <button className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface-variant text-label-md font-label-md hover:bg-surface-container-highest transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm" data-icon="info">info</span>
                      Product Details
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-primary text-on-primary text-label-md font-label-md hover:opacity-90 transition-all flex items-center gap-2 shadow-sm">
                      <span className="material-symbols-outlined text-sm" data-icon="receipt_long">receipt_long</span>
                      Create Quote
                    </button>
                  </div>
                </div>
                {/*  Message History  */}
                <div className="flex-1 overflow-y-auto p-xl space-y-lg custom-scrollbar bg-surface-container-lowest">
                  <div className="flex justify-center">
                    <span className="px-4 py-1 rounded-full bg-surface-container text-label-sm font-label-sm text-on-surface-variant">Today, October 24</span>
                  </div>
                  {/*  Customer Message  */}
                  <div className="flex gap-md max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-surface-container-high flex-shrink-0 mt-2"></div>
                    <div className="space-y-sm">
                      <div className="bg-surface p-md rounded-xl rounded-tl-none shadow-sm border border-outline-variant">
                        <p className="text-body-md font-body-md">Hello! I am interested in the Modern Ceramic Set. I see the current stock is limited.</p>
                      </div>
                      <p className="text-label-sm font-label-sm text-on-surface-variant ml-2">10:02 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-md max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-surface-container-high flex-shrink-0 mt-2"></div>
                    <div className="space-y-sm">
                      <div className="bg-surface p-md rounded-xl rounded-tl-none shadow-sm border border-outline-variant">
                        <p className="text-body-md font-body-md">Is this still available for bulk shipping next week? We need approximately 50 units for a corporate event.</p>
                      </div>
                      <div className="p-sm bg-surface-container rounded-lg border border-outline-variant flex items-center gap-md">
                        <div className="w-12 h-12 rounded bg-white overflow-hidden flex-shrink-0">
                          <img alt="Product Thumb" data-alt="Detail shot of handcrafted ceramic glaze" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF8NVRRsns9KdEQg73jgMeH075rzanSP3vnrNVSAD6KEp_R-NgwmBkNzogXW8BKON101sCRRdvIrtZ22vlLnyEj7f4qfHh8hJ9hbFwV6UELoVuJEI9w-N-YiCYUugkgPHqW8O7zzQw4qRiq9dmc8gWGSkDETlCJxHIUQpVfcPkXJyOcWNtU3X3NToYuo7kdSAKjM2FMkCPMfoP7lphj1B8s1EWhxBYkyWkS6CyszmilRa58HqzNQ8S1u9F7X9jsJOU0DKS6UJwLXE3"/>
                        </div>
                        <div className="flex-1">
                          <p className="text-label-sm font-label-sm">Modern Ceramic Set</p>
                          <p className="text-label-sm font-label-sm text-primary">$42.00 / unit</p>
                        </div>
                      </div>
                      <p className="text-label-sm font-label-sm text-on-surface-variant ml-2">10:03 AM</p>
                    </div>
                  </div>
                  {/*  Seller Reply  */}
                  <div className="flex gap-md max-w-[80%] ml-auto flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 mt-2 flex items-center justify-center text-on-primary text-[10px] font-bold">YOU</div>
                    <div className="space-y-sm flex flex-col items-end">
                      <div className="bg-primary-container text-on-primary-container p-md rounded-xl rounded-tr-none shadow-sm">
                        <p className="text-body-md font-body-md">Hi there! Thank you for reaching out. Yes, we can certainly accommodate a bulk order of 50 units. I can offer you a 15% discount for this quantity.</p>
                      </div>
                      <div className="flex items-center gap-1 text-on-surface-variant mr-2">
                        <p className="text-label-sm font-label-sm">10:15 AM</p>
                        <span className="material-symbols-outlined text-[14px] text-primary" data-icon="done_all">done_all</span>
                      </div>
                    </div>
                  </div>
                  {/*  New Incoming Message Indicator  */}
                  <div className="flex justify-center">
                    <div className="h-[1px] bg-outline-variant flex-1 self-center"></div>
                    <span className="px-3 text-[10px] font-bold text-error uppercase tracking-wider">New Message</span>
                    <div className="h-[1px] bg-outline-variant flex-1 self-center"></div>
                  </div>
                  <div className="flex gap-md max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-surface-container-high flex-shrink-0 mt-2"></div>
                    <div className="space-y-sm">
                      <div className="bg-surface p-md rounded-xl rounded-tl-none shadow-sm border border-outline-variant">
                        <p className="text-body-md font-body-md">That sounds perfect! Could you send over a custom quote so I can process the payment today?</p>
                      </div>
                      <p className="text-label-sm font-label-sm text-on-surface-variant ml-2">Just now</p>
                    </div>
                  </div>
                </div>
                {/*  Reply Box  */}
                <div className="p-xl bg-surface border-t border-outline-variant">
                  <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-sm focus-within:ring-2 focus-within:ring-secondary/20 focus-within:border-secondary transition-all">
                    <div className="flex items-center gap-sm px-2 py-1 mb-1">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-highest transition-colors text-on-surface-variant">
                        <span className="material-symbols-outlined" data-icon="format_bold">format_bold</span>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-highest transition-colors text-on-surface-variant">
                        <span className="material-symbols-outlined" data-icon="format_italic">format_italic</span>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-highest transition-colors text-on-surface-variant">
                        <span className="material-symbols-outlined" data-icon="link">link</span>
                      </button>
                      <div className="w-[1px] h-4 bg-outline-variant mx-1"></div>
                      <button className="px-2 py-1 rounded hover:bg-surface-container-highest transition-colors text-label-sm font-label-sm text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]" data-icon="bolt">bolt</span>
                        Saved Replies
                      </button>
                    </div>
                    <textarea className="w-full bg-transparent border-none focus:ring-0 text-body-md font-body-md resize-none p-md custom-scrollbar" placeholder="Write your message here..." rows="3" style={{outline: 'none'}}></textarea>
                    <div className="flex items-center justify-between p-sm border-t border-outline-variant/30 mt-1">
                      <div className="flex items-center gap-xs">
                        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant">
                          <span className="material-symbols-outlined" data-icon="attach_file">attach_file</span>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant">
                          <span className="material-symbols-outlined" data-icon="image">image</span>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant">
                          <span className="material-symbols-outlined" data-icon="mood">mood</span>
                        </button>
                      </div>
                      <button className="bg-primary text-on-primary px-lg py-2 rounded-xl flex items-center gap-md font-label-md transition-all hover:opacity-90 active:scale-95 shadow-sm">
                        Send Message
                        <span className="material-symbols-outlined text-sm" data-icon="send">send</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-center text-[10px] text-on-surface-variant mt-md flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[12px]" data-icon="lock">lock</span>
                    Messages are secure and private between you and the customer.
                  </p>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
