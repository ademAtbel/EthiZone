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
    const count = await Category.countDocuments();
    if (count === 0) {
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
        { name: 'Spare Parts Dealer', type: 'automotive', description: 'Car batteries, tires, filters and engine parts retail' },

        // EVENTS
        { name: 'Entertainment', type: 'event', description: 'Concerts, festivals, standups, movie screenings' },
        { name: 'Arts & Culture', type: 'event', description: 'Museum exhibits, theaters, painting, art galleries' },
        { name: 'Religious', type: 'event', description: 'Spiritual gatherings, church, mosque services' },
        { name: 'Social', type: 'event', description: 'Meetups, parties, networking mixers, speed dating' },
        { name: 'Educational', type: 'event', description: 'Conferences, workshops, webinars, panel discussions' },
        { name: 'Sports', type: 'event', description: 'Matches, games, tournaments, marathons' },
        { name: 'Charity', type: 'event', description: 'Fundraisers, volunteer opportunities, auctions' }
      ];
      await Category.insertMany(defaults);
      console.log('Database seeded with initial categories.');
    }
  } catch (err) {
    console.error('Error seeding default categories:', err.message);
  }

  // Seed Super Admin
  try {
    const User = require('./models/User');
    const bcrypt = require('bcryptjs');
    
    const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@ethizone.com';
    const adminPass = process.env.INITIAL_ADMIN_PASSWORD || 'adminpassword123';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPass, salt);
      
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
      console.log('👑 DEFAULT SUPER ADMIN ACCOUNT INITIALIZED');
      console.log(`📧 Email: ${adminEmail}`);
      console.log('======================================================');
    }
  } catch (err) {
    console.error('Error seeding default super admin:', err.message);
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
  const productRoutes = require('./routes/products');
  const eventRoutes = require('./routes/events');
  const storesRoutes = require('./routes/stores');
  const reviewsRoutes = require('./routes/reviews');

  // Pre-load all Mongoose discriminators to register them
  require('./models/BoutiqueListing');
  require('./models/GroceryListing');
  require('./models/LiquorListing');
  require('./models/ElectronicsListing');
  require('./models/LawListing');
  require('./models/TaxListing');
  require('./models/ClinicListing');
  require('./models/ConsultingListing');
  require('./models/CleaningListing');
  require('./models/BeautyListing');
  require('./models/PersonalListing');

  // Security & Scaling Middlewares
  app.disable('x-powered-by'); // Prevent server fingerprinting

  // HTTP Security Headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // NoSQL Query & Input Sanitizer (Prevents MongoDB $gt / $ne Injection attacks)
  const sanitizeInputData = (data) => {
    if (!data || typeof data !== 'object') return data;
    if (Array.isArray(data)) {
      return data.map(sanitizeInputData);
    }
    const cleanObj = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const cleanKey = key.replace(/^\$|\./g, '');
        cleanObj[cleanKey] = sanitizeInputData(data[key]);
      }
    }
    return cleanObj;
  };

  app.use((req, res, next) => {
    if (req.body) req.body = sanitizeInputData(req.body);
    if (req.query) req.query = sanitizeInputData(req.query);
    if (req.params) req.params = sanitizeInputData(req.params);
    next();
  });

  app.use(cors({
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : '*',
    credentials: true,
    exposedHeaders: ['X-Total-Count', 'X-Total-Pages', 'X-Current-Page', 'X-Limit']
  }));
  app.use(compression()); // Compress all response bodies for optimal bandwidth usage
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Helper to bypass rate-limiting on localhost during development
  const isLocalDev = (req) => {
    if (process.env.NODE_ENV !== 'production') return true;
    const ip = req.ip || req.connection?.remoteAddress || '';
    return ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1';
  };

  // Global API Rate Limiter (Distributed Rate Limiting via Redis with Memory Fallback)
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per window in production
    standardHeaders: true,
    legacyHeaders: false,
    skip: isLocalDev,
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
  // All Rate Limiters completely disabled for testing as requested
  // app.use('/api/', apiLimiter);
  // app.use('/api/auth', authLimiter);

  // Production Uptime & Health Check Endpoint for ethizone.com
  const healthHandler = (req, res) => {
    const mongoose = require('mongoose');
    const isDbConnected = mongoose.connection.readyState === 1;
    res.status(isDbConnected ? 200 : 503).json({
      status: isDbConnected ? 'healthy' : 'unhealthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: isDbConnected ? 'connected' : 'disconnected',
      domain: 'ethizone.com'
    });
  };
  app.get('/health', healthHandler);
  app.get('/api/health', healthHandler);

  // API Route mounts
  app.use('/api/auth', authRoutes);
  app.use('/api/listings', listingRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/ratings', ratingRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/inquiries', inquiryRoutes);
  app.use('/api/chatbot', chatbotRoutes);
  app.use('/api/messages', messageRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/events', eventRoutes);
  app.use('/api/stores', storesRoutes);
  app.use('/api/reviews', reviewsRoutes);



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
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -`, err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: process.env.NODE_ENV === 'production' ? undefined : err.message });
  });

  const PORT = process.env.PORT || 5001;
  const http = require('http');
  const server = http.createServer(app);
  
  const { Server } = require('socket.io');
  const allowedOrigins = process.env.CLIENT_URL || '*';
  const io = new Server(server, {
    cors: { origin: allowedOrigins }
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
