export const exhibitionInfo = {
  title: "2026 서양화과 졸업전시",
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
