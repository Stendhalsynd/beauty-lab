(function () {
  const backgroundElem = document.querySelector(".main-background01");
  const dimBgElem = $(".main-visual-backdrop");
  const videowBgElem = document.querySelector(".iframe-container");

  const menu = document.querySelector(".hd-menu");
  const topContentsElem = document.querySelector(".top-contents-main");
  const appDownloadElem = document.querySelector(".top-contents-download");

  const subContent01Elem = $(
    ".top-contents-sub .top-contents-desc:nth-child(1)"
  );
  const subContent02Elem = $(
    ".top-contents-sub .top-contents-desc:nth-child(2)"
  );
  const subContent03Elem = $(
    ".top-contents-sub .top-contents-desc:nth-child(3)"
  );

  function updateBackgroundScale() {
    const posY = window.pageYOffset || document.documentElement.scrollTop;
    const scaleValue = 1 + (posY / window.innerHeight) * 0.5;
    const contentOpacityValue = Math.max(
      1 - posY / (window.innerHeight * 0.3),
      0
    );

    // top-contents-sub 세가지 p 의 opacity 계산
    const content01OpacityValue = Math.min(
      (posY - window.innerHeight * 0.3) / (window.innerHeight * 0.2),
      1
    );
    const content02OpacityValue = Math.min(
      (posY - window.innerHeight * 0.7) / (window.innerHeight * 0.2),
      1
    );
    const content03OpacityValue = Math.min(
      (posY - window.innerHeight * 1.1) / (window.innerHeight * 0.2),
      1
    );

    // top-contents-sub 세가지 p 의 translate3dY 계산

    const content01TranslateY = Math.max(
      Math.min(
        ((posY - window.innerHeight * 0.3) / (window.innerHeight * 0.2)) * -20,
        0
      ),
      -20
    );

    const content02TranslateY = Math.max(
      Math.min(
        ((posY - window.innerHeight * 0.7) / (window.innerHeight * 0.2)) * -20,
        0
      ),
      -20
    );

    const content03TranslateY = Math.max(
      Math.min(
        ((posY - window.innerHeight * 1.1) / (window.innerHeight * 0.2)) * -20,
        0
      ),
      -20
    );

    // posY 가 0~ window.innerHeight * 0.5,
    // ~ window.innerHeight * 0.9
    // window.innerHeight * 0.9 ~ 일때 값 설정
    const dimBgOpacityValue =
      posY <= window.innerHeight * 0.5
        ? (posY / (window.innerHeight * 0.5)) * 0.4
        : posY < window.innerHeight * 1.5
        ? 0.4
        : Math.max(
            0.4 -
              (posY - window.innerHeight * 0.5) / (window.innerHeight * 0.4),
            0
          );

    // top main 배경화면 스크롤 인터렉션
    if (posY < window.innerHeight * 1.1) {
      $(".logo").html(`<img
src="../images/Beauty Lab_white.png"
alt="logo"
width="48px"
height="24px"
class="hd-logo"
/>`);
      menu.setAttribute("fill", "#FFFFFF");
      $(".header").css("background", "transparent");

      backgroundElem.style.transform = `scale3d(${scaleValue},${scaleValue},${scaleValue})`;
      backgroundElem.style.opacity = 1;
      appDownloadElem.style.opacity = 1;
      videowBgElem.style.transform = `scale3d(${scaleValue},${scaleValue},${scaleValue})`;
      videowBgElem.style.opaicty = 1;
      $(".menu .list .item").css("color", "white");
    } else {
      $(".logo").html(`<img
src="../images/Beauty Lab.png"
alt="logo"
width="48px"
height="24px"
class="hd-logo"
/>`);
      menu.setAttribute("fill", "#7EDC65");
      $(".header").css("background", "white");

      const bgOpacityValue = Math.max(
        1 - (posY - window.innerHeight) / window.innerHeight,
        0
      );
      const downloadOpacityValue = Math.max(
        1 - (posY - window.innerHeight * 0.5) / window.innerHeight,
        0
      );
      backgroundElem.style.opacity = bgOpacityValue;
      appDownloadElem.style.opacity = downloadOpacityValue;
      videowBgElem.style.opacity = bgOpacityValue;
      $(".menu .list .item").css("color", "black");
    }

    // top main contents 스크롤 인터렉션

    $(dimBgElem).css("background", `rgba(0,0,0,${dimBgOpacityValue})`);

    if (posY < window.innerHeight * 0.3) {
      topContentsElem.style.opacity = contentOpacityValue;
      $(subContent01Elem).css("opacity", "0");
      $(subContent02Elem).css("opacity", "0");
      $(subContent03Elem).css("opacity", "0");
    } else if (posY < window.innerHeight * 0.7) {
      $(topContentsElem).css("opacity", "0");
      $(subContent01Elem).css("opacity", `${content01OpacityValue}`);
      $(subContent02Elem).css("opacity", "0");
      $(subContent03Elem).css("opacity", "0");

      $(subContent01Elem).css(
        "transform",
        `translate3d(0px, ${content01TranslateY}px, 0px)`
      );
      $(subContent02Elem).css("transform", `translate3d(0px, 0px, 0px)`);
      $(subContent03Elem).css("transform", `translate3d(0px, 0px, 0px)`);
    } else if (posY < window.innerHeight * 1.1) {
      $(topContentsElem).css("opacity", "0");
      $(subContent01Elem).css("opacity", "1");
      $(subContent02Elem).css("opacity", `${content02OpacityValue}`);
      $(subContent03Elem).css("opacity", "0");

      $(subContent01Elem).css("transform", `translate3d(0px, -20px, 0px)`);
      $(subContent02Elem).css(
        "transform",
        `translate3d(0px, ${content02TranslateY}px, 0px)`
      );
      $(subContent03Elem).css("transform", `translate3d(0px, 0px, 0px)`);
    } else if (posY < window.innerHeight * 1.5) {
      $(topContentsElem).css("opacity", "0");
      $(subContent01Elem).css("opacity", "1");
      $(subContent02Elem).css("opacity", "1");
      $(subContent03Elem).css("opacity", `${content03OpacityValue}`);

      $(subContent01Elem).css("transform", `translate3d(0px, -20px, 0px)`);
      $(subContent02Elem).css("transform", `translate3d(0px, -20px, 0px)`);
      $(subContent03Elem).css(
        "transform",
        `translate3d(0px, ${content03TranslateY}px, 0px)`
      );
    } else {
      $(topContentsElem).css("opacity", "0");
    }

    if (posY > window.innerHeight * 1.9) {
      $(subContent01Elem).css("opacity", "0");
      $(subContent02Elem).css("opacity", "0");
      $(subContent03Elem).css("opacity", "0");
    }

    // 앱 다운로드 스크롤 인터렉션
    if (posY === 0) {
      appDownloadElem.classList.remove("sticky");
    } else if (posY > 0) {
      appDownloadElem.classList.add("sticky");
    }
  }

  window.addEventListener("scroll", updateBackgroundScale);

  // 초기 스케일 설정
  updateBackgroundScale();
})();
