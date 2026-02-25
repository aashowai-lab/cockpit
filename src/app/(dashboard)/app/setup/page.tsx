"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Search,
  Sparkles,
  MessageSquare,
  Key,
  Bot,
  Puzzle,
  Rocket,
} from "lucide-react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const steps = [
  { label: "Welcome", icon: Search },
  { label: "AI Provider", icon: Key },
  { label: "Channel", icon: MessageSquare },
  { label: "Agent", icon: Bot },
  { label: "Skills", icon: Puzzle },
  { label: "Deploy", icon: Rocket },
];

const providers = [
  {
    id: "anthropic",
    name: "Anthropic",
    description: "Claude models — best for reasoning and safety",
    models: ["claude-sonnet-4-20250514", "claude-haiku-4-5-20251001"],
  },
  {
    id: "openai",
    name: "OpenAI",
    description: "GPT models — great all-around performance",
    models: ["gpt-4o", "gpt-4o-mini"],
  },
  {
    id: "google",
    name: "Google",
    description: "Gemini models — fast and multimodal",
    models: ["gemini-2.0-flash", "gemini-2.0-pro"],
  },
];

const channels = [
  { id: "telegram", name: "Telegram", description: "Bot API integration" },
  { id: "discord", name: "Discord", description: "Discord bot with slash commands" },
  { id: "slack", name: "Slack", description: "Slack app with events API" },
  { id: "whatsapp", name: "WhatsApp", description: "WhatsApp Business API" },
  { id: "web", name: "Web Widget", description: "Embeddable chat widget" },
];

const starterSkills = [
  { id: "web-search", name: "Web Search", description: "Search the web and summarize results" },
  { id: "code-interpreter", name: "Code Interpreter", description: "Execute Python code safely" },
  { id: "calendar-sync", name: "Calendar Sync", description: "Google Calendar integration" },
  { id: "pdf-reader", name: "PDF Reader", description: "Extract text from PDFs" },
  { id: "email-sender", name: "Email Sender", description: "Send emails via SMTP" },
  { id: "github-ops", name: "GitHub Ops", description: "Manage repos, PRs, and issues" },
];

