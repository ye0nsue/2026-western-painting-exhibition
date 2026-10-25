"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Background collage photo. Swap this single file to change the hero's
 * background image — it is cropped into three overlapping windows below
 * (left half / right half / center seam) to reproduce the split-map layout
 * from the Figma design, so any replacement should keep a similar wide,
 * busy composition for the crop windows to still read well.
 */
const BG_MAP_SRC = "/images/main/bg-map.png";

const LOGO_SRC = "/images/main/logo-wordmark.svg";
const POSTER_GAON_SRC = "/images/main/poster-gaon-gallery.svg";
const POSTER_S101_SRC = "/images/main/poster-s101.svg";
const POSTER_PAIROOM_SRC = "/images/main/poster-pairoom.svg";
const SEARCH_UNDERLINE_SRC = "/images/main/vector-1.svg";

function SearchControl() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="absolute top-[20.31%] left-[81.51%] whitespace-nowrap p-[0.694vw] text-[1.111vw] font-medium text-[#1b191a] hover:opacity-60"
      >
        Search
      </button>
    );
  }

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="absolute top-[20.31%] left-[81.51%] flex items-center"
    >
      <label className="relative">
        <span className="sr-only">검색어 입력</span>
        <input
          autoFocus
          type="search"
          onBlur={() => setIsOpen(false)}
          className="w-[12.5vw] bg-transparent text-[1.111vw] font-medium text-[#e23f28] outline-none"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-0 top-[1.944vw] block h-px w-[12.5vw]"
          src={SEARCH_UNDERLINE_SRC}
        />
      </label>
    </form>
  );
}

export default function MainHero() {
  return (
    <section
      aria-label="Flux Point 메인 비주얼"
      className="relative aspect-[1440/955] w-full overflow-hidden bg-white"
    >
      {/* 배경이미지 */}
      <div className="absolute left-[-0.17%] top-[1.70%] h-[97.59%] w-[48.68%] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          className="absolute left-0 top-0 h-full w-[216.41%] max-w-none"
          src={BG_MAP_SRC}
        />
      </div>
      <div className="absolute left-[50.86%] top-[1.36%] h-[98.58%] w-[49.81%] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          className="absolute left-[-113.70%] top-0 h-full w-[213.70%] max-w-none"
          src={BG_MAP_SRC}
        />
      </div>
      <div className="absolute left-[48.52%] top-[1.70%] h-[97.59%] w-[2.34%] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          className="absolute left-[-2183.66%] top-0 h-full w-[4499.32%] max-w-none"
          src={BG_MAP_SRC}
        />
      </div>
      <div className="absolute left-[48.99%] top-[13.39%] h-[38.97%] w-[1.52%] bg-[#fff1e4]" />
      <div className="absolute left-[48.05%] top-[0.03%] h-[10.81%] w-[3.43%] bg-white" />
      <div className="absolute left-0 top-[-0.07%] h-[2.52%] w-full bg-white" />

      {/* 가온갤러리 */}
      <div className="absolute left-[65.02%] top-[43.31%] h-[33.19%] w-[15.44%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block h-full w-full" src={POSTER_GAON_SRC} />
      </div>

      {/* S101 */}
      <div className="absolute left-[48.56%] top-[14.13%] h-[26.73%] w-[15.40%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block h-full w-full" src={POSTER_S101_SRC} />
      </div>

      {/* 파이룸 */}
      <div className="absolute left-[22.71%] top-[32.96%] h-[45.86%] w-[10.40%] rotate-[-18.46deg]">
        <div className="flex h-full w-full items-center justify-center p-[1.06vw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block h-full w-full" src={POSTER_PAIROOM_SRC} />
        </div>
      </div>

      {/* Header */}
      <div className="absolute left-0 top-0 h-[6.70%] w-full overflow-hidden">
        <Link
          href="/"
          className="absolute left-[12.05%] top-1/2 h-[30.48%] w-[8.19%] -translate-y-1/2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Flux Point" className="block h-full w-full" src={LOGO_SRC} />
        </Link>
        <Link
          href="/about"
          className="absolute left-[47.81%] top-[20.61%] whitespace-nowrap p-[0.694vw] text-[1.111vw] font-medium text-[#1b191a] hover:opacity-60"
        >
          About
        </Link>
        <span className="absolute left-[58.65%] top-[20.61%] cursor-default whitespace-nowrap p-[0.694vw] text-[1.111vw] font-medium text-[#1b191a]">
          Student
        </span>
        <span className="absolute left-[68.79%] top-[20.61%] cursor-default whitespace-nowrap p-[0.694vw] text-[1.111vw] font-medium text-[#1b191a]">
          Open Studio
        </span>
        <SearchControl />
      </div>
    </section>
  );
}
