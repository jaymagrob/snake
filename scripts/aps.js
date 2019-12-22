function init() {


  //DOM Elements
  const grid = document.querySelector('.grid')
  const squares = []
  const btn = document.querySelector('button')
  
  //Variables
  const width = 11
  let snakePosition = Math.floor(width * width / 2 )
  const speed = 500
  let moveDirection = 1
  let gamePlaying = false

  Array(width * width).join('.').split('.').forEach((i, index) => {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    square.innerHTML = `${index} - ${index % width}`
    squares.push(square)
    grid.appendChild(square)
  })

  //Functions
  function startingHead() {
    squares.forEach(i => i.classList.remove('snakehead'))
    squares[snakePosition].classList.add('snakehead')
  }

  function clearBoard() {
    squares.forEach((i) => i.className = 'grid-item')
  }

  function randomFruit() {
    squares.forEach((i) => i.classList.remove('apple'))
    squares[Math.floor(Math.random() * squares.length)].classList.add('apple')
  }

  function startMoving() {
    snakePosition += moveDirection
    startingHead()
  }

  function startGame() {
    if (!gamePlaying) {
      const timerStart = setInterval(startMoving, speed)
      gamePlaying = true
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

  //Event Listeners

  btn.addEventListener('click', startingHead)
  window.addEventListener('keydown', keysFunction)

}

window.addEventListener('DOMContentLoaded',init)