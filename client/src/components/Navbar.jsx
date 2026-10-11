import React, { useState } from 'react';
import { 
  Recycle, 
  ArrowUpRight, 
  Menu, 
  X
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab,
  userKarma = 720
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'scanner', label: 'AI Scanner' },
    { id: 'map', label: 'Disposal Map' },
    { id: 'chatbot', label: 'Reuse AI' },
    { id: 'impact', label: 'Impact' },
  ];

  return (
    <header className="w-full mb-6 relative z-50">
      {/* Floating Pill Navbar matching reference image */}
      <div className="bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-slate-200/80 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4 transition-all">
        
        {/* Brand Logo on Left */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-md group-hover:scale-105 group-hover:bg-emerald-700 transition-all">
            <Recycle className="w-5 h-5 text-[#a3e635] group-hover:rotate-180 transition-transform duration-700" />
          </div>
          <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none">
            Bin<span className="text-emerald-700">Wise</span>
          </span>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
          {navLinks.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Badges */}
        <div className="flex items-center gap-2.5">
          {/* User Green Points pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse"></span>
            <span>Green Points:</span>
            <span className="font-extrabold text-emerald-900">{userKarma}</span>
          </div>



          {/* Quick Arrow Circle Button (exact styling from reference image) */}
          <button
            onClick={() => setActiveTab(activeTab === 'scanner' ? 'home' : 'scanner')}
            title="Launch AI Waste Scanner"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white flex items-center justify-center shadow-md hover:rotate-45 transition-all cursor-pointer"
          >
            <ArrowUpRight className="w-5 h-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-3xl bg-white shadow-xl border border-slate-200 space-y-2">
          {navLinks.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-800 text-white'
                    : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 px-2 text-xs text-slate-600 font-semibold">
            <span>Green Points: {userKarma}</span>
          </div>
        </div>
      )}
    </header>
  );
}
