import { Avatar } from "@/components/common/Avatar";
import { EmptyState } from "@/components/common/EmptyState";
import {
  LoadingSpinner,
  PostSkeleton,
} from "@/components/common/LoadingSpinner";
import { type Post, PostCard } from "@/components/common/PostCard";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Image, PenSquare, Plus, X, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// Sample feed data for initial load
const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    authorId: "p1",
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
  },
  {
    id: "2",
    authorId: "p2",
    authorName: "CryptoInsights",
    authorUsername: "ci",
    content:
      "ICP just broke resistance at $12. Looking bullish for Q2! The on-chain metrics are incredibly strong right now. Accumulation phase is real 🚀 #ICP #crypto #blockchain",
    likeCount: 892,
    commentCount: 134,
    shareCount: 67,
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    liked: true,
  },
  {
    id: "3",
    authorId: "p3",
    authorName: "Sarah Chen",
    authorUsername: "sarahc",
    content:
      "Just received 5 ICP as a tip for my photography series! Web3 social is real — getting paid for your content without any middleman 🙌 @socialchain #ICP #web3",
    likeCount: 2143,
    commentCount: 267,
    shareCount: 189,
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    liked: false,
  },
  {
    id: "4",
    authorId: "p4",
    authorName: "Dev Marcus",
    authorUsername: "devmarcus",
    content:
      "Built my first dapp on ICP in 48 hours. The developer experience with Motoko is surprisingly smooth. Canister upgrades with no downtime is a game changer 💻 #buildonICP",
    likeCount: 445,
    commentCount: 32,
    shareCount: 88,
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
    liked: false,
  },
  {
    id: "5",
    authorId: "p5",
    authorName: "Luna Nakamura",
    authorUsername: "lunan",
    content:
      "Morning walks > morning scrolls. But when you can do both on #SocialChain… 🌅 Tipping my favorite artist 2 ICP for that last album drop was so seamless!",
    likeCount: 3891,
    commentCount: 512,
    shareCount: 234,
    createdAt: Date.now() - 1000 * 60 * 60 * 18,
    liked: true,
  },
];

const STORY_USERS = [
  { id: "p1", name: "Alex Rivers", username: "arivers", hasNew: true },
  { id: "p3", name: "Sarah Chen", username: "sarahc", hasNew: true },
  { id: "p2", name: "CryptoInsights", username: "ci", hasNew: false },
  { id: "p5", name: "Luna Nakamura", username: "lunan", hasNew: true },
  { id: "p4", name: "Dev Marcus", username: "devmarcus", hasNew: false },
  { id: "p6", name: "NexaDAO", username: "nexadao", hasNew: true },
  { id: "p7", name: "Wave Rider", username: "waverider", hasNew: false },
];

type FeedTab = "foryou" | "following";

