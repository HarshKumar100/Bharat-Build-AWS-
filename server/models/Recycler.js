const mongoose = require('mongoose');

const recyclerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Kabadiwala', 'CompostPlant', 'EWasteCenter'], 
    required: true 
  },
  tagline: { type: String, default: 'Authorized Local Green Partner' },
  area: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 45 },
  verified: { type: Boolean, default: true },
  scrapRates: {
    plasticPerKg: { type: Number, default: 14 },
    paperPerKg: { type: Number, default: 12 },
    ironPerKg: { type: Number, default: 32 },
    cardboardPerKg: { type: Number, default: 10 },
    ewastePerKg: { type: Number, default: 65 },
    compostPurchasePerKg: { type: Number, default: 8 }
  },
  pickupAvailable: { type: Boolean, default: true },
  operatingHours: { type: String, default: '9:00 AM - 7:30 PM' },
  // AWS Location Service Placeholders for geo-fencing and route calculation
  awsPlaceIndexId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recycler', recyclerSchema);
