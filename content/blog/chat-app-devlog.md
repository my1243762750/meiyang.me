---
title: "我的 React Chat 项目：从开发到部署上线"
description: "分享一个实时聊天应用从开发到上线的全过程，包括技术选型、WebSocket 通信、文件断点续传、OCR 集成，以及用 Docker + Nginx 部署到服务器的实践经验。"
tags: [React, WebSocket, Docker, Deployment, Project]
date: "2026-06-08"
---

## 项目背景

这是一个我自己从零开发的实时聊天应用。初衷很简单：想做一个能真正用的聊天工具，而不是 demo。于是有了它——支持文字聊天、文件传输、断点续传，甚至 OCR 图片文字识别。

**在线地址**：http://123.57.239.197:8100/chat

## 技术选型

前端选了 React + TypeScript + Vite，后端用 Node.js + Express + WebSocket（ws 库）。为什么这样选？

- **React**：生态成熟，组件化开发适合聊天这种交互密集的场景
- **TypeScript**：类型安全，减少运行时错误
- **Vite**：开发体验好，热更新快
- **WebSocket**：实时通信的核心，比轮询高效得多
- **Express**：轻量，配合 WebSocket 正好

## WebSocket 实时通信

聊天应用的核心是实时消息推送。这里用 WebSocket 实现：

```typescript
// 客户端连接
const ws = new WebSocket(`ws://host:8101`)

ws.onmessage = (event) => {
  const message = JSON.parse(event.data)
  // 处理收到的消息
}

// 发送消息
ws.send(JSON.stringify({
  type: 'message',
  content: '你好',
  userId: '123',
  timestamp: Date.now()
}))
```

WebSocket 和 HTTP 服务跑在不同的端口上（8100 和 8101），分开部署，互不干扰。

## 文件传输：分片 + 断点续传 + 秒传

文件传输是这次开发中最复杂的功能，做了三层优化：

### 1. 智能分片

根据文件大小动态调整分片大小：

```typescript
function getChunkSize(fileSize: number): number {
  if (fileSize < 10 * 1024 * 1024) return 512 * 1024       // < 10MB → 512KB
  if (fileSize < 500 * 1024 * 1024) return 2 * 1024 * 1024 // 10MB~500MB → 2MB
  return 5 * 1024 * 1024                                    // ≥ 500MB → 5MB
}
```

### 2. Web Worker 计算哈希

大文件计算 MD5 会阻塞主线程，用 Web Worker 放到后台线程：

```typescript
// hashWorker.ts
self.onmessage = (e) => {
  const file = e.data
  const hash = calculateMD5(file)  // 增量计算
  self.postMessage(hash)
}
```

### 3. 秒传机制

上传前先发送文件哈希到服务端校验，如果文件已存在，直接返回成功：

```
POST /upload/check { fileHash } → { exists: true, filePath }
```

## OCR 图片文字识别

图片消息多了个"识别图片文字"按钮，点一下就能提取图片中的文字。

支持中英文混合识别，可以一次识别多张图片，结果一键复制。这对办公场景特别有用——比如截图聊天记录、扫描文档。

## 部署上线

部署用了 Docker + Nginx：

```dockerfile
# Dockerfile
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN pnpm install && pnpm build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/
EXPOSE 8100
CMD ["nginx", "-g", "daemon off;"]
```

Nginx 配置做了动静分离：
- 静态资源直接由 Nginx 托管
- API 请求反向代理到 Node 后端
- WebSocket 单独端口直连

## 项目结构

```
react-chat/
├── src/                      # 前端
│   ├── components/Chat       # 聊天组件
│   ├── components/UI         # 通用 UI（自定义组件库）
│   ├── contexts              # 全局状态 & WebSocket
│   ├── hooks                 # 文件上传 / OCR / WS 等 Hook
│   ├── pages                 # 页面（Login/Chat）
│   ├── utils                 # 工具函数
│   └── workers               # Web Worker（哈希计算）
├── server/                   # 后端
│   ├── index.js              # 入口
│   ├── config/               # 配置
│   └── scripts/              # 构建脚本
├── k8s/                      # Kubernetes 配置
├── Dockerfile
└── nginx/                    # Nginx 配置
```

## 总结

这个项目让我实践了从前端到后端再到部署的全流程。最深的体会是：**一个能上线的东西，比十个 demo 都有说服力**。

后续计划加更多功能：语音消息、群聊、消息搜索。有线上地址的好处是，每次改完 push 上去，马上就能看到效果。
