/* script.js */
let startTime, updatedTime, difference, tInterval;
let running = false;
let lapNumber = 1;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1000);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    timeDisplay.textContent = "00:00:00";
    lapsContainer.innerHTML = '';
    lapNumber = 1;
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    timeDisplay.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function recordLap() {
    if (running) {
        const lapTime = formatTime(updatedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
        lapsContainer.appendChild(lapItem);
        lapNumber++;
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
