"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Search,
  FileText,
  Clock,
  ChevronRight,
  Bot,
} from "lucide-react";
import { useState } from "react";
import { mockMemoryFiles } from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function MemoryPage() {
  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const filteredFiles = mockMemoryFiles.filter(
    (f) =>
      f.path.toLowerCase().includes(search.toLowerCase()) ||
      f.agent.toLowerCase().includes(search.toLowerCase()) ||
      f.preview.toLowerCase().includes(search.toLowerCase())
  );

  const activeFile = mockMemoryFiles.find((f) => f.path === selectedFile);

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-2xl font-bold">Memory Browser</h1>
        <p className="text-sm text-muted">
          View and search your agents&apos; MEMORY.md files and daily logs.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div variants={fadeUp} className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search memory files..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-4 text-sm placeholder:text-muted/50 focus:border-accent focus:outline-none"
          />
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        {/* File List */}
        <motion.div variants={fadeUp} className="space-y-2">
          {filteredFiles.map((file) => (
            <button
              key={file.path}
              onClick={() => setSelectedFile(file.path)}
              className={`w-full rounded-xl border p-4 text-left transition-colors ${
                selectedFile === file.path
                  ? "border-accent bg-accent/5"
                  : "border-border bg-card hover:bg-card-hover"
              }`}
            >
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium font-mono">
                    {file.path.split("/").pop()}
                  </span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted" />
              </div>
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Bot className="h-3 w-3" />
                  {file.agent}
                </span>
                <span>{file.size}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {file.modified}
                </span>
              </div>
            </button>
          ))}
        </motion.div>

        {/* File Preview */}
        <motion.div variants={fadeUp}>
          {activeFile ? (
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Brain className="h-4 w-4 text-accent" />
                    {activeFile.path}
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    {activeFile.agent} · {activeFile.size} · Modified{" "}
                    {activeFile.modified}
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-[#0a0a0a] p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground/80">
                  {activeFile.preview}
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border">
              <div className="text-center">
                <Brain className="mx-auto mb-2 h-8 w-8 text-muted/30" />
                <p className="text-sm text-muted">
                  Select a memory file to preview
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
