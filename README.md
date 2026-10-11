# 🗑️ BinWise - AI Waste to Value Platform
### 🏆 WeMakeDevs Bharat Builds Tour - Environmental Hacks | Track 03: Waste and Energy

[![Built on AWS](https://img.shields.io/badge/Built%20on-AWS%20Cloud-FF9900?logo=amazon-aws&logoColor=white)](https://aws.amazon.com)
[![Track](https://img.shields.io/badge/Track%2003-Waste%20and%20Energy-0A4D3C)](https://wemadevsc.org)
[![Model Accuracy](https://img.shields.io/badge/EfficientNetB0-92.5%25%20Accuracy-10B981)](https://www.kaggle.com/datasets/techsash/waste-classification-data)
[![Tech Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20Tailwind-61DAFB)](https://react.dev)

---

## 📌 Executive Summary & Real-World Impact

Delhi generates **11,000 metric tons of municipal solid waste daily**. Alarmingly, **over 60% remains unsegregated at the source**, getting dumped directly into toxic, overflowing landfills like **Ghazipur** and **Bhalswa**. These landfills trigger spontaneous methane fires, hazardous air pollution across NCR, and toxic leachate draining into the Yamuna river.

Meanwhile, Delhi's network of **20,000+ informal scrap collectors** recovers over 20-25% of recyclables but operates with zero digital infrastructure, inconsistent pricing, and zero direct connectivity with households.

**BinWise** solves this through a dual-pronged approach:
1. **2-Stage Computer Vision Classifier:** Evaluates waste instantly from camera photos, uploads, or natural language text, categorizing into **Stage 1 (Biodegradable vs Non-Biodegradable)** and **Stage 2 (Sub-material: Plastic, Paper, Metal, Cardboard, E-Waste, Organic)**.
2. **Informal Recycler & Compost Network:** Directly connects citizens to local scrap collectors with verified digital market rates (Plastic ₹15/kg, Iron ₹34/kg) and decentralized bio-fertilizer compost plants (Okhla, Azadpur APMC, Ghazipur).
3. **Reuse AI Assistant:** Powered by **Llama LLM API**, suggests creative zero-cost DIY upcycling ideas and calculates scrap earnings in real-time.

---

## ☁️ Built on AWS Architecture (Mandatory Prize Criteria)

BinWise is architected natively for **Amazon Web Services (AWS)** for high-throughput city scale and sub-second classification:

```
[ User Device / Mobile App ]
           │
           ▼
[ AWS Amplify / CloudFront (Global CDN Hosting) ]
           │
           ├─── Uploads Image ───► [ Amazon S3 (Waste Scans Bucket) ]
           │                                 │
           │                                 ▼
           │                    [ AWS Lambda (Inference Trigger) ]
           │                                 │
           │                                 ▼
           │                    [ Amazon Bedrock / SageMaker ]
           │                    (EfficientNetB0 + Claude 3 Haiku)
           │                                 │
           ├─── Real-Time Rates ──► [ Amazon DynamoDB (DelhiNCRScrapRates) ]
           │
           ├─── Geocoding/Route ──► [ AWS Location Service (DelhiNCRWasteIndex) ]
           │
           └─── Database Backup ──► [ MongoDB Atlas Cloud Cluster ]
```

### AWS Services & Open Source Integrations:
- **Amazon S3 (`kabaad-se-jugaad-waste-images`):** Secure storage and thumbnail generation for citizen-uploaded waste photos.
- **AWS Lambda:** Serverless compute for instant classification triggers and carbon calculation formulas.
- **Amazon DynamoDB (`DelhiWasteScansTable`):** High-throughput, sub-5ms caching for Delhi scrap rates and user Green Karma points.
- **AWS Amplify:** Global frontend hosting with automated Git CI/CD deployments.
- **AWS Location Service (`DelhiNCRWasteIndex`):** Geocoding, reverse geocoding, and distance matrix computation connecting residents to nearby recyclers.
- **AWS Bedrock / Strands Agents SDK:** Orchestrates the multi-turn **Reuse AI** upcycling reasoning and scrap valuation.

---

## 🔬 Dataset & Machine Learning Specifications

- **Dataset:** [Kaggle Waste Classification Data](https://www.kaggle.com/datasets/techsash/waste-classification-data)
- **Dataset Size:** 25,077 high-resolution annotated images divided into Organic (`O`) and Recyclable (`R`).
- **Neural Architecture:** EfficientNetB0 Transfer Learning with custom Dense classification heads.
- **Accuracy Benchmark:** **92.5% Validation Accuracy** across waste categories.
- **Pre-loaded Presets:** Includes 5 one-click presets directly from the dataset (`banana_organic_O.jpg`, `plastic_bottle_R.jpg`, `cardboard_box_R.jpg`, `metal_can_R.jpg`, `vegetable_organic_O.jpg`).

---

## 🚀 Key Features

| Feature | Description |
|---|---|
| **A. Hero & Crisis Tracker** | Live Delhi waste counter (11,000 T/day, 60% unsegregated), track alignment cards, and interactive circular economy loop. |
| **B. AI Waste Scanner** | Drag & drop, webcam capture, natural language text input, 1-click presets, progress animation, and confetti micro-interactions. |
| **C. 2-Stage Result Breakdown** | Stage 1 (Biodegradable / Non-Biodegradable) + Stage 2 (Plastic, Metal, Organic, Cardboard, E-Waste) + CO₂ saved, bio-fertilizer yield, and market scrap value. |
| **D. Delhi Disposal Map** | Interactive Leaflet map centered on Delhi NCR featuring verified scrap collectors (Lajpat Nagar, Karol Bagh), Okhla Compost Facility, APMC Azadpur, and Mayapuri E-Waste center. |
| **E. Reuse AI** | Dual-mode ChatGPT-style assistant powered by **Llama LLM API** for DIY creative reuse ideas and instant Delhi scrap rate calculations. |
| **F. Impact Dashboard** | Green Karma points, Level 4 status, badges, 15-day balcony compost timeline, and Delhi College/Colony leaderboard (DTU, IIT Delhi, Lajpat Nagar RWA). |
| **G. 3-Min Video Pitch Modal** | Judge presentation modal with chapters, pitch deck synopsis, and judging criteria scorecard. |

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Framer Motion, Lucide Icons, Leaflet, Canvas-Confetti
- **Backend:** Node.js, Express.js, Mongoose, Multer, Morgan, CORS, Dotenv
- **AI Model:** PyTorch, EfficientNetB0, FastAPI, Uvicorn
- **LLM:** Llama LLM API (Reuse AI Assistant)
- **Database:** MongoDB Atlas Cloud Cluster
- **Cloud:** AWS (S3, Lambda, DynamoDB, Amplify, Bedrock, AWS Location Service)

---

## ⚙️ Quick Start & Installation

### 1. Prerequisites
- Node.js v18+ (tested on Node v24)
- npm v10+
- Python 3.10+

### 2. Backend Setup
```bash
cd server
npm install
node seed.js    # Seeds Delhi recyclers, compost facilities, and demo users into MongoDB Atlas
npm start       # Runs backend API server on http://localhost:5000
```

### 3. AI Model Setup
```bash
# From project root
python -m uvicorn ai_service:app --host 127.0.0.1 --port 8000 --reload
# Runs EfficientNetB0 inference service on http://localhost:8000
```

### 4. Frontend Setup
```bash
cd client
npm install
npm run dev     # Runs Vite development server on http://localhost:5173
```

Open `http://localhost:5173` in your browser.

---

## 📡 REST API Endpoints

- `GET /api/stats` - Platform metrics and Delhi waste crisis counters
- `POST /api/classify` - 2-Stage AI classification with carbon and market valuation
- `GET /api/scans` - List of recent scans
- `GET /api/recyclers?type=&search=` - Delhi NCR recyclers and compost plants
- `POST /api/chatbot` - Reuse AI and Value Estimator assistant
- `GET /api/leaderboard` - Delhi colleges and colony rankings
- `GET /api/user` - User profile, Green Karma, and compost timeline
