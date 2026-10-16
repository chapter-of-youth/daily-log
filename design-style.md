# home cafe 디자인 스타일

## 색상 (변수로 선언)
```
--white:#ffffff    기본 배경 (비율 60%)
--cream:#f7efe2    보조 컬러 (비율 30%에 포함)
--beige:#e6d5b8    보조 컬러 (비율 30%에 포함)
--brown:#6b4426    메인 컬러 (비율 10%)
--board:#2c4538    포인트색 (보드그린)
```
- 비율: 흰색 60% / 보조(베이지·크림) 30% / 메인(브라운) 10%
- 포인트색 `#2c4538`(보드그린)은 **포인트를 줘야 할 때만** 사용. 면적을 넓게 쓰지 않는다.

## 폰트
| 용도 | 폰트 | font-family |
|---|---|---|
| 본문/기본 | Pretendard | `'Pretendard'` |
| 타이틀 | 학교안심 알림장 | `'SchoolSafetyNotification'` |
| 포인트 | 온글잎 윤탱체 | `'OwnglyphYuntaeng'` |

```css
@font-face {
    font-family: 'SchoolSafetyNotification';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimAllimjangTTF-R.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
}

@font-face {
    font-family: 'SchoolSafetyNotification';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimAllimjangTTF-B.woff2') format('woff2');
    font-weight: 700;
    font-display: swap;
}

/* 포인트 폰트 */
@font-face {
    font-family: 'OwnglyphYuntaeng';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/2608211801@font-160/font-160/온글잎 윤탱체.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
}
```
- 글자 크기는 **최소 13px**. 그 이하로 떨어지지 않게 한다.
- 한글 줄바꿈은 `word-break: keep-all` 유지.

## 레이아웃·간격
- 간격, 패딩, 마진 등의 수치는 **4배수 또는 5배수 단위**로 쓴다. (예: 4, 8, 12, 16, 20, 24, 40, 60 …)
- 카드 디자인을 쓸 경우 가장 바깥 박스의 `border-radius`는 **16px**.

## 장식 규칙
- `border`는 최대한 사용하지 않는다. (구분은 배경색 차이와 여백으로)
- 꾸밈용 `box-shadow`를 남발하지 않는다.
- 웹접근성을 위한 키보드 포커스(tab 이동) 아웃라인은 제거하지 않고 유지한다. (border 제한의 예외)

## 수정 시 지켜야 할 것
- 색상 비율(흰 60 / 보조 30 / 메인 10)과 포인트색 사용 조건 유지
- 폰트 역할(본문·타이틀·포인트) 구분 유지
- 최소 글자 크기 13px 지키기
- 간격은 4·5배수, 카드 바깥 박스는 `border-radius: 16px`
- border·box-shadow 최소화, 포커스 아웃라인은 지우지 않기
