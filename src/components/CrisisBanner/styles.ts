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
  gap: 1,
};
