// src/components/MiniCardRow.tsx
"use client";

import React from "react";
import Image from "next/image";
import type { Coin } from "../types/coin";

type Props = {
  coins: Coin[];
  onSelect: (index: number) => void;
  activeIndex?: number;
};

export default function MiniCardRow({ coins, onSelect, activeIndex }: Props) {
  const formatPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    } else {
      return `$${price.toFixed(4)}`;
    }
  };

  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {coins.map((c, i) => (
        <button
          key={c.id}
          onClick={() => onSelect(i)}
          className={`group relative flex flex-col items-center p-3 w-24 rounded-2xl overflow-hidden
            transition-all duration-500 hover:scale-110 hover:-translate-y-3 hover:shadow-2xl
            ${
              activeIndex === i
                ? "bg-gradient-to-br from-blue-100 via-green-100 to-cyan-100 ring-2 ring-sky-400 shadow-lg shadow-sky-400/30 scale-105"
                : "bg-white/70 backdrop-blur border border-gray-200 hover:bg-gradient-to-br hover:from-white hover:via-blue-50 hover:to-cyan-50 hover:border-blue-200"
            }`}
          style={{
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {/* Always animated particles in top half - figure-8 pattern */}
          {activeIndex === i && (
            <>
              <div className="absolute top-2 left-4 w-1 h-1 bg-blue-400/70 rounded-full animate-figure-eight" />
              <div className="absolute top-3 right-4 w-0.5 h-0.5 bg-cyan-400/80 rounded-full animate-figure-eight" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1 right-6 w-0.5 h-0.5 bg-sky-400/60 rounded-full animate-figure-eight" style={{ animationDelay: '2s' }} />
            </>
          )}

          {/* Active glow effect */}
          {activeIndex === i && (
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 via-blue-400/5 to-cyan-400/10 animate-pulse" />
          )}

          {/* Enhanced coin image */}
          <div className="relative mb-2 z-10">
            <Image
              src={c.image}
              alt={c.name}
              width={40}
              height={40}
              className={`rounded-full transition-all duration-500 ${
                activeIndex === i
                  ? "ring-2 ring-sky-300 shadow-lg scale-110"
                  : "group-hover:ring group-hover:ring-blue-300 group-hover:shadow-md group-hover:scale-105"
              }`}
            />
          </div>

          <div className={`text-xs font-semibold mb-1 z-10 transition-all duration-300 ${
            activeIndex === i
              ? "text-sky-700 drop-shadow-sm"
              : "text-gray-700 group-hover:text-blue-700"
          }`}>
            {c.symbol.toUpperCase()}
          </div>

          <div className={`text-[11px] font-medium z-10 transition-all duration-300 ${
            activeIndex === i
              ? "text-sky-600 font-bold drop-shadow-sm"
              : "text-gray-600 group-hover:text-blue-600"
          }`}>
            {formatPrice(c.current_price)}
          </div>

          {/* Corner shine effect */}
          <div className={`absolute top-0 right-0 w-3 h-3 bg-gradient-to-bl from-white/40 to-transparent rounded-br-2xl transition-opacity duration-500 ${
            activeIndex === i ? "opacity-100" : "opacity-0 group-hover:opacity-50"
          }`} />
        </button>
      ))}
    </div>
  );
}
