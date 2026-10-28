"use client";

import Link from "next/link";
import { useState } from "react";

const LOGO_SRC = "/images/main/logo-wordmark.svg";
const SEARCH_UNDERLINE_SRC = "/images/main/vector-1.svg";

/**
 * The header's four nav items reflow (not just the search box expanding in
 * place) when Search opens — About/Student/Open Studio all shift left to
 * make room, matching the Figma header's "Variant2" state exactly.
 */
const NAV_POSITION = {
  about: { closed: "left-[47.81%]", open: "left-[36.49%]" },
  student: { closed: "left-[58.65%]", open: "left-[47.46%]" },
  openStudio: { closed: "left-[68.79%]", open: "left-[57.75%]" },
} as const;

const NAV_ITEM_CLASS =
  "absolute top-[20.61%] whitespace-nowrap p-[0.694vw] text-[1.111vw] font-medium text-[#1b191a] transition-[left] duration-300 ease-out";

function HeaderNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pos = isSearchOpen ? "open" : "closed";

  return (
    <>
      <Link href="/about" className={`${NAV_ITEM_CLASS} ${NAV_POSITION.about[pos]} hover:opacity-60`}>
        About
      </Link>
      <span className={`${NAV_ITEM_CLASS} ${NAV_POSITION.student[pos]} cursor-default`}>Student</span>
      <span className={`${NAV_ITEM_CLASS} ${NAV_POSITION.openStudio[pos]} cursor-default`}>Open Studio</span>

      {!isSearchOpen ? (
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="absolute top-[20.31%] left-[81.51%] whitespace-nowrap p-[0.694vw] text-[1.111vw] font-medium text-[#1b191a] transition-[left] duration-300 ease-out hover:opacity-60"
        >
          Search
        </button>
      ) : (
        <form
          onSubmit={(event) => event.preventDefault()}
          className="absolute top-[20.61%] left-[68.79%] h-[59.375%] w-[18.125%]"
        >
          <label className="relative block h-full w-full">
            <span className="sr-only">검색어 입력</span>
            <span
              aria-hidden
              className="pointer-events-none absolute left-[3.83%] top-[26.32%] whitespace-nowrap text-[1.111vw] font-medium text-final-red"
            >
              Search
            </span>
            <input
              autoFocus
              type="search"
              onBlur={() => setIsSearchOpen(false)}
              className="absolute left-[27.59%] top-[21.05%] w-[68.97%] bg-transparent text-[1.042vw] font-medium text-final-red outline-none"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-[26.82%] top-[78.95%] block h-px w-[68.97%]"
              src={SEARCH_UNDERLINE_SRC}
            />
          </label>
        </form>
      )}
    </>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-transparent">
      <div className="relative aspect-[1440/64] w-full overflow-hidden">
        <Link href="/" className="absolute left-[12.05%] top-1/2 h-[30.48%] w-[8.19%] -translate-y-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Flux Point" className="block h-full w-full" src={LOGO_SRC} />
        </Link>
        <HeaderNav />
      </div>
    </header>
  );
}
