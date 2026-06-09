import { notFound } from "next/navigation"
import { getBlogPost } from "@/lib/mdx"
import MDXContent from "@/components/MDXContent"
import Link from "next/link"

export async function generateStaticParams() {
  const { getAllBlogPosts } = await import("@/lib/mdx")
  return getAllBlogPosts().map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <article className="flex flex-col gap-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-text-tertiary)] transition-colors duration-150 hover:text-[var(--color-text-primary)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to blog
      </Link>

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">{post.meta.title}</h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          {post.meta.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-[var(--color-text-tertiary)]">{post.meta.date}</span>
          {post.meta.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-[var(--radius-sm)] bg-[var(--color-surface)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-text-tertiary)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="border-t border-[var(--color-border-default)] pt-8">
        <MDXContent content={post.content} />
      </div>
    </article>
  )
}
