// Define constants for API_KEY, API_URL and document
const API_KEY = "8jxsbfzhZX1JG4HIQW7-vZH9Qs0";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

// it is a good practice to pass "e" to handler function
/**
 * Function to Wiring up the "check key"
 */
document.getElementById("status").addEventListener("click", e => getStatus(e));

/**
 * Function to Wiring up the "Run Check" button
 */
document.getElementById("submit").addEventListener("click", e => postForm(e));

async function postForm(e) {
    const form = new FormData(document.getElementById("checksform"));


    /**
     * Function to check whether the postForm function work
     */
    // for (let e of form.entries()) {
    //     console.log(e);
    // }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,

    })
    const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        displayException(data);
        throw new Error(data.error);
    }
}

function displayErrors(data) {
    let heading = `JSHint Results for ${data.file}`;
    let results;

    if(data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`
        for(let error of data.error_list) {
            results += `<div> At line <span class="line">${error.line}</span>,`;
            results += `column <span class="column">${error.col}</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;

    resultsModal.show();
}


/**
 * Retrieves data from an API endpoint and 
 * displays the status of the API response
 */
async function getStatus(e) {

    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data);
    } else {
        displayException(data)
        throw new Error(data.error);
    }
}

function displayException(data) {
    let heading = `An Exception Occurred`;

    let results = `<div>The API returned status code ${data.status_code}</div>`;
    results += `<div>Error number: <strong>${data.error_no}</strong></div>`;
    results += `<div>Error text: <strong>${data.error}</strong></div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;

    resultsModal.show();
}

function displayStatus(data) {
    let heading = "API Key Status";
    let results = `<div>Your API key is valid until: </div>`;
    results += `<div class="key-status">${data.expiry}</div>`;


    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;

    resultsModal.show();
}
