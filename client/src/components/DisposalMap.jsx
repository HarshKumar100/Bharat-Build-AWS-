import React, { useState, useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  useMap 
} from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, 
  Phone, 
  Star, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Navigation, 
  Layers, 
  Coins, 
  Flame, 
  Sprout, 
  X,
  Send,
  Building2,
  Info
} from 'lucide-react';

// Fix Leaflet Default Marker icon issue in React/Vite
const KabadiwalaIcon = L.divIcon({
  className: 'custom-leaflet-icon',
  html: `<div style="background-color: #0A4D3C; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">♻️</div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34]
});

const CompostIcon = L.divIcon({
  className: 'custom-leaflet-icon',
  html: `<div style="background-color: #10B981; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">🌱</div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34]
});

const EWasteIcon = L.divIcon({
  className: 'custom-leaflet-icon',
  html: `<div style="background-color: #3B82F6; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">⚡</div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34]
});

// Component to dynamically pan and zoom map
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function DisposalMap({ lastScanResult }) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'Kabadiwala' | 'CompostPlant' | 'EWasteCenter'
  const [recyclers, setRecyclers] = useState([]);
  const [selectedRecycler, setSelectedRecycler] = useState(null);
  const [pickupModalOpen, setPickupModalOpen] = useState(false);
  const [pickupForm, setPickupForm] = useState({
    name: 'Harsh Kumar',
    address: 'Flat 402, Lajpat Nagar IV, New Delhi',
    phone: '+91 98112 45890',
    approxKg: '15 kg',
    scrapType: 'Mixed Dry Plastics & Amazon Cardboard'
  });
  const [pickupConfirmed, setPickupConfirmed] = useState(false);

  // Delhi NCR Initial Center (Connaught Place / Central Delhi)
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]);
  const [zoomLevel, setZoomLevel] = useState(11);

  // Fetch recyclers from backend or use fallback
  useEffect(() => {
    fetchRecyclers();
  }, [filterType]);

  // Auto-switch filter when a new scan result arrives
  useEffect(() => {
    if (lastScanResult) {
      if (lastScanResult.stage1Category === 'BIODEGRADABLE') {
        setFilterType('CompostPlant');
      } else {
        setFilterType('Kabadiwala');
      }
    }
  }, [lastScanResult]);

  const fetchRecyclers = async () => {
    try {
      const url = filterType === 'all' ? '/api/recyclers' : `/api/recyclers?type=${filterType}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        setRecyclers(json.data);
      } else {
        setRecyclers(fallbackDelhiRecyclers);
      }
    } catch (e) {
      setRecyclers(fallbackDelhiRecyclers);
    }
  };

  const fallbackDelhiRecyclers = [
    {
      _id: '1',
      name: 'Ramesh Scrap Recycling Hub',
      type: 'Kabadiwala',
      tagline: 'Trusted scrap recycling dealer for 14+ years in South Delhi',
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
      distanceKm: '1.2 km away'
    },
    {
      _id: '2',
      name: 'Gupta Circular Scrap Traders',
      type: 'Kabadiwala',
      tagline: 'Instant digital UPI payment & certified electronic scales',
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
      distanceKm: '3.8 km away'
    },
    {
      _id: '3',
      name: 'Rohini Sector-14 Eco-Recycling Center',
      type: 'Kabadiwala',
      tagline: 'Bulk packaging carton & PET bottle processing hub',
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
      distanceKm: '7.4 km away'
    },
    {
      _id: '4',
      name: 'Mayapuri Green E-Waste Dismantlers',
      type: 'EWasteCenter',
      tagline: 'Authorized e-waste recycler & precious metal recovery',
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
      distanceKm: '5.6 km away'
    },
    {
      _id: '5',
      name: 'Okhla Decentralized Compost Facility',
      type: 'CompostPlant',
      tagline: 'Converts municipal organic wet waste into nutrient-rich organic bio-fertilizer',
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
      distanceKm: '2.1 km away'
    },
    {
      _id: '6',
      name: 'Azadpur APMC Organic Bio-Methanation Plant',
      type: 'CompostPlant',
      tagline: 'Processes fruit & vegetable wholesale market residue into slurry bio-fertilizer',
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
      distanceKm: '6.9 km away'
    },
    {
      _id: '7',
      name: 'Ghazipur Community Vermicomposting Unit',
      type: 'CompostPlant',
      tagline: 'Bio-fertilizer facility preventing organic matter from burning on landfill',
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
      distanceKm: '8.3 km away'
    }
  ];

  const displayedRecyclers = recyclers.filter(r => {
    if (filterType === 'all') return true;
    return r.type === filterType;
  });

  const getMarkerIcon = (type) => {
    if (type === 'CompostPlant') return CompostIcon;
    if (type === 'EWasteCenter') return EWasteIcon;
    return KabadiwalaIcon;
  };

  const handleSelectRecycler = (recycler) => {
    setSelectedRecycler(recycler);
    setMapCenter([recycler.lat, recycler.lng]);
    setZoomLevel(14);
  };

  const handleBookPickup = (recycler) => {
    setSelectedRecycler(recycler);
    setPickupModalOpen(true);
    setPickupConfirmed(false);
  };

  const handleConfirmPickup = (e) => {
    e.preventDefault();
    setPickupConfirmed(true);
    setTimeout(() => {
      setPickupModalOpen(false);
    }, 2500);
  };

  return (
    <section id="map" className="py-16 lg:py-24 relative bg-[#050E08] border-t border-b border-emerald-500/15 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Delhi Waste Disposal Network
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Connecting citizens directly with verified local recycling centers, scrap processors, and decentralized compost facilities across Delhi NCR.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Centers (7)', icon: Layers },
              { id: 'Kabadiwala', label: 'Local Scrap Recyclers (4)', icon: Coins, highlight: true },
              { id: 'CompostPlant', label: 'Decentralized Compost Plants (3)', icon: Sprout },
              { id: 'EWasteCenter', label: 'E-Waste Facilities (1)', icon: Building2 },
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = filterType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00C853] text-black shadow-[0_0_20px_rgba(0,200,83,0.4)] font-black scale-102'
                      : 'glass-card bg-[#0A1A10]/70 text-slate-300 border border-emerald-500/20 hover:border-emerald-400 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-[#FF9100]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-emerald-400/80 font-mono flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-[#00C853] animate-ping"></span>
            <span>AWS Location Service Ready</span>
          </div>
        </div>

        {/* Map & Recycler Cards Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Interactive Leaflet Map (7 cols) */}
          <div className="lg:col-span-7 h-[540px] rounded-3xl overflow-hidden border border-emerald-500/25 shadow-2xl relative shadow-emerald-950/40">
            <MapContainer
              center={mapCenter}
              zoom={zoomLevel}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <ChangeView center={mapCenter} zoom={zoomLevel} />
              
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {displayedRecyclers.map((recycler) => (
                <Marker
                  key={recycler._id}
                  position={[recycler.lat, recycler.lng]}
                  icon={getMarkerIcon(recycler.type)}
                  eventHandlers={{
                    click: () => handleSelectRecycler(recycler)
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-1 max-w-[220px]">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 uppercase block w-fit mb-1 border border-emerald-500/30">
                        {recycler.type}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {recycler.name}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-1">
                        {recycler.area}
                      </p>
                      <div className="mt-2 text-xs font-bold text-[#FF6D00]">
                        📞 {recycler.phone}
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500">
                        Plastic: ₹{recycler.scrapRates.plasticPerKg}/kg • Iron: ₹{recycler.scrapRates.ironPerKg}/kg
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Map Legend Overlay */}
            <div className="absolute bottom-4 left-4 z-[400] bg-[#050E08]/90 backdrop-blur-xl p-3.5 rounded-2xl border border-emerald-500/25 shadow-2xl text-[11px] space-y-1.5 text-slate-200">
              <div className="flex items-center gap-2 font-bold">
                <span className="w-3 h-3 rounded-full bg-[#00C853] inline-block shadow-[0_0_8px_#00C853]"></span>
                <span>Local Scrap Recyclers</span>
              </div>
              <div className="flex items-center gap-2 font-bold">
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block shadow-[0_0_8px_#34d399]"></span>
                <span>Decentralized Compost Unit</span>
              </div>
              <div className="flex items-center gap-2 font-bold">
                <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block shadow-[0_0_8px_#22d3ee]"></span>
                <span>Certified E-Waste Center</span>
              </div>
            </div>
          </div>

          {/* Recyclers List & Rate Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5 max-h-[540px] overflow-y-auto pr-1">
            {displayedRecyclers.map((item) => (
              <div
                key={item._id}
                onClick={() => handleSelectRecycler(item)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedRecycler?._id === item._id
                    ? 'bg-[#0F2318] border-[#00C853] shadow-[0_0_25px_rgba(0,200,83,0.25)] ring-1 ring-[#00C853]'
                    : 'bg-[#0A1A10]/80 backdrop-blur-xl border-emerald-500/15 hover:border-emerald-400/40 hover:bg-[#0A1A10]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>

                    <h3 className="text-sm font-black text-white mt-1.5">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.address}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-[10px] text-slate-500">({item.reviewsCount})</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 block mt-1">
                      {item.distanceKm || '1.5 km away'}
                    </span>
                  </div>
                </div>

                {/* Real-time Delhi Mandi Scrap Rates Table */}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    {item.type === 'CompostPlant' ? 'Compost Purchasing Rate:' : 'Live Delhi Market Scrap Rates:'}
                  </span>
                  
                  {item.type === 'CompostPlant' ? (
                    <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/30 text-xs font-bold text-emerald-300 flex justify-between items-center">
                      <span>Farm Compost Purchase:</span>
                      <span className="text-sm font-black text-[#00C853]">₹{item.scrapRates.compostPurchasePerKg} / kg</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-slate-400 block text-[9px]">Plastic</span>
                        <span className="font-extrabold text-[#00C853]">₹{item.scrapRates.plasticPerKg}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-slate-400 block text-[9px]">Cardboard</span>
                        <span className="font-extrabold text-[#00C853]">₹{item.scrapRates.cardboardPerKg}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-slate-400 block text-[9px]">Iron</span>
                        <span className="font-extrabold text-[#00C853]">₹{item.scrapRates.ironPerKg}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-slate-400 block text-[9px]">E-Waste</span>
                        <span className="font-extrabold text-[#00C853]">₹{item.scrapRates.ewastePerKg}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-3.5 pt-2 flex items-center justify-between gap-2.5">
                  <a
                    href={`tel:${item.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FF9100]" />
                    <span>Call Dealer</span>
                  </a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookPickup(item);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#FF6D00] to-[#FF9100] text-black text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(255,109,0,0.3)] hover:brightness-110 transition-all"
                  >
                    <Truck className="w-3.5 h-3.5 text-black" />
                    <span>Book Pickup</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>



      </div>

      {/* Book Doorstep Scrap Pickup Modal */}
      {pickupModalOpen && selectedRecycler && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0A1A10] rounded-3xl p-6 sm:p-7 max-w-md w-full border border-emerald-500/30 shadow-2xl relative text-white">
            <button
              onClick={() => setPickupModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {pickupConfirmed ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-[#00C853] text-[#00C853] mx-auto flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,200,83,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">
                  Doorstep Pickup Scheduled!
                </h3>
                <p className="text-xs text-slate-300 mt-2 max-w-xs mx-auto leading-relaxed">
                  <strong className="text-[#00C853]">{selectedRecycler.name}</strong> will arrive with a certified digital scale between 11:00 AM - 1:00 PM tomorrow. Instant UPI payout upon weighing!
                </p>
                <div className="mt-4 p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300 font-bold">
                  +50 Green Points credited to your profile!
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmPickup} className="space-y-4">
                <div>
                  <span className="text-[10px] font-black text-[#FF9100] uppercase tracking-wider block">
                    Zero Waste Pickup
                  </span>
                  <h3 className="text-lg font-black text-white">
                    Request Pickup from {selectedRecycler.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Area: {selectedRecycler.area}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupForm.name}
                    onChange={(e) => setPickupForm({ ...pickupForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-emerald-500/30 bg-[#050E08] text-xs text-white focus:outline-none focus:border-[#00C853]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Pickup Address in Delhi NCR
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupForm.address}
                    onChange={(e) => setPickupForm({ ...pickupForm, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-emerald-500/30 bg-[#050E08] text-xs text-white focus:outline-none focus:border-[#00C853]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={pickupForm.phone}
                      onChange={(e) => setPickupForm({ ...pickupForm, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-emerald-500/30 bg-[#050E08] text-xs text-white focus:outline-none focus:border-[#00C853]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Approx Waste (kg)
                    </label>
                    <input
                      type="text"
                      value={pickupForm.approxKg}
                      onChange={(e) => setPickupForm({ ...pickupForm, approxKg: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-emerald-500/30 bg-[#050E08] text-xs text-white focus:outline-none focus:border-[#00C853]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Scrap Category
                  </label>
                  <input
                    type="text"
                    value={pickupForm.scrapType}
                    onChange={(e) => setPickupForm({ ...pickupForm, scrapType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-emerald-500/30 bg-[#050E08] text-xs text-white focus:outline-none focus:border-[#00C853]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C853] to-emerald-400 hover:brightness-110 text-black font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,200,83,0.4)] transition-all"
                  >
                    <Truck className="w-4 h-4 text-black" />
                    <span>Confirm Doorstep Pickup</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
}

