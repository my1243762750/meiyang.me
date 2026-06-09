import { NextIntlClientProvider } from "next-intl"
import { getMessages, getLocale } from "next-intl/server"
import type { Metadata } from "next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "meiyang.me",
  description: "Personal knowledge base and portfolio",
}

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className="h-full">
      <body className="flex min-h-full flex-col bg-bg-page font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
