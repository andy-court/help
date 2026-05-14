import type { SxProps, Theme } from "@mui/material";

export const pageContainer: SxProps<Theme> = {
  py: { xs: 4, md: 8 },
};

export const postCard: SxProps<Theme> = {
  mb: 3,
  transition: "box-shadow 0.2s",
  "&:hover": {
    boxShadow: 4,
  },
};

export const subtitle: SxProps<Theme> = {
  mb: 4,
};

export const postExcerpt: SxProps<Theme> = {
  mt: 1,
};
