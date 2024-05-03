var add_button = true;
var instant_download = true;

function getLink() {
  return document.querySelector(".pb-video-player").getAttribute("src");
}

function addButton() {
  var button = document.createElement("div");
  button.classList.add("bttn", "bttn-light", "bttn-light-block");
  button.style.marginBottom = "4px";
  button.style.backgroundColor = "#d68526";
  button.innerHTML = "Download";

  button.onclick = function () { download(); };

  let boxButtons = document.querySelector(".box-buttons");
  boxButtons.insertBefore(button, boxButtons.childNodes[4])
}

function download() {
  let temp = document.createElement("a");
  temp.href = getLink();
  temp.target = "_blank";
  temp.download = "";
  temp.click();
  delete temp;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "Init") {
    sendResponse({ message: getLink() });
  }
  else if (request.message === "Download") {
    download();
  }
});

if (add_button)
  addButton();
