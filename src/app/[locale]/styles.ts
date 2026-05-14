import type { SxProps, Theme } from "@mui/material";

export const heroContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: { xs: "70vh", md: "80vh" },
  textAlign: "center",
  gap: 3,
  px: { xs: 2, md: 0 },
};

export const heroTitle: SxProps<Theme> = {
  fontSize: { xs: "2rem", sm: "2.75rem", md: "3.75rem" },
};

export const heroSubtitle: SxProps<Theme> = {
  fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
};
