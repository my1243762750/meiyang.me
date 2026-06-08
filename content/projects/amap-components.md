---
title: "AMap Integration Components"
description: "Reusable Vue components for Amap (高德地图) integration, featuring file upload with progress tracking and location-based file management."
tags: [Vue, TypeScript, AMap, Map]
date: "2026-04-20"
featured: true
slug: "amap-components"
---

## Overview

Built a set of reusable Vue components integrating with the Amap (高德地图) JavaScript API for location-based services.

## Components

### BaseUpload

A file upload component with:

- Progress bar visualization
- Multiple file support
- Drag and drop interface
- Integration with map markers

### FileList

A file management component that:

- Displays uploaded files with metadata
- Location tagging and filtering
- Preview capabilities
- Integration with map markers for geo-tagged files

## Technical Details

- Built with TypeScript for type safety
- Vue 3 Composition API
- Amap JavaScript API v2.0
- Utility functions for coordinate conversion and map operations

## Usage

Used in applications requiring location-aware file management, such as field inspection reports, asset tracking, and site documentation.
