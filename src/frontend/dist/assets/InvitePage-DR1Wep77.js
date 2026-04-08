import { e as createLucideIcon, h as useParams, u as useAuth, j as jsxRuntimeExports, i as Link, B as Button, b as useQueryClient, c as ue, r as reactExports } from "./index-Bl6dvI3W.js";
import { L as Link$1, A as Avatar, u as useBackend, a as useQuery, b as useMutation } from "./useBackend-aoa0NgZM.js";
import { B as Badge } from "./badge-CUZbysS2.js";
import { S as Skeleton } from "./skeleton-yvLGTz4H.js";
import { C as Check } from "./check-CHUHpXGS.js";
import { U as UserPlus } from "./user-plus-BnACxOjp.js";
import { A as ArrowLeft } from "./arrow-left-xn-eUvrI.js";
import { C as Copy } from "./copy-BV87I9-E.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode);
function useInviteProfile(username) {
  const { actor, isReady } = useBackend();
  return useQuery({
    queryKey: ["inviteProfile", username],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getInviteProfile(username);
    },
    enabled: isReady && !!username,
    staleTime: 6e4
  });
}
function useContacts() {
  const { actor, isReady } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContacts();
    },
    enabled: isReady && isAuthenticated,
    staleTime: 3e4
  });
}
function useAddContact() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (username) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.addContact(username);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    }
  });
}
function useMyInviteLink() {
  const { actor, isReady } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["myUsername"],
    queryFn: async () => {
      if (!actor) return null;
      const username = await actor.getUsername();
      if (!username) return null;
      return `${window.location.origin}/add/${username}`;
    },
    enabled: isReady && isAuthenticated,
    staleTime: 3e5
  });
}
function InvitePageSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-sm space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-elevated overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 -mt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-20 h-20 rounded-full mb-4 border-4 border-card" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40 mb-2 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-56 mb-4 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32 mb-6 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-full rounded-xl" })
    ] })
  ] }) }) });
}
function UserNotFound({ username }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center",
      "data-ocid": "invite-not-found",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-7 h-7 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "User not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-7 max-w-xs", children: [
          "The invite link for",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
            "@",
            username
          ] }),
          " is no longer valid or this account doesn't exist."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/welcome", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "gap-2",
            "data-ocid": "invite-not-found-back",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Go to SocialChain"
            ]
          }
        ) })
      ]
    }
  );
}
function ShareSection({ inviteLink }) {
  const [copied, setCopied] = reactExports.useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true);
      ue.success("Invite link copied!");
      setTimeout(() => setCopied(false), 2500);
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl p-5 shadow-card",
      "data-ocid": "invite-share-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Share your own invite link" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Let friends find you on SocialChain instantly" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-muted/60 rounded-lg px-3 py-2 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate font-mono", children: inviteLink }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: handleCopy,
              className: "shrink-0 gap-1.5",
              "data-ocid": "invite-copy-link-btn",
              children: [
                copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                copied ? "Copied" : "Copy"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function InvitePage() {
  const { username } = useParams({ from: "/add/$username" });
  const { isAuthenticated, login } = useAuth();
  const { data: profile, isLoading: profileLoading } = useInviteProfile(username);
  const { data: contacts, isLoading: contactsLoading } = useContacts();
  const addContact = useAddContact();
  const { data: myInviteLink } = useMyInviteLink();
  const isLoading = profileLoading || isAuthenticated && contactsLoading;
  const displayName = (profile == null ? void 0 : profile.displayName) ?? username;
  const bio = (profile == null ? void 0 : profile.bio) ?? "";
  const joinDate = (profile == null ? void 0 : profile.createdAt) ? new Date(Number(profile.createdAt / 1000000n)).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" }
  ) : null;
  const isAlreadyContact = isAuthenticated && contacts !== void 0 && contacts.some((c) => c.username === username);
  function handleAddContact() {
    if (!isAuthenticated) {
      login();
      return;
    }
    addContact.mutate(username, {
      onSuccess: () => {
        ue.success(`${displayName} added to your contacts!`);
      },
      onError: (err) => {
        const message = err instanceof Error ? err.message : "Failed to add contact";
        ue.error(message);
      }
    });
  }
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(InvitePageSkeleton, {});
  if (profile === null || profile === void 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(UserNotFound, { username });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col items-center justify-center px-6 py-10",
      "data-ocid": "invite-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/welcome",
            className: "flex items-center gap-2 mb-8 hover:opacity-80 transition-smooth",
            "data-ocid": "invite-logo",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl gradient-hero flex items-center justify-center shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { className: "w-4 h-4 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-xl text-foreground tracking-tight", children: [
                "Social",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Chain" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-elevated overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 gradient-hero relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.9_0.1_60)_0%,_transparent_70%)]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-6 -mt-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Avatar,
                {
                  src: profile.avatarUrl,
                  name: displayName,
                  size: "xl",
                  className: "border-4 border-card shadow-card"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground leading-tight truncate", children: displayName }),
                  profile.username && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    "@",
                    profile.username
                  ] })
                ] }),
                isAlreadyContact && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "secondary",
                    className: "shrink-0 ml-2 mt-1 gap-1",
                    "data-ocid": "invite-connected-badge",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3 h-3" }),
                      "Connected"
                    ]
                  }
                )
              ] }),
              bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3 line-clamp-3 leading-relaxed", children: bio }),
              joinDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-5", children: [
                "Member since ",
                joinDate
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/50 border border-border/60 rounded-xl px-4 py-3 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground text-center leading-relaxed", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: displayName }),
                " ",
                "invites you to connect on SocialChain — where social meets crypto."
              ] }) }),
              isAlreadyContact ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-muted/60 border border-border text-sm font-medium text-muted-foreground",
                    "data-ocid": "invite-already-connected",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4 text-green-500" }),
                      "Already connected"
                    ]
                  }
                ),
                profile.id && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile/$id", params: { id: profile.id.toText() }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full",
                    "data-ocid": "invite-view-profile-btn",
                    children: "View Profile"
                  }
                ) })
              ] }) : isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "w-full gradient-hero text-white border-0 font-semibold shadow-subtle",
                  onClick: handleAddContact,
                  disabled: addContact.isPending,
                  "data-ocid": "invite-add-contact-btn",
                  children: addContact.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 mr-2 rounded-full border-2 border-white/30 border-t-white animate-spin" }),
                    "Adding…"
                  ] }) : addContact.isSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-2" }),
                    "Added!"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 mr-2" }),
                    "Add ",
                    displayName,
                    " as Contact"
                  ] })
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "w-full gradient-hero text-white border-0 font-semibold shadow-subtle",
                    onClick: login,
                    "data-ocid": "invite-signin-btn",
                    children: [
                      "Sign in to add ",
                      displayName,
                      " as a contact"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
                  "Uses",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Internet Identity" }),
                  " ",
                  "— secure & private"
                ] })
              ] })
            ] })
          ] }),
          isAuthenticated && myInviteLink && /* @__PURE__ */ jsxRuntimeExports.jsx(ShareSection, { inviteLink: myInviteLink }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center pt-2", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            ". Built with love using",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-primary hover:underline",
                children: "caffeine.ai"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  InvitePage
};
