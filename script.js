const imagePaths = [
  '🚀', '🎉', '😊', '🍦', '😎', '🦄', '🎈', '👑'
];

let cardImages = [...imagePaths, ...imagePaths]; // 16 cards
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer;
let seconds = 0;
let gameStarted = false;

const board = document.getElementById('gameBoard');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', resetGame);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startTimer() {
  timer = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `⏱ ${seconds}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function createBoard() {
  shuffle(cardImages);
  board.innerHTML = '';
  cardImages.forEach((imgSrc, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imgSrc;

   card.innerHTML = `
  <div class="card-inner">
    <div class="card-front">❓</div>
    <div class="card-back">${imgSrc}</div>
  </div>
`;


    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (!gameStarted) {
    startTimer();
    gameStarted = true;
  }

  if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;
    const [card1, card2] = flippedCards;

    if (card1.dataset.image === card2.dataset.image) {
      matchedPairs++;
      flippedCards = [];

      if (matchedPairs === imagePaths.length) {
        stopTimer();
        setTimeout(() => alert(`🎉 You won in ${moves} moves and ${seconds}s!`), 300);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
}

function resetGame() {
  matchedPairs = 0;
  moves = 0;
  seconds = 0;
  gameStarted = false;
  clearInterval(timer);
  timerDisplay.textContent = '⏱ 0s';
  movesDisplay.textContent = 'Moves: 0';
  flippedCards = [];
  createBoard();
}

createBoard();
