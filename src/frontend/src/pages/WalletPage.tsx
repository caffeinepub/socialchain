import { TokenType, TxStatus, TxType } from "@/backend.d";
import type { Transaction } from "@/backend.d";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
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
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { formatAddress } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Coins,
  Copy,
  History,
  RefreshCw,
  Send,
  Wallet,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Token config ─────────────────────────────────────────────────────────────

const ALL_TOKENS = [
  TokenType.ICP,
  TokenType.ckBTC,
  TokenType.ckETH,
  TokenType.ckUSDC,
  TokenType.ckUSDT,
] as const;

type AppTokenType = (typeof ALL_TOKENS)[number];

interface TokenMeta {
  name: string;
  symbol: string;
  decimals: number;
  icon: string;
  usdRate: number;
  fee: bigint;
  accentClass: string;
  bgClass: string;
  borderClass: string;
}

const TOKEN_META: Record<AppTokenType, TokenMeta> = {
  [TokenType.ICP]: {
    name: "Internet Computer",
    symbol: "ICP",
    decimals: 8,
    icon: "∞",
    usdRate: 11.42,
    fee: BigInt(10_000),
    accentClass: "text-accent",
    bgClass: "bg-accent/15",
    borderClass: "border-accent/30",
  },
  [TokenType.ckBTC]: {
    name: "Chain-Key Bitcoin",
    symbol: "ckBTC",
    decimals: 8,
    icon: "₿",
    usdRate: 67_000,
    fee: BigInt(10),
    accentClass: "text-chart-3",
    bgClass: "bg-[oklch(var(--chart-3)/0.15)]",
    borderClass: "border-[oklch(var(--chart-3)/0.3)]",
  },
  [TokenType.ckETH]: {
    name: "Chain-Key Ethereum",
    symbol: "ckETH",
    decimals: 18,
    icon: "Ξ",
    usdRate: 3_400,
    fee: BigInt(2_000_000_000_000),
    accentClass: "text-primary",
    bgClass: "bg-primary/15",
    borderClass: "border-primary/30",
  },
  [TokenType.ckUSDC]: {
    name: "Chain-Key USD Coin",
    symbol: "ckUSDC",
    decimals: 6,
    icon: "$",
    usdRate: 1.0,
    fee: BigInt(10_000),
    accentClass: "text-chart-5",
    bgClass: "bg-[oklch(var(--chart-5)/0.15)]",
    borderClass: "border-[oklch(var(--chart-5)/0.3)]",
  },
  [TokenType.ckUSDT]: {
    name: "Chain-Key Tether",
    symbol: "ckUSDT",
    decimals: 6,
    icon: "₮",
    usdRate: 1.0,
    fee: BigInt(10_000),
    accentClass: "text-secondary",
    bgClass: "bg-secondary/15",
    borderClass: "border-secondary/30",
  },
};

// Mock balances for when actor is unavailable
const MOCK_BALANCES: Record<AppTokenType, bigint> = {
  [TokenType.ICP]: BigInt(14_852_000_000),
  [TokenType.ckBTC]: BigInt(1_500_000),
  [TokenType.ckETH]: BigInt(520_000_000_000_000_000n),
  [TokenType.ckUSDC]: BigInt(245_780_000),
  [TokenType.ckUSDT]: BigInt(128_500_000),
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: BigInt(1),
    txType: TxType.receive,
    token: TokenType.ICP,
    amount: BigInt(1_050_000_000),
    counterparty: { toText: () => "lunan-xyz-7ppdn-aaaaa" } as never,
    timestamp: BigInt(Date.now() - 1000 * 60 * 35) * BigInt(1_000_000),
    memo: "Great photography content!",
    status: TxStatus.completed,
  },
  {
    id: BigInt(2),
    txType: TxType.send,
    token: TokenType.ckBTC,
    amount: BigInt(500_000),
    counterparty: { toText: () => "devmarcus-abc-n5iex-bbbbb" } as never,
    timestamp: BigInt(Date.now() - 1000 * 60 * 60 * 3) * BigInt(1_000_000),
    status: TxStatus.completed,
  },
  {
    id: BigInt(3),
    txType: TxType.receive,
    token: TokenType.ckUSDC,
    amount: BigInt(50_000_000),
    counterparty: { toText: () => "ci-cryptoinsights-ccccc-ddddd" } as never,
    timestamp: BigInt(Date.now() - 1000 * 60 * 60 * 8) * BigInt(1_000_000),
    status: TxStatus.completed,
  },
  {
    id: BigInt(4),
    txType: TxType.send,
    token: TokenType.ICP,
    amount: BigInt(300_000_000),
    counterparty: { toText: () => "sarahc-social-eeeee-fffff" } as never,
    timestamp: BigInt(Date.now() - 1000 * 60 * 60 * 24) * BigInt(1_000_000),
    memo: "Love your work!",
    status: TxStatus.completed,
  },
  {
    id: BigInt(5),
    txType: TxType.receive,
    token: TokenType.ckETH,
    amount: BigInt(150_000_000_000_000_000n),
    counterparty: { toText: () => "ggggg-hhhhh-iiiii-jjjjj" } as never,
    timestamp: BigInt(Date.now() - 1000 * 60 * 60 * 48) * BigInt(1_000_000),
    status: TxStatus.pending,
  },
];

