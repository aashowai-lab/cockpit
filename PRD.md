# Cockpit — Product Requirements Document

## Overview
**Cockpit** is a visual dashboard for OpenClaw users who don't want to touch the terminal. It replaces CLI-driven config, debugging, and agent management with a clean web UI.

**Price:** $79 one-time
**Target:** OpenClaw beginners and non-technical users
**Stack:** Next.js 15 + TypeScript + Tailwind CSS + Stripe Checkout
**Deploy:** Vercel (cockpit-ai.vercel.app)

## What It Is
A standalone web app that connects to a user's local OpenClaw gateway (via its existing HTTP API on port 18800) and provides:

1. **Setup Wizard** — Visual, step-by-step OpenClaw configuration (no JSON editing)
2. **Agent Dashboard** — Live status of all agents, sessions, costs, memory
3. **Debug Screen** — One-click diagnostics (replaces 5+ CLI commands)

## What It Is NOT
- Not a hosted service (runs locally, connects to local gateway)
- Not a replacement for OpenClaw itself (it's a UI layer on top)
- Not subscription-based (one-time purchase, download, done)

## Delivery Model
1. User visits landing page → pays $79 via Stripe
2. Receives download link (zip file or npm package)
3. Runs `npx cockpit` or `npm install -g cockpit-openclaw && cockpit`
4. Opens browser → connects to their local OpenClaw gateway
5. Done

## Feature Spec

### F1: Setup Wizard
**Problem:** OpenClaw config is a complex JSON5 file. Multi-agent setup requires editing bindings, channels, auth profiles manually.

**Solution:** Step-by-step visual wizard:
- Step 1: Welcome → detect existing OpenClaw installation
- Step 2: Choose AI provider (OpenAI, Anthropic, Google) → enter API key
- Step 3: Choose messaging channel (Telegram, Discord, WhatsApp, etc.) → guided auth
- Step 4: Name your agent, set personality (writes SOUL.md)
- Step 5: Pick starter skills from ClawHub
- Step 6: Review & deploy config

**Technical:** Reads/writes openclaw.json via gateway config.get / config.apply RPCs.

### F2: Agent Dashboard
**Problem:** No visual overview of what agents are doing, their status, costs, or memory.

**Solution:** Real-time dashboard showing:
- Agent cards (name, status: online/idle/error, model, last active)
- Session list with conversation previews
- Cost tracker (tokens used, estimated $ per session)
- Memory browser (view/search/edit MEMORY.md and daily files)
- Cron job overview (scheduled tasks, last run, next run)
- Skill inventory (installed skills, enable/disable)

**Technical:** Uses OpenClaw gateway HTTP API + WebSocket for live updates.

### F3: Debug Dashboard
**Problem:** When an agent isn't responding, users must run 5+ CLI commands to diagnose.

**Solution:** Single "Health Check" screen:
- Gateway status (running/stopped, uptime, version)
- Channel connectivity (each channel: connected/disconnected/error)
- Model reachability (can we hit the AI API?)
- Recent errors (last 20 from logs, categorized)
- Quick fixes (one-click restart, re-auth channel, clear stuck sessions)

**Technical:** Combines openclaw status, doctor, channels status --probe, logs into one view.

### F4: Landing Page + Checkout
- Hero section with demo video/screenshots
- Feature highlights (wizard, dashboard, debug)
- Pricing: $79 one-time
- Stripe Checkout integration
- Post-purchase: download link + setup instructions

## Design
- Dark theme (matches OpenClaw's aesthetic)
- Minimal, clean, developer-tool feel
- Responsive (works on tablet too for monitoring)
- Accent color: Electric blue (#3B82F6)

## Pages
1. `/` — Landing page (public)
2. `/buy` — Stripe checkout redirect
3. `/download` — Post-purchase download page (requires valid session)
4. `/app` — Main dashboard (local use after install)
5. `/app/setup` — Setup wizard
6. `/app/agents` — Agent dashboard
7. `/app/debug` — Debug dashboard
8. `/app/memory` — Memory browser
9. `/app/cron` — Cron job manager
10. `/app/skills` — Skills browser

## MVP Scope (Ship Tonight)
**Landing page + checkout + the actual dashboard app.**

Priority order:
1. Landing page with Stripe checkout ← sells the product
2. Agent dashboard ← the "wow" screen
3. Setup wizard ← the "why you buy" screen
4. Debug dashboard ← the "thank god" screen

## Tech Details
- Next.js 15 App Router
- TypeScript strict
- Tailwind CSS v4
- Stripe Checkout (server-side session creation)
- Local app: connects to OpenClaw gateway at configurable URL (default localhost:18800)
- No database needed (reads from OpenClaw's own storage)
