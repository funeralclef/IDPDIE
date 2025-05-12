interface LoadingCalculationsProps {
  pi: number[]
  subsystems: Record<number, number[]>
  pi_min: Record<number, number>
}

export default function LoadingCalculations({ pi, subsystems, pi_min }: LoadingCalculationsProps) {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((subIndex) => (
        <div key={subIndex} className="space-y-2">
          <h4>
            Визначення завантаженості pᵢ, i = {subsystems[subIndex].join(", ")}, i пристроїв{" "}
            {subIndex === 1 ? "першої" : subIndex === 2 ? "другої" : "третьої"} підсистеми
          </h4>

          <p className="formula">
            pᵢ = π({subIndex}) / πᵢ, для i = {subsystems[subIndex].join(", ")}
          </p>

          <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-md border-l-4 border-orange-400">
            {subsystems[subIndex].map((i) => (
              <p key={i}>
                p{i} = {pi_min[subIndex]} / {pi[i]} ={" "}
                <span className="result-value">{(pi_min[subIndex] / pi[i]).toFixed(2)}</span>;
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
