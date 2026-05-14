import type { SxProps, Theme } from "@mui/material";

export const pageContainer: SxProps<Theme> = {
  py: { xs: 4, md: 8 },
};

export const backButton: SxProps<Theme> = {
  mb: 3,
};

export const articleMeta: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  mb: 4,
};

export const articleDivider: SxProps<Theme> = {
  mb: 4,
};

export const articleParagraph: SxProps<Theme> = {
  mb: 2,
};
