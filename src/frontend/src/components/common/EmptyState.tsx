import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-ocid="empty-state"
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6 gap-4",
        className,
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center shadow-subtle">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display font-semibold text-lg text-foreground">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-xs">
            {description}
          </p>
        )}
      </div>
      {action && (
        <Button
          onClick={action.onClick}
          className="mt-2 gradient-hero text-primary-foreground border-0"
          data-ocid="empty-state-cta"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
