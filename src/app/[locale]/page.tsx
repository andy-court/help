import { useTranslations } from "next-intl";
import { Typography, Container, Button, Box } from "@mui/material";
import NavLink from "@/components/NavLink";
import { heroContainer } from "./styles";

export default function Home() {
  const t = useTranslations("home");

  return (
    <Container maxWidth="md">
      <Box sx={heroContainer}>
        <Typography variant="h2" component="h1" fontWeight="bold">
          {t("title")}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {t("subtitle")}
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={NavLink}
          href="/therapists"
        >
          {t("cta")}
        </Button>
      </Box>
    </Container>
  );
}
