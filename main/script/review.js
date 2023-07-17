// (function () {
//   const wrapElem = $(".review-card-wrap");
//   let count = 0;

//   function updateReviewWrap() {
//     // count를 기반으로 transform 스타일을 변경합니다.
//     if (count === 0) {
//       wrapElem.css("transform", "none");
//     } else if (count === 1) {
//       wrapElem.css("transform", "translate3d(-100%, 0px, 0px)");
//     } else if (count === 2) {
//       wrapElem.css("transform", "translate3d(-200%, 0px, 0px)");
//     }

//     // count를 증가시키고, 3으로 나눈 나머지를 구하여 0, 1, 2로 유지합니다.
//     count = (count + 1) % 3;
//   }

//   // 3초마다 updateReviewWrap 함수를 호출합니다.
//   setInterval(updateReviewWrap, 3000);
// })();

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
