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

// Contact block: mobile values are the desktop ones scaled by the variant's
// 9.732/14.48 type ratio, measured from the same top line.
const CONTACT_LEFT = "left-[8.349%] min-[695px]:left-[11.6%]";
const CONTACT_TEXT = "text-[2.08vw] min-[695px]:text-[0.838vw]";

const LINK_CLASS = "hover:opacity-70";

/**
 * Site-wide footer from the Figma "footer" component (1440x200, plus the
 * 390x170 mobile variant below 695px). Like the
 * header, it scales with the viewport so its absolute layout holds at any
 * width. The red <footer> itself can grow taller than that box (see the
 * home-page rule in globals.css); the content stays at the top.
 */
export default function Footer() {
  return (
    <footer
      className={`${inter.variable} ${notoSansKr.variable} mt-auto w-full bg-final-red font-[family-name:var(--font-footer-inter),var(--font-footer-noto-kr)] leading-normal font-medium text-white`}
    >
      <div className="relative aspect-[390/170] w-full overflow-hidden min-[695px]:aspect-[1440/200]">
        <p className={`absolute ${CONTACT_LEFT} top-[11.506%] whitespace-pre text-[2.495vw] font-semibold min-[695px]:top-[10%] min-[695px]:text-[1.006vw]`}>
          {"성신여자대학교 가온갤러리 | 파이룸 |  S101"}
        </p>
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute ${CONTACT_LEFT} ${CONTACT_TEXT} top-[24.553%] whitespace-nowrap min-[695px]:top-[26.5%] ${LINK_CLASS}`}
        >
          서울특별시 성북구 보문로34다길 2 / 수정관 1F | 난향관 4F | 조형 1관 1F, 6F
        </a>
        <p className={`absolute ${CONTACT_LEFT} ${CONTACT_TEXT} top-[34.435%] whitespace-nowrap min-[695px]:top-[39%]`}>
          서양화과 과사무실.{" "}
          <a href={OFFICE_TEL_HREF} className={LINK_CLASS}>
            02-920-7539
          </a>
        </p>
        <p className={`absolute ${CONTACT_LEFT} ${CONTACT_TEXT} top-[70.006%] whitespace-pre font-semibold min-[695px]:top-[71.455%]`}>
          <a href={DEPARTMENT_URL} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
            성신여자대학교 서양화과 .
          </a>
          {"  |  "}
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
            IG .
          </a>
          {"  |  "}
        </p>

        <p className={`absolute ${CONTACT_LEFT} top-[81.876%] whitespace-nowrap text-[2.091vw] min-[695px]:top-[82.5%] min-[695px]:text-[0.838vw]`}>
          © 2026 성신여자대학교 서양화과 졸업전시위원회.
        </p>
      </div>
    </footer>
  );
}
