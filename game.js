//alert('fine')
var h1 = $("h1").html();
console.log(h1);

let gamePattern = [];

let userClickedPattern = [];

let buttonColour = ["red", "blue", "green", "yellow"];

var gameNumber = 0; //monitor
var click = true;
var restart = false;
var level = "level ";
//var difficulty = 0;

//START GAME......
document.addEventListener("keypress", () => {
  if (gameNumber == 20 ) {
    location.reload();
  } else if (gameNumber < 1) {
    setTimeout(() => {
      nextSequence();
    }, 450);
  }
});
document.addEventListener("click", () => {

  if (gameNumber == 20 && restart === true) {
    location.reload();
  } else if (gameNumber < 1 && click === true) {
    setTimeout(() => {
      nextSequence();
    }, 450);
  } else {
    click = true;
  }
});

function nextSequence() {
  if (gameNumber == 20) {
    gameOver();
  } else {
    let randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColour[randomNumber];
    gamePattern.push(randomChosenColour);

    let buttons = $("#" + randomChosenColour);
   // buttons.ready(() => {
      buttons.css("opacity", "0");
      setTimeout(() => {
        buttons.css("opacity", "1");
      }, 200);
   // });

    playSound(buttons.text()); //button colour getter
    gameNumber++;
    $("h1").html(level + gameNumber);
  }
}

// let audio = new Audio('/sounds/'+randomChosenColour+'.mp3');
// audio.play();
//or
function playSound(sound) {
  switch (sound) {
    case "red":
      new Audio("./sounds/red.mp3").play(); //audio constructor function
      break;
    case "green":
      new Audio("./sounds/green.mp3").play();
      break;
    case "yellow":
      new Audio("./sounds/yellow.mp3").play();
      break;
    case "wrong":
      new Audio("./sounds/wrong.mp3").play();
      break;
    default:
      new Audio("./sounds/blue.mp3").play();
  }
}

///...DETECTING WHEN A BUTTON IS CLICK SENDING THE 'ID' TO AN EMPTY ARRAY....///////
let clickFreq = 0;
let chance = 0;
$(".btn").click((e) => {
  if (gamePattern.length > 0) {
    var userChoosenColour = e.target; //finds the node
    // console.log(userChoosenColour)
    var id = userChoosenColour.getAttribute("id");
    let patternItems = userClickedPattern.length;
    userClickedPattern.push(id);

    if (id == userClickedPattern[clickFreq] && id == gamePattern[clickFreq]) {
      //1sd check
      playSound(id);
      if (clickFreq == patternItems) {
        //2nd check
        setTimeout(() => {
          nextSequence();
        }, 700); //automate next level
        clickFreq = 0;
      } else {
        userClickedPattern.pop();
        clickFreq++;
      }
    } else {
      userClickedPattern.pop();
      if (chance > 0) {
        gameOver();
        chance = 0;
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
          $("body").removeClass("game-over");
        }, 100);
        $("h1").html("Last Chance !");
        chance++;
      }
    }

    animatePress($("#" + id));
  }
});

//BUTTON ANIMATION......
function animatePress(curentColour) {
  curentColour.addClass("pressed");
  setTimeout(() => {
    curentColour.removeClass("pressed");
  }, 100);
}

//GAMEOVER...
function gameOver() {
  if (gameNumber == 20) {
    click = false;
    restart = true;
    setInterval(() => {
      $(".btn").toggleClass("pressed");
    }, 100);
    $("h1").html("You Won !, Smart Ass. Press any key to restart.");
    clickFreq = undefined;
    gameNumber = 20; //hold before reset
   
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").html("Game Over!, Click any key to restart! ");
    clickFreq = 0;
    gameNumber = 0;
    gamePattern = [];
    userClickedPattern = [];
    click = false;
  }
}