type SendStep = "form" | "confirm" | "sending" | "success" | "error";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTokenUsd(amount: bigint, token: AppTokenType): string {
  const meta = TOKEN_META[token];
  const divisor = 10 ** meta.decimals;
  const value = (Number(amount) / divisor) * meta.usdRate;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatAmountLocal(amount: bigint, token: AppTokenType): string {
  const meta = TOKEN_META[token];
  const divisor = 10 ** meta.decimals;
  const value = Number(amount) / divisor;
  const maxDec = meta.decimals > 8 ? 6 : 4;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDec,
  });
}

function feeDisplay(token: AppTokenType): string {
  const meta = TOKEN_META[token];
  const divisor = 10 ** meta.decimals;
  const val = Number(meta.fee) / divisor;
  const maxDec = meta.decimals > 8 ? 8 : 6;
  return `${val.toFixed(maxDec).replace(/\.?0+$/, "")} ${meta.symbol}`;
}

function formatTimeAgo(nsTimestamp: bigint): string {
  const ms = Number(nsTimestamp / BigInt(1_000_000));
  const diff = Date.now() - ms;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// ─── Token Balance Card ───────────────────────────────────────────────────────

function TokenCard({
  token,
  balance,
  isActive,
  onSelect,
}: {
  token: AppTokenType;
  balance: bigint;
  isActive: boolean;
  onSelect: () => void;
}) {
  const meta = TOKEN_META[token];
  return (
    <button
      type="button"
      onClick={onSelect}
      data-ocid={`token-card-${token.toLowerCase()}`}
      className={cn(
        "w-full text-left rounded-xl p-3.5 border transition-smooth",
        "hover:bg-muted/60 active:scale-[0.98]",
        isActive
          ? `${meta.bgClass} ${meta.borderClass} shadow-card`
          : "bg-card border-border",
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center text-base font-bold border shrink-0",
              meta.bgClass,
              meta.borderClass,
              meta.accentClass,
            )}
          >
            {meta.icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">
              {meta.symbol}
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight truncate max-w-[80px]">
              {meta.name}
            </p>
          </div>
        </div>
        {isActive && (
          <div
            className={cn(
              "w-1.5 h-1.5 rounded-full shrink-0",
              meta.accentClass.replace("text-", "bg-"),
            )}
          />
        )}
      </div>
      <p className={cn("font-mono font-bold text-sm", meta.accentClass)}>
        {formatAmountLocal(balance, token)}
      </p>
      <p className="font-mono text-[10px] text-muted-foreground">
        ≈ ${formatTokenUsd(balance, token)}
      </p>
    </button>
  );
}

// ─── QR Display ───────────────────────────────────────────────────────────────

function PrincipalQRDisplay({ value }: { value: string }) {
  const [loaded, setLoaded] = useState(false);
  const encoded = encodeURIComponent(value);
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encoded}&bgcolor=1a1a1a&color=F97316&margin=10`;

  return (
    <div className="relative mx-auto w-44 h-44 rounded-2xl overflow-hidden border-2 border-accent/30 bg-muted flex items-center justify-center">
      {!loaded && <LoadingSpinner size="sm" />}
      <img
        src={url}
        alt="Wallet QR Code"
        className={cn("w-40 h-40 rounded-xl", !loaded && "hidden")}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
}

// ─── Transaction Row ──────────────────────────────────────────────────────────

function TxRow({ tx }: { tx: Transaction }) {
  const token = tx.token as AppTokenType;
  const meta = TOKEN_META[token] ?? TOKEN_META[TokenType.ICP];
  const isSent = tx.txType === TxType.send;
  const counterpartyText =
    tx.counterparty.toText?.() ?? String(tx.counterparty);

  return (
    <div
      className="flex items-center gap-3 p-4 hover:bg-muted/40 transition-smooth"
      data-ocid="wallet-tx-row"
    >
      <div
        className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
          isSent ? "bg-accent/10" : "bg-secondary/10",
        )}
      >
        {isSent ? (
          <ArrowUpRight className="w-4 h-4 text-accent" />
        ) : (
          <ArrowDownLeft className="w-4 h-4 text-secondary" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <p className="text-sm font-medium text-foreground truncate">
            {isSent ? "Sent" : "Received"} {meta.symbol}
          </p>
          {tx.status === TxStatus.pending && (
            <Badge
              variant="outline"
              className="text-[10px] text-chart-3 border-chart-3/30 py-0 px-1"
            >
              pending
            </Badge>
          )}
          {tx.status === TxStatus.failed && (
            <Badge
              variant="outline"
              className="text-[10px] text-destructive border-destructive/30 py-0 px-1"
            >
              failed
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {isSent ? "To" : "From"}: {formatAddress(counterpartyText, 8, 4)}
        </p>
        {tx.memo && (
          <p className="text-xs text-muted-foreground italic truncate mt-0.5">
            &ldquo;{tx.memo}&rdquo;
          </p>
        )}
        <p className="text-[10px] text-muted-foreground">
          {formatTimeAgo(tx.timestamp)}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p
          className={cn(
            "font-mono font-bold text-sm",
            isSent ? "text-accent" : "text-secondary",
          )}
        >
          {isSent ? "−" : "+"}
          {formatAmountLocal(tx.amount, token)}
        </p>
        <p className="text-[10px] text-muted-foreground font-mono">
          ≈ ${formatTokenUsd(tx.amount, token)}
        </p>
        <span
          className={cn(
            "text-[9px] font-mono uppercase tracking-wide",
            meta.accentClass,
          )}
        >
          {meta.symbol}
        </span>
      </div>
    </div>
  );
}

// ─── Send Dialog ──────────────────────────────────────────────────────────────

interface SendDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  token: AppTokenType;
  balance: bigint;
  onConfirm: (to: string, amount: string, memo: string) => void;
  isPending: boolean;
  step: SendStep;
  onReset: () => void;
}

function SendDialog({
  open,
  onOpenChange,
  token,
  balance,
  onConfirm,
  isPending,
  step,
  onReset,
}: SendDialogProps) {
  const meta = TOKEN_META[token];
  const [sendTo, setSendTo] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [sendMemo, setSendMemo] = useState("");

  const amountNum = Number.parseFloat(sendAmount) || 0;
  const divisor = 10 ** meta.decimals;
  const amountRaw = BigInt(Math.round(amountNum * divisor));
  const totalWithFee = amountRaw + meta.fee;
  const canSend =
    sendTo.trim().length > 5 && amountNum > 0 && totalWithFee <= balance;

  function handleClose() {
    if (step !== "sending") {
      onOpenChange(false);
      setTimeout(() => {
        setSendTo("");
        setSendAmount("");
        setSendMemo("");
        onReset();
      }, 200);
    }
  }

  function handleMax() {
    const maxVal = Number(balance) / divisor - Number(meta.fee) / divisor;
    setSendAmount(maxVal > 0 ? maxVal.toFixed(meta.decimals > 8 ? 8 : 4) : "0");
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2 text-foreground">
            <Send className={cn("w-5 h-5", meta.accentClass)} />
            Send {meta.symbol}
          </DialogTitle>
        </DialogHeader>

        {step === "form" && (
          <div className="space-y-4 mt-2">
            {/* Token info banner */}
            <div
              className={cn(
                "rounded-lg px-3 py-2 flex items-center gap-2.5",
                meta.bgClass,
                meta.borderClass,
                "border",
              )}
            >
              <span className={cn("text-xl font-bold", meta.accentClass)}>
                {meta.icon}
              </span>
              <div>
                <p className={cn("text-sm font-semibold", meta.accentClass)}>
                  {meta.symbol}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Available: {formatAmountLocal(balance, token)} {meta.symbol}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="send-to"
                className="text-sm text-muted-foreground"
              >
                Recipient Principal ID
              </Label>
              <Input
                id="send-to"
                placeholder="aaaaa-aa or full principal"
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
                className="bg-muted border-0 font-mono text-xs"
                data-ocid="send-recipient-input"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="send-amount"
                className="text-sm text-muted-foreground"
              >
                Amount ({meta.symbol})
              </Label>
              <div className="relative">
                <Input
                  id="send-amount"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="any"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  className="bg-muted border-0 font-mono text-sm pr-20"
                  data-ocid="send-amount-input"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <span className={cn("font-bold text-xs", meta.accentClass)}>
                    {meta.symbol}
                  </span>
                  <button
                    type="button"
                    onClick={handleMax}
                    className="text-[10px] text-muted-foreground hover:text-foreground bg-muted/80 px-1 py-0.5 rounded"
                  >
                    MAX
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="send-memo"
                className="text-sm text-muted-foreground"
              >
                Memo{" "}
                <span className="text-muted-foreground/50">(optional)</span>
              </Label>
              <Input
                id="send-memo"
                placeholder="Add a note..."
                value={sendMemo}
                onChange={(e) => setSendMemo(e.target.value)}
                className="bg-muted border-0 text-sm"
                data-ocid="send-memo-input"
              />
            </div>

            <div className="bg-muted/60 rounded-lg px-3 py-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Network fee</span>
                <span className="font-mono text-foreground">
                  {feeDisplay(token)}
                </span>
              </div>
              {amountNum > 0 && (
                <div className="flex justify-between text-xs border-t border-border pt-1 mt-1">
                  <span className="text-muted-foreground font-medium">
                    You send
                  </span>
                  <span className={cn("font-mono font-bold", meta.accentClass)}>
                    {(amountNum + Number(meta.fee) / divisor)
                      .toFixed(meta.decimals > 8 ? 8 : 6)
                      .replace(/\.?0+$/, "")}{" "}
                    {meta.symbol}
                  </span>
                </div>
              )}
            </div>

            <Button
              onClick={() => canSend && onConfirm(sendTo, sendAmount, sendMemo)}
              disabled={!canSend || isPending}
              className={cn(
                "w-full font-semibold",
                meta.bgClass,
                meta.accentClass,
                "hover:opacity-90 border",
                meta.borderClass,
              )}
              data-ocid="send-review-btn"
            >
              Review & Send
            </Button>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-4 mt-2">
            <p className="text-sm text-muted-foreground text-center">
              Please confirm this transaction
            </p>
            <div className="bg-muted rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">To</span>
                <code className="font-mono text-xs text-foreground truncate max-w-[160px]">
                  {formatAddress(sendTo, 10, 6)}
                </code>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className={cn("font-mono font-bold", meta.accentClass)}>
                  {sendAmount} {meta.symbol}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-mono text-muted-foreground">
                  {feeDisplay(token)}
                </span>
              </div>
              {sendMemo && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Memo</span>
                  <span className="text-foreground italic">{sendMemo}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onReset}
                data-ocid="send-cancel-btn"
              >
                Cancel
              </Button>
              <Button
                onClick={() => onConfirm(sendTo, sendAmount, sendMemo)}
                disabled={isPending}
                className={cn(
                  "flex-1 font-semibold",
                  meta.bgClass,
                  meta.accentClass,
                  "border",
                  meta.borderClass,
                )}
                data-ocid="send-confirm-btn"
              >
                Confirm Send
              </Button>
            </div>
          </div>
        )}

        {step === "sending" && (
          <div className="flex flex-col items-center py-8 gap-4">
            <div
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center",
                meta.bgClass,
              )}
            >
              <LoadingSpinner size="md" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">
                Sending {meta.symbol}...
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Broadcasting to Internet Computer
              </p>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center py-8 gap-4">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-secondary" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">
                Transfer complete!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Your {meta.symbol} has been sent.
              </p>
            </div>
            <Button
              onClick={() => {
                setSendTo("");
                setSendAmount("");
                setSendMemo("");
                onReset();
                onOpenChange(false);
              }}
              className="w-full bg-secondary/20 text-secondary border border-secondary/30 hover:bg-secondary/30"
              data-ocid="send-done-btn"
            >
              Done
            </Button>
          </div>
        )}

        {step === "error" && (
          <div className="flex flex-col items-center py-8 gap-4">
            <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">Transfer failed</p>
              <p className="text-sm text-muted-foreground mt-1">
                Check the recipient address and try again.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={onReset}
              data-ocid="send-retry-btn"
            >
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Receive Dialog ───────────────────────────────────────────────────────────

function ReceiveDialog({
  open,
  onOpenChange,
  principal,
  token,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  principal: string | null;
  token: AppTokenType;
}) {
  const meta = TOKEN_META[token];

  function copyAddress() {
    if (principal) {
      navigator.clipboard.writeText(principal);
      toast.success("Address copied to clipboard");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center justify-center gap-2 text-foreground">
            <ArrowDownLeft className="w-5 h-5 text-secondary" />
            Receive {meta.symbol}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2 space-y-4">
          {/* Token label */}
          <div
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg px-3 py-1.5 mx-auto w-fit",
              meta.bgClass,
              meta.borderClass,
              "border",
            )}
          >
            <span className={cn("font-bold text-sm", meta.accentClass)}>
              {meta.icon}
            </span>
            <span className={cn("text-sm font-semibold", meta.accentClass)}>
              {meta.name}
            </span>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Share your address to receive {meta.symbol} on ICP
          </p>

          {principal ? (
            <PrincipalQRDisplay value={principal} />
          ) : (
            <div className="w-44 h-44 bg-muted rounded-2xl flex items-center justify-center mx-auto">
              <p className="text-xs text-muted-foreground text-center px-4">
                Connect wallet to show QR code
              </p>
            </div>
          )}

          <div className="bg-muted rounded-xl p-3 space-y-2">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
              Your Principal Address
            </p>
            <code
              className="text-xs font-mono text-foreground break-all leading-relaxed block"
              data-ocid="receive-principal-address"
            >
              {principal ?? "Not connected"}
            </code>
          </div>

          <Button
            onClick={copyAddress}
            className="w-full bg-secondary/20 text-secondary border border-secondary/30 hover:bg-secondary/30 font-semibold"
            data-ocid="receive-copy-address"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Address
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function WalletPage() {
  const { actor, isReady } = useBackend();
  const { principal } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeToken, setActiveToken] = useState<AppTokenType>(TokenType.ICP);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [receiveDialogOpen, setReceiveDialogOpen] = useState(false);
  const [sendStep, setSendStep] = useState<SendStep>("form");
  const [pendingSend, setPendingSend] = useState<{
    to: string;
    amount: string;
    memo: string;
  } | null>(null);

  const activeMeta = TOKEN_META[activeToken];

  // Balances for all tokens
  const {
    data: balances,
    isFetching: balancesFetching,
    refetch: refetchBalances,
  } = useQuery({
    queryKey: ["wallet-balances-all"],
    queryFn: async () => {
      if (!actor) return MOCK_BALANCES;
      const results: Record<string, bigint> = {};
      await Promise.all(
        ALL_TOKENS.map(async (token) => {
          try {
            const bal = await actor.getBalance(token);
            results[token] = BigInt(bal ?? 0);
          } catch {
            results[token] = MOCK_BALANCES[token];
          }
        }),
      );
      return results as Record<AppTokenType, bigint>;
    },
    enabled: isReady,
    initialData: MOCK_BALANCES,
    refetchInterval: 30_000,
  });

  // Transaction history
  const { data: transactions, isFetching: txFetching } = useQuery<
    Transaction[]
  >({
    queryKey: ["wallet-transactions"],
    queryFn: async () => {
      if (!actor) return MOCK_TRANSACTIONS;
      try {
        const result = await actor.getTransactionHistory();
        return result?.length ? result : MOCK_TRANSACTIONS;
      } catch {
        return MOCK_TRANSACTIONS;
      }
    },
    enabled: isReady,
    initialData: MOCK_TRANSACTIONS,
  });

  // Send mutation
  const sendToken = useMutation({
    mutationFn: async ({
      to,
      amount,
      memo,
    }: { to: string; amount: string; memo: string }) => {
      if (!actor) throw new Error("Not connected");
      const meta = TOKEN_META[activeToken];
      const divisor = 10 ** meta.decimals;
      const rawAmount = BigInt(Math.round(Number.parseFloat(amount) * divisor));
      const { Principal } = await import("@icp-sdk/core/principal");
      const toPrincipal = Principal.fromText(to);
      const result = await actor.sendToken(
        activeToken,
        toPrincipal,
        rawAmount,
        memo || null,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onMutate: () => {
      setSendStep("sending");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet-balances-all"] });
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
      setSendStep("success");
      toast.success(`${activeMeta.symbol} sent successfully!`);
    },
    onError: (err) => {
      setSendStep("error");
      toast.error(
        `Send failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    },
  });

  function handleSendReview(to: string, amount: string, memo: string) {
    setPendingSend({ to, amount, memo });
    setSendStep("confirm");
  }

  function handleSendConfirm(to: string, amount: string, memo: string) {
    sendToken.mutate({ to, amount, memo });
  }

  function handleRefresh() {
    refetchBalances();
    queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
    toast.info("Refreshing balances...");
  }

  const activeBalance = balances?.[activeToken] ?? BigInt(0);
  const totalUsd = ALL_TOKENS.reduce((acc, token) => {
    const bal = balances?.[token] ?? BigInt(0);
    const meta = TOKEN_META[token];
    return acc + (Number(bal) / 10 ** meta.decimals) * meta.usdRate;
  }, 0);

  return (
    <Layout onWalletOpen={() => {}} onNewPost={() => navigate({ to: "/feed" })}>
      {/* ── Portfolio Header ── */}
      <div className="relative rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-card via-card to-card border border-border p-5">
        <div className="absolute top-0 right-0 w-52 h-52 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-secondary/8 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Wallet className="w-4 h-4" />
              <span className="font-medium">Portfolio Value</span>
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              aria-label="Refresh balances"
              className="p-1.5 rounded-lg hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
              data-ocid="wallet-refresh-btn"
            >
              <RefreshCw
                className={cn(
                  "w-3.5 h-3.5",
                  balancesFetching && "animate-spin",
                )}
              />
            </button>
          </div>

          <div className="mb-1 flex items-baseline gap-1.5">
            <span className="font-mono font-bold text-3xl text-foreground tracking-tight">
              $
              {totalUsd.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-muted-foreground text-sm font-mono">USD</span>
          </div>

          {principal && (
            <div className="flex items-center gap-2 mb-4">
              <code className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded-md flex-1 min-w-0 truncate">
                {formatAddress(principal, 14, 8)}
              </code>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(principal);
                  toast.success("Address copied");
                }}
                className="p-1.5 rounded hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground shrink-0"
                aria-label="Copy principal address"
                data-ocid="wallet-copy-address-btn"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => {
                setSendStep("form");
                setPendingSend(null);
                setSendDialogOpen(true);
              }}
              className="flex-1 bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 font-semibold"
              data-ocid="wallet-send-btn"
            >
              <Send className="w-4 h-4 mr-1.5" />
              Send
            </Button>
            <Button
              onClick={() => setReceiveDialogOpen(true)}
              variant="outline"
              className="flex-1 bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20 font-semibold"
              data-ocid="wallet-receive-btn"
            >
              <ArrowDownLeft className="w-4 h-4 mr-1.5" />
              Receive
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-border text-muted-foreground hover:bg-muted/60"
              onClick={() => toast.info("Token swaps coming in phase 2!")}
              data-ocid="wallet-swap-btn"
            >
              <RefreshCw className="w-4 h-4 mr-1.5" />
              Swap
            </Button>
          </div>
        </div>
      </div>

      {/* ── Tabs: Assets / History ── */}
      <Tabs defaultValue="assets">
        <TabsList className="w-full bg-card border border-border mb-4">
          <TabsTrigger
            value="assets"
            className="flex-1 data-[state=active]:bg-muted"
            data-ocid="wallet-assets-tab"
          >
            <Coins className="w-4 h-4 mr-1.5" />
            Assets
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="flex-1 data-[state=active]:bg-muted"
            data-ocid="wallet-history-tab"
          >
            <History className="w-4 h-4 mr-1.5" />
            History
          </TabsTrigger>
        </TabsList>

        {/* ── Assets Tab ── */}
        <TabsContent value="assets" className="space-y-3">
          {/* Token grid */}
          <div
            className="grid grid-cols-2 gap-2.5"
            data-ocid="wallet-token-grid"
          >
            {ALL_TOKENS.map((token) => (
              <TokenCard
                key={token}
                token={token}
                balance={balances?.[token] ?? BigInt(0)}
                isActive={activeToken === token}
                onSelect={() => setActiveToken(token)}
              />
            ))}
          </div>

          {/* Active token detail */}
          <div
            className={cn(
              "rounded-2xl border p-4 space-y-4",
              activeMeta.bgClass,
              activeMeta.borderClass,
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold border",
                    activeMeta.bgClass,
                    activeMeta.borderClass,
                    activeMeta.accentClass,
                  )}
                >
                  {activeMeta.icon}
                </div>
                <div>
                  <p
                    className={cn(
                      "font-semibold text-base",
                      activeMeta.accentClass,
                    )}
                  >
                    {activeMeta.symbol}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activeMeta.name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    "font-mono font-bold text-lg",
                    activeMeta.accentClass,
                  )}
                >
                  {formatAmountLocal(activeBalance, activeToken)}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  ≈ ${formatTokenUsd(activeBalance, activeToken)} USD
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => {
                  setSendStep("form");
                  setPendingSend(null);
                  setSendDialogOpen(true);
                }}
                className="flex-1 bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 text-xs font-semibold"
                data-ocid="token-send-btn"
              >
                <Send className="w-3.5 h-3.5 mr-1" />
                Send {activeMeta.symbol}
              </Button>
              <Button
                size="sm"
                onClick={() => setReceiveDialogOpen(true)}
                className="flex-1 bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20 text-xs font-semibold"
                data-ocid="token-receive-btn"
              >
                <ArrowDownLeft className="w-3.5 h-3.5 mr-1" />
                Receive
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-card/40 rounded-lg p-2">
                <p className="text-muted-foreground mb-0.5">Network fee</p>
                <p
                  className={cn(
                    "font-mono font-medium",
                    activeMeta.accentClass,
                  )}
                >
                  {feeDisplay(activeToken)}
                </p>
              </div>
              <div className="bg-card/40 rounded-lg p-2">
                <p className="text-muted-foreground mb-0.5">Network</p>
                <p className="font-mono font-medium text-foreground">ICP</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── History Tab ── */}
        <TabsContent value="history">
          {txFetching && !transactions?.length ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="md" />
            </div>
          ) : transactions?.length ? (
            <div
              className="card-elevated rounded-xl overflow-hidden divide-y divide-border"
              data-ocid="wallet-transactions-list"
            >
              {transactions.map((tx) => (
                <TxRow key={String(tx.id)} tx={tx} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={History}
              title="No transactions yet"
              description="Send or receive tokens to see your history here."
              action={{
                label: "Send Tokens",
                onClick: () => {
                  setSendStep("form");
                  setPendingSend(null);
                  setSendDialogOpen(true);
                },
              }}
            />
          )}
        </TabsContent>
      </Tabs>

      {/* ── Dialogs ── */}
      <SendDialog
        open={sendDialogOpen}
        onOpenChange={setSendDialogOpen}
        token={activeToken}
        balance={activeBalance}
        onConfirm={(to, amount, memo) => {
          if (sendStep === "form") handleSendReview(to, amount, memo);
          else if (sendStep === "confirm")
            handleSendConfirm(
              pendingSend?.to ?? to,
              pendingSend?.amount ?? amount,
              pendingSend?.memo ?? memo,
            );
        }}
        isPending={sendToken.isPending}
        step={sendStep}
        onReset={() => setSendStep("form")}
      />

      <ReceiveDialog
        open={receiveDialogOpen}
        onOpenChange={setReceiveDialogOpen}
        principal={principal}
        token={activeToken}
      />
    </Layout>
  );
}
