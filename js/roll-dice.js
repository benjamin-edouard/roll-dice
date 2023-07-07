const newGame = document.querySelector('h1#new-game')
const rollDice = document.querySelector('#roll-dice')
const holdScore = document.querySelector('#hold-score')

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
    let confirmNewGame = confirm('Etes-vous sûr de vouloir commencer une nouvelle partie ?')

    // If player confirms then the scores are set to 0
    if(confirmNewGame) {
        playerOneGlobalScore.innerHTML = 0
        playerOneRoundScore.innerHTML = 0
        playerTwoGlobalScore.innerHTML = 0
        playerTwoRoundScore.innerHTML = 0
    }
})

// DEFINES THE ACTUAL PLAYER
for (let i = 0; i < players.length; i++) {
    players[i].addEventListener('click', () => {
        actualPlayer = players[i].innerText.substring(7, 8)
        players[i].style.fontWeight = 'bold'
    })
}

// ROLL DICE
rollDice.addEventListener('click', () => {
    alert('You have rolled the dice, good luck')
})


// HOLD SCORE
holdScore.addEventListener('click', () => {
    if (actualPlayer === '1') {
        playerOneGlobalScore.innerHTML = Number(playerOneRoundScore.innerText) + Number(playerOneGlobalScore.innerText)
        playerOneRoundScore.innerHTML = 0
    }

    if (actualPlayer === '2') {
        playerTwoGlobalScore.innerHTML = Number(playerTwoRoundScore.innerText) + Number(playerTwoGlobalScore.innerText)
        playerTwoRoundScore.innerHTML = 0 
    }
})