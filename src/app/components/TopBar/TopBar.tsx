import React from "react";
import { AppBar, Box, Button, Hidden, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cls from "classnames";
import { Link } from "react-router-dom";
import { Brand } from "app/components/TopBar/components";
import RewardsInfoButton from "app/layouts/RewardsInfoButton";
import ConnectWalletButton from "../ConnectWalletButton";
//import { ReactComponent as MenuIcon } from "./menu.svg";
import { TopBarProps } from "./types";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "100%",
    position: "fixed",
  },
  toolBar: {
    padding: 0,
    borderBottom: "1px solid transparent",
    borderImage: theme.palette.type === "dark" 
                  ? "linear-gradient(to left, #ffffff 1%, #00FFB0  50%, #ffffff 100%) 0 0 100% 0/0 0 1px 0 stretch"
                  : "",
    [theme.breakpoints.up("sm")]: {
      "&>div": {
        flex: 1,
        flexBasis: 1,
        display: "flex",
        flexDirection: "row",
      },
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight: 0,
    },
  },
  themeSwitch: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
  chipText: {
    color: theme.palette.text.primary
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    justifyContent: 'flex-start',
  },
  brandButton: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  }
}));

const TopBar: React.FC<TopBarProps & React.HTMLAttributes<HTMLDivElement>> = (props: any) => {
  const { children, className, onToggleDrawer, ...rest } = props;
  const classes = useStyles();

  return (
    <AppBar {...rest} elevation={0} position="static" className={cls(classes.root, className)}>
      <Toolbar className={classes.toolBar} variant="dense">
    {/* <Box justifyContent="flex-start" flex={1}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={onToggleDrawer}>
              <MenuIcon />
            </IconButton>
          </div>
        </Box> */}
        <Box justifyContent="center">
          <Button component={Link} to="/" className={classes.brandButton} disableRipple>
            <Brand />
          </Button>
        </Box>
        <Box justifyContent="center">
          <Button component={Link} to="/swap" className={classes.brandButton} disableRipple>
    		Buy
          </Button>
          <Button component={Link} to="/sponsor" className={classes.brandButton} disableRipple>
    		Sponsor
          </Button>
          <Button component={Link} to="/pool" className={classes.brandButton} disableRipple>
    		Stake
          </Button>
        </Box>
        <Box display="flex" flex={1} justifyContent="flex-end" alignItems="center">
          <RewardsInfoButton />
          <Hidden xsDown>
            <ConnectWalletButton />
          </Hidden>
        </Box>
      </Toolbar>
    </AppBar >
  );
};

export default TopBar;
