// ## Grid configuration ## 

// define the grid 

const gridRows = 20
const gridColums = 20
const totalCellCount = gridColums * gridRows

const gridCells = []
const startZoneRow = gridRows - 1
const startPosition = startZoneRow * gridColums + Math.floor(gridColums/2)




// elements 
const startSection = document.querySelector('#Start')
const playButton = document.querySelector('#play-button')
const gridWrapper = document.querySelector('.grid-wrapper')
const gridContainer = document.querySelector('.grid')
let currentPosition = startPosition
let fatigue = 0 
const livesDisplay = document.querySelector('#lives')
const endSection = document.querySelector('#End')
const playAgainButton = document.querySelector('#play-again-button')

// ## start safe and end zone ##





// obstacles:  store the obstacles 

const obstacles = []
const obstacleRows = [6, 7, 8]

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

       

// add start, safe and end zones 

        const row = Math.floor(idx / gridColums)

// flexible zones 

        const isEndZone = row === 0 
        const isSafeZone = row % 4 === 0 
        const isStartZone = row === gridRows - 1


        if (isEndZone) {
            cell.classList.add('end-zone')
        } else if (isSafeZone) {
            cell.classList.add('safe-zone')
        } else if (isStartZone) {
            cell.classList.add('start-zone')
        }

        // const isStartZoneRow = gridRows -1
        // const startPosition = isStartZoneRow * gridColums + Math.floor(gridColums/2)

        gridContainer.appendChild(cell)
        gridCells.push(cell)

    }
    addNessie(startPosition)
}

//  ## player counter movement ## // check for obstacles within the movement


function addNessie(position) {
    gridCells[position].classList.add('nessie')

}

function removeNessie(position) {
    gridCells[position].classList.remove('nessie')
}

function moveNessie(event) {
    const pressedKey = event.code

    if (pressedKey === 'ArrowUp' && gridColums <= currentPosition) {
        removeNessie(currentPosition)
        addNessie(currentPosition -= gridColums)
        if (gridCells[currentPosition].classList.contains('obstacle')) {
            reset()
        }
        if (gridCells[currentPosition].classList.contains('end-zone')) {
            win()
    }
    }
    else if (pressedKey === 'ArrowDown' && currentPosition + gridColums <= totalCellCount - 1) {
        removeNessie(currentPosition)
        addNessie(currentPosition += gridColums)
    }
    else if (pressedKey === 'ArrowLeft' && currentPosition % gridColums !== 0) {
        removeNessie(currentPosition)
        currentPosition--
        addNessie(currentPosition)
    }
    else if (pressedKey === 'ArrowRight' && currentPosition % gridColums !== gridColums - 1) {
        removeNessie(currentPosition)
        currentPosition++
        addNessie(currentPosition)
    }
}



function reset() {
    removeNessie(currentPosition)
    currentPosition = startPosition
    fatigue++

    if (fatigue >= 3) {
        gameOver()
    }else {
        addNessie(currentPosition)
        updateFatigueDisplay()
    }

}

function win () {
console.log ('Nessie reached the end zone!')


}


// ## play game ##

function playGame() {

    startSection.classList.add('hide')
    gridWrapper.classList.remove('hide')
    generateGameScreen()

    createObstacle(6)
    setInterval(moveObstacles, 500)
    updateFatigueDisplay()


}

function gameOver(){

    gridWrapper.classList.add('hide')
    endSection.classList.remove('hide')
    livesDisplay.textContent = 'Fatigue: 🛌'


}
// ## lives display = fatigue 

function updateFatigueDisplay () {

    const fatigueLevels = ['😌', '😪', '💤']
    const display =fatigue <3 ? fatigueLevels[fatigue] :'🛌' 
    livesDisplay.textContent = `Fatigue: ${display}`

}

// ##obstacles##

function createObstacle(rowIndex, length = 2) {
    const startCol = Math.floor(Math.random() * (gridColums - length))
    const positionIndexes = []


    for (let i = 0; i < length; i++) {
        const index = rowIndex * gridColums + (startCol + i)
        positionIndexes.push(index)
        gridCells[index].classList.add('obstacle')
    }

    const direction = Math.random() > 0.5 ? 1 : -1
    obstacles.push({ positions: positionIndexes, direction, row: rowIndex })

}
function moveObstacles() {
    obstacles.forEach(obstacle => {
        // Remove current obstacle classes
        obstacle.positions.forEach(index => {
            gridCells[index].classList.remove('obstacle')
        })

        // Move obstacles based on the direction 
        obstacle.positions = obstacle.positions.map(index => {
            if (obstacle.direction === 1) {
                // move right 

                const isRightEdge = (index + 1) % gridColums === 0
                return isRightEdge ? index - (gridColums - 1) : index + 1

                //move left 
            } else {
                const isLeftEdge = index % gridColums === 0
                return isLeftEdge ? index + (gridColums - 1) : index - 1
            }
        })

        obstacle.positions.forEach(index => {
            gridCells[index].classList.add('obstacle')
          })
        })
      }




// Events 

    playButton.addEventListener('click', playGame)
    document.addEventListener('keydown', moveNessie)
    playAgainButton.addEventListener('click',() => {
        location.reload()

    })





// elements 

