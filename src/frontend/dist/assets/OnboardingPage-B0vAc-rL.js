import { f as createLucideIcon, a as useNavigate, c as useFileUpload, r as reactExports, j as jsxRuntimeExports, Z as Zap, m as motion, B as Button, C as Camera, n as RefreshCw, o as Shield } from "./index-C0kt3zpQ.js";
import { u as useBackend } from "./useBackend-BBA1i2Pl.js";
import { u as useGetMyProfile, a as useUpdateProfile, b as useCreateProfile } from "./index-_YqQfP93.js";
import { A as AnimatePresence, K as KeyRound, r as requestBiometric } from "./biometric-BZPVy0kG.js";
import { C as Check } from "./check-CmKRmUnB.js";
import { C as Copy } from "./copy-DZH4Tg5e.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["polygon", { points: "5 4 15 12 5 20 5 4", key: "16p6eg" }],
  ["line", { x1: "19", x2: "19", y1: "5", y2: "19", key: "futhcm" }]
];
const SkipForward = createLucideIcon("skip-forward", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function AvatarUploadRing({
  preview,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "aria-label": "Upload profile picture",
      "data-ocid": "onboarding-avatar-upload",
      className: "relative mx-auto block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-full",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 rounded-full border-4 border-primary/40 group-hover:border-primary transition-colors duration-200 overflow-hidden bg-muted flex items-center justify-center shadow-elevated", children: preview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: preview,
            alt: "Avatar preview",
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-8 h-8 text-muted-foreground" }) }),
        !preview && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-8 h-8 rounded-full gradient-hero flex items-center justify-center shadow-md border-2 border-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5 text-white" }) }),
        preview && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md border-2 border-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 text-primary-foreground" }) })
      ]
    }
  );
}
function RecoveryPhraseCard({
  phrase,
  onCopy,
  copied
}) {
  const words = phrase.split(" ").filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl border border-border bg-muted/30 p-4",
      "data-ocid": "recovery-phrase-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mb-4", children: words.map((word, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1.5 bg-card rounded-xl px-2.5 py-2 border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground font-mono w-4 flex-shrink-0", children: [
                i + 1,
                "."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-semibold text-foreground truncate", children: word })
            ]
          },
          `word-${i + 1}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: onCopy,
            className: `w-full transition-smooth font-semibold ${copied ? "bg-accent/15 text-accent border border-accent/40 hover:bg-accent/20" : "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/15"}`,
            "data-ocid": "recovery-phrase-copy",
            children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-2" }),
              "Copied!"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4 mr-2" }),
              "Copy to clipboard"
            ] })
          }
        )
      ]
    }
  );
}
function OnboardingPage() {
  const navigate = useNavigate();
  const { actor } = useBackend();
  const { data: existingProfile } = useGetMyProfile();
  const updateProfile = useUpdateProfile();
  const createProfile = useCreateProfile();
  const {
    uploadFile,
    isUploading,
    progress,
    error: uploadError
  } = useFileUpload();
  const fileInputRef = reactExports.useRef(null);
  const [step, setStep] = reactExports.useState("avatar");
  const [avatarPreview, setAvatarPreview] = reactExports.useState(null);
  const [avatarUrl, setAvatarUrl] = reactExports.useState(null);
  const [phrase, setPhrase] = reactExports.useState(null);
  const [isPhraseLoading, setIsPhraseLoading] = reactExports.useState(false);
  const [phraseError, setPhraseError] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const [avatarSaving, setAvatarSaving] = reactExports.useState(false);
  const [biometricError, setBiometricError] = reactExports.useState(null);
  const [biometricUnsupported, setBiometricUnsupported] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const pending = localStorage.getItem("pendingAvatarUrl");
    if (pending) {
      setAvatarPreview(pending);
      setAvatarUrl(pending);
    }
  }, []);
  const handleFileSelect = reactExports.useCallback(
    async (file) => {
      const localPreview = URL.createObjectURL(file);
      setAvatarPreview(localPreview);
      try {
        const url = await uploadFile(file);
        setAvatarUrl(url);
      } catch {
        setAvatarPreview(null);
      }
    },
    [uploadFile]
  );
  const handleAvatarClick = () => {
    var _a;
    return (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) handleFileSelect(file);
    e.target.value = "";
  };
  const saveAvatarAndContinue = async (url) => {
    setAvatarSaving(true);
    try {
      if (existingProfile) {
        await updateProfile.mutateAsync({
          displayName: existingProfile.displayName,
          bio: existingProfile.bio,
          avatarUrl: url ?? ""
        });
      } else {
        await createProfile.mutateAsync({
          displayName: "",
          bio: "",
          avatarUrl: url ?? ""
        });
      }
    } catch {
    } finally {
      setAvatarSaving(false);
    }
    setStep("recovery");
  };
  const handleGeneratePhrase = async () => {
    if (!actor) return;
    setBiometricError(null);
    setIsPhraseLoading(true);
    setPhraseError(null);
    try {
      const biometric = await requestBiometric();
      if (biometric.unsupported) {
        setBiometricUnsupported(true);
      } else if (!biometric.success) {
        setBiometricError(
          biometric.error ?? "Biometric check failed. Please try again."
        );
        setIsPhraseLoading(false);
        return;
      }
      const result = await actor.generateRecoveryPhrase();
      if (result == null) {
        setPhraseError(
          "Could not generate a recovery phrase. Please try again."
        );
      } else {
        setPhrase(result);
      }
    } catch (err) {
      setPhraseError(
        err instanceof Error ? err.message : "Failed to generate recovery phrase."
      );
    } finally {
      setIsPhraseLoading(false);
    }
  };
  const handleCopyPhrase = () => {
    if (!phrase) return;
    navigator.clipboard.writeText(phrase).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  };
  const finishOnboarding = () => {
    localStorage.setItem("onboardingComplete", "true");
    localStorage.removeItem("pendingAvatarUrl");
    navigate({ to: "/feed" });
  };
  const isFromPending = avatarPreview !== null && avatarUrl !== null && localStorage.getItem("pendingAvatarUrl") !== null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "h-14 bg-card border-b border-border flex items-center px-5 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg gradient-hero flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-lg tracking-tight text-foreground", children: [
        "Social",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Chain" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 py-4 px-5 bg-card border-b border-border", children: ["avatar", "recovery"].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200 ${step === s ? "bg-primary text-primary-foreground" : i < (step === "recovery" ? 1 : 0) ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`,
          children: i < (step === "recovery" ? 1 : 0) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) : i + 1
        }
      ),
      i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-0.5 w-8 rounded-full transition-colors duration-300 ${step === "recovery" ? "bg-accent" : "bg-muted"}`
        }
      )
    ] }, s)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 flex flex-col items-center justify-start px-5 py-8 max-w-sm mx-auto w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
      step === "avatar" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          className: "w-full flex flex-col items-center gap-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-1", children: "Welcome to SocialChain!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Set up your profile to get started" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AvatarUploadRing,
              {
                preview: avatarPreview,
                onClick: handleAvatarClick
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: handleFileChange,
                "data-ocid": "onboarding-file-input"
              }
            ),
            isFromPending && avatarUrl && !isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-accent font-medium mb-1", children: "Looking good! You can change it or keep it." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tap the photo to upload a different one." })
            ] }),
            isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading…" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  progress,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-primary rounded-full transition-all duration-200",
                  style: { width: `${progress}%` }
                }
              ) })
            ] }),
            uploadError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive text-center", children: uploadError }),
            !avatarUrl && !isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: handleAvatarClick,
                className: "w-full font-semibold",
                "data-ocid": "onboarding-choose-photo",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 mr-2" }),
                  "Choose Photo"
                ]
              }
            ),
            avatarUrl && !isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  onClick: () => saveAvatarAndContinue(avatarUrl),
                  disabled: avatarSaving,
                  className: "w-full font-semibold",
                  "data-ocid": "onboarding-confirm-avatar",
                  children: avatarSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }),
                    "Saving…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-2" }),
                    "Confirm photo"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: handleAvatarClick,
                  className: "w-full",
                  "data-ocid": "onboarding-reupload-avatar",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 mr-2" }),
                    "Re-upload"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                className: "text-muted-foreground text-sm",
                onClick: () => saveAvatarAndContinue(null),
                disabled: avatarSaving || isUploading,
                "data-ocid": "onboarding-skip-avatar",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "w-4 h-4 mr-1.5" }),
                  "Skip for now"
                ]
              }
            )
          ]
        },
        "avatar"
      ),
      step === "recovery" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          className: "w-full flex flex-col gap-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-7 h-7 text-secondary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Protect your account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Generate a recovery phrase to regain access if you ever lose your Internet Identity credentials." })
            ] }),
            !phrase && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-muted/30 p-4 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-8 h-8 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed mb-4", children: "Your 12-word recovery phrase is generated once and stored securely. Keep it private — anyone with this phrase can access your account." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  onClick: handleGeneratePhrase,
                  disabled: isPhraseLoading || !actor,
                  className: "w-full font-semibold",
                  "data-ocid": "onboarding-generate-phrase",
                  children: isPhraseLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }),
                    "Generating…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4 mr-2" }),
                    "Generate Recovery Phrase"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: biometricError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: -4 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -4 },
                  transition: { duration: 0.2 },
                  className: "flex items-center gap-2 mt-3 rounded-lg bg-destructive/10 border border-destructive/30 px-3 py-2 text-left",
                  "data-ocid": "onboarding-biometric-error",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-destructive shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: biometricError })
                  ]
                },
                "bio-error"
              ) }),
              phraseError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-3", children: phraseError })
            ] }),
            phrase && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.97 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.3 },
                children: [
                  biometricUnsupported && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg bg-muted/60 border border-border px-3 py-2 mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your device doesn't support biometric protection." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RecoveryPhraseCard,
                    {
                      phrase,
                      onCopy: handleCopyPhrase,
                      copied
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center mt-3 leading-relaxed", children: [
                    "This phrase is viewable again from",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Settings → Recovery Phrase" }),
                    "."
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: finishOnboarding,
                className: "w-full font-semibold",
                "data-ocid": "onboarding-done",
                children: phrase ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 mr-2" }),
                  "All done — go to feed"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "w-4 h-4 mr-2" }),
                  "Skip for now"
                ] })
              }
            ) })
          ]
        },
        "recovery"
      )
    ] }) })
  ] });
}
export {
  OnboardingPage
};
