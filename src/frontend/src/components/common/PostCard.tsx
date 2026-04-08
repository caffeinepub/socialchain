import { Button } from "@/components/ui/button";
import { formatCount, formatTimeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Send,
} from "lucide-react";
import { useState } from "react";
import { Avatar } from "./Avatar";

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar?: string;
  content: string;
  imageUrl?: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  createdAt: bigint | number;
  liked?: boolean;
}

interface PostCardProps {
  post: Post;
  onLike?: (postId: string, currentlyLiked: boolean) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onSendICP?: (authorId: string, authorName: string) => void;
  onClick?: (postId: string) => void;
}

export function PostCard({
  post,
  onLike,
  onComment,
  onShare,
  onSendICP,
  onClick,
}: PostCardProps) {
  const [liked, setLiked] = useState(post.liked ?? false);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  function handleLike() {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    onLike?.(post.id, liked);
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

  return (
    <div
      data-ocid="post-card"
      className="card-elevated rounded-xl overflow-hidden transition-smooth hover:border-border/60"
    >
      {/* Clickable post header + content */}
      <button
        type="button"
        className="w-full text-left cursor-pointer"
        onClick={() => onClick?.(post.id)}
        aria-label={`View post by ${post.authorName}`}
      >
        {/* Post header */}
        <div className="p-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar src={post.authorAvatar} name={post.authorName} size="md" />
            <div className="min-w-0">
              <p className="font-display font-semibold text-sm text-foreground truncate leading-tight">
                {post.authorName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                @{post.authorUsername} · {formatTimeAgo(post.createdAt)}
              </p>
            </div>
          </div>
          <div
            role="presentation"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 w-8 h-8 text-muted-foreground hover:text-foreground"
              aria-label="More options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Post content */}
        <div className="px-4 pb-3">
          <p className="text-sm leading-relaxed text-foreground break-words">
            {renderContent(post.content)}
          </p>
        </div>

        {/* Post media */}
        {post.imageUrl && (
          <div className="px-4 pb-3">
            <img
              src={post.imageUrl}
              alt={`Shared by ${post.authorName}`}
              className="w-full rounded-lg object-cover max-h-80"
              loading="lazy"
            />
          </div>
        )}
      </button>

      {/* Post actions — separate from the clickable area */}
      <div className="px-4 py-2 border-t border-border flex items-center gap-1">
        <button
          type="button"
          data-ocid="post-like-btn"
          onClick={handleLike}
          className={cn(
            "btn-social flex items-center gap-1.5",
            liked ? "text-secondary" : "text-muted-foreground",
          )}
          aria-label={`${liked ? "Unlike" : "Like"} post`}
          aria-pressed={liked}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-smooth",
              liked && "fill-secondary",
            )}
          />
          <span className="text-xs font-medium">{formatCount(likeCount)}</span>
        </button>

        <button
          type="button"
          data-ocid="post-comment-btn"
          onClick={() => onComment?.(post.id)}
          className="btn-social flex items-center gap-1.5 text-muted-foreground"
          aria-label="Comment on post"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs font-medium">
            {formatCount(post.commentCount)}
          </span>
        </button>

        <button
          type="button"
          data-ocid="post-share-btn"
          onClick={() => onShare?.(post.id)}
          className="btn-social flex items-center gap-1.5 text-muted-foreground"
          aria-label="Share post"
        >
          <Repeat2 className="w-4 h-4" />
          <span className="text-xs font-medium">
            {formatCount(post.shareCount)}
          </span>
        </button>

        <button
          type="button"
          data-ocid="post-send-icp-btn"
          onClick={() => onSendICP?.(post.authorId, post.authorName)}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-accent/15 text-accent hover:bg-accent/25 transition-smooth border border-accent/30"
          aria-label={`Send ICP to ${post.authorName}`}
        >
          <Send className="w-3.5 h-3.5" />
          Send ICP
        </button>
      </div>
    </div>
  );
}
