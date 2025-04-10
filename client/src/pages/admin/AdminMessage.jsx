import AdminLayout from "./AdminLayout";
import React, { useEffect, useState } from "react";
import Table from "../../components/shared/Table";
import { dashboardData } from "../../constants/sampleData";
import { transformImage } from "../../lib/features";
import { Avatar, Box, Stack } from "@mui/material";
import moment from "moment";
import { RenderAttachment } from "../../components/shared/RenderAttachment";
import { fileFormat } from "../../lib/fileFormat";

const columns = [
  {
    field: "id",
    headerName: "Id",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachements",
    headerName: "Attachements",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments?.length > 0 ? attachments.map((i)=>{
        const url = i.url;
        const file = fileFormat(url)
        return <Box>
          <a 
          href={url}
          download
          target="_blank"
          style={{
            color:"black",
          }}>
            {RenderAttachment(file, url)}
          </a>
        </Box>;
      }) : "No Attachements";
      
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "sender",
    headerName: "Send By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      <Stack direction={"row"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>;
    },
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];

function AdminMessage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.messages.map((item) => ({
        ...item,
        id: item._id,
        sender: {
          name: item.sender.name,
          avatar: transformImage(item.sender.avatar, 50),
        },
        createdAt: moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table
        rows={rows}
        columns={columns}
        rowHeight={200}
        heading={"All Messages"}
      />
    </AdminLayout>
  );
}

export default AdminMessage;
