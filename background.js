// This script is only used to trigger a download
// Both siteHandler.js and popup.js send a message here
// This is the only way to instantly start a download from the content script, because cda.pl holds .mp4s on a different origin.

function download(link, videoName) {
  chrome.storage.local.get(["instant_download", "file_name"]).then((result) => {
    let args = {
      url: link,
      saveAs: result.file_name == "custom"
    }

    // Only add the filename argument if file_name is set top video name in the config
    if (result.file_name == "video_name") {
      let name = videoName + ".mp4";

      // Remove unsupported characters from the name, otherwise doesn't start download
      let unsupported_chars = ["/", "\\", ":", "*", "?", "\"", "<", ">", "|"];
      for (let i = 0; i < unsupported_chars.length; i++) {
        name = name.replace(unsupported_chars[i], "");
      }

      args.filename = name;
    }

    if (result.instant_download == "true") {
      chrome.downloads.download(args);
    }
    else
      chrome.tabs.create({ url: link });
  });
}

chrome.runtime.onMessage.addListener(function(request) {
  if (request.message === "Download") {
    download(request.link, request.videoName);
  }
});
