import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom"; // Import NavLink for navigation

function Navbar() {
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
          {/* Add NavLink to each Button for navigation */}
          <Button
            component={NavLink}
            to="/"
            sx={{ color: "black", fontWeight: "bold" }}
          >
            Home
          </Button>
          <Button
            component={NavLink}
            to="/order"
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

        <Button
          component={NavLink}
          to="/register"
          variant="contained"
          sx={{ bgcolor: "orange", fontWeight: "bold" }}
        >
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
