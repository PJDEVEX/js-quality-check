// Define constants for API_KEY, API_URL and document
const API_KEY = "8jxsbfzhZX1JG4HIQW7-vZH9Qs0";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

// it is a good practice to pass "e" to handler function
/**
 * Function to Wireing up the "check key"
 */
document.getElementById("status").addEventListener("click", e => getStatus(e));

async function getStatus(e) {

    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    let heading = "API Key Status";
    let results = `<div>Your API key is valid until: </div>`;
    results += `<div class="key-status">${data.expiry}</div>`;


    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;

    resultsModal.show();
}