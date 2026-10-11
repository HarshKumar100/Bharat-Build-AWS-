const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const uri = 'mongodb+srv://hk102004_db_user:8uj6GEkm1ANZ3gki@cluster0.uibhgya.mongodb.net/kabaad_se_jugaad?retryWrites=true&w=majority&appName=Cluster0';

console.log('Testing with Google DNS...');
mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('SUCCESS: Connected to Atlas!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Atlas connection error:', err.message);
    process.exit(1);
  });
