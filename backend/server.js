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
