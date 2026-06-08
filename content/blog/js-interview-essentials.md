---
title: "JavaScript Interview Essentials"
description: "A curated collection of must-know JavaScript concepts for frontend interviews, including closures, promises, event loop, and common hand-writing exercises."
tags: [JavaScript, Interview, Promise, Event Loop]
date: "2026-05-28"
---

## Core Concepts

### Closures

A closure is a function that retains access to its outer scope even after the outer function has returned.

```js
function createCounter() {
  let count = 0
  return function () {
    count++
    return count
  }
}
const counter = createCounter()
counter() // 1
counter() // 2
```

**Use cases**: data privacy, partial application, event handlers, debounce/throttle.

### Event Loop

```
┌─────────────────────────┐
│      宏任务 Macrotask       │
│  script, setTimeout, I/O   │
└──────────┬──────────────┘
           ▼
┌─────────────────────────┐
│      微任务 Microtask       │
│  Promise.then, queueMicrotask │
└──────────┬──────────────┘
           ▼
         Render
```

**Key insight**: All microtasks are processed before the next macrotask, and rendering happens between macrotask cycles.

### Promise Implementation

A simplified Promise (A+ compliant):

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.handlers = []

    const resolve = (value) => {
      if (this.state !== 'pending') return
      this.state = 'fulfilled'
      this.value = value
      this.handlers.forEach(h => h.onFulfilled(value))
    }

    const reject = (reason) => {
      if (this.state !== 'pending') return
      this.state = 'rejected'
      this.value = reason
      this.handlers.forEach(h => h.onRejected(reason))
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      // handle chaining...
    })
  }
}
```

## Must-Know Hand-Writing Exercises

From my notes, I've practiced:

| Topic | Implementation |
|-------|---------------|
| Debounce & Throttle | ✅ Complete |
| Promise A+ | ✅ Complete |
| Deep Clone | ✅ Complete |
| Array Flatten | ✅ Complete |
| Currying | ✅ Complete |
| instanceof | ✅ Complete |
| New operator | ✅ Complete |
| Request retry | ✅ Complete |
| Object.is | ✅ Complete |
| ForEach | ✅ Complete |
