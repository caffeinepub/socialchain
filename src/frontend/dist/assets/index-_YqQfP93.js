import { u as useAuth, b as useQueryClient, _ as __vitePreload, a3 as Principal, aK as JSON_KEY_PRINCIPAL, aL as base32Decode, aM as base32Encode, aN as getCrc32 } from "./index-C0kt3zpQ.js";
import { u as useBackend, a as useQuery, b as useMutation } from "./useBackend-BBA1i2Pl.js";
function useGetMyProfile() {
  const { actor, isReady } = useBackend();
  return useQuery({
    queryKey: ["profile", "me"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: isReady,
    staleTime: 6e4
  });
}
function useGetProfile(userId) {
  const { actor, isReady } = useBackend();
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      const { Principal: Principal2 } = await __vitePreload(async () => {
        const { Principal: Principal3 } = await Promise.resolve().then(() => index);
        return { Principal: Principal3 };
      }, true ? void 0 : void 0);
      return actor.getProfile(Principal2.fromText(userId));
    },
    enabled: isReady && !!userId,
    staleTime: 6e4
  });
}
function useUpdateProfile() {
  const { actor } = useBackend();
  const { principal } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      displayName,
      bio,
      avatarUrl
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateProfile(displayName, bio, avatarUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", "me"] });
      queryClient.invalidateQueries({ queryKey: ["profile", principal] });
    }
  });
}
function useCreateProfile() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      displayName,
      bio,
      avatarUrl
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createProfile(displayName, bio, avatarUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    }
  });
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  JSON_KEY_PRINCIPAL,
  Principal,
  base32Decode,
  base32Encode,
  getCrc32
}, Symbol.toStringTag, { value: "Module" }));
export {
  useUpdateProfile as a,
  useCreateProfile as b,
  useGetProfile as c,
  index as i,
  useGetMyProfile as u
};
