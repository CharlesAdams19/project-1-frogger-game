// ## Grid configuration ## 

// define the grid 

const gridCells = []
const startPosition = 389
const gridRows = 20
const gridColums = 20

const totalCellCount = gridColums * gridRows


// elements 
const startSection = document.querySelector('#Start')
const playButton = document.querySelector('#play-button')
const gridWrapper = document.querySelector('.grid-wrapper')
const gridContainer = document.querySelector('.grid')

let currentPosition = startPosition

 // obstacles:  store the obstacles 

 const obstacles = [] 
 const obstacleRows = [] 
 
//  gridCells[index].class.add('obstacle')



// function 
// ## Grid ##
function generateGameScreen() {
    const gridRows = 20
    const gridColums = 20
    const totalCellCount = gridColums * gridRows
    for (let idx = 0; idx < totalCellCount; idx++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.style.width = `${100 / gridColums}%`
        cell.style.height = `${100 / gridRows}%`
        cell.innerText = idx

        gridContainer.appendChild(cell)
        gridCells.push(cell)

    }
    addNessie(startPosition)
}
function addNessie(position) {
    gridCells[position].classList.add('nessie')

}

function removeNessie(position) {
    gridCells[position].classList.remove('nessie')
}
// ## play game ##
function playGame() {

    startSection.classList.add('hide')
    gridWrapper.classList.remove('hide')
    generateGameScreen()
}
// ## move the player counter ##
function moveNessie(event) {
    const pressedKey = event.code

    if (pressedKey === 'ArrowUp' && gridColums <= currentPosition) {
        removeNessie(currentPosition)
        addNessie(currentPosition -= gridColums)
    }
    else if (pressedKey === 'ArrowDown' && currentPosition + gridColums <= totalCellCount -1) {
        removeNessie(currentPosition)
        addNessie(currentPosition += gridColums)    
    }
    else if (pressedKey === 'ArrowLeft' && currentPosition % gridColums !== 0) {
        removeNessie(currentPosition)
        currentPosition--
        addNessie(currentPosition)
    }
    else if (pressedKey === 'ArrowRight' && currentPosition % gridColums !== gridColums -1) {
        removeNessie(currentPosition)
        currentPosition++
        addNessie(currentPosition)
}
   
}
// ##obstacles##

function createObstacle(rowIndex, length =2) {
const startCol = Math.floor(Math.random()* (gridColums - length))
const positionIndexes =[]

for (let i = 0; i < length; i++) {
    const index = rowIndex * gridColums + (startCol + i)
    positionIndexes.push(index)
    gridCells[index].classList.add('obstacle')
  }

  obstacles.push({ positions: positionIndexes, direction: 1, row: rowIndex })
}




// Events 

    playButton.addEventListener('click', playGame)
    document.addEventListener('keydown', moveNessie)






// elements 

