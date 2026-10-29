export const exhibitionInfo = {
  title: "2026 성신여자대학교 서양화과 졸업전시",
  period: "2026.12.01 - 2026.12.06",
  location: "성신여자대학교 돈암수정캠퍼스",
  hours: "00:00 - 00:00",
  venues: [
    { label: "조형 1관 S101" },
    { label: "난향관 4F 파이룸" },
    { label: "수정관 1F 가온갤러리" },
  ],
  openStudio: {
    label: "Open Studio",
    location: "조형 1관 6층 601호·606호",
  },
};

/**
 * Exhibiting students, in the order the Figma search screen lists them.
 * `studentId` is set only where it's needed to tell two students with the
 * same name apart (shown under the name).
 */
export type Student = { name: string; studentId?: string };

export const students: Student[] = [
  { name: "곽신영" },
  { name: "구아림" },
  { name: "권민진" },
  { name: "김가영" },
  { name: "김서영" },
  { name: "김서정" },
  { name: "김세원" },
  { name: "김유진" },
  { name: "김은수" },
  { name: "김채은" },
  { name: "나윤서" },
  { name: "박세린" },
  { name: "박예지" },
  { name: "오정현" },
  { name: "오주한" },
  { name: "윤정현" },
  { name: "이서진" },
  { name: "이지윤" },
  { name: "이채원", studentId: "20222034" },
  { name: "이채원", studentId: "20232014" },
  { name: "임가은" },
  { name: "임세연" },
  { name: "장연수" },
  { name: "전윤하" },
  { name: "정민재" },
  { name: "정세진" },
  { name: "차수연" },
  { name: "최유진" },
  { name: "최하영" },
  { name: "하설빈" },
  { name: "한수연" },
  { name: "한채연" },
];

export type Artist = {
  slug: string;
  name: string;
  statement: string;
  thumbnail?: string;
  works: {
    title: string;
    medium: string;
    size: string;
    year: string;
    image?: string;
  }[];
};

export const artists: Artist[] = [
  {
    slug: "sample-artist",
    name: "홍길동",
    statement: "작가 소개 텍스트를 입력하세요.",
    works: [
      { title: "작품 제목", medium: "캔버스에 유채", size: "100x80cm", year: "2026" },
    ],
  },
];
