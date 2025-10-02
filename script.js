document.addEventListener('DOMContentLoaded', function() {
  const circleContainer = document.getElementById('circle-container');
  const timerValue = document.getElementById('timer-value');
  const leaderboardList = document.getElementById('leaderboard-list');

  let score = 0;
  let time = 0;
  let timerInterval;

  function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    const randomColor = getRandomColor();
    circle.style.backgroundColor = randomColor;

    circle.addEventListener('click', function() {
      circle.remove();
      score++;
      checkWinCondition();
    });

    return circle;
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
    const circles = circleContainer.getElementsByClassName('circle');
    if (circles.length === 0) {
      clearInterval(timerInterval);
      setTimeout(function() {
        const playerName = prompt('Congratulations! You are okay at doing work!\nEnter your name for the leaderboard:');
        if (playerName) {
          addToLeaderboard(playerName, score);
          updateLeaderboard();
        }
        resetGame();
      }, 200);
    }
  }

  function addToLeaderboard(playerName, playerScore) {
    const leaderboardEntry = document.createElement('li');
    leaderboardEntry.textContent = `${playerName}: ${playerScore}`;
    leaderboardList.appendChild(leaderboardEntry);
  }

  function updateLeaderboard() {
    const leaderboardEntries = leaderboardList.getElementsByTagName('li');
    const sortedEntries = Array.from(leaderboardEntries).sort((a, b) => {
      const scoreA = parseInt(a.textContent.split(': ')[1]);
      const scoreB = parseInt(b.textContent.split(': ')[1]);
      return scoreB - scoreA;
    });
    leaderboardList.innerHTML = '';
    sortedEntries.forEach(entry => leaderboardList.appendChild(entry));
  }

  function startTimer() {
    timerInterval = setInterval(function() {
      time++;
      timerValue.textContent = time;
    }, 1000);
  }

  function resetGame() {
    score = 0;
    time = 0;
    timerValue.textContent = time;
    circleContainer.innerHTML = '';
    clearInterval(timerInterval);
    startTimer();

    for (let i = 0; i < 10; i++) {
      const circle = createCircle();
      circleContainer.appendChild(circle);
    }
  }

  resetGame();
});
