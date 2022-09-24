const grid = document.querySelector(".grid");
const resultsDisplay = document.querySelector(".results");
let currentPlayerIndex = 318;
let width = 22;
let height = 15;
let direction = 1;
let asteroidId;
let goingRight = true;
let asteroidsRemoved = [];
let results = 0;

for (let i = 0; i < 330; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

//asteroid starting locations
const approachingAsteroids = [
  0, 1, 2, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 23, 24, 26, 27, 29,
  30, 31, 32, 34, 35, 39, 40, 41, 44, 46, 47, 48, 49, 50, 51, 52, 53, 57, 58,
  59, 60, 62, 63, 66, 69, 70, 75, 76, 77, 80, 82, 83, 85, 88, 90, 93, 94, 96,
  98, 99, 100,
];



//draws asteroids
function draw() {
  for (let i = 0; i < approachingAsteroids.length; i++) {
    if (!asteroidsRemoved.includes(i)) {
      squares[approachingAsteroids[i]].classList.add("asteroid");
    }
    console.log(approachingAsteroids.indexOf("50"));
  }
}

draw();

//then removes asteroids to simulate the animation
function remove() {
  for (let i = 0; i < approachingAsteroids.length; i++) {
    squares[approachingAsteroids[i]].classList.remove("asteroid");
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

//Asteroid movement
function moveAsteroids() {
  const leftEdge = approachingAsteroids[0] % width === 0;
  const rightEdge =
    approachingAsteroids[approachingAsteroids.length - 2] % width === width - 1;
  remove();

  //Defines the edges of the board
  if (rightEdge && goingRight) {
    for (let i = 0; i < approachingAsteroids.length; i++) {
      approachingAsteroids[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < approachingAsteroids.length; i++) {
      approachingAsteroids[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < approachingAsteroids.length; i++) {
    approachingAsteroids[i] += direction;
  }

  draw();

  //Simulates asteroids hitting the player by removing/adding classes.
  if (squares[currentPlayerIndex].classList.contains("asteroid", "player")) {
    squares[currentPlayerIndex].classList.remove("asteroid");
    squares[currentPlayerIndex].classList.remove("player");
    squares[currentPlayerIndex].classList.add("explosion");

    //timer for how long explosion flashes for.
    setTimeout(
      () => squares[currentMissileIndex].classList.remove("explosion"),
      150
    );

    // Posts results
    resultsDisplay.innerHTML = "GAME OVER";
    clearInterval(asteroidId);
  }

  //If asteroids reach bottom of game
  for (let i = 0; i < approachingAsteroids.length; i++) {
    if (approachingAsteroids[i] >=312) {
        squares[currentPlayerIndex].classList.remove("player");
    squares[currentPlayerIndex].classList.add("explosion");
      resultsDisplay.innerHTML = "GAME OVER; YOU DIED"
      clearInterval(asteroidId);
    }
  } }
  
  // If all asteroids are hit:
  if (asteroidsRemoved.length === approachingAsteroids.length) {
    resultsDisplay.innerHTML = "CONGRATULATIONS, YOU WON!";
    clearInterval(asteroidId);
  }
  
//Time for how quickly the asteroids move:
asteroidId = setInterval(moveAsteroids, 250);

//shooting function for missile animation
function shoot(e) {
  let missileId;
  let currentMissileIndex = currentPlayerIndex;
  function moveMissile() {
    squares[currentMissileIndex].classList.remove("missile");
    currentMissileIndex -= width;
    squares[currentMissileIndex].classList.add("missile");

    //Simulates missiles hitting asteroids
    if (squares[currentMissileIndex].classList.contains("asteroid")) {
      squares[currentMissileIndex].classList.remove("missile");
      squares[currentMissileIndex].classList.remove("asteroid");
      squares[currentMissileIndex].classList.add("explosion");


      //timer for how long explosion flashes for (falling foul of DRY slightly)

      setTimeout(
        () => squares[currentMissileIndex].classList.remove("explosion"),
        120
      );
      clearInterval(missileId);

      const asteroidRemoved = approachingAsteroids.indexOf(currentMissileIndex);
      asteroidsRemoved.push(asteroidRemoved);
      results++;
      resultsDisplay.innerHTML = results;
    }
  }

  //Key press for player to shoot
  switch (e.key) {
    case "ArrowUp":
      missileId = setInterval(moveMissile, 50);
  }
}
document.addEventListener("keydown", shoot);