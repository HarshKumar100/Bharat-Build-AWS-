require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('ERROR: MONGODB_URI is not set in .env');
  process.exit(1);
}

console.log('Testing MongoDB Atlas connection with Google DNS...');
mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('SUCCESS: Connected to Atlas!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Atlas connection error:', err.message);
    process.exit(1);
  });
