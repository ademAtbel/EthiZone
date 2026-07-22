const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const cluster = require('cluster');
const os = require('os');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { createClient } = require('redis');
const RedisStore = require('rate-limit-redis').default;

// Load environment variables
dotenv.config();

// Seeding logic (only run in master process in production, or on startup in development)
const runSeeding = async () => {
  await connectDB();
  const Category = require('./models/Category');
  
  try {
    // Clear out previous categories to enforce the new schema with the required 'type' field
    await Category.deleteMany({});
    
    const defaults = [
      // STORES
      { name: 'Boutique', type: 'store', description: 'Clothing and apparel collection retail outlets' },
      { name: 'Pharmacy', type: 'store', description: 'Medical, healthcare products and prescription fulfillment' },
      { name: 'Liquor Store', type: 'store', description: 'Spirits, beers and wines retail store outlets' },
      { name: 'Grocery Store', type: 'store', description: 'Fresh vegetables, foods, and daily essentials retail' },
      { name: 'Electronics Shop', type: 'store', description: 'Mobiles, laptops, appliances and tech accessories' },
      { name: 'Bookstore', type: 'store', description: 'Novels, text books, stationery and prints' },

      // SERVICES
      { name: 'Law Office', type: 'service', description: 'Legal advice, consultation and representation' },
      { name: 'Tax Office', type: 'service', description: 'Tax filing, accounting and financial auditing preparation' },
      { name: 'Dental Clinic', type: 'service', description: 'Teeth cleaning, surgeries and oral healthcare' },
      { name: 'Consulting Firm', type: 'service', description: 'Corporate strategies, analysis and advice' },
      { name: 'Cleaning Agency', type: 'service', description: 'Residential, office cleaning and sanitization services' },
      { name: 'Beauty Salon', type: 'service', description: 'Hair styling, makeups, nails and spa care' },

      // ORGANIZATIONS (Hiring only)
      { name: 'Tech Corporation', type: 'organization', description: 'Software engineering, hardware manufacturing and tech services' },
      { name: 'Construction Company', type: 'organization', description: 'Civil engineering, building construction and infrastructure' },
      { name: 'Healthcare Group', type: 'organization', description: 'Hospital chains, clinical services and research' },
      { name: 'Educational Institution', type: 'organization', description: 'Universities, schools and training academies' },
      { name: 'Non-Profit Org', type: 'organization', description: 'Social charity, fundraising and volunteer setups' },
      { name: 'Other', type: 'organization', description: 'Other categories of hiring entities' },

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
  } catch (err) {
    console.error('Error seeding default categories:', err.message);
  }

  // Seed Super Admin
  try {
    const User = require('./models/User');
    const bcrypt = require('bcryptjs');
    
    const adminEmail = 'admin@ultimatemaster.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('adminpassword123', salt);
      
      const superAdmin = new User({
        username: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        phone: '5713429228',
        role: 'super_admin',
        isOnline: true,
        verificationBadge: true
      });
      
      await superAdmin.save();
      console.log('======================================================');
      console.log('👑 DEFAULT SUPER ADMIN ACCOUNT GENERATED SUCCESSFULLY');
      console.log(`📧 Email: ${adminEmail}`);
      console.log('🔑 Password: adminpassword123');
      console.log('======================================================');
    }
  } catch (err) {
    console.error('Error seeding default super admin:', err.message);
  }

  // Copy generated hero monitor image to client public folder
  try {
    const fs = require('fs');
    const src = 'C:\\Users\\addmy\\.gemini\\antigravity-ide\\brain\\316e68ee-1478-4c43-b3a1-f893ef32632f\\hero_monitor_mockup_1783150506457.png';
    const dest = 'c:\\Users\\addmy\\Desktop\\MERNMovie\\client\\public\\hero_monitor.png';
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log('✅ HEY! SUCCESS: Copied hero monitor mockup to client public folder!');
    }
  } catch (err) {
    console.error('Failed to copy mockup image in server:', err.message);
  }
};

// Determine worker count for horizontal/vertical scaling
const getWorkerCount = () => {
  if (process.env.WEB_CONCURRENCY) {
    return parseInt(process.env.WEB_CONCURRENCY, 10) || 1;
  }
  // In production container environments, it's best to run 1 worker process per container
  // and scale horizontally via Kubernetes replica pods.
  return 1;
};

const numWorkers = getWorkerCount();
const isClustered = process.env.NODE_ENV === 'production' && numWorkers > 1;

