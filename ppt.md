---
marp: true
theme: gaia
_class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('./images/ppt-md-background.png')
---

<!-- ![height:700 width:100%](./images/ppt-thumbnail.png) -->

![bg](./images/ppt-thumbnail.png)

---

<br>

# 📚 화장품 추천 사이트 - Beauty Lab

# 📘 마일스톤

- 개발 시작 일자 : 2023년 7월 17일 (월)
- 개발 완료 일자 : 2023년 7월 23일 (일)

---

<br>

# 📘 목표

- 반응형
- 스크롤 인터렉션
- Sass 활용
- BEM (Block, Element, Modifier)

---

# 📘 조사

## 📗 스크롤 인터렉션

기존에 스크롤 방법으로 scroll snap 을 알고 있었다. 그러나 나는 apple 의 에어팟 사이트와 같은 모습을 구현해보고 싶었다.

---

![](https://velog.velcdn.com/images/qmflf556/post/678729ea-c94c-4910-ba50-d54a939594b4/image.gif)

그러기엔 scroll snap 은 적합하지 않은 선택이다.

---

### 📕 css scroll snap

scroll snap 은 웹페이지에서 스크롤시 요소가 스크롤 되는 위치에 자동으로 스냅되도록 하는 css 속성이라고 한다. 스크롤시 일정 구역을 넘도록 스크롤하지 않으면 각 구역이 완전히 보이도록 스크롤 스냅이 되도록 하는 역할을 한다고 보면 된다. 그러나 이 방식은 액자를 비치해두고 거기서 같은 크기로 여러 이미지를 스크롤해서 볼때 적절하다고 생각했고 y index 에 따라 스크롤 인터렉션을 구현하기에는 적절하지 않은 것 같아 이 방식을 사용하지 않았다.

~~이제와서 생각해보면 scroll snap 을 사용해도 문제가 없었을 것 같고 스크롤을 가상 엘리먼트중 :nth-of-type 등을 써서 css 를 관리했다면 스타일이 더 깔끔하게 보이지 않았을까 하는 생각이 든다.~~

---

### 📕 스크롤 인터렉션

그렇다면 어떤 방식을 쓸 수 있을까

생각해본 방식으로 섹션을 고정시키고 처리하는 인터렉션 (sticky 로 고정, scale 로 줌인), 텍스트가 나타나는 인터렉션 등은 transition, position: sticky, scale, opacity 등을 활용하면 충분히 구현해볼 수 있을것 같았다.

---

대부분은 css 속성으로 해결이 가능할 것 같은데 중요한 스크롤의 y값은 어떻게 구할 수 있을까

- scrollLeft() : 선택한 요소 집합의 첫 번째 요소의 수평 스크롤 바의 위치를 얻는다.
- scrollTop() : 선택한 요소 집합의 첫 번째 요소의 수직 스크롤 바의 위치를 얻는다.

이로써 내가 원하는 문서의 스크롤 값은 다음과 같이 코드로 구할 수 있다.

```js
const posY = document.documentElement.scrollTop;
```

---

> `document.documentElement` 는 문서의 루트 요소를 나타낸다. 이는 html 태그를 가리키며 전체 코드는 문서의 최상위 요소에서 상단으로부터 얼마나 스크롤되었는지를 나타낸다.

위의 코드를 jQuery 로 나타내면 아래와 같다.

```js
const posY = $(document).scrollTop();
```

이제 답을 찾았다.

parallax scroll, 섹션 고정, 줌인아웃, 텍스트 나타나고 사라지는 효과등은 모두 이 posY 만 알면 구현할 수 있다.

---

### 📕 숫자가 차오르는 효과

단순한 사각형, 원, 이미지에 움직이는 효과를 줄때 transition 속성을 넣어주면 된다. 그러나 숫자가 점차 차오르는 형태의 효과에 `1000 단위`를 나타내는 `,` 까지 표현하는 방법을 찾다 `jQuery animate` 라는 것을 알게 되었다.

#### 📖 jQuery - animate

css 속성의 집합으로 커스텀 애니메이션을 동작하게 한다. `.animate()` 메서드는 여러 CSS 속성을 사용해서 새로운 이펙트를 만들 수 있다.

공식 DOCS 에서는 다음과 같은 두 종류의 형태를 소개하고 있다.

---

1.

```javascript
.animate(properties [,duration] [,easing] [,complete])
```

- properties : 애니메이션에 적용할 CSS 속성들을 나타내는 객체
- duration(option) : 애니메이션이 완료되는데 걸리는 시간을 밀리초 단위로 표현, 기본값은 400ms
- easing(option) : 애니메이션의 진행 방식을 조절하는 함수, 기본값은 swing
- complete(option) : 애니메이션 완료 후에 호출되는 함수 지정 (콜백함수)

> easing 중 swing, linear 함수가 있는데 각각 뭘 의미하는지 찾아봤다.

- swing : 처음과 끝 부분에서 천천히 움직이고 중간 부분에서 더 빠르게 진행
- linear : 처음부터 끝까지 일정한 속도로 진행

---

2.

```javascript
.animate(properties, options)
```

- properties : 애니메이션에 적용할 CSS 속성들을 나타내는 객체
- options : 메서드에 전달할 추가 옵션들

  - duration : 애니메이션 수행시간, 기본값 400ms
  - easing : 애니메이션 움직임 방식 지정, 기본값 swing
  - step : 애니메이션 각 단계마다 호출되는 함수 지정, 애니메이션 진행중 매 프레임마다 호출되고 애니메이션 중간 결과를 이용해 원하는 작업을 수행할 수 있게 한다.
  - complete : 애니메이션 완료 후 호출되는 함수 지정
  - done : 애니메이션이 성공적으로 완료될때 호출
  - fail : 애니메이션이 다 완료되지 못하고 중단/ 오류 발생시 호출
  - always : 애니메이션 성공 여부에 성관없이 호출

---

![](https://velog.velcdn.com/images/qmflf556/post/a9128b20-52d7-4796-9425-68d6585e9b6d/image.png)

![](https://velog.velcdn.com/images/qmflf556/post/81553fa6-e2b4-42f1-bb26-dbfe898ef193/image.png)

> DOCS 의 내용이 잘 이해되지 않아 비교 정리한 내용이다.

- complete : 애니메이션 완료시 호출
- done : aJax 와 같은 비동기 작업의 성공, 실패와 관련하여 성공시 호출

---

```javascript
function animateNumber($element, targetNumber) {
  $({ countNum: 0 }).animate(
    { countNum: targetNumber },
    {
      duration: 500,
      easing: "linear",
      step: function () {
        // 매 프레임마다 실행
        // animate 에서 다루는 프로퍼티에 countNum 이 있는데
        // 매 프레임마다 이 countNum 을 , 를 포함하는 숫자로 변환한다.
        // floor : 버림
        // toLocaleString() : 숫자를 포맷팅
        var formattedNumber = Math.floor(this.countNum).toLocaleString();
        $element.text(formattedNumber);
      },
      complete: function () {
        // 완료후 실행
        // 완료후 최종 숫자를 포맷팅
        var finalFormattedNumber = targetNumber.toLocaleString();
        // 포맷팅된 문자열을 대상 요소노드의 텍스트 노드로 설정
        $element.text(finalFormattedNumber);
      },
    }
  );
}
```

---

> 추가로 애니메이션 효과를 줄 수 있는 속성은 다음과 같다.

| 속성                | 설명                   | 속성          | 설명             |
| ------------------- | ---------------------- | ------------- | ---------------- |
| backgroundPositionX | 배경 이미지의 x축 위치 | fontSize      | 글꼴 크기        |
| backgroundPositionY | 배경 이미지의 y축 위치 | height        | 높이             |
| borderBottomWidth   | 하단 테두리 폭         | left          | 왼쪽 위치        |
| borderLeftWidth     | 왼쪽 테두리 폭         | letterSpacing | 글자 간격        |
| borderRightWidth    | 오른쪽 테두리 폭       | lineHeight    | 줄 간격          |
| borderSpacing       | 테두리 간격            | margin        | 모든 여백        |
| borderTopWidth      | 상단 테두리 폭         | marginBottom  | 하단 여백        |
| borderWidth         | 모든 테두리 폭         | marginLeft    | 왼쪽 여백        |
| bottom              | 아래쪽 위치            | marginRight   | 오른쪽 여백      |
| height              | 높이                   | marginTop     | 상단 여백        |
| left                | 왼쪽 위치              | maxHeight     | 최대 높이        |
| letterSpacing       | 글자 간격              | maxWidth      | 최대 너비        |
| lineHeight          | 줄 간격                | minHeight     | 최소 높이        |
| margin              | 모든 여백              | minWidth      | 최소 너비        |
| marginBottom        | 하단 여백              | opacity       | 불투명도         |
| marginLeft          | 왼쪽 여백              | outlineWidth  | 외곽선 폭        |
| marginRight         | 오른쪽 여백            | padding       | 모든 안쪽 여백   |
| marginTop           | 상단 여백              | paddingBottom | 하단 안쪽 여백   |
| maxHeight           | 최대 높이              | paddingLeft   | 왼쪽 안쪽 여백   |
| maxWidth            | 최대 너비              | paddingRight  | 오른쪽 안쪽 여백 |
| minHeight           | 최소 높이              | paddingTop    | 상단 안쪽 여백   |
| minWidth            | 최소 너비              | right         | 오른쪽 위치      |
| opacity             | 불투명도               | textIndent    | 들여쓰기         |
| outlineWidth        | 외곽선 폭              | top           | 상단 위치        |
| padding             | 모든 안쪽 여백         | width         | 너비             |
| paddingBottom       | 하단 안쪽 여백         | wordSpacing   | 단어 간격        |

---

## 📗 반응형

미디어 쿼리를 사용한다. CSS3 에서는 @media 규칙을 발전시켜 media type, expression 으로 구성된 media query 를 사용할 수 있다. 미디어 쿼리는 width, height, color 속성과 같은 미디어 관련 속성을 이요한 표현식을 통해 스타일이 적용되는 범위를 조절할 수 있다.

```css
@media screen and (max-width: 400px) {
}
```

---

### 📕 CSS 미디어쿼리 속성

| 속성               | 설명                             |
| ------------------ | -------------------------------- |
| width              | 화면의 너비                      |
| height             | 화면의 높이                      |
| device-width       | 매체 화면의 너비                 |
| device-height      | 매체 화면의 높이                 |
| devie-aspect-ratio | 매체 화면의 비율                 |
| orientation        | 매체 화면의 방향                 |
| color              | 매체의 색상 비트 수              |
| color-index        | 매체에서 표현 가능한 색상의 개수 |
| monochrome         | 흑백 매체에서의 픽셀당 비트 수   |
| resolution         | 매체의 해상도                    |

---

### 📕 @ 규칙(at-rule)

@ 가 어떤 것을 말하는지 궁금해서 조사했던 내용이다. 이것을 at-rule 이라고 부른다.

- @import
- @font-face
- @media

---

#### 📖 @import

문자 인코딩을 지정하는 @charset 규칙을 제외하고 다른 규칙보다 앞서 명시되어야 한다. CSS 엔진에게 외부 스타일 시트를 포함하도록 알린다. 다른 스타일 시트에서 스타일 규칙을 가져올 때 쓴다.

```css
@import url("fineprint.css") print;
@import url("bluish.css") speech;
@import "custom.css";
@import url("chrome://communicator/skin/");
@import "common.css" screen;
@import url("landscape.css") screen and (orientation: landscape);
```

- url : import 할 자원의 위치를 나타낸다.

---

`주의점`

> - @import 는 css 파일을 가져오기 위해 브라우저에 추가 HTTP 요청을 발생시키므로 많은 @import 문이 있을 경우 페이지 로딩 속도가 저해될 수 있다.

- @import 는 css 파일의 순서에 따라 적용되므로 먼저 선언된 @import 가 뒤에 선언된 스타일을 덮어쓸 수 있다.

@import 가 많아지면 페이지 로딩이 느려진다는 문제는 scss 라는 전처리기를 활용함으로서 해결할 수 있다.

> scss : Syntatically Awesome Style Sheet, CSS 전처리기로 기능을 확장하고 보다 유연하고 효율적인 CSS 작성을 가능하게 한다.
> Scss 는 @import 를 통해 css 를 불러올 때 모든 css 파일을 하나의 파일에 담기 때문에 그 하나의 파일만을 위한 HTTP Request 를 보내고 해당 파일을 받아 사용하게 된다.

---

#### 📖 @font-face

다운로드되는 외부 글꼴의 양상 설명

```css
@font-face {
  font-family: <a-remote-font-name>;
  src: <source> [,<source>]*;
  [font-weight: <weight>];
  [font-style: <style>];
}
```

- `<a-remote-font-name>` : font 속성중 폰트명으로 지정될 이름 설정
- `<source>` : 원격 폰트 파일의 위치를 나타내는 URL 값을 지정하거나 사용자 컴퓨터에 설치된 폰트명을 local 형식으로 지정
- `<weight>` : font-weight
- `<style>` : font-style

---

```css
@font-face {
  font-family: MyHelvetica;
  src: local("Helvetica Neue Bold"), local("HelveticaNeue-Bold"),
    url(MgOpenModernaBold.ttf);
  font-weight: bold;
}
```

---

#### 📖 @media

문자 인코딩을 지정하는 @charset 규칙을 제외하고 다른 규칙보다 앞서 명시되어야 한다. CSS 엔진에게 외부 스타일 시트를 포함하도록 알린다.

최상위 코드나 아무 조건부 그룹 @ 규칙 내에 중첩하여 작성할 수 있다.

```css
/* 최상위 코드 레벨 */
@media screen and (min-width: 900px) {
  article {
    padding: 1rem 3rem;
  }
}

/* 다른 조건부 @규칙 내에 중첩 */
@supports (display: flex) {
  @media screen and (min-width: 900px) {
    article {
      display: flex;
    }
  }
}
```

---

`출력과 화면 미디어 타입 판별`

```css
@media print {
  // 프린트 출력용 스타일을 정의
  body {
    font-size: 10pt;
  }
}

@media screen {
  // 화면에 표시될 스타일을 정의
  body {
    font-size: 13px;
  }
}

@media screen, print {
  // 화면과 출력 모두에 적용되는 스타일 정의
  body {
    line-height: 1.2;
  }
}

@media only screen // 스크린 화면에만 적용 and (min-width: 320px) and (max-width: 480px) and (resolution: 150dpi) {
  body {
    line-height: 1.4;
  }
}
```

---

> - only screen : 미디어 쿼리에서 특정 스타일이 `스크린` 유형의 장치에서만 적용되도록 지정한다. 즉, only screen은 스크린 장치(컴퓨터, 스마트폰, 태블릿 등)에서만 스타일을 적용하고, 다른 미디어 유형에서는 무시한다.

- screen : 미디어 쿼리에서 스타일을 적용할 미디어 유형을 지정하는데 사용된다. screen은 스크린 장치뿐만 아니라 프로젝터나 텔레비전과 같은 화면 기반의 장치에서도 스타일을 적용한다.

Media Query Level 4 부터는 새로운 범위 표현 구문을 사용할 수 있다.

이전 코드 :

```css
@media screen and (min-width: 768px) and (max-width: 1019px) {
}
```

개선된 코드 :

```css
@media (768px <= width <= 1019px) {
}
```

---

#### 📖 그외 at-rule

- @charset : 스타일 시트에 의해 사용되는 문자 집합 정의
- @keyframes : CSS 애니메이션 sequence 내 중간 단계의 양상을 설명

---

## 📗 iframe

- `iframe` 요소는 중첩 브라우징 맥락을 나타내는 요소로 현재 문서 안에 다른 HTML 페이지를 삽입한다.

> 브라우징 맥락 : 브라우저가 Document 를 표시하는 환경, 오늘날의 탭 혹은 브라우저 창, 페이지 내의 프레임 등을 말한다.

```html
<iframe
  id="inlineFrameExample"
  title="Inline Frame Example"
  width="300"
  height="200"
  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
>
</iframe>
```

---

실제로 이번 프로젝트에서 사용한 iframe 은 다음과 같다.

`html`

```html
<div class="iframe-container">
  <iframe
    allow="autoplay;"
    width="1"
    height="100%"
    src="https://www.youtube.com/embed/fnujtvQyNVg?autoplay=1&controls=0&rel=0&mute=1&loop=1&showinfo=0&iv_load_policy=3&playsinline=1&playlist=fnujtvQyNVg&enablejsapi=1&origin=https%3A%2F%2Fwww.hwahae.co .kr&widgetid=1"
    style="top: 0px"
  >
  </iframe>
</div>
```

- allow : 요청의 출처를 기반으로 사용 가능한 기능을 정의
  - autoplay : 자동 재생 기능을 허용한다.
- src : 포함할 페이지의 URL

---

`css`

```css
.iframe-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
iframe {
  position: absolute;
  top: 0;
  justify-content: center;
  width: 2300px;
  left: 50%;
  transform: translateX(-50%);
}
```

---

## 📗 Sass

![](https://velog.velcdn.com/images/qmflf556/post/ce25aace-0da1-404c-aea3-6e609f6fb037/image.png)

---

CSS Preprocessor (전처리기) 의 하나인 Sass, 왜 사용할까?

웹페이지를 만들다 보면 CSS 의 길이가 점점 늘어나는 현상을 볼 수 있다. 심지어 반응형을 넣다보면 500줄 1000줄도 넘어갈 수 있다. 그순간 css 를 관리하는데 굉장한 피로감을 느낄 것이다.

Sass 는 css 를 정리해주고 모듈화까지 가능하게 하여 방대할 수 있는 css 파일을 잘게 쪼개어 관리하기 쉽게 한다.

또한 Sass 는 전처리기이므로 @import 를 통해 css 를 불러올때 모든 css 파일은 하나의 파일에 담긴다. 따라서 Import 시 하나의 파일만 HTTP Request 해 불러오기 때문에 그냥 css 를 사용하여 여러 import 를 사용하는 것보다 성능이 좋다.

문법적으로 어썸한 스타일시트 `Syntatically Awesome Style Sheet`, 대략적인 장점과 특징들에 대해 조사했다.

---

### 📕 sass, scss 차이

sass :

```css
$main-color: white

=title($color)
	color: $color

.container
	+title($main-color)
```

scss :

```scss
$main-color: white;

@mixin title($color) {
  color: $color;
}

.container {
  @include title($main-color);
}
```

---

sass 는 더 깔끔하고 scss 는 기존의 css 작성 방식과 유사하다. 좀 더 css 에 호환될 수 있도록 도입된 것이 scss 문법이다. 따라서 이번 프로젝트에서는 더 익숙한 형태라 scss 방식을 사용했다. 파일의 확장자 역시 .scss 가 된다.

`scss 설치`

```
npm install sass -g
```

`scss 실행 명령어`

```
sass style.scss style.css
```

=> sass `<변환할 scss 파일명>` `<변환될 css 파일명>`

실행시 컴파일되어 변환된 css 파일이 생성된다.

---

`watch 옵션`

- `파일 감시`

```
sass --watch style.scss style.css
```

sass 가 해당 파일을 감시하게 만들어 scss 에 변화가 생기면 알아서 컴파일해준다.

- `폴더 감시`

```
sass --watch scss:css
```

scss 폴더 내 .scss 파일이 변경될 때마다 .css 파일을 만들어준다.

---

현재 main 페이지가 관리하는 scss 의 구조는 다음과 같다.

![](https://velog.velcdn.com/images/qmflf556/post/44371d54-505d-473a-b256-faa836a0ff2b/image.png)

scss 를 컴파일시 다음과 같은 css 파일이 만들어진다.

![](https://velog.velcdn.com/images/qmflf556/post/24da68e5-6873-4940-9b02-c1d107a3e592/image.png)

---

### 📕 변수 Variable : 반복작업 줄이기

css :

```css
h1 {
  color: white;
}
```

scss :

```scss
$main-color: white;

h1 {
  color: $main-color;
}
```

---

`프로젝트에서 사용중인 scss` :
![](https://velog.velcdn.com/images/qmflf556/post/e0ca10e5-5904-4a87-9d32-6d42996e18f8/image.png)

![](https://velog.velcdn.com/images/qmflf556/post/ee5f2cf3-ca4f-41b6-9b30-c5f364830868/image.png)

변수는 사용시 보간법이라고(Interpolation) 하여 변수를 `#{}` 로 감싸서 사용한다. 보간은 문자열을 리턴하므로 위와 같이 px 을 붙여서 변수를 정의하지 않고 사용시 px 을 붙이는 식으로 사용한다.

---

### 📕 중첩구조 Nesting : 클린코드

css 가 cascading style sheet 답게 부모에서 자식으로 흐르는 구조로 코드가 구성된다.

css :

```css
.review {
}
.review .review__title {
}
.review .review__title .review__title--bold {
}
```

---

scss :

```scss
.review {
  &__title {
    &--bold {
    }
  }
}
```

---

`프로젝트에서 사용중인 scss`:

![](https://velog.velcdn.com/images/qmflf556/post/0f3204b4-c254-41ab-bf99-14ba42f3d1fe/image.png)

`위의 사례를 컴파일한 결과 css`:
![](https://velog.velcdn.com/images/qmflf556/post/62cbc6b1-9692-4158-aebc-0cef1172e36b/image.png)

---

`&` 기호는 중첩된 상태일 때 외부의 선택자를 참조할 수 있다. 이는 부모선택자의 이름을 가져다 쓰는 BEM 방법론에 알맞다.

`&` 가 컴파일되며 부모 선택자로 치환되므로 `& menu`, `&menu`, `&.menu` 는 모두 다르다.

---

### 📕 Mixin, Include : 반복작업 더 줄이기

scss 도 @를 사용하는 At-Rule가 있다. 그중 @mixin, @include 를 사용하여 반복작업을 줄일 수 있다.

마치 react 에서 컴포넌트를 만들고 다른 곳에서 컴포넌트를 import 하여 사용하듯이 @mixin 을 사용해 여러 번 공통으로 쓸 속성들을 묶어두고 @include 로 믹스인을 불러와 사용하는 것이다.

![](https://velog.velcdn.com/images/qmflf556/post/00e2d537-1ef5-4707-91e2-a4f270fd6965/image.png)

---

자주 쓰는 반응형 관련 미디어 쿼리 분기문을 믹스인으로 만들어 두고 각 클래스별 반응형 처리가 필요시 넣어 사용하고 있다.

`mixin 활용 예시 - 반응형` :
![](https://velog.velcdn.com/images/qmflf556/post/fea65f38-5154-4427-b255-ddcf752e9446/image.png)

굉장히 작관적이라고 생각한다. counting 이라는 클래스에서 title 관련 속성중 공통속성을 제외한 반응형에서 데스크탑은 폰트만 차이가 있는데 font-size를 23px 로 설정하라는 의미가 확 와닿는다.

---

심지어 @mixin 은 함수처럼 파라미터를 받아서 사용할 수 있다.

`프로젝트 @mixin 파라미터 사용 사례` :
![](https://velog.velcdn.com/images/qmflf556/post/766050e2-f231-429e-872f-a7ea4b6d880e/image.png)

---

`@include 로 @mixin 을 가져다 사용한 사례` :
![](https://velog.velcdn.com/images/qmflf556/post/4cf5fc42-9119-4c83-85bf-89319a99ba35/image.png)

---

### 📕 주석

`/* */` 로 주석을 다는 css 와 달리 scss 는 `//` 로 주석을 달며 컴파일시 주석이 사라진 채로 css 파일을 만든다.

![](https://velog.velcdn.com/images/qmflf556/post/bd3abc4c-ba97-4f59-9134-9401fa865e9f/image.png)

---

### 📕 \_ 언더바 무시

위에서 첨부한 사진인데 다시 보면 \_ 언더바를 붙인 scss 는 컴파일되지 않는다. 이들은 컴파일 하지 않고 가져다 쓰기 위한 모듈 파일들로 `@use` 를 사용하기 위해 @forward 를 붙인 `_index.scss`, 믹스인 관리를 위한 `_mixin.scss`, 그리고 변수 관리를 위한 `_variable.scss` 로 나누어 관리했다.

| scss                                                                                              | css                                                                                               |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| ![](https://velog.velcdn.com/images/qmflf556/post/c0dd8bcf-eab6-40e9-bdd3-73bd7a9eae04/image.png) | ![](https://velog.velcdn.com/images/qmflf556/post/6af155a2-d551-4f3b-b29f-ba718630f4d3/image.png) |

helper 에 속하는 `_이름.scss` 파일들이 컴파일되지 않은 모습을 확인할 수 있다.

---

`@use` : 불러온 곳에서만 멤버들을 사용할 수 있다. 분리된 변수나 믹스인을 쓰기 위해 각 모듈 파일 상단에서 불러와야 한다. 이게 번거로울 수 있으니 이를 `_index.scss` 에서 모두 기록하도록 했다.

`_index.scss` :

![](https://velog.velcdn.com/images/qmflf556/post/84b06bae-f0e5-4451-9a38-fc6580a75233/image.png)

`@forward` : 다른 scss 파일에서 정의된 변수, 믹스인, 함수 등을 현재 파일로 가져온다.

`@forward` 로 가져온 것을 다른 scss 에서 사용하고 싶을시 최상단에 @use 에 다음과 같이 붙이고 mixin, variable 앞에 `mixin-`, `var-` 을 붙여서 사용한다.

![](https://velog.velcdn.com/images/qmflf556/post/d10c53b0-e687-4047-a97e-ba666c9a96a2/image.png)

![](https://velog.velcdn.com/images/qmflf556/post/d56670d3-9a55-453d-8639-c3328927592d/image.png)

---

## 📗 BEM

> BEM - Block Element Modifier is a methodology that helps you to create reusable components and code sharing in front-end development

BEM 은 Block(블럭), Element(요소), Modifier(블럭 또는 요소의 속성)을 활용한 CSS 클래스 작성법이다.

이는 가독성을 위한 이름 짓기 방법으로 다음과 같이 태그위주, 클래스 위주, BEM (Block Element Modifier) 방법에 대해 조사했다.

---

![](https://velog.velcdn.com/images/qmflf556/post/bc88ce35-60ad-459b-be84-38ec7f9a7707/image.png)

---

![](https://velog.velcdn.com/images/qmflf556/post/e460d720-527f-4d26-a1c0-0867e763d249/image.png)

---

클래스 이름을 정하는데 규칙없이 짓다보면 다른 팀원들이 무슨 역할을 하는지 알아보기 어려운 상황이 생길수 있어서 BEM 방식에 대해 조사해봤다. 심지어 BEM 방식을 사용할 경우 클래스명이 길어지는 부분도 Sass 의 `&` 사용시 해결되어 각각의 장점을 더욱 부각시켜줬다.

---

## 📗 netlify

배포는 netlify 를 통해서 처리했다.

aws ec2 를 통한 배포방식에 대해 최근 조사했기에 잘 알고 있지만 배포에 대해 아무것도 몰라도 깃허브 레포지토리만 있으면 target branch 에 변경사항이 발생할 때마다 자동으로 deploy 관리를 해주는게 정말 매력적이고 심지어 무료라는 점에서 놀랐다. 또한 도메인 dns 를 설정하듯 url 을 무엇으로 할 것인지도 정할 수 있다.

![](https://velog.velcdn.com/images/qmflf556/post/26b65dde-7020-4bf1-9b1c-c1c827ad83f8/image.png)

본 프로젝트의 시작 url 은 https://b-lab.netlify.app/main/main.html 이다.

---

# 📘 발생했던 문제

## 📗 conflict

애초에 4명이서 다른 html 을 다루기로 했기에 conflict 이 날수가 없었으나 맨 처음 branch 를 각자 생성할때 임의로 reademe.md 를 수정후 커밋했던 데서 conflict 이 발생한 적이 있었으나 큰 문제는 아니였다.

---

## 📗 fork Authentication error

![](https://velog.velcdn.com/images/qmflf556/post/b8f12c14-9989-4d61-b923-fd05ab5c7f7a/image.png)

이전에 정리했던 내용 [포스코x코딩온 KDT-Web-8 1주차 회고1 - git](https://velog.io/@qmflf556/%ED%8F%AC%EC%8A%A4%EC%BD%94x%EC%BD%94%EB%94%A9%EC%98%A8-KDT-Web-8-1%EC%A3%BC%EC%B0%A8-%ED%9A%8C%EA%B3%A01-git) 편에서 정리했던 내용과 유사한데 저당시엔 github 계정이 2개 있었기도 했고 github 에서 인증에 관해 기존 username, password 로 처리하던 것을 앞으로 git token 을 사용하는 식으로 정책을 변경하면서 발생하는 오류중 하나다.

그러나 이번에 발생한 오류는 그런 이슈는 아니었고 푸시할때 매번 로그인해줘야 하는 것을 mac 기준으로 키체인 접근에 해당 정보를 저장해줄 수 있는 옵션이 있었다. 이때 토큰을 입력했어야 했는데 기존 깃허브 비밀번호를 입력하면서 저 오류가 계속 발생했다.

---

## 📗 Can't push refs to remote. Try running "Pull" first to integrate your changes.

![](https://velog.velcdn.com/images/qmflf556/post/f6610aa3-a027-4fc7-ab38-c8c1dcb0090e/image.png)

---

이 오류를 어제에 이어 오늘 두번 마주치며 치를 떨게한 오류이다. 상황은 팀원이 main 에 merge 후 나의 브랜치에서 커밋후 main 위로 `rebase` 하려고 한 상황이다. 그런데 커밋을 했는데 fork 의 git flow 에 커밋 내역이 뜨지도 않고 visual studio code 에선 브랜치를 못읽고 있었다. 그런 와중 push 를 하려고 하니 위와 같은 오류창이 떴다. 즉, 커밋을 했지만 커밋 기록이 어디갔는지 볼수가 없고 푸시를 하려하니 pull 을 먼저 받으라 한다. 그런데 `git pull` 을 해도 바뀌지 않는다.

---

다른 곳에서 찾아본 내용으로는 로컬 repository 의 변경을 적용하기 전에 이미 원격 repository 에서 변경이 발생하여 merge 가 필요한 상태이니 원격 저장소의 정보를 로컬에 변합해줘야 한다는 내용이었다.

아마도 로컬 레포에서 커밋하기 이전 main 에 merge 가 발생하며 깃허브 원격 레포에 변경이 발생했으니 git pull origin main 을 먼저 했어야 했는데 바로 커밋을 해서 이런 상황이 발생하지 않았나 싶다.

구체적으로 어떻게 해결했는지 아직 모르겠다. 이런 저런 시도를 하다보니 해결이 되었는데 아마도 `git pull origin main` 이 아닌 `git pull` 을 했다가 안돼서 고생을 했던게 아닌가 싶다.

> - `git pull` : 현재 작업중인 브랜치에서 원격 저장소의 변경사항을 가져와 병합하는 명령어이다.

- `git  pull origin main` : 원격 저장소의 `main` 브랜치에서 변경 사항을 가져와서 자동으로 병합하는 명령어이다. 이 명령어는 현재 작업중인 브랜치가 `main` 브랜치가 아닐때 사용한다.

---

# 📘 목표가 아닌것

프로젝트 첫 화면인 `main page` 를 `화해` 의 화면을 클론코딩하고자 했으나 모든 화면을 말하는 바가 아니었다. 구현해보고자 하는 기능들이 (화면 고정, 줌인아웃, 글자 페이드인아웃, 반복재생 영상, 반복 애니메이션 동작, scale, sticky, transition 활용 등) 여러번 등장하는 경우 모든 화면을 구현해야 한다는 것은 목표가 아니다. 각 기능들을 직접 한번씩이라도 활용해보는 것이 목표였다.

---

# 📘 결과 및 회고

`메인 페이지` 에 대해서만 작업을 했기에 이와 관련된 결과만 정리했습니다.

---

- 자동재생 배경화면

![](https://velog.velcdn.com/images/qmflf556/post/99e39bd4-772d-4e61-b0b6-9d3b6cb727ea/image.gif)

---

- 스크롤시 배경 줌인, 페이드 아웃, 글자 나타났다 사라지는 효과

![](https://velog.velcdn.com/images/qmflf556/post/9c47e258-d8f0-48ce-9f79-0af4f9401b75/image.gif)

---

- 무한반복 애니메이션, scale, transition, 숫자 변화 애니메이션 활용

![](https://velog.velcdn.com/images/qmflf556/post/7b9aa706-3c6f-4c10-95ed-da15ce15f619/image.gif)

---

- 무한반복 스크롤 애니메이션

![](https://velog.velcdn.com/images/qmflf556/post/6fa17c9f-717a-495b-aaf1-313c748536de/image.gif)

---

- 반응형 및 전체 동작

![](https://velog.velcdn.com/images/qmflf556/post/12f61014-0b3d-4680-bd8c-d61f75a8260e/image.gif)

---

`화해` 사이트와 완전히 같지는 않으나 구현해보고 싶었던 기능을 모두 구현해볼 수 있었다. 이번 프로젝트에선 클론코딩의 방식을 사용했으나 어떻게 구현해야 하는지를 알게 되었으니 차후 프로젝트에서 애니메이션 적용에 큰 도움이 될 것 같다.

포스코x코딩온에서 진행한 첫 번째 팀 프로젝트였다. 팀장을 맡았으나 이번 주중 감기기운에 고생하느라 개발말고 신경을 쓰기 어려웠던게 개인적으로 아쉬웠다. 또한 같은 개발업무에 이렇게 다수가 동시에 진행해본 적은 처음이었다. (이전엔 기획자1, 디자이너1, FE1~2, BE1~2 이렇게 진행했었다.) 팀원이 많아질수록 의견을 좁히는데 큰 시간이 소요되는 부분의 차이가 느껴졌다. 또한 이번에도 마찬가지로 이해의 공유가 정말 중요하다는 점이 다시한번 크게 다가왔다. 말하자면 같은 공간에서 같은 내용을 이야기 해도 각자 이해한 바가 다르다는 것인데 나 역시 논의한 내용에 대해 제대로 이해했는지 확인하고자 여러번 이해한 바의 통일을 위해 물어봤었다.

짧은 스프린트동안 만족스러운 형태로 프로젝트를 마칠 수 있었다고 생각한다.

---

## 📗 github 프로젝트 링크

https://github.com/Stendhalsynd/beauty-lab

# 📘 레퍼런스

`blog`
[원페이지 웹사이트 디자인 트렌드](https://dbreblog.com/11)
[scroll snap - Inpa Dev](https://inpa.tistory.com/entry/CSS-%F0%9F%93%9A-%EC%B5%9C%EC%8B%A0-CSS-%EA%B8%B0%EB%8A%A5-%F0%9F%8E%A8-CSS-Scroll-snap)
[animate - Inpa Dev](https://inpa.tistory.com/entry/Animatecss-%F0%9F%93%9A-css-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98%EC%9D%84-%ED%81%B4%EB%9E%98%EC%8A%A4%EB%A1%9C-%EC%82%AC%EC%9A%A9)
[jQuery 이벤트 - NAVER O2](https://d2.naver.com/helloworld/0265052)
[jQuery blog - devkuma (Web 프로그래밍 언어에 관해 정리가 정말 잘 되어 있다)](https://www.devkuma.com/docs/jquery/)
[Sass - nana_log (Sass 사용법이 정말 잘 정리되어 있다)](https://nykim.work/97)
[BEM - SmileCat](https://blog.smilecat.dev/posts/bem)

---

`docs`
[jQuery DOCS - animate](https://api.jquery.com/animate/#animate-properties-duration-easing-complete)
[MDN - at-rules](https://developer.mozilla.org/ko/docs/Web/CSS/At-rule)
[MDN - iframe](https://developer.mozilla.org/ko/docs/Web/HTML/Element/iframe)

---

```js
console.log;
```

---
