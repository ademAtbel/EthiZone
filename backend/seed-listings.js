const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/User');
const Listing = require('./models/Listing');
const Category = require('./models/Category');

const MOCK_PASSWORD = 'testpassword123';

const seed = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/etizone1';
    console.log('Connecting to database:', mongoUri);
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB successfully!');

    // Clear out old listings to prevent duplicates
    await Listing.deleteMany({});
    console.log('Cleared all old listings.');

    // Clear out mock users (keep super_admin)
    const result = await User.deleteMany({ role: { $ne: 'super_admin' } });
    console.log(`Cleared ${result.deletedCount} non-admin users.`);

    // Helper to hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(MOCK_PASSWORD, salt);

    // 1. Create Mock Users/Profiles for each role & businessType
    console.log('Seeding mock users...');

    const usersData = [
      {
        username: 'Abebe used items',
        email: 'abebe.individual@ethizone.com',
        password: hashedPassword,
        phone: '+251911223344',
        role: 'individual',
        status: 'active',
        description: 'Selling gently used high-quality items from my home.',
      },
      {
        username: 'Tariku Plumbing',
        email: 'tariku.plumber@ethizone.com',
        password: hashedPassword,
        phone: '+251911445566',
        role: 'handyman',
        status: 'active',
        description: 'Certified plumber with 8+ years of residential repair experience.',
        isOnline: true,
      },
      {
        username: 'Premium Coffee & Tech Store',
        email: 'coffee.store@ethizone.com',
        password: hashedPassword,
        phone: '+251911778899',
        role: 'business',
        businessType: 'store',
        category: 'Grocery Store',
        storeName: 'Premium Coffee & Tech Store',
        description: 'Your one-stop shop for organic Ethiopian coffee and premium electronics.',
        storeLogo: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=150&h=150&q=80',
        storeImage: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80',
      },
      {
        username: 'Almaz Consulting Group',
        email: 'almaz.consulting@ethizone.com',
        password: hashedPassword,
        phone: '+251911556677',
        role: 'business',
        businessType: 'service',
        category: 'Consulting Firm',
        storeName: 'Almaz Consulting Group',
        description: 'Professional auditing, accounting, tax advice, and management consultation services.',
        storeImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      },
      {
        username: 'TechZone Corporation',
        email: 'jobs.techzone@ethizone.com',
        password: hashedPassword,
        phone: '+251911990011',
        role: 'business',
        businessType: 'organization',
        category: 'Tech Corporation',
        storeName: 'TechZone Corporation',
        description: 'Innovative software house hiring top tech talents and builders.',
        storeImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      },
      {
        username: 'Addis Real Estate Ltd',
        email: 'addis.homes@ethizone.com',
        password: hashedPassword,
        phone: '+251911883311',
        role: 'business',
        businessType: 'real_estate',
        category: 'Residential Homes',
        storeName: 'Addis Real Estate Ltd',
        description: 'Your premier guide to renting and buying modern apartments and villas in Addis Ababa.',
        storeImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      },
      {
        username: 'Abyssinia Motors',
        email: 'abyssinia.motors@ethizone.com',
        password: hashedPassword,
        phone: '+251911667722',
        role: 'business',
        businessType: 'automotive',
        category: 'Used Car Dealership',
        storeName: 'Abyssinia Motors',
        description: 'Quality pre-owned vehicles and premium car rental services.',
        storeImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      }
    ];

    const seededUsers = [];
    for (const u of usersData) {
      const user = new User(u);
      await user.save();
      seededUsers.push(user);
      console.log(`Seeded user: ${user.username} (${user.role}${user.businessType ? ' - ' + user.businessType : ''})`);
    }

    // Helper function to find seeded user by role/businessType
    const getUser = (role, bType = null) => {
      return seededUsers.find(u => u.role === role && (!bType || u.businessType === bType));
    };

    console.log('Seeding listings...');

    const listingsData = [
      // 1. PERSONAL ITEM LISTINGS
      {
        ownerId: getUser('individual')._id,
        ownerName: getUser('individual').username,
        ownerPhone: getUser('individual').phone,
        type: 'personal_item',
        category: 'Boutique',
        title: 'Vintage Brown Leather Bomber Jacket',
        description: 'Authentic warm leather jacket, size L. Excellent condition with zero scratches. Perfect for cool evenings.',
        price: 120,
        images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'],
      },
      {
        ownerId: getUser('individual')._id,
        ownerName: getUser('individual').username,
        ownerPhone: getUser('individual').phone,
        type: 'personal_item',
        category: 'Electronics Shop',
        title: 'Lightly Used Mechanical Keyboard',
        description: 'Custom keycaps, RGB backlighting, clicky blue switches. Works perfectly, selling because I upgraded.',
        price: 45,
        images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'],
      },

      // 2. HANDYMAN SKILL LISTINGS
      {
        ownerId: getUser('handyman')._id,
        ownerName: getUser('handyman').username,
        ownerPhone: getUser('handyman').phone,
        type: 'handyman_skill',
        category: 'Plumbing',
        title: 'Professional Leak Detection & Clog Removal',
        description: 'Fast and reliable plumbing services including pipe repairs, faucet installation, sink clogs, and water heater troubleshooting.',
        price: 45,
        metadata: {
          handymanRates: '$45/hr',
          availability: 'Available Today'
        }
      },
      {
        ownerId: getUser('handyman')._id,
        ownerName: getUser('handyman').username,
        ownerPhone: getUser('handyman').phone,
        type: 'handyman_skill',
        category: 'Gardening & Landscaping',
        title: 'Lawn Mowing & Yard Cleanup Expert',
        description: 'Providing lawn trim, weed control, flower bed planting, and general garden landscaping services.',
        price: 30,
        metadata: {
          handymanRates: '$30/hr',
          availability: 'Available This Week'
        }
      },

      // 3. STORE PRODUCT LISTINGS
      {
        ownerId: getUser('business', 'store')._id,
        ownerName: getUser('business', 'store').username,
        ownerPhone: getUser('business', 'store').phone,
        type: 'store_product',
        category: 'Grocery Store',
        title: 'Organic Yirgacheffe Coffee Beans (1kg Bag)',
        description: 'Single-origin, medium roast whole coffee beans imported directly from Yirgacheffe, Ethiopia. Rich floral notes.',
        price: 28,
        images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'],
      },
      {
        ownerId: getUser('business', 'store')._id,
        ownerName: getUser('business', 'store').username,
        ownerPhone: getUser('business', 'store').phone,
        type: 'store_product',
        category: 'Electronics Shop',
        title: 'Over-Ear Active Noise-Cancelling Headphones',
        description: 'Bluetooth 5.2 wireless headphones with deep bass, comfortable memory foam ear cups, and 40 hours of playback time.',
        price: 99,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
      },

      // 4. SERVICE LISTINGS
      {
        ownerId: getUser('business', 'service')._id,
        ownerName: getUser('business', 'service').username,
        ownerPhone: getUser('business', 'service').phone,
        type: 'service',
        category: 'Tax Office',
        title: 'Annual Income Tax Filing & Bookkeeping',
        description: 'We assist startups and individuals with business tax filings, audit preparation, financial planning, and weekly bookkeeping services.',
        price: 150,
        metadata: {
          rates: '$150/session'
        }
      },
      {
        ownerId: getUser('business', 'service')._id,
        ownerName: getUser('business', 'service').username,
        ownerPhone: getUser('business', 'service').phone,
        type: 'service',
        category: 'Consulting Firm',
        title: 'Business Strategy & Growth Audit',
        description: 'Get a full corporate operations review, strategy map, and market expansion plan designed by experienced corporate analysts.',
        price: 250,
        metadata: {
          rates: '$250/consultation'
        }
      },

      // 5. JOB OPENING LISTINGS
      {
        ownerId: getUser('business', 'organization')._id,
        ownerName: getUser('business', 'organization').username,
        ownerPhone: getUser('business', 'organization').phone,
        type: 'job_opening',
        category: 'Tech Corporation',
        title: 'Senior React Developer (Remote)',
        description: 'We are seeking a talented Senior Frontend Engineer experienced in React, Tailwind CSS, and state management systems to join our product team.',
        price: 110000,
        metadata: {
          jobRequirements: ['5+ years React experience', 'Solid JavaScript/TypeScript skill', 'State management (Redux/Zustand)'],
          salaryRate: 'year'
        }
      },
      {
        ownerId: getUser('business', 'organization')._id,
        ownerName: getUser('business', 'organization').username,
        ownerPhone: getUser('business', 'organization').phone,
        type: 'job_opening',
        category: 'Other',
        title: 'Office Manager / Administrative Assistant',
        description: 'Coordinate office tasks, handle customer inquiries, manage scheduling, and assist with billing records.',
        price: 45000,
        metadata: {
          jobRequirements: ['Organized and detail-oriented', 'Proficiency in MS Office Suite', '2+ years admin experience'],
          salaryRate: 'year'
        }
      },

      // 6. HOUSE LISTINGS
      {
        ownerId: getUser('business', 'real_estate')._id,
        ownerName: getUser('business', 'real_estate').username,
        ownerPhone: getUser('business', 'real_estate').phone,
        type: 'house',
        category: 'Rental Apartments',
        title: 'Stunning Bole 3-Bedroom Penthouse Apartment',
        description: 'High-end fully furnished luxury apartment. Includes custom modular kitchen, spacious balcony, secure building parking, and elevator access.',
        price: 3200,
        metadata: {
          bedrooms: 3,
          bathrooms: 2.5,
          propertyType: 'Apartment',
          address: 'Bole Medhanialem, Addis Ababa'
        }
      },
      {
        ownerId: getUser('business', 'real_estate')._id,
        ownerName: getUser('business', 'real_estate').username,
        ownerPhone: getUser('business', 'real_estate').phone,
        type: 'house',
        category: 'Residential Homes',
        title: 'Spacious 4-Bedroom Family Villa with Garden',
        description: 'Exquisite modern house featuring a green private garden yard, high ceilings, security gate, and domestic helper quarters.',
        price: 420000,
        metadata: {
          bedrooms: 4,
          bathrooms: 4,
          propertyType: 'House',
          address: 'Old Airport, Addis Ababa'
        }
      },

      // 7. CAR LISTINGS
      {
        ownerId: getUser('business', 'automotive')._id,
        ownerName: getUser('business', 'automotive').username,
        ownerPhone: getUser('business', 'automotive').phone,
        type: 'car',
        category: 'Used Car Dealership',
        title: 'Toyota Rav4 Limited Edition (2020)',
        description: 'Extremely clean interior, hybrid engine with stellar fuel economy. Single owner, no accident history, and dealer warranty included.',
        price: 39500,
        images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'],
        metadata: {
          year: 2020,
          mileage: 18500,
          make: 'Toyota',
          model: 'Rav4'
        }
      },
      {
        ownerId: getUser('business', 'automotive')._id,
        ownerName: getUser('business', 'automotive').username,
        ownerPhone: getUser('business', 'automotive').phone,
        type: 'car',
        category: 'Car Rental Service',
        title: 'Hyundai Elantra Sedan Rental (Daily/Weekly)',
        description: 'Fuel-efficient, comfortable city sedan available for immediate lease. Fully insured with comprehensive coverage. Contact for booking.',
        price: 50,
        images: ['https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80'],
        metadata: {
          year: 2019,
          mileage: 45000,
          make: 'Hyundai',
          model: 'Elantra'
        }
      }
    ];

    for (const l of listingsData) {
      const listing = new Listing(l);
      await listing.save();
      console.log(`Seeded listing: "${listing.title}" [${listing.type}]`);
    }

    console.log('======================================================');
    console.log('🎉 SEEDING DATA COMPLETED SUCCESSFULLY!');
    console.log('🔑 All mock accounts use password: testpassword123');
    console.log('------------------------------------------------------');
    for (const u of seededUsers) {
      console.log(`📧 User: ${u.email} | Role: ${u.role} ${u.businessType ? '('+u.businessType+')' : ''}`);
    }
    console.log('======================================================');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seed();
