import React, { useMemo } from "react";
import { Box, Button, Card, CardContent, CardProps, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add, ViewHeadline } from "@material-ui/icons";
import cls from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CurrencyLogo, InfluencerInfo, HelpInfo, KeyValueDisplay, Text } from "app/components";
// import { CurrencyLogo, HelpInfo, KeyValueDisplay, Text } from "app/components";
import { actions } from "app/store";
import { EMPTY_USD_VALUE } from "app/store/token/reducer";
import { PoolSwapVolumeMap, RewardsState, RootState, TokenInfo, TokenState } from "app/store/types";
import { AppTheme } from "app/theme/types";
import { hexToRGBA, toHumanNumber, useNetwork, useValueCalculators } from "app/utils";
// import { BIG_ZERO, ZIL_ADDRESS } from "app/utils/constants";
import { BIG_ZERO, HUSD_ADDRESS } from "app/utils/constants";


interface Props extends CardProps {
  token: TokenInfo;
}

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    borderRadius: 12,
    boxShadow: theme.palette.mainBoxShadow,
    // boxShadow: theme.palette.cardBoxShadow,
    // border: theme.palette.type === "dark" ? "1px solid #29475A" : "1px solid #D2E5DF",
    // backgroundColor: "transparent",
    backgroundColor: "#ffffff",
    "& .MuiCardContent-root:last-child": {
      paddingBottom: 0
    }
  },
  title: {
    padding: theme.spacing(0, 4),
    paddingTop: theme.spacing(2)
  },
  influencerName: {
    padding: theme.spacing(1,0,0),
    letterSpacing: "1px",
    fontSize: 20,
    color: "#586e90",
    fontFamily: "HSans",
  },
  poolIcon: {
    marginRight: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(0, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 2),
    },
  },
  rewardValue: {
    fontSize: 22,
    lineHeight: "24px",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: '14px',
      lineHeight: '16px',
    },
    color: theme.palette.text?.primary,
  },
  rewardContainer: {
    [theme.breakpoints.down("sm")]: {
      alignItems: "center"
    },
  },
  roiContainer: {
    alignItems: "baseline",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-end",
    },
  },
  thinSubtitle: {
    fontWeight: 400,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  dropdown: {
    "& .MuiMenu-list": {
      padding: theme.spacing(.5),
    },
  },
  dropdownItem: {
    borderRadius: theme.spacing(.5),
    minWidth: theme.spacing(15),
  },
  statContainer: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  statItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: theme.spacing(1),
      "& $rewardContainer": {
        alignItems: "flex-start",
      },
    },
  },
  titleColoured: {
    color: theme.palette.type === "dark" ? "#00FFB0" : `rgba${hexToRGBA("#003340", 0.5)}`
  },
  addIcon: {
    color: theme.palette.text?.secondary,
    height: "16px",
    width: "16px",
    marginRight: theme.spacing(0.2)
  },
  viewIcon: {
    color: theme.palette.type === "dark" ? "#00FFB0" : `rgba${hexToRGBA("#003340", 0.5)}`,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: "-12px",
    marginTop: "-12px"
  },
  bigbox: {
    border: "1px solid rgb(0 0 0 / 45%)",
    fontSize: "18px",
    // boxShadow: "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
    backgroundColor: "#ffffff",
  },
  box: {
    backgroundColor: theme.palette?.currencyInput,
    // border: `3px solid rgba${hexToRGBA("#00FFB0", 0.2)}`,
    margin: "2px",
  },
  token: {
    fontSize: 22,
    lineHeight: "24px",
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
    marginLeft: theme.spacing(0.5)
  },
  poolSize: {
    fontSize: 22,
    lineHeight: "24px",
    fontWeight: "bold",
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
    },
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1)
  },
  rewardTokenLogo: {
    marginLeft: theme.spacing(.5),
    height: 26,
    width: 26,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: theme.spacing(1.8),
      marginLeft: 0
    },
  },
  dividerBox: {
    margin: theme.spacing(3, 0),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1)
    },
  },
  divider: {
    borderBottom: theme.palette.type === "dark" ? "1px solid transparent" : `1px solid rgba${hexToRGBA("#003340", 0.5)}`,
    borderImage: theme.palette.type === "dark"
                  ? "linear-gradient(to left, #003340 1%, #00FFB0  50%, #003340 100%) 0 0 100% 0/0 0 1px 0 stretch"
                  : "",
  },
  label: {
    color: theme.palette.label
  },
  textColoured: {
    color: theme.palette.primary.dark
  },
  liquidityVolumeContainer: {
    padding: theme.spacing(0, 3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0, 1),
    },
  },
  logo: {
    //height: 27,
    //width: 27,
    //marginRight: 3,
    [theme.breakpoints.down("xs")]: {
      height: 23,
      width: 23
    },
  }
}));

