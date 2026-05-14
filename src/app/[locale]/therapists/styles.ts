import type { SxProps, Theme } from "@mui/material";

export const pageContainer: SxProps<Theme> = {
  py: { xs: 4, md: 8 },
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

export const subtitle: SxProps<Theme> = {
  mb: 4,
};

export const cardImage: SxProps<Theme> = {
  objectPosition: "center top",
};

export const cardContent: SxProps<Theme> = {
  flexGrow: 1,
};

export const chipContainer: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  gap: 0.5,
  mt: 1,
};

export const cardExcerpt: SxProps<Theme> = {
  mt: 2,
};
