# <img src="../../raw/master/src/assets/img/icon-48.png" height="32" /> Nazurin Browser Extension

English | [中文](README_zh-CN.md) 

The browser extension for [Nazurin](https://github.com/y-young/nazurin) that enhances your experience on desktop. It works by sending the URL to the server API and allows you to collect images from the browser via extension popup or right-click menu.

![screencast.gif](../../raw/master/images/screencast.gif)

## Browser Compatibility

Currently supports Google Chrome and Microsoft Edge (Chromium-based), Firefox support is on the way.

## Prerequisites

You need version 2 of [Nazurin](https://github.com/y-young/nazurin) with an openly-accessible API endpoint. For example, if your bot is hosted on Heroku, the _API Host_ should look like `https://xxx.herokuapp.com`, you may refer to `WEBHOOK_URL` in `.env`. You also need to have `BOT_TOKEN` at hand.

## Usage

1.  Download the extension ZIP file (**not the source code**) from [releases page](../../releases/latest)
2.  Unzip the extension to the desired location
3.  Open extension management page in the browser, e.g: `chrome://extensions`
4.  Enable "Developer mode"
5.  Click "Load unpacked extension" and choose the folder where the extension is extracted in Step 2
6.  Once installed, the settings page should pop up automatically, or you may open it manually by clicking the extension icon on the browser toolbar
7.  Fill in the required fields and click "Save"
8.  Now you can start collecting with the extension. Open a [supported website](https://github.com/y-young/nazurin#supported-sites), then click the send button from extension popup or right-click menu
9.  The extension will send the URL to the server, then the bot will send a message to you in Telegram once the image collected

> **Note:**
>
> The status from the extension only indicates whether the URL is successfully sent or not, please check Telegram chat to see if the images is successfully collected.
>
> In case an error occurs, the error message will be shown in the extension popup or the message from your bot.
>
> For any question or bug report, open a discussion or an issue.
