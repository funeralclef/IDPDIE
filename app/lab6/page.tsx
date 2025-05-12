import ProductivityAnalyzerLab6 from "@/components/lab6/ProductivityAnalyzerLab6"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Лабораторна 6 — ІОД | Аналіз продуктивності системи",
  description: "Аналіз продуктивності системи з розрахунком завантаженості та прискорення",
}

export default function Lab6Page() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Лабораторна робота №6</h1>
      <ProductivityAnalyzerLab6 />
    </main>
  )
}
