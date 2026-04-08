import type { Profile } from "@/backend.d";
import { Avatar } from "@/components/common/Avatar";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "@tanstack/react-router";
import { Compass, Hash, Search, TrendingUp, Users, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const TRENDING_TAGS = [
  { tag: "ICP", posts: "12.4K", change: "+24%" },
  { tag: "web3social", posts: "8.1K", change: "+18%" },
  { tag: "buildonICP", posts: "5.6K", change: "+31%" },
  { tag: "crypto", posts: "44.2K", change: "+3%" },
  { tag: "photography", posts: "21.7K", change: "+7%" },
  { tag: "blockchain", posts: "38.9K", change: "+2%" },
];

function UserCard({
  profile,
  onViewProfile,
}: {
  profile: Profile;
  onViewProfile: (id: string) => void;
}) {
  const principalStr = profile.id.toString();
  return (
    <div
      className="card-elevated rounded-xl p-4 flex items-center gap-3 hover:border-border/60 transition-smooth"
      data-ocid={`user-card-${principalStr.slice(0, 8)}`}
    >
      <Avatar
        src={profile.avatarUrl}
        name={profile.displayName || profile.username || "?"}
        size="md"
      />
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-sm text-foreground truncate">
          {profile.displayName}
        </p>
        {profile.username && (
          <p className="text-xs text-muted-foreground">@{profile.username}</p>
        )}
        {profile.bio && (
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
            {profile.bio}
          </p>
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="shrink-0 text-xs border-primary/30 text-primary hover:bg-primary/10"
        onClick={() => onViewProfile(principalStr)}
        data-ocid="user-card-view-profile"
      >
        View Profile
      </Button>
    </div>
  );
}

function UserCardSkeleton() {
  return (
    <div className="card-elevated rounded-xl p-4 flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-40" />
      </div>
      <Skeleton className="h-8 w-24 shrink-0" />
    </div>
  );
}

export function ExplorePage() {
  const { actor, isReady } = useBackend();
  const { principal: selfId } = useAuth();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInput = useCallback((value: string) => {
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value.trim());
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const isSearching = searchQuery.length > 0;

  const {
    data: searchResults,
    isFetching: isSearchLoading,
    isFetched: isSearchFetched,
  } = useQuery<Profile[]>({
    queryKey: ["searchUsers", searchQuery],
    queryFn: async () => {
      if (!actor || !searchQuery) return [];
      return actor.searchUsers(searchQuery);
    },
    enabled: isReady && searchQuery.length > 0,
  });

  const { data: allUsers, isLoading: isUsersLoading } = useQuery<Profile[]>({
    queryKey: ["listUsers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUsers();
    },
    enabled: isReady && !isSearching,
  });

  const suggestedUsers = allUsers
    ?.filter((u) => u.id.toString() !== selfId)
    .slice(0, 8);

  const handleViewProfile = (id: string) => {
    navigate({ to: "/profile/$id", params: { id } });
  };

  const clearSearch = () => {
    setInputValue("");
    setSearchQuery("");
  };

  return (
    <Layout onWalletOpen={() => navigate({ to: "/wallet" })}>
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search people by name or username…"
          value={inputValue}
          onChange={(e) => handleInput(e.target.value)}
          className="pl-9 pr-9 bg-card border-border text-foreground"
          data-ocid="explore-search"
          autoComplete="off"
        />
        {inputValue && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search results */}
      {isSearching ? (
        <section>
          <h2 className="font-display font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
            <Search className="w-4 h-4" />
            {isSearchLoading ? "Searching…" : `Results for "${searchQuery}"`}
          </h2>

          {isSearchLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <UserCardSkeleton key={i} />
              ))}
            </div>
          ) : isSearchFetched &&
            (!searchResults || searchResults.length === 0) ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="explore-empty-search"
            >
              <Compass className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="font-display font-semibold text-foreground mb-1">
                No users found
              </p>
              <p className="text-sm text-muted-foreground">
                Try a different name or username
              </p>
            </div>
          ) : (
            <div className="space-y-3" data-ocid="explore-search-results">
              {searchResults?.map((profile) => (
                <UserCard
                  key={profile.id.toString()}
                  profile={profile}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Trending hashtags */}
          <section className="mb-8">
            <h2 className="font-display font-bold text-sm text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Trending Topics
            </h2>
            <div
              className="flex flex-wrap gap-2"
              data-ocid="explore-trending-tags"
            >
              {TRENDING_TAGS.map((item) => (
                <button
                  key={item.tag}
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-smooth text-sm"
                  onClick={() => handleInput(`#${item.tag}`)}
                >
                  <Hash className="w-3 h-3 text-primary" />
                  <span className="font-medium text-foreground">
                    {item.tag}
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-[10px] text-chart-5 bg-chart-5/10 border-chart-5/30 px-1.5"
                  >
                    {item.change}
                  </Badge>
                </button>
              ))}
            </div>
          </section>

          {/* Suggested users */}
          <section>
            <h2 className="font-display font-bold text-sm text-foreground mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Suggested People
            </h2>

            {isUsersLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <UserCardSkeleton key={i} />
                ))}
              </div>
            ) : !suggestedUsers || suggestedUsers.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16 text-center"
                data-ocid="explore-empty-users"
              >
                <Users className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="font-display font-semibold text-foreground mb-1">
                  No one here yet
                </p>
                <p className="text-sm text-muted-foreground">
                  Be the first to invite friends to SocialChain
                </p>
              </div>
            ) : (
              <div className="space-y-3" data-ocid="explore-suggested-users">
                {suggestedUsers.map((profile) => (
                  <UserCard
                    key={profile.id.toString()}
                    profile={profile}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </Layout>
  );
}
