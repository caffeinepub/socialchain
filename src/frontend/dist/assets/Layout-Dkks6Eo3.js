import { f as createLucideIcon, r as reactExports, u as useAuth, E as useRouterState, j as jsxRuntimeExports, W as Wallet, k as Link, e as cn, a as useNavigate, B as Button } from "./index-C0kt3zpQ.js";
import { L as Link$1, A as Avatar } from "./Avatar-DPCA0mhD.js";
import { u as useGetMyProfile } from "./index-_YqQfP93.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Compass = createLucideIcon("compass", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = reactExports.useState(
    () => window.innerWidth <= breakpoint
  );
  reactExports.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}
const BOTTOM_NAV = [
  { label: "Feed", icon: House, to: "/feed" },
  { label: "Discover", icon: Compass, to: "/explore" },
  { label: "Wallet", icon: Wallet, to: "/wallet" },
  { label: "Profile", icon: User, to: "/profile/me", matchPath: "/profile" }
];
function BottomNav({ onNewPost }) {
  const { isAuthenticated } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  if (!isAuthenticated) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      "data-ocid": "bottom-nav",
      className: "md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-card border-t border-border flex items-center shadow-elevated",
      "aria-label": "Bottom navigation",
      children: [
        BOTTOM_NAV.slice(0, 2).map((item) => {
          const match = item.matchPath ?? item.to;
          const isActive = currentPath === item.to || match !== "/feed" && currentPath.startsWith(match);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.to,
              "data-ocid": `bottom-nav-${item.label.toLowerCase()}`,
              className: "flex-1 flex flex-col items-center justify-center gap-0.5 py-1",
              "aria-label": item.label,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "p-1.5 rounded-xl transition-smooth",
                      isActive && "bg-primary/15"
                    ),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      item.icon,
                      {
                        className: cn(
                          "w-5 h-5 transition-smooth",
                          isActive ? "text-primary stroke-[2.5px]" : "text-muted-foreground"
                        )
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "text-[10px] font-medium transition-smooth",
                      isActive ? "text-primary font-semibold" : "text-muted-foreground"
                    ),
                    children: item.label
                  }
                )
              ]
            },
            item.to
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center -mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onNewPost,
            "data-ocid": "bottom-nav-new-post",
            "aria-label": "Create new post",
            className: "flex items-center justify-center w-12 h-12 rounded-full gradient-hero shadow-elevated hover:opacity-90 active:scale-95 transition-smooth border-2 border-card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-6 h-6 text-primary-foreground" })
          }
        ) }),
        BOTTOM_NAV.slice(2).map((item) => {
          const match = item.matchPath ?? item.to;
          const isActive = currentPath === item.to || match !== "/feed" && currentPath.startsWith(match);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.to,
              "data-ocid": `bottom-nav-${item.label.toLowerCase()}`,
              className: "flex-1 flex flex-col items-center justify-center gap-0.5 py-1",
              "aria-label": item.label,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "p-1.5 rounded-xl transition-smooth",
                      isActive && (item.label === "Wallet" ? "bg-accent/15" : "bg-primary/15")
                    ),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      item.icon,
                      {
                        className: cn(
                          "w-5 h-5 transition-smooth",
                          isActive ? item.label === "Wallet" ? "text-accent stroke-[2.5px]" : "text-primary stroke-[2.5px]" : "text-muted-foreground"
                        )
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "text-[10px] font-medium transition-smooth",
                      isActive ? item.label === "Wallet" ? "text-accent font-semibold" : "text-primary font-semibold" : "text-muted-foreground"
                    ),
                    children: item.label
                  }
                )
              ]
            },
            item.to
          );
        })
      ]
    }
  );
}
function Header({ onWalletOpen, className }) {
  const { isAuthenticated, principal, login } = useAuth();
  const { data: profile } = useGetMyProfile();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      "data-ocid": "app-header",
      className: `fixed top-0 left-0 right-0 z-50 h-14 bg-card border-b border-border shadow-subtle flex items-center gap-3 px-4 ${className ?? ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/feed",
            className: "flex items-center gap-2 shrink-0 hover:opacity-80 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg gradient-hero flex items-center justify-center shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { className: "w-4 h-4 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-lg text-foreground tracking-tight", children: [
                "Social",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Chain" })
              ] })
            ]
          }
        ),
        isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:flex flex-1 max-w-sm mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "search",
              placeholder: "Search SocialChain...",
              className: "w-full h-9 pl-9 pr-4 rounded-full bg-muted border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "header-search"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 shrink-0", children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "w-9 h-9 text-muted-foreground hover:text-foreground relative",
              "aria-label": "Notifications",
              "data-ocid": "header-notifications",
              onClick: () => navigate({ to: "/notifications" }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: onWalletOpen ?? (() => navigate({ to: "/wallet" })),
              className: "hidden sm:flex items-center gap-1.5 h-8 px-3 border-accent/40 text-accent hover:bg-accent/10",
              "data-ocid": "header-wallet-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Wallet" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate({
                to: "/profile/$id",
                params: { id: principal ?? "me" }
              }),
              className: "ml-1 focus-visible:ring-2 focus-visible:ring-ring rounded-full",
              "aria-label": "Profile",
              "data-ocid": "header-avatar",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Avatar,
                {
                  src: profile == null ? void 0 : profile.avatarUrl,
                  name: (profile == null ? void 0 : profile.displayName) ?? (principal == null ? void 0 : principal.slice(0, 8)) ?? "Me",
                  size: "sm"
                }
              )
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: login,
            size: "sm",
            className: "gradient-hero text-primary-foreground border-0 font-semibold shadow-subtle",
            "data-ocid": "header-login-btn",
            children: "Sign In"
          }
        ) })
      ]
    }
  );
}
const NAV_ITEMS = [
  { label: "Home", icon: House, to: "/feed" },
  { label: "Explore", icon: Compass, to: "/explore" },
  { label: "Activity", icon: Activity, to: "/activity" },
  { label: "Notifications", icon: Bell, to: "/notifications" },
  { label: "Wallet", icon: Wallet, to: "/wallet" }
];
function Sidebar({ onNewPost, className }) {
  const { isAuthenticated, principal } = useAuth();
  const { data: profile } = useGetMyProfile();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  if (!isAuthenticated) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "aside",
    {
      "data-ocid": "app-sidebar",
      className: cn("flex flex-col h-full py-4", className),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 px-3 space-y-0.5", children: [
          NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.to || currentPath.startsWith(`${item.to}/`);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: item.to,
                "data-ocid": `sidebar-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`,
                className: cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth group",
                  isActive ? "bg-primary/15 text-primary shadow-subtle" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    item.icon,
                    {
                      className: cn(
                        "w-5 h-5 shrink-0 transition-smooth",
                        isActive ? "text-primary" : "group-hover:text-foreground"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label }),
                  item.label === "Wallet" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[10px] bg-accent/20 text-accent rounded px-1.5 py-0.5 font-semibold", children: "ICP" })
                ]
              },
              item.to
            );
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/profile/$id",
              params: { id: principal ?? "me" },
              "data-ocid": "sidebar-nav-profile",
              className: cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth",
                currentPath.startsWith("/profile") ? "bg-primary/15 text-primary shadow-subtle" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Avatar,
                  {
                    src: profile == null ? void 0 : profile.avatarUrl,
                    name: (profile == null ? void 0 : profile.displayName) ?? (principal == null ? void 0 : principal.slice(0, 8)) ?? "Me",
                    size: "sm"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-semibold text-foreground text-sm", children: (profile == null ? void 0 : profile.displayName) ?? "My Profile" }) })
              ]
            }
          )
        ] }),
        onNewPost && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: onNewPost,
            className: "w-full gradient-hero text-primary-foreground font-semibold shadow-subtle hover:opacity-90 transition-smooth border-0",
            "data-ocid": "sidebar-new-post-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4 mr-2" }),
              "New Post"
            ]
          }
        ) })
      ]
    }
  );
}
function Layout({
  children,
  title,
  onNewPost,
  onWalletOpen,
  fullWidth = false,
  hideBottomNav
}) {
  const isMobile = useIsMobile();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { title, onWalletOpen }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 w-full max-w-5xl mx-auto pt-14", children: [
      !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "w-64 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, { onNewPost }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "main",
        {
          className: `flex-1 min-w-0 px-4 py-4 pb-24 md:pb-8 ${fullWidth ? "" : "max-w-2xl"}`,
          "data-ocid": "main-content",
          children
        }
      )
    ] }),
    (!isMobile || !hideBottomNav) && /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { onNewPost }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "hidden md:flex items-center justify-center py-3 bg-muted/40 border-t border-border text-xs text-muted-foreground", children: [
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
          className: "ml-1 text-primary hover:underline",
          children: "caffeine.ai"
        }
      )
    ] })
  ] });
}
export {
  Activity as A,
  Bell as B,
  Compass as C,
  Layout as L,
  SquarePen as S,
  Search as a
};
