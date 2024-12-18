import { Add as AddIcon } from "@mui/icons-material";
import {
  Avatar,
  colors,
  IconButton,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";

function UserItem({ user, handler, handleIsLoading }) {
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
    bgcolor: "primary.main",
    color: "white",
    "&:hover": {
      bgcolor: "primary.dark",
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
          <AddIcon />
        </IconButton>
      </Stack>
    </ListItem>
  );
}

export default memo(UserItem);
