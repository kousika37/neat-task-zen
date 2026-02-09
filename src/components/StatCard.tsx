import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  glowing?: boolean;
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, glowing }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("glass-card p-5 space-y-3", glowing && "stat-glow")}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      <div>
        <span className="text-3xl font-mono font-bold text-foreground">{value}</span>
        {trend && (
          <span className={cn("ml-2 text-xs font-medium", trend.positive ? "text-success" : "text-destructive")}>
            {trend.positive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}
