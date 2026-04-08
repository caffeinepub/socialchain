import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  online?: boolean;
}

const sizes = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-xl",
};

function getInitials(name: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function getColorClass(name: string): string {
  const colors = [
    "bg-primary/20 text-primary",
    "bg-secondary/20 text-secondary",
    "bg-accent/20 text-accent",
    "bg-chart-5/20 text-chart-5",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return colors[hash % colors.length];
}

export function Avatar({
  src,
  name = "",
  size = "md",
  className,
  online,
}: AvatarProps) {
  const sizeClass = sizes[size];

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      {src ? (
        <img
          src={src}
          alt={name || "Avatar"}
          className={cn(
            sizeClass,
            "rounded-full object-cover ring-2 ring-border",
          )}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <div
          className={cn(
            sizeClass,
            "rounded-full flex items-center justify-center font-display font-semibold ring-2 ring-border",
            name ? getColorClass(name) : "bg-muted text-muted-foreground",
          )}
          aria-label={name || "Avatar"}
        >
          {name ? getInitials(name) : "?"}
        </div>
      )}
      {online && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-background" />
      )}
    </div>
  );
}
