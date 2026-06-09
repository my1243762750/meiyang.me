---
title: "Universal Video Downloader - Edge 浏览器插件"
description: "已上架 Edge 插件市场的短视频下载工具，支持抖音、快手等平台一键下载视频。使用 Manifest V3，通过 WebRequest 拦截视频资源，实时进度显示。"
tags: [JavaScript, Browser Extension, Edge, Chrome, Manifest V3]
date: "2026-06-08"
featured: true
slug: "browser-extensions"
---

## 简介

一款已上架 Microsoft Edge 插件市场的浏览器扩展，支持在抖音、快手等短视频平台**一键下载视频**。安装即用，无需配置。

**Edge 商店地址**：https://microsoftedge.microsoft.com/addons/detail/video-downloader-for-douy/fmdifihaibaocjjhejinfkiihfaemmhd

## 技术实现

### Manifest V3 架构

采用最新的 Manifest V3 规范，包含三个核心模块：

| 模块 | 文件 | 职责 |
|------|------|------|
| **Service Worker** | `background.js` | 后台常驻，拦截网络请求 |
| **Content Script** | `content-scripts/content.js` | 注入页面 UI，视频资源管理 |
| **Popup** | `popup/` | 工具栏图标弹窗，一键下载 |

### 视频资源嗅探

核心逻辑在 background Service Worker 中，通过 `chrome.webRequest` API 监听所有网络完成事件，实时检测 MP4 视频文件：

```javascript
chrome.webRequest.onCompleted.addListener(
  function(details) {
    if (details.url.includes('mp4')) {
      // 发现视频资源，通知 content script
      chrome.tabs.sendMessage(details.tabId, {
        type: 'NEW_VIDEO_RESOURCE',
        url: details.url
      })
    }
  },
  { urls: ["<all_urls>"] }
)
```

### 下载队列与进度 UI

Content script 注入了一个完整的下载管理界面，支持多任务并行：

- **环形进度条**：每个下载任务显示实时进度动画
- **任务队列**：右下角浮动面板，管理多个下载
- **状态提示**：下载成功/失败/进行中，一目了然
- **自动清理**：下载完成后自动移除已完成任务

### 多平台支持

| 平台 | 支持状态 | 说明 |
|------|---------|------|
| 抖音 (Douyin) | ✅ | 视频页面自动检测 |
| 快手 (Kuaishou) | ✅ | 视频页面自动检测 |
| 其他平台 | ✅ | 自动嗅探页面中所有 MP4 资源 |

## 发布到 Edge 商店

该插件已通过 Microsoft Edge 加载项商店的审核并上架。上架流程：

1. 注册 Microsoft Partner Center 开发者账号（一次性费用）
2. 准备插件包和素材（图标、截图、描述）
3. 提交审核（通常 1-3 个工作日）
4. 审核通过后自动上架

## 技术亮点

- **WebRequest 实时嗅探**：利用浏览器底层 API 精准捕获视频资源
- **自定义环形进度条**：纯 CSS 实现，无第三方依赖
- **Manifest V3 合规**：符合 Chrome/Edge 最新扩展规范
- **轻量级**：插件大小仅几十 KB，不影响浏览体验

## 源码结构

```
douyinHelper/
├── manifest.json                  # 插件配置（Manifest V3）
├── background.js                  # Service Worker
├── content-scripts/
│   └── content.js                 # 页面注入脚本（~500行）
├── popup/
│   ├── popup.html                 # 弹窗 UI
│   └── popup.js                   # 弹窗逻辑
└── icons/                         # 插件图标
```
