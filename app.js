// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;

// UI elements
const UIgame        = document.querySelector('#game'),
      UIminNum      = document.querySelector('.min-num'),
      UImaxNum      = document.querySelector('.max-num'),
      UIguessInput  = document.querySelector('#guess-input'),
      UIguessBtn    = document.querySelector('#guess-btn'),
      UImessage     = document.querySelector('.message');

// Assign UI min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play again event listener
UIgame.addEventListener('mousedown', function(event) {
  if (event.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
UIguessBtn.addEventListener('click', function() {
  let guess = parseInt(UIguessInput.value);
  UIguessInput.value = '';
  console.log(guess);

  // Validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
  } else {
    // Check if won
    if (guess === winningNum) {
      // Game over - won
      gameOver(true, `${winningNum} is correct. You win!`);
    } else {
      // Wrong number
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        // Game over - lost
        gameOver(false, `Game over! The correct number was ${winningNum}.`);
      } else {
        // Game continues - answer was wrong
        setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, 'red');
      }
    }
  }
});

// Game over
function gameOver(won, message) {
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  UIguessInput.disabled = true;
  // Change border color
  UIguessInput.style.borderColor = color;
  // Set message
  setMessage(message, color);

  // Play again
  UIguessBtn.value = 'Play Again';
  UIguessBtn.className += 'play-again';
}

// Get winning num
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color = 'black') {
  UImessage.style.color = color;
  UImessage.textContent = msg; 
}