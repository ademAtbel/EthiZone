import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Send, Phone, Activity, Upload, Scale, BarChart2, FolderOpen, ShieldAlert, Wine, AlertTriangle, GlassWater, Shirt, ShoppingBag } from 'lucide-react';

const CategoryTemplate = ({ category = '', ownerName = '', ownerPhone = '', onOpenModal }) => {
  const normalizedCategory = category.toLowerCase().trim().replace(/_/g, ' ');

  // 1. PHARMACY TEMPLATE
  if (normalizedCategory.includes('pharmacy')) {
    return <PharmacyLayout ownerName={ownerName} ownerPhone={ownerPhone} onOpenModal={onOpenModal} />;
  }

  // 2. LAW OFFICE TEMPLATE
  if (normalizedCategory.includes('law') || normalizedCategory.includes('legal')) {
    return <LawOfficeLayout ownerName={ownerName} ownerPhone={ownerPhone} onOpenModal={onOpenModal} />;
  }

  // 3. TAX OFFICE TEMPLATE
  if (normalizedCategory.includes('tax') || normalizedCategory.includes('accounting')) {
    return <TaxOfficeLayout ownerName={ownerName} ownerPhone={ownerPhone} onOpenModal={onOpenModal} />;
  }

  // 4. LIQUOR STORE TEMPLATE
  if (normalizedCategory.includes('liquor') || normalizedCategory.includes('alcohol') || normalizedCategory.includes('liqueur')) {
    return <LiquorStoreLayout ownerName={ownerName} ownerPhone={ownerPhone} onOpenModal={onOpenModal} />;
  }

  // 5. BOUTIQUE TEMPLATE
  if (normalizedCategory.includes('boutique') || normalizedCategory.includes('clothing')) {
    return <BoutiqueLayout ownerName={ownerName} ownerPhone={ownerPhone} onOpenModal={onOpenModal} />;
  }

  // DEFAULT FALLBACK TEMPLATE
  return (
    <div className="glass-panel template-section">
      <h3>Business Hours & Contact</h3>
      <p className="template-intro">Get in touch directly with our staff to arrange services or orders.</p>
      
      <div className="info-grid" style={{ marginBottom: '20px' }}>
        <div className="info-item">
          <strong><Calendar size={16} className="d-inline-block me-1"/> Working Days</strong>
          <span>Monday - Saturday</span>
        </div>
        <div className="info-item">
          <strong><Clock size={16} className="d-inline-block me-1"/> Business Hours</strong>
          <span>09:00 AM - 07:00 PM</span>
        </div>
        <div className="info-item">
          <strong><MapPin size={16} className="d-inline-block me-1"/> Direct Line</strong>
          <span>{ownerPhone}</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={onOpenModal} className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"><Send size={16}/> Send Service Request</button>
        <a href={`tel:${ownerPhone}`} className="btn btn-secondary d-flex align-items-center justify-content-center gap-2"><Phone size={16}/> Call</a>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// PHARMACY SUB-COMPONENT
// ----------------------------------------------------
const PharmacyLayout = ({ ownerName, ownerPhone, onOpenModal }) => {
  return (
    <div className="glass-panel template-section pharmacy-theme">
      <div className="theme-banner" style={{ background: '#10b981', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', width: 'fit-content', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}><Activity size={14}/> Pharmacy Hub</div>
      <h3>Send Doctor Prescription</h3>
      <p className="template-intro">Upload your doctor's prescription securely. We will prepare your medication for pickup.</p>
      
      <button onClick={onOpenModal} className="btn btn-success w-full" style={{ padding: '12px', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <Upload size={18}/> Upload & Send Prescription Form
      </button>

      <div className="emergency-callout" style={{ marginTop: '20px', padding: '16px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px' }}>
        <h4 style={{ color: '#ef4444', margin: '0 0 6px 0' }}>Need Emergency Medication?</h4>
        <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem' }}>Call our pharmacists directly to check shelf inventory immediately.</p>
        <a href={`tel:${ownerPhone}`} className="btn btn-danger btn-sm d-inline-flex align-items-center gap-1"><Phone size={14}/> Call Pharmacy</a>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// LAW OFFICE SUB-COMPONENT
// ----------------------------------------------------
const LawOfficeLayout = ({ ownerName, ownerPhone, onOpenModal }) => {
  return (
    <div className="glass-panel template-section law-theme">
      <div className="theme-banner" style={{ background: '#6366f1', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', width: 'fit-content', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}><Scale size={14}/> Legal Consultation Portal</div>
      <h3>Request Consultation</h3>
      <p className="template-intro">Schedule a legal consultation directly with our attorney. Submit this request, and it will notify both parties instantly.</p>
      
      <button onClick={onOpenModal} className="btn btn-primary w-full d-flex align-items-center justify-content-center gap-2" style={{ padding: '12px', fontSize: '1rem', fontWeight: 600 }}>
        <Calendar size={18}/> Request Consultation Appointment
      </button>
    </div>
  );
};

// ----------------------------------------------------
// TAX OFFICE SUB-COMPONENT
// ----------------------------------------------------
const TaxOfficeLayout = ({ ownerName, ownerPhone, onOpenModal }) => {
  return (
    <div className="glass-panel template-section tax-theme">
      <div className="theme-banner" style={{ background: '#06b6d4', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', width: 'fit-content', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}><BarChart2 size={14}/> Tax & Account Services</div>
      <h3>Tax Filing Document Prep</h3>
      <p className="template-intro">We process individual and business taxes, accounting audit journals, and financial filings. Submit documents to get started.</p>
      
      <button onClick={onOpenModal} className="btn btn-primary w-full d-flex align-items-center justify-content-center gap-2" style={{ padding: '12px', fontSize: '1rem', fontWeight: 600 }}>
        <FolderOpen size={18}/> Inquire & Start Tax Prep Form
      </button>
    </div>
  );
};

// ----------------------------------------------------
// LIQUOR STORE SUB-COMPONENT
// ----------------------------------------------------
const LiquorStoreLayout = ({ ownerName, ownerPhone, onOpenModal }) => {
  const [isVerified, setIsVerified] = useState(() => {
    return localStorage.getItem('liquor_age_verified') === 'true';
  });

  const handleVerify = () => {
    localStorage.setItem('liquor_age_verified', 'true');
    setIsVerified(true);
  };

  if (!isVerified) {
    return (
      <div className="glass-panel template-section liquor-theme age-gate">
        <span className="liquor-icon"><ShieldAlert size={48} className="mb-2 text-danger"/></span>
        <h3>Age Verification Shield</h3>
        <p>You must be 21 years of age or older to view the liquor store catalog and order pickups.</p>
        <button onClick={handleVerify} className="btn btn-danger w-full mt-3">
          I am 21 or Older - Enter Store
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel template-section liquor-theme">
      <div className="theme-banner" style={{ background: '#f43f5e', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', width: 'fit-content', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}><Wine size={14}/> Fine Liqueur & Spirits</div>
      <h3>Pre-Order & Pickup</h3>
      <p className="template-intro">Browse alcohol collections. Select items, call to check availability, and pick up inside our storefront.</p>
      
      <div className="liquor-details" style={{ marginBottom: '20px' }}>
        <p className="policy-note d-flex align-items-start gap-1"><AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }}/> Note: Valid photo ID matching your order must be shown in-store during pickup. No sales to minors.</p>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={onOpenModal} className="btn btn-success flex-grow-1 d-flex align-items-center justify-content-center gap-2"><GlassWater size={18}/> Start Liquor Pre-Order Form</button>
        <a href={`tel:${ownerPhone}`} className="btn btn-secondary d-flex align-items-center justify-content-center gap-2"><Phone size={18}/> Check Stock</a>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// BOUTIQUE SUB-COMPONENT
// ----------------------------------------------------
const BoutiqueLayout = ({ ownerName, ownerPhone, onOpenModal }) => {
  return (
    <div className="glass-panel template-section boutique-theme">
      <div className="theme-banner" style={{ background: '#ec4899', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', width: 'fit-content', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}><Shirt size={14}/> Boutique Catalog Showcase</div>
      <h3>Seasonal Collections</h3>
      <p className="template-intro">Explore our premium catalog. Inquire on sizes, styles, and order bookings directly.</p>



      <button onClick={onOpenModal} className="btn btn-primary w-full d-flex align-items-center justify-content-center gap-2" style={{ padding: '12px', fontSize: '1rem', fontWeight: 600 }}>
        <ShoppingBag size={18}/> Check Product Availability Form
      </button>
    </div>
  );
};

export default CategoryTemplate;