if (isClustered && cluster.isMaster) {
  console.log(`[Master Process ${process.pid}] is running. Forking ${numWorkers} worker processes...`);
  
  // Seed Database in Master process before forking workers
  runSeeding().then(() => {
    console.log(`[Master Process ${process.pid}] database seeding completed. Forking workers...`);
    for (let i = 0; i < numWorkers; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.warn(`[Worker Process ${worker.process.pid}] died (code: ${code}, signal: ${signal}). Spawning replacement...`);
      cluster.fork();
    });
  });
} else {
  // Worker processes (or Development environment running Node directly)
  const app = express();

  // Initialize Redis Client for Distributed Rate Limiting and Caching
  let redisClient = null;
  if (process.env.REDIS_URL) {
    redisClient = createClient({
      url: process.env.REDIS_URL,
      socket: {
        reconnectStrategy: (retries) => {
          console.warn(`[Worker ${process.pid}] Redis reconnecting... attempt ${retries}`);
          return Math.min(retries * 100, 3000);
        }
      }
    });
    redisClient.on('error', (err) => console.error(`[Worker ${process.pid}] Redis Client Error:`, err.message));
    redisClient.connect().catch((err) => console.error(`[Worker ${process.pid}] Redis Connection Failed:`, err.message));
  }
  
  // Attach to app.locals for access in routers
  app.locals.redisClient = redisClient;

  if (process.env.NODE_ENV !== 'production') {
    // Run db connection & seed in development synchronously
    runSeeding();
  } else {
    // In production: if not clustered, this single process runs seeding; if clustered, worker processes just connect to DB
    if (!isClustered) {
      runSeeding();
    } else {
      connectDB();
    }
  }

  // Route imports
  const authRoutes = require('./routes/auth');
  const listingRoutes = require('./routes/listings');
  const ratingRoutes = require('./routes/ratings');
  const categoryRoutes = require('./routes/categories');
  const adminRoutes = require('./routes/admin');
  const inquiryRoutes = require('./routes/inquiries');
  const chatbotRoutes = require('./routes/chatbot');
  const messageRoutes = require('./routes/messages');
  const contactRoutes = require('./routes/contact');

  // Security & Scaling Middlewares
  app.use(cors({
    exposedHeaders: ['X-Total-Count', 'X-Total-Pages', 'X-Current-Page', 'X-Limit']
  }));
  app.use(compression()); // Compress all response bodies for optimal bandwidth usage
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Global API Rate Limiter (Distributed Rate Limiting via Redis with Memory Fallback)
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    store: redisClient ? new RedisStore({
      sendCommand: async (...args) => {
        try {
          if (redisClient.isReady) {
            return await redisClient.sendCommand(args);
          }
          throw new Error('Redis client not ready');
        } catch (err) {
          console.warn('Redis rate-limit command failed, falling back to local bypass:', err.message);
          return 0; // fallback bypass
        }
      }
    }) : undefined,
    message: { message: 'Too many requests from this IP, please try again after 15 minutes.' }
  });
  app.use('/api/', apiLimiter);

  // API Route mounts
  app.use('/api/auth', authRoutes);
  app.use('/api/listings', listingRoutes);
  app.use('/api/ratings', ratingRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/inquiries', inquiryRoutes);
  app.use('/api/chatbot', chatbotRoutes);
  app.use('/api/messages', messageRoutes);
  app.use('/api/contact', contactRoutes);

  // Temporary route to create super admin
  app.get('/api/setup-admin', async (req, res) => {
    try {
      const User = require('./models/User');
      const bcrypt = require('bcryptjs');
      
      const email = 'add.belaye@gmail.com';
      const password = 'Starfm.123';
      
      let user = await User.findOne({ email });
      if (!user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
          username: 'SuperAdmin',
          email,
          password: hashedPassword,
          phone: '0000000000',
          role: 'super_admin'
        });
        await user.save();
        res.send('Super Admin created! You can now login.');
      } else {
        user.role = 'super_admin';
        user.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
        await user.save();
        res.send('Super Admin updated! Password reset and role set. You can now login.');
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  // Route to seed listings and users for all categories dynamically
  app.get('/api/seed-everything', async (req, res) => {
    try {
      const User = require('./models/User');
      const Listing = require('./models/Listing');
      const bcrypt = require('bcryptjs');

      const MOCK_PASSWORD = 'testpassword123';
      
      // Clear out old listings to prevent duplicates
      await Listing.deleteMany({});
      
      // Clear out mock users (keep super_admin)
      await User.deleteMany({ role: { $ne: 'super_admin' } });

      // Helper to hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(MOCK_PASSWORD, salt);

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
      }

      const getUser = (role, bType = null) => {
        return seededUsers.find(u => u.role === role && (!bType || u.businessType === bType));
      };

      const listingsData = [
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
      }

      res.json({
        success: true,
        message: 'Database seeded successfully with users and listings for all categories!',
        seededUsers: seededUsers.map(u => ({ email: u.email, role: u.role, businessType: u.businessType })),
        seededListingsCount: listingsData.length
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Catch-all route for undefined API endpoints
  app.use('/api/*', (req, res) => {
    res.status(404).json({ message: 'API Route Not Found' });
  });

  // Base route
  app.get('/', (req, res) => {
    res.send('Ethiozone Marketplace API running...');
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    const errorLog = `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${err.stack}\n`;
    fs.appendFileSync(path.join(__dirname, 'error.log'), errorLog);
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server', error: err.message });
  });

  const PORT = process.env.PORT || 5001;
  const http = require('http');
  const server = http.createServer(app);
  
  const { Server } = require('socket.io');
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  app.locals.io = io;

  io.on('connection', (socket) => {
    socket.on('join', (userId) => {
      socket.join(userId);
    });

    socket.on('sendMessage', (data) => {
      io.to(data.receiverId).emit('newMessage', data);
    });
  });

  server.listen(PORT, () => {
    console.log(`[Worker Process ${process.pid}] running on port ${PORT}`);
  });
}
