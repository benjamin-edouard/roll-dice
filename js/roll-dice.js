const newGame = document.querySelector('h1#new-game')
const rollDice = document.querySelector('#role-dice')
const holdScore = document.querySelector('#hold-score')
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

// ROLL DICE
rollDice.addEventListener('click', () => {
    alert('You have rolled the dice, good luck')
})


// HOLD SCORE
holdScore.addEventListener('click', () => {
    alert('You have hold your score')
})