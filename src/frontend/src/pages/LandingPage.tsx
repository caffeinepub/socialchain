import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useFileUpload } from "@/hooks/useFileUpload";
import {
  AlertTriangle,
  Bitcoin,
  Camera,
  CheckCircle2,
  Globe,
  Heart,
  Link2,
  Loader2,
  MessageCircle,
  RefreshCw,
  Shield,
  Smartphone,
  TrendingUp,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

const FEATURES = [
  {
    icon: Heart,
    title: "Social Feed",
    description:
      "Share moments with text and photos. Like, comment, and connect — just like the social platforms you love.",
    color: "text-secondary",
    bg: "bg-secondary/15",
  },
  {
    icon: Wallet,
    title: "Crypto Wallet",
    description:
      "Built-in wallet supporting ICP, ckBTC, ckETH, ckUSDC, and ckUSDT. Send and receive without leaving the app.",
    color: "text-accent",
    bg: "bg-accent/15",
  },
  {
    icon: Link2,
    title: "Contact Links",
    description:
      "Personalized invite links like socialchain.app/add/you — share across any platform to grow your network.",
    color: "text-primary",
    bg: "bg-primary/15",
  },
  {
    icon: TrendingUp,
    title: "Live Balances",
    description:
      "Real-time token balances always at your fingertips. Watch your portfolio move as markets shift.",
    color: "text-accent",
    bg: "bg-accent/15",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Powered by Internet Identity — no passwords, no email required. Your identity lives on-chain.",
    color: "text-secondary",
    bg: "bg-secondary/15",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Built for your phone first. Beautiful, fast, and intuitive on any device, any screen size.",
    color: "text-primary",
    bg: "bg-primary/15",
  },
];

const DEMO_POSTS = [
  {
    id: "1",
    name: "Maya Patel",
    username: "mayap",
    time: "3 min ago",
    content:
      "Just received my first ckBTC tip on a photo I shared! Web3 social is actually here 🎉 #SocialChain #ICP",
    likes: "2.1K",
    comments: "189",
    initials: "MP",
    avatarGradient: "from-secondary/60 to-primary/60",
    accentText: "text-secondary",
    accentBg: "bg-secondary/15",
  },
  {
    id: "2",
    name: "Carlos Vega",
    username: "carlosv",
    time: "12 min ago",
    content:
      "Sunset from Guadalajara last night. Feeling grateful 🌅✨ Who's loving the new feed layout?",
    likes: "892",
    comments: "47",
    initials: "CV",
    avatarGradient: "from-accent/60 to-secondary/40",
    accentText: "text-accent",
    accentBg: "bg-accent/15",
  },
  {
    id: "3",
    name: "Zoe Kim",
    username: "zoekim",
    time: "28 min ago",
    content:
      "ckETH is up 8% today 📈 Sent some earnings directly from my wallet to a friend without any gas fees. The future is wild.",
    likes: "3.4K",
    comments: "312",
    initials: "ZK",
    avatarGradient: "from-primary/60 to-accent/40",
    accentText: "text-primary",
    accentBg: "bg-primary/15",
  },
];

const TOKENS = [
  {
    symbol: "ICP",
    name: "Internet Computer",
    color: "text-primary",
    icon: Globe,
  },
  { symbol: "ckBTC", name: "Bitcoin", color: "text-accent", icon: Bitcoin },
  {
    symbol: "ckETH",
    name: "Ethereum",
    color: "text-secondary",
    icon: TrendingUp,
  },
  { symbol: "ckUSDC", name: "USD Coin", color: "text-accent", icon: Wallet },
];

// ── Profile Picture Picker ────────────────────────────────────────────────────

function ProfilePicturePicker() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isUploading, progress, error, uploadFile, reset } = useFileUpload();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Show local preview immediately
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);
      setUploadedUrl(null);

      try {
        const url = await uploadFile(file);
        setUploadedUrl(url);
        // Store for post-sign-in pickup
        localStorage.setItem("pendingAvatarUrl", url);
      } catch {
        // error state surfaced by hook
      }
    },
    [uploadFile],
  );

  const handleClear = useCallback(() => {
    setPreviewUrl(null);
    setUploadedUrl(null);
    reset();
    localStorage.removeItem("pendingAvatarUrl");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [reset]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6 mb-2"
      data-ocid="landing-profile-pic-section"
    >
      {/* Subtle divider label */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-border/60" />
        <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
          Optional
        </span>
        <div className="h-px flex-1 bg-border/60" />
      </div>

      <div className="flex flex-col items-center gap-3 bg-card/60 border border-border rounded-2xl px-5 py-5 backdrop-blur-sm">
        <p className="text-sm font-display font-semibold text-foreground">
          Set your profile picture
        </p>
        <p className="text-xs text-muted-foreground -mt-1 text-center max-w-xs">
          Choose a photo before you sign in — it'll be waiting when you arrive.
        </p>

        {/* Avatar preview ring */}
        <div className="relative group">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            aria-label="Choose profile photo"
            data-ocid="landing-avatar-picker"
            className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-border hover:ring-primary/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-primary relative flex items-center justify-center bg-muted disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Your profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <Camera className="w-6 h-6" />
              </div>
            )}

            {/* Overlay on hover when no upload in progress */}
            {!isUploading && previewUrl && (
              <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-5 h-5 text-background" />
              </div>
            )}

            {/* Upload progress ring overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-background/70 flex items-center justify-center rounded-full">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            )}
          </button>

          {/* Clear button — shown once a photo is picked */}
          {previewUrl && !isUploading && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Remove photo"
              data-ocid="landing-avatar-clear"
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-sm hover:bg-destructive/80 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}

          {/* Success badge */}
          {uploadedUrl && !isUploading && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
            </div>
          )}
        </div>

        {/* Progress bar */}
        {isUploading && (
          <div className="w-full max-w-[160px]">
            <div className="h-1 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-1">
              Uploading {progress}%…
            </p>
          </div>
        )}

        {/* Upload error */}
        {error && (
          <p className="text-xs text-destructive text-center max-w-xs">
            {error} — tap the photo to try again.
          </p>
        )}

        {/* Success note */}
        {uploadedUrl && !isUploading && (
          <p className="text-xs text-accent font-medium text-center">
            Photo saved! It'll be applied to your profile after sign-in.
          </p>
        )}

        {/* Choose Photo CTA (if no photo yet) */}
        {!previewUrl && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            data-ocid="landing-choose-photo-btn"
            className="border-border text-foreground hover:bg-muted transition-smooth text-xs px-4"
          >
            <Camera className="w-3.5 h-3.5 mr-1.5" />
            Choose Photo
          </Button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          onChange={handleFileChange}
          data-ocid="landing-file-input"
        />
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function LandingPage() {
  const { login, isError, loginError } = useAuth();

  // Friendly error message for any login failure (not just CANISTER_ID_BACKEND).
  const errorMessage = loginError?.message
    ? `Sign-in failed: ${loginError.message.slice(0, 120)}`
    : "Sign-in encountered an issue. Please try again.";

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Auth error banner — shown for any Internet Identity failure */}
      {isError && (
        <div className="fixed top-0 inset-x-0 z-[60] bg-destructive/10 border-b border-destructive/30 px-4 py-2.5 flex items-center justify-center gap-3">
          <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
          <p className="text-xs text-destructive font-medium">{errorMessage}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex items-center gap-1 text-xs text-destructive font-semibold underline hover:no-underline flex-shrink-0"
            data-ocid="auth-error-retry"
          >
            <RefreshCw className="w-3 h-3" />
            Retry
          </button>
        </div>
      )}

      {/* Sticky Header */}
      <header
        className={`fixed inset-x-0 z-50 h-14 bg-card/85 backdrop-blur-xl border-b border-border flex items-center justify-between px-5 ${isError ? "top-10" : "top-0"}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg gradient-hero flex items-center justify-center shadow-sm">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-foreground">
            Social<span className="text-primary">Chain</span>
          </span>
        </div>
        <Button
          onClick={login}
          size="sm"
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-sm"
          data-ocid="landing-header-signin"
        >
          Sign In
        </Button>
      </header>

      {/* ── Hero Section ── */}
      <section
        className={`relative flex flex-col items-center min-h-screen overflow-hidden ${isError ? "pt-24" : "pt-14"}`}
      >
        {/* Gradient BG */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-b from-primary/12 via-secondary/6 to-transparent" />
          <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/8 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] right-[-15%] w-[45vw] h-[45vw] bg-accent/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-5 pt-10 pb-6 max-w-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/12 border border-primary/25 text-primary text-xs font-semibold mb-5">
              <Zap className="w-3 h-3" />
              Powered by Internet Computer Protocol
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-[1.1] tracking-tight mb-4">
              <span className="text-foreground">Your social world meets</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                crypto — all in one place.
              </span>
            </h1>

            {/* Sub-tagline */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-2 max-w-md mx-auto">
              Connect with friends, share your life, and manage ICP, ckBTC,
              ckETH, ckUSDC &amp; ckUSDT — seamlessly.
            </p>
            <p className="text-sm text-muted-foreground mb-7 max-w-sm mx-auto">
              No passwords. No email. Just you and Internet Identity.
            </p>

            {/* ── Optional profile picture picker ── */}
            <div className="max-w-sm mx-auto w-full">
              <ProfilePicturePicker />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <Button
                onClick={isError ? () => window.location.reload() : login}
                size="lg"
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 shadow-lg transition-smooth"
                data-ocid="landing-hero-cta"
              >
                {isError
                  ? "Retry Connection"
                  : "Get Started with Internet Identity"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-border text-foreground hover:bg-muted transition-smooth"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="landing-learn-more"
              >
                See what's inside
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual — image + floating cards */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-3xl mx-auto px-4 pb-12"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-elevated">
            <img
              src="/assets/generated/hero-social-crypto.dim_1200x600.jpg"
              alt="SocialChain — social meets crypto"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
          </div>

          {/* Floating: Wallet Balance */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute left-2 sm:left-0 top-6 flex items-center gap-2.5 card-elevated rounded-xl px-3 py-2.5 shadow-elevated"
          >
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center flex-shrink-0">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground leading-none mb-0.5">
                Wallet Balance
              </p>
              <p className="font-mono font-bold text-sm text-accent leading-none">
                148.52 ICP
              </p>
            </div>
          </motion.div>

          {/* Floating: Post liked */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85 }}
            className="absolute right-2 sm:right-0 top-6 flex items-center gap-2.5 card-elevated rounded-xl px-3 py-2.5 shadow-elevated"
          >
            <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 text-secondary fill-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground leading-none mb-0.5">
                Post Likes Today
              </p>
              <p className="font-mono font-bold text-sm text-foreground leading-none">
                2.4M
              </p>
            </div>
          </motion.div>

          {/* Floating: tip received */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-4 flex items-center gap-2 card-elevated rounded-full px-4 py-2 shadow-elevated whitespace-nowrap"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold text-foreground">
              You received a 0.5 ICP tip!
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Demo Post Previews ── */}
      <section className="bg-muted/30 py-16 px-5 border-y border-border">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Your feed, reimagined
            </h2>
            <p className="text-sm text-muted-foreground">
              Social content and crypto transactions in a seamless stream.
            </p>
          </motion.div>

          <div className="space-y-3">
            {DEMO_POSTS.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="card-elevated rounded-2xl p-4"
                data-ocid={`demo-post-${post.id}`}
              >
                {/* Post header */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div
                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${post.avatarGradient} flex items-center justify-center font-display font-bold text-xs text-white ring-2 ring-border flex-shrink-0`}
                  >
                    {post.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-semibold text-sm text-foreground leading-tight truncate">
                      {post.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      @{post.username} · {post.time}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  {post.content}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="btn-social flex items-center gap-1.5 text-secondary text-xs"
                  >
                    <Heart className="w-3.5 h-3.5 fill-secondary" />
                    {post.likes}
                  </button>
                  <button
                    type="button"
                    className="btn-social flex items-center gap-1.5 text-muted-foreground text-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {post.comments}
                  </button>
                  <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-accent/15 text-accent border border-accent/30">
                    <Wallet className="w-3 h-3" />
                    Tip Creator
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Wallet preview card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-3 card-elevated rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-display font-semibold text-sm text-foreground">
                Wallet Quick-View
              </p>
              <div className="text-xs text-accent font-semibold px-2 py-0.5 rounded-full bg-accent/12 border border-accent/25">
                Live
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {TOKENS.map((token) => (
                <div
                  key={token.symbol}
                  className="flex items-center gap-2 bg-muted/40 rounded-xl px-3 py-2"
                >
                  <token.icon
                    className={`w-4 h-4 flex-shrink-0 ${token.color}`}
                  />
                  <div className="min-w-0">
                    <p
                      className={`font-mono font-bold text-xs leading-tight ${token.color}`}
                    >
                      {token.symbol}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {token.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" className="py-16 px-5 bg-background">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Everything you need, built in
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Social media meets on-chain finance. No compromises.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-elevated rounded-2xl p-5 hover:border-primary/30 transition-smooth group"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center mb-3`}
                >
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="font-display font-semibold text-sm text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="bg-muted/40 py-16 px-5 border-t border-border">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-sm mx-auto text-center"
        >
          {/* Logo mark */}
          <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-5 shadow-elevated">
            <Zap className="w-8 h-8 text-white" />
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
            Ready to join?
          </h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Join thousands already connecting, sharing, and transacting on
            SocialChain. No password needed.
          </p>
          <Button
            onClick={isError ? () => window.location.reload() : login}
            size="lg"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg transition-smooth"
            data-ocid="landing-bottom-cta"
          >
            {isError ? "Retry Connection" : "Sign in with Internet Identity"}
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Free · Secure · On-chain
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-5 px-5 border-t border-border bg-card flex items-center justify-center">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} SocialChain. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
