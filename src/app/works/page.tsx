import Link from "next/link";
import { artists } from "@/lib/exhibition";

export default function WorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-2xl font-bold">Works</h1>
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {artists.map((artist) => (
          <li key={artist.slug}>
            <Link href={`/works/${artist.slug}`} className="group block">
              <div className="aspect-square w-full rounded bg-black/5 transition group-hover:bg-black/10" />
              <p className="mt-2 text-sm font-medium">{artist.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
