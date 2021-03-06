import { Dayjs } from "dayjs";
import { WalletProvider } from "zilswap-sdk";
import { Network } from "zilswap-sdk/lib/constants";

export type ConnectOptionType = "zilpay" | "boltX" | "privateKey" | "zeeves";

export enum WalletConnectType {
  Moonlet, PrivateKey, ZilPay, Zeeves, BoltX
};

export type WalletAccountInfo = {
  byte20: string;
  bech32: string;
  privateKey?: string;
};

export type ConnectedWallet = {
  provider?: WalletProvider;
  type: WalletConnectType;
  network: Network;

  timestamp: Dayjs;
  addressInfo: WalletAccountInfo;
};

export type ConnectWalletResult = {
  wallet?: ConnectedWallet;
  error?: any;
};
