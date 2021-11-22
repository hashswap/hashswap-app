import React, { useEffect, useState } from "react";
import { Box, BoxProps, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cls from "classnames";
import { useSelector } from "react-redux";
import { Blockchain } from "tradehub-api-js";
// import { Text } from "app/components";
import { RootState, TokenInfo, TokenState } from "app/store/types";
import { AppTheme } from "app/theme/types";
import { BIG_ZERO, HUSD_ADDRESS, HASH_ADDRESS } from "app/utils/constants";
import PoolInfoCard from "../PoolInfoCard";
import PoolsSearchInput from "../PoolsSearchInput";

interface Props extends BoxProps {
  query?: string
}

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    background: theme.palette.type === "dark" ? "linear-gradient(#13222C, #002A34)" : "#5a6f90",
    // border: theme.palette.border,
    padding: theme.spacing(0, 6),
    borderRadius: 12,
    // boxShadow: theme.palette.cardBoxShadow,
    "& .MuiOutlinedInput-input": {
      padding: theme.spacing(2, 2),
      fontSize: "20px"
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: theme.palette.background.contrast,
      border: "transparent"
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(4, 2),
    },
  },
  header: {
    padding: 0,
    width: "100%",
    lineHeight: "initial",
    fontSize: "2em",
    color: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    },
  },
  search: {
    width: "50%",
  }
}));

interface ListingLimits {
  registered: number;
  others: number;
};

const initialLimits = {
  registered: 6,
  others: 6,
};

const PoolsListing: React.FC<Props> = (props: Props) => {
  const { children, className, ...rest } = props;
  const [limits, setLimits] = useState<ListingLimits>(initialLimits);
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const tokenState = useSelector<RootState, TokenState>(state => state.token);
  const classes = useStyles();

  useEffect(() => {
    setLimits(initialLimits);
  }, [searchQuery]);

  const onSearch = (query?: string) => {
    setSearchQuery(query);
  };

  const {
//    registeredTokens,
    otherTokens,
  } = React.useMemo(() => {
    const queryRegexp = !!searchQuery ? new RegExp(searchQuery, "i") : undefined;
    const result = Object.values(tokenState.tokens)
      .sort((lhs, rhs) => {
        const lhsValues = tokenState.values[lhs.address];
        const rhsValues = tokenState.values[rhs.address];

        const lhsTVL = lhsValues?.poolLiquidity ?? BIG_ZERO;
        const rhsTVL = rhsValues?.poolLiquidity ?? BIG_ZERO;

        const core = ['ZWAP', 'gZIL', 'XSGD']
        if (core.includes(lhs.symbol) || core.includes(rhs.symbol))
          return rhsTVL.comparedTo(lhsTVL);

        const lhsRewardValue = lhsValues ? lhsValues.rewardsPerSecond.dividedBy(lhsValues.poolLiquidity) : BIG_ZERO;
        const rhsRewardValue = rhsValues ? rhsValues.rewardsPerSecond.dividedBy(rhsValues.poolLiquidity) : BIG_ZERO;

        if (!lhsRewardValue.eq(rhsRewardValue))
          return rhsRewardValue.comparedTo(lhsRewardValue);

        return rhsTVL.comparedTo(lhsTVL);
      })
      .reduce((accum, token) => {
        // TODO: proper token blacklist
        if (token.address === "zil13c62revrh5h3rd6u0mlt9zckyvppsknt55qr3u") return accum;

        if (queryRegexp) {
          const fullText = `${token.symbol}${token.name || ""}${token.address}`.toLowerCase();

          if (!fullText.match(queryRegexp))
            return accum;
        }

        if (token.isZil) {
          return accum;
        }

        if (token.blockchain !== Blockchain.Zilliqa) return accum;

        if (token.registered) {
          accum.registeredTokens.push(token);
        } else {
          accum.otherTokens.push(token);
        }

        return accum;
      }, {
        registeredTokens: [] as TokenInfo[],
        otherTokens: [] as TokenInfo[],
      });

    return result;
  }, [tokenState.tokens, tokenState.values, searchQuery]);

  const onLoadMore = (key: keyof ListingLimits) => {
    return () => {
      setLimits({
        ...limits,
        [key]: limits[key] + 10,
      });
    };
  };

  return (
    <Box {...rest} className={cls(classes.root, className)} mt={0} mb={2}>
      <Box display="flex" justifyContent="space-between" mb={2} className={classes.header}>
    INFLUENCERS ({otherTokens.length})
    {/* <Text variant="h2" margin={2}>Influencers ({registeredTokens.length})</Text> */}
        <PoolsSearchInput className={classes.search} onSearch={onSearch}/>
      </Box>
      <Grid container spacing={1}>
        {otherTokens.slice(0, limits.others).map((token) => (
	  (token.isZil || token.address === HUSD_ADDRESS || token.address === HASH_ADDRESS) ?
	  null :
          <Grid key={token.address} item xs={12} md={12}>
            <PoolInfoCard token={token} />
          </Grid>
	  ))}
      </Grid>
      <Box display="flex" justifyContent="center" marginY={4} marginX={1}>
        <Button
          disabled={otherTokens.length <= limits.others}
          variant="contained"
          color="primary"
          onClick={onLoadMore("others")}>
          Load more
        </Button>
      </Box>
    {/*
      <Grid container spacing={2}>
        {registeredTokens.slice(0, limits.registered).map((token) => (
          <Grid key={token.address} item xs={12} md={6}>
            <PoolInfoCard token={token} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" marginY={4} marginX={1}>
        <Button
          disabled={registeredTokens.length <= limits.registered}
          variant="contained"
          color="primary"
          onClick={onLoadMore("registered")}>
          Load more
        </Button>
      </Box>
      <Text variant="h2" margin={2}>Unregistered Pools ({otherTokens.length})</Text>
      <Grid container spacing={2}>
        {otherTokens.slice(0, limits.others).map((token) => (
          <Grid key={token.address} item xs={12} md={6}>
            <PoolInfoCard token={token} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" marginY={4} marginX={1}>
        <Button
          disabled={otherTokens.length <= limits.others}
          variant="contained"
          color="primary"
          onClick={onLoadMore("others")}>
          Load more
        </Button>
      </Box>
    */}
    </Box>
  );
};

export default PoolsListing;
