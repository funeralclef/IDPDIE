import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import LabNavigation from "@/components/LabNavigation"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <LabNavigation />
          {children}
        </div>
      </body>
    </html>
  )
}
