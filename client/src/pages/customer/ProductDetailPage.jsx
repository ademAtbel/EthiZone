import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";

const PRODUCT_NAME = "Artisan Textured Ceramic Vase"; // matches what we submit

export default function ProductDetailPage() {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratingStep, setRatingStep] = useState(1);
  const [ratingForm, setRatingForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Ethiopia",
    rating: 0,
    review: "",
  });
  const [verificationMethod, setVerificationMethod] = useState("email");
  const [verificationCode, setVerificationCode] = useState("");

  // Real reviews from DB
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const fetchReviews = () => {
    setReviewsLoading(true);
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        // Filter to reviews for this product
        const filtered = Array.isArray(data)
          ? data.filter((r) => r.productName === PRODUCT_NAME)
          : [];
        setReviews(filtered);
        setReviewsLoading(false);
      })
      .catch(() => setReviewsLoading(false));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleRatingClick = (star) => {
    setRatingForm({ ...ratingForm, rating: star });
  };

  const handleCloseModal = () => {
    setIsRatingModalOpen(false);
    setTimeout(() => {
      setRatingStep(1);
      setRatingForm({
        name: "",
        email: "",
        phone: "",
        country: "Ethiopia",
        rating: 0,
        review: "",
      });
      setVerificationMethod("email");
      setVerificationCode("");
    }, 300);
  };

  const handleVerifyAndPublish = async () => {
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: PRODUCT_NAME,
          name: ratingForm.name,
          email: ratingForm.email,
          phone: ratingForm.phone,
          country: ratingForm.country,
          rating: ratingForm.rating,
          review: ratingForm.review,
        }),
      });

      if (response.ok) {
        setRatingStep(4);
        fetchReviews(); // refresh reviews list from DB
      } else {
        const err = await response.json();
        alert(err.error || "Failed to submit review.");
      }
    } catch (e) {
      console.error(e);
      setRatingStep(4);
    }
  };

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on-background font-body-md antialiased">
          {/*  TopNavBar  */}
          <CustomerNavbar />

          {/* Sub Navbar (Breadcrumbs) */}
          <div className="w-full bg-surface-container-lowest border-b border-outline-variant py-sm">
            <div className="max-w-[1440px] mx-auto px-margin-desktop">
              <nav className="flex flex-wrap items-center gap-sm text-label-sm font-label-sm text-on-surface-variant">
                <Link className="hover:text-primary" to="/home">
                  Home
                </Link>
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
                <Link className="hover:text-primary" to="/marketplace">
                  Marketplace
                </Link>
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
                <Link
                  className="hover:text-primary"
                  to="/marketplace?category=Home Decor"
                >
                  Home Decor
                </Link>
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
                <span className="text-on-surface">Artisan Ceramic Vase</span>
              </nav>
            </div>
          </div>

          <main className="max-w-[1440px] mx-auto px-margin-desktop py-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-xxl">
              {/*  Image Gallery (Bento-ish Layout)  */}
              <div className="lg:col-span-7 space-y-md">
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-surface-container shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="A high-end, minimalist ceramic vase with a textured matte finish sitting on a clean marble pedestal. The lighting is soft and directional, casting gentle shadows that highlight the artisanal craftsmanship. The color palette is composed of warm earth tones, soft greens, and cream whites, reflecting a professional and reliable boutique atmosphere."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_vOGH8yi-vnR-R6o3b1lb7wh6H82C08y3l3FZwsoNBhgo4VObBowTpf77dWOSy5v26UhoHkCCi61h2r0dyqzGYiYr6a3XzOjGefTxvyRzFXqRpYirGg-4AuzgeNtC-hpT3rzw5H3yqmwMpGZmPXuDqM6fe-EyZRRo5OL7PuGvm9d0wY9sFFor7VZvrndVCK87zkRUPrJ84k5Suip1TgB6Nko5pF9DnHXCMBUU-p09G4l55ecIeMG_n-gan2fwWxrJu_BylNcEMHsW"
                  />
                </div>
                <div className="grid grid-cols-4 gap-md">
                  <div className="aspect-square rounded-lg overflow-hidden border-2 border-primary cursor-pointer">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="A close-up shot of an artisan ceramic vase showing intricate textured patterns. The photography is professional with a shallow depth of field, emphasizing the tactile quality of the piece against a clean, neutral background."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxSM2XNuyacC-vgLv1DG9P-03bMhtwaJAoigkZqeuH1oUCLc7TAqEf3y7P6EwwA56NIYQlKvnQqdT_h6uslejvbb-ZyYQqoKqX1ECxa7id7wkojJ7ael5bVvuLo-Rh63NLcvokcvIo2MHzwSivWwyc9aFXClkP4lUhmA7tBFr7_PDNm3_Dl0m5SbSNXNc6iX6zjuzAUeXQAo__n3Y3IPWNiTCdK4lBviQDCBDck3iMGKLVruaX9km4MHsy9aPzEQi_54mYbinfqpuc"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden border border-outline-variant hover:border-primary cursor-pointer transition-all">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="The artisan ceramic vase presented in a lifestyle setting on a wooden sideboard next to a linen-bound book. Natural sunlight filters through a nearby window, creating a serene and trustworthy domestic atmosphere."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDHjBHSmtvtvLsd3lvKoPOeWKEy0V5AadJyxDZoULhnEE9VT9oCSB3v9adQATQLd8Gq4zrHbA820k79rGnliM3Hy3sBMBY5KxVrVRGTBlbvwDjahS1Z4W4CPFP5_E0Ey2d0ge7JVmd5vbrS_zkBtshQyjcvuO08sir97zmAhdP1eKsudwBRPymiWjrE6pflIaOSC3SnSds2U20xJ4RnfJTkKJJIJYJwaKdotTiZmrmezfRFXwN7eeZncgVoOrjegtTVMb6Svpl_vVP"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden border border-outline-variant hover:border-primary cursor-pointer transition-all">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="A top-down view of a handcrafted ceramic vessel, highlighting its organic circular form and subtle glaze variations. The image is bright and airy, following a modern light-mode aesthetic with high-key lighting."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1HLi7DelTUARqiBagMfCEFRReOkuUGgKTytF4Acwg9T1n-QGQo2APuGvwrMhmwJCd25LrlXkDSmtqHaITHUjcuZnb4KTEYUbHyZHKeVDzjg-KNppNa-u8B1-b1TSL2XBO1UMnDIMKM9b0iE8L5zEBmy6lLRnAdZXOl3Zmm0jEzPl06vyhIbPkNhYcHEUni0VRfLI7TdH9HdU2SS_MQUR6xgQABCxvxl2grbW4of4jq8H4yBfCEgbTXugpM0ybuzpQ11KUBT5V9QK1"
                    />
                  </div>
                  <div className="relative aspect-square rounded-lg overflow-hidden border border-outline-variant group cursor-pointer">
                    <img
                      className="w-full h-full object-cover blur-[2px]"
                      data-alt="A collection of artisan ceramics displayed on a minimalist gallery shelf. The scene is professionally staged with ample white space, showcasing a clean and modern retail environment."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6nCvelOkIrX5mDSW29RzzOS54m6b8WbZCQ-XYpOAAs_t3B80QvnyVxZktk-ZcAgHHst0Iwvdman0jUeZuZi6NMoT0MyD9klL6hHYdFzewZ0rBCc5hgmU0rmDIgPvtoy0GHikfMQHN_WoLtkR_DzaGZQpuxJmsFXfhIGqT8kKU--AK6X2_MmjFMoWWN5VczZs9AVnvC8yvsv9kVtU6m-5TitUIB-k3g2BPGnniel1XjjVjF6BYtKG-0oAve8dipkCXhWA8WFNYb9Bw"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-label-md">
                      +4 More
                    </div>
                  </div>
                </div>
              </div>
              {/*  Product Info  */}
              <div className="lg:col-span-5 space-y-xl">
                <div className="space-y-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-label-sm font-label-sm text-primary bg-primary-container/10 px-3 py-1 rounded-full">
                      Home Decor
                    </span>
                    <div className="flex items-center gap-xs">
                      <span
                        className="material-symbols-outlined text-yellow-500"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-label-md font-label-md">4.9</span>
                      <span className="text-on-surface-variant text-label-sm font-label-sm">
                        (124 reviews)
                      </span>
                      <button
                        onClick={() => setIsRatingModalOpen(true)}
                        className="ml-md bg-secondary text-on-secondary px-2 py-1 rounded text-label-sm font-label-sm hover:opacity-90 active:scale-95 transition-all"
                      >
                        Write a Review
                      </button>
                    </div>
                  </div>
                  <h1 className="text-h2 font-h2 text-on-surface">
                    Artisan Textured Ceramic Vase
                  </h1>
                  <Link
                    to="/storedetail?id=artisan-collective"
                    className="flex items-center gap-sm hover:opacity-80 transition-opacity"
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-secondary-container text-sm">
                        store
                      </span>
                    </div>
                    <span className="text-body-md font-label-md text-secondary">
                      Clay &amp; Co. Studio
                    </span>
                    <span className="text-on-surface-variant text-body-sm">
                      • Verified Seller
                    </span>
                  </Link>
                </div>
                <div className="p-lg bg-surface-container-low rounded-xl border border-outline-variant shadow-sm">
                  <div className="flex items-end gap-sm mb-lg">
                    <span className="text-h1 font-h1 text-on-surface">
                      $89.00
                    </span>
                    <span className="text-body-lg text-on-surface-variant line-through mb-1">
                      $120.00
                    </span>
                    <span className="text-error font-label-md mb-1.5 bg-error-container px-2 py-0.5 rounded">
                      25% OFF
                    </span>
                  </div>
                  <div className="space-y-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-label-md font-label-md">
                        Quantity
                      </span>
                      <div className="flex items-center border border-outline rounded-lg overflow-hidden">
                        <button className="px-3 py-1 hover:bg-surface-container-high transition-colors">
                          <span className="material-symbols-outlined text-sm">
                            remove
                          </span>
                        </button>
                        <span className="px-4 py-1 font-label-md border-x border-outline">
                          1
                        </span>
                        <button className="px-3 py-1 hover:bg-surface-container-high transition-colors">
                          <span className="material-symbols-outlined text-sm">
                            add
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-sm">
                      <span className="material-symbols-outlined text-[16px]">
                        inventory_2
                      </span>
                      8 units left in stock
                    </div>
                    <div className="grid grid-cols-2 gap-md">
                      <a
                        href="tel:+251911234567"
                        className="flex items-center justify-center gap-sm bg-primary text-on-primary py-4 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all shadow-sm"
                      >
                        <span className="material-symbols-outlined">call</span>
                        Call Seller
                      </a>
                      <a
                        href="sms:+251911234567"
                        className="flex items-center justify-center gap-sm bg-secondary text-on-secondary py-4 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all"
                      >
                        <span className="material-symbols-outlined">sms</span>
                        Text Seller
                      </a>
                    </div>
                    <button className="w-full flex items-center justify-center gap-sm border-2 border-outline-variant py-3 rounded-lg font-label-md text-on-surface hover:bg-surface-container-high transition-all">
                      <span className="material-symbols-outlined">chat</span>
                      Chat with Seller
                    </button>
                  </div>
                </div>
                {/*  Features/Badges  */}
                <div className="grid grid-cols-2 gap-lg">
                  <div className="flex items-center gap-md">
                    <span className="material-symbols-outlined text-primary text-xl">
                      local_shipping
                    </span>
                    <div>
                      <p className="text-label-md font-label-md">
                        Free Shipping
                      </p>
                      <p className="text-body-sm text-on-surface-variant">
                        On orders over $150
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-md">
                    <span className="material-symbols-outlined text-primary text-xl">
                      security
                    </span>
                    <div>
                      <p className="text-label-md font-label-md">
                        Secure Payments
                      </p>
                      <p className="text-body-sm text-on-surface-variant">
                        SSL encrypted
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  Detailed Tabs  */}
            <section className="mt-xxl border-t border-outline-variant pt-xxl">
              <div className="flex gap-xl border-b border-outline-variant mb-xl overflow-x-auto hide-scrollbar">
                <button className="pb-md text-label-md font-label-md tab-active whitespace-nowrap px-2">
                  Description
                </button>
                <button className="pb-md text-label-md font-label-md text-on-surface-variant hover:text-primary whitespace-nowrap px-2">
                  Specifications
                </button>
                <button className="pb-md text-label-md font-label-md text-on-surface-variant hover:text-primary whitespace-nowrap px-2">
                  Seller Info
                </button>
                <button className="pb-md text-label-md font-label-md text-on-surface-variant hover:text-primary whitespace-nowrap px-2">
                  Reviews (124)
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
                <div className="lg:col-span-8">
                  <h3 className="text-h3 font-h3 mb-md">Product Description</h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed mb-lg">
                    Elevate your living space with our Artisan Textured Ceramic
                    Vase. Each piece is meticulously handcrafted by master
                    potters at Clay &amp; Co. Studio, ensuring that no two vases
                    are exactly alike. The unique tactile surface is achieved
                    through a proprietary firing technique that creates a
                    sophisticated organic finish.
                  </p>
                  <ul className="space-y-sm list-disc pl-md text-body-md text-on-surface-variant">
                    <li>Hand-thrown clay construction</li>
                    <li>Lead-free, eco-friendly matte glaze</li>
                    <li>Watertight interior for fresh flower arrangements</li>
                    <li>Non-slip protective pads on the base</li>
                    <li>Ethically sourced materials from local mines</li>
                  </ul>
                </div>
                <div className="lg:col-span-4 bg-surface-container rounded-xl p-lg">
                  <h4 className="text-h4 font-h4 mb-md">Quick Specs</h4>
                  <div className="space-y-sm">
                    <div className="flex justify-between border-b border-outline-variant pb-xs">
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Material
                      </span>
                      <span className="text-label-sm font-label-sm">
                        Premium Stoneware
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-outline-variant pb-xs">
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Height
                      </span>
                      <span className="text-label-sm font-label-sm">24 cm</span>
                    </div>
                    <div className="flex justify-between border-b border-outline-variant pb-xs">
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Weight
                      </span>
                      <span className="text-label-sm font-label-sm">
                        1.2 kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Origin
                      </span>
                      <span className="text-label-sm font-label-sm">
                        Handmade in UK
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/*  Related Products  */}
            <section className="mt-xxl">
              <div className="flex items-center justify-between mb-xl">
                <h3 className="text-h3 font-h3">Related Products</h3>
                <a
                  className="text-primary font-label-md flex items-center gap-xs"
                  href="#"
                >
                  View all{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-md md:gap-lg">
                {/*  Card 1  */}
                <div className="group bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      data-alt="A minimal white ceramic bowl with a unique scalloped edge, photographed in a bright studio with soft shadows. The image is clean and high-fidelity, representing a modern e-commerce product aesthetic."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlWNV9s4jyQUhJNUD_CNjmjaQhjHKDrFEGn7GXv_P-QNjN_lAwm1ZfcHqNhipU3pqBCtb3B1cB1xH5wVNSeKw5iguirEQAKQxXlqfCYFioOhP4D319ooGaoagl_XCideiN5L0vfu4k65FaW9oFllUOYJNgr2Z3rq5XlriLRuAOkkUaIK6gomPlGmeJXsYsUL4l7CsDHiHpM_YYJrDUxntE6dlQRtXVUUz9-_CErhZZbSa5B2G-hAGES4jPVCLtyagyo-4QrDhEmO8r"
                    />
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-surface-container-lowest/80 text-on-surface-variant hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="p-md">
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      Ceramics
                    </p>
                    <h4 className="text-body-md font-label-md truncate mt-1">
                      Minimalist Fruit Bowl
                    </h4>
                    <p className="text-h4 font-h4 mt-2 text-primary">$45.00</p>
                  </div>
                </div>
                {/*  Card 2  */}
                <div className="group bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      data-alt="A set of handcrafted terra cotta planters with modern geometric etchings. The background is a soft-focus garden setting, conveying reliability and high-quality artisan work in an e-commerce context."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCspf92jc1gMID9iL8O0B2lDxclLHwPyZjwYcA-Z9ylBmOG1LuKgoi-KhnOnV_CtvOSe9bdruTgQxlF-EdC0LhXctnzyAMsmHYI4cUfo1OOzv2sdctc07jp-uhjbUq3Tq_pbY6K26CyISPxwUaO-NopuY5wHFJUg8i08DIvXCiRqynDkbD52poWLarn1JEKWnipeNsUgn0kfyXNR-_4tgsbag_BdPvpqiVPJJ_qVppv11LHga2-TVusAoCHZhR30Iev-TwdrFLnuMr"
                    />
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-surface-container-lowest/80 text-on-surface-variant hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="p-md">
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      Planters
                    </p>
                    <h4 className="text-body-md font-label-md truncate mt-1">
                      Terra Cotta Pot Set
                    </h4>
                    <p className="text-h4 font-h4 mt-2 text-primary">$62.00</p>
                  </div>
                </div>
                {/*  Card 3  */}
                <div className="group bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      data-alt="A group of sleek modern candles in dark glass containers on a polished stone surface. The lighting is low and moody, highlighting the premium quality and professional branding of the lifestyle product."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzxerpCruNljdivqkFWjmsmARELB2QrcJlSGlI9Hzj5AfaPouQgvx4DDsrXGVO-VXGscpwaERWkuy96EnBGC53bjL9Nlcl5p_NgLdhzsIDx4AoBqez2La_La0LsFbhySUc4_-vfaJRF18Q_ZwrWtXU9YU1dbrrHnCl307IHM9cymWtVSZjd0WBrMmm2fhkYiZnMWCTEcYiACGi5YIz4opx4qexpFrtmthpbFd4a7IrF2ZRKA1sa4OfWPvsn8y-i-H37MAR6Bsw48nB"
                    />
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-surface-container-lowest/80 text-on-surface-variant hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="p-md">
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      Lifestyle
                    </p>
                    <h4 className="text-body-md font-label-md truncate mt-1">
                      Midnight Scented Candle
                    </h4>
                    <p className="text-h4 font-h4 mt-2 text-primary">$28.00</p>
                  </div>
                </div>
                {/*  Card 4  */}
                <div className="group bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      data-alt="Sophisticated artisanal glassware including a carafe and glasses with a subtle blue tint. The items are arranged on a minimalist dining table with soft daylight illuminating the clear, high-end design."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSNTTgxWRzA7PGcMZbQg691zUm6aom39eoIDKJGq3J1azMsmWpZyXUjB4Oz4c_tuiIPhJ1EVPOjFTBcT8GZhhaoLncACm9sDMgB7ozi2k05UEZQOqYUsI4F9DTcxE7cg1G6HboLzrYXplf0zw8hkFPQNBqCjhAQ_LN0jquwv5ExuOErNfg-7DHBKfw4BkgtTgibaDkb9HbI5SGte90DL68WMCHXaei2spq1PCouYntzlZIHTIX_C_XEnPvwg_9Gw0AJiBzMcJjHrzu"
                    />
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-surface-container-lowest/80 text-on-surface-variant hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="p-md">
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      Dining
                    </p>
                    <h4 className="text-body-md font-label-md truncate mt-1">
                      Hand-blown Glass Carafe
                    </h4>
                    <p className="text-h4 font-h4 mt-2 text-primary">$55.00</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
          {/*  Footer  */}
          <CustomerFooter />

          {/* Rating & Verification Modal */}
          {isRatingModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-margin-mobile">
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleCloseModal}
              ></div>
              <div className="relative bg-surface-bright w-full max-w-lg rounded-xl shadow-2xl overflow-hidden p-xl">
                {/* Step 1: Initial Form */}
                {ratingStep === 1 && (
                  <div className="flex flex-col space-y-md">
                    <h3 className="text-h3 font-h3 text-on-surface text-center">
                      Rate this Product
                    </h3>
                    <div className="flex justify-center gap-xs text-3xl text-outline mb-md cursor-pointer">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`material-symbols-outlined ${ratingForm.rating >= star ? "text-yellow-500" : ""}`}
                          style={{
                            fontVariationSettings: `'FILL' ${ratingForm.rating >= star ? 1 : 0}`,
                          }}
                          onClick={() => handleRatingClick(star)}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <div className="space-y-sm">
                      <div>
                        <label className="text-label-sm font-label-sm text-on-surface-variant mb-1 block">
                          Full Name
                        </label>
                        <input
                          className="w-full px-4 py-3 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none"
                          placeholder="John Doe"
                          type="text"
                          value={ratingForm.name}
                          onChange={(e) =>
                            setRatingForm({
                              ...ratingForm,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-md">
                        <div>
                          <label className="text-label-sm font-label-sm text-on-surface-variant mb-1 block">
                            Country
                          </label>
                          <select
                            className="w-full px-4 py-3 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none bg-surface"
                            value={ratingForm.country}
                            onChange={(e) => {
                              const val = e.target.value;
                              setRatingForm({ ...ratingForm, country: val });
                              if (val === "Ethiopia") {
                                setVerificationMethod("email");
                              } else {
                                setVerificationMethod("sms");
                              }
                            }}
                          >
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="Kenya">Kenya</option>
                            <option value="Germany">Germany</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-label-sm font-label-sm text-on-surface-variant mb-1 block">
                            Phone Number
                          </label>
                          <input
                            className="w-full px-4 py-3 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none"
                            placeholder="+251 911 234 567"
                            type="tel"
                            value={ratingForm.phone}
                            onChange={(e) =>
                              setRatingForm({
                                ...ratingForm,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-label-sm font-label-sm text-on-surface-variant mb-1 block">
                          Email
                        </label>
                        <input
                          className="w-full px-4 py-3 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none"
                          placeholder="john@example.com"
                          type="email"
                          value={ratingForm.email}
                          onChange={(e) =>
                            setRatingForm({
                              ...ratingForm,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-label-sm font-label-sm text-on-surface-variant mb-1 block">
                          Review (Optional)
                        </label>
                        <textarea
                          className="w-full px-4 py-3 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none"
                          rows="3"
                          placeholder="Tell us what you think..."
                          value={ratingForm.review}
                          onChange={(e) =>
                            setRatingForm({
                              ...ratingForm,
                              review: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                    </div>
                    <button
                      className="w-full bg-primary text-on-primary py-4 rounded-lg font-label-md hover:opacity-90 transition-all disabled:opacity-50 mt-md"
                      disabled={
                        !ratingForm.name ||
                        !ratingForm.email ||
                        !ratingForm.phone ||
                        ratingForm.rating === 0
                      }
                      onClick={() => setRatingStep(2)}
                    >
                      Submit Review
                    </button>
                  </div>
                )}

                {/* Step 2: Verification Method */}
                {ratingStep === 2 && (
                  <div className="flex flex-col items-center text-center space-y-md">
                    <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-md">
                      <span className="material-symbols-outlined text-on-secondary-container text-4xl">
                        security
                      </span>
                    </div>
                    <h3 className="text-h3 font-h3 text-on-surface">
                      Verification Required
                    </h3>
                    <p className="text-body-md text-on-surface-variant">
                      To verify your review, we need to send you a 4-digit code.
                      How would you like to receive it?
                    </p>
                    <div className="w-full grid grid-cols-2 gap-sm py-md">
                      {ratingForm.country !== "Ethiopia" ? (
                        <>
                          <button
                            className={`p-lg border rounded-xl flex flex-col items-center gap-sm transition-all ${verificationMethod === "sms" ? "border-primary bg-primary/5" : "border-outline hover:border-primary/50"}`}
                            onClick={() => setVerificationMethod("sms")}
                          >
                            <span className="material-symbols-outlined text-2xl">
                              sms
                            </span>
                            <span className="font-label-md">SMS Text</span>
                          </button>
                          <button
                            className={`p-lg border rounded-xl flex flex-col items-center gap-sm transition-all ${verificationMethod === "email" ? "border-primary bg-primary/5" : "border-outline hover:border-primary/50"}`}
                            onClick={() => setVerificationMethod("email")}
                          >
                            <span className="material-symbols-outlined text-2xl">
                              mail
                            </span>
                            <span className="font-label-md">Email</span>
                          </button>
                        </>
                      ) : (
                        <button
                          className="col-span-2 p-lg border border-primary bg-primary/5 rounded-xl flex flex-col items-center gap-sm cursor-default"
                          onClick={() => setVerificationMethod("email")}
                        >
                          <span className="material-symbols-outlined text-2xl text-primary">
                            mail
                          </span>
                          <span className="font-label-md text-primary">
                            Email Only (Ethiopia)
                          </span>
                        </button>
                      )}
                    </div>
                    <button
                      className="w-full bg-primary text-on-primary py-4 rounded-lg font-label-md hover:opacity-90 transition-all"
                      onClick={() => setRatingStep(3)}
                    >
                      Send Code
                    </button>
                  </div>
                )}

                {/* Step 3: Enter Verification Code */}
                {ratingStep === 3 && (
                  <div className="flex flex-col items-center text-center space-y-md">
                    <h3 className="text-h3 font-h3 text-on-surface">
                      Enter Code
                    </h3>
                    <p className="text-body-md text-on-surface-variant">
                      We've sent a 4-digit code to your{" "}
                      {verificationMethod === "sms" ? "phone" : "email"}.
                    </p>
                    <div className="w-full py-md">
                      <input
                        className="w-full text-center tracking-[1em] text-2xl px-4 py-4 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        placeholder="0000"
                        maxLength="4"
                        type="text"
                        value={verificationCode}
                        onChange={(e) =>
                          setVerificationCode(e.target.value.replace(/\D/g, ""))
                        }
                      />
                    </div>
                    <button
                      className="w-full bg-primary text-on-primary py-4 rounded-lg font-label-md hover:opacity-90 transition-all disabled:opacity-50"
                      disabled={verificationCode.length !== 4}
                      onClick={handleVerifyAndPublish}
                    >
                      Verify &amp; Publish
                    </button>
                  </div>
                )}

                {/* Step 4: Success */}
                {ratingStep === 4 && (
                  <div className="flex flex-col items-center text-center space-y-md py-xl">
                    <div className="w-20 h-20 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mb-md">
                      <span className="material-symbols-outlined text-[#4CAF50] text-5xl">
                        check_circle
                      </span>
                    </div>
                    <h3 className="text-h3 font-h3 text-on-surface">
                      Review Published!
                    </h3>
                    <p className="text-body-md text-on-surface-variant">
                      Thank you for rating this product. Your feedback helps our
                      community.
                    </p>
                    <button
                      className="w-full bg-surface-container-high text-on-surface py-4 rounded-lg font-label-md hover:bg-surface-container-highest transition-all mt-md"
                      onClick={handleCloseModal}
                    >
                      Back to Product
                    </button>
                  </div>
                )}

                {/* Close button for non-success steps */}
                {ratingStep !== 4 && (
                  <button
                    className="absolute top-md right-md text-on-surface-variant hover:text-on-surface p-1"
                    onClick={handleCloseModal}
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
