interface SystemAccelerationCalculationProps {
  totalProductivity: number
  maxPi: number
  systemAcceleration: number
}

export default function SystemAccelerationCalculation({
  totalProductivity,
  maxPi,
  systemAcceleration,
}: SystemAccelerationCalculationProps) {
  return (
    <div>
      <h3>
        4. Для визначення <b>прискорення системи</b> скористаємось формулою:
        <br />S = r / max<sub>0 ≤ i ≤ 14</sub> π<sub>i</sub>.
      </h3>

      <div className="space-y-2 p-4 bg-gray-50 rounded-md border-l-4 border-orange-400 mt-4">
        <p>
          max π<sub>i</sub> = <span className="result-value">{maxPi}</span>
        </p>
        <p>
          S = r / max π<sub>i</sub> = {totalProductivity} / {maxPi} ≈{" "}
          <span className="font-bold text-orange-600">{systemAcceleration.toFixed(2)}</span>
        </p>
      </div>
    </div>
  )
}
