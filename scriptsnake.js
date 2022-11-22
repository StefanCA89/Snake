let gameState = 4
let gMode = 0
let score = 0
let speed = 800
let fruitNeeded = 2
let posBadshr = [[0], [0]]
let posHeadRow = 7
let posHeadCol = 4
let snake = ["7c4", "7c3"]
let direction = "ArrowRight"
let headOrientation = "ArrowRight"
let cardinalDir = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"]
const playGrid =
[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]

for (let i = 0; i <= 14; ++i) {
    for (let j = 0; j <= 14; ++j) {
        document.getElementById("minefield").innerHTML += '\
        <div class="cell" id="' + i + 'c'+ j +'">\
        </div>'
    }
}

document.getElementById(snake[0]).setAttribute("class", "activeCell")
document.getElementById(snake[snake.length - 1]).setAttribute("class", "activeCell")

function moveTo() {
    if (direction === "ArrowRight") {
        headOrientation = "ArrowRight"
        ++posHeadCol
        if (checkCollision()) {
            gameLost()
            return
        }
        document.getElementById("" + posHeadRow +"c"+ posHeadCol).setAttribute("class", "activeCell")
        snake.unshift("" + posHeadRow +"c"+ posHeadCol)
    }
    if (direction === "ArrowLeft") {
        headOrientation = "ArrowLeft"
        --posHeadCol
        if (checkCollision()) {
            gameLost()
            return
        }
        document.getElementById("" + posHeadRow +"c"+ posHeadCol).setAttribute("class", "activeCell")
        snake.unshift("" + posHeadRow +"c"+ posHeadCol)
    }
    if (direction === "ArrowUp") {
        headOrientation = "ArrowUp"
        --posHeadRow
        if (checkCollision()) {
            gameLost()
            return
        }
        document.getElementById("" + posHeadRow +"c"+ posHeadCol).setAttribute("class", "activeCell")
        snake.unshift("" + posHeadRow +"c"+ posHeadCol)
    }
    if (direction === "ArrowDown") {
        headOrientation = "ArrowDown"
        ++posHeadRow
        if (checkCollision()) {
            gameLost()
            return
        }
        document.getElementById("" + posHeadRow +"c"+ posHeadCol).setAttribute("class", "activeCell")
        snake.unshift("" + posHeadRow +"c"+ posHeadCol)
    }
    if (!ateFruit()) {
        document.getElementById(snake[snake.length - 1]).setAttribute("class", "cell")
        snake.pop()
    }
    if (gameState != 1) {
        return
    }
    setTimeout(moveTo, speed)
}


function setFruit(gMode) {
    if (gMode == 1) {
        fruitRow = Math.floor(Math.random() * 8)
        fruitCol = Math.floor(Math.random() * 8)
        if (document.getElementById("" + fruitRow + "c" + fruitCol +"").className == "cell") {
            playGrid[fruitRow][fruitCol] = 1
            document.getElementById("" + fruitRow + "c" + fruitCol +"").innerHTML ='\
            <img src="mushroom.png" id="fruit">'
        } else {
            setFruit(gMode)
        }
    }
    if (gMode == 2) {
        if (fruitNeeded == 0) {
            return
        }
        fruitRow = Math.floor(Math.random() * 8)
        fruitCol = Math.floor(Math.random() * 8)
        if (document.getElementById("" + fruitRow + "c" + fruitCol +"").className == "cell") {
            if (fruitNeeded == 2) {
                playGrid[fruitRow][fruitCol] = 1
                console.log("" + fruitRow + "c" + fruitCol +"")  
            } else if (fruitNeeded == 1) {
                playGrid[fruitRow][fruitCol] = 2
                posBadshr[0] = fruitRow
                posBadshr[1] = fruitCol
            }
            --fruitNeeded
            document.getElementById("" + fruitRow + "c" + fruitCol +"").innerHTML ='\
            <img src="mushroom.png" id="fruit">'
        }
        if (fruitNeeded != 0) {
            setFruit(gMode)
        }
    }
    console.log(playGrid)
}

function startGame() {
    if (gameState == 0) {
        gameState = 1
        document.getElementById("gameInfo").innerText = ""
        setFruit(gMode)
        moveTo()
    }  
}

window.addEventListener("keydown", (event) => {
    event.preventDefault()
    if (cardinalDir.includes(event.code) && dirAllowed(event.code)) {
        direction = event.code
    } 
    if (event.code == "Enter") {
        startGame()
    }
    if (event.code == "Space") {
        gameReset()
    }
})

