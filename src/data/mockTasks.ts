import { Task, TaskPriority, TaskStatus } from "@/types/task";

const now = new Date();
const day = (offset: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() + offset);
  return d.toISOString();
};

export const mockTasks: Task[] = [
  { id: "1", title: "Design new landing page", description: "Create wireframes and high-fidelity mockups for the product landing page", status: "in-progress", priority: "high", category: "Design", dueDate: day(2), createdAt: day(-5) },
  { id: "2", title: "Set up CI/CD pipeline", description: "Configure GitHub Actions for automated testing and deployment", status: "todo", priority: "high", category: "DevOps", dueDate: day(5), createdAt: day(-3) },
  { id: "3", title: "Write API documentation", description: "Document all REST endpoints with examples", status: "todo", priority: "medium", category: "Backend", dueDate: day(7), createdAt: day(-2) },
  { id: "4", title: "Fix login bug on mobile", description: "Users report being logged out randomly on iOS Safari", status: "in-progress", priority: "urgent", category: "Bug Fix", dueDate: day(1), createdAt: day(-7) },
  { id: "5", title: "Implement dark mode", description: "Add theme toggle and dark color scheme", status: "done", priority: "medium", category: "Frontend", dueDate: day(-1), createdAt: day(-10) },
  { id: "6", title: "Database migration script", description: "Migrate user data from v1 to v2 schema", status: "todo", priority: "high", category: "Backend", dueDate: day(3), createdAt: day(-4) },
  { id: "7", title: "User onboarding flow", description: "Design and implement the new user onboarding experience", status: "in-progress", priority: "medium", category: "Frontend", dueDate: day(4), createdAt: day(-6) },
  { id: "8", title: "Performance audit", description: "Run Lighthouse and optimize Core Web Vitals", status: "todo", priority: "low", category: "DevOps", dueDate: day(10), createdAt: day(-1) },
  { id: "9", title: "Update privacy policy", description: "Review and update for GDPR compliance", status: "done", priority: "medium", category: "Legal", dueDate: day(-2), createdAt: day(-15) },
  { id: "10", title: "Integrate payment gateway", description: "Set up Stripe for subscription billing", status: "todo", priority: "urgent", category: "Backend", dueDate: day(2), createdAt: day(-8) },
  { id: "11", title: "A/B test signup button", description: "Test green vs blue CTA button conversion", status: "done", priority: "low", category: "Design", dueDate: day(-3), createdAt: day(-12) },
  { id: "12", title: "Refactor auth module", description: "Clean up authentication logic and add refresh tokens", status: "todo", priority: "medium", category: "Backend", dueDate: day(6), createdAt: day(-2) },
];

export const getTasksByStatus = (status: TaskStatus) => mockTasks.filter(t => t.status === status);
export const getTasksByPriority = (priority: TaskPriority) => mockTasks.filter(t => t.priority === priority);
