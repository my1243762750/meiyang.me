---
title: "手写构建工具：Webpack、Vite 和 Rollup"
description: "构建流行 JavaScript 打包工具的简化版本，以理解其核心机制——从依赖图到模块热替换。"
tags: [Webpack, Vite, Rollup, Build Tools, JavaScript]
date: "2026-06-08"
---

## 为什么需要构建工具？

现代 JavaScript 开发依赖构建工具来实现：

- **模块打包** — 将多个文件合并为优化后的包
- **转译** — 将现代 JS 转换为浏览器兼容的代码
- **代码分割** — 只加载所需的部分
- **模块热替换** — 无需完全刷新即可更新代码

## meiyangpack（迷你 Webpack）

一个简化的 webpack 实现：

```js
class Compiler {
  constructor(config) {
    this.config = config
    this.entry = config.entry
    this.modules = []
  }

  run() {
    // 1. 解析入口文件 → AST
    // 2. 查找所有依赖（require/import）
    // 3. 递归构建依赖图
    // 4. 应用 loader 转换文件
    // 5. 生成包含模块运行时的包
  }
}
```

**实现的关键概念**：
- 依赖图构建（BFS）
- Loader 管道（css-loader、style-loader、less-loader）
- 插件系统（基于 tapable 的钩子）
- 带有 webpack 运行时的包生成

## meiyangvite（迷你 Vite）

一个简化的类 Vite 开发服务器：

```
请求 → 开发服务器 → 即时转换 → ES 模块
```

- 开发模式下使用原生 ESM（无需打包）
- 使用 esbuild 预打包依赖
- 简单的插件系统
- 通过 WebSocket 实现模块热替换

## meiyangrollup

一个专注于 tree-shaking 的最小化 Rollup：

- 作用域分析，查找未使用的导出
- 死代码消除
- ES 模块输出

## Tapable（Webpack 的插件系统）

Webpack 钩子系统的完整实现：

| 钩子类型 | 行为 |
|----------|------|
| SyncHook | 按顺序调用所有监听器 |
| SyncBailHook | 如果监听器返回非 null 则停止 |
| SyncWaterfallHook | 将结果传递给下一个监听器 |
| SyncLoopHook | 循环直到所有返回 undefined |
| AsyncParallelHook | 并行运行所有 |
| AsyncSeriesHook | 按顺序运行 |
| AsyncSeriesWaterfallHook | 顺序执行并传递结果 |

## 学到了什么

从头构建这些工具让我深入理解了：

1. 模块解析的实际工作方式
2. AST 在代码转换中的作用
3. loader 和插件如何形成管道
4. 基于打包（webpack）与原生 ESM（Vite）方案之间的权衡
