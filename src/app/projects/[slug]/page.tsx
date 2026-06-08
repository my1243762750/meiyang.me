import { notFound } from "next/navigation"
import { getProject } from "@/lib/mdx"
import MDXContent from "@/components/MDXContent"
import Link from "next/link"

export async function generateStaticParams() {
  const { getAllProjects } = await import("@/lib/mdx")
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <article className="flex flex-col gap-6">
      <Link
        href="/projects"
        className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        &larr; Back to projects
      </Link>
      <header>
        <h1 className="text-3xl font-bold">{project.meta.title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {project.meta.description}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {project.meta.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
          <span className="text-sm text-zinc-400">{project.meta.date}</span>
        </div>
      </header>
      <div className="max-w-none">
        <MDXContent content={project.content} />
      </div>
    </article>
  )
}
