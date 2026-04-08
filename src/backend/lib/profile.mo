import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/profile";
import Common "../types/common";

module {
  public func createProfile(
    profiles : Map.Map<Common.UserId, Types.Profile>,
    caller : Common.UserId,
    displayName : Text,
    bio : Text,
    avatarUrl : ?Text,
  ) : Common.Result {
    if (caller.isAnonymous()) return #err("Anonymous callers not allowed");
    switch (profiles.get(caller)) {
      case (?_) #err("Profile already exists");
      case null {
        let now = Time.now();
        profiles.add(caller, {
          id = caller;
          displayName;
          bio;
          avatarUrl;
          username = null;
          contacts = [];
          createdAt = now;
          updatedAt = now;
        });
        #ok;
      };
    };
  };

  public func updateProfile(
    profiles : Map.Map<Common.UserId, Types.Profile>,
    caller : Common.UserId,
    displayName : Text,
    bio : Text,
    avatarUrl : ?Text,
  ) : Common.Result {
    if (caller.isAnonymous()) return #err("Anonymous callers not allowed");
    switch (profiles.get(caller)) {
      case null #err("Profile not found");
      case (?existing) {
        profiles.add(caller, {
          existing with
          displayName;
          bio;
          avatarUrl;
          updatedAt = Time.now();
        });
        #ok;
      };
    };
  };

  public func getProfile(
    profiles : Map.Map<Common.UserId, Types.Profile>,
    userId : Common.UserId,
  ) : ?Types.Profile {
    profiles.get(userId);
  };

  public func listUsers(
    profiles : Map.Map<Common.UserId, Types.Profile>
  ) : [Types.Profile] {
    profiles.values().toArray();
  };

  public func searchUsers(
    profiles : Map.Map<Common.UserId, Types.Profile>,
    searchTerm : Text,
  ) : [Types.Profile] {
    let lower = searchTerm.toLower();
    profiles.values().filter(func(p : Types.Profile) : Bool {
      let nameMatch = p.displayName.toLower().contains(#text lower);
      let usernameMatch = switch (p.username) {
        case (?u) u.toLower().contains(#text lower);
        case null false;
      };
      nameMatch or usernameMatch;
    }).toArray();
  };

  public func setUsername(
    profiles : Map.Map<Common.UserId, Types.Profile>,
    usernames : Map.Map<Text, Common.UserId>,
    caller : Common.UserId,
    username : Text,
  ) : Common.Result {
    if (caller.isAnonymous()) return #err("Anonymous callers not allowed");
    // Validate username non-empty
    if (username.size() == 0) return #err("Username cannot be empty");
    let lower = username.toLower();
    // Check uniqueness
    switch (usernames.get(lower)) {
      case (?existing) {
        if (not Principal.equal(existing, caller)) return #err("Username already taken");
      };
      case null {};
    };
    switch (profiles.get(caller)) {
      case null #err("Profile not found");
      case (?existing) {
        // Remove old username mapping if any
        switch (existing.username) {
          case (?old) usernames.remove(old.toLower());
          case null {};
        };
        usernames.add(lower, caller);
        profiles.add(caller, {
          existing with
          username = ?lower;
          updatedAt = Time.now();
        });
        #ok;
      };
    };
  };

  public func getUsername(
    profiles : Map.Map<Common.UserId, Types.Profile>,
    caller : Common.UserId,
  ) : ?Text {
    switch (profiles.get(caller)) {
      case (?p) p.username;
      case null null;
    };
  };

  public func getInviteProfile(
    profiles : Map.Map<Common.UserId, Types.Profile>,
    usernames : Map.Map<Text, Common.UserId>,
    username : Text,
  ) : ?Types.Profile {
    let lower = username.toLower();
    switch (usernames.get(lower)) {
      case null null;
      case (?userId) profiles.get(userId);
    };
  };

  public func addContact(
    profiles : Map.Map<Common.UserId, Types.Profile>,
    usernames : Map.Map<Text, Common.UserId>,
    caller : Common.UserId,
    username : Text,
  ) : Common.Result {
    if (caller.isAnonymous()) return #err("Anonymous callers not allowed");
    let lower = username.toLower();
    switch (usernames.get(lower)) {
      case null #err("User not found");
      case (?targetId) {
        if (Principal.equal(targetId, caller)) return #err("Cannot add yourself as contact");
        switch (profiles.get(caller)) {
          case null #err("Profile not found");
          case (?profile) {
            // Dedup: check if already a contact
            for (c in profile.contacts.values()) {
              if (Principal.equal(c, targetId)) return #err("Already in contacts");
            };
            profiles.add(caller, {
              profile with
              contacts = profile.contacts.concat([targetId]);
              updatedAt = Time.now();
            });
            #ok;
          };
        };
      };
    };
  };

  public func getContacts(
    profiles : Map.Map<Common.UserId, Types.Profile>,
    caller : Common.UserId,
  ) : [Types.Profile] {
    switch (profiles.get(caller)) {
      case null [];
      case (?profile) {
        profile.contacts.filterMap<Common.UserId, Types.Profile>(
          func(uid) { profiles.get(uid) }
        );
      };
    };
  };

  public func removeContact(
    profiles : Map.Map<Common.UserId, Types.Profile>,
    caller : Common.UserId,
    targetId : Common.UserId,
  ) : Common.Result {
    if (caller.isAnonymous()) return #err("Anonymous callers not allowed");
    switch (profiles.get(caller)) {
      case null #err("Profile not found");
      case (?profile) {
        profiles.add(caller, {
          profile with
          contacts = profile.contacts.filter(func(c : Common.UserId) : Bool {
            not Principal.equal(c, targetId)
          });
          updatedAt = Time.now();
        });
        #ok;
      };
    };
  };
};
