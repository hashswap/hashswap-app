import { FormNotification, OpenCloseState, SPoolType, PoolType } from "./types";

export const LayoutActionTypes = {
  TOGGLE_SHOW_WALLET: "TOGGLE_SHOW_WALLET",
  TOGGLE_SHOW_NETWORK_SWITCH: "TOGGLE_SHOW_NETWORK_SWITCH",
  SHOW_POOL_TYPE: "SHOW_POOL_TYPE",
  SHOW_SPOOL_TYPE: "SHOW_SPOOL_TYPE",
  SHOW_ADVANCED_SETTING: "SHOW_ADVANCED_SETTING",
  TOGGLE_SHOW_CREATE_POOL: "TOGGLE_SHOW_CREATE_POOL",
  HIDE_LIQUIDITY_EARN: "HIDE_LIQUIDITY_EARN",
  UPDATE_NOTIFICATION: "UPDATE_NOTIFICATION",
  TOGGLE_SHOW_TRANSACTIONS: "TOGGLE_SHOW_TRANSACTIONS",
  SHOW_TRANSFER_CONFIRMATION: "SHOW_TRANSFER_CONFIRMATION",
  TOGGLE_SHOW_MNEMONIC: "TOGGLE_SHOW_MNEMONIC",
  TOGGLE_SHOW_RESUME_TRANSFER: "TOGGLE_SHOW_RESUME_TRANSFER",
  TOGGLE_SHOW_BUY_NFT: "TOGGLE_SHOW_BUY_NFT",
  TOGGLE_SHOW_BID_NFT: "TOGGLE_SHOW_BID_NFT",
  TOGGLE_SHOW_CANCEL_SELL_NFT: "TOGGLE_SHOW_CANCEL_SELL_NFT",
  TOGGLE_EXPAND_NAV_DRAWER: "TOGGLE_EXPAND_NAV_DRAWER",

  ADD_BACKGROUND_LOADING: "ADD_BACKGROUND_LOADING",
  REMOVE_BACKGROUND_LOADING: "REMOVE_BACKGROUND_LOADING",
};

export function toggleShowWallet(override?: OpenCloseState) {
  return {
    type: LayoutActionTypes.TOGGLE_SHOW_WALLET,
    override,
  }
};
export function toggleShowCreatePool(override?: OpenCloseState) {
  return {
    type: LayoutActionTypes.TOGGLE_SHOW_CREATE_POOL,
    override,
  }
};
export function toggleShowTransactions(override?: OpenCloseState) {
  return {
    type: LayoutActionTypes.TOGGLE_SHOW_TRANSACTIONS,
    override,
  }
};
export function toggleShowNetworkSwitch(override?: OpenCloseState) {
  return {
    type: LayoutActionTypes.TOGGLE_SHOW_NETWORK_SWITCH,
    override,
  }
};
export function toggleShowMnemonic(override?: OpenCloseState) {
  return {
    type: LayoutActionTypes.TOGGLE_SHOW_MNEMONIC,
    override,
  }
};
export function toggleShowResumeTransfer(override?: OpenCloseState) {
  return {
    type: LayoutActionTypes.TOGGLE_SHOW_RESUME_TRANSFER,
    override,
  }
};
export function toggleShowBuyNftDialog(override?: OpenCloseState) {
  return {
    type: LayoutActionTypes.TOGGLE_SHOW_BUY_NFT,
    override,
  }
};
export function toggleShowBidNftDialog(override?: OpenCloseState) {
  return {
    type: LayoutActionTypes.TOGGLE_SHOW_BID_NFT,
    override,
  }
};
export function toggleShowCancelSellNftDialog(override?: OpenCloseState) {
  return {
    type: LayoutActionTypes.TOGGLE_SHOW_CANCEL_SELL_NFT,
    override,
  }
};
export function toggleExpandNavDrawer(override?: OpenCloseState) {
  return {
    type: LayoutActionTypes.TOGGLE_EXPAND_NAV_DRAWER,
    override,
  }
};
export function showPoolType(poolType?: PoolType) {
  return {
    type: LayoutActionTypes.SHOW_POOL_TYPE,
    poolType,
  }
};
export function showSPoolType(spoolType?: SPoolType) {
  return {
    type: LayoutActionTypes.SHOW_SPOOL_TYPE,
    spoolType,
  }
};
export function showAdvancedSetting(show: boolean = true) {
  return {
    type: LayoutActionTypes.SHOW_ADVANCED_SETTING,
    show,
  }
};
export function showTransferConfirmation(show: boolean = true) {
  return {
    type: LayoutActionTypes.SHOW_TRANSFER_CONFIRMATION,
    show,
  }
};
export function hideLiquidityEarn(hide: boolean = true) {
  return {
    type: LayoutActionTypes.HIDE_LIQUIDITY_EARN,
    hide,
  }
};

export function updateNotification(notification?: FormNotification) {
  return {
    type: LayoutActionTypes.UPDATE_NOTIFICATION,
    notification,
  }
};

export function addBackgroundLoading(name: string, uuid: string) {
  return {
    type: LayoutActionTypes.ADD_BACKGROUND_LOADING,
    name, uuid,
  };
};
export function removeBackgroundLoading(uuid: string) {
  return {
    type: LayoutActionTypes.REMOVE_BACKGROUND_LOADING,
    uuid,
  };
};
