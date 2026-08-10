# EthiZone QA & Production Bug Fix Log

This log documents every architectural issue, routing bug, hardcoded URL, security flaw, and UI error identified and fixed during the production-readiness audit.

---

## 1. Frontend Hardcoded API & Host Ports
- **Issue**: Hardcoded `http://localhost:5000` and `http://localhost:5001` URLs were present in multiple client components (`SellerHubPage.jsx`, `MarketplacePage.jsx`, `HomePage.jsx`, `CategoriesPage.jsx`, `Inbox.jsx`). This caused breaking network errors in production and when running on port 5001.
- **Files Modified**:
  - `client/src/pages/seller/SellerHubPage.jsx`
  - `client/src/pages/customer/MarketplacePage.jsx`
  - `client/src/pages/customer/HomePage.jsx`
  - `client/src/pages/customer/CategoriesPage.jsx`
  - `client/src/pages/Inbox.jsx`
- **Fix**: Replaced static localhost URLs with relative `/api/...` endpoints for HTTP calls and dynamic `import.meta.env.VITE_SOCKET_URL` fallbacks for WebSockets.

---

## 2. Missing Environment Variable Template Files
- **Issue**: Neither `backend` nor `client` had `.env.example` templates, leaving production developers without environment variable reference documentation.
- **Files Modified**:
  - `backend/.env.example` [NEW]
  - `client/.env.example` [NEW]
- **Fix**: Generated clean `.env.example` files specifying `MONGO_URI`, `JWT_SECRET`, `PORT`, `CLIENT_URL`, `EMAIL_HOST`, `VITE_API_BASE_URL`, and `VITE_SOCKET_URL`.

---

## 3. Brand Identity & Reusable Logo Animation (`AnimatedLogo`)
- **Issue**: Brand logo was inconsistent across pages, using static image assets without standardized orbital animation or uniform scaling.
- **Files Modified**:
  - `client/src/components/AnimatedLogo.jsx` [NEW]
  - `client/src/components/AnimatedLogo.css` [NEW]
  - `client/src/components/Navbar.jsx`
  - `client/src/components/SellerSidebar.jsx`
  - `client/src/components/CustomerFooter.jsx`
  - `client/src/pages/Login.jsx`
  - `client/src/pages/Register.jsx`
- **Fix**: Designed and deployed `AnimatedLogo` component featuring stationary gradient 'EthiZone' typography paired with a smooth, rotating orbital vector ring. Applied consistently across header navbars, sidebars, auth screens, and footers.

---

## 4. Translation Key Safe Fallback Logic
- **Issue**: Missing translation keys in Amharic (`am`) dictionary resulted in raw internal keys (e.g., `auth.welcomeTitle`, `common.or`) displaying directly on user screens.
- **Files Modified**:
  - `client/src/context/AppContext.jsx`
- **Fix**: Enhanced the `t(key)` helper to fallback first to English (`en`) dictionary, and if missing in both, clean up snake_case/dot-notated keys into human-readable capitalized text.

---

## 5. Security & Rate Limiting Verification
- **Issue**: Need verification that security headers and API rate limiters were active to prevent NoSQL injection and brute-force auth attempts.
- **Files Verified**:
  - `backend/server.js`
- **Fix**: Validated active NoSQL query sanitizer, custom HTTP security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`), and tier-based rate limiters (`apiLimiter` & `authLimiter`).

---

## 6. Missing Storefront & Review API Endpoints (`/api/stores` & `/api/reviews`)
- **Issue**: Frontend calls from `SellerHubPage.jsx`, `ProductDetailPage.jsx`, `ManageStoresPage.jsx`, `StoreListPage.jsx`, and `ManageFeedbackPage.jsx` were failing with 404 API Route Not Found errors due to missing routes in backend.
- **Files Added & Modified**:
  - `backend/models/Review.js` [NEW]
  - `backend/routes/reviews.js` [NEW]
  - `backend/routes/stores.js` [NEW]
  - `backend/server.js`
- **Fix**: Created `Review` Mongoose schema, implemented `/api/reviews` (GET, POST, DELETE) and `/api/stores` (GET, PUT, PATCH status) routes, and mounted them in `server.js`.

---

## 7. Rating Schema Relaxation & Cloud Logging Hardening
- **Issue**: Ratings submitted directly for target service providers without a specific product `listingId` failed validation. Additionally, synchronous `fs.appendFileSync` in admin routes blocked I/O and crashed in serverless runtimes.
- **Files Modified**:
  - `backend/models/Rating.js`
  - `backend/models/RatingVerification.js`
  - `backend/routes/ratings.js`
  - `backend/routes/admin.js`
- **Fix**: Made `listingId` optional across `Rating` and `RatingVerification` schemas and routes. Replaced synchronous file logging in `admin.js` with structured non-blocking console logging.

---

## 8. Brand Logo Uniformity & Permanent Gold Color Fix
- **Issue**: Logo presentation was inconsistent; `.logo img` CSS in `Navbar.jsx` used `filter: invert(1)` which caused the top-left navbar logo to display as blue by default and only turn gold on hover. Additionally, `Chatbot.jsx` inverted logo colors into a dark blue blob.
- **Files Modified**:
  - `client/src/components/Navbar.jsx`
  - `client/src/components/Chatbot.jsx`
  - `client/src/components/CustomerFooter.jsx`
  - `client/src/components/SellerSidebar.jsx`
- **Fix**: Removed `filter: invert(1)` from `.logo img` in `Navbar.jsx` and `Chatbot.jsx`, replacing it with a rich golden drop-shadow filter (`drop-shadow(0 2px 8px rgba(197, 168, 90, 0.3))`). The logo now remains constantly gold in its natural state without shifting from blue to gold on hover.

---

## 9. Sidebar Grid Separation & Premium Listing Card Aesthetic Overhaul
- **Issue**: The Filters sidebar and the marketplace listing cards were touching/overlapping with 0px gap due to missing grid gutters. Additionally, listing cards suffered from broken badge text wrapping, cramped price labels, and plain button styling.
- **Files Modified**:
  - `client/src/pages/Home.jsx`
  - `client/src/pages/customer/MarketplacePage.jsx`
  - `client/src/components/ListingCard.jsx`
- **Fix**: Replaced Bootstrap grid layout on the directory container with a dedicated Flexbox architecture (`directory-layout-flex` with `gap: 36px`). The sidebar (`directory-sidebar-col`) is locked to `275px` width and the main listings column (`directory-main-col`) occupies `flex: 1`, guaranteeing an un-collapsible **36px gap** of empty space with **zero visual overlap**. Redesigned `ListingCard` with single-line header chips and a sleek centered `📞 Contact for Price` gold badge container for unpriced items.

---

## 10. Logged-In Navbar Filters & Public Footer Removal
- **Issue**: When logged in (or on dashboard routes), the top navbar still rendered the public center category filter badges bar, and the page rendered the public marketplace footer at the bottom.
- **Files Modified**:
  - `client/src/components/Navbar.jsx`
  - `client/src/App.jsx`
- **Fix**: Updated `Navbar.jsx` to hide the center category filter badges (`navbar-center-filters`) when a user is logged in or on dashboard routes. Updated `App.jsx` to hide the public `landing-footer` when logged in or on dashboard pages.

---

## 11. CORS Origin Security Hardening
- **Issue**: Backend CORS configuration was using generic wildcard origin without credentials support.
- **Files Modified**:
  - `backend/server.js`
- **Fix**: Configured `cors` middleware to dynamically handle `process.env.CLIENT_URL` (supporting single or comma-separated origins) with `credentials: true`.






