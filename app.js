var colors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var gamestarted = false;

$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function () {
  if (!gamestarted) {
    $("h1").text("Level " + level);
    newSequence();
    gamestarted = true;
  }
});

function newSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomnumber = Math.floor(Math.random() * 4);
  var randomChosenColour = colors[randomnumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(!00);
  playSound(randomChosenColour);
}
function checkAnswer(currentlevel) {
  if (userClickedPattern[currentlevel] === gamePattern[currentlevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        newSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("h1").text("Game over! Please any key to restart");
    var sound = new Audio("/sounds/wrong.mp3");
    sound.play();

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function playSound(name) {
  var sound = new Audio("/sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
function startOver() {
  level = 0;
  gamePattern = [];
  gamestarted = false;
}
