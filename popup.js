// -- Communication with the content script --

function createDownloadButton(link, videoName) {
  let button = document.createElement("button");

  button.id = "download_button";
  button.innerHTML = "Download";

  // Since this script is loaded only when the popup is visible
  // it uses an external method to trigger a download
  button.addEventListener("click", function() {
    chrome.runtime.sendMessage({ message: "Download", link: link, videoName: videoName });
  });

  document.querySelector("main").append(button);
}

// -- On popup loaded --

function loadOptions() {
  let addButton = document.querySelector("#add_button");
  let instantDownload = document.querySelector("#instant_download");
  let fileName = document.querySelector("#file_name");

  chrome.storage.local.get(["dataExists"]).then((result) => {
    if (result.dataExists == "true") {
      chrome.storage.local.get(["add_button"]).then((result) => { addButton.checked = (result.add_button == "true"); });
      chrome.storage.local.get(["instant_download"]).then((result) => { instantDownload.checked = (result.instant_download == "true"); });
      chrome.storage.local.get(["file_name"]).then((result) => { fileName.value = result.file_name; });
    }
    else {
      chrome.storage.local.set({ "dataExists": "true" });

      chrome.storage.local.set({ "add_button": addButton.checked.toString() });
      chrome.storage.local.set({ "instant_download": instantDownload.checked.toString() });
      chrome.storage.local.set({ "file_name": fileName.value });
    }
  });
}

function changeValue(key, value) {
  chrome.storage.local.set({ [key]: value });
}

// Add events to all inputs
function setInputEvents() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("click", () => { changeValue(checkboxes[i].id, checkboxes[i].checked.toString()); });
  }
  let select = document.querySelector("select");
  select.addEventListener("change", () => { changeValue(select.id, select.value); });
}

// -- Start-up --

setInputEvents();
loadOptions();

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  let activeTab = tabs[0];

  // Check if the content script is loaded by sending a message
  // Only then create a download button in the popup window
  chrome.tabs.sendMessage(activeTab.id, { message: "Init" })
    .then(response => {
      createDownloadButton(response.link, response.videoName);
    })
    .catch(error => { })
});

