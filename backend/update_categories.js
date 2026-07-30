const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Category = require('./models/Category');

const runSeeding = async () => {
  await connectDB();
  
  try {
    // Clear out previous categories
    await Category.deleteMany({});
    
    const defaults = [
      // STORES
      { name: 'Boutique', type: 'store', description: 'Clothing and apparel collection retail outlets' },
      { name: 'Pharmacy', type: 'store', description: 'Medical, healthcare products and prescription fulfillment' },
      { name: 'Liquor Store', type: 'store', description: 'Spirits, beers and wines retail store outlets' },
      { name: 'Grocery Store', type: 'store', description: 'Fresh vegetables, foods, and daily essentials retail' },
      { name: 'Electronics Shop', type: 'store', description: 'Mobiles, laptops, appliances and tech accessories' },
      { name: 'Bookstore', type: 'store', description: 'Novels, text books, stationery and prints' },
      { name: 'Furniture', type: 'store', description: 'Sofas, beds, tables, and home decor items retail' },
      { name: 'Hardware Store', type: 'store', description: 'Tools, building materials, plumbing and electrical supplies retail' },
      { name: 'Cafe & Restaurant', type: 'store', description: 'Fresh food, drinks, coffee and dining service' },
      { name: 'Jewelry & Accessories', type: 'store', description: 'Gold, silver, watches, bags and fashion accessories retail' },
      { name: 'Gift & Toy Shop', type: 'store', description: 'Souvenirs, birthday gifts, kids toys and game boards retail' },
      { name: 'Spare Parts Dealer', type: 'store', description: 'Car batteries, tires, filters and engine parts retail' },
      { name: 'Other Store', type: 'store', description: 'Other retail stores' },

      // SERVICES
      { name: 'Law Office', type: 'service', description: 'Legal advice, consultation and representation' },
      { name: 'Tax Office', type: 'service', description: 'Tax filing, accounting and financial auditing preparation' },
      { name: 'Clinic', type: 'service', description: 'General checkups, laboratory, pharmacy and dental healthcare' },
      { name: 'Consulting Firm', type: 'service', description: 'Corporate strategies, analysis and advice' },
      { name: 'Cleaning Agency', type: 'service', description: 'Residential, office cleaning and sanitization services' },
      { name: 'Beauty Salon', type: 'service', description: 'Hair styling, makeups, nails and spa care' },

      // ORGANIZATIONS (Hiring only)
      { name: 'Tech Corporation', type: 'organization', description: 'Software engineering, hardware manufacturing and tech services' },
      { name: 'Construction Company', type: 'organization', description: 'Civil engineering, building construction and infrastructure' },
      { name: 'Healthcare Group', type: 'organization', description: 'Hospital chains, clinical services and research' },
      { name: 'Educational Institution', type: 'organization', description: 'Universities, schools and training academies' },
      { name: 'Non-Profit Org', type: 'organization', description: 'Social charity, fundraising and volunteer setups' },
      { name: 'Other Organization', type: 'organization', description: 'Other categories of hiring entities' },

      // REAL ESTATE (Houses)
      { name: 'Residential Homes', type: 'real_estate', description: 'Single family houses, villas, and townhomes' },
      { name: 'Rental Apartments', type: 'real_estate', description: 'Apartment flats, condos, and studio rooms for lease' },
      { name: 'Commercial Real Estate', type: 'real_estate', description: 'Offices, shops, warehouses and business properties' },
      { name: 'Land & Lots', type: 'real_estate', description: 'Vacant land plots, residential lots and farming land' },

      // AUTOMOTIVE (Cars)
      { name: 'Used Car Dealership', type: 'automotive', description: 'Pre-owned cars, SUVs and trucks sales' },
      { name: 'Car Rental Service', type: 'automotive', description: 'Daily, weekly and monthly vehicle leases' },
      { name: 'Auto Repair Workshop', type: 'automotive', description: 'Engine maintenance, painting, and mechanics' },
      { name: 'Spare Parts Dealer', type: 'automotive', description: 'Car batteries, tires, filters and engine parts retail' }
    ];
    
    await Category.insertMany(defaults);
    console.log('Database seeded with comprehensive type-based business categories!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding default categories:', err.message);
    process.exit(1);
  }
};

runSeeding();
