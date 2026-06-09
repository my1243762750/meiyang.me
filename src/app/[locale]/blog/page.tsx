import { getTranslations, getLocale } from "next-intl/server"
import Card from "@/components/Card"
import { getAllBlogPosts } from "@/lib/mdx"

export default async function BlogPage() {
  const t = await getTranslations("Blog")
  const locale = await getLocale()
  const posts = getAllBlogPosts(locale)

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text-primary">{t("title")}</h1>
        <p className="mt-2 text-text-secondary">{t("subtitle")}</p>
      </div>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Card
            key={post.slug}
            href={`/blog/${post.slug}`}
            title={post.meta.title}
            description={post.meta.description}
            tags={post.meta.tags}
            date={post.meta.date}
          />
        ))}
      </div>
    </div>
  )
}
