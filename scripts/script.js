let randomNumber = getRandomNumber();

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const turnsLeft = document.querySelector('.turnsLeft');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

const turnsLeftText = "Turnos restantes: ";

let guessCount = 1;
let resetButton;
let enterFired = false;

guessField.focus();

guessSubmit.addEventListener('click', checkGuess);

guessField.addEventListener("keydown", function(event) {
  if (event.key === "Enter" && !enterFired) {
    guessSubmit.click();
    enterFired = true;
    event.stopPropagation();
  }
});

guessField.addEventListener('keyup', function(event) {
  if(event.key === "Enter")
  {
    enterFired = false;
  }
});

function checkGuess() {

  let userGuess = Number(guessField.value);

  if( (isNaN(userGuess)) || (guessField.value.trim().length === 0) ||
  (userGuess < 0 || userGuess > 100) || (userGuess !== Math.floor(userGuess)))
  {
    alert("É necessário informar um número inteiro de 0 a 100!");
    return;
  }

  if (guessCount === 1) {
    guesses.textContent = 'Palpites anteriores: ';
    turnsLeft.textContent = turnsLeftText;
  }
  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = 'Parabéns, você acertou o número e, portanto, ganhou o jogo :)';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
    return;
  } else if (guessCount === 10) {
    lastResult.textContent = 'Fim de jogo! Você perdeu :/';
    setGameOver();
    return;
  } else {
    lastResult.textContent = 'Errou!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'O seu palpite foi muito baixo!';
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'O seu palpite foi muito alto!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();

  turnsLeft.textContent = turnsLeftText + (11 - guessCount);
}

function setGameOver() {
  guessField.value = '';
  turnsLeft.textContent = turnsLeftText + "0";
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Começar uma nova partida';
  resetButton.classList.add("button");
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'gainsboro';

  randomNumber = getRandomNumber();
}

function getRandomNumber() {
  return Math.floor(Math.random() * 101); // O número sorteado será de 0 a 100.
}
