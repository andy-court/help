import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Typography, Container, Button, Box } from "@mui/material";
import NavLink from "@/components/NavLink";
import { siteConfig } from "@/siteConfig";
import { heroContainer, heroTitle, heroSubtitle } from "./styles";

const bookingHref = siteConfig.mode === "single"
  ? `/booking/${siteConfig.singleTherapistSlug}`
  : "/therapists";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function Home() {
  const t = useTranslations("home");

  return (
    <Container maxWidth="md">
      <Box sx={heroContainer}>
        <Typography
          variant="h2"
          component="h1"
          fontWeight="bold"
          sx={heroTitle}
        >
          {t("title")}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={heroSubtitle}
        >
          {t("subtitle")}
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={NavLink}
          href={bookingHref}
        >
          {t("cta")}
        </Button>
      </Box>
    </Container>
  );
}
