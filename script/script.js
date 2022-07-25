'use strict';

// select ui elements
const dice = document.querySelector('.dice');
const newRoundButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

let activePlayer, scores, currentScore, playing;

const init = function () {
  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  playing = true;

  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  dice.classList.add('hidden');
};

init();

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

const rollDice = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

// roll dice
rollDiceButton.addEventListener('click', function () {
  if (playing) {
    const diceRoll = rollDice();
    dice.classList.remove('hidden');
    dice.src = `img/dice-${diceRoll}.png`;
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

// reset game
newRoundButton.addEventListener('click', function () {
  document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
    activePlayer + 1
  }`;
  init();
});
