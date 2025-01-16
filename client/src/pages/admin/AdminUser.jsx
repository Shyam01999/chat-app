import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout'
import Table from '../../components/shared/Table'
import { dashboardData } from '../../constants/sampleData'
import { transformImage } from '../../lib/features'
import { Avatar } from '@mui/material'

const columns = [
  {
    field:"id",
    headerName:"Id",
    headerClassName:"table-header",
    width:200,
  },
  {
    field:"avatar",
    headerName:"Avatar",
    headerClassName:"table-header",
    width:150,
    renderCell:(params) => {
      <Avatar alt={params.row.name} src={params.row.avatar}/>
    }
  },
  {
    field:"name",
    headerName:"Name",
    headerClassName:"table-header",
    width:200,
  },
  {
    field:"username",
    headerName:"Username",
    headerClassName:"table-header",
    width:200,
  },
  {
    field:"friends",
    headerName:"Friends",
    headerClassName:"table-header",
    width:200,
  },
  {
    field:"groups",
    headerName:"Groups",
    headerClassName:"table-header",
    width:200,
  }

]
function AdminUser() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(dashboardData.users.map((item) => ({...item, id:item._id, avatar:transformImage(item.avatar, 50)})))
  }, [])
  
  console.log("rows", rows)
  return (
    <AdminLayout>
        <Table 
        rows={rows} 
        columns={columns} 
        // rowHeight={}
        heading={"All Users"}
        />
    </AdminLayout>
  )
}

export default AdminUser