import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Typography, Container, Box, Button, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavLink from "@/components/NavLink";
import { supabase } from "@/lib/supabase";
import { pageContainer, backButton, articleMeta, articleDivider, articleParagraph } from "./styles";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("locale", locale)
    .eq("published", true)
    .single();

  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt ?? "",
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const t = await getTranslations("blog");
  const locale = await getLocale();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, content, excerpt, published_at, author_id, therapists(name)")
    .eq("slug", slug)
    .eq("locale", locale)
    .eq("published", true)
    .single();

  if (!post) {
    return (
      <Container maxWidth="md" sx={pageContainer}>
        <Typography variant="h4">{t("notFound")}</Typography>
      </Container>
    );
  }

  const author = (post.therapists as unknown as { name: string })?.name;

  return (
    <Container maxWidth="md" sx={pageContainer}>
      <Button
        component={NavLink}
        href="/blog"
        startIcon={<ArrowBackIcon />}
        sx={backButton}
      >
        {t("backToBlog")}
      </Button>

      <Typography variant="h3" component="h1" gutterBottom>
        {post.title}
      </Typography>

      <Box sx={articleMeta}>
        {author && (
          <Typography variant="body2" color="text.secondary">
            {t("by", { author })}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {new Date(post.published_at).toLocaleDateString(
            locale === "de" ? "de-DE" : "en-GB",
            { year: "numeric", month: "long", day: "numeric" }
          )}
        </Typography>
      </Box>

      <Divider sx={articleDivider} />

      {post.content?.split("\n\n").map((paragraph: string, i: number) => (
        <Typography key={i} variant="body1" sx={articleParagraph}>
          {paragraph}
        </Typography>
      ))}
    </Container>
  );
}
