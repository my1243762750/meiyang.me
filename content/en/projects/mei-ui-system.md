---
title: "mei-ui-system"
description: "A cross-platform design protocol and token-based UI specification for visual consistency."
date: "2024-03-20"
tags: ["Design System", "Tokens", "UI/UX", "Architecture"]
featured: true
---

# mei-ui-system

**mei-ui-system** is not just a UI library; it is a **design protocol** built to ensure absolute visual consistency across diverse platforms and frameworks.

## 核心理念 (Philosophy)

The system is built on the belief that UI should be a **protocol**, not just a set of styles. By separating values (Tokens) from implementation (Components), it allows for a unified brand identity that can be deployed anywhere.

- **Truth in Tokens**: All visual properties (colors, spacing, typography) are stored in platform-agnostic JSON files.
- **AI-First Engineering**: Specifically designed with an `ai.md` rulebook to guide AI agents in generating code that is 100% compliant with the design system.
- **Pattern-Driven Density**: Moves beyond static spacing to a responsive density model that adapts to different product types (Messaging, Analytics, Landing, etc.).

## 技术实现 (Technical Implementation)

1. **Multi-Axis Color System**: A dual-axis approach (Blue-Purple) that provides rich accents while maintaining accessibility.
2. **Semantic Mapping**: Bridges the gap between raw HEX values and functional UI roles (e.g., `primary-500` -> `bg-page`).
3. **Execution Guardrails**: Includes strict `ai.md` and `patterns.md` documentation to prevent hardcoding and ensure layout integrity.

## 开源与贡献

The system is open-source and serves as the foundation for all my personal projects, including this portfolio.

[View on GitHub](https://github.com/my1243762750/mei-ui-system)
