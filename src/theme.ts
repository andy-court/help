"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6B8F71",
      light: "#8DB894",
      dark: "#4A6E50",
    },
    secondary: {
      main: "#C9A96E",
      light: "#DBBF8F",
      dark: "#A88B4A",
    },
    background: {
      default: "#FAF8F5",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
