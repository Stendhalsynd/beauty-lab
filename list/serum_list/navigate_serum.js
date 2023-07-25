const btn2 = document.querySelector(".btn2");

// Add a click event listener to the element
btn2.addEventListener("click", () => {
  // When the element is clicked, display "클릭"
  console.log("버튼 클릭");
  const sliderSelectedItem = document.querySelector(".slider__item-selected");

  const dataIndex = sliderSelectedItem.getAttribute("data-index");

  if (dataIndex == "0") {
    console.log("0번");
    window.location.href = "../../../details/html/ample_n.html";
  }
  if (dataIndex == "1") {
    console.log("1번");
    window.location.href = "../../../details/html/isoi.html";
  }
  if (dataIndex == "2") {
    console.log("2번");
    window.location.href = "../../../details/html/aboutme.html";
  }
});
