import type { Profile } from "@/backend.d";
import { Avatar } from "@/components/common/Avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Copy,
  Link as LinkIcon,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

/* ── Hooks ─────────────────────────────────────────────────── */

function useInviteProfile(username: string) {
  const { actor, isReady } = useBackend();
  return useQuery<Profile | null>({
    queryKey: ["inviteProfile", username],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getInviteProfile(username);
    },
    enabled: isReady && !!username,
    staleTime: 60_000,
  });
}

function useContacts() {
  const { actor, isReady } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery<Profile[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContacts();
    },
    enabled: isReady && isAuthenticated,
    staleTime: 30_000,
  });
}

function useAddContact() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (username: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.addContact(username);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

function useMyInviteLink() {
  const { actor, isReady } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery<string | null>({
    queryKey: ["myUsername"],
    queryFn: async () => {
      if (!actor) return null;
      const username = await actor.getUsername();
      if (!username) return null;
      return `${window.location.origin}/add/${username}`;
    },
    enabled: isReady && isAuthenticated,
    staleTime: 300_000,
  });
}

/* ── Skeleton ───────────────────────────────────────────────── */

function InvitePageSkeleton() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm space-y-4">
        <div className="bg-card border border-border rounded-2xl shadow-elevated overflow-hidden">
          <Skeleton className="h-28 w-full rounded-none" />
          <div className="px-6 pb-6 -mt-10">
            <Skeleton className="w-20 h-20 rounded-full mb-4 border-4 border-card" />
            <Skeleton className="h-6 w-40 mb-2 rounded" />
            <Skeleton className="h-4 w-56 mb-4 rounded" />
            <Skeleton className="h-4 w-32 mb-6 rounded" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Not Found ──────────────────────────────────────────────── */

function UserNotFound({ username }: { username: string }) {
  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center"
      data-ocid="invite-not-found"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-5">
        <UserPlus className="w-7 h-7 text-muted-foreground" />
      </div>
      <h1 className="font-display font-bold text-2xl text-foreground mb-2">
        User not found
      </h1>
      <p className="text-muted-foreground text-sm mb-7 max-w-xs">
        The invite link for{" "}
        <span className="font-semibold text-foreground">@{username}</span> is no
        longer valid or this account doesn't exist.
      </p>
      <Link to="/welcome">
        <Button
          variant="outline"
          className="gap-2"
          data-ocid="invite-not-found-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Go to SocialChain
        </Button>
      </Link>
    </div>
  );
}

/* ── Share Section ──────────────────────────────────────────── */

