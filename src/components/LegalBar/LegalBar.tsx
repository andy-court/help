"use client";

import { useTranslations } from "next-intl";
import { Box, Typography } from "@mui/material";
import NavLink from "@/components/NavLink";
import { bar, links } from "./styles";

export default function LegalBar() {
  const t = useTranslations("legal");

  return (
    <Box component="footer" sx={bar}>
      <Typography variant="caption" color="text.secondary">
        {t("copyright", { year: new Date().getFullYear().toString() })}
      </Typography>
      <Box sx={links}>
        <Typography
          variant="caption"
          component={NavLink}
          href="/impressum"
          color="text.secondary"
          sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
        >
          {t("impressum")}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          |
        </Typography>
        <Typography
          variant="caption"
          component={NavLink}
          href="/datenschutz"
          color="text.secondary"
          sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
        >
          {t("datenschutz")}
        </Typography>
      </Box>
    </Box>
  );
}
