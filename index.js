var randomColorChosen = [];
var buttonColors = ["green", "red", "yellow", "blue"];
var start = true;
level = 0;
userList = [];

function startover() {
  level = 0;
  start = true;
  userList = [];
  randomColorChosen = [];
}

$(document).on("keypress", function (event) {
  setTimeout(() => {
    if (start == true) {
        nextSequence();
      }
  }, 200);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function pressed(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
  playSound(name);
}

$(".btn").on("click", function (event) {
  pressed(event.target.id);

  //   var colorClicked = event.target.id

  userList.push(event.target.id);
  checkSequence(userList.length - 1);
});

function checkSequence(number) {
  if (randomColorChosen[number] === userList[number]) {
    if (randomColorChosen.length === userList.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
      playSound("wrong")
      $("body").addClass("game-over")
      $("#level-title").text("Game Over !! Press Any Key to Restart ");
      setTimeout(() => {
          $("body").removeClass("game-over")
      }, 200);
    startover();
  }
}

function nextSequence() {
  start = false;
  userList = [];
  level++;
  $("#level-title").text("Level " + level);

  var num = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[num];
  randomColorChosen.push(randomColor);
  pressed(randomColor);

}
