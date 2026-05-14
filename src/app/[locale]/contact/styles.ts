import type { SxProps, Theme } from "@mui/material";

export const pageContainer: SxProps<Theme> = {
  py: { xs: 4, md: 8 },
};

export const form: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
  mt: 4,
  maxWidth: 600,
};

export const successAlert: SxProps<Theme> = {
  mt: 4,
};

export const honeypot: React.CSSProperties = {
  position: "absolute",
  left: "-9999px",
  opacity: 0,
};

export const submitButton: SxProps<Theme> = {
  alignSelf: "flex-start",
};
