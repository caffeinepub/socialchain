import { useIsMobile } from "@/hooks/use-mobile";
import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  /** Pass a handler for creating new posts (used by FAB / sidebar button) */
  onNewPost?: () => void;
  onWalletOpen?: () => void;
  fullWidth?: boolean;
  hideBottomNav?: boolean;
}

export function Layout({
  children,
  title,
  onNewPost,
  onWalletOpen,
  fullWidth = false,
  hideBottomNav,
}: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title={title} onWalletOpen={onWalletOpen} />

      <div className="flex flex-1 w-full max-w-5xl mx-auto pt-14">
        {!isMobile && (
          <aside className="w-64 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border">
            <Sidebar onNewPost={onNewPost} />
          </aside>
        )}

        <main
          className={`flex-1 min-w-0 px-4 py-4 pb-24 md:pb-8 ${fullWidth ? "" : "max-w-2xl"}`}
          data-ocid="main-content"
        >
          {children}
        </main>
      </div>

      {(!isMobile || !hideBottomNav) && <BottomNav onNewPost={onNewPost} />}

      {/* Branding footer — desktop only */}
      <footer className="hidden md:flex items-center justify-center py-3 bg-muted/40 border-t border-border text-xs text-muted-foreground">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}

export type { LayoutProps };
