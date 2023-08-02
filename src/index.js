var Rod1 = document.getElementById("rod1");
var Rod2 = document.getElementById("rod2");
var Ball = document.getElementById("ball");
var StartCard = document.getElementById("start");
var RoundCard = document.getElementById("round");
var Rod1Rounds = document.getElementById("rod1-score");
var Rod2Rounds = document.getElementById("rod2-score");
var ResetButton = document.getElementById("reset-btn");

// Moving Rod Code Starts.

var rodStep = 15;
var Winner = "Rod2";
var rodLeft = parseFloat(
  window.getComputedStyle(Rod1, null).getPropertyValue("left")
);
var rodRight = parseFloat(
  window.getComputedStyle(Rod1, null).getPropertyValue("right")
);
var Rod1Score = 0;
var maxRod1Score = 0;
var Rod2Score = 0;
var maxRod2Score = 0;
var points = 5;
var hasGameStarted = false;
var hasRoundStarted = false;
window.addEventListener("keydown", function (event) {
  var key = event.keyCode;
  if (key === 65 && hasRoundStarted) {
    moveRodLeft();
  } else if (key === 68 && hasRoundStarted) {
    moveRodRight();
  } else if (key === 13 && !hasRoundStarted) {
    startGame();
    if (!hasGameStarted) {
      alert("The Game Has Started!");
      hasGameStarted = true;
    }
    moveBall();
  }
});

ResetButton.addEventListener("click", resetGame);

function moveRodLeft() {
  if (rodLeft <= -5) {
    return;
  }
  rodLeft -= rodStep;
  rodRight += rodStep;
  Rod1.style.left = rodLeft + "px";
  Rod1.style.right = rodRight + "px";
  Rod2.style.left = rodLeft + "px";
  Rod2.style.right = rodRight + "px";
}

function moveRodRight() {
  if (rodRight <= -5) {
    return;
  }
  rodLeft += rodStep;
  rodRight -= rodStep;
  Rod1.style.left = rodLeft + "px";
  Rod1.style.right = rodRight + "px";
  Rod2.style.left = rodLeft + "px";
  Rod2.style.right = rodRight + "px";
}

function startGame() {
  hasRoundStarted = true;
  StartCard.style.display = "none";
  RoundCard.style.display = "none";
}

// Moving Rod Code Ends.

// Moving Ball Code Starts.

var ballStep = 1;
function moveBall() {
  let ballTop = parseFloat(
    window.getComputedStyle(Ball, null).getPropertyValue("top")
  );
  let ballBottom = parseFloat(
    window.getComputedStyle(Ball, null).getPropertyValue("bottom")
  );
  let ballLeft = parseFloat(
    window.getComputedStyle(Ball, null).getPropertyValue("left")
  );
  let ballRight = parseFloat(
    window.getComputedStyle(Ball, null).getPropertyValue("right")
  );
  let leftDirFlag;
  let rightDirFlag;
  let topDirFlag;
  let bottomDirFlag;
  if (Winner === "Rod1") {
    leftDirFlag = 1;
    rightDirFlag = -1;
    topDirFlag = 1;
    bottomDirFlag = -1;
  } else if (Winner === "Rod2") {
    leftDirFlag = 1;
    rightDirFlag = -1;
    topDirFlag = -1;
    bottomDirFlag = 1;
  }
  let Interval = setInterval(function () {
    ballTop += topDirFlag * ballStep;
    ballBottom += bottomDirFlag * ballStep;
    ballLeft += leftDirFlag * ballStep;
    ballRight += rightDirFlag * ballStep;
    Ball.style.top = ballTop + "px";
    Ball.style.bottom = ballBottom + "px";
    Ball.style.left = ballLeft + "px";
    Ball.style.right = ballRight + "px";
    if (ballRight <= 0 || ballLeft <= 0) {
      leftDirFlag *= -1;
      rightDirFlag *= -1;
    }
    if (ballTop <= 25 && ballLeft >= rodLeft && ballRight >= rodRight) {
      topDirFlag *= -1;
      bottomDirFlag *= -1;
      Rod1Score += points;
    } else if (ballTop < 16) {
      Rod2Won(Interval);
      resetRound();
    }
    if (ballBottom <= 26 && ballLeft >= rodLeft && ballRight >= rodRight) {
      topDirFlag *= -1;
      bottomDirFlag *= -1;
      Rod2Score += points;
    } else if (ballBottom < 17) {
      Rod1Won(Interval);
      resetRound();
    }
  }, 0.5);
}

function Rod1Won(Interval) {
  Rod1Score += points;
  maxRod1Score = Math.max(maxRod1Score, Rod1Score);
  Rod1Rounds.innerText++;
  clearInterval(Interval);
  Winner = "Rod1";
  alert(
    "Rod 1 wins with a score of " +
      Rod1Score +
      ". Max score is: " +
      maxRod1Score
  );
}

function Rod2Won(Interval) {
  Rod2Score += points;
  maxRod2Score = Math.max(maxRod2Score, Rod2Score);
  Rod2Rounds.innerText++;
  clearInterval(Interval);
  Winner = "Rod2";
  alert(
    "Rod 2 wins with a score of " +
      Rod2Score +
      ". Max score is: " +
      maxRod2Score
  );
}

function resetRound() {
  resetPositions();
  resetRoundScores();
  hasRoundStarted = false;
  RoundCard.style.display = "flex";
}

var BallInitialTopPosition1 = 25;
var BallInitialTopPosition2 = 693.6;
var BallInitialBottomPosition1 = 694.6;
var BallInitialBottomPosition2 = 26;
var BallInitialHorPosition = 755;
var RodInitialHorPosition = 643;

function resetPositions() {
  Rod1.style.left = RodInitialHorPosition + "px";
  Rod2.style.left = RodInitialHorPosition + "px";
  rodLeft = RodInitialHorPosition;
  rodRight = RodInitialHorPosition;
  Ball.style.left = BallInitialHorPosition + "px";
  Ball.style.right = BallInitialHorPosition + "px";
  if (Winner === "Rod1") {
    Ball.style.top = BallInitialTopPosition1 + "px";
    Ball.style.bottom = BallInitialBottomPosition1 + "px";
  } else if (Winner === "Rod2") {
    Ball.style.top = BallInitialTopPosition2 + "px";
    Ball.style.bottom = BallInitialBottomPosition2 + "px";
  }
}

function resetRoundScores() {
  Rod1Score = 0;
  Rod2Score = 0;
}

function resetGame() {
  Winner = "Rod2";
  resetPositions();
  resetRoundScores();
  maxRod1Score = 0;
  maxRod2Score = 0;
  hasGameStarted = false;
  RoundCard.style.display = "none";
  StartCard.style.display = "flex";
  Rod1Rounds.innerText = "0";
  Rod2Rounds.innerText = "0";
}

// Moving Ball Code Ends.
