---
title: "AMap 集成组件"
description: "用于高德地图集成的可复用 Vue 组件，支持带进度追踪的文件上传和基于位置的文件管理。"
tags: [Vue, TypeScript, AMap, Map]
date: "2026-04-20"
slug: "amap-components"
---

## 概述

构建了一套可复用的 Vue 组件，集成高德地图 JavaScript API，提供基于位置的服务。

## 组件

### BaseUpload

文件上传组件，功能包括：

- 进度条可视化
- 多文件支持
- 拖拽上传界面
- 地图标记集成

### FileList

文件管理组件，功能包括：

- 显示已上传文件及其元数据
- 位置标签与筛选
- 预览功能
- 与地图标记集成，支持地理标记文件

## 技术细节

- 使用 TypeScript 构建，保证类型安全
- Vue 3 Composition API
- 高德地图 JavaScript API v2.0
- 坐标转换和地图操作工具函数

## 用途

适用于需要位置感知文件管理的应用场景，如现场检查报告、资产追踪和站点文档管理。
