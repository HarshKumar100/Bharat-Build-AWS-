const mongoose = require('mongoose');

const wasteScanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  // AWS S3 Object Key: Reference for AWS cloud storage
  s3Key: { type: String, default: null },
  source: { type: String, enum: ['image', 'camera', 'text', 'upload', 'preset'], default: 'image' },
  inputText: { type: String, default: '' },
  // 2-Stage Result Breakdown
  stage1Category: { 
    type: String, 
    enum: ['BIODEGRADABLE', 'NON-BIODEGRADABLE'], 
    required: true 
  },
  stage2SubCategory: { 
    type: String, 
    enum: ['Plastic', 'Paper', 'Metal', 'Glass', 'E-Waste', 'Cardboard', 'Organic'], 
    required: true 
  },
  confidenceScore: { type: Number, default: 92.5 }, // Benchmarked on EfficientNetB0 Kaggle Waste Dataset
  // Ecological and financial value metrics
  carbonSavedKg: { type: Number, default: 0 },
  fertilizerPotentialKg: { type: Number, default: 0 },
  recycleValueInr: { type: Number, default: 0 },
  ratePerKgInr: { type: Number, default: 0 },
  // Upcycling & Jugaad AI Suggestions
  upcycleTips: [{ type: String }],
  disposalRecommendation: { type: String },
  recommendedRecyclerType: { 
    type: String, 
    enum: ['Kabadiwala', 'CompostPlant', 'EWasteCenter'],
    default: 'Kabadiwala'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WasteScan', wasteScanSchema);
