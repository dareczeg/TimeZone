'use strict';

let bgTime = 0;

// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        console.log("This is a first install!");
    } else if (details.reason == "update") {
        let thisVersion = chrome.runtime.getManifest().version;
        console.log("The extension has been successfully installed! The current version is " + thisVersion);
    }
});

// On uninstall redirect to survey 
chrome.runtime.setUninstallURL("https://forms.gle/o4M5EKUnonSvKM5YA");

/**
 * Convert time to the HH:MM:SS time format
 * @param {*} bgTime - time passed 
 * @returns formatted time
 */
function convertToString(bgTime) {
    let timeString;
    if (bgTime < 60) {
        timeString = bgTime + "s";
    } else if (bgTime >= 60) {
        timeString = Math.floor(bgTime / 60) + "m";
    } else if (bgTime >= 3600) {
        timeString = Math.floor(bgTime / 3600) + "h";
    }
    return timeString;
}

// Pass the text to the badge and refresh it every second
setInterval(() => {
    bgTime++;
    chrome.browserAction.setBadgeBackgroundColor({ color: "black" });
    chrome.browserAction.setBadgeText({ text: convertToString(bgTime) });
}, 1000);

// Refresh the counter on the activated new tab
chrome.tabs.onActivated.addListener(() => {
    bgTime = -1;
})

