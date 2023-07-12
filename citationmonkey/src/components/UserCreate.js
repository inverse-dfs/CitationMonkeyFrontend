import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "@mui/material";
import axios from "axios";

const defaultTheme = createTheme();

const registerStatusBox = (status) => {
  if (status === "success") {
    return (
      <Box
        sx={{
          color: "#318500",
          textAlign: "center",
        }}
      >
        <Typography>Account created, you can login now!</Typography>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          color: "#FF0000",
          textAlign: "center",
        }}
      >
        <Typography>Registration failed, please verify your input.</Typography>
      </Box>
    );
  }
};

export function UserCreate() {
  const [emailError, setEmailError] = React.useState('')
  const [passwordError, setPWError] = React.useState('')
  const [usernameError, setUsernameError] = React.useState('')

  const [status, setStatus] = React.useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const username = data.get("username");

    if (!email) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }

    if (!password) {
      setPWError("Password is required")
    } else {
      setPWError("");
    }

    if (!username) {
      setUsernameError("Username is required")
    } else {
      setUsernameError("");
    }

    if (email && password && username) {
      axios
        .post("http://54.242.252.72/signup", {
          email: email,
          password: password,
          name: username,
        })
        .then(function (response) {
          if (response.data && response.data === "success") {
            setStatus("success");
          } else {
            setStatus("failed");
          }
        })
        .catch(function (error) {
          console.log(error);
          setStatus(error);
        });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  error={usernameError ? true : false}
                  helperText={usernameError}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError ? true : false}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passwordError ? true : false}
                  helperText={passwordError}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {status && registerStatusBox(status)}
            <Grid container justifyContent="center">
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
