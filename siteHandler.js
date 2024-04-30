var link = "";

function refreshLink() {
  link = document.querySelector(".pb-video-player").getAttribute("src");
}

function addButton() {
  let newButton = document.createElement("div");
  newButton.classList.add("bttn", "bttn-light", "bttn-light-block");
  newButton.style.marginBottom = "4px";
  newButton.style.backgroundColor = "#d68526";
  newButton.innerHTML = "Download";

  let boxButtons = document.querySelector(".box-buttons");
  boxButtons.insertBefore(newButton, boxButtons.childNodes[4])
}

refreshLink();
console.log(link);
addButton();
