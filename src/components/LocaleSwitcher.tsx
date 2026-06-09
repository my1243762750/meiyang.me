"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useTransition } from "react"

const locales = [
  { code: "en", label: "EN" },
  { code: "zh-CN", label: "中文" },
] as const

export default function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function switchLocale(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((loc, i) => (
        <span key={loc.code}>
          {i > 0 && <span className="text-text-tertiary mx-0.5">|</span>}
          <button
            onClick={() => switchLocale(loc.code)}
            disabled={isPending}
            className={`px-1.5 py-0.5 rounded transition-colors ${
              locale === loc.code
                ? "text-primary-500 font-medium"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            {loc.label}
          </button>
        </span>
      ))}
    </div>
  )
}
