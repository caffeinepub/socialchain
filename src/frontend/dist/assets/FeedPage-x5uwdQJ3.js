import { u as useAuth, a as useNavigate, b as useQueryClient, r as reactExports, c as useFileUpload, j as jsxRuntimeExports, Z as Zap, B as Button, P as PostSkeleton, d as ue, X, L as LoadingSpinner } from "./index-C0kt3zpQ.js";
import { A as Avatar } from "./Avatar-DPCA0mhD.js";
import { E as EmptyState } from "./format-B9PF0LdQ.js";
import { P as PostCard } from "./PostCard-Clr2PSdb.js";
import { L as Layout, S as SquarePen } from "./Layout-Dkks6Eo3.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BZy4Cvc7.js";
import { T as Textarea } from "./textarea-2UW0oCav.js";
import { u as useBackend, a as useQuery, b as useMutation } from "./useBackend-BBA1i2Pl.js";
import { I as Image } from "./image-BAwC9Rra.js";
import "./index-_YqQfP93.js";
import "./index-ChLWtlIc.js";
function mapBackendPost(p, principalText) {
  return {
    id: p.id.toString(),
    authorId: p.author.toText(),
    authorName: p.author.toText().slice(0, 10),
    authorUsername: p.author.toText().slice(0, 8),
    content: p.text,
    imageUrl: p.imageUrl ?? void 0,
    likeCount: Number(p.likeCount),
    commentCount: 0,
    shareCount: 0,
    createdAt: Number(p.createdAt / BigInt(1e6)),
    liked: principalText ? p.likedBy.some((u) => u.toText() === principalText) : false
  };
}
function FeedPage() {
  const { actor, isReady } = useBackend();
  const { principal } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isNewPostOpen, setIsNewPostOpen] = reactExports.useState(false);
  const [newPostContent, setNewPostContent] = reactExports.useState("");
  const [newPostImageUrl, setNewPostImageUrl] = reactExports.useState("");
  const [newPostImagePreview, setNewPostImagePreview] = reactExports.useState("");
  const [showImageInput, setShowImageInput] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("foryou");
  const fileInputRef = reactExports.useRef(null);
  const {
    isUploading,
    progress,
    uploadFile,
    reset: resetUpload
  } = useFileUpload();
  async function handleFileSelect(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setNewPostImagePreview(preview);
    try {
      const url = await uploadFile(file);
      setNewPostImageUrl(url);
    } catch {
      setNewPostImagePreview("");
    }
  }
  function handleClearImage() {
    setNewPostImageUrl("");
    setNewPostImagePreview("");
    resetUpload();
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
  const { data: posts, isLoading } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.getAllPosts();
        if (!result || result.length === 0) return [];
        return result.map((p) => mapBackendPost(p, principal)).sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
      } catch {
        return [];
      }
    },
    enabled: isReady,
    staleTime: 3e4
  });
  const createPost = useMutation({
    mutationFn: async ({
      content,
      imageUrl
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.createPost(content, imageUrl || null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      setIsNewPostOpen(false);
      setNewPostContent("");
      setNewPostImageUrl("");
      setNewPostImagePreview("");
      setShowImageInput(false);
      resetUpload();
      if (fileInputRef.current) fileInputRef.current.value = "";
      ue.success("Post published!");
    },
    onError: () => ue.error("Failed to publish post")
  });
  const likePost = useMutation({
    mutationFn: async ({
      postId,
      liked
    }) => {
      if (!actor) return;
      const bigId = BigInt(postId);
      if (liked) {
        await actor.unlikePost(bigId);
      } else {
        await actor.likePost(bigId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    }
  });
  function handlePostSubmit() {
    if (!newPostContent.trim()) return;
    createPost.mutate({ content: newPostContent, imageUrl: newPostImageUrl });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Layout,
    {
      onNewPost: () => setIsNewPostOpen(true),
      onWalletOpen: () => navigate({ to: "/wallet" }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0 mb-4 card-elevated rounded-xl overflow-hidden p-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "feed-tab-foryou",
              onClick: () => setActiveTab("foryou"),
              className: `flex-1 py-2.5 text-sm font-semibold rounded-lg transition-smooth ${activeTab === "foryou" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
                "For You"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "feed-tab-following",
              onClick: () => setActiveTab("following"),
              className: `flex-1 py-2.5 text-sm font-semibold rounded-lg transition-smooth ${activeTab === "following" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
              children: "Following"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-4 mb-4 flex gap-3 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { name: (principal == null ? void 0 : principal.slice(0, 8)) ?? "You", size: "md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "flex-1 h-10 px-4 rounded-full bg-muted text-muted-foreground text-sm text-left hover:bg-muted/80 transition-smooth",
              onClick: () => setIsNewPostOpen(true),
              "data-ocid": "feed-compose-trigger",
              children: "What's happening?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => {
                setShowImageInput(true);
                setIsNewPostOpen(true);
              },
              "aria-label": "Add photo",
              className: "text-secondary hover:text-secondary/80",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5" })
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostSkeleton, {}, i)) }) : posts && posts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "feed-list", children: posts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          PostCard,
          {
            post,
            onLike: (id, currentlyLiked) => likePost.mutate({ postId: id, liked: currentlyLiked }),
            onComment: (id) => navigate({ to: "/post/$id", params: { id } }),
            onClick: (id) => navigate({ to: "/post/$id", params: { id } }),
            onSendICP: (_authorId, authorName) => ue.info(
              `Send ICP to ${authorName} — open your Wallet to send!`
            )
          },
          post.id
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: SquarePen,
            title: "No posts yet",
            description: "Be the first to share something with the SocialChain community.",
            action: {
              label: "Create first post",
              onClick: () => setIsNewPostOpen(true)
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsNewPostOpen(true),
            "data-ocid": "feed-fab",
            "aria-label": "Create new post",
            className: "fixed bottom-24 right-5 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-smooth z-40 md:hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isNewPostOpen, onOpenChange: setIsNewPostOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-lg bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-foreground", children: "New Post" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { name: (principal == null ? void 0 : principal.slice(0, 8)) ?? "You", size: "md" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  placeholder: "What's happening? Share your thoughts, #hashtags, @mentions...",
                  value: newPostContent,
                  onChange: (e) => setNewPostContent(e.target.value),
                  className: "min-h-28 bg-muted border-0 text-foreground placeholder:text-muted-foreground resize-none focus-visible:ring-1",
                  maxLength: 500,
                  "data-ocid": "new-post-textarea"
                }
              ),
              showImageInput && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileInputRef,
                    type: "file",
                    accept: "image/*",
                    className: "hidden",
                    onChange: handleFileSelect,
                    "data-ocid": "new-post-image-file-input"
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
                    className: "w-full flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-secondary/50 hover:text-secondary transition-smooth text-sm disabled:opacity-50",
                    "data-ocid": "new-post-image-pick-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4" }),
                      isUploading ? `Uploading… ${progress}%` : newPostImagePreview ? "Change photo" : "Choose photo to upload"
                    ]
                  }
                ),
                newPostImagePreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: newPostImagePreview,
                      alt: "Post preview",
                      className: "w-full rounded-lg object-cover max-h-40"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleClearImage,
                      className: "absolute top-2 right-2 w-6 h-6 rounded-full bg-card/80 flex items-center justify-center text-foreground hover:bg-card transition-smooth",
                      "aria-label": "Remove image",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setShowImageInput((v) => !v);
                        if (showImageInput) handleClearImage();
                      },
                      className: `p-2 rounded-md transition-smooth ${showImageInput ? "text-secondary bg-secondary/10" : "text-muted-foreground hover:text-secondary hover:bg-secondary/10"}`,
                      "aria-label": "Toggle image picker",
                      "data-ocid": "new-post-image-toggle",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    newPostContent.length,
                    "/500"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: () => {
                        setIsNewPostOpen(false);
                        setShowImageInput(false);
                        handleClearImage();
                      },
                      "data-ocid": "new-post-cancel",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1" }),
                        "Cancel"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      onClick: handlePostSubmit,
                      disabled: !newPostContent.trim() || createPost.isPending || isUploading,
                      className: "bg-primary text-primary-foreground font-semibold",
                      "data-ocid": "new-post-submit",
                      children: createPost.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : "Post"
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  FeedPage
};
