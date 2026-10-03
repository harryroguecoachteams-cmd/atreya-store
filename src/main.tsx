import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Every route ships as a prerendered snapshot (scripts/prerender.mjs), stamped
// with the path it was rendered for. Hydrate that markup instead of throwing it
// away: with createRoot the page was drawn twice and the largest paint waited
// on the whole bundle (Lighthouse mobile, 2026-10-03: 3.4 s of render delay).
// Unknown URLs are served the home snapshot by the SPA fallback, so only
// hydrate when the stamp matches the URL actually being viewed.
const root = document.getElementById('root')!
const stamp = document.querySelector('meta[name="x-prerendered"]')?.getAttribute('content')
const here = location.pathname.replace(/\/$/, '') || '/'
if (root.firstElementChild && stamp === here) hydrateRoot(root, app)
else createRoot(root).render(app)
