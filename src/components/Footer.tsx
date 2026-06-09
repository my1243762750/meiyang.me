import { getTranslations } from "next-intl/server"

export default async function Footer() {
  const t = await getTranslations("Footer")

  return (
    <footer className="border-t border-border-default py-8 text-center text-sm text-text-tertiary">
      <p>{t("copyright", { year: new Date().getFullYear() })}</p>
    </footer>
  )
}