export default function SetupWizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [provider, setProvider] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [channel, setChannel] = useState("");
  const [agentName, setAgentName] = useState("");
  const [personality, setPersonality] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return provider !== "" && apiKey.length > 8;
      case 2: return channel !== "";
      case 3: return agentName.length > 0;
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  };

  const toggleSkill = (id: string) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-2xl font-bold">Setup Wizard</h1>
        <p className="text-sm text-muted">Configure your OpenClaw agent step by step.</p>
      </motion.div>

      {/* Progress */}
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center gap-1">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <button
                onClick={() => i < currentStep && setCurrentStep(i)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  i === currentStep
                    ? "bg-accent/10 text-accent"
                    : i < currentStep
                      ? "text-success cursor-pointer hover:bg-white/5"
                      : "text-muted"
                }`}
              >
                {i < currentStep ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <step.icon className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">{step.label}</span>
              </button>
              {i < steps.length - 1 && (
                <ChevronRight className="h-3 w-3 text-muted/40" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 h-1 rounded-full bg-border">
          <motion.div
            className="h-1 rounded-full bg-accent"
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border border-border bg-card p-6 lg:p-8"
        >
          {/* Step 0: Welcome */}
          {currentStep === 0 && (
            <div className="text-center py-8">
              <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h2 className="mb-2 text-xl font-bold">Welcome to Cockpit Setup</h2>
              <p className="mx-auto max-w-md text-sm text-muted">
                We&apos;ll walk you through configuring your first OpenClaw agent.
                This wizard will set up your AI provider, messaging channel, agent
                personality, and starter skills.
              </p>
              <div className="mt-6 rounded-lg bg-[#0a0a0a] p-4 text-left mx-auto max-w-sm">
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span className="text-success">OpenClaw gateway detected</span>
                </div>
                <div className="mt-1 text-xs text-muted">
                  localhost:18800 · v0.9.4
                </div>
              </div>
            </div>
          )}

          {/* Step 1: AI Provider */}
          {currentStep === 1 && (
            <div>
              <h2 className="mb-1 text-lg font-bold">Choose AI Provider</h2>
              <p className="mb-6 text-sm text-muted">
                Select the AI provider and enter your API key.
              </p>
              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                {providers.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProvider(p.id)}
                    className={`rounded-xl border p-4 text-left transition-colors ${
                      provider === p.id
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-white/20"
                    }`}
                  >
                    <div className="mb-1 text-sm font-medium">{p.name}</div>
                    <div className="mb-2 text-xs text-muted">{p.description}</div>
                    <div className="flex flex-wrap gap-1">
                      {p.models.map((m) => (
                        <span
                          key={m}
                          className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
              {provider && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={`Enter your ${providers.find((p) => p.id === provider)?.name} API key`}
                    className="w-full rounded-lg border border-border bg-[#0a0a0a] px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                  />
                  <p className="mt-2 text-xs text-muted">
                    Your API key is stored locally and never sent to our servers.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Channel */}
          {currentStep === 2 && (
            <div>
              <h2 className="mb-1 text-lg font-bold">Choose Messaging Channel</h2>
              <p className="mb-6 text-sm text-muted">
                Where should your agent receive and send messages?
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setChannel(ch.id)}
                    className={`rounded-xl border p-4 text-left transition-colors ${
                      channel === ch.id
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-white/20"
                    }`}
                  >
                    <div className="mb-1 text-sm font-medium">{ch.name}</div>
                    <div className="text-xs text-muted">{ch.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Agent Identity */}
          {currentStep === 3 && (
            <div>
              <h2 className="mb-1 text-lg font-bold">Name Your Agent</h2>
              <p className="mb-6 text-sm text-muted">
                Give your agent a name and personality. This writes the SOUL.md file.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="e.g. Support Bot, Research Assistant"
                    className="w-full rounded-lg border border-border bg-[#0a0a0a] px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Personality (optional)
                  </label>
                  <textarea
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    rows={4}
                    placeholder="Describe how your agent should behave. e.g. 'You are a friendly customer support agent. Be concise, helpful, and always offer to escalate complex issues.'"
                    className="w-full resize-none rounded-lg border border-border bg-[#0a0a0a] px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Skills */}
          {currentStep === 4 && (
            <div>
              <h2 className="mb-1 text-lg font-bold">Pick Starter Skills</h2>
              <p className="mb-6 text-sm text-muted">
                Choose the capabilities your agent starts with. You can add more later.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {starterSkills.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
                      selectedSkills.includes(skill.id)
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                        selectedSkills.includes(skill.id)
                          ? "border-accent bg-accent text-white"
                          : "border-muted"
                      }`}
                    >
                      {selectedSkills.includes(skill.id) && (
                        <Check className="h-3 w-3" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{skill.name}</div>
                      <div className="text-xs text-muted">{skill.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Review & Deploy */}
          {currentStep === 5 && (
            <div>
              <h2 className="mb-1 text-lg font-bold">Review & Deploy</h2>
              <p className="mb-6 text-sm text-muted">
                Review your configuration before deploying.
              </p>
              <div className="space-y-4">
                <div className="rounded-lg bg-[#0a0a0a] p-4">
                  <div className="mb-3 text-xs font-medium text-muted uppercase tracking-wider">Configuration</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Provider</span>
                      <span className="font-medium capitalize">{provider || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Channel</span>
                      <span className="font-medium capitalize">{channel || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Agent Name</span>
                      <span className="font-medium">{agentName || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Skills</span>
                      <span className="font-medium">
                        {selectedSkills.length > 0
                          ? selectedSkills.join(", ")
                          : "None"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">API Key</span>
                      <span className="font-medium">
                        {apiKey ? "••••••••" + apiKey.slice(-4) : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                {personality && (
                  <div className="rounded-lg bg-[#0a0a0a] p-4">
                    <div className="mb-2 text-xs font-medium text-muted uppercase tracking-wider">SOUL.md Preview</div>
                    <p className="text-sm text-foreground/80 whitespace-pre-wrap">{personality}</p>
                  </div>
                )}

                <button className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover">
                  <div className="flex items-center justify-center gap-2">
                    <Rocket className="h-4 w-4" />
                    Deploy Agent
                  </div>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm text-muted transition-colors hover:text-foreground disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        {currentStep < steps.length - 1 && (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-1 rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-30"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
