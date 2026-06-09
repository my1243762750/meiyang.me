import Link from "next/link"
import Card from "@/components/Card"
import { getAllProjects } from "@/lib/mdx"

export default function Home() {
  const projects = getAllProjects().filter((p) => p.meta.featured)

  return (
    <div className="flex flex-col gap-20">
      <section className="flex flex-col gap-6">
        <div className="inline-flex">
          <span className="rounded-[var(--radius-sm)] bg-[#6C5CE7]/10 px-3 py-1 text-xs font-medium text-[#6C5CE7]">
            Frontend Developer
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
          Hi, I&apos;m <span className="text-[#6C5CE7]">Meiyang</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
          A frontend developer passionate about building great web experiences.
          This is my knowledge base — projects I&apos;ve built, things I&apos;ve
          learned, and ideas I&apos;m exploring.
        </p>
        <div className="flex gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center rounded-[var(--radius-md)] bg-[#6C5CE7] px-5 py-2.5 text-sm font-medium text-white transition-all duration-250 hover:bg-[#5B4ED6] hover:shadow-[var(--shadow-md)]"
          >
            View Projects
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-250 hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] hover:shadow-[var(--shadow-sm)]"
          >
            Read Blog
          </Link>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Featured Projects</h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-[#6C5CE7] transition-colors duration-150 hover:text-[#5B4ED6]"
            >
              View all &rarr;
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
