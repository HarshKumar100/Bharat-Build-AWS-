require('dotenv').config();
const dns = require('dns');
try { dns.setServers(['8.8.8.8', '8.8.4.4']); } catch (e) {}
const mongoose = require('mongoose');
const Recycler = require('./models/Recycler');
const User = require('./models/User');
const WasteScan = require('./models/WasteScan');

const MONGODB_URI = process.env.MONGODB_URI;

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully!');

    // Clear existing collections for fresh seed
    await Recycler.deleteMany({});
    await User.deleteMany({});
    await WasteScan.deleteMany({});
    console.log('Cleared existing records.');

    // 1. Seed Recyclers & Kabadiwalas across Delhi NCR
    const recyclers = [
      {
        name: 'Ramesh Kabadiwala & Scrap Hub',
        type: 'Kabadiwala',
        tagline: 'Trusted informal recycler for 14+ years in South Delhi',
        area: 'Lajpat Nagar IV, South Delhi',
        address: 'Shop No. 12, Behind Central Market, Lajpat Nagar IV, New Delhi 110024',
        phone: '+91 98112 45890',
        lat: 28.5678,
        lng: 77.2433,
        rating: 4.9,
        reviewsCount: 88,
        verified: true,
        scrapRates: {
          plasticPerKg: 15,
          paperPerKg: 12,
          ironPerKg: 34,
          cardboardPerKg: 11,
          ewastePerKg: 65,
          compostPurchasePerKg: 0
        },
        pickupAvailable: true,
        operatingHours: '8:30 AM - 8:00 PM',
        awsPlaceIndexId: 'DELHI-NCR-SOUTH-001'
      },
      {
        name: 'Gupta Ji Circular Scrap Traders',
        type: 'Kabadiwala',
        tagline: 'Instant digital UPI payment & accurate digital scale',
        area: 'Karol Bagh, Central Delhi',
        address: 'Plot 4, Block 16, WEA, Karol Bagh, New Delhi 110005',
        phone: '+91 98731 22910',
        lat: 28.6517,
        lng: 77.1906,
        rating: 4.8,
        reviewsCount: 64,
        verified: true,
        scrapRates: {
          plasticPerKg: 16,
          paperPerKg: 13,
          ironPerKg: 35,
          cardboardPerKg: 12,
          ewastePerKg: 70,
          compostPurchasePerKg: 0
        },
        pickupAvailable: true,
        operatingHours: '9:00 AM - 7:30 PM',
        awsPlaceIndexId: 'DELHI-NCR-CENTRAL-002'
      },
      {
        name: 'Rohini Sector-14 Eco-Kabadi Kendra',
        type: 'Kabadiwala',
        tagline: 'Specialist in bulk packaging cardboard & pet bottles',
        area: 'Rohini Sector 14, North-West Delhi',
        address: 'Near Mother Dairy Booth, Sector 14, Rohini, New Delhi 110085',
        phone: '+91 99580 88231',
        lat: 28.7159,
        lng: 77.1264,
        rating: 4.7,
        reviewsCount: 42,
        verified: true,
        scrapRates: {
          plasticPerKg: 14,
          paperPerKg: 11,
          ironPerKg: 32,
          cardboardPerKg: 10,
          ewastePerKg: 60,
          compostPurchasePerKg: 0
        },
        pickupAvailable: true,
        operatingHours: '9:30 AM - 7:00 PM',
        awsPlaceIndexId: 'DELHI-NCR-NW-003'
      },
      {
        name: 'Mayapuri Green E-Waste & Metal Recyclers',
        type: 'EWasteCenter',
        tagline: 'Authorized e-waste dismantler & certified precious metal recovery',
        area: 'Mayapuri Phase 2, West Delhi',
        address: 'B-82, Industrial Area Phase II, Mayapuri, New Delhi 110064',
        phone: '+91 98104 77612',
        lat: 28.6328,
        lng: 77.1187,
        rating: 4.9,
        reviewsCount: 110,
        verified: true,
        scrapRates: {
          plasticPerKg: 12,
          paperPerKg: 10,
          ironPerKg: 36,
          cardboardPerKg: 9,
          ewastePerKg: 95,
          compostPurchasePerKg: 0
        },
        pickupAvailable: true,
        operatingHours: '10:00 AM - 6:30 PM',
        awsPlaceIndexId: 'DELHI-NCR-WEST-004'
      },
      {
        name: 'Okhla Decentralized Compost & Bio-Fertilizer Yard',
        type: 'CompostPlant',
        tagline: 'Converts municipal organic wet waste into nutrient-dense farm Khad',
        area: 'Okhla Industrial Area Phase 1, South Delhi',
        address: 'Gate 3, Near Okhla Waste-to-Energy Plant, New Delhi 110020',
        phone: '+91 11 2681 4455',
        lat: 28.5284,
        lng: 77.2842,
        rating: 4.9,
        reviewsCount: 140,
        verified: true,
        scrapRates: {
          plasticPerKg: 0,
          paperPerKg: 0,
          ironPerKg: 0,
          cardboardPerKg: 0,
          ewastePerKg: 0,
          compostPurchasePerKg: 10
        },
        pickupAvailable: true,
        operatingHours: '7:00 AM - 6:00 PM',
        awsPlaceIndexId: 'DELHI-NCR-COMPOST-001'
      },
      {
        name: 'Azadpur APMC Organic Bio-Methanation Facility',
        type: 'CompostPlant',
        tagline: 'Processes vegetable & fruit residue into slurry fertilizer and biogas',
        area: 'Azadpur Mandi, North Delhi',
        address: 'Near Shed 4, Wholesale Fruit Market, Azadpur, New Delhi 110033',
        phone: '+91 11 2767 1190',
        lat: 28.7067,
        lng: 77.1789,
        rating: 4.8,
        reviewsCount: 95,
        verified: true,
        scrapRates: {
          plasticPerKg: 0,
          paperPerKg: 0,
          ironPerKg: 0,
          cardboardPerKg: 0,
          ewastePerKg: 0,
          compostPurchasePerKg: 8
        },
        pickupAvailable: true,
        operatingHours: '6:00 AM - 5:00 PM',
        awsPlaceIndexId: 'DELHI-NCR-COMPOST-002'
      },
      {
        name: 'Ghazipur Community Vermicomposting Unit',
        type: 'CompostPlant',
        tagline: 'High-grade earthworm vermicompost for Delhi parks and urban gardening',
        area: 'Ghazipur Border, East Delhi',
        address: 'Near Ghazipur Dairy Farm, New Delhi 110096',
        phone: '+91 99110 54321',
        lat: 28.6258,
        lng: 77.3328,
        rating: 4.7,
        reviewsCount: 57,
        verified: true,
        scrapRates: {
          plasticPerKg: 0,
          paperPerKg: 0,
          ironPerKg: 0,
          cardboardPerKg: 0,
          ewastePerKg: 0,
          compostPurchasePerKg: 12
        },
        pickupAvailable: true,
        operatingHours: '8:00 AM - 6:00 PM',
        awsPlaceIndexId: 'DELHI-NCR-COMPOST-003'
      }
    ];

    await Recycler.insertMany(recyclers);
    console.log(`Seeded ${recyclers.length} Delhi recyclers & compost units!`);

    // 2. Seed Default User with Gamification Badges
    const user = await User.create({
      name: 'Aarav Sharma',
      email: 'aarav.sharma@dtu.ac.in',
      colony: 'Lajpat Nagar IV, South Delhi',
      college: 'Delhi Technological University (DTU)',
      greenKarmaPoints: 680,
      level: 'Jugaad Master (Level 4)',
      scansCount: 26,
      co2SavedKg: 38.4,
      compostCreatedKg: 14.2,
      moneyEarnedInr: 430,
      badges: [
        {
          id: 'b1',
          title: 'Zero Waste Delhi Pioneer',
          description: 'Segregated first 10 items accurately',
          icon: 'Sparkles'
        },
        {
          id: 'b2',
          title: 'Kabadiwala Ally',
          description: 'Sold 15kg recyclable plastics to local informal scrap dealer',
          icon: 'Handshake'
        },
        {
          id: 'b3',
          title: 'Green Soil Creator',
          description: 'Diverted 10kg kitchen waste to aerobic composting',
          icon: 'Sprout'
        },
        {
          id: 'b4',
          title: 'Upcycling Prodigy',
          description: 'Implemented 3 DIY Jugaad ideas using AI Reuse Guru',
          icon: 'Flame'
        }
      ]
    });
    console.log(`Seeded primary user: ${user.name}`);

    // 3. Seed Sample Scans
    const sampleScans = [
      {
        title: 'PET Mineral Water Bottle (500ml)',
        imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=80',
        source: 'image',
        stage1Category: 'NON-BIODEGRADABLE',
        stage2SubCategory: 'Plastic',
        confidenceScore: 94.2,
        carbonSavedKg: 0.18,
        fertilizerPotentialKg: 0,
        recycleValueInr: 1.5,
        ratePerKgInr: 15,
        upcycleTips: [
          'Cut bottom to build a drip-irrigation self-watering plant pot for balconies',
          'Punch holes in cap to make a gentle indoor garden sprinkler',
          'Slice diagonally to create an instant dustpan or funnel'
        ],
        disposalRecommendation: 'Rinse, crush flat to save space, and hand over to Ramesh Kabadiwala for ₹15/kg.',
        recommendedRecyclerType: 'Kabadiwala'
      },
      {
        title: 'Kitchen Organic Waste (Banana & Vegetable Peels)',
        imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
        source: 'camera',
        stage1Category: 'BIODEGRADABLE',
        stage2SubCategory: 'Organic',
        confidenceScore: 96.8,
        carbonSavedKg: 0.85,
        fertilizerPotentialKg: 0.9,
        recycleValueInr: 9.0,
        ratePerKgInr: 10,
        upcycleTips: [
          'Soak banana peels in water for 48 hours to make potassium-rich organic plant tea',
          'Blend vegetable peels and mix with dry coco-peat for fast odorless pot composting',
          'Use citrus rinds with vinegar to create natural bio-enzyme counter disinfectant'
        ],
        disposalRecommendation: 'Drop into green home compost bin or send to Okhla Bio-Fertilizer Yard.',
        recommendedRecyclerType: 'CompostPlant'
      },
      {
        title: 'Corrugated E-commerce Delivery Carton',
        imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80',
        source: 'text',
        inputText: 'Flipkart Amazon brown cardboard box',
        stage1Category: 'NON-BIODEGRADABLE',
        stage2SubCategory: 'Cardboard',
        confidenceScore: 91.4,
        carbonSavedKg: 0.42,
        fertilizerPotentialKg: 0.2,
        recycleValueInr: 6.0,
        ratePerKgInr: 11,
        upcycleTips: [
          'Flatten as weed barrier sheet under garden mulch',
          'Fold into desk cable-organizer dividers or shoe rack tiers',
          'Line with old cloth for cat scratcher and cozy pet bed'
        ],
        disposalRecommendation: 'Remove plastic tape, flatten, bundle together. Kabadiwala pays ₹11/kg.',
        recommendedRecyclerType: 'Kabadiwala'
      }
    ];

    await WasteScan.insertMany(sampleScans);
    console.log(`Seeded ${sampleScans.length} sample waste scans.`);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

seedData();
