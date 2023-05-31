document.addEventListener('DOMContentLoaded', function() {
  const numberContainer = document.getElementById('number-container');
  let score = 0;

  function createNumber() {
    const number = document.createElement('div');
    number.classList.add('number');
    number.textContent = getRandomNumber();

    number.addEventListener('click', function() {
      if (parseInt(number.textContent) === score + 1) {
        score++;
        number.style.backgroundColor = getRandomColor();
        number.style.color = '#ffffff';
        number.style.cursor = 'default';
        number.removeEventListener('click', arguments.callee);
      }
      checkWinCondition();
    });

    return number;
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function checkWinCondition() {
    const numbers = numberContainer.getElementsByClassName('number');
    if (score === numbers.length) {
      setTimeout(function() {
        alert('Congratulations! You clicked all the numbers!');
        resetGame();
      }, 200);
    }
  }

  function resetGame() {
    score = 0;
    numberContainer.innerHTML = '';

    for (let i = 0; i < 10; i++) {
      const number = createNumber();
      number
