import { notFound } from "next/navigation";
import { artists } from "@/lib/exhibition";

export function generateStaticParams() {
  return artists.map((artist) => ({ artist: artist.slug }));
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ artist: string }>;
}) {
  const { artist: slug } = await params;
  const artist = artists.find((a) => a.slug === slug);
  if (!artist) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold">{artist.name}</h1>
      <p className="mt-4 max-w-2xl text-black/70">{artist.statement}</p>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
        {artist.works.map((work) => (
          <div key={work.title}>
            <div className="aspect-[4/3] w-full rounded bg-black/5" />
            <p className="mt-3 text-sm font-medium">{work.title}</p>
            <p className="text-sm text-black/50">
              {work.medium} · {work.size} · {work.year}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