function dirAllowed(inputDir) {
    if (headOrientation == "ArrowUp" && inputDir == "ArrowDown") {
        return false
    }
    if (headOrientation == "ArrowDown" && inputDir == "ArrowUp") {
        return false
    }
    if (headOrientation == "ArrowRight" && inputDir == "ArrowLeft") {
        return false
    }
    if (headOrientation == "ArrowLeft" && inputDir == "ArrowRight") {
        return false
    }
    return true
}

function gameLost() {
    gameState = 2
    document.getElementById("gameInfo").setAttribute("class", "gameLost")
    document.getElementById("gameInfo").style.color = "black"
    document.getElementById("gameInfo").innerHTML = "GAME OVER"
    setTimeout(displayReset, 2000)
}

function gameReset() {
    if (gameState == 3) {
    window.location.reload()
    }
}

function ateFruit() {
    if (playGrid[posHeadRow][posHeadCol] == 1) {
        playGrid[posHeadRow][posHeadCol] = 0
        document.getElementById("" + posHeadRow +"c"+ posHeadCol).innerHTML = ""
        fruitNeeded = 2
        clearBadshroom()
        setFruit(gMode)
        increaseSpeed()
        updateScore()
        return true
    }
    if (playGrid[posHeadRow][posHeadCol] == 2) {
        document.getElementById("" + posBadshr[0] +"c"+ posBadshr[1]).setAttribute("class", "cell")
        document.getElementById("" + posBadshr[0] +"c"+ posBadshr[1]).innerHTML = '\
        <img src="mushroomBad.png" id="fruit">'
        gameLost()
    }
    return false
}

function updateScore() {
    score += 100
    document.getElementById("scoreWindow").innerText = score
}

function increaseSpeed() {
    if (speed < 200) {
        return
    }
    if (speed == 200) {
        document.getElementById("gameInfo").setAttribute("class", "gameMaxspeed")
        document.getElementById("gameInfo").innerText = "MAX SPEED"
        blinkColor()
    } 
    speed -= 50
}

function blinkColor() {
    if (gameState == 1) {
        if (document.getElementById("gameInfo").style.color == "red") {
            document.getElementById("gameInfo").style.color = "black"
        } else {
            document.getElementById("gameInfo").style.color = "red"
        }
        setTimeout(blinkColor, 500)    
    } else if (gameState == 3) {
        if (document.getElementById("gameInfo").style.color == "black") {
            document.getElementById("gameInfo").style.color = "rgb(220, 220, 220)"
        } else {
            document.getElementById("gameInfo").style.color = "black"
        } 
        setTimeout(blinkColor, 500)   
    }
}

function checkCollision() {
    if (posHeadRow < 0 || posHeadRow > 14) {
        return true
    }
    if (posHeadCol < 0 || posHeadCol > 14) {
        return true
    }
    if (snake.includes("" + posHeadRow +"c"+ posHeadCol)) {
        return true
    }
    return false
}

function displayReset() {
    gameState = 3
    document.getElementById("gameInfo").setAttribute("class", "tryAgain")
    document.getElementById("gameInfo").innerText = "Press Space to try again"
    blinkColor()
}

function setGmode1() {
    if (gameState > 0 && gameState < 4) {
        return
    }
    document.getElementById("modeInfo").innerHTML = '\
    <p>Classic Snake we all know and love.</p>\
    <p>Just eat the mushrooms <img src="mushroom.png" id="fruit"> and grow as big as you can.</p>\
    <p>Use the Arrow keys to control Snake</p>'
    gMode = 1
    gameState = 0
    document.getElementById("gameInfo").setAttribute("class", "gameStart")
    document.getElementById("gameInfo").innerText = "Press Enter to start"
}

function setGmode2() {
    if (gameState > 0 && gameState < 4) {
        return
    }
    document.getElementById("modeInfo").innerHTML = '\
    <p>Classic Snake with a twist.</p>\
    <p>You now have 2 mushrooms on the board</p>\
    <p>one of them will feed you <img src="mushroom.png" id="fruit"> , the other kill you <img src="mushroomBad.png" id="fruit"></p>\
    <p>Which is which ?</p>\
    <p>Eat them to find out :) </p>\
    <p>Use the Arrow keys to control Snake</p>'
    gMode = 2
    gameState = 0
    document.getElementById("gameInfo").setAttribute("class", "gameStart")
    document.getElementById("gameInfo").innerText = "Press Enter to start"
}

function clearBadshroom() {
    if (gMode == 2) {
        document.getElementById("" + posBadshr[0] +"c"+ posBadshr[1]).innerHTML = ""
        playGrid[posBadshr[0]][posBadshr[1]] = 0
    }
}