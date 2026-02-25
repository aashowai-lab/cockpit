"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Copy,
  Layout,
  Check,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
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
      className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
      style={{
        background: copied ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.08)",
        color: copied ? "#22c55e" : "#a1a1aa",
      }}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Copy
        </>
      )}
    </button>
  );
}

function CommandBlock({
  command,
  output,
}: {
  command: string;
  output?: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 mt-4">
      {/* Command row */}
      <div className="flex items-center justify-between bg-[#111111] px-5 py-3.5">
        <code className="font-mono text-sm text-white">
          <span className="text-accent mr-2">$</span>
          {command}
        </code>
        <CopyButton text={command} />
      </div>
      {/* Expected output */}
      {output && (
        <div className="bg-[#0a0a0a] px-5 py-3 border-t border-white/5">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Expected output
          </p>
          <code className="font-mono text-xs text-zinc-400 whitespace-pre-wrap leading-relaxed">
            {output}
          </code>
        </div>
      )}
    </div>
  );
}

function StepBadge({ number }: { number: number }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold text-lg"
      style={{
        width: 48,
        height: 48,
        background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
        boxShadow: "0 0 20px rgba(124,58,237,0.4)",
      }}
    >
      {number}
    </div>
  );
}

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-6">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Layout className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">Cockpit</span>
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <motion.div initial="hidden" animate="visible" variants={stagger}>

          {/* ✅ Success Banner */}
          <motion.div
            variants={fadeUp}
            className="mb-14 flex flex-col items-center text-center"
          >
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: "rgba(34,197,94,0.12)" }}>
              <CheckCircle2 className="h-10 w-10 text-green-400" />
            </div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight">
              🎉 Payment Confirmed!
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl">
              You&apos;re one setup away from Cockpit. Follow these steps
              exactly — they take less than <strong className="text-white">3 minutes</strong>.
            </p>
          </motion.div>

          {/* ────────────── STEP 1 ────────────── */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="rounded-2xl border border-white/10 bg-card p-7">
              <div className="flex items-start gap-5 mb-5">
                <StepBadge number={1} />
                <div>
                  <h2 className="text-xl font-bold mb-1">Install Node.js</h2>
                  <p className="text-zinc-400">
                    Cockpit runs on Node.js. If you already have it, skip to step 2.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#111111] border border-white/10 p-5 flex items-start gap-3 mb-4">
                <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-zinc-300">
                  <strong className="text-white">Not sure if you have Node?</strong>{" "}
                  Open your Terminal (Mac/Linux) or Command Prompt (Windows) and
                  run this to check:
                </p>
              </div>

              <CommandBlock
                command="node --version"
                output="v20.11.0  ← any version 18 or higher is fine"
              />

              <div className="mt-5 flex items-center gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                <p className="text-sm text-zinc-300">
                  <strong className="text-white">Got a version number? Great, skip to Step 2.</strong>
                  {" "}If you got an error, download Node from{" "}
                  <a
                    href="https://nodejs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-2 hover:text-white transition-colors"
                  >
                    nodejs.org
                  </a>{" "}
                  → click the big green &ldquo;LTS&rdquo; button → install it → come back here.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ────────────── STEP 2 ────────────── */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="rounded-2xl border border-white/10 bg-card p-7">
              <div className="flex items-start gap-5 mb-5">
                <StepBadge number={2} />
                <div>
                  <h2 className="text-xl font-bold mb-1">Install Cockpit</h2>
                  <p className="text-zinc-400">
                    Open your <strong className="text-white">Terminal</strong> (Mac/Linux) or{" "}
                    <strong className="text-white">Command Prompt</strong> (Windows) and run:
                  </p>
                </div>
              </div>

              <CommandBlock
                command="npm install -g cockpit-openclaw"
                output={`npm warn deprecated ...
added 142 packages in 18s

✔ cockpit-openclaw installed successfully`}
              />

              <p className="mt-4 text-sm text-zinc-500">
                ⏱ This takes about 15–30 seconds. The <code className="text-zinc-300 bg-white/5 px-1.5 py-0.5 rounded">npm warn deprecated</code> warnings are normal — ignore them.
              </p>
            </div>
          </motion.div>

          {/* ────────────── STEP 3 ────────────── */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="rounded-2xl border border-white/10 bg-card p-7">
              <div className="flex items-start gap-5 mb-5">
                <StepBadge number={3} />
                <div>
                  <h2 className="text-xl font-bold mb-1">Run Cockpit</h2>
                  <p className="text-zinc-400">
                    In the same Terminal window, run this single command:
                  </p>
                </div>
              </div>

              <CommandBlock
                command="cockpit"
                output={`🚀 Cockpit starting...
✔ Connected to OpenClaw gateway
✔ Opening browser at http://localhost:3000`}
              />

              <div className="mt-4 rounded-xl bg-accent/5 border border-accent/20 p-4">
                <p className="text-sm text-zinc-300">
                  <strong className="text-white">🌐 Your browser will open automatically.</strong>{" "}
                  If it doesn&apos;t open after 10 seconds, go to{" "}
                  <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded">http://localhost:3000</code>{" "}
                  manually.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ────────────── STEP 4 ────────────── */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="rounded-2xl border border-white/10 bg-card p-7">
              <div className="flex items-start gap-5 mb-5">
                <StepBadge number={4} />
                <div>
                  <h2 className="text-xl font-bold mb-1">Connect to Your Gateway</h2>
                  <p className="text-zinc-400">
                    Cockpit will ask for your OpenClaw gateway address. Use the default unless you changed it:
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-white/10 mt-2">
                <div className="flex items-center justify-between bg-[#111111] px-5 py-3.5">
                  <code className="font-mono text-sm text-white">
                    localhost:18800
                  </code>
                  <CopyButton text="localhost:18800" />
                </div>
                <div className="bg-[#0a0a0a] px-5 py-3 border-t border-white/5">
                  <code className="font-mono text-xs text-zinc-400">
                    ← this is the default, just press Enter
                  </code>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm text-zinc-400">
                  <strong className="text-white">Where is my gateway?</strong> Your OpenClaw gateway
                  starts automatically when you launch the OpenClaw app on your computer.
                  It runs in the background at <code className="text-zinc-300 bg-white/5 px-1.5 py-0.5 rounded">localhost:18800</code>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ────────────── STEP 5 ────────────── */}
          <motion.div variants={fadeUp} className="mb-10">
            <div
              className="rounded-2xl border p-7 text-center"
              style={{
                borderColor: "rgba(34,197,94,0.3)",
                background: "rgba(34,197,94,0.04)",
              }}
            >
              <div className="flex items-start gap-5 text-left mb-6">
                <StepBadge number={5} />
                <div>
                  <h2 className="text-xl font-bold mb-1">You&apos;re In! 🎉</h2>
                  <p className="text-zinc-400">
                    Cockpit is running. Here&apos;s what you should see:
                  </p>
                </div>
              </div>

              <div className="text-left space-y-3">
                {[
                  "Your AI agents listed in the sidebar",
                  "Real-time logs streaming in the terminal panel",
                  "Quick-action buttons to trigger agent tasks",
                  "Settings panel to manage your OpenClaw connection",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ────────────── TROUBLESHOOTING ────────────── */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="rounded-2xl border border-white/10 bg-card p-7">
              <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                Something not working?
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-white">
                    ❌ &ldquo;command not found: cockpit&rdquo;
                  </p>
                  <p className="text-zinc-400 ml-5">
                    The install didn&apos;t finish properly. Close and reopen your Terminal, then re-run{" "}
                    <code className="text-zinc-300 bg-white/5 px-1.5 py-0.5 rounded">npm install -g cockpit-openclaw</code>.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-white">
                    ❌ &ldquo;Cannot connect to gateway&rdquo;
                  </p>
                  <p className="text-zinc-400 ml-5">
                    Make sure the OpenClaw app is running on your computer.
                    Look for the OpenClaw icon in your menu bar (Mac) or system tray (Windows).
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-white">
                    ❌ Browser doesn&apos;t open / blank screen
                  </p>
                  <p className="text-zinc-400 ml-5">
                    Manually navigate to{" "}
                    <code className="text-zinc-300 bg-white/5 px-1.5 py-0.5 rounded">http://localhost:3000</code>.
                    If still blank, try a different browser.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Support footer */}
          <motion.div variants={fadeUp} className="text-center text-sm text-zinc-500">
            Still stuck?{" "}
            <a href="mailto:support@openclaw.io" className="text-accent hover:text-white transition-colors underline underline-offset-2">
              Email support@openclaw.io
            </a>{" "}
            — we respond within 24h.
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
