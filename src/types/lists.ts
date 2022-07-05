export enum Denoms {
  ETH = "eth",
  ethUSDC = "ethUSDC",
  ethUSDT = "ethUSDT",
  BNB = "bnb",
  BUSD = "busd",
  axlUSDC = "ibc/B3504E092456BA618CC28AC671A71FB08C6CA0FD0BE7C8A5B5A3E2DD933CC9E4",
  LUNA = "uluna",
}

export enum TxStep {
  /*Before Wallet Signing*/
  Idle,
  /*Before Wallet Signing*/
  /*Waiting for Wallet Signature*/
  Waiting,
  /*Waiting for Wallet Signature*/
  /*Tx Hash created: Waiting for Info Query*/
  Success,
  /*Tx Broadcasted Successfully*/
  /*Tx Broadcasted Successfully - ETH*/
  Failed,
  /*Tx Failed*/
  KYC,
  KYCSuccess,
  KYCFailed,
}
