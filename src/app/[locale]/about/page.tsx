import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Typography, Container, Box, Chip, Button, Divider } from "@mui/material";
import Image from "next/image";
import NavLink from "@/components/NavLink";
import { siteConfig } from "@/siteConfig";
import { supabase } from "@/lib/supabase";
import {
  pageContainer,
  section,
  profileHeader,
  profilePhotoWrapper,
  profilePhoto,
  profileInfo,
  chipContainer,
  bioParagraph,
} from "./styles";

const isSingle = siteConfig.mode === "single";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");

  if (isSingle) {
    const locale = await getLocale();
    const { data: therapist } = await supabase
      .from("therapists")
      .select("name, title_en, title_de")
      .eq("slug", siteConfig.singleTherapistSlug)
      .single();

    if (therapist) {
      const title = locale === "de" ? therapist.title_de : therapist.title_en;
      return {
        title: `${t("title")} — ${therapist.name}`,
        description: `${therapist.name}, ${title}`,
      };
    }
  }

  return {
    title: t("title"),
    description: t("missionText"),
  };
}

export default async function About() {
  const t = await getTranslations("about");
  const locale = await getLocale();

  let therapist = null;
  if (isSingle) {
    const { data } = await supabase
      .from("therapists")
      .select("*")
      .eq("slug", siteConfig.singleTherapistSlug)
      .eq("active", true)
      .single();
    therapist = data;
  }

  const title = therapist
    ? (locale === "de" ? therapist.title_de : therapist.title_en)
    : null;
  const bio = therapist
    ? (locale === "de" ? therapist.bio_de : therapist.bio_en)
    : null;

  return (
    <Container maxWidth="md" sx={pageContainer}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t("title")}
      </Typography>

      {therapist && (
        <>
          <Box sx={profileHeader}>
            <Box sx={profilePhotoWrapper}>
              <Image
                src={therapist.photo_url}
                alt={therapist.name}
                width={280}
                height={280}
                style={profilePhoto}
              />
            </Box>
            <Box sx={profileInfo}>
              <Typography variant="h4" component="h2">
                {therapist.name}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {title}
              </Typography>
              <Box sx={chipContainer}>
                {therapist.specialties.map((s: string) => (
                  <Chip key={s} label={s} />
                ))}
              </Box>
              <Button
                variant="contained"
                size="large"
                component={NavLink}
                href={`/booking/${therapist.slug}`}
              >
                {t("bookSession")}
              </Button>
            </Box>
          </Box>

          {bio?.split("\n\n").map((paragraph: string, i: number) => (
            <Typography key={i} variant="body1" color="text.secondary" sx={bioParagraph}>
              {paragraph}
            </Typography>
          ))}

          <Divider sx={section} />
        </>
      )}

      <Box sx={section}>
        <Typography variant="h5" gutterBottom>
          {t("missionTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("missionText")}
        </Typography>
      </Box>

      <Box sx={section}>
        <Typography variant="h5" gutterBottom>
          {t("howTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("howText")}
        </Typography>
      </Box>

      <Box sx={section}>
        <Typography variant="h5" gutterBottom>
          {t("approachTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("approachText")}
        </Typography>
      </Box>
    </Container>
  );
}
