$.getScript('http://platform.twitter.com/widgets.js');

// Stackoverflow answer by crazyTim: http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
Array.prototype.randomDiffElement = function(last) {
   if (this.length == 0) {
      return;
   } else if (this.length == 1) {
      return this[0];
   } else {
      var num = 0;
      do {
         num = Math.floor(Math.random() * this.length);
      } while (this[num] == last);
      return this[num];
   }
}

var buttonText = [
  "Spit some fire", "Shoot first", "pew pew pew",
  "Ok, Go!", "Blackjack!", "Eat lead", "Gimme some lovin'",
  "Go go gadget", "To infinity, and-", "Gimme a quote",
  "Lay it down", "Show me the money", "FOR GLORY!", "KAPOW"
];

function getNewQuote(){
  $('#quoteBox').addClass('animated zoomOutLeft');
  
  $.get("http://www.stands4.com/services/v2/quotes.php", {"uid": "4624", "tokenid": "rjm6i421kkjvYURy"}, function(xml){
    console.log(xml);
    $('#quoteBox').removeClass('zoomOutLeft').html('"' + $(xml).find('quote').text() + '"<br> - ' + $(xml).find('author').text()).addClass('zoomInRight');
    // remove existing tweet button
    $('#tweetBtn iframe').remove();
    // regenerate it
    var tweetBtn = $('<a></a>')
        .addClass('twitter-share-button')
        .attr('href', 'http://twitter.com/share')
        .attr('data-text', $('#quoteBox').text())
        .attr('data-size', 'large')
        .attr('data-url', ' ');
    $('#tweetBtn').append(tweetBtn);
    twttr.widgets.load();
  }, "xml");
  
  $('#quoteSpitter').text(buttonText.randomDiffElement($('#quoteSpitter').text())).removeClass('animated tada');
  window.setTimeout(function(){
    $('#quoteSpitter').addClass('animated tada');
  }, 5);
}