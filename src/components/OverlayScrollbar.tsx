"use client";

import { useEffect, useRef, useState } from "react";

const MIN_THUMB_PX = 40;
const HIDE_DELAY_MS = 1000;

/**
 * Page scrollbar drawn over the content instead of beside it. The native
 * scrollbar is hidden in globals.css because it takes ~15px of width when it
 * appears (e.g. right after the splash releases its scroll lock), which
 * shrinks every viewport-proportional layout on the page. This one floats on
 * top, so the page width never changes. Wheel/trackpad/keyboard scrolling is
 * still native; this only adds the visual indicator and thumb dragging.
 */
export default function OverlayScrollbar() {
  const [thumb, setThumb] = useState({ top: 0, height: 0 });
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef<{ startY: number; startScroll: number } | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    function measure() {
      const viewH = window.innerHeight;
      const scrollH = root.scrollHeight;
      if (scrollH <= viewH + 1) {
        setThumb({ top: 0, height: 0 });
        return;
      }
      const height = Math.max(MIN_THUMB_PX, (viewH / scrollH) * viewH);
      const maxScroll = scrollH - viewH;
      const top = (Math.min(window.scrollY, maxScroll) / maxScroll) * (viewH - height);
      setThumb({ top, height });
    }

    function onScroll() {
      measure();
      setVisible(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setVisible(false), HIDE_DELAY_MS);
    }

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { startY: event.clientY, startScroll: window.scrollY };
    setDragging(true);
  }
  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const viewH = window.innerHeight;
    const maxScroll = document.documentElement.scrollHeight - viewH;
    const ratio = maxScroll / (viewH - thumb.height);
    window.scrollTo(0, drag.startScroll + (event.clientY - drag.startY) * ratio);
  }
  function handlePointerUp() {
    dragRef.current = null;
    setDragging(false);
  }

  if (thumb.height === 0) return null;

  const shown = visible || hovered || dragging;

  return (
    // Sits below the splash overlay (z-100) so it stays hidden during the intro.
    <div
      aria-hidden
      className="fixed right-0 top-0 z-[90] h-dvh w-[14px]"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div
        className={`absolute right-[3px] cursor-default touch-none rounded-full bg-neutral-500/50 transition-[opacity,width] duration-300 ${
          shown ? "opacity-100" : "opacity-0"
        } ${hovered || dragging ? "w-[8px]" : "w-[6px]"}`}
        style={{ top: thumb.top, height: thumb.height }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
    </div>
  );
}
