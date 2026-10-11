import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import i1Image from '../assets/i1.jpeg';

export default function Hero({ onScanClick, onMapClick }) {
  return (
    <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden min-h-[580px] lg:min-h-[620px] flex flex-col justify-center p-6 sm:p-10 lg:p-14 text-white shadow-2xl mb-12">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${i1Image})` }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/30 via-transparent to-black/50 pointer-events-none" />

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Smart Waste Collection For A <span className="text-[#a3e635]">Cleaner Tomorrow</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed mb-9">
          We help communities, businesses, and cities manage waste efficiently through AI-powered
          classification, recycling networks, and eco-friendly disposal — building cleaner environments
          with sustainable solutions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <button
            onClick={onScanClick}
            className="group inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 sm:py-3 rounded-full bg-[#84cc16] hover:bg-[#a3e635] text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:shadow-[0_0_25px_rgba(132,204,22,0.6)] transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Scan Your Waste</span>
            <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950 text-[#84cc16] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </button>

          <button
            onClick={onMapClick}
            className="group inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 sm:py-3 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm sm:text-base shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Find Disposal Points</span>
            <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-950 text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
