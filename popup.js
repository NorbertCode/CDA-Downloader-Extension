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

// -- On popup loaded --

function loadOptions() {
  let addButton = document.querySelector("#add_button");
  let instantDownload = document.querySelector("#instant_download");

  chrome.storage.local.get(["dataExists"]).then((result) => {
    if (result.dataExists == "true") {
      chrome.storage.local.get(["add_button"]).then((result) => { addButton.checked = (result.add_button == "true"); });
      chrome.storage.local.get(["instant_download"]).then((result) => { instantDownload.checked = (result.instant_download == "true"); });
    }
    else {
      chrome.storage.local.set({ "dataExists": "true" });

      chrome.storage.local.set({ "add_button": addButton.checked.toString() });
      chrome.storage.local.set({ "instant_download": instantDownload.checked.toString() });
    }
  });
}

function changeValue(element) {
  id = element.id;
  checked = element.checked.toString();
  chrome.storage.local.set({ [id]: checked }).then(() => { chrome.storage.local.get(id).then((result) => { console.log(id, result); }); });
}

function setInputEvents() {
  let elements = document.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", () => { changeValue(elements[i]); });
  }
}

setInputEvents();
loadOptions();

chrome.storage.local.get("dataExists").then((result) => { console.log(result); });
chrome.storage.local.get("add_button").then((result) => { console.log(result); });

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

