var link = "";
var add_button = true;
var instant_download = true;

function refreshLink() {
  link = document.querySelector(".pb-video-player").getAttribute("src");
}

function addButton() {
  let newButton = document.createElement("div");
  newButton.classList.add("bttn", "bttn-light", "bttn-light-block");
  newButton.style.marginBottom = "4px";
  newButton.style.backgroundColor = "#d68526";
  linkTag = "<a style=\"color: #24282a;\" href=\"" + link + "\" target=\"_blank\" ";
  if (instant_download) // this currently does not work, because of same-origin policy
    linkTag += "download";
  linkTag += ">Download</a>";
  newButton.innerHTML = linkTag;

  let boxButtons = document.querySelector(".box-buttons");
  boxButtons.insertBefore(newButton, boxButtons.childNodes[4])
}

refreshLink();
if (add_button)
  addButton();
