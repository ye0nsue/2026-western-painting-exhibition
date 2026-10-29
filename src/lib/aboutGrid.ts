/**
 * Graph paper from the Figma About frames, outlined in final-red at a
 * hairline (~0.14px): 26.735 x 26px cells of 1440 on desktop, the finer
 * 20.818 x 21.13px of 390 on mobile (the search screen's paper). Drawn as
 * 1px lines at reduced strength, which reads the same at screen
 * resolution. It sits on a layer fixed to the window, so the paper stays
 * still while the poster and text scroll over it (background-attachment:
 * fixed is ignored on iOS). The About header reuses it (see SiteHeader), so
 * the paper runs on unbroken behind the header.
 */
function gridBackground(alpha: number, size: string, position: string) {
  const line = `color-mix(in srgb, var(--color-final-red) ${alpha}%, transparent)`;
  return {
    backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
    backgroundSize: size,
    backgroundPosition: position,
  };
}
export const ABOUT_DESKTOP_GRID = gridBackground(35, "1.8566vw 1.8056vw", "-0.035vw 0");
export const ABOUT_MOBILE_GRID = gridBackground(25, "5.338vw 5.418vw", "4.174vw 0");
