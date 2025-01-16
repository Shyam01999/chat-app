import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { matBlack } from "../../constants/color";
import { Paper } from "@mui/material";

function Table({ rows, columns, heading, rowHeight = 52 }) {
  return (
    <>
      <Container
        // maxWidth="lg"
        sx={{
          height: "100vh",
          padding:0,
          
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "1rem 4rem",
            borderRadius: "1rem",
            margin: "auto",
            width: "100%",
            overflow: "hidden",
            height: "100%",
            boxShadow: "none",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              margin: "2rem",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {heading}
          </Typography>

          <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={rowHeight}
            style={{
              height: "80%",
            }}
            sx={{
              border: "none",
              ".table-header": {
                bgcolor: matBlack,
                color:"white",
              },
              "& .MuiDataGrid-virtualScroller": {
                overflowX: "hidden", // Remove horizontal scrolling
              },
            }}
          />
        </Paper>
      </Container>
    </>
  );
}

export default Table;
