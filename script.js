const selectionButtons = document.querySelectorAll('button.selection')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const playerScoreSpan = document.querySelector('[data-player-score]')
const popup = document.querySelector('.popup')
const selections = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌',
        beats: 'paper'
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = selections.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection()
    const playerWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)
    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, playerWinner)
    if (playerWinner) {
        incerementScore(playerScoreSpan)
        showPopup('Nyertél 😄')
    } else if (computerWinner) {
        incerementScore(computerScoreSpan)
        showPopup('Vesztettél 😭')
    } else {
        showPopup('Döntetlen 😕')
    }
}

function incerementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add(winner ? 'result-selection-winner' : 'result-selection')
    finalColumn.after(div)
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * selections.length)
    return selections[randomIndex]
}

function showPopup(message) {
    document.querySelector('.popup > .popup-message').innerHTML = message
    popup.classList.add('active')
    setTimeout(() => {
        popup.classList.remove('active')
    }, 2000);
}
