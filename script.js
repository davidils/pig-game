'use strict';

// init values
let activePlayer = 0;
const scores = [0, 0];
let currentScore = 0;
let playing = true;

// select ui elements
const dice = document.querySelector('.dice');
const newRoundButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

// assign start values
document.getElementById(`score--0`).textContent = 0;
document.getElementById(`score--1`).textContent = 0;
document.getElementById(`current--0`).textContent = 0;
document.getElementById(`current--1`).textContent = 0;

const swapPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

// roll dice
rollDiceButton.addEventListener('click', function () {
  if (playing) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRoll}.png`;
    if (diceRoll === 1) {
      swapPlayer();
    } else {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

// hold score
holdButton.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      dice.classList.add('hidden');
      document.querySelector(`#name--${activePlayer}`).textContent = 'Winner!';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      swapPlayer();
    }
  }
});

// reset
newRoundButton.addEventListener('click', function () {
  playing = true;
  document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
    activePlayer + 1
  }`;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  dice.classList.remove('hidden');
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
