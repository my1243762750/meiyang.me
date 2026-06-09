import { Link } from "@/i18n/navigation"

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
      <article className="rounded-lg border border-border-default bg-bg-elevated p-6 shadow-sm transition-all duration-250 hover:border-primary-500/40 hover:shadow-md">
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-text-primary transition-colors duration-150 group-hover:text-primary-500">
            {title}
          </h3>
          {date && (
            <span className="shrink-0 whitespace-nowrap text-sm text-text-tertiary">
              {date}
            </span>
          )}
        </div>
        <p className="mb-4 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-bg-surface px-2.5 py-0.5 text-xs font-medium text-text-tertiary"
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
