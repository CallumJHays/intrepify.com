$(function() {
  var duringHeartActivation = false;
  var duringFloweysTurn = false;
  var mode = 'EASY';
  // Array pattern: red, blue, yellow, green
  var colours = ["red", "blue", "yellow", "green"];
  var sequence = [];
  var sequenceIndex = 0;
  var animationDelay = 500; //ms
  var sounds = [new Audio('https://intrepify.com/assets/red.wav'),
    new Audio('https://intrepify.com/assets/blue.wav'),
    new Audio('https://intrepify.com/assets/yellow.wav'),
    new Audio('https://intrepify.com/assets/green.wav')
  ];

  $('.heart').click(function() {
    if (!duringHeartActivation && !duringFloweysTurn) {
      duringHeartActivation = true;
      heartActivated($(this).attr('id'));
      heartClicked($(this).attr('id'));
    }
  });

  function heartActivated(colour) {
    var $clicked = $('#' + colour);
    sounds[colours.indexOf($clicked.attr('id'))].currentTime = 0;
    sounds[colours.indexOf($clicked.attr('id'))].play();
    $clicked.css('-webkit-filter', 'drop-shadow(0px 0px 20px white) saturate(4)');
    setTimeout(function() {
      $clicked.css('-webkit-filter', 'drop-shadow(0px 0px 0px black) saturate(1)');
      duringHeartActivation = false;
    }, animationDelay);
  }

  function floweySequenceLoop(afterError) {
    afterError = afterError || false;
    if (sequenceIndex < sequence.length && duringFloweysTurn) {
      heartActivated(colours[sequence[sequenceIndex]]);
      sequenceIndex++;

      setTimeout(function() {
        floweySequenceLoop(afterError);
      }, animationDelay * 2)
    } else if (!afterError) {
      sequence.push(Math.floor(Math.random() * 4));
      heartActivated(colours[sequence[sequence.length - 1]]);
      sequenceIndex = 0;
      duringFloweysTurn = false;
    } else {
      duringFloweysTurn = false;
      sequenceIndex = 0;
    }
  }

  function floweySays(afterError) {
    afterError = afterError || false;
    duringFloweysTurn = true;
    sequenceIndex = 0;
    floweySequenceLoop(afterError);
  }

  function heartClicked(colour) {
    if (colours[sequence[sequenceIndex]] === colour) {
      sequenceIndex++;
      if (sequenceIndex === sequence.length) {
        $('#counter').text(sequenceIndex + '/20');
        if(sequenceIndex === 20){
          alert("Wow~!");
          alert("You actually DID it!");
          
          alert("Well, it's been fun...");
          alert("Wanna go again? :P");
          restart();
        }
        setTimeout(function() {
          floweySays();
        }, animationDelay * 2);
      }
    } else if (mode === 'EASY') {
      setTimeout(function() {
        floweySays(true);
      }, animationDelay * 2);
    } else {
      $('#flowey').attr('src', 'https://www.intrepify.com/assets/flowey_killer.jpg');
      setTimeout(function() {
        alert('HAHAHAHA.');
        alert("You IDIOT. In this world, it's KILL or BE KILLED.");
        alert("You DIED.");
        alert("Play again?");
        restart();
      }, animationDelay * 5);
    }
  }

  function restart() {
    $('#counter').text('0/20');
    duringFloweysTurn = false;
    sequence = [];
    var floweyImgSrc = (mode === 'EASY') ? ("Flowey_Talk_normal.gif") : ("flowey_evil.png");
    $('#flowey').attr('src', "http://www.intrepify.com/assets/" + floweyImgSrc);
    floweySays();
  }

  $('#startButton').click(function() {
    if ($(this).text() === 'START')
      $(this).text('RESTART');
    restart();
  });

  $('#difficultyButton').click(function() {
    if (mode === 'EASY') {
      mode = 'STRICT';
      $('#difficultyButton').text('STRICT').css('color', 'red');
      $('#flowey').attr('src', 'http://www.intrepify.com/assets/flowey_evil.png');
    } else {
      mode = 'EASY';
      $('#difficultyButton').text('EASY').css('color', '#FFEB3B');
      $('#flowey').attr('src', 'http://www.intrepify.com/assets/Flowey_Talk_normal.gif');
    }
  });
});