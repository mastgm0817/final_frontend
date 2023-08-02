import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://localhost:3000/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function Footer() {
  return (
    <Container
      maxWidth="fluid"
      sx={{ bgcolor: "#f6f7f9", textAlign: "center", marginTop: 1 }}
    >
      <Typography variant="body1">Footer here</Typography>
      <Copyright />
    </Container>
  );
}
