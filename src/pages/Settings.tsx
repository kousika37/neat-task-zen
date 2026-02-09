import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { User, Bell, Palette, Shield, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
  { id: "integrations", label: "Integrations", icon: Globe },
];

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="gradient-text">Settings</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-48 flex lg:flex-col gap-1 overflow-x-auto">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all whitespace-nowrap",
                  activeSection === s.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <s.icon className="w-4 h-4" />
                {s.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 glass-card p-6 space-y-6"
          >
            {activeSection === "profile" && (
              <div className="space-y-5">
                <h3 className="font-mono text-sm font-semibold">Profile Settings</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-mono font-bold text-lg">
                    JD
                  </div>
                  <div>
                    <p className="font-medium text-foreground">John Doe</p>
                    <p className="text-sm text-muted-foreground">john@example.com</p>
                  </div>
                </div>
                {[{ label: "Full Name", value: "John Doe" }, { label: "Email", value: "john@example.com" }, { label: "Role", value: "Product Manager" }].map((field) => (
                  <div key={field.label} className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{field.label}</label>
                    <input
                      type="text"
                      defaultValue={field.value}
                      className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                ))}
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="space-y-5">
                <h3 className="font-mono text-sm font-semibold">Notification Preferences</h3>
                {["Email notifications", "Push notifications", "Weekly digest", "Task reminders", "Team mentions"].map((item) => (
                  <div key={item} className="flex items-center justify-between py-2">
                    <span className="text-sm text-foreground">{item}</span>
                    <div className="w-10 h-5 rounded-full bg-primary/20 relative cursor-pointer group">
                      <div className="w-4 h-4 rounded-full bg-primary absolute top-0.5 left-0.5 group-hover:shadow-[0_0_10px_hsl(var(--glow-strong))] transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "appearance" && (
              <div className="space-y-5">
                <h3 className="font-mono text-sm font-semibold">Appearance</h3>
                <p className="text-sm text-muted-foreground">Customize how TaskFlow looks and feels.</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-card-hover p-4 text-center space-y-2 border-primary/30 border">
                    <div className="w-full h-16 rounded-md bg-background border border-border" />
                    <span className="text-xs font-medium text-primary">Dark (Active)</span>
                  </div>
                  <div className="glass-card-hover p-4 text-center space-y-2 opacity-50">
                    <div className="w-full h-16 rounded-md bg-foreground/90" />
                    <span className="text-xs text-muted-foreground">Light</span>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-5">
                <h3 className="font-mono text-sm font-semibold">Security</h3>
                <div className="space-y-3">
                  {["Change password", "Two-factor authentication", "Active sessions", "API tokens"].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer">
                      <span className="text-sm text-foreground">{item}</span>
                      <span className="text-xs text-muted-foreground">→</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "integrations" && (
              <div className="space-y-5">
                <h3 className="font-mono text-sm font-semibold">Integrations</h3>
                {["GitHub", "Slack", "Figma", "Jira"].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-mono font-bold text-muted-foreground">
                        {item[0]}
                      </div>
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                    <button className="text-xs px-3 py-1 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
