import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/color";
import { orange } from "@mui/material/colors";

function Home() {
  return (
    <Box
      sx={{ backgroundColor: grayColor }}
      height={"100%"}
      p={2}
      textAlign={"center"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      gap={"2rem"}
    >
      <Typography variant="h3" color={orange}>
        Welcome to Chat App
      </Typography>
      <Typography variant="h5" color="initial">
        Select a Friend to Chat.
      </Typography>
    </Box>
  );
}

export default AppLayout()(Home);
