import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Box,
  Chip,
} from "@mui/material";
import NavLink from "@/components/NavLink";
import { supabase } from "@/lib/supabase";
import { pageContainer, therapistCard, subtitle, cardImage, cardContent, chipContainer, cardExcerpt } from "./styles";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("therapists");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function Therapists() {
  const t = await getTranslations("therapists");
  const locale = await getLocale();

  const { data: therapists } = await supabase
    .from("therapists")
    .select("slug, name, photo_url, specialties, title_en, title_de, bio_en, bio_de")
    .eq("active", true);

  return (
    <Container maxWidth="lg" sx={pageContainer}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t("title")}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={subtitle}>
        {t("subtitle")}
      </Typography>

      <Grid container spacing={3}>
        {(therapists ?? []).map((therapist) => {
          const title = locale === "de" ? therapist.title_de : therapist.title_en;
          const bio = locale === "de" ? therapist.bio_de : therapist.bio_en;
          const excerpt = bio?.split("\n\n")[0] ?? "";

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={therapist.slug}>
              <Card sx={therapistCard}>
                <CardMedia
                  component="img"
                  height="240"
                  image={therapist.photo_url}
                  alt={therapist.name}
                  sx={cardImage}
                />
                <CardContent sx={cardContent}>
                  <Typography variant="h5" component="h2">
                    {therapist.name}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {title}
                  </Typography>
                  <Box sx={chipContainer}>
                    {therapist.specialties.map((s: string) => (
                      <Chip key={s} label={s} size="small" />
                    ))}
                  </Box>
                  <Typography variant="body2" sx={cardExcerpt}>
                    {excerpt}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={NavLink}
                    href={`/therapists/${therapist.slug}`}
                  >
                    {t("viewProfile")}
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    component={NavLink}
                    href={`/booking/${therapist.slug}`}
                  >
                    {t("bookSession")}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
