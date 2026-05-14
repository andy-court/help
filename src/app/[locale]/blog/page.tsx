import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import NavLink from "@/components/NavLink";
import { supabase } from "@/lib/supabase";
import { pageContainer, postCard, subtitle, postExcerpt } from "./styles";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function Blog() {
  const t = await getTranslations("blog");
  const locale = await getLocale();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, published_at")
    .eq("locale", locale)
    .eq("published", true)
    .order("published_at", { ascending: false });

  return (
    <Container maxWidth="md" sx={pageContainer}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t("title")}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={subtitle}>
        {t("subtitle")}
      </Typography>

      {(posts ?? []).map((post) => (
        <Card key={post.slug} sx={postCard}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(post.published_at).toLocaleDateString(
                locale === "de" ? "de-DE" : "en-GB",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </Typography>
            <Typography variant="body1" sx={postExcerpt}>
              {post.excerpt}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              component={NavLink}
              href={`/blog/${post.slug}`}
            >
              {t("readMore")}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}
