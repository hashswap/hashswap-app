import React from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cls from "classnames";
import { hexToRGBA } from "app/utils";
import { ReactComponent as Discord } from "./social-icons/discord.svg";
import { ReactComponent as TwitterIcon } from "./social-icons/twitter.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: theme.spacing(2),
    "& a": {
      minWidth: 0,
      padding: theme.spacing(0.75),
      margin: theme.spacing(0, 0.5),
      "& svg": {
        width: 20,
        height: 20,
        margin: 1,
        "& path": {
          transition: "fill .2s ease-in-out",
          fill: `rgba${hexToRGBA(theme.palette.text.primary, 0.5)}`,
        },
      },
    },
  },
  compact: {
    display: "none",
  },
}));

export interface SocialLinkGroupProps
  extends React.HTMLAttributes<HTMLFormElement> {
  compact?: boolean;
}

const SocialLinkGroup: React.FC<SocialLinkGroupProps> = (
  props: SocialLinkGroupProps
) => {
  const { children, className, compact, ...rest } = props;
  const classes = useStyles();
  return (
    <Box {...rest} className={cls(classes.root, className)}>
      <Button href="https://twitter.com/ZilSwap">
        <TwitterIcon />
      </Button>
      <Button
        href="http://discord.gg/ESVqQ3qtvk"
        className={cls({ [classes.compact]: compact })}
      >
        <Discord />
      </Button>
    </Box>
  );
};

export default SocialLinkGroup;
