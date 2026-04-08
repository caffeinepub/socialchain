import List "mo:core/List";
import Principal "mo:core/Principal";
import FeedLib "../lib/feed";
import FeedTypes "../types/feed";
import Common "../types/common";

mixin (
  posts : List.List<FeedTypes.PostInternal>,
  comments : List.List<FeedTypes.Comment>,
) {
  var nextPostId : Nat = 0;
  var nextCommentId : Nat = 0;

  public shared ({ caller }) func createPost(
    text : Text,
    imageUrl : ?Text,
  ) : async Common.PostId {
    if (caller.isAnonymous()) return 0;
    let id = FeedLib.createPost(posts, nextPostId, caller, text, imageUrl);
    nextPostId += 1;
    id;
  };

  public query func getPost(id : Common.PostId) : async ?FeedTypes.Post {
    FeedLib.getPost(posts, id);
  };

  public query func getAllPosts() : async [FeedTypes.Post] {
    FeedLib.getAllPosts(posts);
  };

  public query func getPostsByUser(userId : Common.UserId) : async [FeedTypes.Post] {
    FeedLib.getPostsByUser(posts, userId);
  };

  public shared ({ caller }) func likePost(postId : Common.PostId) : async Common.Result {
    if (caller.isAnonymous()) return #err("Authentication required");
    FeedLib.likePost(posts, caller, postId);
  };

  public shared ({ caller }) func unlikePost(postId : Common.PostId) : async Common.Result {
    if (caller.isAnonymous()) return #err("Authentication required");
    FeedLib.unlikePost(posts, caller, postId);
  };

  public shared ({ caller }) func editPost(
    postId : Common.PostId,
    text : Text,
    imageUrl : ?Text,
  ) : async Common.Result {
    if (caller.isAnonymous()) return #err("Authentication required");
    FeedLib.editPost(posts, caller, postId, text, imageUrl);
  };

  public shared ({ caller }) func deletePost(postId : Common.PostId) : async Common.Result {
    if (caller.isAnonymous()) return #err("Authentication required");
    FeedLib.deletePost(posts, comments, caller, postId);
  };

  public shared ({ caller }) func addComment(
    postId : Common.PostId,
    text : Text,
  ) : async Common.CommentId {
    if (caller.isAnonymous()) return 0;
    let id = FeedLib.addComment(posts, comments, nextCommentId, caller, postId, text);
    nextCommentId += 1;
    id;
  };

  public query func getComments(postId : Common.PostId) : async [FeedTypes.Comment] {
    FeedLib.getComments(comments, postId);
  };

  public shared ({ caller }) func deleteComment(
    postId : Common.PostId,
    commentId : Common.CommentId,
  ) : async Common.Result {
    if (caller.isAnonymous()) return #err("Authentication required");
    FeedLib.deleteComment(posts, comments, caller, postId, commentId);
  };
};
