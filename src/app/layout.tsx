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
      <body className="flex min-h-full flex-col bg-white font-sans antialiased dark:bg-zinc-950">
        <Header />
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
