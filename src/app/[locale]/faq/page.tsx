import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import {
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { pageContainer, accordionGroup } from "./styles";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("faq");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const faqKeys = [
  "booking",
  "cost",
  "insurance",
  "duration",
  "cancellation",
  "effectiveness",
  "technology",
] as const;

export default function FAQ() {
  const t = useTranslations("faq");

  return (
    <Container maxWidth="md" sx={pageContainer}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t("title")}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {t("subtitle")}
      </Typography>

      <Box sx={accordionGroup}>
        {faqKeys.map((key) => (
          <Accordion key={key}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" fontWeight="medium">
                {t(`items.${key}.question`)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="text.secondary">
                {t(`items.${key}.answer`)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
