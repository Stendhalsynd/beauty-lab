// 3d carousel slider 구현
var carousel = document.querySelector(".carousel");
var cellCount = 13;
var selectedIndex = 0;

function rotateCarousel() {
  var angle = (selectedIndex / cellCount) * -360;
  var cell;
  carousel.style.transform = "translateZ(-385px) rotateY(" + angle + "deg)";
}

var prevButton = document.querySelector(".previous-button");
prevButton.addEventListener("click", function () {
  selectedIndex--;
  rotateCarousel();
});

var nextButton = document.querySelector(".next-button");
nextButton.addEventListener("click", function () {
  selectedIndex++;
  rotateCarousel();
});
