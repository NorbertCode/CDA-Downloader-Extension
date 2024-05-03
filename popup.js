// -- Communication with the content script --

function createDownloadButton() {
  let button = document.createElement("button");

  button.id = "download_button";
  button.innerHTML = "Download";

  // Since this script is loaded only when the popup is visible
  // this uses the download() function from siteHandler.js
  button.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "Download" });
    });
  });

  document.querySelector("main").append(button);
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  let activeTab = tabs[0];

  // Check if the content script is loaded by sending a message
  // Only then create a download button in the popup window
  chrome.tabs.sendMessage(activeTab.id, { message: "Init" })
    .then(response => {
      createDownloadButton();
  })
    .catch(error => { })
});

