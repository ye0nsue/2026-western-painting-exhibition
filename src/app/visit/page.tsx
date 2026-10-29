import { exhibitionInfo } from "@/lib/exhibition";
import PageTransition from "@/components/PageTransition";

export default function VisitPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-bold">Visit</h1>
        <p className="mt-6 text-sm text-black/70">{exhibitionInfo.location}</p>
        <div className="mt-8 aspect-video w-full rounded bg-black/5">
          {/* 지도 임베드(카카오맵/구글맵 iframe) 위치 */}
        </div>
        <p className="mt-8 leading-relaxed text-black/70">
          오시는 길 안내(대중교통, 주차 정보 등)를 입력하세요.
        </p>
      </div>
    </PageTransition>
  );
}
