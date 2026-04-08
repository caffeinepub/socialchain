import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { LandingPage } from "@/pages/LandingPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const FeedPage = lazy(() =>
  import("@/pages/FeedPage").then((m) => ({ default: m.FeedPage })),
);
const ProfilePage = lazy(() =>
  import("@/pages/ProfilePage").then((m) => ({ default: m.ProfilePage })),
);
const WalletPage = lazy(() =>
  import("@/pages/WalletPage").then((m) => ({ default: m.WalletPage })),
);
const ExplorePage = lazy(() =>
  import("@/pages/ExplorePage").then((m) => ({ default: m.ExplorePage })),
);
const PostDetailPage = lazy(() =>
  import("@/pages/PostDetailPage").then((m) => ({ default: m.PostDetailPage })),
);
const ActivityPage = lazy(() =>
  import("@/pages/ActivityPage").then((m) => ({ default: m.ActivityPage })),
);
const NotificationsPage = lazy(() =>
  import("@/pages/NotificationsPage").then((m) => ({
    default: m.NotificationsPage,
  })),
);
const InvitePage = lazy(() =>
  import("@/pages/InvitePage").then((m) => ({ default: m.InvitePage })),
);
const OnboardingPage = lazy(() =>
  import("@/pages/OnboardingPage").then((m) => ({ default: m.OnboardingPage })),
);

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <LoadingSpinner size="lg" label="Loading..." />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-center" />
    </>
  ),
});

function AuthGuardedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <LoadingSpinner size="lg" label="Connecting to Internet Computer..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return <>{children}</>;
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const onboardingDone = localStorage.getItem("onboardingComplete");
    if (!onboardingDone) {
      throw redirect({ to: "/onboarding" });
    }
    throw redirect({ to: "/feed" });
  },
  component: () => null,
});

const feedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/feed",
  beforeLoad: () => {
    // First-time users should complete onboarding before the feed
    const onboardingDone = localStorage.getItem("onboardingComplete");
    if (!onboardingDone) {
      throw redirect({ to: "/onboarding" });
    }
  },
  component: () => (
    <AuthGuardedRoute>
      <Suspense fallback={<PageLoader />}>
        <FeedPage />
      </Suspense>
    </AuthGuardedRoute>
  ),
});

const exploreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/explore",
  component: () => (
    <AuthGuardedRoute>
      <Suspense fallback={<PageLoader />}>
        <ExplorePage />
      </Suspense>
    </AuthGuardedRoute>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile/$id",
  component: () => (
    <AuthGuardedRoute>
      <Suspense fallback={<PageLoader />}>
        <ProfilePage />
      </Suspense>
    </AuthGuardedRoute>
  ),
});

const walletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wallet",
  component: () => (
    <AuthGuardedRoute>
      <Suspense fallback={<PageLoader />}>
        <WalletPage />
      </Suspense>
    </AuthGuardedRoute>
  ),
});

const postDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/post/$id",
  component: () => (
    <AuthGuardedRoute>
      <Suspense fallback={<PageLoader />}>
        <PostDetailPage />
      </Suspense>
    </AuthGuardedRoute>
  ),
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/welcome",
  component: () => <LandingPage />,
});

const activityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/activity",
  component: () => (
    <AuthGuardedRoute>
      <Suspense fallback={<PageLoader />}>
        <ActivityPage />
      </Suspense>
    </AuthGuardedRoute>
  ),
});

const notificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notifications",
  component: () => (
    <AuthGuardedRoute>
      <Suspense fallback={<PageLoader />}>
        <NotificationsPage />
      </Suspense>
    </AuthGuardedRoute>
  ),
});

const inviteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add/$username",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <InvitePage />
    </Suspense>
  ),
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: () => (
    <AuthGuardedRoute>
      <Suspense fallback={<PageLoader />}>
        <OnboardingPage />
      </Suspense>
    </AuthGuardedRoute>
  ),
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  beforeLoad: () => {
    throw redirect({ to: "/feed" });
  },
  component: () => null,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  feedRoute,
  exploreRoute,
  profileRoute,
  walletRoute,
  postDetailRoute,
  landingRoute,
  activityRoute,
  notificationsRoute,
  inviteRoute,
  onboardingRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
