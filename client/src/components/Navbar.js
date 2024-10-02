import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom"; // Import NavLink and useNavigate for navigation
import { AuthContext } from "../Auth/AuthContext";

function Navbar() {
  const [user, setUser] = useState(null);
  const {logout} = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null); // For handling menu anchor
  const navigate = useNavigate();

  // Check if the user is logged in on component mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem("userId"); // Assuming user info is stored in local storage
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Set user state if logged in
    }
  }, []);

  // Handle avatar click
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor for the menu
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from local storage
    setUser(null); // Clear user state
    navigate("/login"); // Redirect to login page
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "transparent", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <img
            src="pizzaslice.svg"
            alt="Pizza Logo"
            style={{ width: "40px" }}
          />
          <Typography
            variant="h6"
            sx={{ ml: 1, color: "orange", fontWeight: "bold" }}
          >
            Pizza
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" width={500}>
          <Button
            component={NavLink}
            to="/"
            sx={{ color: "black", fontWeight: "bold" }}
          >
            Home
          </Button>
          <Button
            component={NavLink}
            to="/orderHistory"
            sx={{ color: "black", fontWeight: "bold" }}
          >
            Orders
          </Button>
          <Button
            component={NavLink}
            to="/who-we-are"
            sx={{ color: "black", fontWeight: "bold" }}
          >
            Who we are
          </Button>
        </Box>

        {!user ? (
          <Button
            component={NavLink}
            to="/register"
            variant="contained"
            sx={{ bgcolor: "orange", fontWeight: "bold" }}
          >
            Register
          </Button>
        ) : (
          <Box>
            <Avatar
              alt={user.name} // Assuming user object has a name property
              src={user.avatar} // Assuming user object has an avatar property
              onClick={handleAvatarClick}
              sx={{ cursor: "pointer" }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
