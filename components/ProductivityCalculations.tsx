interface ProductivityCalculationsProps {
  subsystems: Record<number, number[]>
  pi_min: Record<number, number>
  r: Record<number, number>
  totalProductivity: number
}

export default function ProductivityCalculations({
  subsystems,
  pi_min,
  r,
  totalProductivity,
}: ProductivityCalculationsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3>2. Визначення значення суми реальних продуктивностей підсистем:</h3>

        <p className="formula">r = r(1) + r(2) + r(3),</p>

        <p className="formula">де r(i) — реальна продуктивність i-ї підсистеми, i = 1, 2, 3.</p>

        <p className="formula">
          За першим законом Амдала, реальні продуктивності підсистем визначаються за формулою:
          <br />
          r(i) = lᵢ * π(i),
          <br />
          де lᵢ — кількість пристроїв i-ї підсистеми, i = 1, 2, 3.
        </p>

        <h4>Тому для системи, представленої на рисунку 1, маємо:</h4>

        <div className="space-y-2 p-4 bg-gray-50 rounded-md border-l-4 border-orange-400">
          {[1, 2, 3].map((subIndex) => (
            <p key={subIndex}>
              r({subIndex}) = {pi_min[subIndex]} × {subsystems[subIndex].length} ={" "}
              <span className="result-value">{r[subIndex]}</span>;
            </p>
          ))}
        </div>
      </div>

      <div>
        <h4>Отже, реальна продуктивнісь системи:</h4>

        <div className="p-4 bg-gray-50 rounded-md border-l-4 border-orange-400">
          <p>
            r = {r[1]} + {r[2]} + {r[3]} ={" "}
            <span className="font-bold text-lg text-orange-600">{totalProductivity}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
