module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type PostId = Nat;
  public type CommentId = Nat;
  public type TxId = Nat;

  public type Result = { #ok; #err : Text };
};
