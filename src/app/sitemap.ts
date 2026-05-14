import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://help.pages.dev";
const locales = ["en", "de"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/about", "/faq", "/contact", "/therapists", "/blog"];

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${siteUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );

  const { data: therapists } = await supabase
    .from("therapists")
    .select("slug")
    .eq("active", true);

  const therapistEntries = locales.flatMap((locale) =>
    (therapists ?? []).flatMap((t) => [
      {
        url: `${siteUrl}/${locale}/therapists/${t.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.9,
      },
      {
        url: `${siteUrl}/${locale}/booking/${t.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
    ])
  );

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, locale, published_at")
    .eq("published", true);

  const blogEntries = (posts ?? []).map((post) => ({
    url: `${siteUrl}/${post.locale}/blog/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...therapistEntries, ...blogEntries];
}
