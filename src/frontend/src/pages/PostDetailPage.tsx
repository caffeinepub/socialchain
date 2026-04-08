import { Avatar } from "@/components/common/Avatar";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import type { Post } from "@/components/common/PostCard";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { useFileUpload } from "@/hooks/useFileUpload";
import { formatCount, formatTimeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Heart,
  Image,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ---------------------------------------------------------------------------
// Local types
// ---------------------------------------------------------------------------
interface LocalComment {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  content: string;
  createdAt: number;
  likeCount: number;
}

interface LocalPost extends Post {
  authorPrincipal?: string;
}

// ---------------------------------------------------------------------------
// Sample data (shown before backend data loads)
// ---------------------------------------------------------------------------
const SAMPLE_COMMENTS: LocalComment[] = [
  {
    id: "c1",
    authorId: "p3",
    authorName: "Sarah Chen",
    authorUsername: "sarahc",
    content: "Absolutely stunning! What camera did you use? 😍",
    createdAt: Date.now() - 1000 * 60 * 15,
    likeCount: 24,
  },
  {
    id: "c2",
    authorId: "p4",
    authorName: "Dev Marcus",
    authorUsername: "devmarcus",
    content: "Mt. Rainier is unreal. Been there twice and it never gets old 🏔️",
    createdAt: Date.now() - 1000 * 60 * 45,
    likeCount: 12,
  },
  {
    id: "c3",
    authorId: "p2",
    authorName: "CryptoInsights",
    authorUsername: "ci",
    content: "Great shot! Also just sent you some ICP — keep creating! 🚀",
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    likeCount: 38,
  },
  {
    id: "c4",
    authorId: "p5",
    authorName: "Luna Nakamura",
    authorUsername: "lunan",
    content:
      "The colors in this shot are incredible. Nature is unmatched ✨ #photography",
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
    likeCount: 67,
  },
  {
    id: "c5",
    authorId: "p6",
    authorName: "NexaDAO",
    authorUsername: "nexadao",
    content: "Tipped 1 ICP for this masterpiece 🎨 Web3 social is the future!",
    createdAt: Date.now() - 1000 * 60 * 60 * 4,
    likeCount: 19,
  },
];

const SAMPLE_POST: LocalPost = {
  id: "1",
  authorId: "p1",
  authorPrincipal: "p1",
  authorName: "Alex Rivers",
  authorUsername: "arivers",
  content:
    "Sunset vibes at Mt. Rainier! The view from the summit was absolutely breathtaking 🌄 #nature #travel #photography",
  imageUrl: "/assets/generated/hero-social-crypto.dim_1200x600.jpg",
  likeCount: 1247,
  commentCount: 48,
  shareCount: 15,
  createdAt: Date.now() - 1000 * 60 * 23,
  liked: false,
};

// ---------------------------------------------------------------------------
// Map backend objects to local shapes
// ---------------------------------------------------------------------------
function mapBackendPost(
  p: {
    id: bigint;
    text: string;
    author: { toText: () => string };
    likeCount: bigint;
    likedBy: Array<{ toText: () => string }>;
    imageUrl?: string;
    createdAt: bigint;
  },
  principalText: string | null,
): LocalPost {
  const authorText = p.author.toText();
  return {
    id: p.id.toString(),
    authorId: authorText,
    authorPrincipal: authorText,
    authorName: authorText.slice(0, 12),
    authorUsername: authorText.slice(0, 8),
    content: p.text,
    imageUrl: p.imageUrl ?? undefined,
    likeCount: Number(p.likeCount),
    commentCount: 0,
    shareCount: 0,
    createdAt: Number(p.createdAt / BigInt(1_000_000)),
    liked: principalText
      ? p.likedBy.some((u) => u.toText() === principalText)
      : false,
  };
}

function mapBackendComment(c: {
  id: bigint;
  text: string;
  author: { toText: () => string };
  createdAt: bigint;
}): LocalComment {
  const authorText = c.author.toText();
  return {
    id: c.id.toString(),
    authorId: authorText,
    authorName: authorText.slice(0, 12),
    authorUsername: authorText.slice(0, 8),
    content: c.text,
    createdAt: Number(c.createdAt / BigInt(1_000_000)),
    likeCount: 0,
  };
}

// ---------------------------------------------------------------------------
// Full post display component (expanded, not PostCard)
// ---------------------------------------------------------------------------
interface FullPostProps {
  post: LocalPost;
  isAuthor: boolean;
  onLike: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

function renderContent(text: string) {
  const parts = text.split(/([@#]\w+)/g);
  return parts.map((part, i) => {
    const key = `${part}-${i}`;
    return /^[@#]\w+/.test(part) ? (
      <span
        key={key}
        className="text-secondary font-medium cursor-pointer hover:underline"
      >
        {part}
      </span>
    ) : (
      <span key={key}>{part}</span>
    );
  });
}

function FullPost({
  post,
  isAuthor,
  onLike,
  onEdit,
  onDelete,
  isDeleting,
}: FullPostProps) {
  const [liked, setLiked] = useState(post.liked ?? false);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  function handleLike() {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    onLike();
  }

  return (
    <div
      className="card-elevated rounded-xl overflow-hidden"
      data-ocid="post-detail-card"
    >
      <div className="p-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar name={post.authorName} size="md" />
          <div className="min-w-0">
            <p className="font-display font-semibold text-sm text-foreground truncate">
              {post.authorName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              @{post.authorUsername} · {formatTimeAgo(post.createdAt)}
            </p>
          </div>
        </div>

        {isAuthor && (
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-muted-foreground hover:text-foreground"
              onClick={onEdit}
              aria-label="Edit post"
              data-ocid="post-detail-edit-btn"
            >
              <Pencil className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-muted-foreground hover:text-destructive"
              onClick={onDelete}
              disabled={isDeleting}
              aria-label="Delete post"
              data-ocid="post-detail-delete-btn"
            >
              {isDeleting ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        )}

        {!isAuthor && (
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-muted-foreground hover:text-foreground shrink-0"
            aria-label="More options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="px-4 pb-4">
        <p className="text-base leading-relaxed text-foreground break-words">
          {renderContent(post.content)}
        </p>
      </div>

      {post.imageUrl && (
        <div className="px-4 pb-4">
          <img
            src={post.imageUrl}
            alt={`Post by ${post.authorName}`}
            className="w-full rounded-xl object-cover max-h-96"
          />
        </div>
      )}

      <div className="px-4 py-3 border-t border-border flex items-center gap-4">
        <button
          type="button"
          onClick={handleLike}
          data-ocid="post-detail-like-btn"
          className={cn(
            "flex items-center gap-1.5 text-sm transition-smooth",
            liked
              ? "text-secondary"
              : "text-muted-foreground hover:text-secondary",
          )}
          aria-label={liked ? "Unlike post" : "Like post"}
          aria-pressed={liked}
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-smooth",
              liked && "fill-secondary",
            )}
          />
          <span className="font-medium">{formatCount(likeCount)}</span>
        </button>

        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">{formatCount(post.commentCount)}</span>
        </span>

        <button
          type="button"
          onClick={() => toast.info("Open Wallet to tip this creator!")}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-accent/15 text-accent hover:bg-accent/25 transition-smooth border border-accent/30"
          data-ocid="post-detail-send-icp-btn"
        >
          <Send className="w-3.5 h-3.5" />
          Tip ICP
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Edit Post Form
// ---------------------------------------------------------------------------
interface EditPostFormProps {
  post: LocalPost;
  onSave: (text: string, imageUrl: string) => void;
  onCancel: () => void;
  isSaving: boolean;
}

function EditPostForm({ post, onSave, onCancel, isSaving }: EditPostFormProps) {
  const [text, setText] = useState(post.content);
  const [imageUrl, setImageUrl] = useState(post.imageUrl ?? "");
  const [imagePreview, setImagePreview] = useState(post.imageUrl ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isUploading, progress, uploadFile } = useFileUpload();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    try {
      const url = await uploadFile(file);
      setImageUrl(url);
    } catch {
      setImagePreview(imageUrl);
    }
  }

  return (
    <div
      className="card-elevated rounded-xl p-4 space-y-3"
      data-ocid="post-detail-edit-form"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-sm text-foreground">
          Edit Post
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="w-7 h-7 text-muted-foreground"
          onClick={onCancel}
          aria-label="Cancel edit"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-muted border-0 text-foreground resize-none min-h-24 focus-visible:ring-1"
        maxLength={500}
        data-ocid="post-detail-edit-textarea"
      />

      {/* File upload for image */}
      <div className="space-y-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          data-ocid="post-detail-edit-image-file-input"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-secondary transition-smooth disabled:opacity-50 px-2 py-1.5 rounded-md border border-border hover:border-secondary/50"
          data-ocid="post-detail-edit-image-btn"
        >
          <Image className="w-3.5 h-3.5" />
          {isUploading
            ? `Uploading… ${progress}%`
            : imagePreview
              ? "Change photo"
              : "Add photo"}
        </button>
        {imagePreview && (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Post preview"
              className="w-full rounded-lg object-cover max-h-40"
            />
            <button
              type="button"
              onClick={() => {
                setImageUrl("");
                setImagePreview("");
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-card/80 flex items-center justify-center text-foreground hover:bg-card transition-smooth"
              aria-label="Remove image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          data-ocid="post-detail-edit-cancel"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          className="bg-primary text-primary-foreground"
          onClick={() => onSave(text, imageUrl)}
          disabled={!text.trim() || isSaving || isUploading}
          data-ocid="post-detail-edit-save"
        >
          {isSaving ? <LoadingSpinner size="sm" /> : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Comment Row
// ---------------------------------------------------------------------------
interface CommentRowProps {
  comment: LocalComment;
  canDelete: boolean;
  onDelete: (commentId: string) => void;
  isDeleting: boolean;
}

function CommentRow({
  comment,
  canDelete,
  onDelete,
  isDeleting,
}: CommentRowProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [replyPrefix, setReplyPrefix] = useState("");

  // expose to parent via callback? No — just local state for UI
  void replyPrefix;

  function toggleLike() {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  }

  return (
    <div className="card-elevated rounded-xl p-4" data-ocid="comment-row">
      <div className="flex items-start gap-3">
        <Avatar name={comment.authorName} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
              <span className="font-display font-semibold text-sm text-foreground truncate">
                {comment.authorName}
              </span>
              <span className="text-xs text-muted-foreground shrink-0">
                @{comment.authorUsername}
              </span>
              <span className="text-xs text-muted-foreground shrink-0">
                · {formatTimeAgo(comment.createdAt)}
              </span>
            </div>
            {canDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 shrink-0 text-muted-foreground hover:text-destructive"
                onClick={() => onDelete(comment.id)}
                disabled={isDeleting}
                aria-label="Delete comment"
                data-ocid="comment-delete-btn"
              >
                {isDeleting ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Trash2 className="w-3 h-3" />
                )}
              </Button>
            )}
          </div>

          <p className="text-sm text-foreground leading-relaxed break-words">
            {comment.content}
          </p>

          <div className="flex items-center gap-4 mt-2.5">
            <button
              type="button"
              onClick={toggleLike}
              className={`flex items-center gap-1.5 text-xs transition-smooth ${
                liked
                  ? "text-secondary"
                  : "text-muted-foreground hover:text-secondary"
              }`}
              aria-label={`${liked ? "Unlike" : "Like"} comment`}
              aria-pressed={liked}
              data-ocid="comment-like-btn"
            >
              <Heart
                className={`w-3.5 h-3.5 ${liked ? "fill-secondary" : ""}`}
              />
              <span>{formatCount(likeCount)}</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth"
              onClick={() => setReplyPrefix(`@${comment.authorUsername} `)}
            >
              Reply
            </button>
            <button
              type="button"
              onClick={() =>
                toast.info(`Tip ICP to ${comment.authorName} — open Wallet!`)
              }
              className="flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 transition-smooth ml-auto"
            >
              <Send className="w-3 h-3" />
              Tip ICP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PostDetailPage
// ---------------------------------------------------------------------------
export function PostDetailPage() {
  const { id } = useParams({ from: "/post/$id" });
  const navigate = useNavigate();
  const { actor, isReady } = useBackend();
  const { principal } = useAuth();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null,
  );

  const { data: post, isLoading: postLoading } = useQuery<LocalPost>({
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
    initialData: SAMPLE_POST,
  });

  const { data: comments, isLoading: commentsLoading } = useQuery<
    LocalComment[]
  >({
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
    initialData: SAMPLE_COMMENTS,
  });

  const addComment = useMutation({
    mutationFn: async (text: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.addComment(BigInt(id), text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setCommentText("");
      toast.success("Comment added!");
    },
    onError: () => toast.error("Failed to add comment"),
  });

  const deleteComment = useMutation({
    mutationFn: async (commentId: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteComment(BigInt(id), BigInt(commentId));
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      toast.success("Comment deleted.");
    },
    onError: () => toast.error("Failed to delete comment"),
    onSettled: () => setDeletingCommentId(null),
  });

  const likePost = useMutation({
    mutationFn: async (currentlyLiked: boolean) => {
      if (!actor) return;
      const bigId = BigInt(id);
      if (currentlyLiked) {
        await actor.unlikePost(bigId);
      } else {
        await actor.likePost(bigId);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["post", id] }),
  });

  const editPost = useMutation({
    mutationFn: async ({
      text,
      imageUrl,
    }: { text: string; imageUrl: string }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.editPost(BigInt(id), text, imageUrl || null);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      setIsEditing(false);
      toast.success("Post updated!");
    },
    onError: () => toast.error("Failed to update post"),
  });

  const deletePost = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deletePost(BigInt(id));
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      toast.success("Post deleted.");
      navigate({ to: "/feed" });
    },
    onError: () => toast.error("Failed to delete post"),
  });

  function handleDeletePost() {
    if (
      !confirm(
        "Are you sure you want to delete this post? This cannot be undone.",
      )
    )
      return;
    deletePost.mutate();
  }

  function handleDeleteComment(commentId: string) {
    if (!confirm("Delete this comment?")) return;
    setDeletingCommentId(commentId);
    deleteComment.mutate(commentId);
  }

  const isPostAuthor =
    !!principal &&
    !!post?.authorPrincipal &&
    principal === post.authorPrincipal;

  return (
    <Layout onWalletOpen={() => navigate({ to: "/wallet" })}>
      {/* Back button + title */}
      <div className="flex items-center gap-3 mb-4 sticky top-0 bg-background/90 backdrop-blur-md z-10 py-2 -mx-1 px-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/feed" })}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Go back"
          data-ocid="post-detail-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-display font-bold text-lg text-foreground">Post</h1>
        {post && (
          <div className="ml-auto flex items-center gap-3 text-muted-foreground text-sm">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {formatCount(post.likeCount)}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {formatCount(post.commentCount)}
            </span>
          </div>
        )}
      </div>

      {/* Post or Edit Form */}
      {postLoading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner size="md" />
        </div>
      ) : post ? (
        isEditing ? (
          <EditPostForm
            post={post}
            onSave={(text, imageUrl) => editPost.mutate({ text, imageUrl })}
            onCancel={() => setIsEditing(false)}
            isSaving={editPost.isPending}
          />
        ) : (
          <FullPost
            post={post}
            isAuthor={isPostAuthor}
            onLike={() => likePost.mutate(post.liked ?? false)}
            onEdit={() => setIsEditing(true)}
            onDelete={handleDeletePost}
            isDeleting={deletePost.isPending}
          />
        )
      ) : null}

      <Separator className="my-5 bg-border" />

      {/* Comments header */}
      <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3 px-1">
        {comments?.length ?? 0} Comments
      </h2>

      {/* Comments list */}
      <div className="space-y-3 pb-32" data-ocid="post-detail-comments-list">
        {commentsLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="md" />
          </div>
        ) : (
          comments?.map((comment) => (
            <CommentRow
              key={comment.id}
              comment={comment}
              canDelete={
                !!principal && (principal === comment.authorId || isPostAuthor)
              }
              onDelete={handleDeleteComment}
              isDeleting={
                deletingCommentId === comment.id && deleteComment.isPending
              }
            />
          ))
        )}
      </div>

      {/* Sticky comment input */}
      <div className="fixed bottom-16 left-0 right-0 z-30 bg-card/95 backdrop-blur-lg border-t border-border px-4 py-3 md:relative md:bottom-auto md:bg-transparent md:border-0 md:px-0 md:py-0 md:mt-4">
        <div className="max-w-2xl mx-auto flex gap-3 items-end">
          <Avatar name={principal?.slice(0, 8) ?? "You"} size="sm" />
          <div className="flex-1 flex items-end gap-2 bg-muted rounded-2xl px-4 py-2 border border-border focus-within:border-primary/50 transition-smooth">
            <Textarea
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 min-h-9 max-h-32 bg-transparent border-0 text-foreground placeholder:text-muted-foreground resize-none text-sm p-0 focus-visible:ring-0 shadow-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (commentText.trim() && !addComment.isPending) {
                    addComment.mutate(commentText);
                  }
                }
              }}
              data-ocid="post-detail-comment-input"
            />
            <Button
              size="icon"
              onClick={() => addComment.mutate(commentText)}
              disabled={!commentText.trim() || addComment.isPending}
              className="w-8 h-8 rounded-full bg-primary text-primary-foreground shrink-0 mb-0.5"
              aria-label="Submit comment"
              data-ocid="post-detail-comment-submit"
            >
              {addComment.isPending ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
