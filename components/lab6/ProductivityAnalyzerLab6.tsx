"use client"

import { useState } from "react"
import PiVectorTable from "../PiVectorTable"
import GraphToggleLab6 from "./GraphToggleLab6"
import SubsystemCalculations from "../SubsystemCalculations"
import LoadingCalculations from "../LoadingCalculations"
import ProductivityCalculations from "../ProductivityCalculations"
import SystemLoadCalculation from "./SystemLoadCalculation"
import SystemAccelerationCalculation from "./SystemAccelerationCalculation"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function ProductivityAnalyzerLab6() {
  // Updated default Pi values for Lab #6
  const defaultPi = [9, 12, 7, 6, 15, 4, 7, 8, 10, 6, 9, 10, 8, 8, 7]
  const [pi, setPi] = useState<number[]>([...defaultPi])

  // Define subsystems for the original graph structure (Lab #6)
  const subsystems = {
    1: [0, 1, 2, 3, 4, 5],
    2: [6, 7, 8, 9],
    3: [10, 11, 12, 13, 14],
  }

  const resetPi = () => {
    setPi([...defaultPi])
  }

  const handlePiChange = (index: number, value: number) => {
    const newPi = [...pi]
    newPi[index] = value
    setPi(newPi)
  }

  // Calculate minimum productivity for each subsystem
  const pi_min = {
    1: Math.min(...subsystems[1].map((i) => pi[i])),
    2: Math.min(...subsystems[2].map((i) => pi[i])),
    3: Math.min(...subsystems[3].map((i) => pi[i])),
  }

  // Calculate real productivity for each subsystem
  const r = {
    1: pi_min[1] * subsystems[1].length,
    2: pi_min[2] * subsystems[2].length,
    3: pi_min[3] * subsystems[3].length,
  }

  // Calculate total system productivity
  const totalProductivity = r[1] + r[2] + r[3]

  // Calculate total peak productivity (sum of all pi values)
  const totalPeakProductivity = pi.reduce((sum, val) => sum + val, 0)

  // Calculate system load
  const systemLoad = totalProductivity / totalPeakProductivity

  // Calculate maximum pi value
  const maxPi = Math.max(...pi)

  // Calculate system acceleration
  const systemAcceleration = totalProductivity / maxPi

  return (
    <div className="space-y-8">
      <Card className="shadow-md border-0">
        <CardHeader className="bg-orange-50 border-b border-orange-100">
          <CardTitle className="text-xl text-orange-800">Продуктивності пристроїв (πᵢ для різних варіантів)</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <PiVectorTable pi={pi} onPiChange={handlePiChange} onReset={resetPi} />
        </CardContent>
      </Card>

      <Card className="shadow-md border-0">
        <CardHeader className="bg-orange-50 border-b border-orange-100">
          <CardTitle className="text-xl text-orange-800">Граф системи функціональних пристроїв (ФП = 0)</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <GraphToggleLab6 pi={pi} subsystems={subsystems} />
        </CardContent>
      </Card>

      <Card className="shadow-md border-0">
        <CardHeader className="bg-orange-50 border-b border-orange-100">
          <CardTitle className="text-xl text-orange-800">Розрахунок продуктивності підсистем</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <h3>
            1. Нехай πᵢ - реальні продуктивності, з якими працюють усi функціональні пристрої кожної i-ї підсистеми, i =
            1, 2, 3.
          </h3>
          <h4>ТОДІ:</h4>
          <SubsystemCalculations pi={pi} subsystems={subsystems} pi_min={pi_min} />
        </CardContent>
      </Card>

      <Card className="shadow-md border-0">
        <CardHeader className="bg-orange-50 border-b border-orange-100">
          <CardTitle className="text-xl text-orange-800">Розрахунок завантаженості пристроїв</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <LoadingCalculations pi={pi} subsystems={subsystems} pi_min={pi_min} />
        </CardContent>
      </Card>

      <Card className="shadow-md border-0">
        <CardHeader className="bg-orange-50 border-b border-orange-100">
          <CardTitle className="text-xl text-orange-800">Розрахунок загальної продуктивності</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ProductivityCalculations
            subsystems={subsystems}
            pi_min={pi_min}
            r={r}
            totalProductivity={totalProductivity}
          />
        </CardContent>
      </Card>

      {/* New sections for Lab #6 */}
      <Card className="shadow-md border-0">
        <CardHeader className="bg-orange-50 border-b border-orange-100">
          <CardTitle className="text-xl text-orange-800">Розрахунок завантаженості системи</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <SystemLoadCalculation
            pi={pi}
            totalProductivity={totalProductivity}
            totalPeakProductivity={totalPeakProductivity}
            systemLoad={systemLoad}
          />
        </CardContent>
      </Card>

      <Card className="shadow-md border-0">
        <CardHeader className="bg-orange-50 border-b border-orange-100">
          <CardTitle className="text-xl text-orange-800">Розрахунок прискорення системи</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <SystemAccelerationCalculation
            totalProductivity={totalProductivity}
            maxPi={maxPi}
            systemAcceleration={systemAcceleration}
          />
        </CardContent>
      </Card>
    </div>
  )
}
