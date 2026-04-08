import { Avatar } from "@/components/common/Avatar";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  CheckCheck,
  Coins,
  Heart,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

type NotificationType = "like" | "comment" | "follow" | "tip" | "mention";

interface Notification {
  id: string;
  type: NotificationType;
  actorName: string;
  actorId: string;
  content?: string;
  amount?: string;
  timeAgo: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "tip",
    actorName: "CryptoInsights",
    actorId: "p2",
    amount: "0.5 ICP",
    timeAgo: "5m ago",
    read: false,
  },
  {
    id: "n2",
    type: "follow",
    actorName: "Sarah Chen",
    actorId: "p3",
    timeAgo: "22m ago",
    read: false,
  },
  {
    id: "n3",
    type: "comment",
    actorName: "Dev Marcus",
    actorId: "p4",
    content: "This is exactly what Web3 social should look like 🔥",
    timeAgo: "1h ago",
    read: false,
  },
  {
    id: "n4",
    type: "like",
    actorName: "Luna Nakamura",
    actorId: "p5",
    timeAgo: "2h ago",
    read: true,
  },
  {
    id: "n5",
    type: "mention",
    actorName: "CryptoInsights",
    actorId: "p2",
    content:
      "Have you tried the new SocialChain wallet feature? You would love it!",
    timeAgo: "4h ago",
    read: true,
  },
  {
    id: "n6",
    type: "tip",
    actorName: "Luna Nakamura",
    actorId: "p5",
    amount: "1.2 ICP",
    timeAgo: "1d ago",
    read: true,
  },
  {
    id: "n7",
    type: "follow",
    actorName: "Dev Marcus",
    actorId: "p4",
    timeAgo: "2d ago",
    read: true,
  },
];

const TYPE_CONFIG: Record<
  NotificationType,
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
  follow: {
    icon: UserPlus,
    label: "started following you",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  tip: {
    icon: Coins,
    label: "tipped you",
    color: "text-chart-5",
    bg: "bg-chart-5/10",
  },
  mention: {
    icon: MessageCircle,
    label: "mentioned you",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
};

function NotificationItem({
  notif,
  onMarkRead,
  onNavigate,
}: {
  notif: Notification;
  onMarkRead: (id: string) => void;
  onNavigate: (id: string) => void;
}) {
  const config = TYPE_CONFIG[notif.type];
  const Icon = config.icon;

  return (
    <button
      type="button"
      data-ocid={`notification-item-${notif.id}`}
      className={`w-full rounded-xl p-4 flex items-start gap-3 transition-smooth text-left border ${
        notif.read
          ? "bg-card border-border/40 hover:border-border/70"
          : "bg-primary/5 border-primary/20 hover:border-primary/40"
      }`}
      onClick={() => {
        onMarkRead(notif.id);
        onNavigate(notif.actorId);
      }}
    >
      {/* Avatar with unread indicator */}
      <div className="relative shrink-0 mt-0.5">
        {!notif.read && (
          <span className="absolute -top-0.5 -left-0.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background z-10" />
        )}
        <Avatar name={notif.actorName} size="md" />
        <span
          className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${config.bg} border-2 border-background flex items-center justify-center`}
        >
          <Icon className={`w-2.5 h-2.5 ${config.color}`} />
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug">
          <span className="font-semibold">{notif.actorName}</span>{" "}
          <span className="text-muted-foreground">{config.label}</span>
          {notif.amount && (
            <span className={`font-semibold ${config.color}`}>
              {" "}
              — {notif.amount}
            </span>
          )}
        </p>
        {notif.content && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 italic">
            "{notif.content}"
          </p>
        )}
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-xs text-muted-foreground">{notif.timeAgo}</span>
        {!notif.read && (
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
        )}
      </div>
    </button>
  );
}

function EmptyNotifications({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center"
      data-ocid="notifications-empty"
    >
      <Bell className="w-12 h-12 text-muted-foreground/30 mb-4" />
      <p className="font-display font-semibold text-foreground mb-1">
        All caught up!
      </p>
      <p className="text-sm text-muted-foreground">
        {label === "all"
          ? "No notifications yet — come back soon."
          : `No ${label} notifications here.`}
      </p>
    </div>
  );
}

export function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(
    INITIAL_NOTIFICATIONS,
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const handleNavigate = (actorId: string) =>
    navigate({ to: "/profile/$id", params: { id: actorId } });

  const renderList = (items: Notification[], emptyLabel: string) =>
    items.length === 0 ? (
      <EmptyNotifications label={emptyLabel} />
    ) : (
      <div className="space-y-2" data-ocid="notifications-list">
        {items.map((notif) => (
          <NotificationItem
            key={notif.id}
            notif={notif}
            onMarkRead={markRead}
            onNavigate={handleNavigate}
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
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-xl text-foreground">
              Notifications
            </h1>
            <p className="text-xs text-muted-foreground">
              Stay on top of your activity
            </p>
          </div>
          {unreadCount > 0 && (
            <Badge
              variant="secondary"
              className="text-xs bg-primary/10 text-primary border-primary/20 shrink-0"
            >
              {unreadCount} unread
            </Badge>
          )}
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground gap-1.5 shrink-0"
              onClick={markAllRead}
              data-ocid="notifications-mark-all-read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="w-full bg-card border border-border mb-4">
            <TabsTrigger
              value="all"
              className="flex-1 text-xs data-[state=active]:bg-muted"
              data-ocid="notifications-tab-all"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="flex-1 text-xs data-[state=active]:bg-muted"
              data-ocid="notifications-tab-unread"
            >
              Unread{unreadCount > 0 ? ` (${unreadCount})` : ""}
            </TabsTrigger>
            <TabsTrigger
              value="tips"
              className="flex-1 text-xs data-[state=active]:bg-muted"
              data-ocid="notifications-tab-tips"
            >
              <Coins className="w-3.5 h-3.5 mr-1 text-chart-5" />
              Tips
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {renderList(notifications, "all")}
          </TabsContent>
          <TabsContent value="unread">
            {renderList(
              notifications.filter((n) => !n.read),
              "unread",
            )}
          </TabsContent>
          <TabsContent value="tips">
            {renderList(
              notifications.filter((n) => n.type === "tip"),
              "tips",
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
