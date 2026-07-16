import React from 'react';
import CustomerFooter from '../../components/CustomerFooter';
import CustomerNavbar from '../../components/CustomerNavbar';

export default function CartPage() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-background text-on-surface">
{/*  Top Navigation Bar  */}
<CustomerNavbar />
<main className="max-w-[1440px] mx-auto px-margin-desktop py-xl">
<h1 className="text-h2 font-h2 mb-xl">Your Shopping Cart</h1>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
{/*  Items List Container  */}
<div className="lg:col-span-8 flex flex-col gap-md">
{/*  Cart Item 1  */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col sm:flex-row gap-md shadow-[0px_4px_12px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-0.5">
<div className="w-full sm:w-32 h-32 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
<img alt="Minimalist Watch" className="w-full h-full object-cover" data-alt="A premium minimalist white ceramic analog wristwatch with a tan leather strap, displayed against a clean light grey backdrop. The lighting is soft and directional, highlighting the smooth textures and elegant design. The overall aesthetic is high-end, modern, and professional, perfectly suited for an ethical marketplace gallery." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3zB8MLEUd_lZkcLrXfUvumQ5PfMayylIzl91TnfksSTay8Inir6hgWjvYAzSMqi4IWYeA18IyfeqpWLnrnQpdAMLOgIC04Gw5_WV-E2SV0j5ZJWLVx7J0LIiDdKYIdJVlz2VXj0iYPGgBIkhZrk32fvmkmrgCf6X7NW0q8Rmpeuo8TI4fT9A4pRkofz17n9TS0iQX3UMnSr7AoC7TU-Tkq5U169XByl-hkDjOmdfcYQ-bYPaK2pZ4b-jo85L_Yt6JneooOoInlMpt"/>
</div>
<div className="flex-grow flex flex-col justify-between">
<div>
<div className="flex justify-between items-start">
<div>
<h3 className="text-h4 font-h4 text-on-surface">Minimalist Analog Watch</h3>
<p className="text-body-sm font-body-sm text-on-surface-variant">Sold by <span className="text-secondary font-medium">Timeless Crafts</span></p>
</div>
<button className="text-on-surface-variant hover:text-error transition-colors p-1" title="Remove item">
<span className="material-symbols-outlined" data-icon="delete">delete</span>
</button>
</div>
</div>
<div className="flex items-center justify-between mt-md">
<div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-low">
<button className="px-3 py-1 hover:bg-surface-container-high transition-colors" onclick="this.nextElementSibling.innerText = Math.max(1, parseInt(this.nextElementSibling.innerText) - 1)">-</button>
<span className="px-4 py-1 text-label-md font-label-md min-w-[40px] text-center">1</span>
<button className="px-3 py-1 hover:bg-surface-container-high transition-colors" onclick="this.previousElementSibling.innerText = parseInt(this.previousElementSibling.innerText) + 1">+</button>
</div>
<span className="text-h4 font-h4 text-primary">$120.00</span>
</div>
</div>
</div>
{/*  Cart Item 2  */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col sm:flex-row gap-md shadow-[0px_4px_12px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-0.5">
<div className="w-full sm:w-32 h-32 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
<img alt="Artisan Candle" className="w-full h-full object-cover" data-alt="An artisanal hand-poured soy wax candle in a dark amber glass jar with a minimalist cream label. The candle is set on a dark wood surface with a warm, cozy glow coming from a nearby fireplace. The image creates a sense of comfort, luxury, and reliable craftsmanship, using a sophisticated color palette of deep oranges and earthy browns." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEvOySy72ozj0JVHSVu8rluecZtsbYCClZZLPJDyqN6yhGlmJmn0oiA1PtBDKzWy67lUYuB8ttw1gLfF_regcww47schVuWBkk8WybNnKwqssvPQx8AV9oXSICa_38HftE8PpFClo3C4JHejx5ksUzFJSAPmX866Dm5Qn3viPmUL5NdrPWhY5Z7vtzsBHPNwFZ97YrFtEmzodsMgAveLxG6zWcQRpo7AWW14xCypqO05b17Wq7vzDLvdFuGlU83rx9pIxSVO2i8-AN"/>
</div>
<div className="flex-grow flex flex-col justify-between">
<div>
<div className="flex justify-between items-start">
<div>
<h3 className="text-h4 font-h4 text-on-surface">Hand-Poured Soy Candle</h3>
<p className="text-body-sm font-body-sm text-on-surface-variant">Sold by <span className="text-secondary font-medium">Earthly Scents</span></p>
</div>
<button className="text-on-surface-variant hover:text-error transition-colors p-1" title="Remove item">
<span className="material-symbols-outlined" data-icon="delete">delete</span>
</button>
</div>
</div>
<div className="flex items-center justify-between mt-md">
<div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-low">
<button className="px-3 py-1 hover:bg-surface-container-high transition-colors" onclick="this.nextElementSibling.innerText = Math.max(1, parseInt(this.nextElementSibling.innerText) - 1)">-</button>
<span className="px-4 py-1 text-label-md font-label-md min-w-[40px] text-center">2</span>
<button className="px-3 py-1 hover:bg-surface-container-high transition-colors" onclick="this.previousElementSibling.innerText = parseInt(this.previousElementSibling.innerText) + 1">+</button>
</div>
<span className="text-h4 font-h4 text-primary">$45.00</span>
</div>
</div>
</div>
{/*  Action Links  */}
<div className="mt-md">
<a className="inline-flex items-center gap-xs text-primary font-label-md text-label-md hover:underline decoration-primary transition-all" href="#">
<span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
                        Continue Shopping
                    </a>
</div>
</div>
{/*  Order Summary Sidebar  */}
<aside className="lg:col-span-4 sticky top-24">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-[0px_8px_24px_rgba(0,0,0,0.12)]">
<h2 className="text-h3 font-h3 mb-lg text-on-surface">Order Summary</h2>
<div className="flex flex-col gap-md border-b border-outline-variant pb-lg mb-lg">
<div className="flex justify-between text-body-md font-body-md text-on-surface-variant">
<span>Subtotal</span>
<span>$165.00</span>
</div>
<div className="flex justify-between text-body-md font-body-md text-on-surface-variant">
<span>Delivery</span>
<span className="text-primary font-medium">Free</span>
</div>
<div className="flex justify-between text-body-md font-body-md text-on-surface-variant">
<span>Tax</span>
<span>$13.20</span>
</div>
</div>
<div className="flex justify-between items-center mb-xl">
<span className="text-h4 font-h4 text-on-surface">Total</span>
<span className="text-h2 font-h2 text-primary">$178.20</span>
</div>
<button className="w-full bg-primary text-on-primary py-4 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-sm">
                        Proceed to Checkout
                        <span className="material-symbols-outlined" data-icon="shopping_bag" style={{fontVariationSettings: "'FILL' 1"}}>shopping_bag</span>
</button>
<div className="mt-lg flex items-center gap-sm p-sm bg-surface-container-low rounded-lg">
<span className="material-symbols-outlined text-secondary" data-icon="verified_user">verified_user</span>
<p className="text-label-sm font-label-sm text-on-surface-variant">Secure Checkout with Ethizone Protection</p>
</div>
</div>
{/*  Promo Code  */}
<div className="mt-md bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
<label className="block text-label-md font-label-md text-on-surface mb-sm">Have a promo code?</label>
<div className="flex gap-sm">
<input className="flex-grow bg-background border border-outline-variant rounded-lg px-md py-2 text-body-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none" placeholder="CODE10" type="text"/>
<button className="px-md py-2 text-secondary font-label-md text-label-md hover:bg-secondary/5 rounded-lg transition-colors">Apply</button>
</div>
</div>
</aside>
</div>
</main>
{/*  Footer  */}
<CustomerFooter />
{/*  Micro-interaction for quantity buttons  */}

</div></div>
    </>
  );
}


