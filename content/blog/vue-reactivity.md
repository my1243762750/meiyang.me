---
title: "Deep Dive into Vue Reactivity System"
description: "Understanding how Vue's reactive system works under the hood — from Object.defineProperty to Proxy, with hand-written implementations of Vue 2 and Vue 3 reactivity."
tags: [Vue, Reactivity, Proxy, JavaScript]
date: "2026-06-05"
---

## The Core Idea

Vue's reactivity system is what makes the framework magical — when your data changes, the DOM updates automatically. But how does it actually work?

## Vue 2: Object.defineProperty

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

**Limitations of Vue 2's approach:**
- Cannot detect property addition/deletion (requires `Vue.set` / `Vue.delete`)
- Cannot detect array index mutation
- Must recursively traverse the entire object on init

## Vue 3: Proxy

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

**Vue 3 improvements:**
- Detects property addition/deletion naturally
- Supports all data types (Map, Set, etc.)
- Lazy observation — only proxies when accessed
- Better performance with fewer traversals

## The Full Pipeline

```
Data → reactive() → Proxy → track() → Dep → Watcher → update() → DOM
```

Every component instance has a corresponding **Watcher**. During rendering, the watcher collects all dependencies (reactive properties it reads). When those properties change, the watcher is notified and the component re-renders.

## Hand-Written Implementations

In my knowledge base, I have complete hand-written implementations of:

- Vue 2 reactive system (Observer + Dep + Watcher)
- Vuex state management (from scratch)
- Vue Router (hash-based routing)

These implementations helped me truly understand what happens "under the hood" of Vue applications.
