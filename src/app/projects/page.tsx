import Card from "@/components/Card"
import { getAllProjects } from "@/lib/mdx"

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Things I&apos;ve built, from browser extensions to full-stack applications.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
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
