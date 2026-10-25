import Link from "next/link";
import { exhibitionInfo } from "@/lib/exhibition";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {exhibitionInfo.title}
        </h1>
        <p className="text-base text-black/60">
          {exhibitionInfo.period} · {exhibitionInfo.location}
        </p>
        <Link
          href="/works"
          className="mt-4 rounded-full border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white"
        >
          작품 둘러보기
        </Link>
      </section>
    </div>
  );
}
