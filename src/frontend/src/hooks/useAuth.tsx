import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export type AuthStatus =
  | "initializing"
  | "authenticated"
  | "anonymous"
  | "error";

export interface UseAuthReturn {
  isAuthenticated: boolean;
  isInitializing: boolean;
  isError: boolean;
  status: AuthStatus;
  principal: string | null;
  loginError: Error | undefined;
  login: () => void;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const { identity, loginStatus, login, clear, loginError } =
    useInternetIdentity();

  const isInitializing = loginStatus === "initializing";
  const isAuthenticated = loginStatus === "success" && identity != null;
  const isError = loginStatus === "loginError";

  // Surface all auth errors to the console so issues are always visible.
  if (isError && loginError) {
    console.error("[SocialChain] Internet Identity login error:", loginError);
  }

  const status: AuthStatus = isInitializing
    ? "initializing"
    : isAuthenticated
      ? "authenticated"
      : isError
        ? "error"
        : "anonymous";

  const principal = identity?.getPrincipal().toText() ?? null;

  const safeLogin = () => {
    try {
      login();
    } catch (err) {
      console.error("[SocialChain] login() threw synchronously:", err);
    }
  };

  return {
    isAuthenticated,
    isInitializing,
    isError,
    status,
    principal,
    loginError,
    login: safeLogin,
    logout: clear,
  };
}
