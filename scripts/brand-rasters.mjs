// Renders the raster brand files from the SVGs that scripts/brand-logo.py
// writes, so the PNGs and the icon never drift from the vector art:
//
//   public/brand/atreya-wordmark.png  2x wordmark, transparent (share card, email)
//   public/brand/atreya-logo.png      600px square on cream (Organization schema)
//   public/apple-touch-icon.png       180px lotus on ink, full bleed (iOS rounds it)
//   public/favicon.ico                16/32/48 lotus, for clients that skip the SVG
//
// Run after brand-logo.py: node scripts/brand-rasters.mjs
import puppeteer from 'puppeteer-core'
import { readFileSync, unlinkSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = (p) => join(ROOT, 'public', p)
const svg = (p) => readFileSync(pub(p), 'utf8')

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' })
const page = await browser.newPage()

async function render(markup, w, h, bg, out) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
  await page.setContent(
    `<html><body style="margin:0;width:${w}px;height:${h}px;display:grid;place-items:center;background:${bg}">${markup}</body></html>`,
  )
  await page.screenshot({ path: out, omitBackground: bg === 'transparent', clip: { x: 0, y: 0, width: w, height: h } })
}

const word = svg('brand/atreya-wordmark.svg')
const [, , , vw, vh] = word.match(/viewBox="([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)"/).map(Number)
const W = Math.round(vw * 2)
const H = Math.round((W * vh) / vw)
await render(word.replace('<svg ', `<svg width="${W}" height="${H}" `), W, H, 'transparent', pub('brand/atreya-wordmark.png'))
await render(word.replace('<svg ', '<svg width="520" '), 600, 600, '#faf6ef', pub('brand/atreya-logo.png'))

// Full bleed: drop the tile's rounded corners, iOS applies its own mask.
const tile = svg('favicon.svg').replace(/ rx="[\d.]+"/, '')
await render(tile.replace('<svg ', '<svg width="150" height="150" '), 180, 180, '#2a2018', pub('apple-touch-icon.png'))
const ico = join(ROOT, 'brand', '_favicon-256.png')
await render(svg('favicon.svg').replace('<svg ', '<svg width="256" height="256" '), 256, 256, 'transparent', ico)
await browser.close()

execFileSync('python', ['-c', `from PIL import Image; Image.open(r"${ico}").save(r"${pub('favicon.ico')}", sizes=[(16,16),(32,32),(48,48)])`])
unlinkSync(ico)
console.log(`wrote atreya-wordmark.png ${W}x${H}, atreya-logo.png, apple-touch-icon.png, favicon.ico`)
