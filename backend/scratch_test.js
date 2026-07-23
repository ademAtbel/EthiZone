const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
const User = require('./models/User');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ethizone');
  console.log('Connected to DB');
  
  const users = await User.find({ role: 'business' });
  users.forEach(u => {
    console.log(`User: ${u.username}, StoreName: ${u.storeName}, Slug: ${u.storeSlug}`);
    console.log(`- galleryPhotos:`, u.galleryPhotos);
    console.log(`- socialLinks:`, u.socialLinks);
  });
  
  await mongoose.disconnect();
};

run();
