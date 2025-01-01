import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import {
  Avatar,
  colors,
  IconButton,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";

function UserItem({ user, handler, handleIsLoading, isAdded = false, styling={}}) {
  const usernameStyle = {
    width: "100%",
    flexGrow: 1,
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // whiteSpace: "nowrap",
  };

  const AddButtonStyle = {
    bgcolor: isAdded ? "error.main" : "primary.main",
    color: "white",
    "&:hover": {
      bgcolor: isAdded ? "error.dark" : "primary.dark",
    },
  };

  const { _id, name, avatar } = user;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar />
        <Typography variant="body1" sx={usernameStyle}>
          {name}
        </Typography>

        <IconButton
          size="small"
          onClick={() => handler(_id)}
          disabled={handleIsLoading}
          sx={AddButtonStyle}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
}

export default memo(UserItem);
