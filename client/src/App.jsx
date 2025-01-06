import { useEffect, useMemo, useState, lazy, Suspense } from "react";

import "./App.css";
import { io } from "socket.io-client";
import { Grid, TextField, Button, Typography, Stack } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/protectRoute/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AdminLogin = lazy(()=> import ('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(()=> import ('./pages/admin/AdminDashboard'));
const AdminUser = lazy(()=> import ('./pages/admin/AdminUser'));
const AdminChat = lazy(()=> import ('./pages/admin/AdminChat'));
const AdminMessage = lazy(()=> import ('./pages/admin/AdminMessage'));

function App() {
  // const socket = io(useMemo(() => "http://localhost:8080", []));

  // const [data, setData] = useState({
  //   message: "",
  //   room: "",
  //   socketid: "",
  //   messages: [],
  // });

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     setData((prevData) => ({
  //       ...prevData,
  //       socketid: socket.id,
  //     }));
  //     console.log(" socket Connected", socket.id);
  //   });

  //   // socket.on("welcome", (s) => {
  //   //   console.log(s);
  //   // });

  //   socket.on("receive-message", (message) => {
  //     setData((prevData) => ({
  //       ...prevData,
  //       messages: [...prevData.messages, message],
  //     }));
  //     console.log(message);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // //function
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // const socket = io("http://localhost:8080");
  //   socket.emit("message", data);
  //   setData((prevData) => ({
  //     ...prevData,
  //     message: "",
  //   }));
  // };

  let user = true;

  return (
    <>
      {/* <Typography variant="h4" color="initial">
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
          <Typography key={i} variant="h6" color="initial">
          {m}
        </Typography>
        ))}
      </Stack> */}

      <BrowserRouter>
        <Suspense fallback={<LayoutLoader />}>
          <Routes>
            <Route path="/" element={<ProtectRoute user={user} />}>
              <Route index element={<Home />} />
              <Route path="/chat/:chatId" element={<Chat />} />
              <Route path="/group" element={<Group />} />
            </Route>

            <Route
              path="/login"
              element={
                <ProtectRoute user={!user} redirect="/">
                  <Login />
                </ProtectRoute>
              }
            />

            <Route path="/admin/login" element={<AdminLogin/>}/>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
            <Route path="/admin/user" element={<AdminUser/>}/>
            <Route path="/admin/chat" element={<AdminChat/>}/>
            <Route path="/admin/message" element={<AdminMessage/>}/>
            

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
