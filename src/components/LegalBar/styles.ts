import type { SxProps, Theme } from "@mui/material";

export const bar: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 1,
  px: 3,
  py: 2,
  borderTop: 1,
  borderColor: "divider",
};

export const links: SxProps<Theme> = {
  display: "flex",
  gap: 1,
  alignItems: "center",
};
