'use strict';

let activePlayer = 0;
const scores = [0, 0];
let currentScore = 0;

// select all ui elements
const dice = document.querySelector('.dice');
const newRoundButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

document.getElementById(`score--0`).textContent = 0;
document.getElementById(`score--1`).textContent = 0;
document.getElementById(`current--0`).textContent = 0;
document.getElementById(`current--1`).textContent = 0;
dice.classList.add('hidden');

const swapPlayer = function () {
  const currentScoreElement = document.getElementById(
    `current--${activePlayer}`
  );
  currentScoreElement.textContent = 0;
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

// roll dice functionality
rollDiceButton.addEventListener('click', function () {
  const diceRoll = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  dice.src = `dice-${diceRoll}.png`;
  const currentScoreElement = document.getElementById(
    `current--${activePlayer}`
  );

  if (diceRoll === 1) {
    swapPlayer();
  } else {
    currentScore += diceRoll;
    currentScoreElement.textContent = currentScore;
  }
});

// hold score functionality
holdButton.addEventListener('click', function () {
  const scoreElement = document.getElementById(`score--${activePlayer}`);
  scores[activePlayer] += currentScore;
  scoreElement.textContent = scores[activePlayer];
  if (scores[activePlayer] >= 20) {
    alert(`Player ${activePlayer === 0 ? 1 : 2} wins!`);
  } else {
    swapPlayer();
  }
});

// reset functionality
newRoundButton.addEventListener('click', function () {
  activePlayer = 1;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  swapPlayer();
});
