var add_button = true;
var instant_download = true;

function getLink() {
  return document.querySelector(".pb-video-player").getAttribute("src");
}

function addButton() {
  chrome.storage.local.get(["add_button"]).then((result) => {
    if (result.add_button != "true")
      return;

    let button = document.createElement("div");
    button.classList.add("bttn", "bttn-light", "bttn-light-block");
    button.style.marginBottom = "4px";
    button.style.backgroundColor = "#d68526";
    button.innerHTML = "Download";

    button.onclick = function() {
      // Using a background script is the only way to instantly start a download,
      // since cda.pl's .mp4s are held on a different origin
      let videoName = document.querySelector(".title-name").childNodes[0].childNodes[0].innerText;
      chrome.runtime.sendMessage({ message: "Download", link: getLink(), videoName: videoName });
    };

    // Add it near the watch later, share, etc. buttons
    let boxButtons = document.querySelector(".box-buttons");
    boxButtons.insertBefore(button, boxButtons.childNodes[4])
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "Init") {
    let videoName = document.querySelector(".title-name").childNodes[0].childNodes[0].innerText;
    sendResponse({ link: getLink(), videoName: videoName });
  }
});

addButton();
