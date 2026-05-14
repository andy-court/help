import type { SxProps, Theme } from "@mui/material";

export const pageContainer: SxProps<Theme> = {
  py: 8,
};

export const therapistCard: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  transition: "box-shadow 0.2s",
  "&:hover": {
    boxShadow: 4,
  },
};

export const chipContainer: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  gap: 0.5,
  mt: 1,
};
