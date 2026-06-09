---
title: "Understanding HTTP, TLS, and Browser Networking"
description: "A comprehensive breakdown of what happens when you type a URL in the browser — covering TCP, TLS, HTTP caching, and modern protocols."
tags: [HTTP, Network, Browser, TLS, TCP]
date: "2026-05-20"
---

## From URL to Page

When you type `https://example.com` and press Enter:

### 1. DNS Resolution

```
Browser → OS DNS Cache → Router Cache → ISP DNS → Recursive → Root → TLD → Authoritative
```

### 2. TCP Three-Way Handshake

```
Client (SYN, seq=x) ────────────→ Server
Client ←────── (SYN, seq=y, ACK, ack=x+1) Server
Client (ACK, seq=x+1, ack=y+1) ─→ Server
```

### 3. TLS Handshake (HTTPS)

1. Client Hello (TLS version, cipher suites, random bytes)
2. Server Hello + Certificate (contains public key)
3. Client verifies certificate, generates pre-master secret
4. Both derive session keys
5. Secure connection established

### 4. HTTP Request/Response

```
GET / HTTP/1.1
Host: example.com
Accept: text/html
Connection: keep-alive
```

## HTTP Caching Strategy

```
┌─────────────┐
│   Request   │
└──────┬──────┘
       ▼
  ┌───────────┐  strong   ┌───────────┐
  │ Cache    │────fresh──→│ Use Cache │
  │ (max-age)│            └───────────┘
  └─────┬─────┘
        │ expired
        ▼
  ┌───────────┐ 304       ┌───────────┐
  │ Server    │──────────→│ Use Cache │
  │ (ETag /   │           └───────────┘
  │ Last-Mod) │ 200
  └───────────┘─────→ Update cache
```

**Cache-Control headers**:
- `max-age=31536000` — cache for a year
- `no-cache` — check with server every time
- `no-store` — never cache
- `public` / `private` — who can cache

## Modern Protocols

### HTTP/2
- Multiplexing (multiple streams over one TCP connection)
- Header compression (HPACK)
- Server push
- Binary framing layer

### HTTP/3
- Uses QUIC (over UDP instead of TCP)
- Eliminates head-of-line blocking
- Faster connection establishment (0-RTT)

## Status Codes Cheatsheet

| Code | Meaning |
|------|---------|
| 200 | OK |
| 301 | Moved permanently |
| 304 | Not modified (cache) |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 500 | Internal server error |
| 502 | Bad gateway |
| 503 | Service unavailable |
