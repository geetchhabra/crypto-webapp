// src/components/CoinCard.tsx
"use client";
import React from "react";
import Image from "next/image";
import type { Coin } from "../types/coin";

type Props = {
  coin: Coin;
};

export default function CoinCard({ coin }: Props) {
  const changePositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="group relative bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-[0_8px_25px_rgba(59,130,246,0.08)] mx-auto w-full max-w-xs overflow-hidden transition-all duration-700 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] hover:scale-[1.03] hover:-translate-y-2">
      
      {/* Always visible moving particles in top half - wave pattern */}
      <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden">
        <div className="absolute top-3 left-6 w-1 h-1 bg-blue-400/60 rounded-full animate-wave-float" />
        <div className="absolute top-5 right-8 w-0.5 h-0.5 bg-cyan-400/70 rounded-full animate-wave-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-8 left-12 w-0.5 h-0.5 bg-sky-400/50 rounded-full animate-wave-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2 right-14 w-0.5 h-0.5 bg-indigo-400/60 rounded-full animate-wave-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Enhanced floating orbs */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-xl animate-float-gentle opacity-60" />
      <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-tr from-cyan-200/15 to-transparent rounded-full blur-xl animate-float-gentle opacity-40" style={{ animationDelay: '2s' }} />
      
      {/* Premium shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Image
              src={coin.image}
              alt={coin.name}
              width={56}
              height={56}
              className="rounded-full border-2 border-cyan-400/60 shadow-md transition-all duration-500 group-hover:border-blue-400/80 group-hover:shadow-xl group-hover:scale-110"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-blue-800 truncate">
              {coin.name}
            </h2>
            <div className="text-sm text-gray-600 uppercase tracking-wide font-medium transition-colors duration-300 group-hover:text-blue-600">
              {coin.symbol}
            </div>
          </div>
        </div>

        <div className="flex items-baseline justify-between mb-6">
          <div className="text-3xl font-bold text-gray-900 transition-all duration-300 group-hover:text-blue-900">
            ${coin.current_price.toLocaleString()}
          </div>
          
          <div className={`text-base font-bold px-4 py-2 rounded-xl transition-all duration-300 shadow-md ${
            changePositive
              ? "text-emerald-700 bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 group-hover:shadow-emerald-200/50 group-hover:scale-105"
              : "text-red-700 bg-gradient-to-r from-red-100 to-rose-100 border border-red-200 group-hover:shadow-red-200/50 group-hover:scale-105"
          }`}>
            {changePositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
            <span className="text-xs opacity-70 ml-1">/24h</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-2xl bg-white/50 backdrop-blur-md border border-white/50 transition-all duration-500 group-hover:bg-white/70 group-hover:scale-105 group-hover:shadow-lg">
            <div className="text-xs text-gray-600 mb-2 font-medium">Market Cap</div>
            <div className="font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-800 text-sm">
              ${(coin.market_cap / 1000000).toFixed(1)}M
            </div>
          </div>
          
          <div className="p-4 rounded-2xl bg-white/50 backdrop-blur-md border border-white/50 transition-all duration-500 group-hover:bg-white/70 group-hover:scale-105 group-hover:shadow-lg">
            <div className="text-xs text-gray-600 mb-2 font-medium">24h Volume</div>
            <div className="font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-800 text-sm">
              ${(coin.total_volume / 1000000).toFixed(1)}M
            </div>
          </div>
        </div>
      </div>

      {/* Premium corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-cyan-300/40 via-blue-300/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}