---
title: "React Chat - Real-Time Chat Application"
description: "A full-stack real-time chat application supporting text messages, file transfer, resumeable uploads, and OCR. Deployed and accessible online."
tags: [React, TypeScript, WebSocket, Node.js, Docker, K8s]
date: "2026-06-08"
featured: true
slug: "react-chat"
---

## Overview

A fully-featured real-time chat application. The frontend uses React + TypeScript + Vite, the backend uses Node.js + Express + WebSocket. Supports chunked file upload, resumeable uploads, instant upload (by hash), and OCR image text recognition.

**Live Demo**: http://123.57.239.197:8100/chat

## Tech Stack

| Layer | Technology |
|------|------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, Express, WebSocket (ws) |
| Deployment | Docker, Nginx, Kubernetes |
| Storage | File system storage |
| Tools | pnpm, Web Worker, Lucide Icons |

## Features

### Messaging
- Real-time text messages (WebSocket)
- Online status indicator
- Message history

### File Transfer
- **Chunked upload**: Intelligent file chunking based on file size (512KB / 2MB / 5MB)
- **Resumeable upload**: Resume from breakpoint after interruption, no need to retransmit
- **Instant upload**: File hash verification, same files complete instantly
- **Progress bar**: Real-time upload progress display

### OCR Image Text Recognition
- Supports JPEG/PNG/BMP/GIF/WebP formats
- Mixed Chinese and English recognition
- Automatic orientation detection
- Batch recognition (up to 5 images)
- One-click copy of recognition results

### Technical Highlights
- **Web Worker for hash computation**: Large file hash computation does not block the main thread
- **WebSocket real-time push**: Messages and file status pushed in real time
- **Docker + K8s deployment**: Containerized deployment for easy scaling

## Quick Start

```bash
pnpm install
pnpm start
# Frontend http://localhost:3000
# Backend http://localhost:8100
```
