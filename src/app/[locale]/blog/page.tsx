import { useTranslations } from "next-intl";
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import NavLink from "@/components/NavLink";
import { pageContainer, postCard } from "./styles";

// TODO: Replace with Supabase fetch
const placeholderPosts = [
  {
    slug: "what-to-expect-first-session",
    title: "What to Expect from Your First Therapy Session",
    excerpt:
      "Starting therapy can feel daunting. Here is what you can expect from your first session and how to prepare.",
    publishedAt: "2026-05-01",
  },
  {
    slug: "managing-anxiety-daily-life",
    title: "5 Strategies for Managing Anxiety in Daily Life",
    excerpt:
      "Practical, evidence-based techniques you can use right now to manage anxiety and build resilience.",
    publishedAt: "2026-04-15",
  },
];

export default function Blog() {
  const t = useTranslations("blog");

  return (
    <Container maxWidth="md" sx={pageContainer}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t("title")}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t("subtitle")}
      </Typography>

      {placeholderPosts.map((post) => (
        <Card key={post.slug} sx={postCard}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
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
