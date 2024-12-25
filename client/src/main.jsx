// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <>
    <HelmetProvider>
      <CssBaseline />
      {/* <div onContextMenu={(e) => e.preventDefault()}> */}
      <div>
        <App />
      </div>
    </HelmetProvider>
  </>
);
