---
title: "Hand-Written Build Tools: Webpack, Vite, and Rollup"
description: "Building mini versions of popular JavaScript bundlers to understand their core mechanics — from dependency graphs to HMR."
tags: [Webpack, Vite, Rollup, Build Tools, JavaScript]
date: "2026-06-08"
---

## Why Build Tools?

Modern JavaScript development relies on build tools for:

- **Module bundling** — combining many files into optimized bundles
- **Transpilation** — converting modern JS to browser-compatible code
- **Code splitting** — loading only what's needed
- **Hot Module Replacement** — updating code without full refresh

## meiyangpack (Mini Webpack)

A simplified webpack implementation that:

```js
class Compiler {
  constructor(config) {
    this.config = config
    this.entry = config.entry
    this.modules = []
  }

  run() {
    // 1. Parse entry file → AST
    // 2. Find all dependencies (require/import)
    // 3. Recursively build dependency graph
    // 4. Apply loaders to transform files
    // 5. Generate bundle with module runtime
  }
}
```

**Key concepts implemented**:
- Dependency graph building (BFS)
- Loader pipeline (css-loader, style-loader, less-loader)
- Plugin system (tapable-based hooks)
- Bundle generation with webpack runtime

## meiyangvite (Mini Vite)

A simplified Vite-like dev server:

```
Request → Dev Server → Transform on-the-fly → ES Modules
```

- Native ESM in dev mode (no bundling needed)
- esbuild for pre-bundling dependencies
- Simple plugin system
- Hot module replacement via WebSocket

## meiyangrollup

A minimal Rollup focused on tree-shaking:

- Scope analysis to find unused exports
- Dead code elimination
- ES module output

## Tapable (Webpack's Plugin System)

Complete implementation of webpack's hook system:

| Hook Type | Behavior |
|-----------|----------|
| SyncHook | Call all listeners in order |
| SyncBailHook | Stop if listener returns non-null |
| SyncWaterfallHook | Pass result to next listener |
| SyncLoopHook | Loop until all return undefined |
| AsyncParallelHook | Run all in parallel |
| AsyncSeriesHook | Run in sequence |
| AsyncSeriesWaterfallHook | Sequence with pass-through |

## What I Learned

Building these tools from scratch gave me deep understanding of:

1. How module resolution actually works
2. The role of AST in code transformation
3. How loaders and plugins form a pipeline
4. The trade-offs between bundle-based (webpack) and native ESM (Vite) approaches
