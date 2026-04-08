export type TokenType = "ICP" | "ckBTC" | "ckETH" | "ckUSDC" | "ckUSDT";

// Token metadata
const TOKEN_META: Record<
  TokenType,
  { symbol: string; decimals: number; colorClass: string }
> = {
  ICP: { symbol: "ICP", decimals: 8, colorClass: "text-accent" },
  ckBTC: { symbol: "ckBTC", decimals: 8, colorClass: "text-orange-400" },
  ckETH: { symbol: "ckETH", decimals: 18, colorClass: "text-blue-400" },
  ckUSDC: { symbol: "ckUSDC", decimals: 6, colorClass: "text-green-400" },
  ckUSDT: { symbol: "ckUSDT", decimals: 6, colorClass: "text-emerald-400" },
};

export function tokenSymbol(token: TokenType): string {
  return TOKEN_META[token].symbol;
}

export function tokenDecimals(token: TokenType): number {
  return TOKEN_META[token].decimals;
}

export function tokenColor(token: TokenType): string {
  return TOKEN_META[token].colorClass;
}

/**
 * Format a raw bigint amount to human-readable string with token symbol.
 * e.g. formatAmount(100_000_000n, "ICP") → "1.00 ICP"
 */
export function formatAmount(
  amount: bigint | number,
  token: TokenType = "ICP",
  opts?: { showSymbol?: boolean; maxDecimals?: number },
): string {
  const decimals = tokenDecimals(token);
  const divisor = 10 ** decimals;
  const n = typeof amount === "bigint" ? Number(amount) : amount;
  const value = n / divisor;
  const maxDec = opts?.maxDecimals ?? (decimals > 8 ? 4 : 2);
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDec,
  });
  return opts?.showSymbol === false
    ? formatted
    : `${formatted} ${tokenSymbol(token)}`;
}

/**
 * Format a relative time string from a nanosecond timestamp.
 */
export function formatDate(ns: bigint | number): string {
  const ms = typeof ns === "bigint" ? Number(ns / BigInt(1_000_000)) : ns;
  const now = Date.now();
  const diff = now - ms;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

/**
 * Truncate a principal/address for display.
 */
export function formatAddress(addr: string, start = 6, end = 4): string {
  if (addr.length <= start + end + 3) return addr;
  return `${addr.slice(0, start)}...${addr.slice(-end)}`;
}

/**
 * Format a compact count (1.2K, 4.5M).
 */
export function formatCount(n: bigint | number): string {
  const num = typeof n === "bigint" ? Number(n) : n;
  if (num < 1000) return num.toString();
  if (num < 1_000_000) return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
}

// Legacy aliases for backwards compat
export { formatDate as formatTimeAgo };
export { formatAddress as truncateAddress };
export function formatICP(e8s: bigint | number): string {
  return formatAmount(e8s, "ICP");
}
