const regEx = /[!@#$%^&*(),.?":{}|<>]/;
const guessIs = document.querySelector('#hint');
const inputGuess = document.querySelector('#input-guess');
const listGuesses = document.querySelector('#listGuesses');
const randomNr = Math.round(Math.random() * 100);
let counter = 0;
let hasRunOnce = false;
console.log(randomNr);

document.querySelector('#btn').addEventListener('click', (e) => {
  e.preventDefault();

  let validated = validateString(inputGuess.value);
  if (validated) {
    invalidMsg();
    inputGuess.value = '';
    return;
  }
  counter++;
  toGuessList(inputGuess.value);
  displayHint(inputGuess.value);
  displayCounter(counter);
  inputGuess.value = '';

});

function toGuessList(value) {
  /* runs once to remove place holder */
  if (!hasRunOnce) {
    listGuesses.firstElementChild.remove();
    hasRunOnce = true;
  }
  /* -------------------------------- */
  
  const listItem = document.createElement('li');
  listItem.textContent = value;
  listGuesses.append(listItem);

}

function displayHint(value) {
  let text = 'guess';
  if (value > randomNr) {
    guessIs.innerHTML = 'To High!';
  }
  else if (value < randomNr) {
    guessIs.innerHTML = 'To Low!';
  }
  else {
    /* this is could be better */
    document.querySelector('h1').innerHTML = 'YOU WIN';
    if (counter > 1) text = 'guesses';

    guessIs.innerHTML = `You did it in ${counter} ${text}!`;
    inputGuess.setAttribute('disabled', true);

    let reloadBtn = document.querySelector('#btn');
    reloadBtn.addEventListener('click', () => {
      location.reload();
    })
    reloadBtn.innerHTML = 'Play again';
    return;
  }
}

function displayCounter(value) {
  document.querySelector('#counter').innerHTML = value;
}

function validateString(value) {
  return (checkString(value) || isNaN(value) || (value > 100) || (value < 0) || (!value));
}

function checkString(value) {
  return regEx.test(value);
}

function invalidMsg() {
  guessIs.innerHTML = 'no LETTERS, no SYMBOLS and no EMPTY';
}

