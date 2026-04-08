import { a as useNavigate, j as jsxRuntimeExports, H as Heart, M as MessageCircle, Z as Zap } from "./index-D3K2DxjU.js";
import { A as Avatar } from "./useBackend-DvPbmnhr.js";
import { L as Layout, A as Activity } from "./index-DkjgesTa.js";
import { B as Badge } from "./badge-B-JEafYR.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-OHod-8dH.js";
import { U as UserPlus } from "./user-plus-Drpv_Q_3.js";
import "./index-DBelLtqO.js";
const ACTIVITY_FEED = [
  {
    id: "a1",
    type: "like",
    actorName: "CryptoInsights",
    actorId: "p2",
    postSnippet: "ICP is fundamentally different from every other L1…",
    postId: "e2",
    timeAgo: "2m ago"
  },
  {
    id: "a2",
    type: "contact",
    actorName: "Sarah Chen",
    actorId: "p3",
    timeAgo: "14m ago"
  },
  {
    id: "a3",
    type: "comment",
    actorName: "Dev Marcus",
    actorId: "p4",
    content: "Totally agree — the reverse gas model is a game changer 🚀",
    postSnippet: "Why ICP is fundamentally different…",
    postId: "e2",
    timeAgo: "1h ago"
  },
  {
    id: "a4",
    type: "like",
    actorName: "Luna Nakamura",
    actorId: "p5",
    postSnippet: "Just launched my portfolio app fully on-chain…",
    postId: "e3",
    timeAgo: "3h ago"
  },
  {
    id: "a5",
    type: "comment",
    actorName: "CryptoInsights",
    actorId: "p2",
    content: "Check out what you built — this is the future of social media on ICP!",
    postId: "e1",
    timeAgo: "5h ago"
  },
  {
    id: "a6",
    type: "like",
    actorName: "Sarah Chen",
    actorId: "p3",
    postSnippet: "Decentralized social media changes everything…",
    postId: "e3",
    timeAgo: "8h ago"
  },
  {
    id: "a7",
    type: "contact",
    actorName: "Dev Marcus",
    actorId: "p4",
    timeAgo: "1d ago"
  }
];
const TYPE_CONFIG = {
  like: {
    icon: Heart,
    label: "liked your post",
    color: "text-destructive",
    bg: "bg-destructive/10"
  },
  comment: {
    icon: MessageCircle,
    label: "commented on your post",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  contact: {
    icon: UserPlus,
    label: "added you as a contact",
    color: "text-accent",
    bg: "bg-accent/10"
  }
};
function ActivityItem({
  event,
  onActorClick,
  onPostClick
}) {
  const config = TYPE_CONFIG[event.type];
  const Icon = config.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated rounded-xl p-4 flex items-start gap-3",
      "data-ocid": `activity-item-${event.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "relative shrink-0 mt-0.5",
            onClick: () => onActorClick(event.actorId),
            "aria-label": `View ${event.actorName}'s profile`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { name: event.actorName, size: "md" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${config.bg} border-2 border-background flex items-center justify-center`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-2.5 h-2.5 ${config.color}` })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground leading-snug", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "font-semibold hover:underline",
                onClick: () => onActorClick(event.actorId),
                children: event.actorName
              }
            ),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: config.label })
          ] }),
          event.content && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2 italic", children: [
            '"',
            event.content,
            '"'
          ] }),
          event.postSnippet && !event.content && event.postId && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-xs text-muted-foreground mt-0.5 truncate block max-w-full hover:text-foreground transition-colors text-left",
              onClick: () => onPostClick == null ? void 0 : onPostClick(event.postId),
              children: event.postSnippet
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0 mt-0.5", children: event.timeAgo })
      ]
    }
  );
}
function EmptyActivity({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-16 text-center",
      "data-ocid": "activity-empty",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-12 h-12 text-muted-foreground/30 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold text-foreground mb-1", children: [
          "No ",
          label,
          " yet"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Activity from your contacts will appear here" })
      ]
    }
  );
}
function ActivityPage() {
  const navigate = useNavigate();
  const likeEvents = ACTIVITY_FEED.filter((e) => e.type === "like");
  const commentEvents = ACTIVITY_FEED.filter((e) => e.type === "comment");
  const contactEvents = ACTIVITY_FEED.filter((e) => e.type === "contact");
  const handleActorClick = (id) => navigate({ to: "/profile/$id", params: { id } });
  const handlePostClick = (id) => navigate({ to: "/post/$id", params: { id } });
  const renderList = (items, emptyLabel) => items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyActivity, { label: emptyLabel }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "activity-list", children: items.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    ActivityItem,
    {
      event,
      onActorClick: handleActorClick,
      onPostClick: handlePostClick
    },
    event.id
  )) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { onWalletOpen: () => navigate({ to: "/wallet" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your recent interactions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "secondary",
          className: "ml-auto text-xs bg-primary/10 text-primary border-primary/20 shrink-0",
          children: [
            ACTIVITY_FEED.length,
            " new"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full bg-card border border-border mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "all",
            className: "flex-1 text-xs data-[state=active]:bg-muted",
            "data-ocid": "activity-tab-all",
            children: "All"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "likes",
            className: "flex-1 text-xs data-[state=active]:bg-muted",
            "data-ocid": "activity-tab-likes",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3 mr-1" }),
              "Likes"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "comments",
            className: "flex-1 text-xs data-[state=active]:bg-muted",
            "data-ocid": "activity-tab-comments",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3 mr-1" }),
              "Comments"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "contacts",
            className: "flex-1 text-xs data-[state=active]:bg-muted",
            "data-ocid": "activity-tab-contacts",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3 h-3 mr-1" }),
              "Contacts"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", children: renderList(ACTIVITY_FEED, "activity") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "likes", children: renderList(likeEvents, "likes") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "comments", children: renderList(commentEvents, "comments") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "contacts", children: renderList(contactEvents, "contacts") })
    ] })
  ] }) });
}
export {
  ActivityPage
};
