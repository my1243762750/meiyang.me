import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import LocaleSwitcher from "./LocaleSwitcher"

export default async function Header() {
  const t = await getTranslations("Header")

  const nav = [
    { href: "/" as const, label: t("home") },
    { href: "/projects" as const, label: t("projects") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/about" as const, label: t("about") },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border-default bg-bg-page/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-text-primary">
          meiyang<span className="text-primary-500">.me</span>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {nav.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium text-text-secondary transition-colors duration-150 hover:text-text-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  )
}
