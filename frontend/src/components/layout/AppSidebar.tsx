import { Home, MessageCircle, Bookmark, Settings, User, Moon, Sun, LogOut, Stethoscope } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: MessageCircle, label: "Ask Question", path: "/chat" },
  { icon: Bookmark, label: "Saved Resources", path: "/saved" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: User, label: "Profile", path: "/profile" },
];

interface AppSidebarProps {
  onLogout: () => void;
}

export function AppSidebar({ onLogout }: AppSidebarProps) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">MediChat</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={toggleTheme}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {isDark ? "Light Mode" : "Dark Mode"}
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
