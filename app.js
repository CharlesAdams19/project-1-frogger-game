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


// Events 

    playButton.addEventListener('click', playGame)
    document.addEventListener('keydown', moveNessie)






// elements 

