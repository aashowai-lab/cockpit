"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layout,
  LayoutDashboard,
  Wand2,
  Bot,
  Bug,
  Brain,
  Clock,
  Puzzle,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/app", label: "Overview", icon: LayoutDashboard },
  { href: "/app/setup", label: "Setup Wizard", icon: Wand2 },
  { href: "/app/agents", label: "Agents", icon: Bot },
  { href: "/app/debug", label: "Debug", icon: Bug },
  { href: "/app/memory", label: "Memory", icon: Brain },
  { href: "/app/cron", label: "Cron Jobs", icon: Clock },
  { href: "/app/skills", label: "Skills", icon: Puzzle },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex shrink-0 flex-col border-r border-border bg-[#0d0d1a]"
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border px-4">
          <Link href="/app" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
              <Layout className="h-4 w-4 text-white" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-base font-semibold whitespace-nowrap"
                >
                  Cockpit
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/app" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-white/5 hover:text-foreground"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Gateway Status */}
        <div className="border-t border-border p-3">
          <div
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <Activity className="h-4 w-4 shrink-0 text-success" />
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  <div className="text-xs font-medium">Gateway</div>
                  <div className="text-xs text-success">Connected</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-10 items-center justify-center border-t border-border text-muted transition-colors hover:text-foreground"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
