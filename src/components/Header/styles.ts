import type { SxProps, Theme } from "@mui/material";

export const toolbar: SxProps<Theme> = {
  justifyContent: "space-between",
};

export const logoLink: SxProps<Theme> = {
  textDecoration: "none",
  color: "inherit",
  fontWeight: 700,
};

export const navLinks: SxProps<Theme> = {
  display: { xs: "none", md: "flex" },
  gap: 1,
};

export const ctaButton: SxProps<Theme> = {
  ml: 1,
  whiteSpace: "nowrap",
};

export const mobileMenuButton: SxProps<Theme> = {
  display: { xs: "flex", md: "none" },
};

export const socialLinks: SxProps<Theme> = {
  display: { xs: "none", md: "flex" },
  gap: 0.5,
  ml: 1,
};
