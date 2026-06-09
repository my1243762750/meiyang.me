---
title: "深入理解 Vue 响应式系统"
description: "深入理解 Vue 响应式系统的底层工作原理——从 Object.defineProperty 到 Proxy，附带 Vue 2 和 Vue 3 响应式的手写实现。"
tags: [Vue, Reactivity, Proxy, JavaScript]
date: "2026-06-05"
---

## 核心思想

Vue 的响应式系统是其框架的神奇之处——当数据发生变化时，DOM 会自动更新。但它究竟是如何工作的呢？

## Vue 2：Object.defineProperty

```js
function defineReactive(obj, key, val) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal
        dep.notify()
      }
    }
  })
}
```

**Vue 2 方式的局限性：**
- 无法检测属性的添加/删除（需要使用 `Vue.set` / `Vue.delete`）
- 无法检测数组下标的变更
- 初始化时必须递归遍历整个对象

## Vue 3：Proxy

```js
const reactive = (target) => {
  return new Proxy(target, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)
      track(target, key)
      return value
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return result
    }
  })
}
```

**Vue 3 的改进：**
- 天然支持属性的添加/删除检测
- 支持所有数据类型（Map、Set 等）
- 懒观察——仅在访问时进行代理
- 更少的遍历，性能更优

## 完整链路

```
数据 → reactive() → Proxy → track() → Dep → Watcher → update() → DOM
```

每个组件实例都有一个对应的 **Watcher**。在渲染过程中，watcher 会收集所有依赖（它读取的响应式属性）。当这些属性发生变化时，watcher 被通知，组件重新渲染。

## 手写实现

在我的知识库中，我有完整的手写实现：

- Vue 2 响应式系统（Observer + Dep + Watcher）
- Vuex 状态管理（从零开始）
- Vue Router（基于哈希的路由）

这些实现帮助我真正理解了 Vue 应用"底层"所发生的事情。
