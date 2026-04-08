import type { Profile } from "@/backend.d";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useBackend } from "./useBackend";

export type { Profile };

export function useGetMyProfile() {
  const { actor, isReady } = useBackend();
  return useQuery<Profile | null>({
    queryKey: ["profile", "me"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: isReady,
    staleTime: 60_000,
  });
}

export function useGetProfile(userId?: string) {
  const { actor, isReady } = useBackend();
  return useQuery<Profile | null>({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      // Convert string principal to Principal type
      const { Principal } = await import("@icp-sdk/core/principal");
      return actor.getProfile(Principal.fromText(userId));
    },
    enabled: isReady && !!userId,
    staleTime: 60_000,
  });
}

export function useUpdateProfile() {
  const { actor } = useBackend();
  const { principal } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      displayName,
      bio,
      avatarUrl,
    }: {
      displayName: string;
      bio: string;
      avatarUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateProfile(displayName, bio, avatarUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", "me"] });
      queryClient.invalidateQueries({ queryKey: ["profile", principal] });
    },
  });
}

export function useCreateProfile() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      displayName,
      bio,
      avatarUrl,
    }: {
      displayName: string;
      bio: string;
      avatarUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createProfile(displayName, bio, avatarUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
