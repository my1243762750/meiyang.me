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
    <article className="flex flex-col gap-6">
      <Link
        href="/blog"
        className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        &larr; Back to blog
      </Link>
      <header>
        <h1 className="text-3xl font-bold">{post.meta.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-sm text-zinc-400">{post.meta.date}</span>
          {post.meta.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div className="max-w-none">
        <MDXContent content={post.content} />
      </div>
    </article>
  )
}
