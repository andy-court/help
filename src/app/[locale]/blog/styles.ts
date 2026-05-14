import type { SxProps, Theme } from "@mui/material";

export const pageContainer: SxProps<Theme> = {
  py: 8,
};

export const postCard: SxProps<Theme> = {
  mb: 3,
  transition: "box-shadow 0.2s",
  "&:hover": {
    boxShadow: 4,
  },
};
