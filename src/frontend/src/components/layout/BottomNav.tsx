import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Home, Plus, User, Wallet } from "lucide-react";

interface BottomNavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  to: string;
  matchPath?: string;
}

const BOTTOM_NAV: BottomNavItem[] = [
  { label: "Feed", icon: Home, to: "/feed" },
  { label: "Discover", icon: Compass, to: "/explore" },
  { label: "Wallet", icon: Wallet, to: "/wallet" },
  { label: "Profile", icon: User, to: "/profile/me", matchPath: "/profile" },
];

interface BottomNavProps {
  onNewPost?: () => void;
}

export function BottomNav({ onNewPost }: BottomNavProps) {
  const { isAuthenticated } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  if (!isAuthenticated) return null;

  return (
    <nav
      data-ocid="bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-card border-t border-border flex items-center shadow-elevated"
      aria-label="Bottom navigation"
    >
      {BOTTOM_NAV.slice(0, 2).map((item) => {
        const match = item.matchPath ?? item.to;
        const isActive =
          currentPath === item.to ||
          (match !== "/feed" && currentPath.startsWith(match));
        return (
          <Link
            key={item.to}
            to={item.to}
            data-ocid={`bottom-nav-${item.label.toLowerCase()}`}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1"
            aria-label={item.label}
          >
            <div
              className={cn(
                "p-1.5 rounded-xl transition-smooth",
                isActive && "bg-primary/15",
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-smooth",
                  isActive
                    ? "text-primary stroke-[2.5px]"
                    : "text-muted-foreground",
                )}
              />
            </div>
            <span
              className={cn(
                "text-[10px] font-medium transition-smooth",
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}

      {/* Center new post button */}
      <div className="flex-1 flex items-center justify-center -mt-5">
        <button
          type="button"
          onClick={onNewPost}
          data-ocid="bottom-nav-new-post"
          aria-label="Create new post"
          className="flex items-center justify-center w-12 h-12 rounded-full gradient-hero shadow-elevated hover:opacity-90 active:scale-95 transition-smooth border-2 border-card"
        >
          <Plus className="w-6 h-6 text-primary-foreground" />
        </button>
      </div>

      {BOTTOM_NAV.slice(2).map((item) => {
        const match = item.matchPath ?? item.to;
        const isActive =
          currentPath === item.to ||
          (match !== "/feed" && currentPath.startsWith(match));
        return (
          <Link
            key={item.to}
            to={item.to}
            data-ocid={`bottom-nav-${item.label.toLowerCase()}`}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1"
            aria-label={item.label}
          >
            <div
              className={cn(
                "p-1.5 rounded-xl transition-smooth",
                isActive &&
                  (item.label === "Wallet" ? "bg-accent/15" : "bg-primary/15"),
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-smooth",
                  isActive
                    ? item.label === "Wallet"
                      ? "text-accent stroke-[2.5px]"
                      : "text-primary stroke-[2.5px]"
                    : "text-muted-foreground",
                )}
              />
            </div>
            <span
              className={cn(
                "text-[10px] font-medium transition-smooth",
                isActive
                  ? item.label === "Wallet"
                    ? "text-accent font-semibold"
                    : "text-primary font-semibold"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
