import { e as createLucideIcon, u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-D3K2DxjU.js";
import { u as useBackend, a as useQuery, A as Avatar } from "./useBackend-DvPbmnhr.js";
import { L as Layout, a as Search, C as Compass } from "./index-DkjgesTa.js";
import { I as Input } from "./input-lkw-qVJy.js";
import { S as Skeleton } from "./skeleton-Dsmm36LL.js";
import { X } from "./x-B4ixtO6V.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function UserCard({
  profile,
  onViewProfile
}) {
  const principalStr = profile.id.toString();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated rounded-xl p-4 flex items-center gap-3 hover:border-border/60 transition-smooth",
      "data-ocid": `user-card-${principalStr.slice(0, 8)}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Avatar,
          {
            src: profile.avatarUrl,
            name: profile.displayName || profile.username || "?",
            size: "md"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: profile.displayName }),
          profile.username && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "@",
            profile.username
          ] }),
          profile.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1 mt-0.5", children: profile.bio })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "shrink-0 text-xs border-primary/30 text-primary hover:bg-primary/10",
            onClick: () => onViewProfile(principalStr),
            "data-ocid": "user-card-view-profile",
            children: "View Profile"
          }
        )
      ]
    }
  );
}
function UserCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-4 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-full shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-28" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-40" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 shrink-0" })
  ] });
}
function ExplorePage() {
  const { actor, isReady } = useBackend();
  const { principal: selfId } = useAuth();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = reactExports.useState("");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const debounceRef = reactExports.useRef(null);
  const handleInput = reactExports.useCallback((value) => {
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value.trim());
    }, 300);
  }, []);
  reactExports.useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);
  const isSearching = searchQuery.length > 0;
  const {
    data: searchResults,
    isFetching: isSearchLoading,
    isFetched: isSearchFetched
  } = useQuery({
    queryKey: ["searchUsers", searchQuery],
    queryFn: async () => {
      if (!actor || !searchQuery) return [];
      return actor.searchUsers(searchQuery);
    },
    enabled: isReady && searchQuery.length > 0
  });
  const { data: allUsers, isLoading: isUsersLoading } = useQuery({
    queryKey: ["listUsers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUsers();
    },
    enabled: isReady && !isSearching
  });
  const suggestedUsers = allUsers == null ? void 0 : allUsers.filter((u) => u.id.toString() !== selfId).slice(0, 8);
  const handleViewProfile = (id) => {
    navigate({ to: "/profile/$id", params: { id } });
  };
  const clearSearch = () => {
    setInputValue("");
    setSearchQuery("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { onWalletOpen: () => navigate({ to: "/wallet" }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search people by name or username…",
          value: inputValue,
          onChange: (e) => handleInput(e.target.value),
          className: "pl-9 pr-9 bg-card border-border text-foreground",
          "data-ocid": "explore-search",
          autoComplete: "off"
        }
      ),
      inputValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "aria-label": "Clear search",
          onClick: clearSearch,
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    isSearching ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
        isSearchLoading ? "Searching…" : `Results for "${searchQuery}"`
      ] }),
      isSearchLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserCardSkeleton, {}, i)) }) : isSearchFetched && (!searchResults || searchResults.length === 0) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 text-center",
          "data-ocid": "explore-empty-search",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-12 h-12 text-muted-foreground/30 mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No users found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try a different name or username" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "explore-search-results", children: searchResults == null ? void 0 : searchResults.map((profile) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        UserCard,
        {
          profile,
          onViewProfile: handleViewProfile
        },
        profile.id.toString()
      )) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-sm text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
        "People on SocialChain"
      ] }),
      isUsersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserCardSkeleton, {}, i)) }) : !suggestedUsers || suggestedUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 text-center",
          "data-ocid": "explore-empty-users",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-12 h-12 text-muted-foreground/30 mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No one here yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Be the first to invite friends to SocialChain" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "explore-suggested-users", children: suggestedUsers.map((profile) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        UserCard,
        {
          profile,
          onViewProfile: handleViewProfile
        },
        profile.id.toString()
      )) })
    ] })
  ] });
}
export {
  ExplorePage
};
