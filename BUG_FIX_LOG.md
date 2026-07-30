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
