/**
 * Graph paper from the Figma About frames, outlined in final-red at a
 * 0.14px hairline: 26.735 x 26px cells of 1440 on desktop, the finer
 * 20.818 x 21.13px of 390 on mobile (the search screen's paper). Each cell
 * is an SVG tile in Figma units, so the line scales with the window like
 * the rest of the page and the browser antialiases it to a faint line, as
 * Figma does. It sits on a layer fixed to the window, so the paper stays
 * still while the poster and text scroll over it (background-attachment:
 * fixed is ignored on iOS). The About header reuses it (see SiteHeader), so
 * the paper runs on unbroken behind the header.
 */
const LINE_WIDTH = 0.14;
const LINE_COLOR = "#dc241b"; // final-red

function gridBackground(cellWidth: number, cellHeight: number, size: string, position: string) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cellWidth} ${cellHeight}" preserveAspectRatio="none">` +
    `<rect width="${LINE_WIDTH}" height="${cellHeight}" fill="${LINE_COLOR}"/>` +
    `<rect width="${cellWidth}" height="${LINE_WIDTH}" fill="${LINE_COLOR}"/>` +
    `</svg>`;
  return {
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    backgroundSize: size,
    backgroundPosition: position,
  };
}
export const ABOUT_DESKTOP_GRID = gridBackground(26.735, 26, "1.8566vw 1.8056vw", "-0.035vw 0");
export const ABOUT_MOBILE_GRID = gridBackground(20.818, 21.13, "5.338vw 5.418vw", "4.174vw 0");
