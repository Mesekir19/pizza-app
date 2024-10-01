import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
} from "@mui/material";
import { AuthContext } from "../Auth/AuthContext";
import { useContext } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    const { login } = useContext(AuthContext);

  const navigate = useNavigate(); // Using useNavigate instead of useRouter

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/users/login",
  //       { username, password }
  //     );
  //     localStorage.setItem("token", response.data.token);
  //     navigate("/"); // Navigate to home after login
  //   } catch (error) {
  //     console.error("Failed to login", error);
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // await loginUser({ email, password });
      await login({ email, password });

      navigate("/"); // Redirect to dashboard after successful login
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            backgroundColor: "orange",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/pizzaslice.svg"
            alt="logo"
            style={{ width: "50%", maxWidth: "300px" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                mb: 2,
              }}
            >
              <img
                src="/pizzaslice.svg"
                alt="logo"
                style={{ width: "10%", maxWidth: "50px", marginRight: 10 }}
              />
              <Typography component="h1" variant="h4">
                Pizza
              </Typography>
            </Box>
            <Typography variant="h6" align="left" sx={{ width: "100%" }}>
              Login
            </Typography>
            <Divider sx={{ borderColor: "lightgray", width: "100%", mb: 2 }} />
            <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                variant="outlined"
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "orange", // Default label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "orange", // Label color when focused
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "orange", // Default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "orange", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "orange", // Border color when focused
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "orange", // Default label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "orange", // Label color when focused
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "orange", // Default border color
                    },  
                    "&:hover fieldset": {
                      borderColor: "orange", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "orange", // Border color when focused
                    },
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" sx={{ color: "orange" }} />}
                label="Remember me"
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "orange" }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    underline="none"
                    color="orange"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  {"Don't have an account? "}
                  <Link
                    href="/register"
                    underline="none"
                    color="orange"
                    variant="body2"
                  >
                    {" Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
