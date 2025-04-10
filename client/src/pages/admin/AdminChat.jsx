import AdminLayout from "./AdminLayout";
import React, { useEffect, useState } from "react";
import Table from "../../components/shared/Table";
import { dashboardData } from "../../constants/sampleData";
import { transformImage } from "../../lib/features";
import { Avatar, Stack } from "@mui/material";
import AvatarCard from "../../components/shared/AvatarCard";

const columns = [
  {
    field: "id",
    headerName: "Id",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => {
      <AvatarCard src={params.row.avatar} />;
    },
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "totalmembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    render: (params) => <AvatarCard max={100} avatar={params.row.members} />,
  },
  {
    field: "groupChat",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => {
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>;
    },
  },
];

function AdminChat() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.chats.map((item) => ({
        ...item,
        id: item._id,
        avatar: item.avatar.map((i)=> transformImage(i, 50)),
        members:item.members.map((i) => transformImage(i.avatar, 50)),
        creator:{
          name:item.creator.name,
          avatar:transformImage(item.creator.avatar, 50)
        }
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table
        rows={rows}
        columns={columns}
        // rowHeight={}
        heading={"All Chats"}
      />
    </AdminLayout>
  );
}

export default AdminChat;
