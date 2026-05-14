import type { SxProps, Theme } from "@mui/material";

export const appShell: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

export const mainContent: SxProps<Theme> = {
  flex: 1,
};
