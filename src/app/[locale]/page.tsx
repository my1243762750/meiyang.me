import { getTranslations, getLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import Card from "@/components/Card"
import { getAllProjects } from "@/lib/mdx"

export default async function Home() {
  const t = await getTranslations("Home")
  const locale = await getLocale()
  const projects = getAllProjects(locale).filter((p) => p.meta.featured)

  return (
    <div className="flex flex-col gap-20">
      <section className="flex flex-col gap-6">
        <div className="inline-flex">
          <span className="rounded-sm bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-500">
            {t("badge")}
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          {t("greeting")}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">
          {t("description")}
        </p>
        <div className="flex gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center rounded-md bg-primary-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-250 hover:bg-primary-600 hover:shadow-md"
          >
            {t("viewProjects")}
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center rounded-md border border-border-default bg-bg-elevated px-5 py-2.5 text-sm font-medium text-text-secondary transition-all duration-250 hover:border-border-strong hover:text-text-primary hover:shadow-sm"
          >
            {t("readBlog")}
          </Link>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-text-primary">{t("featuredProjects")}</h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-primary-500 transition-colors duration-150 hover:text-primary-600"
            >
              {t("viewAll")}
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
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
        </section>
      )}
    </div>
  )
}
