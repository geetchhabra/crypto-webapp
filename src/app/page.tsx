// src/app/page.tsx
"use client";

import useCoins from "../hooks/useCoins";
import CryptoCarousel from "../components/CryptoCarousel";

export default function Page() {
  const { coins, loading, error } = useCoins(10);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
        {/* Animated loading background */}
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-spin-slow top-1/4 left-1/4" />
          <div className="absolute w-64 h-64 bg-gradient-to-r from-cyan-500/15 to-green-500/15 rounded-full blur-3xl animate-reverse-spin top-3/4 right-1/4" />
        </div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-400 mx-auto mb-4" />
          <p className="text-xl text-slate-200/80 font-medium">Loading crypto data...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
        <div className="text-center p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
          <p className="text-xl text-red-300 font-semibold">Failed to load crypto data!</p>
          <p className="text-slate-300 mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );

  if (!coins.length)
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
          <p className="text-xl text-slate-200/90">No cryptocurrency data available</p>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]">
        
        {/* Multi-layered animated gradients */}
        <div className="absolute inset-0">
          {/* Primary flowing gradient */}
          <div className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%] opacity-40">
            <div className="absolute w-full h-full bg-gradient-to-br from-purple-600/30 via-blue-600/20 to-cyan-500/25 animate-gradient-flow" />
          </div>
          
          {/* Secondary counter-rotating gradient */}
          <div className="absolute w-[110%] h-[110%] -top-[5%] -left-[5%] opacity-30">
            <div className="absolute w-full h-full bg-gradient-to-tr from-indigo-600/25 via-purple-500/15 to-pink-500/20 animate-gradient-counter-flow" />
          </div>
        </div>

        {/* Dynamic floating orbs */}
        <div className="absolute inset-0">
          <div className="absolute w-80 h-80 bg-gradient-radial from-purple-500/15 to-transparent rounded-full blur-3xl animate-float-large top-1/4 left-1/6" />
          <div className="absolute w-60 h-60 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl animate-float-medium top-2/3 right-1/4" style={{ animationDelay: '2s' }} />
          <div className="absolute w-40 h-40 bg-gradient-radial from-cyan-400/25 to-transparent rounded-full blur-3xl animate-float-small bottom-1/4 left-1/2" style={{ animationDelay: '4s' }} />
          <div className="absolute w-32 h-32 bg-gradient-radial from-indigo-400/30 to-transparent rounded-full blur-3xl animate-float-tiny top-1/3 right-1/6" style={{ animationDelay: '1s' }} />
        </div>

        {/* Animated mesh network */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mesh" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="currentColor" className="text-white animate-pulse" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-purple-400/30" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-blue-400/30" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mesh)" className="animate-drift" />
          </svg>
        </div>

        {/* Energy streams */}
        <div className="absolute inset-0">
          <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-400/40 to-transparent left-1/4 animate-energy-stream" />
          <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent left-2/3 animate-energy-stream" style={{ animationDelay: '3s' }} />
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent top-1/3 animate-energy-stream-horizontal" style={{ animationDelay: '1.5s' }} />
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-indigo-400/25 to-transparent top-2/3 animate-energy-stream-horizontal" style={{ animationDelay: '4.5s' }} />
        </div>

        {/* Particle system */}
        <div className="absolute inset-0">
          <div className="absolute w-1 h-1 bg-purple-400/60 rounded-full top-1/4 left-1/3 animate-particle-drift" />
          <div className="absolute w-0.5 h-0.5 bg-blue-400/70 rounded-full top-2/3 left-2/3 animate-particle-drift" style={{ animationDelay: '2s' }} />
          <div className="absolute w-1.5 h-1.5 bg-cyan-400/50 rounded-full top-1/2 left-1/5 animate-particle-drift" style={{ animationDelay: '4s' }} />
          <div className="absolute w-0.5 h-0.5 bg-indigo-400/80 rounded-full top-3/4 right-1/4 animate-particle-drift" style={{ animationDelay: '1s' }} />
          <div className="absolute w-1 h-1 bg-pink-400/60 rounded-full top-1/6 right-1/3 animate-particle-drift" style={{ animationDelay: '3s' }} />
        </div>

        {/* Dynamic aurora effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-32 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent top-1/4 animate-aurora" />
          <div className="absolute w-full h-24 bg-gradient-to-r from-transparent via-blue-500/25 to-transparent top-2/3 animate-aurora" style={{ animationDelay: '6s', animationDuration: '15s' }} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center p-6 pt-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-100 via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Top 10 Cryptocurrencies
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover the latest prices and trends in the cryptocurrency market
          </p>
        </header>

        <div className="w-full">
          <CryptoCarousel coins={coins} />
        </div>
      </div>
    </main>
  );
}
