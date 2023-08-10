"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Container, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Image from "next/image";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const handleLoginBtn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await signIn("email-Credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: process.env.NEXT_PUBLIC_CALLBACKURL,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleLoginBtn}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Typography
                style={{
                  textAlign: "center",
                  color: "#1976d2",
                  fontSize: "16px",
                  marginTop: "10px",
                }}
                component="h5"
                variant="h5"
              >
                Or sign in with
              </Typography>
              <Grid container spacing={0.5} style={{ marginTop: "10px" }}>
                <Grid
                  xs
                  item
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      signIn("naver", {
                        callbackUrl: process.env.NEXT_PUBLIC_CALLBACKURL,
                      });
                    }}
                  >
                    <Image
                      src="/image/naver.png"
                      alt="naverbtn"
                      width={50}
                      height={50}
                    ></Image>
                  </Button>
                </Grid>
                <Grid
                  xs
                  item
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      signIn("google", {
                        callbackUrl: process.env.NEXT_PUBLIC_CALLBACKURL,
                      });
                    }}
                  >
                    <Image
                      src="/image/google.png"
                      alt="googlebtn"
                      width={50}
                      height={50}
                    ></Image>
                  </Button>
                </Grid>
                <Grid
                  xs
                  item
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      signIn("kakao", {
                        callbackUrl: "https://luvoost.co.kr",
                      });
                    }}
                  >
                    <Image
                      src="/image/kakao.png"
                      alt="kakaobtn"
                      width={50}
                      height={50}
                    ></Image>
                  </Button>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
