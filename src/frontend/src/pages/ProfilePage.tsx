import { Avatar } from "@/components/common/Avatar";
import { EmptyState } from "@/components/common/EmptyState";
import {
  LoadingSpinner,
  PostSkeleton,
} from "@/components/common/LoadingSpinner";
import { type Post, PostCard } from "@/components/common/PostCard";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { useFileUpload } from "@/hooks/useFileUpload";
import {
  useGetMyProfile,
  useGetProfile,
  useUpdateProfile,
} from "@/hooks/useProfile";
import { formatCount, truncateAddress } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Camera,
  Check,
  Copy,
  Edit2,
  Grid3X3,
  Link,
  List,
  MapPin,
  Rocket,
  Upload,
  Wallet,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ---------------------------------------------------------------------------
// Local Profile shape (mapped from backend Profile)
// ---------------------------------------------------------------------------
interface LocalProfile {
  id: string;
  username?: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  contactsCount: number;
  postsCount?: number;
  walletAddress?: string;
  location?: string;
  joinedDate?: string;
}

const SAMPLE_PROFILE: LocalProfile = {
  id: "p1",
  username: "arivers",
  displayName: "Alex Rivers",
  bio: "Photographer & crypto enthusiast. Capturing the world one shot at a time 📸 | ICP believer since 2021",
  avatarUrl: "",
  contactsCount: 892,
  postsCount: 234,
  walletAddress: "ae4f8b2c1d9e7a3f",
  location: "San Francisco, CA",
  joinedDate: "March 2023",
};

const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    authorId: "p1",
    authorName: "Alex Rivers",
    authorUsername: "arivers",
    content:
      "Sunset vibes at Mt. Rainier! Absolutely breathtaking 🌄 #nature #travel",
    imageUrl: "/assets/generated/hero-social-crypto.dim_1200x600.jpg",
    likeCount: 1247,
    commentCount: 48,
    shareCount: 15,
    createdAt: Date.now() - 1000 * 60 * 23,
  },
  {
    id: "6",
    authorId: "p1",
    authorName: "Alex Rivers",
    authorUsername: "arivers",
    content:
      "Just hit 12K followers on SocialChain! Thank you all for the love and support 🙏 Every ICP tip means the world to me. #community",
    likeCount: 3200,
    commentCount: 445,
    shareCount: 120,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
];

const COVER_GRADIENTS = [
  "from-primary/50 via-secondary/30 to-accent/40",
  "from-secondary/50 via-accent/30 to-primary/40",
  "from-accent/50 via-primary/30 to-secondary/40",
  "from-chart-5/40 via-primary/30 to-secondary/40",
];

function getCoverGradient(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h += seed.charCodeAt(i);
  return COVER_GRADIENTS[h % COVER_GRADIENTS.length];
}

// ---------------------------------------------------------------------------
// Map backend Post → local Post
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
  ownerPrincipal: string,
): Post {
  return {
    id: p.id.toString(),
    authorId: p.author.toText(),
    authorName: ownerPrincipal.slice(0, 10),
    authorUsername: ownerPrincipal.slice(0, 8),
    content: p.text,
    imageUrl: p.imageUrl ?? undefined,
    likeCount: Number(p.likeCount),
    commentCount: 0,
    shareCount: 0,
    createdAt: Number(p.createdAt / BigInt(1_000_000)),
  };
}

// ---------------------------------------------------------------------------
// Invite Link Section
// ---------------------------------------------------------------------------
interface InviteLinkSectionProps {
  username?: string;
  onSetUsername: () => void;
}

