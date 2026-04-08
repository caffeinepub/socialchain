import List "mo:core/List";
import Map "mo:core/Map";
import ProfileMixin "mixins/profile-api";
import FeedMixin "mixins/feed-api";
import WalletMixin "mixins/wallet-api";
import ProfileTypes "types/profile";
import FeedTypes "types/feed";
import WalletTypes "types/wallet";
import Common "types/common";



actor {
  // Profile state
  let profiles = Map.empty<Common.UserId, ProfileTypes.Profile>();
  let usernames = Map.empty<Text, Common.UserId>();

  // Feed state
  let posts = List.empty<FeedTypes.PostInternal>();
  let comments = List.empty<FeedTypes.Comment>();

  // Wallet state
  let txHistory = Map.empty<Common.UserId, List.List<WalletTypes.Transaction>>();

  // Include domain mixins
  include ProfileMixin(profiles, usernames);
  include FeedMixin(posts, comments);
  include WalletMixin(txHistory);
};
