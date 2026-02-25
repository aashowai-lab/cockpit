"use client";

import { motion } from "framer-motion";
import {
  Bot,
  MessageSquare,
  DollarSign,
  Zap,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react";
import Link from "next/link";
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

const statusText = {
  online: "Online",
  idle: "Idle",
  error: "Error",
};

export default function OverviewPage() {
  const totalSessions = mockAgents.reduce((acc, a) => acc + a.sessions, 0);
  const totalCost = mockAgents.reduce((acc, a) => acc + a.costEstimate, 0);
  const totalTokens = mockAgents.reduce((acc, a) => acc + a.tokensUsed, 0);
  const onlineAgents = mockAgents.filter((a) => a.status === "online").length;

  const stats = [
    {
      label: "Active Agents",
      value: `${onlineAgents}/${mockAgents.length}`,
      icon: Bot,
      trend: "+1 today",
      trendUp: true,
    },
    {
      label: "Total Sessions",
      value: totalSessions.toLocaleString(),
      icon: MessageSquare,
      trend: "+23 today",
      trendUp: true,
    },
    {
      label: "Tokens Used",
      value: `${(totalTokens / 1_000_000).toFixed(1)}M`,
      icon: Zap,
      trend: "320K today",
      trendUp: false,
    },
    {
      label: "Est. Cost",
      value: `$${totalCost.toFixed(2)}`,
      icon: DollarSign,
      trend: "$2.14 today",
      trendUp: false,
    },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted">Overview of your OpenClaw agents and activity.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={fadeUp} className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-muted" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="mt-1 flex items-center gap-1 text-xs">
              {stat.trendUp ? (
                <ArrowUpRight className="h-3 w-3 text-success" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-muted" />
              )}
              <span className={stat.trendUp ? "text-success" : "text-muted"}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Agents + Recent Sessions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Agent Cards */}
        <motion.div variants={fadeUp}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Agents</h2>
            <Link
              href="/app/agents"
              className="flex items-center gap-1 text-xs text-accent hover:underline"
            >
              View all
              <TrendingUp className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockAgents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-card-hover"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Bot className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{agent.name}</div>
                    <div className="text-xs text-muted">
                      {agent.model} · {agent.channel}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-muted">{agent.lastActive}</div>
                    <div className="text-xs text-muted">
                      {agent.sessions} sessions
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        statusColor[agent.status]
                      }`}
                    />
                    <span className="text-xs text-muted">
                      {statusText[agent.status]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Sessions */}
        <motion.div variants={fadeUp}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Sessions</h2>
            <Link
              href="/app/agents"
              className="flex items-center gap-1 text-xs text-accent hover:underline"
            >
              View all
              <Activity className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockSessions.slice(0, 4).map((session) => (
              <div
                key={session.id}
                className="rounded-xl border border-border bg-card p-4 transition-colors hover:bg-card-hover"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
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
                <p className="text-xs text-muted line-clamp-1">
                  {session.preview}
                </p>
                <div className="mt-2 flex gap-4 text-xs text-muted">
                  <span>{session.messages} messages</span>
                  <span>{session.tokens.toLocaleString()} tokens</span>
                  <span>{session.user}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
