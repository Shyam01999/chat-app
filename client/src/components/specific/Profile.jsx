import React from "react";
import Typography from "@mui/material/Typography";
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import { Avatar, Stack } from "@mui/material";
import moment from "moment";

function Profile() {
  const AvatarStyle = {
    width: 200,
    height: 200,
    objectFit: "contain",
    marginBottom: "1rem",
    border: "4px solid white",
  };

  return (
    <>
      <Stack direction={"column"} alignItems={"center"} gap={"2rem"}>
        <Avatar sx={AvatarStyle} />
        <ProfileCard
          heading={"Bio"}
          text={"Shyam Sunadar Bio"}
        />
        <ProfileCard
          heading={"Username"}
          text={"Shyam Sunadar"}
          Icon={<UsernameIcon />}
        />
        <ProfileCard
          heading={"Name"}
          text={"Shyam Sundar Sahoo"}
          Icon={<FaceIcon />}
        />
        <ProfileCard
          heading={"Joined"}
          text={moment("2024-06-11T18:30:00.000Z").fromNow()}
          Icon={<CalendarIcon />}
        />
      </Stack>
    </>
  );
}

export default Profile;

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <>
      <Stack
        direction="row"
        alignItems={"center"}
        spacing="1rem"
        color="white"
        textAlign="center"
      >
        {Icon && Icon}
        <Stack>
         
          <Typography variant="body" >
            {text}
          </Typography>
          <Typography variant="caption" color="gray">{heading}</Typography>
        </Stack>
      </Stack>
    </>
  );
};
