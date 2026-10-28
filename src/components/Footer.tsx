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
const OFFICE_TEL_HREF = "tel:+82-2-920-7539";

/**
 * Committee credits, laid out as in the Figma footer: role labels share one
 * column and each row's names start at the same x, evenly spaced (24.2px of
 * 390 on mobile, 36px of 1440 on desktop). Mobile (<695px) is the
 * Figma 390x271 variant, which stacks the credits under the contact block;
 * from 695px it's the 1440x200 desktop footer with the credits on the right.
 */
const CREDITS = [
  { role: "졸업전시준비위원장", top: "top-[53.19%] min-[695px]:top-[10%]", names: ["임가은"] },
  {
    role: "졸업전시준비위원",
    top: "top-[60.75%] min-[695px]:top-[25.25%]",
    names: ["구아림", "박예지", "정세진", "차수연", "최하영"],
  },
  { role: "졸업전시총감독", top: "top-[68.31%] min-[695px]:top-[40.5%]", names: ["조병왕"] },
  { role: "웹 디자인・제작", top: "top-[80.93%] min-[695px]:top-[65.93%]", names: ["장연수"] },
] as const;
const CREDIT_NAME_LEFT = [
  "left-[23.37%] min-[695px]:left-[76.52%]",
  "left-[29.57%] min-[695px]:left-[79.02%]",
  "left-[35.77%] min-[695px]:left-[81.52%]",
  "left-[41.98%] min-[695px]:left-[84.02%]",
  "left-[48.18%] min-[695px]:left-[86.52%]",
] as const;
const CREDIT_TEXT = "text-[1.654vw] min-[695px]:text-[0.667vw]";

// Contact block: mobile values are the desktop ones scaled by the variant's
// 9.732/14.48 type ratio, measured from the same top line.
const CONTACT_LEFT = "left-[8.22%] min-[695px]:left-[11.6%]";
const CONTACT_TEXT = "text-[2.08vw] min-[695px]:text-[0.838vw]";

const LINK_CLASS = "hover:opacity-70";

/**
 * Site-wide footer from the Figma "footer" component (1440x200, plus the
 * 390x271 mobile variant below 695px). Like the
 * header, it scales with the viewport so its absolute layout holds at any
 * width. The red <footer> itself can grow taller than that box (see the
 * home-page rule in globals.css); the content stays at the top.
 */
export default function Footer() {
  return (
    <footer
      className={`${inter.variable} ${notoSansKr.variable} mt-auto w-full bg-final-red font-[family-name:var(--font-footer-inter),var(--font-footer-noto-kr)] leading-normal font-medium text-white`}
    >
      <div className="relative aspect-[390/271] w-full overflow-hidden min-[695px]:aspect-[1440/200]">
        <p className={`absolute ${CONTACT_LEFT} top-[7.06%] whitespace-pre text-[2.495vw] font-semibold min-[695px]:top-[10%] min-[695px]:text-[1.006vw]`}>
          {"성신여자대학교 가온갤러리 | 파이룸 |  S101"}
        </p>
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute ${CONTACT_LEFT} ${CONTACT_TEXT} top-[15.24%] whitespace-nowrap min-[695px]:top-[26.5%] ${LINK_CLASS}`}
        >
          서울특별시 성북구 보문로34다길 2 / 수정관 1F | 난향관 4F | 조형 1관 1F
        </a>
        <p className={`absolute ${CONTACT_LEFT} ${CONTACT_TEXT} top-[21.44%] whitespace-nowrap min-[695px]:top-[39%]`}>
          서양화과 과사무실.{" "}
          <a href={OFFICE_TEL_HREF} className={LINK_CLASS}>
            02-920-7539
          </a>
        </p>
        <p className={`absolute ${CONTACT_LEFT} ${CONTACT_TEXT} top-[43.03%] whitespace-pre font-semibold min-[695px]:top-[82.5%]`}>
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
            <p className={`absolute left-[8.22%] min-[695px]:left-[70.42%] ${top} ${CREDIT_TEXT} whitespace-nowrap font-semibold`}>
              {role}
            </p>
            {names.map((name, i) => (
              <p key={name} className={`absolute ${CREDIT_NAME_LEFT[i]} ${top} ${CREDIT_TEXT} whitespace-nowrap`}>
                {name}
              </p>
            ))}
          </div>
        ))}
        <p className="absolute left-[8.22%] top-[89.15%] whitespace-nowrap text-[2.091vw] min-[695px]:left-[70.42%] min-[695px]:top-[82.5%] min-[695px]:text-[0.843vw]">
          © 2026 성신여자대학교 서양화과 졸업전시위원회.
        </p>
      </div>
    </footer>
  );
}
