import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/wallet";
import Common "../types/common";

module {
  public func ledgerIdForToken(token : Types.TokenType) : Principal {
    switch (token) {
      case (#ICP) Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");
      case (#ckBTC) Principal.fromText("mxzaz-hqaaa-aaaar-qaada-cai");
      case (#ckETH) Principal.fromText("ss2fx-dyaaa-aaaar-qacoq-cai");
      case (#ckUSDC) Principal.fromText("xevnm-gaaaa-aaaar-qafnq-cai");
      case (#ckUSDT) Principal.fromText("cngnf-vqaaa-waraa-qaaa-cai");
    };
  };

  public func recordTransaction(
    txHistory : Map.Map<Common.UserId, List.List<Types.Transaction>>,
    nextTxId : Nat,
    owner : Common.UserId,
    token : Types.TokenType,
    txType : Types.TxType,
    amount : Nat,
    status : Types.TxStatus,
    counterparty : Principal,
    memo : ?Text,
  ) : Common.TxId {
    let id = nextTxId;
    let tx : Types.Transaction = {
      id;
      token;
      txType;
      amount;
      timestamp = Time.now();
      status;
      counterparty;
      memo;
    };
    switch (txHistory.get(owner)) {
      case null {
        let list = List.empty<Types.Transaction>();
        list.add(tx);
        txHistory.add(owner, list);
      };
      case (?list) list.add(tx);
    };
    id;
  };

  public func getTransactionHistory(
    txHistory : Map.Map<Common.UserId, List.List<Types.Transaction>>,
    owner : Common.UserId,
  ) : [Types.Transaction] {
    switch (txHistory.get(owner)) {
      case null [];
      case (?list) list.reverse().toArray();
    };
  };
};
