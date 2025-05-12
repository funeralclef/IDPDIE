interface SystemLoadCalculationProps {
  pi: number[]
  totalProductivity: number
  totalPeakProductivity: number
  systemLoad: number
}

export default function SystemLoadCalculation({
  pi,
  totalProductivity,
  totalPeakProductivity,
  systemLoad,
}: SystemLoadCalculationProps) {
  return (
    <div>
      <h3>
        3. Для знаходження завантаженості системи застосовуємо формулу r = π · ρ, де ρ — завантаженість, а π — пікова
        продуктивність системи.
      </h3>
      <p className="formula mt-2">Зазначимо, що для системи, граф якої наведено на рисунку 1, π = π₀ + ... + π₁₄.</p>

      <div className="space-y-2 p-4 bg-gray-50 rounded-md border-l-4 border-orange-400 mt-4">
        <p>
          π = {pi.join(" + ")} = <span className="result-value">{totalPeakProductivity}</span>
        </p>
        <p>
          ρ = r / π = {totalProductivity} / {totalPeakProductivity} ≈{" "}
          <span className="font-bold text-orange-600">{systemLoad.toFixed(2)}</span>
        </p>
      </div>
    </div>
  )
}
