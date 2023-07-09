const newGame = document.querySelector("h1#new-game")
const rollDice = document.querySelector("#roll-dice")
const holdScore = document.querySelector("#hold-score")
const throwDiceArea = document.querySelector('#throw-dice-area')

// Defines the actual player
const players = document.querySelectorAll("h2.actual-player")
let actualPlayer = "0"

// PLAYER ONE
let playerOneGlobalScore = document.querySelector(
    "div#player-one-global-score"
)
let playerOneRoundScore = document.querySelector("span#player-one-round-score")

// PLAYER TWO
let playerTwoGlobalScore = document.querySelector(
    "div#player-two-global-score"
)
let playerTwoRoundScore = document.querySelector("span#player-two-round-score")

// LAUNCH NEW GAME
newGame.addEventListener("click", () => {
    // Player can confirm new game or not
    let confirmNewGame = confirm(
        "Etes-vous sûr de vouloir commencer une nouvelle partie ?"
    )

    // If player confirms then the scores are set to 0
    if (confirmNewGame) {
        playerOneGlobalScore.innerHTML = 0
        playerOneRoundScore.innerHTML = 0
        playerTwoGlobalScore.innerHTML = 0
        playerTwoRoundScore.innerHTML = 0
    }
})

// DEFINES THE ACTUAL PLAYER -------------------------------------------------------------------
players[0].addEventListener("click", () => {
    actualPlayer = players[0].innerText.substring(7, 8)
    players[0].classList.add("active-player")
    players[1].classList.remove("active-player")
})

players[1].addEventListener("click", () => {
    actualPlayer = players[1].innerText.substring(7, 8)
    players[1].classList.add("active-player")
    players[0].classList.remove("active-player")
})

// ROLL DICE -------------------------------------------------------------------
rollDice.addEventListener("click", () => {

    let dice = new Map()
    dice.set(1, '<img src="../includes/images/dice/dice-one.png" class="dice-img" alt="dice one image">')
    dice.set(2, '<img src="../includes/images/dice/dice-two.png" class="dice-img" alt="dice two image">')
    dice.set(3, '<img src="../includes/images/dice/dice-three.png" class="dice-img" alt="dice three image">')
    dice.set(4, '<img src="../includes/images/dice/dice-four.png" class="dice-img" alt="dice four image">')
    dice.set(5, '<img src="../includes/images/dice/dice-five.png" class="dice-img" alt="dice five image">')
    dice.set(6, '<img src="../includes/images/dice/dice-six.png" class="dice-img" alt="dice six image">')

    function rollDice(max) {
        let diceNumber = Math.floor(Math.random() * max)
        if (diceNumber === 0) {
            rollDice(7)
        } else {
            return diceNumber
        }
    }

    let throwDice = rollDice(7)
    throwDiceArea.innerHTML = dice.get(throwDice)

    if(actualPlayer === '0') {
        alert(`Veuillez sélectionner un joueur !`)
    } else if(actualPlayer === '1') {
        playerOneRoundScore.innerText = Number(playerOneRoundScore.innerText) + throwDice
    } else if(actualPlayer === '2') {
        playerTwoRoundScore.innerText = Number(playerTwoRoundScore.innerText) + throwDice
    }
})

// HOLD SCORE -------------------------------------------------------------------
holdScore.addEventListener("click", () => {
    if (actualPlayer === '0') {
        alert(`Veuillez sélectionner un joueur !`)
    } else if (actualPlayer === '1') {
        playerOneGlobalScore.innerHTML = Number(playerOneRoundScore.innerText) + Number(playerOneGlobalScore.innerText)
        playerOneRoundScore.innerHTML = 0
    } else if (actualPlayer === '2') {
        playerTwoGlobalScore.innerHTML = Number(playerTwoRoundScore.innerText) + Number(playerTwoGlobalScore.innerText)
        playerTwoRoundScore.innerHTML = 0
    }
})
