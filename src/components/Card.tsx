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
      <article className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-6 shadow-[var(--shadow-sm)] transition-all duration-250 hover:border-[#6C5CE7]/40 hover:shadow-[var(--shadow-md)]">
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] transition-colors duration-150 group-hover:text-[#6C5CE7]">
            {title}
          </h3>
          {date && (
            <span className="shrink-0 whitespace-nowrap text-sm text-[var(--color-text-tertiary)]">
              {date}
            </span>
          )}
        </div>
        <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[var(--radius-sm)] bg-[var(--color-surface)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-text-tertiary)]"
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
