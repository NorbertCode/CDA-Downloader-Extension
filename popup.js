// -- Communication with the content script --

function createDownloadButton(link) {
  let button = document.createElement("button");

  button.id = "download_button";
  button.innerHTML = "Download";

  // Since this script is loaded only when the popup is visible
  // it uses an external method to trigger a download
  button.addEventListener("click", function() {
    chrome.runtime.sendMessage({ message: "Download", link: link });
  });

  document.querySelector("main").append(button);
}

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  let activeTab = tabs[0];

  // Check if the content script is loaded by sending a message
  // Only then create a download button in the popup window
  chrome.tabs.sendMessage(activeTab.id, { message: "Init" })
    .then(response => {
      createDownloadButton(response.message);
    })
    .catch(error => { })
});

