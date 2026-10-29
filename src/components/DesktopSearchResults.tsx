"use client";

import { useState } from "react";
import {
  SEARCH_GRID_SRC,
  gridLine,
  matchStudents,
  resultStartRows,
} from "@/lib/searchResults";

// Figma px over 1440, as vw (the desktop header scales with the window).
const px = (figmaPx: number) => `${(figmaPx / 14.4).toFixed(3)}vw`;

/**
 * Desktop (≥695px) related results for the header search, from the Figma
 * "검색어 나타날때" frame: a 180px-wide sheet of the search graph paper right
 * under the search field, listing matching students one per row (same row
 * rules as the mobile search). It hangs from the bottom of the header over
 * the page, as in the Figma frame, unrolling from 0 height; the page itself
 * doesn't move. On pages whose own background is graph paper (About), the
 * box is plain white instead, so it reads apart from the page.
 */
export default function DesktopSearchResults({
  query,
  plain,
}: {
  query: string;
  plain: boolean;
}) {
  // Keep showing the last results while the band closes, so it doesn't empty
  // out before it has collapsed.
  const [shownQuery, setShownQuery] = useState(query);
  if (query.trim() && query !== shownQuery) setShownQuery(query);
  const isOpen = query.trim() !== "";

  const matches = matchStudents(shownQuery);
  const starts = resultStartRows(matches.map(() => 1));
  // The paper runs one empty row past the last line, like the Figma sheet.
  const lastRow = matches.length ? starts[starts.length - 1] : 1;
  const height = gridLine(lastRow + 2);

  return (
    <div
      className={`absolute left-[73.638vw] top-full hidden w-[12.5vw] transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none min-[695px]:grid ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          role="region"
          aria-label="검색 결과"
          aria-live="polite"
          className="relative overflow-hidden bg-white"
          style={{ height: px(height) }}
        >
          {/* Figma's paper, placed exactly as in the frame (rotated 90° in an oversized box). */}
          {!plain && (
            <div
              aria-hidden
              className="absolute left-[-0.069vw] top-[-1.675vw] flex h-[49.252vw] w-[18.479vw] items-center justify-center"
              style={{ containerType: "size" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="block h-[100cqw] w-[100cqh] max-w-none flex-none rotate-90"
                src={SEARCH_GRID_SRC}
              />
            </div>
          )}
          <ul className="relative text-[0.923vw] leading-[normal] font-semibold text-final-red">
            {matches.map((student, n) => (
              <li
                key={student.studentId ?? student.name}
                className="absolute left-[1.222vw] right-[1.222vw] flex items-center whitespace-nowrap"
                style={{
                  top: px(gridLine(starts[n])),
                  height: px(gridLine(starts[n] + 1) - gridLine(starts[n])),
                }}
              >
                {student.name}
                {student.studentId && (
                  <span className="ml-[0.556vw] text-[0.556vw] tracking-[0.088vw]">
                    {student.studentId}
                  </span>
                )}
              </li>
            ))}
            {matches.length === 0 && (
              <li
                className="absolute left-[1.222vw] right-[1.222vw] flex items-center font-medium text-[#1b191a]/60"
                style={{
                  top: px(gridLine(1)),
                  height: px(gridLine(2) - gridLine(1)),
                }}
              >
                검색 결과가 없습니다.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
