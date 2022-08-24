const grid = document.querySelector(".grid");
const resultsDisplay = document.querySelector(".results");
let currentPlayerIndex = 318;
let width = 22;
let direction = 1;
let cometId;
let goingRight = true;
let cometsRemoved = [];
let results = 0;

for (let i = 0; i < 360; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

//Starting Locations
const approachingComets = [
    0, 1, 2, 7, 8, 9, 10, 13, 14, 17,
    23, 24, 26, 27, 29, 30, 31, 32, 34, 35, 39, 40, 41,
    44, 46, 47, 48, 49, 52, 53, 57, 58, 59, 60, 62, 63,
    66, 69, 70, 75, 76, 77, 80, 82, 83, 85,
    88, 90, 93, 94, 96, 98, 99, 100,
  ];



function draw() {
  for (let i = 0; i < approachingComets.length; i++) {
    if (!cometsRemoved.includes(i)) {
      squares[approachingComets[i]].classList.add("comet");
    }
  }
}

draw();

function remove() {
  for (let i = 0; i < approachingComets.length; i++) {
    squares[approachingComets[i]].classList.remove("comet");
  }
}

squares[currentPlayerIndex].classList.add("player");

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

function moveComets() {
  const leftEdge = approachingComets[0] % width === 0;
  const rightEdge =
    approachingComets[approachingComets.length - 2] % width === width - 1;
  remove();

  //Identifies the board edges
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

  if (squares[currentPlayerIndex].classList.contains("comet", "player")) {
        squares[currentPlayerIndex].classList.remove("comet")
        squares[currentPlayerIndex].classList.remove("player");
        squares[currentPlayerIndex].classList.add("explosion");

        setTimeout(
            () => squares[currentMissileIndex].classList.remove("explosion"),
            120
        )

    resultsDisplay.innerHTML = "GAME OVER";
    clearInterval(cometId);
  }

  for (let i = 0; i < approachingComets.length; i++) {
    if (approachingComets[i] > squares.length) {
      resultsDisplay.innerHTML = "GAME OVER";
      clearInterval(cometId);
    }
  }
  if (cometsRemoved.length === approachingComets.length) {
    resultsDisplay.innerHTML = "YOU WIN";
    clearInterval(cometId);
  }
}

cometId = setInterval(moveComets, 200);

function shoot(e) {
  let missileId;
  let currentMissileIndex = currentPlayerIndex;
  function moveMissile() {
    squares[currentMissileIndex].classList.remove("missile");
    currentMissileIndex -= width;
    squares[currentMissileIndex].classList.add("missile");

    if (squares[currentMissileIndex].classList.contains("comet")) {
      squares[currentMissileIndex].classList.remove("missile");
      squares[currentMissileIndex].classList.remove("comet");
      squares[currentMissileIndex].classList.add("explosion");

      setTimeout(
        () => squares[currentMissileIndex].classList.remove("explosion"),
        120
      );
      clearInterval(missileId);

      const cometRemoved = approachingComets.indexOf(currentMissileIndex);
      cometsRemoved.push(cometRemoved);
      results++;
      resultsDisplay.innerHTML = results;
      console.log(cometsRemoved);
    }
  }

  switch (e.key) {
    case "ArrowUp":
      missileId = setInterval(moveMissile, 400);
  }
}
document.addEventListener("keydown", shoot);