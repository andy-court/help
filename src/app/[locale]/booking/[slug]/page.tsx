import { getTranslations } from "next-intl/server";
import { Typography, Container, Box } from "@mui/material";
import { pageContainer, calendarEmbed } from "./styles";

interface BookingPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { slug } = await params;
  const t = await getTranslations("booking");

  const therapistName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <Container maxWidth="md" sx={pageContainer}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t("title")}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {t("description", { therapistName })}
      </Typography>

      <Box sx={calendarEmbed}>
        <Typography variant="body1" color="text.secondary">
          {t("placeholder")}
        </Typography>
      </Box>
    </Container>
  );
}
