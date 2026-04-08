import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Timestamp = bigint;
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type CommentId = bigint;
export interface Comment {
    id: CommentId;
    createdAt: Timestamp;
    text: string;
    author: UserId;
    postId: PostId;
}
export type TxId = bigint;
export type PostId = bigint;
export interface Post {
    id: PostId;
    likeCount: bigint;
    createdAt: Timestamp;
    text: string;
    likedBy: Array<UserId>;
    author: UserId;
    updatedAt: Timestamp;
    imageUrl?: string;
}
export interface Profile {
    id: UserId;
    bio: string;
    username?: string;
    contacts: Array<UserId>;
    displayName: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    avatarUrl?: string;
}
export interface Transaction {
    id: TxId;
    status: TxStatus;
    token: TokenType;
    memo?: string;
    counterparty: Principal;
    timestamp: Timestamp;
    txType: TxType;
    amount: bigint;
}
export enum TokenType {
    ICP = "ICP",
    ckBTC = "ckBTC",
    ckETH = "ckETH",
    ckUSDC = "ckUSDC",
    ckUSDT = "ckUSDT"
}
export enum TxStatus {
    pending = "pending",
    completed = "completed",
    failed = "failed"
}
export enum TxType {
    receive = "receive",
    send = "send"
}
export interface backendInterface {
    addComment(postId: PostId, text: string): Promise<CommentId>;
    addContact(username: string): Promise<Result>;
    createPost(text: string, imageUrl: string | null): Promise<PostId>;
    createProfile(displayName: string, bio: string, avatarUrl: string | null): Promise<Result>;
    deleteComment(postId: PostId, commentId: CommentId): Promise<Result>;
    deletePost(postId: PostId): Promise<Result>;
    editPost(postId: PostId, text: string, imageUrl: string | null): Promise<Result>;
    generateInviteLink(username: string): Promise<string>;
    getAllPosts(): Promise<Array<Post>>;
    getBalance(token: TokenType): Promise<bigint>;
    getComments(postId: PostId): Promise<Array<Comment>>;
    getContacts(): Promise<Array<Profile>>;
    getInviteProfile(username: string): Promise<Profile | null>;
    getMyProfile(): Promise<Profile | null>;
    getPost(id: PostId): Promise<Post | null>;
    getPostsByUser(userId: UserId): Promise<Array<Post>>;
    getProfile(userId: UserId): Promise<Profile | null>;
    getTransactionHistory(): Promise<Array<Transaction>>;
    getUsername(): Promise<string | null>;
    likePost(postId: PostId): Promise<Result>;
    listUsers(): Promise<Array<Profile>>;
    removeContact(userId: UserId): Promise<Result>;
    searchUsers(searchTerm: string): Promise<Array<Profile>>;
    sendToken(token: TokenType, to: Principal, amount: bigint, memo: string | null): Promise<Result>;
    setUsername(username: string): Promise<Result>;
    unlikePost(postId: PostId): Promise<Result>;
    updateProfile(displayName: string, bio: string, avatarUrl: string | null): Promise<Result>;
}
