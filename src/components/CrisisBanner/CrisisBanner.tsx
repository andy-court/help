"use client";

import { useTranslations } from "next-intl";
import { Box, Typography, Link } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { banner, bannerContent } from "./styles";

export default function CrisisBanner() {
  const t = useTranslations("crisis");

  return (
    <Box sx={banner}>
      <Box sx={bannerContent}>
        <PhoneIcon sx={{ fontSize: 16 }} />
        <Typography variant="body2">
          {t("text")}{" "}
          <Link href="tel:08001110111" color="inherit" underline="always">
            0800 111 0 111
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
