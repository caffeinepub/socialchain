import Common "common";

module {
  public type TokenType = {
    #ICP;
    #ckBTC;
    #ckETH;
    #ckUSDC;
    #ckUSDT;
  };

  public type TxType = { #send; #receive };
  public type TxStatus = { #pending; #completed; #failed };

  public type Transaction = {
    id : Common.TxId;
    token : TokenType;
    txType : TxType;
    amount : Nat;
    timestamp : Common.Timestamp;
    status : TxStatus;
    counterparty : Principal;
    memo : ?Text;
  };

  // ICRC-1 Ledger interface types
  public type Account = {
    owner : Principal;
    subaccount : ?Blob;
  };

  public type TransferArg = {
    from_subaccount : ?Blob;
    to : Account;
    amount : Nat;
    fee : ?Nat;
    memo : ?Blob;
    created_at_time : ?Nat64;
  };

  public type TransferError = {
    #BadFee : { expected_fee : Nat };
    #BadBurn : { min_burn_amount : Nat };
    #InsufficientFunds : { balance : Nat };
    #TooOld;
    #CreatedInFuture : { ledger_time : Nat64 };
    #TemporarilyUnavailable;
    #Duplicate : { duplicate_of : Nat };
    #GenericError : { error_code : Nat; message : Text };
  };

  public type TransferResult = { #Ok : Nat; #Err : TransferError };
};
