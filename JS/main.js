const grid = document.querySelector(".grid");
const resultsDisplay = document.querySelector(".results");
let currentPlayerIndex = 318;
let width = 22;
let height = 15;
let direction = 1;
let cometId;
let goingRight = true;
let cometsRemoved = [];
let results = 0;

for (let i = 0; i < 330; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

//Comet starting locations
const approachingComets = [
  0, 1, 2, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 23, 24, 26, 27, 29,
  30, 31, 32, 34, 35, 39, 40, 41, 44, 46, 47, 48, 49, 50, 51, 52, 53, 57, 58,
  59, 60, 62, 63, 66, 69, 70, 75, 76, 77, 80, 82, 83, 85, 88, 90, 93, 94, 96,
  98, 99, 100,
];


//Draws comets
function draw() {
  for (let i = 0; i < approachingComets.length; i++) {
    if (!cometsRemoved.includes(i)) {
      squares[approachingComets[i]].classList.add("comet");
    }
    console.log(approachingComets.indexOf("50"));
  }
}

draw();

//then removes comets to simulate the animation
function remove() {
  for (let i = 0; i < approachingComets.length; i++) {
    squares[approachingComets[i]].classList.remove("comet");
  }
}

squares[currentPlayerIndex].classList.add("player");

//Player movement left/right and boundaries set to limit range of movement.
function movePlayer(e) {
  squares[currentPlayerIndex].classList.remove("player");
  switch (e.key) {
    case "ArrowLeft":
      if (currentPlayerIndex % width !== 0) currentPlayerIndex -= 1;
      break;
    case "ArrowRight":
      if (currentPlayerIndex % width < width - 1) currentPlayerIndex += 1;
      break;
  }
  squares[currentPlayerIndex].classList.add("player");
}
document.addEventListener("keydown", movePlayer);

//Comet movement
function moveComets() {
  const leftEdge = approachingComets[0] % width === 0;
  const rightEdge =
    approachingComets[approachingComets.length - 2] % width === width - 1;
  remove();

  //Defines the edges of the board
  if (rightEdge && goingRight) {
    for (let i = 0; i < approachingComets.length; i++) {
      approachingComets[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < approachingComets.length; i++) {
      approachingComets[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < approachingComets.length; i++) {
    approachingComets[i] += direction;
  }

  draw();

  //Simulates comets hitting the player by removing/adding classes.
  if (squares[currentPlayerIndex].classList.contains("comet", "player")) {
    squares[currentPlayerIndex].classList.remove("comet");
    squares[currentPlayerIndex].classList.remove("player");
    squares[currentPlayerIndex].classList.add("explosion");

    //timer for how long explosion flashes for.
    setTimeout(
      () => squares[currentMissileIndex].classList.remove("explosion"),
      150
    );

    // Posts results
    resultsDisplay.innerHTML = "GAME OVER";
    clearInterval(cometId);
  }

  //If comets reach bottom of game
  for (let i = 0; i < approachingComets.length; i++) {
    if (approachingComets[i] >=312) {
        squares[currentPlayerIndex].classList.remove("player");
    squares[currentPlayerIndex].classList.add("dead");
      resultsDisplay.innerHTML = "GAME OVER; YOU DIED"
      clearInterval(cometId);
    }
  } }
  
  // If all comets are hit:
  if (cometsRemoved.length === approachingComets.length) {
    resultsDisplay.innerHTML = "CONGRATULATIONS, YOU WON!";
    clearInterval(cometId);
  }
//Time for how quickly the comets move:
cometId = setInterval(moveComets, 250);

//shooting function for missile animation
function shoot(e) {
  let missileId;
  let currentMissileIndex = currentPlayerIndex;
  function moveMissile() {
    squares[currentMissileIndex].classList.remove("missile");
    currentMissileIndex -= width;
    squares[currentMissileIndex].classList.add("missile");

    //Simulates missiles hitting comets
    if (squares[currentMissileIndex].classList.contains("comet")) {
      squares[currentMissileIndex].classList.remove("missile");
      squares[currentMissileIndex].classList.remove("comet");
      squares[currentMissileIndex].classList.add("explosion");

// if >=311 then game over


    //   work out index of comet location, then compare index so if bigger than 311 = game over.

      //timer for how long explosion flashes for (falling foul of DRY slightly)

      setTimeout(
        () => squares[currentMissileIndex].classList.remove("explosion"),
        120
      );
      clearInterval(missileId);

      const cometRemoved = approachingComets.indexOf(currentMissileIndex);
      cometsRemoved.push(cometRemoved);
      results++;
      resultsDisplay.innerHTML = results;
      //Array of comets removed doesnt match comet starting locations??
      console.log(cometsRemoved);
    }
  }

  //Key press for player to shoot
  switch (e.key) {
    case "ArrowUp":
      missileId = setInterval(moveMissile, 50);
  }
}
document.addEventListener("keydown", shoot);
