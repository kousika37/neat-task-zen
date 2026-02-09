import { Task, TaskPriority } from "@/types/task";
import { cn } from "@/lib/utils";
import { Calendar, Flag } from "lucide-react";
import { format } from "date-fns";

const priorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  urgent: { label: "Urgent", className: "bg-destructive/15 text-destructive border-destructive/30" },
  high: { label: "High", className: "bg-warning/15 text-warning border-warning/30" },
  medium: { label: "Medium", className: "bg-primary/15 text-primary border-primary/30" },
  low: { label: "Low", className: "bg-muted text-muted-foreground border-border" },
};

export function TaskCard({ task }: { task: Task }) {
  const priority = priorityConfig[task.priority];

  return (
    <div className="glass-card-hover p-4 space-y-3 group cursor-pointer">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
          {task.title}
        </h4>
        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium border flex-shrink-0", priority.className)}>
          {priority.label}
        </span>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">
          {task.category}
        </span>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span className="text-[10px]">{format(new Date(task.dueDate), "MMM d")}</span>
        </div>
      </div>
    </div>
  );
}
