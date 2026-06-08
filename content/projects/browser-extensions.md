---
title: "Edge Browser Extensions"
description: "Production-ready browser extensions for TikTok video analysis and CPD (Cost Per Day) data management on e-commerce platforms."
tags: [JavaScript, Browser Extension, Edge, Chrome]
date: "2026-05-15"
featured: true
slug: "browser-extensions"
---

## Overview

Developed two Edge browser extensions to automate repetitive tasks and extract useful data from web pages.

## douyin-helper

A TikTok assistant extension that:

- Extracts video metadata (title, author, play count)
- Downloads videos directly from the page
- Identifies video source URLs from embedded players
- Clean popup UI with real-time status

## cpdHelper

An e-commerce operations tool that:

- Scrapes CPD (Cost Per Day) advertising data from campaign pages
- Formats and exports data for reporting
- Uses jQuery for DOM traversal and data extraction
- Packaged with manifest v3 for Edge Add-ons store

## Technical Highlights

- Content scripts communicate with background service worker via message passing
- Dynamic script injection for SPAs
- Manifest v3 compliant
