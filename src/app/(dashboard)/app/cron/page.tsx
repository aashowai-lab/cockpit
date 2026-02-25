"use client";

import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Play,
  Pause,
  RotateCcw,
  Bot,
  Calendar,
} from "lucide-react";
import { mockCronJobs } from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

const statusConfig = {
  success: {
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
    label: "Success",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
    label: "Warning",
  },
  failed: {
    icon: XCircle,
    color: "text-error",
    bg: "bg-error/10",
    label: "Failed",
  },
};

export default function CronPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <motion.div variants={fadeUp} className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cron Jobs</h1>
          <p className="text-sm text-muted">
            Scheduled tasks and their execution history.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-white/20 hover:text-foreground">
            <Pause className="h-4 w-4" />
            Pause All
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
            <Play className="h-4 w-4" />
            Run All
          </button>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div variants={fadeUp} className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-xs text-muted">Total Jobs</div>
          <div className="text-2xl font-bold">{mockCronJobs.length}</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-xs text-muted">Healthy</div>
          <div className="text-2xl font-bold text-success">
            {mockCronJobs.filter((j) => j.status === "success").length}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-xs text-muted">Warnings</div>
          <div className="text-2xl font-bold text-warning">
            {mockCronJobs.filter((j) => j.status === "warning").length}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-xs text-muted">Failed</div>
          <div className="text-2xl font-bold text-error">
            {mockCronJobs.filter((j) => j.status === "failed").length}
          </div>
        </div>
      </motion.div>

      {/* Job List */}
      <motion.div variants={fadeUp} className="space-y-3">
        {mockCronJobs.map((job) => {
          const config = statusConfig[job.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={job.id}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-card-hover"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg ${config.bg}`}
                  >
                    <StatusIcon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{job.name}</div>
                    <div className="mt-0.5 text-xs text-muted">
                      {job.description}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 font-mono">
                        <Clock className="h-3 w-3" />
                        {job.schedule}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bot className="h-3 w-3" />
                        {job.agent}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="rounded-lg p-2 text-muted transition-colors hover:bg-white/5 hover:text-foreground">
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-2 text-muted transition-colors hover:bg-white/5 hover:text-foreground">
                    <Play className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3 flex gap-6 border-t border-border pt-3 text-xs text-muted">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  Last run: <span className="text-foreground/70">{job.lastRun}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  Next run: <span className="text-foreground/70">{job.nextRun}</span>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
