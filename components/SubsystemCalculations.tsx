interface SubsystemCalculationsProps {
  pi: number[]
  subsystems: Record<number, number[]>
  pi_min: Record<number, number>
}

export default function SubsystemCalculations({ pi, subsystems, pi_min }: SubsystemCalculationsProps) {
  const getPiLabels = (indices: number[]) => {
    return indices.map((i) => `π${i}`).join(", ")
  }

  const getPiValues = (indices: number[]) => {
    return indices.map((i) => pi[i]).join(", ")
  }

  return (
    <div className="space-y-3 mt-4">
      {[1, 2, 3].map((subIndex) => (
        <div key={subIndex} className="p-4 bg-gray-50 rounded-md border-l-4 border-orange-400">
          <p>
            π({subIndex}) = min{"{"}
            {getPiLabels(subsystems[subIndex])}
            {"}"} = min{"{"}
            {getPiValues(subsystems[subIndex])}
            {"}"} = <span className="result-value">{pi_min[subIndex]}</span>
          </p>
        </div>
      ))}
    </div>
  )
}
