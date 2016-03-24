$(function() {
  function onScrollBegin(sectionIndex, sectionArray){
    if(sectionIndex === 0){
      $("#section1").animate({
        "background-position-x": "50%"
      }, 1500);
    }
    
    if(sectionIndex === 1){
      $("#section2").animate({
        "background-position-x": "0%"
      }, 1500);
    }
    
    if(sectionIndex === 2){
      $("#section3").animate({
        "background-position-y": "0%"
      }, 1500);
    }
    
    if(sectionIndex === 3){
      $("#section4").animate({
        "background-position-y": "50%"
      }, 1500);
    }
  }
  
  function onScrollEnd(sectionIndex, sectionArray){
    if(sectionIndex !== 0){
      $("#section1").css("background-position-x", "0%");
    }
    if (sectionIndex !== 1){
      $("#section2").css("background-position-x", "50%");
    }
    if(sectionIndex !== 2){
      $("#section3").css("background-position-y", "50%");
    }
    if(sectionIndex !== 3){
      $("#section4").css("background-position-y", "0%");
    }
  }
  
  $("#stuff").typed({
    strings: ["Websites", "Robots", "Apps", "Games", "Cool stuff"],
    backDelay: 3000,
    loop: true
  });

  setTimeout(function(){
    $.scrollify({
      section : ".section",
      scrollSpeed: 1500,
      before: onScrollBegin,
      after: onScrollEnd
    });
  }, 100);
});