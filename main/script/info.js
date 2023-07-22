// // jQuery를 사용하여 스크립트 작성
$(document).ready(function () {
  // URL 변경을 위한 객체 생성
  var urlMap = {
    li1: "../../images/download.jpg",
    li2: "../../images/review.jpg",
    li3: "../../images/product.jpg",
    li4: "../../images/brand.jpg",
  };

  // item index 초기값 설정
  var selectedIndex = 1;

  // 다음 info-counting-item 을 선택하기 위한 함수
  function selectNextItem() {
    // 다음 info-counting-item 의 클래스 이름 생성
    var nextItemClass = "li" + selectedIndex;

    // info-image 의 background-image url 변경
    $(".info-image").css(
      "background-image",
      "url('" + urlMap[nextItemClass] + "')"
    );

    // 현재 선택한 item 의 selected class 제거
    $(".info-counting-item.selected").removeClass("selected");

    nextItemClass = "." + nextItemClass;

    // 다음 선택될 아이템에 selected 클래스 추가
    $(nextItemClass).addClass("selected");

    // 현재 선택된 항목 외의 다른 항목들의 counting-icon과 counting-index 속성을 변경
    $(".info-counting-item")
      .not(".selected")
      .each(function () {
        var $countingIcon = $(this).find(".counting-icon");
        var $countingTxt = $(this).find(".counting-txt");
        var $countingIndex = $(this).find(".counting-index");

        // counting-icon의 aria-hidden 속성 값을 true로 변경
        $countingIcon.attr("aria-hidden", "true");

        // counter-txt의 style 을 color: #c8c8c8로 변경
        $countingTxt.attr("style", "color: #c8c8c8");

        // counting-index의 aria-selected 속성 값을 false로 변경
        $countingIndex.attr("aria-selected", "false");
      });

    // 현재 선택된 항목의 counting-icon, counting-txt, counting-index 속성을 변경
    var $selectedIcon = $(nextItemClass).find(".counting-icon");
    var $selectedTxt = $(nextItemClass).find(".counting-txt");
    var $selectedIndex = $(nextItemClass).find(".counting-index");

    // counting-icon의 aria-hidden 속성 값을 false로 변경
    $selectedIcon.attr("aria-hidden", "false");

    // counter-txt의 style 을 color: #212529로 변경
    $selectedTxt.attr("style", "color: #212529");

    // counting-index의 aria-selected 속성 값을 true로 변경
    $selectedIndex.attr("aria-selected", "true");

    // 숫자가 증가하는 효과 적용
    var numberValue = parseInt($selectedIndex.text().replace(/,/g, "")); // 콤마(,)를 제거하고 숫자로 변환
    animateNumber($selectedIndex, numberValue);

    // update selected index for the next iteration
    selectedIndex++;
    if (selectedIndex > 4) {
      selectedIndex = 1;
    }
  }

  // initially select the first info-counting-item
  selectNextItem();

  // call selectNextItem function at 2-second intervals
  setInterval(selectNextItem, 2000);
});

// Animate function to increment the number
function animateNumber($element, targetNumber) {
  $({ countNum: 0 }).animate(
    { countNum: targetNumber },
    {
      duration: 500, // animation duration (0.5 second)
      easing: "linear", // set animation speed curve
      step: function () {
        // function called at each step of animation
        var formattedNumber = Math.floor(this.countNum).toLocaleString(); // Convert to format including comma (,)
        $element.text(formattedNumber);
      },
      complete: function () {
        // Function called after animation is complete
        var finalFormattedNumber = targetNumber.toLocaleString();
        $element.text(finalFormattedNumber); // set the final number
      },
    }
  );
}
