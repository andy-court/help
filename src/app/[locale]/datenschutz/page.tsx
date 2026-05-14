import { useTranslations } from "next-intl";
import { Typography, Container, Box } from "@mui/material";
import { pageContainer, section } from "./styles";

export default function Datenschutz() {
  const t = useTranslations("datenschutz");

  return (
    <Container maxWidth="md" sx={pageContainer}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t("title")}
      </Typography>

      <Box sx={section}>
        <Typography variant="h5" gutterBottom>
          {t("overviewTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("overviewText")}
        </Typography>
      </Box>

      <Box sx={section}>
        <Typography variant="h5" gutterBottom>
          {t("collectionTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("collectionText")}
        </Typography>
      </Box>

      <Box sx={section}>
        <Typography variant="h5" gutterBottom>
          {t("cookiesTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("cookiesText")}
        </Typography>
      </Box>

      <Box sx={section}>
        <Typography variant="h5" gutterBottom>
          {t("thirdPartyTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("thirdPartyText")}
        </Typography>
      </Box>

      <Box sx={section}>
        <Typography variant="h5" gutterBottom>
          {t("rightsTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("rightsText")}
        </Typography>
      </Box>

      <Box sx={section}>
        <Typography variant="h5" gutterBottom>
          {t("contactTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("contactText")}
        </Typography>
      </Box>
    </Container>
  );
}
