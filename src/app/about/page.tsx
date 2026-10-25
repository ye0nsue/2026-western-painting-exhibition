import { exhibitionInfo } from "@/lib/exhibition";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold">About</h1>
      <dl className="mt-8 space-y-4 text-sm">
        <div className="flex gap-4">
          <dt className="w-20 shrink-0 text-black/50">전시명</dt>
          <dd>{exhibitionInfo.title}</dd>
        </div>
        <div className="flex gap-4">
          <dt className="w-20 shrink-0 text-black/50">기간</dt>
          <dd>{exhibitionInfo.period}</dd>
        </div>
        <div className="flex gap-4">
          <dt className="w-20 shrink-0 text-black/50">시간</dt>
          <dd>{exhibitionInfo.hours}</dd>
        </div>
        <div className="flex gap-4">
          <dt className="w-20 shrink-0 text-black/50">장소</dt>
          <dd>{exhibitionInfo.location}</dd>
        </div>
      </dl>
      <p className="mt-10 leading-relaxed text-black/70">
        전시 기획 의도 및 소개 텍스트를 입력하세요.
      </p>
    </div>
  );
}
