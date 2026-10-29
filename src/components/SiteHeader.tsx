"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import MobileSearch from "./MobileSearch";

// Header type is Inter Medium, like the footer: the inherited body font
// (Arial) has no medium weight, so "font-medium" used to render as regular.
const inter = Inter({ subsets: ["latin"], weight: ["500"] });

const LOGO_SRC = "/images/main/logo-wordmark.svg";
const LOGO_WHITE_SRC = "/images/main/logo-wordmark-white.svg";
const MENU_CLOSE_ICON_SRC = "/images/main/menu-close-triangle.svg";
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

// 14px of 390 (Figma draws 16px; set 2px smaller on request).
const MOBILE_MENU_ITEM_CLASS = "p-[2.564vw] text-[3.59vw] leading-[normal] font-medium";

// Open/close motion for the mobile menu: the logo and ☰/▽ crossfade, and the
// items drop in one after another. On close they fade out in place, bottom
// item first.
const MOBILE_FADE_MS = 500;
// Tailwind v4 translate-*/rotate-* set the `translate`/`rotate` properties,
// not `transform`, so those are what has to transition.
const MOBILE_FADE = "transition-[opacity,rotate] duration-500 ease-out motion-reduce:transition-none";
const MOBILE_ITEM_STAGGER_MS = 90;

function mobileItemTransition(isOpen: boolean, delayMs: number) {
  if (isOpen) {
    return `opacity ${MOBILE_FADE_MS}ms ease-out ${delayMs}ms, translate ${MOBILE_FADE_MS}ms ease-out ${delayMs}ms`;
  }
  // Closing: only opacity animates. The drop-in offset snaps back once the
  // item is invisible, so it doesn't drift upward while fading out.
  const fadedAt = delayMs + MOBILE_FADE_MS;
  return `opacity ${MOBILE_FADE_MS}ms ease-out ${delayMs}ms, translate 0s linear ${fadedAt}ms`;
}

/**
 * Mobile (<695px) header from the Figma 390x64 "header" variants: a logo plus
 * a ☰ button instead of the nav row (Variant5). Opening it (Variant6) turns
 * the ☰ into a ▽ and drops the nav items, right-aligned, straight onto the
 * page with no panel. Figma draws the home page only — white ☰/▽/items over
 * the red map; on other (white) pages they switch to ink.
 */
