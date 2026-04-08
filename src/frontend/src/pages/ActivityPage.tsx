import { Avatar } from "@/components/common/Avatar";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import { Activity, Heart, MessageCircle, UserPlus, Zap } from "lucide-react";

type ActivityType = "like" | "comment" | "contact";

interface ActivityEvent {
  id: string;
  type: ActivityType;
  actorName: string;
  actorId: string;
  content?: string;
  postSnippet?: string;
  postId?: string;
  timeAgo: string;
}

const ACTIVITY_FEED: ActivityEvent[] = [
  {
    id: "a1",
    type: "like",
    actorName: "CryptoInsights",
    actorId: "p2",
    postSnippet: "ICP is fundamentally different from every other L1…",
    postId: "e2",
    timeAgo: "2m ago",
  },
  {
    id: "a2",
    type: "contact",
    actorName: "Sarah Chen",
    actorId: "p3",
    timeAgo: "14m ago",
  },
  {
    id: "a3",
    type: "comment",
    actorName: "Dev Marcus",
    actorId: "p4",
    content: "Totally agree — the reverse gas model is a game changer 🚀",
    postSnippet: "Why ICP is fundamentally different…",
    postId: "e2",
    timeAgo: "1h ago",
  },
  {
    id: "a4",
    type: "like",
    actorName: "Luna Nakamura",
    actorId: "p5",
    postSnippet: "Just launched my portfolio app fully on-chain…",
    postId: "e3",
    timeAgo: "3h ago",
  },
  {
    id: "a5",
    type: "comment",
    actorName: "CryptoInsights",
    actorId: "p2",
    content:
      "Check out what you built — this is the future of social media on ICP!",
    postId: "e1",
    timeAgo: "5h ago",
  },
  {
    id: "a6",
    type: "like",
    actorName: "Sarah Chen",
    actorId: "p3",
    postSnippet: "Decentralized social media changes everything…",
    postId: "e3",
    timeAgo: "8h ago",
  },
  {
    id: "a7",
    type: "contact",
    actorName: "Dev Marcus",
    actorId: "p4",
    timeAgo: "1d ago",
  },
];

const TYPE_CONFIG: Record<
  ActivityType,
  { icon: React.ElementType; label: string; color: string; bg: string }
> = {
  like: {
    icon: Heart,
    label: "liked your post",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  comment: {
    icon: MessageCircle,
    label: "commented on your post",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  contact: {
    icon: UserPlus,
    label: "added you as a contact",
    color: "text-accent",
    bg: "bg-accent/10",
  },
};

function ActivityItem({
  event,
  onActorClick,
  onPostClick,
}: {
  event: ActivityEvent;
  onActorClick: (id: string) => void;
  onPostClick?: (id: string) => void;
}) {
  const config = TYPE_CONFIG[event.type];
  const Icon = config.icon;

  return (
    <div
      className="card-elevated rounded-xl p-4 flex items-start gap-3"
      data-ocid={`activity-item-${event.id}`}
    >
      <button
        type="button"
        className="relative shrink-0 mt-0.5"
        onClick={() => onActorClick(event.actorId)}
        aria-label={`View ${event.actorName}'s profile`}
      >
        <Avatar name={event.actorName} size="md" />
        <span
          className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${config.bg} border-2 border-background flex items-center justify-center`}
        >
          <Icon className={`w-2.5 h-2.5 ${config.color}`} />
        </span>
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug">
          <button
            type="button"
            className="font-semibold hover:underline"
            onClick={() => onActorClick(event.actorId)}
          >
            {event.actorName}
          </button>{" "}
          <span className="text-muted-foreground">{config.label}</span>
        </p>

        {event.content && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 italic">
            "{event.content}"
          </p>
        )}

        {event.postSnippet && !event.content && event.postId && (
          <button
            type="button"
            className="text-xs text-muted-foreground mt-0.5 truncate block max-w-full hover:text-foreground transition-colors text-left"
            onClick={() => onPostClick?.(event.postId!)}
          >
            {event.postSnippet}
          </button>
        )}
      </div>

      <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
        {event.timeAgo}
      </span>
    </div>
  );
}

function EmptyActivity({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center"
      data-ocid="activity-empty"
    >
      <Zap className="w-12 h-12 text-muted-foreground/30 mb-4" />
      <p className="font-display font-semibold text-foreground mb-1">
        No {label} yet
      </p>
      <p className="text-sm text-muted-foreground">
        Activity from your contacts will appear here
      </p>
    </div>
  );
}

export function ActivityPage() {
  const navigate = useNavigate();

  const likeEvents = ACTIVITY_FEED.filter((e) => e.type === "like");
  const commentEvents = ACTIVITY_FEED.filter((e) => e.type === "comment");
  const contactEvents = ACTIVITY_FEED.filter((e) => e.type === "contact");

  const handleActorClick = (id: string) =>
    navigate({ to: "/profile/$id", params: { id } });

  const handlePostClick = (id: string) =>
    navigate({ to: "/post/$id", params: { id } });

  const renderList = (items: ActivityEvent[], emptyLabel: string) =>
    items.length === 0 ? (
      <EmptyActivity label={emptyLabel} />
    ) : (
      <div className="space-y-2" data-ocid="activity-list">
        {items.map((event) => (
          <ActivityItem
            key={event.id}
            event={event}
            onActorClick={handleActorClick}
            onPostClick={handlePostClick}
          />
        ))}
      </div>
    );

  return (
    <Layout onWalletOpen={() => navigate({ to: "/wallet" })}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-xl text-foreground">
              Activity
            </h1>
            <p className="text-xs text-muted-foreground">
              Your recent interactions
            </p>
          </div>
          <Badge
            variant="secondary"
            className="ml-auto text-xs bg-primary/10 text-primary border-primary/20 shrink-0"
          >
            {ACTIVITY_FEED.length} new
          </Badge>
        </div>

        {/* Filter tabs */}
        <Tabs defaultValue="all">
          <TabsList className="w-full bg-card border border-border mb-4">
            <TabsTrigger
              value="all"
              className="flex-1 text-xs data-[state=active]:bg-muted"
              data-ocid="activity-tab-all"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="flex-1 text-xs data-[state=active]:bg-muted"
              data-ocid="activity-tab-likes"
            >
              <Heart className="w-3 h-3 mr-1" />
              Likes
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="flex-1 text-xs data-[state=active]:bg-muted"
              data-ocid="activity-tab-comments"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Comments
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="flex-1 text-xs data-[state=active]:bg-muted"
              data-ocid="activity-tab-contacts"
            >
              <UserPlus className="w-3 h-3 mr-1" />
              Contacts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {renderList(ACTIVITY_FEED, "activity")}
          </TabsContent>
          <TabsContent value="likes">
            {renderList(likeEvents, "likes")}
          </TabsContent>
          <TabsContent value="comments">
            {renderList(commentEvents, "comments")}
          </TabsContent>
          <TabsContent value="contacts">
            {renderList(contactEvents, "contacts")}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
