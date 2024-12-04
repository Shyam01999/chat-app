import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { samplechats } from "../../constants/sampleData";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Title />
        <Header />
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
              height: "100%",
            }}
          >
            <ChatList chats={samplechats} chatIchatIdd={"1"}/>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            sx={{
              height: "100%",
            }}
          >
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              height: "100%",
              padding: "2rem",
              backgroundColor: "rgba(0,0,0,0.85)",
            }}
          >
            third
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
