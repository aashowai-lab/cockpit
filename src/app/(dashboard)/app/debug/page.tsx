"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Wifi,
  WifiOff,
  Server,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Clock,
  Cpu,
  HardDrive,
} from "lucide-react";
import { mockHealthCheck } from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

function formatUptime(seconds: number) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
}

const statusIcon = {
  connected: <CheckCircle2 className="h-4 w-4 text-success" />,
  reachable: <CheckCircle2 className="h-4 w-4 text-success" />,
  error: <XCircle className="h-4 w-4 text-error" />,
  unreachable: <XCircle className="h-4 w-4 text-error" />,
};

const levelColor = {
  error: "text-error",
  warning: "text-warning",
  info: "text-accent",
};

const levelBg = {
  error: "bg-error/10",
  warning: "bg-warning/10",
  info: "bg-accent/10",
};

export default function DebugPage() {
  const health = mockHealthCheck;

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <motion.div variants={fadeUp} className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Debug</h1>
          <p className="text-sm text-muted">
            System health check and diagnostics.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-white/20 hover:text-foreground">
          <RefreshCw className="h-4 w-4" />
          Refresh All
        </button>
      </motion.div>

      {/* Gateway Status */}
      <motion.div
        variants={fadeUp}
        className="mb-6 rounded-xl border border-border bg-card p-6"
      >
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
          <Server className="h-4 w-4 text-accent" />
          Gateway Status
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <div className="rounded-lg bg-[#0a0a0a] p-3">
            <div className="mb-1 text-xs text-muted">Status</div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span className="text-sm font-medium capitalize">
                {health.gateway.status}
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-[#0a0a0a] p-3">
            <div className="mb-1 flex items-center gap-1 text-xs text-muted">
              <Clock className="h-3 w-3" />
              Uptime
            </div>
            <span className="text-sm font-medium">
              {formatUptime(health.gateway.uptime)}
            </span>
          </div>
          <div className="rounded-lg bg-[#0a0a0a] p-3">
            <div className="mb-1 text-xs text-muted">Version</div>
            <span className="text-sm font-medium font-mono">
              v{health.gateway.version}
            </span>
          </div>
          <div className="rounded-lg bg-[#0a0a0a] p-3">
            <div className="mb-1 flex items-center gap-1 text-xs text-muted">
              <Cpu className="h-3 w-3" />
              PID
            </div>
            <span className="text-sm font-medium font-mono">
              {health.gateway.pid}
            </span>
          </div>
          <div className="rounded-lg bg-[#0a0a0a] p-3">
            <div className="mb-1 flex items-center gap-1 text-xs text-muted">
              <HardDrive className="h-3 w-3" />
              Memory
            </div>
            <span className="text-sm font-medium">
              {health.gateway.memory}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Channel Connectivity */}
        <motion.div
          variants={fadeUp}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Wifi className="h-4 w-4 text-accent" />
              Channel Connectivity
            </div>
            <button className="text-xs text-accent hover:underline">
              Probe All
            </button>
          </div>
          <div className="space-y-3">
            {health.channels.map((ch) => (
              <div
                key={ch.name}
                className="flex items-center justify-between rounded-lg bg-[#0a0a0a] p-3"
              >
                <div className="flex items-center gap-3">
                  {statusIcon[ch.status]}
                  <div>
                    <div className="text-sm font-medium">{ch.name}</div>
                    {ch.error && (
                      <div className="text-xs text-error">{ch.error}</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-muted">
                    {ch.latency}
                  </div>
                  <div className="text-xs text-muted">{ch.lastPing}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Model Reachability */}
        <motion.div
          variants={fadeUp}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Activity className="h-4 w-4 text-accent" />
              Model Reachability
            </div>
            <button className="text-xs text-accent hover:underline">
              Test All
            </button>
          </div>
          <div className="space-y-3">
            {health.models.map((model) => (
              <div
                key={model.model}
                className="flex items-center justify-between rounded-lg bg-[#0a0a0a] p-3"
              >
                <div className="flex items-center gap-3">
                  {statusIcon[model.status]}
                  <div>
                    <div className="text-sm font-medium">{model.model}</div>
                    <div className="text-xs text-muted">{model.provider}</div>
                    {model.error && (
                      <div className="text-xs text-error">{model.error}</div>
                    )}
                  </div>
                </div>
                <div className="text-xs font-mono text-muted">
                  {model.latency}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Errors */}
      <motion.div
        variants={fadeUp}
        className="mt-6 rounded-xl border border-border bg-card p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <AlertTriangle className="h-4 w-4 text-warning" />
            Recent Errors & Warnings
          </div>
          <span className="text-xs text-muted">
            Last {health.errors.length} entries
          </span>
        </div>
        <div className="space-y-2">
          {health.errors.map((err, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg bg-[#0a0a0a] p-3"
            >
              <div
                className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium uppercase ${
                  levelBg[err.level]
                } ${levelColor[err.level]}`}
              >
                {err.level}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm">{err.message}</div>
                <div className="mt-1 flex gap-3 text-xs text-muted">
                  <span>{err.time}</span>
                  <span className="font-mono">{err.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={fadeUp}
        className="mt-6 rounded-xl border border-border bg-card p-6"
      >
        <div className="mb-4 text-sm font-semibold">Quick Fixes</div>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Restart Gateway", icon: RefreshCw },
            { label: "Re-auth WhatsApp", icon: WifiOff },
            { label: "Clear Stuck Sessions", icon: XCircle },
            { label: "Refresh API Keys", icon: Activity },
          ].map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm transition-colors hover:border-accent/30 hover:bg-accent/5 hover:text-accent"
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
