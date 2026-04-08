import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/feed";
import Common "../types/common";

module {
  public func toPublic(post : Types.PostInternal) : Types.Post {
    {
      id = post.id;
      author = post.author;
      text = post.text;
      imageUrl = post.imageUrl;
      likedBy = post.likedBy;
      likeCount = post.likedBy.size();
      createdAt = post.createdAt;
      updatedAt = post.updatedAt;
    };
  };

  public func createPost(
    posts : List.List<Types.PostInternal>,
    nextPostId : Nat,
    caller : Common.UserId,
    text : Text,
    imageUrl : ?Text,
  ) : Common.PostId {
    let id = nextPostId;
    let now = Time.now();
    posts.add({
      id;
      author = caller;
      text;
      imageUrl;
      var likedBy : [Common.UserId] = [];
      createdAt = now;
      var updatedAt = now;
    });
    id;
  };

  public func getPost(
    posts : List.List<Types.PostInternal>,
    id : Common.PostId,
  ) : ?Types.Post {
    switch (posts.find(func(p : Types.PostInternal) : Bool { p.id == id })) {
      case null null;
      case (?p) ?toPublic(p);
    };
  };

  public func getAllPosts(
    posts : List.List<Types.PostInternal>
  ) : [Types.Post] {
    posts.reverse().map<Types.PostInternal, Types.Post>(toPublic).toArray();
  };

  public func getPostsByUser(
    posts : List.List<Types.PostInternal>,
    userId : Common.UserId,
  ) : [Types.Post] {
    posts.reverse().filter(func(p : Types.PostInternal) : Bool {
      Principal.equal(p.author, userId)
    }).map<Types.PostInternal, Types.Post>(toPublic).toArray();
  };

  public func likePost(
    posts : List.List<Types.PostInternal>,
    caller : Common.UserId,
    postId : Common.PostId,
  ) : Common.Result {
    switch (posts.find(func(p : Types.PostInternal) : Bool { p.id == postId })) {
      case null #err("Post not found");
      case (?post) {
        for (uid in post.likedBy.values()) {
          if (Principal.equal(uid, caller)) return #ok;
        };
        post.likedBy := post.likedBy.concat([caller]);
        #ok;
      };
    };
  };

  public func unlikePost(
    posts : List.List<Types.PostInternal>,
    caller : Common.UserId,
    postId : Common.PostId,
  ) : Common.Result {
    switch (posts.find(func(p : Types.PostInternal) : Bool { p.id == postId })) {
      case null #err("Post not found");
      case (?post) {
        post.likedBy := post.likedBy.filter(func(uid : Common.UserId) : Bool {
          not Principal.equal(uid, caller)
        });
        #ok;
      };
    };
  };

  public func editPost(
    posts : List.List<Types.PostInternal>,
    caller : Common.UserId,
    postId : Common.PostId,
    newText : Text,
    newImageUrl : ?Text,
  ) : Common.Result {
    var found = false;
    var authorized = true;
    posts.mapInPlace(func(p : Types.PostInternal) : Types.PostInternal {
      if (p.id == postId) {
        found := true;
        if (not Principal.equal(p.author, caller)) {
          authorized := false;
          p;
        } else {
          let now = Time.now();
          p.updatedAt := now;
          p.likedBy := p.likedBy; // retain existing likedBy
          {
            id = p.id;
            author = p.author;
            text = newText;
            imageUrl = newImageUrl;
            var likedBy = p.likedBy;
            createdAt = p.createdAt;
            var updatedAt = now;
          };
        };
      } else { p };
    });
    if (not found) return #err("Post not found");
    if (not authorized) return #err("Not authorized");
    #ok;
  };

  public func deletePost(
    posts : List.List<Types.PostInternal>,
    comments : List.List<Types.Comment>,
    caller : Common.UserId,
    postId : Common.PostId,
  ) : Common.Result {
    switch (posts.find(func(p : Types.PostInternal) : Bool { p.id == postId })) {
      case null #err("Post not found");
      case (?post) {
        if (not Principal.equal(post.author, caller)) return #err("Not authorized");
        let kept = posts.filter(func(p : Types.PostInternal) : Bool { p.id != postId });
        posts.clear();
        posts.append(kept);
        let keptComments = comments.filter(func(c : Types.Comment) : Bool { c.postId != postId });
        comments.clear();
        comments.append(keptComments);
        #ok;
      };
    };
  };

  public func addComment(
    posts : List.List<Types.PostInternal>,
    comments : List.List<Types.Comment>,
    nextCommentId : Nat,
    caller : Common.UserId,
    postId : Common.PostId,
    text : Text,
  ) : Common.CommentId {
    switch (posts.find(func(p : Types.PostInternal) : Bool { p.id == postId })) {
      case null 0;
      case (?_) {
        let id = nextCommentId;
        comments.add({
          id;
          postId;
          author = caller;
          text;
          createdAt = Time.now();
        });
        id;
      };
    };
  };

  public func getComments(
    comments : List.List<Types.Comment>,
    postId : Common.PostId,
  ) : [Types.Comment] {
    comments.filter(func(c : Types.Comment) : Bool { c.postId == postId }).toArray();
  };

  public func deleteComment(
    posts : List.List<Types.PostInternal>,
    comments : List.List<Types.Comment>,
    caller : Common.UserId,
    postId : Common.PostId,
    commentId : Common.CommentId,
  ) : Common.Result {
    switch (comments.find(func(c : Types.Comment) : Bool { c.id == commentId and c.postId == postId })) {
      case null #err("Comment not found");
      case (?comment) {
        let isCommentAuthor = Principal.equal(comment.author, caller);
        let isPostAuthor = switch (posts.find(func(p : Types.PostInternal) : Bool { p.id == postId })) {
          case (?post) Principal.equal(post.author, caller);
          case null false;
        };
        if (not isCommentAuthor and not isPostAuthor) return #err("Not authorized");
        let kept = comments.filter(func(c : Types.Comment) : Bool { c.id != commentId });
        comments.clear();
        comments.append(kept);
        #ok;
      };
    };
  };
};
