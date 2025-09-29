// src/components/CoinCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import type { Coin } from "../types/coin";

type Props = { coin: Coin };
function formatAbbrevUSD(n?: number) {
  if (n == null || Number.isNaN(n)) return "-";
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000)     return `$${(n / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000)         return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}
export default function CoinCard({ coin }: Props) {
  const changePositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="w-full">
      {/* Proportional outer box driven by slide width */}
      <div className="relative w-full [aspect-ratio:4/5]">
        {/* Card root is a container for container queries so inner UI scales with width */}
        <div
          className="group absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100 border border-white/30 backdrop-blur-sm shadow-[0_8px_25px_rgba(59,130,246,0.08)] transition-all duration-700 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)]"
          style={{ containerType: "inline-size", containerName: "card" } as React.CSSProperties}
        >
          {/* Wave particles */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 overflow-hidden">
            <div className="absolute top-3 left-6 w-1 h-1 bg-blue-400/60 rounded-full animate-wave-float" />
            <div className="absolute top-5 right-8 w-0.5 h-0.5 bg-cyan-400/70 rounded-full animate-wave-float" style={{ animationDelay: "1s" }} />
            <div className="absolute top-8 left-12 w-0.5 h-0.5 bg-sky-400/50 rounded-full animate-wave-float" style={{ animationDelay: "2s" }} />
            <div className="absolute top-2 right-14 w-0.5 h-0.5 bg-indigo-400/60 rounded-full animate-wave-float" style={{ animationDelay: "3s" }} />
          </div>

          {/* Floating orbs */}
          <div className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-xl animate-float-gentle opacity-60" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-tr from-cyan-200/15 to-transparent rounded-full blur-xl animate-float-gentle opacity-40" style={{ animationDelay: "2s" }} />

          {/* Shimmer */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out" />

          {/* Content scales by container width */}
          <div className="relative z-10 flex h-full w-full flex-col p-6 card-p">
            {/* Header */}
            <div className="mb-4 flex items-center gap-4 card-gap">
              <div className="relative mini-avatar h-14 w-14">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  fill
                  sizes="56px"
                  className="rounded-full border-2 border-cyan-400/60 shadow-md"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-bold text-gray-900 card-title">
                  {coin.name}
                </h2>
                <div className="uppercase tracking-wide text-gray-600 card-subtitle">
                  {coin.symbol}
                </div>
              </div>
            </div>

            {/* Price and change */}
            <div className="mb-6 flex items-baseline justify-between">
              <div className="font-bold text-gray-900 card-price">
                ${coin.current_price.toLocaleString()}
              </div>
              <div
                className={`rounded-xl shadow-md card-chip ${
                  changePositive
                    ? "text-emerald-700 bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200"
                    : "text-red-700 bg-gradient-to-r from-red-100 to-rose-100 border border-red-200"
                }`}
              >
                {changePositive ? "+" : ""}
                {coin.price_change_percentage_24h.toFixed(2)}%
                <span className="opacity-70 card-chip-suffix">/24h</span>
              </div>
            </div>

            {/* Tiles */}
            <div className="mt-auto grid grid-cols-2 gap-4 card-grid-gap">
              <div className="rounded-2xl border border-white/50 bg-white/50 p-4 backdrop-blur-md">
                <div className="font-medium text-gray-600 card-tile-label">Market Cap</div>
                <div className="font-bold text-gray-900 card-tile-value">
                  {formatAbbrevUSD(coin.market_cap)}
                </div>
              </div>

              <div className="rounded-2xl border border-white/50 bg-white/50 p-4 backdrop-blur-md">
                <div className="font-medium text-gray-600 card-tile-label">24h Volume</div>
                <div className="font-bold text-gray-900 card-tile-value">
                  ${(coin.total_volume / 1_000_000).toFixed(1)}M
                </div>
              </div>
            </div>

            {/* Corner accent */}
            <div className="pointer-events-none absolute right-0 top-0 h-8 w-8 rounded-bl-3xl bg-gradient-to-bl from-cyan-300/40 via-blue-300/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </div>
      </div>

      {/* Container-query sizing rules */}
      <style jsx>{`
        /* XS */
        @container card (max-width: 260px) {
          .card-p { padding: 12px; }
          .card-gap { gap: 10px; margin-bottom: 10px; }
          .mini-avatar { width: 40px; height: 40px; }
          .card-title { font-size: 14px; }
          .card-subtitle { font-size: 11px; }
          .card-price { font-size: 18px; }
          .card-chip { font-size: 11px; padding: 4px 8px; }
          .card-chip-suffix { font-size: 10px; margin-left: 4px; }
          .card-grid-gap { gap: 10px; }
          .card-tile-label { font-size: 10px; margin-bottom: 6px; }
          .card-tile-value { font-size: 12px; }
        }
        /* SM */
        @container card (min-width: 260px) and (max-width: 300px) {
          .card-p { padding: 16px; }
          .card-gap { gap: 12px; margin-bottom: 12px; }
          .mini-avatar { width: 44px; height: 44px; }
          .card-title { font-size: 16px; }
          .card-subtitle { font-size: 12px; }
          .card-price { font-size: 22px; }
          .card-chip { font-size: 12px; padding: 6px 10px; }
          .card-chip-suffix { font-size: 11px; margin-left: 6px; }
          .card-grid-gap { gap: 12px; }
          .card-tile-label { font-size: 11px; margin-bottom: 6px; }
          .card-tile-value { font-size: 13px; }
        }
        /* MD */
        @container card (min-width: 300px) and (max-width: 340px) {
          .card-p { padding: 20px; }
          .card-gap { gap: 14px; margin-bottom: 14px; }
          .mini-avatar { width: 48px; height: 48px; }
          .card-title { font-size: 18px; }
          .card-subtitle { font-size: 13px; }
          .card-price { font-size: 26px; }
          .card-chip { font-size: 13px; padding: 8px 12px; }
          .card-chip-suffix { font-size: 12px; margin-left: 6px; }
          .card-grid-gap { gap: 14px; }
          .card-tile-label { font-size: 12px; margin-bottom: 8px; }
          .card-tile-value { font-size: 14px; }
        }
        /* LG+ */
        @container card (min-width: 340px) {
          .card-p { padding: 24px; }
          .card-gap { gap: 16px; margin-bottom: 16px; }
          .mini-avatar { width: 56px; height: 56px; }
          .card-title { font-size: 20px; }
          .card-subtitle { font-size: 14px; }
          .card-price { font-size: 30px; }
          .card-chip { font-size: 14px; padding: 10px 14px; }
          .card-chip-suffix { font-size: 12px; margin-left: 8px; }
          .card-grid-gap { gap: 16px; }
          .card-tile-label { font-size: 12px; margin-bottom: 8px; }
          .card-tile-value { font-size: 15px; }
        }
      `}</style>
    </div>
  );
}
