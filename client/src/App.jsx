import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { io } from "socket.io-client";
import { Grid, TextField, Button, Typography, Stack } from "@mui/material";

function App() {
  const socket = io(useMemo(() => "http://localhost:8080", []));

  const [data, setData] = useState({
    message: "",
    room: "",
    socketid: "",
    messages: [],
  });

  useEffect(() => {
    socket.on("connect", () => {
      setData((prevData) => ({
        ...prevData,
        socketid: socket.id,
      }));
      console.log(" socket Connected", socket.id);
    });

    // socket.on("welcome", (s) => {
    //   console.log(s);
    // });

    socket.on("receive-message", (message) => {
      setData((prevData) => ({
        ...prevData,
        messages: [...prevData.messages, message], 
      }));
      console.log(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  //function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const socket = io("http://localhost:8080");
    socket.emit("message", data);
    setData((prevData) => ({
      ...prevData,
      message: "",
    }));
  };

  return (
    <>
      <Typography variant="h4" color="initial">
        {data.socketid}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems={"center"} direction={"column"}>
          <Grid item>
            <TextField
              type="text"
              label="Message"
              variant="outlined"
              value={data.message}
              name="message"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              type="text"
              label="Room"
              variant="outlined"
              value={data.room}
              name="room"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        {data.messages.map((m, i) => (
          <Typography key={i} variant="h6" color="initial"> {/* Unique key prop */}
          {m}
        </Typography>
        ))}
      </Stack>
    </>
  );
}

export default App;
