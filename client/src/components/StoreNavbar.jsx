import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const StoreNavbar = ({ 
  storeName, 
  category, 
  customLinks = [], 
  isOwner, 
  onShowQr, 
  storeId,
  role,
  businessType,
  activeTab,
  setActiveTab
}) => {
  const { t } = useApp();
  const [headerHeight, setHeaderHeight] = useState(180);

  const isGrocery = category === 'Grocery Store';
  const isLiquor = category === 'Liquor Store';
  const isElectronics = category === 'Electronics Shop';
  const isLaw = category === 'Law Office';
  const isTax = category === 'Tax Office';
  const isClinic = category === 'Clinic' || category === 'Dental Clinic';
  const isCleaning = category === 'Cleaning Agency';
  const isBeauty = category === 'Beauty Salon';

  const beautyTabs = [
    { id: 'home', key: 'beauty_home', label: 'Home' },
    { id: 'about', key: 'beauty_about_us', label: 'About Us' },
    { id: 'all_services', key: 'beauty_all_services', label: 'Services' },
    { id: 'Hair', key: 'beauty_hair', label: 'Hair' },
    { id: 'Makeup', key: 'beauty_makeup', label: 'Makeup' },
    { id: 'Nails', key: 'beauty_nails', label: 'Nails' },
    { id: 'Facial', key: 'beauty_facial', label: 'Facial' },
    { id: 'Barber', key: 'beauty_barber', label: 'Barber' },
    { id: 'Spa', key: 'beauty_spa', label: 'Spa' },
    { id: 'Packages', key: 'beauty_packages', label: 'Packages' },
    { id: 'gallery', key: 'beauty_gallery', label: 'Gallery' },
    { id: 'book_appointment', key: 'beauty_book_appointment', label: 'Book Appointment' },
    { id: 'contact', key: 'beauty_contact', label: 'Contact' }
  ];

  const cleaningTabs = [
    { id: 'home', key: 'cleaning_home', label: 'Home' },
    { id: 'about', key: 'cleaning_about_us', label: 'About Us' },
    { id: 'all_services', key: 'cleaning_all_services', label: 'Services' },
    { id: 'House Cleaning', key: 'cleaning_house_cleaning', label: 'House Cleaning' },
    { id: 'Office Cleaning', key: 'cleaning_office_cleaning', label: 'Office Cleaning' },
    { id: 'Deep Cleaning', key: 'cleaning_deep_cleaning', label: 'Deep Cleaning' },
    { id: 'Move-In / Move-Out', key: 'cleaning_move_in_out', label: 'Move-In / Move-Out' },
    { id: 'Carpet Cleaning', key: 'cleaning_carpet_cleaning', label: 'Carpet Cleaning' },
    { id: 'Disinfection', key: 'cleaning_disinfection', label: 'Disinfection' },
    { id: 'book_appointment', key: 'cleaning_book_now', label: 'Book Now' },
    { id: 'contact', key: 'cleaning_contact', label: 'Contact' }
  ];

  const clinicTabs = [
    { id: 'home', key: 'clinic_home', label: 'Home' },
    { id: 'about', key: 'clinic_about_us', label: 'About Us' },
    { id: 'all_services', key: 'clinic_all_services', label: 'Services' },
    { id: 'doctors', key: 'clinic_doctors', label: 'Doctors' },
    { id: 'General Checkup', key: 'clinic_general_checkup', label: 'General Checkup' },
    { id: 'Laboratory', key: 'clinic_laboratory', label: 'Laboratory' },
    { id: 'Pharmacy', key: 'clinic_pharmacy', label: 'Pharmacy' },
    { id: 'Dental', key: 'clinic_dental', label: 'Dental' },
    { id: 'Eye Care', key: 'clinic_eye_care', label: 'Eye Care' },
    { id: 'Women’s Health', key: 'clinic_womens_health', label: 'Women’s Health' },
    { id: 'book_appointment', key: 'clinic_book_appointment', label: 'Book Appointment' },
    { id: 'contact', key: 'clinic_contact', label: 'Contact' }
  ];

  const taxTabs = [
    { id: 'home', key: 'tax_home', label: 'Home' },
    { id: 'about', key: 'tax_about_us', label: 'About Us' },
    { id: 'all_services', key: 'tax_all_services', label: 'Tax Services' },
    { id: 'Personal Tax', key: 'tax_personal_tax', label: 'Personal Tax' },
    { id: 'Business Tax', key: 'tax_business_tax', label: 'Business Tax' },
    { id: 'VAT', key: 'tax_vat', label: 'VAT' },
    { id: 'Payroll Tax', key: 'tax_payroll_tax', label: 'Payroll Tax' },
    { id: 'Accounting', key: 'tax_accounting', label: 'Accounting' },
    { id: 'Bookkeeping', key: 'tax_bookkeeping', label: 'Bookkeeping' },
    { id: 'Tax Consultation', key: 'tax_consultation', label: 'Tax Consultation' },
    { id: 'book_appointment', key: 'tax_book_appointment', label: 'Book Appointment' },
    { id: 'contact', key: 'tax_contact', label: 'Contact' }
  ];

  const groceryTabs = [
    { id: 'home', key: 'grocery_home', label: 'Home' },
    { id: 'all_products', key: 'grocery_all_products', label: 'All Products' },
    { id: 'Fruits & Vegetables', key: 'grocery_fruits_vegetables', label: 'Fruits & Vegetables' },
    { id: 'Meat & Fish', key: 'grocery_meat_fish', label: 'Meat & Fish' },
    { id: 'Dairy & Eggs', key: 'grocery_dairy_eggs', label: 'Dairy & Eggs' },
    { id: 'Bakery', key: 'grocery_bakery', label: 'Bakery' },
    { id: 'Pantry', key: 'grocery_pantry', label: 'Pantry' },
    { id: 'Drinks', key: 'grocery_drinks', label: 'Drinks' },
    { id: 'Household', key: 'grocery_household', label: 'Household' },
    { id: 'Baby & Personal Care', key: 'grocery_baby_personal_care', label: 'Baby & Personal Care' },
    { id: 'new_arrival', key: 'grocery_new_arrivals', label: 'New Arrivals' },
    { id: 'on_sale', key: 'grocery_on_sale', label: 'On Sale' },
    { id: 'about', key: 'grocery_about_us', label: 'About Us' }
  ];

  const liquorTabs = [
    { id: 'home', key: 'liquor_home', label: 'Home' },
    { id: 'all_drinks', key: 'liquor_all_drinks', label: 'All Drinks' },
    { id: 'Wine', key: 'liquor_wine', label: 'Wine' },
    { id: 'Beer', key: 'liquor_beer', label: 'Beer' },
    { id: 'Whiskey', key: 'liquor_whiskey', label: 'Whiskey' },
    { id: 'Vodka', key: 'liquor_vodka', label: 'Vodka' },
    { id: 'Gin', key: 'liquor_gin', label: 'Gin' },
    { id: 'Rum', key: 'liquor_rum', label: 'Rum' },
    { id: 'Tequila', key: 'liquor_tequila', label: 'Tequila' },
    { id: 'Champagne', key: 'liquor_champagne', label: 'Champagne' },
    { id: 'Mixers', key: 'liquor_mixers', label: 'Mixers' },
    { id: 'Snacks', key: 'liquor_snacks', label: 'Snacks' },
    { id: 'Gift Sets', key: 'liquor_gift_sets', label: 'Gift Sets' },
    { id: 'new_arrival', key: 'liquor_new_arrivals', label: 'New Arrivals' },
    { id: 'on_sale', key: 'liquor_on_sale', label: 'On Sale' },
    { id: 'about', key: 'liquor_about_us', label: 'About Us' }
  ];

  const electronicsTabs = [
    { id: 'home', key: 'electronics_home', label: 'Home' },
    { id: 'all_electronics', key: 'electronics_all_electronics', label: 'All Electronics' },
    { id: 'Phones', key: 'electronics_phones', label: 'Phones' },
    { id: 'Laptops', key: 'electronics_laptops', label: 'Laptops' },
    { id: 'TV & Audio', key: 'electronics_tv_audio', label: 'TV & Audio' },
    { id: 'Gaming', key: 'electronics_gaming', label: 'Gaming' },
    { id: 'Accessories', key: 'electronics_accessories', label: 'Accessories' },
    { id: 'Smart Devices', key: 'electronics_smart_devices', label: 'Smart Devices' },
    { id: 'Appliances', key: 'electronics_appliances', label: 'Appliances' },
    { id: 'new_arrival', key: 'electronics_new_arrivals', label: 'New Arrivals' },
    { id: 'on_sale', key: 'electronics_on_sale', label: 'On Sale' },
    { id: 'refurbished', key: 'electronics_refurbished', label: 'Refurbished' },
    { id: 'warranty', key: 'electronics_warranty', label: 'Warranty' },
    { id: 'about', key: 'electronics_about_us', label: 'About Us' }
  ];

  const lawTabs = [
    { id: 'home', key: 'law_home', label: 'Home' },
    { id: 'about', key: 'law_about_us', label: 'About Us' },
    { id: 'all_services', key: 'law_all_services', label: 'Legal Services' },
    { id: 'Family Law', key: 'law_family_law', label: 'Family Law' },
    { id: 'Business Law', key: 'law_business_law', label: 'Business Law' },
    { id: 'Immigration', key: 'law_immigration', label: 'Immigration' },
    { id: 'Real Estate Law', key: 'law_real_estate_law', label: 'Real Estate Law' },
    { id: 'Contract Review', key: 'law_contract_review', label: 'Contract Review' },
    { id: 'Consultation', key: 'law_consultation', label: 'Consultation' },
    { id: 'attorneys', key: 'law_attorneys', label: 'Attorneys' },
    { id: 'book_appointment', key: 'law_book_appointment', label: 'Book Appointment' },
    { id: 'contact', key: 'law_contact', label: 'Contact' }
  ];

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerWrapper = document.querySelector('.header-wrapper');
      if (headerWrapper) {
        setHeaderHeight(headerWrapper.offsetHeight);
      }
    };
    
    // Initial check
    updateHeaderHeight();
    
    // Check on resize
    window.addEventListener('resize', updateHeaderHeight);
    
    // Observe DOM changes in case the top banner or breadcrumbs change
    const observer = new MutationObserver(updateHeaderHeight);
    const headerWrapper = document.querySelector('.header-wrapper');
    if (headerWrapper) {
      observer.observe(headerWrapper, { childList: true, subtree: true, attributes: true });
    }
    
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      observer.disconnect();
    };
  }, []);

  const getCatalogTabName = () => {
    if (role === 'handyman') return t('skills_tab');
    if (role === 'individual') return t('used_items_tab');
    if (role === 'business') {
      if (businessType === 'store') return t('shop_tab');
      if (businessType === 'service') return t('services_tab');
      if (businessType === 'organization') return t('job_openings_tab');
      if (businessType === 'real_estate') return t('properties_tab');
      if (businessType === 'automotive') return t('showroom_tab');
    }
    return t('catalog_tab');
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="store-navbar" style={{ '--header-height': `${headerHeight}px` }}>
      <div className="container store-nav-container">
        <div className="store-brand">
          <span className="store-brand-icon">🏬</span>
          <div>
            <div className="store-title">{storeName || 'Custom Store'}</div>
            <span className="badge badge-cyan store-category-badge">{category}</span>
          </div>
        </div>
        
        <ul className="store-nav-links">
          {isGrocery ? (
            groceryTabs.map((tab) => (
              <li key={tab.id}>
                <button 
                  type="button"
                  onClick={() => handleTabClick(tab.id)} 
                  className={`store-nav-link-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {t(tab.key) || tab.label}
                </button>
              </li>
            ))
          ) : isLiquor ? (
            liquorTabs.map((tab) => (
              <li key={tab.id}>
                <button 
                  type="button"
                  onClick={() => handleTabClick(tab.id)} 
                  className={`store-nav-link-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {t(tab.key) || tab.label}
                </button>
              </li>
            ))
          ) : isElectronics ? (
            electronicsTabs.map((tab) => (
              <li key={tab.id}>
                <button 
                  type="button"
                  onClick={() => handleTabClick(tab.id)} 
                  className={`store-nav-link-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {t(tab.key) || tab.label}
                </button>
              </li>
            ))
          ) : isLaw ? (
            lawTabs.map((tab) => (
              <li key={tab.id}>
                <button 
                  type="button"
                  onClick={() => handleTabClick(tab.id)} 
                  className={`store-nav-link-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {t(tab.key) || tab.label}
                </button>
              </li>
            ))
          ) : isTax ? (
            taxTabs.map((tab) => (
              <li key={tab.id}>
                <button 
                  type="button"
                  onClick={() => handleTabClick(tab.id)} 
                  className={`store-nav-link-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {t(tab.key) || tab.label}
                </button>
              </li>
            ))
          ) : isClinic ? (
            clinicTabs.map((tab) => (
              <li key={tab.id}>
                <button 
                  type="button"
                  onClick={() => handleTabClick(tab.id)} 
                  className={`store-nav-link-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {t(tab.key) || tab.label}
                </button>
              </li>
            ))
          ) : isCleaning ? (
            cleaningTabs.map((tab) => (
              <li key={tab.id}>
                <button 
                  type="button"
                  onClick={() => handleTabClick(tab.id)} 
                  className={`store-nav-link-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {t(tab.key) || tab.label}
                </button>
              </li>
            ))
          ) : isBeauty ? (
            beautyTabs.map((tab) => (
              <li key={tab.id}>
                <button 
                  type="button"
                  onClick={() => handleTabClick(tab.id)} 
                  className={`store-nav-link-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {t(tab.key) || tab.label}
                </button>
              </li>
            ))
          ) : (
            <>
              <li>
                <button 
                  type="button"
                  onClick={() => handleTabClick('home')} 
                  className={`store-nav-link-btn ${activeTab === 'home' ? 'active' : ''}`}
                >
                  {t('home_tab')}
                </button>
              </li>
              
              {businessType === 'store' && (
                <>
                  <li>
                    <button 
                      type="button"
                      onClick={() => handleTabClick('on_sale')} 
                      className={`store-nav-link-btn ${activeTab === 'on_sale' ? 'active' : ''}`}
                    >
                      On Sale
                    </button>
                  </li>
                  <li>
                    <button 
                      type="button"
                      onClick={() => handleTabClick('new_arrival')} 
                      className={`store-nav-link-btn ${activeTab === 'new_arrival' ? 'active' : ''}`}
                    >
                      New Arrival
                    </button>
                  </li>
                </>
              )}

              <li>
                <button 
                  type="button"
                  onClick={() => handleTabClick('catalog')} 
                  className={`store-nav-link-btn ${activeTab === 'catalog' ? 'active' : ''}`}
                >
                  {getCatalogTabName()}
                </button>
              </li>

              <li>
                <button 
                  type="button"
                  onClick={() => handleTabClick('about')} 
                  className={`store-nav-link-btn ${activeTab === 'about' ? 'active' : ''}`}
                >
                  {t('about_tab')}
                </button>
              </li>

              <li>
                <button 
                  type="button"
                  onClick={() => handleTabClick('gallery')} 
                  className={`store-nav-link-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                >
                  Gallery
                </button>
              </li>
              
              <li>
                <button 
                  type="button"
                  onClick={() => handleTabClick('contact')} 
                  className={`store-nav-link-btn ${activeTab === 'contact' ? 'active' : ''}`}
                >
                  {t('contact_tab')}
                </button>
              </li>
            </>
          )}
          
          {/* Custom navbar links specified by owner */}
          {customLinks.map((link, index) => {
            const targetUrl = link.url.startsWith('http') ? link.url : `http://${link.url}`;
            return (
              <li key={index}>
                <a 
                  href={targetUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="store-nav-link-btn custom-link"
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

      </div>
      
      {/* Mobile Bottom Tabbar specific to Storefront */}
      <div className="store-mobile-bottom-tabbar d-lg-none">
        {isGrocery ? (
          groceryTabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id)} 
              className={`store-mobile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-label">{t(tab.key) || tab.label}</span>
            </button>
          ))
        ) : isLiquor ? (
          liquorTabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id)} 
              className={`store-mobile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-label">{t(tab.key) || tab.label}</span>
            </button>
          ))
        ) : isElectronics ? (
          electronicsTabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id)} 
              className={`store-mobile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-label">{t(tab.key) || tab.label}</span>
            </button>
          ))
        ) : isLaw ? (
          lawTabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id)} 
              className={`store-mobile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-label">{t(tab.key) || tab.label}</span>
            </button>
          ))
        ) : isTax ? (
          taxTabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id)} 
              className={`store-mobile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-label">{t(tab.key) || tab.label}</span>
            </button>
          ))
        ) : isClinic ? (
          clinicTabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id)} 
              className={`store-mobile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-label">{t(tab.key) || tab.label}</span>
            </button>
          ))
        ) : isCleaning ? (
          cleaningTabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id)} 
              className={`store-mobile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-label">{t(tab.key) || tab.label}</span>
            </button>
          ))
        ) : isBeauty ? (
          beautyTabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id)} 
              className={`store-mobile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-label">{t(tab.key) || tab.label}</span>
            </button>
          ))
        ) : (
          <>
            <button 
              onClick={() => handleTabClick('home')} 
              className={`store-mobile-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            >
              <span className="tab-label">{t('home_tab')}</span>
            </button>
            
            {businessType === 'store' && (
              <>
                <button 
                  onClick={() => handleTabClick('on_sale')} 
                  className={`store-mobile-tab-btn ${activeTab === 'on_sale' ? 'active' : ''}`}
                >
                  <span className="tab-label">On Sale</span>
                </button>
                <button 
                  onClick={() => handleTabClick('new_arrival')} 
                  className={`store-mobile-tab-btn ${activeTab === 'new_arrival' ? 'active' : ''}`}
                >
                  <span className="tab-label">New</span>
                </button>
              </>
            )}

            <button 
              onClick={() => handleTabClick('catalog')} 
              className={`store-mobile-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            >
              <span className="tab-label">{getCatalogTabName()}</span>
            </button>

            <button 
              onClick={() => handleTabClick('about')} 
              className={`store-mobile-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            >
              <span className="tab-label">{t('about_tab')}</span>
            </button>

            <button 
              onClick={() => handleTabClick('gallery')} 
              className={`store-mobile-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            >
              <span className="tab-label">Gallery</span>
            </button>

            <button 
              onClick={() => handleTabClick('contact')} 
              className={`store-mobile-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            >
              <span className="tab-label">{t('contact_tab')}</span>
            </button>
          </>
        )}
        {customLinks.map((link, index) => {
          const targetUrl = link.url.startsWith('http') ? link.url : `http://${link.url}`;
          return (
            <a 
              key={`mobile-${index}`}
              href={targetUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="store-mobile-tab-btn custom-link"
            >
              <span className="tab-label">{link.label}</span>
            </a>
          );
        })}
      </div>

      <style>{`
        .store-navbar {
          background: var(--bg-navbar);
          border-bottom: 2px solid var(--accent-secondary);
          padding: 14px 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          z-index: 990;
        }
        @media (min-width: 992px) {
          .store-navbar {
            position: sticky;
            /* The top value is set dynamically by JS, but provide a fallback */
            top: var(--header-height, 180px); 
          }
        }
        .store-nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .store-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .store-brand-icon {
          font-size: 1.8rem;
        }
        .store-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--text-main);
          line-height: 1.2;
        }
        .store-category-badge {
          font-size: 0.65rem;
          padding: 1px 6px;
          margin-top: 2px;
        }
        .store-nav-links {
          display: flex;
          list-style: none;
          gap: 20px;
          align-items: center;
          margin: 0;
          padding: 0;
        }
        .store-nav-link-btn {
          background: none;
          border: none;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 4px 8px;
          display: inline-flex;
          align-items: center;
        }
        .store-nav-link-btn:hover {
          color: var(--text-main);
        }
        .store-nav-link-btn.active {
          color: var(--accent-secondary);
          border-bottom: 2px solid var(--accent-secondary);
        }
        .custom-link {
          color: var(--accent-secondary);
        }
        .custom-link:hover {
          color: #fcd34d;
        }
        .store-nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .qr-btn {
          background: linear-gradient(135deg, var(--accent-secondary) 0%, #a1823a 100%);
          box-shadow: 0 4px 15px var(--accent-secondary-glow);
        }
        .qr-btn:hover {
          box-shadow: 0 6px 20px var(--accent-secondary-glow);
        }
        @media (max-width: 900px) {
          .store-navbar {
            background: none !important;
            border-bottom: none !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          .store-nav-container {
            display: none !important;
          }
          
          /* Show mobile tab bar on small screens */
          .store-mobile-bottom-tabbar {
            display: flex !important;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--bg-navbar);
            backdrop-filter: var(--blur-glass);
            -webkit-backdrop-filter: var(--blur-glass);
            border-top: 1px solid var(--accent-secondary);
            z-index: 2000;
            padding: 8px 4px;
            padding-bottom: env(safe-area-inset-bottom, 8px);
            overflow-x: auto;
            gap: 6px;
            box-shadow: 0 -4px 12px rgba(0,0,0,0.04);
            justify-content: flex-start;
            align-items: center;
          }
          .store-mobile-bottom-tabbar::-webkit-scrollbar {
            display: none;
          }
          .store-mobile-bottom-tabbar::before,
          .store-mobile-bottom-tabbar::after {
            content: '';
            margin: auto;
          }
        }
        
        .store-mobile-bottom-tabbar {
          display: none; /* Hidden on desktop */
        }
        
        .store-mobile-tab-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--text-secondary);
          min-width: max-content;
          padding: 6px 12px;
          border-radius: 8px;
          gap: 2px;
          transition: all 0.2s;
          text-decoration: none;
        }
        
        .store-mobile-tab-btn.active {
          color: var(--accent-secondary);
          background-color: rgba(197, 168, 90, 0.15);
        }
        
        .store-mobile-tab-btn span.tab-label {
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
        }
      `}</style>
    </nav>
  );
};

export default StoreNavbar;
