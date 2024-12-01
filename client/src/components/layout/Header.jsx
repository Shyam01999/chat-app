import {
  AppBar,
  Box,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { orange } from "../../constants/color";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Notifications as NotificationIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleMobile = () => {
    console.log("mobile menu");
  };

  const openSearchDialog = () => {
    console.log("search button click");
  };

  const openNewGroup = () => {
    console.log("New group button click");
  };

  const navigateToGroup = () => {
    navigate("/group");
  };

  const handleNotification = () => {
    console.log("Notification button clicked");
  };

  const handleLogout = () => {
    console.log("Logout button click");
  };

  return (
    <Box sx={{ flexGrow: 1 }} height={"4rem"}>
      <AppBar position={"static"} sx={{ background: orange }}>
        <Toolbar>
          <Typography sx={{ display: { xs: "none", sm: "block" } }}>
            Chat App
          </Typography>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconBtn
              title={"Menu"}
              icon={<MenuIcon />}
              onClick={handleMobile}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconBtn
              title={"Search"}
              icon={<SearchIcon />}
              onClick={openSearchDialog}
            />
            <IconBtn
              title={"New Group"}
              icon={<AddIcon />}
              onClick={openNewGroup}
            />
            <IconBtn
              title={"Manage Group"}
              icon={<GroupIcon />}
              onClick={navigateToGroup}
            />
            <IconBtn
              title={"Notifications"}
              icon={<NotificationIcon />}
              onClick={handleNotification}
            />
            <IconBtn
              title="Logout"
              icon={<LogoutIcon />}
              onClick={handleLogout}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