function MobileMenu({
  isOpen,
  onToggle,
  onClose,
  onSearch,
  onDark,
}: {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSearch: () => void;
  onDark: boolean;
}) {
  const inkClass = onDark ? "bg-white" : "bg-[#1b191a]";
  const textClass = onDark ? "text-white" : "text-[#1b191a]";
  const items = [
    <Link key="about" href="/about" onClick={onClose} className="hover:opacity-60">
      About
    </Link>,
    <span key="student" className="cursor-default">
      Student
    </span>,
    <span key="open-studio" className="cursor-default whitespace-nowrap">
      Open Studio
    </span>,
    <button key="search" type="button" onClick={onSearch} className="hover:opacity-60">
      Search
    </button>,
  ];

  return (
    <div className="min-[695px]:hidden">
      <button
        type="button"
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={onToggle}
        className="absolute left-[86.03%] top-0 h-full w-[11.28%]"
      >
        {/* ☰ and ▽ are stacked and crossfade, with a quarter turn between them. */}
        <span
          className={`absolute inset-0 flex items-center justify-center ${MOBILE_FADE} ${
            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        >
          <span className="flex w-[45.45%] flex-col gap-[0.513vw]">
            <span className={`block h-[1.026vw] w-full ${inkClass}`} />
            <span className={`block h-[1.026vw] w-full ${inkClass}`} />
            <span className={`block h-[1.026vw] w-full ${inkClass}`} />
          </span>
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center ${MOBILE_FADE} ${
            isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          }`}
        >
          {/* ▽ is a white-only SVG, so paint it through a mask to recolor it. */}
          <span
            className={`block aspect-[19.95/15.906] w-[45.34%] ${inkClass}`}
            style={{ mask: `url(${MENU_CLOSE_ICON_SRC}) center / contain no-repeat` }}
          />
        </span>
      </button>
      {/*
        Fixed, not absolute: the list hangs below the header's 64px band,
        which clips its overflow. The header is sticky at top 0, so viewport
        coordinates line up with the Figma frame. Always mounted so it can
        animate out; `inert` keeps the closed list out of tab order and
        assistive tech.
      */}
      <nav
        id="mobile-menu"
        inert={!isOpen}
        className={`fixed left-[66.53vw] top-[12.17vw] flex w-[27.69vw] flex-col items-end ${textClass} ${
          isOpen ? "" : "pointer-events-none"
        }`}
      >
        {items.map((item, i) => (
          <div
            key={item.key}
            className={`${MOBILE_MENU_ITEM_CLASS} motion-reduce:transition-none! ${
              isOpen ? "translate-y-0 opacity-100" : "-translate-y-[2vw] opacity-0"
            }`}
            style={{
              transition: mobileItemTransition(isOpen, (isOpen ? i : items.length - 1 - i) * MOBILE_ITEM_STAGGER_MS),
            }}
          >
            {item}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Remember which route the menu / search screen was opened on, so
  // navigating closes them.
  const [menuOpenPath, setMenuOpenPath] = useState<string | null>(null);
  const [searchOpenPath, setSearchOpenPath] = useState<string | null>(null);
  const isMenuOpen = menuOpenPath === pathname;
  const isSearchOpen = searchOpenPath === pathname;
  const closeSearch = useCallback(() => setSearchOpenPath(null), []);
  // Mobile logo is white over the home map, ink elsewhere and while the menu
  // is open; both are stacked so the swap crossfades.
  const showWhiteLogo = isHome && !isMenuOpen;

  return (
    <header className={`${inter.className} sticky top-0 z-50 w-full bg-transparent`}>
      <div className="relative aspect-[390/64] w-full overflow-hidden min-[695px]:aspect-[1440/64]">
        <Link
          href="/"
          onClick={() => {
            // The logo always lands on the plain main screen: close the
            // mobile menu / search, and on the home page itself (where the
            // link doesn't navigate) go back to the top.
            setMenuOpenPath(null);
            setSearchOpenPath(null);
            if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="absolute left-[8.205%] top-1/2 h-[21.54%] w-[21.385%] -translate-y-1/2 min-[695px]:left-[12.05%] min-[695px]:h-[30.48%] min-[695px]:w-[8.19%]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={showWhiteLogo ? "Flux Point" : ""}
            aria-hidden={!showWhiteLogo}
            className={`absolute inset-0 block h-full w-full ${MOBILE_FADE} min-[695px]:hidden ${
              showWhiteLogo ? "opacity-100" : "opacity-0"
            }`}
            src={LOGO_WHITE_SRC}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={showWhiteLogo ? "" : "Flux Point"}
            aria-hidden={showWhiteLogo}
            className={`absolute inset-0 block h-full w-full ${MOBILE_FADE} min-[695px]:hidden ${
              showWhiteLogo ? "opacity-0" : "opacity-100"
            }`}
            src={LOGO_SRC}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Flux Point" className="hidden h-full w-full min-[695px]:block" src={LOGO_SRC} />
        </Link>
        <div className="absolute inset-0 hidden min-[695px]:block">
          <HeaderNav />
        </div>
        <MobileMenu
          isOpen={isMenuOpen}
          onToggle={() => {
            // From the search screen, ☰ goes back to the menu.
            setSearchOpenPath(null);
            setMenuOpenPath(isMenuOpen ? null : pathname);
          }}
          onClose={() => setMenuOpenPath(null)}
          onSearch={() => {
            setMenuOpenPath(null);
            setSearchOpenPath(pathname);
          }}
          onDark={isHome}
        />
        <MobileSearch isOpen={isSearchOpen} onClose={closeSearch} />
      </div>
    </header>
  );
}
