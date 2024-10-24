// Array to store card values
var cardValues = ['🍎', '🍌', '🍇', '🍒', '🍍', '🍉', '🥝', '🍑'];
var gameCards = cardValues.concat(cardValues); // Duplicate cards for matching pairs
var flippedCards = [];
var matchedCards = [];
var gameBoard = document.getElementById('game-board');

// Function to shuffle the cards
function shuffleCards(cardsArray) {
    for (var i = cardsArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cardsArray[i];
        cardsArray[i] = cardsArray[j];
        cardsArray[j] = temp;
    }
    return cardsArray;
}

// Function to create the game board
function createBoard() {
    gameBoard.innerHTML = ''; // Clear the board
    gameCards = shuffleCards(gameCards); // Shuffle the cards
    for (var i = 0; i < gameCards.length; i++) {
        var card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', gameCards[i]);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }
}

// Function to flip a card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.getAttribute('data-value');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Function to check if two flipped cards match
function checkForMatch() {
    var card1 = flippedCards[0];
    var card2 = flippedCards[1];

    if (card1.getAttribute('data-value') === card2.getAttribute('data-value')) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        flippedCards = []; // Reset the flipped cards array
    } else {
        setTimeout(function() {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = []; // Reset the flipped cards array
        }, 1000);
    }

    // Check if the game is won
    if (matchedCards.length === gameCards.length) {
        setTimeout(function() {
            alert('You won! All pairs matched!');
        }, 500);
    }
}

// Function to reset the game
function resetGame() {
    matchedCards = [];
    flippedCards = [];
    createBoard();
}

// Event listener for the restart button
document.getElementById('restart-btn').addEventListener('click', resetGame);

// Initialize the game
createBoard();
