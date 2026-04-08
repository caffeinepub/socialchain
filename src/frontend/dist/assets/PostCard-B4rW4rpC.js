import { e as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, H as Heart, d as cn, M as MessageCircle } from "./index-D3K2DxjU.js";
import { f as formatDate, a as formatCount, S as Send } from "./format-BPzIRd4_.js";
import { A as Avatar } from "./useBackend-DvPbmnhr.js";
import { E as Ellipsis } from "./useFileUpload-3xYnKDhh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m2 9 3-3 3 3", key: "1ltn5i" }],
  ["path", { d: "M13 18H7a2 2 0 0 1-2-2V6", key: "1r6tfw" }],
  ["path", { d: "m22 15-3 3-3-3", key: "4rnwn2" }],
  ["path", { d: "M11 6h6a2 2 0 0 1 2 2v10", key: "2f72bc" }]
];
const Repeat2 = createLucideIcon("repeat-2", __iconNode);
function PostCard({
  post,
  onLike,
  onComment,
  onShare,
  onSendICP,
  onClick
}) {
  const [liked, setLiked] = reactExports.useState(post.liked ?? false);
  const [likeCount, setLikeCount] = reactExports.useState(post.likeCount);
  function handleLike() {
    setLiked((prev) => !prev);
    setLikeCount((prev) => liked ? prev - 1 : prev + 1);
    onLike == null ? void 0 : onLike(post.id, liked);
  }
  function renderContent(text) {
    const parts = text.split(/([@#]\w+)/g);
    return parts.map((part, i) => {
      const key = `${part}-${i}`;
      return /^[@#]\w+/.test(part) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-secondary font-medium cursor-pointer hover:underline",
          children: part
        },
        key
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, key);
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "post-card",
      className: "card-elevated rounded-xl overflow-hidden transition-smooth hover:border-border/60",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full text-left cursor-pointer",
            onClick: () => onClick == null ? void 0 : onClick(post.id),
            "aria-label": `View post by ${post.authorName}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { src: post.authorAvatar, name: post.authorName, size: "md" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate leading-tight", children: post.authorName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                      "@",
                      post.authorUsername,
                      " · ",
                      formatDate(post.createdAt)
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    role: "presentation",
                    onClick: (e) => e.stopPropagation(),
                    onKeyDown: (e) => e.stopPropagation(),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        className: "shrink-0 w-8 h-8 text-muted-foreground hover:text-foreground",
                        "aria-label": "More options",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-4 h-4" })
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground break-words", children: renderContent(post.content) }) }),
              post.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: post.imageUrl,
                  alt: `Shared by ${post.authorName}`,
                  className: "w-full rounded-lg object-cover max-h-80",
                  loading: "lazy"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 border-t border-border flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "post-like-btn",
              onClick: handleLike,
              className: cn(
                "btn-social flex items-center gap-1.5",
                liked ? "text-secondary" : "text-muted-foreground"
              ),
              "aria-label": `${liked ? "Unlike" : "Like"} post`,
              "aria-pressed": liked,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Heart,
                  {
                    className: cn(
                      "w-4 h-4 transition-smooth",
                      liked && "fill-secondary"
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: formatCount(likeCount) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "post-comment-btn",
              onClick: () => onComment == null ? void 0 : onComment(post.id),
              className: "btn-social flex items-center gap-1.5 text-muted-foreground",
              "aria-label": "Comment on post",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: formatCount(post.commentCount) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "post-share-btn",
              onClick: () => onShare == null ? void 0 : onShare(post.id),
              className: "btn-social flex items-center gap-1.5 text-muted-foreground",
              "aria-label": "Share post",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Repeat2, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: formatCount(post.shareCount) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "post-send-icp-btn",
              onClick: () => onSendICP == null ? void 0 : onSendICP(post.authorId, post.authorName),
              className: "ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-accent/15 text-accent hover:bg-accent/25 transition-smooth border border-accent/30",
              "aria-label": `Send ICP to ${post.authorName}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" }),
                "Send ICP"
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  PostCard as P
};
