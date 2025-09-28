// src/components/CryptoCarousel.tsx
"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import CoinCard from "./CoinCard";
import MiniCardRow from "./MiniCardRow";
import type { Coin } from "../types/coin";

type Props = {
  coins: Coin[];
};

export default function CryptoCarousel({ coins }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 2.2,
      spacing: 20,
      origin: "center",
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3.2, spacing: 24, origin: "center" },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3.5, spacing: 28, origin: "center" },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const handleMiniCardClick = (idx: number) => {
    if (idx !== currentSlide) {
      instanceRef.current?.moveToIdx(idx);
      setCurrentSlide(idx);
    }
  };

  return (
    <div className="w-full  mx-auto">
      {/* Carousel Container */}
      <div className="relative mb-12 overflow-hidden"> {/* ✅ hides end cards */}
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
                  key={coin.id}
                  className="keen-slider__slide flex justify-center !overflow-visible"
                >
                  <div
                    onClick={() => instanceRef.current?.moveToIdx(idx)}
                    className={`cursor-pointer transition-all duration-500 transform-gpu ${
                      currentSlide === idx
                        ? "scale-110 drop-shadow-2xl z-10 relative"
                        : "" // REMOVED: hover:scale-105 hover:drop-shadow-xl hover:-translate-y-2
                    }`}
                    style={{
                      zIndex: currentSlide === idx ? 10 : 1,
                      transform: `scale(${
                        currentSlide === idx ? 1.1 : 1
                      }) rotateY(${rotate}deg)`,
                    }}
                  >
                    <CoinCard coin={coin} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gradient masks (only X axis, no vertical crop) */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent pointer-events-none z-20" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent pointer-events-none z-20" />

       
      </div>
{/* Elegant dots */}
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
                  currentSlide === idx
                    ? "bg-gradient-to-r from-indigo-400 to-blue-400 shadow-lg shadow-indigo-400/50 scale-125"
                    : "bg-slate-500/60 group-hover:bg-slate-400/80 group-hover:scale-110"
                }`}
              />
              {currentSlide === idx && (
                <>
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-indigo-400/20 scale-150 animate-ping" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full border border-indigo-400/30 scale-[2] animate-pulse" />
                </>
              )}
            </button>
          ))}
        </div>
      {/* Navigation Panel */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 mx-4 shadow-[0_10px_40px_-10px_rgba(99,102,241,0.2)] relative overflow-hidden">
        

        <MiniCardRow
          coins={coins}
          onSelect={handleMiniCardClick}
          activeIndex={currentSlide}
        />
      </div>
    </div>
  );
}
