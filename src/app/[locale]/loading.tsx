import { Box, CircularProgress } from "@mui/material";
import { loadingContainer } from "./loading.styles";

export default function Loading() {
  return (
    <Box sx={loadingContainer}>
      <CircularProgress color="primary" />
    </Box>
  );
}
