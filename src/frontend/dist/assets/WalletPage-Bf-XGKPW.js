const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-LBv12q0t.js","assets/index-Bl6dvI3W.js","assets/index-B_e0a-Bv.css","assets/useBackend-aoa0NgZM.js"])))=>i.map(i=>d[i]);
import { e as createLucideIcon, u as useAuth, a as useNavigate, b as useQueryClient, r as reactExports, j as jsxRuntimeExports, W as Wallet, o as RefreshCw, d as cn, c as ue, B as Button, L as LoadingSpinner, _ as __vitePreload } from "./index-Bl6dvI3W.js";
import { E as EmptyState, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-O4o2fpFx.js";
import { L as Layout } from "./index-LBv12q0t.js";
import { B as Badge } from "./badge-CUZbysS2.js";
import { I as Input } from "./input-D1aBC9gv.js";
import { L as Label } from "./label-Bse7q1ck.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-ha9pGp_Z.js";
import { u as useBackend, a as useQuery, b as useMutation } from "./useBackend-aoa0NgZM.js";
import { b as formatAddress, S as Send } from "./format-CwsBvIzO.js";
import { C as Copy } from "./copy-BV87I9-E.js";
import { C as Coins } from "./coins-Cpk7KDG6.js";
import "./index-BYWIbXET.js";
import "./x-bILI1M_f.js";
import "./index-BfZTMNM3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M17 7 7 17", key: "15tmo1" }],
  ["path", { d: "M17 17H7V7", key: "1org7z" }]
];
const ArrowDownLeft = createLucideIcon("arrow-down-left", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode);
var TokenType = /* @__PURE__ */ ((TokenType2) => {
  TokenType2["ICP"] = "ICP";
  TokenType2["ckBTC"] = "ckBTC";
  TokenType2["ckETH"] = "ckETH";
  TokenType2["ckUSDC"] = "ckUSDC";
  TokenType2["ckUSDT"] = "ckUSDT";
  return TokenType2;
})(TokenType || {});
var TxStatus = /* @__PURE__ */ ((TxStatus2) => {
  TxStatus2["pending"] = "pending";
  TxStatus2["completed"] = "completed";
  TxStatus2["failed"] = "failed";
  return TxStatus2;
})(TxStatus || {});
var TxType = /* @__PURE__ */ ((TxType2) => {
  TxType2["receive"] = "receive";
  TxType2["send"] = "send";
  return TxType2;
})(TxType || {});
const ALL_TOKENS = [
  TokenType.ICP,
  TokenType.ckBTC,
  TokenType.ckETH,
  TokenType.ckUSDC,
  TokenType.ckUSDT
];
const TOKEN_META = {
  [TokenType.ICP]: {
    name: "Internet Computer",
    symbol: "ICP",
    decimals: 8,
    icon: "∞",
    usdRate: 11.42,
    fee: BigInt(1e4),
    accentClass: "text-accent",
    bgClass: "bg-accent/15",
    borderClass: "border-accent/30"
  },
  [TokenType.ckBTC]: {
    name: "Chain-Key Bitcoin",
    symbol: "ckBTC",
    decimals: 8,
    icon: "₿",
    usdRate: 67e3,
    fee: BigInt(10),
    accentClass: "text-chart-3",
    bgClass: "bg-[oklch(var(--chart-3)/0.15)]",
    borderClass: "border-[oklch(var(--chart-3)/0.3)]"
  },
  [TokenType.ckETH]: {
    name: "Chain-Key Ethereum",
    symbol: "ckETH",
    decimals: 18,
    icon: "Ξ",
    usdRate: 3400,
    fee: BigInt(2e12),
    accentClass: "text-primary",
    bgClass: "bg-primary/15",
    borderClass: "border-primary/30"
  },
  [TokenType.ckUSDC]: {
    name: "Chain-Key USD Coin",
    symbol: "ckUSDC",
    decimals: 6,
    icon: "$",
    usdRate: 1,
    fee: BigInt(1e4),
    accentClass: "text-chart-5",
    bgClass: "bg-[oklch(var(--chart-5)/0.15)]",
    borderClass: "border-[oklch(var(--chart-5)/0.3)]"
  },
  [TokenType.ckUSDT]: {
    name: "Chain-Key Tether",
    symbol: "ckUSDT",
    decimals: 6,
    icon: "₮",
    usdRate: 1,
    fee: BigInt(1e4),
    accentClass: "text-secondary",
    bgClass: "bg-secondary/15",
    borderClass: "border-secondary/30"
  }
};
const MOCK_BALANCES = {
  [TokenType.ICP]: BigInt(14852e6),
  [TokenType.ckBTC]: BigInt(15e5),
  [TokenType.ckETH]: BigInt(520000000000000000n),
  [TokenType.ckUSDC]: BigInt(24578e4),
  [TokenType.ckUSDT]: BigInt(1285e5)
};
const MOCK_TRANSACTIONS = [
  {
    id: BigInt(1),
    txType: TxType.receive,
    token: TokenType.ICP,
    amount: BigInt(105e7),
    counterparty: { toText: () => "lunan-xyz-7ppdn-aaaaa" },
    timestamp: BigInt(Date.now() - 1e3 * 60 * 35) * BigInt(1e6),
    memo: "Great photography content!",
    status: TxStatus.completed
  },
  {
    id: BigInt(2),
    txType: TxType.send,
    token: TokenType.ckBTC,
    amount: BigInt(5e5),
    counterparty: { toText: () => "devmarcus-abc-n5iex-bbbbb" },
    timestamp: BigInt(Date.now() - 1e3 * 60 * 60 * 3) * BigInt(1e6),
    status: TxStatus.completed
  },
  {
    id: BigInt(3),
    txType: TxType.receive,
    token: TokenType.ckUSDC,
    amount: BigInt(5e7),
    counterparty: { toText: () => "ci-cryptoinsights-ccccc-ddddd" },
    timestamp: BigInt(Date.now() - 1e3 * 60 * 60 * 8) * BigInt(1e6),
    status: TxStatus.completed
  },
  {
    id: BigInt(4),
    txType: TxType.send,
    token: TokenType.ICP,
    amount: BigInt(3e8),
    counterparty: { toText: () => "sarahc-social-eeeee-fffff" },
    timestamp: BigInt(Date.now() - 1e3 * 60 * 60 * 24) * BigInt(1e6),
    memo: "Love your work!",
    status: TxStatus.completed
  },
  {
    id: BigInt(5),
    txType: TxType.receive,
    token: TokenType.ckETH,
    amount: BigInt(150000000000000000n),
    counterparty: { toText: () => "ggggg-hhhhh-iiiii-jjjjj" },
    timestamp: BigInt(Date.now() - 1e3 * 60 * 60 * 48) * BigInt(1e6),
    status: TxStatus.pending
  }
];
function formatTokenUsd(amount, token) {
  const meta = TOKEN_META[token];
  const divisor = 10 ** meta.decimals;
  const value = Number(amount) / divisor * meta.usdRate;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
function formatAmountLocal(amount, token) {
  const meta = TOKEN_META[token];
  const divisor = 10 ** meta.decimals;
  const value = Number(amount) / divisor;
  const maxDec = meta.decimals > 8 ? 6 : 4;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDec
  });
}
function feeDisplay(token) {
  const meta = TOKEN_META[token];
  const divisor = 10 ** meta.decimals;
  const val = Number(meta.fee) / divisor;
  const maxDec = meta.decimals > 8 ? 8 : 6;
  return `${val.toFixed(maxDec).replace(/\.?0+$/, "")} ${meta.symbol}`;
}
function formatTimeAgo(nsTimestamp) {
  const ms = Number(nsTimestamp / BigInt(1e6));
  const diff = Date.now() - ms;
  const minutes = Math.floor(diff / 6e4);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}
