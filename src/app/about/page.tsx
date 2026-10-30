import { Inter, Noto_Sans_KR } from "next/font/google";
import { ABOUT_DESKTOP_GRID as DESKTOP_GRID, ABOUT_MOBILE_GRID as MOBILE_GRID } from "@/lib/aboutGrid";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-about-inter",
});
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-about-noto-kr",
});

const POSTER_SRC = "/images/about/poster.webp";

// The participating artists exactly as Figma breaks them, each line but the
// last justified to the column.
const ARTIST_LINES = [
  "곽신영, 구아림, 권민진, 김가영, 김서영, 김서정, 김세원,",
  "김유진, 김은수, 김채은, 나윤서, 박세린, 박예지, 오정현,",
  "오주한, 윤정현, 이서진, 이지윤, 이채원(20222034),",
  "이채원(20232014), 임가은, 임세연, 장연수, 전윤하,",
  "정민재, 정세진, 차수연, 최유진, 최하영, 하설빈, 한수연,",
  "한채연",
];

const CREDITS: [role: string, people: string | string[]][] = [
  ["주최", "성신여자대학교 미술대학 서양화과"],
  ["참여작가", ARTIST_LINES],
  ["교수진", "박영근, 조병왕, 임상빈, 김정연"],
  ["졸업전시준비 총감독", "조병왕"],
  ["졸업전시준비위원장", "임가은"],
  ["기획", "차수연, 정세진"],
  ["편집", "구아림, 최하영"],
  ["재무", "박예지"],
  ["홍보", "구아림, 박예지"],
  ["디자인", "김규빈 디자이너, 정세진, 최하영, 구아림"],
  ["웹사이트 디자인, 개발", "장연수"],
  ["촬영 및 인쇄", "제이앤 컴퍼니"],
  ["협찬", "ㅇㅇㅇ"],
];

const VENUES = ["수정관 1F 가온갤러리", "난향관 4F 파이룸", "조형 1관 1F S101, 6F 601호・606호"];

const FLUX_POINT_MARK = "「 Flux Point 」";

/**
 * About page from the Figma "About" frames. From 695px it's the 1440x3632
 * desktop layout scaled to the window width, like the rest of the site:
 * the poster on the left (sticky while you scroll) and a 585px text
 * column on the right (title, Korean and English statements, credits),
 * scrolling over still graph paper that shows through the transparent
 * header. Below 695px it's the 390x2647 mobile frame: poster on top, then
 * the same column scaled to 325.6px (0.5566x) with 12 / 11 / 8.9px type.
 */
