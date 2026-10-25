export const exhibitionInfo = {
  title: "2026 서양화과 졸업전시",
  period: "2026.00.00 - 2026.00.00",
  location: "전시 장소 입력",
  hours: "00:00 - 00:00",
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
