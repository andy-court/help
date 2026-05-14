import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "@/theme";
import Header from "@/components/Header";
import CrisisBanner from "@/components/CrisisBanner";
import LegalBar from "@/components/LegalBar";
import { routing } from "@/i18n/routing";
import { appShell, mainContent } from "./layout.styles";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  return {
    title: {
      default: `${t("siteName")} — ${t("siteDescription")}`,
      template: `%s | ${t("siteName")}`,
    },
    description: t("siteDescription"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box sx={appShell}>
                <CrisisBanner />
                <Header />
                <Box component="main" sx={mainContent}>
                  {children}
                </Box>
                <LegalBar />
              </Box>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
