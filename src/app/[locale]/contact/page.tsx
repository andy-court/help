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
import { submitContactForm } from "@/app/actions";
import { pageContainer, form, successAlert, submitButton } from "./styles";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const t = useTranslations("contact");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    setSubmitting(false);

    if (!result.success) {
      setError(true);
      return;
    }

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
        <Alert severity="success" sx={successAlert}>
          {t("success")}
        </Alert>
      ) : (
        <Box component="form" onSubmit={handleSubmit} sx={form}>
          {error && (
            <Alert severity="error">{t("error")}</Alert>
          )}
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
            disabled={submitting}
            endIcon={<SendIcon />}
            sx={submitButton}
          >
            {submitting ? t("sending") : t("send")}
          </Button>
        </Box>
      )}
    </Container>
  );
}
