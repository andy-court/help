import { useTranslations } from "next-intl";
import { Typography, Container, Box } from "@mui/material";
import { pageContainer, section } from "./styles";

export default function Impressum() {
  const t = useTranslations("impressum");

  return (
    <Container maxWidth="md" sx={pageContainer}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t("title")}
      </Typography>

      <Box sx={section}>
        <Typography variant="h5" gutterBottom>
          {t("responsibleTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary" whiteSpace="pre-line">
          {t("responsibleText")}
        </Typography>
      </Box>

      <Box sx={section}>
        <Typography variant="h5" gutterBottom>
          {t("contactTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary" whiteSpace="pre-line">
          {t("contactText")}
        </Typography>
      </Box>

      <Box sx={section}>
        <Typography variant="h5" gutterBottom>
          {t("disclaimerTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("disclaimerText")}
        </Typography>
      </Box>
    </Container>
  );
}
