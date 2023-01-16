const resetScoreBtn = document.getElementById('reset-score');
const scoreCountEl = document.getElementById('score-count');
const optionPaperEl = document.getElementById('option-paper');
const optionScissorsEl = document.getElementById('option-scissors');
const optionRockEl = document.getElementById('option-rock');
const rulesModalBtn = document.getElementById('rulesBtn');
const rulesModalEl = document.getElementById('rules-modal');
const closeModalBtn = document.getElementById('close-modal');
const playerOptionsPageEl = document.querySelector('.player-options__page');
const evaluationPageEl = document.querySelector('.evaluation-page');
const playerChoiceIcon = document.getElementById('player-choice__icon');
const playerChoiceWrapperEl = document.getElementById('player-choice__wrapper');
const computerChoiceIcon = document.getElementById('com-choice__icon');
const computerChoiceWrapperEl = document.getElementById('com-choice__wrapper');
const playerChoiceEl = document.getElementById('hooman');
const computerChoiceEl = document.getElementById('house');
const resultsEl = document.querySelector('.results');
const roundResultText = document.getElementById('result-text');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors'] },
  paper: { name: 'Paper', defeats: ['rock'] },
  scissors: { name: 'Scissors', defeats: ['paper'] },
};

let computerChoice = '';
let humanChoice = '';
let score = 0;

const icons = {
  rock: {
    src: './images/icon-rock.svg',
    title: 'rock icon',
  },
  paper: {
    src: './images/icon-paper.svg',
    title: 'paper icon',
  },
  scissors: {
    src: './images/icon-scissors.svg',
    title: 'scissors icon',
  },
};

const pick = (playerChoice) => {
  humanChoice = playerChoice;
  console.log(playerChoice, humanChoice);
  updateDOM(playerChoice);
};

const updateDOM = (playerChoice) => {
  playerOptionsPageEl.style.display = 'none';
  evaluationPageEl.hidden = false;
  displayPlayerChoice(playerChoice);
};

const displayPlayerChoice = (playerChoice) => {
  // console.log(icons[playerChoice].src);
  playerChoiceIcon.src = icons[playerChoice].src;
  playerChoiceIcon.alt = icons[playerChoice].title;
  playerChoice === 'rock'
    ? playerChoiceWrapperEl.classList.add('rock', 'scale-up-animation')
    : playerChoice === 'paper'
    ? playerChoiceWrapperEl.classList.add('paper', 'scale-up-animation')
    : playerChoiceWrapperEl.classList.add('scissors', 'scale-up-animation');
  getComputerChoice();
};

const getComputerChoice = () => {
  //? Get a number between 0 and 11
  const computerChoiceNumber = Math.floor(Math.random() * 12);
  //// console.log(computerChoiceNumber);
  if (computerChoiceNumber < 4) {
    computerChoice = 'rock';
  } else if (computerChoiceNumber <= 7) {
    computerChoice = 'paper';
  } else {
    computerChoice = 'scissors';
  }
  displayComputerChoice(computerChoice);
};

const displayComputerChoice = (compChoice) => {
  //// console.log(compChoice);
  computerChoiceIcon.src = icons[compChoice].src;
  computerChoiceIcon.alt = icons[compChoice].title;
  //// console.log(icons[compChoice].src);
  setTimeout(() => {
    compChoice === 'rock'
      ? computerChoiceWrapperEl.classList.add(
          'rock',
          'scale-up-animation',
          'visible'
        )
      : compChoice === 'paper'
      ? computerChoiceWrapperEl.classList.add(
          'paper',
          'scale-up-animation',
          'visible'
        )
      : computerChoiceWrapperEl.classList.add(
          'scissors',
          'scale-up-animation',
          'visible'
        );
  }, 3000);
  console.log(compChoice, humanChoice);
  evaluateChoices(compChoice, humanChoice);
};

const evaluateChoices = (compChoice, playerChoice) => {
  // Get round results
  console.log(compChoice, playerChoice);
  scoreCountEl.classList.remove('scale-up-animation-two');
  if (playerChoice === compChoice) {
    roundResultText.textContent = 'Draw!';
  } else {
    const choice = choices[playerChoice];

    if (choice.defeats.includes(compChoice)) {
      roundResultText.textContent = 'You Win';
      score++;
    } else {
      roundResultText.textContent = 'You Lose';
      score--;
    }
  }
  setTimeout(() => {
    scoreCountEl.classList.add('scale-up-animation-two');
    scoreCountEl.textContent = score.toString();
    resultsEl.classList.add('visible');
  }, 3000);
};

// EVENT LISTENERS
rulesModalBtn.addEventListener('click', () => {
  rulesModalEl.classList.add('visible');
});

closeModalBtn.addEventListener('click', () => {
  rulesModalEl.classList.remove('visible');
});
