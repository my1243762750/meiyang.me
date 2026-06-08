import Link from "next/link"

interface CardProps {
  href: string
  title: string
  description: string
  tags?: string[]
  date?: string
}

export default function Card({ href, title, description, tags, date }: CardProps) {
  return (
    <Link href={href} className="group block">
      <article className="rounded-xl border border-zinc-200 p-6 transition-all hover:border-blue-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-blue-700">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title}
          </h3>
          {date && (
            <span className="shrink-0 text-sm text-zinc-400">{date}</span>
          )}
        </div>
        <p className="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  )
}
