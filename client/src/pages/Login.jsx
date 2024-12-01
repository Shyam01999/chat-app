import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";

function Login() {
  const initialState = {
    username:"",
    password:""
  }
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleLogin = () => {
    setIsLogin(false);
  };

  const handleSubmit = (e) => {
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
        elevation={3}
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
              onSubmit={handleSubmit}
              style={{ width: "100%", marginTop: "0.5rem" }}
            >
              <TextField
                type="text"
                name="username"
                placeholder="Enter username"
                id="username"
                label="username"
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
          <span>Register page </span>
        )}
      </Paper>
    </Container>
  );
}

export default Login;
