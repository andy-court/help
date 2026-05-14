import type { SxProps, Theme } from "@mui/material";

export const pageContainer: SxProps<Theme> = {
  py: 8,
};

export const calendarEmbed: SxProps<Theme> = {
  mt: 4,
  minHeight: 500,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px dashed",
  borderColor: "grey.300",
  borderRadius: 2,
  p: 4,
};
