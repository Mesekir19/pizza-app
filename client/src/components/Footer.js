import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  IconButton,
  Link,
  Container,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Header Component
function Header() {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#d1b089", color: "black", boxShadow: "none" }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        paddingRight={15}
        py={3}
      >
        <img
          src="pizzaslice.svg"
          alt="Pizza Logo"
          style={{ width: 40, height: 40, marginRight: 10 }}
        />
        <Typography variant="h6" noWrap>
          Pizza
        </Typography>
      </Box>
      <Toolbar sx={{ display:"flex", justifyContent: "space-between", pb:"20px" }}>
        <Box
          display="flex"
          justifyContent="start"
          flexGrow={1}
          style={{ marginLeft: 5 }}
        >
          <Link
            href="#"
            color="inherit"
            underline="none"
            style={{ margin: "0 15px" }}
          >
            Home
          </Link>
          <Link
            href="#"
            color="inherit"
            underline="none"
            style={{ margin: "0 15px" }}
          >
            Order
          </Link>
          <Link
            href="#"
            color="inherit"
            underline="none"
            style={{ margin: "0 15px" }}
          >
            About Us
          </Link>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          bgcolor="white"
          style={{
            padding: "5px 10px",
            backgroundColor: "white",
            borderRadius: "5px",
            marginRight: "5px",
            border: "1px solid #ccc",
          }}
        >
          <InputBase
            placeholder="Your feedback..."
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton
            type="submit"
            aria-label="send"
            style={{ backgroundColor: "#fff", borderRadius: "5px" }}
          >
            <SendIcon style={{ color: "#f57c00" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// Footer Component
function Footer() {
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "black", color: "white", py: 2 }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" align="left">
          ©2024 Pizza All Rights Reserved.
        </Typography>
        <Link href="#" color="inherit" underline="none">
          Terms & Conditions
        </Link>
        <Box>
          <IconButton href="#" color="inherit">
            <LinkedInIcon />
          </IconButton>
          <IconButton href="#" color="inherit">
            <FacebookIcon />
          </IconButton>
          <IconButton href="#" color="inherit">
            <YouTubeIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

function MainFooter() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default MainFooter;