function TokenCard({
  token,
  balance,
  isActive,
  onSelect
}) {
  const meta = TOKEN_META[token];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onSelect,
      "data-ocid": `token-card-${token.toLowerCase()}`,
      className: cn(
        "w-full text-left rounded-xl p-3.5 border transition-smooth",
        "hover:bg-muted/60 active:scale-[0.98]",
        isActive ? `${meta.bgClass} ${meta.borderClass} shadow-card` : "bg-card border-border"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-base font-bold border shrink-0",
                  meta.bgClass,
                  meta.borderClass,
                  meta.accentClass
                ),
                children: meta.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-tight", children: meta.symbol }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight truncate max-w-[80px]", children: meta.name })
            ] })
          ] }),
          isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "w-1.5 h-1.5 rounded-full shrink-0",
                meta.accentClass.replace("text-", "bg-")
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("font-mono font-bold text-sm", meta.accentClass), children: formatAmountLocal(balance, token) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground", children: [
          "≈ $",
          formatTokenUsd(balance, token)
        ] })
      ]
    }
  );
}
function PrincipalQRDisplay({ value }) {
  const [loaded, setLoaded] = reactExports.useState(false);
  const encoded = encodeURIComponent(value);
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encoded}&bgcolor=1a1a1a&color=F97316&margin=10`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-44 h-44 rounded-2xl overflow-hidden border-2 border-accent/30 bg-muted flex items-center justify-center", children: [
    !loaded && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: url,
        alt: "Wallet QR Code",
        className: cn("w-40 h-40 rounded-xl", !loaded && "hidden"),
        onLoad: () => setLoaded(true),
        onError: () => setLoaded(true)
      }
    )
  ] });
}
function TxRow({ tx }) {
  var _a, _b;
  const token = tx.token;
  const meta = TOKEN_META[token] ?? TOKEN_META[TokenType.ICP];
  const isSent = tx.txType === TxType.send;
  const counterpartyText = ((_b = (_a = tx.counterparty).toText) == null ? void 0 : _b.call(_a)) ?? String(tx.counterparty);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-3 p-4 hover:bg-muted/40 transition-smooth",
      "data-ocid": "wallet-tx-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
              isSent ? "bg-accent/10" : "bg-secondary/10"
            ),
            children: isSent ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-4 h-4 text-secondary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground truncate", children: [
              isSent ? "Sent" : "Received",
              " ",
              meta.symbol
            ] }),
            tx.status === TxStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[10px] text-chart-3 border-chart-3/30 py-0 px-1",
                children: "pending"
              }
            ),
            tx.status === TxStatus.failed && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[10px] text-destructive border-destructive/30 py-0 px-1",
                children: "failed"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            isSent ? "To" : "From",
            ": ",
            formatAddress(counterpartyText, 8, 4)
          ] }),
          tx.memo && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground italic truncate mt-0.5", children: [
            "“",
            tx.memo,
            "”"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: formatTimeAgo(tx.timestamp) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: cn(
                "font-mono font-bold text-sm",
                isSent ? "text-accent" : "text-secondary"
              ),
              children: [
                isSent ? "−" : "+",
                formatAmountLocal(tx.amount, token)
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground font-mono", children: [
            "≈ $",
            formatTokenUsd(tx.amount, token)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "text-[9px] font-mono uppercase tracking-wide",
                meta.accentClass
              ),
              children: meta.symbol
            }
          )
        ] })
      ]
    }
  );
}
function SendDialog({
  open,
  onOpenChange,
  token,
  balance,
  onConfirm,
  isPending,
  step,
  onReset
}) {
  const meta = TOKEN_META[token];
  const [sendTo, setSendTo] = reactExports.useState("");
  const [sendAmount, setSendAmount] = reactExports.useState("");
  const [sendMemo, setSendMemo] = reactExports.useState("");
  const amountNum = Number.parseFloat(sendAmount) || 0;
  const divisor = 10 ** meta.decimals;
  const amountRaw = BigInt(Math.round(amountNum * divisor));
  const totalWithFee = amountRaw + meta.fee;
  const canSend = sendTo.trim().length > 5 && amountNum > 0 && totalWithFee <= balance;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: cn("w-5 h-5", meta.accentClass) }),
      "Send ",
      meta.symbol
    ] }) }),
    step === "form" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "rounded-lg px-3 py-2 flex items-center gap-2.5",
            meta.bgClass,
            meta.borderClass,
            "border"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xl font-bold", meta.accentClass), children: meta.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-sm font-semibold", meta.accentClass), children: meta.symbol }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
                "Available: ",
                formatAmountLocal(balance, token),
                " ",
                meta.symbol
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "send-to",
            className: "text-sm text-muted-foreground",
            children: "Recipient Principal ID"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "send-to",
            placeholder: "aaaaa-aa or full principal",
            value: sendTo,
            onChange: (e) => setSendTo(e.target.value),
            className: "bg-muted border-0 font-mono text-xs",
            "data-ocid": "send-recipient-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Label,
          {
            htmlFor: "send-amount",
            className: "text-sm text-muted-foreground",
            children: [
              "Amount (",
              meta.symbol,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "send-amount",
              type: "number",
              placeholder: "0.00",
              min: "0",
              step: "any",
              value: sendAmount,
              onChange: (e) => setSendAmount(e.target.value),
              className: "bg-muted border-0 font-mono text-sm pr-20",
              "data-ocid": "send-amount-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("font-bold text-xs", meta.accentClass), children: meta.symbol }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleMax,
                className: "text-[10px] text-muted-foreground hover:text-foreground bg-muted/80 px-1 py-0.5 rounded",
                children: "MAX"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Label,
          {
            htmlFor: "send-memo",
            className: "text-sm text-muted-foreground",
            children: [
              "Memo",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: "(optional)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "send-memo",
            placeholder: "Add a note...",
            value: sendMemo,
            onChange: (e) => setSendMemo(e.target.value),
            className: "bg-muted border-0 text-sm",
            "data-ocid": "send-memo-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/60 rounded-lg px-3 py-2 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Network fee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: feeDisplay(token) })
        ] }),
        amountNum > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs border-t border-border pt-1 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "You send" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("font-mono font-bold", meta.accentClass), children: [
            (amountNum + Number(meta.fee) / divisor).toFixed(meta.decimals > 8 ? 8 : 6).replace(/\.?0+$/, ""),
            " ",
            meta.symbol
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => canSend && onConfirm(sendTo, sendAmount, sendMemo),
          disabled: !canSend || isPending,
          className: cn(
            "w-full font-semibold",
            meta.bgClass,
            meta.accentClass,
            "hover:opacity-90 border",
            meta.borderClass
          ),
          "data-ocid": "send-review-btn",
          children: "Review & Send"
        }
      )
    ] }),
    step === "confirm" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "Please confirm this transaction" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-xl p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-xs text-foreground truncate max-w-[160px]", children: formatAddress(sendTo, 10, 6) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("font-mono font-bold", meta.accentClass), children: [
            sendAmount,
            " ",
            meta.symbol
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Fee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground", children: feeDisplay(token) })
        ] }),
        sendMemo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Memo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground italic", children: sendMemo })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: onReset,
            "data-ocid": "send-cancel-btn",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => onConfirm(sendTo, sendAmount, sendMemo),
            disabled: isPending,
            className: cn(
              "flex-1 font-semibold",
              meta.bgClass,
              meta.accentClass,
              "border",
              meta.borderClass
            ),
            "data-ocid": "send-confirm-btn",
            children: "Confirm Send"
          }
        )
      ] })
    ] }),
    step === "sending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-8 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "w-14 h-14 rounded-full flex items-center justify-center",
            meta.bgClass
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
          "Sending ",
          meta.symbol,
          "..."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Broadcasting to Internet Computer" })
      ] })
    ] }),
    step === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-8 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-secondary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Transfer complete!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          "Your ",
          meta.symbol,
          " has been sent."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => {
            setSendTo("");
            setSendAmount("");
            setSendMemo("");
            onReset();
            onOpenChange(false);
          },
          className: "w-full bg-secondary/20 text-secondary border border-secondary/30 hover:bg-secondary/30",
          "data-ocid": "send-done-btn",
          children: "Done"
        }
      )
    ] }),
    step === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-8 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-destructive" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Transfer failed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Check the recipient address and try again." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "w-full",
          onClick: onReset,
          "data-ocid": "send-retry-btn",
          children: "Try Again"
        }
      )
    ] })
  ] }) });
}
function ReceiveDialog({
  open,
  onOpenChange,
  principal,
  token
}) {
  const meta = TOKEN_META[token];
  function copyAddress() {
    if (principal) {
      navigator.clipboard.writeText(principal);
      ue.success("Address copied to clipboard");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-sm bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center justify-center gap-2 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-5 h-5 text-secondary" }),
      "Receive ",
      meta.symbol
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "flex items-center justify-center gap-2 rounded-lg px-3 py-1.5 mx-auto w-fit",
            meta.bgClass,
            meta.borderClass,
            "border"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("font-bold text-sm", meta.accentClass), children: meta.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-sm font-semibold", meta.accentClass), children: meta.name })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground text-center", children: [
        "Share your address to receive ",
        meta.symbol,
        " on ICP"
      ] }),
      principal ? /* @__PURE__ */ jsxRuntimeExports.jsx(PrincipalQRDisplay, { value: principal }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-44 h-44 bg-muted rounded-2xl flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center px-4", children: "Connect wallet to show QR code" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-xl p-3 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground uppercase tracking-wide font-medium", children: "Your Principal Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "code",
          {
            className: "text-xs font-mono text-foreground break-all leading-relaxed block",
            "data-ocid": "receive-principal-address",
            children: principal ?? "Not connected"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: copyAddress,
          className: "w-full bg-secondary/20 text-secondary border border-secondary/30 hover:bg-secondary/30 font-semibold",
          "data-ocid": "receive-copy-address",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4 mr-2" }),
            "Copy Address"
          ]
        }
      )
    ] })
  ] }) });
}
function WalletPage() {
  const { actor, isReady } = useBackend();
  const { principal } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeToken, setActiveToken] = reactExports.useState(TokenType.ICP);
  const [sendDialogOpen, setSendDialogOpen] = reactExports.useState(false);
  const [receiveDialogOpen, setReceiveDialogOpen] = reactExports.useState(false);
  const [sendStep, setSendStep] = reactExports.useState("form");
  const [pendingSend, setPendingSend] = reactExports.useState(null);
  const activeMeta = TOKEN_META[activeToken];
  const {
    data: balances,
    isFetching: balancesFetching,
    refetch: refetchBalances
  } = useQuery({
    queryKey: ["wallet-balances-all"],
    queryFn: async () => {
      if (!actor) return MOCK_BALANCES;
      const results = {};
      await Promise.all(
        ALL_TOKENS.map(async (token) => {
          try {
            const bal = await actor.getBalance(token);
            results[token] = BigInt(bal ?? 0);
          } catch {
            results[token] = MOCK_BALANCES[token];
          }
        })
      );
      return results;
    },
    enabled: isReady,
    initialData: MOCK_BALANCES,
    refetchInterval: 3e4
  });
  const { data: transactions, isFetching: txFetching } = useQuery({
    queryKey: ["wallet-transactions"],
    queryFn: async () => {
      if (!actor) return MOCK_TRANSACTIONS;
      try {
        const result = await actor.getTransactionHistory();
        return (result == null ? void 0 : result.length) ? result : MOCK_TRANSACTIONS;
      } catch {
        return MOCK_TRANSACTIONS;
      }
    },
    enabled: isReady,
    initialData: MOCK_TRANSACTIONS
  });
  const sendToken = useMutation({
    mutationFn: async ({
      to,
      amount,
      memo
    }) => {
      if (!actor) throw new Error("Not connected");
      const meta = TOKEN_META[activeToken];
      const divisor = 10 ** meta.decimals;
      const rawAmount = BigInt(Math.round(Number.parseFloat(amount) * divisor));
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-LBv12q0t.js").then((n) => n.i);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1,2,3]) : void 0);
      const toPrincipal = Principal.fromText(to);
      const result = await actor.sendToken(
        activeToken,
        toPrincipal,
        rawAmount,
        memo || null
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
      ue.success(`${activeMeta.symbol} sent successfully!`);
    },
    onError: (err) => {
      setSendStep("error");
      ue.error(
        `Send failed: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    }
  });
  function handleSendReview(to, amount, memo) {
    setPendingSend({ to, amount, memo });
    setSendStep("confirm");
  }
  function handleSendConfirm(to, amount, memo) {
    sendToken.mutate({ to, amount, memo });
  }
  function handleRefresh() {
    refetchBalances();
    queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
    ue.info("Refreshing balances...");
  }
  const activeBalance = (balances == null ? void 0 : balances[activeToken]) ?? BigInt(0);
  const totalUsd = ALL_TOKENS.reduce((acc, token) => {
    const bal = (balances == null ? void 0 : balances[token]) ?? BigInt(0);
    const meta = TOKEN_META[token];
    return acc + Number(bal) / 10 ** meta.decimals * meta.usdRate;
  }, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { onWalletOpen: () => {
  }, onNewPost: () => navigate({ to: "/feed" }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-card via-card to-card border border-border p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-52 h-52 bg-accent/8 rounded-full blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-36 h-36 bg-secondary/8 rounded-full blur-2xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Portfolio Value" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleRefresh,
              "aria-label": "Refresh balances",
              className: "p-1.5 rounded-lg hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground",
              "data-ocid": "wallet-refresh-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: cn(
                    "w-3.5 h-3.5",
                    balancesFetching && "animate-spin"
                  )
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-baseline gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-3xl text-foreground tracking-tight", children: [
            "$",
            totalUsd.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm font-mono", children: "USD" })
        ] }),
        principal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded-md flex-1 min-w-0 truncate", children: formatAddress(principal, 14, 8) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                navigator.clipboard.writeText(principal);
                ue.success("Address copied");
              },
              className: "p-1.5 rounded hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground shrink-0",
              "aria-label": "Copy principal address",
              "data-ocid": "wallet-copy-address-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => {
                setSendStep("form");
                setPendingSend(null);
                setSendDialogOpen(true);
              },
              className: "flex-1 bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 font-semibold",
              "data-ocid": "wallet-send-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 mr-1.5" }),
                "Send"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => setReceiveDialogOpen(true),
              variant: "outline",
              className: "flex-1 bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20 font-semibold",
              "data-ocid": "wallet-receive-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-4 h-4 mr-1.5" }),
                "Receive"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "flex-1 border-border text-muted-foreground hover:bg-muted/60",
              onClick: () => ue.info("Token swaps coming in phase 2!"),
              "data-ocid": "wallet-swap-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-1.5" }),
                "Swap"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "assets", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full bg-card border border-border mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "assets",
            className: "flex-1 data-[state=active]:bg-muted",
            "data-ocid": "wallet-assets-tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-4 h-4 mr-1.5" }),
              "Assets"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "history",
            className: "flex-1 data-[state=active]:bg-muted",
            "data-ocid": "wallet-history-tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-4 h-4 mr-1.5" }),
              "History"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "assets", className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 gap-2.5",
            "data-ocid": "wallet-token-grid",
            children: ALL_TOKENS.map((token) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              TokenCard,
              {
                token,
                balance: (balances == null ? void 0 : balances[token]) ?? BigInt(0),
                isActive: activeToken === token,
                onSelect: () => setActiveToken(token)
              },
              token
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "rounded-2xl border p-4 space-y-4",
              activeMeta.bgClass,
              activeMeta.borderClass
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold border",
                        activeMeta.bgClass,
                        activeMeta.borderClass,
                        activeMeta.accentClass
                      ),
                      children: activeMeta.icon
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: cn(
                          "font-semibold text-base",
                          activeMeta.accentClass
                        ),
                        children: activeMeta.symbol
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: activeMeta.name })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: cn(
                        "font-mono font-bold text-lg",
                        activeMeta.accentClass
                      ),
                      children: formatAmountLocal(activeBalance, activeToken)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
                    "≈ $",
                    formatTokenUsd(activeBalance, activeToken),
                    " USD"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    onClick: () => {
                      setSendStep("form");
                      setPendingSend(null);
                      setSendDialogOpen(true);
                    },
                    className: "flex-1 bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 text-xs font-semibold",
                    "data-ocid": "token-send-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5 mr-1" }),
                      "Send ",
                      activeMeta.symbol
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    onClick: () => setReceiveDialogOpen(true),
                    className: "flex-1 bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20 text-xs font-semibold",
                    "data-ocid": "token-receive-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-3.5 h-3.5 mr-1" }),
                      "Receive"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/40 rounded-lg p-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: "Network fee" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: cn(
                        "font-mono font-medium",
                        activeMeta.accentClass
                      ),
                      children: feeDisplay(activeToken)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/40 rounded-lg p-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: "Network" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-medium text-foreground", children: "ICP" })
                ] })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", children: txFetching && !(transactions == null ? void 0 : transactions.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md" }) }) : (transactions == null ? void 0 : transactions.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "card-elevated rounded-xl overflow-hidden divide-y divide-border",
          "data-ocid": "wallet-transactions-list",
          children: transactions.map((tx) => /* @__PURE__ */ jsxRuntimeExports.jsx(TxRow, { tx }, String(tx.id)))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: History,
          title: "No transactions yet",
          description: "Send or receive tokens to see your history here.",
          action: {
            label: "Send Tokens",
            onClick: () => {
              setSendStep("form");
              setPendingSend(null);
              setSendDialogOpen(true);
            }
          }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SendDialog,
      {
        open: sendDialogOpen,
        onOpenChange: setSendDialogOpen,
        token: activeToken,
        balance: activeBalance,
        onConfirm: (to, amount, memo) => {
          if (sendStep === "form") handleSendReview(to, amount, memo);
          else if (sendStep === "confirm")
            handleSendConfirm(
              (pendingSend == null ? void 0 : pendingSend.to) ?? to,
              (pendingSend == null ? void 0 : pendingSend.amount) ?? amount,
              (pendingSend == null ? void 0 : pendingSend.memo) ?? memo
            );
        },
        isPending: sendToken.isPending,
        step: sendStep,
        onReset: () => setSendStep("form")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReceiveDialog,
      {
        open: receiveDialogOpen,
        onOpenChange: setReceiveDialogOpen,
        principal,
        token: activeToken
      }
    )
  ] });
}
export {
  WalletPage
};
