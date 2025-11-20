import { Calendar, Home, Building2, Package, Users, BarChart3, Menu } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
  { name: "Tổng quan", href: "/", icon: Home },
  { name: "Đặt lịch", href: "/bookings", icon: Calendar },
  { name: "Cơ sở vật chất", href: "/facilities", icon: Building2 },
  { name: "Tài sản", href: "/assets", icon: Package },
  { name: "Người dùng", href: "/users", icon: Users },
  { name: "Báo cáo", href: "/reports", icon: BarChart3 },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden",
          collapsed && "hidden"
        )}
        onClick={() => setCollapsed(true)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
          collapsed ? "w-0 lg:w-16" : "w-64",
          "lg:translate-x-0",
          collapsed && "lg:translate-x-0 -translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-sidebar-foreground">
                  FMS Admin
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="text-sidebar-foreground hover:text-sidebar-primary"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === "/"}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                  "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "transition-colors duration-200"
                )}
                activeClassName="bg-sidebar-accent text-sidebar-primary"
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          {!collapsed && (
            <div className="border-t border-sidebar-border p-4">
              <div className="text-xs text-sidebar-foreground/60">
                © 2024 Facility Management
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-40 lg:hidden"
        onClick={() => setCollapsed(false)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
}
