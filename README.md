# 2026 성신여자대학교 서양화과 졸업전시

2026 성신여자대학교 서양화과 졸업전시 공식 웹사이트입니다. Next.js(App Router)와 Tailwind CSS로 만들었습니다.

## 실행

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 구조

- `src/lib/exhibition.ts`: 전시 정보와 작가·작품 데이터
- `src/app/`: 페이지 (홈, `about`, `works`, `works/[artist]`, `visit`)
- `src/components/`: 공통 Header, Footer
