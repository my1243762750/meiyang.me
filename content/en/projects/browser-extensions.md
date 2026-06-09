---
title: "Universal Video Downloader - Edge Browser Extension"
description: "A short video download tool published on the Edge Add-ons store, supporting one-click video downloads from Douyin, Kuaishou, and other platforms. Uses Manifest V3, intercepts video resources via WebRequest with real-time progress display."
tags: [JavaScript, Browser Extension, Edge, Chrome, Manifest V3]
date: "2026-06-08"
featured: true
slug: "browser-extensions"
---

## Overview

A browser extension published on the Microsoft Edge Add-ons store, supporting **one-click video downloads** on short video platforms like Douyin and Kuaishou. Install and use — no configuration needed.

**Edge Store URL**: https://microsoftedge.microsoft.com/addons/detail/video-downloader-for-douy/fmdifihaibaocjjhejinfkiihfaemmhd

## Technical Implementation

### Manifest V3 Architecture

Built with the latest Manifest V3 specification, consisting of three core modules:

| Module | File | Responsibility |
|------|------|------|
| **Service Worker** | `background.js` | Persistent background, intercepts network requests |
| **Content Script** | `content-scripts/content.js` | Injects page UI, manages video resources |
| **Popup** | `popup/` | Toolbar icon popup, one-click download |

### Video Resource Sniffing

The core logic runs in the background Service Worker, using the `chrome.webRequest` API to listen for all completed network events and detect MP4 video files in real time:

```javascript
chrome.webRequest.onCompleted.addListener(
  function(details) {
    if (details.url.includes('mp4')) {
      // Video resource found, notify content script
      chrome.tabs.sendMessage(details.tabId, {
        type: 'NEW_VIDEO_RESOURCE',
        url: details.url
      })
    }
  },
  { urls: ["<all_urls>"] }
)
```

### Download Queue & Progress UI

The Content Script injects a complete download management interface with support for parallel multi-task downloads:

- **Circular progress bar**: Real-time progress animation for each download task
- **Task queue**: Floating panel at bottom-right, manages multiple downloads
- **Status indicators**: Success/failure/in-progress at a glance
- **Auto cleanup**: Automatically removes completed tasks after download finishes

### Multi-Platform Support

| Platform | Status | Notes |
|------|---------|------|
| Douyin | ✅ | Auto-detection on video pages |
| Kuaishou | ✅ | Auto-detection on video pages |
| Other platforms | ✅ | Auto-sniffs all MP4 resources on the page |

## Publishing to Edge Store

The extension has been reviewed and published on the Microsoft Edge Add-ons store. Publishing process:

1. Register a Microsoft Partner Center developer account (one-time fee)
2. Prepare the extension package and assets (icons, screenshots, description)
3. Submit for review (typically 1-3 business days)
4. Auto-published upon approval

## Technical Highlights

- **WebRequest real-time sniffing**: Leverages the browser's low-level API to accurately capture video resources
- **Custom circular progress bar**: Pure CSS implementation, no third-party dependencies
- **Manifest V3 compliant**: Meets the latest Chrome/Edge extension specifications
- **Lightweight**: Extension size is only tens of KB, does not affect browsing experience

## Source Structure

```
douyinHelper/
├── manifest.json                  # Extension config (Manifest V3)
├── background.js                  # Service Worker
├── content-scripts/
│   └── content.js                 # Page injection script (~500 lines)
├── popup/
│   ├── popup.html                 # Popup UI
│   └── popup.js                   # Popup logic
└── icons/                         # Extension icons
```
