import type { backendInterface } from "../backend";
import { TokenType, TxStatus, TxType } from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const samplePrincipal = Principal.fromText("2vxsx-fae");

const ok: { __kind__: "ok"; ok: null } = { __kind__: "ok", ok: null };

export const mockBackend: backendInterface = {
  addComment: async (_postId, _text) => BigInt(1),

  addContact: async () => ok,

  createPost: async (_text, _imageUrl) => BigInt(1),

  createProfile: async (_displayName, _bio, _avatarUrl) => ok,

  deleteComment: async () => ok,

  deletePost: async () => ok,

  editPost: async () => ok,

  generateRecoveryPhrase: async () => null,

  getRecoveryPhrase: async () => null,

  generateInviteLink: async (username) =>
    `${typeof window !== "undefined" ? window.location.origin : "https://socialchain.app"}/add/${username}`,

  getAllPosts: async () => [],

  getBalance: async () => BigInt(0),

  getComments: async (_postId) => [],

  getContacts: async () => [],

  getInviteProfile: async () => null as never,

  getMyProfile: async () => null as never,

  getPost: async (_postId) => null as never,

  getPostsByUser: async () => [],

  getProfile: async () => null as never,

  getTransactionHistory: async () => [],

  getUsername: async () => undefined as never,

  likePost: async () => ok,

  listUsers: async () => [],

  removeContact: async () => ok,

  searchUsers: async () => [],

  sendToken: async () => ok,

  setUsername: async () => ok,

  unlikePost: async () => ok,

  updateProfile: async () => ok,
};

// Re-export enums so they remain available if imported from this module
export { TokenType, TxStatus, TxType };
// Keep Principal export for convenience
export { samplePrincipal };
