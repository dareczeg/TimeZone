  class Website {
  constructor(url, notification, limit) {
    this.url = url;
    this.notification = notification;
    this.limit = limit;
  }

  /**
   * Display the websites from the list
   */
  static displayWebsites() {
    const websites = Store.getWebsites();
    websites.forEach((website) => {
      Website.addWebsiteToList(website);
    });
  }

    /**
   * Add individual website to the list
   * @param website to be added
   */
  static addWebsiteToList(website) {
    const list = document.querySelector('#pages');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>`+ website.url + `</td>
        <td>` + website.notification + ' min before' + `</td>
        <td>` + website.limit + ' min' + `
        <button class="delete" id="deleteWButton">X</button></td>
    `;
    list.appendChild(row);
  }

  /**
      * Delete the profile from table (UI) 
      * @param {webiste} to be beleted 
      */
  static deleteWebsite(website) {
    if (website.classList.contains('delete')) {
      website.parentElement.parentElement.remove();
    }
  }
}

// When the DOM is loaded, display the websites
document.addEventListener('DOMContentLoaded', Website.displayWebsites());

// Add the action to the add button
document.querySelector('#addRestriction').addEventListener('submit', (e) => {
  e.preventDefault();
  const url = document.querySelector('#rUrl').value;
  const notification = document.querySelector('#rNotification').value;
  const limit = document.querySelector('#rLimit').value;

  // Validate the input fields
  if (!url || !notification || !limit) {
    alert("Please fill all the input fields.");
  } else {
    const website = new Website(url, notification, limit);
    Website.addWebsiteToList(website);
    Store.addWebsite(website);
    alert("Profile successfully added.");
  }
});

// // Add the action to the delete button
$(document).on('click', '#deleteWButton', (e) => {
  Website.deleteWebsite(e.target);     // Remove book from UI
  Store.removeWebsite(e.target.parentElement.previousElementSibling.previousElementSibling.innerHTML);
  // Remove website from the UI  
});

/**
* Peform the background check in the background and update the values
*/
function backgroundCheck() {
  const currentTime = new Date();
  if (Store.getProfiles() !== null) {
    if (isMidnight(currentTime)) {
      Store.resetDaily();
      window.location.reload();
    } else if (isNewWeek(currentTime) && isMidnight(currentTime)) {
      profiles.forEach((profile) => {
        profile.weekTime = 0;
        window.location.reload();
      });
    } else if (isNewMonth(currentTime) && isMidnight(currentTime)) {
      profiles.forEach((profile) => {
        profile.monthTime = 0;
        window.location.reload();
      });
    }
  }
}

/**
* Check in the background if the time reached the limit.
*/
let time = 0;
setInterval(() => {
  time++;
  backgroundCheck();
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    let url = new URL(tabs[0].url);
    const urlString = url.protocol + '//' + url.hostname + '/';
    //console.log(time + ' - ' + url + ' - '+ urlString);

    if (Store.websiteExists(urlString)) {
      let website = Store.getWebsite(url);
      let webLimitSeconds = website.limit * 60;
      let webNotificationSeconds = website.notification * 60;
      if (time == (webLimitSeconds - webNotificationSeconds)) {
        // display notification
        alert("You're approaching the limit.");
      }
      else if (time == webLimitSeconds) {
        alert('You have reached the limit');
      }
    } 
  });
}, 1000);