// Map backend Post to local Post shape
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
): Post {
  return {
    id: p.id.toString(),
    authorId: p.author.toText(),
    authorName: p.author.toText().slice(0, 10),
    authorUsername: p.author.toText().slice(0, 8),
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

export function FeedPage() {
  const { actor, isReady } = useBackend();
  const { principal } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImageUrl, setNewPostImageUrl] = useState("");
  const [newPostImagePreview, setNewPostImagePreview] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [activeTab, setActiveTab] = useState<FeedTab>("foryou");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isUploading,
    progress,
    uploadFile,
    reset: resetUpload,
  } = useFileUpload();

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
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

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["feed"],
    queryFn: async () => {
      if (!actor) return SAMPLE_POSTS;
      try {
        const result = await actor.getAllPosts();
        if (result && result.length > 0) {
          return result
            .map((p) => mapBackendPost(p, principal))
            .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
        }
        return SAMPLE_POSTS;
      } catch {
        return SAMPLE_POSTS;
      }
    },
    enabled: isReady,
    initialData: SAMPLE_POSTS,
    staleTime: 30_000,
  });

  const createPost = useMutation({
    mutationFn: async ({
      content,
      imageUrl,
    }: {
      content: string;
      imageUrl: string;
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
      toast.success("Post published!");
    },
    onError: () => toast.error("Failed to publish post"),
  });

  const likePost = useMutation({
    mutationFn: async ({
      postId,
      liked,
    }: {
      postId: string;
      liked: boolean;
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
    },
  });

  function handlePostSubmit() {
    if (!newPostContent.trim()) return;
    createPost.mutate({ content: newPostContent, imageUrl: newPostImageUrl });
  }

  return (
    <Layout
      onNewPost={() => setIsNewPostOpen(true)}
      onWalletOpen={() => navigate({ to: "/wallet" })}
    >
      {/* Stories bar */}
      <div className="card-elevated rounded-xl p-3 mb-4 overflow-x-auto">
        <div className="flex gap-3 items-center min-w-max">
          {/* Add story (my story) */}
          <div className="flex flex-col items-center gap-1.5 cursor-pointer select-none">
            <div className="relative w-14 h-14 shrink-0">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border">
                <Avatar name={principal?.slice(0, 8) ?? "You"} size="md" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center border-2 border-card">
                <Plus className="w-3 h-3 text-primary-foreground" />
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium leading-tight max-w-[56px] truncate text-center">
              Your Story
            </span>
          </div>

          {/* Story rings */}
          {STORY_USERS.map((user) => (
            <button
              key={user.id}
              type="button"
              className="flex flex-col items-center gap-1.5 cursor-pointer select-none transition-smooth hover:opacity-80 active:scale-95"
              aria-label={`View ${user.name}'s story`}
              data-ocid="story-ring"
            >
              <div
                className={`w-14 h-14 rounded-full p-[2px] ${
                  user.hasNew
                    ? "bg-gradient-to-tr from-accent via-secondary to-primary"
                    : "bg-muted"
                }`}
              >
                <div className="w-full h-full rounded-full border-2 border-card overflow-hidden flex items-center justify-center">
                  <Avatar name={user.name} size="md" />
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium leading-tight max-w-[56px] truncate text-center">
                {user.username}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab toggle — For You / Following */}
      <div className="flex items-center gap-0 mb-4 card-elevated rounded-xl overflow-hidden p-1">
        <button
          type="button"
          data-ocid="feed-tab-foryou"
          onClick={() => setActiveTab("foryou")}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-smooth ${
            activeTab === "foryou"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            For You
          </span>
        </button>
        <button
          type="button"
          data-ocid="feed-tab-following"
          onClick={() => setActiveTab("following")}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-smooth ${
            activeTab === "following"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Following
        </button>
      </div>

      {/* New post quick compose */}
      <div className="card-elevated rounded-xl p-4 mb-4 flex gap-3 items-center">
        <Avatar name={principal?.slice(0, 8) ?? "You"} size="md" />
        <button
          type="button"
          className="flex-1 h-10 px-4 rounded-full bg-muted text-muted-foreground text-sm text-left hover:bg-muted/80 transition-smooth"
          onClick={() => setIsNewPostOpen(true)}
          data-ocid="feed-compose-trigger"
        >
          What&apos;s happening?
        </button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setShowImageInput(true);
            setIsNewPostOpen(true);
          }}
          aria-label="Add photo"
          className="text-secondary hover:text-secondary/80"
        >
          <Image className="w-5 h-5" />
        </Button>
      </div>

      {/* Feed */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="space-y-4" data-ocid="feed-list">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={(id, currentlyLiked) =>
                likePost.mutate({ postId: id, liked: currentlyLiked })
              }
              onComment={(id) => navigate({ to: "/post/$id", params: { id } })}
              onClick={(id) => navigate({ to: "/post/$id", params: { id } })}
              onSendICP={(_authorId, authorName) =>
                toast.info(
                  `Send ICP to ${authorName} — open your Wallet to send!`,
                )
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={PenSquare}
          title="No posts yet"
          description="Be the first to share something with the SocialChain community."
          action={{
            label: "Create first post",
            onClick: () => setIsNewPostOpen(true),
          }}
        />
      )}

      {/* Floating action button */}
      <button
        type="button"
        onClick={() => setIsNewPostOpen(true)}
        data-ocid="feed-fab"
        aria-label="Create new post"
        className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-smooth z-40 md:hidden"
      >
        <PenSquare className="w-6 h-6" />
      </button>

      {/* New post modal */}
      <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
        <DialogContent className="sm:max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              New Post
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-3 mt-2">
            <Avatar name={principal?.slice(0, 8) ?? "You"} size="md" />
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="What's happening? Share your thoughts, #hashtags, @mentions..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-28 bg-muted border-0 text-foreground placeholder:text-muted-foreground resize-none focus-visible:ring-1"
                maxLength={500}
                data-ocid="new-post-textarea"
              />

              {showImageInput && (
                <div className="space-y-2">
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                    data-ocid="new-post-image-file-input"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-secondary/50 hover:text-secondary transition-smooth text-sm disabled:opacity-50"
                    data-ocid="new-post-image-pick-btn"
                  >
                    <Image className="w-4 h-4" />
                    {isUploading
                      ? `Uploading… ${progress}%`
                      : newPostImagePreview
                        ? "Change photo"
                        : "Choose photo to upload"}
                  </button>
                  {newPostImagePreview && (
                    <div className="relative">
                      <img
                        src={newPostImagePreview}
                        alt="Post preview"
                        className="w-full rounded-lg object-cover max-h-40"
                      />
                      <button
                        type="button"
                        onClick={handleClearImage}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-card/80 flex items-center justify-center text-foreground hover:bg-card transition-smooth"
                        aria-label="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowImageInput((v) => !v);
                      if (showImageInput) handleClearImage();
                    }}
                    className={`p-2 rounded-md transition-smooth ${
                      showImageInput
                        ? "text-secondary bg-secondary/10"
                        : "text-muted-foreground hover:text-secondary hover:bg-secondary/10"
                    }`}
                    aria-label="Toggle image picker"
                    data-ocid="new-post-image-toggle"
                  >
                    <Image className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {newPostContent.length}/500
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsNewPostOpen(false);
                      setShowImageInput(false);
                      handleClearImage();
                    }}
                    data-ocid="new-post-cancel"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handlePostSubmit}
                    disabled={
                      !newPostContent.trim() ||
                      createPost.isPending ||
                      isUploading
                    }
                    className="bg-primary text-primary-foreground font-semibold"
                    data-ocid="new-post-submit"
                  >
                    {createPost.isPending ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      "Post"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
