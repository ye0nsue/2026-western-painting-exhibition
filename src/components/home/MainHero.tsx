"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Red-toned aerial photo of the campus. Positioned exactly as the Figma
 * "배경 1" layer, so a replacement should keep the same 3402x2006 framing
 * for the building outlines below to still sit on their footprints.
 */
const BG_MAP_SRC = "/images/main/bg-red-map.webp";

const BUILDING_S101_SRC = "/images/main/building-1-triangle.svg";
const BUILDING_PAIROOM_SRC = "/images/main/building-2-square.svg";
const BUILDING_GAON_SRC = "/images/main/building-3-circle.svg";
const PAIROOM_PREVIEW_SRC = "/images/main/pairoom-preview.png";
const PAIROOM_DETAIL_PREVIEW_SRC = "/images/main/pairoom-detail-preview.png";
const PAIROOM_DETAIL_DELAY_MS = 1000;

type PairoomHoverStage = "idle" | "preview" | "detail";

function PairoomHoverPreview({ stage }: { stage: PairoomHoverStage }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 bottom-0 top-[6.35%] min-[1220px]:top-[7.23%] z-20 overflow-hidden bg-white transition-opacity duration-[900ms] ease-out ${
        stage === "idle" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/*
        These screenshots are of the full 1440x885 Figma frames, header
        included — but the live header renders once, globally, over the
        hero's top 64px. This preview box starts below that band; oversize +
        shift up by the header's share (64/885) so the baked-in header crops
        off instead of doubling up with the real one.
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
    // The hero is a whole Figma frame: it slides up under the transparent
    // sticky header (64/1440 of the width) so the map isn't cut off along
    // the header's bottom edge, and every layer below uses frame coordinates
    // directly. Two frames: "작은창" (1000x700) by default, and "Main"
    // (1440x885) from 1220px — the midpoint between the two design widths.
    // Both share x/width values (the small frame is the large one scaled by
    // 1000/1440); only the taller small frame's crop and y values differ.
    <section
      aria-label="Flux Point 메인 비주얼"
      className="relative -mt-[4.444vw] aspect-[1000/700] w-full min-[1220px]:aspect-[1440/885] overflow-hidden bg-white"
    >
      {/* 배경 2 / 배경 1 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          className="absolute left-0 top-[6.35%] h-[93.65%] w-[111.18%] max-w-none min-[1220px]:top-[6.97%] min-[1220px]:h-[95.95%] min-[1220px]:w-full"
          src={BG_MAP_SRC}
        />
      </div>

      {/* 조형 1관 S101 */}
      <div className="absolute left-[43.36%] top-[13.51%] h-[24.60%] w-[15.14%] min-[1220px]:top-[15.39%] min-[1220px]:h-[28.02%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="조형 1관 S101" className="block h-full w-full" src={BUILDING_S101_SRC} />
      </div>

      {/* 수정관 1F 가온갤러리 */}
      <div className="absolute left-[64.55%] top-[40.38%] h-[32.34%] w-[15.97%] min-[1220px]:top-[45.99%] min-[1220px]:h-[36.84%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="수정관 1F 가온갤러리" className="block h-full w-full" src={BUILDING_GAON_SRC} />
      </div>

      {/* 난향관 4F 파이룸 */}
      <div
        className="absolute left-[26.07%] top-[39.30%] h-[38.29%] w-[8.68%] cursor-pointer min-[1220px]:top-[44.77%] min-[1220px]:h-[43.62%]"
        onMouseEnter={handlePairoomEnter}
        onMouseLeave={handlePairoomLeave}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="난향관 4F 파이룸" className="block h-full w-full" src={BUILDING_PAIROOM_SRC} />
      </div>
      <PairoomHoverPreview stage={pairoomStage} />
    </section>
  );
}
