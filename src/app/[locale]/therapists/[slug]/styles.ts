import type { SxProps, Theme } from "@mui/material";

export const pageContainer: SxProps<Theme> = {
  py: { xs: 4, md: 8 },
};

export const profileHeader: SxProps<Theme> = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  gap: 4,
  mb: 4,
};

export const profilePhotoWrapper: SxProps<Theme> = {
  width: { xs: "100%", md: 300 },
  flexShrink: 0,
  "& img": {
    width: "100%",
    height: "auto",
  },
};

export const profilePhoto: React.CSSProperties = {
  objectFit: "cover",
  objectPosition: "center top",
  borderRadius: 8,
};

export const profileInfo: SxProps<Theme> = {
  flex: 1,
};

export const chipContainer: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
  my: 2,
};

export const profileDivider: SxProps<Theme> = {
  mb: 4,
};

export const bioParagraph: SxProps<Theme> = {
  mb: 2,
};
