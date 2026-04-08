import { Button } from "@/components/ui/button";
import { useBackend } from "@/hooks/useBackend";
import { useFileUpload } from "@/hooks/useFileUpload";
import {
  useCreateProfile,
  useGetMyProfile,
  useUpdateProfile,
} from "@/hooks/useProfile";
import { requestBiometric } from "@/utils/biometric";
import { useNavigate } from "@tanstack/react-router";
import {
  Camera,
  Check,
  ChevronRight,
  Copy,
  KeyRound,
  RefreshCw,
  Shield,
  ShieldCheck,
  SkipForward,
  Upload,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

type Step = "avatar" | "recovery";

function AvatarUploadRing({
  preview,
  onClick,
}: {
  preview: string | null;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Upload profile picture"
      data-ocid="onboarding-avatar-upload"
      className="relative mx-auto block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-full"
    >
      <div className="w-28 h-28 rounded-full border-4 border-primary/40 group-hover:border-primary transition-colors duration-200 overflow-hidden bg-muted flex items-center justify-center shadow-elevated">
        {preview ? (
          <img
            src={preview}
            alt="Avatar preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <Camera className="w-8 h-8 text-muted-foreground" />
        )}
      </div>
      {!preview && (
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full gradient-hero flex items-center justify-center shadow-md border-2 border-background">
          <Upload className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      {preview && (
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md border-2 border-background">
          <RefreshCw className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
      )}
    </button>
  );
}

function RecoveryPhraseCard({
  phrase,
  onCopy,
  copied,
}: {
  phrase: string;
  onCopy: () => void;
  copied: boolean;
}) {
  const words = phrase.split(" ").filter(Boolean);

  return (
    <div
      className="rounded-2xl border border-border bg-muted/30 p-4"
      data-ocid="recovery-phrase-card"
    >
      <div className="grid grid-cols-3 gap-2 mb-4">
        {words.map((word, i) => (
          <div
            key={`word-${i + 1}`}
            className="flex items-center gap-1.5 bg-card rounded-xl px-2.5 py-2 border border-border"
          >
            <span className="text-[10px] text-muted-foreground font-mono w-4 flex-shrink-0">
              {i + 1}.
            </span>
            <span className="text-xs font-mono font-semibold text-foreground truncate">
              {word}
            </span>
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={onCopy}
        className={`w-full transition-smooth font-semibold ${
          copied
            ? "bg-accent/15 text-accent border border-accent/40 hover:bg-accent/20"
            : "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/15"
        }`}
        data-ocid="recovery-phrase-copy"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            Copy to clipboard
          </>
        )}
      </Button>
    </div>
  );
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const { actor } = useBackend();

  const { data: existingProfile } = useGetMyProfile();
  const updateProfile = useUpdateProfile();
  const createProfile = useCreateProfile();
  const {
    uploadFile,
    isUploading,
    progress,
    error: uploadError,
  } = useFileUpload();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>("avatar");

  // Avatar state
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  // Recovery phrase state
  const [phrase, setPhrase] = useState<string | null>(null);
  const [isPhraseLoading, setIsPhraseLoading] = useState(false);
  const [phraseError, setPhraseError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [avatarSaving, setAvatarSaving] = useState(false);
  const [biometricError, setBiometricError] = useState<string | null>(null);
  const [biometricUnsupported, setBiometricUnsupported] = useState(false);

  // Pre-populate avatar from localStorage if the user uploaded one on the landing page
  useEffect(() => {
    const pending = localStorage.getItem("pendingAvatarUrl");
    if (pending) {
      setAvatarPreview(pending);
      setAvatarUrl(pending);
    }
  }, []);

  const handleFileSelect = useCallback(
    async (file: File) => {
      const localPreview = URL.createObjectURL(file);
      setAvatarPreview(localPreview);
      try {
        const url = await uploadFile(file);
        setAvatarUrl(url);
      } catch {
        setAvatarPreview(null);
      }
    },
    [uploadFile],
  );

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
    e.target.value = "";
  };

  const saveAvatarAndContinue = async (url: string | null) => {
    setAvatarSaving(true);
    try {
      if (existingProfile) {
        await updateProfile.mutateAsync({
          displayName: existingProfile.displayName,
          bio: existingProfile.bio,
          avatarUrl: url ?? "",
        });
      } else {
        await createProfile.mutateAsync({
          displayName: "",
          bio: "",
          avatarUrl: url ?? "",
        });
      }
    } catch {
      // Non-fatal — continue to next step
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
      // Biometric gate before revealing the phrase
      const biometric = await requestBiometric();
      if (biometric.unsupported) {
        setBiometricUnsupported(true);
      } else if (!biometric.success) {
        setBiometricError(
          biometric.error ?? "Biometric check failed. Please try again.",
        );
        setIsPhraseLoading(false);
        return;
      }

      const result = await actor.generateRecoveryPhrase();
      if (result == null) {
        setPhraseError(
          "Could not generate a recovery phrase. Please try again.",
        );
      } else {
        setPhrase(result);
      }
    } catch (err) {
      setPhraseError(
        err instanceof Error
          ? err.message
          : "Failed to generate recovery phrase.",
      );
    } finally {
      setIsPhraseLoading(false);
    }
  };

  const handleCopyPhrase = () => {
    if (!phrase) return;
    navigator.clipboard.writeText(phrase).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const finishOnboarding = () => {
    localStorage.setItem("onboardingComplete", "true");
    localStorage.removeItem("pendingAvatarUrl");
    navigate({ to: "/feed" });
  };

  const isFromPending =
    avatarPreview !== null &&
    avatarUrl !== null &&
    localStorage.getItem("pendingAvatarUrl") !== null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-14 bg-card border-b border-border flex items-center px-5 gap-3">
        <div className="w-7 h-7 rounded-lg gradient-hero flex items-center justify-center shadow-sm">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="font-display font-bold text-lg tracking-tight text-foreground">
          Social<span className="text-primary">Chain</span>
        </span>
      </header>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 py-4 px-5 bg-card border-b border-border">
        {(["avatar", "recovery"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200 ${
                step === s
                  ? "bg-primary text-primary-foreground"
                  : i < (step === "recovery" ? 1 : 0)
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i < (step === "recovery" ? 1 : 0) ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                i + 1
              )}
            </div>
            {i === 0 && (
              <div
                className={`h-0.5 w-8 rounded-full transition-colors duration-300 ${
                  step === "recovery" ? "bg-accent" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Page content */}
      <main className="flex-1 flex flex-col items-center justify-start px-5 py-8 max-w-sm mx-auto w-full">
        <AnimatePresence mode="wait">
          {step === "avatar" && (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center gap-6"
            >
              <div className="text-center">
                <h1 className="font-display font-bold text-2xl text-foreground mb-1">
                  Welcome to SocialChain!
                </h1>
                <p className="text-sm text-muted-foreground">
                  Set up your profile to get started
                </p>
              </div>

              <AvatarUploadRing
                preview={avatarPreview}
                onClick={handleAvatarClick}
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                data-ocid="onboarding-file-input"
              />

              {/* Status message */}
              {isFromPending && avatarUrl && !isUploading && (
                <div className="text-center">
                  <p className="text-sm text-accent font-medium mb-1">
                    Looking good! You can change it or keep it.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tap the photo to upload a different one.
                  </p>
                </div>
              )}

              {isUploading && (
                <div className="w-full">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>Uploading…</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {uploadError && (
                <p className="text-xs text-destructive text-center">
                  {uploadError}
                </p>
              )}

              {!avatarUrl && !isUploading && (
                <Button
                  type="button"
                  onClick={handleAvatarClick}
                  className="w-full font-semibold"
                  data-ocid="onboarding-choose-photo"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Choose Photo
                </Button>
              )}

              {avatarUrl && !isUploading && (
                <div className="w-full flex flex-col gap-2">
                  <Button
                    type="button"
                    onClick={() => saveAvatarAndContinue(avatarUrl)}
                    disabled={avatarSaving}
                    className="w-full font-semibold"
                    data-ocid="onboarding-confirm-avatar"
                  >
                    {avatarSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Saving…
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Confirm photo
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAvatarClick}
                    className="w-full"
                    data-ocid="onboarding-reupload-avatar"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Re-upload
                  </Button>
                </div>
              )}

              <Button
                type="button"
                variant="ghost"
                className="text-muted-foreground text-sm"
                onClick={() => saveAvatarAndContinue(null)}
                disabled={avatarSaving || isUploading}
                data-ocid="onboarding-skip-avatar"
              >
                <SkipForward className="w-4 h-4 mr-1.5" />
                Skip for now
              </Button>
            </motion.div>
          )}

          {step === "recovery" && (
            <motion.div
              key="recovery"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col gap-6"
            >
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-7 h-7 text-secondary" />
                </div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                  Protect your account
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Generate a recovery phrase to regain access if you ever lose
                  your Internet Identity credentials.
                </p>
              </div>

              {!phrase && (
                <div className="rounded-2xl border border-border bg-muted/30 p-4 text-center">
                  <KeyRound className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Your 12-word recovery phrase is generated once and stored
                    securely. Keep it private — anyone with this phrase can
                    access your account.
                  </p>
                  <Button
                    type="button"
                    onClick={handleGeneratePhrase}
                    disabled={isPhraseLoading || !actor}
                    className="w-full font-semibold"
                    data-ocid="onboarding-generate-phrase"
                  >
                    {isPhraseLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating…
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4 mr-2" />
                        Generate Recovery Phrase
                      </>
                    )}
                  </Button>
                  {/* Biometric error */}
                  <AnimatePresence>
                    {biometricError && (
                      <motion.div
                        key="bio-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 mt-3 rounded-lg bg-destructive/10 border border-destructive/30 px-3 py-2 text-left"
                        data-ocid="onboarding-biometric-error"
                      >
                        <Shield className="w-3.5 h-3.5 text-destructive shrink-0" />
                        <p className="text-xs text-destructive">
                          {biometricError}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {phraseError && (
                    <p className="text-xs text-destructive mt-3">
                      {phraseError}
                    </p>
                  )}
                </div>
              )}

              {phrase && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Biometric unsupported note */}
                  {biometricUnsupported && (
                    <div className="flex items-center gap-2 rounded-lg bg-muted/60 border border-border px-3 py-2 mb-3">
                      <Shield className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        Your device doesn&apos;t support biometric protection.
                      </p>
                    </div>
                  )}
                  <RecoveryPhraseCard
                    phrase={phrase}
                    onCopy={handleCopyPhrase}
                    copied={copied}
                  />
                  <p className="text-xs text-muted-foreground text-center mt-3 leading-relaxed">
                    This phrase is viewable again from{" "}
                    <strong className="text-foreground">
                      Settings → Recovery Phrase
                    </strong>
                    .
                  </p>
                </motion.div>
              )}

              <div className="flex flex-col gap-2 mt-auto">
                <Button
                  type="button"
                  onClick={finishOnboarding}
                  className="w-full font-semibold"
                  data-ocid="onboarding-done"
                >
                  {phrase ? (
                    <>
                      <ChevronRight className="w-4 h-4 mr-2" />
                      All done — go to feed
                    </>
                  ) : (
                    <>
                      <SkipForward className="w-4 h-4 mr-2" />
                      Skip for now
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
