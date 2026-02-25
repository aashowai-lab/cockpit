# Cockpit — Post-Purchase Install Guide

Thanks for purchasing **Cockpit**, the visual dashboard for OpenClaw! Here's how to get started.

## What You Get

- **Setup Wizard** — guided first-run configuration
- **Agent Dashboard** — monitor all your AI agents in real-time
- **Debug Screen** — inspect logs, errors, and agent reasoning
- **Memory Browser** — search and manage agent memory files
- **Cron Manager** — schedule and monitor recurring tasks
- **Skills Browser** — discover, install, and manage agent skills
- **All future updates included** — one-time purchase, lifetime access

## Installation

### Prerequisites

- **Node.js 18+** installed ([download](https://nodejs.org))
- **OpenClaw** installed and running (`npm i -g openclaw`)
- A running OpenClaw gateway (`openclaw gateway start`)

### Steps

1. **Download the Cockpit source** from the link in your confirmation email.

2. **Unzip and install dependencies:**
   ```bash
   cd cockpit
   npm install
   ```

3. **Configure your environment:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and set:
   - `OPENCLAW_GATEWAY_URL` — your gateway URL (default: `http://localhost:3000`)
   - `OPENCLAW_API_TOKEN` — your gateway API token

4. **Start the dashboard:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3001](http://localhost:3001) in your browser.

5. **For production deployment** (optional):
   ```bash
   npm run build
   npm start
   ```
   Or deploy to Vercel with one click — just connect your repo.

## Connecting to OpenClaw

Cockpit connects to your OpenClaw gateway automatically. Make sure:

- Your gateway is running (`openclaw gateway status`)
- The gateway URL and token in `.env.local` are correct
- Your firewall allows connections on the gateway port

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Cannot connect to gateway" | Check `OPENCLAW_GATEWAY_URL` and ensure the gateway is running |
| Blank dashboard | Ensure you have at least one agent configured in OpenClaw |
| Port conflict | Change the port: `PORT=3002 npm run dev` |

## Support

- **Email:** support@thinkboxmarketing.com
- **GitHub Issues:** Report bugs on the Cockpit repo

---

*Built by ThinkBox Inc.*
