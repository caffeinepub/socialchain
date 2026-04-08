import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat8 "mo:core/Nat8";
import Common "../types/common";

module {

  // 200-word wordlist for phrase generation
  let WORDS : [Text] = [
    "apple", "brave", "cloud", "dance", "eagle", "flame", "grace", "honey",
    "ivory", "jewel", "karma", "lemon", "magic", "noble", "ocean", "pearl",
    "quest", "river", "solar", "tiger", "ultra", "vivid", "water", "xenon",
    "yield", "zebra", "amber", "blaze", "crisp", "drift", "ember", "frost",
    "gleam", "haven", "indie", "jolly", "knack", "lunar", "maple", "nexus",
    "oasis", "prism", "quill", "raven", "storm", "tempo", "unity", "valor",
    "winds", "xylem", "yacht", "zonal", "acorn", "brook", "cedar", "delta",
    "epoch", "fable", "globe", "heron", "inlet", "joust", "ketch", "lapis",
    "manor", "night", "orbit", "plaza", "quark", "ridge", "scout", "titan",
    "umbra", "venom", "wheat", "pixel", "young", "zones", "arena", "bloom",
    "comet", "dunes", "elbow", "forte", "glyph", "hyper", "igloo", "jazzy",
    "kinky", "laser", "mirth", "north", "onyx", "pilot", "quirk", "relay",
    "swift", "trove", "ulcer", "voila", "waltz", "xeric", "yearn", "zesty",
    "adorn", "bliss", "crimp", "disco", "ethic", "flint", "gusto", "husky",
    "irony", "jumbo", "kayak", "lusty", "micro", "nerve", "optic", "phase",
    "queen", "radar", "stone", "trill", "untie", "vague", "witch", "xylol",
    "yodel", "zippy", "agile", "crypt", "downy", "exert", "funky", "gnome",
    "hammy", "imply", "jiffy", "kneel", "lofty", "mocha", "nudge", "ounce",
    "piano", "query", "rhyme", "snowy", "tabby", "usurp", "wrath", "yarns",
    "azure", "brine", "chalk", "depot", "exile", "ferry", "grill", "hedge",
    "index", "joker", "knave", "lyric", "mango", "ninja", "oxide", "quota",
    "rogue", "sinew", "truce", "upset", "vicar", "whirl", "yokel", "zilch",
    "abode", "brisk", "climb", "dowel", "erupt", "fjord", "graze", "hoist",
    "input", "jelly", "leapt", "merge", "nymph", "outdo", "plumb", "quaff",
    "roost", "smelt", "tryst", "unwed", "vying", "woken", "xylan", "yawns"
  ];

  let WORD_COUNT : Nat = 200;
  let PHRASE_LENGTH : Nat = 12;

  // Simple deterministic hash mixing principal bytes, position, and time salt
  func hashMix(bytes : [Nat8], position : Nat, salt : Nat) : Nat {
    var h : Nat = (salt + position * 31 + 7) % 4294967296;
    for (b in bytes.vals()) {
      let bv = b.toNat();
      // LCG-style mixing, keeping h bounded
      h := (h * 1664525 + bv * 22695477 + position + 1) % 4294967296;
    };
    h;
  };

  public func generate(
    phrases : Map.Map<Common.UserId, Text>,
    caller : Principal
  ) : Text {
    let bytes : [Nat8] = caller.toBlob().toArray();
    let timeAbs : Nat = Int.abs(Time.now());
    let salt : Nat = timeAbs % 9999991 + 1;
    let wordArray = Array.tabulate(
      PHRASE_LENGTH,
      func(i : Nat) : Text {
        let idx = hashMix(bytes, i, salt + i * 13) % WORD_COUNT;
        WORDS[idx]
      }
    );
    let phrase = wordArray.vals().join(" ");
    phrases.add(caller, phrase);
    phrase;
  };

  public func get(
    phrases : Map.Map<Common.UserId, Text>,
    caller : Principal
  ) : ?Text {
    phrases.get(caller);
  };
};
