import React from 'react';
import CustomerFooter from '../../components/CustomerFooter';
import CustomerNavbar from '../../components/CustomerNavbar';

export default function CheckoutPage() {
  return (
    <>
      

<div className="light" lang="en">
<div className="bg-background text-on-surface font-body-md antialiased">
{/*  TopNavBar  */}
<CustomerNavbar />
<main className="max-w-[1440px] mx-auto px-margin-desktop py-xl">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
{/*  Left Column: Checkout Process  */}
<div className="lg:col-span-8 space-y-lg">
<h1 className="text-h2 font-h2 text-on-surface mb-lg">Checkout</h1>
{/*  Stepper Progress  */}
<div className="flex items-center justify-between mb-xl relative">
<div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-highest -z-10 -translate-y-1/2"></div>
<div className="flex flex-col items-center gap-xs">
<div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-sm">1</div>
<span className="text-label-sm font-label-sm text-primary">Info</span>
</div>
<div className="flex flex-col items-center gap-xs">
<div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-sm">2</div>
<span className="text-label-sm font-label-sm text-primary">Shipping</span>
</div>
<div className="flex flex-col items-center gap-xs">
<div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold">3</div>
<span className="text-label-sm font-label-sm text-on-surface-variant">Delivery</span>
</div>
<div className="flex flex-col items-center gap-xs">
<div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold">4</div>
<span className="text-label-sm font-label-sm text-on-surface-variant">Payment</span>
</div>
</div>
{/*  Step 1 & 2 combined for flow: Information  */}
<section className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm transition-all duration-300">
<div className="flex items-center gap-md mb-xl">
<span className="material-symbols-outlined text-primary" data-icon="person">person</span>
<h2 className="text-h3 font-h3">Customer &amp; Shipping Information</h2>
</div>
<form className="grid grid-cols-1 md:grid-cols-2 gap-lg">
<div className="space-y-sm">
<label className="text-label-md font-label-md block">First Name</label>
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" placeholder="John" type="text"/>
</div>
<div className="space-y-sm">
<label className="text-label-md font-label-md block">Last Name</label>
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" placeholder="Doe" type="text"/>
</div>
<div className="md:col-span-2 space-y-sm">
<label className="text-label-md font-label-md block">Email Address</label>
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" placeholder="john.doe@example.com" type="email"/>
</div>
<div className="md:col-span-2 space-y-sm">
<label className="text-label-md font-label-md block">Street Address</label>
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" placeholder="123 Commerce Way" type="text"/>
</div>
<div className="space-y-sm">
<label className="text-label-md font-label-md block">City</label>
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" placeholder="Metropolis" type="text"/>
</div>
<div className="space-y-sm">
<label className="text-label-md font-label-md block">Postal Code</label>
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" placeholder="10001" type="text"/>
</div>
</form>
</section>
{/*  Step 3: Delivery Method  */}
<section className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm transition-all duration-300">
<div className="flex items-center gap-md mb-xl">
<span className="material-symbols-outlined text-primary" data-icon="local_shipping">local_shipping</span>
<h2 className="text-h3 font-h3">Delivery Method</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-md">
<label className="relative flex items-center p-md border-2 border-primary bg-primary-container/5 rounded-xl cursor-pointer">
<input checked="" className="hidden" name="delivery" type="radio"/>
<div className="flex-1">
<span className="block text-label-md font-label-md text-on-surface">Express Courier</span>
<span className="block text-body-sm font-body-sm text-on-surface-variant">1-2 Business Days</span>
</div>
<span className="text-label-md font-label-md font-bold text-primary">$15.00</span>
<div className="absolute -top-2 -right-2 bg-primary text-on-primary rounded-full p-1 material-symbols-outlined text-sm" style={{fontSize: '16px'}}>check</div>
</label>
<label className="relative flex items-center p-md border border-outline-variant hover:border-primary/50 transition-colors rounded-xl cursor-pointer">
<input className="hidden" name="delivery" type="radio"/>
<div className="flex-1">
<span className="block text-label-md font-label-md text-on-surface">Standard Shipping</span>
<span className="block text-body-sm font-body-sm text-on-surface-variant">4-7 Business Days</span>
</div>
<span className="text-label-md font-label-md font-bold text-on-surface-variant">Free</span>
</label>
</div>
</section>
{/*  Step 4: Payment Options  */}
<section className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm transition-all duration-300">
<div className="flex items-center gap-md mb-xl">
<span className="material-symbols-outlined text-primary" data-icon="payments">payments</span>
<h2 className="text-h3 font-h3">Payment Method</h2>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
<button className="payment-btn active flex flex-col items-center gap-sm p-md border-2 border-primary bg-primary-container/5 rounded-xl transition-all" onclick="selectPayment(this)">
<span className="material-symbols-outlined text-primary" data-icon="credit_card">credit_card</span>
<span className="text-label-sm font-label-sm">Card</span>
</button>
<button className="payment-btn flex flex-col items-center gap-sm p-md border border-outline-variant hover:bg-surface-container rounded-xl transition-all" onclick="selectPayment(this)">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="smartphone">smartphone</span>
<span className="text-label-sm font-label-sm">Mobile Money</span>
</button>
<button className="payment-btn flex flex-col items-center gap-sm p-md border border-outline-variant hover:bg-surface-container rounded-xl transition-all" onclick="selectPayment(this)">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="account_balance">account_balance</span>
<span className="text-label-sm font-label-sm">Transfer</span>
</button>
<button className="payment-btn flex flex-col items-center gap-sm p-md border border-outline-variant hover:bg-surface-container rounded-xl transition-all" onclick="selectPayment(this)">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="payments">payments</span>
<span className="text-label-sm font-label-sm">COD</span>
</button>
</div>
{/*  Card Details (Active by default)  */}
<div className="space-y-lg animate-in fade-in duration-500" id="card-details">
<div className="space-y-sm">
<label className="text-label-md font-label-md block">Card Number</label>
<div className="relative">
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 pl-12 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" placeholder="0000 0000 0000 0000" type="text"/>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" data-icon="credit_card">credit_card</span>
</div>
</div>
<div className="grid grid-cols-2 gap-lg">
<div className="space-y-sm">
<label className="text-label-md font-label-md block">Expiry Date</label>
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" placeholder="MM / YY" type="text"/>
</div>
<div className="space-y-sm">
<label className="text-label-md font-label-md block">CVV</label>
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" placeholder="123" type="text"/>
</div>
</div>
</div>
</section>
</div>
{/*  Right Column: Sidebar Order Summary  */}
<aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-lg">
<div className="bg-surface-container-high p-xl rounded-xl border border-outline-variant shadow-sm">
<h3 className="text-h3 font-h3 mb-xl">Order Summary</h3>
<div className="space-y-md mb-xl">
{/*  Product Item  */}
<div className="flex gap-md group">
<div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-highest">
<img alt="Product 1" className="w-full h-full object-cover transition-transform group-hover:scale-110" data-alt="A pair of vibrant red professional athletic running shoes placed on a minimalist, brightly lit white podium. The composition is clean and modern, following a corporate design aesthetic with high-key lighting. The background is a soft, neutral gray that emphasizes the sleek, aerodynamic contours of the premium footwear." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOaBgK485X3kEdYkCp2LbOtjCO-jSFN7flYAzr9yz_VOJ51DmuPOB_NBgirpZp6gw_FLKWvfWTfW6YdjtVExNGdJQQ7-n6z8XBG1L-xrqNNIlFONSEj_XE8y0sSDt6aMRGE4Mm44GZ25BxeEaG1S2ckmg69cVWIqWR5qnJuSDgRZe6-WgfVhSToJQw9Sl7L1R38ta-26XhuJYMtv8MpmWDdScBtdp42LNI-aRLmsQjRKCJVi8ZdlmSwOpPmYakkn6qAd3aX2-lhsex"/>
<span className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-bold px-1.5 rounded-bl-lg">x1</span>
</div>
<div className="flex-1 flex flex-col justify-center">
<h4 className="text-label-md font-label-md text-on-surface line-clamp-1">Ethi-Runner Pro V2</h4>
<p className="text-body-sm font-body-sm text-on-surface-variant">Size: 42 | Red</p>
<span className="text-label-md font-label-md text-primary mt-1">$125.00</span>
</div>
</div>
{/*  Product Item  */}
<div className="flex gap-md group">
<div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-highest">
<img alt="Product 2" className="w-full h-full object-cover transition-transform group-hover:scale-110" data-alt="A luxury minimalist wristwatch with a pristine white face and a light tan leather strap, resting on a clean textured surface. The scene is illuminated by soft, natural morning light coming from the side, creating a gentle and sophisticated atmosphere. The color palette is composed of soft whites, warm beiges, and polished metallic silver accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBevbkHReRoVizNzIS9xAXkSqNi_NILzyHyr8ODvT2Ct3y8Xbm-ckLNBZ-HsjuCUoq0ZmwEYAN0p1N9i6TwzmqicBmCdvs8ttfGgXz_X5ihd5Px0JJ1SqaqC_QSmOtcQOxyzTDoC_aBcQ8qsxOCwXgyV1qKgxTaBXG6Jdb88MYxbTlyWV3GNDRd3ceTPrQFc75PoXFzEhr-NydRND5xHXxROQA5Kgdqb5BzGKsDL6cA5JgCmL9I7_mnjeti-ubW_HD42XN4aGbS_dzP"/>
<span className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-bold px-1.5 rounded-bl-lg">x1</span>
</div>
<div className="flex-1 flex flex-col justify-center">
<h4 className="text-label-md font-label-md text-on-surface line-clamp-1">Zenith Minimalist Watch</h4>
<p className="text-body-sm font-body-sm text-on-surface-variant">Leather Strap</p>
<span className="text-label-md font-label-md text-primary mt-1">$89.00</span>
</div>
</div>
</div>
<div className="border-t border-outline-variant pt-lg space-y-md">
<div className="flex justify-between text-body-md font-body-md">
<span className="text-on-surface-variant">Subtotal</span>
<span className="text-on-surface font-bold">$214.00</span>
</div>
<div className="flex justify-between text-body-md font-body-md">
<span className="text-on-surface-variant">Shipping</span>
<span className="text-on-surface font-bold">$15.00</span>
</div>
<div className="flex justify-between text-body-md font-body-md">
<span className="text-on-surface-variant">Estimated Tax</span>
<span className="text-on-surface font-bold">$12.50</span>
</div>
<div className="flex justify-between border-t border-outline-variant pt-md">
<span className="text-h4 font-h4 text-on-surface">Total</span>
<span className="text-h4 font-h4 text-primary">$241.50</span>
</div>
</div>
<button className="w-full mt-xl bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-md">
                        Place Order
                        <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</button>
<p className="text-center text-label-sm font-label-sm text-on-surface-variant mt-md flex items-center justify-center gap-xs">
<span className="material-symbols-outlined text-sm" data-icon="lock" style={{fontSize: '14px'}}>lock</span>
                        Secure SSL Encrypted Checkout
                    </p>
</div>
{/*  Trust Badges  */}
<div className="flex items-center justify-center gap-lg py-md grayscale opacity-50">
<span className="material-symbols-outlined" data-icon="verified_user" style={{fontSize: '32px'}}>verified_user</span>
<span className="material-symbols-outlined" data-icon="local_shipping" style={{fontSize: '32px'}}>local_shipping</span>
<span className="material-symbols-outlined" data-icon="replay" style={{fontSize: '32px'}}>replay</span>
</div>
</aside>
</div>
</main>
{/*  Footer  */}
<CustomerFooter />

</div></div>
    </>
  );
}
