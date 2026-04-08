# Design Brief: SocialChain

**Purpose & Tone:** Vibrant, energetic all-in-one social platform + ICP crypto wallet. Dark-first, premium-modern aesthetic with warm welcoming landing. Cyan for social actions (like, comment, share); orange for crypto (send, receive, swap). Trust signals through typographic hierarchy and spatial depth.

**Visual Identity:** Purple primary (0.72/0.22/274 dark), cyan secondary (0.65/0.24/189), orange accent (0.62/0.28/38). Backgrounds 11–15% L, borders 24% L. High chroma (0.22–0.28) for max vibrancy.

**Typography:** GeneralSans (headlines, nav), Figtree (body, feed), JetBrains Mono (wallet amounts, addresses).

## Palette (OKLCH)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary | 0.62 0.195 274 | 0.72 0.22 274 | App identity, primary CTAs, nav highlights, ring focus |
| Secondary | 0.74 0.22 189 | 0.65 0.24 189 | Social actions (like, comment, share), fresh secondary states |
| Accent | 0.68 0.24 38 | 0.62 0.28 38 | Crypto actions (send, swap, receive), warmth & differentiation |
| Destructive | 0.55 0.22 25 | 0.65 0.19 22 | Delete, unfriend, cancel, alert states |
| Background | 0.99 0 0 | 0.11 0 0 | Page background |
| Card | 1.0 0 0 | 0.15 0 0 | Post cards, feed items, modals |
| Border | 0.88 0 0 | 0.24 0 0 | Dividers, subtle hierarchy |
| Muted | 0.92 0 0 | 0.25 0 0 | Disabled states, secondary text containers |

## Structural Zones

| Zone | Surface | Purpose | Notes |
|------|---------|---------|-------|
| Header | `bg-card border-b` | Fixed top nav: search, profile, notifications | Sticky, clear separation from feed |
| Sidebar | `bg-card` | Desktop nav + wallet quick view | Shows ICP balance, quick send button |
| Main Feed | `bg-background` | Infinite scroll posts, stories, updates | Cards alternate `bg-card`, spacing 1rem |
| Post Card | `bg-card border rounded-lg` | User, image, engagement buttons | Secondary (cyan) for like/comment, accent (orange) for crypto send |
| Wallet | `bg-card border` | Transaction list, balance display | Modal or panel; mono font for amounts |
| Footer | `bg-background border-t` | Minimal nav, copyright | Mobile-only or desktop minimal |

## Spacing & Rhythm

- **Container**: 2rem padding, 1400px max-width
- **Cards**: 1rem gaps, 0.625rem radius
- **Type scale**: 12px (xs), 14px (sm), 16px (base), 20px (lg), 28px (xl), 36px (2xl)
- **Density**: Loose spacing (1.5rem) between feed cards for visual breathing room; compact (0.5rem) within card controls

## Component Patterns

- **Buttons**: Primary (purple 0.72L), Secondary (cyan), Tertiary (ghost). Crypto CTAs in orange. Disabled use muted foreground. Hover states brighten via opacity or saturation.
- **Social Actions**: Icon + count (cyan), "like" triggers pulse scale animation. "Send Crypto" in orange with card-elevation shadow.
- **Feed Cards**: Avatar + author + timestamp, media area (rounded), engagement row below (social in cyan left, crypto in orange right).
- **Wallet**: Balance in mono font (0.72L primary text), transaction list rows, send/receive/swap buttons use shadow-card elevation.
- **Landing Page**: Gradient hero (purple to orange), warm copy, CTA buttons in cyan and orange with shadow-elevated treatment.

## Motion & Interaction

- Smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1) all state changes, hover effects, focus rings
- Entrance: fade-in-stagger (0.4s) for feed cards, slide-up-fade (0.3s) for modals
- Social feedback: pulse-like (0.6s) on like action, success toast on send
- No bouncing or excessive animation; clarity prioritized

## Shadow Hierarchy

| Class | Usage | Value |
|-------|-------|-------|
| shadow-subtle | Text emphasis, minor elevation | 0 2px 8px oklch(0/0/0/0.08) |
| shadow-card | Post/wallet cards, modals | 0 4px 16px oklch(0/0/0/0.12) |
| shadow-elevated | CTAs, floating elements | 0 8px 24px oklch(0/0/0/0.16) |

## Differentiation

**"Vibrant + trustworthy"** — Cyan/orange contrast creates instant social/crypto pattern recognition. Dark surfaces with high-chroma accents feel premium, not chaotic. Monospace wallet = financial precision. Warm landing gradient welcomes first-time users before dark feed immersion.

## Constraints

- No rainbow; 4 semantic colors + grayscale only
- OKLCH values only; no hex, no arbitrary colors
- Mobile-first (`sm:`/`md:`/`lg:` breakpoints); sidebar → bottom nav at small screens
- AA+ contrast maintained; text L diff ≥ 0.7, interactive ≥ 0.45
