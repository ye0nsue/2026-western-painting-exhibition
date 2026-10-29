"use client";

import { useEffect, useState, type ReactNode } from "react";
import { students, type Student } from "@/lib/exhibition";

const SEARCH_GRID_SRC = "/images/main/search-grid.svg";

/**
 * y of the graph paper's i-th horizontal rule, in Figma px from the top of
 * the results area. Rules run 21.382px apart through i = 20, then 20.564px.
 */
function gridLine(i: number) {
  return i <= 20 ? 21.382 * (i + 1) - 24.12 : 445.47 + 20.564 * (i - 21);
}
const px = (figmaPx: number) => `${(figmaPx / 3.9).toFixed(3)}vw`;

/**
 * Figma "연관 검색어 나타날 때" layout rule for results: every line of text
 * fills one row of the paper (its 1.6 line height ≈ the 21.38px rule
 * spacing), the first result starts on the second row, and one empty row
 * separates results. Returns each result's first row.
 */
function resultStartRows(lineCounts: number[]) {
  const starts: number[] = [];
  let row = 1;
  for (const lines of lineCounts) {
    starts.push(row);
    row += lines + 1;
  }
  return starts;
}

/**
 * Mobile (<695px) search screen. Empty, it's the Figma 390x844 "검색창 맨
 * 처음" frame: a white panel over the page with a search field and every
 * student name in a 4-column grid. Once something is typed it's "연관 검색어
 * 나타날 때": the grid gives way to a sheet of graph paper under the field,
 * with the matching students (by name or student number) one per row.
 * Sizes are Figma px over 390, as vw.
 *
 * Opened from the mobile menu's Search item; tapping outside the panel or
 * pressing Escape closes it.
 */
export default function MobileSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const keyword = query.replace(/\s/g, "");
  const matches = keyword
    ? students.filter((s) => s.name.includes(keyword) || s.studentId?.includes(keyword))
    : [];

  useEffect(() => {
    if (!isOpen) return;
    // Keep the page behind the panel from scrolling while it's open.
    document.documentElement.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    // Always mounted so it can fade out; `inert` keeps the closed screen out
    // of tab order and assistive tech.
    <div
      inert={!isOpen}
      className={`min-[695px]:hidden transition-opacity duration-500 ease-out motion-reduce:transition-none ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Tap-outside area: everything below the header around the panel. */}
      <button
        type="button"
        aria-label="검색 닫기"
        tabIndex={-1}
        onClick={onClose}
        className="fixed inset-x-0 bottom-0 top-[16.41vw] cursor-default"
      />
      <div
        role="search"
        className="fixed left-[8.31vw] top-[16.53vw] h-[189.49vw] max-h-[calc(100dvh-26.92vw)] w-[85.9vw] overflow-y-auto bg-white"
      >
        <label
          htmlFor="mobile-search-input"
          className="absolute left-[6.923vw] top-[7.179vw] text-[4.103vw] leading-[normal] font-medium text-final-red"
        >
          Search
        </label>
        <input
          id="mobile-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="검색어를 입력해주세요."
          className="absolute left-[22.31vw] top-[6.923vw] h-[5.897vw] w-[56.745vw] bg-transparent pl-[1.038vw] text-[3.59vw] leading-[normal] font-medium text-[#1b191a]/60 outline-none placeholder:text-[#1b191a]/60 [&::-webkit-search-cancel-button]:appearance-none"
        />
        <span aria-hidden className="absolute left-[22.31vw] top-[12.82vw] h-px w-[56.745vw] bg-final-red" />

        {keyword ? <RelatedResults matches={matches} /> : <StudentGrid />}
      </div>
    </div>
  );
}

/** Every student, in the Figma 4-column grid shown before anything is typed. */
function StudentGrid() {
  return (
    <ul className="grid auto-rows-[7.498vw] grid-cols-[repeat(4,12.951vw)] gap-x-[5.113vw] gap-y-[8.205vw] pb-[8.205vw] pl-[9.444vw] pt-[42.75vw] text-final-red">
      {students.map((student) => (
        <li
          key={student.studentId ?? student.name}
          className="flex flex-col items-center pt-[1.704vw] text-[3.408vw] leading-[normal] font-semibold whitespace-nowrap"
        >
          {student.name}
          {student.studentId && <span className="mt-[0.682vw] text-[1.346vw] tracking-[0.323vw]">{student.studentId}</span>}
        </li>
      ))}
    </ul>
  );
}

/**
 * Graph-paper results area (Figma "Frame 112", 221x647 at 87.4,63 in the
 * panel). The paper is Figma's own export, drawn rotated 90° in a slightly
 * oversized box exactly as the design places it. Each text line is placed
 * in its own row (see resultStartRows), so lines sit between the rules even
 * where the rule spacing changes.
 */
function RelatedResults({ matches }: { matches: Student[] }) {
  // Students are always one line: the name, plus the student number when
  // two share a name.
  const entries = matches.map((student) => ({
    key: student.studentId ?? student.name,
    lines: [
      <>
        {student.name}
        {student.studentId && <span className="ml-[2.05vw] text-[2.05vw] tracking-[0.323vw]">{student.studentId}</span>}
      </>,
    ] as ReactNode[],
  }));
  const starts = resultStartRows(entries.map((entry) => entry.lines.length));

  return (
    <div className="absolute left-[22.41vw] top-[16.15vw] h-[165.9vw] w-[56.67vw] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-[-3.73%_-19.95%_-5.89%_-0.45%] flex items-center justify-center"
        style={{ containerType: "size" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block h-[100cqw] w-[100cqh] max-w-none flex-none rotate-90" src={SEARCH_GRID_SRC} />
      </div>
      <ul className="relative text-[3.408vw] leading-[normal] font-semibold text-final-red">
        {entries.map((entry, n) => (
          <li key={entry.key}>
            {entry.lines.map((line, l) => {
              const row = starts[n] + l;
              return (
                <span
                  key={l}
                  className="absolute left-[4.525vw] right-[4.525vw] flex items-center whitespace-nowrap"
                  style={{ top: px(gridLine(row)), height: px(gridLine(row + 1) - gridLine(row)) }}
                >
                  {line}
                </span>
              );
            })}
          </li>
        ))}
        {matches.length === 0 && (
          <li
            className="absolute left-[4.525vw] right-[4.525vw] flex items-center text-[3.59vw] font-medium text-[#1b191a]/60"
            style={{ top: px(gridLine(1)), height: px(gridLine(2) - gridLine(1)) }}
          >
            검색 결과가 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
}
