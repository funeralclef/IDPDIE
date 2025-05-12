import ProductivityAnalyzer from "@/components/ProductivityAnalyzer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Лабораторна 5 — ІОД | Аналіз продуктивності системи",
  description: "Аналіз продуктивності системи, представленої у вигляді направленого графа",
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Лабораторна робота №5</h1>
      <ProductivityAnalyzer />
    </main>
  )
}
