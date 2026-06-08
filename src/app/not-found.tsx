import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <h1 className="text-6xl font-bold text-zinc-300 dark:text-zinc-700">404</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        Page not found
      </p>
      <Link
        href="/"
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Go home
      </Link>
    </div>
  )
}
