"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import NavLink from "@/components/NavLink";
import { usePathname, useRouter } from "@/i18n/navigation";
import { siteConfig } from "@/siteConfig";
import {
  toolbar,
  logoLink,
  navLinks,
  ctaButton,
  mobileCtaButton,
  mobileMenuButton,
  socialLinks,
  localeSwitchButton,
  drawerList,
  drawerCtaItem,
  drawerDivider,
  drawerSocialItem,
} from "./styles";

const isSingle = siteConfig.mode === "single";
const bookingHref = isSingle
  ? `/booking/${siteConfig.singleTherapistSlug}`
  : "/therapists";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const pages = [
    { label: t("home"), href: "/" },
    ...(!isSingle ? [{ label: t("therapists"), href: "/therapists" }] : []),
    { label: t("blog"), href: "/blog" },
    { label: t("about"), href: "/about" },
    { label: t("faq"), href: "/faq" },
    { label: t("contact"), href: "/contact" },
  ];

  const switchLocale = () => {
    const next = locale === "en" ? "de" : "en";
    router.replace(pathname, { locale: next });
  };

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={toolbar}>
          <Typography
            variant="h6"
            component={NavLink}
            href="/"
            sx={logoLink}
          >
            Help
          </Typography>

          <Box sx={navLinks}>
            {pages.map((page) => (
              <Button
                key={page.href}
                component={NavLink}
                href={page.href}
                color="inherit"
              >
                {page.label}
              </Button>
            ))}
            <Button
              component={NavLink}
              href={bookingHref}
              variant="contained"
              color="primary"
              sx={ctaButton}
            >
              {t("bookSession")}
            </Button>
          </Box>

          <Box sx={socialLinks}>
            <Button
              onClick={switchLocale}
              color="inherit"
              size="small"
              sx={localeSwitchButton}
            >
              {locale === "en" ? "DE" : "EN"}
            </Button>
            <IconButton
              component="a"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              color="inherit"
              size="small"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              color="inherit"
              size="small"
            >
              <LinkedInIcon />
            </IconButton>
          </Box>

          <Button
            component={NavLink}
            href={bookingHref}
            variant="contained"
            color="primary"
            size="small"
            sx={mobileCtaButton}
          >
            {t("bookSession")}
          </Button>

          <IconButton
            sx={mobileMenuButton}
            onClick={() => setDrawerOpen(true)}
            aria-label={t("openMenu")}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List sx={drawerList}>
          {pages.map((page) => (
            <ListItem key={page.href} disablePadding>
              <ListItemButton
                component={NavLink}
                href={page.href}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={page.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={drawerCtaItem}>
            <Button
              component={NavLink}
              href={bookingHref}
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setDrawerOpen(false)}
            >
              {t("bookSession")}
            </Button>
          </ListItem>
          <Divider sx={drawerDivider} />
          <ListItem>
            <Button onClick={switchLocale} fullWidth>
              {locale === "en" ? "Deutsch" : "English"}
            </Button>
          </ListItem>
          <ListItem sx={drawerSocialItem}>
            <IconButton
              component="a"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
