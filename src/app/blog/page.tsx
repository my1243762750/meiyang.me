import Card from "@/components/Card"
import { getAllBlogPosts } from "@/lib/mdx"

export default function BlogPage() {
  const posts = getAllBlogPosts().sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  )

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
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
