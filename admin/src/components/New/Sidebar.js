import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { BsBoxSeam } from "react-icons/bs";
import { CiPizza } from "react-icons/ci";
import { MdOutlinePersonOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { NavLink, useLocation } from "react-router-dom";
import { RiMenuUnfold2Line, RiMenuUnfold3Line } from "react-icons/ri";
import { AuthContext } from "../../Auth/AuthContext";

const Sidebar = ({ sidebarOpen, handleSidebarToggle }) => {
  const {logout} = useContext(AuthContext)
  const drawerWidth = 240;
  const collapsedDrawerWidth = 60;
  const location = useLocation(); // Get current route to track active item

  const menuItems = [
    { text: "Orders", icon: <BsBoxSeam size={25} />, link: "/orders" },
    { text: "Add Menu", icon: <CiPizza size={30} />, link: "/add-menu" },
    { text: "Role", icon: <MdOutlinePersonOutline size={30} />, link: "/role" },
    { text: "User", icon: <CgProfile size={30} />, link: "/user" },
  ];

  return (
    <Drawer
      variant="permanent"
      open={sidebarOpen}
      sx={{
        width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s ease, padding 0.3s ease",
          overflowX: "hidden",
          border: "none",
        },
        border: "none",
      }}
    >
      <div>
        {/* Header and Logo */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={2}
          sx={{
            transition: "padding 0.3s ease",
            backgroundColor: "#fcfcfc",
          }}
        >
          {sidebarOpen ? (
            <Typography
              variant="h6"
              noWrap
              sx={{
                transition: "opacity 0.3s ease", // Smooth transition for text appearance
                opacity: sidebarOpen ? 1 : 0,
              }}
            >
              PIZZA
            </Typography>
          ) : (
            <Avatar
              src="/pizzaslice.svg"
              alt="Pizza Logo"
              sx={{ width: 40, height: 40 }}
            />
          )}
        </Box>
        <Divider />
        {sidebarOpen && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2}
            sx={{
              transition: "padding 0.3s ease",
              backgroundColor: "#FFF3E0",
            }}
          >
            <img
              src="pizzaslice.svg"
              alt="pizza"
              width="100px"
              height="70px"
              style={{
                transition: "opacity 0.3s ease", // Smooth transition for text appearance
                opacity: sidebarOpen ? 1 : 0,
              }}
            />
          </Box>
        )}
        {/* Menu Items */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={NavLink}
              to={item.link}
              sx={{
                position: "relative",
                backgroundColor:
                  location.pathname === item.link ? "#ffcd99" : "transparent", // Selected item background
                color: location.pathname === item.link ? "#FFA726" : "#333", // Selected item text color
                "&:hover": {
                  backgroundColor: "#ffcd99", // Light orange hover effect
                },
                "&.active::before": {
                  content: '""',
                  position: "absolute",
                  left: 4,
                  height: "60%",
                  width: "4px",
                  backgroundColor: "#FFA726", // Orange indicator for selected item
                },
                transition: "background-color 0.3s ease", // Smooth transition for hover
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.link ? "#FFA726" : "#333",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {sidebarOpen && (
                <ListItemText
                  primary={item.text}
                  sx={{
                    transition: "opacity 0.3s ease",
                    opacity: sidebarOpen ? 1 : 0,
                  }}
                />
              )}
              {/* Left-side indicator */}
              {location.pathname === item.link && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 4,
                    height: "60%",
                    width: "5px",
                    backgroundColor: "#FFA726", // Orange indicator
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* Logout Item */}
        <List>
          <ListItem
            button
            key="Logout"
            onClick={logout}
            sx={{
              position: "relative",
              "&:hover": {
                backgroundColor: "#ffcd99", // Light orange hover effect
              },
              color: "#ff0000",
              transition: "background-color 0.3s ease",
              right: 0,
            }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: "#ff0000" }} />
            </ListItemIcon>
            {sidebarOpen && (
              <ListItemText
                primary="Logout"
                sx={{
                  transition: "opacity 0.3s ease",
                  opacity: sidebarOpen ? 1 : 0,
                }}
              />
            )}
          </ListItem>
        </List>
      </div>
      {/* <IconButton
        onClick={handleSidebarToggle}
        sx={{
          position: "absolute",
          top: 8,
          right: -5,
          color:"black"
        //   backgroundColor: "#fff",
        //   boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        {sidebarOpen ? <RiMenuUnfold2Line /> : <RiMenuUnfold3Line />}
      </IconButton> */}
    </Drawer>
  );
};

export default Sidebar;
