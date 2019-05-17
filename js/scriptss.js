jQuery(document).ready(function($) {
  $(".counter").counterUp();

  let below;
  if ($(window).width() < 900) {
    below = true;
  } else {
    below = false;
  }

  let htmlOfComposition2and3 = "";
  let compositions1 = $(".composition-container__1");
  let compositions1Html = compositions1.html();
  let finalHtml = "";

  let compositions = $(".composition-container__2,.composition-container__3");

  let function1 = function() {
    let r = $.Deferred();

    $.each(compositions, (index, composition) => {
      htmlOfComposition2and3 += $(composition).html();
    });
    return r;
  };

  let function2 = function() {
    finalHtml = compositions1Html + htmlOfComposition2and3;
  };

  let function3 = function() {
    if ($(window).width() < 900) {
      below = true;
      //#1
      $.each(compositions, (index, composition) => {
        $(composition).hide();
      });
      //#2
      compositions1.html(htmlOfComposition2and3);
    }
  };

  function1()
    .done(function2())
    .done(function3());

  /* 
    scene-01 , The $(window).width() < 900 when the page loads
    #1 composition-container__2,composition-container__3 must be hidden
    #2 content of composition-container__2 and composition-container__3 must be injected into composition-container__1
    # when resized, if  $(window).width() < 900 should do nothing
    # when resized $(window).width() > 900 should make omposition-container__2 and composition-container__3 visible and composition-container__1 content must be like earlier with only 3 divs
    
  */

  let resizeFunction = function() {
    if ($(window).width() < 900 && !below) {
      below = true;
      //#1
      $.each(compositions, (index, composition) => {
        $(composition).hide();
      });
      //#2
      compositions1.html(htmlOfComposition2and3);
    }

    if ($(window).width() > 900 && below) {
      below = false;
      $.each(compositions, (index, composition) => {
        $(composition).show();
      });
      compositions1.html(compositions1Html);
    }
  };

  $(window).resize(resizeFunction());
});
