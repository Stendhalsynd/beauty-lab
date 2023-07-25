---
marp: true
theme: gaia
_class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
---

<style>
  /* Add your custom CSS here */
  /* For example, to adjust the section size and margins, you can use: */
  section {
    width: 100%; /* Set the section width to 100% of the slide area */
    height: 100%; /* Set the section height to 100% of the slide area */
    /* margin: 0; Remove any margin around the section */
    /* padding: 0; Remove any padding within the section */
    background-size: cover; /* Make sure the background image covers the entire section */
    background-repeat: no-repeat; /* Prevent the background image from repeating */
  }
  
  /* You can also adjust the font size and other styles if needed */
  section h1, section h2, section h3 {
    font-size: 30px; /* Adjust the font size for headings */
    margin-top: 120px;
  }

  section p {
    font-size: 24px; /* Adjust the font size for paragraphs */
  }
</style>

# 📘 filter-select-page: 화장품 카테고리 선택 페이지

## 📗 목표

- 반응형
- 스크롤 스냅 구현
- 3d carsousel slider 구현
- 클린 코딩

---

# 📘filter-select-page: 화장품 카테고리 선택 페이지

- 반응형: 모바일

```
<!--  -->
@media screen and (max-width: 414px) {
}
```

@media(미디어쿼리)를 통해 iphone-xr의 width(414px)인 경우의 화면 구성

---

# 📘 filter-select-page: 화장품 카테고리 선택 페이지
