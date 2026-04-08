import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useGetMyProfile } from "@/hooks/useProfile";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Link as LinkIcon, Search, Wallet } from "lucide-react";

interface HeaderProps {
  title?: string;
  onWalletOpen?: () => void;
  className?: string;
}

export function Header({ onWalletOpen, className }: HeaderProps) {
  const { isAuthenticated, principal, login } = useAuth();
  const { data: profile } = useGetMyProfile();
  const navigate = useNavigate();

  return (
    <header
      data-ocid="app-header"
      className={`fixed top-0 left-0 right-0 z-50 h-14 bg-card border-b border-border shadow-subtle flex items-center gap-3 px-4 ${className ?? ""}`}
    >
      {/* Brand */}
      <Link
        to="/feed"
        className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-smooth"
      >
        <div className="w-7 h-7 rounded-lg gradient-hero flex items-center justify-center shadow-subtle">
          <LinkIcon className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-lg text-foreground tracking-tight">
          Social<span className="text-primary">Chain</span>
        </span>
      </Link>

      {/* Search (desktop) */}
      {isAuthenticated && (
        <div className="hidden sm:flex flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search SocialChain..."
              className="w-full h-9 pl-9 pr-4 rounded-full bg-muted border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="header-search"
            />
          </div>
        </div>
      )}

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        {isAuthenticated ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9 text-muted-foreground hover:text-foreground relative"
              aria-label="Notifications"
              data-ocid="header-notifications"
              onClick={() => navigate({ to: "/notifications" })}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onWalletOpen ?? (() => navigate({ to: "/wallet" }))}
              className="hidden sm:flex items-center gap-1.5 h-8 px-3 border-accent/40 text-accent hover:bg-accent/10"
              data-ocid="header-wallet-btn"
            >
              <Wallet className="w-4 h-4" />
              <span className="text-xs font-semibold">Wallet</span>
            </Button>

            <button
              type="button"
              onClick={() =>
                navigate({
                  to: "/profile/$id",
                  params: { id: principal ?? "me" },
                })
              }
              className="ml-1 focus-visible:ring-2 focus-visible:ring-ring rounded-full"
              aria-label="Profile"
              data-ocid="header-avatar"
            >
              <Avatar
                src={profile?.avatarUrl}
                name={profile?.displayName ?? principal?.slice(0, 8) ?? "Me"}
                size="sm"
              />
            </button>
          </>
        ) : (
          <Button
            onClick={login}
            size="sm"
            className="gradient-hero text-primary-foreground border-0 font-semibold shadow-subtle"
            data-ocid="header-login-btn"
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
