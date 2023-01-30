const resetScoreBtn = document.getElementById('reset-score');
const scoreCountEl = document.getElementById('score-count');
const rulesModalBtn = document.getElementById('rulesBtn');
const rulesModalEl = document.getElementById('rules-modal');
const closeModalBtn = document.getElementById('close-modal');
const playerOptionsPageEl = document.querySelector('.player-options__page');
const evaluationPageEl = document.querySelector('.evaluation-page');
const playerChoiceIcon = document.getElementById('player-choice__icon');
const playerChoiceWrapperEl = document.getElementById('player-choice__wrapper');
const computerChoiceIcon = document.getElementById('com-choice__icon');
const computerChoiceWrapperEl = document.getElementById('com-choice__wrapper');
const resultsEl = document.querySelector('.results');
const roundResultText = document.getElementById('result-text');
const restartBtn = document.getElementById('restart-btn');

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
  //// console.log(playerChoice, humanChoice);
  updateDOM(playerChoice);
};

// Update DOM and move to next page
const updateDOM = (playerChoice) => {
  playerOptionsPageEl.style.display = 'none';
  evaluationPageEl.hidden = false;
  displayPlayerChoice(playerChoice);
};

// Display player's choice in the evaluations page
const displayPlayerChoice = (playerChoice) => {
  // console.log(icons[playerChoice].src);
  playerChoiceWrapperEl.classList.remove('scale-up-animation');
  playerChoiceIcon.src = icons[playerChoice].src;
  playerChoiceIcon.alt = icons[playerChoice].title;
  playerChoiceWrapperEl.classList.add(`${playerChoice}`, 'scale-up-animation');
  // playerChoice === 'rock'
  //   ? playerChoiceWrapperEl.classList.add('rock', 'scale-up-animation')
  //   : playerChoice === 'paper'
  //   ? playerChoiceWrapperEl.classList.add('paper', 'scale-up-animation')
  //   : playerChoiceWrapperEl.classList.add('scissors', 'scale-up-animation');
  getComputerChoice();
};

// Get random computer choice
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

// Display computer's choice in evaluations page
const displayComputerChoice = (compChoice) => {
  //// console.log(compChoice);
  computerChoiceWrapperEl.classList.remove('scale-up-animation');
  computerChoiceIcon.src = icons[compChoice].src;
  computerChoiceIcon.alt = icons[compChoice].title;
  setTimeout(() => {
    // compChoice === 'rock'
    //   ? computerChoiceWrapperEl.classList.add(
    //       'rock',
    //       'scale-up-animation',
    //       'visible'
    //     )
    //   : compChoice === 'paper'
    //   ? computerChoiceWrapperEl.classList.add(
    //       'paper',
    //       'scale-up-animation',
    //       'visible'
    //     )
    //   : computerChoiceWrapperEl.classList.add(
    //       'scissors',
    //       'scale-up-animation',
    //       'visible'
    //     );
    computerChoiceWrapperEl.classList.add(
      `${compChoice}`,
      'scale-up-animation',
      'visible'
    );
  }, 3000);
  // //console.log(compChoice, humanChoice);
  evaluateChoices(compChoice, humanChoice);
};

// Evaluate options picked and get winner/loser
const evaluateChoices = (compChoice, playerChoice) => {
  // Get round results
  //// console.log(compChoice, playerChoice);
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

// Restart Game
const resetPlayground = () => {
  resultsEl.classList.remove('visible');
  playerChoiceWrapperEl.classList.remove(`${humanChoice}`, 'visible');
  computerChoiceWrapperEl.classList.remove(`${computerChoice}`, 'visible');
  evaluationPageEl.hidden = true;
  playerOptionsPageEl.style.display = 'flex';
};

// EVENT LISTENERS
rulesModalBtn.addEventListener('click', () => {
  rulesModalEl.classList.add('visible');
});

closeModalBtn.addEventListener('click', () => {
  rulesModalEl.classList.remove('visible');
});

restartBtn.addEventListener('click', resetPlayground);
resetScoreBtn.addEventListener('click', () => {
  score = 0;
  scoreCountEl.textContent = score.toString();
});
