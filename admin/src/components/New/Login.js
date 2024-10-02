import React, { useState, useContext } from "react";
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
  CircularProgress,
} from "@mui/material";
import { AuthContext } from "../../Auth/AuthContext";
import { z } from "zod"; // Import Zod for validation
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; // Import react-hook-form

// Define Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for error message

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true
    setError(""); // Reset error message
    try {
      await login(data); // Attempt to login
      navigate("/"); // Redirect to home after successful login
    } catch (error) {
      setError("Invalid email or password"); // Set error message
    } finally {
      setLoading(false); // Set loading to false
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
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1, width: "100%" }}
            >
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
                {...register("email")} // Register the input with react-hook-form
                error={!!errors.email} // Display error if validation fails
                helperText={errors.email ? errors.email.message : ""} // Display error message
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
                {...register("password")} // Register the input with react-hook-form
                error={!!errors.password} // Display error if validation fails
                helperText={errors.password ? errors.password.message : ""} // Display error message
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
                type="submit" // Change to submit type for form submission
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "orange" }}
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
              {/* Message Display */}
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
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
