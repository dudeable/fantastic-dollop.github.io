document.addEventListener('DOMContentLoaded', function() {
  const circleContainer = document.getElementById('circle-container');
  const resetButton = document.getElementById('reset-button');

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

  function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    circle.style.backgroundColor = randomColor;

    circle.addEventListener('click', function() {
      circle.remove();
    });

    return circle;
  }

  function resetGame() {
    circleContainer.innerHTML = '';

    for (let i = 0; i < 20; i++) {
      const circle = createCircle();
      circleContainer.appendChild(circle);
    }
  }

  resetButton.addEventListener('click', resetGame);

  resetGame();
});