export default function AboutPage() {
  return (
    <PageTransition>
      <div
        className={`${inter.variable} ${notoSansKr.variable} relative isolate -mt-[16.41vw] min-h-[610vw] w-full pb-[14.134vw] pt-[16.436vw] font-[family-name:var(--font-about-inter),var(--font-about-noto-kr)] text-[#1b191a] min-[695px]:-mt-[4.444vw] min-[695px]:min-h-[238.333vw] min-[695px]:pb-[4.514vw] min-[695px]:pt-[7.639vw]`}
      >
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 min-[695px]:hidden" style={MOBILE_GRID} />
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 hidden min-[695px]:block" style={DESKTOP_GRID} />
        {/*
          Desktop: the poster is sticky, like kookminfinearts.com's About page.
          It holds its Figma spot (117px from the top of the window) while the
          text scrolls past, until the end of its track (the bottom of the text
          column), where it scrolls away with the page.
        */}
        <div className="min-[695px]:absolute min-[695px]:bottom-[4.514vw] min-[695px]:left-[12.033vw] min-[695px]:top-[8.125vw] min-[695px]:w-[30.655vw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Flux Point 2026 성신여자대학교 서양화과 졸업전시 포스터"
            src={POSTER_SRC}
            className="mx-auto block aspect-[441.43/624.15] w-[83.483vw] object-cover min-[695px]:sticky min-[695px]:top-[8.125vw] min-[695px]:w-full"
          />
        </div>

        <div className="ml-[8.258vw] mt-[5.523vw] w-[83.483vw] min-[695px]:ml-[48.472vw] min-[695px]:mt-0 min-[695px]:w-[40.625vw]">
          <div className="p-[1.427vw] text-[3.077vw] leading-[1.8] font-semibold min-[695px]:p-[0.694vw] min-[695px]:text-[1.389vw]">
            <p className="text-[3.385vw] font-bold text-final-red min-[695px]:text-[1.528vw]">⟪Flux Point⟫</p>
            <p>2026.12.01.-12.06.</p>
            <p>서울특별시 성북구 보문로34다길 2</p>
            {VENUES.map((venue) => (
              <p key={venue}>
                <span className="text-final-red">| </span>
                {venue}
              </p>
            ))}
          </div>

          <div className="mt-[6.137vw] flex flex-col gap-[1.713vw] text-[2.821vw] leading-[1.8] font-medium text-justify min-[695px]:mt-[1.667vw] min-[695px]:gap-[0.833vw] min-[695px]:text-[1.389vw]">
            {/* Figma block heights as minimums keep the credits at their Figma y when the browser's
                Korean font sets the text a little tighter than Figma does. */}
            <div className="min-h-[110.546vw] p-[1.427vw] min-[695px]:min-h-[53.889vw] min-[695px]:p-[0.694vw]">
              <p>
                시공간의 무수한 흐름 속에서 마주한 개개인의 좌표들은 서로의 궤적을 공유하며 하나의 유동적 흐름,
                플럭스(Flux)를 형성한다. 올해로 63년의 연혁을 맞이한 성신여자대학교 미술대학의 역사는 이 자리에서 수많은
                주체들이 교차하며 남긴 흔적의 총합이다. 이번 전시는 대학이라는 제도적 울타리를 벗어나, 독립된 창작자로서 첫
                발을 내딛는 32명 작가들의 전환점(Flux Point)을 기록한다.
              </p>
              <p>
                유동하는 좌표의 형상은 자칫 불안정한 상태로 비칠 수 있다. 그러나 1960년대 예술의 고정된 형식을 해체하고 삶과
                창작의 경계를 허물었던 전위 예술 운동 플럭서스(Fluxus)가 보여주었듯, 고정되지 않은 흐름이야말로 시스템을
                전복하는 예술적 에너지의 근원이다.
              </p>
              <p>
                이러한 플럭서스의 전복적인 에너지는 캠퍼스 내 경계를 허물고, 세 곳의 건물에서 동시다발적으로 전개된다. 이로써
                이곳의 이미지들은 고정된 화이트 큐브의 완결성을 탈피하며, 끊임없이 요동치는 가변적 존재로서 작동한다.
              </p>
              <p>
                세 개의 좌표로 분포된 작품들은 관람객이 물리적 공간을 이동하며 수행하는 시선의 교차와 발걸음, 그 틈새에서
                발생하는 마찰을 통해 비로소 하나의 지도로 엮인다. 여기에 모인 작품들은 변화해 나갈 예술적 사유 한가운데 위치한
                감각의 지표이자 예술적 탐구의 방향성을 지시하는 이정표이다.
                <span className="text-final-red">{FLUX_POINT_MARK}</span>는 이 유동적인 흐름이 교차하고 충돌하며 만들어내는
                상태 속의 기록이며, 동시에 기존의 경계를 넘어 각자의 새로운 궤적을 향해 나아가는 출발점이 된다.
              </p>
            </div>

            <div lang="en" className="min-h-[166.957vw] p-[1.427vw] min-[695px]:min-h-[83.889vw] min-[695px]:p-[0.694vw]">
              <p>
                Amid the countless flows of space and time, the coordinates of individuals who encounter one another share
                their trajectories and form a single fluid flow, Flux. The history of Sungshin Women&apos;s University College
                of Fine Arts, which marks its 63rd anniversary this year, is the sum of the traces left by countless
                individuals intersecting here. This exhibition documents the turning point(Flux Point) of 32 artists taking
                their first steps as independent creators beyond the institutional boundaries of the university. The form of
                fluid coordinates may appear unstable at first glance.
              </p>
              <p>
                However, as Fluxus, the avant-garde art movement of the 1960s that dismantled fixed artistic forms and blurred
                the boundaries between life and creation, demonstrated, it is precisely this unfixed flow that is the source
                of artistic energy capable of subverting systems.
              </p>
              <p>
                This subversive energy of Fluxus breaks down boundaries within the campus and unfolds simultaneously across
                three buildings. In doing so, the images here break free from the self-contained completeness of the fixed
                white cube and function as mutable entities in constant flux.
              </p>
              <p>
                The works distributed across three coordinates are woven into a single map only through the intersections of
                gazes and footsteps as visitors move through physical space, and the friction that arises in between. The
                works gathered here are sensory indicators situated at the heart of evolving artistic thought and milestones
                pointing toward the direction of artistic exploration. {FLUX_POINT_MARK} is a record of the state created as
                these fluid flows intersect and collide, and at the same time, it becomes a starting point for moving beyond
                existing boundaries toward each artist&apos;s new trajectory.
              </p>
            </div>
          </div>

          {/* Credits: 200px label column (111.3 on mobile), value up to the column's edge; rows 16px (9px) apart.
              Roles are semibold, names medium and tracked -1%, as in Figma. */}
          <dl className="mt-[6.137vw] flex flex-col gap-[2.32vw] text-[2.283vw] leading-[1.8] text-black min-[695px]:mt-[1.667vw] min-[695px]:gap-[1.111vw] min-[695px]:text-[1.111vw]">
            {CREDITS.map(([role, people]) => (
              <div key={role} className="flex">
                <dt className="w-[28.541vw] shrink-0 p-[1.427vw] font-semibold min-[695px]:w-[13.889vw] min-[695px]:p-[0.694vw]">{role}</dt>
                <dd className="min-w-0 flex-1 p-[1.427vw] font-medium tracking-[-0.01em] text-justify min-[695px]:p-[0.694vw]">
                  {Array.isArray(people)
                    ? people.map((line, i) => (
                        <span
                          key={line}
                          className={`block whitespace-nowrap ${i < people.length - 1 ? "[text-align-last:justify]" : ""}`}
                        >
                          {line}
                        </span>
                      ))
                    : people}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </PageTransition>
  );
}
