import { AppLayout } from "@/components/AppLayout";
import { TaskCard } from "@/components/TaskCard";
import { mockTasks, getTasksByStatus } from "@/data/mockTasks";
import { TaskStatus } from "@/types/task";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const columns: { status: TaskStatus; title: string; dotClass: string }[] = [
  { status: "todo", title: "To Do", dotClass: "bg-muted-foreground" },
  { status: "in-progress", title: "In Progress", dotClass: "bg-warning" },
  { status: "done", title: "Done", dotClass: "bg-success" },
];

const BoardPage = () => {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="gradient-text">Board</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Kanban-style task management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 min-h-[60vh]">
          {columns.map((col, ci) => {
            const tasks = getTasksByStatus(col.status);
            return (
              <motion.div
                key={col.status}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 px-1">
                  <div className={cn("w-2.5 h-2.5 rounded-full", col.dotClass)} />
                  <span className="font-mono text-sm font-semibold text-foreground">{col.title}</span>
                  <span className="ml-auto text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                    {tasks.length}
                  </span>
                </div>
                <div className="space-y-2 p-2 rounded-xl bg-secondary/30 border border-border/30 min-h-[200px]">
                  {tasks.map((task, i) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: ci * 0.1 + i * 0.05 }}
                    >
                      <TaskCard task={task} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default BoardPage;
