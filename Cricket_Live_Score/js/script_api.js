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
// Function to fetch cricket data from the API
function fetchCricketData() {
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const response = JSON.parse(this.responseText);
            // Extract relevant data from the API response (e.g., score, wickets, overs)
            const { score, wickets, overs } = response;
            // Update the score, wickets, and overs in your simulation
            updateCricketData(score, wickets, overs);
        }
    });

    xhr.open('GET', 'https://cricket-live-data.p.rapidapi.com/series');
    xhr.setRequestHeader('X-RapidAPI-Key', '480437cfe1mshda60dbdee6eff66p15001ajsndb251493580f');
    xhr.setRequestHeader('X-RapidAPI-Host', 'cricket-live-data.p.rapidapi.com');

    xhr.send(data);
}

// Function to update the cricket data in your simulation
function updateCricketData(newScore, newWickets, newOvers) {
    score = newScore;
    wickets = newWickets;
    // Convert the overs from the API to the format used in your simulation
    overs = parseFloat(newOvers) + balls / 6;
    // Update the score, wickets, and overs display
    scoreElement.innerText = `${score}/${wickets}`;
    oversElement.innerText = `${overs.toFixed(1)}`;
}

function updateScore() {
    // Fetch cricket data from the API initially
    fetchCricketData();

    // Set up an interval to fetch updated data from the API at regular intervals
    interval = setInterval(() => {
        // Fetch updated cricket data from the API
        fetchCricketData();

        if (wickets === 11) {
            // All wickets are gone, show the final score and pause the update
            displayPopup(`Final Score: ${score}/${wickets} (Overs: ${overs.toFixed(1)})`);
            clearInterval(interval);
            return;
        }
    }, 3000); // Update every 3 seconds
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