function InviteLinkSection({
  username,
  onSetUsername,
}: InviteLinkSectionProps) {
  const [copied, setCopied] = useState(false);
  const inviteUrl = username
    ? `${window.location.origin}/add/${username}`
    : null;

  function handleCopy() {
    if (!inviteUrl) return;
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Invite link copied!");
    });
  }

  if (!username) {
    return (
      <div className="rounded-xl bg-muted/50 border border-border p-4 mb-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Link className="w-4 h-4 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight">
                Personalized invite link
              </p>
              <p className="text-xs text-muted-foreground">
                Set a username to share your profile
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/10 shrink-0"
            onClick={onSetUsername}
            data-ocid="profile-set-username-btn"
          >
            Set username
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-muted/50 border border-border p-4 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <Link className="w-4 h-4 text-primary" />
        <p className="text-sm font-semibold text-foreground">
          Your invite link
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-muted rounded-lg px-3 py-2 text-xs font-mono text-muted-foreground truncate border border-border">
          /add/{username}
        </div>
        <Button
          size="icon"
          variant="outline"
          className="shrink-0 w-9 h-9 border-border"
          onClick={handleCopy}
          aria-label="Copy invite link"
          data-ocid="profile-copy-invite-btn"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-primary" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Set Username Modal
// ---------------------------------------------------------------------------
interface SetUsernameModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess: () => void;
}

function SetUsernameModal({
  open,
  onOpenChange,
  onSuccess,
}: SetUsernameModalProps) {
  const { actor } = useBackend();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!username.trim() || !actor) return;
    setLoading(true);
    try {
      const result = await actor.setUsername(username.trim());
      if (result.__kind__ === "ok") {
        toast.success("Username set!");
        onSuccess();
        onOpenChange(false);
      } else {
        toast.error(result.err ?? "Username unavailable");
      }
    } catch {
      toast.error("Failed to set username");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-lg text-foreground">
            Set Username
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-1">
          <p className="text-sm text-muted-foreground">
            Choose a unique username for your personalized invite link.
          </p>
          <div className="space-y-1">
            <Label className="text-xs uppercase tracking-wide text-foreground">
              Username
            </Label>
            <div className="flex items-center bg-muted border border-input rounded-md">
              <span className="pl-3 text-muted-foreground text-sm">@</span>
              <Input
                placeholder="yourhandle"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""),
                  )
                }
                className="border-0 bg-transparent focus-visible:ring-0 text-foreground"
                data-ocid="set-username-input"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-border"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary text-primary-foreground"
              onClick={handleSubmit}
              disabled={!username.trim() || loading}
              data-ocid="set-username-submit"
            >
              {loading ? "Saving…" : "Confirm"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Edit Profile Modal
// ---------------------------------------------------------------------------
interface EditProfileModalProps {
  profile: LocalProfile;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

function EditProfileModal({
  profile,
  open,
  onOpenChange,
}: EditProfileModalProps) {
  const updateProfile = useUpdateProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isUploading, progress, uploadFile } = useFileUpload();
  const [form, setForm] = useState({
    displayName: profile.displayName,
    bio: profile.bio,
    avatarUrl: profile.avatarUrl,
  });
  const [avatarPreview, setAvatarPreview] = useState(profile.avatarUrl);

  async function handleAvatarFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
    try {
      const url = await uploadFile(file);
      setForm((f) => ({ ...f, avatarUrl: url }));
    } catch {
      setAvatarPreview(form.avatarUrl);
    }
  }

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({
        displayName: form.displayName,
        bio: form.bio,
        avatarUrl: form.avatarUrl,
      });
      toast.success("Profile updated!");
      onOpenChange(false);
    } catch {
      toast.error("Failed to save — please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-lg text-foreground">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 pt-1">
          {/* Avatar upload */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <Avatar
                src={avatarPreview}
                name={form.displayName}
                size="xl"
                className="ring-4 ring-primary/40"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-0 right-0 p-1.5 bg-primary rounded-full hover:bg-primary/90 transition-smooth disabled:opacity-50"
                aria-label="Upload avatar photo"
                data-ocid="edit-profile-avatar-upload-btn"
              >
                {isUploading ? (
                  <span className="text-[9px] text-primary-foreground font-mono">
                    {progress}%
                  </span>
                ) : (
                  <Camera className="w-3.5 h-3.5 text-primary-foreground" />
                )}
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarFileChange}
              data-ocid="edit-profile-avatar-file-input"
            />
            {isUploading && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Upload className="w-3 h-3" />
                Uploading photo… {progress}%
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-foreground text-xs uppercase tracking-wide">
              Display Name
            </Label>
            <Input
              placeholder="Your name"
              value={form.displayName}
              onChange={(e) =>
                setForm({ ...form, displayName: e.target.value })
              }
              className="bg-muted border-input text-foreground"
              data-ocid="edit-profile-display-name"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-foreground text-xs uppercase tracking-wide">
              Bio
            </Label>
            <Textarea
              placeholder="Tell the world about yourself…"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={3}
              className="bg-muted border-input text-foreground resize-none"
              data-ocid="edit-profile-bio"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <Button
              variant="outline"
              className="flex-1 border-border text-foreground"
              onClick={() => onOpenChange(false)}
              data-ocid="edit-profile-cancel"
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary text-primary-foreground"
              onClick={handleSave}
              disabled={updateProfile.isPending || isUploading}
              data-ocid="edit-profile-save"
            >
              {updateProfile.isPending ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Create Profile Form
// ---------------------------------------------------------------------------
interface CreateProfileFormProps {
  onCreated: () => void;
}

function CreateProfileForm({ onCreated }: CreateProfileFormProps) {
  const { actor } = useBackend();
  const [form, setForm] = useState({ displayName: "", bio: "" });
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!form.displayName.trim()) {
      toast.error("Display name is required.");
      return;
    }
    setLoading(true);
    try {
      await actor?.createProfile(form.displayName, form.bio, null);
      toast.success("Profile created! Welcome to SocialChain 🎉");
      onCreated();
    } catch {
      toast.error("Failed to create profile — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="card-elevated rounded-2xl p-7 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <Rocket className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display font-bold text-2xl text-foreground">
              Create Your Profile
            </h2>
            <p className="text-muted-foreground text-sm">
              Join SocialChain and connect with the world on-chain.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-foreground text-xs uppercase tracking-wide">
                Display Name
              </Label>
              <Input
                placeholder="Alex Rivers"
                value={form.displayName}
                onChange={(e) =>
                  setForm({ ...form, displayName: e.target.value })
                }
                className="bg-muted border-input text-foreground"
                data-ocid="create-profile-display-name"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-foreground text-xs uppercase tracking-wide">
                Bio{" "}
                <span className="text-muted-foreground normal-case">
                  (optional)
                </span>
              </Label>
              <Textarea
                placeholder="What are you about?"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={2}
                className="bg-muted border-input text-foreground resize-none"
                data-ocid="create-profile-bio"
              />
            </div>
          </div>

          <Button
            className="w-full bg-primary text-primary-foreground font-semibold"
            onClick={handleCreate}
            disabled={loading}
            data-ocid="create-profile-submit"
          >
            {loading ? "Creating…" : "Get Started on SocialChain"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat pill
// ---------------------------------------------------------------------------
function StatPill({
  value,
  label,
  ocid,
}: {
  value: number;
  label: string;
  ocid: string;
}) {
  return (
    <button
      type="button"
      className="text-center hover:opacity-75 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
      data-ocid={ocid}
    >
      <div className="font-display font-bold text-lg text-foreground leading-none">
        {formatCount(value)}
      </div>
      <div className="text-muted-foreground text-xs mt-0.5">{label}</div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main ProfilePage
// ---------------------------------------------------------------------------
export function ProfilePage() {
  const { id } = useParams({ from: "/profile/$id" });
  const navigate = useNavigate();
  const { actor, isReady } = useBackend();
  const { principal } = useAuth();
  const queryClient = useQueryClient();

  const [editOpen, setEditOpen] = useState(false);
  const [setUsernameOpen, setSetUsernameOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const isOwnProfile = id === "me" || id === principal;
  const targetId = id === "me" ? (principal ?? "") : id;

  const myProfileQuery = useGetMyProfile();
  const otherProfileQuery = useGetProfile(isOwnProfile ? undefined : targetId);
  const profileQuery = isOwnProfile ? myProfileQuery : otherProfileQuery;

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["user-posts", targetId],
    queryFn: async () => {
      if (!actor) return SAMPLE_POSTS;
      try {
        const { Principal } = await import("@icp-sdk/core/principal");
        const principalObj = Principal.fromText(targetId);
        const result = await actor.getPostsByUser(principalObj);
        if (result && result.length > 0) {
          return result.map((p) => mapBackendPost(p, targetId));
        }
        return SAMPLE_POSTS;
      } catch {
        return SAMPLE_POSTS;
      }
    },
    enabled: isReady && !!targetId,
    initialData: SAMPLE_POSTS,
  });

  const noProfile =
    isOwnProfile && profileQuery.data != null && !profileQuery.data.displayName;

  // Map backend profile to local shape
  const profile: LocalProfile = profileQuery.data?.displayName
    ? {
        id: profileQuery.data.id.toText(),
        displayName: profileQuery.data.displayName,
        bio: profileQuery.data.bio,
        avatarUrl: profileQuery.data.avatarUrl ?? "",
        username: profileQuery.data.username ?? undefined,
        contactsCount: profileQuery.data.contacts?.length ?? 0,
        postsCount: posts?.length ?? 0,
      }
    : SAMPLE_PROFILE;

  const coverGradient = getCoverGradient(profile.id ?? targetId ?? "default");

  if (profileQuery.isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center gap-4 py-20">
          <LoadingSpinner size="lg" label="Loading profile…" />
        </div>
      </Layout>
    );
  }

  if (noProfile) {
    return (
      <Layout>
        <CreateProfileForm onCreated={() => profileQuery.refetch()} />
      </Layout>
    );
  }

  return (
    <Layout onWalletOpen={() => navigate({ to: "/wallet" })}>
      {!isOwnProfile && (
        <div className="mb-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground -ml-1"
            onClick={() => navigate({ to: "/feed" })}
            data-ocid="profile-back-btn"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Feed
          </Button>
        </div>
      )}

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card-elevated rounded-2xl overflow-hidden mb-5"
      >
        {/* Cover Photo */}
        <div
          className={cn(
            "relative h-36 sm:h-44 bg-gradient-to-br",
            coverGradient,
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent" />
          <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full bg-primary/20 blur-2xl" />
          <div className="absolute -bottom-4 left-1/3 w-28 h-28 rounded-full bg-secondary/20 blur-xl" />
        </div>

        <div className="px-5 pb-5">
          {/* Avatar row */}
          <div className="flex items-end justify-between -mt-12 mb-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/60 to-secondary/40 blur-sm" />
              <div className="relative ring-4 ring-card rounded-full">
                <Avatar
                  src={profile.avatarUrl}
                  name={profile.displayName}
                  size="xl"
                  online={isOwnProfile}
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap justify-end">
              {isOwnProfile ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border text-foreground hover:bg-muted"
                  onClick={() => setEditOpen(true)}
                  data-ocid="profile-edit-btn"
                >
                  <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-accent/50 text-accent hover:bg-accent/10"
                    onClick={() => toast.info("Send ICP — use the Wallet page")}
                    data-ocid="profile-send-icp-btn"
                  >
                    <Wallet className="w-3.5 h-3.5 mr-1.5" />
                    Send ICP
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-ocid="profile-follow-btn"
                    onClick={() =>
                      toast.success(`Following ${profile.displayName}!`)
                    }
                  >
                    <Zap className="w-3.5 h-3.5 mr-1.5" />
                    Follow
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Name + handle */}
          <div className="mb-2">
            <h1 className="font-display font-bold text-xl text-foreground leading-tight">
              {profile.displayName}
            </h1>
            {profile.username ? (
              <p className="text-muted-foreground text-sm">
                @{profile.username}
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">
                @{profile.displayName.toLowerCase().replace(/\s+/g, "")}
              </p>
            )}
          </div>

          {profile.bio && (
            <p className="text-sm text-foreground/90 leading-relaxed mb-3 max-w-prose">
              {profile.bio}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground mb-5">
            {profile.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {profile.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Joined {profile.joinedDate ?? "2024"}
            </span>
            {profile.walletAddress && (
              <Badge
                variant="secondary"
                className="text-[10px] font-mono bg-accent/10 text-accent border border-accent/30 px-2 py-0.5"
              >
                <Wallet className="w-2.5 h-2.5 mr-1" />
                {truncateAddress(profile.walletAddress)}
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6 border-t border-border pt-4">
            <StatPill
              value={profile.postsCount ?? posts?.length ?? 0}
              label="Posts"
              ocid="profile-posts-stat"
            />
            <StatPill
              value={profile.contactsCount}
              label="Contacts"
              ocid="profile-contacts-stat"
            />
          </div>
        </div>
      </motion.div>

      {/* Invite link section (own profile only) */}
      {isOwnProfile && (
        <InviteLinkSection
          username={profile.username}
          onSetUsername={() => setSetUsernameOpen(true)}
        />
      )}

      {/* Posts section */}
      <Tabs defaultValue="posts">
        <div className="flex items-center justify-between mb-3">
          <TabsList className="bg-card border border-border">
            <TabsTrigger
              value="posts"
              className="data-[state=active]:bg-muted text-sm"
              data-ocid="profile-posts-tab"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-muted text-sm"
              data-ocid="profile-activity-tab"
            >
              Activity
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-1 bg-card border border-border rounded-lg p-1">
            <button
              type="button"
              aria-label="List view"
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-md transition-smooth",
                viewMode === "list"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              data-ocid="profile-list-view-btn"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-md transition-smooth",
                viewMode === "grid"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              data-ocid="profile-grid-view-btn"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <TabsContent value="posts">
          {postsLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            viewMode === "list" ? (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                data-ocid="profile-posts-list"
              >
                {posts.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <PostCard
                      post={post}
                      onClick={(postId) =>
                        navigate({ to: "/post/$id", params: { id: postId } })
                      }
                      onSendICP={(_authorId, authorName) =>
                        toast.info(`Send ICP to ${authorName} — use Wallet`)
                      }
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                data-ocid="profile-posts-grid"
              >
                {posts.map((post, i) => (
                  <motion.button
                    key={post.id}
                    type="button"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() =>
                      navigate({ to: "/post/$id", params: { id: post.id } })
                    }
                    className="relative aspect-square bg-muted overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    data-ocid={`profile-grid-post-${post.id}`}
                  >
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-2 bg-card/80">
                        <p className="text-[10px] text-muted-foreground line-clamp-4 text-center leading-tight">
                          {post.content}
                        </p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-smooth" />
                  </motion.button>
                ))}
              </motion.div>
            )
          ) : (
            <EmptyState
              icon={Grid3X3}
              title="No posts yet"
              description={
                isOwnProfile
                  ? "Share your first moment with the world."
                  : "This user hasn't posted anything yet."
              }
            />
          )}
        </TabsContent>

        <TabsContent value="activity">
          <EmptyState
            icon={Zap}
            title="Activity coming soon"
            description="Follow interactions and ICP transactions will appear here."
          />
        </TabsContent>
      </Tabs>

      {/* Edit Profile Modal */}
      {editOpen && (
        <EditProfileModal
          profile={profile}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      )}

      {/* Set Username Modal */}
      <SetUsernameModal
        open={setUsernameOpen}
        onOpenChange={setSetUsernameOpen}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["profile", "me"] });
        }}
      />
    </Layout>
  );
}
