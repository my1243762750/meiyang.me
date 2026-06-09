import type { Metadata } from "next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "meiyang.me | Frontend Developer",
  description: "Personal portfolio and knowledge base of a frontend developer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="flex min-h-full flex-col bg-[var(--color-page)] font-sans antialiased">
        <Header />
        <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
