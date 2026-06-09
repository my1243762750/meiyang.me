import { getTranslations, getLocale } from "next-intl/server"
import Card from "@/components/Card"
import { getAllProjects } from "@/lib/mdx"

export default async function ProjectsPage() {
  const t = await getTranslations("Projects")
  const locale = await getLocale()
  const projects = getAllProjects(locale)

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text-primary">{t("title")}</h1>
        <p className="mt-2 text-text-secondary">{t("subtitle")}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <Card
            key={p.slug}
            href={`/projects/${p.slug}`}
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
