import React from 'react';
import { 
  Home, 
  Sparkles, 
  MapPin, 
  Bot, 
  Trophy 
} from 'lucide-react';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'scanner', label: 'Scanner', icon: Sparkles, highlight: true },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'chatbot', label: 'Reuse AI', icon: Bot },
    { id: 'impact', label: 'Impact', icon: Trophy },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#080F0A]/95 backdrop-blur-xl border-t border-[#00C853]/12 px-4 py-2 flex items-center justify-around shadow-2xl">
      {/* Top edge glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C853]/30 to-transparent"></div>

      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all duration-200 cursor-pointer ${
              isActive ? 'scale-105' : 'opacity-50 hover:opacity-75'
            }`}
          >
            {tab.highlight ? (
              <div className={`p-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-br from-[#FF6D00] to-[#FF9100] shadow-[0_0_15px_rgba(255,109,0,0.5)]'
                  : 'bg-white/6 border border-white/10'
              }`}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              </div>
            ) : (
              <div className={`p-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#00C853]/15 border border-[#00C853]/30'
                  : 'border border-transparent'
              }`}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00C853]' : 'text-slate-500'}`} />
              </div>
            )}
            <span className={`text-[9px] font-bold uppercase tracking-wider ${
              isActive
                ? tab.highlight ? 'text-[#FF9100]' : 'text-[#00C853]'
                : 'text-slate-600'
            }`}>
              {tab.label}
            </span>
            {isActive && !tab.highlight && (
              <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#00C853] shadow-[0_0_6px_rgba(0,200,83,0.8)]"></span>
            )}
          </button>
        );
      })}
    </div>
  );
}
