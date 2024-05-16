// This script is only used to trigger a download
// Both siteHandler.js and popup.js send a message here
// This is the only way to instantly start a download from the content script, because cda.pl holds .mp4s on a different origin.

function download(link) {
  chrome.storage.local.get(["instant_download", "file_name"]).then((result) => {
    let saveAs = result.file_name == "custom";
    if (result.instant_download == "true") {
      chrome.downloads.download({
        url: link,
        saveAs: saveAs
      });
    }
    else
      chrome.tabs.create({ url: link });
  });
}

chrome.runtime.onMessage.addListener(function(request) {
  if (request.message === "Download") {
    download(request.link);
  }
});
