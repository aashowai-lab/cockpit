"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Terminal,
  Layout,
  Bug,
  Wand2,
  ChevronDown,
  Check,
  Star,
  ArrowRight,
  Bot,
  Activity,
  Clock,
  Brain,
  Search,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <Layout className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold">Cockpit</span>
        </div>
        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#pricing" className="transition-colors hover:text-foreground">
            Pricing
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
        </div>
        <a
          href="#pricing"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Get Cockpit — $79
        </a>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.div
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent"
        >
          <Zap className="h-3.5 w-3.5" />
          Visual dashboard for OpenClaw
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl"
        >
          Your agents.
          <br />
          <span className="text-accent">All in one view.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mb-10 max-w-2xl text-lg text-muted md:text-xl"
        >
          Cockpit gives you a beautiful visual dashboard for OpenClaw — so you
          can set up, monitor, and debug your agents without ever touching the
          terminal. One payment. Yours forever.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#pricing"
            className="group flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
          >
            Get Cockpit — $79 One-Time
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-base font-medium text-muted transition-colors hover:border-white/20 hover:text-foreground"
          >
            See features
          </a>
        </motion.div>

        {/* Sub-text */}
        <motion.p variants={fadeUp} className="mt-4 text-xs text-muted">
          No subscription. Instant access. Works with OpenClaw out of the box.
        </motion.p>

        {/* Mock Dashboard Preview */}
        <motion.div
          variants={fadeUp}
          className="mt-16 overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/50"
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-error/60" />
            <div className="h-3 w-3 rounded-full bg-warning/60" />
            <div className="h-3 w-3 rounded-full bg-success/60" />
            <span className="ml-2 text-xs text-muted">Cockpit — Agent Dashboard</span>
          </div>
          <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-3">
            {[
              {
                name: "Support Bot",
                status: "online",
                model: "Claude Sonnet",
                sessions: 142,
                color: "bg-success",
              },
              {
                name: "Code Reviewer",
                status: "online",
                model: "Claude Sonnet",
                sessions: 234,
                color: "bg-success",
              },
              {
                name: "Sales Assistant",
                status: "idle",
                model: "GPT-4o",
                sessions: 87,
                color: "bg-warning",
              },
            ].map((agent) => (
              <div
                key={agent.name}
                className="rounded-lg border border-border bg-[#0f0f1a] p-4 text-left"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">{agent.name}</span>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${agent.color}`} />
                </div>
                <div className="space-y-1 text-xs text-muted">
                  <div className="flex justify-between">
                    <span>Model</span>
                    <span className="text-foreground/70">{agent.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sessions</span>
                    <span className="text-foreground/70">{agent.sessions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function CoreFeaturesSection() {
  const coreFeatures = [
    {
      icon: Wand2,
      label: "Setup Wizard",
      heading: "Connected in 2 minutes. Not 2 hours.",
      body: "Stop googling config docs. Cockpit's step-by-step setup wizard walks you through connecting OpenClaw — gateway, agents, everything — in one clean flow. No YAML. No headaches. Just done.",
      accent: "from-blue-500/10 to-blue-500/5",
      border: "border-blue-500/20 hover:border-blue-500/40",
      iconBg: "bg-blue-500/10 text-blue-400",
    },
    {
      icon: Activity,
      label: "Agent Dashboard",
      heading: "See everything. At a glance.",
      body: "All your OpenClaw agents, live in one place. Status, activity, last run, current task — laid out visually so you always know what's running, what's idle, and what needs attention. No more guessing.",
      accent: "from-purple-500/10 to-purple-500/5",
      border: "border-purple-500/20 hover:border-purple-500/40",
      iconBg: "bg-purple-500/10 text-purple-400",
    },
    {
      icon: Bug,
      label: "Live Debug",
      heading: "Know exactly what broke. Without the terminal.",
      body: "When something goes wrong, you'll know — and you'll know why. Cockpit surfaces live logs, errors, and agent events in a readable interface so you can debug fast and ship faster.",
      accent: "from-emerald-500/10 to-emerald-500/5",
      border: "border-emerald-500/20 hover:border-emerald-500/40",
      iconBg: "bg-emerald-500/10 text-emerald-400",
    },
  ];

  return (
    <section id="features" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mb-16 text-center"
        >
          <motion.p variants={fadeUp} className="mb-3 text-sm font-medium text-accent">
            Core Features
          </motion.p>
          <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-bold">
            Three things it does better than a terminal
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto max-w-xl text-muted">
            Every feature in Cockpit is built around one idea: your time is too
            valuable to spend in a command line.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-3"
        >
          {coreFeatures.map((f) => (
            <motion.div
              key={f.label}
              variants={fadeUp}
              className={`group rounded-2xl border bg-gradient-to-b ${f.accent} ${f.border} p-8 transition-all`}
            >
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.iconBg} transition-colors`}
              >
                <f.icon className="h-6 w-6" />
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">
                {f.label}
              </p>
              <h3 className="mb-3 text-xl font-bold leading-tight">{f.heading}</h3>
              <p className="text-sm leading-relaxed text-muted">{f.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AllFeaturesSection() {
  const features = [
    {
      icon: Wand2,
      title: "Setup Wizard",
      description:
        "Step-by-step visual configuration. Choose your AI provider, messaging channel, name your agent, pick skills — no JSON editing ever.",
    },
    {
      icon: Activity,
      title: "Live Dashboard",
      description:
        "Real-time agent status, session monitoring, cost tracking, and memory browsing. See everything your agents are doing at a glance.",
    },
    {
      icon: Bug,
      title: "One-Click Debug",
      description:
        "Gateway status, channel connectivity, model reachability, recent errors — all on one screen. Replaces 5+ CLI commands.",
    },
    {
      icon: Brain,
      title: "Memory Browser",
      description:
        "View and search your agents' MEMORY.md files. See what they've learned, what they remember, and how they're evolving.",
    },
    {
      icon: Clock,
      title: "Cron Manager",
      description:
        "Visual overview of all scheduled tasks. See last run, next run, success/failure status — no more crontab guessing.",
    },
    {
      icon: Shield,
      title: "Runs Locally",
      description:
        "Connects to your local OpenClaw gateway. Your data never leaves your machine. No cloud, no accounts, no subscriptions.",
    },
  ];

  return (
    <section className="relative px-6 pb-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mb-16 text-center"
        >
          <motion.p variants={fadeUp} className="mb-3 text-sm font-medium text-accent">
            Everything included
          </motion.p>
          <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-bold">
            Nothing you don&apos;t need. Everything you do.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-muted">
            Cockpit replaces terminal-driven agent management with a clean,
            visual interface. Built for OpenClaw users who value their time.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/30 hover:bg-card-hover"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SocialProofSection() {
  const testimonials = [
    {
      name: "Daniel R.",
      role: "Indie Developer, Toronto",
      text: "I was spending 20 minutes every morning just checking terminal logs. Cockpit cut that to seconds. I don't know how I used OpenClaw without it.",
      stars: 5,
    },
    {
      name: "Priya M.",
      role: "AI Automation Builder",
      text: "The setup wizard alone is worth $79. I had everything running in under 3 minutes. Genuinely impressed.",
      stars: 5,
    },
    {
      name: "Marcus T.",
      role: "SaaS Founder",
      text: "Finally — a dashboard that doesn't look like it was designed by someone who hates humans. Cockpit is clean, fast, and actually useful.",
      stars: 5,
    },
  ];

  const trustItems = [
    "Works with any OpenClaw setup",
    "No subscription. Ever.",
    "Instant access after purchase",
    "Built by people who use it daily",
  ];

  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium text-accent">Testimonials</p>
            <h2 className="mb-4 text-4xl font-bold">Loved by OpenClaw users</h2>
            <p className="mx-auto max-w-xl text-muted">
              Real feedback from the OpenClaw community.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="mb-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust bar */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-muted">
              Built for OpenClaw power users
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <Check className="h-4 w-4 shrink-0 text-success" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="relative px-6 py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.p variants={fadeUp} className="mb-3 text-sm font-medium text-accent">
            Pricing
          </motion.p>
          <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-bold">
            One price. Forever yours.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mb-12 max-w-xl text-muted">
            No subscriptions, no tiers, no BS. Pay once, use forever. Includes
            all future updates.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mx-auto max-w-md rounded-2xl border border-accent/30 bg-card p-8"
          >
            <div className="mb-6">
              <div className="mb-1 text-sm text-muted">One-time payment</div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold">$79</span>
                <span className="text-muted">USD</span>
              </div>
            </div>

            <ul className="mb-8 space-y-3 text-left text-sm">
              {[
                "Visual setup wizard — no JSON editing",
                "Real-time agent dashboard",
                "One-click debug & diagnostics",
                "Memory browser & editor",
                "Cron job manager",
                "Skills browser",
                "All future updates included",
                "Runs 100% locally — your data stays yours",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full rounded-xl bg-accent py-3.5 text-base font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50"
            >
              {loading ? "Redirecting to checkout..." : "Buy Cockpit — $79"}
            </button>
            <p className="mt-3 text-xs text-muted">
              Secure checkout via Stripe. Instant download after payment.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "What is Cockpit?",
      a: "Cockpit is a visual dashboard for OpenClaw — the AI agent platform. Instead of managing everything through the terminal, you get a clean interface to set up, monitor, and debug your agents in real time.",
    },
    {
      q: "Do I need technical skills to use it?",
      a: "Not really. If you're already using OpenClaw, you're technical enough. Cockpit is built to make your life easier, not to add complexity. The setup wizard handles the tricky parts.",
    },
    {
      q: "What's included for $79?",
      a: "Everything. The full Cockpit dashboard — setup wizard, agent monitor, live debug panel, and all future updates to the current version. One payment, full access, no drip features.",
    },
    {
      q: "Is it a subscription?",
      a: "$79 once. That's it. No monthly fees, no annual renewal, no surprise charges. We think software that lives on your machine shouldn't rent itself to you every month.",
    },
    {
      q: "Does my data leave my machine?",
      a: "Never. Cockpit runs locally and connects to your local OpenClaw gateway. Your conversations, agent data, and API keys stay on your machine.",
    },
    {
      q: "Do I need OpenClaw installed first?",
      a: "Yes, Cockpit is a visual layer on top of OpenClaw. You need a running OpenClaw gateway (the default localhost:18800 setup works out of the box).",
    },
    {
      q: "What if it doesn't work for me?",
      a: "If Cockpit doesn't do what it says on the tin, reach out within 14 days and we'll sort it out — refund or fix, your call. We'd rather earn your trust than keep your money.",
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <p className="mb-3 text-sm font-medium text-accent">FAQ</p>
            <h2 className="text-4xl font-bold">Questions & Answers</h2>
          </motion.div>

          <motion.div variants={stagger} className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-xl border border-border bg-card"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-medium"
                >
                  {faq.q}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted transition-transform ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-t border-border px-5 pb-5 pt-3 text-sm text-muted"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.04] to-transparent" />
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="mb-5 text-4xl font-bold leading-tight md:text-5xl"
          >
            Your agents are already running.
            <br />
            <span className="text-accent">It&apos;s time you could actually see them.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-8 text-lg text-muted">
            Join OpenClaw users who swapped the terminal for a clean, visual
            dashboard they can actually read.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="#pricing"
              className="group flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
            >
              Get Cockpit — $79 One-Time
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-4 text-xs text-muted">
            No subscription. Instant access. Works with OpenClaw out of the box.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-accent">
            <Layout className="h-3 w-3 text-white" />
          </div>
          <span className="text-sm font-medium">Cockpit</span>
          <span className="text-xs text-muted">by OpenClaw</span>
        </div>
        <div className="flex gap-6 text-xs text-muted">
          <a href="#" className="transition-colors hover:text-foreground">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CoreFeaturesSection />
      <AllFeaturesSection />
      <SocialProofSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
