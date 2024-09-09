let countdownInterval;
let totalSecondsRemaining;
let isRunning = false;

function startTimer() {
    // If totalSecondsRemaining exists, resume from there; otherwise, calculate from input
    if (typeof totalSecondsRemaining === 'undefined') {
        const daysInput = parseInt(document.getElementById('days').value) || 0;
        const hoursInput = parseInt(document.getElementById('hours').value) || 0;
        const minutesInput = parseInt(document.getElementById('minutes').value) || 0;
        const secondsInput = parseInt(document.getElementById('seconds').value) || 0;

        totalSecondsRemaining = 
            (daysInput * 24 * 60 * 60) +
            (hoursInput * 60 * 60) +
            (minutesInput * 60) + secondsInput;

        if (totalSecondsRemaining <= 0) {
            alert("Please enter a valid time");
            return;
        }
    }

    if (!isRunning) {
        countdownInterval = setInterval(() => {
            let days = Math.floor(totalSecondsRemaining / (60 * 60 * 24));
            let hours = Math.floor((totalSecondsRemaining % (60 * 60 * 24)) / (60 * 60));
            let minutes = Math.floor((totalSecondsRemaining % (60 * 60)) / 60);
            let seconds = Math.floor(totalSecondsRemaining % 60);

            document.getElementById('days').value = days < 10 ? '0' + days : days;
            document.getElementById('hours').value = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').value = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').value = seconds < 10 ? '0' + seconds : seconds;

            if (totalSecondsRemaining <= 0) {
                clearInterval(countdownInterval);
                alert("Countdown finished!");
                totalSecondsRemaining = undefined; // Reset for next start
                isRunning = false;
            }
            totalSecondsRemaining--;
        }, 1000);
        isRunning = true;
    }
}

function stopTimer() {
    clearInterval(countdownInterval); // Stop the timer but retain the remaining time
    isRunning = false;
}

// Event listeners for buttons
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('stopBtn').addEventListener('click', stopTimer);
