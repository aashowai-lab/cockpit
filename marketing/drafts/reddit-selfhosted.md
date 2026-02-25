# Reddit Post — r/selfhosted
> Status: DRAFT — Do NOT post yet
> Account: u/OppositeDelicious579
> Subreddit: r/selfhosted

---

## Title

Built a visual dashboard for OpenClaw agents — no terminal required

---

## Body

Hey r/selfhosted,

I've been running OpenClaw for a while and hit the same wall most people do — managing agents is all terminal, all manual. You want to check status, you SSH in. You want to debug, you grep logs. You want to set up a new agent, you're copy-pasting configs.

So I built **Cockpit** — a UI layer on top of OpenClaw that lets you actually *see* what your agents are doing.

**What it does:**
- **Setup wizard** — configure and launch agents through a UI, no config file editing
- **Live monitoring** — dashboard showing all your agents, their status, last run, and health
- **One-click debug** — click into any agent to see its trace, errors, and output
- **No terminal required** — full management from the browser

I'm running this on a Mac mini alongside my other self-hosted stuff and it's made a huge difference in how fast I can spot and fix issues.

**It's $79 one-time** (no subscription). Link: cockpit-phi.vercel.app

Happy to answer questions about how it works or how I set it up. Also curious if anyone else has found good ways to manage OpenClaw agent fleets — open to ideas.

---

*Tags: #selfhosted #AI #automation #OpenClaw*
