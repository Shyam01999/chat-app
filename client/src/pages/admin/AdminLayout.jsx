import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { grayColor, matBlack } from "../../constants/color";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ManageAccounts as ManageAccountsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  ExitToApp as ExitIcon,
} from "@mui/icons-material";
import { NavLink as NavLinkComponent } from "react-router-dom";

const NavLink = styled(NavLinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;
const adminRoutes = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "User",
    path: "/admin/user",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chat",
    path: "/admin/chat",
    icon: <GroupIcon />,
  },
  {
    name: "Message",
    path: "/admin/message",
    icon: <MessageIcon />,
  },
];

function AdminLayout({ children }) {
  const [isMobile, setIsmobile] = useState(false);
  const Sidebar = ({ w = "100%" }) => {
    return (
      <Stack direction={"column"} width={w} p={"2rem"} spacing={"3rem"}>
        <Typography variant="h5" textTransform="uppercase">
          Chattu
        </Typography>

        <Stack direction={"column"} spacing={"1rem"}>
          {adminRoutes.map((item, index) => {
            return (
              <NavLink key={index} to={item.path} className="navbar-section">
                <Stack
                  direction="row"
                  alignItems={"center"}
                  spacing="1rem"
                  sx={{
                    textDecoration: "none",
                  }}
                >
                  {item.icon}

                  <Typography fontSize={"1.2rem"}>{item.name}</Typography>
                </Stack>
              </NavLink>
            );
          })}

          <NavLink onClick={handleLogout}>
            <Stack
              direction="row"
              alignItems={"center"}
              spacing="1rem"
              sx={{
                textDecoration: "none",
              }}
            >
              <ExitIcon />

              <Typography fontSize={"1.2rem"}>Logout</Typography>
            </Stack>
          </NavLink>
        </Stack>
      </Stack>
    );
  };

  const handleMobile = () => {
    setIsmobile(!isMobile);
  };

  const handleClose = () => {};

  const handleLogout = () => {};

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: "1rem",
          right: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
          bgcolor: grayColor,
        }}
      >
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w={"50vw"} />
      </Drawer>
    </Grid>
  );
}

export default AdminLayout;
