import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotification } from "../../constants/sampleData";

function Notifications() {
  const handleFriendRequest = ({ id, accept }) => {
    console.log("id", id);
    console.log("accept", accept);
  };

  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} gap={"2rem"} maxWidth={"25rem"}>
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>
        {sampleNotification.length > 0 ? (
          <>
            {sampleNotification.map(({ sender, _id }) => (
              <NotificationList
                sender={sender}
                id={_id}
                key={_id}
                handler={handleFriendRequest}
              />
            ))}
          </>
        ) : (
          <Typography>0 Notification</Typography>
        )}
      </Stack>
    </Dialog>
  );
}

const NotificationList = memo(({ sender, id, handler }) => {
  const usernameStyle = {
    width: "100%",
    flexGrow: 1,
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  const { avatar, name } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography variant="body1" sx={usernameStyle}>
          {`${name} sent you a friend request`}
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }}>
          <Button onClick={() => handler({ id, accept: true })}>Accept</Button>
          <Button
            color={"error"}
            onClick={() => handler({ id, accept: false })}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
