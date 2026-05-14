import { useTranslations } from "next-intl";
import { Typography, Container, Box } from "@mui/material";
import { pageContainer, section } from "./styles";

export default function About() {
  const t = useTranslations("about");

  return (
    <Container maxWidth="md" sx={pageContainer}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t("title")}
      </Typography>

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
