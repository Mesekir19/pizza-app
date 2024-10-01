import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import { RiMenuUnfold2Line, RiMenuUnfold3Line } from "react-icons/ri";
import { NotificationsOutlined } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const AppBarHeader = ({ sidebarOpen, handleSidebarToggle }) => {
  const location = useLocation();

  // State for handling notification and avatar menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(5); // Example count

  // Function to handle avatar menu open/close
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logging out..."); // Replace with actual logout logic
    handleMenuClose();
  };

  // Dynamic page title based on the route
  const getPageTitle = () => {
    switch (location?.pathname) {
      case "/orders":
        return "Orders";
      case "/add-menu":
        return "Add Menu";
      case "/role":
        return "Role Management";
      case "/user":
        return "User Management";
      default:
        return "Dashboard";
    }
  };

  const drawerWidth = 240;
  const collapsedDrawerWidth = 60;

  return (
    <AppBar
      position="fixed"
      sx={{
        width: sidebarOpen
          ? `calc(100% - ${drawerWidth}px)`
          : `calc(100% - ${collapsedDrawerWidth}px)`,
        ml: sidebarOpen ? `${drawerWidth}px` : `${collapsedDrawerWidth}px`,
        backgroundColor: "#ffffff",
        color: "#000000",
        transition: "width 0.3s ease, margin-left 0.3s ease",
        boxShadow:"none",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleSidebarToggle}
          sx={{ mr: 2 }}
        >
          {sidebarOpen ? <RiMenuUnfold2Line /> : <RiMenuUnfold3Line />}
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {getPageTitle()}
        </Typography>

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }}>
          {/* Notification Icon with Badge */}
          <IconButton color="inherit">
            <Badge badgeContent={notificationCount} color="success">
              <NotificationsOutlined />
            </Badge>
          </IconButton>

          {/* Avatar with Logout Menu */}
          <IconButton color="inherit" onClick={handleAvatarClick}>
            <Avatar src="/user-avatar.png" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarHeader;
