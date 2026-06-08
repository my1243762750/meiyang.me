import Link from "next/link"
import Card from "@/components/Card"
import { getAllProjects } from "@/lib/mdx"

export default function Home() {
  const projects = getAllProjects().filter((p) => p.meta.featured)

  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Hi, I&apos;m <span className="text-blue-500">Meiyang</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          A frontend developer passionate about building great web experiences.
          This is my knowledge base — projects I&apos;ve built, things I&apos;ve
          learned, and ideas I&apos;m exploring.
        </p>
        <div className="flex gap-3">
          <Link
            href="/projects"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            View Projects
          </Link>
          <Link
            href="/blog"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Read Blog
          </Link>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
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
          <Link
            href="/projects"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            View all projects &rarr;
          </Link>
        </section>
      )}
    </div>
  )
}
