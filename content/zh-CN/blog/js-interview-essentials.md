---
title: "JavaScript 面试要点"
description: "精选的前端面试必知 JavaScript 概念合集，涵盖闭包、Promise、事件循环以及常见手写题练习。"
tags: [JavaScript, Interview, Promise, Event Loop]
date: "2026-05-28"
---

## 核心概念

### 闭包

闭包是一个函数，即使在其外部函数返回后，它仍然能够保留对外部作用域的访问权限。

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

**应用场景**：数据隐私、偏函数应用、事件处理、防抖/节流。

### 事件循环

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

**关键要点**：所有微任务会在下一个宏任务之前处理完毕，而渲染发生在宏任务周期之间。

### Promise 实现

一个简化的 Promise（A+ 规范兼容）：

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
      // 处理链式调用...
    })
  }
}
```

## 必知手写题

根据我的笔记，我练习了以下内容：

| 主题 | 实现 |
|------|------|
| 防抖与节流 | ✅ 已完成 |
| Promise A+ | ✅ 已完成 |
| 深拷贝 | ✅ 已完成 |
| 数组扁平化 | ✅ 已完成 |
| 柯里化 | ✅ 已完成 |
| instanceof | ✅ 已完成 |
| New 操作符 | ✅ 已完成 |
| 请求重试 | ✅ 已完成 |
| Object.is | ✅ 已完成 |
| ForEach | ✅ 已完成 |
