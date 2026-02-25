"use client";

import { motion } from "framer-motion";
import {
  Bot,
  MessageSquare,
  Zap,
  DollarSign,
  Brain,
  Filter,
  Search,
} from "lucide-react";
import { useState } from "react";
import { mockAgents, mockSessions } from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

const statusColor = {
  online: "bg-success",
  idle: "bg-warning",
  error: "bg-error",
};

const statusBadge = {
  online: "bg-success/10 text-success",
  idle: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
};

type TabType = "agents" | "sessions";

export default function AgentsPage() {
  const [tab, setTab] = useState<TabType>("agents");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredAgents = mockAgents.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredSessions = mockSessions.filter((s) =>
    s.agentName.toLowerCase().includes(search.toLowerCase()) ||
    s.user.toLowerCase().includes(search.toLowerCase()) ||
    s.preview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-2xl font-bold">Agents</h1>
        <p className="text-sm text-muted">
          Monitor agent status, sessions, and conversations.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={fadeUp} className="mb-6 flex items-center gap-6 border-b border-border">
        {(["agents", "sessions"] as TabType[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 pb-3 text-sm font-medium capitalize transition-colors ${
              tab === t
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeUp} className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={tab === "agents" ? "Search agents..." : "Search sessions..."}
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm placeholder:text-muted/50 focus:border-accent focus:outline-none"
          />
        </div>
        {tab === "agents" && (
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted" />
            {["all", "online", "idle", "error"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  statusFilter === s
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-white/5"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Content */}
      {tab === "agents" ? (
        <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-card-hover"
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Bot className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{agent.name}</div>
                    <div className="text-xs text-muted">{agent.channel}</div>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium capitalize ${
                    statusBadge[agent.status]
                  }`}
                >
                  <span className="mr-1.5 inline-block">
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        statusColor[agent.status]
                      }`}
                    />
                  </span>
                  {agent.status}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-[#0a0a0a] p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-muted">
                    <MessageSquare className="h-3 w-3" />
                    Sessions
                  </div>
                  <div className="text-lg font-semibold">{agent.sessions}</div>
                </div>
                <div className="rounded-lg bg-[#0a0a0a] p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-muted">
                    <Zap className="h-3 w-3" />
                    Tokens
                  </div>
                  <div className="text-lg font-semibold">
                    {(agent.tokensUsed / 1000).toFixed(0)}K
                  </div>
                </div>
                <div className="rounded-lg bg-[#0a0a0a] p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-muted">
                    <DollarSign className="h-3 w-3" />
                    Cost
                  </div>
                  <div className="text-lg font-semibold">
                    ${agent.costEstimate.toFixed(2)}
                  </div>
                </div>
                <div className="rounded-lg bg-[#0a0a0a] p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-muted">
                    <Brain className="h-3 w-3" />
                    Memory
                  </div>
                  <div className="text-lg font-semibold">
                    {agent.memoryFiles} files
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted">
                <span>{agent.model}</span>
                <span>Active {agent.lastActive}</span>
              </div>
            </div>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={fadeUp} className="space-y-3">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-card-hover"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">
                    {session.agentName}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      session.status === "active"
                        ? "bg-success/10 text-success"
                        : session.status === "error"
                          ? "bg-error/10 text-error"
                          : "bg-white/5 text-muted"
                    }`}
                  >
                    {session.status}
                  </span>
                </div>
                <span className="text-xs text-muted">{session.started}</span>
              </div>
              <p className="mb-3 text-sm text-muted">{session.preview}</p>
              <div className="flex items-center justify-between text-xs text-muted">
                <div className="flex gap-4">
                  <span>{session.messages} messages</span>
                  <span>{session.tokens.toLocaleString()} tokens</span>
                </div>
                <span className="font-mono">{session.user}</span>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
