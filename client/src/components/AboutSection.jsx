import React from 'react';
import { ArrowUpRight, Sparkles, MapPin, Bot, Trophy } from 'lucide-react';

export default function AboutSection({ onNavigate }) {
  const services = [
    {
      id: 'scanner',
      title: 'AI Waste Scanner',
      subtitle: 'EfficientNetB0 Vision',
      desc: 'Instant 2-stage neural vision segregating organic vs recyclable items with 92.5%+ accuracy trained on 25k waste photos.',
      icon: Sparkles,
      tag: 'Feature 01',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      id: 'map',
      title: 'Recycler & Disposal Map',
      subtitle: '20,000+ Verified Recyclers',
      desc: 'Real-time geo-located network of local scrap dealers, bio-compost centers, and certified e-waste facilities with live recycling rates.',
      icon: MapPin,
      tag: 'Feature 02',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: 'chatbot',
      title: 'Upcycling AI Assistant',
      subtitle: 'LLM Circular Economy',
      desc: 'Interactive AI providing creative DIY upcycling ideas for plastic bottles, clothes, cardboard, and organic composting guides.',
      icon: Bot,
      tag: 'Feature 03',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      id: 'impact',
      title: 'Impact & Leaderboard',
      subtitle: 'Gamified Carbon Savings',
      desc: 'Track your CO₂ savings, manage compost batches, and compete with other users on the community leaderboard.',
      icon: Trophy,
      tag: 'Feature 04',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    },
  ];

  const stats = [
    { value: '11,000 T', label: 'Daily Urban Waste', note: 'diverted from overflowing landfills' },
    { value: '60%+', label: 'Unsegregated Waste', note: 'tackled via 2-stage neural vision' },
    { value: '20,000+', label: 'Registered Recyclers', note: 'digitally connected with live pricing' },
    { value: '92.5%', label: 'AI Accuracy', note: 'trained on Kaggle 25k dataset' },
  ];

  return (
    <section className="py-6 sm:py-10">
      {/* Section Header */}
      <div className="mb-10 pb-6 border-b border-slate-100">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-700 block mb-2">
          ABOUT US
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight max-w-2xl">
          Turning Waste Into <span className="text-emerald-700">Sustainable Resources</span>
        </h2>
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
          Every day, cities generate thousands of tons of unsegregated waste that end up in overflowing landfills. 
          BinWise creates a hyper-localized circular economy connecting households, AI vision, and local recyclers.
        </p>
      </div>

      {/* Services Grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Our Services
          </h3>
          <span className="text-xs font-semibold text-slate-400">
            Click a service to explore
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="group relative p-6 sm:p-7 rounded-3xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 hover:border-emerald-300 transition-all shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.tag}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-md flex items-center justify-center text-slate-800 group-hover:text-emerald-600 group-hover:scale-110 transition-all border border-slate-100">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-700 mb-2">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                  <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-700">
                    Open Feature
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-slate-900 group-hover:bg-emerald-600 group-hover:text-white group-hover:rotate-45 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Impact Stats Strip */}
      <div className="p-6 sm:p-8 rounded-3xl bg-emerald-950 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, idx) => (
            <div key={idx} className="border-l-2 border-emerald-500/40 pl-4">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#a3e635] block mb-1">
                {s.value}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white">
                {s.label}
              </p>
              <p className="text-[11px] text-emerald-300/80 mt-0.5">
                {s.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
