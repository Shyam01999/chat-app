import React, { memo } from "react";
import Typography from "@mui/material/Typography";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { Box } from "@mui/material";
import { fileFormat } from "../../lib/fileFormat";
import { RenderAttachment } from "./RenderAttachment";

function MessageComponent({ message, user }) {
  const { sender, attachments, createdAt, content } = message;
  const sameSender = sender._id == user._id;

  const timeAgo = moment(createdAt).fromNow();
  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography variant="caption" fontWeight={600} color={lightBlue}>
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}
      {attachments &&
        attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const { public_id, url } = attachment;
          const fileurl = fileFormat(url);

          return (
            <Box key={index}>
              <a href={url} target="_blank" download style={{ color: "black" }}>
                {RenderAttachment(fileurl, url)}
              </a>
            </Box>
          );
        })}
      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </div>
  );
}

export default memo(MessageComponent);
