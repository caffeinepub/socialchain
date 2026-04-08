import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useGetMyProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Bell, Compass, Home, PenSquare, Wallet } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", icon: Home, to: "/feed" },
  { label: "Explore", icon: Compass, to: "/explore" },
  { label: "Activity", icon: Activity, to: "/activity" },
  { label: "Notifications", icon: Bell, to: "/notifications" },
  { label: "Wallet", icon: Wallet, to: "/wallet" },
] as const;

interface SidebarProps {
  onNewPost?: () => void;
  className?: string;
}

export function Sidebar({ onNewPost, className }: SidebarProps) {
  const { isAuthenticated, principal } = useAuth();
  const { data: profile } = useGetMyProfile();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  if (!isAuthenticated) return null;

  return (
    <aside
      data-ocid="app-sidebar"
      className={cn("flex flex-col h-full py-4", className)}
    >
      <nav className="flex-1 px-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive =
            currentPath === item.to || currentPath.startsWith(`${item.to}/`);
          return (
            <Link
              key={item.to}
              to={item.to}
              data-ocid={`sidebar-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth group",
                isActive
                  ? "bg-primary/15 text-primary shadow-subtle"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 shrink-0 transition-smooth",
                  isActive ? "text-primary" : "group-hover:text-foreground",
                )}
              />
              <span>{item.label}</span>
              {item.label === "Wallet" && (
                <span className="ml-auto text-[10px] bg-accent/20 text-accent rounded px-1.5 py-0.5 font-semibold">
                  ICP
                </span>
              )}
            </Link>
          );
        })}

        {/* Profile link */}
        <Link
          to="/profile/$id"
          params={{ id: principal ?? "me" }}
          data-ocid="sidebar-nav-profile"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth",
            currentPath.startsWith("/profile")
              ? "bg-primary/15 text-primary shadow-subtle"
              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
          )}
        >
          <Avatar
            src={profile?.avatarUrl}
            name={profile?.displayName ?? principal?.slice(0, 8) ?? "Me"}
            size="sm"
          />
          <div className="min-w-0">
            <p className="truncate font-semibold text-foreground text-sm">
              {profile?.displayName ?? "My Profile"}
            </p>
          </div>
        </Link>
      </nav>

      {/* New Post button */}
      {onNewPost && (
        <div className="px-3 mt-4">
          <Button
            onClick={onNewPost}
            className="w-full gradient-hero text-primary-foreground font-semibold shadow-subtle hover:opacity-90 transition-smooth border-0"
            data-ocid="sidebar-new-post-btn"
          >
            <PenSquare className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      )}
    </aside>
  );
}
