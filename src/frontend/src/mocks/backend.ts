import type { backendInterface } from "../backend";
import { TokenType, TxStatus, TxType } from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const samplePrincipal = Principal.fromText("2vxsx-fae");
const now = BigInt(Date.now()) * BigInt(1_000_000);

const ok: { __kind__: "ok"; ok: null } = { __kind__: "ok", ok: null };

const sampleProfile = {
  id: samplePrincipal,
  bio: "Crypto enthusiast & photographer. Building on the IC.",
  displayName: "Alex Rivers",
  username: "arivers" as string | undefined,
  contacts: [] as Principal[],
  createdAt: now - BigInt(86400000) * BigInt(1_000_000),
  updatedAt: now,
  avatarUrl: "" as string | undefined,
};

const samplePost = {
  id: BigInt(1),
  likeCount: BigInt(142),
  text: "Sunset vibes at Mt. Rainier! #nature #travel ✨",
  createdAt: now - BigInt(3_600_000) * BigInt(1_000_000),
  updatedAt: now,
  author: samplePrincipal,
  imageUrl: undefined as string | undefined,
  likedBy: [] as Principal[],
};

export const mockBackend: backendInterface = {
  addComment: async (_postId, _text) => BigInt(1),

  addContact: async () => ok,

  createPost: async (_text, _imageUrl) => BigInt(1),

  createProfile: async (_displayName, _bio, _avatarUrl) => ok,

  deleteComment: async () => ok,

  deletePost: async () => ok,

  editPost: async () => ok,

  generateInviteLink: async (username) =>
    `${typeof window !== "undefined" ? window.location.origin : "https://socialchain.app"}/add/${username}`,

  getAllPosts: async () => [
    { ...samplePost, id: BigInt(1), likeCount: BigInt(142) },
    {
      ...samplePost,
      id: BigInt(2),
      likeCount: BigInt(892),
      text: "ICP just broke resistance at $12. Looking bullish for Q2! 🚀 #ICP #crypto",
      createdAt: now - BigInt(7_200_000) * BigInt(1_000_000),
    },
    {
      ...samplePost,
      id: BigInt(3),
      likeCount: BigInt(2100),
      text: "Just received 5 ICP as a tip for my photography series! Web3 social is real 🙌",
      createdAt: now - BigInt(10_800_000) * BigInt(1_000_000),
    },
  ],

  getBalance: async () => BigInt(15250000000),

  getComments: async (_postId) => [
    {
      id: BigInt(1),
      text: "This is amazing! 🔥",
      createdAt: now - BigInt(1_800_000) * BigInt(1_000_000),
      author: samplePrincipal,
      postId: BigInt(1),
    },
  ],

  getContacts: async () => [],

  getInviteProfile: async () => sampleProfile,

  getMyProfile: async () => sampleProfile,

  getPost: async (postId) => ({ ...samplePost, id: postId }),

  getPostsByUser: async () => [{ ...samplePost }],

  getProfile: async () => sampleProfile,

  getTransactionHistory: async () => [
    {
      id: BigInt(1),
      status: TxStatus.completed,
      token: TokenType.ICP,
      memo: "Tip for photography" as string | undefined,
      timestamp: now - BigInt(3_600_000) * BigInt(1_000_000),
      counterparty: samplePrincipal,
      txType: TxType.receive,
      amount: BigInt(500000000),
    },
    {
      id: BigInt(2),
      status: TxStatus.completed,
      token: TokenType.ICP,
      memo: "Support creator" as string | undefined,
      timestamp: now - BigInt(7_200_000) * BigInt(1_000_000),
      counterparty: samplePrincipal,
      txType: TxType.send,
      amount: BigInt(100000000),
    },
    {
      id: BigInt(3),
      status: TxStatus.pending,
      token: TokenType.ckBTC,
      memo: undefined,
      timestamp: now - BigInt(1_800_000) * BigInt(1_000_000),
      counterparty: samplePrincipal,
      txType: TxType.receive,
      amount: BigInt(250000000),
    },
  ],

  getUsername: async () => "arivers",

  likePost: async () => ok,

  listUsers: async () => [sampleProfile],

  removeContact: async () => ok,

  searchUsers: async () => [sampleProfile],

  sendToken: async () => ok,

  setUsername: async () => ok,

  unlikePost: async () => ok,

  updateProfile: async () => ok,
};
