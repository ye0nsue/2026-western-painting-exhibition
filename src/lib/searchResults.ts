import { students } from "@/lib/exhibition";

// Figma's graph-paper export behind related search results (mobile search
// screen and the desktop header dropdown share it).
export const SEARCH_GRID_SRC = "/images/main/search-grid.svg";

/** Students whose name or student number contains the typed keyword. */
export function matchStudents(query: string) {
  const keyword = query.replace(/\s/g, "");
  return keyword ? students.filter((s) => s.name.includes(keyword) || s.studentId?.includes(keyword)) : [];
}

/**
 * y of the graph paper's i-th horizontal rule, in Figma px from the top of
 * the results area. Rules run 21.382px apart through i = 20, then 20.564px.
 */
export function gridLine(i: number) {
  return i <= 20 ? 21.382 * (i + 1) - 24.12 : 445.47 + 20.564 * (i - 21);
}

/**
 * Figma "연관 검색어 나타날 때" layout rule for results: every line of text
 * fills one row of the paper (its 1.6 line height ≈ the 21.38px rule
 * spacing), the first result starts on the second row, and one empty row
 * separates results. Returns each result's first row.
 */
export function resultStartRows(lineCounts: number[]) {
  const starts: number[] = [];
  let row = 1;
  for (const lines of lineCounts) {
    starts.push(row);
    row += lines + 1;
  }
  return starts;
}
