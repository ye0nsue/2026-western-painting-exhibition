"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Background collage photo. Swap this single file to change the hero's
 * background image — it is cropped into three overlapping windows below
 * (left half / right half / center seam) to reproduce the split-map layout
 * from the Figma design, so any replacement should keep a similar wide,
 * busy composition for the crop windows to still read well.
 */
const BG_MAP_SRC = "/images/main/bg-map.png";

const POSTER_GAON_SRC = "/images/main/poster-gaon-gallery.svg";
const POSTER_S101_SRC = "/images/main/poster-s101.svg";
const POSTER_PAIROOM_SRC = "/images/main/poster-pairoom.svg";
const PAIROOM_PREVIEW_SRC = "/images/main/pairoom-preview.png";
const PAIROOM_DETAIL_PREVIEW_SRC = "/images/main/pairoom-detail-preview.png";
const PAIROOM_DETAIL_DELAY_MS = 1000;

type PairoomHoverStage = "idle" | "preview" | "detail";

function PairoomHoverPreview({ stage }: { stage: PairoomHoverStage }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-20 overflow-hidden bg-white transition-opacity duration-[900ms] ease-out ${
        stage === "idle" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/*
        These screenshots are of the full 1440x885 Figma frames, header
        included — but the live header now renders once, globally, above
        this hero. Oversize + shift up by the header's share (64/885) so the
        baked-in header crops off above the hero's top edge instead of
        doubling up with the real one.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className={`absolute left-0 top-[-7.80%] h-[107.80%] w-full object-cover transition-opacity duration-300 ${
          stage === "detail" ? "opacity-0" : "opacity-100"
        }`}
        src={PAIROOM_PREVIEW_SRC}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className={`absolute left-0 top-[-7.80%] h-[107.80%] w-full object-cover object-top transition-opacity duration-300 ${
          stage === "detail" ? "opacity-100" : "opacity-0"
        }`}
        src={PAIROOM_DETAIL_PREVIEW_SRC}
      />
    </div>
  );
}

export default function MainHero() {
  const [pairoomStage, setPairoomStage] = useState<PairoomHoverStage>("idle");
  const pairoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (pairoomTimerRef.current) clearTimeout(pairoomTimerRef.current);
    };
  }, []);

  function handlePairoomEnter() {
    setPairoomStage("preview");
    pairoomTimerRef.current = setTimeout(() => setPairoomStage("detail"), PAIROOM_DETAIL_DELAY_MS);
  }
  function handlePairoomLeave() {
    if (pairoomTimerRef.current) clearTimeout(pairoomTimerRef.current);
    setPairoomStage("idle");
  }

  return (
    <section
      aria-label="Flux Point 메인 비주얼"
      className="relative aspect-[1440/821] w-full overflow-hidden bg-white"
    >
      {/* 배경이미지 */}
      <div className="absolute left-[-0.17%] top-[-5.82%] h-[113.51%] w-[48.68%] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          className="absolute left-0 top-0 h-full w-[216.41%] max-w-none"
          src={BG_MAP_SRC}
        />
      </div>
      <div className="absolute left-[50.86%] top-[-6.21%] h-[114.67%] w-[49.81%] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          className="absolute left-[-113.70%] top-0 h-full w-[213.70%] max-w-none"
          src={BG_MAP_SRC}
        />
      </div>
      <div className="absolute left-[48.52%] top-[-5.82%] h-[113.51%] w-[2.34%] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          className="absolute left-[-2183.66%] top-0 h-full w-[4499.32%] max-w-none"
          src={BG_MAP_SRC}
        />
      </div>
      <div className="absolute left-[48.99%] top-[7.79%] h-[45.33%] w-[1.52%] bg-[#fff1e4]" />
      <div className="absolute left-[48.05%] top-[-7.76%] h-[12.58%] w-[3.43%] bg-white" />
      <div className="absolute left-0 top-[-7.87%] h-[2.93%] w-full bg-white" />

      {/* 가온갤러리 */}
      <div className="absolute left-[65.02%] top-[42.58%] h-[38.61%] w-[15.44%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block h-full w-full" src={POSTER_GAON_SRC} />
      </div>

      {/* S101 */}
      <div className="absolute left-[48.56%] top-[8.65%] h-[31.09%] w-[15.40%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block h-full w-full" src={POSTER_S101_SRC} />
      </div>

      {/* 파이룸 */}
      <div
        className="absolute left-[22.71%] top-[30.55%] h-[53.34%] w-[10.40%] rotate-[-18.46deg] cursor-pointer"
        onMouseEnter={handlePairoomEnter}
        onMouseLeave={handlePairoomLeave}
      >
        <div className="flex h-full w-full items-center justify-center p-[1.06vw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="파이룸" className="block h-full w-full" src={POSTER_PAIROOM_SRC} />
        </div>
      </div>
      <PairoomHoverPreview stage={pairoomStage} />
    </section>
  );
}
