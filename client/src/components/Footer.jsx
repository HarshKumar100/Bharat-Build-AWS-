import React from 'react';
import { 
  Recycle, 
  Heart, 
  ArrowUpRight,
} from 'lucide-react';

export default function Footer({ onNavigate }) {
  const navLinks = [
    { label: 'AI Waste Scanner', id: 'scanner' },
    { label: 'Recycler Map', id: 'map' },
    { label: 'Reuse AI', id: 'chatbot' },
    { label: 'Impact & Leaderboard', id: 'impact' },
    { label: 'Home', id: 'home' },
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-900 rounded-3xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-6 relative z-10">
        
        {/* Footer Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-8 border-b border-white/10">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-700 flex items-center justify-center shadow">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-white">
                Bin<span className="text-emerald-400">Wise</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              An AI-powered waste management platform connecting households with local recyclers, 
              composting networks, and a circular economy — building a cleaner, zero-waste city.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
              Features
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => onNavigate && onNavigate(link.id)}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors group cursor-pointer text-left"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© 2024–2026 BinWise</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for a zero-landfill Delhi NCR
          </p>
        </div>

      </div>
    </footer>
  );
}
