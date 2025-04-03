// ## Grid configuration ## 

// define the grid 

const gridRows = 20
const gridColums = 20
const totalCellCount = gridColums * gridRows

const gridCells = []
const startZoneRow = gridRows - 1
const startPosition = startZoneRow * gridColums + Math.floor(gridColums / 2)




// elements 
const startSection = document.querySelector('#Start')
const playButton = document.querySelector('#play-button')
const gridWrapper = document.querySelector('.grid-wrapper')
const gridContainer = document.querySelector('.grid')
const livesDisplay = document.querySelector('#lives')
const endSection = document.querySelector('#End')
const playAgainButton = document.querySelector('#play-again-button')
const scoreDisplay = document.querySelector('#score-display')


let currentPosition = startPosition
let fatigue = 0
let resetPause = false
let score = 0 


// ## start safe and end zone ##

// obstacles 
const obstacles = []
const obstacleRows = [1, 2, 5, 6, 8, 18]


// ## Grid ##

function generateGameScreen() {
    const gridTemplateRows = []
    for (let row = 0; row < gridRows; row++) {
      if (row === 0 || row === 10 || row === gridRows - 1) {
        gridTemplateRows.push('3fr')
      } else {
        gridTemplateRows.push('1fr')
      }
    }
    gridContainer.style.gridTemplateRows = gridTemplateRows.join(' ')

    for (let idx = 0; idx < totalCellCount; idx++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        

        const row = Math.floor(idx / gridColums)
        const isEndZone = row === 0
        const isSafeZone = row === 10
        const isStartZone = row === startZoneRow

        if (isEndZone) {
            cell.classList.add('end-zone')
        } else if (isSafeZone) {
            cell.classList.add('safe-zone')
        } else if (isStartZone) {
            cell.classList.add('start-zone')
        }
        gridContainer.appendChild(cell)
        gridCells.push(cell)

    }
    currentPosition =startPosition
    addNessie(currentPosition)
}


function addNessie(position) {
   if (gridCells[position]){
    gridCells[position].classList.add('nessie')
}
}

function removeNessie(position) {
    if (gridCells[position]) {
    gridCells[position].classList.remove('nessie')
}
}

function moveNessie(event) {
    const pressedKey = event.code

    if (pressedKey === 'ArrowUp' && currentPosition>= gridColums) {
        removeNessie(currentPosition)
        currentPosition -= gridColums
        addNessie(currentPosition)
        if (gridCells[currentPosition].classList.contains('obstacle')) 
            reset()
        if (gridCells[currentPosition].classList.contains('end-zone')) 
            win()

        }
        else if (pressedKey === 'ArrowDown' && currentPosition + gridColums < totalCellCount) {
            removeNessie(currentPosition)
            currentPosition += gridColums
            addNessie(currentPosition)
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
        if (resetPause) return
        resetPause = true
      
        removeNessie(currentPosition)
        currentPosition = startPosition
        fatigue++
      
        if (fatigue >= 3) {
          gameOver()
        } else {
          addNessie(currentPosition)
          updateFatigueDisplay()
        }
      
        setTimeout(() => {
          resetPause = false
        }, 2000)
      }
      
      function gameOver() {
        gridWrapper.classList.add('hide')
        endSection.classList.remove('hide')
        livesDisplay.textContent = 'Fatigue: 🛌'
      }
    
      function win() {
        updateScore()
        removeNessie(currentPosition)
        currentPosition = startPosition
        addNessie(currentPosition)
    
    }


      function updateScore() {
        score += 100
        scoreDisplay.textContent = `Score: ${score}`
      }

      // ## lives display = fatigue 

    function updateFatigueDisplay() {

        const fatigueLevels = ['😌', '😪', '💤']
        const display = fatigue < 3 ? fatigueLevels[fatigue] : '🛌'
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
        //  check for collision  with nessie 
        if (obstacle.positions.includes(currentPosition)) 
            reset()
        
        // add obstacle classes 

        obstacle.positions.forEach(index => {
            gridCells[index].classList.add('obstacle')
        })
    })
}









    // ## play game ##

    function playGame() {
        startSection.classList.add('hide')
        gridWrapper.classList.remove('hide')
        generateGameScreen()
        updateFatigueDisplay()
        obstacleRows.forEach(row => {
            for (let i = 0; i < 4; i++) {
                createObstacle(row, 2)
            }

        }
        )
       
        setInterval(moveObstacles, 1000)
    }

   

   


    // Events 

    playButton.addEventListener('click', playGame)
    document.addEventListener('keydown', moveNessie)
    playAgainButton.addEventListener('click', () => {
        location.reload()

    })



// code graveyard 



// const gridRows = 20
// const gridColums = 20
// const totalCellCount = gridColums * gridRows
// const isStartZone =row === startZoneRow




// add start, safe and end zones 



// flexible zones 



// const isStartZoneRow = gridRows -1
// const startPosition = isStartZoneRow * gridColums + Math.floor(gridColums/2)


//  ## player counter movement ## // check for obstacles within the movement

// cell.style.width = `${100 / gridColums}%`
        // cell.style.height = `${100 / gridRows}%`
        // cell.innerText = idx