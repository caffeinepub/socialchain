import Map "mo:core/Map";
import Principal "mo:core/Principal";
import ProfileLib "../lib/profile";
import ProfileTypes "../types/profile";
import Common "../types/common";

mixin (
  profiles : Map.Map<Common.UserId, ProfileTypes.Profile>,
  usernames : Map.Map<Text, Common.UserId>,
) {
  public shared ({ caller }) func createProfile(
    displayName : Text,
    bio : Text,
    avatarUrl : ?Text,
  ) : async Common.Result {
    if (caller.isAnonymous()) return #err("Authentication required");
    ProfileLib.createProfile(profiles, caller, displayName, bio, avatarUrl);
  };

  public shared ({ caller }) func updateProfile(
    displayName : Text,
    bio : Text,
    avatarUrl : ?Text,
  ) : async Common.Result {
    if (caller.isAnonymous()) return #err("Authentication required");
    ProfileLib.updateProfile(profiles, caller, displayName, bio, avatarUrl);
  };

  public query func getProfile(userId : Common.UserId) : async ?ProfileTypes.Profile {
    ProfileLib.getProfile(profiles, userId);
  };

  public shared ({ caller }) func getMyProfile() : async ?ProfileTypes.Profile {
    if (caller.isAnonymous()) return null;
    ProfileLib.getProfile(profiles, caller);
  };

  public query func listUsers() : async [ProfileTypes.Profile] {
    ProfileLib.listUsers(profiles);
  };

  public query func searchUsers(searchTerm : Text) : async [ProfileTypes.Profile] {
    ProfileLib.searchUsers(profiles, searchTerm);
  };

  public shared ({ caller }) func setUsername(username : Text) : async Common.Result {
    if (caller.isAnonymous()) return #err("Authentication required");
    ProfileLib.setUsername(profiles, usernames, caller, username);
  };

  public shared ({ caller }) func getUsername() : async ?Text {
    if (caller.isAnonymous()) return null;
    ProfileLib.getUsername(profiles, caller);
  };

  public query func getInviteProfile(username : Text) : async ?ProfileTypes.Profile {
    ProfileLib.getInviteProfile(profiles, usernames, username);
  };

  public shared ({ caller }) func generateInviteLink(username : Text) : async Text {
    if (caller.isAnonymous()) return "";
    "https://socialchain.app/add/" # username;
  };

  public shared ({ caller }) func addContact(username : Text) : async Common.Result {
    if (caller.isAnonymous()) return #err("Authentication required");
    ProfileLib.addContact(profiles, usernames, caller, username);
  };

  public shared ({ caller }) func getContacts() : async [ProfileTypes.Profile] {
    if (caller.isAnonymous()) return [];
    ProfileLib.getContacts(profiles, caller);
  };

  public shared ({ caller }) func removeContact(userId : Common.UserId) : async Common.Result {
    if (caller.isAnonymous()) return #err("Authentication required");
    ProfileLib.removeContact(profiles, caller, userId);
  };
};
