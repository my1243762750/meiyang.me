import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"

export default async function NotFound() {
  const t = await getTranslations("NotFound")

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-6xl font-bold text-text-tertiary">{t("title")}</h1>
      <p className="mt-4 text-lg text-text-secondary">{t("message")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-md bg-primary-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-250 hover:bg-primary-600 hover:shadow-md"
      >
        {t("goHome")}
      </Link>
    </div>
  )
}
