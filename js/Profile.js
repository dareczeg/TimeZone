
let elapsedTime = 0; // Time that have already passed
let timerInterval; // Time interval

    class Profile {
    constructor(name, dayTime, weekTime, monthTime) {
        this.name = name;
        this.dayTime = dayTime;
        this.weekTime = weekTime;
        this.monthTime = monthTime;
    }
    /**
     * Display all the profiles added to Local Storage.
     */
    static displayProfiles() {
        const profiles = Store.getProfiles();
        profiles.forEach((profile) => {

            // If the profile doesn't exist add it to the list
            if (!Store.profileExists(profile)) {
                Profile.addProfileToList(profile);
            }
            // Otherwise, if the object has been changed, 
            //remove the previous element from the list and add updated
            else if (changed) {
                const list = document.querySelector('#profileList');
                list.removeChild(list.lastChild);
                Profile.addProfileToList(profile);
            }
        });
    }

    /**
     * Create a row and add the profile properties
     * @param {*} profile 
     */
    static addProfileToList(profile) {
        const list = document.querySelector('#profileList');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${profile.name}</td>
            <td> 00:00:00 </td>
            <td>`+ timeToString(profile.dayTime) + `</td>
            <td>`+ timeToString(profile.weekTime) + `</td>
            <td>`+ timeToString(profile.monthTime) + `</td>
            <td><button class="start" id="startButton">&#x23f5;</button>
                <button class="pause" id="pauseButton">&#x23f8;</button>
                <button class="delete" id="deleteButton">X</button></td>
        `;

        list.appendChild(row);
    }

    /**
     * Delete the profile from the visible table 
     * @param {*} el 
     */
    static deleteProfile(profile) {
        if (profile.classList.contains('delete')) {
            profile.parentElement.parentElement.remove();
        }
    }

    /**
     * Clear the input field after entering the name.
     */
    static clearField() {
        document.querySelector('#pName').value = '';
    }
}

// When the DOM is loaded, display the profiles
document.addEventListener('DOMContentLoaded', Profile.displayProfiles());

// Add the action to the add button
document.querySelector('#addProfile').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#pName').value;

    if (!name) {
        alert("Please fill the profile name.");
    } else {
        const profile = new Profile(name, 0, 0, 0);
        Profile.addProfileToList(profile);
        Store.addProfile(profile);
        Profile.clearField();
    }
});

// // Add the action to the delete button
$(document).on('click', '#deleteButton', (e) => {
    // Remove book from Profile
    Profile.deleteProfile(e.target);
    // Remove book from store
    Store.removeProfile(
        e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML);
});

// Start the timer on click
$(document).on('click', '#startButton', (e) => {
    let startTime = Date.now(); // Update the initial time
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime; // Update the elapsed time
        e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML = timeToString(elapsedTime);
    }, 1000);
});

// Pause the timer on click and reload
$(document).on('click', '#pauseButton', (e) => {
    clearInterval(timerInterval);
    let profileName = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    Store.updateProfile(profileName, elapsedTime);
    location.reload();
});

// Sort the array descending on click
$(document).on('click', '#sortDescending', () => {
    Store.sortDescending();
    location.reload();
});

// Sort the array ascending on click
$(document).on('click', '#sortAscending', () => {
    Store.sortAscending();
    location.reload();
});

// Refresh the total value every second
setInterval(() => {
    document.getElementById('totalTime').innerHTML = timeToString(Store.getTotalTime());
}, 1000);

/**
* Source: https://codepen.io/bradtraversy/pen/OrmKWZ
* Inspired by: https://tinloof.com/blog/how-to-bProfileld-a-stopwatch-with-html-css-js-react-part-2/
*/