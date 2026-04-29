javascript
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('circle-container');
    const display = document.getElementById('timer');
    const list = document.getElementById('leaderboard-list');

    let time = 0;
    let timerInterval;
    let gameStarted = false;

    function createCircle() {
        const div = document.createElement('div');
        div.className = 'circle';

        // Random pink aesthetic colors
        const colors = ['#ffc1e3', '#ff85a1', '#f7aef8', '#d63384'];
        div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        div.onclick = function() {
            if (!gameStarted) {
                gameStarted = true;
                startTimer();
            }
            div.remove();
            checkWin();
        };
        return div;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            time++;
            display.innerText = time + "s";
        }, 1000);
    }

    function checkWin() {
        if (container.getElementsByClassName('circle').length === 0) {
            clearInterval(timerInterval);
            setTimeout(() => {
                const name = prompt(`Speedy! You finished in ${time} seconds. Enter your name:`);
                if (name) {
                    saveScore(name, time);
                }
                reset();
            }, 100);
        }
    }

    function saveScore(name, finalTime) {
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `${name} <span class="badge bg-danger rounded-pill">${finalTime}s</span>`;
        list.appendChild(li);
        sortScores();
    }

    function sortScores() {
        const items = Array.from(list.getElementsByTagName('li'));
        items.sort((a, b) => {
            return parseInt(a.querySelector('span').innerText) - parseInt(b.querySelector('span').innerText);
        });
        list.innerHTML = "";
        items.forEach(i => list.appendChild(i));
    }

    function reset() {
        time = 0;
        gameStarted = false;
        display.innerText = "0s";
        container.innerHTML = "";
        for (let i = 0; i < 10; i++) {
            container.appendChild(createCircle());
        }
    }

    reset();
});