const PoolInfoCard: React.FC<Props> = (props: Props) => {
  const { children, className, token, ...rest } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const valueCalculators = useValueCalculators();
  const tokenState = useSelector<RootState, TokenState>(state => state.token);
  const rewardsState = useSelector<RootState, RewardsState>(state => state.rewards);
  const swapVolumes = useSelector<RootState, PoolSwapVolumeMap>(state => state.stats.dailySwapVolumes)
  const network = useNetwork();
  const classes = useStyles();

  const onGotoAddLiquidity = () => {
    dispatch(actions.Pool.select({ network, token }));
    dispatch(actions.Layout.showPoolType("add"));
    history.push("/pool");
  }
  const { totalZilVolumeUSD, usdValues } = useMemo(() => {
    if (token.isZil) {
      return { totalLiquidity: BIG_ZERO, usdValues: EMPTY_USD_VALUE };
    }

    const usdValues = tokenState.values[token.address] ?? EMPTY_USD_VALUE;
    const totalZilVolume = swapVolumes[token.address]?.totalZilVolume ?? BIG_ZERO;
    const totalZilVolumeUSD = valueCalculators.amount(tokenState.prices, tokenState.tokens[HUSD_ADDRESS], totalZilVolume);

    return {
      totalZilVolumeUSD,
      usdValues,
    };
  }, [tokenState, token, valueCalculators, swapVolumes]);

/*
  const {
    poolRewards,
    roi,
    apr,
  } = React.useMemo(() => {
    const poolRewards = rewardsState.rewardsByPool[token.address] || [];

    // calculate total roi and apr
    const roiPerSecond = usdValues.rewardsPerSecond.dividedBy(usdValues.poolLiquidity);
    const secondsPerDay = 24 * 3600
    const roiPerDay = roiPerSecond.times(secondsPerDay).shiftedBy(2).decimalPlaces(2);
    const apr = roiPerSecond.times(secondsPerDay * 365).shiftedBy(2).decimalPlaces(1);

    return {
      poolRewards,
      roi: roiPerDay.isZero() || roiPerDay.isNaN() ? "-" : `${roiPerDay.toFormat()}%`,
      apr: apr.isZero() || apr.isNaN() ? '-' : `${toHumanNumber(apr, 1)}%`,
    };
  }, [rewardsState.rewardsByPool, token, usdValues]);

*/

  if (token.isZil) return null;

  const decimals = token.address === HUSD_ADDRESS ? 12 : (token.decimals ?? 0);

  const poolShare = token.pool?.contributionPercentage.shiftedBy(-2) ?? BIG_ZERO;
  const poolShareLabel = poolShare.shiftedBy(2).decimalPlaces(3).toString(10) ?? "";
  const tokenAmount = toHumanNumber(poolShare.times(token.pool?.tokenReserve ?? BIG_ZERO).shiftedBy(-decimals));
  const zilAmount = toHumanNumber(poolShare.times(token.pool?.zilReserve ?? BIG_ZERO).shiftedBy(-12));
  const depositedValue = poolShare.times(usdValues?.poolLiquidity ?? BIG_ZERO);

  const potentialRewards = rewardsState.potentialRewardsByPool[token.address] || [];

  return (
    <Card {...rest} className={cls(classes.root, className)}>
      <CardContent className={classes.title}>
        <Box display="flex" alignItems="center">
          {/* <PoolLogo className={classes.poolIcon} pair={[token.symbol, "ZIL"]} tokenAddress={token.address} /> */}
          <Text variant="h6">{token.symbol} <span className={classes.titleColoured}>-</span> HUSD <span className={classes.titleColoured}>POOL</span></Text>
          <Box flex={1} />
          <Button onClick={onGotoAddLiquidity}>
            <Add className={classes.addIcon} />
            <Text color="textSecondary" variant="body1">Add Liquidity</Text>
          </Button>
        </Box>
        <InfluencerInfo className={classes.logo} currency={token.symbol} address={token.address} />
        <Text className={classes.influencerName}>{token.name}</Text>

      </CardContent>

      <CardContent className={classes.content}>
        <Box  className={classes.bigbox} mt={1.5} mb={2} display="flex" bgcolor="background.contrast" padding={0.5} borderRadius={12} position="relative">
          <Box className={classes.box} display="flex" flexDirection="column" alignItems="start" flex={1} borderRadius={12}>
              <Box py={"4px"} px={"16px"}>
                <Box display="flex" alignItems="flex-end" mt={1} mb={1}>
                  <CurrencyLogo className={classes.logo} currency={token.symbol} address={token.address} />
                  <Text className={classes.token}>{token.symbol}</Text>
                </Box>
                <Text className={classes.poolSize}>{toHumanNumber(token.pool?.tokenReserve.shiftedBy(-decimals), 2)}</Text>
            </Box>
          </Box>
          <ViewHeadline className={classes.viewIcon}/>
          <Box className={classes.box} display="flex" flexDirection="column" flex={1} borderRadius={12}>
            <Box py={"4px"} px={"16px"}>
                <Box mt={1} mb={1} display="flex" justifyContent="space-between">
                  <Box display="flex" alignItems="flex-end">
                    <CurrencyLogo className={classes.logo} currency="HUSD" address={HUSD_ADDRESS} />
                    <Text className={classes.token}>HUSD</Text>
                  </Box>
                  <HelpInfo placement="top" title={`This shows the current ${token.symbol}-HUSD pool size.`}/>
                </Box>
                <Text className={classes.poolSize}>{toHumanNumber(token.pool?.zilReserve.shiftedBy(-12), 2)}</Text>
            </Box>
          </Box>
        </Box>

    {/*

        <Box display="flex" className={classes.statContainer} px={1}>
          <Box display="flex" className={classes.statItem}>
            <Text variant="subtitle2" marginBottom={1.5}>Reward to be Distributed</Text>
            {
              poolRewards.length > 0 ?
                Object.entries(groupBy(poolRewards, (reward) => reward.rewardToken.address)).map(([address, rewards]) => {
                  return (
                    <Box display="flex" className={classes.rewardContainer} alignItems="flex-end" flexWrap="wrap" key={address}>
                      <Text variant="h1" color="textPrimary" className={classes.rewardValue}>
                        {rewards.reduce((acc, reward) => acc.plus(reward.amountPerEpoch), BIG_ZERO).shiftedBy(-rewards[0].rewardToken.decimals).toFormat(2)}
                      </Text>
                      <CurrencyLogo className={classes.rewardTokenLogo} currency={rewards[0].rewardToken.symbol} address={address} />
                    </Box>
                  )
                })
              :
              <Text color="textPrimary" className={classes.rewardValue}>
                -
              </Text>
            }
          </Box>

          <Box display="flex" className={classes.statItem}>
            <Text align="right" variant="subtitle2" marginBottom={1.5}>Daily ROI</Text>
            <Box display="flex" className={classes.roiContainer}>
              <Text color="textPrimary" className={classes.rewardValue}>
                {roi}
              </Text>
            </Box>
          </Box>

          <Box display="flex" className={classes.statItem}>
            <Text align="right" variant="subtitle2" marginBottom={1.5}>APR</Text>
            <Box display="flex" className={classes.roiContainer}>
              <Text color="textPrimary" className={classes.rewardValue}>
                {apr}
              </Text>
            </Box>
          </Box>
        </Box>

       */} 

    <Box className={classes.dividerBox}>
          <Divider className={classes.divider}/>
        </Box>

        <Box marginBottom={1} display="flex" flexDirection="column" className={classes.liquidityVolumeContainer}>
          <KeyValueDisplay marginBottom={1.5} kkey="Total Liquidity" ValueComponent="span">
            <Text className={classes.label}>${usdValues?.poolLiquidity.dp(0).toFormat()}</Text>
          </KeyValueDisplay>
          <KeyValueDisplay marginBottom={1.5} kkey="24-Hour Volume" ValueComponent="span">
            <Text align="right" className={classes.label}>
              <span className={classes.textColoured}>{(swapVolumes[token.address]?.totalZilVolume || BIG_ZERO).shiftedBy(-12).dp(0).toFormat()}</span> HUSD
              (${totalZilVolumeUSD?.dp(0).toFormat()})
            </Text>
          </KeyValueDisplay>
          {
            !poolShare.isZero() &&
              <KeyValueDisplay marginBottom={1.5} kkey={`Your Pool Share (${poolShareLabel}%)`} ValueComponent="span">
                <Text align="right" className={classes.label}>
                  <span className={classes.textColoured}>{tokenAmount}</span> {token.symbol} + <span className={classes.textColoured}>{zilAmount}</span> HUSD
                  (${toHumanNumber(depositedValue, 2)})
                </Text>
            </KeyValueDisplay>
          }
          {
            potentialRewards.flatMap(reward => {
              const rewardToken = tokenState.tokens[reward.tokenAddress]
              if (!rewardToken) return []
              return [
                <KeyValueDisplay key={token.address} marginBottom={1.5} kkey="Your Estimated Rewards" ValueComponent="span">
                  <Text align="right" className={classes.label}>
                    <span className={classes.textColoured}>{reward.amount.shiftedBy(-rewardToken.decimals).dp(5).toFormat()}</span> {rewardToken.symbol}
                  </Text>
                </KeyValueDisplay>
              ]
            })
          }
        </Box>
      </CardContent>
    </Card>
  );
};

export default PoolInfoCard;
