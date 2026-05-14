"use client";

import { useTranslations } from "next-intl";
import { Box, Typography, Link, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import NavLink from "@/components/NavLink";
import { banner, bannerContent, phoneIcon, mobileCtaButton } from "./styles";

export default function CrisisBanner() {
  const t = useTranslations("crisis");
  const tNav = useTranslations("nav");

  return (
    <Box sx={banner}>
      <Box sx={bannerContent}>
        <PhoneIcon sx={phoneIcon} />
        <Typography variant="body2">
          {t("text")}{" "}
          <Link href="tel:08001110111" color="inherit" underline="always">
            0800 111 0 111
          </Link>
          {" "}({t("germany")})
        </Typography>
        <Button
          component={NavLink}
          href="/therapists"
          variant="contained"
          color="secondary"
          size="small"
          sx={mobileCtaButton}
        >
          {tNav("bookSession")}
        </Button>
      </Box>
    </Box>
  );
}
