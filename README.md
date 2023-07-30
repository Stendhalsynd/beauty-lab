# 📚 화장품 추천 사이트 - Beauty Lab [코위]

# 📗 Project Introduction

안녕하세요! 프로젝트 [Beauty Lab] 을 진행하게 된 <span style="color: palegreen">[코위]</span> 팀입니다. 😀

화장품 구매시 <span style="color: salmon">수많은 제품들중 나에게 맞는 제품을 찾기 위해서 많은 영상을 참고해야 하는 번거로움 </span>이 있습니다.

그런 점에서 <span style="color: palegreen">20~30대 여성을 페르소나</span>로 삼아 <span style="color: palegreen">쉽고 간편하게 나에게 맞는 화장품을 찾고싶다는 페르소나의 니즈</span>를 충족시키기 위한 사이트를 구현해보는 것이 저희 <span style="color: palegreen">[코위]</span> 팀의 목표입니다.

코위는 화장품 위키 cosmetics wiki 의 줄임표현입니다!

### ✏️ Main Feature

- 화장품 필터링
- 리스트 조회 및 세부사항 확인

# 📘 Milestone

- 개발 시작 일자 : 2023년 7월 17일 (월)
- 개발 완료 일자 : 2023년 7월 23일 (일)

# 📘 Goal

- 반응형
- 스크롤 인터렉션
- Sass 활용
- BEM (Block, Element, Modifier) (가독성 좋은 스타일 기법)

# 📘 Contribution

페이지의 전체 흐름을 메인페이지 - 필터페이지 - 리스트페이지 - 상세페이지로 나눌때 `메인페이지`에 대해 작업을 진행했습니다.

- 서비스의 전체 내용을 알 수 있는 페이지 개발
- netlify 를 통한 서비스 배포
- scss 를 적극 활용하여 css 가독성 개선
- fork 프로그램을 통한 git 관리

## 🌎 Total Page

| 메인페이지                                                                                        | 필터페이지                                                                                        |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| ![](https://velog.velcdn.com/images/qmflf556/post/a11e286c-aa98-451b-a16e-c2b3f98bc2c4/image.png) | ![](https://velog.velcdn.com/images/qmflf556/post/adce0b7c-0d01-4b3e-ac92-2256b030654f/image.png) |

| 리스트페이지                                                                                      | 상세페이지                                                                                        |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| ![](https://velog.velcdn.com/images/qmflf556/post/175a587f-55b7-4709-8dde-e477b30d9f56/image.png) | ![](https://velog.velcdn.com/images/qmflf556/post/8539ad9d-a2c7-4072-b377-c39acef28416/image.png) |

# 🛠️ Technology Stack

- Frontend : `Javascript`, `Scss`
- Deployment : `Netlify`

# 📓 Bloging

세부적인 사항들은 블로그에 정리해두었습니다 😃

- [Stendhalsynd 의 velog](https://velog.io/@qmflf556/%ED%8F%AC%EC%8A%A4%EC%BD%94x%EC%BD%94%EB%94%A9%EC%98%A8-KDT-Web-8-3%EC%A3%BC%EC%B0%A8-%ED%9A%8C%EA%B3%A02-Team-Project%EC%BD%94%EC%9C%84-Cosmetics-Wiki-%ED%99%94%EC%9E%A5%ED%92%88-%EC%B6%94%EC%B2%9C-%EC%82%AC%EC%9D%B4%ED%8A%B8#--%EA%B7%9C%EC%B9%99at-rule)

# 🔥 Members

- Standhalsynd (main page) : 본인
- dawncoding (filter page) : https://github.com/dawncoding
- JSHWJ (detail page) : https://github.com/JSHWJ
- suhyuns22 (list page) : https://github.com/suhyuns22

# ⚙️ Environment

- scss 설치 및 컴파일

```
npm install sass -g
sass --no-source-map --watch scss:css
```