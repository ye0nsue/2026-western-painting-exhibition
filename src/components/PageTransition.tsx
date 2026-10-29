import { ViewTransition, type ReactNode } from "react";
import "./PageTransition.css";

/**
 * Wraps a page's content so moving between pages fades through: the old
 * screen fades out, then the new one fades in (see PageTransition.css). Goes in each page.tsx, not the layout —
 * layouts persist across navigations, so enter/exit never fire there.
 * Browsers without the View Transitions API just switch pages as before.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}
