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
import { toolbar, logoLink, navLinks, ctaButton, mobileMenuButton, socialLinks } from "./styles";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const pages = [
    { label: t("home"), href: "/" },
    { label: t("therapists"), href: "/therapists" },
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
              href="/therapists"
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
              sx={{ minWidth: 36, fontWeight: 700 }}
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

          <IconButton
            sx={mobileMenuButton}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
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
        <List sx={{ width: 250 }}>
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
          <ListItem disablePadding sx={{ px: 2, py: 1 }}>
            <Button
              component={NavLink}
              href="/therapists"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setDrawerOpen(false)}
            >
              {t("bookSession")}
            </Button>
          </ListItem>
          <Divider sx={{ my: 1 }} />
          <ListItem>
            <Button onClick={switchLocale} fullWidth>
              {locale === "en" ? "Deutsch" : "English"}
            </Button>
          </ListItem>
          <ListItem sx={{ display: "flex", gap: 1, px: 2 }}>
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
