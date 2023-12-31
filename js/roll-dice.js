// CONST actions necessary for the game
const newGame = document.querySelector('h1#new-game')
const rollDice = document.querySelector('#roll-dice')
const holdScore = document.querySelector('#hold-score')
const throwDiceArea = document.querySelector('#throw-dice-area')
const players = document.querySelectorAll('h2.actual-player')
const playerOneName = document.querySelector('#player-one-name')
const playerTwoName = document.querySelector('#player-two-name')

// Defines the actual player
let actualPlayer = '1'

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

    // If player confirms then the scores are set to 0 and the roll dice action is enabled
    if (confirmNewGame) {
        playerOneGlobalScore.innerHTML = 0
        playerOneRoundScore.innerHTML = 0
        playerTwoGlobalScore.innerHTML = 0
        playerTwoRoundScore.innerHTML = 0

        setPlayersName()

        rollDice.addEventListener('click', throwDiceAction)

        holdScore.style.cursor = 'not-allowed'
        rollDice.style.cursor = 'pointer'
    }
})

// Gives names to the players 
function setPlayersName() {
    // First player name
    let firstPlayerName = prompt(`Quel est le prénom du premier joueur ?`)
    if(firstPlayerName !== null) {
        let capitalizedFirstPlayerName = firstPlayerName.charAt(0).toUpperCase() + firstPlayerName.slice(1).toLowerCase()
        playerOneName.innerText = `(${capitalizedFirstPlayerName})`
    }
    
    //Second player name
    let secondPlayerName = prompt(`Quel est la prénom du deuxième joueur ?`)
    if(secondPlayerName !== null) {
        let capitalizedSecondPlayerName = secondPlayerName.charAt(0).toUpperCase() + secondPlayerName.slice(1).toLowerCase()
        playerTwoName.innerText = `(${capitalizedSecondPlayerName})`
    }

    // If the players don't set their names, then the div's are not displayed in the DOMBenjamin
    if(firstPlayerName === null || secondPlayerName === null) {
        playerOneName.style.display = 'none'
        playerTwoName.style.display = 'none'

        players[0].style.marginBottom = '2rem'
        players[1].style.marginBottom = '2rem'
    }
}

// DEFINES THE ACTUAL PLAYER -------------------------------------------------------------------

// This function is called elsewhere in the program to define the player and add class to the active player
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

function throwDiceAction() {
    let dice = new Map()
    dice.set(1, '<img src="includes/images/dice/dice-one.png" class="dice-img" alt="dice one image">')
    dice.set(2, '<img src="includes/images/dice/dice-two.png" class="dice-img" alt="dice two image">')
    dice.set(3, '<img src="includes/images/dice/dice-three.png" class="dice-img" alt="dice three image">')
    dice.set(4, '<img src="includes/images/dice/dice-four.png" class="dice-img" alt="dice four image">')
    dice.set(5, '<img src="includes/images/dice/dice-five.png" class="dice-img" alt="dice five image">')
    dice.set(6, '<img src="includes/images/dice/dice-six.png" class="dice-img" alt="dice six image">')

    let throwDice = () => {

        // Returns random number between 0 and 6
        let diceNumber = Math.floor(Math.random() * 7)
        
        // If 0 throw the dice again
        if (diceNumber === 0) {
            throwDice()
        } else {
            throwDiceArea.innerHTML = dice.get(diceNumber)

            // Player one turn    
            if (actualPlayer === '1') {
                if (diceNumber != 1) {
                    // If the dice returns between 2 and 6, then it is added to the current score
                    playerOneRoundScore.innerText = Number(playerOneRoundScore.innerText) + diceNumber
                    holdScore.addEventListener('click', holdScoreAction)
                    holdScore.style.cursor = 'pointer'
                } else {
                    // If the dice roll returns 1, then the hold score button is disabled until the dice is rolled again, the next player is defined and the current score et set to 0
                    playerOneRoundScore.innerText = 0
                    definePlayer('2')
                    holdScore.removeEventListener('click', holdScoreAction)
                    holdScore.style.cursor = 'not-allowed'
                }
            // Player two turn
            } else if (actualPlayer === '2') {
                if (diceNumber != 1) {
                    playerTwoRoundScore.innerText = Number(playerTwoRoundScore.innerText) + diceNumber
                    holdScore.addEventListener('click', holdScoreAction)
                    holdScore.style.cursor = 'pointer'
                } else {
                    playerTwoRoundScore.innerText = 0
                    definePlayer('1')
                    holdScore.removeEventListener('click', holdScoreAction)
                    holdScore.style.cursor = 'not-allowed'
                }
            }
        }
    } 
    throwDice()
}

rollDice.addEventListener('click', throwDiceAction)

// HOLD SCORE -------------------------------------------------------------------

function holdScoreAction() {
    if (actualPlayer === '1') {
        playerOneGlobalScore.innerHTML = Number(playerOneRoundScore.innerText) + Number(playerOneGlobalScore.innerText)
        playerOneRoundScore.innerHTML = 0

        if(Number(playerOneGlobalScore.innerText) >= 100) {
            alert('Le jouer 1 est le grand gagnant de cette partie')
            
            rollDice.removeEventListener('click', throwDiceAction)
            holdScore.removeEventListener('click', holdScoreAction)

            holdScore.style.cursor = 'not-allowed'
            rollDice.style.cursor = 'not-allowed'

            definePlayer('2')
        }  else {
            definePlayer('2')
        }
    } else if (actualPlayer === '2') {
        playerTwoGlobalScore.innerHTML = Number(playerTwoRoundScore.innerText) + Number(playerTwoGlobalScore.innerText)
        playerTwoRoundScore.innerHTML = 0

        if(Number(playerTwoGlobalScore.innerText) >= 100) {
            alert('Le joueur 2 est le grand gagnant de cette partie')

            rollDice.removeEventListener('click', throwDiceAction)
            holdScore.removeEventListener('click', holdScoreAction)

            holdScore.style.cursor = 'not-allowed'
            rollDice.style.cursor = 'not-allowed'

            definePlayer('1')
        } else {
            definePlayer('1')
        }
    }
}

holdScore.addEventListener('click', holdScoreAction)

//  Ask for the players name after the page is loaded
setPlayersName()