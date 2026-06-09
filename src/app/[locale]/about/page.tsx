import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"

const skillKeys = [
  "jsTs",
  "reactNext",
  "vueNuxt",
  "nodeExpress",
  "cssTailwind",
  "flutterDart",
  "webExtensions",
  "gitCicd",
  "restWebsocket",
] as const

export default async function AboutPage() {
  const t = await getTranslations("About")

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-text-primary">{t("title")}</h1>
      <div className="mt-10 flex flex-col gap-6 text-base leading-relaxed text-text-secondary">
        <p>{t("p1")}</p>
        <p>
          {t("p2Start")}
          <Link href="/projects/mei-ui-system" className="mx-1 font-semibold text-primary-500 hover:underline">
            {t("p2Link")}
          </Link>
          {t("p2End")}
        </p>
        <p>
          {t("p3Start")}
          <a href="https://github.com/my1243762750/mei-ui-system" target="_blank" rel="noopener noreferrer" className="ml-1 text-primary-500 underline decoration-primary-500/30 underline-offset-2 transition-colors duration-150 hover:decoration-primary-500">
            my1243762750/mei-ui-system
          </a>.
        </p>

        <h2 className="mt-4 text-xl font-semibold text-text-primary">
          {t("skillsTitle")}
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {skillKeys.map((key) => (
            <div
              key={key}
              className="rounded-lg border border-border-default bg-bg-elevated px-4 py-3.5 text-sm font-medium text-text-primary shadow-sm transition-all duration-150 hover:border-primary-500/30 hover:shadow-md"
            >
              {t(`skills.${key}`)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
