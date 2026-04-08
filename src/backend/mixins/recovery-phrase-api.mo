import Map "mo:core/Map";
import RecoveryPhraseLib "../lib/recovery-phrase";
import Common "../types/common";

mixin (phrases : Map.Map<Common.UserId, Text>) {

  /// Generates a new 12-word recovery phrase for the caller and stores it.
  /// Replaces any previously stored phrase. Returns the phrase string.
  public shared ({ caller }) func generateRecoveryPhrase() : async ?Text {
    if (caller.isAnonymous()) return null;
    ?RecoveryPhraseLib.generate(phrases, caller);
  };

  /// Returns the caller's stored recovery phrase, or null if none has been generated.
  public shared query ({ caller }) func getRecoveryPhrase() : async ?Text {
    if (caller.isAnonymous()) return null;
    RecoveryPhraseLib.get(phrases, caller);
  };
};
