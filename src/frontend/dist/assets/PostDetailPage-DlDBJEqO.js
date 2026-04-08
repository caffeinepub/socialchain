import { e as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as cn, h as useParams, a as useNavigate, u as useAuth, b as useQueryClient, B as Button, H as Heart, M as MessageCircle, L as LoadingSpinner, c as ue } from "./index-Bl6dvI3W.js";
import { u as useBackend, a as useQuery, b as useMutation, A as Avatar } from "./useBackend-aoa0NgZM.js";
import { L as Layout } from "./index-LBv12q0t.js";
import { P as Primitive } from "./index-BfZTMNM3.js";
import { T as Textarea, u as useFileUpload, E as Ellipsis } from "./useFileUpload-2uO9XJ0j.js";
import { a as formatCount, S as Send, f as formatDate } from "./format-CwsBvIzO.js";
import { A as ArrowLeft } from "./arrow-left-xn-eUvrI.js";
import { X } from "./x-bILI1M_f.js";
import { I as Image } from "./image-BDESJhpN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const SAMPLE_COMMENTS = [
  {
    id: "c1",
    authorId: "p3",
    authorName: "Sarah Chen",
    authorUsername: "sarahc",
    content: "Absolutely stunning! What camera did you use? 😍",
    createdAt: Date.now() - 1e3 * 60 * 15,
    likeCount: 24
  },
  {
    id: "c2",
    authorId: "p4",
    authorName: "Dev Marcus",
    authorUsername: "devmarcus",
    content: "Mt. Rainier is unreal. Been there twice and it never gets old 🏔️",
    createdAt: Date.now() - 1e3 * 60 * 45,
    likeCount: 12
  },
  {
    id: "c3",
    authorId: "p2",
    authorName: "CryptoInsights",
    authorUsername: "ci",
    content: "Great shot! Also just sent you some ICP — keep creating! 🚀",
    createdAt: Date.now() - 1e3 * 60 * 60 * 2,
    likeCount: 38
  },
  {
    id: "c4",
    authorId: "p5",
    authorName: "Luna Nakamura",
    authorUsername: "lunan",
    content: "The colors in this shot are incredible. Nature is unmatched ✨ #photography",
    createdAt: Date.now() - 1e3 * 60 * 60 * 3,
    likeCount: 67
  },
  {
    id: "c5",
    authorId: "p6",
    authorName: "NexaDAO",
    authorUsername: "nexadao",
    content: "Tipped 1 ICP for this masterpiece 🎨 Web3 social is the future!",
    createdAt: Date.now() - 1e3 * 60 * 60 * 4,
    likeCount: 19
  }
];
const SAMPLE_POST = {
  id: "1",
  authorId: "p1",
  authorPrincipal: "p1",
  authorName: "Alex Rivers",
  authorUsername: "arivers",
  content: "Sunset vibes at Mt. Rainier! The view from the summit was absolutely breathtaking 🌄 #nature #travel #photography",
  imageUrl: "/assets/generated/hero-social-crypto.dim_1200x600.jpg",
  likeCount: 1247,
  commentCount: 48,
  shareCount: 15,
  createdAt: Date.now() - 1e3 * 60 * 23,
  liked: false
};
function mapBackendPost(p, principalText) {
  const authorText = p.author.toText();
  return {
    id: p.id.toString(),
    authorId: authorText,
    authorPrincipal: authorText,
    authorName: authorText.slice(0, 12),
    authorUsername: authorText.slice(0, 8),
    content: p.text,
    imageUrl: p.imageUrl ?? void 0,
    likeCount: Number(p.likeCount),
    commentCount: 0,
    shareCount: 0,
    createdAt: Number(p.createdAt / BigInt(1e6)),
    liked: principalText ? p.likedBy.some((u) => u.toText() === principalText) : false
  };
}
function mapBackendComment(c) {
  const authorText = c.author.toText();
  return {
    id: c.id.toString(),
    authorId: authorText,
    authorName: authorText.slice(0, 12),
    authorUsername: authorText.slice(0, 8),
    content: c.text,
    createdAt: Number(c.createdAt / BigInt(1e6)),
    likeCount: 0
  };
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
function FullPost({
  post,
  isAuthor,
  onLike,
  onEdit,
  onDelete,
  isDeleting
}) {
  const [liked, setLiked] = reactExports.useState(post.liked ?? false);
  const [likeCount, setLikeCount] = reactExports.useState(post.likeCount);
  function handleLike() {
    setLiked((prev) => !prev);
    setLikeCount((prev) => liked ? prev - 1 : prev + 1);
    onLike();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated rounded-xl overflow-hidden",
      "data-ocid": "post-detail-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { name: post.authorName, size: "md" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: post.authorName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                "@",
                post.authorUsername,
                " · ",
                formatDate(post.createdAt)
              ] })
            ] })
          ] }),
          isAuthor && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "w-8 h-8 text-muted-foreground hover:text-foreground",
                onClick: onEdit,
                "aria-label": "Edit post",
                "data-ocid": "post-detail-edit-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "w-8 h-8 text-muted-foreground hover:text-destructive",
                onClick: onDelete,
                disabled: isDeleting,
                "aria-label": "Delete post",
                "data-ocid": "post-detail-delete-btn",
                children: isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          !isAuthor && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "w-8 h-8 text-muted-foreground hover:text-foreground shrink-0",
              "aria-label": "More options",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed text-foreground break-words", children: renderContent(post.content) }) }),
        post.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: post.imageUrl,
            alt: `Post by ${post.authorName}`,
            className: "w-full rounded-xl object-cover max-h-96"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-border flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleLike,
              "data-ocid": "post-detail-like-btn",
              className: cn(
                "flex items-center gap-1.5 text-sm transition-smooth",
                liked ? "text-secondary" : "text-muted-foreground hover:text-secondary"
              ),
              "aria-label": liked ? "Unlike post" : "Like post",
              "aria-pressed": liked,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Heart,
                  {
                    className: cn(
                      "w-5 h-5 transition-smooth",
                      liked && "fill-secondary"
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatCount(likeCount) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatCount(post.commentCount) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => ue.info("Open Wallet to tip this creator!"),
              className: "ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-accent/15 text-accent hover:bg-accent/25 transition-smooth border border-accent/30",
              "data-ocid": "post-detail-send-icp-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" }),
                "Tip ICP"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function EditPostForm({ post, onSave, onCancel, isSaving }) {
  const [text, setText] = reactExports.useState(post.content);
  const [imageUrl, setImageUrl] = reactExports.useState(post.imageUrl ?? "");
  const [imagePreview, setImagePreview] = reactExports.useState(post.imageUrl ?? "");
  const fileInputRef = reactExports.useRef(null);
  const { isUploading, progress, uploadFile } = useFileUpload();
  async function handleFileChange(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    try {
      const url = await uploadFile(file);
      setImageUrl(url);
    } catch {
      setImagePreview(imageUrl);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated rounded-xl p-4 space-y-3",
      "data-ocid": "post-detail-edit-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Edit Post" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "w-7 h-7 text-muted-foreground",
              onClick: onCancel,
              "aria-label": "Cancel edit",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: text,
            onChange: (e) => setText(e.target.value),
            className: "bg-muted border-0 text-foreground resize-none min-h-24 focus-visible:ring-1",
            maxLength: 500,
            "data-ocid": "post-detail-edit-textarea"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: handleFileChange,
              "data-ocid": "post-detail-edit-image-file-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                var _a;
                return (_a = fileInputRef.current) == null ? void 0 : _a.click();
              },
              disabled: isUploading,
              className: "flex items-center gap-2 text-xs text-muted-foreground hover:text-secondary transition-smooth disabled:opacity-50 px-2 py-1.5 rounded-md border border-border hover:border-secondary/50",
              "data-ocid": "post-detail-edit-image-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3.5 h-3.5" }),
                isUploading ? `Uploading… ${progress}%` : imagePreview ? "Change photo" : "Add photo"
              ]
            }
          ),
          imagePreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: imagePreview,
                alt: "Post preview",
                className: "w-full rounded-lg object-cover max-h-40"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setImageUrl("");
                  setImagePreview("");
                  if (fileInputRef.current) fileInputRef.current.value = "";
                },
                className: "absolute top-2 right-2 w-6 h-6 rounded-full bg-card/80 flex items-center justify-center text-foreground hover:bg-card transition-smooth",
                "aria-label": "Remove image",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: onCancel,
              "data-ocid": "post-detail-edit-cancel",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "bg-primary text-primary-foreground",
              onClick: () => onSave(text, imageUrl),
              disabled: !text.trim() || isSaving || isUploading,
              "data-ocid": "post-detail-edit-save",
              children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : "Save Changes"
            }
          )
        ] })
      ]
    }
  );
}
function CommentRow({
  comment,
  canDelete,
  onDelete,
  isDeleting
}) {
  const [liked, setLiked] = reactExports.useState(false);
  const [likeCount, setLikeCount] = reactExports.useState(comment.likeCount);
  const [replyPrefix, setReplyPrefix] = reactExports.useState("");
  function toggleLike() {
    setLiked((prev) => !prev);
    setLikeCount((prev) => liked ? prev - 1 : prev + 1);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated rounded-xl p-4", "data-ocid": "comment-row", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { name: comment.authorName, size: "sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 min-w-0 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground truncate", children: comment.authorName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground shrink-0", children: [
            "@",
            comment.authorUsername
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground shrink-0", children: [
            "· ",
            formatDate(comment.createdAt)
          ] })
        ] }),
        canDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "w-6 h-6 shrink-0 text-muted-foreground hover:text-destructive",
            onClick: () => onDelete(comment.id),
            disabled: isDeleting,
            "aria-label": "Delete comment",
            "data-ocid": "comment-delete-btn",
            children: isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed break-words", children: comment.content }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: toggleLike,
            className: `flex items-center gap-1.5 text-xs transition-smooth ${liked ? "text-secondary" : "text-muted-foreground hover:text-secondary"}`,
            "aria-label": `${liked ? "Unlike" : "Like"} comment`,
            "aria-pressed": liked,
            "data-ocid": "comment-like-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Heart,
                {
                  className: `w-3.5 h-3.5 ${liked ? "fill-secondary" : ""}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCount(likeCount) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth",
            onClick: () => setReplyPrefix(`@${comment.authorUsername} `),
            children: "Reply"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => ue.info(`Tip ICP to ${comment.authorName} — open Wallet!`),
            className: "flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 transition-smooth ml-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3 h-3" }),
              "Tip ICP"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
function PostDetailPage() {
  const { id } = useParams({ from: "/post/$id" });
  const navigate = useNavigate();
  const { actor, isReady } = useBackend();
  const { principal } = useAuth();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = reactExports.useState("");
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [deletingCommentId, setDeletingCommentId] = reactExports.useState(
    null
  );
  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!actor) return SAMPLE_POST;
      try {
        const bigId = BigInt(id);
        const result = await actor.getPost(bigId);
        if (result) return mapBackendPost(result, principal);
        return SAMPLE_POST;
      } catch {
        return SAMPLE_POST;
      }
    },
    enabled: isReady,
    initialData: SAMPLE_POST
  });
  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      if (!actor) return SAMPLE_COMMENTS;
      try {
        const bigId = BigInt(id);
        const result = await actor.getComments(bigId);
        if (result && result.length > 0) {
          return result.map(mapBackendComment);
        }
        return SAMPLE_COMMENTS;
      } catch {
        return SAMPLE_COMMENTS;
      }
    },
    enabled: isReady,
    initialData: SAMPLE_COMMENTS
  });
  const addComment = useMutation({
    mutationFn: async (text) => {
      if (!actor) throw new Error("Not connected");
      await actor.addComment(BigInt(id), text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setCommentText("");
      ue.success("Comment added!");
    },
    onError: () => ue.error("Failed to add comment")
  });
  const deleteComment = useMutation({
    mutationFn: async (commentId) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteComment(BigInt(id), BigInt(commentId));
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      ue.success("Comment deleted.");
    },
    onError: () => ue.error("Failed to delete comment"),
    onSettled: () => setDeletingCommentId(null)
  });
  const likePost = useMutation({
    mutationFn: async (currentlyLiked) => {
      if (!actor) return;
      const bigId = BigInt(id);
      if (currentlyLiked) {
        await actor.unlikePost(bigId);
      } else {
        await actor.likePost(bigId);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["post", id] })
  });
  const editPost = useMutation({
    mutationFn: async ({
      text,
      imageUrl
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.editPost(BigInt(id), text, imageUrl || null);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      setIsEditing(false);
      ue.success("Post updated!");
    },
    onError: () => ue.error("Failed to update post")
  });
  const deletePost = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deletePost(BigInt(id));
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      ue.success("Post deleted.");
      navigate({ to: "/feed" });
    },
    onError: () => ue.error("Failed to delete post")
  });
  function handleDeletePost() {
    if (!confirm(
      "Are you sure you want to delete this post? This cannot be undone."
    ))
      return;
    deletePost.mutate();
  }
  function handleDeleteComment(commentId) {
    if (!confirm("Delete this comment?")) return;
    setDeletingCommentId(commentId);
    deleteComment.mutate(commentId);
  }
  const isPostAuthor = !!principal && !!(post == null ? void 0 : post.authorPrincipal) && principal === post.authorPrincipal;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { onWalletOpen: () => navigate({ to: "/wallet" }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4 sticky top-0 bg-background/90 backdrop-blur-md z-10 py-2 -mx-1 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => navigate({ to: "/feed" }),
          className: "text-muted-foreground hover:text-foreground",
          "aria-label": "Go back",
          "data-ocid": "post-detail-back",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-lg text-foreground", children: "Post" }),
      post && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-3 text-muted-foreground text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4" }),
          formatCount(post.likeCount)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
          formatCount(post.commentCount)
        ] })
      ] })
    ] }),
    postLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md" }) }) : post ? isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditPostForm,
      {
        post,
        onSave: (text, imageUrl) => editPost.mutate({ text, imageUrl }),
        onCancel: () => setIsEditing(false),
        isSaving: editPost.isPending
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      FullPost,
      {
        post,
        isAuthor: isPostAuthor,
        onLike: () => likePost.mutate(post.liked ?? false),
        onEdit: () => setIsEditing(true),
        onDelete: handleDeletePost,
        isDeleting: deletePost.isPending
      }
    ) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-5 bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3 px-1", children: [
      (comments == null ? void 0 : comments.length) ?? 0,
      " Comments"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 pb-32", "data-ocid": "post-detail-comments-list", children: commentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md" }) }) : comments == null ? void 0 : comments.map((comment) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentRow,
      {
        comment,
        canDelete: !!principal && (principal === comment.authorId || isPostAuthor),
        onDelete: handleDeleteComment,
        isDeleting: deletingCommentId === comment.id && deleteComment.isPending
      },
      comment.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-16 left-0 right-0 z-30 bg-card/95 backdrop-blur-lg border-t border-border px-4 py-3 md:relative md:bottom-auto md:bg-transparent md:border-0 md:px-0 md:py-0 md:mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto flex gap-3 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { name: (principal == null ? void 0 : principal.slice(0, 8)) ?? "You", size: "sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-end gap-2 bg-muted rounded-2xl px-4 py-2 border border-border focus-within:border-primary/50 transition-smooth", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Write a comment...",
            value: commentText,
            onChange: (e) => setCommentText(e.target.value),
            className: "flex-1 min-h-9 max-h-32 bg-transparent border-0 text-foreground placeholder:text-muted-foreground resize-none text-sm p-0 focus-visible:ring-0 shadow-none",
            onKeyDown: (e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (commentText.trim() && !addComment.isPending) {
                  addComment.mutate(commentText);
                }
              }
            },
            "data-ocid": "post-detail-comment-input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "icon",
            onClick: () => addComment.mutate(commentText),
            disabled: !commentText.trim() || addComment.isPending,
            className: "w-8 h-8 rounded-full bg-primary text-primary-foreground shrink-0 mb-0.5",
            "aria-label": "Submit comment",
            "data-ocid": "post-detail-comment-submit",
            children: addComment.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" })
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  PostDetailPage
};
