import { e as createLucideIcon, a as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, M as MessageCircle, H as Heart } from "./index-Bl6dvI3W.js";
import { A as Avatar } from "./useBackend-aoa0NgZM.js";
import { L as Layout, B as Bell } from "./index-LBv12q0t.js";
import { B as Badge } from "./badge-CUZbysS2.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-ha9pGp_Z.js";
import { C as Coins } from "./coins-Cpk7KDG6.js";
import { U as UserPlus } from "./user-plus-BnACxOjp.js";
import "./index-BYWIbXET.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode);
const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    type: "tip",
    actorName: "CryptoInsights",
    actorId: "p2",
    amount: "0.5 ICP",
    timeAgo: "5m ago",
    read: false
  },
  {
    id: "n2",
    type: "follow",
    actorName: "Sarah Chen",
    actorId: "p3",
    timeAgo: "22m ago",
    read: false
  },
  {
    id: "n3",
    type: "comment",
    actorName: "Dev Marcus",
    actorId: "p4",
    content: "This is exactly what Web3 social should look like 🔥",
    timeAgo: "1h ago",
    read: false
  },
  {
    id: "n4",
    type: "like",
    actorName: "Luna Nakamura",
    actorId: "p5",
    timeAgo: "2h ago",
    read: true
  },
  {
    id: "n5",
    type: "mention",
    actorName: "CryptoInsights",
    actorId: "p2",
    content: "Have you tried the new SocialChain wallet feature? You would love it!",
    timeAgo: "4h ago",
    read: true
  },
  {
    id: "n6",
    type: "tip",
    actorName: "Luna Nakamura",
    actorId: "p5",
    amount: "1.2 ICP",
    timeAgo: "1d ago",
    read: true
  },
  {
    id: "n7",
    type: "follow",
    actorName: "Dev Marcus",
    actorId: "p4",
    timeAgo: "2d ago",
    read: true
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
  follow: {
    icon: UserPlus,
    label: "started following you",
    color: "text-accent",
    bg: "bg-accent/10"
  },
  tip: {
    icon: Coins,
    label: "tipped you",
    color: "text-chart-5",
    bg: "bg-chart-5/10"
  },
  mention: {
    icon: MessageCircle,
    label: "mentioned you",
    color: "text-secondary",
    bg: "bg-secondary/10"
  }
};
function NotificationItem({
  notif,
  onMarkRead,
  onNavigate
}) {
  const config = TYPE_CONFIG[notif.type];
  const Icon = config.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `notification-item-${notif.id}`,
      className: `w-full rounded-xl p-4 flex items-start gap-3 transition-smooth text-left border ${notif.read ? "bg-card border-border/40 hover:border-border/70" : "bg-primary/5 border-primary/20 hover:border-primary/40"}`,
      onClick: () => {
        onMarkRead(notif.id);
        onNavigate(notif.actorId);
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0 mt-0.5", children: [
          !notif.read && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -left-0.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background z-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { name: notif.actorName, size: "md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${config.bg} border-2 border-background flex items-center justify-center`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-2.5 h-2.5 ${config.color}` })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground leading-snug", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: notif.actorName }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: config.label }),
            notif.amount && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-semibold ${config.color}`, children: [
              " ",
              "— ",
              notif.amount
            ] })
          ] }),
          notif.content && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2 italic", children: [
            '"',
            notif.content,
            '"'
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: notif.timeAgo }),
          !notif.read && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary inline-block" })
        ] })
      ]
    }
  );
}
function EmptyNotifications({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-16 text-center",
      "data-ocid": "notifications-empty",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-12 h-12 text-muted-foreground/30 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "All caught up!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: label === "all" ? "No notifications yet — come back soon." : `No ${label} notifications here.` })
      ]
    }
  );
}
function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = reactExports.useState(
    INITIAL_NOTIFICATIONS
  );
  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id) => setNotifications(
    (prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n)
  );
  const handleNavigate = (actorId) => navigate({ to: "/profile/$id", params: { id: actorId } });
  const renderList = (items, emptyLabel) => items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyNotifications, { label: emptyLabel }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "notifications-list", children: items.map((notif) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    NotificationItem,
    {
      notif,
      onMarkRead: markRead,
      onNavigate: handleNavigate
    },
    notif.id
  )) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { onWalletOpen: () => navigate({ to: "/wallet" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Notifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Stay on top of your activity" })
      ] }),
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "secondary",
          className: "text-xs bg-primary/10 text-primary border-primary/20 shrink-0",
          children: [
            unreadCount,
            " unread"
          ]
        }
      ),
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "text-xs text-muted-foreground hover:text-foreground gap-1.5 shrink-0",
          onClick: markAllRead,
          "data-ocid": "notifications-mark-all-read",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-3.5 h-3.5" }),
            "Mark all read"
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
            "data-ocid": "notifications-tab-all",
            children: "All"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "unread",
            className: "flex-1 text-xs data-[state=active]:bg-muted",
            "data-ocid": "notifications-tab-unread",
            children: [
              "Unread",
              unreadCount > 0 ? ` (${unreadCount})` : ""
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "tips",
            className: "flex-1 text-xs data-[state=active]:bg-muted",
            "data-ocid": "notifications-tab-tips",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-3.5 h-3.5 mr-1 text-chart-5" }),
              "Tips"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", children: renderList(notifications, "all") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "unread", children: renderList(
        notifications.filter((n) => !n.read),
        "unread"
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "tips", children: renderList(
        notifications.filter((n) => n.type === "tip"),
        "tips"
      ) })
    ] })
  ] }) });
}
export {
  NotificationsPage
};
