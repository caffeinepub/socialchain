import List "mo:core/List";
import Map "mo:core/Map";
import WalletLib "../lib/wallet";
import WalletTypes "../types/wallet";
import Common "../types/common";

mixin (
  txHistory : Map.Map<Common.UserId, List.List<WalletTypes.Transaction>>,
) {
  var nextTxId : Nat = 0;

  // ICRC-1 ledger actor interface
  type Ledger = actor {
    icrc1_balance_of : shared query WalletTypes.Account -> async Nat;
    icrc1_transfer : shared WalletTypes.TransferArg -> async WalletTypes.TransferResult;
  };

  public shared ({ caller }) func getBalance(token : WalletTypes.TokenType) : async Nat {
    if (caller.isAnonymous()) return 0;
    let ledgerId = WalletLib.ledgerIdForToken(token);
    let ledger : Ledger = actor (ledgerId.toText());
    await ledger.icrc1_balance_of({ owner = caller; subaccount = null });
  };

  public shared ({ caller }) func sendToken(
    token : WalletTypes.TokenType,
    to : Principal,
    amount : Nat,
    memo : ?Text,
  ) : async Common.Result {
    if (caller.isAnonymous()) return #err("Authentication required");
    let ledgerId = WalletLib.ledgerIdForToken(token);
    let ledger : Ledger = actor (ledgerId.toText());

    let memoBlobOpt : ?Blob = switch (memo) {
      case null null;
      case (?m) ?m.encodeUtf8();
    };

    let transferArg : WalletTypes.TransferArg = {
      from_subaccount = null;
      to = { owner = to; subaccount = null };
      amount;
      fee = null;
      memo = memoBlobOpt;
      created_at_time = null;
    };

    // Record as pending first
    let txId = WalletLib.recordTransaction(txHistory, nextTxId, caller, token, #send, amount, #pending, to, memo);
    nextTxId += 1;

    // Execute transfer
    let result = await ledger.icrc1_transfer(transferArg);
    switch (result) {
      case (#Ok(_blockIndex)) {
        switch (txHistory.get(caller)) {
          case null {};
          case (?list) {
            list.mapInPlace(func(tx : WalletTypes.Transaction) : WalletTypes.Transaction {
              if (tx.id == txId) { { tx with status = #completed } } else { tx };
            });
          };
        };
        #ok;
      };
      case (#Err(e)) {
        switch (txHistory.get(caller)) {
          case null {};
          case (?list) {
            list.mapInPlace(func(tx : WalletTypes.Transaction) : WalletTypes.Transaction {
              if (tx.id == txId) { { tx with status = #failed } } else { tx };
            });
          };
        };
        let errMsg = switch (e) {
          case (#InsufficientFunds { balance }) "Insufficient funds. Balance: " # balance.toText();
          case (#BadFee { expected_fee }) "Bad fee. Expected: " # expected_fee.toText();
          case (#TooOld) "Transaction too old";
          case (#CreatedInFuture _) "Transaction created in future";
          case (#TemporarilyUnavailable) "Ledger temporarily unavailable";
          case (#Duplicate { duplicate_of }) "Duplicate of block " # duplicate_of.toText();
          case (#GenericError { message }) message;
          case (#BadBurn { min_burn_amount }) "Bad burn. Min: " # min_burn_amount.toText();
        };
        #err(errMsg);
      };
    };
  };

  public shared ({ caller }) func getTransactionHistory() : async [WalletTypes.Transaction] {
    if (caller.isAnonymous()) return [];
    WalletLib.getTransactionHistory(txHistory, caller);
  };
};
