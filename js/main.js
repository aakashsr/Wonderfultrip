jQuery(document).ready(function($) {
  $(".counter").counterUp();

  let alreadyBelow900;

  // Emptying out container 2 and 3

  let allHtml = "";
  let compositions1 = $(".composition-container__1");
  let compositions1Html = compositions1.html();

  let compositions = $(".composition-container__2,.composition-container__3");

  let function1 = function() {
    let r = $.Deferred();
    $.each(compositions, (index, composition) => {
      allHtml += $(composition).html();
    });
    return r;
  };

  let function2 = function() {
    $.each(compositions, (index, composition) => {
      $(composition).hide();
    });
  };

  let function3 = function() {
    let mobileHtml = compositions1Html + allHtml;
    compositions1.html(mobileHtml);
  };

  //trigerring everyting when a page loads
  if ($(window).width() < 900) {
    alreadyBelow900 = true;
    function1()
      .done(function2())
      .done(function3());
  }

  // as a function to trigger
  let whenWindowsIsResized = () => {
    if ($(window).width() < 900 && !alreadyBelow900) {
      function1()
        .done(function2())
        .done(function3());
    }
  };

  $(window).resize(function() {
    if ($(window).width() > 900) {
      alreadyBelow900 = false;
    }
    whenWindowsIsResized();
  });
});
