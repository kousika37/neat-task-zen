import { AppLayout } from "@/components/AppLayout";
import { mockTasks } from "@/data/mockTasks";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, getDay, isSameMonth, isToday } from "date-fns";
import { cn } from "@/lib/utils";

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Pad start
  const startPad = getDay(monthStart);
  const paddedDays = [...Array(startPad).fill(null), ...days];

  const getTasksForDay = (date: Date) =>
    mockTasks.filter((t) => isSameDay(new Date(t.dueDate), date));

  const priorityDot: Record<string, string> = {
    urgent: "bg-destructive",
    high: "bg-warning",
    medium: "bg-primary",
    low: "bg-muted-foreground",
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="gradient-text">Calendar</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Task deadlines at a glance</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-sm font-semibold min-w-[140px] text-center">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4"
        >
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-center text-[10px] font-mono text-muted-foreground uppercase tracking-wider py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {paddedDays.map((day, i) => {
              if (!day) return <div key={`pad-${i}`} className="aspect-square" />;
              const tasks = getTasksForDay(day);
              const today = isToday(day);
              return (
                <div
                  key={i}
                  className={cn(
                    "aspect-square p-1.5 rounded-lg border border-transparent hover:border-border/50 transition-colors cursor-pointer relative",
                    today && "border-primary/40 bg-primary/5"
                  )}
                >
                  <span
                    className={cn(
                      "text-xs font-mono",
                      today ? "text-primary font-bold" : "text-muted-foreground"
                    )}
                  >
                    {format(day, "d")}
                  </span>
                  <div className="flex gap-0.5 mt-1 flex-wrap">
                    {tasks.slice(0, 3).map((t) => (
                      <div
                        key={t.id}
                        className={cn("w-1.5 h-1.5 rounded-full", priorityDot[t.priority])}
                        title={t.title}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming tasks */}
        <div className="space-y-3">
          <h3 className="font-mono text-sm font-semibold">Upcoming Deadlines</h3>
          <div className="space-y-2">
            {mockTasks
              .filter((t) => new Date(t.dueDate) >= new Date() && t.status !== "done")
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .slice(0, 5)
              .map((task) => (
                <div key={task.id} className="glass-card-hover p-3 flex items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full flex-shrink-0", priorityDot[task.priority])} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                    <p className="text-[10px] text-muted-foreground">{task.category}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground flex-shrink-0">
                    {format(new Date(task.dueDate), "MMM d")}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CalendarPage;
