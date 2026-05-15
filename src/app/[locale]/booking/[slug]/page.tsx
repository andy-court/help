import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Typography, Container, Box } from "@mui/material";
import { supabase } from "@/lib/supabase";
import CalEmbed from "@/components/CalEmbed";
import { pageContainer, subtitle, calendarEmbed } from "./styles";

interface BookingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations("booking");
  const { data: therapist } = await supabase
    .from("therapists")
    .select("name")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  const name = therapist?.name ?? slug;
  return {
    title: `${t("title")} — ${name}`,
    description: t("description", { therapistName: name }),
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { slug } = await params;
  const t = await getTranslations("booking");

  const { data: therapist } = await supabase
    .from("therapists")
    .select("name, cal_username")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  const therapistName = therapist?.name ?? slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <Container maxWidth="md" sx={pageContainer}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t("title")}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={subtitle}>
        {t("description", { therapistName })}
      </Typography>

      <Box sx={calendarEmbed}>
        {therapist?.cal_username ? (
          <CalEmbed calUsername={therapist.cal_username} />
        ) : (
          <Typography variant="body1" color="text.secondary">
            {t("placeholder")}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
