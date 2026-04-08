import { f as createLucideIcon, j as jsxRuntimeExports, e as cn } from "./index-C0kt3zpQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
];
const Link = createLucideIcon("link", __iconNode);
const sizes = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-xl"
};
function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function getColorClass(name) {
  const colors = [
    "bg-primary/20 text-primary",
    "bg-secondary/20 text-secondary",
    "bg-accent/20 text-accent",
    "bg-chart-5/20 text-chart-5"
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return colors[hash % colors.length];
}
function Avatar({
  src,
  name = "",
  size = "md",
  className,
  online
}) {
  const sizeClass = sizes[size];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative inline-flex shrink-0", className), children: [
    src ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src,
        alt: name || "Avatar",
        className: cn(
          sizeClass,
          "rounded-full object-cover ring-2 ring-border"
        ),
        onError: (e) => {
          e.target.style.display = "none";
        }
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          sizeClass,
          "rounded-full flex items-center justify-center font-display font-semibold ring-2 ring-border",
          name ? getColorClass(name) : "bg-muted text-muted-foreground"
        ),
        "aria-label": name || "Avatar",
        children: name ? getInitials(name) : "?"
      }
    ),
    online && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-background" })
  ] });
}
export {
  Avatar as A,
  Link as L
};
