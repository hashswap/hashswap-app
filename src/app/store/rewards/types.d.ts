import BigNumber from "bignumber.js";
import { Distribution, Distributor, SwapVolume } from "core/utilities";
import { SimpleMap } from "app/utils";
import { TokenInfo } from "../token/types";

export interface PoolSwapVolume extends SwapVolume {
  totalZilVolume: BigNumber;
  totalTokenVolume: BigNumber;
}

export type PoolReward = {
  distributorName: string;
  rewardToken: TokenInfo;
  currentEpochStart: number;
  currentEpochEnd: number;
  amountPerEpoch: BigNumber;
  weightedLiquidity: BigNumber;
}

export type PoolRewards = ReadonlyArray<PoolReward>;

export interface DistributionWithStatus {
  info: Distribution;
  readyToClaim: boolean;
  claimed?: boolean;
  claimTx?: any;
}

export interface DistributorWithTimings extends Distributor {
  currentEpochStart: number;
  currentEpochEnd: number;
}

export interface PotentialRewards {
  [pool: string]: ReadonlyArray<{
    amount: BigNumber;
    tokenAddress: string;
  }>
}

export interface RewardsState {
  distributors: ReadonlyArray<DistributorWithTimings>;
  distributions: ReadonlyArray<DistributionWithStatus>;
  rewardsByPool: SimpleMap<PoolRewards>;
  potentialRewardsByPool: PotentialRewards;
  claimedDistributions: ReadonlyArray<string>;
};
