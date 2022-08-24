const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentPlayerIndex = 202
let currentStationIndex = 219
let width = 15
let direction = 1
let cometId
let goingRight = true
let cometsRemoved = []
let results = 0

for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

//Starting Locations
const approachingComets = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

const movingStation = [219, 220, 221]

squares[currentStationIndex].classList.add('station')


function draw() {
  for (let i = 0; i < approachingComets.length; i++) {
    if(!cometsRemoved.includes(i)) {
      squares[approachingComets[i]].classList.add('comet')
    }
  }
}

draw()

function remove() {
  for (let i = 0; i < approachingComets.length; i++) {
    squares[approachingComets[i]].classList.remove('comet')
  }
}

squares[currentPlayerIndex].classList.add('player')


function movePlayer(e) {
  squares[currentPlayerIndex].classList.remove('player')
  switch(e.key){
    case 'ArrowLeft':
      if (currentPlayerIndex % width !== 0) currentPlayerIndex -=1
      break
    case 'ArrowRight' :
      if (currentPlayerIndex % width < width -1) currentPlayerIndex +=1
      break
  }
  squares[currentPlayerIndex].classList.add('player')
}
document.addEventListener('keydown', movePlayer)

function moveComets() {
  const leftEdge = approachingComets[0] % width === 0
  const rightEdge = approachingComets[approachingComets.length - 1] % width === width -1
  remove()

  //Identifies the board edges
  if (rightEdge && goingRight) {
    for (let i = 0; i < approachingComets.length; i++) {
      approachingComets[i] += width +1
      direction = -1
      goingRight = false
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < approachingComets.length; i++) {
      approachingComets[i] += width -1
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < approachingComets.length; i++) {
    approachingComets[i] += direction
  }

  draw()

  if (squares[currentPlayerIndex].classList.contains('comet', 'player')) {
    resultsDisplay.innerHTML = 'GAME OVER'
    clearInterval(cometId)
  }

  for (let i = 0; i < approachingComets.length; i++) {
    if(approachingComets[i] > (squares.length)) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(cometId)
    }
  }
  if (cometsRemoved.length === approachingComets.length) {
    resultsDisplay.innerHTML = 'YOU WIN'
    clearInterval(cometId)
  }
}

// **********************************************************

function moveStation() {
    const leftEdge = movingStation[0] % width === 0
    const rightEdge = movingStation[movingStation.length - 1] % width === width -1
    remove()
  
    //Identifies the board edges
    if (rightEdge && goingRight) {
      for (let i = 0; i < movingStation.length; i++) {
        movingStation[i] += width +1
        direction = -1
        goingRight = false
      }
    }
  
    if(leftEdge && !goingRight) {
      for (let i = 0; i < movingStation.length; i++) {
        movingStation[i] += width -1
        direction = 1
        goingRight = true
      }
    }
  
    for (let i = 0; i < movingStation.length; i++) {
        movingStation[i] += direction
    }
  
    draw()
  
    // if (squares[currentPlayerIndex].classList.contains('comet', 'player')) {
    //   resultsDisplay.innerHTML = 'GAME OVER'
    //   clearInterval(cometId)
    // }
  
    // for (let i = 0; i < approachingComets.length; i++) {
    //   if(approachingComets[i] > (squares.length)) {
    //     resultsDisplay.innerHTML = 'GAME OVER'
    //     clearInterval(cometId)
    //   }
    // }
    // if (cometsRemoved.length === approachingComets.length) {
    //   resultsDisplay.innerHTML = 'YOU WIN'
    //   clearInterval(cometId)
    // }
  }

// **************************************************************

cometId = setInterval(moveComets, 500)


function shoot(e) {
  let missileId
  let currentLaserIndex = currentPlayerIndex
  function moveMissile() {
    squares[currentLaserIndex].classList.remove('missile')
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('missile')

    if (squares[currentLaserIndex].classList.contains('comet')) {
      squares[currentLaserIndex].classList.remove('missile')
      squares[currentLaserIndex].classList.remove('comet')
      squares[currentLaserIndex].classList.add('explosion')

      setTimeout(()=> squares[currentLaserIndex].classList.remove('explosion'), 50)
      clearInterval(missileId)

      const cometRemoved = approachingComets.indexOf(currentLaserIndex)
      cometsRemoved.push(cometRemoved)
      results++
      resultsDisplay.innerHTML = results
      console.log(cometsRemoved)      

    }             

  }
  switch(e.key) {
    case 'ArrowUp':
      missileId = setInterval(moveMissile, 100)
  }
}

document.addEventListener('keydown', shoot)