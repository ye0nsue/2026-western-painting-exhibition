import { preload } from "react-dom";

/**
 * Red-toned aerial photo of the campus. Positioned exactly as the Figma
 * "배경 1" layer, so a replacement should keep the same 3402x2006 framing
 * for the building outlines below to still sit on their footprints.
 */
const BG_MAP_SRC = "/images/main/bg-red-map.webp";

const BUILDING_S101_SRC = "/images/main/building-1-triangle.svg";
const BUILDING_PAIROOM_SRC = "/images/main/building-2-square.svg";
const BUILDING_GAON_SRC = "/images/main/building-3-circle.svg";
// Mobile frame draws the campus rotated -90°, so the outlines are rotated too.
const BUILDING_S101_MOBILE_SRC = "/images/main/building-1-triangle-mobile.svg";
const BUILDING_PAIROOM_MOBILE_SRC = "/images/main/building-2-square-mobile.svg";
const BUILDING_GAON_MOBILE_SRC = "/images/main/building-3-circle-mobile.svg";

export default function MainHero() {
  // Fetch the map while the splash intro plays, so it's usually in hand
  // before the visitor taps through (the splash also waits for it).
  preload(BG_MAP_SRC, { as: "image", fetchPriority: "low" });

  return (
    // The hero is a whole Figma frame: it slides up under the transparent
    // sticky header so the map isn't cut off along the header's bottom edge,
    // and every layer below uses frame coordinates directly. Three frames,
    // switching at the midpoints between their design widths:
    //   - mobile "작은창" (390x844) by default: the photo and building
    //     outlines are rotated -90° to fit a portrait screen
    //   - "작은창" (1000x700) from 695px
    //   - "Main" (1440x885) from 1220px
    // The 1440 frame's buildings are drawn at 95% of the 1000 frame's scaled
    // size, so each tier sets its own position and size; the outline SVGs
    // are shared (the 95% exports are the same artwork, stroke included).
    <section
      aria-label="Flux Point 메인 비주얼"
      data-home-hero
      className="relative -mt-[16.41vw] aspect-[390/844] w-full overflow-hidden bg-white min-[695px]:-mt-[4.444vw] min-[695px]:aspect-[1000/700] min-[1220px]:aspect-[1440/885]"
    >
      {/* 배경 2 / 배경 1 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[46.21%] w-[216.41%] -translate-x-1/2 -translate-y-1/2 -rotate-90 overflow-hidden min-[695px]:left-0 min-[695px]:top-0 min-[695px]:h-full min-[695px]:w-full min-[695px]:translate-none min-[695px]:rotate-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            aria-hidden
            className="absolute left-[-2.84%] top-[-9.41%] h-[131.24%] w-[102.84%] max-w-none min-[695px]:left-0 min-[695px]:top-[6.35%] min-[695px]:h-[93.65%] min-[695px]:w-[111.18%] min-[1220px]:top-[6.97%] min-[1220px]:h-[95.95%] min-[1220px]:w-full"
            src={BG_MAP_SRC}
          />
        </div>
      </div>

      {/* 조형 1관 S101 */}
      <div className="absolute left-[26.21%] top-[22.76%] h-[14.97%] w-[28.16%] min-[695px]:left-[43.36%] min-[695px]:top-[13.51%] min-[695px]:h-[24.60%] min-[695px]:w-[15.14%] min-[1220px]:left-[42.81%] min-[1220px]:top-[15.03%] min-[1220px]:h-[26.62%] min-[1220px]:w-[14.38%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="조형 1관 S101" className="block h-full w-full min-[695px]:hidden" src={BUILDING_S101_MOBILE_SRC} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="조형 1관 S101" className="hidden h-full w-full min-[695px]:block" src={BUILDING_S101_SRC} />
      </div>

      {/* 수정관 1F 가온갤러리 */}
      <div className="absolute left-[55.97%] top-[45.51%] h-[18.56%] w-[28.24%] min-[695px]:left-[64.55%] min-[695px]:top-[40.38%] min-[695px]:h-[32.34%] min-[695px]:w-[15.97%] min-[1220px]:left-[64.95%] min-[1220px]:top-[45.54%] min-[1220px]:h-[34.99%] min-[1220px]:w-[15.17%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="수정관 1F 가온갤러리" className="block h-full w-full min-[695px]:hidden" src={BUILDING_GAON_MOBILE_SRC} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="수정관 1F 가온갤러리" className="hidden h-full w-full min-[695px]:block" src={BUILDING_GAON_SRC} />
      </div>

      {/* 난향관 4F 파이룸 */}
      <div
        className="absolute left-[9.01%] top-[40.95%] h-[23.83%] w-[15.24%] min-[695px]:left-[26.07%] min-[695px]:top-[39.30%] min-[695px]:h-[38.29%] min-[695px]:w-[8.68%] min-[1220px]:left-[27.60%] min-[1220px]:top-[36.69%] min-[1220px]:h-[41.43%] min-[1220px]:w-[8.25%]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="난향관 4F 파이룸" className="block h-full w-full min-[695px]:hidden" src={BUILDING_PAIROOM_MOBILE_SRC} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="난향관 4F 파이룸" className="hidden h-full w-full min-[695px]:block" src={BUILDING_PAIROOM_SRC} />
      </div>
    </section>
  );
}
