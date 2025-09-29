// src/components/CryptoCarousel.tsx
"use client";

import React, { useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import type { KeenSliderInstance } from "keen-slider";
import "keen-slider/keen-slider.min.css";
import CoinCard from "./CoinCard";
import MiniCardRow from "./MiniCardRow";
import type { Coin } from "../types/coin";

type Props = {
  coins: Coin[];
};

export default function CryptoCarousel({ coins }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);

  // Wrapper ref for reliable scrolling (no transforms on this element)
  const wrapperRef = useRef<HTMLDivElement>(null);
  const HEADER_OFFSET = 72; // adjust to sticky header height

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1.2,
      spacing: 16,
      origin: "center",
    },
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 1.6, spacing: 16, origin: "center" },
      },
      "(min-width: 540px)": {
        slides: { perView: 1.8, spacing: 16, origin: "center" },
      },
      "(min-width: 768px)": {
        slides: { perView: 2.2, spacing: 16, origin: "center" },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3.0, spacing: 16, origin: "center" },
      },
      "(min-width: 1280px)": {
        slides: { perView: 3.5, spacing: 16, origin: "center" },
      },
      "(min-width: 1536px)": {
        slides: { perView: 4.0, spacing: 16, origin: "center" },
      },
    },
    slideChanged(slider: KeenSliderInstance) {
      setCurrentSlide(slider.track.details.rel);
    },
    animationEnded(slider: KeenSliderInstance) {
      // Motion finished: lock UI state to the true position
      setCurrentSlide(slider.track.details.rel);
      setPendingIndex(null);
    },
  });

  const scrollCarouselIntoView = () => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
  };

  const goToIndex = (idx: number) => {
    setPendingIndex(idx);
    instanceRef.current?.moveToIdx(idx);
  };

  const handleMiniCardClick = (idx: number) => {
    // Avoid redundant work if already targeting the same index
    if (pendingIndex === idx || currentSlide === idx) {
      // Still ensure mobile scroll into view
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        scrollCarouselIntoView();
      }
      return;
    }

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) {
      // Scroll first to avoid jumping while layout changes
      scrollCarouselIntoView();
      requestAnimationFrame(() => {
        goToIndex(idx);
      });
    } else {
      goToIndex(idx);
    }
  };

  // Active UI state for dots/minis: prefer pendingIndex during navigation
  const activeUiIndex = pendingIndex ?? currentSlide;

  return (
    <div className="w-full">
      {/* Carousel Container */}
      <div ref={wrapperRef} className="relative mb-1 overflow-hidden"> {/* ✅ hides end cards */}
        {/* Keen Slider */}
        <div className="px-8">
          <div
            ref={sliderRef}
            className="keen-slider py-12 !overflow-visible"
            style={{ perspective: "1200px" }} // ✅ for 3D tilt
          >
            {coins.map((coin, idx) => {
              // work out relative position
              const offset = idx - currentSlide;
              let rotate = 0;
              if (offset === -1) rotate = 15;
              if (offset === 1) rotate = -15;

              return (
                <div
                  key={coin.id ?? idx}
                  className="keen-slider__slide flex justify-center !overflow-visible"
                >
                  {/* Mobile-safe width wrapper prevents overlap and keeps card centered */}
                  <div className="w-full max-w-sm mx-auto px-2 sm:px-3 md:px-4">
                    <div
                      onClick={() => goToIndex(idx)}
                      className={`cursor-pointer transition-all duration-500 transform-gpu ${
                        activeUiIndex === idx
                          ? "scale-110 drop-shadow-2xl z-10 relative"
                          : ""
                      }`}
                      style={{
                        zIndex: activeUiIndex === idx ? 10 : 1,
                        transform: `scale(${activeUiIndex === idx ? 1 : 1}) rotateY(${rotate}deg)`,
                      }}
                    >
                      <CoinCard coin={coin} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gradient masks (only X axis, no vertical crop) */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent pointer-events-none z-2" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent pointer-events-none z-20" />
      </div>

      {/* Elegant dots (use activeUiIndex to avoid intermediate highlights) */}
      <div className="flex justify-center items-center space-x-4 mb-6 relative z-10">
        {coins.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleMiniCardClick(idx)}
            className="relative group transition-all duration-300"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                activeUiIndex === idx
                  ? "bg-gradient-to-r from-indigo-400 to-blue-400 shadow-lg shadow-indigo-400/50 scale-125"
                  : "bg-slate-500/60 group-hover:bg-slate-400/80 group-hover:scale-110"
              }`}
            />
            {activeUiIndex === idx && (
              <>
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-indigo-400/20 scale-150 animate-ping" />
                <div className="absolute inset-0 w-3 h-3 rounded-full border border-indigo-400/30 scale-[2] animate-pulse" />
              </>
            )}
          </button>
        ))}
      </div>

      {/* Navigation Panel (Mini cards) */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 mx-4 shadow-[0_10px_40px_-10px_rgba(99,102,241,0.2)] relative overflow-hidden">
        <MiniCardRow
          coins={coins}
          onSelect={handleMiniCardClick}
          activeIndex={activeUiIndex}
        />
      </div>
    </div>
  );
}
