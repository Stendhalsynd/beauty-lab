// 선택된 연도, 카테고리, 서브 카테고리를 저장할 변수를 선언합니다.
var selectedYear = null;
var selectedCategory = null;
var selectedSubcategory = null;

function changeButtonColor(event) {
  // 클릭된 버튼이 연도 버튼인지 확인
  if (event.target.classList.contains("year-button")) {
    var yearButtons = document.querySelectorAll(".year-button");

    selectedYear = event.target.textContent;

    // 모든 연도 버튼의 색상과 배경을 초기화
    yearButtons.forEach(function (button) {
      button.style.color = "white";
      button.style.backgroundColor = "lightgray";
      button.style.border = "none";
    });

    // 클릭된 연도 버튼의 스타일을 변경
    event.target.style.color = "#7edc65";
    event.target.style.backgroundColor = "white";
    event.target.style.border = "solid 2px #7edc65";
  }

  // 클릭된 버튼이 카테고리 버튼인지 확인
  if (event.target.classList.contains("category-button")) {
    var categoryButtons = document.querySelectorAll(".category-button");

    selectedCategory = event.target.textContent;
    selectedSubcategory = null; // 새로운 카테고리를 선택하면 서브 카테고리 정보를 초기화합니다.

    // 모든 카테고리 버튼의 색상과 배경을 초기화
    categoryButtons.forEach(function (button) {
      button.style.color = "white";
      button.style.backgroundColor = "lightgray";
      button.style.border = "none";
    });

    // 클릭된 카테고리 버튼의 스타일을 변경
    event.target.style.color = "#7edc65";
    event.target.style.backgroundColor = "white";
    event.target.style.border = "solid 2px #7edc65";

    var subcategoryButtonContainer = document.querySelector(
      ".select-subcategory-button-container"
    );
    subcategoryButtonContainer.innerHTML = "";

    // 새로운 카테고리에 해당하는 추가 버튼을 생성
    if (event.target.textContent === "스킨케어") {
      subcategoryButtonContainer.innerHTML = `
          <div class="subcategory"><h4>세부 카테고리</h4></div>
          <button class="subcategory-button">스킨/토너</button>
          <button class="subcategory-button">로션/에멀젼</button>
          <button class="subcategory-button">앰플/세럼</button>
          <button class="subcategory-button">페이스오일</button>
          <button class="subcategory-button">크림</button>
          <button class="subcategory-button">아이케어</button>
          <button class="subcategory-button">미스트</button>
          <button class="subcategory-button">젤</button>
        `;
    } else if (event.target.textContent === "클렌징/필링") {
      subcategoryButtonContainer.innerHTML = `
          <div class="subcategory"><h4>세부 카테고리</h4></div>
          <button class="subcategory-button">클렌징 폼</button>
          <button class="subcategory-button">클렌징 워터</button>
          <button class="subcategory-button">클렌징 젤</button>
          <button class="subcategory-button">클렌징 오일</button>
          <button class="subcategory-button">클렌징 로션/크림</button>
          <button class="subcategory-button">클렌징 비누</button>
          <button class="subcategory-button">클렌징 티슈</button>
          <button class="subcategory-button">립/아이 리무버</button>
          <button class="subcategory-button">스크럽/필링</button>
        `;
    }
    // ... 나머지 카테고리에 대한 추가 버튼 생성 로직 추가

    // 서브 카테고리 버튼에 이벤트 리스너를 추가
    var subcategoryButtons = document.querySelectorAll(".subcategory-button");
    subcategoryButtons.forEach(function (button) {
      button.addEventListener("click", changeButtonColor);
    });
  }

  // 클릭된 버튼이 서브 카테고리 버튼인지 확인
  if (event.target.classList.contains("subcategory-button")) {
    var subcategoryButtons = document.querySelectorAll(".subcategory-button");

    selectedSubcategory = event.target.textContent;

    // 선택한 서브 카테고리 출력
    setNextPageButtonContent(
      "선택한 세부 카테고리: " + event.target.textContent
    );

    // 모든 서브 카테고리 버튼의 색상과 배경을 초기화
    subcategoryButtons.forEach(function (button) {
      button.style.color = "white";
      button.style.backgroundColor = "lightgray";
      button.style.border = "none";
    });

    // 클릭된 서브 카테고리 버튼의 스타일을 변경
    event.target.style.color = "#7edc65";
    event.target.style.backgroundColor = "white";
    event.target.style.border = "solid 2px #7edc65";
  }

  // next-page-button의 내용을 갱신합니다.
  setNextPageButtonContent();
}

// 연도 버튼에 이벤트 리스너를 추가
var yearButtons = document.querySelectorAll(".year-button");
yearButtons.forEach(function (button) {
  button.addEventListener("click", changeButtonColor);
});

// 카테고리 버튼에 이벤트 리스너를 추가
var categoryButtons = document.querySelectorAll(".category-button");
categoryButtons.forEach(function (button) {
  button.addEventListener("click", changeButtonColor);
});

// next-page-button의 내용 업데이트
function setNextPageButtonContent(content) {
  var nextPageButton = document.querySelector(".next-page-button");

  // 선택한 연도, 카테고리, 서브 카테고리를 모두 함께 보여줍니다.
  var content = "선택된 정보: ";
  if (selectedYear) {
    content += "연도(" + selectedYear + ") ";
  }
  if (selectedCategory) {
    content += "카테고리(" + selectedCategory + ") ";
  }
  if (selectedSubcategory) {
    content += "세부 카테고리(" + selectedSubcategory + ")";
  }

  // 선택된 내용을 next-page-button의 내용으로 설정합니다.
  if (content.trim() === "선택된 정보:") {
    content = "선택된 정보가 없습니다.";
  }
  nextPageButton.textContent = content;
}

// 페이지 로드 시, next-page-button의 초기 내용 설정
document.addEventListener("DOMContentLoaded", function () {
  setNextPageButtonContent();
});

// "next-page-button"을 클릭했을 때 처리하는 함수
function handleNextPageButtonClick() {
  if (
    selectedYear !== null &&
    selectedCategory !== null &&
    selectedSubcategory !== null
  ) {
    // 선택된 값들을 사용하여 URL을 생성하고 해당 페이지로 이동
    let url = "";
    if (
      selectedYear === "2023" &&
      selectedCategory === "스킨케어" &&
      selectedSubcategory === "앰플/세럼"
    ) {
      url = "../list/serum list/serum.html";
    } else if (
      selectedYear === "2023" &&
      selectedCategory === "클렌징/필링" &&
      selectedSubcategory === "클렌징 폼"
    ) {
      url = "../list/cleansing_list/cleansing.html";
    }

    if (url) {
      window.location.href = url;
    } else {
      alert("선택된 페이지가 없습니다.");
    }
  } else {
    alert("모든 값을 선택해주세요!");
  }
}

// "next-page-button"에 이벤트 리스너 등록
const nextPageButton = document.querySelector(".next-page-button");
nextPageButton.addEventListener("click", handleNextPageButtonClick);
