"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Typography,
  Container,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { pageContainer, form } from "./styles";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("contact");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Submit to Supabase
    setSubmitted(true);
  };

  return (
    <Container maxWidth="md" sx={pageContainer}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t("title")}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {t("subtitle")}
      </Typography>

      {submitted ? (
        <Alert severity="success" sx={{ mt: 4 }}>
          {t("success")}
        </Alert>
      ) : (
        <Box component="form" onSubmit={handleSubmit} sx={form}>
          <TextField label={t("nameLabel")} name="name" required fullWidth />
          <TextField label={t("emailLabel")} name="email" type="email" required fullWidth />
          <TextField
            label={t("messageLabel")}
            name="message"
            required
            fullWidth
            multiline
            rows={5}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            endIcon={<SendIcon />}
            sx={{ alignSelf: "flex-start" }}
          >
            {t("send")}
          </Button>
        </Box>
      )}
    </Container>
  );
}
