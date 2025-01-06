import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { VisuallyHiddenInput } from "../../components/styles/StyledComponents";
import { bgGradiant } from "../../constants/color";
import { Navigate } from "react-router-dom";

function AdminLogin() {
    const isAdmin = true;
  const loginformdata = {
    password: "",
  };

  const [data, setData] = useState(loginformdata);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("login button clicked", data);
  };

  if(isAdmin){
    return <Navigate to="/admin/dashboard"/>
  }

  return (
    <div
      style={{
        backgroundImage: bgGradiant,
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            onSubmit={submitHandler}
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            <TextField
              type="password"
              name="password"
              placeholder="Enter password"
              id="password"
              label="Password"
              value={data.password}
              onChange={handleChange}
              autoComplete="off"
              margin="normal"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                marginTop: "1rem",
              }}
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default AdminLogin;
