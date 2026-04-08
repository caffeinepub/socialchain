import Common "common";

module {
  // Internal representation with mutable fields
  public type PostInternal = {
    id : Common.PostId;
    author : Common.UserId;
    text : Text;
    imageUrl : ?Text;
    var likedBy : [Common.UserId];
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  // Shared public representation
  public type Post = {
    id : Common.PostId;
    author : Common.UserId;
    text : Text;
    imageUrl : ?Text;
    likedBy : [Common.UserId];
    likeCount : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type Comment = {
    id : Common.CommentId;
    postId : Common.PostId;
    author : Common.UserId;
    text : Text;
    createdAt : Common.Timestamp;
  };
};
