# EthiZone Test Users Directory

This document details all safe, fake test accounts created and used for end-to-end testing across different system roles and business categories.

> [!NOTE]
> All credentials listed below are for local sandbox testing only. No real customer passwords or personal information are stored or used.

---

## Standard User Roles

| Role | Username | Email | Target Dashboard / Scope |
| :--- | :--- | :--- | :--- |
| **Guest Visitor** | Anonymous | N/A | Public Marketplace, Storefronts, Search, Inquiries |
| **Buyer / Customer** | Buyer Test User | `buyer1@example.com` | Public Browsing, Inquiry Form, OTP Verification |
| **Personal Item Seller** | Personal Seller | `personal1@example.com` | Personal Item Postings, Direct Connect |
| **Store Owner (Grocery)** | Fresh Mart Owner | `grocery1@example.com` | Grocery Store Dashboard, Product Inventory |
| **Store Owner (Liquor)** | Elite Spirits Owner | `liquor1@example.com` | Liquor Storefront, Age-Restricted Catalog |
| **Store Owner (Electronics)** | TechZone Owner | `electronics1@example.com` | Electronics Catalog, Tech Specs |
| **Service Provider (Law)** | Justice Legal | `law1@example.com` | Legal Consultation Services Dashboard |
| **Service Provider (Tax)** | Apex Tax | `tax1@example.com` | Tax Preparation & Filing Dashboard |
| **Service Provider (Clinic)** | CareHealth Clinic | `clinic1@example.com` | Medical Appointments & Clinic Portal |
| **Service Provider (Cleaning)** | Sparkle Clean | `cleaning1@example.com` | Residential & Office Cleaning Services |
| **Service Provider (Beauty)** | Luxe Beauty Salon | `beauty1@example.com` | Beauty & Spa Booking Portal |
| **Real Estate Seller/Renter** | Prime Realty | `realestate1@example.com` | Houses, Apartments & Commercial Listings |
| **Vehicle Seller/Renter** | AutoConnect Motors | `vehicle1@example.com` | Used Cars & Vehicle Rentals Portal |
| **Freelancer / HireMe** | Pro Handyman | `freelance1@example.com` | Skill Showcase, Direct Hire Portfolio |
| **Employer / Job Poster** | Horizon Tech Corp | `employer1@example.com` | Job Posting & Talent Hiring Portal |
| **Super Admin** | Super Admin | `ethizone1@gmail.com` | Super Admin Governance & Store Moderation |

---

## Verification & Password Guidelines

- **Default Test Password**: `TestPassword123!` (or seeded super admin: `Ethizone@Ethiopia.2019`)
- **Email Verification**: Test accounts use dummy SMTP pass-through or test OTPs.
- **Production Warning**: Do NOT deploy these fake accounts into live production databases. Seed production environments cleanly using `npm run seed`.
