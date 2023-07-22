(function () {
  const wrapElem = $(".review-card-wrap");
  const videoElem = $(".review-card-video");
  const video1Elem = $(".card01");
  const video2Elem = $(".card02");
  const video3Elem = $(".card03");

  let count = 0;

  // function autoplay() {
  //   videoElem.play();
  // }

  function updateReviewWrap() {
    // count를 기반으로 transform 스타일을 변경
    if (count === 0) {
      wrapElem.css("transform", "none");
      // video1Elem.play();
    } else if (count === 1) {
      wrapElem.css("transform", "translate3d(-100%, 0px, 0px)");
      // video2Elem.play();
    } else if (count === 2) {
      wrapElem.css("transform", "translate3d(-200%, 0px, 0px)");
      // video3Elem.play();
    }

    // count를 증가시키고, 3으로 나눈 나머지를 구하여 0, 1, 2로 유지
    count = (count + 1) % 3;
  }

  // 매 3초마다 updateReviewWrap 함수 호출
  setInterval(updateReviewWrap, 3000);

  // wrapElem 의 스타일 변화를 감지하기 위해 MutationObserver 생성
  const observer = new MutationObserver(function (mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === "style") {
        // review-card-wrap 의 스타일이 바뀔때 비디오 실행
        videoElem.currentTime = 0;
        // videoElem.play();
      }
    }
  });

  updateReviewWrap();

  // review-card-wrap 의 attribute 에 따라 observing 변화 시작
  observer.observe(wrapElem[0], { attributes: true });
})();

(function () {
  function toggleAriaSelected() {
    const reviewTagGroups = [
      [0, 6, 8], // [neutral, 20s, not applicable]
      [3, 5, 9], // [oily, combination, teens]
      [2, 7, 10], // [30s, acne, sensitive]
    ];
    let currentGroupIndex = 0;
    let currentGroup = reviewTagGroups[currentGroupIndex];

    // 3초마다 실행되는 setInterval 함수
    setInterval(() => {
      // 이전 그룹의 태그들의 aria-selected를 false로 변경
      for (const index of currentGroup) {
        document
          .getElementsByClassName("review-tag")
          [index].setAttribute("aria-selected", "false");
      }

      // 그룹 인덱스를 증가시키고, 배열 범위를 넘어가면 다시 0으로 설정
      currentGroupIndex = (currentGroupIndex + 1) % reviewTagGroups.length;
      currentGroup = reviewTagGroups[currentGroupIndex];

      // 새로운 그룹의 태그들의 aria-selected를 true로 설정
      for (const index of currentGroup) {
        document
          .getElementsByClassName("review-tag")
          [index].setAttribute("aria-selected", "true");
      }
    }, 3000); // 3초마다 실행 (3000 밀리초 = 3초)
  }

  // 페이지가 로드되면 toggleAriaSelected 함수 호출
  window.onload = toggleAriaSelected;
})();
