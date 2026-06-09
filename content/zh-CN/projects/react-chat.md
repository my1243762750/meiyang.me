---
title: "React Chat - 实时聊天应用"
description: "一个前后端一体的实时聊天应用，支持文本消息、文件传输、断点续传、图片文字识别（OCR），已部署上线可访问。"
tags: [React, TypeScript, WebSocket, Node.js, Docker, K8s]
date: "2026-06-08"
featured: true
slug: "react-chat"
---

## 简介

一个功能完整的实时聊天应用，前端使用 React + TypeScript + Vite，后端使用 Node.js + Express + WebSocket，支持文件分片上传、断点续传、秒传和 OCR 图片文字识别。

**在线体验**：http://123.57.239.197:8100/chat

## 技术栈

| 层 | 技术 |
|------|------|
| 前端 | React 19, TypeScript, Vite, Tailwind CSS |
| 后端 | Node.js, Express, WebSocket (ws) |
| 部署 | Docker, Nginx, Kubernetes |
| 存储 | 文件系统存储 |
| 工具 | pnpm, Web Worker, Lucide Icons |

## 功能特性

### 消息聊天
- 实时文本消息（WebSocket）
- 在线状态提示
- 消息历史记录

### 文件传输
- **文件分片上传**：根据文件大小智能分片（512KB / 2MB / 5MB）
- **断点续传**：中断后从断点继续，不用重传
- **秒传**：文件哈希校验，相同文件瞬间完成
- **进度条**：实时显示上传进度

### OCR 图片文字识别
- 支持 JPEG/PNG/BMP/GIF/WebP 格式
- 中英文混合识别
- 自动方向检测
- 批量识别（最多 5 张）
- 一键复制识别结果

### 技术亮点
- **Web Worker 计算哈希**：大文件哈希计算不阻塞主线程
- **WebSocket 实时推送**：消息和文件状态实时推送
- **Docker + K8s 部署**：容器化部署，方便扩缩容

## 快速启动

```bash
pnpm install
pnpm start
# 前端 http://localhost:3000
# 后端 http://localhost:8100
```
