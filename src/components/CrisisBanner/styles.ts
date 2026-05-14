import type { SxProps, Theme } from "@mui/material";

export const banner: SxProps<Theme> = {
  backgroundColor: "primary.dark",
  color: "primary.contrastText",
  py: 0.75,
  px: 2,
};

export const bannerContent: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: { xs: 0.5, md: 1 },
  textAlign: "center",
};

export const phoneIcon: SxProps<Theme> = {
  fontSize: 16,
};

export const mobileCtaButton: SxProps<Theme> = {
  display: { xs: "inline-flex", md: "none" },
  ml: 1,
  whiteSpace: "nowrap",
  fontSize: "0.75rem",
  py: 0.25,
  px: 1.5,
};
