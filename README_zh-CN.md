# <img src="../../raw/master/src/assets/img/icon-48.png" height="32" /> Nazurin 浏览器扩展

[English](README.md) | 中文

[Nazurin](https://github.com/y-young/nazurin) 的浏览器扩展，用于提升桌面端的用户体验。当您在工具栏弹出面板或右键菜单点击发送按钮时，扩展程序会将当前网页的 URL 发送到服务器的 API 接口进行处理。

![screencast.gif](../../raw/master/images/screencast.gif)

## 浏览器兼容性

目前只支持 Google Chrome 和 Microsoft Edge（Chromium 内核），Firefox 的支持正在开发中。

## 前提条件

您需要配合 [Nazurin](https://github.com/y-young/nazurin) 的 v2 版本使用，且 API 接口需能公开访问。 如果 Bot 部署在 Heroku 上，则 _API Host_ 将类似于 `https://xxx.herokuapp.com`，您可以参考 `.env` 中的`WEBHOOK_URL`。同时您还需要准备 `BOT_TOKEN`。

## 使用方法

1.  从 [Releases 页面](../../releases/latest) 下载扩展程序的 ZIP 文件（**不是源代码**）
2.  将扩展程序解压到您想要的位置
3.  在浏览器中打开扩展程序管理页面，例如 `chrome://extensions`
4.  启用“开发者模式”
5.  点击“加载已解压的扩展程序”，然后选择第 2 步中的文件夹
6.  安装后扩展程序的设置页面将会自动弹出，也可从浏览器工具栏手动打开
7.  填写必要的配置信息，然后点击“保存”
8.  现在即可开始使用，打开一个 [支持的网站](https://github.com/y-young/nazurin#supported-sites)，然后在扩展程序弹出面板或右键菜单点击发送按钮
9.  扩展程序会将 URL 发送到服务器，当请求处理完毕后 Bot 会通过 Telegram 发送通知

> **注意：**
>
> 扩展程序中显示的状态只表示 URL 是否已成功发送到服务器，请在 Telegram 聊天中确认此后的处理结果。
>
> 如果处理过程中发送了错误，错误信息将会显示在扩展程序的弹出面板和 Bot 发送的 Telegram 消息中。
>
> 如有任何疑问或 Bug 反馈，请在讨论或 Issue 中提出。
