import { getTranslations } from "next-intl/server"
import { getBlogPost, getAllBlogPosts } from "@/lib/mdx"
import { notFound } from "next/navigation"
import { Link } from "@/i18n/navigation"
import MDXContent from "@/components/MDXContent"

export async function generateStaticParams() {
  const locales = ["en", "zh-CN"]
  return locales.flatMap((locale) =>
    getAllBlogPosts(locale).map((post) => ({
      locale,
      slug: post.slug,
    })),
  )
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  const post = getBlogPost(slug, locale)
  const t = await getTranslations("BlogPost")

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm font-medium text-text-tertiary transition-colors duration-150 hover:text-text-primary"
      >
        {t("back")}
      </Link>

      <header className="mb-12 mt-8">
        <h1 className="text-3xl font-bold text-text-primary">{post.meta.title}</h1>
        <p className="mt-4 text-lg text-text-secondary">{post.meta.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {post.meta.tags?.map((tag: string) => (
              <span
                key={tag}
                className="rounded-sm bg-bg-surface px-2.5 py-0.5 text-xs font-medium text-text-tertiary"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm text-text-tertiary">{post.meta.date}</span>
        </div>
      </header>

      <div className="border-t border-border-default pt-8">
        <MDXContent content={post.content} />
      </div>
    </article>
  )
}