function ShareSection({ inviteLink }: { inviteLink: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true);
      toast.success("Invite link copied!");
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div
      className="bg-card border border-border rounded-2xl p-5 shadow-card"
      data-ocid="invite-share-section"
    >
      <p className="text-sm font-semibold text-foreground mb-1">
        Share your own invite link
      </p>
      <p className="text-xs text-muted-foreground mb-3">
        Let friends find you on SocialChain instantly
      </p>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-muted/60 rounded-lg px-3 py-2 min-w-0">
          <p className="text-xs text-muted-foreground truncate font-mono">
            {inviteLink}
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          className="shrink-0 gap-1.5"
          data-ocid="invite-copy-link-btn"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────────── */

export function InvitePage() {
  const { username } = useParams({ from: "/add/$username" });
  const { isAuthenticated, login } = useAuth();

  const { data: profile, isLoading: profileLoading } =
    useInviteProfile(username);
  const { data: contacts, isLoading: contactsLoading } = useContacts();
  const addContact = useAddContact();
  const { data: myInviteLink } = useMyInviteLink();

  const isLoading = profileLoading || (isAuthenticated && contactsLoading);

  const displayName = profile?.displayName ?? username;
  const bio = profile?.bio ?? "";
  const joinDate = profile?.createdAt
    ? new Date(Number(profile.createdAt / 1_000_000n)).toLocaleDateString(
        "en-US",
        { month: "long", year: "numeric" },
      )
    : null;

  const isAlreadyContact =
    isAuthenticated &&
    contacts !== undefined &&
    contacts.some((c) => c.username === username);

  function handleAddContact() {
    if (!isAuthenticated) {
      login();
      return;
    }
    addContact.mutate(username, {
      onSuccess: () => {
        toast.success(`${displayName} added to your contacts!`);
      },
      onError: (err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Failed to add contact";
        toast.error(message);
      },
    });
  }

  if (isLoading) return <InvitePageSkeleton />;
  if (profile === null || profile === undefined)
    return <UserNotFound username={username} />;

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-10"
      data-ocid="invite-page"
    >
      {/* Logo header */}
      <Link
        to="/welcome"
        className="flex items-center gap-2 mb-8 hover:opacity-80 transition-smooth"
        data-ocid="invite-logo"
      >
        <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center shadow-subtle">
          <LinkIcon className="w-4 h-4 text-white" />
        </div>
        <span className="font-display font-bold text-xl text-foreground tracking-tight">
          Social<span className="text-primary">Chain</span>
        </span>
      </Link>

      <div className="w-full max-w-sm space-y-4">
        {/* Profile card */}
        <div className="bg-card border border-border rounded-2xl shadow-elevated overflow-hidden">
          {/* Cover */}
          <div className="h-28 gradient-hero relative">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.9_0.1_60)_0%,_transparent_70%)]" />
          </div>

          {/* Profile content */}
          <div className="px-5 pb-6 -mt-12">
            {/* Avatar */}
            <div className="mb-3">
              <Avatar
                src={profile.avatarUrl}
                name={displayName}
                size="xl"
                className="border-4 border-card shadow-card"
              />
            </div>

            <div className="flex items-start justify-between mb-3">
              <div className="min-w-0 flex-1">
                <h1 className="font-display font-bold text-xl text-foreground leading-tight truncate">
                  {displayName}
                </h1>
                {profile.username && (
                  <p className="text-sm text-muted-foreground">
                    @{profile.username}
                  </p>
                )}
              </div>
              {isAlreadyContact && (
                <Badge
                  variant="secondary"
                  className="shrink-0 ml-2 mt-1 gap-1"
                  data-ocid="invite-connected-badge"
                >
                  <UserCheck className="w-3 h-3" />
                  Connected
                </Badge>
              )}
            </div>

            {bio && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3 leading-relaxed">
                {bio}
              </p>
            )}

            {joinDate && (
              <p className="text-xs text-muted-foreground mb-5">
                Member since {joinDate}
              </p>
            )}

            {/* Invite message */}
            <div className="bg-muted/50 border border-border/60 rounded-xl px-4 py-3 mb-5">
              <p className="text-sm text-foreground text-center leading-relaxed">
                <span className="font-semibold text-primary">
                  {displayName}
                </span>{" "}
                invites you to connect on SocialChain — where social meets
                crypto.
              </p>
            </div>

            {/* CTA */}
            {isAlreadyContact ? (
              <div className="space-y-2">
                <div
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-muted/60 border border-border text-sm font-medium text-muted-foreground"
                  data-ocid="invite-already-connected"
                >
                  <UserCheck className="w-4 h-4 text-green-500" />
                  Already connected
                </div>
                {profile.id && (
                  <Link to="/profile/$id" params={{ id: profile.id.toText() }}>
                    <Button
                      variant="outline"
                      className="w-full"
                      data-ocid="invite-view-profile-btn"
                    >
                      View Profile
                    </Button>
                  </Link>
                )}
              </div>
            ) : isAuthenticated ? (
              <Button
                className="w-full gradient-hero text-white border-0 font-semibold shadow-subtle"
                onClick={handleAddContact}
                disabled={addContact.isPending}
                data-ocid="invite-add-contact-btn"
              >
                {addContact.isPending ? (
                  <>
                    <span className="w-4 h-4 mr-2 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Adding…
                  </>
                ) : addContact.isSuccess ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Added!
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add {displayName} as Contact
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-3">
                <Button
                  className="w-full gradient-hero text-white border-0 font-semibold shadow-subtle"
                  onClick={login}
                  data-ocid="invite-signin-btn"
                >
                  Sign in to add {displayName} as a contact
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Uses{" "}
                  <span className="font-semibold text-foreground">
                    Internet Identity
                  </span>{" "}
                  — secure &amp; private
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Share own link (authenticated with username) */}
        {isAuthenticated && myInviteLink && (
          <ShareSection inviteLink={myInviteLink} />
        )}

        {/* Footer */}
        <p className="text-xs text-muted-foreground text-center pt-2">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
