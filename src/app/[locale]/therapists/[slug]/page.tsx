import { getTranslations } from "next-intl/server";
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
import { pageContainer, profileHeader, profilePhotoWrapper, chipContainer } from "./styles";

// TODO: Replace with Supabase fetch by slug
const placeholderTherapist = {
  slug: "livia-malkus",
  name: "Livia Malkus",
  photo: "/images/therapists/livia-malkus.jpg",
  title: "Licensed Psychotherapist",
  specialties: ["Anxiety", "Depression", "Stress Management"],
  bio: "With over 10 years of experience in cognitive behavioural therapy, I help individuals navigate anxiety, depression, and life transitions. My approach is warm, collaborative, and grounded in evidence-based techniques.\n\nI believe that therapy is a partnership. Together, we will explore the patterns that keep you stuck and develop practical strategies to help you move forward with confidence.",
};

interface TherapistProfileProps {
  params: Promise<{ slug: string }>;
}

export default async function TherapistProfile({ params }: TherapistProfileProps) {
  const { slug } = await params;
  const t = await getTranslations("therapistProfile");

  // TODO: Fetch therapist from Supabase using slug
  const therapist = placeholderTherapist;

  return (
    <Container maxWidth="md" sx={pageContainer}>
      <Box sx={profileHeader}>
        <Box sx={profilePhotoWrapper}>
          <Image
            src={therapist.photo}
            alt={therapist.name}
            width={300}
            height={300}
            style={{ objectFit: "cover", objectPosition: "center top", borderRadius: 8 }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" component="h1">
            {therapist.name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {therapist.title}
          </Typography>
          <Box sx={chipContainer}>
            {therapist.specialties.map((s) => (
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

      <Divider sx={{ mb: 4 }} />

      {therapist.bio.split("\n\n").map((paragraph, i) => (
        <Typography key={i} variant="body1" sx={{ mb: 2 }}>
          {paragraph}
        </Typography>
      ))}
    </Container>
  );
}
