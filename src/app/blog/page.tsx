import Card from "@/components/Card"
import { getAllBlogPosts } from "@/lib/mdx"

export default function BlogPage() {
  const posts = getAllBlogPosts().sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  )

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Blog</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Notes, thoughts, and deep dives into frontend development.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {posts.map((p) => (
          <Card
            key={p.slug}
            href={`/blog/${p.slug}`}
            title={p.meta.title}
            description={p.meta.description}
            tags={p.meta.tags}
            date={p.meta.date}
          />
        ))}
      </div>
    </div>
  )
}
