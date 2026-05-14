import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import {
  Typography,
  Container,
  Box,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import Image from "next/image";
import NavLink from "@/components/NavLink";
import { supabase } from "@/lib/supabase";
import { pageContainer, profileHeader, profilePhotoWrapper, profilePhoto, profileInfo, chipContainer, profileDivider, bioParagraph } from "./styles";

interface TherapistProfileProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TherapistProfileProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const { data: therapist } = await supabase
    .from("therapists")
    .select("name, title_en, title_de, bio_en, bio_de")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (!therapist) return { title: "Not Found" };

  const title = locale === "de" ? therapist.title_de : therapist.title_en;
  const bio = locale === "de" ? therapist.bio_de : therapist.bio_en;

  return {
    title: `${therapist.name} — ${title}`,
    description: bio?.split("\n\n")[0] ?? "",
  };
}

export default async function TherapistProfile({ params }: TherapistProfileProps) {
  const { slug } = await params;
  const t = await getTranslations("therapistProfile");
  const locale = await getLocale();

  const { data: therapist } = await supabase
    .from("therapists")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (!therapist) {
    return (
      <Container maxWidth="md" sx={pageContainer}>
        <Typography variant="h4">{t("notFound")}</Typography>
      </Container>
    );
  }

  const title = locale === "de" ? therapist.title_de : therapist.title_en;
  const bio = locale === "de" ? therapist.bio_de : therapist.bio_en;

  return (
    <Container maxWidth="md" sx={pageContainer}>
      <Box sx={profileHeader}>
        <Box sx={profilePhotoWrapper}>
          <Image
            src={therapist.photo_url}
            alt={therapist.name}
            width={300}
            height={300}
            style={profilePhoto}
          />
        </Box>
        <Box sx={profileInfo}>
          <Typography variant="h3" component="h1">
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
            href={`/booking/${slug}`}
          >
            {t("bookSession")}
          </Button>
        </Box>
      </Box>

      <Divider sx={profileDivider} />

      {bio?.split("\n\n").map((paragraph: string, i: number) => (
        <Typography key={i} variant="body1" sx={bioParagraph}>
          {paragraph}
        </Typography>
      ))}
    </Container>
  );
}
