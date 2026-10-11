const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Delhi Eco Warrior' },
  email: { type: String, default: 'delhi.citizen@kabaadsejugaad.in' },
  colony: { type: String, default: 'Lajpat Nagar IV, South Delhi' },
  college: { type: String, default: 'Delhi Technological University (DTU)' },
  greenKarmaPoints: { type: Number, default: 420 },
  level: { type: String, default: 'Jugaad Pioneer (Level 3)' },
  scansCount: { type: Number, default: 18 },
  co2SavedKg: { type: Number, default: 24.6 },
  compostCreatedKg: { type: Number, default: 8.5 },
  moneyEarnedInr: { type: Number, default: 285 },
  badges: [{
    id: String,
    title: String,
    description: String,
    icon: String,
    unlockedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
