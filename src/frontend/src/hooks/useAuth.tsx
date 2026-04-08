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

  const status: AuthStatus = isInitializing
    ? "initializing"
    : isAuthenticated
      ? "authenticated"
      : isError
        ? "error"
        : "anonymous";

  const principal = identity?.getPrincipal().toText() ?? null;

  return {
    isAuthenticated,
    isInitializing,
    isError,
    status,
    principal,
    loginError,
    login,
    logout: clear,
  };
}
