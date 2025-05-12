"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import SystemGraph from "../SystemGraph"
import CustomSystemGraphLab6 from "./CustomSystemGraphLab6"

interface GraphToggleLab6Props {
  pi: number[]
  subsystems: Record<number, number[]>
}

export default function GraphToggleLab6({ pi, subsystems }: GraphToggleLab6Props) {
  const [showInteractive, setShowInteractive] = useState(true)

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <Button
          variant={showInteractive ? "outline" : "default"}
          onClick={() => setShowInteractive(false)}
          size="sm"
          className={showInteractive ? "border-orange-200 text-orange-700" : ""}
        >
          Static Graph
        </Button>
        <Button
          variant={showInteractive ? "default" : "outline"}
          onClick={() => setShowInteractive(true)}
          size="sm"
          className={!showInteractive ? "border-orange-200 text-orange-700" : ""}
        >
          Interactive Graph
        </Button>
      </div>

      {showInteractive ? <CustomSystemGraphLab6 pi={pi} subsystems={subsystems} /> : <SystemGraph />}
    </div>
  )
}
