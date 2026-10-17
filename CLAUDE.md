# CLAUDE.md

## 프로젝트

바이브코딩 수업용 개인 포트폴리오 사이트. 스타일 4종(A~D) 중 하나를 골라 최종 사이트로 완성하는 단계입니다.

## 파일 구조

- `templates-index.html` — 스타일 4종 비교 허브 (여기서 먼저 골라볼 것)
- `style-a-minimal.html`, `style-b-colorful.html`, `style-c-grid.html`, `style-d-dark.html` — 스타일 4종 각각의 메인 화면
- `img/` — 4개 스타일이 공유하는 사진 폴더 (`visual.jpg`, `profile.jpg`, `project-1.jpg`, `project-2.jpg`, `project-3.jpg`)
- `style-a-minimal.md`, `style-b-colorful.md`, `style-c-grid.md`, `style-d-dark.md` — 스타일별 색상·폰트·레이아웃 규칙 문서 (수정 전 반드시 확인)
- `design-style.md` — 체크리스트, 수정해야 할 항목 정리, 스타일별 문서 링크

## 규칙

- 4개 스타일 파일은 전부 같은 `img/` 폴더를 상대경로(`img/파일명`)로 참조합니다. 사진을 바꿀 때는 이 폴더 안 파일을 같은 이름으로 덮어쓰면 4개 스타일에 동시 반영됩니다.
- 폰트는 `design-style.md`의 역할 구분(본문 Pretendard / 타이틀·포인트는 별도 폰트)을 따릅니다. "Pretendard만 사용" 규칙은 적용하지 않습니다.
- 한글 줄바꿈 시 단어 중간이 잘리지 않도록 `word-break: keep-all`을 유지합니다.
- 아직 반응형(모바일) 확인 전입니다 — `design-style.md`의 체크리스트 참고.

## 지켜야 할 것
- design-style.md의 "수정 시 지켜야 할 것" 항목을 그대로 유지

## 다음 작업

`design-style.md`의 "아직 체크 안 된 것"과 "내용 중 사용자가 직접 바꿔야 할 것" 항목부터 진행합니다.
