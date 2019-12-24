//! Still to work on
//? Score  add to display
//? High score
//? Mobile keytouch



function init() {


  //DOM Elements
  const grid = document.querySelector('.grid')
  const squares = []
  const btn = document.querySelector('button')
  const scoreDiv = document.querySelector('.score')
  
  //Variables
  const width = 11
  let snakePosition = Math.floor(width * width / 2 )
  let snakeArray = [snakePosition]
  let fruitPosition = Math.floor(Math.random() * squares.length)
  const speed = 50
  let moveDirection = 1
  let gamePlaying = false
  let timerStart = ''
  let score = 0
  let pointsAvailable = 31

  // Make Table
  Array(width * width).join('.').split('.').forEach((i, index) => {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    square.innerHTML = `${index} - ${Math.floor(index / width)}`
    squares.push(square)
    grid.appendChild(square)
  })



  //Functions
  function snakeMovementArray() {
    snakeArray.unshift(snakePosition)
    if (!(snakePosition === fruitPosition)) {
      snakeArray.pop()
    }
  }

  function startingHead() {
    squares.forEach(i => i.classList.remove('snakehead'))
    squares.forEach(i => i.classList.remove('snakebody'))
    squares[snakePosition].classList.add('snakehead')
    snakeArray.forEach(i => squares[i].classList.add('snakebody'))
  }

  function clearBoard() {
    squares.forEach((i) => i.className = 'grid-item')
  }

  function endGame() {
    clearInterval(timerStart)
    console.log('end')
  }

  function snakeCollision() {
    if (Array.from(new Set(snakeArray)).length !== snakeArray.length) {
      endGame() 
    }
  }

  function randomFruit() {
    fruitPosition = Math.floor(Math.random() * squares.length)
    squares.forEach((i) => i.classList.remove('apple'))
    squares[fruitPosition].classList.add('apple')
    while (snakeArray.indexOf(fruitPosition) !== -1) {
      fruitPosition = Math.floor(Math.random() * squares.length)
      squares.forEach((i) => i.classList.remove('apple'))
      squares[fruitPosition].classList.add('apple')
    }
  }



  function startMoving() {
    if (snakePosition % width + 1 === width && moveDirection === 1) {
      snakePosition -= width
    }
    if (snakePosition % width === 0 && moveDirection === -1) {
      snakePosition += width
    }
    if (Math.floor(snakePosition / width) === 0 && moveDirection === -width) {
      snakePosition += width * width
    }
    if (Math.floor(snakePosition / width) === width - 1 && moveDirection === +width) {
      snakePosition -= width * width
    }
    snakePosition += moveDirection
    startingHead()
    snakeMovementArray()
    pointDetection()
    snakeCollision()
    --pointsAvailable
    pointsAvailable = Math.max(10, pointsAvailable)

  }

  function startGame() {
    if (!gamePlaying) {
      timerStart = setInterval(startMoving, speed)
      gamePlaying = true
      snakeArray.pop()
    }
  }

  function pointDetection() {
    if (snakePosition === fruitPosition) {
      score += pointsAvailable
      pointsAvailable = 31
      scoreDiv.innerHTML = `Score: ${score}`
      randomFruit()
    } 
  }

  function keysFunction(e) {
    startGame()
    switch (e.keyCode) {
      case 39:
        moveDirection = 1
        break
      case 37:
        moveDirection = -1      
        break
      case 40:
        moveDirection = width
        break
      case 38:
        moveDirection = -width
        break
    }
  }

  //Game loaded
  startingHead()
  randomFruit()

  //Event Listeners

  // btn.addEventListener('click', startingHead) //used to check a function
  window.addEventListener('keydown', keysFunction)

}

window.addEventListener('DOMContentLoaded',init)