"use client";

import { motion } from "framer-motion";
import {
  Puzzle,
  Search,
  ToggleLeft,
  ToggleRight,
  Bot,
  Package,
  ExternalLink,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { mockSkills } from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function SkillsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "enabled" | "disabled">("all");
  const [skills, setSkills] = useState(mockSkills);

  const filteredSkills = skills.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "enabled" && s.enabled) ||
      (filter === "disabled" && !s.enabled);
    return matchesSearch && matchesFilter;
  });

  const toggleSkill = (id: string) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-2xl font-bold">Skills</h1>
        <p className="text-sm text-muted">
          Installed skills and capabilities for your agents.
        </p>
      </motion.div>

      {/* Summary */}
      <motion.div variants={fadeUp} className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-xs text-muted">Total Skills</div>
          <div className="text-2xl font-bold">{skills.length}</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-xs text-muted">Enabled</div>
          <div className="text-2xl font-bold text-success">
            {skills.filter((s) => s.enabled).length}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-xs text-muted">Disabled</div>
          <div className="text-2xl font-bold text-muted">
            {skills.filter((s) => !s.enabled).length}
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeUp} className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-4 text-sm placeholder:text-muted/50 focus:border-accent focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "enabled", "disabled"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:bg-white/5"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className={`rounded-xl border bg-card p-5 transition-colors ${
              skill.enabled ? "border-border" : "border-border opacity-60"
            } hover:bg-card-hover`}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                  <Puzzle className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-semibold font-mono">
                    {skill.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      v{skill.version}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      {skill.source}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleSkill(skill.id)}
                className="transition-colors"
              >
                {skill.enabled ? (
                  <ToggleRight className="h-6 w-6 text-accent" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-muted" />
                )}
              </button>
            </div>

            <p className="mb-3 text-sm text-muted">{skill.description}</p>

            {skill.agents.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-muted">
                <Bot className="h-3 w-3" />
                <span>
                  Used by:{" "}
                  {skill.agents.map((a, i) => (
                    <span key={a}>
                      <span className="text-foreground/70">{a}</span>
                      {i < skill.agents.length - 1 && ", "}
                    </span>
                  ))}
                </span>
              </div>
            )}

            {skill.source === "clawhub" && (
              <div className="mt-3 border-t border-border pt-3">
                <button className="flex items-center gap-1 text-xs text-accent hover:underline">
                  <ExternalLink className="h-3 w-3" />
                  View on ClawHub
                </button>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
