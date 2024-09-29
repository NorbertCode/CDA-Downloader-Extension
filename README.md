# CDA Downlader
This is an extension for Chrome, which simplifies downloading videos from cda.pl

Just press the "Download" button it adds to the page or in the extension window and you're good to go!

Works on Google Chrome and Microsoft Edge, so it should work on most Chromium-based browsers.

# Installation
1. Download the zipped .crx file from <a href="https://github.com/NorbertCode/CDA-Downloader-Extension/releases">Releases</a>
2. Extract it, so you have just a .crx file
3. Go to Settings -> Extensions
4. Enable Developer Mode
5. Drag and drop the .crx file onto your browser window

If you want an easily modifiable version you can also download the source code and unzip it. Then go to your browser's extension settings, select "Load unpacked" and choose the newly extracted folder.

# Usage
<img align="right" src="https://github.com/NorbertCode/CDA-Downloader-Extension/assets/54719382/ca2bd423-6c1c-42e3-88b2-7a86573122cf">
<img align="right" src="https://github.com/NorbertCode/CDA-Downloader-Extension/assets/54719382/3a4f120c-55ed-4bb6-a3e9-9cd9e9b93934">
This extension adds an extra "Download" button next to share and watch later buttons. When you press it the download will automatically start.
<br><br>

The same is also possible by opening the extension's popup window and selecting "Download".

This extension also allows some basic configuration of the way you download videos:
- <b>Add button to site</b> - Pretty self-explanatory. Toggling this off causes no button to appear beneath videos on cda.pl.
- <b>Instant download</b> - Toggling this off makes it so the download doesn't start instantly, but a new tab is opened with the video. Then you can right-click it and select "Save".
- <b>Filename</b> - Controls the name of the downloaded file. Only used when Instant download is on.
  - "Default" makes it the same as it's called on cda.pl servers, which is just random characters.
  - "Video name" uses the video's title as the file name.
  - "Custom" opens a dialog window (the same one you get when you "Save as" in other software), which allows you to type the name yourself.
