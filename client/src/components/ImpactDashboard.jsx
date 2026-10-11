import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ImpactDashboard({ scanCount = 28, co2Saved = 41.2, compostCreated = 15.6, moneyEarned = 460 }) {
  const [leaderboardTab, setLeaderboardTab] = useState('colleges');
  const [leaderboardData, setLeaderboardData] = useState({
    colleges: [
      { rank: 1, name: 'Delhi Technological University (DTU)', category: 'College', wasteDivertedKg: 1420, greenKarma: 8450, badge: 'Green Champion' },
      { rank: 2, name: 'IIT Delhi - Eco Club', category: 'College', wasteDivertedKg: 1290, greenKarma: 7890, badge: 'Circular Pioneer' },
      { rank: 3, name: 'Netaji Subhas Univ of Tech (NSUT)', category: 'College', wasteDivertedKg: 980, greenKarma: 6200, badge: 'Eco Tech Innovator' },
      { rank: 4, name: 'Delhi University - North Campus RWA', category: 'College', wasteDivertedKg: 850, greenKarma: 5410, badge: 'Bio-Compost Star' },
      { rank: 5, name: 'Indira Gandhi Delhi Technical Univ (IGDTUW)', category: 'College', wasteDivertedKg: 790, greenKarma: 4920, badge: 'Zero Landfill Lead' }
    ],
    colonies: [
      { rank: 1, name: 'Lajpat Nagar IV Resident Welfare (RWA)', category: 'Colony', wasteDivertedKg: 3410, greenKarma: 14200, recyclersConnected: 12 },
      { rank: 2, name: 'Rohini Sector 14 Green Brigade', category: 'Colony', wasteDivertedKg: 2890, greenKarma: 11950, recyclersConnected: 9 },
      { rank: 3, name: 'Karol Bagh Circular Society', category: 'Colony', wasteDivertedKg: 2450, greenKarma: 10420, recyclersConnected: 14 },
      { rank: 4, name: 'Vasant Kunj C-Block Composting Hub', category: 'Colony', wasteDivertedKg: 2100, greenKarma: 9230, recyclersConnected: 7 },
      { rank: 5, name: 'Mayur Vihar Phase 1 Eco Group', category: 'Colony', wasteDivertedKg: 1820, greenKarma: 8100, recyclersConnected: 8 }
    ]
  });

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard');
      const json = await res.json();
      if (json.success && json.data) {
        setLeaderboardData(json.data);
      }
    } catch (e) {}
  };

  const userBadges = [
    { id: 'b1', title: 'Zero Waste Pioneer', description: 'Segregated first 10 items', unlocked: true },
    { id: 'b2', title: 'Recycler Partner', description: 'Connected with scrap dealer', unlocked: true },
    { id: 'b3', title: 'Compost Creator', description: 'Made 10kg compost', unlocked: true },
    { id: 'b4', title: 'Upcycling Champion', description: 'Built 3 upcycled items', unlocked: true },
    { id: 'b5', title: 'Landfill Diverter', description: 'Diverted 100kg from landfills', unlocked: false }
  ];

  const compostTimeline = [
    { day: 'Day 1', stage: 'Kitchen Waste Collected', status: 'completed', date: 'Oct 01', note: 'Vegetable & fruit peels shredded and layered with dry coco-peat in an aerated bin' },
    { day: 'Day 5', stage: 'Bacterial Aeration Phase', status: 'completed', date: 'Oct 05', note: 'Microbial activity reaches 55°C, eliminating pathogens naturally' },
    { day: 'Day 10', stage: 'Humus Breakdown', status: 'completed', date: 'Oct 10', note: 'Volume reduced by 60%, dark earthy smell indicates healthy decomposition' },
    { day: 'Day 15', stage: 'Organic Compost Ready', status: 'active', date: 'Oct 15', note: 'High-potassium organic bio-fertilizer ready for balcony plants' }
  ];

  const metricCards = [
    {
      label: 'Waste Scanned',
      value: `${scanCount}`,
      unit: 'items',
      sub: '100% Segregated'
    },
    {
      label: 'CO₂ Mitigated',
      value: `${co2Saved}`,
      unit: 'kg',
      sub: 'Equivalent to 8.2 Urban Trees'
    },
    {
      label: 'Compost Created',
      value: `${compostCreated}`,
      unit: 'kg',
      sub: 'Enriches 12 plant pots'
    },
    {
      label: 'Scrap Cash Earned',
      value: `₹${moneyEarned}`,
      unit: '',
      sub: 'Paid via digital UPI'
    }
  ];

  return (
    <section className="py-12 lg:py-16 relative bg-[#06120B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Impact Dashboard & Delhi Leaderboard
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Track your carbon mitigation, monitor 15-day balcony compost, and compete across Delhi colleges and residential colonies.
          </p>
        </motion.div>

        {/* User Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-6 sm:p-8 mb-6 bg-white/[0.03] border border-white/10"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-white text-base font-bold">
                HK
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-lg font-bold text-white">Harsh Kumar</h3>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-slate-300">
                    Level 4: Waste Master
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Delhi Technological University (DTU) • Lajpat Nagar IV, South Delhi
                </p>
              </div>
            </div>
          </div>

          {/* Metric Cards - Clean single color typography */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {metricCards.map((m, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10"
              >
                <span className="text-xs font-semibold text-slate-400 block mb-2">{m.label}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">{m.value}</span>
                  {m.unit && <span className="text-xs text-slate-400">{m.unit}</span>}
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">{m.sub}</p>
              </div>
            ))}
          </div>

          {/* Badges without emojis */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-sm font-bold text-white mb-4">
              Green Points Milestones
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {userBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    badge.unlocked
                      ? 'bg-white/[0.03] border-white/15'
                      : 'bg-white/[0.01] border-white/5 opacity-50'
                  }`}
                >
                  <p className="text-xs font-bold text-white mb-1">{badge.title}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{badge.description}</p>
                  <span className={`text-[10px] font-semibold mt-2.5 block ${
                    badge.unlocked ? 'text-emerald-400' : 'text-slate-500'
                  }`}>
                    {badge.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Compost Tracker + Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Compost Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-6 sm:p-7 bg-white/[0.03] border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                  Batch #04 • Balcony Terracotta Pot
                </span>
                <h3 className="text-base font-bold text-white">15-Day Aerobic Compost Tracker</h3>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 text-slate-300 border border-white/10">
                Final Phase
              </span>
            </div>

            {/* Timeline with minimal dot indicators (no heavy icons) */}
            <div className="space-y-4 relative">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-white/10"></div>
              {compostTimeline.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4 pl-0">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 z-10 mt-1 border ${
                    step.status === 'completed'
                      ? 'bg-emerald-500 border-emerald-400'
                      : 'bg-white/20 border-white/40'
                  }`} />
                  <div className="flex-1 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-white">{step.day}: {step.stage}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{step.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{step.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span>Expected Harvest: <strong className="text-white">2.4kg Organic Compost</strong></span>
              <span className="font-semibold text-slate-400">Oct 15</span>
            </div>
          </motion.div>

          {/* Leaderboard - Clean Minimalist list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-6 sm:p-7 bg-white/[0.03] border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                  Delhi NCR Rankings
                </span>
                <h3 className="text-base font-bold text-white">Zero-Waste Leaderboard</h3>
              </div>
              <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
                <button
                  onClick={() => setLeaderboardTab('colleges')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    leaderboardTab === 'colleges'
                      ? 'bg-white/15 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Colleges
                </button>
                <button
                  onClick={() => setLeaderboardTab('colonies')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    leaderboardTab === 'colonies'
                      ? 'bg-white/15 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  RWAs
                </button>
              </div>
            </div>

            {/* Clean rank rows without colorful glowing buttons */}
            <div className="space-y-2.5">
              {(leaderboardTab === 'colleges' ? leaderboardData.colleges : leaderboardData.colonies).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between gap-3 hover:bg-white/[0.04] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 w-6 text-center">
                      #{item.rank}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {item.wasteDivertedKg} kg diverted
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-bold text-white block">{item.greenKarma}</span>
                    <span className="text-[10px] text-slate-400 block">points</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 text-center py-2 border-t border-white/5">
              <span className="text-[11px] text-slate-400">
                Rankings update weekly based on verified waste diverted.
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
