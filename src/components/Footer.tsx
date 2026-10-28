import { Inter, Noto_Sans_KR } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-footer-inter",
});
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-footer-noto-kr",
});

const MAP_URL = "https://naver.me/x9BAFxI3";
const DEPARTMENT_URL = "https://www.sungshin.ac.kr/western/index.do";
const INSTAGRAM_URL = "https://www.instagram.com/sswu_painting_g/";

/**
 * Committee credits, laid out as in the Figma footer: role labels share one
 * column and each row's names start at the same x, 36px apart (of 1440).
 */
const CREDITS = [
  { role: "졸업전시준비위원장", top: "top-[10%]", names: ["임가은"] },
  { role: "졸업전시준비위원", top: "top-[25.25%]", names: ["구아림", "박예지", "정세진", "차수연", "최하영"] },
  { role: "졸업전시총감독", top: "top-[40.5%]", names: ["조병왕"] },
  { role: "웹 디자인・제작", top: "top-[65.93%]", names: ["장연수"] },
] as const;
const CREDIT_NAME_LEFT = ["left-[76.52%]", "left-[79.02%]", "left-[81.52%]", "left-[84.02%]", "left-[86.52%]"] as const;

const LINK_CLASS = "underline decoration-solid hover:opacity-70";

/**
 * Site-wide footer from the Figma "footer" component (1440x200). Like the
 * header, it scales with the viewport so its absolute layout holds at any
 * width.
 */
export default function Footer() {
  return (
    <footer
      className={`${inter.variable} ${notoSansKr.variable} relative mt-auto aspect-[1440/200] w-full overflow-hidden bg-final-red font-[family-name:var(--font-footer-inter),var(--font-footer-noto-kr)] leading-normal font-medium text-white`}
    >
      <p className="absolute left-[11.6%] top-[10%] whitespace-pre text-[1.006vw] font-semibold">
        {"성신여자대학교 가온갤러리 | 파이룸 |  S101"}
      </p>
      <a
        href={MAP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute left-[11.6%] top-[26.5%] whitespace-nowrap text-[0.838vw] ${LINK_CLASS}`}
      >
        서울특별시 성북구 보문로34다길 2 / 수정관 1F | 난향관 4F | 조형 1관 1F
      </a>
      <p className="absolute left-[11.6%] top-[39%] whitespace-nowrap text-[0.838vw]">서양화과 과사무실. 02-920-7539</p>
      <p className="absolute left-[11.6%] top-[82.5%] whitespace-pre text-[0.838vw] font-semibold">
        <a href={DEPARTMENT_URL} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          성신여자대학교 서양화과 .
        </a>
        {"  |  "}
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          instagram .
        </a>
        {"  |  "}
      </p>

      {CREDITS.map(({ role, top, names }) => (
        <div key={role}>
          <p className={`absolute left-[70.42%] ${top} whitespace-nowrap text-[0.667vw] font-semibold`}>{role}</p>
          {names.map((name, i) => (
            <p key={name} className={`absolute ${CREDIT_NAME_LEFT[i]} ${top} whitespace-nowrap text-[0.667vw]`}>
              {name}
            </p>
          ))}
        </div>
      ))}
      <p className="absolute left-[70.42%] top-[82.5%] whitespace-nowrap text-[0.843vw]">
        © 2026 성신여자대학교 서양화과 졸업전시위원회.
      </p>
    </footer>
  );
}
