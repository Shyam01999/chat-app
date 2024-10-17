import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080", {withCredentials:true});
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(" socket Connected", socket.id);
    });

    socket.on('welcome', (s)=>{
      console.log(s)
    })

    return () => {
      socket.disconnect();
    }; 
  }, []);

  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

export default App;
