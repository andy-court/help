import { getTranslations } from "next-intl/server";
import { Typography, Container, Box, Button, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavLink from "@/components/NavLink";
import { pageContainer, articleMeta } from "./styles";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const t = await getTranslations("blog");

  // TODO: Fetch blog post from Supabase using slug
  console.log("Loading blog post:", slug);
  const post = {
    title: "What to Expect from Your First Therapy Session",
    author: "Livia Malkus",
    publishedAt: "2026-05-01",
    content: `Starting therapy can feel daunting, but knowing what to expect can help ease your nerves.

Your first session is primarily about getting to know each other. Your therapist will ask about what brought you to therapy, your background, and what you hope to achieve.

There is no pressure to share everything right away. Therapy is a gradual process, and your therapist will work at your pace.

By the end of the first session, you and your therapist will typically discuss a general plan for how you will work together going forward.`,
  };

  return (
    <Container maxWidth="md" sx={pageContainer}>
      <Button
        component={NavLink}
        href="/blog"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        {t("backToBlog")}
      </Button>

      <Typography variant="h3" component="h1" gutterBottom>
        {post.title}
      </Typography>

      <Box sx={articleMeta}>
        <Typography variant="body2" color="text.secondary">
          {t("by", { author: post.author })}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(post.publishedAt).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {post.content.split("\n\n").map((paragraph, i) => (
        <Typography key={i} variant="body1" sx={{ mb: 2 }}>
          {paragraph}
        </Typography>
      ))}
    </Container>
  );
}
