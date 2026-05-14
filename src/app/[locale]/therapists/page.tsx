import { useTranslations } from "next-intl";
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
import { pageContainer, therapistCard, chipContainer } from "./styles";

// TODO: Replace with Supabase fetch
const placeholderTherapists = [
  {
    slug: "livia-malkus",
    name: "Livia Malkus",
    photo: "/images/therapists/livia-malkus.jpg",
    title: "Licensed Psychotherapist",
    specialties: ["Anxiety", "Depression", "Stress Management"],
    excerpt:
      "Specialising in cognitive behavioural therapy with over 10 years of experience helping individuals overcome anxiety and depression.",
  },
];

export default function Therapists() {
  const t = useTranslations("therapists");

  return (
    <Container maxWidth="lg" sx={pageContainer}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t("title")}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t("subtitle")}
      </Typography>

      <Grid container spacing={3}>
        {placeholderTherapists.map((therapist) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={therapist.slug}>
            <Card sx={therapistCard}>
              <CardMedia
                component="img"
                height="240"
                image={therapist.photo}
                alt={therapist.name}
                sx={{ objectPosition: "center top" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2">
                  {therapist.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {therapist.title}
                </Typography>
                <Box sx={chipContainer}>
                  {therapist.specialties.map((s) => (
                    <Chip key={s} label={s} size="small" />
                  ))}
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {therapist.excerpt}
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
        ))}
      </Grid>
    </Container>
  );
}
