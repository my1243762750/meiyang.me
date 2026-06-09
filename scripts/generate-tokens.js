/**
 * 从 mei-ui-system tokens 生成 CSS 自定义属性
 * 读取 tokens/*.json → 输出 src/app/tokens.css
 */
const fs = require("fs")
const path = require("path")

const tokensDir = path.join(__dirname, "..", "tokens")
const outputFile = path.join(__dirname, "..", "src", "app", "tokens.css")

function readJSON(name) {
  const file = path.join(tokensDir, name)
  return JSON.parse(fs.readFileSync(file, "utf-8"))
}

const color = readJSON("color.json")
const typography = readJSON("typography.json")
const spacing = readJSON("spacing.json")
const radius = readJSON("border-radius.json")
const shadow = readJSON("shadow.json")
const motion = readJSON("motion.json")

function safeVarName(str) {
  return str.replace(/\./g, "_")
}

let css = `/* ============================================
   Auto-generated from mei-ui-system tokens
   Source: tokens/*.json
   Do not edit directly — edit the JSON files instead.
   ============================================ */

:root {
`

// Colors
const colorEntries = {
  "primary-50": color.primary.scale["50"],
  "primary-100": color.primary.scale["100"],
  "primary-200": color.primary.scale["200"],
  "primary-300": color.primary.scale["300"],
  "primary-400": color.primary.scale["400"],
  "primary-500": color.primary.scale["500"],
  "primary-600": color.primary.scale["600"],
  "primary-700": color.primary.scale["700"],
  "primary-800": color.primary.scale["800"],
  "primary-900": color.primary.scale["900"],
  "blue-50": color.blueAxis.scale["50"],
  "blue-500": color.blueAxis.scale["500"],
  "blue-600": color.blueAxis.scale["600"],
  "surface": color.neutral.scale["50"],
  "page": "#FFFFFF",
  "elevated": "#FFFFFF",
  "text-primary": color.neutral.scale["900"],
  "text-secondary": color.neutral.scale["700"],
  "text-tertiary": color.neutral.scale["400"],
  "border-default": color.neutral.scale["200"],
  "border-strong": color.neutral.scale["300"],
}

for (const [key, val] of Object.entries(colorEntries)) {
  css += `  --color-${key}: ${val};\n`
}

// Typography
const fontSans = typography.fontFamily.sans.value === "system-sans"
  ? '"Inter", ui-sans-serif, system-ui, sans-serif'
  : typography.fontFamily.sans.value

const fontMono = typography.fontFamily.mono.value === "system-mono"
  ? '"JetBrains Mono", ui-monospace, "SF Mono", monospace'
  : typography.fontFamily.mono.value

css += `\n  --font-sans: ${fontSans};\n`
css += `  --font-mono: ${fontMono};\n`

// Font sizes
for (const [key, val] of Object.entries(typography.size)) {
  css += `  --font-size-${key}: ${val.value}${val.unit};\n`
}

// Spacing (only clean numeric keys)
for (const [key, val] of Object.entries(spacing.scale)) {
  const name = safeVarName(key)
  css += `  --space-${name}: ${val}${spacing.unit};\n`
}

// Border radius
for (const [key, val] of Object.entries(radius.scale)) {
  css += `  --radius-${key}: ${val}${radius.unit};\n`
}

// Shadows
for (const [key, val] of Object.entries(shadow.scale)) {
  css += `  --shadow-${key}: ${val.x}px ${val.y}px ${val.blur}px ${val.spread}px ${val.color};\n`
}

// Motion
css += `\n  --duration-fast: ${motion.duration.fast}ms;\n`
css += `  --duration-normal: ${motion.duration.normal}ms;\n`
css += `  --duration-slow: ${motion.duration.slow}ms;\n`
css += `  --duration-slower: ${motion.duration.slower}ms;\n`

// Dark mode
css += `}

@media (prefers-color-scheme: dark) {
  :root {
    --color-page: #0F0F1A;
    --color-surface: #1A1A2E;
    --color-elevated: #2A2B38;
    --color-text-primary: #F1F2F7;
    --color-text-secondary: #A1A3B0;
    --color-text-tertiary: #5E5F6B;
    --color-border-default: #2A2B38;
    --color-border-strong: #434452;
`

for (const [key, val] of Object.entries(shadow.dark)) {
  css += `    --shadow-${key}: ${val.x}px ${val.y}px ${val.blur}px ${val.spread}px ${val.color};\n`
}

css += `  }
}
`

fs.writeFileSync(outputFile, css, "utf-8")
console.log(`✅ Generated ${outputFile} from tokens/*.json`)
