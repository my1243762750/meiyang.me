import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <h1 className="text-6xl font-bold text-[var(--color-text-tertiary)]">404</h1>
      <p className="text-lg text-[var(--color-text-secondary)]">
        Page not found
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-[var(--radius-md)] bg-[#6C5CE7] px-5 py-2.5 text-sm font-medium text-white transition-all duration-250 hover:bg-[#5B4ED6] hover:shadow-[var(--shadow-md)]"
      >
        Go home
      </Link>
    </div>
  )
}
