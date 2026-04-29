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

        // Diverse vibrant colors
        const colors = ['#3498db', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c'];
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
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            time++;
            display.innerText = time + "s";
        }, 1000);
    }

    function checkWin() {
        if (container.children.length === 0) {
            clearInterval(timerInterval);
            setTimeout(() => {
                const name = prompt(`Finished in ${time}s! Your name:`);
                if (name) saveScore(name, time);
                reset();
            }, 100);
        }
    }

    function saveScore(name, finalTime) {
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `${name} <span class="badge bg-primary rounded-pill">${finalTime}s</span>`;
        list.appendChild(li);

        // Sort: Fastest (lowest time) first
        const items = Array.from(list.children);
        items.sort((a, b) => parseInt(a.querySelector('span').innerText) - parseInt(b.querySelector('span').innerText));
        list.innerHTML = "";
        items.forEach(item => list.appendChild(item));
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

    reset(); // Initial game setup
});
