"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Download,
  Terminal,
  Copy,
  Layout,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-muted transition-colors hover:text-foreground"
    >
      {copied ? (
        <CheckCircle2 className="h-4 w-4 text-success" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}

export default function DownloadPage() {
  const steps = [
    {
      title: "Install Cockpit",
      command: "npm install -g cockpit-openclaw",
      description: "Install the Cockpit CLI globally via npm.",
    },
    {
      title: "Start Cockpit",
      command: "cockpit",
      description:
        "Run the cockpit command. It will automatically find your OpenClaw gateway.",
    },
    {
      title: "Open your browser",
      command: "http://localhost:3000",
      description:
        "Cockpit opens automatically. If not, navigate to localhost:3000 in your browser.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center px-6">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Layout className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">Cockpit</span>
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Success Banner */}
          <motion.div
            variants={fadeUp}
            className="mb-12 flex flex-col items-center text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">
              Payment successful!
            </h1>
            <p className="text-muted">
              Thank you for purchasing Cockpit. Follow the steps below to get started.
            </p>
          </motion.div>

          {/* Quick Install */}
          <motion.div
            variants={fadeUp}
            className="mb-10 rounded-xl border border-accent/30 bg-card p-6"
          >
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-accent">
              <Download className="h-4 w-4" />
              Quick Install (one command)
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#0a0a0a] p-4 font-mono text-sm">
              <span>
                <span className="text-accent">$</span>{" "}
                npx cockpit-openclaw
              </span>
              <CopyButton text="npx cockpit-openclaw" />
            </div>
            <p className="mt-3 text-xs text-muted">
              This downloads and runs Cockpit in one step. No global install required.
            </p>
          </motion.div>

          {/* Step by Step */}
          <motion.div variants={fadeUp}>
            <h2 className="mb-6 text-lg font-semibold">
              Or install step by step
            </h2>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                      {i + 1}
                    </div>
                    <h3 className="text-sm font-medium">{step.title}</h3>
                  </div>
                  <div className="mb-2 ml-9 flex items-center justify-between rounded-lg bg-[#0a0a0a] px-4 py-2.5 font-mono text-sm">
                    <span>
                      <span className="text-accent">$</span> {step.command}
                    </span>
                    <CopyButton text={step.command} />
                  </div>
                  <p className="ml-9 text-xs text-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Requirements */}
          <motion.div
            variants={fadeUp}
            className="mt-10 rounded-xl border border-border bg-card p-6"
          >
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <Terminal className="h-4 w-4 text-accent" />
              Requirements
            </div>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                Node.js 18+ installed
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                OpenClaw gateway running (default: localhost:18800)
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                Modern browser (Chrome, Firefox, Safari, Edge)
              </li>
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-8 text-center">
            <p className="text-sm text-muted">
              Need help? Check the{" "}
              <a href="#" className="text-accent hover:underline">
                documentation
              </a>{" "}
              or reach out to{" "}
              <a href="#" className="text-accent hover:underline">
                support
              </a>
              .
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
