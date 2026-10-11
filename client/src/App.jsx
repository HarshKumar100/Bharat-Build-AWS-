import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import WasteScanner from './components/WasteScanner';
import DisposalMap from './components/DisposalMap';
import ReuseGuruChat from './components/ReuseGuruChat';
import ImpactDashboard from './components/ImpactDashboard';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import { ArrowLeft, Sparkles, MapPin, Bot, Trophy, Home } from 'lucide-react';
import i1Image from './assets/i1.jpeg';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'scanner' | 'map' | 'chatbot' | 'impact'
  const [lastScanResult, setLastScanResult] = useState(null);
  const [userKarma, setUserKarma] = useState(720);
  const [metrics, setMetrics] = useState({
    scanCount: 28,
    co2Saved: 41.2,
    compostCreated: 15.6,
    moneyEarned: 460
  });

  // Scroll to top whenever tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Handle successful waste classification
  const handleScanSuccess = (scanData) => {
    setLastScanResult(scanData);
    setUserKarma(prev => prev + 25);
    setMetrics(prev => ({
      scanCount: prev.scanCount + 1,
      co2Saved: Math.round((prev.co2Saved + (scanData.carbonSavedKg || 0.45)) * 10) / 10,
      compostCreated: Math.round((prev.compostCreated + (scanData.fertilizerPotentialKg || 0)) * 10) / 10,
      moneyEarned: prev.moneyEarned + (scanData.recycleValueInr || 5)
    }));
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-fixed bg-center p-2.5 sm:p-4 lg:p-6 relative text-slate-800 transition-colors duration-300"
      style={{ backgroundImage: `url(${i1Image})` }}
    >
      {/* Dark organic backdrop tint overlay */}
      <div className="fixed inset-0 bg-[#092212]/85 backdrop-blur-md pointer-events-none" />

      {/* Main Pristine White Canvas Container (matching the user reference template) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full bg-white rounded-[2.2rem] sm:rounded-[3rem] shadow-2xl p-4 sm:p-6 lg:p-8 flex flex-col min-h-[96vh] border border-white/60 overflow-hidden">
        
        {/* Floating Top Navbar inside the Canvas */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userKarma={userKarma}
        />

        {/* Dynamic Page Views (Separate pages as requested by user to eliminate congestion!) */}
        <main className="flex-1 pb-16 md:pb-6">
          
          {/* ========================================================= */}
          {/* PAGE 1: HOME (Hero + About Us + Services Grid + Stats)    */}
          {/* ========================================================= */}
          {activeTab === 'home' && (
            <div className="animate-fadeIn">
              <Hero
                onScanClick={() => setActiveTab('scanner')}
                onMapClick={() => setActiveTab('map')}
              />
              <AboutSection onNavigate={setActiveTab} />
            </div>
          )}

          {/* ========================================================= */}
          {/* PAGE 2: AI WASTE SCANNER (Dedicated Page)                */}
          {/* ========================================================= */}
          {activeTab === 'scanner' && (
            <div className="animate-fadeIn">
              {/* Breadcrumb Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <button
                  onClick={() => setActiveTab('home')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
              </div>

              {/* Dedicated Scanner Component */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-emerald-900/10">
                <WasteScanner
                  onNavigateToMap={() => setActiveTab('map')}
                  onNavigateToBot={() => setActiveTab('chatbot')}
                  onScanSuccess={handleScanSuccess}
                />
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* PAGE 3: DISPOSAL MAP (Dedicated Page)                     */}
          {/* ========================================================= */}
          {activeTab === 'map' && (
            <div className="animate-fadeIn">
              {/* Breadcrumb Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <button
                  onClick={() => setActiveTab('home')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
              </div>

              {/* Dedicated Map Component */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-emerald-900/10">
                <DisposalMap lastScanResult={lastScanResult} />
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* PAGE 4: REUSE AI CHAT (Dedicated Page)                    */}
          {/* ========================================================= */}
          {activeTab === 'chatbot' && (
            <div className="animate-fadeIn">
              {/* Breadcrumb Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <button
                  onClick={() => setActiveTab('home')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
              </div>

              {/* Dedicated Chat Component */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-emerald-900/10">
                <ReuseGuruChat />
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* PAGE 5: IMPACT & LEADERBOARD (Dedicated Page)             */}
          {/* ========================================================= */}
          {activeTab === 'impact' && (
            <div className="animate-fadeIn">
              {/* Breadcrumb Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <button
                  onClick={() => setActiveTab('home')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
              </div>

              {/* Dedicated Impact Component */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-emerald-900/10">
                <ImpactDashboard
                  scanCount={metrics.scanCount}
                  co2Saved={metrics.co2Saved}
                  compostCreated={metrics.compostCreated}
                  moneyEarned={metrics.moneyEarned}
                />
              </div>
            </div>
          )}

        </main>

        {/* Footer inside the canvas - only on Home page */}
        {activeTab === 'home' && (
          <div className="mt-auto rounded-3xl overflow-hidden border border-emerald-900/10 shadow-lg">
            <Footer 
              onNavigate={setActiveTab}
            />
          </div>
        )}

      </div>

      {/* Mobile Bottom Navigation Dock */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

    </div>
  );
}
