import { exhibitionInfo } from "@/lib/exhibition";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 py-10 text-center text-xs text-black/50">
      <p>{exhibitionInfo.title}</p>
      <p>{exhibitionInfo.period} · {exhibitionInfo.location}</p>
    </footer>
  );
}
