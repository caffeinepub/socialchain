import Common "common";

module {
  public type Profile = {
    id : Common.UserId;
    displayName : Text;
    bio : Text;
    avatarUrl : ?Text;
    username : ?Text;
    contacts : [Common.UserId];
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
