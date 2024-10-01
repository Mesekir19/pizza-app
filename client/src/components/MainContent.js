import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Navbar from "./Navbar";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius * 7,
  backgroundColor: "white",
  marginTop: 15,
  flexGrow: 1,
  border: "solid thin white",
  width: "400px",
  maxWidth: "400px",
  height: "60px",
  color: "black",
  alignItems: "center",
  display: "flex",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  width: "100%",
  height: "100%",
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "orange",
  borderRadius: "50px",
  cursor: "pointer",
  margin: "3px",
  width: "13%",
  height: "70%",
}));
function MainContent() {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #ffecd2, #fcb69f)",
        width: "100%",
      }}
    >
      {/* <Navbar/> */}
      <Box sx={{ display: "flex", justifyContent: "space-between", ml: 10 }}>
        <Box textAlign="start" sx={{ mt: 10 }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", color: "orange", fontSize: "7rem" }}
          >
            Order us
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "black", mt: 2, fontSize: "1.2rem" }}
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without.
            <Search>
              <StyledInputBase
                placeholder="Search for anything…"
                inputProps={{ "aria-label": "search" }}
              />
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "white", scale: 1.4 }} />
              </SearchIconWrapper>
            </Search>
          </Typography>

          {/* Search Bar */}
        </Box>

        {/* Image Section */}
        <Box sx={{ display: "flex" }}>
          <img
            src="image.png"
            alt="Pizza"
            height={250}
            width={250}
            style={{ marginTop: "50px" }}
          />
          <img src="halfpiza.png" alt="Pizza" height={680} width={370} />
        </Box>
      </Box>
    </Box>
  );
}

export default MainContent;
