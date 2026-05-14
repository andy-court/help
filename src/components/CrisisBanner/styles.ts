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
