import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { TaskCard } from "@/components/TaskCard";
import { mockTasks, getTasksByStatus } from "@/data/mockTasks";
import { ListTodo, CheckCircle2, Clock, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const todoTasks = getTasksByStatus("todo");
  const inProgressTasks = getTasksByStatus("in-progress");
  const doneTasks = getTasksByStatus("done");
  const urgentTasks = mockTasks.filter(t => t.priority === "urgent");

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-sm text-muted-foreground">Track your productivity and manage tasks efficiently.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Tasks" value={mockTasks.length} subtitle="Across all projects" icon={ListTodo} />
          <StatCard title="Completed" value={doneTasks.length} subtitle={`${Math.round((doneTasks.length / mockTasks.length) * 100)}% completion rate`} icon={CheckCircle2} trend={{ value: 12, positive: true }} />
          <StatCard title="In Progress" value={inProgressTasks.length} subtitle="Currently active" icon={Clock} glowing />
          <StatCard title="Urgent" value={urgentTasks.length} subtitle="Needs immediate attention" icon={AlertTriangle} trend={{ value: 2, positive: false }} />
        </div>

        {/* Activity Chart Placeholder + Recent Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Overview */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-semibold">Weekly Activity</h3>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-end gap-2 h-40">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-primary/30 to-primary/80 relative group"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}%
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                <span key={d} className="flex-1 text-center">{d}</span>
              ))}
            </div>
          </motion.div>

          {/* Priority Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-semibold">By Priority</h3>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {[
                { label: "Urgent", count: urgentTasks.length, color: "bg-destructive" },
                { label: "High", count: mockTasks.filter(t => t.priority === "high").length, color: "bg-warning" },
                { label: "Medium", count: mockTasks.filter(t => t.priority === "medium").length, color: "bg-primary" },
                { label: "Low", count: mockTasks.filter(t => t.priority === "low").length, color: "bg-muted-foreground" },
              ].map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-mono font-medium text-foreground">{item.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.count / mockTasks.length) * 100}%` }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="font-mono text-sm font-semibold">Recent Tasks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {mockTasks.slice(0, 6).map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Index;
