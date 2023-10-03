// JavaScript to show and hide the popup after a delay
const scorePopup = document.getElementById('scorePopup');
const closePopupButton = document.getElementById('closePopup');
const scoreElement = document.getElementById('score');
const oversElement = document.getElementById('overs');

// Initialize variables for score, overs, and wickets
let score = 0;
let overs = 0.0; // Initialize overs as 0.0
let wickets = 0;
let balls = 0;
let interval;

setTimeout(() => {
    scorePopup.style.display = 'block';
    updateScore();
}, 0); // Display popup immediately after loading the page

closePopupButton.addEventListener('click', () => {
    scorePopup.style.display = 'none';
});


function updateScore() {
    // Simulate score updates (you can replace this with your API)
    interval = setInterval(() => {
        if (wickets === 11) {
            // All wickets are gone, show the final score and pause the update
            displayPopup(`Final Score: ${score}/${wickets} (Overs: ${overs}.${balls})`);
            clearInterval(interval);
            return;
        }

        //Randomly Updating the score
        const random = Math.random();
        if (random < 0.2 && wickets < 10) {
            // 20% chance of a boundary (4)
            score += 4;
            balls++;
        } else if (random > 0.2 && random < 0.4 && wickets < 10) {
            // 20% chance of a six (6)
            score += 6;
            balls++;
        } else if (random > 0.5 && random < 0.7 && wickets < 10) {
            // 20% chance of a wicket (W)
            wickets++;
            balls++;
            displayPopup(`Wicket ${wickets} fallen!`);
        } else if (random > 0.8 && wickets < 10) {
            // 40% chance of a regular run
            score++;
            balls++;
        }

        // Check for end of over (6 balls)
        if (balls >= 6) {
            overs += Math.floor(balls / 6); // Increment overs by the number of completed overs
            balls %= 6; // Update balls for the current over
        }

        // Update the score and overs display
        scoreElement.innerText = `${score}/${wickets}`;
        oversElement.innerText = `${overs}.${balls}`;

        if (wickets === 11) {
            // All wickets are gone, show the final score and pause the update
            displayPopup(`Final Score: ${score}/${wickets} (Overs: ${overs}.${balls})`);
            clearInterval(interval);
            return;
        }
    }, 5000); // Update every 5 seconds
}


function incrementScore(score) {
    const [runs, wickets] = score.split('/');
    score = `${Number(runs) + 1}/${wickets}`;
    return score;
}

function incrementBoundary(score) {
    const [runs, wickets] = score.split('/');
    score = `${Number(runs) + 4}/${wickets}`;
    return score;
}

function incrementSix(score) {
    const [runs, wickets] = score.split('/');
    score = `${Number(runs) + 6}/${wickets}`;
    return score;
}

function displayPopup(message) {
    // Display a popup with the given message
    const popupContent = document.getElementById('popupContent');
    popupContent.innerText = message;
    scorePopup.style.display = 'block';
}

function handleWicket() {
if (wickets === 10) {
  // All wickets are gone, show the final score and pause the update
  displayPopup(`Final Score: ${score}/${wickets} (Overs: ${overs}.${balls})`);
  clearInterval(interval);
} else {
  // Increment wicket and display
  wickets++;
  scoreElement.innerText = `${score}/${wickets}`;
  displayPopup(`Wicket ${wickets} fallen!`);
}
}
