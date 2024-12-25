import React, { useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Stack, IconButton, TextField } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { grayColor, orange } from "../constants/color";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "./FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

function Chat() {
  const messageContainerRef = useRef(null);
  const [message, setMessage] = useState("");

  const user = {
    _id: "user._id",
    name: "Shyam Sundar Sahoo",
  };
  return (
    <>
      <Stack
        ref={messageContainerRef}
        height="90%"
        width="100%"
        boxSizing={"border-box"}
        padding="1rem"
        spacing="1rem"
        bgcolor={grayColor}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* message container */}
        {sampleMessage.map((i, index) => {
          return <MessageComponent key={index} message={i} user={user} />;
        })}
      </Stack>
      <form style={{ height: "10%" }}>
        <Stack
          direction={"row"}
          height="100%"
          padding="1rem"
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1rem",
              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type a message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              position: "relative",
              rotate: "-30deg",
              "&:hover": {
                background: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
}

export default AppLayout()(Chat);
