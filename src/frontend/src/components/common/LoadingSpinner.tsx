import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizes = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-[3px]",
};

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      <div
        className={cn(
          sizes[size],
          "rounded-full border-border border-t-primary animate-spin",
        )}
        role="status"
        aria-label={label ?? "Loading"}
      />
      {label && (
        <p className="text-sm text-muted-foreground animate-pulse">{label}</p>
      )}
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className="card-elevated rounded-xl p-4 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3.5 bg-muted rounded w-32" />
          <div className="h-3 bg-muted rounded w-20" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-4/5" />
      </div>
      <div className="h-40 bg-muted rounded-lg" />
      <div className="flex gap-4">
        <div className="h-7 bg-muted rounded w-16" />
        <div className="h-7 bg-muted rounded w-16" />
        <div className="h-7 bg-muted rounded w-16" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="card-elevated rounded-xl p-6 space-y-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-muted shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-muted rounded w-40" />
          <div className="h-3 bg-muted rounded w-24" />
        </div>
      </div>
      <div className="h-3 bg-muted rounded w-full" />
      <div className="h-3 bg-muted rounded w-2/3" />
    </div>
  );
}
