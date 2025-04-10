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
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";

function Login() {
  const signupformdata = {
    profileimage: "",
    name: "",
    userbio: "",
    username: "",
    password: "",
  };

  const loginformdata = {
    username: "",
    password: "",
  };
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState(loginformdata);

  useEffect(() => {
    setData(isLogin ? loginformdata : signupformdata);
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name == "profileimage") {
      setData({
        ...data,
        profileimage: files[0],
      });

      return;
    }

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("data", data);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("data", data);
  };

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100vh",
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
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form
              onSubmit={handleLogin}
              style={{ width: "100%", marginTop: "0.5rem" }}
            >
              <TextField
                type="text"
                name="username"
                placeholder="Enter username"
                id="username"
                label="Username"
                value={data.username}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
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
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
              <Button variant="outlined" onClick={toggleLogin} fullWidth>
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form
              onSubmit={handleSignup}
              style={{ width: "100%", marginTop: "0rem" }}
            >
              <Stack
                position={"relative"}
                justifyContent={"center"}
                sx={{ width: "8rem", margin: "auto" }}
              >
                <Avatar
                  sx={{ width: "8rem", height: "8rem", ObjectFit: "contain" }}
                  src={data.profileimage}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0rem",
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    ":hover": {
                      bgcolor: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                  component="label"
                >
                  <>
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      accept="image"
                      name="profileimage"
                      onChange={handleChange}
                    />
                  </>
                </IconButton>
              </Stack>
              <TextField
                type="text"
                name="name"
                placeholder="Enter name"
                id="name"
                label="Name"
                value={data.name}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
              <TextField
                type="text"
                name="userbio"
                placeholder="Enter bio"
                id="userbio"
                label="Bio"
                value={data.userbio}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
              <TextField
                type="text"
                name="username"
                placeholder="Enter username"
                id="username"
                label="Username"
                value={data.username}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
              <TextField
                type="password"
                name="password"
                placeholder="Enter password"
                id="password"
                label="password"
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
                Sign Up
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
              <Button variant="outlined" onClick={toggleLogin} fullWidth>
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Login;
