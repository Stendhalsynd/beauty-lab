(function () {
  const button = $(".shopping-title");

  $(document).ready(function () {
    $(".shopping-title").on("click", function () {
      console.log("클릭!");

      window.location.href = "../filter/filter-select-page.html";
    });

    $(".shopping-title").hover(
      function () {
        // 마우스를 올렸을 때의 동작
        console.log("Hover!");
        $(this).css("font-size", "42px");
      },
      function () {
        // 마우스를 내렸을 때의 동작
        console.log("Unhover!");
        $(this).css("font-size", "32px");
      }
    );
  });
})();
