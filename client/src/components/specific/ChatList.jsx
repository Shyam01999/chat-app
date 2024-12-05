import React from "react";
import ChatItem from "../shared/ChatItem";
import { Stack } from "@mui/material";

function ChatList({
  w = "100%",
  chats = [],
  chatId,
  onlineusers = [],
  newMessagesAlert = [{ chatId: "", count: 0 }],
  handleDeleteChat,
}) {
  return (
    <>
      <Stack w={w}>
        {chats.map((data) => {
          const { avatar, _id, name, groupChat, members } = data;

          const newMessageAlert = newMessagesAlert.find(
            ({ chatId }) => chatId === _id
          );

          const isOnline = members?.some((member)=> onlineusers.includes(_id))
          return <ChatItem 
          newMessageAlert={newMessageAlert}
          isOnline={isOnline}
          avatar={avatar}
          name={name}
          _id={_id}
          key={_id}
          groupChat={groupChat}
          sameSender={chatId === _id}
          handleDeleteChat={handleDeleteChat} 
          />;
        })}
      </Stack>
    </>
  );
}

export default ChatList;
