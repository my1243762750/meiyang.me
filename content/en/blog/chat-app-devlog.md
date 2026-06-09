---
title: "My React Chat Project: From Development to Deployment"
description: "A comprehensive look at building a real-time chat application from scratch to production, covering tech stack selection, WebSocket communication, file resumable upload, OCR integration, and practical deployment experience with Docker + Nginx."
tags: [React, WebSocket, Docker, Deployment, Project]
date: "2026-06-08"
---

## Project Background

This is a real-time chat application I built from scratch. The idea was simple: I wanted to build a chat tool that people could actually use, not just a demo. So here it is — supporting text chat, file transfer, resumable upload, and even OCR for extracting text from images.

**Live Demo**: http://123.57.239.197:8100/chat

## Tech Stack

Frontend uses React + TypeScript + Vite, backend uses Node.js + Express + WebSocket (ws library). Why this stack?

- **React**: Mature ecosystem, component-based development suits chat's interaction-heavy scenarios
- **TypeScript**: Type safety, reduces runtime errors
- **Vite**: Great development experience, fast hot reload
- **WebSocket**: Core of real-time communication, much more efficient than polling
- **Express**: Lightweight, pairs well with WebSocket

## WebSocket Real-Time Communication

The core of a chat app is real-time message push. Here I used WebSocket:

```typescript
// Client connection
const ws = new WebSocket(`ws://host:8101`)

ws.onmessage = (event) => {
  const message = JSON.parse(event.data)
  // Handle received message
}

// Send message
ws.send(JSON.stringify({
  type: 'message',
  content: 'Hello',
  userId: '123',
  timestamp: Date.now()
}))
```

WebSocket and HTTP services run on different ports (8100 and 8101), deployed separately without interfering with each other.

## File Transfer: Chunking + Resumable Upload + Instant Upload

File transfer was the most complex feature in this project, with three layers of optimization:

### 1. Smart Chunking

Dynamically adjust chunk size based on file size:

```typescript
function getChunkSize(fileSize: number): number {
  if (fileSize < 10 * 1024 * 1024) return 512 * 1024       // < 10MB → 512KB
  if (fileSize < 500 * 1024 * 1024) return 2 * 1024 * 1024 // 10MB~500MB → 2MB
  return 5 * 1024 * 1024                                    // ≥ 500MB → 5MB
}
```

### 2. Web Worker for Hash Computation

Computing MD5 for large files blocks the main thread, so I used Web Worker to run it in the background:

```typescript
// hashWorker.ts
self.onmessage = (e) => {
  const file = e.data
  const hash = calculateMD5(file)  // Incremental computation
  self.postMessage(hash)
}
```

### 3. Instant Upload (Skip-Upload)

Before uploading, the file hash is sent to the server for verification. If the file already exists, it returns success immediately:

```
POST /upload/check { fileHash } → { exists: true, filePath }
```

## OCR Image Text Recognition

Image messages now have an "Extract Text" button — click it to extract text from the image.

Supports mixed Chinese and English recognition, can process multiple images at once, and results can be copied with one click. This is especially useful for office scenarios — like screenshotting chat records or scanning documents.

## Production Deployment

Deployed using Docker + Nginx:

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

Nginx configuration separates static and dynamic content:
- Static assets served directly by Nginx
- API requests reverse-proxied to the Node backend
- WebSocket connects directly via a separate port

## Project Structure

```
react-chat/
├── src/                      # Frontend
│   ├── components/Chat       # Chat components
│   ├── components/UI         # Common UI (custom component library)
│   ├── contexts              # Global state & WebSocket
│   ├── hooks                 # File upload / OCR / WS hooks
│   ├── pages                 # Pages (Login/Chat)
│   ├── utils                 # Utility functions
│   └── workers               # Web Workers (hash computation)
├── server/                   # Backend
│   ├── index.js              # Entry point
│   ├── config/               # Configuration
│   └── scripts/              # Build scripts
├── k8s/                      # Kubernetes configuration
├── Dockerfile
└── nginx/                    # Nginx configuration
```

## Summary

This project let me practice the entire workflow from frontend to backend to deployment. The biggest takeaway: **A deployed product speaks louder than ten demos**.

Future plans include more features: voice messages, group chat, message search. Having a live URL is great — every time I push changes, I can see the results immediately.
