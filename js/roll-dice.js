// CONST actions necessary for the game
const newGame = document.querySelector('h1#new-game')
const rollDice = document.querySelector('#roll-dice')
const holdScore = document.querySelector('#hold-score')
const throwDiceArea = document.querySelector('#throw-dice-area')

// Defines the actual player
const players = document.querySelectorAll('h2.actual-player')
let actualPlayer = '0'

// PLAYER ONE
let playerOneGlobalScore = document.querySelector('div#player-one-global-score')
let playerOneRoundScore = document.querySelector('span#player-one-round-score')

// PLAYER TWO
let playerTwoGlobalScore = document.querySelector('div#player-two-global-score')
let playerTwoRoundScore = document.querySelector('span#player-two-round-score')

// LAUNCH NEW GAME
newGame.addEventListener('click', () => {
    // Player can confirm new game or not
    let confirmNewGame = confirm(
        'Etes-vous sûr de vouloir commencer une nouvelle partie ?'
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

// This defines the actual player by clicking on the H2 html tag
players[0].addEventListener('click', () => {
    actualPlayer = players[0].innerText.substring(7, 8)
    definePlayer(actualPlayer)
})

players[1].addEventListener('click', () => {
    actualPlayer = players[1].innerText.substring(7, 8)
    definePlayer(actualPlayer)
})

// This function is called elsewhere in the program to define the player
function definePlayer(player) {
    if (player === '1') {
        players[0].classList.add('active-player')
        players[1].classList.remove('active-player')
        actualPlayer = '1'
    } else if (player === '2') {
        players[1].classList.add('active-player')
        players[0].classList.remove('active-player')
        actualPlayer = '2'
    }
    return actualPlayer
}

// ROLL DICE -------------------------------------------------------------------
rollDice.addEventListener('click', function() {

    let dice = new Map()
    dice.set(1, '<img src="../includes/images/dice/dice-one.png" class="dice-img" alt="dice one image">')
    dice.set(2, '<img src="../includes/images/dice/dice-two.png" class="dice-img" alt="dice two image">')
    dice.set(3, '<img src="../includes/images/dice/dice-three.png" class="dice-img" alt="dice three image">')
    dice.set(4, '<img src="../includes/images/dice/dice-four.png" class="dice-img" alt="dice four image">')
    dice.set(5, '<img src="../includes/images/dice/dice-five.png" class="dice-img" alt="dice five image">')
    dice.set(6, '<img src="../includes/images/dice/dice-six.png" class="dice-img" alt="dice six image">')

    let throwDice = () => {

        // Returns random number between 0 and 6
        let diceNumber = Math.floor(Math.random() * 7)
        
        // If 0 throm the dice again
        if (diceNumber === 0) {
            throwDice()
        } else {
            throwDiceArea.innerHTML = dice.get(diceNumber)

            // Checks if a player is selected
            if (actualPlayer === '0') {
                alert(`Veuillez sélectionner un joueur !`)

            // Player one turn    
            } else if (actualPlayer === '1') {
                if (diceNumber != 1) {
                    playerOneRoundScore.innerText = Number(playerOneRoundScore.innerText) + diceNumber
                } else {
                    playerOneRoundScore.innerText = 0
                    definePlayer('2')
                }
            // Player two turn
            } else if (actualPlayer === '2') {
                if (diceNumber != 1) {
                    playerTwoRoundScore.innerText = Number(playerTwoRoundScore.innerText) + diceNumber
                } else {
                    playerTwoRoundScore.innerText = 0
                    definePlayer('1')
                }
            }
        }
    } 
    throwDice()
})

// HOLD SCORE -------------------------------------------------------------------
holdScore.addEventListener('click', () => {
    if (actualPlayer === '0') {
        alert(`Veuillez sélectionner un joueur !`)
    } else if (actualPlayer === '1') {
        playerOneGlobalScore.innerHTML = Number(playerOneRoundScore.innerText) + Number(playerOneGlobalScore.innerText)
        playerOneRoundScore.innerHTML = 0
        if(Number(playerOneGlobalScore.innerText) >= 100) {
            alert('Le jouer 1 est le grand gagnant de cette partie')
            rollDice.removeEventListener('click')
        }  else {
            definePlayer('2')
        }
    } else if (actualPlayer === '2') {
        playerTwoGlobalScore.innerHTML = Number(playerTwoRoundScore.innerText) + Number(playerTwoGlobalScore.innerText)
        playerTwoRoundScore.innerHTML = 0
        if(Number(playerTwoGlobalScore.innerText) >= 100) {
            alert('Le joueur 2 est le grand gagnant de cette partie')
        } else {
            definePlayer('1')
        }
    }
})
